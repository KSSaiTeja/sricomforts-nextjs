"use client";

import { type CSSProperties, useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CrossFlicker } from "@/components/home/CrossFlicker";
import { LogoBorderCell } from "@/components/home/LogoBorderCell";
import { type AboutLogoGridData, type AboutLogoItem } from "@/data/about";
import { useIsLargeViewport } from "@/hooks/useMediaQuery";
import { registerGsap } from "@/lib/gsap/register";

type AboutLogoGridProps = {
  data: AboutLogoGridData;
};

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

function LogoImage({ logo }: { logo: AboutLogoItem }) {
  return (
    <picture
      className="image"
      style={{ "--logo-scale": (logo.scale ?? 100) / 100 } as CSSProperties}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={logo.src} alt={logo.alt ?? ""} decoding="async" loading="lazy" />
    </picture>
  );
}

function buildLogoSlots(logos: AboutLogoItem[], isDesktop: boolean) {
  const columns = isDesktop ? 5 : 2;
  const count = logos.length;
  const totalSlots = Math.ceil(count / columns) * columns;
  const offset = Math.floor(columns / 2) - Math.floor((count - 1) / 2);

  return Array.from({ length: totalSlots }, (_, index) => {
    if (count < columns && columns === 5) {
      if (index < offset || index >= offset + count) return null;
      return logos[index - offset];
    }

    if (index >= count) return null;
    return logos[index];
  });
}

export function AboutLogoGrid({ data }: AboutLogoGridProps) {
  const isDesktop = useIsLargeViewport();
  const sectionRef = useRef<HTMLElement>(null);
  const logoRefs = useRef<(HTMLDivElement | null)[]>([]);
  const slots = useMemo(() => buildLogoSlots(data.logos, isDesktop), [data.logos, isDesktop]);

  useEffect(() => {
    registerGsap();
    const section = sectionRef.current;
    if (!section) return;

    const trigger = ScrollTrigger.create({
      trigger: section,
      start: "20% 50%",
      toggleActions: "play none none reverse",
      onEnter: () => {
        logoRefs.current.forEach((logo, index) => {
          if (!logo) return;
          gsap.fromTo(
            logo,
            { opacity: 0.3 },
            { opacity: 1, duration: 2.4, delay: index * 0.1, ease: "expo.out" },
          );
        });
      },
      onLeaveBack: () => {
        logoRefs.current.forEach((logo) => {
          if (!logo) return;
          gsap.to(logo, { opacity: 0.3, duration: 0.6, ease: "expo.out" });
        });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <section ref={sectionRef} className="logo-grid-wrapper logo-grid-industry about-logo-grid">
      <div className="logo-grid">
        {slots.map((logo, index) => (
          <div
            key={logo?.src ?? `decorator-${index}`}
            ref={(node) => {
              logoRefs.current[index] = node;
            }}
            className={["logo", logo ? "" : "decorator__wrapper"].filter(Boolean).join(" ")}
            style={{ zIndex: slots.length - index }}
          >
            <LogoCellDecorators />
            {logo ? (
              <LogoBorderCell>
                <LogoImage logo={logo} />
              </LogoBorderCell>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
