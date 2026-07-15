import { aboutWorkImage } from "@/lib/assets/localPaths";

export type AwardItem = {
  id: string;
  year: string;
  title: string;
  description: string;
};

export type AchievementStat = {
  value: string;
  label: string;
};

/**
 * Experience + awards — from `docs/SRI COM Company Profile - Updated 2026.pdf`
 * and site credentials (25+ years since 2001, Daikin YOY, branches, engineers).
 */
export const experienceSection = {
  years: "25",
  yearsLabel: "Years of Experience",
  yearsImage: aboutWorkImage(0),
  titleLead: "Delivering cooling",
  titleAccent: "you can trust.",
  body: "Sri\u00A0Comforts has been an authorized Daikin dealer and service provider since 2001 — design, installation, and responsive service across South India.",
  stats: [
    { value: "230+", label: "Engineers & technicians" },
    { value: "9", label: "Cities with local teams" },
    { value: "24hr", label: "Service promise" },
  ] satisfies AchievementStat[],
  signatureName: "Srinivas Reddy",
  signatureRole: "Managing Director",
} as const;

export const awardsSection = {
  label: "Our Award",
  titleLead: "Our",
  titleAccent: "Award-Winning",
  titleTrail: "Journey.",
  items: [
    {
      id: "daikin-sales",
      year: "YOY",
      title: "Daikin Excellent Sales",
      description:
        "Recognised year on year by Daikin for sales excellence across our South India markets.",
    },
    {
      id: "daikin-service",
      year: "YOY",
      title: "Daikin Excellent Service",
      description:
        "Awarded year on year for service quality — the standard behind our 24-hour response promise.",
    },
    {
      id: "dealer-2001",
      year: "2001",
      title: "Authorized Daikin Partner",
      description:
        "Dealer and service provider from our first year — product depth with delivery we own end to end.",
    },
    {
      id: "multi-sector",
      year: "25+",
      title: "Trusted Across Sectors",
      description:
        "Government, hospitals, IT campuses, hospitality, and chillers — complex HVAC delivered at scale.",
    },
  ] satisfies AwardItem[],
} as const;
