import { aboutSectionAnchors } from "@/data/about";

/** Legacy Terminal CDN URLs — replace with assetUrl() as files move to Supabase. */
const STORYBLOK = "https://a.storyblok.com";

export const heroTitles = [
  "We perfected cooling solutions for every space",
  "from design through install and service.",
  "Your authorized Daikin partner in South India.",
  "Trusted for 25+ years, year after year.",
] as const;

export const logoWallIntro = "Cooling the spaces behind the  brands you trust";

export type SectionIntroVariant = "hp-si1" | "hp-si2" | "last-si-hp";

export type TitlePart = string | { strong: string };

export type SectionIntroductionData = {
  variant: SectionIntroVariant;
  followingLogos?: boolean;
  label?: string;
  title: string | TitlePart[];
  buttons?: { label: string; href: string }[];
};

export const sectionIntros = {
  bridge: {
    variant: "hp-si1",
    title: [
      "Imagine your space as an ",
      { strong: "authorized dealer" },
      " seamlessly connecting design to service.",
    ],
  },
  industry: {
    variant: "hp-si2",
    label: "Authorized Since 2001",
    title:
      "Built by industry leaders who demand excellence in every HVAC project",
  },
  howItWorks: {
    variant: "last-si-hp",
    label: "How it Works",
    title: "Trusted expertise that transforms your space from plan to comfort",
    buttons: [{ label: "See our approach", href: "/services/how-we-work" }],
  },
  productCatalog: {
    variant: "hp-si2",
    label: "Product Catalog",
    title: [
      "Explore ",
      { strong: "Daikin systems" },
      " designed for ",
      { strong: "every space" },
      " and ",
      { strong: "scale" },
    ],
  },
} as const satisfies Record<string, SectionIntroductionData>;

export const featuresSteps = {
  items: [
    {
      label: "Authorized HVAC solutions from design through commissioning.",
      media: `${STORYBLOK}/f/337048/x/f0f51ea10f/vid_3-1_prerender_1.mp4`,
    },
    {
      label: "Full visibility across design, install, and service.",
      media: `${STORYBLOK}/f/337048/x/5d1992bef6/vid_3-2_prerender_1.mp4`,
    },
    {
      label: "Managed by expert teams with AutoCAD design expertise.",
      media: `${STORYBLOK}/f/337048/x/5c039660e1/vid_3-3_prerender_1.mp4`,
    },
    {
      label: "Configurable systems for sites across South India.",
      media: `${STORYBLOK}/f/337048/x/daeedd63c8/vid_3-5_prerender_1.mp4`,
    },
    {
      label: "Clean rooms, cold rooms, and ventilation.",
      media: `${STORYBLOK}/f/337048/x/cbcaf12722/hp-where-4.mp4`,
    },
    {
      label: "Service you can trust with a 24-hour response.",
      media: `${STORYBLOK}/f/337048/x/408e8d26ba/vid_5-4_prerender_1.mp4`,
    },
  ],
} as const;

export const yosSection = {
  subtitle: "That's the",
  heading: "Sri Comforts difference.",
} as const;

export const fullscreenFeatures = {
  items: [
    {
      preTitle: "Benefit 01",
      title: "A single partner for complete HVAC peace of mind",
      description:
        "From site assessment and AutoCAD design to installation and commissioning, our integrated teams deliver precision cooling tailored to your facility from day one.",
      image: `${STORYBLOK}/f/337048/1369x1176/f88dc2dede/terminal-industries-com_-1.webp`,
    },
    {
      preTitle: "Benefit 02",
      title: "Easy, scalable operation",
      description:
        "Sri Comforts was built for long-term reliability. Straightforward deployment, dedicated post-sales support, and AMC plans that keep your systems running with minimal disruption.",
      image: `${STORYBLOK}/f/337048/1724x1092/2ee54cc703/security-pr-social-post-1.jpg`,
    },
    {
      preTitle: "Benefit 03",
      title: "Rapid, repeatable ROI",
      description:
        "We know cooling runs on lean budgets, which is why we focus on energy-efficient Daikin systems, transparent pricing, and measurable savings across every project.",
      image: `${STORYBLOK}/f/337048/1714x950/f6870930e4/lights-out-eyes-open.png`,
    },
  ],
} as const;

export const quoteSection = {
  text: "Sri Comforts has always been proactive in maintaining our systems… their responsive service is the reason we trust them across every facility.",
  author: "Facilities Director",
  role: "Commercial Client",
  company: "South India",
  image: `${STORYBLOK}/f/337048/5112x3410/74c4e40128/quote-image.jpg`,
} as const;

export const formSection = {
  title: [
    "Contact us and we will be in touch ",
    "same day, your way",
  ],
  subtitle:
    "Fill out the form, and we'll be happy to discuss how Sri Comforts can help with your next project:",
  bullets: ["Free consultation", "Site assessment call", "AMC plan review"],
  trusted: "Trusted by those who demand the best.",
  logoStripe: "/logos/placeholder/logo-stripe.svg",
  helpOptions: [
    "Schedule a consultation with an HVAC expert",
    "Request a site assessment",
    "Explore AMC plans",
    "New installation enquiry",
    "Service & support request",
    "Something else",
  ],
  successMessage:
    "Thank you for getting in touch! We'll come back to you soon.",
} as const;

export type LogoWallItem = {
  src: string;
  scale?: number;
};

/** Placeholder logos from https://logoipsum.com/ — stored in public/logos/placeholder/ */
const PLACEHOLDER_LOGO = "/logos/placeholder";

