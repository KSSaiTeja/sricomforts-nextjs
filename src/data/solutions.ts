import { featureImage } from "@/data/solutionImages";
import { solutionMeshImage } from "@/lib/assets/localPaths";

function mesh(index: number) {
  return solutionMeshImage(index);
}

export type SolutionIntroData = {
  label: string;
  title: string;
  paragraphs?: string[];
  fullscreen?: boolean;
  hasBgPath?: boolean;
};

export type SolutionGridItem = {
  title: string;
  description: string;
  image: { src: string; alt: string };
};

export type SolutionGridData = {
  label: string;
  title: string;
  items: SolutionGridItem[];
  variant: "dark-four" | "white-variant2";
};

export type SolutionValueCard = {
  title: string;
  copy: string;
  image: { src: string; alt: string };
};

export type SolutionValueData = {
  title: string;
  cards: SolutionValueCard[];
};

export type SolutionFeatureCard = {
  title: string;
  description: string;
  image: { src: string; alt: string };
  metrics?: { value: string; label: string }[];
  cta?: { label: string; href: string };
};

export type SolutionFeaturesCarouselData = {
  title: string;
  items: SolutionFeatureCard[];
};

export type SolutionCaseStudyData = {
  label: string;
  title: string;
  description: string;
  quote: string;
  stats: { value: string; label: string }[];
  cta?: { label: string; href: string };
  logo?: { src: string; alt: string };
};

export type SolutionPageData = {
  slug: string;
  meta: { title: string; description: string };
  hero: SolutionIntroData;
  problem: SolutionGridData;
  solutionIntro: SolutionIntroData;
  value: SolutionValueData;
  features: SolutionFeaturesCarouselData;
  useCases: SolutionGridData;
  caseStudy: SolutionCaseStudyData;
};

/** Placeholder logos from https://logoipsum.com/ — stored in public/logos/placeholder/ */
const PLACEHOLDER_LOGO = "/logos/placeholder";

function clientLogo(index: number) {
  return `${PLACEHOLDER_LOGO}/logo-${String(index).padStart(2, "0")}.svg`;
}

