import { aboutWorkImage } from "@/lib/assets/localPaths";

const MID = "var(--color-neutral-mid)";

/** Local team portraits — sourced from Pexels (free license). */
const TEAM = "/images/team";

export const aboutSectionAnchors = {
  about: "about-sri-comforts",
  team: "our-team",
  work: "our-work",
  awards: "awards-recognition",
} as const;

function portrait(src: string, alt: string) {
  return { src, alt };
}

export type AboutTitlePart = string | { strong: string };

export type AboutParagraphPart = {
  text: string;
  color?: string;
  breakBefore?: boolean;
  strong?: boolean;
};

export type AboutSectionIntroData = {
  label?: string;
  title?: string | AboutTitlePart[][];
  titles?: AboutTitlePart[][][];
  variant: string;
  fullscreen?: boolean;
  labelId?: string;
  hideLabel?: boolean;
  sectionId?: string;
  paragraphs?: AboutParagraphPart[][];
  paragraphsMultiple?: boolean;
  buttons?: { label: string; href: string; ariaLabel?: string }[];
};

export type AboutLeaderItem = {
  name: string;
  role: string;
  image: { src: string; alt: string };
  bio?: string[];
};

export type AboutLeadersData = {
  items: AboutLeaderItem[];
};

export type AboutLogoItem = {
  src: string;
  alt?: string;
  scale?: number;
};

export type AboutLogoGridData = {
  logos: AboutLogoItem[];
};

export type AboutFeatureItem = {
  title: string;
  description: string;
  image: { src: string; alt: string };
};

export type AboutFeaturesGridData = {
  items: AboutFeatureItem[];
};

export type AboutHeroData = {
  sectionId: string;
  tag: string;
  titleLead: string;
  titleMid: string;
  titleHighlight: string;
  body: string;
  media: {
    src: string;
    poster: string;
    alt: string;
  };
};

/** Dark action-style hero — Eat Naked “Our Family” layout, Sri Comforts voice. */
export const aboutHero = {
  sectionId: aboutSectionAnchors.about,
  tag: "About Sri\u00A0Comforts",
  titleLead: "Cooling",
  titleMid: "In",
  titleHighlight: "Excellence",
  body: "Sri\u00A0Comforts delivers advanced HVAC & R solutions across South India. Since 2001, we've led design, installation, and service for commercial, industrial, and residential spaces — with a 24-hour service promise.",
  media: {
    src: "/assets/about-us.mp4",
    poster: aboutWorkImage(0),
    alt: "Sri\u00A0Comforts team and projects in action",
  },
} as const satisfies AboutHeroData;

export const aboutLeadersIntro = {
  label: "Our Team",
  title: [
    [{ strong: "Powered" }, " by "],
    [{ strong: "innovators" }, " in cooling "],
    ["& ", { strong: "experts" }, " in service"],
  ],
  variant: "si-big about-si2",
  fullscreen: false,
  sectionId: aboutSectionAnchors.team,
  labelId: "about-leaders-label",
  paragraphs: [
    [
      {
        text: "Sri\u00A0Comforts leaders drive towards a combined mission with extreme ownership, smart execution, and passionate innovation.",
        color: "var(--color-neutral-mid)",
      },
      {
        text: "Meet the specialists at the helm:",
        color: "var(--color-neutral-mid)",
        breakBefore: true,
      },
    ],
  ],
} as const satisfies AboutSectionIntroData;

export type AboutStoryValueItem = {
  title: string;
  description: string;
};

export type AboutStoryValuesData = {
  label: string;
  title: string;
  titleAccent: string;
  lead: string;
  paragraphs: string[];
  valuesLabel: string;
  values: AboutStoryValueItem[];
};

export const aboutStoryValues = {
  label: "Our Story",
  title: "Built for comfort.",
  titleAccent: "Driven by craft.",
  lead: "Since 2001, Sri\u00A0Comforts has grown from a single-city team into South India's trusted HVAC leader — serving IT parks, hospitals, pharma plants, luxury residences, and commercial developments across eight cities with 230+ engineers and technicians.",
  paragraphs: [
    "We are reinventing how cooling gets delivered — on a design-first, service-backed model powered by dedicated AutoCAD teams, award-winning project delivery, and a 24-hour response guarantee on every service call.",
    "From VRV and central air conditioning to clean rooms, cold rooms, and basement ventilation, we deliver systems that are deeply integrated, energy-efficient, and ready for operation from day one.",
    "With deep market experience and partnerships across Daikin, O General, LG, and Panasonic, Sri\u00A0Comforts is setting the standard for modern HVAC in South India.",
  ],
  valuesLabel: "Our Values",
  values: [
    {
      title: "Design-first delivery",
      description:
        "Every project starts with precise engineering drawings and site-fit planning before a single pipe is laid.",
    },
    {
      title: "Service without pause",
      description:
        "A guaranteed 24-hour response on every complaint and query — uptime is part of the promise.",
    },
    {
      title: "Integrated systems",
      description:
        "VRV, central air, clean rooms, cold rooms, and ventilation — built to work as one from day one.",
    },
    {
      title: "Partnership depth",
      description:
        "Authorized with leading brands, accountable end to end — from specification through service life.",
    },
  ],
} as const satisfies AboutStoryValuesData;

