"use client";

import {
  type CSSProperties,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PaddedCounter } from "@/components/home/PaddedCounter";
import { SvgMask, type SvgMaskHandle } from "@/components/preloader/SvgMask";
import { usePreloader } from "@/components/preloader/PreloaderProvider";
import { featuresSteps } from "@/data/homepage";
import { useIsLargeViewport } from "@/hooks/useMediaQuery";
import { registerGsap } from "@/lib/gsap/register";
import { useSmoothScroll } from "@/providers/SmoothScrollProvider";
import { wrapElementWithSplitChars } from "@/lib/text/splitChars";
import { createNotch, NotchDirection, type Notch } from "@/types/notch";

const NOTCH_SIZE = 0.4;
const ITEM_COUNT = featuresSteps.items.length;

type ItemPosition = {
  y: number;
  h: number;
};

function lerp(start: number, end: number, progress: number) {
  return start + (end - start) * progress;
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function interpolateProgress(value: number, start: number, end: number) {
  if (end === start) return 0;
  return clamp((value - start) / (end - start), 0, 1);
}

function easePow2Out(progress: number) {
  return 1 - (1 - progress) ** 2;
}

function notchPositionForIndex(index: number) {
  const progress = ITEM_COUNT <= 1 ? 0 : index / (ITEM_COUNT - 1);
  return lerp(NOTCH_SIZE / 2 + 0.1, 1 - NOTCH_SIZE / 2 - 0.1, progress);
}

function buildNotches(position: number, isDesktop: boolean): Notch[] {
  const notch = {
    size: NOTCH_SIZE,
    position,
    notchWidth: 0.9,
    radius: 36,
  };

  if (isDesktop) {
    return [
      createNotch(NotchDirection.left, {
        ...notch,
        offset: 30,
      }),
    ];
  }

  return [
    createNotch(NotchDirection.bottom, {
      ...notch,
      offset: -20,
    }),
  ];
}

function updateDesktopChars(splitRefs: HTMLSpanElement[][], progress: number) {
  splitRefs.forEach((chars, itemIndex) => {
    const itemProgress = clamp(progress - itemIndex, 0, 1);
    const threshold = itemProgress * chars.length;

    chars.forEach((char, charIndex) => {
      char.classList.toggle("show", threshold > charIndex);
    });
  });
}

function getSnapPoints(list: HTMLUListElement) {
  const paddingLeft = Number.parseInt(getComputedStyle(list).paddingLeft, 10) || 0;
  const paddingEnd =
    Number.parseInt(getComputedStyle(list).scrollPaddingInlineStart, 10) || paddingLeft;

  return Array.from(list.children).map((child) => {
    const element = child as HTMLElement;
    const align = getComputedStyle(element).scrollSnapAlign;

    if (align === "end") {
      return clamp(
        element.offsetLeft + element.offsetWidth - list.clientWidth + paddingEnd,
        0,
        list.scrollWidth - list.clientWidth,
      );
    }

    return clamp(element.offsetLeft - paddingLeft, 0, list.scrollWidth - list.clientWidth);
  });
}

function nearestSnapIndex(scrollLeft: number, snapPoints: number[]) {
  if (!snapPoints.length) return 0;

  let nearest = 0;
  let distance = Math.abs(scrollLeft - snapPoints[0]);

  snapPoints.forEach((point, index) => {
    const nextDistance = Math.abs(scrollLeft - point);
    if (nextDistance < distance) {
      nearest = index;
      distance = nextDistance;
    }
  });

  return nearest;
}

export function FeaturesSteps() {
  const { isLoaded } = usePreloader();
  const { lenis } = useSmoothScroll();
  const isDesktop = useIsLargeViewport();
  const innerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const scrollItemsRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const svgMaskRef = useRef<SvgMaskHandle>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);
  const labelRefs = useRef<(HTMLParagraphElement | null)[]>([]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const splitRefs = useRef<HTMLSpanElement[][]>([]);
  const itemPositionsRef = useRef<ItemPosition[]>([]);
  const snapPointsRef = useRef<number[]>([]);
  const odometerTweenRef = useRef<gsap.core.Tween | null>(null);
  const introActiveRef = useRef(false);
  const odometerProgressRef = useRef({ value: 0 });

  const [activeIndex, setActiveIndex] = useState(0);
  const [charProgress, setCharProgress] = useState(0);
  const [odometerProgress, setOdometerProgress] = useState(0);
  const [notchPosition, setNotchPosition] = useState(notchPositionForIndex(0));
  const notchPositionRef = useRef(notchPositionForIndex(0));
  const notches = useMemo(
    () => buildNotches(notchPosition, isDesktop),
    [notchPosition, isDesktop],
  );

  const updateNotchPosition = useCallback((position: number) => {
    notchPositionRef.current = position;
    svgMaskRef.current?.updatePath(buildNotches(position, isDesktop));
  }, [isDesktop]);

  const measureItemPositions = useCallback(() => {
    itemPositionsRef.current = itemRefs.current
      .filter(Boolean)
      .map((item) => ({
        y: item!.offsetTop,
        h: item!.offsetHeight,
      }));

    if (listRef.current) {
      snapPointsRef.current = getSnapPoints(listRef.current);
    }

    const odometer = headerRef.current?.querySelector(".odometer");
    const lastItem = itemRefs.current[ITEM_COUNT - 1];
    if (odometer instanceof HTMLElement && lastItem) {
      odometer.style.marginBottom = `calc(${lastItem.offsetHeight}px - var(--font-size) - min(2.396vw, 61.3333333333px) * 0.45)`;
    }
  }, []);

  const restartVideo = useCallback((index: number) => {
    const video = videoRefs.current[index];
    if (!video) return;
    video.currentTime = 0;
    void video.play().catch(() => undefined);
  }, []);

  const animateOdometerTo = useCallback((value: number) => {
    odometerTweenRef.current?.kill();
    odometerTweenRef.current = gsap.to(odometerProgressRef.current, {
      value,
      duration: 1,
      ease: "expo.out",
      onUpdate: () => setOdometerProgress(odometerProgressRef.current.value),
    });
  }, []);

  const goToIndex = useCallback(
    (nextIndex: number) => {
      const clamped = clamp(nextIndex, 0, ITEM_COUNT - 1);
      setActiveIndex(clamped);
      setNotchPosition(notchPositionForIndex(clamped));
      updateNotchPosition(notchPositionForIndex(clamped));
      animateOdometerTo(clamped);

      if (!isDesktop && listRef.current) {
        const snapPoint = snapPointsRef.current[clamped] ?? 0;
        listRef.current.scrollTo({ left: snapPoint, behavior: "smooth" });
      }
    },
    [animateOdometerTo, isDesktop, updateNotchPosition],
  );

  useEffect(() => {
    if (isLoaded) restartVideo(activeIndex);
  }, [activeIndex, isLoaded, restartVideo]);

  useEffect(() => {
    animateOdometerTo(activeIndex);
  }, [activeIndex, animateOdometerTo]);

  useEffect(() => {
    labelRefs.current.forEach((label, index) => {
      if (!label || splitRefs.current[index]?.length) return;

      const chars = wrapElementWithSplitChars(label);
      chars.forEach((char, charIndex) => {
        char.style.setProperty("--v-delay", `${Math.round(charIndex * 0.018 * 100) / 100}s`);
      });
      splitRefs.current[index] = chars;
    });

    measureItemPositions();
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, [measureItemPositions]);

  useEffect(() => {
    updateDesktopChars(splitRefs.current, charProgress);
  }, [charProgress]);

  useEffect(() => {
    if (!isLoaded || !lenis) return;

    registerGsap();
    measureItemPositions();

    const resizeObserver = new ResizeObserver(() => {
      measureItemPositions();
      ScrollTrigger.refresh();
    });

    if (listRef.current) resizeObserver.observe(listRef.current);
    if (scrollItemsRef.current) resizeObserver.observe(scrollItemsRef.current);
    if (innerRef.current) resizeObserver.observe(innerRef.current);

    const mm = gsap.matchMedia();
    const triggers: ScrollTrigger[] = [];

    mm.add(
      {
        isDesktop: "(min-width: 1024px)",
      },
      (context) => {
        if (!context.conditions?.isDesktop) return;

        updateNotchPosition(notchPositionRef.current);

        if (innerRef.current && headerRef.current) {
          triggers.push(
            ScrollTrigger.create({
              trigger: innerRef.current,
              start: "top bottom",
              end: "top 15%",
              scrub: true,
              onUpdate: ({ progress }) => {
                if (!headerRef.current) return;
                headerRef.current.style.transform = `translateY(${lerp(-10, 0, easePow2Out(progress))}rem)`;
              },
            }),
          );
        }

        if (scrollItemsRef.current && listRef.current) {
          triggers.push(
            ScrollTrigger.create({
              trigger: scrollItemsRef.current,
              start: "top 55%",
              end: "bottom 45%",
              scrub: 0,
              onUpdate: ({ progress }) => {
                const positions = itemPositionsRef.current;
                const totalHeight = listRef.current?.offsetHeight ?? 0;
                if (!positions.length || !totalHeight) return;

                const scrollY = progress * totalHeight;
                updateNotchPosition(
                  lerp(NOTCH_SIZE / 2 + 0.1, 1 - NOTCH_SIZE / 2 - 0.1, progress),
                );

                const activateLead = 10;
                let index = positions.findIndex(
                  (item) => item.y > scrollY + activateLead,
                );
                index =
                  index === -1 ? positions.length - 1 : Math.max(0, index - 1);
                setActiveIndex(index);

                // Pointer and text stay locked: active step is always fully highlighted.
                if (index < 1) {
                  if (!introActiveRef.current) {
                    setCharProgress(1);
                  }
                  introActiveRef.current = true;
                  return;
                }

                introActiveRef.current = false;
                setCharProgress(index + 1);
              },
            }),
          );
        }

        if (innerRef.current) {
          triggers.push(
            ScrollTrigger.create({
              trigger: innerRef.current,
              start: "top bottom",
              end: "top 30%",
              scrub: 0,
              onUpdate: ({ progress }) => {
                if (progress === 1) {
                  if (introActiveRef.current) {
                    introActiveRef.current = false;
                  }
                  return;
                }

                introActiveRef.current = true;
                setCharProgress(progress);
              },
            }),
          );
        }
      },
    );

    mm.add("(max-width: 1023px)", () => {
      const list = listRef.current;
      if (!list) return;

      const onScroll = () => {
        const index = nearestSnapIndex(list.scrollLeft, snapPointsRef.current);
        setActiveIndex(index);
        const position = notchPositionForIndex(index);
        setNotchPosition(position);
        updateNotchPosition(position);
      };

      list.addEventListener("scroll", onScroll, { passive: true });
      requestAnimationFrame(() => {
        const snapPoint = snapPointsRef.current[0] ?? 0;
        list.scrollTo({ left: snapPoint, behavior: "instant" });
      });

      return () => {
        list.removeEventListener("scroll", onScroll);
      };
    });

    requestAnimationFrame(() => {
      measureItemPositions();
      ScrollTrigger.refresh();
    });

    const refreshTimer = window.setTimeout(() => ScrollTrigger.refresh(), 150);

    return () => {
      window.clearTimeout(refreshTimer);
      mm.revert();
      resizeObserver.disconnect();
      triggers.forEach((trigger) => trigger.kill());
      odometerTweenRef.current?.kill();
    };
  }, [isLoaded, lenis, measureItemPositions, updateNotchPosition]);

  return (
    <section
      className="features-steps"
      style={{ "--314863dd": ITEM_COUNT, "--current-item": activeIndex } as CSSProperties}
    >
      <div
        ref={innerRef}
        className="inner"
        style={{ "--current-item": activeIndex } as CSSProperties}
      >
        <div className="content body-2">
          <div ref={headerRef} className="header">
            <PaddedCounter
              endValue={ITEM_COUNT}
              progress={ITEM_COUNT <= 1 ? 0 : odometerProgress / (ITEM_COUNT - 1)}
            />
            <div className="counter__wrapper__mobile" aria-hidden>
              {featuresSteps.items.map((_, index) => (
                <div
                  key={index}
                  className={`counter__mobile${index === activeIndex ? " show" : ""}`}
                >
                  {String(index + 1).padStart(2, "0")}
                </div>
              ))}
            </div>
          </div>

          <div ref={scrollItemsRef} className="scroll-items">
            <ul ref={listRef} className="scroll-items-list no-scrollbar">
              {featuresSteps.items.map((item, index) => (
                <li
                  key={item.label}
                  ref={(node) => {
                    itemRefs.current[index] = node;
                  }}
                  className={`scroll-item${index === activeIndex ? " show" : ""}`}
                  style={{ "--index": index } as CSSProperties}
                >
                  <span className="split__wrapper">
                    <p
                      ref={(node) => {
                        labelRefs.current[index] = node;
                      }}
                    >
                      {item.label}
                    </p>
                  </span>
                </li>
              ))}
            </ul>

            <div className="scrollbar" aria-hidden="true">
              <div className="scrollbar-inner" />
            </div>
          </div>
        </div>

        <SvgMask
          ref={svgMaskRef}
          notches={notches}
          useClip
          className="svg-mask"
        >
          <div className="images">
            {featuresSteps.items.map((item, index) => (
              <div
                key={item.label}
                className={`media-el image${Math.max(activeIndex, 0) >= index ? " is-visible" : ""}`}
              >
                <div className="media-wrapper lg">
                  <video
                    ref={(node) => {
                      videoRefs.current[index] = node;
                    }}
                    className="video"
                    src={item.media}
                    preload={isLoaded && index === activeIndex ? "auto" : "none"}
                    muted
                    playsInline
                    loop
                    autoPlay={isLoaded && index === activeIndex}
                    aria-hidden
                  />
                </div>
              </div>
            ))}

            <div className="buttons">
              <button
                type="button"
                className="button"
                disabled={activeIndex === 0}
                onClick={() => goToIndex(activeIndex - 1)}
                aria-label="Previous feature"
              >
                <svg width="10" height="18" viewBox="0 0 10 18" fill="none" aria-hidden>
                  <path
                    strokeLinecap="square"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8.072 1.943 1.058 8.857l7.014 6.915"
                  />
                </svg>
              </button>
              <button
                type="button"
                className="button"
                disabled={activeIndex === ITEM_COUNT - 1}
                onClick={() => goToIndex(activeIndex + 1)}
                aria-label="Next feature"
              >
                <svg width="10" height="18" viewBox="0 0 10 18" fill="none" aria-hidden>
                  <path
                    strokeLinecap="square"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1.928 1.943 7.014 6.914-7.014 6.915"
                  />
                </svg>
              </button>
            </div>
          </div>
        </SvgMask>
      </div>
    </section>
  );
}
