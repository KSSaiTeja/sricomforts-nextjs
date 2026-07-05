"use client";

import Link from "next/link";
import {
  type AboutParagraphPart,
  type AboutSectionIntroData,
  type AboutTitlePart,
} from "@/data/about";
import { NotchSection } from "@/components/home/NotchSection";
import { useAnimatedStrong } from "@/hooks/useAnimatedStrong";

type AboutSectionIntroProps = {
  data: AboutSectionIntroData;
};

function renderTitlePart(part: AboutTitlePart, index: number) {
  if (typeof part === "string") {
    return <span key={`${index}-${part}`}>{part}</span>;
  }

  return <strong key={`${index}-${part.strong}`}>{part.strong}</strong>;
}

function renderTitle(title: AboutSectionIntroData["title"]) {
  if (!title) return null;

  if (typeof title === "string") {
    return title;
  }

  return title.map((line, lineIndex) => (
    <span key={`line-${lineIndex}`}>
      {lineIndex > 0 ? <br /> : null}
      {line.map((part, partIndex) => renderTitlePart(part, partIndex))}
    </span>
  ));
}

function renderParagraphPart(part: AboutParagraphPart, index: number) {
  const style = part.color ? { color: part.color } : undefined;

  return (
    <span key={`${part.text}-${index}`}>
      {part.breakBefore ? (
        <>
          <br />
          <br />
        </>
      ) : null}
      {part.strong ? <strong style={style}>{part.text}</strong> : <span style={style}>{part.text}</span>}
    </span>
  );
}

function renderParagraphParts(parts: AboutParagraphPart[]) {
  return parts.map((part, index) => renderParagraphPart(part, index));
}

export function AboutSectionIntro({ data }: AboutSectionIntroProps) {
  const { headerRef, sectionRef } = useAnimatedStrong<HTMLElement, HTMLDivElement>();
  const labelId = data.labelId ?? "about-section-label";
  const hasSpacing = Boolean(data.paragraphs?.length || data.buttons?.length);
  const showLabel = !data.hideLabel && data.label;

  return (
    <NotchSection top={false} bottom={false}>
      <section
        id={data.sectionId}
        className={["section__wrapper", data.fullscreen ? "is-fullscreen" : ""]
          .filter(Boolean)
          .join(" ")}
      >
        <div
          ref={sectionRef}
          className={["section-introduction", data.variant].filter(Boolean).join(" ")}
          aria-labelledby={showLabel ? labelId : undefined}
        >
          <div className="content-wrapper">
            <div className="section-content">
              {showLabel ? (
                <p id={labelId} className="label label-5" role="text">
                  {data.label}
                </p>
              ) : null}

              <header
                ref={headerRef}
                className={["header", "animated-strong", hasSpacing ? "spacing" : ""]
                  .filter(Boolean)
                  .join(" ")}
              >
                {data.titles?.length
                  ? data.titles.map((title, index) => (
                      <h2 key={`title-${index}`} className="title-si">
                        {renderTitle(title)}
                      </h2>
                    ))
                  : data.title ? (
                      <h2 className="title-si">{renderTitle(data.title)}</h2>
                    ) : null}
              </header>

              {data.paragraphs?.length ? (
                <div
                  className={["paragraphs-wrapper", data.paragraphsMultiple ? "multiple" : ""]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {data.paragraphs.map((parts, index) =>
                    parts.length === 0 ? (
                      <p key={`spacer-${index}`} className="paragraph body-4">
                        <br />
                      </p>
                    ) : (
                      <p
                        key={parts.map((part) => part.text).join("-") || `paragraph-${index}`}
                        className="paragraph body-4"
                      >
                        {renderParagraphParts(parts)}
                      </p>
                    ),
                  )}
                </div>
              ) : null}

              {data.buttons?.length ? (
                <nav className="buttons buttons-underlined" aria-label="Section actions">
                  {data.buttons.map((button) => (
                    <Link
                      key={button.href}
                      href={button.href}
                      className="button--underlined link-active-full button label-4"
                      aria-label={button.ariaLabel ?? button.label}
                    >
                      <span className="link-active">{button.label}</span>
                    </Link>
                  ))}
                </nav>
              ) : null}
            </div>
          </div>
        </div>
      </section>
    </NotchSection>
  );
}