export const aboutExecutiveLeaders = {
  items: [
    {
      name: "Srinivas Reddy",
      role: "Managing Director",
      image: portrait(`${TEAM}/executive/srinivas-reddy.webp`, "Srinivas Reddy, Managing Director"),
      bio: [
        "As Managing Director, Srinivas leads Sri\u00A0Comforts with a vision to set the standard for HVAC delivery across South India — combining deep project expertise with uncompromising service.",
        "Under his leadership, the company has expanded to eight cities while maintaining the 24-hour response promise that defines the Sri\u00A0Comforts brand.",
      ],
    },
    {
      name: "Rajesh Kumar",
      role: "Director, Commercial Projects",
      image: portrait(`${TEAM}/executive/rajesh-kumar.webp`, "Rajesh Kumar, Director of Commercial Projects"),
      bio: [
        "Rajesh oversees large-scale commercial and industrial installations — from IT parks to manufacturing plants — ensuring every project meets design specs and commissioning standards.",
        "He works closely with architects, builders, and facility teams to deliver cooling systems built for long-term performance.",
      ],
    },
    {
      name: "Priya Nair",
      role: "Head of VRV Solutions",
      image: portrait(`${TEAM}/executive/priya-nair.webp`, "Priya Nair, Head of VRV Solutions"),
      bio: [
        "Priya leads Sri\u00A0Comforts' VRV practice — widely recognized as pioneers in Variable Refrigerant Volume systems across the region.",
        "She drives technical evaluation, system design, and deployment for high-efficiency multi-zone cooling in commercial and premium residential projects.",
      ],
    },
    {
      name: "Venkatesh Rao",
      role: "Head of Engineering & Design",
      image: portrait(`${TEAM}/executive/venkatesh-rao.webp`, "Venkatesh Rao, Head of Engineering & Design"),
      bio: [
        "Venkatesh heads the AutoCAD and MEP design team, producing detailed engineering drawings that translate complex site requirements into build-ready HVAC plans.",
        "His team ensures every installation is precisely specified before a single pipe is laid.",
      ],
    },
    {
      name: "Anil Sharma",
      role: "Head of Service Operations",
      image: portrait(`${TEAM}/executive/anil-sharma.webp`, "Anil Sharma, Head of Service Operations"),
      bio: [
        "Anil runs Sri\u00A0Comforts' post-sales service organization — the team behind the company's guaranteed 24-hour response on complaints and queries.",
        "He builds the processes, spare-parts readiness, and technician training that keep critical cooling systems running without interruption.",
      ],
    },
    {
      name: "Meera Krishnan",
      role: "Head of Sales",
      image: portrait(`${TEAM}/executive/meera-krishnan.webp`, "Meera Krishnan, Head of Sales"),
      bio: [
        "Meera leads commercial and residential sales across Sri\u00A0Comforts' eight-city footprint, matching client needs to the right systems for every application.",
        "She focuses on transparent proposals, energy-efficiency outcomes, and long-term AMC relationships.",
      ],
    },
    {
      name: "Suresh Patel",
      role: "Head of Business Development",
      image: portrait(`${TEAM}/executive/suresh-patel.webp`, "Suresh Patel, Head of Business Development"),
      bio: [
        "Suresh identifies and develops strategic accounts in real estate, healthcare, education, and industrial sectors where reliable cooling is mission-critical.",
        "He partners with developers and facility managers from project concept through handover and beyond.",
      ],
    },
    {
      name: "Lakshmi Iyer",
      role: "Head of People & HR",
      image: portrait(`${TEAM}/executive/lakshmi-iyer.webp`, "Lakshmi Iyer, Head of People & HR"),
      bio: [
        "Lakshmi builds and supports the 230+ engineer and technician team that powers Sri\u00A0Comforts' delivery and service promise.",
        "She oversees hiring, training, and the specialized team structure that keeps design, project, sales, and service operations running in sync.",
      ],
    },
  ],
} as const satisfies AboutLeadersData;

export const aboutPartnersIntro = {
  label: "Our Brand Partners",
  title: "Trusted brands. Sri\u00A0Comforts delivery.",
  variant: "",
  paragraphs: [
    [
      {
        text: "We work with leading HVAC brands — and bring 25+ years of design, install, and service experience to every project. The partnership matters; the delivery is ours.",
        color: MID,
      },
    ],
  ],
} as const satisfies AboutSectionIntroData;

export const aboutBrandPartners = {
  items: [
    {
      name: "Daikin India",
      role: "Authorized Top-Tier Dealer",
      image: portrait(`${TEAM}/partners/daikin-partner.webp`, "Daikin India partnership"),
      bio: [
        "An authorized Daikin dealer since 2001 — giving Sri\u00A0Comforts access to VRV, central air, ductable systems, and AHUs with factory-backed support.",
        "We bring the experience: design teams, project delivery, and a 24-hour service promise that turn products into lasting comfort.",
      ],
    },
    {
      name: "O General",
      role: "Authorized Partner",
      image: portrait(`${TEAM}/partners/ogeneral-partner.webp`, "O General partnership"),
      bio: [
        "As an authorized O General partner, Sri\u00A0Comforts extends its portfolio with trusted split and commercial systems.",
        "One accountable partner — the right product mix, with Sri\u00A0Comforts owning design through service.",
      ],
    },
  ],
} as const satisfies AboutLeadersData;

