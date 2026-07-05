"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { registerGsap } from "@/lib/gsap/register";

export function CrossFlicker() {
  const verticalRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();

    const vertical = verticalRef.current;
    const horizontal = horizontalRef.current;
    if (!vertical || !horizontal) return;

    const timeline = gsap.timeline({ repeat: -1, delay: Math.random() * 2 });
    timeline.to(vertical, { scaleY: 0, duration: 2.5, ease: "expo.inOut" }, 0);
    timeline.to(vertical, { scaleY: 1, duration: 2.5, ease: "expo.inOut" }, 2.5);
    timeline.to(horizontal, { scaleX: 0, duration: 2.5, ease: "expo.inOut" }, 0);
    timeline.to(horizontal, { scaleX: 1, duration: 2.5, ease: "expo.inOut" }, 2.5);

    const media = window.matchMedia("(min-width: 1024px)");
    const onChange = () => {
      if (media.matches && horizontal.clientWidth === 0) {
        timeline.pause();
      } else {
        timeline.resume();
      }
    };

    media.addEventListener("change", onChange);
    onChange();

    return () => {
      media.removeEventListener("change", onChange);
      timeline.kill();
    };
  }, []);

  return (
    <div className="cross-flicker__wrapper">
      <div ref={verticalRef} className="vertical" />
      <div ref={horizontalRef} className="horizontal" />
    </div>
  );
}
