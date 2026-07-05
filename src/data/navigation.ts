import { aboutSectionAnchors } from "@/data/about";

export type NavLink = { label: string; href: string };
export type NavSection = { title: string; links: NavLink[] };
export type NavMenuItem =
  | { label: string; href: string; sections?: undefined }
  | { label: string; sections: NavSection[]; href?: undefined };

export const siteContact = {
  phoneDisplay: "+91 40 2700 1342",
  phoneHref: "tel:+914027001342",
  contactHref: "/contact",
  serviceRequestHref: "/services/service-request",
} as const;

export const navigation: NavMenuItem[] = [
  {
    label: "Solutions",
    sections: [
      {
        title: "By Sector",
        links: [
          { label: "Commercial HVAC", href: "/solutions/commercial" },
          { label: "IT Services HVAC", href: "/solutions/it-services" },
          { label: "Industrial & Pharma", href: "/solutions/industrial-pharma" },
          { label: "Healthcare HVAC", href: "/solutions/healthcare" },
          { label: "Hospitality & Retail", href: "/solutions/hospitality-retail" },
          { label: "Residential", href: "/solutions/residential" },
        ],
      },
    ],
  },
  {
    label: "Services",
    sections: [
      {
        title: "Our Services",
        links: [
          { label: "How We Work", href: "/services/how-we-work" },
          { label: "AMC Plans", href: "/services/amc" },
          { label: "Service Request", href: "/services/service-request" },
        ],
      },
    ],
  },
  {
    label: "Resources",
    sections: [
      {
        title: "Tools",
        links: [
          {
            label: "AC Tonnage Calculator",
            href: "/solutions/residential#tonnage-calculator",
          },
        ],
      },
      {
        title: "Blog & Guides",
        links: [
          { label: "All Articles", href: "/blog" },
          { label: "Sustainability", href: "/blog/category/sustainability" },
          { label: "Maintenance & Tips", href: "/blog/category/maintenance-and-tips" },
          { label: "Energy Efficiency", href: "/blog/category/energy-efficiency" },
          { label: "Buying Guides", href: "/blog/category/buying-guides" },
          { label: "Project Spotlights", href: "/blog/category/project-spotlights" },
        ],
      },
      {
        title: "Insights",
        links: [{ label: "Case Studies", href: "/about/our-work" }],
      },
    ],
  },
  {
    label: "About",
    sections: [
      {
        title: "Company",
        links: [
          { label: "About Sri Comforts", href: `/about#${aboutSectionAnchors.about}` },
          { label: "Our Team", href: `/about#${aboutSectionAnchors.team}` },
          { label: "Our Work", href: `/about#${aboutSectionAnchors.work}` },
          { label: "Awards & Recognition", href: `/about#${aboutSectionAnchors.awards}` },
          { label: "Careers", href: "/career" },
        ],
      },
    ],
  },
] as const;
