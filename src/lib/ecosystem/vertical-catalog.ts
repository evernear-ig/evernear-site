import { VERTICAL_LISTINGS } from "@/data/listings";
import { JOIN_TRACKS, type JoinTrack } from "@/lib/join-tracks";
import { ECOSYSTEM_VERTICALS, type VerticalSlug } from "./verticals";

export const SLUG_TO_PREFIX: Record<VerticalSlug, string> = {
  deporte: "sport",
  salud: "health",
  bienestar: "wellness",
  comunicacion: "communication",
  solidaridad: "solidarity",
  turismo: "tourism",
  comercios: "commerce",
  educacion: "education",
  eventos: "events",
  descubrimiento: "discovery",
  innovacion: "innovation",
};

export type GuideStep = { title: string; body: string };
export type AudienceItem = { title: string; sub: string };

export type VerticalCatalogConfig = {
  slug: VerticalSlug;
  prefix: string;
  accent: string;
  joinTrack?: JoinTrack;
  catalogDividerKey: string;
  categoryFilterLabelKey: string;
  categoryOptions: { value: string; labelKey: string }[];
  audienceItems: readonly AudienceItem[];
  pathSteps: readonly GuideStep[];
  quoteKey: string;
  ctaKey: string;
  disclaimerKey: string;
  comingLeadKey: string;
  comingFilterNoteKey: string;
  comingEmptyKey: string;
  comingNoteKey: string;
  listings: typeof VERTICAL_LISTINGS[VerticalSlug];
};

const CITY_FILTER = [
  { value: "all", labelKey: "filter.all" },
  { value: "pi", labelKey: "city.pi.b" },
  { value: "foz", labelKey: "city.foz.b" },
  { value: "cde", labelKey: "city.cde.b" },
] as const;

function guideSteps(prefix: string): readonly GuideStep[] {
  return [
    { title: `${prefix}.guide.s1`, body: `${prefix}.guide.s1.p` },
    { title: `${prefix}.guide.s2`, body: `${prefix}.guide.s2.p` },
    { title: `${prefix}.guide.s3`, body: `${prefix}.guide.s3.p` },
    { title: `${prefix}.guide.s4`, body: `${prefix}.guide.s4.p` },
  ] as const;
}

function joinFocusOptions(track: JoinTrack, limit = 10) {
  return JOIN_TRACKS[track].focusAreas.slice(0, limit).map((item) => ({
    value: item.value,
    labelKey: item.key,
  }));
}

