import { applyDemoWindow } from "@/lib/ecosystem/vigencia";
import type { SportListing, VerticalListing } from "@/lib/ecosystem/types";
import type { VerticalSlug } from "@/lib/ecosystem/verticals";
import { SPORT_LISTINGS } from "@/data/sport";
import { HEALTH_LISTINGS } from "./health";
import { WELLNESS_LISTINGS } from "./wellness";
import { COMMUNICATION_LISTINGS } from "./communication";
import { TOURISM_LISTINGS } from "./tourism";
import { COMMERCE_LISTINGS } from "./commerce";
import { EDUCATION_LISTINGS } from "./education";
import { EVENTS_LISTINGS } from "./events";
import { DISCOVERY_LISTINGS } from "./discovery";
import { INNOVATION_LISTINGS } from "./innovation";
import { SOLIDARITY_LISTINGS } from "./solidarity";

function mapSportListing(listing: SportListing): VerticalListing {
  return {
    id: listing.id,
    cityId: listing.cityId,
    category: listing.discipline,
    kind: listing.kind,
    title: listing.title,
    subtitle: listing.subtitle,
    description: listing.description,
    imageKey: listing.imageKey,
    meta: listing.meta,
  };
}

function withVigencia(listings: VerticalListing[]): VerticalListing[] {
  return listings.map(applyDemoWindow);
}

export const VERTICAL_LISTINGS: Record<VerticalSlug, VerticalListing[]> = {
  deporte: withVigencia(SPORT_LISTINGS.map(mapSportListing)),
  salud: withVigencia(HEALTH_LISTINGS),
  bienestar: withVigencia(WELLNESS_LISTINGS),
  comunicacion: withVigencia(COMMUNICATION_LISTINGS),
  solidaridad: withVigencia(SOLIDARITY_LISTINGS),
  turismo: withVigencia(TOURISM_LISTINGS),
  comercios: withVigencia(COMMERCE_LISTINGS),
  educacion: withVigencia(EDUCATION_LISTINGS),
  eventos: withVigencia(EVENTS_LISTINGS),
  descubrimiento: withVigencia(DISCOVERY_LISTINGS),
  innovacion: withVigencia(INNOVATION_LISTINGS),
};
