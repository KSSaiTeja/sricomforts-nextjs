"use client";

import Link from "next/link";
import { type SectionIntroductionData, type TitlePart } from "@/data/homepage";
import { NotchSection } from "@/components/home/NotchSection";
import { useAnimatedStrong } from "@/hooks/useAnimatedStrong";

type SectionIntroductionProps = {
  data: SectionIntroductionData;
};

function renderTitle(title: string | TitlePart[]) {
  if (typeof title === "string") return title;

  return title.map((part, index) => {
    if (typeof part === "string") {
      return <span key={`${index}-${part}`}>{part}</span>;
    }

    return <strong key={`${index}-${part.strong}`}>{part.strong}</strong>;
  });
}

export function SectionIntroduction({ data }: SectionIntroductionProps) {
  const { headerRef, sectionRef } = useAnimatedStrong<HTMLElement, HTMLDivElement>();
  const hasSpacing = Boolean(data.buttons?.length);

  return (
    <NotchSection top={false} bottom={false}>
      <section
        className={["section__wrapper", data.followingLogos ? "next-to-logos" : ""]
          .filter(Boolean)
          .join(" ")}
      >
        <div
          ref={sectionRef}
          className={["section-introduction", data.variant].filter(Boolean).join(" ")}
          aria-labelledby={data.label ? "section-label" : undefined}
        >
          <div className="content-wrapper">
            <div className="section-content">
              {data.label ? (
                <p id="section-label" className="label label-5" role="text">
                  {data.label}
                </p>
              ) : null}

              <header
                ref={headerRef}
                className={["header", "animated-strong", hasSpacing ? "spacing" : ""]
                  .filter(Boolean)
                  .join(" ")}
              >
                <h2 className="title-si">{renderTitle(data.title)}</h2>
              </header>
            </div>

            {data.buttons?.length ? (
              <nav
                className="buttons buttons-underlined"
                aria-label="Section actions"
              >
                {data.buttons.map((button) => (
                  <Link
                    key={button.href}
                    href={button.href}
                    className="button--underlined"
                    aria-label={button.label}
                  >
                    {button.label}
                  </Link>
                ))}
              </nav>
            ) : null}
          </div>
        </div>
      </section>
    </NotchSection>
  );
}
