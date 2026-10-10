export interface ProjectCardData {
  id: string;
  code: string;
  title: string;
  titleUk: string;
  subtitle: string;
  subtitleUk: string;
  tag: string;
  tagUk: string;
  imagePrimary: string;
  imageHover: string;
  priceUah: number;
  priceEur: number;
  priceUsd: number;
}

export const PROJECTS: ProjectCardData[] = [
  {
    id: "project-love-song",
    code: "01",
    title: "LOVE · Transcarpathian Song",
    titleUk: "LOVE · Музична спадщина",
    subtitle:
      "Archival wedding portrait & dialect song lyrics woven into wearable sound",
    subtitleUk:
      "Архівний весільний портрет і рядки закарпатської пісні, що оживають через звук",
    tag: "Music & Archive",
    tagUk: "Музика та архів",
    imagePrimary: "/products/Musical_T-shirt_Love_2-1 copy.jpg",
    imageHover: "/products/Musical_T-shirt_Love_2-2 copy.jpg",
    priceUah: 1450,
    priceEur: 35,
    priceUsd: 38,
  },
  {
    id: "project-uzhhorod-memory",
    code: "02",
    title: "Portraits of Old Uzhhorod",
    titleUk: "Портрети старого Ужгорода",
    subtitle:
      "Visual stories of regional architecture, people, and forgotten urban legends",
    subtitleUk:
      "Візуальні історії про архітектуру, людей та міські легенди старого міста",
    tag: "Visual Heritage",
    tagUk: "Візуальна спадщина",
    imagePrimary: "/products/Musical_T-shirt_Love_2-1 copy.jpg",
    imageHover: "/products/Musical_T-shirt_Love_2-4 copy.jpg",
    priceUah: 1450,
    priceEur: 35,
    priceUsd: 38,
  },
  {
    id: "project-dialect-artifacts",
    code: "03",
    title: "Living Dialect · Conceptual Gifts",
    titleUk: "Жива бесіда · Концептуальні речі",
    subtitle:
      "Contemporary art objects and limited-edition apparel inspired by Carpathian speech",
    subtitleUk:
      "Сучасні арт-об'єкти та лімітовані серії одягу за мотивами закарпатської говірки",
    tag: "Conceptual Merch",
    tagUk: "Концептуальний мерч",
    imagePrimary: "/products/Musical_T-shirt_Love_2-1 copy.jpg",
    imageHover: "/products/Musical_T-shirt_Love_2-5 copy.jpg",
    priceUah: 1450,
    priceEur: 35,
    priceUsd: 38,
  },
];

export const FLAGSHIP_GALLERY_IMAGES = [
  "/products/Musical_T-shirt_Love_2-1 copy.jpg",
  "/products/Musical_T-shirt_Love_2-2 copy.jpg",
  "/products/Musical_T-shirt_Love_2-5 copy.jpg",
  "/products/Musical_T-shirt_Love_2-4 copy.jpg",
  "/products/Musical_T-shirt_Love_2-3 copy.jpg",
] as const;

export const APPAREL_SIZES = ["S", "M", "L", "XL"] as const;

export const FLAGSHIP_PRICE = {
  priceUah: 1450,
  priceEur: 35,
  priceUsd: 38,
} as const;
