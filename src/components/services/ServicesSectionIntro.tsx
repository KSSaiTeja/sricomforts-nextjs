"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { type ServiceIntroData } from "@/data/services";
import { serviceDarkBackground } from "@/data/serviceImages";
import { type SolutionIntroData } from "@/data/solutions";
import { BackgroundCanvas } from "@/components/solutions/BackgroundCanvas";
import { useAnimatedStrong } from "@/hooks/useAnimatedStrong";
import { useIsLargeViewport } from "@/hooks/useMediaQuery";
import { registerGsap } from "@/lib/gsap/register";

type ServicesSectionIntroProps = {
  data: ServiceIntroData | SolutionIntroData;
};

export function ServicesSectionIntro({ data }: ServicesSectionIntroProps) {
  const isDark = "theme" in data && data.theme === "dark";
  const isDesktop = useIsLargeViewport();
  const sectionWrapperRef = useRef<HTMLElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);

  const animationOptions = useMemo(
    () => ({
      startColor: "var(--color-brand-accent)",
      endColor: "var(--color-brand-ink)",
    }),
    [],
  );

  const { headerRef, sectionRef } = useAnimatedStrong<HTMLElement, HTMLDivElement>(animationOptions);
  const labelId = "services-section-label";
  const hasSpacing = Boolean(data.paragraphs?.length);

  useEffect(() => {
    if (!isDark || !isDesktop) return;

    const section = sectionWrapperRef.current;
    const content = contentWrapperRef.current;
    if (!section || !content) return;

    registerGsap();

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    timeline.fromTo(
      content,
      { y: () => (section.offsetHeight - content.offsetHeight) * 0.25 },
      { y: () => -(section.offsetHeight - content.offsetHeight) * 0.25, ease: "none", duration: 1 },
      0,
    );

    return () => {
      timeline.scrollTrigger?.kill();
      timeline.kill();
    };
  }, [isDark, isDesktop]);

  const intro = (
    <div
      ref={sectionRef}
      className="section-introduction"
      aria-labelledby={data.label ? labelId : undefined}
    >
      <div ref={contentWrapperRef} className="content-wrapper">
        <div className="section-content">
          {data.label ? (
            <p id={labelId} className="label label-5" role="text">
              {data.label}
            </p>
          ) : null}

          <header
            ref={isDark ? undefined : headerRef}
            className={["header", "animated-strong", hasSpacing ? "spacing" : ""]
              .filter(Boolean)
              .join(" ")}
          >
            {isDark ? (
              <h3 className="title-h3">{data.title}</h3>
            ) : data.fullscreen ? (
              <h2 className="title-si">
                <strong>{data.title}</strong>
              </h2>
            ) : (
              <h2 className="title-si">{data.title}</h2>
            )}
          </header>

          {data.paragraphs?.length ? (
            <div className={`paragraphs-wrapper${isDark ? " wide" : " wide"}`}>
              {data.paragraphs.map((paragraph, index) => (
                <p
                  key={`${paragraph}-${index}`}
                  className={["paragraph", "body-4", isDark ? "paragraph--dark" : ""]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {isDark ? <span className="paragraph--dark-copy">{paragraph}</span> : paragraph}
                </p>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );

  if (isDark) {
    return (
      <section ref={sectionWrapperRef} className="is-fullscreen has-dark-theme section__wrapper">
        <div className="background-image-wrapper" aria-hidden>
          <Image
            src={serviceDarkBackground}
            alt=""
            fill
            sizes="100vw"
            className="background-image"
            priority
            draggable={false}
          />
        </div>
        <div className="has-background-image background-canvas-wrapper" aria-hidden>
          <BackgroundCanvas theme="dark" mode="wave" />
        </div>
        <div className="dark-backdrop" aria-hidden />
        <div className="bottom-gradient" aria-hidden />
        {intro}
      </section>
    );
  }

  if (data.fullscreen) {
    return (
      <section className="is-fullscreen section__wrapper">
        <div className="background-canvas-wrapper" aria-hidden>
          <BackgroundCanvas theme="white" mode="wave" />
        </div>
        {intro}
      </section>
    );
  }

  return <section className="section__wrapper">{intro}</section>;
}
