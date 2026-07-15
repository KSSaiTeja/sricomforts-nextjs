"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { projectShowcase, type ProjectShowcaseItem } from "@/data/homepage";
import { useHorizontalDragScroll } from "@/hooks/useHorizontalDragScroll";

const AUTOPLAY_MS = 4200;

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

function ProjectCard({
  item,
  index,
}: {
  item: ProjectShowcaseItem;
  index: number;
}) {
  const order = String(index + 1).padStart(2, "0");

  return (
    <Link
      href={item.href}
      className="projects-carousel__card"
      aria-label={`${item.sector}: ${item.title}, ${item.location}`}
    >
      <div className="projects-carousel__media">
        <Image
          src={item.image.src}
          alt={item.image.alt}
          fill
          sizes="(max-width: 767px) 78vw, (max-width: 1023px) 42vw, 30vw"
          className="projects-carousel__image"
          draggable={false}
        />
        <div className="projects-carousel__scrim" aria-hidden />
      </div>

      <div className="projects-carousel__meta">
        <div className="projects-carousel__meta-top">
          <span className="projects-carousel__index label-5">{order}</span>
          <span className="projects-carousel__sector label-5">{item.sector}</span>
        </div>
        <div className="projects-carousel__meta-bottom">
          <h3 className="projects-carousel__title title-h3">{item.title}</h3>
          <p className="projects-carousel__location">{item.location}</p>
        </div>
      </div>
    </Link>
  );
}

export function ProjectsCarousel() {
  const items = projectShowcase.items;
  const listRef = useRef<HTMLUListElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduceMotionRef = useRef(false);

  const scrollToIndex = useCallback((index: number) => {
    const list = listRef.current;
    if (!list) return;

    const count = list.children.length;
    if (count === 0) return;

    const clamped = ((index % count) + count) % count;
    const child = list.children[clamped] as HTMLElement | undefined;
    if (!child) return;

    list.scrollTo({ left: child.offsetLeft, behavior: "smooth" });
    setActiveIndex(clamped);
  }, []);

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

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduceMotionRef.current = media.matches;

    const onChange = () => {
      reduceMotionRef.current = media.matches;
    };

    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (paused || reduceMotionRef.current || items.length < 2) return;

    const id = window.setInterval(() => {
      setActiveIndex((current) => {
        const next = (current + 1) % items.length;
        const list = listRef.current;
        const child = list?.children[next] as HTMLElement | undefined;
        if (list && child) {
          list.scrollTo({ left: child.offsetLeft, behavior: "smooth" });
        }
        return next;
      });
    }, AUTOPLAY_MS);

    return () => window.clearInterval(id);
  }, [paused, items.length]);

  const renderControls = (className: string) => (
    <div className={className}>
      <button
        type="button"
        className="slider-button"
        aria-label="Previous project"
        onClick={() => scrollToIndex(activeIndex - 1)}
      >
        <ChevronIcon direction="prev" />
      </button>
      <button
        type="button"
        className="slider-button right"
        aria-label="Next project"
        onClick={() => scrollToIndex(activeIndex + 1)}
      >
        <ChevronIcon direction="next" />
      </button>
    </div>
  );

  return (
    <section
      className="projects-carousel"
      aria-roledescription="carousel"
      aria-label="Sri Comforts project showcase"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setPaused(false);
        }
      }}
    >
      <div className="projects-carousel__toolbar">
        <p className="projects-carousel__caption body-6">
          Selected projects from our portfolio
        </p>
        {renderControls("slider-button__wrapper projects-carousel__arrows")}
      </div>

      <div className="projects-carousel__viewport">
        <ul
          ref={listRef}
          className="projects-carousel__track no-scrollbar"
          tabIndex={0}
          onScroll={onScroll}
        >
          {items.map((item, index) => (
            <li key={`${item.sector}-${item.title}`} className="projects-carousel__slide">
              <ProjectCard item={item} index={index} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
