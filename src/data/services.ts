import {
  serviceCarouselImage,
  serviceFeatureImage,
} from "@/data/serviceImages";
import {
  type SolutionIntroData,
  type SolutionValueData,
} from "@/data/solutions";
import { serviceMeshImage } from "@/lib/assets/localPaths";

function mesh(index: number) {
  return serviceMeshImage(index);
}

export type ServiceIntroData = SolutionIntroData & {
  theme?: "dark";
};

export type ServiceFeatureGridItem = {
  label: string;
  title: string;
  description: string;
  image: { src: string; alt: string };
  cta?: { label: string; href: string };
};

export type ServiceFeatureGridData = {
  items: ServiceFeatureGridItem[];
  cta?: { label: string; href: string };
};

export type ServiceCarouselItem = {
  tabLabel: string;
  title: string;
  description: string;
  image: { src: string; alt: string };
  backgroundColor: string;
  color: string;
  cta?: { label: string; href: string };
};

export type ServiceCarouselData = {
  label: string;
  title: string;
  copy: string;
  items: ServiceCarouselItem[];
};

export type ServicePageData = {
  slug: string;
  meta: { title: string; description: string };
  hero: ServiceIntroData;
  darkIntro: ServiceIntroData;
  breakdownIntro: SolutionIntroData;
  featuresGrid: ServiceFeatureGridData;
  platformCarousel: ServiceCarouselData;
  value: SolutionValueData;
};

type ServiceSlug = "how-we-work" | "amc" | "service-request";

function carouselSurfaces() {
  return [
    {
      backgroundColor: "var(--color-brand-accent-bright)",
      color: "var(--color-brand-ink)",
    },
    {
      backgroundColor: "var(--color-neutral-soft)",
      color: "var(--color-brand-ink)",
    },
    {
      backgroundColor: "var(--color-brand-ink)",
      color: "var(--color-neutral-white)",
    },
    {
      backgroundColor: "var(--color-brand-neon)",
      color: "var(--color-brand-ink)",
    },
  ] as const;
}

