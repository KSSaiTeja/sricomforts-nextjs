import { aboutWorkImage } from "@/lib/assets/localPaths";
import type { AboutSectionIntroData } from "@/data/about";

export type CareerJob = {
  id: string;
  title: string;
  department: string;
  employmentType: string;
  location: string;
  href: string;
};

export const careerHero = {
  image: {
    src: aboutWorkImage(0),
    alt: "Sri Comforts engineers on a commercial HVAC project site",
  },
} as const;

export const careerCultureIntro = {
  label: "Our Culture",
  titles: [
    [
      ["A team driven", { strong: " to design, install," }],
      ["and own comfort"],
    ],
  ],
  paragraphs: [
    [
      {
        text: "Sri\u00A0Comforts is made of engineers, designers, and service leads who care about systems that actually work — in hospitals, IT parks, factories, and homes across South India.",
      },
    ],
    [
      {
        text: "As part of the team, you won't be a cog in a wheel. You'll shape drawings, installs, and service calls that keep people cool when it matters. We offer solid benefits, room to grow, and a culture that rewards ownership.",
        breakBefore: true,
      },
    ],
  ],
  paragraphsMultiple: true,
  variant: "",
  hideLabel: false,
  labelId: "career-culture-label",
} as const satisfies AboutSectionIntroData;

export const careerJobBoardHeading = "Join us in setting the HVAC standard:";

export const careerLocations = ["Hyderabad (Onsite)", "Remote / Hybrid"] as const;

export const careerDepartments = [
  "Engineering",
  "Service",
  "Sales",
  "Company",
] as const;

export const careerJobs: CareerJob[] = [
  {
    id: "general-application",
    title: "General Application — Future Opportunities",
    department: "Company",
    employmentType: "Full-time",
    location: "Hyderabad (Onsite)",
    href: "/contact",
  },
  {
    id: "hvac-design-engineer",
    title: "HVAC Design Engineer",
    department: "Engineering",
    employmentType: "Full-time",
    location: "Hyderabad (Onsite)",
    href: "/contact",
  },
  {
    id: "service-technician",
    title: "AC Service Technician",
    department: "Service",
    employmentType: "Full-time",
    location: "Hyderabad (Onsite)",
    href: "/contact",
  },
  {
    id: "project-coordinator",
    title: "Project Coordinator",
    department: "Engineering",
    employmentType: "Full-time",
    location: "Hyderabad (Onsite)",
    href: "/contact",
  },
  {
    id: "sales-executive",
    title: "Solutions Sales Executive",
    department: "Sales",
    employmentType: "Full-time",
    location: "Hyderabad (Onsite)",
    href: "/contact",
  },
  {
    id: "amc-account-manager",
    title: "AMC Account Manager",
    department: "Service",
    employmentType: "Full-time",
    location: "Remote / Hybrid",
    href: "/contact",
  },
];
