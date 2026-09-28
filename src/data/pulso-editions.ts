import type { PulsoEdition } from "@/lib/ecosystem/types";

export const PULSO_EDITIONS: Record<string, PulsoEdition> = {
  "2026-W40": {
    weekKey: "2026-W40",
    editionNumber: 40,
    publishDate: "2026-10-02T18:00:00-03:00",
    headline: "Pulso Live #40: Especial innovación transfronteriza, ferias gastronómicas y nuevas becas de IA",
    lead: "La transmisión semanal en directo donde repasamos todo lo que está pasando en Puerto Iguazú (AR), Foz do Iguaçu (BR) y Ciudad del Este (PY). Tres ciudades, una sola comunidad.",
    mascotQuote: "¡Bienvenidos al streaming de la frontera! Conectate y explorá cada novedad con nosotros.",
    coverItemId: "pulso-1",
    streamStatus: "live",
    streamDuration: "36:45",
    streamThumbnail: "/images/ecosystem/ecosystem-hero-index.webp",
    viewersPeak: 312,
    rundown: [
      {
        timestamp: "00:00",
        title: "Apertura & Estado de los Puentes de la Triple Frontera",
        cityId: "pi",
        verticalSlug: "innovacion",
        summary: "Clima, cruces fronterizos y mapa de conexiones activas de la semana.",
      },
      {
        timestamp: "03:45",
        title: "Puerto Iguazú: Meetup Builders & Nuevo Circuito de Selva Nocturna",
        cityId: "pi",
        verticalSlug: "eventos",
        itemId: "pulso-1",
        summary: "Reunión de creadores tech en Iguazú y lanzamiento de expediciones lunares.",
      },
      {
        timestamp: "12:10",
        title: "Ciudad del Este: Feria Tradicional & Hackathon de Micro-remesas",
        cityId: "cde",
        verticalSlug: "comercios",
        itemId: "pulso-2",
        summary: "Comercio de cercanía y soluciones blockchain para pagos rápidos entre comercios.",
      },
      {
        timestamp: "20:30",
        title: "Foz do Iguaçu: Becas completas en IA y fixtures de la Copa Futsal",
        cityId: "foz",
        verticalSlug: "educacion",
        itemId: "pulso-3",
        summary: "Oportunidades de formación binacional y el torneo barrial más esperado.",
      },
      {
        timestamp: "28:50",
        title: "Radar Rápido: Podcast de frontera, yoga al amanecer y útiles escolares",
        cityId: "cde",
        verticalSlug: "solidaridad",
        itemId: "pulso-10",
        summary: "Flash de convocatorias comunitarias y actividades de bienestar.",
      },
      {
        timestamp: "34:00",
        title: "Cierre, agenda del fin de semana y sorteo de accesos",
        cityId: "pi",
        verticalSlug: "innovacion",
        summary: "Próximas convocatorias y recordatorio para el viernes siguiente.",
      },
    ],
    stats: {
      totalUpdates: 12,
      citiesCount: 3,
      featuredCount: 4,
    },
  },
  "2026-W39": {
    weekKey: "2026-W39",
    editionNumber: 39,
    publishDate: "2026-09-25T18:00:00-03:00",
    headline: "Pulso Live #39: Startups del Parque Itaipú y Maratón de las Tres Ciudades",
    lead: "Reviví el programa de la semana pasada con la cobertura del Demo Day de startups y la ruta de artesanos originarios.",
    mascotQuote: "Si te perdiste el vivo, acá tenés la grabación completa capítulo por capítulo.",
    coverItemId: "pulso-w39-1",
    streamStatus: "replay",
    streamDuration: "31:20",
    streamThumbnail: "/images/ecosystem/ecosystem-innovacion.webp",
    viewersPeak: 245,
    rundown: [
      {
        timestamp: "00:00",
        title: "Apertura del programa #39",
        cityId: "foz",
        verticalSlug: "innovacion",
      },
      {
        timestamp: "04:15",
        title: "Graduación de startups energéticas en Foz",
        cityId: "foz",
        verticalSlug: "innovacion",
        itemId: "pulso-w39-1",
      },
      {
        timestamp: "14:30",
        title: "Ruta de artesanos Mbya Guaraní en Puerto Iguazú",
        cityId: "pi",
        verticalSlug: "comercios",
        itemId: "pulso-w39-2",
      },
      {
        timestamp: "22:00",
        title: "Apertura de inscripciones: Maratón 21K",
        cityId: "pi",
        verticalSlug: "deporte",
        itemId: "pulso-w39-3",
      },
    ],
    stats: {
      totalUpdates: 10,
      citiesCount: 3,
      featuredCount: 3,
    },
  },
  "2026-W38": {
    weekKey: "2026-W38",
    editionNumber: 38,
    publishDate: "2026-09-18T18:00:00-03:00",
    headline: "Pulso Live #38: Robótica para jóvenes y solidaridad en las aulas",
    lead: "Grabación del streaming con foco en ciencia, tecnología escolar y voluntariado transfronterizo.",
    mascotQuote: "Cada transmisión queda guardada para que la comunidad pueda consultarla cuando quiera.",
    coverItemId: "pulso-w38-1",
    streamStatus: "replay",
    streamDuration: "28:50",
    streamThumbnail: "/images/ecosystem/ecosystem-educacion.webp",
    viewersPeak: 198,
    rundown: [
      {
        timestamp: "00:00",
        title: "Inicio y bienvenida",
        cityId: "cde",
        verticalSlug: "educacion",
      },
      {
        timestamp: "05:00",
        title: "Laboratorio de Robótica en CDE",
        cityId: "cde",
        verticalSlug: "educacion",
        itemId: "pulso-w38-1",
      },
    ],
    stats: {
      totalUpdates: 8,
      citiesCount: 3,
      featuredCount: 2,
    },
  },
};

export function getPulsoEdition(weekKey?: string): PulsoEdition {
  if (weekKey && PULSO_EDITIONS[weekKey]) {
    return PULSO_EDITIONS[weekKey];
  }

  // Fallback a la más reciente o una genérica
  const keys = Object.keys(PULSO_EDITIONS);
  if (keys.length > 0 && PULSO_EDITIONS[keys[0]]) {
    return PULSO_EDITIONS[keys[0]];
  }

  return {
    weekKey: weekKey ?? "2026-W40",
    editionNumber: 40,
    headline: "Pulso Live: El Noticiero y Streaming Semanal de la Frontera",
    lead: "Una vez por semana transmitimos en directo todas las novedades de la región.",
    mascotQuote: "Explorá el pulso en vivo de las tres ciudades.",
    streamStatus: "live",
    streamDuration: "35:00",
    viewersPeak: 250,
    stats: {
      totalUpdates: 12,
      citiesCount: 3,
      featuredCount: 3,
    },
  };
}
