"use client";

import { useEffect, type MutableRefObject, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  updatePathLineAnimation,
  type PathLineAnimationConfig,
  type PathLineRefs,
} from "@/lib/svg/pathFollower";
import { registerGsap } from "@/lib/gsap/register";

type UseAnimatedPathLinesOptions = {
  triggerRef: RefObject<HTMLElement | null>;
  paths: MutableRefObject<PathLineRefs[]>;
  stagger?: number;
  config?: PathLineAnimationConfig;
};

const DEFAULT_CONFIG: PathLineAnimationConfig = {
  enterDuration: 2,
  loopDuration: 8,
  dashRatio: 0.15,
};

export function useAnimatedPathLines({
  triggerRef,
  paths,
  stagger = 0.5,
  config = DEFAULT_CONFIG,
}: UseAnimatedPathLinesOptions) {
  useEffect(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    registerGsap();
    let active = false;
    let elapsed = 0;

    const scrollTrigger = ScrollTrigger.create({
      trigger,
      start: "top bottom",
      end: "bottom top",
      onEnter: () => {
        active = true;
      },
      onEnterBack: () => {
        active = true;
      },
      onLeave: () => {
        active = false;
      },
      onLeaveBack: () => {
        active = false;
      },
    });

    const tick = () => {
      if (!active) return;

      elapsed += gsap.ticker.deltaRatio() / 60;

      (paths.current ?? []).forEach((refs, index) => {
        const playhead = Math.max(0, elapsed - index * stagger);
        updatePathLineAnimation(refs, playhead, config);
      });
    };

    gsap.ticker.add(tick);

    return () => {
      scrollTrigger.kill();
      gsap.ticker.remove(tick);
    };
  }, [config, paths, stagger, triggerRef]);
}

export type { PathLineRefs };
