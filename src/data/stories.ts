import type { ConnectionStory } from "@/lib/ecosystem/types";

const now = new Date();
const daysAgo = (n: number) => {
  const d = new Date(now);
  d.setDate(d.getDate() - n);
  return d.toISOString();
};

/** Portrait clips for reel previews (Pexels, muted loops). */
const REEL_VIDEOS = {
  collab: "https://videos.pexels.com/video-files/4065633/4065633-sd_540_960_30fps.mp4",
  market: "https://videos.pexels.com/video-files/3195394/3195394-sd_540_960_25fps.mp4",
  student: "https://videos.pexels.com/video-files/4936283/4936283-sd_360_640_24fps.mp4",
  podcast: "https://videos.pexels.com/video-files/5473806/5473806-sd_360_640_30fps.mp4",
  sport: "https://videos.pexels.com/video-files/6279861/6279861-sd_360_640_25fps.mp4",
} as const;

export const CONNECTION_STORIES: ConnectionStory[] = [
  {
    id: "maria-joao-app",
    title: "De un mensaje a una app regional",
    participants: [
      { name: "María G.", role: "Desarrolladora", imageKey: "people.developer" },
      { name: "João S.", role: "Emprendedor", imageKey: "people.entrepreneur" },
    ],
    connectedWith: ["João S.", "Lab Trifronterizo"],
    achievement: "Conectamos por Descubrimiento y armamos un mapa de comercios binacional.",
    verticalSlug: "innovacion",
    cityId: "pi",
    publishedAt: daysAgo(12),
    mediaType: "video",
    videoSrc: REEL_VIDEOS.collab,
    posterSrc: "/images/people/people-developer.webp",
    mediaAlt: "María cuenta cómo conectó con João en CONEXA",
    profileId: "maria-dev",
  },
  {
    id: "ana-lucas-turismo",
    title: "Ruta guiada entre dos ciudades",
    participants: [{ name: "Ana R.", role: "Comerciante", imageKey: "people.business" }],
    connectedWith: ["Lucas M.", "Turismo regional"],
    achievement: "Unimos ferias de Ciudad del Este con talleres en Foz gracias a Eventos.",
    verticalSlug: "turismo",
    cityId: "cde",
    publishedAt: daysAgo(8),
    mediaType: "video",
    videoSrc: REEL_VIDEOS.market,
    posterSrc: "/images/people/people-business.webp",
    mediaAlt: "Ana explica su conexión con el ecosistema de turismo",
    profileId: "ana-cde",
  },
  {
    id: "lucas-bootcamp",
    title: "Primer equipo para un proyecto de IA",
    participants: [{ name: "Lucas M.", role: "Estudiante", imageKey: "people.student" }],
    connectedWith: ["María G.", "Educación"],
    achievement: "Encontré equipo en Educación y presentamos nuestro primer modelo.",
    verticalSlug: "educacion",
    cityId: "foz",
    publishedAt: daysAgo(5),
    mediaType: "video",
    videoSrc: REEL_VIDEOS.student,
    posterSrc: "/images/people/people-student.webp",
    mediaAlt: "Lucas cuenta su experiencia en el bootcamp regional",
    profileId: "lucas-student",
  },
  {
    id: "creator-podcast",
    title: "Podcast que cruza la frontera",
    participants: [{ name: "Camila V.", role: "Creadora", imageKey: "people.creator" }],
    connectedWith: ["Comunicación Foz", "Productores de Puerto Iguazú"],
    achievement: "Grabamos voces de tres países después de conectar en Comunicación.",
    verticalSlug: "comunicacion",
    cityId: "foz",
    publishedAt: daysAgo(3),
    mediaType: "video",
    videoSrc: REEL_VIDEOS.podcast,
    posterSrc: "/images/people/people-creator.webp",
    mediaAlt: "Camila habla de su podcast trifronterizo",
  },
  {
    id: "athlete-solidarity",
    title: "Torneo benéfico trinacional",
    participants: [{ name: "Diego F.", role: "Atleta", imageKey: "people.athlete" }],
    connectedWith: ["Deporte", "Solidaridad"],
    achievement: "Organizamos un torneo que unió clubes y una causa social de la región.",
    verticalSlug: "deporte",
    cityId: "pi",
    publishedAt: daysAgo(2),
    mediaType: "photo",
    posterSrc: "/images/people/people-athlete.webp",
    mediaAlt: "Diego comparte fotos del torneo benéfico",
  },
];
