"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type ServiceCarouselData } from "@/data/services";
import { useAnimatedStrong } from "@/hooks/useAnimatedStrong";
import { registerGsap } from "@/lib/gsap/register";

type ServicesFeaturesCarouselExpandableProps = {
  data: ServiceCarouselData;
};

function NavChevron({ direction }: { direction: "prev" | "next" }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="12"
      height="13"
      fill="none"
      viewBox="0 0 12 13"
      className={direction === "next" ? "right" : undefined}
      aria-hidden
    >
      <path
        stroke="currentColor"
        strokeLinecap="square"
        strokeLinejoin="round"
        strokeWidth="2"
        d="m10.997 2.004-9.849-.142v9.85"
      />
    </svg>
  );
}

type ExpandableCardProps = ServiceCarouselData["items"][number] & {
  isExpanded: boolean;
  onToggle: () => void;
};

function ExpandableCard({
  tabLabel,
  title,
  description,
  image,
  backgroundColor,
  color,
  cta,
  isExpanded,
  onToggle,
}: ExpandableCardProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const surfaceStyle = { color, backgroundColor } as const;

  useEffect(() => {
    if (!isExpanded || !contentRef.current) return;

    registerGsap();
    const animated = contentRef.current.querySelectorAll(".content-animate");

    if (!animated.length) return;

    gsap.set(animated, { opacity: 0, y: 30 });
    gsap.to(animated, {
      opacity: 1,
      y: 0,
      duration: 0.9,
      stagger: 0.12,
      ease: "expo.out",
      delay: 0.15,
    });
  }, [isExpanded]);

  return (
    <article
        className={[
          "features-carousel-expandable-card",
          isExpanded ? "is-expanded" : "is-collapsed",
        ].join(" ")}
        aria-expanded={isExpanded}
      >
        <div
          className="features-card__wrapper"
          style={surfaceStyle}
          role="button"
          tabIndex={0}
          onClick={onToggle}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              onToggle();
            }
          }}
        >
          {isExpanded ? (
            <div className="expanded-card-wrapper-inner" style={{ backgroundColor }}>
              <div className="card-image" aria-hidden>
                <Image
                  src={image.src}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 90vw, 580px"
                  className="image"
                  draggable={false}
                />
                <div className="image-overlay" />
              </div>
              <div ref={contentRef} className="expanded-content">
                <div className="content-top">
                  <div className="title-group">
                    <span className="card-subtitle content-animate">{tabLabel}</span>
                    <h3 className="card-title-expanded title-h3 content-animate">{title}</h3>
                  </div>
                  <div className="card-description body-4 content-animate">
                    <p>{description}</p>
                  </div>
                </div>
                {cta ? (
                  <div className="card-cta content-animate">
                    <Link href={cta.href} className="cta-button" onClick={(e) => e.stopPropagation()}>
                      {cta.label}
                    </Link>
                  </div>
                ) : null}
              </div>
            </div>
          ) : (
            <div className="features-card__container">
              <div className="rollover__wrapper" aria-hidden>
                <div className="media-el image">
                  <Image
                    src={image.src}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 90vw, 350px"
                    draggable={false}
                  />
                </div>
              </div>
              <div className="card-content__wrapper">
                <div className="top__wrapper">
                  <span className="card-label">{tabLabel}</span>
                  <div className="title__wrapper title-h3">
                    <p>{title}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </article>
  );
}

