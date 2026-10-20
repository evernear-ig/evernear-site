import { LISTING_IMAGES } from "@/lib/images/listing-images";

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
      credit: "Evernear",
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
      credit: "Evernear",
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
      credit: "Evernear",
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
      credit: "Evernear",
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
      credit: "Evernear",
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
      credit: "Evernear",
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
      file: "about-evernear-discovery.webp",
      pos: "50% 45%",
      alt: {
        es: "Persona explorando lugares de la región con el mapa de Evernear en el teléfono",
        pt: "Pessoa explorando lugares da região com o mapa Evernear no celular",
        en: "Person exploring regional places with the Evernear map on their phone",
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
      credit: "Evernear",
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
      credit: "Evernear",
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
      credit: "Evernear",
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
      credit: "Evernear",
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
      credit: "Evernear",
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
      credit: "Evernear",
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
      credit: "Evernear",
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
      credit: "Evernear",
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
      credit: "Evernear",
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
      credit: "Evernear",
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
      credit: "Evernear",
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
      credit: "Evernear",
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
      credit: "Evernear",
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
      credit: "Evernear",
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
      credit: "Evernear",
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
      credit: "Evernear",
      alt: {
        es: "Clase de natación infantil en pileta climatizada",
        pt: "Aula de natação infantil em piscina aquecida",
        en: "Children's swimming lesson in a heated pool",
      },
    },
  } satisfies ImageGroup,
  health: {
    capsPi: {
      u: "photo-1576091160399-112ba8d25d1f",
      pos: "50% 40%",
      alt: {
        es: "Consultorio de atención primaria comunitaria en Puerto Iguazú",
        pt: "Consultório de atenção primária comunitária em Puerto Iguazú",
        en: "Community primary care clinic in Puerto Iguazú",
      },
    },
    pediatricFoz: {
      u: "photo-1584515935687-5d4bcc1577d4",
      pos: "50% 42%",
      alt: {
        es: "Consultorio pediátrico con juguetes y ambiente acogedor",
        pt: "Consultório pediátrico com brinquedos e ambiente acolhedor",
        en: "Pediatric clinic with toys and a welcoming atmosphere",
      },
    },
    mentalCde: {
      u: "photo-1559757143-29579d20b2cd",
      pos: "50% 45%",
      alt: {
        es: "Espacio de salud mental con ambiente tranquilo y luminoso",
        pt: "Espaço de saúde mental com ambiente tranquilo e iluminado",
        en: "Mental health space with a calm, bright atmosphere",
      },
    },
    dentalPi: {
      u: "photo-1606811971610-448588d57af0",
      pos: "50% 40%",
      alt: {
        es: "Consultorio odontológico con equipamiento moderno",
        pt: "Consultório odontológico com equipamento moderno",
        en: "Dental office with modern equipment",
      },
    },
    nursingFoz: {
      u: "photo-1579684385127-1ef15d508118",
      pos: "50% 42%",
      alt: {
        es: "Enfermera brindando cuidados domiciliarios a un paciente",
        pt: "Enfermeira prestando cuidados domiciliares a um paciente",
        en: "Nurse providing home care to a patient",
      },
    },
    rehabPi: {
      u: "photo-1571019614242-c5c5dee9f50b",
      pos: "50% 45%",
      alt: {
        es: "Sesión de rehabilitación física en centro kinesiológico",
        pt: "Sessão de reabilitação física em centro de fisioterapia",
        en: "Physical rehabilitation session at a therapy center",
      },
    },
    preventionCde: {
      u: "photo-1576091160550-2173dba999ef",
      pos: "50% 40%",
      alt: {
        es: "Feria de salud preventiva en plaza comunitaria",
        pt: "Feira de saúde preventiva em praça comunitária",
        en: "Preventive health fair in a community square",
      },
    },
    maternalFoz: {
      u: "photo-1555252333-9f8e92e65df9",
      pos: "50% 42%",
      alt: {
        es: "Sala de maternidad con ambiente cálido y acogedor",
        pt: "Sala de maternidade com ambiente acolhedor",
        en: "Maternity ward with a warm, welcoming atmosphere",
      },
    },
    elderlyPi: {
      u: "photo-1519494026892-80bbd4d6df07",
      pos: "50% 45%",
      alt: {
        es: "Adultos mayores participando en actividades comunitarias",
        pt: "Idosos participando de atividades comunitárias",
        en: "Elderly people participating in community activities",
      },
    },
    telehealthRegion: {
      u: "photo-1576091160879-890e68117963",
      pos: "50% 40%",
      alt: {
        es: "Teleconsulta médica desde una computadora en la región",
        pt: "Teleconsulta médica a partir de um computador na região",
        en: "Medical teleconsultation from a computer in the region",
      },
    },
  } satisfies ImageGroup,
  wellness: {
    yogaPi: {
      u: "photo-1544367567-0f2fcb009e0b",
      pos: "50% 45%",
      alt: {
        es: "Clase de yoga al aire libre entre árboles en Misiones",
        pt: "Aula de yoga ao ar livre entre árvores em Misiones",
        en: "Outdoor yoga class among trees in Misiones",
      },
    },
    meditationFoz: {
      u: "photo-1506126613408-eca07ce68773",
      pos: "50% 42%",
      alt: {
        es: "Grupo meditando en un espacio tranquilo de Foz",
        pt: "Grupo meditando em um espaço tranquilo de Foz",
        en: "Group meditating in a calm space in Foz",
      },
    },
    psychologyCde: {
      u: "photo-1573497019940-1c28c88b4f3e",
      pos: "50% 40%",
      alt: {
        es: "Consultorio psicológico con ambiente profesional y cálido",
        pt: "Consultório psicológico com ambiente profissional e acolhedor",
        en: "Psychology office with a professional, warm atmosphere",
      },
    },
    fitnessFoz: {
      u: "photo-1534438327276-14e5300c3a48",
      pos: "50% 45%",
      alt: {
        es: "Entrenamiento funcional en gimnasio comunitario de Foz",
        pt: "Treino funcional em academia comunitária de Foz",
        en: "Functional training at a community gym in Foz",
      },
    },
    nutritionPi: {
      u: "photo-1490645935967-10de6ba17061",
      pos: "50% 42%",
      alt: {
        es: "Consulta de nutrición con alimentos frescos regionales",
        pt: "Consulta de nutrição com alimentos frescos regionais",
        en: "Nutrition consultation with fresh regional foods",
      },
    },
    mindfulnessCde: {
      u: "photo-1545389336-cf090694435e",
      pos: "50% 40%",
      alt: {
        es: "Taller de mindfulness para equipos de trabajo",
        pt: "Workshop de mindfulness para equipes de trabalho",
        en: "Mindfulness workshop for work teams",
      },
    },
    yogaFoz: {
      u: "photo-1599901860904-17e06ed708a2",
      pos: "50% 45%",
      alt: {
        es: "Estudio de yoga con vista al parque en Foz",
        pt: "Estúdio de yoga com vista para o parque em Foz",
        en: "Yoga studio with a park view in Foz",
      },
    },
    fitnessPi: {
      u: "photo-1517836357463-d25dfeac3438",
      pos: "50% 42%",
      alt: {
        es: "Entrenamiento grupal de CrossFit en Puerto Iguazú",
        pt: "Treino em grupo de CrossFit em Puerto Iguazú",
        en: "Group CrossFit training in Puerto Iguazú",
      },
    },
  } satisfies ImageGroup,
  communication: {
    radioFoz: {
      u: "photo-1478737270239-2f02e77fc3bd",
      pos: "50% 42%",
      alt: {
        es: "Estudio de radio comunitaria en Foz do Iguaçu",
        pt: "Estúdio de rádio comunitária em Foz do Iguaçu",
        en: "Community radio studio in Foz do Iguaçu",
      },
    },
    podcastPi: {
      u: "photo-1649252504196-4aca12ecc644",
      pos: "50% 42%",
      alt: {
        es: "Grabación de podcast sobre historias de la Triple Frontera",
        pt: "Gravação de podcast sobre histórias da Tríplice Fronteira",
        en: "Podcast recording about Triple Border stories",
      },
    },
    pressCde: {
      u: "photo-1504711434969-e33886168f5c",
      pos: "50% 40%",
      alt: {
        es: "Redacción de medio digital local en Ciudad del Este",
        pt: "Redação de mídia digital local em Ciudad del Este",
        en: "Local digital media newsroom in Ciudad del Este",
      },
    },
    communityPi: {
      u: "photo-1529156069898-49953e39b3ac",
      pos: "50% 45%",
      alt: {
        es: "Red de comunicadores vecinales reunidos en Puerto Iguazú",
        pt: "Rede de comunicadores comunitários reunidos em Puerto Iguazú",
        en: "Neighborhood communicators network gathered in Puerto Iguazú",
      },
    },
    digitalFoz: {
      u: "photo-1460925895917-afdab827c52f",
      pos: "50% 42%",
      alt: {
        es: "Agencia de comunicación digital trabajando en Foz",
        pt: "Agência de comunicação digital trabalhando em Foz",
        en: "Digital communication agency working in Foz",
      },
    },
    radioPi: {
      u: "photo-1598488035139-bdbb2231ccc4",
      pos: "50% 40%",
      alt: {
        es: "Cabina de radio local con equipo de transmisión",
        pt: "Cabine de rádio local com equipamento de transmissão",
        en: "Local radio booth with broadcasting equipment",
      },
    },
    podcastFoz: {
      u: "photo-1590602847861-f357a8772d96",
      pos: "50% 42%",
      alt: {
        es: "Podcast tech con micrófonos en estudio de Foz",
        pt: "Podcast tech com microfones em estúdio de Foz",
        en: "Tech podcast with microphones in a Foz studio",
      },
    },
    pressPi: {
      u: "photo-1505685296765-3a2730d38989",
      pos: "50% 45%",
      alt: {
        es: "Revista impresa sobre ecoturismo y cultura misionera",
        pt: "Revista impressa sobre ecoturismo e cultura misioneira",
        en: "Printed magazine about ecotourism and Misiones culture",
      },
    },
  } satisfies ImageGroup,
  tourism: {
    stayPi: {
      u: "photo-1566073771259-6a8506099945",
      pos: "50% 42%",
      alt: {
        es: "Hostel acogedor cerca de las Cataratas en Puerto Iguazú",
        pt: "Hostel acolhedor perto das Cataratas em Puerto Iguazú",
        en: "Cozy hostel near the Falls in Puerto Iguazú",
      },
    },
    agencyFoz: {
      u: "photo-1488646953014-85cb44e25828",
      pos: "50% 40%",
      alt: {
        es: "Agencia de turismo organizando paquetes binacionales",
        pt: "Agência de turismo organizando pacotes binacionais",
        en: "Tour agency organizing cross-border packages",
      },
    },
    attractionPi: {
      u: "photo-1590246185449-e9e2ddd683bb",
      pos: "50% 48%",
      alt: {
        es: "Visita a comunidad guaraní en la selva misionera",
        pt: "Visita a comunidade guarani na mata misioneira",
        en: "Visit to a Guaraní community in the Misiones rainforest",
      },
    },
    foodCde: {
      u: "photo-1414235077428-338989a2e8c0",
      pos: "50% 45%",
      alt: {
        es: "Tour gastronómico con platos trifronterizos",
        pt: "Tour gastronômico com pratos trifronteiriços",
        en: "Food tour with tri-border regional dishes",
      },
    },
    practicalFoz: {
      u: "photo-1488646953014-85cb44e25828",
      pos: "50% 42%",
      alt: {
        es: "Centro de información turística con mapas y guías",
        pt: "Centro de informação turística com mapas e guias",
        en: "Tourist information center with maps and guides",
      },
    },
    stayFoz: {
      u: "photo-1564501049412-61c2a3083791",
      pos: "50% 40%",
      alt: {
        es: "Posada con vista al río Paraná en Foz do Iguaçu",
        pt: "Pousada com vista para o rio Paraná em Foz do Iguaçu",
        en: "Inn with a Paraná River view in Foz do Iguaçu",
      },
    },
    attractionFoz: {
      u: "photo-1736060109179-e41c70ba8a02",
      pos: "50% 45%",
      alt: {
        es: "Marco das Três Fronteiras con vista a tres países",
        pt: "Marco das Três Fronteiras com vista para três países",
        en: "Three Borders Landmark with views of three countries",
      },
    },
    agencyPi: {
      u: "photo-1469854523086-cc02fe5d8800",
      pos: "50% 42%",
      alt: {
        es: "Excursión regional más allá de las Cataratas",
        pt: "Excursão regional além das Cataratas",
        en: "Regional excursion beyond the Falls",
      },
    },
    foodPi: {
      u: "photo-1556910103-1c02745aae4d",
      pos: "50% 45%",
      alt: {
        es: "Experiencia de cultura yerba mate en Misiones",
        pt: "Experiência da cultura da erva-mate em Misiones",
        en: "Yerba mate culture experience in Misiones",
      },
    },
    practicalCde: {
      u: "photo-1488646953014-85cb44e25828",
      pos: "50% 40%",
      alt: {
        es: "Orientación para cruce fronterizo desde Ciudad del Este",
        pt: "Orientação para travessia fronteiriça a partir de Ciudad del Este",
        en: "Border crossing guidance from Ciudad del Este",
      },
    },
  } satisfies ImageGroup,
  commerce: {
    alimentosPi: {
      u: "photo-1687293233211-6b0cc3beba70",
      pos: "50% 45%",
      alt: {
        es: "Verdulería con frutas frescas de estación en Puerto Iguazú",
        pt: "Hortifruti com frutas frescas da estação em Puerto Iguazú",
        en: "Produce shop with seasonal fresh fruit in Puerto Iguazú",
      },
    },
    gastronomiaFoz: {
      u: "photo-1554118811-1e0d58224f24",
      pos: "50% 42%",
      alt: {
        es: "Café con vista al río en Foz do Iguaçu",
        pt: "Café com vista para o rio em Foz do Iguaçu",
        en: "Café with a river view in Foz do Iguaçu",
      },
    },
    electronicaCde: {
      u: "photo-1556742049-0cfed4f6a45d",
      pos: "50% 42%",
      alt: {
        es: "Tienda de electrónica en Ciudad del Este",
        pt: "Loja de eletrônicos em Ciudad del Este",
        en: "Electronics store in Ciudad del Este",
      },
    },
    artesaniasPi: {
      u: "photo-1452860606245-08befc0ff4a9",
      pos: "50% 40%",
      alt: {
        es: "Artesanías misioneras hechas a mano por productores locales",
        pt: "Artesanato misioneiro feito à mão por produtores locais",
        en: "Handmade Misiones crafts by local producers",
      },
    },
    herramientasFoz: {
      u: "photo-1581578731548-c64695cc6952",
      pos: "50% 45%",
      alt: {
        es: "Ferretería familiar atendiendo la región trifronteriza",
        pt: "Ferragem familiar atendendo a região trifronteiriça",
        en: "Family hardware store serving the tri-border region",
      },
    },
    textilCde: {
      u: "photo-1441986300917-64674bd600d8",
      pos: "50% 42%",
      alt: {
        es: "Tienda de ropa y accesorios en Ciudad del Este",
        pt: "Loja de roupas e acessórios em Ciudad del Este",
        en: "Clothing and accessories store in Ciudad del Este",
      },
    },
    farmaciaPi: {
      u: "photo-1576602976047-17479705aab",
      pos: "50% 40%",
      alt: {
        es: "Farmacia de turno con estanterías de medicamentos",
        pt: "Farmácia de plantão com prateleiras de medicamentos",
        en: "On-duty pharmacy with medicine shelves",
      },
    },
    mueblesFoz: {
      u: "photo-1555041469-a586c61ea9bc",
      pos: "50% 45%",
      alt: {
        es: "Mueblería con sala de exhibición en Foz do Iguaçu",
        pt: "Móveis com sala de exposição em Foz do Iguaçu",
        en: "Furniture showroom in Foz do Iguaçu",
      },
    },
    souvenirsPi: {
      u: "photo-1606761568499-6d2451b23be8",
      pos: "50% 42%",
      alt: {
        es: "Tienda de souvenirs con productos regionales del Iguazú",
        pt: "Loja de souvenirs com produtos regionais do Iguaçu",
        en: "Souvenir shop with regional Iguazú products",
      },
    },
    supermercadoCde: {
      u: "photo-1604719312566-8912b086b4a7",
      pos: "50% 40%",
      alt: {
        es: "Supermercado de barrio con productos de tres países",
        pt: "Supermercado de bairro com produtos de três países",
        en: "Neighborhood supermarket with products from three countries",
      },
    },
  } satisfies ImageGroup,
  education: {
    bootcampPi: {
      u: "photo-1623652554515-91c833e3080e",
      pos: "50% 42%",
      alt: {
        es: "Bootcamp de desarrollo web con estudiantes en Puerto Iguazú",
        pt: "Bootcamp de desenvolvimento web com estudantes em Puerto Iguazú",
        en: "Web development bootcamp with students in Puerto Iguazú",
      },
    },
    unilaFoz: {
      u: "photo-1523050854058-8df90110c9f1",
      pos: "50% 45%",
      alt: {
        es: "Campus universitario UNILA en Foz do Iguaçu",
        pt: "Campus universitário UNILA em Foz do Iguaçu",
        en: "UNILA university campus in Foz do Iguaçu",
      },
    },
    becasPi: {
      u: "photo-1758270705317-3ef6142d306f",
      pos: "50% 42%",
      alt: {
        es: "Estudiantes beneficiarios de becas en la región",
        pt: "Estudantes beneficiários de bolsas na região",
        en: "Scholarship recipients studying in the region",
      },
    },
    inglesCde: {
      u: "photo-1546410531-03aa5fa4b0f0",
      pos: "50% 40%",
      alt: {
        es: "Clase de inglés para comercio fronterizo en Ciudad del Este",
        pt: "Aula de inglês para comércio fronteiriço em Ciudad del Este",
        en: "English class for border trade in Ciudad del Este",
      },
    },
    emprendimientoPi: {
      u: "photo-1568658176307-bfbd2873abda",
      pos: "50% 42%",
      alt: {
        es: "Curso de emprendimiento digital para fundadores regionales",
        pt: "Curso de empreendedorismo digital para fundadores regionais",
        en: "Digital entrepreneurship course for regional founders",
      },
    },
    roboticaFoz: {
      u: "photo-1602992708529-c9fdb12905c9",
      pos: "50% 45%",
      alt: {
        es: "Taller de robótica con estudiantes en SENAI Foz",
        pt: "Oficina de robótica com estudantes no SENAI Foz",
        en: "Robotics workshop with students at SENAI Foz",
      },
    },
    turismoPi: {
      u: "photo-1469854523086-cc02fe5d8800",
      pos: "50% 42%",
      alt: {
        es: "Formación de guías turísticos en la región del Iguazú",
        pt: "Formação de guias turísticos na região do Iguaçu",
        en: "Tour guide training in the Iguazú region",
      },
    },
    becaBlockchainFoz: {
      u: "photo-1639762681485-074b7f938860",
      pos: "50% 40%",
      alt: {
        es: "Beca de desarrollo blockchain para estudiantes regionales",
        pt: "Bolsa de desenvolvimento blockchain para estudantes regionais",
        en: "Blockchain development scholarship for regional students",
      },
    },
  } satisfies ImageGroup,
  events: {
    evernear001: {
      u: "photo-1649252504348-235b14c9cdb5",
      pos: "50% 45%",
      alt: {
        es: "Primer encuentro Evernear de innovación en Puerto Iguazú",
        pt: "Primeiro encontro Evernear de inovação em Puerto Iguazú",
        en: "First Evernear innovation gathering in Puerto Iguazú",
      },
    },
    blockchainFoz: {
      u: "photo-1639762681485-074b7f938860",
      pos: "50% 42%",
      alt: {
        es: "Meetup de blockchain con desarrolladores en Foz",
        pt: "Meetup de blockchain com desenvolvedores em Foz",
        en: "Blockchain meetup with developers in Foz",
      },
    },
    semanaCde: {
      u: "photo-1523050854058-8df90110c9f1",
      pos: "50% 45%",
      alt: {
        es: "Semana estudiantil con actividades en Ciudad del Este",
        pt: "Semana estudantil com atividades em Ciudad del Este",
        en: "Student week with activities in Ciudad del Este",
      },
    },
    turismoCataratas: {
      u: "photo-1590246185449-e9e2ddd683bb",
      pos: "50% 48%",
      alt: {
        es: "Activación turística más allá de las Cataratas",
        pt: "Ativação turística além das Cataratas",
        en: "Tourism activation beyond the Falls",
      },
    },
    networkingPi: {
      u: "photo-1568658176307-bfbd2873abda",
      pos: "50% 42%",
      alt: {
        es: "Networking de emprendedores fronterizos en Puerto Iguazú",
        pt: "Networking de empreendedores fronteiriços em Puerto Iguazú",
        en: "Border entrepreneurs networking in Puerto Iguazú",
      },
    },
    devFoz: {
      u: "photo-1629904853716-f0bc54eea481",
      pos: "50% 45%",
      alt: {
        es: "Dev meetup con desarrolladores en Foz do Iguaçu",
        pt: "Dev meetup com desenvolvedores em Foz do Iguaçu",
        en: "Dev meetup with developers in Foz do Iguaçu",
      },
    },
    comunidadCde: {
      u: "photo-1593113598332-cd288d649433",
      pos: "50% 40%",
      alt: {
        es: "Feria comunitaria con emprendedores en Ciudad del Este",
        pt: "Feira comunitária com empreendedores em Ciudad del Este",
        en: "Community fair with entrepreneurs in Ciudad del Este",
      },
    },
    educacionPi: {
      u: "photo-1524178232363-1fb2b075b655",
      pos: "50% 42%",
      alt: {
        es: "Conferencia sobre educación fronteriza trinacional",
        pt: "Conferência sobre educação fronteiriça trinacional",
        en: "Tri-national border education conference",
      },
    },
  } satisfies ImageGroup,
  discovery: {
    profileMaria: {
      u: "photo-1602992708529-c9fdb12905c9",
      pos: "50% 40%",
      alt: {
        es: "Desarrolladora full stack de Puerto Iguazú",
        pt: "Desenvolvedora full stack de Puerto Iguazú",
        en: "Full stack developer from Puerto Iguazú",
      },
    },
    profileJoao: {
      u: "photo-1568658176307-bfbd2873abda",
      pos: "50% 42%",
      alt: {
        es: "Emprendedor de Foz do Iguaçu en reunión de proyecto",
        pt: "Empreendedor de Foz do Iguaçu em reunião de projeto",
        en: "Entrepreneur from Foz do Iguaçu in a project meeting",
      },
    },
    profileAna: {
      u: "photo-1687293233211-6b0cc3beba70",
      pos: "50% 45%",
      alt: {
        es: "Comerciante de Ciudad del Este en su local",
        pt: "Comerciante de Ciudad del Este em sua loja",
        en: "Merchant from Ciudad del Este at her store",
      },
    },
    profileLucas: {
      u: "photo-1758270705317-3ef6142d306f",
      pos: "50% 42%",
      alt: {
        es: "Estudiante de ingeniería buscando equipo de proyecto",
        pt: "Estudante de engenharia buscando equipe de projeto",
        en: "Engineering student looking for a project team",
      },
    },
    empleoDev: {
      u: "photo-1522071820081-009f0129c71c",
      pos: "50% 45%",
      alt: {
        es: "Oportunidad de empleo remoto para desarrollador React",
        pt: "Oportunidade de emprego remoto para desenvolvedor React",
        en: "Remote job opportunity for a React developer",
      },
    },
    pasantiaTurismo: {
      u: "photo-1469854523086-cc02fe5d8800",
      pos: "50% 42%",
      alt: {
        es: "Pasantía en turismo digital en Puerto Iguazú",
        pt: "Estágio em turismo digital em Puerto Iguazú",
        en: "Digital tourism internship in Puerto Iguazú",
      },
    },
    colaboracionBlockchain: {
      u: "photo-1639762681485-074b7f938860",
      pos: "50% 40%",
      alt: {
        es: "Colaboración en meetup blockchain de la región",
        pt: "Colaboração no meetup blockchain da região",
        en: "Collaboration at the regional blockchain meetup",
      },
    },
    empleoDiseno: {
      u: "photo-1561070791-2526d30994b5",
      pos: "50% 45%",
      alt: {
        es: "Empleo de diseñador UX en agencia de Ciudad del Este",
        pt: "Vaga de designer UX em agência de Ciudad del Este",
        en: "UX designer job at an agency in Ciudad del Este",
      },
    },
  } satisfies ImageGroup,
  innovation: {
    softwarePi: {
      u: "photo-1629904853716-f0bc54eea481",
      pos: "50% 42%",
      alt: {
        es: "Equipo de desarrollo de software en Puerto Iguazú",
        pt: "Equipe de desenvolvimento de software em Puerto Iguazú",
        en: "Software development team in Puerto Iguazú",
      },
    },
    aiFoz: {
      u: "photo-1677442136019-21780ecad995",
      pos: "50% 45%",
      alt: {
        es: "Laboratorio de inteligencia artificial en UNILA Foz",
        pt: "Laboratório de inteligência artificial na UNILA Foz",
        en: "Artificial intelligence lab at UNILA Foz",
      },
    },
    blockchainCde: {
      u: "photo-1639762681485-074b7f938860",
      pos: "50% 40%",
      alt: {
        es: "Comunidad blockchain en Ciudad del Este",
        pt: "Comunidade blockchain em Ciudad del Este",
        en: "Blockchain community in Ciudad del Este",
      },
    },
    startupsPi: {
      u: "photo-1559136555-9303baea8ebd",
      pos: "50% 42%",
      alt: {
        es: "Incubadora de startups en Puerto Iguazú",
        pt: "Incubadora de startups em Puerto Iguazú",
        en: "Startup incubator in Puerto Iguazú",
      },
    },
    hardwareFoz: {
      u: "photo-1602992708529-c9fdb12905c9",
      pos: "50% 45%",
      alt: {
        es: "MakerSpace con impresora 3D en Foz do Iguaçu",
        pt: "MakerSpace com impressora 3D em Foz do Iguaçu",
        en: "MakerSpace with a 3D printer in Foz do Iguaçu",
      },
    },
    designCde: {
      u: "photo-1561070791-2526d30994b5",
      pos: "50% 42%",
      alt: {
        es: "Estudio de diseño UX/UI en Ciudad del Este",
        pt: "Estúdio de design UX/UI em Ciudad del Este",
        en: "UX/UI design studio in Ciudad del Este",
      },
    },
    dataPi: {
      u: "photo-1551288049-bebda4e38f71",
      pos: "50% 40%",
      alt: {
        es: "Dashboard de datos abiertos sobre la región trifronteriza",
        pt: "Dashboard de dados abertos sobre a região trifronteiriça",
        en: "Open data dashboard about the tri-border region",
      },
    },
    educationFoz: {
      u: "photo-1623652554515-91c833e3080e",
      pos: "50% 45%",
      alt: {
        es: "Bootcamp tech con estudiantes en Foz do Iguaçu",
        pt: "Bootcamp tech com estudantes em Foz do Iguaçu",
        en: "Tech bootcamp with students in Foz do Iguaçu",
      },
    },
    researchPi: {
      u: "photo-1524178232363-1fb2b075b655",
      pos: "50% 42%",
      alt: {
        es: "Centro de investigación sobre economía fronteriza",
        pt: "Centro de pesquisa sobre economia fronteiriça",
        en: "Research center on border economy",
      },
    },
    openSourceFoz: {
      u: "photo-1522071820081-009f0129c71c",
      pos: "50% 45%",
      alt: {
        es: "Comunidad open source colaborando en Foz do Iguaçu",
        pt: "Comunidade open source colaborando em Foz do Iguaçu",
        en: "Open source community collaborating in Foz do Iguaçu",
      },
    },
  } satisfies ImageGroup,
  solidarity: {
    basquetJoaquin: {
      u: "photo-1546519638-68b109498ffc",
      pos: "50% 40%",
      alt: {
        es: "Joven jugador de básquet buscando apoyo para su temporada",
        pt: "Jovem jogador de basquete buscando apoio para sua temporada",
        en: "Young basketball player seeking support for his season",
      },
    },
    rifaFundacionNorte: {
      u: "photo-1503676260728-1c00da094a0b",
      pos: "50% 42%",
      alt: {
        es: "Rifa solidaria para kits escolares en Foz do Iguaçu",
        pt: "Rifa solidária para kits escolares em Foz do Iguaçu",
        en: "Solidarity raffle for school kits in Foz do Iguaçu",
      },
    },
    merenderoCde: {
      u: "photo-1593113598332-cd288d649433",
      pos: "50% 40%",
      alt: {
        es: "Merendero comunitario los fines de semana en Ciudad del Este",
        pt: "Merenda comunitária nos fins de semana em Ciudad del Este",
        en: "Community meal service on weekends in Ciudad del Este",
      },
    },
    refugioAnimalesPi: {
      u: "photo-1450778868870-14a5deda6b1a",
      pos: "50% 45%",
      alt: {
        es: "Refugio de animales abandonados en Puerto Iguazú",
        pt: "Abrigo de animais abandonados em Puerto Iguazú",
        en: "Abandoned animal shelter in Puerto Iguazú",
      },
    },
    viviendaFoz: {
      u: "photo-1486406146926-c627a92ad1ab",
      pos: "50% 42%",
      alt: {
        es: "Proyecto de vivienda digna para familias en Foz",
        pt: "Projeto de moradia digna para famílias em Foz",
        en: "Dignified housing project for families in Foz",
      },
    },
    migrantesCde: {
      u: "photo-1529156069898-49953e39b3ac",
      pos: "50% 40%",
      alt: {
        es: "Red de apoyo para migrantes en Ciudad del Este",
        pt: "Rede de apoio para migrantes em Ciudad del Este",
        en: "Support network for migrants in Ciudad del Este",
      },
    },
    generoPi: {
      u: "photo-1573497019940-1c28c88b4f3e",
      pos: "50% 45%",
      alt: {
        es: "Casa refugio para mujeres en Puerto Iguazú",
        pt: "Casa abrigo para mulheres em Puerto Iguazú",
        en: "Women's shelter in Puerto Iguazú",
      },
    },
    ambienteFoz: {
      u: "photo-1532996122724-e3c354a0a782",
      pos: "50% 42%",
      alt: {
        es: "Voluntarios limpiando la ribera del Paraná en Foz",
        pt: "Voluntários limpando a margem do Paraná em Foz",
        en: "Volunteers cleaning the Paraná riverbank in Foz",
      },
    },
  } satisfies ImageGroup,
};

export function getImageSpec(key: string): ImageSpec | undefined {
  const [group, item] = key.split(".");
  const listingGroup = (LISTING_IMAGES as Record<string, ImageGroup>)[group];
  if (listingGroup?.[item]) return listingGroup[item];
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
