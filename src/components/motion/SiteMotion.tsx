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
      // Homepage already owns its own scroll/pin/canvas — extra SplitText
      // reveals on leftover sections fight Lenis and flash white.
      if (pathname === "/") {
        requestAnimationFrame(() => ScrollTrigger.refresh());
        return;
      }

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

          // Transform-only reveals — never autoAlpha/blur to 0 over white page bg
          // (that combination is the site-wide “white flash” while scrolling).
          if (lightMotion) {
            gsap.fromTo(
              title,
              { y: 18 },
              {
                y: 0,
                duration: 0.55,
                ease: "power2.out",
                delay: titleInView ? 0.04 : 0,
                clearProps: "transform",
                immediateRender: titleInView,
                ...(titleInView
                  ? {}
                  : {
                      scrollTrigger: {
                        trigger: title,
                        start: "clamp(top 92%)",
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
                    yPercent: 48,
                    rotateX: -18,
                  },
                  {
                    yPercent: 0,
                    rotateX: 0,
                    duration: 0.72,
                    stagger: { each: 0.018, from: "start" },
                    ease: "power3.out",
                    delay: titleInView ? 0.04 : 0,
                    clearProps: "transform",
                    immediateRender: titleInView,
                    transformOrigin: "50% 100%",
                    ...(titleInView
                      ? {}
                      : {
                          scrollTrigger: {
                            trigger: title,
                            start: "clamp(top 92%)",
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
            { y: lightMotion ? 16 : 24 },
            {
              y: 0,
              duration: lightMotion ? 0.55 : 0.78,
              stagger: lightMotion ? 0.04 : 0.075,
              ease: "power3.out",
              delay: sectionInView ? 0.08 : 0,
              clearProps: "transform",
              immediateRender: sectionInView,
              ...(sectionInView
                ? {}
                : {
                    scrollTrigger: {
                      trigger: section,
                      start: "clamp(top 90%)",
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
