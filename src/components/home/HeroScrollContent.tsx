"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { registerGsap } from "@/lib/gsap/register";
import { wrapTextWithChars } from "@/lib/text/splitChars";
import styles from "./video-carousel.module.css";

const FADE_IN_END = 0.5;
const FADE_IN_START = FADE_IN_END + 0.1;
const FADE_OUT_MULTIPLIER = 2;
/** Hold first line in white until the user starts scrolling. */
const REST_HOLD = 0.008;
const ACCENT = "var(--color-brand-accent-on-dark)";
const WHITE = "#ffffff";

type HeroScrollContentProps = {
  items: readonly string[];
  scrollProgressRef: React.RefObject<number>;
};

function pow2Out(value: number) {
  return 1 - (1 - value) * (1 - value);
}

function pow2In(value: number) {
  return value * value;
}

function setInactive(group: HTMLSpanElement[]) {
  group.forEach((char) => {
    char.style.opacity = "0";
    char.style.color = ACCENT;
  });
}

function showFirstLineWhite(charGroups: HTMLSpanElement[][]) {
  charGroups.forEach((group, groupIndex) => {
    if (groupIndex !== 0) {
      setInactive(group);
      return;
    }
    group.forEach((char) => {
      char.style.opacity = "1";
      char.style.color = WHITE;
    });
  });
}

function applyHeroProgress(
  charGroups: HTMLSpanElement[][],
  progress: number,
  segmentCount: number,
) {
  // At rest: first line visible in white — blue accent waits for scroll.
  if (progress <= REST_HOLD) {
    showFirstLineWhite(charGroups);
    return;
  }

  // Remap post-hold scroll across all segments so line 1 can replay its blue wave.
  const value = Math.min((progress - REST_HOLD) / (1 - REST_HOLD), 0.999);
  const segment = Math.min(
    Math.max(Math.floor(value * segmentCount), 0),
    segmentCount - 1,
  );
  const segmentProgress = value * segmentCount - segment;
  const chars = charGroups[segment];

  charGroups.forEach((group, groupIndex) => {
    if (groupIndex !== segment) setInactive(group);
  });

  if (!chars?.length) return;

  const fadeIn = Math.min(segmentProgress / FADE_IN_END, 1);
  let fadeOut = (segmentProgress - FADE_IN_START) / (1 - FADE_IN_START);
  fadeOut *= FADE_OUT_MULTIPLIER;
  fadeOut = Math.max(0, Math.min(1, fadeOut));

  const total = chars.length;
  const isFirstLine = segment === 0;

  chars.forEach((char, index) => {
    const start = index / total;
    const end = (index + 1) / total;
    const inRaw = Math.max(0, Math.min(1, (fadeIn - start) / (end - start)));
    const outRaw = Math.max(0, Math.min(1, (fadeOut - start) / (end - start)));

    // First line is already on screen: keep opacity up, drive the blue→white wave on scroll,
    // then fade out. Later lines still fade in from accent blue as before.
    const opacity = isFirstLine
      ? 1 - pow2In(outRaw)
      : pow2Out(inRaw) * (1 - pow2In(outRaw));

    char.style.opacity = String(opacity);
    char.style.color = inRaw < 1 ? ACCENT : WHITE;
  });
}

export function HeroScrollContent({ items, scrollProgressRef }: HeroScrollContentProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const titleRefs = useRef<HTMLHeadingElement[]>([]);
  const charGroupsRef = useRef<HTMLSpanElement[][]>([]);

  useEffect(() => {
    registerGsap();

    charGroupsRef.current = titleRefs.current.map((title) => {
      if (!title) return [];
      return wrapTextWithChars(title, "--char");
    });

    if (rootRef.current) {
      gsap.set(rootRef.current, { autoAlpha: 1 });
    }

    // Soft white entrance for line 1 only — blue accent waits for scroll.
    let introDone = false;
    charGroupsRef.current.forEach((group, groupIndex) => {
      if (groupIndex !== 0) setInactive(group);
    });
    const firstChars = charGroupsRef.current[0] ?? [];
    firstChars.forEach((char) => {
      char.style.color = WHITE;
    });

    const introTween =
      firstChars.length > 0
        ? gsap.fromTo(
            firstChars,
            { opacity: 0 },
            {
              opacity: 1,
              duration: 0.9,
              stagger: 0.012,
              ease: "power2.out",
              onComplete: () => {
                introDone = true;
              },
            },
          )
        : null;

    if (!introTween) introDone = true;

    const tick = () => {
      const scroll = scrollProgressRef.current ?? 0;
      // Don't overwrite the white entrance; hand off as soon as the user scrolls.
      if (!introDone && scroll <= REST_HOLD) return;
      introDone = true;
      applyHeroProgress(charGroupsRef.current, scroll, items.length);
    };

    gsap.ticker.add(tick);

    return () => {
      introTween?.kill();
      gsap.ticker.remove(tick);
      gsap.killTweensOf(firstChars);
    };
  }, [items, scrollProgressRef]);

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