const AUDIENCE_BY_SLUG: Record<VerticalSlug, readonly AudienceItem[]> = {
  deporte: [
    { title: "join.org.sport.club", sub: "sport.guide.a1.s" },
    { title: "join.org.sport.athlete", sub: "sport.guide.a2.s" },
    { title: "sport.guide.a3", sub: "sport.guide.a3.s" },
    { title: "join.org.sport.sponsor", sub: "sport.guide.a4.s" },
  ],
  salud: [
    { title: "join.org.health.hospital", sub: "health.guide.a1.s" },
    { title: "join.org.health.professional", sub: "health.guide.a2.s" },
    { title: "health.guide.a3", sub: "health.guide.a3.s" },
    { title: "join.org.health.ngo", sub: "health.guide.a4.s" },
  ],
  bienestar: [
    { title: "join.org.wellness.studio", sub: "wellness.guide.a1.s" },
    { title: "join.org.wellness.professional", sub: "wellness.guide.a2.s" },
    { title: "wellness.guide.a3", sub: "wellness.guide.a3.s" },
    { title: "join.org.wellness.center", sub: "wellness.guide.a4.s" },
  ],
  comunicacion: [
    { title: "join.org.communication.media", sub: "communication.guide.a1.s" },
    { title: "join.org.communication.journalist", sub: "communication.guide.a2.s" },
    { title: "communication.guide.a3", sub: "communication.guide.a3.s" },
    { title: "join.org.communication.podcast", sub: "communication.guide.a4.s" },
  ],
  solidaridad: [
    { title: "join.org.solidarity.foundation", sub: "solidarity.guide.a1.s" },
    { title: "join.org.solidarity.volunteers", sub: "solidarity.guide.a2.s" },
    { title: "solidarity.guide.a3", sub: "solidarity.guide.a3.s" },
    { title: "join.org.solidarity.ngo", sub: "solidarity.guide.a4.s" },
  ],
  turismo: [
    { title: "join.org.tourism.stay", sub: "tourism.guide.a1.s" },
    { title: "join.org.tourism.attraction", sub: "tourism.guide.a2.s" },
    { title: "tourism.guide.a3", sub: "tourism.guide.a3.s" },
    { title: "join.org.tourism.agency", sub: "tourism.guide.a4.s" },
  ],
  comercios: [
    { title: "join.org.commerce.shop", sub: "commerce.guide.a1.s" },
    { title: "join.org.commerce.restaurant", sub: "commerce.guide.a2.s" },
    { title: "commerce.guide.a3", sub: "commerce.guide.a3.s" },
    { title: "join.org.commerce.market", sub: "commerce.guide.a4.s" },
  ],
  educacion: [
    { title: "join.org.education.university", sub: "education.guide.a1.s" },
    { title: "join.org.education.course", sub: "education.guide.a2.s" },
    { title: "education.guide.a3", sub: "education.guide.a3.s" },
    { title: "join.org.education.scholarship", sub: "education.guide.a4.s" },
  ],
  eventos: [
    { title: "join.org.events.organizer", sub: "events.guide.a1.s" },
    { title: "join.org.events.community", sub: "events.guide.a2.s" },
    { title: "events.guide.a3", sub: "events.guide.a3.s" },
    { title: "join.org.events.festival", sub: "events.guide.a4.s" },
  ],
  descubrimiento: [
    { title: "join.org.discovery.talent", sub: "discovery.guide.a1.s" },
    { title: "join.org.discovery.company", sub: "discovery.guide.a2.s" },
    { title: "discovery.guide.a3", sub: "discovery.guide.a3.s" },
    { title: "join.org.discovery.professional", sub: "discovery.guide.a4.s" },
  ],
  innovacion: [
    { title: "join.org.innovation.university", sub: "innovation.guide.a1.s" },
    { title: "join.org.innovation.meetup", sub: "innovation.guide.a2.s" },
    { title: "innovation.guide.a3", sub: "innovation.guide.a3.s" },
    { title: "join.org.innovation.tech_company", sub: "innovation.guide.a4.s" },
  ],
};

const CATEGORY_OPTIONS: Record<
  VerticalSlug,
  { labelKey: string; options: { value: string; labelKey: string }[] }