export function ServicesFeaturesCarouselExpandable({ data }: ServicesFeaturesCarouselExpandableProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const tabsWrapperRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const cardRefs = useRef<(HTMLLIElement | null)[]>([]);
  const listRef = useRef<HTMLUListElement>(null);

  const animationOptions = useMemo(
    () => ({
      startColor: "var(--color-brand-accent)",
      endColor: "var(--color-brand-ink)",
    }),
    [],
  );

  const { headerRef } = useAnimatedStrong<HTMLDivElement, HTMLElement>({
    ...animationOptions,
    sectionRef,
  });

  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const switchingRef = useRef(false);
  const queuedIndexRef = useRef<number | null>(null);

  const refreshCarouselLayout = useCallback(() => {
    const list = listRef.current;
    if (!list) return;

    const scrollLeft = list.scrollLeft;
    list.scrollLeft = scrollLeft + 0.5;
    list.offsetWidth;
    list.scrollLeft = scrollLeft;

    registerGsap();
    requestAnimationFrame(() => ScrollTrigger.refresh());
  }, []);

  const updateScrollState = useCallback(() => {
    const list = listRef.current;
    if (!list) return;

    const maxScroll = list.scrollWidth - list.clientWidth;
    setCanScrollLeft(list.scrollLeft > 4);
    setCanScrollRight(list.scrollLeft < maxScroll - 4);
  }, []);

  const scrollTabIntoView = useCallback((index: number) => {
    const tabsWrapper = tabsWrapperRef.current;
    const tab = tabRefs.current[index];
    if (!tabsWrapper || !tab) return;

    const wrapperRect = tabsWrapper.getBoundingClientRect();
    const tabRect = tab.getBoundingClientRect();
    const tabCenter = tabRect.left - wrapperRect.left + tabRect.width / 2;
    const target = tabsWrapper.scrollLeft + tabCenter - tabsWrapper.clientWidth / 2;

    tabsWrapper.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
  }, []);

  const scrollCardIntoView = useCallback((index: number, delay = 0) => {
    const run = () => {
      const list = listRef.current;
      const card = cardRefs.current[index];
      if (!list || !card) return;

      const listRect = list.getBoundingClientRect();
      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left - listRect.left + cardRect.width / 2;
      const target = list.scrollLeft + cardCenter - list.clientWidth / 2;

      list.scrollTo({ left: Math.max(0, target), behavior: "smooth" });
      requestAnimationFrame(updateScrollState);
    };

    if (delay > 0) {
      window.setTimeout(run, delay);
      return;
    }

    requestAnimationFrame(() => requestAnimationFrame(run));
  }, [updateScrollState]);

  const waitForCardTransition = useCallback((card: HTMLElement | null, onDone: () => void) => {
    if (!card) {
      window.setTimeout(onDone, 350);
      return;
    }

    const inner = card.querySelector(".features-carousel-expandable-card");
    if (!inner) {
      window.setTimeout(onDone, 350);
      return;
    }

    let finished = false;
    const finish = () => {
      if (finished) return;
      finished = true;
      inner.removeEventListener("transitionend", onTransitionEnd);
      window.clearTimeout(fallbackTimer);
      refreshCarouselLayout();
      requestAnimationFrame(() => requestAnimationFrame(onDone));
    };

    const onTransitionEnd = (event: Event) => {
      const transition = event as TransitionEvent;
      if (transition.propertyName === "width" || transition.propertyName === "all") {
        finish();
      }
    };

    inner.addEventListener("transitionend", onTransitionEnd);
    const fallbackTimer = window.setTimeout(finish, 650);
  }, [refreshCarouselLayout]);

  const selectTab = useCallback(
    (index: number) => {
      const clamped = Math.max(0, Math.min(index, data.items.length - 1));

      if (switchingRef.current) {
        queuedIndexRef.current = clamped;
        return;
      }

      if (expandedIndex === clamped) {
        scrollTabIntoView(clamped);
        scrollCardIntoView(clamped, 100);
        return;
      }

      const previousIndex = expandedIndex;

      if (previousIndex === null) {
        setExpandedIndex(clamped);
        scrollTabIntoView(clamped);
        scrollCardIntoView(clamped, 100);
        return;
      }

      switchingRef.current = true;
      setExpandedIndex(null);

      requestAnimationFrame(() => {
        waitForCardTransition(cardRefs.current[previousIndex], () => {
          setExpandedIndex(clamped);
          scrollTabIntoView(clamped);
          scrollCardIntoView(clamped, 150);
          switchingRef.current = false;

          if (queuedIndexRef.current !== null) {
            const queued = queuedIndexRef.current;
            queuedIndexRef.current = null;
            selectTab(queued);
          }
        });
      });
    },
    [
      data.items.length,
      expandedIndex,
      scrollCardIntoView,
      scrollTabIntoView,
      waitForCardTransition,
    ],
  );

  const scrollCarousel = useCallback(
    (direction: "prev" | "next") => {
      const list = listRef.current;
      if (!list) return;

      const delta = list.clientWidth * 0.8;
      list.scrollBy({ left: direction === "prev" ? -delta : delta, behavior: "smooth" });
    },
    [],
  );

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    updateScrollState();
    list.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      list.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState, expandedIndex]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      scrollTabIntoView(0);
      scrollCardIntoView(0, 350);
      refreshCarouselLayout();
    }, 350);

    return () => window.clearTimeout(timer);
  }, [refreshCarouselLayout, scrollCardIntoView, scrollTabIntoView]);

  useEffect(() => {
    if (expandedIndex === null) return;
    const timer = window.setTimeout(refreshCarouselLayout, 650);
    return () => window.clearTimeout(timer);
  }, [expandedIndex, refreshCarouselLayout]);

  const renderNavButtons = (className: string) => (
    <div className={className}>
      <button
        type="button"
        className="nav-button"
        aria-label="Scroll carousel left"
        disabled={!canScrollLeft}
        onClick={() => scrollCarousel("prev")}
      >
        <NavChevron direction="prev" />
      </button>
      <button
        type="button"
        className="nav-button right"
        aria-label="Scroll carousel right"
        disabled={!canScrollRight}
        onClick={() => scrollCarousel("next")}
      >
        <NavChevron direction="next" />
      </button>
    </div>
  );

  return (
    <section ref={sectionRef} className="features-carousel-expandable-section">
      <div className="grid__wrapper">
        <div className="wrapper">
          <div className="header-section">
            <p className="label label-5">{data.label}</p>
            <header ref={headerRef} className="header animated-strong spacing">
              <h3 className="title-h3">
                <strong>{data.title}</strong>
              </h3>
            </header>
            <div className="paragraphs-wrapper wide">
              <p className="paragraph body-4">{data.copy}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="features-carousel-expandable">
        <div ref={tabsWrapperRef} className="tabs-wrapper">
          <div className="tabs" role="tablist">
            {data.items.map((item, index) => (
              <button
                key={item.tabLabel}
                ref={(element) => {
                  tabRefs.current[index] = element;
                }}
                type="button"
                role="tab"
                aria-selected={expandedIndex === index}
                className={["tab", expandedIndex === index ? "is-active" : ""].filter(Boolean).join(" ")}
                onClick={() => selectTab(index)}
              >
                {item.tabLabel}
              </button>
            ))}
          </div>
          {renderNavButtons("navigation-buttons navigation-buttons-desktop")}
        </div>

        <ul ref={listRef} className="carousel__wrapper no-scrollbar">
          {data.items.map((item, index) => (
            <li
              key={item.tabLabel}
              ref={(element) => {
                cardRefs.current[index] = element;
              }}
              className="slide"
              aria-label={`Slide ${index + 1} of ${data.items.length}`}
            >
              <ExpandableCard
                {...item}
                isExpanded={expandedIndex === index}
                onToggle={() => selectTab(index)}
              />
            </li>
          ))}
        </ul>

        {renderNavButtons("navigation-buttons navigation-buttons-mobile")}
      </div>
    </section>
  );
}
