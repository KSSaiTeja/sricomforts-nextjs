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

export const productCatalogItems: ProductCatalogItem[] = [
  {
    id: "vrv-iv-plus",
    name: "VRV IV+ Series",
    tagline: "Variable refrigerant flow for large campuses",
    categories: ["vrv-vrf", "commercial"],
    specs: [
      { label: "Capacity", value: "8–60 HP" },
      { label: "Efficiency", value: "IEER 21+" },
      { label: "Connect", value: "64 indoors" },
      { label: "Pipe run", value: "165 m" },
    ],
    isNewLaunch: true,
    imageAlt: "VRV IV+ system",
    href: "/",
  },
  {
    id: "split-inverter",
    name: "Split Inverter",
    tagline: "Quiet comfort for homes and offices",
    categories: ["split-ac", "residential"],
    specs: [
      { label: "Capacity", value: "1–2 Ton" },
      { label: "Noise", value: "19 dB(A)" },
      { label: "Star", value: "5 Star" },
      { label: "Airflow", value: "12.5 m³/min" },
    ],
    isNewLaunch: true,
    imageAlt: "Split inverter unit",
    href: "/",
  },
  {
    id: "cassette-round-flow",
    name: "Round Flow Cassette",
    tagline: "360° distribution for open floor plates",
    categories: ["commercial", "vrv-vrf"],
    specs: [
      { label: "Coverage", value: "360°" },
      { label: "Capacity", value: "2–5 Ton" },
      { label: "Draft", value: "Auto swing" },
      { label: "Panel", value: "Flush fit" },
    ],
    imageAlt: "Round flow cassette unit",
    href: "/",
  },
  {
    id: "vrv-s-series",
    name: "VRV S Series",
    tagline: "Compact VRF for boutique commercial spaces",
    categories: ["vrv-vrf", "commercial", "residential"],
    specs: [
      { label: "Capacity", value: "4–12 HP" },
      { label: "Footprint", value: "Compact" },
      { label: "Zones", value: "Up to 14" },
      { label: "Install", value: "Single phase" },
    ],
    isNewLaunch: true,
    imageAlt: "VRV S series system",
    href: "/",
  },
  {
    id: "ducted-concealed",
    name: "Ducted Concealed",
    tagline: "Invisible cooling with even airflow",
    categories: ["ducted", "residential", "commercial"],
    specs: [
      { label: "Capacity", value: "1.5–5 Ton" },
      { label: "ESP", value: "High static" },
      { label: "Profile", value: "Slim body" },
      { label: "Control", value: "Zone ready" },
    ],
    imageAlt: "Ducted concealed system",
    href: "/",
  },
  {
    id: "air-cooled-chiller",
    name: "Air-Cooled Chiller",
    tagline: "Central plant cooling for industrial sites",
    categories: ["chillers", "commercial"],
    specs: [
      { label: "Capacity", value: "30–500 TR" },
      { label: "Type", value: "Scroll / screw" },
      { label: "COP", value: "Up to 3.2" },
      { label: "Plant", value: "Modular" },
    ],
    imageAlt: "Air-cooled chiller",
    href: "/",
  },
  {
    id: "fresh-air-handler",
    name: "Fresh Air Handler",
    tagline: "Ventilation with heat recovery",
    categories: ["commercial"],
    specs: [
      { label: "Airflow", value: "500–2000 CFM" },
      { label: "Recovery", value: "Up to 70%" },
      { label: "Filter", value: "MERV 13" },
      { label: "Mode", value: "ERV / HRV" },
    ],
    isNewLaunch: true,
    imageAlt: "Fresh air handling unit",
    href: "/",
  },
  {
    id: "floor-standing",
    name: "Floor Standing",
    tagline: "High-capacity cooling without ductwork",
    categories: ["split-ac", "commercial"],
    specs: [
      { label: "Capacity", value: "3–5 Ton" },
      { label: "Throw", value: "Long reach" },
      { label: "Install", value: "Floor mount" },
      { label: "Duty", value: "Retail / hall" },
    ],
    imageAlt: "Floor standing unit",
    href: "/",
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
