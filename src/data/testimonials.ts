export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  headline: string;
  body: string;
  rating: number;
  image: string;
  imageAlt: string;
};

export const testimonialsSection = {
  label: "What Clients Say",
  title: "Honest Feedback From Valued Partners.",
  subtitle:
    "Facility teams and project leads across South India share how Sri\u00A0Comforts keeps their spaces reliable, efficient, and comfortable — year after year.",
  ctaPrompt: "See how the right HVAC partner makes a difference?",
  ctaLabel: "Schedule a Call",
  ctaHref: "#website-contact-form",
} as const;

/**
 * Client voices — portraits reuse licensed stock already in /public/images/team.
 * Replace with real client photos when available.
 */
export const testimonials: Testimonial[] = [
  {
    id: "facilities-campus",
    name: "Ananya Rao",
    role: "Facilities Director",
    company: "Multi-campus Commercial Group",
    headline:
      "Our cooling finally feels predictable — fewer emergency calls, steadier floors.",
    body: "Sri\u00A0Comforts redesigned our VRF layout and put a disciplined AMC in place. Response times dropped, temperatures stabilized across twelve floors, and our team stopped firefighting every summer.",
    rating: 5,
    image: "/images/team/testimonial/quote-portrait.webp",
    imageAlt: "Portrait of Ananya Rao",
  },
  {
    id: "hospitality",
    name: "Karthik Menon",
    role: "General Manager",
    company: "Hospitality & Retail Portfolio",
    headline:
      "Guests notice the comfort. We notice the energy savings.",
    body: "From design workshops to handover, they treated our property like their own. The install was clean, training was thorough, and the first-year efficiency gains paid for themselves faster than we expected.",
    rating: 5,
    image: "/images/team/advisors/arjun-mehta.webp",
    imageAlt: "Portrait of Karthik Menon",
  },
  {
    id: "pharma",
    name: "Dr. Meera Iyer",
    role: "Plant Operations Head",
    company: "Industrial & Pharma",
    headline:
      "Precision cooling we can audit — not just hope for.",
    body: "Clean-room adjacent spaces need discipline. Sri\u00A0Comforts brought clear documentation, calibrated commissioning, and a service cadence that matches our compliance calendar. That trust matters.",
    rating: 5,
    image: "/images/team/executive/priya-nair.webp",
    imageAlt: "Portrait of Dr. Meera Iyer",
  },
  {
    id: "it-campus",
    name: "Vikram Shah",
    role: "Infrastructure Lead",
    company: "IT Services Campus",
    headline:
      "One partner from load study to 24×7 support — finally.",
    body: "We needed a partner who could own the full chain. They sized the system correctly, coordinated with our MEP consultants, and stayed accountable after go-live. Our uptime story is stronger for it.",
    rating: 5,
    image: "/images/team/executive/venkatesh-rao.webp",
    imageAlt: "Portrait of Vikram Shah",
  },
  {
    id: "residential",
    name: "Lakshmi Narayan",
    role: "Project Architect",
    company: "Residential Developments",
    headline:
      "Quiet systems, thoughtful detailing, clients who stay happy.",
    body: "On premium residences, comfort is part of the design language. Sri\u00A0Comforts respects aesthetics as much as tonnage — discreet placement, clean finishes, and service that doesn’t disrupt the household.",
    rating: 5,
    image: "/images/team/executive/lakshmi-iyer.webp",
    imageAlt: "Portrait of Lakshmi Narayan",
  },
];
