"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { LOGO_LOCKUP } from "@/components/brand/logoDimensions";
import { registerGsap } from "@/lib/gsap/register";
import { BRAND_NAME } from "@/lib/brand";
import styles from "./preloader.module.css";

export type AnimatedLogoHandle = {
  play: () => gsap.core.Timeline;
};

export const AnimatedLogo = forwardRef<AnimatedLogoHandle>(function AnimatedLogo(_, ref) {
  const rootRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
  }, []);

  useImperativeHandle(ref, () => ({
    play: () => {
      registerGsap();

      const root = rootRef.current;
      const logo = logoRef.current;

      if (!root || !logo) {
        return gsap.timeline();
      }

      const timeline = gsap.timeline();

      timeline.set(root, { autoAlpha: 1 }, 0);
      timeline.fromTo(
        logo,
        { scale: 0.88, autoAlpha: 0 },
        {
          scale: 1,
          autoAlpha: 1,
          ease: "custom.fastInOut",
          duration: 1,
          transformOrigin: "center center",
        },
        0,
      );

      return timeline;
    },
  }));

  return (
    <div ref={rootRef} className={styles.animatedLogo} aria-label={BRAND_NAME}>
      <div ref={logoRef} className={styles.logoLockup}>
        <Image
          src="/assets/brand/sricomforts-logo.png"
          alt=""
          width={LOGO_LOCKUP.full.width}
          height={LOGO_LOCKUP.full.height}
          className={styles.logoImage}
          priority
        />
      </div>
    </div>
  );
});
