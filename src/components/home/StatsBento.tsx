"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { statsBento, type StatsBentoItem } from "@/data/homepage";
import { BRAND_NAME } from "@/lib/brand";
import { registerGsap } from "@/lib/gsap/register";
import styles from "./stats-bento.module.css";

function cardClassName(item: StatsBentoItem) {
  const classes = [styles.card];
  if (item.tone === "ink") classes.push(styles.cardInk);
  if (item.tone === "tint") classes.push(styles.cardTint);
  return classes.join(" ");
}

function StatCard({ item }: { item: StatsBentoItem }) {
  const steps = "steps" in item ? item.steps : undefined;
  const accent = "accent" in item ? item.accent : undefined;
  const eyebrow = "eyebrow" in item ? item.eyebrow : undefined;

  return (
    <div className={styles.inner}>
      {eyebrow ? <p className={styles.eyebrow}>{eyebrow}</p> : null}
      <p className={styles.title}>
        <span className={styles.titleValue}>{item.title}</span>
        {accent ? <span className={styles.titleAccent}>{accent}</span> : null}
      </p>
      <p className={styles.body}>{item.body}</p>
      {steps ? (
        <ul className={styles.steps} aria-label="Delivery steps">
          {steps.map((step) => (
            <li key={step} className={styles.step}>
              {step}
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

function getGatherOffset(
  card: HTMLElement,
  grid: HTMLElement,
  viewportScale: number,
) {
  const gridRect = grid.getBoundingClientRect();
  const cardRect = card.getBoundingClientRect();
  const centerX = gridRect.left + gridRect.width / 2;
  const centerY = gridRect.top + gridRect.height / 2;
  const cardX = cardRect.left + cardRect.width / 2;
  const cardY = cardRect.top + cardRect.height / 2;

  let dx = cardX - centerX;
  let dy = cardY - centerY;
  const length = Math.hypot(dx, dy);

  if (length < 8) {
    dx = 0;
    dy = 1;
  } else {
    dx /= length;
    dy /= length;
  }

  const distance =
    Math.max(180, Math.min(420, length * 1.35 + 140)) * viewportScale;

  return {
    x: dx * distance,
    y: dy * distance,
    rotation: dx * -4 + dy * 2,
  };
}

export function StatsBento() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    registerGsap();

    const section = sectionRef.current;
    const grid = gridRef.current;
    const cards = cardRefs.current.filter(Boolean) as HTMLElement[];
    if (!section || !grid || cards.length === 0) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      gsap.set(cards, { autoAlpha: 1, x: 0, y: 0, scale: 1, rotate: 0 });
      return;
    }

    const viewportScale =
      window.innerWidth < 768 ? 0.5 : window.innerWidth < 1024 ? 0.7 : 1;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    const offsets = cards.map((card) => getGatherOffset(card, grid, viewportScale));

    const onMove = (event: PointerEvent) => {
      const card = event.currentTarget as HTMLElement;
      if (card.dataset.interactive !== "true") return;
      const rect = card.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width - 0.5;
      const py = (event.clientY - rect.top) / rect.height - 0.5;
      gsap.to(card, {
        y: -4,
        scale: 1.02,
        rotateY: px * 5,
        rotateX: py * -5,
        transformPerspective: 1000,
        duration: 0.4,
        ease: "power2.out",
        overwrite: "auto",
      });
    };

    const onLeave = (event: PointerEvent) => {
      const card = event.currentTarget as HTMLElement;
      if (card.dataset.interactive !== "true") return;
      gsap.to(card, {
        y: 0,
        scale: 1,
        rotateX: 0,
        rotateY: 0,
        duration: 0.55,
        ease: "power3.out",
        overwrite: "auto",
      });
    };

    const enableInteraction = () => {
      if (!canHover) return;
      cards.forEach((card) => {
        card.dataset.interactive = "true";
        card.addEventListener("pointermove", onMove);
        card.addEventListener("pointerleave", onLeave);
      });
    };

    const ctx = gsap.context(() => {
      cards.forEach((card, index) => {
        const offset = offsets[index];
        gsap.set(card, {
          autoAlpha: 0,
          x: offset.x,
          y: offset.y,
          scale: 0.86,
          rotate: offset.rotation,
          transformOrigin: "50% 50%",
        });
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: section,
          start: "top 84%",
          once: true,
        },
        onComplete: enableInteraction,
      });

      cards.forEach((card, index) => {
        timeline.to(
          card,
          {
            autoAlpha: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotate: 0,
            duration: 1.1,
            ease: "expo.out",
          },
          index * 0.05,
        );
      });
    }, section);

    return () => {
      cards.forEach((card) => {
        card.removeEventListener("pointermove", onMove);
        card.removeEventListener("pointerleave", onLeave);
      });
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      aria-label={`${BRAND_NAME} at a glance`}
    >
      <div ref={gridRef} className={styles.grid}>
        {statsBento.items.map((item, index) => (
          <article
            key={item.id}
            ref={(element) => {
              cardRefs.current[index] = element;
            }}
            className={cardClassName(item)}
            data-from={item.from}
          >
            <StatCard item={item} />
          </article>
        ))}
      </div>
    </section>
  );
}
