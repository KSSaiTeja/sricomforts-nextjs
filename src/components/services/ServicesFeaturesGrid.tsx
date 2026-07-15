"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type ServiceFeatureGridData } from "@/data/services";
import { SvgMask, type SvgMaskHandle } from "@/components/preloader/SvgMask";
import { useIsLargeViewport } from "@/hooks/useMediaQuery";
import { registerGsap } from "@/lib/gsap/register";
import { createNotch, NotchDirection, type Notch } from "@/types/notch";

type ServicesFeaturesGridProps = {
  data: ServiceFeatureGridData;
};

const NOTCH_OFFSET = 30;

function formatFeatureIndex(index: number) {
  return String(index + 1).padStart(2, "0");
}

function formatFeatureLabel(index: number, label: string) {
  return `${formatFeatureIndex(index)} ${label.toUpperCase()}`;
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
        radius: 32,
      }),
    ];
  }

  return [
    createNotch(side, { offset: 0, position: 0.5, size: 0.3 }),
    createNotch(NotchDirection.top, {
      offset: 0,
      size: 0.8,
      notchWidth: 0.82,
      radius: 32,
      position: index % 2 === 1 ? 0.3 : 0.7,
    }),
  ];
}

export function ServicesFeaturesGrid({ data }: ServicesFeaturesGridProps) {
  const isDesktop = useIsLargeViewport();
  const featureRefs = useRef<(HTMLElement | null)[]>([]);
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);
  const maskRefs = useRef<(SvgMaskHandle | null)[]>([]);

  const notchSets = useMemo(
    () => data.items.map((_, index) => buildFeatureNotches(index, isDesktop)),
    [data.items, isDesktop],
  );

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
                      sizes="(max-width: 1023px) 100vw, 960px"
                      priority={index < 2}
                      draggable={false}
                      unoptimized={item.image.src.includes("supabase.co")}
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
            <div className="feature-content-inner feature-content-inner--advanced">
              <p className="feature-label-advanced label-3" aria-label="Feature label">
                {formatFeatureLabel(index, item.label)}
              </p>
              <h3 className="feature-title-advanced title-h2" itemProp="name">
                {item.title}
              </h3>
              <div itemProp="description">
                <p>{item.description}</p>
              </div>
              {item.cta ? (
                <div>
                  <Link
                    href={item.cta.href}
                    className="features-grid-button__cta button label-4"
                    aria-label={`${item.cta.label} for ${item.title}`}
                    itemProp="url"
                  >
                    {item.cta.label}
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
        </article>
      ))}

      {data.cta ? (
        <div className="features-grid-button">
          <Link href={data.cta.href} className="features-grid-button__cta button label-4">
            {data.cta.label}
          </Link>
        </div>
      ) : null}
    </section>
  );
}