> = {
  deporte: {
    labelKey: "filter.modality",
    options: joinFocusOptions("sport"),
  },
  salud: {
    labelKey: "filter.focus",
    options: joinFocusOptions("health"),
  },
  bienestar: {
    labelKey: "filter.modality",
    options: [
      { value: "yoga", labelKey: "wellness.filter.yoga" },
      { value: "meditation", labelKey: "wellness.filter.meditation" },
      { value: "psychology", labelKey: "wellness.filter.psychology" },
      { value: "fitness", labelKey: "wellness.filter.fitness" },
      { value: "nutrition", labelKey: "wellness.filter.nutrition" },
      { value: "mindfulness", labelKey: "wellness.filter.mindfulness" },
    ],
  },
  comunicacion: {
    labelKey: "filter.format",
    options: [
      { value: "radio", labelKey: "communication.filter.radio" },
      { value: "podcast", labelKey: "communication.filter.podcast" },
      { value: "press", labelKey: "communication.filter.press" },
      { value: "community", labelKey: "communication.filter.community" },
      { value: "digital", labelKey: "communication.filter.digital" },
    ],
  },
  solidaridad: {
    labelKey: "filter.type",
    options: joinFocusOptions("solidarity", 8),
  },
  turismo: {
    labelKey: "filter.category",
    options: [
      { value: "stay", labelKey: "tourism.filter.stay" },
      { value: "agency", labelKey: "tourism.filter.agency" },
      { value: "attraction", labelKey: "tourism.filter.attraction" },
      { value: "food", labelKey: "tourism.filter.food" },
      { value: "practical", labelKey: "tourism.filter.practical" },
    ],
  },
  comercios: {
    labelKey: "filter.category",
    options: [
      { value: "Alimentos", labelKey: "commerce.kind.food" },
      { value: "Gastronomía", labelKey: "commerce.filter.gastronomy" },
      { value: "Electrónica", labelKey: "commerce.filter.electronics" },
      { value: "Artesanías", labelKey: "commerce.kind.crafts" },
      { value: "Herramientas", labelKey: "commerce.kind.tools" },
      { value: "Textil", labelKey: "commerce.filter.textile" },
      { value: "Farmacia", labelKey: "commerce.filter.pharmacy" },
      { value: "Muebles", labelKey: "commerce.filter.furniture" },
      { value: "Souvenirs", labelKey: "commerce.filter.souvenirs" },
    ],
  },
  educacion: {
    labelKey: "filter.type",
    options: [
      { value: "curso", labelKey: "education.kind.course" },
      { value: "programa", labelKey: "education.kind.program" },
      { value: "beca", labelKey: "education.kind.scholarship" },
    ],
  },
  eventos: {
    labelKey: "filter.theme",
    options: [
      { value: "innovación", labelKey: "events.filter.innovation" },
      { value: "comunidad", labelKey: "events.filter.community" },
      { value: "networking", labelKey: "events.filter.networking" },
      { value: "blockchain", labelKey: "events.filter.blockchain" },
      { value: "dev", labelKey: "events.filter.dev" },
      { value: "meetup", labelKey: "events.kind.meetup" },
      { value: "estudiantes", labelKey: "events.filter.students" },
      { value: "educación", labelKey: "events.filter.education" },
      { value: "turismo", labelKey: "events.filter.tourism" },
    ],
  },
  descubrimiento: {
    labelKey: "filter.type",
    options: [
      { value: "profile", labelKey: "discovery.filter.profile" },
      { value: "empleo", labelKey: "discovery.filter.job" },
      { value: "colaboracion", labelKey: "discovery.filter.collaboration" },
      { value: "pasantia", labelKey: "discovery.filter.internship" },
    ],
  },
  innovacion: {
    labelKey: "filter.focus",
    options: joinFocusOptions("innovation"),
  },
};

const CATALOG_DIVIDER: Record<VerticalSlug, string> = {
  deporte: "eco.catalog.sport",
  salud: "eco.catalog.health",
  bienestar: "eco.catalog.wellness",
  comunicacion: "eco.catalog.communication",
  solidaridad: "eco.catalog.solidarity",
  turismo: "eco.catalog.tourism",
  comercios: "eco.catalog.commerce",
  educacion: "eco.catalog.courses",
  eventos: "eco.catalog.events",
  descubrimiento: "eco.catalog.discovery",
  innovacion: "eco.catalog.innovation",
};

const JOIN_TRACK_BY_SLUG: Partial<Record<VerticalSlug, JoinTrack>> = {
  deporte: "sport",
  salud: "health",
  solidaridad: "solidarity",
  innovacion: "innovation",
};

