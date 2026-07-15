import type { Metadata } from "next";
import { CareerPage } from "@/components/career/CareerPage";

export const metadata: Metadata = {
  title: "Careers | Sri\u00A0Comforts",
  description:
    "Join Sri\u00A0Comforts — design, install, and service HVAC across South India. Explore open roles in engineering, service, and sales.",
};

export default function Page() {
  return <CareerPage />;
}
