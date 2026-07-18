import type { Metadata } from "next";
import { TonnageCalculatorPage } from "@/components/calculator/TonnageCalculatorPage";

export const metadata: Metadata = {
  title: "AC Tonnage Calculator | Sri\u00A0Comforts",
  description:
    "Estimate residential AC tonnage from room area, direction, floor, temperature, occupancy, windows, roof, ceiling height, and sun exposure. Live results from Sri Comforts.",
};

export default function Page() {
  return <TonnageCalculatorPage />;
}
