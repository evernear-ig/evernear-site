/** Weekly pulse schedule (ART, UTC-3). */
export const PULSO_CONFIG = {
  /** 0 = Sunday … 5 = Friday */
  publishDay: 5,
  publishHour: 18,
  publishMinute: 0,
  timezone: "America/Argentina/Buenos_Aires",
  liveSessionAt: null as string | null,
  liveEmbedUrl: null as string | null,
} as const;

export function getNextPulsoDate(from = new Date()): Date {
  const { publishDay, publishHour, publishMinute, timezone } = PULSO_CONFIG;
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    weekday: "short",
  });
  const parts = formatter.formatToParts(from);
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    Number(parts.find((p) => p.type === type)?.value ?? 0);
  const weekday = parts.find((p) => p.type === "weekday")?.value ?? "";
  const dayMap: Record<string, number> = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  };
  const currentDay = dayMap[weekday] ?? from.getDay();
  let daysUntil = (publishDay - currentDay + 7) % 7;
  const localHour = get("hour");
  const localMinute = get("minute");
  if (
    daysUntil === 0 &&
    (localHour > publishHour ||
      (localHour === publishHour && localMinute >= publishMinute))
  ) {
    daysUntil = 7;
  }
  const target = new Date(from);
  target.setDate(target.getDate() + daysUntil);
  target.setHours(publishHour, publishMinute, 0, 0);
  return target;
}

export function getWeekStart(date = new Date()): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  d.setDate(d.getDate() + diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

export function getIsoWeekKey(date = new Date()): string {
  const d = new Date(date);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() + 3 - ((d.getDay() + 6) % 7));
  const week1 = new Date(d.getFullYear(), 0, 4);
  const weekNum =
    1 +
    Math.round(
      ((d.getTime() - week1.getTime()) / 86400000 -
        3 +
        ((week1.getDay() + 6) % 7)) /
        7
    );
  return `${d.getFullYear()}-W${String(weekNum).padStart(2, "0")}`;
}

export function parseIsoWeekKey(key: string): Date | null {
  const match = /^(\d{4})-W(\d{2})$/.exec(key);
  if (!match) return null;
  const year = Number(match[1]);
  const week = Number(match[2]);
  const jan4 = new Date(year, 0, 4);
  const dayOfWeek = (jan4.getDay() + 6) % 7;
  const monday = new Date(jan4);
  monday.setDate(jan4.getDate() - dayOfWeek + (week - 1) * 7);
  monday.setHours(0, 0, 0, 0);
  return monday;
}
