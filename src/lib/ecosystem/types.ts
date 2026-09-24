import type { CityId } from "./cities";

export type TourismSourceStatus = "candidate" | "confirmed" | "unavailable";

export type TourismCategory =
  | "stay"
  | "agency"
  | "attraction"
  | "food"
  | "practical";

export type TourismSource = {
  cityId: CityId;
  officialUrl?: string;
  officialName?: string;
  status: TourismSourceStatus;
  links: { labelKey: string; href: string; category: TourismCategory }[];
};

export type RegionalRoute = {
  id: string;
  titleKey: string;
  descKey: string;
  cities: CityId[];
};

export type Course = {
  slug: string;
  title: string;
  institution: string;
  country: "ar" | "br" | "py";
  cityId: CityId;
  modality: "presencial" | "online" | "hibrido";
  type: "curso" | "programa" | "beca";
  description: string;
};

export type Profile = {
  id: string;
  name: string;
  role: string;
  cityId: CityId;
  country: "ar" | "br" | "py";
  skills: string[];
  quote: string;
  imageKey: string;
};

export type Opportunity = {
  id: string;
  title: string;
  company: string;
  cityId: CityId;
  type: "empleo" | "colaboracion" | "pasantia";
  modality: "presencial" | "remoto" | "hibrido";
  description: string;
};

export type EventItem = {
  slug: string;
  title: string;
  date: string;
  cityId: CityId;
  organizer: string;
  tags: string[];
  description: string;
  qrToken: string;
};

export type Business = {
  slug: string;
  name: string;
  category: string;
  cityId: CityId;
  promo?: string;
  promoUntil?: string;
  hours?: string;
  description: string;
  qrId: string;
  panfletoSubscribed: boolean;
};

export type VerticalListing = {
  id: string;
  cityId: CityId;
  category: string;
  kind: string;
  title: string;
  subtitle: string;
  description: string;
  imageKey: string;
  meta?: string;
};

export type SportListingKind = "club" | "athlete" | "call" | "team";

export type SportListing = {
  id: string;
  discipline: string;
  cityId: CityId;
  kind: SportListingKind;
  title: string;
  subtitle: string;
  description: string;
  imageKey: string;
  meta?: string;
};
