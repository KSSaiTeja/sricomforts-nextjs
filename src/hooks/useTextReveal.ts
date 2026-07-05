"use client";

import { useEffect, useState, type RefObject } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registerGsap } from "@/lib/gsap/register";

type UseTextRevealOptions = {
  start?: string;
  end?: string;
};

export function useTextReveal(
  sectionRef: RefObject<HTMLElement | null>,
  options: UseTextRevealOptions = {},
) {
  const { start = "top 70%", end = "top 30%" } = options;
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    registerGsap();

    const trigger = ScrollTrigger.create({
      trigger: section,
      start,
      end,
      scrub: true,
      onUpdate: (self) => setProgress(self.progress),
    });

    ScrollTrigger.refresh();

    return () => trigger.kill();
  }, [sectionRef, start, end]);

  return progress;
}
