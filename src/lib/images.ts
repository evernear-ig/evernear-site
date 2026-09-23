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
      file: "/images/people/people-student.webp",
      pos: "48% 42%",
      credit: "CONEXA",
      alt: {
        es: "Estudiantes colaborando en un aula con laptops y pizarra",
        pt: "Estudantes colaborando em uma sala com laptops e quadro",
        en: "Students collaborating in a classroom with laptops and a whiteboard",
      },
    },
    developer: {
      u: "photo-1602992708529-c9fdb12905c9",
      file: "/images/people/people-developer.webp",
      pos: "52% 40%",
      credit: "CONEXA",
      alt: {
        es: "Equipo de innovación trabajando con impresora 3D y laptops",
        pt: "Equipe de inovação trabalhando com impressora 3D e laptops",
        en: "Innovation team working with a 3D printer and laptops",
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
      file: "/images/people/people-business.webp",
      pos: "42% 45%",
      credit: "CONEXA",
      alt: {
        es: "Comerciante local organizando frutas en un mercado callejero",
        pt: "Comerciante local organizando frutas em um mercado de rua",
        en: "Local vendor arranging fruit at a street market",
      },
    },
    creator: {
      u: "photo-1649252504196-4aca12ecc644",
      file: "/images/people/people-creator.webp",
      pos: "50% 42%",
      credit: "CONEXA",
      alt: {
        es: "Creadores grabando un podcast en un estudio colaborativo",
        pt: "Criadores gravando um podcast em um estúdio colaborativo",
        en: "Creators recording a podcast in a collaborative studio",
      },
    },
    athlete: {
      u: "photo-1574629810360-7d2ba7029f8d",
      file: "/images/people/people-athlete.webp",
      pos: "50% 45%",
      credit: "CONEXA",
      alt: {
        es: "Jóvenes jugando fútbol en una cancha comunitaria al atardecer",
        pt: "Jovens jogando futebol em um campo comunitário ao entardecer",
        en: "Youth playing soccer on a community field at sunset",
      },
    },
    foundation: {
      u: "photo-1593113598332-cd288d649433",
      file: "/images/people/people-foundation.webp",
      pos: "50% 40%",
      credit: "CONEXA",
      alt: {
        es: "Voluntarios repartiendo alimentos frescos en un evento solidario",
        pt: "Voluntários distribuindo alimentos frescos em um evento solidário",
        en: "Volunteers distributing fresh food at a solidarity event",
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
      file: "/images/border/border-region.png",
      pos: "50% 45%",
      alt: {
        es: "Vista aérea de la Triple Frontera y el Puente de la Amistad sobre el río Paraná",
        pt: "Vista aérea da Tríplice Fronteira e da Ponte da Amizade sobre o rio Paraná",
        en: "Aerial view of the Triple Border and Friendship Bridge over the Paraná River",
        gn: "Jehecha yvate gotyo Triple Frontera ha Puente de la Amistad Paraná yguasúpe",
      },
    },
    pi: {
      u: "photo-1590246185449-e9e2ddd683bb",
      file: "/images/border/border-pi.png",
      pos: "50% 42%",
      alt: {
        es: "Cataratas del Iguazú desde el lado argentino, selva misionera",
        pt: "Cataratas do Iguaçu pelo lado argentino, mata atlântica",
        en: "Iguazú Falls from the Argentine side, Atlantic rainforest",
        gn: "Yguasu kuarahy resẽ guive Argentina gotyo",
      },
    },
    foz: {
      u: "photo-1736060109179-e41c70ba8a02",
      file: "/images/border/border-foz.png",
      pos: "50% 40%",
      alt: {
        es: "Foz do Iguaçu al atardecer, Brasil junto a la Triple Frontera",
        pt: "Foz do Iguaçu ao entardecer, Brasil na Tríplice Fronteira",
        en: "Foz do Iguaçu at dusk, Brazil at the Triple Border",
        gn: "Foz do Iguaçu ko'ẽme, Brasil Triple Frontera-pe",
      },
    },
    cde: {
      u: "photo-1556742049-0cfed4f6a45d",
      file: "/images/border/border-cde.png",
      pos: "50% 42%",
      alt: {
        es: "Puente de la Amistad y centro comercial de Ciudad del Este sobre el río Paraná",
        pt: "Ponte da Amizade e centro comercial de Ciudad del Este sobre o rio Paraná",
        en: "Friendship Bridge and Ciudad del Este commercial skyline on the Paraná River",
        gn: "Puente de la Amistad ha Ciudad del Este rembiapópe Paraná yguasúpe",
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
  sport: {
    footballVictoria: {
      u: "/images/sport/sport-football-victoria.png",
      file: "/images/sport/sport-football-victoria.png",
      pos: "50% 40%",
      credit: "CONEXA",
      alt: {
        es: "Equipo juvenil de fútbol entrenando en cancha comunitaria de Puerto Iguazú",
        pt: "Equipe juvenil de futebol treinando em campo comunitário de Puerto Iguazú",
        en: "Youth football team training on a community pitch in Puerto Iguazú",
      },
    },
    footballLigaBarrial: {
      u: "/images/sport/sport-football-liga-barrial.png",
      file: "/images/sport/sport-football-liga-barrial.png",
      pos: "50% 45%",
      credit: "CONEXA",
      alt: {
        es: "Partido de fútbol amateur en torneo barrial al atardecer",
        pt: "Partida de futebol amador em torneio de bairro ao entardecer",
        en: "Amateur football match at a neighborhood tournament at dusk",
      },
    },
    futsalFoz: {
      u: "/images/sport/sport-futsal-foz.png",
      file: "/images/sport/sport-futsal-foz.png",
      pos: "50% 42%",
      credit: "CONEXA",
      alt: {
        es: "Partido de futsal en ginásio cubierto de Foz do Iguaçu",
        pt: "Partida de futsal em ginásio coberto de Foz do Iguaçu",
        en: "Futsal match in an indoor court in Foz do Iguaçu",
      },
    },
    futsalCopa: {
      u: "/images/sport/sport-futsal-copa.png",
      file: "/images/sport/sport-futsal-copa.png",
      pos: "50% 40%",
      credit: "CONEXA",
      alt: {
        es: "Selección escolar de futsal en cancha antes de copa fronteriza",
        pt: "Seleção escolar de futsal em quadra antes de copa fronteiriça",
        en: "School futsal team on court before a cross-border cup",
      },
    },
    basketIguazu: {
      u: "/images/sport/sport-basket-iguazu.png",
      file: "/images/sport/sport-basket-iguazu.png",
      pos: "50% 38%",
      credit: "CONEXA",
      alt: {
        es: "Jugadores de básquet en cancha cubierta comunitaria",
        pt: "Jogadores de basquete em quadra coberta comunitária",
        en: "Basketball players on a community indoor court",
      },
    },
    basketFozEscuela: {
      u: "/images/sport/sport-basket-foz-escuela.png",
      file: "/images/sport/sport-basket-foz-escuela.png",
      pos: "50% 42%",
      credit: "CONEXA",
      alt: {
        es: "Niños en clase de básquet en escuela pública de Foz",
        pt: "Crianças em aula de basquete em escola pública de Foz",
        en: "Children in a basketball class at a public school in Foz",
      },
    },
    volleyIguazu: {
      u: "/images/sport/sport-volley-iguazu.png",
      file: "/images/sport/sport-volley-iguazu.png",
      pos: "50% 40%",
      credit: "CONEXA",
      alt: {
        es: "Equipo femenino de vóley en partido local",
        pt: "Equipe feminina de vôlei em partida local",
        en: "Women's volleyball team in a local match",
      },
    },
    volleyCde: {
      u: "/images/sport/sport-volley-cde.png",
      file: "/images/sport/sport-volley-cde.png",
      pos: "50% 42%",
      credit: "CONEXA",
      alt: {
        es: "Partido de vóley en cancha de Ciudad del Este",
        pt: "Partida de vôlei em quadra de Ciudad del Este",
        en: "Volleyball match on a court in Ciudad del Este",
      },
    },
    handballPi: {
      u: "/images/sport/sport-handball-pi.png",
      file: "/images/sport/sport-handball-pi.png",
      pos: "50% 40%",
      credit: "CONEXA",
      alt: {
        es: "Equipo escolar de handball en polideportivo de Puerto Iguazú",
        pt: "Equipe escolar de handebol em poliesportivo de Puerto Iguazú",
        en: "School handball team at a sports hall in Puerto Iguazú",
      },
    },
    handballFoz: {
      u: "/images/sport/sport-handball-foz.png",
      file: "/images/sport/sport-handball-foz.png",
      pos: "50% 42%",
      credit: "CONEXA",
      alt: {
        es: "Partido universitario de handball en campus de Foz",
        pt: "Partida universitária de handebol no campus de Foz",
        en: "University handball match on a Foz campus court",
      },
    },
    martialFoz: {
      u: "/images/sport/sport-martial-foz.png",
      file: "/images/sport/sport-martial-foz.png",
      pos: "50% 38%",
      credit: "CONEXA",
      alt: {
        es: "Clase de artes marciales en dojo de Foz do Iguaçu",
        pt: "Aula de artes marciais em dojo de Foz do Iguaçu",
        en: "Martial arts class in a dojo in Foz do Iguaçu",
      },
    },
    martialCde: {
      u: "/images/sport/sport-martial-cde.png",
      file: "/images/sport/sport-martial-cde.png",
      pos: "50% 40%",
      credit: "CONEXA",
      alt: {
        es: "Judoka entrenando en tatami de Ciudad del Este",
        pt: "Judoca treinando em tatame de Ciudad del Este",
        en: "Judo athlete training on a mat in Ciudad del Este",
      },
    },
    athleticsMaraton: {
      u: "/images/sport/sport-athletics-maraton.png",
      file: "/images/sport/sport-athletics-maraton.png",
      pos: "50% 45%",
      credit: "CONEXA",
      alt: {
        es: "Corredores en carrera de ruta fronteriza al amanecer",
        pt: "Corredores em prova de rua fronteiriça ao amanhecer",
        en: "Runners in a cross-border road race at dawn",
      },
    },
    athleticsPi: {
      u: "/images/sport/sport-athletics-pi.png",
      file: "/images/sport/sport-athletics-pi.png",
      pos: "50% 42%",
      credit: "CONEXA",
      alt: {
        es: "Atletas entrenando en pista municipal de Puerto Iguazú",
        pt: "Atletas treinando em pista municipal de Puerto Iguazú",
        en: "Athletes training on a municipal track in Puerto Iguazú",
      },
    },
    swimFoz: {
      u: "/images/sport/sport-swim-foz.png",
      file: "/images/sport/sport-swim-foz.png",
      pos: "50% 40%",
      credit: "CONEXA",
      alt: {
        es: "Natación en pileta olímpica municipal de Foz",
        pt: "Natação em piscina olímpica municipal de Foz",
        en: "Swimming in a municipal Olympic pool in Foz",
      },
    },
    swimPi: {
      u: "/images/sport/sport-swim-pi.png",
      file: "/images/sport/sport-swim-pi.png",
      pos: "50% 42%",
      credit: "CONEXA",
      alt: {
        es: "Clase de natación infantil en pileta climatizada",
        pt: "Aula de natação infantil em piscina aquecida",
        en: "Children's swimming lesson in a heated pool",
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
  if (spec.file) {
    if (spec.file.startsWith("/")) return spec.file;
    if (IMAGES.localBase) return `${IMAGES.localBase}${spec.file}`;
  }
  return IMAGES.base(spec.u, width);
}

export function imageAlt(spec: ImageSpec, lang: LangCode, fallback: LangCode = "es") {
  return spec.alt[lang] || spec.alt[fallback] || spec.alt.en || "";
}
