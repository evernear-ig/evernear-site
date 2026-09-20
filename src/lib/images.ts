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
  localBase: "",
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
    tourism: {
      u: "photo-1590246185449-e9e2ddd683bb",
      pos: "50% 50%",
      credit: "Christhian Gruhn",
      alt: {
        es: "Cascadas y selva en la Triple Frontera",
        pt: "Cachoeiras e mata na Tríplice Fronteira",
        en: "Waterfalls and rainforest in the Triple Border",
      },
    },
    education: {
      u: "photo-1623652554515-91c833e3080e",
      pos: "50% 45%",
      credit: "FORTYTWO",
      alt: {
        es: "Taller de aprendizaje colaborativo",
        pt: "Workshop de aprendizagem colaborativa",
        en: "Collaborative learning workshop",
      },
    },
    discovery: {
      u: "photo-1522071820081-009f0129c71c",
      pos: "50% 45%",
      credit: "Annie Spratt",
      alt: {
        es: "Personas conectando en la región",
        pt: "Pessoas se conectando na região",
        en: "People connecting across the region",
      },
    },
    events: {
      u: "photo-1649252504348-235b14c9cdb5",
      pos: "50% 45%",
      credit: "Giu Vicente",
      alt: {
        es: "Encuentro comunitario en la región",
        pt: "Encontro comunitário na região",
        en: "Community gathering in the region",
      },
    },
    commerce: {
      u: "photo-1556742049-0cfed4f6a45d",
      pos: "50% 40%",
      credit: "Clay Banks",
      alt: {
        es: "Comercio local en la Triple Frontera",
        pt: "Comércio local na Tríplice Fronteira",
        en: "Local business in the Triple Border",
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

export function imageAlt(spec: ImageSpec, lang: LangCode, fallback: LangCode = "es") {
  return spec.alt[lang] || spec.alt[fallback] || spec.alt.en || "";
}
