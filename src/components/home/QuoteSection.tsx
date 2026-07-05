"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { registerGsap } from "@/lib/gsap/register";
import { quoteSection } from "@/data/homepage";
import styles from "./quote-section.module.css";

export function QuoteSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    registerGsap();
    if (!sectionRef.current || !imageRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      animation: gsap.fromTo(
        imageRef.current,
        { yPercent: -15 },
        { yPercent: 15, ease: "none" },
      ),
    });

    return () => trigger.kill();
  }, []);

  return (
    <section ref={sectionRef} className={styles.quoteSection}>
      <div ref={imageRef} className={styles.imageWrapper}>
        <Image
          src={quoteSection.image}
          alt=""
          fill
          className={styles.image}
          sizes="100vw"
        />
      </div>
      <div className={styles.quoteBlock}>
        <blockquote>
          <p className={styles.quoteText}>&ldquo;{quoteSection.text}&rdquo;</p>
        </blockquote>
        <footer className={styles.author}>
          <div className={styles.authorInfo}>
            <cite className={styles.name}>{quoteSection.author}</cite>
            <span className={styles.role}>{quoteSection.role}</span>
            <span className={styles.company}>{quoteSection.company}</span>
          </div>
        </footer>
      </div>
    </section>
  );
}