function buildHowWeWork(): ServicePageData {
  const slug = "how-we-work" as const;
  const surfaces = carouselSurfaces();

  return {
    slug,
    meta: {
      title: "How We Work | Sri Comforts HVAC Process",
      description:
        "Discover Sri Comforts' end-to-end HVAC process — from site survey and Daikin system design to precision installation, commissioning, and ongoing AMC across South India.",
    },
    hero: {
      label: "How We Work",
      title: "The Only End-to-End HVAC Partner Built for South India's Climate",
      paragraphs: [
        "From first site survey to final commissioning and beyond, Sri Comforts delivers a unified process where design, installation, and service teams work as one — transforming how your building stays cool, efficient, and reliable.",
      ],
      fullscreen: true,
    },
    darkIntro: {
      label: "",
      title: "A Seamless Bridge from Assessment to Occupied Comfort",
      paragraphs: [
        "Sri Comforts is built to close the gaps between HVAC design, installation, and maintenance. Our process begins with load calculation and AutoCAD layout, then carries through Daikin-authorized installation, commissioning, and proactive AMC — so every zone performs from day one.",
      ],
      theme: "dark",
    },
    breakdownIntro: {
      label: "",
      title: "Breaking Down the Sri Comforts Service Process",
    },
    featuresGrid: {
      items: [
        {
          label: "Site Assessment",
          title: "Survey Before We Specify",
          description:
            "Every project starts with heat load analysis, site constraints mapping, and stakeholder alignment — so specifications match real occupancy, not guesswork.",
          image: {
            src: serviceFeatureImage(slug, 0),
            alt: "HVAC site assessment",
          },
          cta: { label: "Learn More", href: "/contact" },
        },
        {
          label: "System Design",
          title: "Designed with Daikin Precision",
          description:
            "Authorized Daikin VRF and split specifications, duct layouts, and electrical load plans — engineered for your building's unique zones and peak demands.",
          image: {
            src: serviceFeatureImage(slug, 1),
            alt: "HVAC system design",
          },
          cta: { label: "Learn More", href: "/contact" },
        },
        {
          label: "Modular Delivery",
          title: "Configured For Your Timeline",
          description:
            "Most contractors install how they always have. Sri Comforts phases work around your occupancy — coordinating risers, plant rooms, and tenant fit-outs without disruption.",
          image: {
            src: serviceFeatureImage(slug, 2),
            alt: "Modular HVAC delivery",
          },
          cta: { label: "Learn More", href: "/contact" },
        },
        {
          label: "Portfolio Visibility",
          title: "Manage All Your Sites",
          description:
            "Single point of contact across Hyderabad, Bengaluru, and Chennai — consolidated reporting, AMC schedules, and service history for every property in your portfolio.",
          image: {
            src: serviceFeatureImage(slug, 3),
            alt: "Portfolio HVAC management",
          },
          cta: { label: "Learn More", href: "/contact" },
        },
        {
          label: "Commissioning Excellence",
          title: "Built-In Quality Assurance",
          description:
            "Factory-trained commissioning isn't an add-on — it's the standard at every handover. Balanced airflow, refrigerant charge verification, and performance sign-off before we leave site.",
          image: {
            src: serviceFeatureImage(slug, 4),
            alt: "HVAC commissioning",
          },
          cta: { label: "Learn More", href: "/contact" },
        },
        {
          label: "AMC Integration",
          title: "Reimagined After-Sales Support",
          description:
            "Our AMC plans connect directly to installation records — scheduled preventive maintenance, priority breakdown response, and spare parts traceability from day one.",
          image: {
            src: serviceFeatureImage(slug, 5),
            alt: "AMC integration",
          },
          cta: { label: "Learn More", href: "/contact" },
        },
        {
          label: "Lifecycle Services",
          title: "Go Beyond Standard Warranties",
          description:
            "Retrofit planning, energy audits, expansion readiness, and refrigerant compliance — Sri Comforts extends support where typical contractors stop at handover.",
          image: {
            src: serviceFeatureImage(slug, 6),
            alt: "Lifecycle HVAC services",
          },
          cta: { label: "Learn More", href: "/contact" },
        },
      ],
    },
    platformCarousel: {
      label: "Process",
      title: "One Integrated Process, Infinite Comfort Possibilities",
      copy: "From survey to service, Sri Comforts is designed to eliminate rework, optimize technician productivity, and deliver maximum visibility of every system across your portfolio.",
      items: [
        {
          tabLabel: "Survey & Assessment",
          title: "Survey and Specify With Confidence",
          description:
            "Our team conducts heat load calculations, site surveys, and stakeholder workshops before a single unit is specified — ensuring Daikin systems are right-sized for your building and budget.",
          image: { src: serviceCarouselImage(slug, 0), alt: "HVAC assessment" },
          ...surfaces[0],
        },
        {
          tabLabel: "Installation",
          title: "Precision Install With Minimal Disruption",
          description:
            "Factory-trained teams execute ducting, piping, and electrical work with phased scheduling — keeping occupied floors operational while plant rooms and risers come online.",
          image: { src: serviceCarouselImage(slug, 1), alt: "HVAC installation" },
          ...surfaces[1],
        },
        {
          tabLabel: "Commissioning",
          title: "Verify Performance Before Handover",
          description:
            "Every system is balanced, tested, and documented — airflow verification, refrigerant charge checks, and client sign-off ensure comfort matches design intent from day one.",
          image: { src: serviceCarouselImage(slug, 2), alt: "HVAC commissioning" },
          ...surfaces[2],
        },
        {
          tabLabel: "Ongoing Support",
          title: "A Unified, Connected Service Record",
          description:
            "From commissioning through AMC, our platform tracks every unit, every visit, and every part — giving facility teams real-time visibility and leadership the data to plan upgrades wisely.",
          image: { src: serviceCarouselImage(slug, 3), alt: "Ongoing HVAC support" },
          ...surfaces[3],
        },
      ],
    },
    value: {
      title: "Our Value",
      cards: [
        {
          title: "Maximum system reliability",
          copy: "Sri Comforts delivers verified commissioning and proactive AMC to keep your operations comfortable and equipment performing at peak efficiency.",
          image: { src: mesh(0), alt: "System reliability" },
        },
        {
          title: "Scalable, easy operation",
          copy: "With phased installation and a single service partner across South India, expanding your footprint doesn't mean multiplying HVAC vendors.",
          image: { src: mesh(1), alt: "Scalable operation" },
        },
        {
          title: "Affordable, rapid ROI",
          copy: "Right-sized Daikin systems and energy-efficient design help you avoid overspend on capacity — delivering measurable savings from the first cooling season.",
          image: { src: mesh(2), alt: "Rapid ROI" },
        },
      ],
    },
  };
}

