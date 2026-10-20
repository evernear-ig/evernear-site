/**
 * Regenerates all vertical listing data files with exactly 6 listings per filter category.
 * Run: node scripts/expand-listings.mjs
 */
import { writeFileSync, readFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { getThematicPhoto } from "./listing-photo-themes.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const LISTINGS_DIR = join(ROOT, "src/data/listings");
const IMAGES_DIR = join(ROOT, "src/lib/images");

const CITIES = ["pi", "foz", "cde"];
const CITY_LABEL = { pi: "Puerto Iguazú", foz: "Foz do Iguaçu", cde: "Ciudad del Este" };
const PER_CATEGORY = 6;

/** @type {Record<string, { categories: string[]; kinds: string[]; exportName: string; typeImport: string }>} */
const VERTICALS = {
  health: {
    exportName: "HEALTH_LISTINGS",
    typeImport: "VerticalListing",
    categories: [
      "primary",
      "pediatrics",
      "mental",
      "dental",
      "nursing",
      "rehab",
      "prevention",
      "maternal",
      "elderly",
      "emergency",
      "telehealth",
    ],
    kinds: [
      "health_center",
      "clinic",
      "mental_health",
      "professional",
      "hospital",
      "ngo",
      "association",
    ],
  },
  wellness: {
    exportName: "WELLNESS_LISTINGS",
    typeImport: "VerticalListing",
    categories: ["yoga", "meditation", "psychology", "fitness", "nutrition", "mindfulness"],
    kinds: ["studio", "center", "professional", "gym", "workshop"],
  },
  communication: {
    exportName: "COMMUNICATION_LISTINGS",
    typeImport: "VerticalListing",
    categories: ["radio", "podcast", "press", "community", "digital"],
    kinds: ["station", "show", "media", "network", "agency"],
  },
  solidarity: {
    exportName: "SOLIDARITY_LISTINGS",
    typeImport: "VerticalListing",
    categories: [
      "food",
      "education",
      "housing",
      "environment",
      "gender",
      "children",
      "elderly",
      "disability",
    ],
    kinds: ["foundation", "ngo", "volunteers", "sponsorship", "raffle"],
  },
  tourism: {
    exportName: "TOURISM_LISTINGS",
    typeImport: "VerticalListing",
    categories: ["stay", "agency", "attraction", "food", "practical"],
    kinds: ["hostel", "hotel", "agency", "site", "tour", "experience", "food", "service"],
  },
  commerce: {
    exportName: "COMMERCE_LISTINGS",
    typeImport: "VerticalListing",
    categories: [
      "Alimentos",
      "Gastronomía",
      "Electrónica",
      "Artesanías",
      "Herramientas",
      "Textil",
      "Farmacia",
      "Muebles",
      "Souvenirs",
    ],
    kinds: ["business"],
  },
  education: {
    exportName: "EDUCATION_LISTINGS",
    typeImport: "VerticalListing",
    categories: ["curso", "programa", "beca"],
    kinds: ["bootcamp", "university", "scholarship", "institute", "online", "workshop"],
  },
  events: {
    exportName: "EVENTS_LISTINGS",
    typeImport: "VerticalListing",
    categories: [
      "innovación",
      "comunidad",
      "networking",
      "blockchain",
      "dev",
      "meetup",
      "estudiantes",
      "educación",
      "turismo",
    ],
    kinds: ["encuentro", "meetup", "festival", "activación", "feria", "conferencia"],
  },
  discovery: {
    exportName: "DISCOVERY_LISTINGS",
    typeImport: "VerticalListing",
    categories: ["profile", "empleo", "colaboracion", "pasantia"],
    kinds: ["talent", "job", "internship", "volunteer"],
  },
  innovation: {
    exportName: "INNOVATION_LISTINGS",
    typeImport: "VerticalListing",
    categories: [
      "software",
      "ai",
      "blockchain",
      "startups",
      "hardware",
      "design",
      "data",
      "education",
      "research",
      "open_source",
    ],
    kinds: [
      "tech_company",
      "research",
      "meetup",
      "incubator",
      "makerspace",
      "studio",
      "consultancy",
      "bootcamp",
      "university",
      "community",
    ],
  },
};

const SPORT_DISCIPLINES = [
  "football",
  "futsal",
  "basketball",
  "volleyball",
  "handball",
  "martial_arts",
  "athletics",
  "swimming",
];
const SPORT_KINDS = ["club", "athlete", "call", "team"];

const CATEGORY_LABELS = {
  health: {
    primary: "Atención primaria",
    pediatrics: "Pediatría",
    mental: "Salud mental",
    dental: "Odontología",
    nursing: "Enfermería",
    rehab: "Rehabilitación",
    prevention: "Prevención",
    maternal: "Maternidad",
    elderly: "Adultos mayores",
    emergency: "Emergencias",
    telehealth: "Telemedicina",
  },
  wellness: {
    yoga: "Yoga",
    meditation: "Meditación",
    psychology: "Psicología",
    fitness: "Fitness",
    nutrition: "Nutrición",
    mindfulness: "Mindfulness",
  },
  communication: {
    radio: "Radio",
    podcast: "Podcast",
    press: "Prensa",
    community: "Comunidad",
    digital: "Digital",
  },
  solidarity: {
    food: "Alimentación",
    education: "Educación",
    housing: "Vivienda",
    environment: "Medio ambiente",
    gender: "Género",
    children: "Infancia",
    elderly: "Adultos mayores",
    disability: "Discapacidad",
  },
  tourism: {
    stay: "Alojamiento",
    agency: "Agencia",
    attraction: "Atractivo",
    food: "Gastronomía",
    practical: "Info práctica",
  },
  commerce: {
    Alimentos: "Alimentos",
    Gastronomía: "Gastronomía",
    Electrónica: "Electrónica",
    Artesanías: "Artesanías",
    Herramientas: "Herramientas",
    Textil: "Textil",
    Farmacia: "Farmacia",
    Muebles: "Muebles",
    Souvenirs: "Souvenirs",
  },
  education: {
    curso: "Curso",
    programa: "Programa",
    beca: "Beca",
  },
  events: {
    innovación: "Innovación",
    comunidad: "Comunidad",
    networking: "Networking",
    blockchain: "Blockchain",
    dev: "Desarrollo",
    meetup: "Meetup",
    estudiantes: "Estudiantes",
    educación: "Educación",
    turismo: "Turismo",
  },
  discovery: {
    profile: "Perfil",
    empleo: "Empleo",
    colaboracion: "Colaboración",
    pasantia: "Pasantía",
  },
  innovation: {
    software: "Software",
    ai: "Inteligencia artificial",
    blockchain: "Blockchain",
    startups: "Startups",
    hardware: "Hardware",
    design: "Diseño",
    data: "Datos",
    education: "Educación tech",
    research: "Investigación",
    open_source: "Open source",
  },
  sport: {
    football: "Fútbol",
    futsal: "Futsal",
    basketball: "Básquet",
    volleyball: "Vóley",
    handball: "Handball",
    martial_arts: "Artes marciales",
    athletics: "Atletismo",
    swimming: "Natación",
  },
};

const NAME_PREFIX = [
  "Centro",
  "Red",
  "Espacio",
  "Proyecto",
  "Instituto",
  "Cooperativa",
  "Asociación",
  "Club",
  "Red Fronteriza",
  "Iniciativa",
  "Programa",
  "Comunidad",
];

const NAME_SUFFIX = [
  "Triple Frontera",
  "Iguazú",
  "Paraná",
  "San Roque",
  "Villa Córdoba",
  "Centro",
  "Norte",
  "Sur",
  "Integración",
  "Regional",
  "Binacional",
  "Trinacional",
];

const META_POOL = [
  "Atención trilingüe",
  "Turnos online",
  "Contacto directo",
  "Inscripción abierta",
  "Lista de espera",
  "Lun–Vie 8:00–18:00",
  "Sábados 9:00–13:00",
  "Primera consulta sin costo",
  "10% off clientes frecuentes",
  "Convocatoria 2026",
  "Cruce fronterizo facilitado",
  "Actividad comunitaria",
  "Cupos limitados",
  "Modalidad híbrida",
  "Gratuito para vecinos",
  "Derivaciones regionales",
  "Alianza UNILA",
  "Red Evernear",
];

function slugify(value) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "_")
    .replace(/[^a-zA-Z0-9_]/g, "")
    .toLowerCase();
}

