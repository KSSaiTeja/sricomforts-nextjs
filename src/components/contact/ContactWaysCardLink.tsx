import Link from "next/link";
import { ContactWaysCardBase } from "@/components/contact/ContactWaysCardBase";
import type { CardNotchConfig } from "@/lib/svg/cardClipPath";

type ContactWaysCardLinkProps = {
  title: string;
  description?: string;
  icon?: string;
  theme: "light" | "dark";
  href: string;
  openInNewTab?: boolean;
  notch?: CardNotchConfig;
};

export function ContactWaysCardLink({
  title,
  description,
  icon,
  theme,
  href,
  openInNewTab = false,
  notch,
}: ContactWaysCardLinkProps) {
  return (
    <Link
      href={href}
      className="contact-ways-card-link"
      target={openInNewTab ? "_blank" : undefined}
      rel={openInNewTab ? "noopener noreferrer" : undefined}
    >
      <ContactWaysCardBase
        theme={theme}
        title={title}
        description={description}
        icon={icon}
        notch={notch}
      />
    </Link>
  );
}
