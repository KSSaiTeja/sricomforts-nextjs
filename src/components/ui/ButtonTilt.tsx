"use client";

import Link from "next/link";
import {
  type CSSProperties,
  type MouseEventHandler,
  useEffect,
  useRef,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePreloader } from "@/components/preloader/PreloaderProvider";
import { registerGsap } from "@/lib/gsap/register";
import { wrapTextWithChars } from "@/lib/text/splitChars";

type ButtonTiltProps = {
  href: string;
  className?: string;
  style?: CSSProperties;
  finalColor?: string;
  tempColor?: string;
  scrollTriggerContainer?: () => HTMLElement | null;
  children: string;
};

function runHoverFlash(
  chars: HTMLElement[],
  tempColor: string,
  finalColor: string,
  evenOnly: boolean,
) {
  const timeline = gsap.timeline();
  const targets = evenOnly
    ? chars.filter((_, index) => index % 2 === 0)
    : chars.filter((_, index) => index % 2 === 1).reverse();

  targets.forEach((char, index) => {
    const start = index * 0.025;
    timeline.set(char, { backgroundColor: tempColor, color: tempColor }, start);
    timeline.set(
      char,
      { backgroundColor: "transparent", color: finalColor },
      start + 0.2,
    );
  });

  return timeline;
}

export function ButtonTilt({
  href,
  className,
  style,
  finalColor = "#ffffff",
  tempColor = "var(--color-brand-accent)",
  scrollTriggerContainer,
  children,
}: ButtonTiltProps) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const charsRef = useRef<HTMLElement[]>([]);
  const scrollTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const hoverTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const { isLoaded } = usePreloader();

  useEffect(() => {
    if (!isLoaded) return;

    const link = linkRef.current;
    if (!link || link.querySelector(".--char")) return;

    registerGsap();

    const lineWrapper = document.createElement("span");
    lineWrapper.className = "--line";
    lineWrapper.textContent = children;
    link.textContent = "";
    link.appendChild(lineWrapper);

    charsRef.current = wrapTextWithChars(lineWrapper, "--char");
    gsap.set(charsRef.current, { autoAlpha: 0 });

    const triggerEl = scrollTriggerContainer?.() ?? link;

    scrollTimelineRef.current = gsap.timeline({
      scrollTrigger: {
        trigger: triggerEl,
        start: "top 85%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    charsRef.current.forEach((char, index) => {
      scrollTimelineRef.current?.to(char, { autoAlpha: 1, duration: 0 }, index * 0.05);

      if (index % 2 === 0) {
        scrollTimelineRef.current?.fromTo(
          char,
          { backgroundColor: tempColor, color: tempColor },
          {
            backgroundColor: "transparent",
            color: finalColor,
            duration: 0.02,
            ease: "power2.out",
          },
          index * 0.05 + 0.1,
        );
      }
    });

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      scrollTimelineRef.current?.scrollTrigger?.kill();
      scrollTimelineRef.current?.kill();
      scrollTimelineRef.current = null;
    };
  }, [children, finalColor, isLoaded, scrollTriggerContainer, tempColor]);

  const handleMouseEnter: MouseEventHandler<HTMLAnchorElement> = () => {
    if (!charsRef.current.length || scrollTimelineRef.current?.isActive()) return;

    hoverTimelineRef.current?.kill();
    hoverTimelineRef.current = runHoverFlash(
      charsRef.current,
      tempColor,
      finalColor,
      true,
    );
  };

  const handleMouseLeave: MouseEventHandler<HTMLAnchorElement> = () => {
    if (!charsRef.current.length || scrollTimelineRef.current?.isActive()) return;

    hoverTimelineRef.current?.kill();
    hoverTimelineRef.current = runHoverFlash(
      charsRef.current,
      tempColor,
      finalColor,
      false,
    );
  };

  return (
    <Link
      ref={linkRef}
      href={href}
      className={className}
      style={style}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </Link>
  );
}
