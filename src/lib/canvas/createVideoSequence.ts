import { fitAndPosition, type FitMode } from "@/lib/canvas/fitImage";

/** Match Terminal Industries worker batch size */
const BATCH_SIZE = 16;
const BATCH_DELAY_MS = 30;
const MAX_FRAME_FALLBACK = 4;

type FitPosition = { top: number; left: number };

type CreateVideoSequenceOptions = {
  frames: string[];
  fitPosition?: FitPosition;
  fitMode?: FitMode;
  lazyLoad?: boolean;
  onLoad?: (ratio: number) => void;
};

export type VideoSequenceController = {
  canvas: HTMLCanvasElement;
  setProgress: (value: number) => void;
  setFitPosition: (value: FitPosition) => void;
  onUpdate: (force?: boolean) => void;
  resize: () => void;
  requestLoad: () => void;
  attach: (container: HTMLElement) => void;
  detach: () => void;
};

type SharedState = {
  frames: string[];
  worker: Worker;
  bitmapCache: Map<string, ImageBitmap>;
  sortedBitmaps: ImageBitmap[];
  loadStarted: boolean;
  ready: boolean;
  refCount: number;
  onLoad?: (ratio: number) => void;
  loadListeners: Set<(ratio: number) => void>;
};

const sharedByKey = new Map<string, SharedState>();

function countDecoded(state: SharedState) {
  let count = 0;
  for (const url of state.frames) {
    if (state.bitmapCache.has(url)) count += 1;
  }
  return count;
}

function rebuildSortedBitmaps(state: SharedState) {
  state.sortedBitmaps = state.frames
    .map((url) => state.bitmapCache.get(url))
    .filter((bitmap): bitmap is ImageBitmap => Boolean(bitmap));
}

function notifyLoadProgress(state: SharedState) {
  rebuildSortedBitmaps(state);
  const ratio = countDecoded(state) / state.frames.length;
  state.onLoad?.(ratio);
  for (const listener of state.loadListeners) {
    listener(ratio);
  }
}

function getOrCreateSharedState(
  framesKey: string,
  frames: string[],
  onLoad?: (ratio: number) => void,
): SharedState {
  const existing = sharedByKey.get(framesKey);
  if (existing) {
    existing.refCount += 1;
    if (onLoad) existing.onLoad = onLoad;
    return existing;
  }

  const worker = new Worker(
    new URL("../../workers/video-sequence.worker.ts", import.meta.url),
  );

  const state: SharedState = {
    frames,
    worker,
    bitmapCache: new Map(),
    sortedBitmaps: [],
    loadStarted: false,
    ready: false,
    refCount: 1,
    onLoad,
    loadListeners: new Set(),
  };

  worker.addEventListener("message", (event: MessageEvent) => {
    if (event.data.type !== "bitmaps") return;

    const { items } = event.data.payload as {
      items: { frame: string; bitmap: ImageBitmap }[];
    };

    for (const { frame, bitmap } of items) {
      if (state.bitmapCache.has(frame)) {
        bitmap.close();
        continue;
      }
      state.bitmapCache.set(frame, bitmap);
    }

    state.ready = true;
    notifyLoadProgress(state);
  });

  worker.postMessage({ type: "frames", payload: { frames: [frames[0]!] } });
  sharedByKey.set(framesKey, state);
  return state;
}

function requestSharedLoad(state: SharedState) {
  if (state.loadStarted || state.frames.length === 0) return;
  state.loadStarted = true;

  const remaining = state.frames.slice(1);

  const sendNext = () => {
    if (remaining.length === 0) return;
    const batch = remaining.splice(0, BATCH_SIZE);
    state.worker.postMessage({ type: "frames", payload: { frames: batch } });
    if (remaining.length > 0) {
      setTimeout(sendNext, BATCH_DELAY_MS);
    }
  };

  sendNext();
}

function releaseSharedState(framesKey: string) {
  const state = sharedByKey.get(framesKey);
  if (!state) return;

  state.refCount = Math.max(0, state.refCount - 1);
  if (state.refCount > 0) return;

  for (const bitmap of state.bitmapCache.values()) {
    bitmap.close();
  }
  state.worker.terminate();
  sharedByKey.delete(framesKey);
}