const BADGE_OVERRIDES: Record<string, Record<string, string>> = {
  sport: {
    club: "join.org.sport.club",
    athlete: "join.org.sport.athlete",
    call: "sport.guide.a3",
    team: "join.org.sport.team",
  },
  health: {
    health_center: "health.kind.center",
    mental_health: "health.kind.mental",
    clinic: "health.kind.clinic",
    professional: "health.kind.professional",
    ngo: "health.kind.ngo",
    hospital: "health.kind.hospital",
    association: "health.kind.association",
  },
  wellness: {
    studio: "wellness.kind.spa",
    center: "wellness.kind.group",
    professional: "wellness.kind.psychology",
    gym: "wellness.kind.fitness",
    workshop: "wellness.kind.group",
  },
  communication: {
    station: "communication.kind.media",
    show: "communication.kind.podcast",
    media: "communication.kind.media",
    network: "communication.kind.community",
    agency: "communication.kind.brand",
  },
  solidarity: {
    sponsorship: "solidarity.kind.sponsorship",
    raffle: "solidarity.kind.raffle",
    foundation: "solidarity.kind.foundation",
    ngo: "solidarity.kind.foundation",
    volunteers: "join.org.solidarity.volunteers",
  },
  tourism: {
    hostel: "tourism.kind.stay",
    hotel: "tourism.kind.stay",
    agency: "tourism.kind.agency",
    site: "tourism.kind.attraction",
    tour: "tourism.kind.attraction",
    experience: "tourism.kind.attraction",
    service: "tourism.kind.practical",
    food: "tourism.kind.food",
  },
  commerce: {
    business: "commerce.kind.retail",
  },
  education: {
    bootcamp: "education.kind.course",
    university: "education.kind.program",
    scholarship: "education.kind.scholarship",
    institute: "education.kind.course",
    online: "education.kind.course",
    workshop: "education.kind.workshop",
  },
  events: {
    encuentro: "events.kind.community",
    meetup: "events.kind.meetup",
    festival: "events.kind.festival",
    activación: "events.kind.cultural",
    feria: "events.kind.community",
    conferencia: "events.kind.cultural",
  },
  discovery: {
    talent: "discovery.kind.talent",
    job: "discovery.kind.job",
    internship: "discovery.kind.job",
    volunteer: "discovery.kind.project",
  },
  innovation: {
    tech_company: "innovation.kind.startup",
    research: "innovation.kind.university",
    meetup: "innovation.kind.meetup",
    incubator: "innovation.kind.startup",
    makerspace: "innovation.kind.coworking",
    studio: "innovation.kind.startup",
    consultancy: "innovation.kind.startup",
    bootcamp: "innovation.kind.bootcamp",
    university: "innovation.kind.university",
    community: "innovation.kind.open_source",
  },
};

export function listingBadgeKey(
  prefix: string,
  kind: string,
  category?: string
): string {
  const override = BADGE_OVERRIDES[prefix]?.[kind];
  if (override) return override;

  if (prefix === "commerce" && category) {
    const categoryMap: Record<string, string> = {
      Alimentos: "commerce.kind.food",
      Artesanías: "commerce.kind.crafts",
      Herramientas: "commerce.kind.tools",
    };
    if (categoryMap[category]) return categoryMap[category];
  }

  return `${prefix}.kind.${kind}`;
}

function buildConfig(slug: VerticalSlug): VerticalCatalogConfig {
  const vertical = ECOSYSTEM_VERTICALS.find((item) => item.slug === slug);
  if (!vertical) throw new Error(`Unknown vertical slug: ${slug}`);

  const prefix = SLUG_TO_PREFIX[slug];
  const category = CATEGORY_OPTIONS[slug];

  return {
    slug,
    prefix,
    accent: vertical.accent,
    joinTrack: JOIN_TRACK_BY_SLUG[slug],
    catalogDividerKey: CATALOG_DIVIDER[slug],
    categoryFilterLabelKey: category.labelKey,
    categoryOptions: category.options,
    audienceItems: AUDIENCE_BY_SLUG[slug],
    pathSteps: guideSteps(prefix),
    quoteKey: `${prefix}.guide.q`,
    ctaKey: `${prefix}.guide.cta`,
    disclaimerKey: `${prefix}.guide.disclaimer`,
    comingLeadKey: `${prefix}.coming.p`,
    comingFilterNoteKey: `${prefix}.coming.filter.note`,
    comingEmptyKey: `${prefix}.coming.empty`,
    comingNoteKey: `${prefix}.coming.note`,
    listings: VERTICAL_LISTINGS[slug],
  };
}

export const VERTICAL_CATALOG: Record<VerticalSlug, VerticalCatalogConfig> =
  Object.fromEntries(
    ECOSYSTEM_VERTICALS.map((vertical) => [vertical.slug, buildConfig(vertical.slug)])
  ) as Record<VerticalSlug, VerticalCatalogConfig>;

export function getVerticalCatalog(slug: VerticalSlug): VerticalCatalogConfig {
  return VERTICAL_CATALOG[slug];
}

export const CITY_FILTER_OPTIONS = CITY_FILTER;
