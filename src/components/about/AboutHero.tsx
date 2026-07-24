"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type AboutHeroData } from "@/data/about";
import { registerGsap } from "@/lib/gsap/register";
import styles from "./about-hero.module.css";

type AboutHeroProps = {
  data: AboutHeroData;
};

function HeroRings() {
  return (
    <div className={styles.background} aria-hidden>
      <svg
        className={styles.ringsLandscape}
        width="100%"
        viewBox="0 0 1778 1778"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle opacity="0.2" cx="889" cy="889" r="888" stroke="currentColor" strokeDasharray="10 10" />
        <circle opacity="0.16" cx="890" cy="889" r="781" stroke="currentColor" />
        <circle opacity="0.18" cx="890" cy="889" r="533" stroke="currentColor" strokeWidth="0.5" />
        <circle
          opacity="0.18"
          cx="880.644"
          cy="892.327"
          r="442"
          transform="rotate(-19.9798 880.644 892.327)"
          stroke="currentColor"
          strokeDasharray="10 10"
        />
        <circle opacity="0.12" cx="890" cy="889" r="335" stroke="currentColor" strokeDasharray="10 10" />
        <circle cx="1299.46" cy="750.698" r="7" className={styles.ringDot} />
        <circle cx="555.502" cy="1195.68" r="7" className={styles.ringDot} />
        <circle cx="506.961" cy="654.708" r="7" className={styles.ringDot} />
      </svg>

      <svg
        className={styles.ringsPortrait}
        width="100%"
        viewBox="0 0 878 878"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          opacity="0.2"
          cx="439"
          cy="439"
          r="438"
          stroke="currentColor"
          strokeWidth="0.7"
          strokeDasharray="6.94 6.94"
        />
        <circle opacity="0.14" cx="439.4" cy="439" r="263" stroke="currentColor" strokeWidth="0.35" />
        <circle
          opacity="0.16"
          cx="435.38"
          cy="440.46"
          r="193"
          transform="rotate(-19.9798 435.38 440.46)"
          stroke="currentColor"
          strokeWidth="0.7"
          strokeDasharray="6.94 6.94"
        />
        <circle cx="618.493" cy="378.537" r="3.5" className={styles.ringDot} />
        <circle cx="293.22" cy="573.094" r="3.5" className={styles.ringDot} />
        <circle cx="271.997" cy="336.567" r="3.5" className={styles.ringDot} />
      </svg>
    </div>
  );
}

type FrameMetrics = {
  x: number;
  y: number;
  width: number;
  height: number;
  radius: number;
};

function readMetrics(slot: HTMLElement, sticky: HTMLElement): FrameMetrics {
  const slotRect = slot.getBoundingClientRect();
  const stickyRect = sticky.getBoundingClientRect();
  const styles = getComputedStyle(slot);
  return {
    x: slotRect.left - stickyRect.left,
    y: slotRect.top - stickyRect.top,
    width: slotRect.width,
    height: slotRect.height,
    radius: parseFloat(styles.borderRadius) || 18,
  };
}

