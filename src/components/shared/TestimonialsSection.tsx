"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import { registerGsap } from "@/lib/gsap/register";
import {
  testimonials as defaultTestimonials,
  testimonialsSection,
  type Testimonial,
} from "@/data/testimonials";
import styles from "./testimonials.module.css";

const AUTOPLAY_MS = 5000;
const LOOP_COPIES = 3;

type TestimonialsSectionProps = {
  items?: Testimonial[];
};

type LoopedItem = Testimonial & {
  loopKey: string;
  sourceIndex: number;
};

function StarIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path d="M10 1.5l2.35 5.3 5.75.52-4.35 3.78 1.3 5.6L10 13.9l-4.95 2.8 1.3-5.6L1.9 7.32l5.75-.52L10 1.5z" />
    </svg>
  );
}

function circularDistance(a: number, b: number, length: number) {
  const raw = Math.abs(a - b) % length;
  return Math.min(raw, length - raw);
}

export function TestimonialsSection({
  items = defaultTestimonials,
}: TestimonialsSectionProps) {
  const count = items.length;
  const middleStart = count;

  const loopedItems = useMemo<LoopedItem[]>(
    () =>
      Array.from({ length: LOOP_COPIES }, (_, copy) =>
        items.map((item, sourceIndex) => ({
          ...item,
          sourceIndex,
          loopKey: `${copy}-${item.id}`,
        })),
      ).flat(),
    [items],
  );

  const [loopIndex, setLoopIndex] = useState(middleStart);
  const [paused, setPaused] = useState(false);

  const sectionRef = useRef<HTMLElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLElement>(null);
  const thumbsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const progressRef = useRef<HTMLSpanElement | null>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLParagraphElement>(null);
  const authorRef = useRef<HTMLElement>(null);
  const isFirstRender = useRef(true);
  const loopIndexRef = useRef(loopIndex);
  const progressTweenRef = useRef<gsap.core.Tween | null>(null);
  const isJumpingRef = useRef(false);

  loopIndexRef.current = loopIndex;

  const activeSourceIndex = count ? ((loopIndex % count) + count) % count : 0;
  const active = items[activeSourceIndex];

  const normalizeLoopIndex = useCallback(
    (index: number) => {
      if (!count) return middleStart;
      let next = index;
      if (next >= count * 2) next -= count;
      if (next < count) next += count;
      return next;
    },
    [count, middleStart],
  );

  const centerTrack = useCallback((index: number, animate: boolean) => {
    registerGsap();
    const rail = railRef.current;
    const track = trackRef.current;
    const thumb = thumbsRef.current[index];
    if (!rail || !track || !thumb) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    const target = isDesktop
      ? {
          y: rail.clientHeight / 2 - (thumb.offsetTop + thumb.offsetHeight / 2),
          x: 0,
        }
      : {
          x: rail.clientWidth / 2 - (thumb.offsetLeft + thumb.offsetWidth / 2),
          y: 0,
        };

    try {
      gsap.killTweensOf(track);
      if (!animate || reduceMotion) {
        gsap.set(track, target);
        return;
      }
      gsap.to(track, {
        ...target,
        duration: 0.9,
        ease: "power3.out",
        overwrite: "auto",
      });
    } catch {
      gsap.set(track, target);
    }
  }, []);

  const goToSource = useCallback(
    (sourceIndex: number) => {
      if (!count) return;
      const current = loopIndexRef.current;
      const currentSource = ((current % count) + count) % count;
      let delta = sourceIndex - currentSource;
      if (delta > count / 2) delta -= count;
      if (delta < -count / 2) delta += count;
      setLoopIndex(current + delta);
    },
    [count],
  );

  const goNext = useCallback(() => {
    setLoopIndex((current) => current + 1);
  }, []);

  const goPrev = useCallback(() => {
    setLoopIndex((current) => current - 1);
  }, []);

  /* Keep rail height locked to the quote card — images only fill card height */
  useLayoutEffect(() => {
    const rail = railRef.current;
    const card = cardRef.current;
    if (!rail || !card || typeof ResizeObserver === "undefined") return;

    const sync = () => {
      const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
      if (isDesktop) {
        const height = Math.round(card.getBoundingClientRect().height);
        rail.style.height = `${height}px`;
        rail.style.maxHeight = `${height}px`;
      } else {
        rail.style.height = "";
        rail.style.maxHeight = "";
      }
      centerTrack(loopIndexRef.current, false);
    };

    sync();
    const observer = new ResizeObserver(sync);
    observer.observe(card);
    window.addEventListener("resize", sync);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", sync);
      rail.style.height = "";
      rail.style.maxHeight = "";
    };
  }, [centerTrack, active?.id]);

  /* Slide track + seamless wrap */
  useLayoutEffect(() => {
    if (isJumpingRef.current) {
      isJumpingRef.current = false;
      centerTrack(loopIndex, false);
      return;
    }

    centerTrack(loopIndex, !isFirstRender.current);

    if (!count) return;
    if (loopIndex >= count * 2 || loopIndex < count) {
      const wrapped = normalizeLoopIndex(loopIndex);
      if (wrapped === loopIndex) return;
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const delay = reduceMotion ? 0 : 920;
      const timer = window.setTimeout(() => {
        isJumpingRef.current = true;
        setLoopIndex(wrapped);
      }, delay);
      return () => window.clearTimeout(timer);
    }
  }, [loopIndex, centerTrack, count, normalizeLoopIndex]);

  /* Quote content entrance */
  useLayoutEffect(() => {
    registerGsap();
    const targets = [headlineRef.current, bodyRef.current, authorRef.current].filter(
      Boolean,
    ) as HTMLElement[];
    if (!targets.length) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (isFirstRender.current) {
      isFirstRender.current = false;
      gsap.set(targets, { opacity: 1, y: 0 });
      return;
    }

    if (reduceMotion) {
      gsap.set(targets, { opacity: 1, y: 0 });
      return;
    }

    try {
      const tween = gsap.fromTo(
        targets,
        { opacity: 0, y: 22 },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.07,
          delay: 0.08,
          ease: "power3.out",
        },
      );
      return () => {
        tween.kill();
      };
    } catch {
      gsap.set(targets, { opacity: 1, y: 0 });
    }
  }, [activeSourceIndex]);

  /* Autoplay: timer is source of truth; progress bar is visual only */
  useEffect(() => {
    registerGsap();
    progressTweenRef.current?.kill();
    progressTweenRef.current = null;

    if (paused || !count) return;

    const bar = progressRef.current;
    if (bar) {
      gsap.set(bar, { scaleX: 0 });
      progressTweenRef.current = gsap.to(bar, {
        scaleX: 1,
        duration: AUTOPLAY_MS / 1000,
        ease: "none",
      });
    }

    const timer = window.setTimeout(() => {
      goNext();
    }, AUTOPLAY_MS);

    return () => {
      window.clearTimeout(timer);
      progressTweenRef.current?.kill();
      progressTweenRef.current = null;
    };
  }, [activeSourceIndex, goNext, paused, count]);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setPaused(!entry.isIntersecting);
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  if (!active || !count) return null;

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-labelledby="testimonials-heading"
    >
      <div className={styles.inner}>
        <header className={styles.header}>
          <p className={`${styles.label} label label-5`}>{testimonialsSection.label}</p>
          <h2
            id="testimonials-heading"
            className={`${styles.title} title-h2`}
            data-motion-title
          >
            {testimonialsSection.title}
          </h2>
          <p className={styles.subtitle}>{testimonialsSection.subtitle}</p>
        </header>

        <div className={styles.stage} data-motion-item>
          <div className={styles.railShell}>
            <div
              ref={railRef}
              className={styles.rail}
              role="tablist"
              aria-label="Client testimonials"
            >
              <div ref={trackRef} className={styles.track}>
                {loopedItems.map((item, index) => {
                  const isActive = index === loopIndex;
                  const distance = circularDistance(
                    item.sourceIndex,
                    activeSourceIndex,
                    count,
                  );
                  const stateClass = isActive
                    ? styles.thumbActive
                    : distance === 1
                      ? styles.thumbNeighbor
                      : styles.thumbDistant;

                  return (
                    <button
                      key={item.loopKey}
                      ref={(node) => {
                        thumbsRef.current[index] = node;
                      }}
                      type="button"
                      role="tab"
                      id={
                        item.sourceIndex === activeSourceIndex && isActive
                          ? `testimonial-tab-${item.id}`
                          : undefined
                      }
                      aria-selected={isActive}
                      aria-controls="testimonial-panel"
                      tabIndex={isActive ? 0 : -1}
                      className={`${styles.thumb} ${stateClass}`}
                      onClick={() => goToSource(item.sourceIndex)}
                      onKeyDown={(event) => {
                        if (event.key === "ArrowDown" || event.key === "ArrowRight") {
                          event.preventDefault();
                          goNext();
                        } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
                          event.preventDefault();
                          goPrev();
                        }
                      }}
                    >
                      <Image
                        src={item.image}
                        alt={item.imageAlt}
                        fill
                        sizes="140px"
                        className={styles.thumbImage}
                        priority={index >= middleStart && index < middleStart + 2}
                      />
                    </button>
                  );
                })}
              </div>
            </div>
            <span
              ref={progressRef}
              className={styles.progress}
              aria-hidden="true"
            />
          </div>

          <article
            ref={cardRef}
            id="testimonial-panel"
            role="tabpanel"
            aria-labelledby={`testimonial-tab-${active.id}`}
            className={styles.card}
          >
            <span className={styles.quoteMark} aria-hidden="true">
              &ldquo;
            </span>
            <div className={styles.content}>
              <h3 ref={headlineRef} className={styles.headline}>
                {active.headline}
              </h3>
              <p ref={bodyRef} className={styles.body}>
                {active.body}
              </p>
              <footer ref={authorRef} className={styles.footer}>
                <div className={styles.author}>
                  <cite className={styles.name}>{active.name}</cite>
                  <span className={styles.meta}>
                    {active.role} · {active.company}
                  </span>
                </div>
                <div className={styles.stars} aria-label={`${active.rating} out of 5 stars`}>
                  {Array.from({ length: active.rating }, (_, star) => (
                    <StarIcon key={star} />
                  ))}
                </div>
              </footer>
            </div>
          </article>
        </div>

        <div className={styles.nav} aria-hidden="true" data-motion-item>
          {items.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={`${styles.dot}${index === activeSourceIndex ? ` ${styles.dotActive}` : ""}`}
              tabIndex={-1}
              onClick={() => goToSource(index)}
            />
          ))}
        </div>

        <div className={styles.cta} data-motion-item>
          <p className={styles.ctaPrompt}>{testimonialsSection.ctaPrompt}</p>
          <a className={styles.ctaButton} href={testimonialsSection.ctaHref}>
            {testimonialsSection.ctaLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
