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
  progress?: number;
  scrollProgressRef?: RefObject<number>;
  fitTop?: number;
  fitLeft?: number;
};

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

  const readProgress = () =>
    scrollProgressRef?.current ?? progressRef.current;

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

    let ticking = false;
    const startTick = () => {
      if (ticking) return;
      ticking = true;
      gsap.ticker.add(tick);
      controller.requestLoad();
    };
    const stopTick = () => {
      if (!ticking) return;
      ticking = false;
      gsap.ticker.remove(tick);
    };

    const visibility = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) startTick();
        else {
          stopTick();
          controller.pauseLoad();
        }
      },
      { rootMargin: "20% 0px" },
    );
    visibility.observe(container);
    startTick();

    const observer = new ResizeObserver(() => controller.resize());
    observer.observe(container);
    window.addEventListener("resize", controller.resize);

    return () => {
      stopTick();
      visibility.disconnect();
      observer.disconnect();
      window.removeEventListener("resize", controller.resize);
      controller.detach();
      controllerRef.current = null;
    };
  }, [frames, fitTop, fitLeft]);

  return { containerRef };
}
