const STORYBLOK = "https://a.storyblok.com";
const MID = "var(--color-neutral-mid)";

export const aboutSectionAnchors = {
  about: "about-sri-comforts",
  team: "our-team",
  work: "our-work",
  awards: "awards-recognition",
} as const;

function portrait(path: string, alt: string) {
  return {
    src: `${STORYBLOK}/f/337048/${path}/m/985x0/filters:format(webp):quality(85)`,
    alt,
  };
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

export const aboutSectionIntro = {
  label: "About Sri Comforts",
  title: "A new standard in cooling excellence",
  variant: "about-si1",
  fullscreen: true,
  sectionId: aboutSectionAnchors.about,
  labelId: "about-section-label",
  paragraphs: [
    [
      {
        text: "Sri Comforts is a different kind of HVAC partner. Since 2001, we've grown into an authorized top-tier Daikin dealer — turning complex cooling challenges into reliable comfort across commercial, industrial, and residential spaces in South India.",
        color: "var(--color-neutral-mid)",
      },
    ],
  ],
} as const satisfies AboutSectionIntroData;

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
        text: "Sri Comforts leaders drive towards a combined mission with extreme ownership, smart execution, and passionate innovation.",
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

export const aboutStoryValues = {
  hideLabel: true,
  title: "Our story, our values",
  variant: "about-si1",
  fullscreen: false,
  paragraphsMultiple: true,
  paragraphs: [
    [
      { text: "Since 2001, ", color: MID },
      {
        text: "Sri Comforts has grown from a single-city dealer into South India's trusted HVAC partner",
        color: MID,
        strong: true,
      },
      {
        text: " — serving IT parks, hospitals, pharma plants, luxury residences, and commercial developments across eight cities with 230+ engineers and technicians.",
        color: MID,
      },
    ],
    [],
    [{ text: "Sri Comforts is reinventing how cooling gets delivered.", color: MID, strong: true }],
    [],
    [
      { text: "We are building on a ", color: MID },
      {
        text: "design-first, service-backed model",
        color: MID,
        strong: true,
      },
      {
        text: " — authorized by Daikin, powered by dedicated AutoCAD teams, and committed to a 24-hour response guarantee on every service call.",
        color: MID,
      },
    ],
    [
      { text: "From ", color: MID },
      { text: "VRV and central air conditioning", color: MID, strong: true },
      { text: " to ", color: MID },
      { text: "clean rooms, cold rooms, and basement ventilation", color: MID, strong: true },
      {
        text: ", Sri Comforts delivers systems that are deeply integrated, energy-efficient, and ready for operation from day one.",
        color: MID,
        breakBefore: false,
      },
    ],
    [
      {
        text: "With partnerships across Daikin, O General, LG, and Panasonic, Sri Comforts is ",
        color: MID,
      },
      {
        text: "setting the standard for modern HVAC in South India.",
        color: MID,
        strong: true,
      },
    ],
  ],
} as const satisfies AboutSectionIntroData;

export const aboutExecutiveLeaders = {
  items: [
    {
      name: "Srinivas Reddy",
      role: "Managing Director",
      image: portrait("3200x3200/9b88dbf54c/darin.png", "Srinivas Reddy, Managing Director"),
      bio: [
        "As Managing Director, Srinivas leads Sri Comforts with a vision to set a new standard for HVAC delivery across South India — combining authorized Daikin expertise with uncompromising service.",
        "Under his leadership, the company has expanded to eight cities while maintaining the 24-hour response promise that defines the Sri Comforts brand.",
      ],
    },
    {
      name: "Rajesh Kumar",
      role: "Director, Commercial Projects",
      image: portrait("3200x3200/f8528902d5/chris.png", "Rajesh Kumar, Director of Commercial Projects"),
      bio: [
        "Rajesh oversees large-scale commercial and industrial installations — from IT parks to manufacturing plants — ensuring every project meets design specs and commissioning standards.",
        "He works closely with architects, builders, and facility teams to deliver cooling systems built for long-term performance.",
      ],
    },
    {
      name: "Priya Nair",
      role: "Head of VRV Solutions",
      image: portrait("2520x2232/c81154c652/ryan5.jpeg", "Priya Nair, Head of VRV Solutions"),
      bio: [
        "Priya leads Sri Comforts' VRV practice — widely recognized as pioneers in Variable Refrigerant Volume systems across the region.",
        "She drives technical evaluation, system design, and deployment for high-efficiency multi-zone cooling in commercial and premium residential projects.",
      ],
    },
    {
      name: "Venkatesh Rao",
      role: "Head of Engineering & Design",
      image: portrait("3200x3200/dd1a8c046d/jeff.png", "Venkatesh Rao, Head of Engineering & Design"),
      bio: [
        "Venkatesh heads the AutoCAD and MEP design team, producing detailed engineering drawings that translate complex site requirements into build-ready HVAC plans.",
        "His team ensures every installation is precisely specified before a single pipe is laid.",
      ],
    },
    {
      name: "Anil Sharma",
      role: "Head of Service Operations",
      image: portrait("786x765/0b0c3301cd/ryan-clifford-4.png", "Anil Sharma, Head of Service Operations"),
      bio: [
        "Anil runs Sri Comforts' post-sales service organization — the team behind the company's guaranteed 24-hour response on complaints and queries.",
        "He builds the processes, spare-parts readiness, and technician training that keep critical cooling systems running without interruption.",
      ],
    },
    {
      name: "Meera Krishnan",
      role: "Head of Sales",
      image: portrait("3200x3200/6ac0273b94/corbin.png", "Meera Krishnan, Head of Sales"),
      bio: [
        "Meera leads commercial and residential sales across Sri Comforts' eight-city footprint, matching client needs to the right Daikin and partner-brand systems.",
        "She focuses on transparent proposals, energy-efficiency outcomes, and long-term AMC relationships.",
      ],
    },
    {
      name: "Suresh Patel",
      role: "Head of Business Development",
      image: portrait("3200x3200/1a0e41daa1/josh.png", "Suresh Patel, Head of Business Development"),
      bio: [
        "Suresh identifies and develops strategic accounts in real estate, healthcare, education, and industrial sectors where reliable cooling is mission-critical.",
        "He partners with developers and facility managers from project concept through handover and beyond.",
      ],
    },
    {
      name: "Lakshmi Iyer",
      role: "Head of People & HR",
      image: portrait("3200x3200/6e7b6cf7b4/tristan.png", "Lakshmi Iyer, Head of People & HR"),
      bio: [
        "Lakshmi builds and supports the 230+ engineer and technician team that powers Sri Comforts' delivery and service promise.",
        "She oversees hiring, training, and the specialized team structure that keeps design, project, sales, and service operations running in sync.",
      ],
    },
  ],
} as const satisfies AboutLeadersData;

export const aboutPartnersIntro = {
  label: "Our Brand Partners",
  title: "Backed by decades of HVAC expertise",
  variant: "",
  paragraphs: [
    [
      {
        text: "Our leadership, brand partners, and advisors share a commitment to raising the standard for cooling in South India. They see us solving problems that matter — and delivering systems that perform from day one.",
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
      image: portrait("500x500/92d925461d/joe-lonsdale-bw.jpeg", "Daikin India partnership"),
      bio: [
        "Sri Comforts is an authorized top-tier Daikin dealer — delivering VRV, central air conditioning, ductable systems, and AHUs with factory-backed support and genuine parts.",
        "This partnership is the foundation of our technical credibility and product range across commercial, industrial, and residential segments.",
      ],
    },
    {
      name: "O General",
      role: "Authorized Partner",
      image: portrait("601x614/5ce2334068/jake-medwell-bw2.jpeg", "O General partnership"),
      bio: [
        "As an authorized O General partner, Sri Comforts extends its portfolio with trusted split and commercial systems for clients who need proven reliability.",
        "Combined with Daikin VRV expertise, this gives customers a complete range of cooling solutions under one accountable partner.",
      ],
    },
  ],
} as const satisfies AboutLeadersData;

export const aboutPartnersBackingIntro = {
  hideLabel: true,
  title: "Partnerships that perform",
  sectionId: aboutSectionAnchors.awards,
  variant: "",
  paragraphs: [
    [
      {
        text: "Trusted by leading brands and built on authorized partnerships — Sri Comforts carries Daikin, O General, LG, and Panasonic to deliver the right system for every application.",
        color: MID,
      },
    ],
  ],
} as const satisfies AboutSectionIntroData;

export const aboutBrandLogos = {
  logos: [
    { src: `${STORYBLOK}/f/337048/114x45/04e08dca33/8vc.svg`, alt: "Daikin", scale: 85 },
    { src: `${STORYBLOK}/f/337048/176x49/27affef2ea/ryder-green.svg`, alt: "O General", scale: 85 },
    { src: `${STORYBLOK}/f/337048/170x44/9386c9fae8/lineage.svg`, alt: "LG", scale: 85 },
    { src: `${STORYBLOK}/f/337048/249x47/15a7349d4e/prologis.svg`, alt: "Panasonic", scale: 85 },
    { src: `${STORYBLOK}/f/337048/161x62/44ea74f049/nfi.svg`, alt: "Sri Comforts", scale: 85 },
  ],
} as const satisfies AboutLogoGridData;

export const aboutAdvisoryIntro = {
  label: "Technical Advisory Panel",
  title: "Thinking big, delivering comfort",
  variant: "",
  paragraphs: [
    [
      {
        text: "Our advisors bring deep expertise in MEP design, controlled environments, and large-scale commercial development — helping Sri Comforts turn complex cooling challenges into reliable, scalable solutions.",
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
      image: portrait("473x398/557030d8e3/shaleen-devgun.jpg", "Dr. Ramesh Varma, MEP advisor"),
      bio: [
        "Dr. Varma advises on integrated MEP design for large commercial and mixed-use developments, ensuring HVAC systems align with architectural and structural constraints from the earliest planning stages.",
      ],
    },
    {
      name: "Kavitha Menon",
      role: "Pharma & Clean Room",
      image: portrait("764x862/1b5c74bb07/andy-clarke-bw2.jpeg", "Kavitha Menon, clean room advisor"),
      bio: [
        "Kavitha brings expertise in controlled environments for pharmaceutical and healthcare facilities — where precision cooling, filtration, and compliance are non-negotiable.",
      ],
    },
    {
      name: "Arjun Mehta",
      role: "Real Estate & IT Parks",
      image: portrait("423x468/6de342ec68/alan-gershenhorn-bw2.jpeg", "Arjun Mehta, real estate advisor"),
      bio: [
        "Arjun advises on cooling strategy for IT parks, retail developments, and premium residential projects — balancing capex, operating cost, and tenant comfort across multi-phase builds.",
      ],
    },
    {
      name: "Deepak Singh",
      role: "Industrial & Manufacturing",
      image: portrait("658x522/90e8dedb1a/will-urban-bw2.jpg", "Deepak Singh, industrial advisor"),
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
        "Sri Comforts is not a typical AC dealer. Since 2001, we've grown into an authorized top-tier Daikin partner with 230+ engineers across eight cities — built to solve complex cooling challenges and set the standard for design, installation, and service.",
      image: {
        src: `${STORYBLOK}/f/337048/4000x2146/a678449480/dockdoortrucks.jpg/m/1920x0/filters:format(webp):quality(85)`,
        alt: "Sri Comforts commercial HVAC project site",
      },
    },
    {
      title: "Based on a proven delivery model",
      description:
        "Our approach follows decades of hands-on project experience. By working closely with architects, builders, and facility teams, we deliver systems that are deeply integrated and ready for operation from day one.",
      image: {
        src: `${STORYBLOK}/f/337048/6000x4000/b07cf34a51/light.jpg/m/1920x0/filters:format(webp):quality(85)`,
        alt: "Sri Comforts HVAC system installation",
      },
    },
    {
      title: "Positioned as the standard",
      description:
        "Authorized by Daikin, supported by specialized AutoCAD design teams, and backed by a 24-hour service guarantee, Sri Comforts is uniquely positioned — not as another contractor, but as the trusted standard for modern HVAC in South India.",
      image: {
        src: `${STORYBLOK}/f/337048/5184x3888/cc766cc7f3/truck-at-night.jpg/m/1920x0/filters:format(webp):quality(85)`,
        alt: "Sri Comforts service and maintenance team",
      },
    },
  ],
} as const satisfies AboutFeaturesGridData;
