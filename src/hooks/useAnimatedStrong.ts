"use client";

import { useEffect, useRef, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePreloader } from "@/components/preloader/PreloaderProvider";
import { registerGsap } from "@/lib/gsap/register";
import { wrapTextWithChars } from "@/lib/text/splitChars";

type AnimatedStrongOptions = {
  startColor?: string;
  endColor?: string;
  sectionRef?: RefObject<HTMLElement | null>;
};

export function useAnimatedStrong<
  THeader extends HTMLElement = HTMLElement,
  TSection extends HTMLElement = HTMLElement,
>(options: AnimatedStrongOptions = {}) {
  const { startColor = "var(--color-brand-accent)", endColor = "var(--color-brand-ink)" } = options;
  const { isLoaded } = usePreloader();
  const headerRef = useRef<THeader>(null);
  const internalSectionRef = useRef<TSection>(null);
  const sectionRef = (options.sectionRef as RefObject<TSection | null>) ?? internalSectionRef;

  useEffect(() => {
    if (!isLoaded) return;

    registerGsap();

    const header = headerRef.current;
    const section = sectionRef.current;
    if (!header || !section) return;

    let trigger: ScrollTrigger | undefined;
    let cancelled = false;

    const setup = () => {
      if (cancelled) return;

      const strongElements = header.querySelectorAll("strong");
      const charElements: HTMLElement[] = [];

      strongElements.forEach((strong) => {
        if (strong.querySelector(".--char")) return;
        charElements.push(...wrapTextWithChars(strong as HTMLElement));
      });

      if (!charElements.length) return;

      trigger = ScrollTrigger.create({
        trigger: section,
        start: "top 40%",
        animation: gsap
          .timeline()
          .to(charElements, {
            color: startColor,
            duration: 0.4,
            stagger: 0.05,
            ease: "power2.inOut",
          })
          .to(
            charElements,
            {
              color: endColor,
              duration: 0.5,
              stagger: 0.05,
              ease: "power2.inOut",
            },
            0.25,
          ),
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    requestAnimationFrame(setup);

    return () => {
      cancelled = true;
      trigger?.kill();
    };
  }, [isLoaded, startColor, endColor]);

  return { headerRef, sectionRef };
}
