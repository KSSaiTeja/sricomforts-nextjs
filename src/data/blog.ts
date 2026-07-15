import {
  aboutWorkImage,
  homeFullscreenImage,
  SERVICE_CAROUSEL_IMAGES,
  SERVICE_FEATURE_IMAGES,
  solutionFeatureImagePath,
  solutionMeshImage,
} from "@/lib/assets/localPaths";

export type BlogCategorySlug =
  | "sustainability"
  | "maintenance-and-tips"
  | "energy-efficiency"
  | "buying-guides"
  | "project-spotlights";

export type BlogCategory = {
  slug: BlogCategorySlug;
  label: string;
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategorySlug;
  date: string;
  image: { src: string; alt: string };
  body: string[];
};

export const blogCategories: BlogCategory[] = [
  { slug: "sustainability", label: "Sustainability" },
  { slug: "maintenance-and-tips", label: "Maintenance & Tips" },
  { slug: "energy-efficiency", label: "Energy Efficiency" },
  { slug: "buying-guides", label: "Buying Guides" },
  { slug: "project-spotlights", label: "Project Spotlights" },
];

export const BLOG_PAGE_SIZE = 12;

const img = {
  mesh: (i: number) => solutionMeshImage(i),
  home: (i: number) => homeFullscreenImage(i),
  work: (i: number) => aboutWorkImage(i),
  feat: (i: number) => SERVICE_FEATURE_IMAGES[i % SERVICE_FEATURE_IMAGES.length],
  carousel: (i: number) => SERVICE_CAROUSEL_IMAGES[i % SERVICE_CAROUSEL_IMAGES.length],
  sector: (slug: string, i: number) => solutionFeatureImagePath(slug, i),
};

