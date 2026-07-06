import {
  type SolutionFeatureSlug,
  solutionFeatureImagePath,
} from "@/lib/assets/localPaths";

export const solutionFeatureImages: Record<
  SolutionFeatureSlug,
  readonly string[]
> = {
  commercial: [
    solutionFeatureImagePath("commercial", 0),
    solutionFeatureImagePath("commercial", 1),
    solutionFeatureImagePath("commercial", 2),
    solutionFeatureImagePath("commercial", 3),
    solutionFeatureImagePath("commercial", 4),
  ],
  "it-services": [
    solutionFeatureImagePath("it-services", 0),
    solutionFeatureImagePath("it-services", 1),
    solutionFeatureImagePath("it-services", 2),
    solutionFeatureImagePath("it-services", 3),
    solutionFeatureImagePath("it-services", 4),
  ],
  "industrial-pharma": [
    solutionFeatureImagePath("industrial-pharma", 0),
    solutionFeatureImagePath("industrial-pharma", 1),
    solutionFeatureImagePath("industrial-pharma", 2),
    solutionFeatureImagePath("industrial-pharma", 3),
    solutionFeatureImagePath("industrial-pharma", 4),
  ],
  healthcare: [
    solutionFeatureImagePath("healthcare", 0),
    solutionFeatureImagePath("healthcare", 1),
    solutionFeatureImagePath("healthcare", 2),
    solutionFeatureImagePath("healthcare", 3),
    solutionFeatureImagePath("healthcare", 4),
  ],
  "hospitality-retail": [
    solutionFeatureImagePath("hospitality-retail", 0),
    solutionFeatureImagePath("hospitality-retail", 1),
    solutionFeatureImagePath("hospitality-retail", 2),
    solutionFeatureImagePath("hospitality-retail", 3),
    solutionFeatureImagePath("hospitality-retail", 4),
  ],
  residential: [
    solutionFeatureImagePath("residential", 0),
    solutionFeatureImagePath("residential", 1),
    solutionFeatureImagePath("residential", 2),
    solutionFeatureImagePath("residential", 3),
    solutionFeatureImagePath("residential", 4),
  ],
};

export function featureImage(slug: keyof typeof solutionFeatureImages, index: number) {
  const images = solutionFeatureImages[slug];
  return images[index % images.length];
}