export const aboutPartnersBackingIntro = {
  hideLabel: true,
  title: "Partnerships that perform",
  variant: "",
  paragraphs: [
    [
      {
        text: "Trusted brands and deep market experience — Sri\u00A0Comforts carries Daikin, O General, LG, and Panasonic, then delivers the design, install, and service that set us apart.",
        color: MID,
      },
    ],
  ],
} as const satisfies AboutSectionIntroData;

export const aboutBrandLogos = {
  logos: [
    { src: "/logos/placeholder/logo-01.svg", alt: "", scale: 85 },
    { src: "/logos/placeholder/logo-06.svg", alt: "", scale: 85 },
    { src: "/logos/placeholder/logo-07.svg", alt: "", scale: 85 },
    { src: "/logos/placeholder/logo-08.svg", alt: "", scale: 85 },
    { src: "/logos/placeholder/logo-09.svg", alt: "", scale: 85 },
  ],
} as const satisfies AboutLogoGridData;

export const aboutAdvisoryIntro = {
  label: "Technical Advisory Panel",
  title: "Thinking big, delivering comfort",
  variant: "",
  paragraphs: [
    [
      {
        text: "Our advisors bring deep expertise in MEP design, controlled environments, and large-scale commercial development — helping Sri\u00A0Comforts turn complex cooling challenges into reliable, scalable solutions.",
        color: MID,
      },
    ],
  ],
} as const satisfies AboutSectionIntroData;

export const aboutAdvisors = {
  items: [
    {
      name: "Dr. Ramesh Varma",
      role: "MEP & Building Services",
      image: portrait(`${TEAM}/advisors/ramesh-varma.webp`, "Dr. Ramesh Varma, MEP advisor"),
      bio: [
        "Dr. Varma advises on integrated MEP design for large commercial and mixed-use developments, ensuring HVAC systems align with architectural and structural constraints from the earliest planning stages.",
      ],
    },
    {
      name: "Kavitha Menon",
      role: "Pharma & Clean Room",
      image: portrait(`${TEAM}/advisors/kavitha-menon.webp`, "Kavitha Menon, clean room advisor"),
      bio: [
        "Kavitha brings expertise in controlled environments for pharmaceutical and healthcare facilities — where precision cooling, filtration, and compliance are non-negotiable.",
      ],
    },
    {
      name: "Arjun Mehta",
      role: "Real Estate & IT Parks",
      image: portrait(`${TEAM}/advisors/arjun-mehta.webp`, "Arjun Mehta, real estate advisor"),
      bio: [
        "Arjun advises on cooling strategy for IT parks, retail developments, and premium residential projects — balancing capex, operating cost, and tenant comfort across multi-phase builds.",
      ],
    },
    {
      name: "Deepak Singh",
      role: "Industrial & Manufacturing",
      image: portrait(`${TEAM}/advisors/deepak-singh.webp`, "Deepak Singh, industrial advisor"),
      bio: [
        "Deepak supports industrial and manufacturing clients where process cooling, plant ventilation, and uptime requirements demand robust system design and responsive maintenance.",
      ],
    },
  ],
} as const satisfies AboutLeadersData;

export const aboutTeamCta = {
  label: "Our Team",
  titles: [[["Ready to make"]], [["comfort flow?"]]],
  variant: "",
  hideLabel: false,
  labelId: "about-team-cta-label",
  buttons: [{ label: "JOIN OUR TEAM", href: "/career", ariaLabel: "Join our team" }],
} as const satisfies AboutSectionIntroData;

export const aboutFeaturesGrid = {
  items: [
    {
      title: "Built on expertise, trusted across South India",
      description:
        "Sri\u00A0Comforts is not a typical AC contractor. Since 2001, we've delivered complex HVAC across eight cities with 230+ engineers — from government and hospital projects to premium residences.",
      image: {
        src: aboutWorkImage(0),
        alt: "Sri\u00A0Comforts commercial HVAC project site",
      },
    },
    {
      title: "Based on a proven delivery model",
      description:
        "Our approach follows decades of hands-on project experience. By working closely with architects, builders, and facility teams, we deliver systems that are deeply integrated and ready for operation from day one.",
      image: {
        src: aboutWorkImage(1),
        alt: "Sri\u00A0Comforts HVAC system installation",
      },
    },
    {
      title: "Positioned as the standard",
      description:
        "Award-winning sales and service, specialized AutoCAD design teams, and a 24-hour response guarantee — Sri\u00A0Comforts is the trusted standard for modern HVAC in South India.",
      image: {
        src: aboutWorkImage(2),
        alt: "Sri\u00A0Comforts service and maintenance team",
      },
    },
  ],
} as const satisfies AboutFeaturesGridData;
