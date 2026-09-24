import type { ConnectionStory } from "@/lib/ecosystem/types";

const now = new Date();
const daysAgo = (n: number) => {
  const d = new Date(now);
  d.setDate(d.getDate() - n);
  return d.toISOString();
};

export const CONNECTION_STORIES: ConnectionStory[] = [
  {
    id: "maria-joao-app",
    title: "De un mensaje a una app regional",
    participants: [
      {
        name: "María G.",
        role: "Desarrolladora",
        imageKey: "people.developer",
      },
      {
        name: "João S.",
        role: "Emprendedor",
        imageKey: "people.entrepreneur",
      },
    ],
    connectedWith: ["João S.", "Lab Trifronterizo"],
    achievement:
      "Lanzaron un prototipo que conecta comercios de Puerto Iguazú y Foz en un solo mapa.",
    verticalSlug: "innovacion",
    cityId: "pi",
    publishedAt: daysAgo(12),
    featured: true,
    posterSrc: "/images/people/people-developer.webp",
    mediaAlt: "María y João revisando su proyecto en una mesa de trabajo",
    profileId: "maria-dev",
  },
  {
    id: "ana-lucas-turismo",
    title: "Ruta guiada entre dos ciudades",
    participants: [
      {
        name: "Ana R.",
        role: "Comerciante",
        imageKey: "people.business",
      },
    ],
    connectedWith: ["Lucas M.", "Ente de Turismo (candidato)"],
    achievement:
      "Armaron una ruta de fin de semana que une ferias de Ciudad del Este con talleres en Foz.",
    verticalSlug: "turismo",
    cityId: "cde",
    publishedAt: daysAgo(8),
    posterSrc: "/images/people/people-business.webp",
    mediaAlt: "Ana en su puesto del mercado con mapa de la región",
    profileId: "ana-cde",
  },
  {
    id: "lucas-bootcamp",
    title: "Primer equipo para un proyecto de IA",
    participants: [
      {
        name: "Lucas M.",
        role: "Estudiante",
        imageKey: "people.student",
      },
    ],
    connectedWith: ["María G.", "Bootcamp Regional"],
    achievement:
      "Formó un equipo trinacional y presentó su primer modelo en un demo day local.",
    verticalSlug: "educacion",
    cityId: "foz",
    publishedAt: daysAgo(5),
    posterSrc: "/images/people/people-student.webp",
    mediaAlt: "Lucas presentando su proyecto ante un jurado",
    profileId: "lucas-student",
  },
  {
    id: "creator-podcast",
    title: "Podcast que cruza la frontera",
    participants: [
      {
        name: "Camila V.",
        role: "Creadora de contenido",
        imageKey: "people.creator",
      },
    ],
    connectedWith: ["Radio comunitaria Foz", "Productores de Puerto Iguazú"],
    achievement:
      "Grabaron 6 episodios con voces de los tres países y sumaron 2 mil oyentes mensuales.",
    verticalSlug: "comunicacion",
    cityId: "foz",
    publishedAt: daysAgo(3),
    posterSrc: "/images/people/people-creator.webp",
    mediaAlt: "Camila grabando podcast en estudio colaborativo",
  },
  {
    id: "athlete-solidarity",
    title: "Torneo benéfico trinacional",
    participants: [
      {
        name: "Diego F.",
        role: "Atleta",
        imageKey: "people.athlete",
      },
    ],
    connectedWith: ["Club Victoria", "Fundación regional"],
    achievement:
      "Organizaron un torneo de futsal que juntó 12 equipos y recaudó insumos para una escuela.",
    verticalSlug: "deporte",
    cityId: "pi",
    publishedAt: daysAgo(2),
    posterSrc: "/images/people/people-athlete.webp",
    mediaAlt: "Equipo de futsal celebrando en cancha",
  },
];
