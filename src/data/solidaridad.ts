import type { CityId } from "@/lib/ecosystem/cities";

export type SolidarityKind = "sponsorship" | "raffle" | "foundation";

export type SolidarityCause = {
  id: string;
  slug: string;
  title: string;
  story: string;
  kind: SolidarityKind;
  cityId: CityId;
  organizer: string;
  organizerUrl?: string;
  contactEmail?: string;
  status: string;
  featured?: boolean;
};

export const SOLIDARITY_CAUSES: SolidarityCause[] = [
  {
    id: "basquet-joaquin",
    slug: "basquet-joaquin",
    title: "Joaquín y el básquet en Puerto Iguazú",
    story:
      "Joaquín tiene 14 años, juega básquet en un club local y necesita apoyo para viajes, indumentaria y entrenamientos. Su familia y el club buscan auspiciantes para sostener la temporada.",
    kind: "sponsorship",
    cityId: "pi",
    organizer: "Club Deportivo Iguazú",
    contactEmail: "hello@conexa.org",
    status: "Busca auspiciantes",
    featured: true,
  },
  {
    id: "rifa-fundacion-norte",
    slug: "rifa-fundacion-norte",
    title: "Rifa solidaria — Fundación Norte",
    story:
      "La fundación organiza una rifa para financiar kits escolares en barrios de Foz do Iguaçu. Los números y el sorteo se gestionan directamente con la organización.",
    kind: "raffle",
    cityId: "foz",
    organizer: "Fundación Norte",
    organizerUrl: "https://example.org/rifa-fundacion-norte",
    status: "Rifa activa",
  },
  {
    id: "merendero-cde",
    slug: "merendero-cde",
    title: "Merendero comunitario — Ciudad del Este",
    story:
      "Un grupo de vecinos sostiene un merendero los fines de semana. Buscan visibilidad y contacto con empresas locales que quieran colaborar.",
    kind: "foundation",
    cityId: "cde",
    organizer: "Red Solidaria CDE",
    contactEmail: "hello@conexa.org",
    status: "Fundación aliada",
  },
];