function buildAmc(): ServicePageData {
  const slug = "amc" as const;
  const surfaces = carouselSurfaces();
  const base = buildHowWeWork();

  return {
    ...base,
    slug,
    meta: {
      title: "AMC Plans | Sri Comforts Annual Maintenance",
      description:
        "Protect your HVAC investment with Sri Comforts AMC plans — scheduled preventive maintenance, priority breakdown response, and Daikin-authorized spare parts across South India.",
    },
    hero: {
      label: "AMC Plans",
      title: "The Proactive Maintenance Partner Your HVAC Systems Deserve",
      paragraphs: [
        "Stop waiting for breakdowns to discover problems. Sri Comforts AMC plans deliver scheduled inspections, priority response, and documented service history — keeping Daikin systems efficient year after year.",
      ],
      fullscreen: true,
    },
    darkIntro: {
      label: "",
      title: "From Reactive Fixes to Predictable Performance",
      paragraphs: [
        "Most building owners only call when something fails. Sri Comforts AMC inverts that model — preventive maintenance aligned to manufacturer guidelines, seasonal tune-ups before peak load, and a dedicated service desk that knows your equipment history.",
      ],
      theme: "dark",
    },
    breakdownIntro: {
      label: "",
      title: "Breaking Down Sri Comforts AMC Coverage",
    },
    featuresGrid: {
      items: [
        {
          label: "Preventive Maintenance",
          title: "Scheduled Before Problems Start",
          description:
            "Quarterly and seasonal inspections cover filters, coils, refrigerant levels, and electrical connections — catching wear before it becomes a breakdown.",
          image: { src: serviceFeatureImage(slug, 0), alt: "Preventive maintenance" },
          cta: { label: "Learn More", href: "/contact" },
        },
        {
          label: "Priority Response",
          title: "Breakdown Support When It Matters",
          description:
            "AMC clients receive priority dispatch across Hyderabad, Bengaluru, and Chennai — with target response times that keep tenants and operations protected.",
          image: { src: serviceFeatureImage(slug, 1), alt: "Priority response" },
          cta: { label: "Learn More", href: "/contact" },
        },
        {
          label: "Genuine Parts",
          title: "Daikin-Authorized Components",
          description:
            "Every replacement part is sourced through authorized Daikin channels — protecting warranty coverage and ensuring compatibility with your installed systems.",
          image: { src: serviceFeatureImage(slug, 2), alt: "Genuine Daikin parts" },
          cta: { label: "Learn More", href: "/contact" },
        },
        {
          label: "Service Records",
          title: "Full History at Your Fingertips",
          description:
            "Digital service logs for every unit, every visit, and every part replaced — giving facility teams and auditors complete traceability.",
          image: { src: serviceFeatureImage(slug, 3), alt: "Service records" },
          cta: { label: "Learn More", href: "/contact" },
        },
        {
          label: "Energy Optimization",
          title: "Efficiency Built Into Every Visit",
          description:
            "Technicians don't just fix — they tune. Coil cleaning, airflow balancing, and control calibration keep energy bills in check season after season.",
          image: { src: serviceFeatureImage(slug, 4), alt: "Energy optimization" },
          cta: { label: "Learn More", href: "/contact" },
        },
        {
          label: "Flexible Plans",
          title: "Coverage That Matches Your Portfolio",
          description:
            "From single-site residential splits to multi-building commercial VRF networks — AMC tiers scale with unit count, criticality, and response requirements.",
          image: { src: serviceFeatureImage(slug, 5), alt: "Flexible AMC plans" },
          cta: { label: "Learn More", href: "/contact" },
        },
        {
          label: "Compliance Support",
          title: "Stay Ahead of Regulations",
          description:
            "Refrigerant handling documentation, F-gas compliance guidance, and audit-ready maintenance records — reducing regulatory risk for facility managers.",
          image: { src: serviceFeatureImage(slug, 6), alt: "Compliance support" },
          cta: { label: "Learn More", href: "/contact" },
        },
      ],
    },
    platformCarousel: {
      label: "Coverage",
      title: "One AMC Platform, Complete Equipment Protection",
      copy: "From split units to central plant, Sri Comforts AMC is designed to maintain performance, reduce emergency calls, and extend equipment life across your entire portfolio.",
      items: [
        {
          tabLabel: "Inspection",
          title: "Systematic Preventive Checks",
          description:
            "Scheduled visits cover every critical component — filters, coils, drains, electrical, and controls — with findings documented and shared with your facility team.",
          image: { src: serviceCarouselImage(slug, 0), alt: "AMC inspection" },
          ...surfaces[0],
        },
        {
          tabLabel: "Breakdown",
          title: "Priority Emergency Response",
          description:
            "When systems fail, AMC clients jump the queue — factory-trained technicians dispatched with equipment history in hand, reducing diagnosis time and repeat visits.",
          image: { src: serviceCarouselImage(slug, 1), alt: "Breakdown response" },
          ...surfaces[1],
        },
        {
          tabLabel: "Parts & Repair",
          title: "Authorized Repairs Done Right",
          description:
            "Genuine Daikin components, proper refrigerant handling, and post-repair performance verification — protecting warranty and restoring comfort fast.",
          image: { src: serviceCarouselImage(slug, 2), alt: "Parts and repair" },
          ...surfaces[2],
        },
        {
          tabLabel: "Reporting",
          title: "Data-Driven Maintenance Insights",
          description:
            "Service summaries, energy trend notes, and upgrade recommendations — giving leadership the visibility to plan capital replacements before failures force them.",
          image: { src: serviceCarouselImage(slug, 3), alt: "Maintenance reporting" },
          ...surfaces[3],
        },
      ],
    },
    value: {
      title: "Our Value",
      cards: [
        {
          title: "Maximum uptime",
          copy: "Preventive maintenance and priority response keep critical spaces cooled — reducing tenant complaints and unplanned capital spend.",
          image: { src: mesh(0), alt: "Maximum uptime" },
        },
        {
          title: "Predictable costs",
          copy: "Fixed AMC pricing eliminates surprise repair bills — budget with confidence across cooling seasons and multi-site portfolios.",
          image: { src: mesh(1), alt: "Predictable costs" },
        },
        {
          title: "Extended equipment life",
          copy: "Proper maintenance can add years to system life — protecting your original installation investment and delaying costly replacements.",
          image: { src: mesh(2), alt: "Extended equipment life" },
        },
      ],
    },
  };
}

