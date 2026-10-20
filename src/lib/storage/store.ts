import type {
  EventItem,
  PulsoItem,
  PulsoSubscriber,
  StorySubmission,
} from "@/lib/ecosystem/types";
import { SEED_EVENTS } from "@/data/events";

type PanfletoSubscriber = { email: string; subscribedAt: string };
type PanfletoEntry = {
  businessName: string;
  promo: string;
  subscribedAt: string;
};
type QrScan = { token: string; count: number; lastScan: string };

const LEGACY_QR_TOKENS: Record<string, string> = {
  "evt-trinexus-001": "evt-evernear-001",
};

export function normalizeQrToken(token: string) {
  return LEGACY_QR_TOKENS[token] ?? token;
}

const events: EventItem[] = [...SEED_EVENTS];
const panfletoSubscribers: PanfletoSubscriber[] = [];
const panfletoEntries: PanfletoEntry[] = [];
const qrScans: Map<string, QrScan> = new Map();
const storySubmissions: StorySubmission[] = [];
const pulsoSubscribers: PulsoSubscriber[] = [];
const pulsoItems: PulsoItem[] = [];

export function getEvents() {
  return [...events];
}

export function getEventBySlug(slug: string) {
  return events.find((e) => e.slug === slug);
}

export function addEvent(event: EventItem) {
  events.push(event);
  return event;
}

export function subscribePanfleto(email: string) {
  if (panfletoSubscribers.some((s) => s.email === email)) return false;
  panfletoSubscribers.push({ email, subscribedAt: new Date().toISOString() });
  return true;
}

export function addPanfletoEntry(businessName: string, promo: string) {
  panfletoEntries.push({
    businessName,
    promo,
    subscribedAt: new Date().toISOString(),
  });
  return true;
}

export function getPanfletoSubscribers() {
  return [...panfletoSubscribers];
}

export function getPanfletoEntries() {
  return [...panfletoEntries];
}

export function recordQrScan(token: string) {
  token = normalizeQrToken(token);
  const existing = qrScans.get(token);
  const now = new Date().toISOString();
  if (existing) {
    existing.count += 1;
    existing.lastScan = now;
  } else {
    qrScans.set(token, { token, count: 1, lastScan: now });
  }
  return qrScans.get(token)!;
}

export function getQrScanCount(token: string) {
  return qrScans.get(normalizeQrToken(token))?.count ?? 0;
}

export function submitStory(data: Omit<StorySubmission, "submittedAt">) {
  storySubmissions.push({ ...data, submittedAt: new Date().toISOString() });
  return true;
}

export function getStorySubmissions() {
  return [...storySubmissions];
}

export function subscribePulso(email: string, notifyLive = false, interests?: string[]) {
  const existing = pulsoSubscribers.find((s) => s.email === email);
  if (existing) {
    if (notifyLive) existing.notifyLive = true;
    if (interests && interests.length > 0) existing.interests = interests;
    return false;
  }
  pulsoSubscribers.push({
    email,
    notifyLive,
    interests,
    subscribedAt: new Date().toISOString(),
  });
  return true;
}

export function getPulsoSubscribers() {
  return [...pulsoSubscribers];
}

export function addPulsoItem(item: PulsoItem) {
  pulsoItems.push(item);
  return item;
}

export function getPulsoItemsFromStore() {
  return [...pulsoItems];
}