export const blogPosts: BlogPost[] = [
  {
    slug: "how-to-size-ac-tonnage-for-your-space",
    title: "How to size AC tonnage for your space (without guessing)",
    excerpt:
      "Wrong tonnage is the #1 reason systems feel loud, damp, or expensive to run. Here's a practical way to size capacity for homes and offices in South India.",
    category: "buying-guides",
    date: "2026-06-18",
    image: { src: img.feat(0), alt: "HVAC design workshop for tonnage planning" },
    body: [
      "Tonnage isn't a trophy number — it's a match between heat load and cooling capacity. Oversized units short-cycle; undersized ones never catch up on peak Hyderabad afternoons.",
      "Start with usable area, then factor orientation, glazing, occupancy, and equipment heat. For many apartments, a quick rule of thumb is a starting point only — site surveys still win.",
      "If you're evaluating a new install, pair the load calc with duct or piping layout early. Comfort fails when design and install don't talk.",
    ],
  },
  {
    slug: "five-signs-your-amc-is-saving-you-money",
    title: "Five signs your AMC is actually saving you money",
    excerpt:
      "A maintenance contract isn't paperwork. It's fewer emergency callouts, cleaner coils, and energy bills that don't surprise you every summer.",
    category: "maintenance-and-tips",
    date: "2026-06-04",
    image: { src: img.carousel(0), alt: "Technician servicing an outdoor AC unit" },
    body: [
      "Preventive visits catch refrigerant issues and dirty filters before they become breakdowns during May heat.",
      "Track response times, completed checklists, and before/after amp draws — those numbers show whether the AMC is doing real work.",
      "The best contracts spell out what's covered, what isn't, and how priority dispatch works when multiple sites call at once.",
    ],
  },
  {
    slug: "vrv-vs-split-acs-for-large-homes",
    title: "VRV vs split ACs for large homes: which pays off?",
    excerpt:
      "Premium residences often face a choice between many splits and a single VRV plant. The right answer depends on zoning, aesthetics, and how you use the house.",
    category: "buying-guides",
    date: "2026-05-22",
    image: { src: img.sector("residential", 0), alt: "Residential VRV outdoor units" },
    body: [
      "Splits are simple and modular. VRV shines when you need many zones, long pipe runs, and quieter indoor units.",
      "Look at lifecycle cost: power, filter access, and who will service the plant for the next decade.",
      "For villas with varied occupancy, zoning flexibility usually outweighs a lower sticker price on day one.",
    ],
  },
  {
    slug: "hospital-hvac-why-air-changes-matter",
    title: "Hospital HVAC: why air changes per hour still matter",
    excerpt:
      "In clinical spaces, comfort is only half the job. Pressurization, filtration, and air-change rates protect patients and staff.",
    category: "project-spotlights",
    date: "2026-05-10",
    image: { src: img.sector("healthcare", 1), alt: "Healthcare HVAC corridor installation" },
    body: [
      "Operating theatres, isolation rooms, and ICUs each need different pressure relationships.",
      "Design documents should make those relationships obvious for Facility teams who inherit the plant.",
      "Commissioning isn't optional — measured ACH and filter integrity prove the room behaves as designed.",
    ],
  },
  {
    slug: "cut-summer-power-bills-without-sacrificing-comfort",
    title: "Cut summer power bills without sacrificing comfort",
    excerpt:
      "Setpoint tweaks and dirty filters sound basic — and they still move the needle more than most gadgets.",
    category: "energy-efficiency",
    date: "2026-04-28",
    image: { src: img.home(0), alt: "Cooling system operating in summer conditions" },
    body: [
      "Raising the setpoint by one degree overnight across a portfolio adds up. Pair it with timed setbacks in unused wings.",
      "Coil cleanliness and correct refrigerant charge keep compressors from working overtime.",
      "For multi-site operators, a shared AMC calendar beats ad-hoc spray-and-pray cleaning.",
    ],
  },
  {
    slug: "pharma-cleanrooms-hvac-basics",
    title: "Pharma cleanrooms: HVAC basics decision-makers miss",
    excerpt:
      "Classification, cascading pressure, and validated monitoring decide whether a batch is safe — not just whether the room feels cool.",
    category: "project-spotlights",
    date: "2026-04-14",
    image: { src: img.sector("industrial-pharma", 2), alt: "Industrial and pharma plant cooling" },
    body: [
      "Cleanroom HVAC is a process utility. Change a grille without thinking and you can break a cascade.",
      "Spare filtration strategy and alarm response times belong in the design package, not a later punch list.",
      "Choose partners who have commissioned to protocol — not only installed duct.",
    ],
  },
  {
    slug: "when-to-replace-vs-repair-your-outdoor-unit",
    title: "When to replace vs repair your outdoor unit",
    excerpt:
      "Age, spare parts, and rising repair frequency tell you more than a single loud summer night.",
    category: "maintenance-and-tips",
    date: "2026-03-30",
    image: { src: img.work(1), alt: "Outdoor condenser units on a commercial terrace" },
    body: [
      "If annual repairs approach a third of replacement cost, plan the swap before peak season.",
      "Newer systems can be quieter and more efficient — but only if ductwork and electrics are ready.",
      "Ask for a written load check before upsizing. Bigger is not always better.",
    ],
  },
  {
    slug: "green-cooling-choices-that-actually-scale",
    title: "Green cooling choices that actually scale",
    excerpt:
      "Sustainability in HVAC is less about slogans and more about efficient plant, leak-tight refrigerant loops, and maintenance you can prove.",
    category: "sustainability",
    date: "2026-03-12",
    image: { src: img.mesh(1), alt: "Modern efficient HVAC plant room" },
    body: [
      "Lower GWP refrigerants help — so does stopping leaks with disciplined install and service.",
      "Heat recovery and right-sized plant beat ornamental dashboards that nobody opens.",
      "Document energy baselines before retrofit so you can show what improved.",
    ],
  },
  {
    slug: "it-park-cooling-uptime-playbook",
    title: "IT park cooling: an uptime playbook for facility leads",
    excerpt:
      "Server floors and open offices fight for capacity. Redundancy planning is how you sleep during load shed weeks.",
    category: "project-spotlights",
    date: "2026-02-26",
    image: { src: img.sector("it-services", 0), alt: "IT services HVAC installation" },
    body: [
      "N+1 isn't a buzzword when one chiller fails on a festival weekend.",
      "Monitoring should flag temperature drift before tickets flood the helpdesk.",
      "Coordinate AMC windows with IT change freezes — outages hate surprises.",
    ],
  },
  {
    slug: "retail-mall-comfort-during-rush-hours",
    title: "Retail & mall comfort during rush hours",
    excerpt:
      "Footfall peaks heat up atriums fast. Staging and zoning keep stores comfortable without roasting the power bill.",
    category: "energy-efficiency",
    date: "2026-02-08",
    image: { src: img.sector("hospitality-retail", 1), alt: "Retail HVAC in a busy commercial space" },
    body: [
      "Schedule boosts around known rush windows instead of running peak plant all afternoon.",
      "Door curtains and vestibule control matter as much as the AHU setpoint.",
      "Share occupancy patterns with your HVAC partner — static settings waste kilowatts.",
    ],
  },
  {
    slug: "filter-hygiene-checklist-for-facility-teams",
    title: "Filter hygiene checklist for facility teams",
    excerpt:
      "A dirty filter masquerades as a 'weak AC.' Here's a weekly and quarterly rhythm that keeps coils breathing.",
    category: "maintenance-and-tips",
    date: "2026-01-21",
    image: { src: img.carousel(2), alt: "Service engineer inspecting HVAC filters" },
    body: [
      "Label filters with install dates. Guesswork leads to clogged coils.",
      "Match MERV or manufacturer grade — not just whatever fits the slot.",
      "Photograph before/after during AMC visits so issues are visible across sites.",
    ],
  },
  {
    slug: "commercial-central-plant-questions-to-ask",
    title: "Commercial central plant: seven questions before you sign",
    excerpt:
      "Before you approve a central plant package, pressure-test the assumptions on diversity, redundancy, and who owns commissioning.",
    category: "buying-guides",
    date: "2026-01-07",
    image: { src: img.sector("commercial", 2), alt: "Commercial HVAC central plant" },
    body: [
      "Who owns the load calculations, and what weather data backs them?",
      "What happens when one pump, tower, or compressor is offline?",
      "How is handover training scheduled for the people who will run the BMS?",
    ],
  },
  {
    slug: "refrigerant-stewardship-for-south-india-operators",
    title: "Refrigerant stewardship for South India operators",
    excerpt:
      "Handling, recovery, and leak checks protect the environment and your ops budget. Here's a no-drama starter kit.",
    category: "sustainability",
    date: "2025-12-15",
    image: { src: img.work(2), alt: "HVAC service team on a rooftop plant" },
    body: [
      "Train techs on recovery procedures and keep cylinders labeled and logged.",
      "Investigate repeating top-ups — they're telling you about a leak path.",
      "Prefer partners who report reclaim quantities quarterly, not verbally.",
    ],
  },
  {
    slug: "quiet-comfort-design-tips-for-hospitality",
    title: "Quiet comfort: design tips for hospitality spaces",
    excerpt:
      "Guests notice rumble more than pretty grilles. Duct velocity, unit placement, and night setbacks make rooms feel premium.",
    category: "project-spotlights",
    date: "2025-11-28",
    image: { src: img.sector("hospitality-retail", 3), alt: "Hospitality space HVAC detailing" },
    body: [
      "Keep noisy plant away from guest corridors; attenuate where you can't.",
      "Fan coil selection for sleep rooms should prioritize low-speed sound data.",
      "Night mode sequences reduce cycling noise when occupancy drops.",
    ],
  },
];

export function getBlogCategory(slug: string): BlogCategory | undefined {
  return blogCategories.find((c) => c.slug === slug);
}

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}

export function getCategoryLabel(slug: BlogCategorySlug): string {
  return blogCategories.find((c) => c.slug === slug)?.label ?? slug;
}

export function formatBlogDate(iso: string): string {
  const date = new Date(`${iso}T12:00:00`);
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
