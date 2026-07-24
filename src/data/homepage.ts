import { aboutSectionAnchors } from "@/data/about";
import {
  aboutWorkImage,
  FEATURES_STEP_VIDEOS,
  homeFullscreenImage,
  solutionFeatureImagePath,
} from "@/lib/assets/localPaths";

export const heroTitles = [
  "We perfected cooling solutions for every space",
  "from design through install and service.",
  "South India's trusted HVAC leaders since 2001.",
  "Proven experience. Award-winning delivery.",
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
      "Imagine your space with a ",
      { strong: "proven partner" },
      " seamlessly connecting design to service.",
    ],
  },
  industry: {
    variant: "hp-si2",
    label: "Since 2001",
    title:
      "Built by teams who deliver excellence across every HVAC project",
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
      { strong: "cooling systems" },
      " designed for ",
      { strong: "every space" },
      " and ",
      { strong: "scale" },
    ],
  },
} as const satisfies Record<string, SectionIntroductionData>;

export const statsBento = {
  items: [
    {
      id: "partner",
      tone: "ink",
      from: "left",
      eyebrow: "Market leader",
      title: "Since 2001",
      body: "HVAC excellence across South India",
    },
    {
      id: "journey",
      tone: "tint",
      from: "center",
      title: "Design to service",
      body: "One partner from survey through install and AMC.",
      steps: ["Survey", "Design", "Install", "Service"],
    },
    {
      id: "response",
      tone: "default",
      from: "center",
      title: "24hr",
      accent: "response",
      body: "Service guarantee when comfort can't wait",
    },
    {
      id: "engineers",
      tone: "default",
      from: "center",
      title: "230+",
      accent: "engineers",
      body: "Designing, installing, and maintaining systems",
    },
    {
      id: "cities",
      tone: "default",
      from: "right",
      title: "8",
      accent: "cities",
      body: "Local teams across South India, one standard",
    },
  ],
} as const;

export type StatsBentoItem = (typeof statsBento.items)[number];

export const featuresSteps = {
  items: [
    {
      label: "End-to-end HVAC solutions from design through commissioning.",
      media: FEATURES_STEP_VIDEOS[0],
    },
    {
      label: "Full visibility across design, install, and service.",
      media: FEATURES_STEP_VIDEOS[1],
    },
    {
      label: "Managed by expert teams with AutoCAD design expertise.",
      media: FEATURES_STEP_VIDEOS[2],
    },
    {
      label: "Configurable systems for sites across South India.",
      media: FEATURES_STEP_VIDEOS[3],
    },
    {
      label: "Clean rooms, cold rooms, and ventilation.",
      media: FEATURES_STEP_VIDEOS[4],
    },
    {
      label: "Service you can trust with a 24-hour response.",
      media: FEATURES_STEP_VIDEOS[5],
    },
  ],
} as const;

export const brandDifferenceSection = {
  subtitle: "That's the",
  heading: "Sri\u00A0Comforts difference.",
} as const;

export const fullscreenFeatures = {
  items: [
    {
      preTitle: "Benefit 01",
      title: "A single partner for complete HVAC peace of mind",
      description:
        "From site assessment and AutoCAD design to installation and commissioning, our integrated teams deliver precision cooling tailored to your facility from day one.",
      image: homeFullscreenImage(0),
    },
    {
      preTitle: "Benefit 02",
      title: "Easy, scalable operation",
      description:
        "Sri\u00A0Comforts was built for long-term reliability. Straightforward deployment, dedicated post-sales support, and AMC plans that keep your systems running with minimal disruption.",
      image: homeFullscreenImage(1),
    },
    {
      preTitle: "Benefit 03",
      title: "Rapid, repeatable ROI",
      description:
        "We know cooling runs on lean budgets — so we right-size every system, price transparently, and deliver measurable savings across every project.",
      image: homeFullscreenImage(2),
    },
  ],
} as const;

export const quoteSection = {
  text: "Sri\u00A0Comforts has always been proactive in maintaining our systems… their responsive service is the reason we trust them across every facility.",
  author: "Facilities Director",
  role: "Commercial Client",
  company: "South India",
  image: "/images/team/testimonial/quote-portrait.webp",
} as const;