function pick(arr, index) {
  return arr[index % arr.length];
}

function buildName(group, category, index) {
  const label = CATEGORY_LABELS[group]?.[category] ?? category;
  return `${pick(NAME_PREFIX, index + category.length)} ${label} ${pick(NAME_SUFFIX, index)}`;
}

const KIND_LABELS = {
  health_center: "centro de salud",
  mental_health: "salud mental",
  clinic: "clínica",
  professional: "profesional",
  hospital: "hospital",
  ngo: "ONG",
  association: "asociación",
  studio: "estudio",
  center: "centro",
  gym: "gimnasio",
  workshop: "taller",
  station: "estación",
  show: "programa",
  media: "medio",
  network: "red",
  agency: "agencia",
  foundation: "fundación",
  volunteers: "voluntariado",
  sponsorship: "patrocinio",
  raffle: "rifa",
  hostel: "hostel",
  hotel: "hotel",
  site: "sitio",
  tour: "tour",
  experience: "experiencia",
  service: "servicio",
  food: "gastronomía",
  business: "comercio",
  bootcamp: "bootcamp",
  university: "universidad",
  scholarship: "beca",
  institute: "instituto",
  online: "online",
  encuentro: "encuentro",
  meetup: "meetup",
  festival: "festival",
  activación: "activación",
  feria: "feria",
  conferencia: "conferencia",
  talent: "talento",
  job: "empleo",
  internship: "pasantía",
  volunteer: "voluntariado",
  tech_company: "empresa tech",
  research: "investigación",
  incubator: "incubadora",
  makerspace: "makerspace",
  consultancy: "consultoría",
  community: "comunidad",
  club: "club",
  athlete: "atleta",
  call: "convocatoria",
  team: "equipo",
};

