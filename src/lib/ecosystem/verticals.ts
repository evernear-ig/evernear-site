export const ECOSYSTEM_VERTICALS = [
  {
    slug: "turismo",
    href: "/turismo",
    navKey: "nav.tourism",
    titleKey: "eco.tourism.h",
    leadKey: "eco.tourism.lead",
    accent: "tourism",
    imageKey: "ecosystem.tourism",
  },
  {
    slug: "educacion",
    href: "/educacion",
    navKey: "nav.education",
    titleKey: "eco.education.h",
    leadKey: "eco.education.lead",
    accent: "education",
    imageKey: "ecosystem.education",
  },
  {
    slug: "descubrimiento",
    href: "/descubrimiento",
    navKey: "nav.discovery",
    titleKey: "eco.discovery.h",
    leadKey: "eco.discovery.lead",
    accent: "discovery",
    imageKey: "ecosystem.discovery",
  },
  {
    slug: "eventos",
    href: "/eventos",
    navKey: "nav.events",
    titleKey: "eco.events.h",
    leadKey: "eco.events.lead",
    accent: "events",
    imageKey: "ecosystem.events",
  },
  {
    slug: "comercios",
    href: "/comercios",
    navKey: "nav.commerce",
    titleKey: "eco.commerce.h",
    leadKey: "eco.commerce.lead",
    accent: "commerce",
    imageKey: "ecosystem.commerce",
  },
] as const;

export const ABOUT_NAV_LINKS = [
  { href: "/#border", key: "nav.border" },
  { href: "/#people", key: "nav.people" },
  { href: "/#next", key: "nav.next" },
  { href: "/#join", key: "nav.join" },
] as const;

export const ECOSYSTEM_NAV_LINKS = ECOSYSTEM_VERTICALS.map((v) => ({
  href: v.href,
  key: v.navKey,
}));
