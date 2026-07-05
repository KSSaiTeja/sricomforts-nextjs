"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { type SolutionFeaturesCarouselData } from "@/data/solutions";
import { FEATURE_CARD_COLORS } from "@/lib/svg/solutionsBorderPaths";
import { useAnimatedStrong } from "@/hooks/useAnimatedStrong";
import { useHorizontalDragScroll } from "@/hooks/useHorizontalDragScroll";

type SolutionsFeaturesCarouselProps = {
  data: SolutionFeaturesCarouselData;
};

function FeatureCard({
  title,
  description,
  image,
  metrics,
  index,
}: SolutionFeaturesCarouselData["items"][number] & { index: number }) {
  const surfaceStyle = FEATURE_CARD_COLORS[index % FEATURE_CARD_COLORS.length];

  return (
    <article className="features-card__wrapper" style={surfaceStyle}>
      <div className="features-card__container">
        <div className="rollover__wrapper" aria-hidden>
          <div className="media-el image">
            <Image src={image.src} alt="" fill sizes="(max-width: 768px) 90vw, 580px" draggable={false} />
          </div>
        </div>
        <div className="card-content__wrapper">
          <div className="top__wrapper">
            <h2 className="title-h3">{title}</h2>
            <p className="body-4">{description}</p>
          </div>
          {metrics?.length ? (
            <div className="bottom__wrapper">
              <div className="metrics__wrapper">
                <div className="metric-value">{metrics[0].value}</div>
                <div className="metric-label label-5">{metrics[0].label}</div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </article>
  );
}

function ChevronIcon({ direction }: { direction: "prev" | "next" }) {
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

export function SolutionsFeaturesCarousel({ data }: SolutionsFeaturesCarouselProps) {
  const { headerRef } = useAnimatedStrong<HTMLDivElement>();
  const listRef = useRef<HTMLUListElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const scrollToIndex = useCallback(
    (index: number) => {
      const list = listRef.current;
      if (!list) return;

      const clamped = Math.max(0, Math.min(index, data.items.length - 1));
      const child = list.children[clamped] as HTMLElement | undefined;
      if (!child) return;

      list.scrollTo({ left: child.offsetLeft, behavior: "smooth" });
      setActiveIndex(clamped);
    },
    [data.items.length],
  );

  const onScroll = useCallback(() => {
    const list = listRef.current;
    if (!list || list.classList.contains("is-dragging")) return;

    const scrollLeft = list.scrollLeft;
    let nearest = 0;
    let distance = Infinity;

    Array.from(list.children).forEach((child, index) => {
      const element = child as HTMLElement;
      const nextDistance = Math.abs(element.offsetLeft - scrollLeft);
      if (nextDistance < distance) {
        nearest = index;
        distance = nextDistance;
      }
    });

    setActiveIndex(nearest);
  }, []);

  useHorizontalDragScroll(listRef, { onIndexChange: setActiveIndex });

  const renderControls = (className: string) => (
    <div className={className}>
      <button
        type="button"
        className="slider-button"
        aria-label="Go to previous slide"
        disabled={activeIndex === 0}
        onClick={() => scrollToIndex(activeIndex - 1)}
      >
        <ChevronIcon direction="prev" />
      </button>
      <button
        type="button"
        className="slider-button right"
        aria-label="Go to next slide"
        disabled={activeIndex === data.items.length - 1}
        onClick={() => scrollToIndex(activeIndex + 1)}
      >
        <ChevronIcon direction="next" />
      </button>
    </div>
  );

  return (
    <section className="features-carousel-section">
      <div className="grid__wrapper">
        <div className="wrapper">
          <div ref={headerRef} className="heading__wrapper animated-strong">
            <div className="title title-h2">
              <p>{data.title}</p>
            </div>
            {renderControls("slider-button__wrapper slider-button__wrapper--desktop")}
          </div>

          <div className="carousel__container">
            <ul
              ref={listRef}
              className="carousel__wrapper no-scrollbar"
              tabIndex={0}
              onScroll={onScroll}
            >
              {data.items.map((item, index) => (
                <li key={item.title} className="slide" aria-label={`Slide ${index + 1} of ${data.items.length}`}>
                  <FeatureCard {...item} index={index} />
                </li>
              ))}
            </ul>
          </div>

          {renderControls("slider-button__wrapper slider-button__wrapper--mobile")}
        </div>
      </div>
    </section>
  );
}