export const formSection = {
  title: [
    "Contact us and we will be in touch ",
    "same day, your way",
  ],
  subtitle:
    "Fill out the form, and we'll be happy to discuss how Sri\u00A0Comforts can help with your next project:",
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

export type ProjectShowcaseItem = {
  sector: string;
  title: string;
  location: string;
  href: string;
  image: { src: string; alt: string };
};

/**
 * Named projects from `docs/SRI COM Company Profile - Updated 2026.pdf`
 * (Chennai, Bangalore, chillers, government, hospitality & institutional lists).
 */
export const projectShowcase = {
  items: [
    {
      sector: "IT & Software",
      title: "Tech Mahindra — Sholinganallur",
      location: "Chennai",
      href: "/solutions/it-services",
      image: {
        src: solutionFeatureImagePath("it-services", 0),
        alt: "HVAC project for Tech Mahindra campus at Sholinganallur, Chennai",
      },
    },
    {
      sector: "Healthcare",
      title: "Apollo Hospitals — Jayanagar & Bannerghatta",
      location: "Bengaluru",
      href: "/solutions/healthcare",
      image: {
        src: solutionFeatureImagePath("healthcare", 1),
        alt: "Healthcare HVAC delivery for Apollo Hospitals in Bengaluru",
      },
    },
    {
      sector: "Hospitality",
      title: "Holiday Inn Express — Yeshwanthpur",
      location: "Bengaluru",
      href: "/solutions/hospitality-retail",
      image: {
        src: solutionFeatureImagePath("hospitality-retail", 0),
        alt: "Guest comfort HVAC for Holiday Inn Express, Yeshwanthpur",
      },
    },
    {
      sector: "Government",
      title: "Telangana Secretariat — chillers",
      location: "Hyderabad",
      href: "/solutions/commercial",
      image: {
        src: solutionFeatureImagePath("commercial", 2),
        alt: "Chiller systems for Telangana Secretariat, Hyderabad",
      },
    },
    {
      sector: "Chillers",
      title: "TIMS Sanathnagar — MEIL",
      location: "Hyderabad",
      href: "/solutions/healthcare",
      image: {
        src: solutionFeatureImagePath("healthcare", 3),
        alt: "TIMS Sanathnagar chiller project delivered with MEIL",
      },
    },
    {
      sector: "Retail",
      title: "Ideal Mall — Moula Ali",
      location: "Hyderabad",
      href: "/solutions/hospitality-retail",
      image: {
        src: solutionFeatureImagePath("hospitality-retail", 2),
        alt: "Retail cooling project at Ideal Mall, Moula Ali",
      },
    },
    {
      sector: "Builders",
      title: "Appaswamy Real Estates — Azure & Clover",
      location: "Chennai",
      href: "/solutions/residential",
      image: {
        src: solutionFeatureImagePath("residential", 1),
        alt: "Residential HVAC for Appaswamy developments in Chennai",
      },
    },
    {
      sector: "IT & Software",
      title: "Broadridge — chillers",
      location: "Hyderabad",
      href: "/solutions/it-services",
      image: {
        src: solutionFeatureImagePath("it-services", 2),
        alt: "Chiller systems for Broadridge facilities in Hyderabad",
      },
    },
    {
      sector: "Government",
      title: "APCRDA — Amaravati",
      location: "Amaravati",
      href: "/solutions/commercial",
      image: {
        src: solutionFeatureImagePath("commercial", 4),
        alt: "Government HVAC project for APCRDA, Amaravati",
      },
    },
    {
      sector: "Hospitality",
      title: "Golkonda Resorts — chiller retrofit",
      location: "Hyderabad",
      href: "/solutions/hospitality-retail",
      image: {
        src: aboutWorkImage(0),
        alt: "Chiller retrofit for Golkonda Resorts, Hyderabad",
      },
    },
    {
      sector: "Retail",
      title: "Ratnadeep Supermarket — multi-site",
      location: "Bengaluru",
      href: "/solutions/hospitality-retail",
      image: {
        src: solutionFeatureImagePath("hospitality-retail", 4),
        alt: "Multi-site HVAC for Ratnadeep Supermarket across Bengaluru",
      },
    },
    {
      sector: "Industrial",
      title: "Pokarna — chillers",
      location: "Hyderabad",
      href: "/solutions/industrial-pharma",
      image: {
        src: solutionFeatureImagePath("industrial-pharma", 2),
        alt: "Industrial chiller project for Pokarna",
      },
    },
  ] satisfies ProjectShowcaseItem[],
} as const;

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
    { label: "About Sri\u00A0Comforts", href: `/about#${aboutSectionAnchors.about}` },
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
    "25+ Years of Excellence",
    "8 Cities Across South India",
    "24-Hour Service Promise",
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
  copyright: "Copyright Sri\u00A0Comforts © 2026 All Rights Reserved ",
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

/**
 * Hero scroll sequence — v3 Kling 3.0 multi-shot (home → office → plant → dusk home).
 * See docs/hero-storyboard-v3-approval.md
 */
/** Master export fps — set after ffprobe on hero master MP4. */
export const HERO_FPS = 24;
export const HERO_DURATION_SEC = 8;

/** Override after extract + `ls … | wc -l`. */
export const HERO_DESKTOP_FRAMES = 192;
export const HERO_MOBILE_FRAMES = 192;

/** Bump when hero frames change — busts browser cache for /public/static/frames. */
export const HERO_FRAMES_VERSION =
  process.env.NEXT_PUBLIC_HERO_FRAMES_VERSION ?? "10-kling-v3";

export function getHeroFramePrefix(isDesktop: boolean) {
  return isDesktop ? `hero_v3_desktop_${HERO_FPS}` : `hero_v3_mobile_${HERO_FPS}`;
}

/** Hero frames load from /public on the same origin as the deployed site. */
export function getHeroFrameUrls(isDesktop: boolean): string[] {
  const count = isDesktop ? HERO_DESKTOP_FRAMES : HERO_MOBILE_FRAMES;
  const prefix = getHeroFramePrefix(isDesktop);
  const path = isDesktop
    ? `/static/frames/home/desktop/v3/webp/${prefix}`
    : `/static/frames/home/mobile/v3/webp/${prefix}`;

  return Array.from(
    { length: count },
    (_, index) => `${path}_${index}.webp?v=${HERO_FRAMES_VERSION}`,
  );
}
