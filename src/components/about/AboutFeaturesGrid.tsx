"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type AboutFeaturesGridData } from "@/data/about";
import { TextRevealChar } from "@/components/ui/TextRevealChar";
import { SvgMask, type SvgMaskHandle } from "@/components/preloader/SvgMask";
import { useIsLargeViewport } from "@/hooks/useMediaQuery";
import { registerGsap } from "@/lib/gsap/register";
import { createNotch, NotchDirection, type Notch } from "@/types/notch";

type AboutFeaturesGridProps = {
  data: AboutFeaturesGridData;
  id?: string;
};

const NOTCH_OFFSET = 30;

function formatFeatureIndex(index: number) {
  return String(index + 1).padStart(2, "0");
}

function buildFeatureNotches(index: number, isDesktop: boolean): Notch[] {
  const side = index % 2 === 1 ? NotchDirection.right : NotchDirection.left;

  if (isDesktop) {
    return [
      createNotch(side, { offset: NOTCH_OFFSET, position: 0.5, size: 0.3 }),
      createNotch(NotchDirection.top, {
        offset: NOTCH_OFFSET,
        position: index % 2 === 1 ? 0.2 : 0.8,
        size: 0.5,
        notchWidth: 0.9,
        radius: 8,
      }),
    ];
  }

  return [
    createNotch(side, { offset: 0, position: 0.5, size: 0.3 }),
    createNotch(NotchDirection.top, {
      offset: 0,
      size: 0.8,
      notchWidth: 0.82,
      radius: 15,
      position: index % 2 === 1 ? 0.3 : 0.7,
    }),
  ];
}

export function AboutFeaturesGrid({ data, id }: AboutFeaturesGridProps) {
  const isDesktop = useIsLargeViewport();
  const featureRefs = useRef<(HTMLElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const maskRefs = useRef<(SvgMaskHandle | null)[]>([]);
  const [progress, setProgress] = useState<number[]>(() => data.items.map(() => 0));

  const notchSets = useMemo(
    () => data.items.map((_, index) => buildFeatureNotches(index, isDesktop)),
    [data.items, isDesktop],
  );

  useEffect(() => {
    registerGsap();
    const triggers: ScrollTrigger[] = [];

    contentRefs.current.forEach((content, index) => {
      if (!content) return;

      triggers.push(
        ScrollTrigger.create({
          trigger: content,
          start: "top 70%",
          end: "top 30%",
          scrub: true,
          onUpdate: ({ progress: nextProgress }) => {
            setProgress((current) => {
              const updated = [...current];
              updated[index] = nextProgress;
              return updated;
            });
          },
        }),
      );
    });

    return () => triggers.forEach((trigger) => trigger.kill());
  }, [data.items.length]);

  useEffect(() => {
    if (!isDesktop) return;

    registerGsap();
    const timelines: gsap.core.Timeline[] = [];

    featureRefs.current.forEach((feature, index) => {
      if (!feature) return;

      const imageTransform = feature.querySelector<HTMLElement>(".image-transform");
      const contentInner = contentRefs.current[index]?.querySelector<HTMLElement>(
        ".feature-content-inner",
      );
      const baseNotches = notchSets[index];

      if (!imageTransform || !contentInner || !baseNotches[0]) return;

      const notchState = { position: 0.65 };

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: feature,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      timeline.fromTo(imageTransform, { yPercent: -10 }, { yPercent: 10, ease: "none" }, 0);
      timeline.fromTo(
        contentInner,
        { y: () => (feature.offsetHeight - contentInner.offsetHeight) * 0.15 },
        { y: () => -(feature.offsetHeight - contentInner.offsetHeight) * 0.15, ease: "none" },
        0,
      );
      timeline.fromTo(
        notchState,
        { position: 0.65 },
        {
          position: 0.45,
          onUpdate: () => {
            const nextNotches = [...baseNotches];
            nextNotches[0] = { ...nextNotches[0], position: notchState.position };
            maskRefs.current[index]?.updatePath(nextNotches);
          },
        },
        0,
      );

      timelines.push(timeline);
    });

    return () => {
      timelines.forEach((timeline) => timeline.scrollTrigger?.kill());
      timelines.forEach((timeline) => timeline.kill());
    };
  }, [isDesktop, notchSets, data.items.length]);

  return (
    <section
      id={id}
      className="features-grid"
      itemScope
      itemType="https://schema.org/ItemList"
      aria-label="Features Grid"
    >
      {data.items.map((item, index) => (
        <article
          key={item.title}
          ref={(element) => {
            featureRefs.current[index] = element;
          }}
          className="feature"
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <meta itemProp="position" content={String(index + 1)} />

          <figure
            className="feature-image"
            itemProp="image"
            itemScope
            itemType="https://schema.org/ImageObject"
          >
            <SvgMask
              ref={(handle) => {
                maskRefs.current[index] = handle;
              }}
              className="svg-mask"
              notches={notchSets[index]}
            >
              <div className="image-wrapper">
                <div className="image-transform">
                  <div className="image">
                    <Image
                      src={item.image.src}
                      alt={item.image.alt}
                      fill
                      sizes="(max-width: 1023px) 985px, 1920px"
                      draggable={false}
                    />
                  </div>
                </div>
              </div>
            </SvgMask>
            <meta itemProp="contentUrl" content={item.image.src} />
          </figure>

          <div
            ref={(element) => {
              contentRefs.current[index] = element;
            }}
            className="feature-content"
            itemScope
            itemType="https://schema.org/Thing"
          >
            <div className="feature-content-inner">
              <h3 className="feature-title title-h2" itemProp="name">
                <span className="feature-index label-3" aria-label="Feature number">
                  {formatFeatureIndex(index)}
                </span>
                <span className="feature-title-text title-h2">{item.title}</span>
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <TextRevealChar
                  text={item.description}
                  progress={progress[index] ?? 0}
                  className="body-1"
                />
              </div>
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
