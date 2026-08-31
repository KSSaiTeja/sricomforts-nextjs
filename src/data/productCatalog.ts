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

export type ProductVariant = {
  id: string;
  name: string;
  image: string;
  imageAlt: string;
  tagline?: string;
  specs?: ProductSpec[];
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
  /** Optional in-card carousel (chillers, cassette types). */
  variants?: ProductVariant[];
};

export const productCatalogFilters: ProductCatalogFilterOption[] = [
  { id: "all", label: "All" },
  { id: "new-launches", label: "New Launches" },
  { id: "vrv-vrf", label: "VRV" },
  { id: "split-ac", label: "Split AC" },
  { id: "ducted", label: "Ductable" },
  { id: "chillers", label: "Chillers" },
  { id: "commercial", label: "Commercial" },
  { id: "residential", label: "Residential" },
];

/** Homepage catalog order — showroom index + stage. */
export const productCatalogItems: ProductCatalogItem[] = [
  {
    id: "vrv-vrf",
    name: "Daikin VRV",
    tagline: "Variable refrigerant volume for large campuses",
    categories: ["vrv-vrf", "commercial"],
    specs: [
      { label: "Capacity", value: "8–60 HP" },
      { label: "Efficiency", value: "IEER 21+" },
      { label: "Connect", value: "64 indoors" },
      { label: "Pipe run", value: "165 m" },
    ],
    isNewLaunch: true,
    image: "/images/products/vrv-vrf.png",
    imageAlt: "Daikin VRV outdoor system",
    href: "/solutions/commercial",
  },
  {
    id: "vrv-s",
    name: "Daikin VRV S",
    tagline: "Compact VRV for boutique commercial spaces",
    categories: ["vrv-vrf", "commercial", "residential"],
    specs: [
      { label: "Capacity", value: "4–12 HP" },
      { label: "Footprint", value: "Compact" },
      { label: "Zones", value: "Up to 14" },
      { label: "Refrigerant", value: "R-32" },
    ],
    isNewLaunch: true,
    image: "/images/products/vrv-s.png",
    imageAlt: "Daikin VRV S series outdoor unit",
    href: "/solutions/commercial",
  },
  {
    id: "daikin-chillers",
    name: "Daikin Chillers",
    tagline: "Central plant cooling for industrial sites",
    categories: ["chillers", "commercial"],
    specs: [
      { label: "Capacity", value: "30–500 TR" },
      { label: "Type", value: "Scroll / screw" },
      { label: "COP", value: "Up to 3.2" },
      { label: "Plant", value: "Modular" },
    ],
    image: "/images/products/air-chiller.png",
    imageAlt: "Daikin air cooled chiller",
    href: "/solutions/industrial-pharma",
    variants: [
      {
        id: "air",
        name: "Air chillers",
        image: "/images/products/air-chiller.png",
        imageAlt: "Daikin air cooled chiller",
        tagline: "Outdoor air-cooled plant for sites without a cooling tower",
        specs: [
          { label: "Capacity", value: "30–500 TR" },
          { label: "Type", value: "Air cooled" },
          { label: "COP", value: "Up to 3.2" },
          { label: "Plant", value: "Modular" },
        ],
      },
      {
        id: "water",
        name: "Water chillers",
        image: "/images/products/water-chiller.png",
        imageAlt: "Daikin water cooled chiller",
        tagline: "High-efficiency water-cooled plant for large central systems",
        specs: [
          { label: "Capacity", value: "80–1000 TR" },
          { label: "Type", value: "Water cooled" },
          { label: "COP", value: "Up to 6.0" },
          { label: "Plant", value: "Central" },
        ],
      },
    ],
  },
  {
    id: "ducted-concealed",
    name: "Ductable",
    tagline: "Invisible cooling with even airflow",
    categories: ["ducted", "residential", "commercial"],
    specs: [
      { label: "Capacity", value: "1.5–5 Ton" },
      { label: "ESP", value: "High static" },
      { label: "Profile", value: "Slim body" },
      { label: "Control", value: "Zone ready" },
    ],
    image: "/images/products/ducted-concealed.png",
    imageAlt: "Ductable indoor unit",
    href: "/solutions/residential",
  },
  {
    id: "cassette",
    name: "Cassette AC",
    tagline: "Ceiling cassettes for open floor plates",
    categories: ["commercial", "vrv-vrf"],
    specs: [
      { label: "Coverage", value: "Two-way" },
      { label: "Capacity", value: "2–5 Ton" },
      { label: "Draft", value: "Auto swing" },
      { label: "Panel", value: "Flush fit" },
    ],
    image: "/images/products/cassette-two-way.png",
    imageAlt: "Two-way cassette air conditioner",
    href: "/solutions/commercial",
    variants: [
      {
        id: "two-way",
        name: "Two-way",
        image: "/images/products/cassette-two-way.png",
        imageAlt: "Two-way cassette air conditioner",
        tagline: "Two-way throw for corridors and longer rooms",
        specs: [
          { label: "Coverage", value: "Two-way" },
          { label: "Capacity", value: "2–5 Ton" },
          { label: "Draft", value: "Auto swing" },
          { label: "Panel", value: "Flush fit" },
        ],
      },
      {
        id: "one-way",
        name: "One-way",
        image: "/images/products/cassette-one-way.png",
        imageAlt: "One-way cassette air conditioner",
        tagline: "One-way throw for perimeter zones and tight ceiling grids",
        specs: [
          { label: "Coverage", value: "One-way" },
          { label: "Capacity", value: "1.5–4 Ton" },
          { label: "Draft", value: "Directed" },
          { label: "Panel", value: "Slim fit" },
        ],
      },
    ],
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
    image: "/images/products/floor-standing.png",
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
    image: "/images/products/split-inverter.png",
    imageAlt: "Split inverter wall-mounted unit",
    href: "/solutions/residential",
  },
  {
    id: "ventilation-motor",
    name: "Ventilation motor",
    tagline: "Fresh-air movement for plant rooms and occupied floors",
    categories: ["commercial"],
    specs: [
      { label: "Airflow", value: "500–8000 CFM" },
      { label: "Type", value: "Inline / centrifugal" },
      { label: "Duty", value: "Continuous" },
      { label: "Install", value: "Duct mounted" },
    ],
    image: "/images/products/ventilation-motor.png",
    imageAlt: "HVAC ventilation motor and inline fan",
    href: "/solutions/commercial",
  },
  {
    id: "air-purifiers",
    name: "Air purifiers",
    tagline: "Cleaner indoor air for homes, clinics, and offices",
    categories: ["residential", "commercial"],
    specs: [
      { label: "Coverage", value: "Up to 70 m²" },
      { label: "Filter", value: "HEPA + streamer" },
      { label: "Noise", value: "Quiet night" },
      { label: "Duty", value: "Room / clinic" },
    ],
    isNewLaunch: true,
    image: "/images/products/air-purifier.png",
    imageAlt: "Room air purifier",
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
