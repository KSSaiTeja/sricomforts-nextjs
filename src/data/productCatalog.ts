export const PRODUCT_BENTO_IMAGE = "/assets/product-bento.png";
export const PRODUCT_VIEW_LABEL = "View Product";
export const PRODUCT_EXPLORE_LABEL = "Read more";

export type ProductCategory =
  | "vrv-vrf"
  | "split-ac"
  | "ducted"
  | "chillers"
  | "commercial"
  | "residential";

export type ProductCatalogFilter =
  | "all"
  | "new-launches"
  | ProductCategory;

export type ProductCatalogFilterOption = {
  id: ProductCatalogFilter;
  label: string;
};

export type ProductSpec = {
  label: string;
  value: string;
};

export type ProductCatalogItem = {
  id: string;
  name: string;
  tagline: string;
  categories: ProductCategory[];
  specs: ProductSpec[];
  isNewLaunch?: boolean;
  /** Product hero image for the showroom stage. */
  image: string;
  imageAlt: string;
  href: string;
};

export const productCatalogFilters: ProductCatalogFilterOption[] = [
  { id: "all", label: "All" },
  { id: "new-launches", label: "New Launches" },
  { id: "vrv-vrf", label: "VRV & VRF" },
  { id: "split-ac", label: "Split AC" },
  { id: "ducted", label: "Ducted" },
  { id: "chillers", label: "Chillers" },
  { id: "commercial", label: "Commercial" },
  { id: "residential", label: "Residential" },
];

/** Homepage catalog order — showroom index + stage. */
export const productCatalogItems: ProductCatalogItem[] = [
  {
    id: "vrv-vrf",
    name: "VRV & VRF",
    tagline: "Variable refrigerant flow for large campuses",
    categories: ["vrv-vrf", "commercial"],
    specs: [
      { label: "Capacity", value: "8–60 HP" },
      { label: "Efficiency", value: "IEER 21+" },
      { label: "Connect", value: "64 indoors" },
      { label: "Pipe run", value: "165 m" },
    ],
    isNewLaunch: true,
    image: "/images/products/vrv-vrf.jpg",
    imageAlt: "VRV and VRF outdoor system",
    href: "/solutions/commercial",
  },
  {
    id: "vrv-s",
    name: "VRV S",
    tagline: "Compact VRF for boutique commercial spaces",
    categories: ["vrv-vrf", "commercial", "residential"],
    specs: [
      { label: "Capacity", value: "4–12 HP" },
      { label: "Footprint", value: "Compact" },
      { label: "Zones", value: "Up to 14" },
      { label: "Install", value: "Single phase" },
    ],
    isNewLaunch: true,
    image: "/images/products/vrv-s.jpg",
    imageAlt: "VRV S series outdoor unit",
    href: "/solutions/commercial",
  },
  {
    id: "air-cooled-chiller",
    name: "Air cooled chiller",
    tagline: "Central plant cooling for industrial sites",
    categories: ["chillers", "commercial"],
    specs: [
      { label: "Capacity", value: "30–500 TR" },
      { label: "Type", value: "Scroll / screw" },
      { label: "COP", value: "Up to 3.2" },
      { label: "Plant", value: "Modular" },
    ],
    image: "/images/products/air-cooled-chiller.jpg",
    imageAlt: "Air cooled chiller plant",
    href: "/solutions/industrial-pharma",
  },
  {
    id: "ducted-concealed",
    name: "Ducted concealed",
    tagline: "Invisible cooling with even airflow",
    categories: ["ducted", "residential", "commercial"],
    specs: [
      { label: "Capacity", value: "1.5–5 Ton" },
      { label: "ESP", value: "High static" },
      { label: "Profile", value: "Slim body" },
      { label: "Control", value: "Zone ready" },
    ],
    image: "/images/products/ducted-concealed.jpg",
    imageAlt: "Ducted concealed indoor unit",
    href: "/solutions/residential",
  },
  {
    id: "cassette",
    name: "Cassette",
    tagline: "360° distribution for open floor plates",
    categories: ["commercial", "vrv-vrf"],
    specs: [
      { label: "Coverage", value: "360°" },
      { label: "Capacity", value: "2–5 Ton" },
      { label: "Draft", value: "Auto swing" },
      { label: "Panel", value: "Flush fit" },
    ],
    image: "/images/products/cassette.jpg",
    imageAlt: "Ceiling cassette air conditioner",
    href: "/solutions/commercial",
  },
  {
    id: "floor-standing",
    name: "Floor standing",
    tagline: "High-capacity cooling without ductwork",
    categories: ["split-ac", "commercial"],
    specs: [
      { label: "Capacity", value: "3–5 Ton" },
      { label: "Throw", value: "Long reach" },
      { label: "Install", value: "Floor mount" },
      { label: "Duty", value: "Retail / hall" },
    ],
    image: "/images/products/floor-standing.jpg",
    imageAlt: "Floor standing air conditioner",
    href: "/solutions/commercial",
  },
  {
    id: "split-inverter",
    name: "Split inverter",
    tagline: "Quiet comfort for homes and offices",
    categories: ["split-ac", "residential"],
    specs: [
      { label: "Capacity", value: "1–2 Ton" },
      { label: "Noise", value: "19 dB(A)" },
      { label: "Star", value: "5 Star" },
      { label: "Airflow", value: "12.5 m³/min" },
    ],
    isNewLaunch: true,
    image: "/images/products/split-inverter.jpg",
    imageAlt: "Split inverter wall-mounted unit",
    href: "/solutions/residential",
  },
];

export function filterProductCatalogItems(
  items: ProductCatalogItem[],
  filter: ProductCatalogFilter,
): ProductCatalogItem[] {
  if (filter === "all") return items;
  if (filter === "new-launches") return items.filter((item) => item.isNewLaunch);
  return items.filter((item) => item.categories.includes(filter));
}
