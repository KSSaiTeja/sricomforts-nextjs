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
      const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
      const isNarrow = window.matchMedia("(max-width: 1023px)").matches;
      const lightMotion = isCoarsePointer || isNarrow;
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

        const viewportHeight = window.innerHeight || 1;
        const sectionTop = section.getBoundingClientRect().top;
        // Above-the-fold sections (e.g. blog) should animate on open, not wait for scroll.
        const sectionInView = sectionTop < viewportHeight * 0.92;

        if (title && !animatedTitles.has(title)) {
          animatedTitles.add(title);
          const titleInView =
            sectionInView || title.getBoundingClientRect().top < viewportHeight * 0.92;

          // Mobile: skip SplitText/blur — cheaper fade only so scroll stays smooth.
          if (lightMotion) {
            gsap.fromTo(
              title,
              { autoAlpha: 0, y: 18 },
              {
                autoAlpha: 1,
                y: 0,
                duration: 0.55,
                ease: "power2.out",
                delay: titleInView ? 0.04 : 0,
                clearProps: "transform,opacity,visibility",
                ...(titleInView
                  ? {}
                  : {
                      scrollTrigger: {
                        trigger: title,
                        start: "clamp(top 90%)",
                        once: true,
                        refreshPriority: index,
                      },
                    }),
              },
            );
          } else {
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
                    delay: titleInView ? 0.04 : 0,
                    clearProps: "transform,filter,opacity,visibility",
                    ...(titleInView
                      ? {}
                      : {
                          scrollTrigger: {
                            trigger: title,
                            start: "clamp(top 88%)",
                            once: true,
                            refreshPriority: index,
                          },
                        }),
                  },
                );
              },
            });
          }
        }

        if (items.length) {
          gsap.fromTo(
            items,
            lightMotion
              ? { autoAlpha: 0, y: 16 }
              : { autoAlpha: 0, y: 28, filter: "blur(7px)" },
            {
              autoAlpha: 1,
              y: 0,
              ...(lightMotion ? {} : { filter: "blur(0px)" }),
              duration: lightMotion ? 0.55 : 0.78,
              stagger: lightMotion ? 0.04 : 0.075,
              ease: "power3.out",
              delay: sectionInView ? 0.08 : 0,
              clearProps: lightMotion
                ? "transform,opacity,visibility"
                : "transform,filter,opacity,visibility",
              ...(sectionInView
                ? {}
                : {
                    scrollTrigger: {
                      trigger: section,
                      start: "clamp(top 84%)",
                      once: true,
                      refreshPriority: index,
                    },
                  }),
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