export function AboutHero({ data }: AboutHeroProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const slotRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const fullTitle = `${data.titleLead} ${data.titleMid} ${data.titleHighlight}`;

  useLayoutEffect(() => {
    const track = trackRef.current;
    const sticky = stickyRef.current;
    const content = contentRef.current;
    const slot = slotRef.current;
    const frame = frameRef.current;
    const video = videoRef.current;
    if (!track || !sticky || !content || !slot || !frame || !video) return;

    registerGsap();

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const desktopQuery = window.matchMedia("(min-width: 1024px)");

    let isPlaying = false;
    let resizeTimer = 0;

    const setPlaying = (next: boolean) => {
      if (next === isPlaying) return;
      isPlaying = next;
      frame.dataset.playing = next ? "true" : "false";

      if (next) {
        const play = video.play();
        if (play && typeof play.catch === "function") play.catch(() => undefined);
      } else {
        video.pause();
        if (video.currentTime > 0.35) video.currentTime = 0;
      }
    };

    const applyFrame = (metrics: FrameMetrics) => {
      gsap.set(frame, {
        x: metrics.x,
        y: metrics.y,
        width: metrics.width,
        height: metrics.height,
        borderRadius: metrics.radius,
      });
    };

    const fullMetrics = (): FrameMetrics => ({
      x: 0,
      y: 0,
      width: sticky.clientWidth,
      height: sticky.clientHeight,
      radius: 0,
    });

    let pinTrigger: ScrollTrigger | null = null;

    const teardown = () => {
      pinTrigger?.kill();
      pinTrigger = null;
      frame.dataset.ready = "false";
      gsap.set(frame, { clearProps: "all" });
      gsap.set(content, { clearProps: "opacity,visibility" });
      setPlaying(false);
    };

    const setup = () => {
      teardown();

      /* Mobile: in-flow large video, autoplay — no pin enlarge */
      if (!desktopQuery.matches) {
        gsap.set(frame, { clearProps: "all" });
        frame.dataset.ready = "true";
        setPlaying(true);
        return;
      }

      /* Resting state = screenshot composition (image sits in the title line).
         Scroll is the only motion: frame expands to fill the sticky panel. */
      const start = readMetrics(slot, sticky);
      applyFrame(start);
      frame.dataset.ready = "true";
      setPlaying(false);

      if (reduceMotion) {
        applyFrame(fullMetrics());
        setPlaying(true);
        gsap.set(content, { autoAlpha: 0 });
        return;
      }

      const end = fullMetrics();

      pinTrigger = ScrollTrigger.create({
        trigger: track,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const p = self.progress;
          /* Hold starting state briefly, then expand */
          const expand = gsap.utils.clamp(0, 1, (p - 0.06) / 0.72);
          const eased = expand;

          gsap.set(frame, {
            x: gsap.utils.interpolate(start.x, end.x, eased),
            y: gsap.utils.interpolate(start.y, end.y, eased),
            width: gsap.utils.interpolate(start.width, end.width, eased),
            height: gsap.utils.interpolate(start.height, end.height, eased),
            borderRadius: gsap.utils.interpolate(start.radius, end.radius, eased),
          });

          const fade = gsap.utils.clamp(0, 1, (expand - 0.15) / 0.45);
          gsap.set(content, { autoAlpha: 1 - fade });

          setPlaying(expand > 0.08);
        },
        onRefresh: () => {
          Object.assign(start, readMetrics(slot, sticky));
          Object.assign(end, fullMetrics());
        },
      });
    };

    const ctx = gsap.context(() => {
      setup();
    }, track);

    const onChange = () => {
      window.clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        setup();
        ScrollTrigger.refresh();
      }, 180);
    };

    desktopQuery.addEventListener("change", onChange);
    window.addEventListener("resize", onChange);
    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      desktopQuery.removeEventListener("change", onChange);
      window.removeEventListener("resize", onChange);
      window.clearTimeout(resizeTimer);
      teardown();
      ctx.revert();
    };
  }, []);

  return (
    <div ref={trackRef} className={styles.track}>
      <section
        ref={stickyRef}
        id={data.sectionId}
        className={styles.sticky}
        aria-labelledby="about-hero-title"
        data-motion-ignore
      >
        <HeroRings />

        <div className={styles.container}>
          <div ref={contentRef} className={styles.content}>
            <p className={styles.tag}>{data.tag}</p>

            <h2 id="about-hero-title" className={styles.heading}>
              <span className={styles.srOnly}>{fullTitle}</span>

              <span className={styles.titleMobile} aria-hidden="true">
                {data.titleLead} {data.titleMid}{" "}
                <em className={styles.highlight}>{data.titleHighlight}</em>
              </span>

              <span className={styles.titleLead} aria-hidden="true">
                {data.titleLead}
              </span>

              <span className={styles.titleInline} aria-hidden="true">
                <span className={styles.titleMid}>{data.titleMid}</span>
                {/* In-flow poster keeps the screenshot composition from first paint;
                    absolute video frame overlays + expands on scroll. */}
                <div ref={slotRef} className={styles.videoSlot}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    className={styles.slotPoster}
                    src={data.media.poster}
                    alt=""
                    decoding="async"
                  />
                </div>
                <em className={styles.highlight}>{data.titleHighlight}</em>
              </span>
            </h2>

            <p className={`body-4 ${styles.body}`}>{data.body}</p>
          </div>
        </div>

        <div
          ref={frameRef}
          className={styles.videoFrame}
          data-playing="false"
          data-ready="false"
        >
          <video
            ref={videoRef}
            className={styles.video}
            src={data.media.src}
            poster={data.media.poster}
            muted
            loop
            playsInline
            preload="auto"
            aria-label={data.media.alt}
          />
        </div>
      </section>
    </div>
  );
}
