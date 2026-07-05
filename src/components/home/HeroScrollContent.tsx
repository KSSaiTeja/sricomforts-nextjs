"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { registerGsap } from "@/lib/gsap/register";
import { wrapTextWithChars } from "@/lib/text/splitChars";
import styles from "./video-carousel.module.css";

const FADE_IN_END = 0.5;
const FADE_IN_START = FADE_IN_END + 0.1;
const FADE_OUT_MULTIPLIER = 2;

type HeroScrollContentProps = {
  items: readonly string[];
  progress: number;
};

function pow2Out(value: number) {
  return 1 - (1 - value) * (1 - value);
}

function pow2In(value: number) {
  return value * value;
}

function applyHeroProgress(
  charGroups: HTMLSpanElement[][],
  progress: number,
  segmentCount: number,
) {
  const value = progress - 0.03;
  const segment = Math.min(
    Math.max(Math.floor(value * segmentCount), 0),
    segmentCount - 1,
  );
  const segmentProgress = value * segmentCount - segment;
  const chars = charGroups[segment];

  charGroups.forEach((group, groupIndex) => {
    if (groupIndex !== segment) {
      group.forEach((char) => {
        char.style.opacity = "0";
        char.style.color = "var(--color-brand-accent-on-dark)";
      });
    }
  });

  if (!chars?.length) return;

  const fadeIn = Math.min(segmentProgress / FADE_IN_END, 1);
  let fadeOut = (segmentProgress - FADE_IN_START) / (1 - FADE_IN_START);
  fadeOut *= FADE_OUT_MULTIPLIER;
  fadeOut = Math.max(0, Math.min(1, fadeOut));

  const total = chars.length;

  chars.forEach((char, index) => {
    const start = index / total;
    const end = (index + 1) / total;
    const inRaw = Math.max(0, Math.min(1, (fadeIn - start) / (end - start)));
    const outRaw = Math.max(0, Math.min(1, (fadeOut - start) / (end - start)));
    const opacity = pow2Out(inRaw) * (1 - pow2In(outRaw));
    char.style.opacity = String(opacity);
    char.style.color = inRaw < 1 ? "var(--color-brand-accent-on-dark)" : "#ffffff";
  });
}

export function HeroScrollContent({ items, progress }: HeroScrollContentProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const titleRefs = useRef<HTMLHeadingElement[]>([]);
  const charGroupsRef = useRef<HTMLSpanElement[][]>([]);
  const progressRef = useRef(progress);

  progressRef.current = progress;

  useEffect(() => {
    registerGsap();

    charGroupsRef.current = titleRefs.current.map((title) => {
      if (!title) return [];
      return wrapTextWithChars(title, "--char");
    });

    if (rootRef.current) {
      gsap.set(rootRef.current, { autoAlpha: 1 });
    }

    applyHeroProgress(charGroupsRef.current, progressRef.current, items.length);
  }, [items]);

  useEffect(() => {
    applyHeroProgress(charGroupsRef.current, progress, items.length);
  }, [items.length, progress]);

  return (
    <div ref={rootRef} className={styles.scrollContent}>
      <div className={styles.scrollContentInner}>
        {items.map((label, index) => (
          <h2
            key={label}
            ref={(element) => {
              if (element) titleRefs.current[index] = element;
            }}
            className={`title-sequence title-h1 ${styles.title}`}
          >
            {label}
          </h2>
        ))}
      </div>
    </div>
  );
}
