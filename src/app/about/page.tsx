import type { Metadata } from "next";
import { AboutPage } from "@/components/about/AboutPage";

export const metadata: Metadata = {
  title: "About | Sri\u00A0Comforts",
  description:
    "Learn about Sri\u00A0Comforts — South India's HVAC leaders since 2001. Design, installation, and 24-hour service across eight cities.",
};

export default function Page() {
  return <AboutPage />;
}
