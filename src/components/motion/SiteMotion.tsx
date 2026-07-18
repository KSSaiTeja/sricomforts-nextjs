"use client";

import { useRef } from "react";
import { usePathname } from "next/navigation";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { motion, useScroll, useSpring } from "motion/react";
import { usePreloader } from "@/components/preloader/PreloaderProvider";
import { registerGsap } from "@/lib/gsap/register";

if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}

const SECTION_SELECTOR = "main section, main [data-motion-section]";
const TITLE_SELECTOR = "[data-motion-title], h2, .title-h2";

function getSectionItems(section: HTMLElement, title: HTMLElement | null) {
  const explicitItems = Array.from(
    section.querySelectorAll<HTMLElement>("[data-motion-item]"),
  );
  if (explicitItems.length) return explicitItems;

  const contentRoot =
    section.children.length === 1 && section.firstElementChild instanceof HTMLElement
      ? section.firstElementChild
      : section;

  return Array.from(contentRoot.children)
    .filter((item): item is HTMLElement => item instanceof HTMLElement)
    .filter((item) => item !== title && !item.contains(title))
    .filter((item) => !item.matches("svg, canvas, script, style"))
    .slice(0, 8);
}

export function SiteMotion() {
  const pathname = usePathname();
  const { isLoaded } = usePreloader();
  const rootRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 150,
    damping: 28,
    mass: 0.22,
  });

  useGSAP(
    () => {
      if (!isLoaded) return;

      registerGsap();
      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const sections = gsap.utils.toArray<HTMLElement>(SECTION_SELECTOR);
      const animatedTitles = new Set<HTMLElement>();

      sections.forEach((section, index) => {
        if (section.closest("[data-motion-ignore]")) return;

        const title = section.querySelector<HTMLElement>(TITLE_SELECTOR);
        const items = getSectionItems(section, title);

        if (reducedMotion) {
          gsap.set([title, ...items].filter(Boolean), {
            clearProps: "all",
            autoAlpha: 1,
          });
          return;
        }

        if (title && !animatedTitles.has(title)) {
          animatedTitles.add(title);
          SplitText.create(title, {
            type: "words,chars",
            aria: "auto",
            wordsClass: "motion-word",
            charsClass: "motion-char",
            onSplit(self) {
              return gsap.fromTo(
                self.chars,
                {
                  autoAlpha: 0,
                  yPercent: 72,
                  rotateX: -38,
                  filter: "blur(8px)",
                },
                {
                  autoAlpha: 1,
                  yPercent: 0,
                  rotateX: 0,
                  filter: "blur(0px)",
                  duration: 0.72,
                  stagger: { each: 0.018, from: "start" },
                  ease: "power3.out",
                  clearProps: "transform,filter,opacity,visibility",
                  scrollTrigger: {
                    trigger: title,
                    start: "clamp(top 88%)",
                    once: true,
                    refreshPriority: index,
                  },
                },
              );
            },
          });
        }

        if (items.length) {
          gsap.fromTo(
            items,
            {
              autoAlpha: 0,
              y: 28,
              filter: "blur(7px)",
            },
            {
              autoAlpha: 1,
              y: 0,
              filter: "blur(0px)",
              duration: 0.78,
              stagger: 0.075,
              ease: "power3.out",
              clearProps: "transform,filter,opacity,visibility",
              scrollTrigger: {
                trigger: section,
                start: "clamp(top 84%)",
                once: true,
                refreshPriority: index,
              },
            },
          );
        }
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());
    },
    {
      dependencies: [isLoaded, pathname],
      revertOnUpdate: true,
    },
  );

  return (
    <div ref={rootRef} className="site-motion-layer" aria-hidden="true">
      <motion.div className="site-scroll-progress" style={{ scaleX: progress }} />
    </div>
  );
}
