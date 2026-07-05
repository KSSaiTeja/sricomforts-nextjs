"use client";

import { ContactWaysCardBase } from "@/components/contact/ContactWaysCardBase";
import type { CardNotchConfig } from "@/lib/svg/cardClipPath";

type ContactWaysCardActionProps = {
  title: string;
  description?: string;
  icon?: string;
  theme: "light" | "dark";
  phoneHref: string;
  ariaLabel: string;
  notch?: CardNotchConfig;
};

export function ContactWaysCardAction({
  title,
  description,
  icon,
  theme,
  phoneHref,
  ariaLabel,
  notch,
}: ContactWaysCardActionProps) {
  return (
    <button
      type="button"
      className="contact-ways-card-chat"
      aria-label={ariaLabel}
      onClick={() => {
        window.location.href = phoneHref;
      }}
    >
      <ContactWaysCardBase
        theme={theme}
        title={title}
        description={description}
        icon={icon}
        notch={notch}
      />
    </button>
  );
}
