"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePreloader } from "@/components/preloader/PreloaderProvider";
import { registerGsap } from "@/lib/gsap/register";
import { getHeroFrameUrls, heroTitles } from "@/data/homepage";
import { useIsLargeViewport } from "@/hooks/useMediaQuery";
import { useSmoothScroll } from "@/providers/SmoothScrollProvider";
import { HeroScrollContent } from "@/components/home/HeroScrollContent";
import { VideoSequence } from "@/components/home/VideoSequence";
import styles from "./video-carousel.module.css";

export function VideoCarousel() {
  const { isLoaded } = usePreloader();
  const { lenis } = useSmoothScroll();
  const isDesktop = useIsLargeViewport();
  const [progress, setProgress] = useState(0);
  const scrollProgressRef = useRef(0);
  const progressRafRef = useRef<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const backgroundWrapperRef = useRef<HTMLDivElement>(null);

  const frames = useMemo(() => getHeroFrameUrls(isDesktop), [isDesktop]);

  useEffect(() => {
    if (!isLoaded || !lenis || !contentRef.current) return;

    registerGsap();

    const triggers: ScrollTrigger[] = [];

    triggers.push(
      ScrollTrigger.create({
        trigger: contentRef.current,
        start: "top top",
        end: "bottom bottom",
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          scrollProgressRef.current = self.progress;
          if (progressRafRef.current === null) {
            progressRafRef.current = requestAnimationFrame(() => {
              setProgress(scrollProgressRef.current);
              progressRafRef.current = null;
            });
          }
        },
      }),
    );

    if (sectionRef.current && backgroundWrapperRef.current) {
      triggers.push(
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "bottom bottom",
          end: "bottom top",
          scrub: true,
          invalidateOnRefresh: true,
          animation: gsap.fromTo(
            backgroundWrapperRef.current,
            { yPercent: 0 },
            { yPercent: 50, ease: "none", duration: 1 },
          ),
        }),
      );
    }

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      if (progressRafRef.current !== null) {
        cancelAnimationFrame(progressRafRef.current);
      }
      triggers.forEach((trigger) => trigger.kill());
    };
  }, [isLoaded, lenis, isDesktop]);

  return (
    <section ref={sectionRef} className={styles.videoCarousel}>
      <div className={styles.wrapper}>
        <div className={styles.videoSequenceScroll}>
          {!isDesktop ? <ScrollIndicatorMobile /> : null}
          {isDesktop ? <ScrollIndicatorDesktop /> : null}
          <div className={styles.videoSequenceBackground}>
            <div ref={backgroundWrapperRef} className={styles.sequenceBackgroundWrapper}>
              <VideoSequence
                key={isDesktop ? "desktop" : "mobile"}
                frames={frames}
                progress={progress}
                scrollProgressRef={scrollProgressRef}
                fitTop={50}
                fitLeft={50}
              />
            </div>
          </div>
          <div ref={contentRef} className={styles.contentSizer} />
        </div>
      </div>
      <HeroScrollContent items={heroTitles} progress={progress} />
    </section>
  );
}

function ScrollIndicatorDesktop() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const dampedRef = useRef({ x: 0, y: 0 });
  const offsetRef = useRef(0);
  const visibleRef = useRef(true);

  useEffect(() => {
    registerGsap();

    const container = containerRef.current;
    const text = textRef.current;
    if (!container || !text) return;

    const chars = text.querySelectorAll(`.${styles.indicatorChar}`);
    offsetRef.current = container.offsetWidth / 5;

    const onPointerMove = (event: PointerEvent) => {
      mouseRef.current.x = event.clientX;
      mouseRef.current.y = event.clientY;
      gsap.to(container, { autoAlpha: 1, duration: 1.4, ease: "expo.out" });
    };

    const onTick = () => {
      if (!visibleRef.current || !container) return;

      dampedRef.current.x += (mouseRef.current.x - dampedRef.current.x) * 0.08;
      dampedRef.current.y += (mouseRef.current.y - dampedRef.current.y) * 0.08;
      container.style.transform = `translate(${dampedRef.current.x + offsetRef.current}px, ${dampedRef.current.y}px)`;
    };

    const colorTimeline = gsap.timeline({ repeat: -1, repeatDelay: 0.3 });
    if (chars.length) {
      colorTimeline.to(chars, { color: "gray", stagger: 0.02, duration: 0.8 });
      colorTimeline.to(chars, { color: "white", stagger: 0.02, duration: 0.8 }, 0.8);
    }

    const fadeTrigger = ScrollTrigger.create({
      start: "top top",
      end: "top+=500",
      scrub: true,
      onEnter: () => {
        visibleRef.current = true;
      },
      onEnterBack: () => {
        visibleRef.current = true;
      },
      onLeave: () => {
        visibleRef.current = false;
      },
      onUpdate: (self) => {
        gsap.to(chars, {
          opacity: 1 - self.progress,
          duration: 0.4,
          ease: "expo.out",
          stagger: 0.02,
        });
      },
    });

    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!media.matches) return undefined;

    gsap.ticker.add(onTick);
    window.addEventListener("pointermove", onPointerMove);

    const onResize = () => {
      offsetRef.current = container.offsetWidth / 5;
    };
    window.addEventListener("resize", onResize);

    return () => {
      gsap.ticker.remove(onTick);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("resize", onResize);
      colorTimeline.kill();
      fadeTrigger.kill();
    };
  }, []);

  return (
    <div ref={containerRef} className={styles.scrollIndicator}>
      <p ref={textRef}>
        {"Scroll to explore".split("").map((char, index) => (
          <span key={`${char}-${index}`} className={styles.indicatorChar}>
            {char === " " ? "\u00a0" : char}
          </span>
        ))}
      </p>
    </div>
  );
}

function ScrollIndicatorMobile() {
  const { scroll } = useSmoothScroll();
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLSpanElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    if (containerRef.current) gsap.set(containerRef.current, { autoAlpha: 1 });

    let timeline: gsap.core.Timeline | null = null;

    if (innerRef.current && trackRef.current) {
      timeline = gsap.timeline({ repeat: -1, repeatDelay: 0.3, defaults: { ease: "expo.out", duration: 1.2 } });
      timeline.to(innerRef.current, {
        y: () =>
          trackRef.current && innerRef.current
            ? trackRef.current.offsetHeight - innerRef.current.offsetHeight
            : 0,
      });
      timeline.to(innerRef.current, { y: 0 });
    }

    return () => {
      timeline?.kill();
    };
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;
    const visible = scroll <= 50;
    gsap.to(containerRef.current, {
      opacity: visible ? 1 : 0,
      duration: 0.4,
    });
  }, [scroll]);

  return (
    <div ref={containerRef} className={styles.scrollIndicatorMobile}>
      <span ref={trackRef} className={styles.indicator}>
        <div ref={innerRef} className={styles.indicatorInner} />
      </span>
      <p>SCROLL TO EXPLORE</p>
    </div>
  );
}