function buildSubtitle(group, category, kind) {
  const label = CATEGORY_LABELS[group]?.[category] ?? category;
  const kindLabel = KIND_LABELS[kind] ?? kind.replace(/_/g, " ");
  return `${label} · ${kindLabel}`;
}

function buildDescription(group, category, cityId, index) {
  const city = CITY_LABEL[cityId];
  const label = (CATEGORY_LABELS[group]?.[category] ?? category).toLowerCase();
  const variants = [
    `Servicio de ${label} en ${city} orientado a familias de la Triple Frontera, con derivaciones cruzadas y atención en español y portugués.`,
    `Iniciativa comunitaria de ${label} en ${city} que conecta vecinos de Argentina, Brasil y Paraguay sin intermediarios.`,
    `Propuesta regional de ${label} con sede en ${city}, pensada para residentes y visitantes del corredor Iguazú–Foz–CDE.`,
    `Organización local de ${label} en ${city} con trayectoria en la región trifronteriza y red de aliados Evernear.`,
    `Espacio de ${label} en ${city} con turnos presenciales y coordinación binacional para casos que cruzan la frontera.`,
    `Referente de ${label} en ${city}: información verificada, contacto directo y foco en la comunidad del Paraná.`,
  ];
  return variants[index % variants.length];
}

function buildSportDescription(discipline, cityId, kind, index) {
  const city = CITY_LABEL[cityId];
  const label = CATEGORY_LABELS.sport[discipline].toLowerCase();
  const kindEs =
    kind === "club"
      ? "club deportivo"
      : kind === "athlete"
        ? "atleta regional"
        : kind === "call"
          ? "convocatoria abierta"
          : "equipo formativo";
  const variants = [
    `${kindEs.charAt(0).toUpperCase() + kindEs.slice(1)} de ${label} en ${city} con entrenamientos regulares y participación en torneos locales y fronterizos.`,
    `Propuesta de ${label} en ${city} para jóvenes y adultos de la Triple Frontera. ${kind === "call" ? "Inscripciones abiertas para la temporada 2026." : "Contacto directo con la institución."}`,
    `Actividad de ${label} en ${city} integrada a la red deportiva regional Evernear, con canchas y horarios actualizados.`,
    `${label.charAt(0).toUpperCase() + label.slice(1)} en ${city}: ${kindEs} con enfoque comunitario y posibilidad de intercambio con clubes vecinos.`,
    `Referente de ${label} en ${city} para quienes buscan practicar cerca del Puente de la Amistad y la zona del Iguazú.`,
    `Espacio de ${label} en ${city} con categorías formativas, acompañamiento técnico y convocatorias periódicas.`,
  ];
  return variants[index % variants.length];
}

