"use client";

import { type SolutionIntroData } from "@/data/solutions";
import { BackgroundCanvas } from "@/components/solutions/BackgroundCanvas";
import { PathBackground } from "@/components/preloader/PathBackground";
import { useAnimatedStrong } from "@/hooks/useAnimatedStrong";

type SolutionsSectionIntroProps = {
  data: SolutionIntroData;
};

export function SolutionsSectionIntro({ data }: SolutionsSectionIntroProps) {
  const { headerRef, sectionRef } = useAnimatedStrong<HTMLElement, HTMLDivElement>();
  const labelId = "solutions-section-label";

  const intro = (
    <div
      ref={sectionRef}
      className="section-introduction"
      aria-labelledby={data.label ? labelId : undefined}
    >
      <div className="content-wrapper">
        <div className="section-content">
          {data.label ? (
            <p id={labelId} className="label label-5" role="text">
              {data.label}
            </p>
          ) : null}

          <header
            ref={headerRef}
            className={["header", "animated-strong", data.paragraphs?.length ? "spacing" : ""]
              .filter(Boolean)
              .join(" ")}
          >
            <h2 className="title-si">
              <strong>{data.title}</strong>
            </h2>
          </header>

          {data.paragraphs?.length ? (
            <div className="wide paragraphs-wrapper">
              {data.paragraphs.map((paragraph, index) => (
                <p key={`${paragraph}-${index}`} className="paragraph body-4">
                  {paragraph}
                </p>
              ))}
              <p className="paragraph body-4" aria-hidden>
                <br />
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );

  if (data.hasBgPath) {
    return (
      <section className="has-bg-path section__wrapper">
        <div className="background-wrapper" aria-hidden>
          <div className="path-background">
            <PathBackground />
          </div>
        </div>
        {intro}
      </section>
    );
  }

  if (data.fullscreen) {
    return (
      <section className="is-fullscreen section__wrapper">
        <div className="has-background-image background-canvas-wrapper" aria-hidden>
          <BackgroundCanvas theme="white" mode="wave" />
        </div>
        {intro}
      </section>
    );
  }

  return <section className="section__wrapper">{intro}</section>;
}
