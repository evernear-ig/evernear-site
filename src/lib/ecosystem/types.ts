import type { CityId } from "./cities";
import type { VerticalSlug } from "./verticals";

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
  startsOn?: string;
  endsOn?: string;
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

export type StoryParticipant = {
  name: string;
  role: string;
  imageKey: string;
};

export type StoryMediaType = "video" | "photo";

export type ConnectionStory = {
  id: string;
  title: string;
  participants: StoryParticipant[];
  connectedWith: string[];
  achievement: string;
  verticalSlug: VerticalSlug;
  cityId: CityId;
  publishedAt: string;
  mediaType: StoryMediaType;
  videoSrc?: string;
  posterSrc: string;
  mediaAlt: string;
  profileId?: string;
};

export type PulsoItem = {
  id: string;
  verticalSlug: VerticalSlug;
  cityId: CityId;
  category: string;
  title: string;
  summary?: string;
  kind: string;
  badge?: string;
  image?: string;
  href?: string;
  addedAt: string;
  readTime?: string;
};

export type PulsoStreamStatus = "live" | "upcoming" | "replay";

export type PulsoRundownSegment = {
  timestamp: string;
  title: string;
  cityId: CityId;
  verticalSlug: VerticalSlug;
  summary?: string;
  itemId?: string;
};

export type PulsoEdition = {
  weekKey: string;
  editionNumber?: number;
  publishDate?: string;
  headline: string;
  lead: string;
  mascotQuote?: string;
  coverItemId?: string;
  streamStatus?: PulsoStreamStatus;
  streamUrl?: string;
  streamDuration?: string;
  streamThumbnail?: string;
  viewersPeak?: number;
  rundown?: PulsoRundownSegment[];
  stats?: {
    totalUpdates?: number;
    citiesCount?: number;
    featuredCount?: number;
  };
};

export type StorySubmission = {
  name: string;
  email: string;
  story: string;
  connectedWith: string;
  achievement: string;
  verticalSlug: string;
  cityId: string;
  mediaType: StoryMediaType;
  mediaName?: string;
  mediaSize?: number;
  submittedAt: string;
};

export type PulsoSubscriber = {
  email: string;
  notifyLive: boolean;
  interests?: string[];
  subscribedAt: string;
};
