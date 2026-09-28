import type { VerticalListing } from "./types";

export type Vigencia = "permanente" | "ahora" | "proximo" | "pasado";

const WINDOW_KINDS = new Set([
  "encuentro",
  "meetup",
  "festival",
  "activación",
  "feria",
  "conferencia",
  "call",
  "scholarship",
  "workshop",
  "job",
  "internship",
  "volunteer",
  "sponsorship",
  "raffle",
]);

export function todayIso(date = new Date()): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

function shiftIso(iso: string, days: number): string {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(y, m - 1, d);
  date.setDate(date.getDate() + days);
  return todayIso(date);
}

function hashId(id: string): number {
  let hash = 0;
  for (let i = 0; i < id.length; i += 1) {
    hash = (hash * 31 + id.charCodeAt(i)) >>> 0;
  }
  return hash;
}

export function isWindowKind(kind: string): boolean {
  return WINDOW_KINDS.has(kind);
}

export function resolveVigencia(
  listing: Pick<VerticalListing, "startsOn" | "endsOn">,
  today = todayIso(),
): Vigencia {
  const { startsOn, endsOn } = listing;
  if (!startsOn && !endsOn) return "permanente";
  if (startsOn && startsOn > today) return "proximo";
  if (endsOn && endsOn < today) return "pasado";
  return "ahora";
}

export function applyDemoWindow(listing: VerticalListing): VerticalListing {
  if (!isWindowKind(listing.kind) || listing.startsOn || listing.endsOn) {
    return listing;
  }

  const today = todayIso();
  const bucket = hashId(listing.id) % 3;
  if (bucket === 0) {
    return {
      ...listing,
      startsOn: shiftIso(today, -40),
      endsOn: shiftIso(today, -5),
    };
  }
  if (bucket === 1) {
    return {
      ...listing,
      startsOn: shiftIso(today, -7),
      endsOn: shiftIso(today, 21),
    };
  }
  return {
    ...listing,
    startsOn: shiftIso(today, 14),
    endsOn: shiftIso(today, 40),
  };
}
