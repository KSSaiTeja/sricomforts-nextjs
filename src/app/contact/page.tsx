import type { Metadata } from "next";
import { ContactPage } from "@/components/contact/ContactPage";

export const metadata: Metadata = {
  title: "Contact | Sri Comforts",
  description:
    "Reach Sri Comforts for HVAC consultations, site assessments, AMC plans, and service support across South India.",
};

export default function Page() {
  return <ContactPage />;
}