function buildServiceRequest(): ServicePageData {
  const slug = "service-request" as const;
  const surfaces = carouselSurfaces();
  const base = buildHowWeWork();

  return {
    ...base,
    slug,
    meta: {
      title: "Service Request | Sri Comforts",
      description:
        "Request HVAC service from Sri Comforts — breakdown support, maintenance visits, and emergency cooling assistance across Hyderabad, Bengaluru, and Chennai.",
    },
    hero: {
      label: "Service Request",
      title: "Fast, Reliable HVAC Service When You Need It Most",
      paragraphs: [
        "Whether it's an emergency breakdown, a scheduled maintenance visit, or a performance concern — Sri Comforts connects you to factory-trained technicians with the parts and history to fix it right the first time.",
      ],
      fullscreen: true,
    },
    darkIntro: {
      label: "",
      title: "From Call to Comfort — Without the Runaround",
      paragraphs: [
        "Service requests shouldn't disappear into a black hole. Sri Comforts routes every call through our dedicated service desk — matching urgency to response, dispatching authorized technicians, and closing the loop with documented outcomes.",
      ],
      theme: "dark",
    },
    breakdownIntro: {
      label: "",
      title: "How Sri Comforts Handles Your Service Request",
    },
    featuresGrid: {
      items: [
        {
          label: "Easy Intake",
          title: "Request Service Your Way",
          description:
            "Submit online, call our service desk, or reach out through your AMC account manager — however you prefer, we capture the details that matter for a fast fix.",
          image: { src: serviceFeatureImage(slug, 0), alt: "Service request intake" },
          cta: { label: "Learn More", href: "/contact" },
        },
        {
          label: "Smart Routing",
          title: "Matched to the Right Technician",
          description:
            "Requests are routed by location, equipment type, and urgency — ensuring the technician arriving on site has the skills and parts history for your system.",
          image: { src: serviceFeatureImage(slug, 1), alt: "Smart routing" },
          cta: { label: "Learn More", href: "/contact" },
        },
        {
          label: "Transparent ETA",
          title: "Know When Help Is Coming",
          description:
            "AMC clients receive priority ETAs; all callers get confirmation and updates — no wondering if anyone is actually on the way.",
          image: { src: serviceFeatureImage(slug, 2), alt: "Transparent ETA" },
          cta: { label: "Learn More", href: "/contact" },
        },
        {
          label: "On-Site Diagnosis",
          title: "Fix the Root Cause",
          description:
            "Technicians diagnose before they replace — checking controls, airflow, refrigerant, and electrical to solve the actual problem, not just the symptom.",
          image: { src: serviceFeatureImage(slug, 3), alt: "On-site diagnosis" },
          cta: { label: "Learn More", href: "/contact" },
        },
        {
          label: "Genuine Repairs",
          title: "Daikin-Authorized Workmanship",
          description:
            "Every repair uses authorized parts and follows manufacturer procedures — protecting warranties and ensuring the fix lasts beyond the next heat wave.",
          image: { src: serviceFeatureImage(slug, 4), alt: "Genuine repairs" },
          cta: { label: "Learn More", href: "/contact" },
        },
        {
          label: "Follow-Up",
          title: "Closed Loop Confirmation",
          description:
            "Post-visit summaries document work performed, parts replaced, and recommendations — so facility teams have a complete record for compliance and planning.",
          image: { src: serviceFeatureImage(slug, 5), alt: "Service follow-up" },
          cta: { label: "Learn More", href: "/contact" },
        },
        {
          label: "Emergency Coverage",
          title: "Critical Spaces Protected",
          description:
            "Data centers, hospitals, and production floors get escalated handling — because some environments can't wait until Monday.",
          image: { src: serviceFeatureImage(slug, 6), alt: "Emergency coverage" },
          cta: { label: "Learn More", href: "/contact" },
        },
      ],
    },
    platformCarousel: {
      label: "Support",
      title: "One Service Desk, Every Type of Request",
      copy: "From routine tune-ups to emergency breakdowns, Sri Comforts routes, dispatches, and documents every service interaction — giving you visibility from first call to resolved ticket.",
      items: [
        {
          tabLabel: "Breakdown",
          title: "Emergency Cooling Restoration",
          description:
            "System down? Our priority queue dispatches the nearest authorized technician with your equipment history — targeting rapid restoration for occupied and critical spaces.",
          image: { src: serviceCarouselImage(slug, 0), alt: "Breakdown service" },
          ...surfaces[0],
        },
        {
          tabLabel: "Maintenance",
          title: "Scheduled Service Visits",
          description:
            "AMC and ad-hoc maintenance requests are scheduled at your convenience — with technicians briefed on site access, unit locations, and prior service notes before arrival.",
          image: { src: serviceCarouselImage(slug, 1), alt: "Maintenance visit" },
          ...surfaces[1],
        },
        {
          tabLabel: "Performance",
          title: "Comfort and Efficiency Checks",
          description:
            "Uneven cooling, rising bills, or noise complaints? Performance requests trigger diagnostic visits focused on airflow, controls, and system health — not just part swapping.",
          image: { src: serviceCarouselImage(slug, 2), alt: "Performance check" },
          ...surfaces[2],
        },
        {
          tabLabel: "Follow-Up",
          title: "Documented Outcomes Every Time",
          description:
            "Every closed ticket includes a service summary — work performed, parts used, and recommendations — keeping facility records complete and audit-ready.",
          image: { src: serviceCarouselImage(slug, 3), alt: "Service follow-up" },
          ...surfaces[3],
        },
      ],
    },
    value: {
      title: "Our Value",
      cards: [
        {
          title: "Fast response",
          copy: "Dedicated service routing and priority AMC dispatch mean less downtime — getting spaces back to comfort quickly.",
          image: { src: mesh(0), alt: "Fast response" },
        },
        {
          title: "First-time fix rate",
          copy: "Factory-trained technicians with equipment history and genuine parts — reducing repeat visits and tenant disruption.",
          image: { src: mesh(1), alt: "First-time fix" },
        },
        {
          title: "Complete visibility",
          copy: "Every request tracked from intake to closure — giving facility teams and leadership confidence that nothing falls through the cracks.",
          image: { src: mesh(2), alt: "Complete visibility" },
        },
      ],
    },
  };
}

const servicePages: Record<ServiceSlug, ServicePageData> = {
  "how-we-work": buildHowWeWork(),
  amc: buildAmc(),
  "service-request": buildServiceRequest(),
};

export const serviceSlugs = Object.keys(servicePages);

export function getServicePage(slug: string): ServicePageData | undefined {
  return servicePages[slug as ServiceSlug];
}
