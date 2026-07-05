import { fitAndPosition, type FitMode } from "@/lib/canvas/fitImage";

/** Match Terminal Industries worker batch size */
const BATCH_SIZE = 8;
const BATCH_DELAY_MS = 50;
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
  imageCache: Map<string, HTMLImageElement>;
  sortedImages: HTMLImageElement[];
  objectUrls: string[];
  loadStarted: boolean;
  ready: boolean;
  refCount: number;
  onLoad?: (ratio: number) => void;
  loadListeners: Set<(ratio: number) => void>;
};

const sharedByKey = new Map<string, SharedState>();

function isImageReady(image: HTMLImageElement | undefined) {
  return Boolean(image?.complete && image.naturalWidth > 0);
}

function countDecoded(state: SharedState) {
  let count = 0;
  for (const url of state.frames) {
    if (isImageReady(state.imageCache.get(url))) count += 1;
  }
  return count;
}

function rebuildSortedImages(state: SharedState) {
  state.sortedImages = state.frames
    .map((url) => state.imageCache.get(url))
    .filter((image): image is HTMLImageElement => isImageReady(image));
}

function notifyLoadProgress(state: SharedState) {
  rebuildSortedImages(state);
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
    if (!isImageReady(image)) {
      state.imageCache.delete(frame);
    }
    state.ready = true;
    notifyLoadProgress(state);
  };

  image.onload = markReady;
  image.onerror = markReady;
  image.src = objectUrl;
  state.imageCache.set(frame, image);

  if (isImageReady(image)) {
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
    sortedImages: [],
    objectUrls: [],
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
}

/** Nearest loaded frame within a small window — never snaps back to frame 0 mid-scroll. */
function resolveImage(state: SharedState, targetIndex: number) {
  const exact = state.imageCache.get(state.frames[targetIndex]!);
  if (isImageReady(exact)) return exact;

  for (let offset = 1; offset <= MAX_FRAME_FALLBACK; offset += 1) {
    const forward = state.imageCache.get(state.frames[targetIndex + offset]!);
    if (isImageReady(forward)) return forward;

    const backward = state.imageCache.get(state.frames[targetIndex - offset]!);
    if (isImageReady(backward)) return backward;
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
  threshold = 0.98,
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
    const allLoaded = countDecoded(state) >= state.frames.length;
    const targetIndex = allLoaded
      ? Math.floor(clamped * (state.frames.length - 1))
      : Math.floor(
          clamped *
            Math.max(0, state.sortedImages.length - 1),
        );

    const image = allLoaded
      ? resolveImage(state, targetIndex)
      : state.sortedImages[targetIndex];

    if (!image?.complete || image.naturalWidth === 0) return;
    if (lastDrawnIndex === targetIndex && !force) return;
    lastDrawnIndex = targetIndex;

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
