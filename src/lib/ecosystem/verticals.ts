export type VerticalFamily = "comunidad" | "region";

export type EcosystemVertical = {
  slug: string;
  href: string;
  navKey: string;
  titleKey: string;
  leadKey: string;
  accent: string;
  imageKey: string;
  family: VerticalFamily;
  featured?: boolean;
  informational?: boolean;
};

export const ECOSYSTEM_VERTICALS: readonly EcosystemVertical[] = [
  {
    slug: "deporte",
    href: "/deporte",
    navKey: "nav.sport",
    titleKey: "eco.sport.h",
    leadKey: "eco.sport.lead",
    accent: "sport",
    imageKey: "ecosystem.deporte",
    family: "comunidad",
  },
  {
    slug: "salud",
    href: "/salud",
    navKey: "nav.health",
    titleKey: "eco.health.h",
    leadKey: "eco.health.lead",
    accent: "health",
    imageKey: "ecosystem.salud",
    family: "comunidad",
    informational: true,
  },
  {
    slug: "bienestar",
    href: "/bienestar",
    navKey: "nav.wellness",
    titleKey: "eco.wellness.h",
    leadKey: "eco.wellness.lead",
    accent: "wellness",
    imageKey: "ecosystem.bienestar",
    family: "comunidad",
    informational: true,
  },
  {
    slug: "comunicacion",
    href: "/comunicacion",
    navKey: "nav.communication",
    titleKey: "eco.communication.h",
    leadKey: "eco.communication.lead",
    accent: "communication",
    imageKey: "ecosystem.comunicacion",
    family: "comunidad",
  },
  {
    slug: "solidaridad",
    href: "/solidaridad",
    navKey: "nav.solidarity",
    titleKey: "eco.solidarity.h",
    leadKey: "eco.solidarity.lead",
    accent: "solidarity",
    imageKey: "ecosystem.solidaridad",
    family: "comunidad",
    featured: true,
    informational: true,
  },
  {
    slug: "turismo",
    href: "/turismo",
    navKey: "nav.tourism",
    titleKey: "eco.tourism.h",
    leadKey: "eco.tourism.lead",
    accent: "tourism",
    imageKey: "ecosystem.turismo",
    family: "region",
  },
  {
    slug: "comercios",
    href: "/comercios",
    navKey: "nav.commerce",
    titleKey: "eco.commerce.h",
    leadKey: "eco.commerce.lead",
    accent: "commerce",
    imageKey: "ecosystem.comercios",
    family: "region",
  },
  {
    slug: "educacion",
    href: "/educacion",
    navKey: "nav.education",
    titleKey: "eco.education.h",
    leadKey: "eco.education.lead",
    accent: "education",
    imageKey: "ecosystem.educacion",
    family: "region",
  },
  {
    slug: "eventos",
    href: "/eventos",
    navKey: "nav.events",
    titleKey: "eco.events.h",
    leadKey: "eco.events.lead",
    accent: "events",
    imageKey: "ecosystem.eventos",
    family: "region",
  },
  {
    slug: "descubrimiento",
    href: "/descubrimiento",
    navKey: "nav.discovery",
    titleKey: "eco.discovery.h",
    leadKey: "eco.discovery.lead",
    accent: "discovery",
    imageKey: "ecosystem.descubrimiento",
    family: "region",
  },
  {
    slug: "innovacion",
    href: "/innovacion",
    navKey: "nav.innovation",
    titleKey: "eco.innovation.h",
    leadKey: "eco.innovation.lead",
    accent: "innovation",
    imageKey: "ecosystem.innovacion",
    family: "region",
  },
] as const;

export type VerticalSlug = (typeof ECOSYSTEM_VERTICALS)[number]["slug"];

export const COMMUNITY_VERTICALS = ECOSYSTEM_VERTICALS.filter(
  (v) => v.family === "comunidad"
);

export const REGION_VERTICALS = ECOSYSTEM_VERTICALS.filter(
  (v) => v.family === "region"
);

export type NavLinkGroup = {
  labelKey: string;
  links: readonly { href: string; key: string }[];
};

export const ECOSYSTEM_NAV_GROUPS: readonly NavLinkGroup[] = [
  {
    labelKey: "nav.family.community",
    links: COMMUNITY_VERTICALS.map((v) => ({ href: v.href, key: v.navKey })),
  },
  {
    labelKey: "nav.family.region",
    links: REGION_VERTICALS.map((v) => ({ href: v.href, key: v.navKey })),
  },
];

export const ECOSYSTEM_NAV_LINKS = ECOSYSTEM_VERTICALS.map((v) => ({
  href: v.href,
  key: v.navKey,
}));

export const ABOUT_NAV_LINKS = [
  { href: "/que-es", key: "nav.vision" },
  { href: "/informacion", key: "nav.information" },
  { href: "/#join", key: "nav.join.cta" },
] as const;

export const COMMUNITY_NAV_LINKS = [
  { href: "/historias", key: "nav.stories" },
  { href: "/historias?tab=pulso", key: "nav.pulso" },
  { href: "/eventos", key: "nav.events" },
  { href: "/#join", key: "nav.join.cta" },
] as const;
