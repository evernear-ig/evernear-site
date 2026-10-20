import type { EventItem } from "@/lib/ecosystem/types";

export const SEED_EVENTS: EventItem[] = [
  {
    slug: "evernear-001",
    title: "Evernear 001 — Primer Encuentro",
    date: "2026-06-15",
    cityId: "pi",
    organizer: "Evernear",
    tags: ["innovación", "comunidad", "networking"],
    description:
      "El primer encuentro de personas interesadas en tecnología, innovación y el futuro de la Triple Frontera.",
    qrToken: "evt-evernear-001",
  },
  {
    slug: "meetup-blockchain-foz",
    title: "Meetup Blockchain Foz",
    date: "2026-04-20",
    cityId: "foz",
    organizer: "Comunidad Dev Foz",
    tags: ["blockchain", "dev", "meetup"],
    description:
      "Encuentro mensual de desarrolladores y entusiastas de blockchain en Foz do Iguaçu.",
    qrToken: "evt-blockchain-foz",
  },
  {
    slug: "semana-estudiantil-cde",
    title: "Semana Estudiantil CDE",
    date: "2026-05-10",
    cityId: "cde",
    organizer: "Centro Estudiantil CDE",
    tags: ["estudiantes", "educación"],
    description:
      "Semana de actividades para estudiantes de Ciudad del Este con talleres y charlas.",
    qrToken: "evt-semana-cde",
  },
  {
    slug: "activacion-turistica-cataratas",
    title: "Activación Turística — Más allá de las Cataratas",
    date: "2026-07-01",
    cityId: "pi",
    organizer: "Evernear + Aliados",
    tags: ["turismo", "región"],
    description:
      "Recorrido guiado mostrando que hay más región para explorar más allá de las Cataratas.",
    qrToken: "evt-turismo-cat",
  },
];
