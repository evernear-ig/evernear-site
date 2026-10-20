import { writeFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { buildGuideBlock } from "./vertical-guides-i18n.mjs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const outPath = join(__dirname, "../src/lib/i18n/vertical-guides.ts");

const PREFIXES = [
  "sport",
  "health",
  "wellness",
  "communication",
  "solidarity",
  "tourism",
  "commerce",
  "education",
  "events",
  "discovery",
  "innovation",
];

const GUIDE_SUFFIXES = [
  "guide.disclaimer",
  "guide.path.aria",
  "guide.s1",
  "guide.s1.p",
  "guide.s2",
  "guide.s2.p",
  "guide.s3",
  "guide.s3.p",
  "guide.s4",
  "guide.s4.p",
  "guide.audience.h",
  "guide.a1.s",
  "guide.a2.s",
  "guide.a3",
  "guide.a3.s",
  "guide.a4.s",
  "guide.region.h",
  "guide.region.p",
  "guide.q",
  "guide.cta",
  "coming.p",
  "coming.filter.note",
  "coming.empty",
  "coming.note",
];

const SHARED = {
  es: {
    eco: {
      health: "Instituciones y profesionales",
      wellness: "Espacios y recursos de bienestar",
      communication: "Medios y voces regionales",
      tourism: "Experiencias y atractivos",
      commerce: "Comercios y promos locales",
      events: "Agenda regional de eventos",
      discovery: "Red de talento y oportunidades",
      innovation: "Ecosistema tech regional",
    },
    kinds: {
      health: {
        hospital: "Hospital",
        clinic: "Clínica",
        center: "Centro de salud",
        association: "Asociación profesional",
        professional: "Profesional independiente",
        mental: "Salud mental",
        public: "Salud pública",
        ngo: "ONG de salud",
        pharmacy: "Farmacia o laboratorio",
      },
      wellness: {
        psychology: "Psicología",
        coaching: "Coaching",
        meditation: "Meditación",
        fitness: "Fitness y movimiento",
        group: "Grupo o taller",
        spa: "Spa y cuidado corporal",
      },
      communication: {
        media: "Medio local",
        podcast: "Podcast",
        journalist: "Periodista independiente",
        newsletter: "Newsletter",
        community: "Comunidad o canal",
        brand: "Marca aliada",
      },
      tourism: {
        stay: "Alojamiento",
        agency: "Agencia",
        attraction: "Atractivo",
        food: "Gastronomía",
        practical: "Info práctica",
      },
      commerce: {
        food: "Alimentos",
        retail: "Comercio minorista",
        services: "Servicios",
        crafts: "Artesanías",
        tools: "Herramientas",
        promo: "Promo activa",
      },
      education: {
        course: "Curso",
        program: "Programa",
        scholarship: "Beca",
        exchange: "Intercambio",
        workshop: "Taller",
        certification: "Certificación",
      },
      events: {
        festival: "Festival",
        meetup: "Meetup",
        concert: "Concierto",
        sport: "Deporte",
        community: "Comunitario",
        cultural: "Cultural",
      },
      discovery: {
        person: "Persona",
        company: "Empresa",
        job: "Oportunidad laboral",
        project: "Proyecto",
        talent: "Talento",
        network: "Red",
      },
      innovation: {
        startup: "Startup",
        bootcamp: "Bootcamp",
        meetup: "Meetup tech",
        coworking: "Coworking",
        university: "Universidad",
        open_source: "Código abierto",
      },
      solidarity: {
        sponsorship: "Busca auspiciantes",
        raffle: "Rifa informativa",
        foundation: "Fundación aliada",
      },
    },
    joinOrg: {
      wellness: {
        center: "Centro de bienestar",
        professional: "Profesional independiente",
        group: "Grupo o taller",
        studio: "Estudio o espacio",
      },
      communication: {
        media: "Medio local",
        podcast: "Podcast",
        journalist: "Periodista",
        channel: "Canal o newsletter",
      },
      tourism: {
        agency: "Agencia de turismo",
        attraction: "Atractivo turístico",
        stay: "Alojamiento",
        guide: "Guía o operador",
      },
      commerce: {
        shop: "Comercio local",
        restaurant: "Restaurante o café",
        service: "Servicio local",
        market: "Mercado o feria",
      },
      education: {
        university: "Universidad o instituto",
        course: "Curso o taller",
        scholarship: "Beca o financiamiento",
        institute: "Centro de formación",
      },
      events: {
        organizer: "Organizador de eventos",
        festival: "Festival",
        community: "Encuentro comunitario",
        venue: "Sede o espacio",
      },
      discovery: {
        professional: "Profesional",
        company: "Empresa",
        opportunity: "Oportunidad",
        talent: "Talento regional",
      },
    },
  },
  pt: {
    eco: {
      health: "Instituições e profissionais",
      wellness: "Espaços e recursos de bem-estar",
      communication: "Mídias e vozes regionais",
      tourism: "Experiências e atrações",
      commerce: "Comércios e promos locais",
      events: "Agenda regional de eventos",
      discovery: "Rede de talento e oportunidades",
      innovation: "Ecossistema tech regional",
    },
    kinds: {
      health: {
        hospital: "Hospital",
        clinic: "Clínica",
        center: "Centro de saúde",
        association: "Associação profissional",
        professional: "Profissional independente",
        mental: "Saúde mental",
        public: "Saúde pública",
        ngo: "ONG de saúde",
        pharmacy: "Farmácia ou laboratório",
      },
      wellness: {
        psychology: "Psicologia",
        coaching: "Coaching",
        meditation: "Meditação",
        fitness: "Fitness e movimento",
        group: "Grupo ou oficina",
        spa: "Spa e cuidado corporal",
      },
      communication: {
        media: "Mídia local",
        podcast: "Podcast",
        journalist: "Jornalista independente",
        newsletter: "Newsletter",
        community: "Comunidade ou canal",
        brand: "Marca aliada",
      },
      tourism: {
        stay: "Hospedagem",
        agency: "Agência",
        attraction: "Atração",
        food: "Gastronomia",
        practical: "Info prática",
      },
      commerce: {
        food: "Alimentos",
        retail: "Comércio varejista",
        services: "Serviços",
        crafts: "Artesanato",
        tools: "Ferramentas",
        promo: "Promo ativa",
      },
      education: {
        course: "Curso",
        program: "Programa",
        scholarship: "Bolsa",
        exchange: "Intercâmbio",
        workshop: "Oficina",
        certification: "Certificação",
      },
      events: {
        festival: "Festival",
        meetup: "Meetup",
        concert: "Show",
        sport: "Esporte",
        community: "Comunitário",
        cultural: "Cultural",
      },
      discovery: {
        person: "Pessoa",
        company: "Empresa",
        job: "Oportunidade de trabalho",
        project: "Projeto",
        talent: "Talento",
        network: "Rede",
      },
      innovation: {
        startup: "Startup",
        bootcamp: "Bootcamp",
        meetup: "Meetup tech",
        coworking: "Coworking",
        university: "Universidade",
        open_source: "Código aberto",
      },
      solidarity: {
        sponsorship: "Busca patrocinadores",
        raffle: "Rifa informativa",
        foundation: "Fundação aliada",
      },
    },
    joinOrg: {
      wellness: {
        center: "Centro de bem-estar",
        professional: "Profissional independente",
        group: "Grupo ou oficina",
        studio: "Estúdio ou espaço",
      },
      communication: {
        media: "Mídia local",
        podcast: "Podcast",
        journalist: "Jornalista",
        channel: "Canal ou newsletter",
      },
      tourism: {
        agency: "Agência de turismo",
        attraction: "Atração turística",
        stay: "Hospedagem",
        guide: "Guia ou operador",
      },
      commerce: {
        shop: "Comércio local",
        restaurant: "Restaurante ou café",
        service: "Serviço local",
        market: "Mercado ou feira",
      },
      education: {
        university: "Universidade ou instituto",
        course: "Curso ou oficina",
        scholarship: "Bolsa ou financiamento",
        institute: "Centro de formação",
      },
      events: {
        organizer: "Organizador de eventos",
        festival: "Festival",
        community: "Encontro comunitário",
        venue: "Sede ou espaço",
      },
      discovery: {
        professional: "Profissional",
        company: "Empresa",
        opportunity: "Oportunidade",
        talent: "Talento regional",
      },
    },
  },
  en: {
    eco: {
      health: "Institutions and professionals",
      wellness: "Wellness spaces and resources",
      communication: "Regional media and voices",
      tourism: "Experiences and attractions",
      commerce: "Local shops and promos",
      events: "Regional events calendar",
      discovery: "Talent and opportunity network",
      innovation: "Regional tech ecosystem",
    },
    kinds: {
      health: {
        hospital: "Hospital",
        clinic: "Clinic",
        center: "Health center",
        association: "Professional association",
        professional: "Independent professional",
        mental: "Mental health",
        public: "Public health",
        ngo: "Health NGO",
        pharmacy: "Pharmacy or lab",
      },
      wellness: {
        psychology: "Psychology",
        coaching: "Coaching",
        meditation: "Meditation",
        fitness: "Fitness and movement",
        group: "Group or workshop",
        spa: "Spa and body care",
      },
      communication: {
        media: "Local media",
        podcast: "Podcast",
        journalist: "Independent journalist",
        newsletter: "Newsletter",
        community: "Community or channel",
        brand: "Partner brand",
      },
      tourism: {
        stay: "Accommodation",
        agency: "Agency",
        attraction: "Attraction",
        food: "Food",
        practical: "Practical info",
      },
      commerce: {
        food: "Food",
        retail: "Retail",
        services: "Services",
        crafts: "Crafts",
        tools: "Tools",
        promo: "Active promo",
      },
      education: {
        course: "Course",
        program: "Program",
        scholarship: "Scholarship",
        exchange: "Exchange",
        workshop: "Workshop",
        certification: "Certification",
      },
      events: {
        festival: "Festival",
        meetup: "Meetup",
        concert: "Concert",
        sport: "Sport",
        community: "Community",
        cultural: "Cultural",
      },
      discovery: {
        person: "Person",
        company: "Company",
        job: "Job opportunity",
        project: "Project",
        talent: "Talent",
        network: "Network",
      },
      innovation: {
        startup: "Startup",
        bootcamp: "Bootcamp",
        meetup: "Tech meetup",
        coworking: "Coworking",
        university: "University",
        open_source: "Open source",
      },
      solidarity: {
        sponsorship: "Seeking sponsors",
        raffle: "Informational raffle",
        foundation: "Partner foundation",
      },
    },
    joinOrg: {
      wellness: {
        center: "Wellness center",
        professional: "Independent professional",
        group: "Group or workshop",
        studio: "Studio or space",
      },
      communication: {
        media: "Local media",
        podcast: "Podcast",
        journalist: "Journalist",
        channel: "Channel or newsletter",
      },
      tourism: {
        agency: "Tourism agency",
        attraction: "Tourist attraction",
        stay: "Accommodation",
        guide: "Guide or operator",
      },
      commerce: {
        shop: "Local shop",
        restaurant: "Restaurant or café",
        service: "Local service",
        market: "Market or fair",
      },
      education: {
        university: "University or institute",
        course: "Course or workshop",
        scholarship: "Scholarship or funding",
        institute: "Training center",
      },
      events: {
        organizer: "Event organizer",
        festival: "Festival",
        community: "Community gathering",
        venue: "Venue or space",
      },
      discovery: {
        professional: "Professional",
        company: "Company",
        opportunity: "Opportunity",
        talent: "Regional talent",
      },
    },
  },
  gn: {
    eco: {
      health: "Institución ha tembikuaa",
      wellness: "Tenda ha recurso bienestar",
      communication: "Medio ha ñe'ẽ regiónpe",
      tourism: "Experiencia ha atractivo",
      commerce: "Ñemuha ha promo",
      events: "Agenda evento regional",
      discovery: "Red katupyry ha oportunidad",
      innovation: "Ekosistema tech regional",
    },
    kinds: {
      health: {
        hospital: "Hospital",
        clinic: "Clínica",
        center: "Centro tembikuaa",
        association: "Asociación profesional",
        professional: "Profesional independiente",
        mental: "Salud mental",
        public: "Salud pública",
        ngo: "ONG tembikuaa",
        pharmacy: "Farmacia térã laboratorio",
      },
      wellness: {
        psychology: "Psicología",
        coaching: "Coaching",
        meditation: "Meditación",
        fitness: "Fitness ha movimiento",
        group: "Grupo térã taller",
        spa: "Spa ha cuidado corporal",
      },
      communication: {
        media: "Medio local",
        podcast: "Podcast",
        journalist: "Periodista independiente",
        newsletter: "Newsletter",
        community: "Comunidad térã canal",
        brand: "Marca aliada",
      },
      tourism: {
        stay: "Alojamiento",
        agency: "Agencia",
        attraction: "Atractivo",
        food: "Gastronomía",
        practical: "Info práctica",
      },
      commerce: {
        food: "Alimentos",
        retail: "Comercio minorista",
        services: "Servicios",
        crafts: "Artesanías",
        tools: "Herramientas",
        promo: "Promo activa",
      },
      education: {
        course: "Curso",
        program: "Programa",
        scholarship: "Beca",
        exchange: "Intercambio",
        workshop: "Taller",
        certification: "Certificación",
      },
      events: {
        festival: "Festival",
        meetup: "Meetup",
        concert: "Concierto",
        sport: "Deporte",
        community: "Comunitario",
        cultural: "Cultural",
      },
      discovery: {
        person: "Tapicha",
        company: "Empresa",
        job: "Oportunidad laboral",
        project: "Tembiapo",
        talent: "Katupyry",
        network: "Red",
      },
      innovation: {
        startup: "Startup",
        bootcamp: "Bootcamp",
        meetup: "Meetup tech",
        coworking: "Coworking",
        university: "Universidad",
        open_source: "Código abierto",
      },
      solidarity: {
        sponsorship: "Oheka auspiciante",
        raffle: "Rifa informativa",
        foundation: "Fundación aliada",
      },
    },
    joinOrg: {
      wellness: {
        center: "Centro bienestar",
        professional: "Profesional independiente",
        group: "Grupo térã taller",
        studio: "Estudio térã tenda",
      },
      communication: {
        media: "Medio local",
        podcast: "Podcast",
        journalist: "Periodista",
        channel: "Canal térã newsletter",
      },
      tourism: {
        agency: "Agencia turismo",
        attraction: "Atractivo turístico",
        stay: "Alojamiento",
        guide: "Guía térã operador",
      },
      commerce: {
        shop: "Comercio local",
        restaurant: "Restaurante térã café",
        service: "Servicio local",
        market: "Mercado térã feria",
      },
      education: {
        university: "Universidad térã instituto",
        course: "Curso térã taller",
        scholarship: "Beca térã financiamiento",
        institute: "Centro formación",
      },
      events: {
        organizer: "Organizador evento",
        festival: "Festival",
        community: "Encuentro comunitario",
        venue: "Sede térã tenda",
      },
      discovery: {
        professional: "Profesional",
        company: "Empresa",
        opportunity: "Oportunidad",
        talent: "Katupyry regional",
      },
    },
  },
};

function buildLangDict(lang) {
  const dict = {};
  for (const prefix of PREFIXES) {
    const block = buildGuideBlock(lang, prefix);
    for (const suffix of GUIDE_SUFFIXES) {
      dict[`${prefix}.${suffix}`] = block[suffix];
    }
  }
  const shared = SHARED[lang];
  for (const [k, v] of Object.entries(shared.eco)) {
    dict[`eco.catalog.${k}`] = v;
  }
  for (const [prefix, kinds] of Object.entries(shared.kinds)) {
    for (const [k, v] of Object.entries(kinds)) {
      dict[`${prefix}.kind.${k}`] = v;
    }
  }
  for (const [prefix, orgs] of Object.entries(shared.joinOrg)) {
    for (const [k, v] of Object.entries(orgs)) {
      dict[`join.org.${prefix}.${k}`] = v;
    }
  }
  return dict;
}

const VERTICAL_GUIDES = {
  es: buildLangDict("es"),
  pt: buildLangDict("pt"),
  en: buildLangDict("en"),
  gn: buildLangDict("gn"),
};

function serializeDict(dict) {
  return Object.entries(dict)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([k, v]) => `    "${k}": ${JSON.stringify(v)},`)
    .join("\n");
}

const keyCount = Object.keys(VERTICAL_GUIDES.es).length;

const file = `/**
 * Vertical guide translations for Evernear ecosystem pages.
 * Slugs: deporte→sport, salud→health, bienestar→wellness, comunicacion→communication,
 * solidaridad→solidarity, turismo→tourism, comercios→commerce, educacion→education,
 * eventos→events, descubrimiento→discovery, innovacion→innovation.
 */
export const VERTICAL_GUIDE_KEY_COUNT = ${keyCount} as const;

export const VERTICAL_GUIDES: Record<"es" | "pt" | "en" | "gn", Record<string, string>> = {
  es: {
${serializeDict(VERTICAL_GUIDES.es)}
  },
  pt: {
${serializeDict(VERTICAL_GUIDES.pt)}
  },
  en: {
${serializeDict(VERTICAL_GUIDES.en)}
  },
  gn: {
${serializeDict(VERTICAL_GUIDES.gn)}
  },
};
`;

writeFileSync(outPath, file, "utf8");
console.log(`Wrote ${outPath}`);
console.log(`Key count per language: ${keyCount}`);
