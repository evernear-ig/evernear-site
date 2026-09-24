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

export const VERTICAL_LISTINGS: Record<VerticalSlug, VerticalListing[]> = {
  deporte: SPORT_LISTINGS.map(mapSportListing),
  salud: HEALTH_LISTINGS,
  bienestar: WELLNESS_LISTINGS,
  comunicacion: COMMUNICATION_LISTINGS,
  solidaridad: SOLIDARITY_LISTINGS,
  turismo: TOURISM_LISTINGS,
  comercios: COMMERCE_LISTINGS,
  educacion: EDUCATION_LISTINGS,
  eventos: EVENTS_LISTINGS,
  descubrimiento: DISCOVERY_LISTINGS,
  innovacion: INNOVATION_LISTINGS,
};