function resolveBitmap(state: SharedState, targetIndex: number) {
  const exact = state.bitmapCache.get(state.frames[targetIndex]!);
  if (exact) return exact;

  for (let offset = 1; offset <= MAX_FRAME_FALLBACK; offset += 1) {
    const forward = state.bitmapCache.get(state.frames[targetIndex + offset]!);
    if (forward) return forward;

    const backward = state.bitmapCache.get(state.frames[targetIndex - offset]!);
    if (backward) return backward;
  }

  return null;
}

export function preloadVideoSequence(frames: string[]) {
  if (frames.length === 0) return;
  const framesKey = frames.join("|");
  const state = getOrCreateSharedState(framesKey, frames);
  requestSharedLoad(state);
}

export function getHeroFrameLoadRatio(frames: string[]) {
  if (frames.length === 0) return 1;
  const state = sharedByKey.get(frames.join("|"));
  if (!state) return 0;
  return countDecoded(state) / state.frames.length;
}

/** Preload all frames — scroll timeline always maps 0→409. */
export function waitForHeroFrames(
  frames: string[],
  threshold = 1,
  timeoutMs = 45_000,
) {
  return new Promise<void>((resolve) => {
    const framesKey = frames.join("|");
    const started = performance.now();

    const finish = () => resolve();

    const check = () => {
      if (getHeroFrameLoadRatio(frames) >= threshold) {
        finish();
        return;
      }
      if (performance.now() - started >= timeoutMs) {
        finish();
        return;
      }
      requestAnimationFrame(check);
    };

    preloadVideoSequence(frames);

    const state = sharedByKey.get(framesKey);
    if (state) {
      const listener = (ratio: number) => {
        if (ratio >= threshold) {
          state.loadListeners.delete(listener);
          finish();
        }
      };
      state.loadListeners.add(listener);
    }

    check();
  });
}

export function createVideoSequence({
  frames,
  fitPosition = { top: 50, left: 50 },
  fitMode = "cover",
  lazyLoad = false,
  onLoad,
}: CreateVideoSequenceOptions): VideoSequenceController {
  const framesKey = frames.join("|");
  const state = getOrCreateSharedState(framesKey, frames, onLoad);

  if (!lazyLoad) {
    requestSharedLoad(state);
  }

  let progress = 0;
  let fit = fitPosition;
  let lastDrawnIndex = -1;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Canvas 2D context unavailable");
  }

  const onUpdate = (force = false) => {
    if (!state.ready || state.frames.length === 0) return;

    const clamped = Math.min(1, Math.max(0, progress));
    const targetIndex = Math.floor(clamped * (state.frames.length - 1));
    const bitmap = resolveBitmap(state, targetIndex);

    if (!bitmap) return;
    if (lastDrawnIndex === targetIndex && !force) return;
    lastDrawnIndex = targetIndex;

    const displayWidth = canvas.offsetWidth;
    const displayHeight = canvas.offsetHeight;
    if (displayWidth === 0 || displayHeight === 0) return;

    const fitted = fitAndPosition(
      { width: displayWidth, height: displayHeight },
      { width: bitmap.width, height: bitmap.height },
      fitMode,
      `${fit.left}%`,
      `${fit.top}%`,
    );

    ctx.clearRect(0, 0, displayWidth, displayHeight);
    ctx.drawImage(bitmap, fitted.x, fitted.y, fitted.width, fitted.height);
  };

  const resize = () => {
    const dpr = window.devicePixelRatio || 1;
    const displayWidth = canvas.offsetWidth;
    const displayHeight = canvas.offsetHeight;

    if (displayWidth === 0 || displayHeight === 0) return;

    canvas.width = displayWidth * dpr;
    canvas.height = displayHeight * dpr;
    canvas.style.width = `${displayWidth}px`;
    canvas.style.height = `${displayHeight}px`;

    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    lastDrawnIndex = -1;
    onUpdate(true);
  };

  return {
    canvas,
    setProgress: (value: number) => {
      progress = value;
    },
    setFitPosition: (value: FitPosition) => {
      fit = value;
    },
    onUpdate,
    resize,
    requestLoad: () => requestSharedLoad(state),
    attach: (nextContainer: HTMLElement) => {
      if (!nextContainer.contains(canvas)) {
        nextContainer.appendChild(canvas);
      }
      resize();
    },
    detach: () => {
      canvas.remove();
      releaseSharedState(framesKey);
    },
  };
}
