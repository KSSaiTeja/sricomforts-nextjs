import {
  CONTACT_ICONS,
  CONTACT_PRODUCT_OVERVIEW_PDF,
  CONTACT_PROMO_OVERVIEW,
} from "@/lib/assets/localPaths";

export const contactCtaSection = {
  title: ["Ready when you are —", "let's talk HVAC"],
  subtitle:
    "Whether you need a new installation, an AMC plan, or a second opinion on an existing system — our team is one conversation away:",
  bullets: ["Same-day response", "Site assessment call", "Tailored AMC options"],
  trusted: "Trusted by facilities that can't afford downtime.",
  logoStripe: "/logos/placeholder/logo-stripe.svg",
  panelTitle: "Prefer a conversation over a form?",
  panelBody:
    "Tell us about your building, timeline, and goals — we'll connect you with the right HVAC expert for your project.",
  cta: { label: "Talk to us", href: "/contact" },
} as const;

/** Head office — Sri Comfort Air Products & Services, Tarnaka / Secunderabad */
export const contactMap = {
  eyebrow: "Visit our office",
  title: "Find us in Hyderabad",
  address:
    "12-5-21/1, Vijayapuri Colony, Tarnaka, Secunderabad, Telangana 500017, India",
  directionsLabel: "Open in Google Maps",
  mapsUrl: "https://share.google/1wWT1mM7pfIvlNPNV",
  iframeTitle: "Sri Comforts head office on Google Maps",
  embedUrl:
    "https://www.google.com/maps?q=Sri+Comfort+Air+Products+%26+Services,+12-5-21/1,+Vijayapuri+Colony,+Tarnaka,+Secunderabad,+Telangana+500017&hl=en&z=16&output=embed",
} as const;

export const promoBannerDownload = {
  eyebrow: "Download datasheet",
  title: "Not ready for a call? Download a brief overview of Sri\u00A0Comforts.",
  emailLabel: "Work Email",
  emailPlaceholder: "name@email.com",
  submitLabel: "Download Now",
  submittingLabel: "Submitting…",
  successMessage: "Thanks — your download is starting.",
  image: {
    src: CONTACT_PROMO_OVERVIEW,
    alt: "Sri\u00A0Comforts HVAC solutions overview",
  },
  assetUrl: CONTACT_PRODUCT_OVERVIEW_PDF,
} as const;

export const contactWaysGrid = {
  eyebrow: "Other way to connect",
  title: "We are here to help",
} as const;

export const contactWaysNotches = [
  { side: "left", positionPercent: 50, halfWidth: 60, depth: 25, slope: 14, radius: 14 },
  { side: "bottom", positionPercent: 30, halfWidth: 120, depth: 25, slope: 14, radius: 14 },
  { side: "bottom", positionPercent: 70, halfWidth: 120, depth: 25, slope: 14, radius: 14 },
  { side: "top", positionPercent: 80, halfWidth: 170, depth: 25, slope: 14, radius: 14 },
] as const;

export const contactWaysCards = [
  {
    type: "link" as const,
    theme: "dark" as const,
    title: "Download our product overview",
    description: undefined,
    icon: CONTACT_ICONS.download,
    href: "/resources/product-overview",
    openInNewTab: true,
  },
  {
    type: "action" as const,
    theme: "light" as const,
    title: "Speak with our HVAC experts",
    description:
      "Get instant answers about systems, AMC plans, and project timelines — no forms required.",
    icon: CONTACT_ICONS.phone,
    phoneHref: "tel:+914027001342",
    ariaLabel: "Speak with our HVAC experts",
  },
  {
    type: "link" as const,
    theme: "light" as const,
    title: "Explore AMC plans",
    description: "Review annual maintenance options tailored to your facility and uptime goals.",
    icon: CONTACT_ICONS.amc,
    href: "/services/amc",
    openInNewTab: false,
  },
  {
    type: "subscribe" as const,
    theme: "light" as const,
    title: "Subscribe to our newsletter",
    emailLabel: "Work Email *",
    emailPlaceholder: "name@email.com",
    submitLabel: "Submit",
    successMessage: "Thanks for subscribing. We'll be in touch soon.",
  },
] as const;
