"use client";

import {
  type CSSProperties,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { CrossFlicker } from "@/components/home/CrossFlicker";
import { LogoBorderCell } from "@/components/home/LogoBorderCell";
import { logoWallIntro, logoWallLogos, type LogoWallItem } from "@/data/homepage";
import styles from "./logo-wall.module.css";

/** Target travel speed — keeps both rows feeling even as content length changes */
const MARQUEE_PX_PER_SEC = 36;

function LogoCellDecorators() {
  return (
    <>
      <div className="crosses__wrapper">
        <div className="cross__wrapper top-left">
          <CrossFlicker />
        </div>
        <div className="cross__wrapper top-right">
          <CrossFlicker />
        </div>
        <div className="cross__wrapper bottom-right">
          <CrossFlicker />
        </div>
        <div className="cross__wrapper bottom-left">
          <CrossFlicker />
        </div>
      </div>
      <div className="block__visual-divider horizontal" />
      <div className="block__visual-divider vertical-top" />
      <div className="block__visual-divider vertical-bottom" />
    </>
  );
}

function LogoImage({ logo }: { logo: LogoWallItem }) {
  return (
    <picture
      className="image"
      style={{ "--logo-scale": (logo.scale ?? 100) / 100 } as CSSProperties}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={logo.src} alt="" decoding="async" loading="lazy" />
    </picture>
  );
}

function repeatToFill(logos: LogoWallItem[], copies: number) {
  if (!logos.length || copies <= 1) return logos;
  return Array.from({ length: copies }, () => logos).flat();
}

function MarqueeRow({
  logos,
  direction,
}: {
  logos: LogoWallItem[];
  direction: "left" | "right";
}) {
  const marqueeRef = useRef<HTMLDivElement>(null);
  const groupRef = useRef<HTMLUListElement>(null);
  const [copies, setCopies] = useState(2);
  const [durationSec, setDurationSec] = useState(40);

  const sequence = useMemo(() => repeatToFill(logos, copies), [logos, copies]);

  useLayoutEffect(() => {
    const marquee = marqueeRef.current;
    const group = groupRef.current;
    if (!marquee || !group || !logos.length) return;

    const measure = () => {
      const viewportW = marquee.clientWidth;
      const groupW = group.scrollWidth;
      if (viewportW <= 0 || groupW <= 0) return;

      // One sequence must be ≥ viewport so the loop never shows a gap
      const baseW = groupW / copies;
      const needed = Math.max(2, Math.ceil(viewportW / baseW) + 1);
      if (needed !== copies) {
        setCopies(needed);
        return;
      }

      setDurationSec(Math.max(20, groupW / MARQUEE_PX_PER_SEC));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(marquee);
    observer.observe(group);
    return () => observer.disconnect();
  }, [logos, copies, sequence.length]);

  return (
    <div ref={marqueeRef} className={styles.marquee}>
      <div
        className={`${styles.track} ${direction === "right" ? styles.trackRight : styles.trackLeft}`}
        style={{ animationDuration: `${durationSec}s` }}
      >
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            ref={copy === 0 ? groupRef : undefined}
            className={styles.group}
            aria-hidden={copy === 1 ? true : undefined}
          >
            {sequence.map((logo, index) => (
              <li
                key={`${copy}-${logo.src}-${index}`}
                className={`logo ${styles.logo}`}
              >
                <LogoCellDecorators />
                <LogoBorderCell>
                  <LogoImage logo={logo} />
                </LogoBorderCell>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export function LogoWall() {
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);

  const [rowOne, rowTwo] = useMemo(() => {
    const mid = Math.ceil(logoWallLogos.length / 2);
    return [logoWallLogos.slice(0, mid), logoWallLogos.slice(mid)] as const;
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const intro = introRef.current;
    if (!section || !intro) return;

    const setIntroHeight = () => {
      section.style.setProperty("--lw-intro-h", `${intro.offsetHeight}px`);
    };

    setIntroHeight();
    const observer = new ResizeObserver(setIntroHeight);
    observer.observe(intro);

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`logo-grid-wrapper logo-wall--pt-sm logo-wall--pb-sm ${styles.fullBleed}${logoWallIntro ? " has-intro" : ""}`}
      aria-label="Brand logos"
    >
      <div className={`logo-grid-window ${styles.window}`}>
        {logoWallIntro ? (
          <div ref={introRef} className="logo-wall-intro">
            <h2 className="title-si">{logoWallIntro}</h2>
          </div>
        ) : null}

        <div className={styles.viewport}>
          <div className={`${styles.fade} ${styles.fadeLeft}`} aria-hidden />
          <div className={`${styles.fade} ${styles.fadeRight}`} aria-hidden />

          <div className={styles.rows}>
            <MarqueeRow logos={rowOne} direction="left" />
            <MarqueeRow logos={rowTwo} direction="right" />
          </div>
        </div>
      </div>
    </section>
  );
}
