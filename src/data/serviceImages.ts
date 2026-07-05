const STORYBLOK = "https://a.storyblok.com";

function asset(path: string, width = 985) {
  return `${STORYBLOK}/f/337048/${path}/m/${width}x0/filters:format(webp):quality(85)`;
}

/** YOS reference feature grid images — reliable Storyblok CDN URLs */
const featurePaths = [
  "7111x4000/f6740c077e/ai3.jpg",
  "4000x3000/a04c941c71/networking2.jpg",
  "4960x3507/b18d3261b8/ai7.jpg",
  "2827x3533/7f8462f6a6/logistics-port.jpg",
  "2882x1574/cb9f2cde65/y.webp",
  "1824x1212/506b90b41e/yard.png",
  "2034x1150/c561abc6ba/r.webp",
] as const;

const carouselPaths = [
  "768x432/ce73b10067/gate-entry.jpg",
  "1272x1196/29dcba4210/yard.png",
  "565x336/e5f3b11568/dock-doors.png",
  "2034x1150/c561abc6ba/r.webp",
] as const;

export const serviceDarkBackground = asset("4020x1986/0a22d4eda7/digital-bridge.webp", 1920);

export function serviceFeatureImage(_slug: string, index: number) {
  return asset(featurePaths[index % featurePaths.length]);
}

export function serviceCarouselImage(_slug: string, index: number) {
  return asset(carouselPaths[index % carouselPaths.length], 768);
}