export const logoWallLogos: LogoWallItem[] = [
  { src: `${PLACEHOLDER_LOGO}/logo-01.svg`, scale: 70 },
  { src: `${PLACEHOLDER_LOGO}/logo-02.svg`, scale: 85 },
  { src: `${PLACEHOLDER_LOGO}/logo-03.svg`, scale: 115 },
  { src: `${PLACEHOLDER_LOGO}/logo-04.svg`, scale: 85 },
  { src: `${PLACEHOLDER_LOGO}/logo-05.svg`, scale: 85 },
  { src: `${PLACEHOLDER_LOGO}/logo-06.svg`, scale: 85 },
  { src: `${PLACEHOLDER_LOGO}/logo-07.svg`, scale: 85 },
  { src: `${PLACEHOLDER_LOGO}/logo-08.svg`, scale: 70 },
  { src: `${PLACEHOLDER_LOGO}/logo-09.svg`, scale: 100 },
  { src: `${PLACEHOLDER_LOGO}/logo-10.svg`, scale: 100 },
  { src: `${PLACEHOLDER_LOGO}/logo-11.svg`, scale: 100 },
  { src: `${PLACEHOLDER_LOGO}/logo-12.svg`, scale: 85 },
  { src: `${PLACEHOLDER_LOGO}/logo-13.svg`, scale: 175 },
  { src: `${PLACEHOLDER_LOGO}/logo-14.svg`, scale: 100 },
  { src: `${PLACEHOLDER_LOGO}/logo-01.svg`, scale: 100 },
  { src: `${PLACEHOLDER_LOGO}/logo-02.svg`, scale: 100 },
  { src: `${PLACEHOLDER_LOGO}/logo-03.svg`, scale: 85 },
  { src: `${PLACEHOLDER_LOGO}/logo-04.svg`, scale: 100 },
  { src: `${PLACEHOLDER_LOGO}/logo-05.svg`, scale: 100 },
  { src: `${PLACEHOLDER_LOGO}/logo-06.svg`, scale: 100 },
];

export const logoGridLogos: LogoWallItem[] = [
  { src: `${PLACEHOLDER_LOGO}/logo-01.svg`, scale: 70 },
  { src: `${PLACEHOLDER_LOGO}/logo-06.svg`, scale: 85 },
  { src: `${PLACEHOLDER_LOGO}/logo-07.svg`, scale: 85 },
  { src: `${PLACEHOLDER_LOGO}/logo-08.svg`, scale: 85 },
  { src: `${PLACEHOLDER_LOGO}/logo-09.svg`, scale: 85 },
];

export const footerSection = {
  title: "Your trusted comfort partner starts today.",
  cta: { label: "Start your HVAC journey", href: "/contact" },
  technologyLinks: [
    { label: "Commercial HVAC", href: "/solutions/commercial" },
    { label: "Central Air Conditioning", href: "/solutions/commercial/central-air" },
    { label: "VRV Systems", href: "/solutions/residential/vrv" },
    { label: "Residential Cooling", href: "/solutions/residential" },
  ],
  companyLinks: [
    { label: "About Sri Comforts", href: `/about#${aboutSectionAnchors.about}` },
    { label: "Our Team", href: `/about#${aboutSectionAnchors.team}` },
    { label: "Our Work", href: `/about#${aboutSectionAnchors.work}` },
    { label: "Awards & Recognition", href: `/about#${aboutSectionAnchors.awards}` },
    { label: "Careers", href: "/career" },
  ],
  contact: {
    label: "Ready to upgrade your comfort? ",
    href: "/contact",
    phone: "+91 40 2700 1342",
    phoneHref: "tel:+914027001342",
    text: "Reach us across Hyderabad and South India.",
  },
  credentials: [
    "Authorized Daikin Dealer",
    "25+ Years of Excellence",
    "8 Cities Across South India",
  ],
  networks: [
    {
      label: "LinkedIn",
      href: "https://in.linkedin.com/company/sricomforts",
      icon: "/static/images/linkedin.svg",
    },
    {
      label: "Twitter",
      href: "https://www.x.com/sricomforts/",
      icon: "/static/images/x.svg",
    },
  ],
  copyright: "Copyright Sri Comforts © 2026 All Rights Reserved ",
  technicalIndexHref: "/about/awards",
  creditsByline: "by kssaiteja",
  creditsHref: "",
} as const;

export const navLinks = [
  { label: "Solutions", href: "/solutions/commercial" },
  { label: "Services", href: "/services/how-we-work" },
  { label: "Resources", href: "/blog" },
  { label: "About", href: "/about" },
] as const;

export const HERO_DESKTOP_FRAMES = 410;
export const HERO_MOBILE_FRAMES = 409;

/** Bump when hero frames change — busts browser cache for /public/static/frames. */
const HERO_FRAMES_VERSION =
  process.env.NEXT_PUBLIC_HERO_FRAMES_VERSION ?? "2";

/** Hero frames always load from /public (same origin as Vercel) — like Terminal Industries. */
export function getHeroFrameUrls(isDesktop: boolean): string[] {
  const count = isDesktop ? HERO_DESKTOP_FRAMES : HERO_MOBILE_FRAMES;
  const variant = isDesktop ? "desktop" : "mobile";
  const prefix = isDesktop ? "hero_anim_desktop_60" : "hero_anim_mobile_60";

  return Array.from(
    { length: count },
    (_, index) =>
      `/static/frames/home/${variant}/webp/${prefix}_${index}.webp?v=${HERO_FRAMES_VERSION}`,
  );
}
