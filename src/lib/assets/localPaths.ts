const pad2 = (n: number) => String(n).padStart(2, "0");

export const FEATURES_STEP_VIDEOS = [
  "/static/videos/features/step-01.mp4",
  "/static/videos/features/step-02.mp4",
  "/static/videos/features/step-03.mp4",
  "/static/videos/features/step-04.mp4",
  "/static/videos/features/step-05.mp4",
  "/static/videos/features/step-06.mp4",
] as const;

export const HOME_FULLSCREEN_IMAGES = [
  "/images/home/fullscreen-01.webp",
  "/images/home/fullscreen-02.webp",
  "/images/home/fullscreen-03.webp",
] as const;

export function homeFullscreenImage(index: number): string {
  return HOME_FULLSCREEN_IMAGES[index % HOME_FULLSCREEN_IMAGES.length];
}

export const SOLUTION_MESH_IMAGES = [
  "/images/solutions/mesh-01.webp",
  "/images/solutions/mesh-02.webp",
  "/images/solutions/mesh-03.webp",
  "/images/solutions/mesh-04.webp",
  "/images/solutions/mesh-05.webp",
] as const;

export function solutionMeshImage(index: number): string {
  return SOLUTION_MESH_IMAGES[index % SOLUTION_MESH_IMAGES.length];
}

export const SERVICE_MESH_IMAGES = [
  "/images/services/mesh-01.webp",
  "/images/services/mesh-02.webp",
  "/images/services/mesh-03.webp",
] as const;

export function serviceMeshImage(index: number): string {
  return SERVICE_MESH_IMAGES[index % SERVICE_MESH_IMAGES.length];
}

export const SOLUTION_FEATURE_SLUGS = [
  "commercial",
  "it-services",
  "industrial-pharma",
  "healthcare",
  "hospitality-retail",
  "residential",
] as const;

export type SolutionFeatureSlug = (typeof SOLUTION_FEATURE_SLUGS)[number];

export function solutionFeatureImagePath(
  slug: SolutionFeatureSlug | string,
  index: number,
): string {
  const featIndex = (index % 5) + 1;
  return `/images/solutions/${slug}/feat-${pad2(featIndex)}.webp`;
}

export const SERVICE_FEATURE_IMAGES = [
  "/images/services/features/feat-01.webp",
  "/images/services/features/feat-02.webp",
  "/images/services/features/feat-03.webp",
  "/images/services/features/feat-04.webp",
  "/images/services/features/feat-05.webp",
  "/images/services/features/feat-06.webp",
  "/images/services/features/feat-07.webp",
] as const;

export const SERVICE_CAROUSEL_IMAGES = [
  "/images/services/carousel/carousel-01.webp",
  "/images/services/carousel/carousel-02.webp",
  "/images/services/carousel/carousel-03.webp",
  "/images/services/carousel/carousel-04.webp",
] as const;

export const SERVICE_DARK_BACKGROUND =
  "/images/services/dark-bridge.webp";

export function serviceFeatureImagePath(_slug: string, index: number): string {
  return SERVICE_FEATURE_IMAGES[index % SERVICE_FEATURE_IMAGES.length];
}

export function serviceCarouselImagePath(
  _slug: string,
  index: number,
): string {
  return SERVICE_CAROUSEL_IMAGES[index % SERVICE_CAROUSEL_IMAGES.length];
}

export const ABOUT_WORK_IMAGES = [
  "/images/about/work-01.webp",
  "/images/about/work-02.webp",
  "/images/about/work-03.webp",
] as const;

export function aboutWorkImage(index: number): string {
  return ABOUT_WORK_IMAGES[index % ABOUT_WORK_IMAGES.length];
}

export const CONTACT_PROMO_OVERVIEW = "/images/contact/promo-overview.webp";

export const CONTACT_PRODUCT_OVERVIEW_PDF =
  "/docs/sri-comforts-product-overview.pdf";

export const CONTACT_ICONS = {
  download: "/images/contact/icons/icon-download.svg",
  phone: "/images/contact/icons/icon-phone.svg",
  amc: "/images/contact/icons/icon-amc.svg",
} as const;
