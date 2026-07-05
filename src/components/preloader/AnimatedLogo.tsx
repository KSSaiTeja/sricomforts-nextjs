"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import gsap from "gsap";
import { LogoIcon } from "@/components/brand/LogoIcon";
import { WordmarkPaths } from "@/components/brand/WordmarkPaths";
import {
  WORDMARK_SLICES,
  WORDMARK_VIEWBOX,
} from "@/components/brand/wordmarkSlices";
import { registerGsap } from "@/lib/gsap/register";
import styles from "./preloader.module.css";

export type AnimatedLogoHandle = {
  play: () => gsap.core.Timeline;
};

export const AnimatedLogo = forwardRef<AnimatedLogoHandle>(function AnimatedLogo(_, ref) {
  const rootRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<SVGSVGElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const charWrapperRefs = useRef<HTMLSpanElement[]>([]);
  const charRefs = useRef<HTMLSpanElement[]>([]);

  useEffect(() => {
    registerGsap();
  }, []);

  useImperativeHandle(ref, () => ({
    play: () => {
      registerGsap();

      const root = rootRef.current;
      const icon = iconRef.current;
      const text = textRef.current;

      if (!root || !icon || !text) {
        return gsap.timeline();
      }

      const iconPaths = icon.querySelectorAll("path");
      const timeline = gsap.timeline();

      timeline.set(root, { autoAlpha: 1 }, 0);
      timeline.set(icon, {
        x: () => (root.offsetWidth - icon.clientWidth) * 0.5,
      });
      timeline.set(text, {
        x: () => -(root.offsetWidth - text.offsetWidth) * 0.5,
      });
      timeline.fromTo(
        icon,
        { scale: 0, transformOrigin: "center center" },
        { scale: 1, ease: "custom.fastInOut", duration: 1 },
        0,
      );
      timeline.fromTo(
        iconPaths,
        { opacity: 0, transformOrigin: "center center" },
        {
          opacity: 1,
          ease: "custom.fastInOut",
          duration: 0.8,
          stagger: { each: 0.08, from: "start" },
        },
        "<0.1",
      );
      timeline.to(
        [text, icon],
        { x: 0, ease: "expo.inOut", duration: 1.2 },
        "<0.8",
      );
      timeline.fromTo(
        charWrapperRefs.current,
        { yPercent: 100 },
        {
          yPercent: 0,
          ease: "expo.out",
          duration: 1,
          stagger: { each: 0.04, from: "end" },
        },
        "<0.4",
      );
      timeline.fromTo(
        charRefs.current,
        { yPercent: -100 },
        {
          yPercent: 0,
          ease: "expo.out",
          duration: 1,
          stagger: { each: 0.04, from: "end" },
        },
        "<",
      );

      return timeline;
    },
  }));

  return (
    <div ref={rootRef} className={styles.animatedLogo} aria-label="Sri Comforts">
      <LogoIcon ref={iconRef} className={styles.logoIcon} />
      <div ref={textRef} className={styles.animatedLogoText}>
        {WORDMARK_SLICES.map((slice, index) => {
          const sliceWidth = (slice.width / WORDMARK_VIEWBOX.width) * 100;
          const sliceOffset = (slice.x / slice.width) * 100;

          return (
            <span
              key={slice.id}
              ref={(element) => {
                if (element) charWrapperRefs.current[index] = element;
              }}
              className={styles.animatedLogoCharWrapper}
              style={{ width: `${sliceWidth}%` }}
            >
              <span
                ref={(element) => {
                  if (element) charRefs.current[index] = element;
                }}
                className={styles.animatedLogoChar}
              >
                <svg
                  viewBox={`0 0 ${WORDMARK_VIEWBOX.width} ${WORDMARK_VIEWBOX.height}`}
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden
                  className={styles.logoWordmarkSlice}
                  style={{
                    width: `${(WORDMARK_VIEWBOX.width / slice.width) * 100}%`,
                    marginLeft: `-${sliceOffset}%`,
                  }}
                >
                  <WordmarkPaths />
                </svg>
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
});
