"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo } from "react";
import { FooterPathBackground } from "@/components/layout/FooterPathBackground";
import { SvgMask } from "@/components/preloader/SvgMask";
import { type SolutionCaseStudyData } from "@/data/solutions";
import { useIsLargeViewport } from "@/hooks/useMediaQuery";
import { createNotch, NotchDirection } from "@/types/notch";

type SolutionsCaseStudyProps = {
  data: SolutionCaseStudyData;
};

const NOTCH_OFFSET = 30;

export function SolutionsCaseStudy({ data }: SolutionsCaseStudyProps) {
  const isDesktop = useIsLargeViewport();

  const notches = useMemo(() => {
    if (isDesktop) {
      return [
        createNotch(NotchDirection.left, {
          position: 0.6,
          size: 0.3,
          offset: NOTCH_OFFSET,
          notchWidth: 0.9,
          radius: 32,
        }),
        createNotch(NotchDirection.top, {
          position: 0.7,
          size: 0.3,
          offset: NOTCH_OFFSET,
          notchWidth: 0.9,
          radius: 32,
        }),
      ];
    }

    return [
      createNotch(NotchDirection.top, {
        position: 0.2,
        size: 0.6,
        offset: NOTCH_OFFSET,
        notchWidth: 0.8,
        radius: 32,
      }),
    ];
  }, [isDesktop]);

  return (
    <section className="case-study case-study--dark">
      <div className="case-study__inner">
        <div className="case-study__content">
          <p className="case-study__label label-5">{data.label}</p>

          {data.logo ? (
            <div className="case-study__logo">
              <Image src={data.logo.src} alt={data.logo.alt} width={350} height={80} draggable={false} />
            </div>
          ) : null}

          <div className="case-study__title">
            <h2 className="title-si">{data.title}</h2>
          </div>

          <div className="case-study__content-text">
            <h3 className="title-h3">{data.description}</h3>
          </div>

          {data.cta ? (
            <div className="case-study__cta">
              <Link href={data.cta.href} className="button label-4" aria-label={data.cta.label}>
                <span className="link-active">{data.cta.label}</span>
              </Link>
            </div>
          ) : null}
        </div>

        <SvgMask notches={notches} useClip className="case-study__panel">
          <div className="case-study__testimonial">
            <FooterPathBackground
              className="case-study__testimonial-background"
              strokeColor="var(--color-brand-ink)"
            >
              <div className="case-study__testimonial-content">
                <div className="case-study__testimonial-text--quote case-study__testimonial-text title-h2">
                  <span className="case-study__quote-mark">“</span>
                  <blockquote>
                    <p>{data.quote}</p>
                  </blockquote>
                </div>

                <div className="case-study__stats">
                  {data.stats.map((stat) => (
                    <div key={stat.label} className="case-study__stat">
                      <div className="case-study__stat-value">{stat.value}</div>
                      <p className="case-study__stat-label body-6">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FooterPathBackground>
          </div>
        </SvgMask>
      </div>
    </section>
  );
}
