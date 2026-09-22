export type ImageMode = "auto" | "artwork" | "photo";

export type LangCode = "es" | "pt" | "en" | "gn";

export type ImageSpec = {
  u: string;
  pos?: string;
  credit?: string;
  file?: string;
  alt: Partial<Record<LangCode, string>>;
};

type ImageGroup = Record<string, ImageSpec>;

export const IMAGES = {
  mode: "auto" as ImageMode,
  localBase: "/images/ecosystem/",
  widths: [640, 1000, 1600],
  base(u: string, w: number) {
    return /^(https?:|\.|\/)/.test(u)
      ? u
      : `https://images.unsplash.com/${u}?ixlib=rb-4.1.0&fm=jpg&fit=crop&auto=format&q=70&w=${w}`;
  },
  people: {
    student: {
      u: "photo-1758270705317-3ef6142d306f",
      pos: "50% 40%",
      credit: "Vitaly Gariev",
      alt: {
        es: "Grupo de estudiantes trabajando juntos frente a una laptop",
        pt: "Grupo de estudantes trabalhando juntos em um laptop",
        en: "A group of students working together around a laptop",
      },
    },
    developer: {
      u: "photo-1602992708529-c9fdb12905c9",
      pos: "50% 35%",
      credit: "Nubelson Fernandes",
      alt: {
        es: "Desarrollador con auriculares concentrado en su computadora",
        pt: "Desenvolvedor de fones de ouvido concentrado no computador",
        en: "A developer wearing headphones, focused on his computer",
      },
    },
    entrepreneur: {
      u: "photo-1568658176307-bfbd2873abda",
      pos: "50% 40%",
      credit: "DISRUPTIVO",
      alt: {
        es: "Dos personas conversando sobre un proyecto frente a una laptop",
        pt: "Duas pessoas conversando sobre um projeto em frente a um laptop",
        en: "Two people discussing a project over a laptop",
      },
    },
    business: {
      u: "photo-1687293233211-6b0cc3beba70",
      pos: "50% 35%",
      credit: "Omar Lopez",
      alt: {
        es: "Dueña de un negocio detrás del mostrador de su local",
        pt: "Dona de um negócio atrás do balcão da loja",
        en: "A business owner behind the counter of her shop",
      },
    },
    creator: {
      u: "photo-1649252504196-4aca12ecc644",
      pos: "50% 40%",
      credit: "Giu Vicente",
      alt: {
        es: "Mujer escribiendo ideas en papel durante un taller",
        pt: "Mulher escrevendo ideias em papel durante um workshop",
        en: "A woman writing ideas on paper during a workshop",
      },
    },
    athlete: {
      u: "photo-1574629810360-7d2ba7029f8d",
      pos: "50% 40%",
      credit: "Unsplash",
      alt: {
        es: "Deportista en cancha de básquet",
        pt: "Atleta em quadra de basquete",
        en: "Athlete on a basketball court",
      },
    },
    foundation: {
      u: "photo-1593113598332-cd288d649433",
      pos: "50% 40%",
      credit: "Unsplash",
      alt: {
        es: "Voluntarios organizando una actividad comunitaria",
        pt: "Voluntários organizando uma atividade comunitária",
        en: "Volunteers organizing a community activity",
      },
    },
    builder: {
      u: "photo-1522071820081-009f0129c71c",
      pos: "50% 45%",
      credit: "Annie Spratt",
      alt: {
        es: "Equipo colaborando alrededor de una computadora",
        pt: "Equipe colaborando ao redor de um computador",
        en: "A team collaborating around a computer",
      },
    },
  } satisfies ImageGroup,
  cities: {
    all: {
      u: "photo-1736060109179-e41c70ba8a02",
      pos: "50% 55%",
      credit: "Iain",
      alt: {
        es: "Vista aérea de un puente sobre un río",
        pt: "Vista aérea de uma ponte sobre um rio",
        en: "Aerial view of a bridge over a river",
      },
    },
    pi: {
      u: "photo-1590246185449-e9e2ddd683bb",
      pos: "50% 50%",
      credit: "Christhian Gruhn",
      alt: {
        es: "Personas sobre una pasarela junto a cascadas en la selva",
        pt: "Pessoas em uma passarela perto de cachoeiras na mata",
        en: "People on a walkway beside waterfalls in the rainforest",
      },
    },
    foz: {
      u: "photo-1736060109179-e41c70ba8a02",
      pos: "50% 40%",
      credit: "Iain",
      alt: {
        es: "Vista aérea de un puente que cruza un río",
        pt: "Vista aérea de uma ponte cruzando um rio",
        en: "Aerial view of a bridge crossing a river",
      },
    },
    cde: {
      u: "photo-1556742049-0cfed4f6a45d",
      pos: "50% 40%",
      credit: "Clay Banks",
      alt: {
        es: "Intercambio en el mostrador de un comercio",
        pt: "Atendimento no balcão de um comércio",
        en: "An exchange at the counter of a small business",
      },
    },
  } satisfies ImageGroup,
  about: {
    platform: {
      u: "photo-1482951486181-13a752dbbd52",
      file: "about-platform.webp",
      pos: "50% 42%",
      alt: {
        es: "Comunidad reunida al atardecer junto al río en la región",
        pt: "Comunidade reunida ao entardecer à beira do rio na região",
        en: "Community gathered at sunset by the river in the region",
      },
    },
    discovery: {
      u: "photo-1529156069898-49953e39b3ac",
      file: "about-conexa-discovery.webp",
      pos: "50% 45%",
      alt: {
        es: "Persona explorando lugares de la región con el mapa de CONEXA en el teléfono",
        pt: "Pessoa explorando lugares da região com o mapa CONEXA no celular",
        en: "Person exploring regional places with the CONEXA map on their phone",
      },
    },
    vision: {
      u: "photo-1736060109179-e41c70ba8a02",
      file: "about-vision.webp",
      pos: "50% 45%",
      alt: {
        es: "Vista aérea de ríos y puentes en la Triple Frontera",
        pt: "Vista aérea de rios e pontes na Tríplice Fronteira",
        en: "Aerial view of rivers and bridges at the Triple Border",
      },
    },
    mission: {
      u: "photo-1529156069898-49953e39b3ac",
      file: "about-mission.webp",
      pos: "50% 42%",
      alt: {
        es: "Personas conectándose en la región sin intermediarios",
        pt: "Pessoas se conectando na região sem intermediários",
        en: "People connecting in the region without intermediaries",
      },
    },
    goals: {
      u: "photo-1556918936-3e73b945d24f",
      file: "about-goals.webp",
      pos: "50% 50%",
      alt: {
        es: "Camino hacia nuevas regiones y comunidades",
        pt: "Caminho para novas regiões e comunidades",
        en: "Path toward new regions and communities",
      },
    },
  } satisfies ImageGroup,
  info: {
    role: {
      u: "photo-1522071820081-009f0129c71c",
      file: "info-role.webp",
      pos: "50% 45%",
      alt: {
        es: "Persona descubriendo eventos y comercios locales en la región",
        pt: "Pessoa descobrindo eventos e comércios locais na região",
        en: "Person discovering local events and businesses in the region",
      },
    },
    region: {
      u: "photo-1736060109179-e41c70ba8a02",
      file: "info-region.webp",
      pos: "50% 40%",
      alt: {
        es: "Paisaje de la Triple Frontera con río y selva",
        pt: "Paisagem da Tríplice Fronteira com rio e mata",
        en: "Triple Border landscape with river and rainforest",
      },
    },
    how: {
      u: "photo-1529156069898-49953e39b3ac",
      file: "info-how.webp",
      pos: "50% 45%",
      alt: {
        es: "Persona explorando su barrio con el teléfono",
        pt: "Pessoa explorando seu bairro com o celular",
        en: "Person exploring their neighborhood with their phone",
      },
    },
  } satisfies ImageGroup,
  hero: {
    place: {
      u: "photo-1556918936-3e73b945d24f",
      pos: "50% 55%",
      credit: "Derek Oyen",
      alt: {
        es: "Selva y agua en la región del Iguazú",
        pt: "Mata e água na região do Iguaçu",
        en: "Rainforest and water in the Iguazú region",
      },
    },
  } satisfies ImageGroup,
  learn: {
    workshop: {
      u: "photo-1623652554515-91c833e3080e",
      pos: "50% 45%",
      credit: "FORTYTWO",
      alt: {
        es: "Personas trabajando con notas adhesivas en un taller",
        pt: "Pessoas trabalhando com post-its em um workshop",
        en: "People working with sticky notes in a workshop",
      },
    },
  } satisfies ImageGroup,
  build: {
    makers: {
      u: "photo-1629904853716-f0bc54eea481",
      pos: "50% 45%",
      credit: "Compagnons",
      alt: {
        es: "Equipo trabajando frente a varias pantallas",
        pt: "Equipe trabalhando em frente a várias telas",
        en: "A team working in front of several screens",
      },
    },
  } satisfies ImageGroup,
  access: {
    bridge: {
      u: "photo-1482951486181-13a752dbbd52",
      pos: "50% 55%",
      credit: "Henrique Felix",
      alt: {
        es: "Personas cruzando un puente hacia el otro lado",
        pt: "Pessoas atravessando uma ponte para o outro lado",
        en: "People crossing a bridge to the other side",
      },
    },
  } satisfies ImageGroup,
  band: {
    community: {
      u: "photo-1649252504348-235b14c9cdb5",
      pos: "50% 45%",
      credit: "Giu Vicente",
      alt: {
        es: "Grupo de personas trabajando juntas en una mesa",
        pt: "Grupo de pessoas trabalhando juntas em uma mesa",
        en: "A group of people working together at a table",
      },
    },
  } satisfies ImageGroup,
  ecosystem: {
    heroIndex: {
      u: "photo-1736060109179-e41c70ba8a02",
      file: "ecosystem-hero-index.webp",
      pos: "50% 45%",
      alt: {
        es: "Vista aérea de ríos y puentes en la Triple Frontera al atardecer",
        pt: "Vista aérea de rios e pontes na Tríplice Fronteira ao entardecer",
        en: "Aerial view of rivers and bridges in the Triple Border at dusk",
      },
    },
    deporte: {
      u: "photo-1574629810360-7d2ba7029f8d",
      file: "ecosystem-deporte.webp",
      pos: "50% 42%",
      alt: {
        es: "Partido de fútbol juvenil en una cancha comunitaria",
        pt: "Partida de futebol juvenil em um campo comunitário",
        en: "Youth soccer match on a community field",
      },
    },
    salud: {
      u: "photo-1576091160399-112ba8d25d1f",
      file: "ecosystem-salud.webp",
      pos: "50% 40%",
      alt: {
        es: "Atención de salud comunitaria en un consultorio luminoso",
        pt: "Atendimento de saúde comunitária em uma clínica iluminada",
        en: "Community health care in a bright clinic",
      },
    },
    bienestar: {
      u: "photo-1544367567-0f2fcb009e0b",
      file: "ecosystem-bienestar.webp",
      pos: "50% 45%",
      alt: {
        es: "Sesión de bienestar al aire libre entre árboles",
        pt: "Sessão de bem-estar ao ar livre entre árvores",
        en: "Outdoor wellness session among trees",
      },
    },
    comunicacion: {
      u: "photo-1478737270239-2f02e77fc3bd",
      file: "ecosystem-comunicacion.webp",
      pos: "50% 42%",
      alt: {
        es: "Taller de comunicación y medios locales colaborativos",
        pt: "Workshop de comunicação e mídia local colaborativa",
        en: "Collaborative local media and communication workshop",
      },
    },
    solidaridad: {
      u: "photo-1593113598332-cd288d649433",
      file: "ecosystem-solidaridad.webp",
      pos: "50% 40%",
      alt: {
        es: "Voluntarios repartiendo alimentos en un evento solidario",
        pt: "Voluntários distribuindo alimentos em um evento solidário",
        en: "Volunteers distributing food at a solidarity event",
      },
    },
    turismo: {
      u: "photo-1590246185449-e9e2ddd683bb",
      file: "ecosystem-turismo.webp",
      pos: "50% 48%",
      alt: {
        es: "Cascadas y selva en la Triple Frontera",
        pt: "Cachoeiras e mata na Tríplice Fronteira",
        en: "Waterfalls and rainforest in the Triple Border",
      },
    },
    comercios: {
      u: "photo-1556742049-0cfed4f6a45d",
      file: "ecosystem-comercios.webp",
      pos: "50% 42%",
      alt: {
        es: "Mercado callejero con productos locales",
        pt: "Mercado de rua com produtos locais",
        en: "Street market with local products",
      },
    },
    educacion: {
      u: "photo-1623652554515-91c833e3080e",
      file: "ecosystem-educacion.webp",
      pos: "50% 42%",
      alt: {
        es: "Estudiantes aprendiendo en un aula colaborativa",
        pt: "Estudantes aprendendo em uma sala colaborativa",
        en: "Students learning in a collaborative classroom",
      },
    },
    eventos: {
      u: "photo-1649252504348-235b14c9cdb5",
      file: "ecosystem-eventos.webp",
      pos: "50% 45%",
      alt: {
        es: "Festival cultural nocturno en una plaza comunitaria",
        pt: "Festival cultural noturno em uma praça comunitária",
        en: "Night cultural festival in a community square",
      },
    },
    descubrimiento: {
      u: "photo-1522071820081-009f0129c71c",
      file: "ecosystem-descubrimiento.webp",
      pos: "50% 45%",
      alt: {
        es: "Persona explorando un barrio histórico con su teléfono",
        pt: "Pessoa explorando um bairro histórico com o celular",
        en: "Person exploring a historic neighborhood with their phone",
      },
    },
    innovacion: {
      u: "photo-1629904853716-f0bc54eea481",
      file: "ecosystem-innovacion.webp",
      pos: "50% 42%",
      alt: {
        es: "Equipo innovando en un laboratorio tecnológico regional",
        pt: "Equipe inovando em um laboratório tecnológico regional",
        en: "Team innovating in a regional tech lab",
      },
    },
    tourism: {
      u: "photo-1590246185449-e9e2ddd683bb",
      file: "ecosystem-turismo.webp",
      pos: "50% 48%",
      alt: {
        es: "Cascadas y selva en la Triple Frontera",
        pt: "Cachoeiras e mata na Tríplice Fronteira",
        en: "Waterfalls and rainforest in the Triple Border",
      },
    },
    education: {
      u: "photo-1623652554515-91c833e3080e",
      file: "ecosystem-educacion.webp",
      pos: "50% 42%",
      alt: {
        es: "Estudiantes aprendiendo en un aula colaborativa",
        pt: "Estudantes aprendendo em uma sala colaborativa",
        en: "Students learning in a collaborative classroom",
      },
    },
    discovery: {
      u: "photo-1522071820081-009f0129c71c",
      file: "ecosystem-descubrimiento.webp",
      pos: "50% 45%",
      alt: {
        es: "Persona explorando un barrio histórico con su teléfono",
        pt: "Pessoa explorando um bairro histórico com o celular",
        en: "Person exploring a historic neighborhood with their phone",
      },
    },
    events: {
      u: "photo-1649252504348-235b14c9cdb5",
      file: "ecosystem-eventos.webp",
      pos: "50% 45%",
      alt: {
        es: "Festival cultural nocturno en una plaza comunitaria",
        pt: "Festival cultural noturno em uma praça comunitária",
        en: "Night cultural festival in a community square",
      },
    },
    commerce: {
      u: "photo-1556742049-0cfed4f6a45d",
      file: "ecosystem-comercios.webp",
      pos: "50% 42%",
      alt: {
        es: "Mercado callejero con productos locales",
        pt: "Mercado de rua com produtos locais",
        en: "Street market with local products",
      },
    },
  } satisfies ImageGroup,
};

export function getImageSpec(key: string): ImageSpec | undefined {
  const [group, item] = key.split(".");
  const bucket = IMAGES[group as keyof typeof IMAGES];
  if (!bucket || typeof bucket !== "object") return undefined;
  return (bucket as ImageGroup)[item];
}

export function resolveImageSrc(key: string, width = 640): string | undefined {
  const spec = getImageSpec(key);
  if (!spec) return undefined;
  if (spec.file && IMAGES.localBase) {
    return `${IMAGES.localBase}${spec.file}`;
  }
  return IMAGES.base(spec.u, width);
}

export function imageAlt(spec: ImageSpec, lang: LangCode, fallback: LangCode = "es") {
  return spec.alt[lang] || spec.alt[fallback] || spec.alt.en || "";
}