function buildCommercial(): SolutionPageData {
  return {
    slug: "commercial",
    meta: {
      title: "Commercial HVAC Solutions | Sri\u00A0Comforts",
      description:
        "Precision cooling for offices, retail parks, and commercial campuses — design, install, and AMC from South India's HVAC leaders since 2001.",
    },
    hero: {
      label: "Commercial HVAC",
      title: "The Hidden Cost of Poor Climate Control: Why Your Building Needs a Modern HVAC Partner",
      paragraphs: [
        "Stop losing productivity to uneven cooling, rising energy bills, and reactive breakdowns. Sri\u00A0Comforts transforms your commercial HVAC into a strategic asset — enabling predictable comfort, lower operating costs, and tenant satisfaction.",
      ],
      fullscreen: true,
    },
    problem: {
      label: "The Problem",
      title: "Commercial Buildings Have Unique Cooling Challenges",
      variant: "dark-four",
      items: [
        {
          title: "Multi-Zone Complexity",
          description:
            "Different floors, meeting rooms, and common areas demand precise zoning and load balancing to prevent hot spots and overcooling.",
          image: { src: mesh(0), alt: "Multi-zone complexity illustration" },
        },
        {
          title: "Peak Load Variability",
          description:
            "Occupancy and outdoor temperatures shift throughout the day, making fixed schedules inefficient and costly to operate.",
          image: { src: mesh(1), alt: "Peak load variability illustration" },
        },
        {
          title: "Diverse Facility Types",
          description:
            "Corporate towers, co-working hubs, and mixed-use campuses each require tailored ducting, VRF layouts, and maintenance plans.",
          image: { src: mesh(2), alt: "Diverse facility types illustration" },
        },
        {
          title: "Uptime Expectations",
          description:
            "Tenants and facility managers expect consistent comfort with minimal disruption — leaving little room for unplanned downtime.",
          image: { src: mesh(3), alt: "Uptime expectations illustration" },
        },
      ],
    },
    solutionIntro: {
      label: "The Solution",
      title: "A Command Center for Your Commercial HVAC Operations",
      hasBgPath: true,
    },
    value: {
      title:
        "Design, install, and maintain every system from assessment to handover. Eliminate guesswork and reactive fixes, giving you full control over comfort, energy use, and lifecycle costs.",
      cards: [
        {
          title: "Lower Operating Costs",
          copy: "Right-sized systems, efficient duct design, and proactive AMC reduce energy waste and extend equipment life across your portfolio.",
          image: { src: mesh(0), alt: "Lower operating costs" },
        },
        {
          title: "Tenant Satisfaction",
          copy: "Deliver consistent comfort and fast response times, giving facility teams the confidence to meet SLAs and retain occupants.",
          image: { src: mesh(1), alt: "Tenant satisfaction" },
        },
        {
          title: "Scalable Deployment",
          copy: "Handle new fit-outs, expansions, and retrofits without adding in-house HVAC headcount — we scale with your footprint across South India.",
          image: { src: mesh(2), alt: "Scalable deployment" },
        },
        {
          title: "Operational Excellence",
          copy: "Streamline communication across design, install, and service teams — reducing manual errors and keeping frontline technicians productive.",
          image: { src: mesh(3), alt: "Operational excellence" },
        },
        {
          title: "Data-Driven Decisions",
          copy: "Gain actionable insights on energy use, maintenance cycles, and system health — giving leadership the data to plan capital upgrades wisely.",
          image: { src: mesh(4), alt: "Data-driven decisions" },
        },
      ],
    },
    features: {
      title: "Sri\u00A0Comforts Solutions That Drive Results for Commercial Operations",
      items: [
        {
          title: "VRF System Design",
          description:
            "AutoCAD-based layouts and VRF specifications tailored to your floor plate, occupancy, and budget from day one.",
          image: { src: featureImage("commercial", 0), alt: "VRF system design" },
          metrics: [{ value: "30%↓", label: "in Energy Waste" }],
        },
        {
          title: "Precision Installation",
          description:
            "Factory-trained teams commission systems with minimal business disruption — coordinated phasing for occupied buildings.",
          image: { src: featureImage("commercial", 1), alt: "Precision installation" },
        },
        {
          title: "Real-Time Monitoring",
          description:
            "AMC plans with scheduled inspections and rapid response keep systems performing — preventing small issues from becoming costly failures.",
          image: { src: featureImage("commercial", 2), alt: "Real-time monitoring" },
        },
        {
          title: "Ducting & Airflow Optimization",
          description:
            "Balanced airflow design eliminates dead zones and noise complaints, ensuring every zone receives the right conditioned air.",
          image: { src: featureImage("commercial", 3), alt: "Ducting optimization" },
          metrics: [{ value: "24hr", label: "Response Guarantee" }],
        },
        {
          title: "Lifecycle Support",
          description:
            "From warranty management to retrofit planning, our post-sales team protects your investment across the full equipment lifecycle.",
          image: { src: featureImage("commercial", 4), alt: "Lifecycle support" },
        },
      ],
    },
    useCases: {
      label: "Commercial Use Cases",
      title: "Commercial Scenarios That Are a Perfect Fit",
      variant: "white-variant2",
      items: [
        {
          title: "Office Tower Retrofit",
          description:
            "Replace aging split systems with centralized VRF, improving comfort per floor while cutting energy bills.",
          image: { src: mesh(0), alt: "Office tower retrofit" },
        },
        {
          title: "Multi-Tenant Campuses",
          description:
            "Standardized AMC and spare-parts planning across buildings, ensuring consistent service levels for every tenant.",
          image: { src: mesh(1), alt: "Multi-tenant campuses" },
        },
        {
          title: "Energy Audit & Upgrade",
          description:
            "Identify inefficiencies, right-size equipment, and qualify for lower operating costs with high-efficiency systems.",
          image: { src: mesh(2), alt: "Energy audit and upgrade" },
        },
        {
          title: "New Commercial Fit-Out",
          description:
            "End-to-end design-to-commissioning for new developments — on schedule and aligned with architect specifications.",
          image: { src: mesh(3), alt: "New commercial fit-out" },
        },
      ],
    },
    caseStudy: {
      label: "Case Study",
      title: "Leading commercial tower reduces cooling downtime",
      description:
        "Legacy chillers and reactive maintenance led to frequent comfort complaints and emergency costs. Sri\u00A0Comforts deployed a phased VRF upgrade with structured AMC, cutting breakdowns and stabilizing temperatures across 12 floors.",
      quote:
        "We have not seen this kind of consistency from an HVAC partner before — this is a significant milestone in how we manage comfort across our campus.",
      stats: [
        { value: "40%", label: "Reduction in Breakdown Calls" },
        { value: "25%", label: "Energy Savings Year One" },
      ],
      cta: { label: "View Our Work", href: "/about#our-work" },
      logo: { src: clientLogo(10), alt: "Client logo" },
    },
  };
}

