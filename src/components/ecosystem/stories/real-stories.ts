export type StoryAccent = "cyan" | "magenta";
export type StoryKind = "video" | "photo";

export type RealStory = {
  id: string;
  name: string;
  summary: string;
  categoryKey: string;
  kind: StoryKind;
  accent: StoryAccent;
  imageSrc: string;
  imageAlt: string;
};

export const REAL_STORIES: RealStory[] = [
  {
    id: "maria-g",
    name: "Maria G.",
    summary: "Conectamos por Descubrimiento y armamos un mapa de comercios binacional.",
    categoryKey: "nav.innovation",
    kind: "video",
    accent: "cyan",
    imageSrc: "/images/people/people-developer.webp",
    imageAlt: "María en un espacio de trabajo, contando su historia de innovación",
  },
  {
    id: "ana-r",
    name: "Ana R.",
    summary: "Unimos ferias de Ciudad del Este con talleres en Foz gracias a Eventos.",
    categoryKey: "nav.tourism",
    kind: "video",
    accent: "cyan",
    imageSrc: "/images/people/people-business.webp",
    imageAlt: "Ana en un puesto comercial, contando su historia de turismo",
  },
  {
    id: "lucas-m",
    name: "Lucas M.",
    summary: "Encontré equipo en Educación y presentamos nuestro primer modelo.",
    categoryKey: "nav.education",
    kind: "video",
    accent: "cyan",
    imageSrc: "/images/people/people-student.webp",
    imageAlt: "Lucas estudiando, contando su historia de educación",
  },
  {
    id: "camila-v",
    name: "Camila V.",
    summary: "Grabamos voces de tres países después de conectar en Comunicación.",
    categoryKey: "nav.communication",
    kind: "video",
    accent: "magenta",
    imageSrc: "/images/people/people-creator.webp",
    imageAlt: "Camila grabando, contando su historia de comunicación",
  },
  {
    id: "diego-f",
    name: "Diego F.",
    summary: "Organizamos un torneo que unió clubes y una causa social de la región.",
    categoryKey: "nav.sport",
    kind: "photo",
    accent: "magenta",
    imageSrc: "/images/people/people-athlete.webp",
    imageAlt: "Diego en actividad deportiva, compartiendo la foto del torneo",
  },
];
