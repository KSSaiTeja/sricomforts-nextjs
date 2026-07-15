import type { Metadata } from "next";
import { BlogPage } from "@/components/blog/BlogPage";

export const metadata: Metadata = {
  title: "Blog | Sri\u00A0Comforts",
  description:
    "Guides and insights from Sri\u00A0Comforts on HVAC design, maintenance, energy efficiency, and project delivery across South India.",
};

export default function Page() {
  return <BlogPage />;
}
