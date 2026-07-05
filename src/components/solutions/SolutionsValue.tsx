"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { type SolutionValueData } from "@/data/solutions";
import { AnimatedCardBorder } from "@/components/solutions/AnimatedCardBorder";
import { useAnimatedStrong } from "@/hooks/useAnimatedStrong";
import { useAnimatedPathLines } from "@/hooks/useAnimatedPathLines";
import type { PathLineRefs } from "@/lib/svg/pathFollower";
import { registerGsap } from "@/lib/gsap/register";

type SolutionsValueProps = {
  data: SolutionValueData;
};

export function SolutionsValue({ data }: SolutionsValueProps) {
  const { headerRef } = useAnimatedStrong<HTMLDivElement>();
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const pathsRef = useRef<PathLineRefs[]>([]);

  useAnimatedPathLines({
    triggerRef: sectionRef,
    paths: pathsRef,
  });

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section || !content) return;

    registerGsap();

    const parallax = gsap.fromTo(
      content,
      { yPercent: -5 },
      {
        yPercent: 5,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    );

    return () => {
      parallax.scrollTrigger?.kill();
      parallax.kill();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="solutions-value"
      itemScope
      itemType="https://schema.org/ItemList"
      aria-label="Solutions Value Section"
    >
      <div className="solutions-value__inner">
        <div ref={contentRef} className="solutions-value__content">
          <header ref={headerRef} className="solutions-value__title animated-strong">
            <h2 className="title-h2">
              <strong>
                <span style={{ color: "var(--color-neutral-mid)" }}>{data.title}</span>
              </strong>
            </h2>
          </header>
          <p className="body-2" aria-hidden />
          <p className="body-2" aria-hidden />
        </div>

        <div className="solutions-value__cards">
          <div className="solutions-value__cards-list">
            {data.cards.map((card, index) => (
              <article
                key={card.title}
                className="solutions-value__card"
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/Thing"
              >
                <meta itemProp="position" content={String(index + 1)} />
                <div className="solutions-value__card-wrapper">
                  <AnimatedCardBorder index={index} pathsRef={pathsRef}>
                    <div className="solutions-value__card-top">
                      <figure
                        className="solutions-value__card-media"
                        itemScope
                        itemType="https://schema.org/ImageObject"
                      >
                        <Image
                          src={card.image.src}
                          alt={card.image.alt}
                          width={162}
                          height={162}
                          draggable={false}
                        />
                        <meta itemProp="contentUrl" content={card.image.src} />
                      </figure>
                      <div className="solutions-value__card-content">
                        <h3 className="solutions-value__card-title">{card.title}</h3>
                        <p className="solutions-value__card-copy body-4">{card.copy}</p>
                      </div>
                    </div>
                  </AnimatedCardBorder>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
