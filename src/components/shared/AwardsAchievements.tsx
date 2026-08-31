"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { BrandText } from "@/components/brand/BrandText";
import {
  awardsSection,
  experienceSection,
  type AwardItem,
} from "@/data/awards";
import { useHorizontalDragScroll } from "@/hooks/useHorizontalDragScroll";
import styles from "./awards-achievements.module.css";

function LaurelBadge({ year }: { year: string }) {
  return (
    <div className={styles.laurel} aria-hidden>
      <svg
        className={styles.laurelSvg}
        viewBox="0 0 96 96"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M30 78c-10-9-15-20-15-32C15 28 26 16 42 10c-5 9-5 20 0 29 3 5 8 9 13 11-9 3-17 12-25 28z"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M66 78c10-9 15-20 15-32C81 28 70 16 54 10c5 9 5 20 0 29-3 5-8 9-13 11 9 3 17 12 25 28z"
          stroke="currentColor"
          strokeWidth="1.35"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M26 52c-2.5-7-2.5-14 0-20M23 60c-3.5-6-4.5-13-3.5-20M70 52c2.5-7 2.5-14 0-20M73 60c3.5-6 4.5-13 3.5-20"
          stroke="currentColor"
          strokeWidth="1.15"
          strokeLinecap="round"
          opacity="0.45"
        />
        <circle cx="48" cy="42" r="12.5" stroke="currentColor" strokeWidth="1.25" />
        <path
          d="M48 34.5l1.85 3.9 4.25.45-3.2 2.9.95 4.15L48 43.5l-3.85 2.4.95-4.15-3.2-2.9 4.25-.45L48 34.5z"
          fill="var(--color-brand-primary)"
        />
      </svg>
      <span className={`body-6 ${styles.laurelYear}`}>{year}</span>
    </div>
  );
}

function AwardCard({ item, index }: { item: AwardItem; index: number }) {
  const order = String(index + 1).padStart(2, "0");

  return (
    <article className={styles.awardCard} data-motion-item>
      <div className={styles.awardCardTop}>
        <span className={`label-5 ${styles.awardIndex}`}>{order}</span>
        <LaurelBadge year={item.year} />
      </div>
      <div className={styles.awardCopy}>
        <h3 className={`title-h3 ${styles.awardTitle}`}>{item.title}</h3>
        <p className={`body-4 ${styles.awardDescription}`}>
          <BrandText>{item.description}</BrandText>
        </p>
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

type AwardsAchievementsProps = {
  id?: string;
};

export function AwardsAchievements({ id }: AwardsAchievementsProps) {
  const listRef = useRef<HTMLUListElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

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

  return (
    <div id={id} className={styles.root}>
      <section
        className={styles.experience}
        aria-labelledby="experience-section-title"
      >
        <div className={styles.experienceInner}>
          <div className={styles.yearsCard} data-motion-item>
            <div className={styles.yearsFrame}>
              <Image
                src={experienceSection.yearsImage}
                alt="25 years since 2001"
                width={1024}
                height={933}
                className={styles.yearsBadge}
                sizes="(max-width: 960px) 70vw, 22rem"
                priority={false}
              />
            </div>
          </div>

          <div className={styles.experienceContent}>
            <p className={`label label-5 ${styles.eyebrow}`}>Recognition</p>
            <h2
              id="experience-section-title"
              className={`title-h2 ${styles.experienceTitle}`}
              data-motion-title
            >
              {experienceSection.titleLead}{" "}
              <em className={styles.accent}>{experienceSection.titleAccent}</em>
            </h2>
            <p className={`body-4 ${styles.experienceBody}`} data-motion-item>
              <BrandText>{experienceSection.body}</BrandText>
            </p>

            <div className={styles.stats} role="list" data-motion-item>
              {experienceSection.stats.map((stat) => (
                <div key={stat.label} className={styles.stat} role="listitem">
                  <p className={`title-h3 ${styles.statValue}`}>{stat.value}</p>
                  <p className={`body-6 ${styles.statLabel}`}>{stat.label}</p>
                </div>
              ))}
            </div>

            <div className={styles.signature} data-motion-item>
              <p className={styles.signatureName}>
                {experienceSection.signatureName}
              </p>
              <p className={`body-6 ${styles.signatureMeta}`}>
                {experienceSection.signatureRole}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className={styles.awards}
        aria-labelledby="awards-section-title"
        aria-roledescription="carousel"
      >
        <div className={styles.awardsInner}>
          <header className={styles.awardsHeader}>
            <div className={styles.awardsHeaderCopy}>
              <p className={`label label-5 ${styles.awardsLabel}`}>
                {awardsSection.label}
              </p>
              <h2
                id="awards-section-title"
                className={`title-h2 ${styles.awardsTitle}`}
                data-motion-title
              >
                {awardsSection.titleLead}{" "}
                <em className={styles.accent}>{awardsSection.titleAccent}</em>{" "}
                {awardsSection.titleTrail}
              </h2>
            </div>

            <div className={`slider-button__wrapper ${styles.awardsArrows}`}>
              <button
                type="button"
                className="slider-button"
                aria-label="Previous award"
                onClick={() => scrollToIndex(activeIndex - 1)}
              >
                <ChevronIcon direction="prev" />
              </button>
              <button
                type="button"
                className="slider-button right"
                aria-label="Next award"
                onClick={() => scrollToIndex(activeIndex + 1)}
              >
                <ChevronIcon direction="next" />
              </button>
            </div>
          </header>

          <div className={styles.awardsViewport}>
            <ul
              ref={listRef}
              className={`${styles.awardsTrack} no-scrollbar`}
              tabIndex={0}
              onScroll={onScroll}
            >
              {awardsSection.items.map((item, index) => (
                <li key={item.id} className={styles.awardsSlide}>
                  <AwardCard item={item} index={index} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
