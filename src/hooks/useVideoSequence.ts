"use client";

import { useEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import { registerGsap } from "@/lib/gsap/register";
import {
  createVideoSequence,
  type VideoSequenceController,
} from "@/lib/canvas/createVideoSequence";

type UseVideoSequenceOptions = {
  frames: string[];
  progress: number;
  scrollProgressRef?: RefObject<number>;
  fitTop?: number;
  fitLeft?: number;
};

export function useVideoSequence({
  frames,
  progress,
  scrollProgressRef,
  fitTop = 50,
  fitLeft = 50,
}: UseVideoSequenceOptions) {
  const containerRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<VideoSequenceController | null>(null);
  const progressRef = useRef(progress);

  progressRef.current = progress;

  const readProgress = () =>
    scrollProgressRef?.current ?? progressRef.current;

  useEffect(() => {
    progressRef.current = progress;
    controllerRef.current?.setProgress(readProgress());
  }, [progress, scrollProgressRef]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || frames.length === 0) return;

    registerGsap();

    const controller = createVideoSequence({
      frames,
      fitPosition: { top: fitTop, left: fitLeft },
      fitMode: "cover",
      lazyLoad: false,
    });

    controllerRef.current = controller;
    controller.attach(container);
    controller.setProgress(readProgress());

    const tick = () => {
      controller.setProgress(readProgress());
      controller.onUpdate();
    };

    gsap.ticker.add(tick);

    const observer = new ResizeObserver(() => controller.resize());
    observer.observe(container);
    window.addEventListener("resize", controller.resize);

    return () => {
      gsap.ticker.remove(tick);
      observer.disconnect();
      window.removeEventListener("resize", controller.resize);
      controller.detach();
      controllerRef.current = null;
    };
  }, [frames, fitTop, fitLeft]);

  return { containerRef };
}
