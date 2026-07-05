/** Curated Unsplash photos — HVAC / sector-relevant, landscape crop for carousel rollover. */
function photo(id: string, width = 985) {
  return `https://images.unsplash.com/${id}?w=${width}&q=85&auto=format&fit=crop`;
}

export const solutionFeatureImages: Record<string, readonly string[]> = {
  commercial: [
    photo("photo-1503387762-592deb58ef4e"), // architectural blueprints
    photo("photo-1621905251189-08b45d6a269e"), // rooftop HVAC units
    photo("photo-1551288049-bebda4e38f71"), // building analytics dashboard
    photo("photo-1504307651254-35680f356dfd"), // industrial ductwork
    photo("photo-1581578731540-5a19df3e0a5e"), // technician servicing unit
  ],
  "it-services": [
    photo("photo-1558494949-ef010cbdcc31"), // server room
    photo("photo-1544197151-38f2ac16f2b2"), // data center racks
    photo("photo-1531403009284-47f444eb0c9b"), // IT monitoring
    photo("photo-1597857363377-068fbaab8129"), // data hall aisle
    photo("photo-1566977408976-7e9aefc2ab2e"), // expanding server infrastructure
  ],
  "industrial-pharma": [
    photo("photo-1579154204601-01588f207606"), // clean laboratory
    photo("photo-1604719312566-8912f81636b1"), // cold storage
    photo("photo-1581091226033-e12bee5946a9"), // industrial facility
    photo("photo-1454165804606-c3d57bc86b40"), // compliance documentation
    photo("photo-1565793298595-6d114df4549c"), // industrial plant retrofit
  ],
  healthcare: [
    photo("photo-1519494026892-80bbd2d6fd0d"), // hospital interior
    photo("photo-1586773866668-b31287b38fc0"), // ICU corridor
    photo("photo-1576091160399-112ba8d25d1f"), // clinical equipment
    photo("photo-1538100146516-962cf33de378"), // modern hospital building
    photo("photo-1504813182591-565017abaa19"), // hospital expansion
  ],
  "hospitality-retail": [
    photo("photo-1631049307264-da0ec9d70304"), // premium hotel room
    photo("photo-1556911221-bff31c812dba"), // commercial kitchen
    photo("photo-1566073771259-6a8506099945"), // hotel lobby
    photo("photo-1441986300917-64674bd600d8"), // retail storefront
    photo("photo-1560448204-e86f23e9fa3f"), // hotel renovation
  ],
  residential: [
    photo("photo-1600585154340-be6161a56a0c"), // modern living room
    photo("photo-1631545806605-69ba4a056c66"), // wall-mounted AC
    photo("photo-1600607687939-ce8a6c25118c"), // villa interior
    photo("photo-1581094794329-c8112a89af12"), // home maintenance
    photo("photo-1620626011764-61b8cd4bca03"), // energy-efficient home
  ],
};

export function featureImage(slug: keyof typeof solutionFeatureImages, index: number) {
  const images = solutionFeatureImages[slug];
  return images[index % images.length];
}
