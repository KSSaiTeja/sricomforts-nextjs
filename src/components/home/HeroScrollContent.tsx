"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { usePreloader } from "@/components/preloader/PreloaderProvider";
import { registerGsap } from "@/lib/gsap/register";
import { wrapTextWithChars } from "@/lib/text/splitChars";
import styles from "./video-carousel.module.css";

/** Hold first line in white until the user starts scrolling. */
const REST_HOLD = 0.008;
const ACCENT = "var(--color-brand-accent-on-dark)";
const WHITE = "#ffffff";

type HeroScrollContentProps = {
  items: readonly string[];
  scrollProgressRef: React.RefObject<number>;
};

function setTitleLayer(title: HTMLHeadingElement | undefined, active: boolean) {
  if (!title) return;
  title.dataset.active = active ? "true" : "false";
  title.setAttribute("aria-hidden", active ? "false" : "true");
}

function setInactive(group: HTMLSpanElement[]) {
  group.forEach((char) => {
    char.style.opacity = "0";
    char.style.visibility = "hidden";
    char.style.color = ACCENT;
  });
}

function showFirstLineWhite(
  charGroups: HTMLSpanElement[][],
  titles: HTMLHeadingElement[],
) {
  charGroups.forEach((group, groupIndex) => {
    setTitleLayer(titles[groupIndex], groupIndex === 0);
    if (groupIndex !== 0) {
      setInactive(group);
      return;
    }
    group.forEach((char) => {
      char.style.opacity = "1";
      char.style.visibility = "visible";
      char.style.transform = "none";
      char.style.filter = "none";
      char.style.color = WHITE;
    });
  });
}

function applyHeroProgress(
  charGroups: HTMLSpanElement[][],
  titles: HTMLHeadingElement[],
  progress: number,
  segmentCount: number,
) {
  // At rest: first line visible in white — blue accent waits for scroll.
  if (progress <= REST_HOLD) {
    showFirstLineWhite(charGroups, titles);
    return;
  }

  // Remap post-hold scroll across all segments so line 1 can replay its blue wave.
  const value = Math.min((progress - REST_HOLD) / (1 - REST_HOLD), 0.999);
  const segment = Math.min(
    Math.max(Math.floor(value * segmentCount), 0),
    segmentCount - 1,
  );
  const segmentProgress = value * segmentCount - segment;
  const enter = Math.min(1, segmentProgress / 0.34);
  const rise = 1 - (1 - enter) * (1 - enter);

  charGroups.forEach((group, groupIndex) => {
    const active = groupIndex === segment;
    setTitleLayer(titles[groupIndex], active);
    if (!active) {
      setInactive(group);
      return;
    }

    const total = group.length || 1;
    const isFirstLine = segment === 0;
    group.forEach((char, index) => {
      const start = index / total;
      const end = (index + 1) / total;
      const wave = Math.max(
        0,
        Math.min(1, (segmentProgress - start) / (end - start)),
      );
      // Later lines rise in; first line stays fully painted after the intro.
      const t = isFirstLine ? 1 : rise;
      char.style.opacity = String(t);
      char.style.visibility = "visible";
      char.style.transform = `translate3d(0, ${(1 - t) * 42}%, 0)`;
      char.style.filter = t >= 1 ? "none" : `blur(${(1 - t) * 5}px)`;
      char.style.color = wave < 1 ? ACCENT : WHITE;
    });
  });
}

export function HeroScrollContent({ items, scrollProgressRef }: HeroScrollContentProps) {
  const { isAnimating, isLoaded } = usePreloader();
  const ready = isAnimating || isLoaded;
  const rootRef = useRef<HTMLDivElement>(null);
  const titleRefs = useRef<HTMLHeadingElement[]>([]);
  const charGroupsRef = useRef<HTMLSpanElement[][]>([]);

  useEffect(() => {
    if (!ready) return;

    registerGsap();

    charGroupsRef.current = titleRefs.current.map((title) => {
      if (!title) return [];
      return wrapTextWithChars(title, "--char");
    });

    const root = rootRef.current;
    if (root) {
      root.classList.add(styles.isReady);
      gsap.set(root, { autoAlpha: 1 });
    }

    let introDone = false;
    titleRefs.current.forEach((title, groupIndex) => {
      setTitleLayer(title, groupIndex === 0);
    });
    charGroupsRef.current.forEach((group, groupIndex) => {
      if (groupIndex !== 0) setInactive(group);
    });

    const firstChars = charGroupsRef.current[0] ?? [];
    firstChars.forEach((char) => {
      char.style.color = WHITE;
      char.style.visibility = "visible";
    });

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const introTween =
      firstChars.length > 0
        ? reducedMotion
          ? (() => {
              showFirstLineWhite(charGroupsRef.current, titleRefs.current);
              introDone = true;
              return null;
            })()
          : gsap.fromTo(
              firstChars,
              {
                opacity: 0,
                yPercent: 68,
                rotateX: -28,
                filter: "blur(6px)",
              },
              {
                opacity: 1,
                yPercent: 0,
                rotateX: 0,
                filter: "blur(0px)",
                duration: 0.9,
                stagger: { each: 0.016, from: "start" },
                ease: "power3.out",
                transformOrigin: "50% 100%",
                transformPerspective: 800,
                onComplete: () => {
                  introDone = true;
                  showFirstLineWhite(charGroupsRef.current, titleRefs.current);
                },
              },
            )
        : null;

    if (!introTween && firstChars.length === 0) introDone = true;

    let lastScroll = Number.NaN;
    const tick = () => {
      const scroll = scrollProgressRef.current ?? 0;
      if (scroll === lastScroll && introDone) return;
      lastScroll = scroll;
      // Don't overwrite the entrance; hand off as soon as the user scrolls.
      if (!introDone && scroll <= REST_HOLD) return;
      introDone = true;
      applyHeroProgress(
        charGroupsRef.current,
        titleRefs.current,
        scroll,
        items.length,
      );
    };

    gsap.ticker.add(tick);

    return () => {
      introTween?.kill();
      gsap.ticker.remove(tick);
      gsap.killTweensOf(firstChars);
      root?.classList.remove(styles.isReady);
    };
  }, [ready, items, scrollProgressRef]);

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
            aria-hidden="true"
          >
            {label}
          </h2>
        ))}
      </div>
    </div>
  );
}
