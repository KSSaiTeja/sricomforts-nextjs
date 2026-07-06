import {
  SERVICE_DARK_BACKGROUND,
  serviceCarouselImagePath,
  serviceFeatureImagePath,
} from "@/lib/assets/localPaths";

export const serviceDarkBackground = SERVICE_DARK_BACKGROUND;

export function serviceFeatureImage(slug: string, index: number) {
  return serviceFeatureImagePath(slug, index);
}

export function serviceCarouselImage(slug: string, index: number) {
  return serviceCarouselImagePath(slug, index);
}
