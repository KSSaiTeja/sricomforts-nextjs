"use client";

import { useRef } from "react";
import { type SolutionGridData } from "@/data/solutions";
import { AnimatedCardBorder } from "@/components/solutions/AnimatedCardBorder";
import { SectionsGridSvg } from "@/components/solutions/SectionsGridSvg";
import { useAnimatedStrong } from "@/hooks/useAnimatedStrong";
import { useAnimatedPathLines } from "@/hooks/useAnimatedPathLines";
import type { PathLineRefs } from "@/lib/svg/pathFollower";

type SolutionsSectionsGridProps = {
  data: SolutionGridData;
};

function GridHeader({ data }: { data: SolutionGridData }) {
  const { headerRef } = useAnimatedStrong<HTMLDivElement>();

  return (
    <header className="sections-grid__header sections-grid__header--stacked">
      <p className="sections-grid__label label label-5">{data.label}</p>
      <div ref={headerRef} className="sections-grid__title animated-strong title-si">
        <h2>{data.title}</h2>
      </div>
    </header>
  );
}

function DarkFourGrid({ data }: { data: SolutionGridData }) {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section ref={sectionRef} className="sections-grid sections-grid--dark sections-grid--gradient">
      <div className="sections-grid__content-wrapper">
        <GridHeader data={data} />
        <div className="sections-grid__container sections-grid--dark sections-grid--four-items sections-grid--bottom-extensions">
          <SectionsGridSvg
            itemCount={data.items.length}
            showBottomExtensions
            isDark
            sectionRef={sectionRef}
          />
          {data.items.map((item) => (
            <div key={item.title} className="sections-grid__item">
              <div className="sections-grid__content">
                <div className="sections-grid__heading-wrapper">
                  <h3 className="sections-grid__heading">{item.title}</h3>
                  <div className="sections-grid__description body-4">
                    <p>
                      <span style={{ color: "var(--color-neutral-soft)" }}>{item.description}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function WhiteVariant2Grid({ data }: { data: SolutionGridData }) {
  const sectionRef = useRef<HTMLElement>(null);
  const pathsRef = useRef<PathLineRefs[]>([]);

  useAnimatedPathLines({
    triggerRef: sectionRef,
    paths: pathsRef,
  });

  return (
    <section ref={sectionRef} className="sections-grid sections-grid--white">
      <div className="sections-grid__content-wrapper">
        <GridHeader data={data} />
        <div className="sections-grid-variant2__container sections-grid--white sections-grid-variant2--3-columns">
          <div className="sections-grid-variant2__grid-wrapper">
            {data.items.map((item, index) => (
              <article key={item.title} className="sections-grid-variant2__item-wrapper">
                <AnimatedCardBorder
                  variant="variant2"
                  index={index}
                  className="sections-grid-variant2__card"
                  innerClassName="sections-grid-variant2__item"
                  pathsRef={pathsRef}
                >
                  <div className="sections-grid-variant2__heading-wrapper">
                    <h3 className="sections-grid-variant2__heading">{item.title}</h3>
                    <div className="sections-grid-variant2__description body-4">
                      <p>{item.description}</p>
                    </div>
                  </div>
                </AnimatedCardBorder>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function SolutionsSectionsGrid({ data }: SolutionsSectionsGridProps) {
  if (data.variant === "white-variant2") {
    return <WhiteVariant2Grid data={data} />;
  }

  return <DarkFourGrid data={data} />;
}
