import { Fragment } from "react";
import { BRAND_NAME, keepBrandTogether } from "@/lib/brand";

type TextRevealCharProps = {
  text: string;
  progress: number;
  className?: string;
};

export function TextRevealChar({ text, progress, className }: TextRevealCharProps) {
  const locked = keepBrandTogether(text);
  const characters = [...locked];
  const segments = locked.split(/(Sri\u00A0Comforts)/g);
  let charIndex = 0;

  return (
    <p
      className={["text-reveal-char__wrapper", className].filter(Boolean).join(" ")}
      aria-label={text}
    >
      {segments.map((segment, segmentIndex) => {
        const content = [...segment].map((character) => {
          const index = charIndex++;
          return (
            <span
              key={`${text}-${index}`}
              className={[
                "text-reveal-char",
                progress > index / characters.length ? "show" : "",
              ]
                .filter(Boolean)
                .join(" ")}
              aria-hidden
            >
              {character}
            </span>
          );
        });

        if (segment === BRAND_NAME) {
          return (
            <span key={`brand-${segmentIndex}`} className="brand-nowrap">
              {content}
            </span>
          );
        }

        return <Fragment key={`text-${segmentIndex}`}>{content}</Fragment>;
      })}
    </p>
  );
}
