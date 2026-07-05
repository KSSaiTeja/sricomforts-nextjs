import Image from "next/image";
import type { ReactNode } from "react";
import { ContactArrowIcon } from "@/components/contact/ContactArrowIcon";
import {
  cardClipPathStyle,
  type CardNotchConfig,
} from "@/lib/svg/cardClipPath";

type ContactWaysCardBaseProps = {
  theme: "light" | "dark";
  title: string;
  description?: string;
  icon?: string;
  showArrow?: boolean;
  notch?: CardNotchConfig;
  children?: ReactNode;
};

export function ContactWaysCardBase({
  theme,
  title,
  description,
  icon,
  showArrow = true,
  notch,
  children,
}: ContactWaysCardBaseProps) {
  return (
    <div
      className={`contact-ways-card is-theme-${theme}`}
      style={cardClipPathStyle(notch)}
    >
      {showArrow ? (
        <span className="contact-ways-card__arrow" aria-hidden>
          <ContactArrowIcon />
        </span>
      ) : null}

      <div
        className={[
          "contact-ways-card__content",
          showArrow ? "has-arrow" : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        <div className="contact-ways-card__heading">
          {icon ? (
            <div className="media-el contact-ways-card__icon">
              <Image src={icon} alt="" width={36} height={36} />
            </div>
          ) : null}
          <h3 className="contact-ways-card__title">{title}</h3>
        </div>

        {description ? (
          <p className="contact-ways-card__description">{description}</p>
        ) : null}

        {children}
      </div>
    </div>
  );
}
