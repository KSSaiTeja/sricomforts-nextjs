const STORYBLOK = "https://a.storyblok.com";

export const promoBannerDownload = {
  eyebrow: "Download datasheet",
  title: "Not ready for a call? Download a brief overview of Sri Comforts.",
  emailLabel: "Work Email",
  emailPlaceholder: "name@email.com",
  submitLabel: "Download Now",
  submittingLabel: "Submitting…",
  successMessage: "Thanks — your download is starting.",
  image: {
    src: `${STORYBLOK}/f/337048/1920x1080/0ebacab5cc/the-only-yard-os-built-for-phy-ai.png/m/1920x0/filters:format(webp):quality(85)`,
    alt: "Sri Comforts HVAC solutions overview",
  },
  assetUrl: `${STORYBLOK}/f/337048/1920x1080/0ebacab5cc/the-only-yard-os-built-for-phy-ai.png/m/1200x0/filters:format(pdf)`,
} as const;

export const contactWaysGrid = {
  eyebrow: "Other way to connect",
  title: "We are here to help",
} as const;

export const contactWaysNotches = [
  { side: "left", positionPercent: 50, halfWidth: 60, depth: 25, slope: 12, radius: 6 },
  { side: "bottom", positionPercent: 30, halfWidth: 120, depth: 25, slope: 12, radius: 6 },
  { side: "bottom", positionPercent: 70, halfWidth: 120, depth: 25, slope: 12, radius: 6 },
  { side: "top", positionPercent: 80, halfWidth: 170, depth: 25, slope: 12, radius: 6 },
] as const;

export const contactWaysCards = [
  {
    type: "link" as const,
    theme: "dark" as const,
    title: "Download our product overview",
    description: undefined,
    icon: `${STORYBLOK}/f/337048/36x36/e5ec8b10db/survey-white.svg`,
    href: "/resources/product-overview",
    openInNewTab: true,
  },
  {
    type: "action" as const,
    theme: "light" as const,
    title: "Speak with our HVAC experts",
    description:
      "Get instant answers about Daikin systems, AMC plans, and project timelines — no forms required.",
    icon: `${STORYBLOK}/f/337048/36x36/eb4e11dc02/reviews.svg`,
    phoneHref: "tel:+914027001342",
    ariaLabel: "Speak with our HVAC experts",
  },
  {
    type: "link" as const,
    theme: "light" as const,
    title: "Explore AMC plans",
    description: "Review annual maintenance options tailored to your facility and uptime goals.",
    icon: `${STORYBLOK}/f/337048/36x36/ac11d11484/calculate.svg`,
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
