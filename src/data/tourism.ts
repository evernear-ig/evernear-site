import type { RegionalRoute, TourismSource } from "@/lib/ecosystem/types";

export const TOURISM_SOURCES: TourismSource[] = [
  {
    cityId: "pi",
    officialUrl: "https://visitiguazu.travel",
    officialName: "visitiguazu.travel",
    status: "candidate",
    links: [
      {
        labelKey: "tourism.cat.stay",
        href: "https://visitiguazu.travel",
        category: "stay",
      },
      {
        labelKey: "tourism.cat.agency",
        href: "https://visitiguazu.travel",
        category: "agency",
      },
      {
        labelKey: "tourism.cat.attraction",
        href: "https://visitiguazu.travel",
        category: "attraction",
      },
      {
        labelKey: "tourism.cat.food",
        href: "https://visitiguazu.travel",
        category: "food",
      },
      {
        labelKey: "tourism.cat.practical",
        href: "https://visitiguazu.travel",
        category: "practical",
      },
    ],
  },
  {
    cityId: "foz",
    status: "unavailable",
    links: [
      {
        labelKey: "tourism.foz.pending",
        href: "#",
        category: "practical",
      },
    ],
  },
  {
    cityId: "cde",
    status: "unavailable",
    links: [
      {
        labelKey: "tourism.cde.pending",
        href: "#",
        category: "practical",
      },
    ],
  },
];

export const REGIONAL_ROUTES: RegionalRoute[] = [
  {
    id: "cataratas",
    titleKey: "tourism.route.cataratas",
    descKey: "tourism.route.cataratas.d",
    cities: ["pi", "foz"],
  },
  {
    id: "comercio",
    titleKey: "tourism.route.comercio",
    descKey: "tourism.route.comercio.d",
    cities: ["cde", "pi", "foz"],
  },
  {
    id: "selva",
    titleKey: "tourism.route.selva",
    descKey: "tourism.route.selva.d",
    cities: ["pi", "foz"],
  },
];