function buildSportTitle(discipline, cityId, kind, index) {
  const cityShort =
    cityId === "pi" ? "Iguazú" : cityId === "foz" ? "Foz" : "CDE";
  const label = CATEGORY_LABELS.sport[discipline];
  const templates = {
    club: [`Club ${label} ${cityShort}`, `Asociación ${label} Frontera`, `Instituto ${label} ${pick(NAME_SUFFIX, index)}`],
    athlete: [`Atleta ${label} ${cityShort}`, `Talento ${label} Regional`, `${label} · selección ${cityShort}`],
    call: [`Convocatoria ${label} 2026`, `Copa ${label} Trinacional`, `Torneo ${label} ${cityShort}`],
    team: [`Equipo ${label} ${cityShort}`, `Escuela ${label} Comunitaria`, `Selección ${label} ${pick(NAME_SUFFIX, index)}`],
  };
  return pick(templates[kind] ?? templates.club, index);
}

/** @type {Record<string, Record<string, import('../src/lib/images.ts').ImageSpec>>} */
const LISTING_IMAGES = {};
let totalImageKeys = 0;

function ensureImageGroup(group) {
  if (!LISTING_IMAGES[group]) LISTING_IMAGES[group] = {};
}

function registerImage(group, itemKey, categorySlug, categoryLabel, cityId, index) {
  ensureImageGroup(group);
  const key = itemKey;
  if (LISTING_IMAGES[group][key]) return `${group}.${key}`;
  const photo = getThematicPhoto(group, categorySlug, index, categoryLabel, cityId);
  LISTING_IMAGES[group][key] = photo;
  totalImageKeys += 1;
  return `${group}.${key}`;
}

function generateVerticalListings(group, config) {
  const listings = [];
  for (const category of config.categories) {
    const catSlug = slugify(category);
    for (let n = 0; n < PER_CATEGORY; n++) {
      const cityId = CITIES[n % CITIES.length];
      const kind = pick(config.kinds, n);
      const itemKey = `${catSlug}_n${n + 1}`;
      const imageKey = registerImage(
        group,
        itemKey,
        catSlug,
        CATEGORY_LABELS[group][category] ?? category,
        cityId,
        n
      );
      const id = `${group}-${catSlug}-n${n + 1}`;
      listings.push({
        id,
        cityId,
        category,
        kind,
        title: buildName(group, category, n),
        subtitle: buildSubtitle(group, category, kind),
        description: buildDescription(group, category, cityId, n),
        imageKey,
        meta: pick(META_POOL, n + category.length),
      });
    }
  }
  return listings;
}

function generateSportListings() {
  const listings = [];
  for (const discipline of SPORT_DISCIPLINES) {
    const discSlug = slugify(discipline);
    for (let n = 0; n < PER_CATEGORY; n++) {
      const cityId = CITIES[n % CITIES.length];
      const kind = pick(SPORT_KINDS, n);
      const itemKey = `${discSlug}_n${n + 1}`;
      const imageKey = registerImage(
        "sport",
        itemKey,
        discSlug,
        CATEGORY_LABELS.sport[discipline],
        cityId,
        n
      );
      listings.push({
        id: `sport-${discSlug}-n${n + 1}`,
        discipline,
        cityId,
        kind,
        title: buildSportTitle(discipline, cityId, kind, n),
        subtitle: `${CATEGORY_LABELS.sport[discipline]} · ${KIND_LABELS[kind] ?? kind.replace(/_/g, " ")}`,
        description: buildSportDescription(discipline, cityId, kind, n),
        imageKey,
        meta: pick(META_POOL, n + discipline.length),
      });
    }
  }
  return listings;
}