function adaptPage(base: SolutionPageData, overrides: Partial<SolutionPageData> & { slug: string; meta: SolutionPageData["meta"] }): SolutionPageData {
  return {
    ...base,
    ...overrides,
    hero: { ...base.hero, ...overrides.hero },
    problem: { ...base.problem, ...overrides.problem, items: overrides.problem?.items ?? base.problem.items },
    solutionIntro: { ...base.solutionIntro, ...overrides.solutionIntro },
    value: { ...base.value, ...overrides.value, cards: overrides.value?.cards ?? base.value.cards },
    features: { ...base.features, ...overrides.features, items: overrides.features?.items ?? base.features.items },
    useCases: { ...base.useCases, ...overrides.useCases, items: overrides.useCases?.items ?? base.useCases.items },
    caseStudy: { ...base.caseStudy, ...overrides.caseStudy },
  };
}

const commercial = buildCommercial();

export const solutionPages: Record<string, SolutionPageData> = {
  commercial,
  "it-services": adaptPage(commercial, {
    slug: "it-services",
    meta: {
      title: "IT Services HVAC Solutions | Sri\u00A0Comforts",
      description:
        "Mission-critical cooling for data centers, server rooms, and tech campuses — precision HVAC from design through 24/7 support.",
    },
    hero: {
      label: "IT Services HVAC",
      title: "When Downtime Isn't an Option: Precision Cooling for Technology Infrastructure",
      paragraphs: [
        "Server rooms and data halls cannot tolerate temperature drift. Sri\u00A0Comforts delivers precision HVAC engineered for uptime, redundancy, and the unique heat loads of modern IT environments.",
      ],
      fullscreen: true,
    },
    problem: {
      label: "The Problem",
      title: "IT Facilities Have Unique Cooling Demands",
      variant: "dark-four",
      items: [
        {
          title: "High Heat Density",
          description: "Rack-level heat loads exceed standard office cooling — requiring dedicated precision units and airflow planning.",
          image: { src: mesh(0), alt: "High heat density" },
        },
        {
          title: "24/7 Uptime Requirements",
          description: "Systems must run continuously with failover paths; any outage risks hardware damage and service disruption.",
          image: { src: mesh(1), alt: "Uptime requirements" },
        },
        {
          title: "Humidity & Filtration Control",
          description: "Sensitive electronics need tight RH bands and clean air — standard comfort cooling is not sufficient.",
          image: { src: mesh(2), alt: "Humidity control" },
        },
        {
          title: "Rapid Scaling",
          description: "Capacity must grow with rack additions without over-provisioning or leaving hot aisles unprotected.",
          image: { src: mesh(3), alt: "Rapid scaling" },
        },
      ],
    },
    solutionIntro: {
      label: "The Solution",
      title: "Precision Climate Control for Your IT Operations",
      hasBgPath: true,
    },
    value: {
      title:
        "Engineer, install, and maintain precision cooling from rack to room. Protect hardware, stabilize environments, and scale capacity as your infrastructure grows.",
      cards: commercial.value.cards,
    },
    features: {
      title: "Solutions That Drive Results for IT Infrastructure",
      items: [
        {
          title: "Precision AC Units",
          description: "In-row and perimeter precision cooling sized to your rack layout and redundancy requirements.",
          image: { src: featureImage("it-services", 0), alt: "Precision AC units" },
          metrics: [{ value: "±1°C", label: "Temperature Stability" }],
        },
        {
          title: "Redundant System Design",
          description: "N+1 layouts and failover planning so maintenance never means downtime for critical halls.",
          image: { src: featureImage("it-services", 1), alt: "Redundant design" },
        },
        {
          title: "Monitoring & AMC",
          description: "Scheduled inspections and priority response for IT clients — because every hour offline has a cost.",
          image: { src: featureImage("it-services", 2), alt: "Monitoring and AMC" },
        },
        {
          title: "Hot/Cold Aisle Planning",
          description: "Containment-aware airflow design that maximizes cooling efficiency at the rack level.",
          image: { src: featureImage("it-services", 3), alt: "Aisle planning" },
          metrics: [{ value: "99.9%", label: "Target Uptime Support" }],
        },
        {
          title: "Expansion Readiness",
          description: "Modular designs that absorb new racks and halls without full system replacement.",
          image: { src: featureImage("it-services", 4), alt: "Expansion readiness" },
        },
      ],
    },
    useCases: {
      label: "IT Use Cases",
      title: "IT Scenarios That Are a Perfect Fit",
      variant: "white-variant2",
      items: [
        {
          title: "Server Room Build-Out",
          description: "Dedicated precision units and monitoring for new or expanded server rooms.",
          image: { src: mesh(0), alt: "Server room build-out" },
        },
        {
          title: "Data Hall Retrofit",
          description: "Upgrade legacy comfort cooling to precision systems without halting operations.",
          image: { src: mesh(1), alt: "Data hall retrofit" },
        },
        {
          title: "NOC & Operations Centers",
          description: "Stable comfort for 24/7 staffed operations floors alongside adjacent IT loads.",
          image: { src: mesh(2), alt: "NOC operations" },
        },
        {
          title: "Tech Campus Standardization",
          description: "Unified AMC and spare-parts strategy across multiple buildings on one campus.",
          image: { src: mesh(3), alt: "Tech campus" },
        },
      ],
    },
    caseStudy: {
      label: "Case Study",
      title: "Tech campus stabilizes server room temperatures",
      description:
        "Inconsistent precision cooling caused alarm trips and emergency call-outs. Sri\u00A0Comforts redesigned airflow, deployed redundant units, and instituted 24-hour AMC — restoring stable operations.",
      quote:
        "Precision cooling stability changed how we operate our server halls — Sri\u00A0Comforts delivered exactly what our uptime requirements demanded.",
      stats: [
        { value: "Zero", label: "Unplanned Outages (12 mo)" },
        { value: "35%", label: "Cooling Efficiency Gain" },
      ],
      cta: { label: "View Our Work", href: "/about#our-work" },
      logo: { src: clientLogo(11), alt: "Client logo" },
    },
  }),
  "industrial-pharma": adaptPage(commercial, {
    slug: "industrial-pharma",
    meta: {
      title: "Industrial & Pharma HVAC | Sri\u00A0Comforts",
      description:
        "Validated cooling for clean rooms, cold storage, and industrial plants — compliant HVAC design and service across South India.",
    },
    hero: {
      label: "Industrial & Pharma",
      title: "Compliance-Grade Climate Control for Regulated Environments",
      paragraphs: [
        "Pharma and industrial facilities demand validated systems, documented maintenance, and zero tolerance for contamination risk. Sri\u00A0Comforts delivers HVAC that meets regulatory rigor and operational reality.",
      ],
      fullscreen: true,
    },
    problem: {
      label: "The Problem",
      title: "Regulated Environments Have Strict HVAC Requirements",
      variant: "dark-four",
      items: [
        {
          title: "Clean Room Standards",
          description: "Particle counts, pressure cascades, and HEPA filtration must be designed and maintained to spec.",
          image: { src: mesh(0), alt: "Clean room standards" },
        },
        {
          title: "Temperature Excursions",
          description: "Cold rooms and process areas cannot drift — product integrity and batch release depend on stable conditions.",
          image: { src: mesh(1), alt: "Temperature excursions" },
        },
        {
          title: "Validation Documentation",
          description: "Installations and changes require traceable records for audits and regulatory inspections.",
          image: { src: mesh(2), alt: "Validation documentation" },
        },
        {
          title: "Industrial Heat Loads",
          description: "Manufacturing floors combine heavy equipment heat with ventilation needs beyond standard commercial design.",
          image: { src: mesh(3), alt: "Industrial heat loads" },
        },
      ],
    },
    solutionIntro: {
      label: "The Solution",
      title: "Validated HVAC for Industrial & Pharmaceutical Operations",
      hasBgPath: true,
    },
    features: {
      title: "Solutions That Drive Results for Industrial & Pharma",
      items: [
        {
          title: "Clean Room HVAC",
          description: "Design and install systems aligned to your classification, with documented commissioning support.",
          image: { src: featureImage("industrial-pharma", 0), alt: "Clean room HVAC" },
        },
        {
          title: "Cold Room Systems",
          description: "Reliable refrigeration for storage and process areas with preventive maintenance schedules.",
          image: { src: featureImage("industrial-pharma", 1), alt: "Cold room systems" },
          metrics: [{ value: "±0.5°C", label: "Storage Stability" }],
        },
        {
          title: "Industrial Ventilation",
          description: "Exhaust and makeup air systems that protect workers and equipment in demanding environments.",
          image: { src: featureImage("industrial-pharma", 2), alt: "Industrial ventilation" },
        },
        {
          title: "Audit-Ready AMC",
          description: "Maintenance logs, spare-parts traceability, and rapid response aligned to validation requirements.",
          image: { src: featureImage("industrial-pharma", 3), alt: "Audit-ready AMC" },
        },
        {
          title: "Retrofit & Expansion",
          description: "Phased upgrades that keep production running while improving compliance and efficiency.",
          image: { src: featureImage("industrial-pharma", 4), alt: "Retrofit and expansion" },
        },
      ],
    },
    useCases: {
      label: "Industrial Use Cases",
      title: "Industrial & Pharma Scenarios That Are a Perfect Fit",
      variant: "white-variant2",
      items: [
        {
          title: "API Manufacturing Zones",
          description: "Controlled environments for active pharmaceutical ingredient production areas.",
          image: { src: mesh(0), alt: "API manufacturing" },
        },
        {
          title: "Warehouse Cold Chain",
          description: "Multi-temperature storage with monitoring and backup cooling strategies.",
          image: { src: mesh(1), alt: "Cold chain warehouse" },
        },
        {
          title: "Packaging Clean Rooms",
          description: "ISO-aligned HVAC for secondary packaging and filling operations.",
          image: { src: mesh(2), alt: "Packaging clean rooms" },
        },
        {
          title: "Heavy Industry Floors",
          description: "Ventilation and comfort cooling for production halls with high ambient heat.",
          image: { src: mesh(3), alt: "Heavy industry" },
        },
      ],
    },
    caseStudy: {
      label: "Case Study",
      title: "Pharma facility passes audit with upgraded HVAC",
      description:
        "Aging clean room units risked non-compliance during annual inspections. Sri\u00A0Comforts executed a validated retrofit with full documentation — passing audit on first review.",
      quote:
        "Audit-ready documentation and validated commissioning gave our QA team confidence from day one of the retrofit.",
      stats: [
        { value: "100%", label: "Audit Compliance" },
        { value: "20%", label: "Energy Reduction" },
      ],
      cta: { label: "View Our Work", href: "/about#our-work" },
      logo: { src: clientLogo(12), alt: "Client logo" },
    },
  }),
  healthcare: adaptPage(commercial, {
    slug: "healthcare",
    meta: {
      title: "Healthcare HVAC Solutions | Sri\u00A0Comforts",
      description:
        "Infection-aware HVAC for hospitals, clinics, and labs — reliable comfort and air quality from South India's cooling experts.",
    },
    hero: {
      label: "Healthcare HVAC",
      title: "Patient Safety Starts with Air: Why Healthcare Needs Specialized HVAC",
      paragraphs: [
        "Hospitals and clinics require infection control, reliable redundancy, and quiet comfort. Sri\u00A0Comforts designs healthcare HVAC that supports clinical outcomes and staff productivity.",
      ],
      fullscreen: true,
    },
    problem: {
      label: "The Problem",
      title: "Healthcare Facilities Face Critical HVAC Pressures",
      variant: "dark-four",
      items: [
        {
          title: "Infection Control",
          description: "Pressure relationships and filtration must protect patients, especially in isolation and OT zones.",
          image: { src: mesh(0), alt: "Infection control" },
        },
        {
          title: "Continuous Operation",
          description: "Healthcare never closes — systems need redundancy and fast repair to avoid compromising care.",
          image: { src: mesh(1), alt: "Continuous operation" },
        },
        {
          title: "Mixed-Use Complexity",
          description: "OPD, wards, diagnostics, and admin areas each have different load and air-change requirements.",
          image: { src: mesh(2), alt: "Mixed-use complexity" },
        },
        {
          title: "Noise & Comfort",
          description: "Patients and staff need quiet, stable temperatures that support recovery and focus.",
          image: { src: mesh(3), alt: "Noise and comfort" },
        },
      ],
    },
    solutionIntro: {
      label: "The Solution",
      title: "Healthcare-Grade Climate Systems You Can Trust",
      hasBgPath: true,
    },
    features: {
      title: "Solutions That Drive Results for Healthcare",
      items: [
        {
          title: "OT & Critical Zone HVAC",
          description: "Precision temperature and filtration for operating theatres and high-acuity areas.",
          image: { src: featureImage("healthcare", 0), alt: "OT HVAC" },
        },
        {
          title: "Isolation & ICU Support",
          description: "Negative and positive pressure rooms designed to infection-control protocols.",
          image: { src: featureImage("healthcare", 1), alt: "Isolation support" },
          metrics: [{ value: "15+", label: "ACH Where Required" }],
        },
        {
          title: "Redundant AMC",
          description: "Priority response contracts with spare-parts readiness for hospitals that cannot wait.",
          image: { src: featureImage("healthcare", 2), alt: "Redundant AMC" },
        },
        {
          title: "Energy-Efficient Upgrades",
          description: "High-efficiency systems that cut utility costs without compromising clinical air quality standards.",
          image: { src: featureImage("healthcare", 3), alt: "Energy upgrades" },
        },
        {
          title: "Expansion Projects",
          description: "New wings and diagnostic blocks delivered on timeline with minimal disruption to active wards.",
          image: { src: featureImage("healthcare", 4), alt: "Expansion projects" },
        },
      ],
    },
    useCases: {
      label: "Healthcare Use Cases",
      title: "Healthcare Scenarios That Are a Perfect Fit",
      variant: "white-variant2",
      items: [
        {
          title: "Multi-Specialty Hospitals",
          description: "Campus-wide HVAC strategy with zone-specific controls and centralized AMC.",
          image: { src: mesh(0), alt: "Multi-specialty hospital" },
        },
        {
          title: "Diagnostic Labs",
          description: "Stable conditions for equipment and sample integrity in lab environments.",
          image: { src: mesh(1), alt: "Diagnostic labs" },
        },
        {
          title: "Clinic Chains",
          description: "Standardized installs and service across outpatient locations for brand consistency.",
          image: { src: mesh(2), alt: "Clinic chains" },
        },
        {
          title: "Renovation in Occupied Buildings",
          description: "Phased work that keeps patient areas safe and operational throughout upgrades.",
          image: { src: mesh(3), alt: "Occupied renovation" },
        },
      ],
    },
    caseStudy: {
      label: "Case Study",
      title: "Hospital reduces OT temperature excursions",
      description:
        "Unreliable legacy units caused OT delays and staff concern. Sri\u00A0Comforts installed redundant precision cooling with structured maintenance — stabilizing conditions across critical zones.",
      quote:
        "Critical zones finally hold temperature — our clinical teams can focus on patients, not HVAC alarms.",
      stats: [
        { value: "0", label: "OT Delays from HVAC (6 mo)" },
        { value: "30%", label: "Faster Service Response" },
      ],
      cta: { label: "View Our Work", href: "/about#our-work" },
      logo: { src: clientLogo(13), alt: "Client logo" },
    },
  }),
  "hospitality-retail": adaptPage(commercial, {
    slug: "hospitality-retail",
    meta: {
      title: "Hospitality & Retail HVAC | Sri\u00A0Comforts",
      description:
        "Guest-first cooling for hotels, restaurants, and retail — quiet, efficient HVAC that protects your brand experience.",
    },
    hero: {
      label: "Hospitality & Retail",
      title: "Guest Experience Hinges on Comfort: Modern HVAC for Hospitality & Retail",
      paragraphs: [
        "A single hot lobby or stuffy dining room can undo a five-star review. Sri\u00A0Comforts delivers hospitality HVAC that stays invisible to guests while keeping operations efficient.",
      ],
      fullscreen: true,
    },
    problem: {
      label: "The Problem",
      title: "Hospitality & Retail Have Distinct Comfort Demands",
      variant: "dark-four",
      items: [
        {
          title: "Guest Perception",
          description: "Comfort and air quality directly influence reviews, dwell time, and repeat visits.",
          image: { src: mesh(0), alt: "Guest perception" },
        },
        {
          title: "Peak Hour Loads",
          description: "Kitchens, banquet halls, and retail floors spike heat loads during rush periods.",
          image: { src: mesh(1), alt: "Peak hour loads" },
        },
        {
          title: "Aesthetic Constraints",
          description: "Equipment must integrate with interior design — visible ducting or noise breaks the ambiance.",
          image: { src: mesh(2), alt: "Aesthetic constraints" },
        },
        {
          title: "Multi-Outlet Operations",
          description: "Chains need consistent service quality and AMC across every location.",
          image: { src: mesh(3), alt: "Multi-outlet operations" },
        },
      ],
    },
    solutionIntro: {
      label: "The Solution",
      title: "Invisible Comfort for Memorable Guest Experiences",
      hasBgPath: true,
    },
    features: {
      title: "Solutions That Drive Results for Hospitality & Retail",
      items: [
        {
          title: "Quiet VRF Systems",
          description: "Low-noise VRF units for guest rooms, suites, and premium retail floors.",
          image: { src: featureImage("hospitality-retail", 0), alt: "Quiet VRF" },
        },
        {
          title: "Kitchen & Back-of-House",
          description: "Ventilation and makeup air for kitchens, laundry, and service corridors.",
          image: { src: featureImage("hospitality-retail", 1), alt: "Kitchen ventilation" },
          metrics: [{ value: "50%↓", label: "Guest Complaints" }],
        },
        {
          title: "Lobby & Public Areas",
          description: "High-capacity systems that handle door traffic and glass façade heat gain.",
          image: { src: featureImage("hospitality-retail", 2), alt: "Lobby cooling" },
        },
        {
          title: "Chain-Wide AMC",
          description: "One partner, one standard of service across every property in your portfolio.",
          image: { src: featureImage("hospitality-retail", 3), alt: "Chain-wide AMC" },
        },
        {
          title: "Renovation Support",
          description: "Refresh systems during soft renovations with minimal guest disruption.",
          image: { src: featureImage("hospitality-retail", 4), alt: "Renovation support" },
        },
      ],
    },
    useCases: {
      label: "Hospitality Use Cases",
      title: "Hospitality & Retail Scenarios That Are a Perfect Fit",
      variant: "white-variant2",
      items: [
        {
          title: "Boutique Hotels",
          description: "Discrete, quiet cooling that matches premium interior standards.",
          image: { src: mesh(0), alt: "Boutique hotels" },
        },
        {
          title: "Restaurant Groups",
          description: "Kitchen exhaust and dining comfort balanced for every service period.",
          image: { src: mesh(1), alt: "Restaurant groups" },
        },
        {
          title: "Flagship Retail",
          description: "Stable comfort for high-footfall stores and display lighting heat loads.",
          image: { src: mesh(2), alt: "Flagship retail" },
        },
        {
          title: "Banquet & Event Spaces",
          description: "Flexible capacity for variable occupancy from conferences to weddings.",
          image: { src: mesh(3), alt: "Banquet spaces" },
        },
      ],
    },
    caseStudy: {
      label: "Case Study",
      title: "Hotel group cuts guest comfort complaints",
      description:
        "Inconsistent room temperatures drove negative reviews across a three-property portfolio. Sri\u00A0Comforts standardized VRF installs and AMC — improving ratings within two seasons.",
      quote:
        "Guest reviews turned around once room temperatures stabilized — invisible comfort is exactly what hospitality needs.",
      stats: [
        { value: "60%↓", label: "Comfort Complaints" },
        { value: "4.8★", label: "Average Review Score" },
      ],
      cta: { label: "View Our Work", href: "/about#our-work" },
      logo: { src: clientLogo(14), alt: "Client logo" },
    },
  }),
  residential: adaptPage(commercial, {
    slug: "residential",
    meta: {
      title: "Residential HVAC Solutions | Sri\u00A0Comforts",
      description:
        "Expert cooling for homes, villas, and apartments — right-sized systems, precise install, and reliable AMC.",
    },
    hero: {
      label: "Residential",
      title: "Home Comfort Done Right: Expert Cooling for South India",
      paragraphs: [
        "The wrong tonnage wastes money; poor install shortens equipment life. Sri\u00A0Comforts helps homeowners choose, install, and maintain systems built for local climate and lasting comfort.",
      ],
      fullscreen: true,
    },
    problem: {
      label: "The Problem",
      title: "Homeowners Face Common Cooling Pitfalls",
      variant: "dark-four",
      items: [
        {
          title: "Wrong-Sized Units",
          description: "Oversized or undersized AC leads to humidity issues, short cycling, and higher bills.",
          image: { src: mesh(0), alt: "Wrong-sized units" },
        },
        {
          title: "Poor Installation Quality",
          description: "Incorrect refrigerant charge, leaks, and bad ducting reduce performance from day one.",
          image: { src: mesh(1), alt: "Poor installation" },
        },
        {
          title: "Rising Energy Costs",
          description: "Older units and lack of maintenance steadily increase monthly electricity spend.",
          image: { src: mesh(2), alt: "Rising energy costs" },
        },
        {
          title: "No Reliable Service Partner",
          description: "When breakdowns happen, homeowners struggle to find authorized, trustworthy technicians.",
          image: { src: mesh(3), alt: "No service partner" },
        },
      ],
    },
    solutionIntro: {
      label: "The Solution",
      title: "Sri\u00A0Comforts Home Comfort You Can Trust",
      hasBgPath: true,
    },
    features: {
      title: "Solutions That Drive Results for Residential Customers",
      items: [
        {
          title: "Tonnage Assessment",
          description: "Room-by-room load calculation so you buy exactly the capacity you need — not more.",
          image: { src: featureImage("residential", 0), alt: "Tonnage assessment" },
          metrics: [{ value: "Free", label: "Sizing Consultation" }],
        },
        {
          title: "Authorized Installation",
          description: "Factory-trained technicians follow manufacturer standards for charge, vacuum, and commissioning.",
          image: { src: featureImage("residential", 1), alt: "Authorized installation" },
        },
        {
          title: "VRF for Large Homes",
          description: "Multi-zone comfort for villas and duplexes with a single efficient outdoor unit.",
          image: { src: featureImage("residential", 2), alt: "VRF for large homes" },
        },
        {
          title: "AMC & Seasonal Service",
          description: "Pre-summer checkups and priority breakdown support to keep systems running quietly.",
          image: { src: featureImage("residential", 3), alt: "AMC and seasonal service" },
          metrics: [{ value: "24hr", label: "Response on AMC" }],
        },
        {
          title: "Upgrade Guidance",
          description: "Honest advice on when to repair versus replace — with transparent pricing.",
          image: { src: featureImage("residential", 4), alt: "Upgrade guidance" },
        },
      ],
    },
    useCases: {
      label: "Residential Use Cases",
      title: "Home Scenarios That Are a Perfect Fit",
      variant: "white-variant2",
      items: [
        {
          title: "New Villa Build",
          description: "Whole-home VRF design integrated with your architect's plans from the start.",
          image: { src: mesh(0), alt: "New villa build" },
        },
        {
          title: "Apartment Upgrade",
          description: "Replace aging splits with efficient inverter units and proper drainage.",
          image: { src: mesh(1), alt: "Apartment upgrade" },
        },
        {
          title: "Home Office Cooling",
          description: "Dedicated zones for work-from-home spaces without overcooling the whole house.",
          image: { src: mesh(2), alt: "Home office cooling" },
        },
        {
          title: "Pre-Summer Tune-Up",
          description: "Annual service before peak season to avoid mid-summer breakdowns.",
          image: { src: mesh(3), alt: "Pre-summer tune-up" },
        },
      ],
    },
    caseStudy: {
      label: "Case Study",
      title: "Villa owner cuts electricity bills with right-sized VRF",
      description:
        "Oversized splits cycled constantly and never dehumidified properly. Sri\u00A0Comforts resized with VRF and seasonal AMC — delivering even comfort at lower monthly cost.",
      quote:
        "Right-sized VRF finally gave us even comfort in every room — and the bills dropped noticeably the first summer.",
      stats: [
        { value: "32%↓", label: "Electricity Bill" },
        { value: "100%", label: "Room Comfort Coverage" },
      ],
      cta: { label: "View Our Work", href: "/about#our-work" },
      logo: { src: clientLogo(1), alt: "Client logo" },
    },
  }),
};

export const solutionSlugs = Object.keys(solutionPages);

export function getSolutionPage(slug: string): SolutionPageData | undefined {
  return solutionPages[slug];
}
