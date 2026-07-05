import { fitAndPosition, type FitMode } from "@/lib/canvas/fitImage";

const BATCH_SIZE = 32;

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
  imageCache: Map<string, HTMLImageElement>;
  objectUrls: string[];
  decodedCount: number;
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
    const image = state.imageCache.get(url);
    if (image?.complete && image.naturalWidth > 0) count += 1;
  }
  return count;
}

function notifyLoadProgress(state: SharedState) {
  const ratio = countDecoded(state) / state.frames.length;
  state.onLoad?.(ratio);
  for (const listener of state.loadListeners) {
    listener(ratio);
  }
}

function addImageFromBlob(state: SharedState, frame: string, blob: Blob) {
  if (state.imageCache.has(frame)) return;

  const objectUrl = URL.createObjectURL(blob);
  state.objectUrls.push(objectUrl);

  const image = new Image();
  image.decoding = "async";

  const markReady = () => {
    state.decodedCount = countDecoded(state);
    state.ready = true;
    notifyLoadProgress(state);
  };

  image.onload = markReady;
  image.onerror = markReady;
  image.src = objectUrl;
  state.imageCache.set(frame, image);

  if (image.complete && image.naturalWidth > 0) {
    markReady();
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
    imageCache: new Map(),
    objectUrls: [],
    decodedCount: 0,
    loadStarted: false,
    ready: false,
    refCount: 1,
    onLoad,
    loadListeners: new Set(),
  };

  worker.addEventListener("message", (event: MessageEvent) => {
    const { blobs } = event.data.payload as {
      blobs: { blob: Blob; frame: string }[];
    };

    for (const { blob, frame } of blobs) {
      addImageFromBlob(state, frame, blob);
    }
  });

  worker.postMessage({ type: "frames", payload: { frames: [frames[0]!] } });
  sharedByKey.set(framesKey, state);
  return state;
}

function requestSharedLoad(state: SharedState) {
  if (state.loadStarted || state.frames.length === 0) return;
  state.loadStarted = true;

  const remaining = state.frames.slice(1);

  while (remaining.length > 0) {
    const batch = remaining.splice(0, BATCH_SIZE);
    state.worker.postMessage({ type: "frames", payload: { frames: batch } });
  }
}

function releaseSharedState(framesKey: string) {
  const state = sharedByKey.get(framesKey);
  if (!state) return;
  state.refCount = Math.max(0, state.refCount - 1);
}

function resolveImage(state: SharedState, targetIndex: number) {
  for (let index = targetIndex; index >= 0; index -= 1) {
    const image = state.imageCache.get(state.frames[index]!);
    if (image?.complete && image.naturalWidth > 0) return image;
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

export function waitForHeroFrames(
  frames: string[],
  threshold = 0.85,
  timeoutMs = 20_000,
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
  let lastDrawnUrl: string | null = null;

  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    throw new Error("Canvas 2D context unavailable");
  }

  const onUpdate = (force = false) => {
    if (!state.ready || state.frames.length === 0) return;

    const clamped = Math.min(1, Math.max(0, progress));
    const targetIndex = Math.floor(clamped * (state.frames.length - 1));
    const image = resolveImage(state, targetIndex);
    if (!image) return;

    const frameUrl = state.frames[targetIndex]!;
    const resolvedUrl =
      state.frames.find((url) => state.imageCache.get(url) === image) ?? frameUrl;

    if (lastDrawnUrl === resolvedUrl && !force) return;
    lastDrawnUrl = resolvedUrl;

    const displayWidth = canvas.offsetWidth;
    const displayHeight = canvas.offsetHeight;
    if (displayWidth === 0 || displayHeight === 0) return;

    const fitted = fitAndPosition(
      { width: displayWidth, height: displayHeight },
      { width: image.naturalWidth, height: image.naturalHeight },
      fitMode,
      `${fit.left}%`,
      `${fit.top}%`,
    );

    ctx.clearRect(0, 0, displayWidth, displayHeight);
    ctx.drawImage(image, fitted.x, fitted.y, fitted.width, fitted.height);
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
