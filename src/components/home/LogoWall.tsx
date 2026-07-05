"use client";

import { type CSSProperties, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePreloader } from "@/components/preloader/PreloaderProvider";
import { CrossFlicker } from "@/components/home/CrossFlicker";
import { LogoBorderCell } from "@/components/home/LogoBorderCell";
import { logoWallIntro, logoWallLogos, type LogoWallItem } from "@/data/homepage";
import { registerGsap } from "@/lib/gsap/register";
import { useIsLargeViewport } from "@/hooks/useMediaQuery";
import { useSmoothScroll } from "@/providers/SmoothScrollProvider";

const STAGGER = 0.06;

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

export function LogoWall() {
  const { isLoaded } = usePreloader();
  const { lenis } = useSmoothScroll();
  const isDesktop = useIsLargeViewport();
  const sectionRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const logoRefs = useRef<(HTMLDivElement | null)[]>([]);

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

  useEffect(() => {
    if (!isLoaded || !lenis) return;

    registerGsap();

    const logos = logoRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!logos.length) return;

    const pageSize = isDesktop ? 10 : 2;
    const triggers: ScrollTrigger[] = [];

    for (let row = 0; row * pageSize < logos.length; row += 1) {
      const rowLogos = logos.slice(row * pageSize, (row + 1) * pageSize);
      if (!rowLogos.length) continue;

      const animation = gsap.fromTo(
        rowLogos,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 1.4,
          ease: "expo.out",
          stagger: STAGGER,
          scrollTrigger: {
            trigger: rowLogos[0],
            start: "top 88%",
            toggleActions: "play none none reverse",
          },
        },
      );

      if (animation.scrollTrigger) {
        triggers.push(animation.scrollTrigger);
      }
    }

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => triggers.forEach((trigger) => trigger.kill());
  }, [isLoaded, lenis, isDesktop]);

  return (
    <section
      ref={sectionRef}
      className={`logo-grid-wrapper logo-wall--pt-sm logo-wall--pb-sm${logoWallIntro ? " has-intro" : ""}`}
    >
      <div className="logo-grid-window">
        {logoWallIntro ? (
          <div ref={introRef} className="logo-wall-intro">
            <h2 className="title-si">{logoWallIntro}</h2>
          </div>
        ) : null}
        <div className="logo-grid">
          {logoWallLogos.map((logo, index) => (
            <div
              key={`${logo.src}-${index}`}
              ref={(node) => {
                logoRefs.current[index] = node;
              }}
              className="logo"
              style={{ zIndex: logoWallLogos.length - index }}
            >
              <LogoCellDecorators />
              <LogoBorderCell>
                <LogoImage logo={logo} />
              </LogoBorderCell>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
