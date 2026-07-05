"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { AnimatedLogo, type AnimatedLogoHandle } from "@/components/preloader/AnimatedLogo";
import { PathBackground } from "@/components/preloader/PathBackground";
import { SvgMask, type SvgMaskHandle } from "@/components/preloader/SvgMask";
import { registerGsap } from "@/lib/gsap/register";
import { waitForHeroFrames as loadHeroFramesUntilReady } from "@/lib/canvas/createVideoSequence";
import { getHeroFrameUrls } from "@/data/homepage";
import { useSvh } from "@/hooks/useSvh";
import { createNotch, NotchDirection } from "@/types/notch";
import styles from "./preloader.module.css";

type AppPreloaderProps = {
  onLoaded: () => void;
  onAnimate?: () => void;
  waitForHeroFrames?: boolean;
};

function getNotchOffset() {
  return window.matchMedia("(min-width: 1024px)").matches ? 40 : 20;
}

export function AppPreloader({ onLoaded, onAnimate, waitForHeroFrames = false }: AppPreloaderProps) {
  useSvh();

  const overlayRef = useRef<HTMLDivElement>(null);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const fullWrapperTopRef = useRef<HTMLDivElement>(null);
  const fullWrapperBottomRef = useRef<HTMLDivElement>(null);
  const backgroundTopRef = useRef<HTMLDivElement>(null);
  const backgroundBottomRef = useRef<HTMLDivElement>(null);
  const logoTopRef = useRef<AnimatedLogoHandle>(null);
  const logoBottomRef = useRef<AnimatedLogoHandle>(null);
  const topMaskRef = useRef<SvgMaskHandle>(null);
  const bottomMaskRef = useRef<SvgMaskHandle>(null);

  const [topNotches] = useState(() => [createNotch(NotchDirection.bottom)]);
  const [bottomNotches] = useState(() => [createNotch(NotchDirection.top)]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      onLoaded();
      return;
    }

    registerGsap();
    const notchOffset = getNotchOffset();
    const topNotch = topNotches[0];
    const bottomNotch = bottomNotches[0];

    const framesReady = waitForHeroFrames
      ? loadHeroFramesUntilReady(
          getHeroFrameUrls(window.matchMedia("(min-width: 1024px)").matches),
          0.85,
          25_000,
        )
      : Promise.resolve();

    const syncMaskPaths = () => {
      topMaskRef.current?.updatePath([topNotch]);
      bottomMaskRef.current?.updatePath([bottomNotch]);
    };

    const context = gsap.context(() => {
      const timeline = gsap.timeline({ delay: 0.2 });

      timeline.add(logoTopRef.current?.play() ?? gsap.timeline(), 0);
      timeline.add(logoBottomRef.current?.play() ?? gsap.timeline(), 0);

      timeline.fromTo(
        [backgroundTopRef.current, backgroundBottomRef.current],
        { scale: 2, opacity: 0, rotate: 20 },
        { scale: 1, opacity: 1, rotate: 0, ease: "expo.out", duration: 2 },
        "<",
      );

      timeline.fromTo(
        topRef.current,
        { yPercent: 0 },
        { yPercent: -100, ease: "expo.inOut", duration: 1.2 },
      );

      timeline.fromTo(
        bottomRef.current,
        { yPercent: 0 },
        { yPercent: 100, ease: "expo.inOut", duration: 1.2 },
        "<",
      );

      timeline.fromTo(
        fullWrapperTopRef.current,
        { yPercent: 0 },
        { yPercent: 50, ease: "expo.inOut", duration: 1.2 },
        "<",
      );

      timeline.to(
        overlayRef.current,
        { opacity: 0, ease: "power1.in", duration: 0.8 },
        "<",
      );

      timeline.call(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
      }, undefined, "<");

      timeline.fromTo(
        fullWrapperBottomRef.current,
        { yPercent: 0 },
        { yPercent: -50, ease: "expo.inOut", duration: 1.2 },
        "<",
      );

      timeline.fromTo(
        [bottomNotch, topNotch],
        { offset: 0, size: 0.5 },
        {
          offset: notchOffset,
          size: 0.9,
          ease: "expo.out",
          duration: 0.6,
          onUpdate: syncMaskPaths,
        },
        "<",
      );

      timeline.to(
        [bottomNotch, topNotch],
        {
          offset: -notchOffset,
          ease: "expo.out",
          duration: 0.6,
          onUpdate: syncMaskPaths,
        },
        "<0.6",
      );

      timeline.call(() => {
        onAnimate?.();
      }, undefined, "<");

      timeline.call(() => {
        void framesReady.then(() => {
          onLoaded();
        });
      });
    });

    return () => context.revert();
  }, [bottomNotches, onAnimate, onLoaded, topNotches, waitForHeroFrames]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, []);

  return (
    <div
      className={styles.appLoader}
      aria-busy="true"
      aria-label="Loading Sri Comforts"
      role="status"
    >
      <div ref={overlayRef} className={styles.overlay} />
      <div className={styles.loader}>
        <div ref={topRef} className={styles.top}>
          <SvgMask ref={topMaskRef} useClip notches={topNotches}>
            <div className={styles.topMask}>
              <div ref={fullWrapperTopRef} className={styles.fullWrapper}>
                <div ref={backgroundTopRef} className={styles.backgroundWrapper}>
                  <PathBackground />
                </div>
                <div className={styles.logoWrapper}>
                  <AnimatedLogo ref={logoTopRef} />
                </div>
              </div>
            </div>
          </SvgMask>
        </div>

        <div ref={bottomRef} className={styles.bottom}>
          <SvgMask ref={bottomMaskRef} useClip notches={bottomNotches}>
            <div className={styles.bottomMask}>
              <div ref={fullWrapperBottomRef} className={styles.fullWrapper}>
                <div ref={backgroundBottomRef} className={styles.backgroundWrapper}>
                  <PathBackground />
                </div>
                <div className={styles.logoWrapper}>
                  <AnimatedLogo ref={logoBottomRef} />
                </div>
              </div>
            </div>
          </SvgMask>
        </div>
      </div>
    </div>
  );
}
