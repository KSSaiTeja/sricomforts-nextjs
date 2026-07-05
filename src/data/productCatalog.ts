export const PRODUCT_BENTO_IMAGE = "/assets/product-bento.png";
export const PRODUCT_VIEW_LABEL = "View Product";

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

export type ProductCatalogItem = {
  id: string;
  name: string;
  tagline: string;
  categories: ProductCategory[];
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
    isNewLaunch: true,
    imageAlt: "Daikin VRV IV+ system",
    href: "/",
  },
  {
    id: "split-inverter",
    name: "Split Inverter",
    tagline: "Quiet comfort for homes and offices",
    categories: ["split-ac", "residential"],
    isNewLaunch: true,
    imageAlt: "Daikin split inverter unit",
    href: "/",
  },
  {
    id: "cassette-round-flow",
    name: "Round Flow Cassette",
    tagline: "360° distribution for open floor plates",
    categories: ["commercial", "vrv-vrf"],
    imageAlt: "Daikin round flow cassette unit",
    href: "/",
  },
  {
    id: "vrv-s-series",
    name: "VRV S Series",
    tagline: "Compact VRF for boutique commercial spaces",
    categories: ["vrv-vrf", "commercial", "residential"],
    isNewLaunch: true,
    imageAlt: "Daikin VRV S series system",
    href: "/",
  },
  {
    id: "ducted-concealed",
    name: "Ducted Concealed",
    tagline: "Invisible cooling with even airflow",
    categories: ["ducted", "residential", "commercial"],
    imageAlt: "Daikin ducted concealed system",
    href: "/",
  },
  {
    id: "air-cooled-chiller",
    name: "Air-Cooled Chiller",
    tagline: "Central plant cooling for industrial sites",
    categories: ["chillers", "commercial"],
    imageAlt: "Daikin air-cooled chiller",
    href: "/",
  },
  {
    id: "fresh-air-handler",
    name: "Fresh Air Handler",
    tagline: "Ventilation with heat recovery",
    categories: ["commercial"],
    isNewLaunch: true,
    imageAlt: "Daikin fresh air handling unit",
    href: "/",
  },
  {
    id: "floor-standing",
    name: "Floor Standing",
    tagline: "High-capacity cooling without ductwork",
    categories: ["split-ac", "commercial"],
    imageAlt: "Daikin floor standing unit",
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
