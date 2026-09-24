/**
 * Regenerates all vertical listing data files with exactly 6 listings per filter category.
 * Run: node scripts/expand-listings.mjs
 */
import { writeFileSync, readFileSync, mkdirSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const LISTINGS_DIR = join(ROOT, "src/data/listings");
const IMAGES_DIR = join(ROOT, "src/lib/images");

const CITIES = ["pi", "foz", "cde"];
const CITY_LABEL = { pi: "Puerto Iguazú", foz: "Foz do Iguaçu", cde: "Ciudad del Este" };
const PER_CATEGORY = 6;

const PHOTO_POOL = [
  "photo-1758270705317-3ef6142d306f",
  "photo-1602992708529-c9fdb12905c9",
  "photo-1568658176307-bfbd2873abda",
  "photo-1687293233211-6b0cc3beba70",
  "photo-1649252504196-4aca12ecc644",
  "photo-1574629810360-7d2ba7029f8d",
  "photo-1593113598332-cd288d649433",
  "photo-1522071820081-009f0129c71c",
  "photo-1736060109179-e41c70ba8a02",
  "photo-1590246185449-e9e2ddd683bb",
  "photo-1556742049-0cfed4f6a45d",
  "photo-1482951486181-13a752dbbd52",
  "photo-1529156069898-49953e39b3ac",
  "photo-1556918936-3e73b945d24f",
  "photo-1623652554515-91c833e3080e",
  "photo-1629904853716-f0bc54eea481",
  "photo-1649252504348-235b14c9cdb5",
  "photo-1576091160399-112ba8d25d1f",
  "photo-1544367567-0f2fcb009e0b",
  "photo-1478737270239-2f02e77fc3bd",
  "photo-1584515935687-5d4bcc1577d4",
  "photo-1559757143-29579d20b2cd",
  "photo-1606811971610-448588d57af0",
  "photo-1579684385127-1ef15d508118",
  "photo-1571019614242-c5c5dee9f50b",
  "photo-1576091160550-2173dba999ef",
  "photo-1555252333-9f8e92e65df9",
  "photo-1519494026892-80bbd4d6df07",
  "photo-1576091160879-890e68117963",
  "photo-1506126613408-eca07ce68773",
  "photo-1573497019940-1c28c88b4f3e",
  "photo-1534438327276-14e5300c3a48",
  "photo-1490645935967-10de6ba17061",
  "photo-1545389336-cf090694435e",
  "photo-1599901860904-17e06ed708a2",
  "photo-1517836357463-d25dfeac3438",
  "photo-1504711434969-e33886168f5c",
  "photo-1460925895917-afdab827c52f",
  "photo-1598488035139-bdbb2231ccc4",
  "photo-1590602847861-f357a8772d96",
  "photo-1566073771259-6a8506099945",
  "photo-1488646953014-85cb44e25828",
  "photo-1414235077428-338989a2e8c0",
  "photo-1564501049412-61c2a3083791",
  "photo-1469854523086-cc02fe5d8800",
  "photo-1556910103-1c02745aae4d",
  "photo-1554118811-1e0d58224f24",
  "photo-1452860606245-08befc0ff4a9",
  "photo-1581578731548-c64695cc6952",
  "photo-1441986300917-64674bd600d8",
  "photo-1576602976047-17479705aab",
  "photo-1555041469-a586c61ea9bc",
  "photo-1606761568499-6d2451b23be8",
  "photo-1523050854058-8df90110c9f1",
  "photo-1546410531-03aa5fa4b0f0",
  "photo-1639762681485-074b7f938860",
  "photo-1524178232363-1fb2b075b655",
  "photo-1561070791-2526d30994b5",
  "photo-1677442136019-21780ecad995",
  "photo-1559136555-9303baea8ebd",
  "photo-1551288049-bebda4e38f71",
  "photo-1546519638-68b109498ffc",
  "photo-1503676260728-1c00da094a0b",
  "photo-1450778868870-14a5deda6b1a",
  "photo-1486406146926-c627a92ad1ab",
  "photo-1532996122724-e3c354a0a782",
  "photo-1505685296765-3a2730d38989",
  "photo-1604719312566-8912b086b4a7",
];

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
  "Red CONEXA",
];

let photoIndex = 0;
function nextPhoto() {
  const photo = PHOTO_POOL[photoIndex % PHOTO_POOL.length];
  photoIndex += 1;
  return photo;
}

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
    `Organización local de ${label} en ${city} con trayectoria en la región trifronteriza y red de aliados CONEXA.`,
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
    `Actividad de ${label} en ${city} integrada a la red deportiva regional CONEXA, con canchas y horarios actualizados.`,
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

function registerImage(group, itemKey, categoryLabel, cityId, index) {
  ensureImageGroup(group);
  const key = itemKey;
  if (LISTING_IMAGES[group][key]) return `${group}.${key}`;
  const city = CITY_LABEL[cityId];
  const photo = nextPhoto();
  LISTING_IMAGES[group][key] = {
    u: photo,
    pos: "50% 42%",
    alt: {
      es: `${categoryLabel} en ${city} · listing ${index + 1}`,
      pt: `${categoryLabel} em ${city} · listing ${index + 1}`,
      en: `${categoryLabel} in ${city} · listing ${index + 1}`,
    },
  };
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
  return `    ${key}: {
      u: "${spec.u}",
      pos: "${spec.pos}",
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
