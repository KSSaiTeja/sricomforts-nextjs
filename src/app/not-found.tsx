import type { Metadata } from "next";
import { NotFoundPage } from "@/components/not-found/NotFoundPage";

export const metadata: Metadata = {
  title: "Page Not Found | Sri\u00A0Comforts",
  description:
    "The page you are looking for could not be found. Return to Sri\u00A0Comforts for HVAC solutions across South India.",
};

export default function NotFound() {
  return <NotFoundPage />;
}
