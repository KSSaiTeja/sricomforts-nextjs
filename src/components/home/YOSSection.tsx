"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registerGsap } from "@/lib/gsap/register";
import { brandDifferenceSection } from "@/data/homepage";
import styles from "./yos-section.module.css";

export function YOSSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    if (!sectionRef.current || !containerRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "90% bottom",
      scrub: true,
      onUpdate: (self) => {
        const isWhite = self.progress >= 0.99;
        containerRef.current!.style.background = isWhite ? "#fff" : "var(--color-brand-primary)";
        containerRef.current!.style.color = isWhite ? "var(--color-brand-ink)" : "#fff";
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <section ref={sectionRef} className={styles.yosSection}>
      <div className={styles.stickyHolder}>
        <div ref={containerRef} className={styles.stickyContainer}>
          <div className={styles.headingWrapper}>
            <p className={styles.subTitle}>{brandDifferenceSection.subtitle}</p>
            <h2 className={styles.heading} aria-label={brandDifferenceSection.heading}>
              {brandDifferenceSection.heading.split(" ").map((word, index) => (
                <span key={`${word}-${index}`} className={styles.word}>
                  {word}
                  {index < brandDifferenceSection.heading.split(" ").length - 1 ? " " : ""}
                </span>
              ))}
              <span className={styles.sup}>™</span>
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}
