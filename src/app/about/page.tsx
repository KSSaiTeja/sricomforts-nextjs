import type { Metadata } from "next";
import { AboutPage } from "@/components/about/AboutPage";

export const metadata: Metadata = {
  title: "About | Sri Comforts",
  description:
    "Learn about Sri Comforts — South India's authorized Daikin partner delivering HVAC design, installation, and service since 2001.",
};

export default function Page() {
  return <AboutPage />;
}
