"use client";

import { useEffect, useRef, type RefObject } from "react";
import {
  createVideoSequence,
  type VideoSequenceController,
} from "@/lib/canvas/createVideoSequence";

type UseVideoSequenceOptions = {
  frames: string[];
  progress?: number;
  scrollProgressRef?: RefObject<number>;
  fitTop?: number;
  fitLeft?: number;
};

/**
 * Canvas frame scrubber. Uses one rAF loop (not GSAP ticker) and only redraws
 * when scroll progress actually changes — cuts main-thread work while idle.
 */
export function useVideoSequence({
  frames,
  progress = 0,
  scrollProgressRef,
  fitTop = 50,
  fitLeft = 50,
}: UseVideoSequenceOptions) {
  const containerRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<VideoSequenceController | null>(null);
  const progressRef = useRef(progress);
  progressRef.current = progress;

  useEffect(() => {
    const container = containerRef.current;
    if (!container || frames.length === 0) return;

    const controller = createVideoSequence({
      frames,
      fitPosition: { top: fitTop, left: fitLeft },
      fitMode: "cover",
      lazyLoad: false,
    });

    controllerRef.current = controller;
    controller.attach(container);

    let raf = 0;
    let lastProgress = Number.NaN;
    let lastDrawAt = 0;
    let inView = true;

    const readProgress = () =>
      scrollProgressRef?.current ?? progressRef.current;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!inView) return;
      const next = readProgress();
      if (next === lastProgress) return;

      // Cap canvas redraws (~30fps). Lenis + ScrollTrigger already share the
      // GSAP ticker — unrestricted bitmap draws were starving that loop.
      const now = performance.now();
      const delta = Number.isNaN(lastProgress)
        ? 1
        : Math.abs(next - lastProgress);
      if (now - lastDrawAt < 32 && delta < 0.035) return;

      lastProgress = next;
      lastDrawAt = now;
      controller.setProgress(next);
      controller.onUpdate();
    };

    raf = requestAnimationFrame(tick);

    const io =
      typeof IntersectionObserver !== "undefined"
        ? new IntersectionObserver(
            ([entry]) => {
              inView = entry?.isIntersecting ?? true;
              if (inView) {
                lastProgress = Number.NaN;
              }
            },
            { rootMargin: "10% 0px" },
          )
        : null;
    io?.observe(container);

    const observer = new ResizeObserver(() => {
      controller.resize();
      lastProgress = Number.NaN;
    });
    observer.observe(container);
    window.addEventListener("resize", controller.resize);

    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
      observer.disconnect();
      window.removeEventListener("resize", controller.resize);
      controller.detach();
      controllerRef.current = null;
    };
  }, [frames, fitTop, fitLeft, scrollProgressRef]);

  return { containerRef };
}
