import type { PulsoItem } from "@/lib/ecosystem/types";

const now = new Date();
const daysAgo = (n: number) => {
  const d = new Date(now);
  d.setDate(d.getDate() - n);
  return d.toISOString();
};

export const PULSO_SEED_ITEMS: PulsoItem[] = [
  {
    id: "pulso-1",
    verticalSlug: "eventos",
    cityId: "pi",
    category: "meetup",
    title: "Meetup builders Triple Frontera",
    kind: "evento",
    addedAt: daysAgo(1),
  },
  {
    id: "pulso-2",
    verticalSlug: "comercios",
    cityId: "cde",
    category: "alimentos",
    title: "Feria de productores locales",
    kind: "comercio",
    addedAt: daysAgo(1),
  },
  {
    id: "pulso-3",
    verticalSlug: "educacion",
    cityId: "foz",
    category: "beca",
    title: "Beca para bootcamp de datos",
    kind: "beca",
    addedAt: daysAgo(2),
  },
  {
    id: "pulso-4",
    verticalSlug: "descubrimiento",
    cityId: "pi",
    category: "colaboracion",
    title: "Busco co-fundador para app de turismo",
    kind: "perfil",
    addedAt: daysAgo(2),
  },
  {
    id: "pulso-5",
    verticalSlug: "deporte",
    cityId: "foz",
    category: "futsal",
    title: "Copa barrial Foz 2026",
    kind: "torneo",
    addedAt: daysAgo(3),
  },
  {
    id: "pulso-6",
    verticalSlug: "turismo",
    cityId: "pi",
    category: "attraction",
    title: "Circuito Cataratas + gastronomía",
    kind: "ruta",
    addedAt: daysAgo(3),
  },
  {
    id: "pulso-7",
    verticalSlug: "innovacion",
    cityId: "cde",
    category: "blockchain",
    title: "Hackathon pagos transfronterizos",
    kind: "convocatoria",
    addedAt: daysAgo(4),
  },
  {
    id: "pulso-8",
    verticalSlug: "salud",
    cityId: "foz",
    category: "clinica",
    title: "Jornada de salud preventiva",
    kind: "actividad",
    addedAt: daysAgo(4),
  },
  {
    id: "pulso-9",
    verticalSlug: "comunicacion",
    cityId: "pi",
    category: "podcast",
    title: "Episodio 7: voces de la frontera",
    kind: "audio",
    addedAt: daysAgo(5),
  },
  {
    id: "pulso-10",
    verticalSlug: "solidaridad",
    cityId: "cde",
    category: "voluntariado",
    title: "Campaña de útiles escolares",
    kind: "causa",
    addedAt: daysAgo(5),
  },
  {
    id: "pulso-11",
    verticalSlug: "bienestar",
    cityId: "foz",
    category: "yoga",
    title: "Clase abierta al amanecer",
    kind: "taller",
    addedAt: daysAgo(6),
  },
  {
    id: "pulso-12",
    verticalSlug: "comercios",
    cityId: "pi",
    category: "gastronomia",
    title: "Menú fronterizo de temporada",
    kind: "promo",
    addedAt: daysAgo(6),
  },
];