function escapeString(str) {
  return str.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function formatListingObject(obj, indent = "  ") {
  const lines = [`${indent}{`];
  for (const [key, value] of Object.entries(obj)) {
    if (value === undefined) continue;
    lines.push(`${indent}  ${key}: "${escapeString(String(value))}",`);
  }
  lines.push(`${indent}},`);
  return lines.join("\n");
}

function writeListingFile(group, config, listings) {
  const constName = config.exportName;
  const typeName = config.typeImport;
  const body = listings.map((l) => formatListingObject(l)).join("\n");
  const content = `import type { ${typeName} } from "@/lib/ecosystem/types";

export const ${constName}: ${typeName}[] = [
${body}
];
`;
  writeFileSync(join(LISTINGS_DIR, `${group}.ts`), content, "utf8");
}

function writeSportFile(listings) {
  const body = listings.map((l) => formatListingObject(l)).join("\n");
  const content = `import type { SportListing } from "@/lib/ecosystem/types";

export const SPORT_LISTINGS: SportListing[] = [
${body}
];
`;
  writeFileSync(join(ROOT, "src/data/sport.ts"), content, "utf8");
}

function formatImageSpec(key, spec) {
  const altLines = Object.entries(spec.alt)
    .map(([lang, text]) => `      ${lang}: "${escapeString(text)}",`)
    .join("\n");
  const fileLine = spec.file ? `\n      file: "${escapeString(spec.file)}",` : "";
  return `    ${key}: {
      u: "${escapeString(spec.u)}",${fileLine}
      pos: "${escapeString(spec.pos ?? "50% 42%")}",
      alt: {
${altLines}
      },
    },`;
}

function writeListingImages() {
  mkdirSync(IMAGES_DIR, { recursive: true });
  const groups = Object.keys(LISTING_IMAGES).sort();
  const blocks = groups.map((group) => {
    const entries = Object.keys(LISTING_IMAGES[group])
      .sort()
      .map((key) => formatImageSpec(key, LISTING_IMAGES[group][key]))
      .join("\n");
    return `  ${group}: {\n${entries}\n  },`;
  });
  const content = `import type { ImageSpec } from "@/lib/images";

type ImageGroup = Record<string, ImageSpec>;

export const LISTING_IMAGES = {
${blocks.join("\n")}
} satisfies Record<string, ImageGroup>;
`;
  writeFileSync(join(IMAGES_DIR, "listing-images.ts"), content, "utf8");
}

function patchGetImageSpec() {
  const imagesPath = join(ROOT, "src/lib/images.ts");
  let content = readFileSync(imagesPath, "utf8");
  if (!content.includes("LISTING_IMAGES")) {
    content = content.replace(
      'export type ImageMode = "auto"',
      'import { LISTING_IMAGES } from "@/lib/images/listing-images";\n\nexport type ImageMode = "auto"'
    );
    content = content.replace(
      `export function getImageSpec(key: string): ImageSpec | undefined {
  const [group, item] = key.split(".");
  const bucket = IMAGES[group as keyof typeof IMAGES];
  if (!bucket || typeof bucket !== "object") return undefined;
  return (bucket as ImageGroup)[item];
}`,
      `export function getImageSpec(key: string): ImageSpec | undefined {
  const [group, item] = key.split(".");
  const listingGroup = (LISTING_IMAGES as Record<string, ImageGroup>)[group];
  if (listingGroup?.[item]) return listingGroup[item];
  const bucket = IMAGES[group as keyof typeof IMAGES];
  if (!bucket || typeof bucket !== "object") return undefined;
  return (bucket as ImageGroup)[item];
}`
    );
    writeFileSync(imagesPath, content, "utf8");
    console.log("Updated src/lib/images.ts getImageSpec()");
  }
}

function main() {
  mkdirSync(LISTINGS_DIR, { recursive: true });

  const summary = {};

  for (const [group, config] of Object.entries(VERTICALS)) {
    const listings = generateVerticalListings(group, config);
    writeListingFile(group, config, listings);
    summary[group] = listings.length;
    console.log(`Wrote ${listings.length} listings → src/data/listings/${group}.ts`);
  }

  const sportListings = generateSportListings();
  writeSportFile(sportListings);
  summary.sport = sportListings.length;
  console.log(`Wrote ${sportListings.length} listings → src/data/sport.ts`);

  writeListingImages();
  console.log(`Wrote ${totalImageKeys} image keys → src/lib/images/listing-images.ts`);

  patchGetImageSpec();

  const totalListings = Object.values(summary).reduce((a, b) => a + b, 0);
  console.log("\n--- Summary ---");
  for (const [k, v] of Object.entries(summary)) {
    console.log(`  ${k}: ${v} listings`);
  }
  console.log(`  TOTAL listings: ${totalListings}`);
  console.log(`  TOTAL image keys: ${totalImageKeys}`);
}

try {
  main();
} catch (err) {
  console.error(err);
  process.exit(1);
}
