import { PULSO_SEED_ITEMS } from "@/data/pulso-items";
import { getPulsoEdition, PULSO_EDITIONS } from "@/data/pulso-editions";
import type { PulsoEdition, PulsoItem } from "@/lib/ecosystem/types";
import {
  getIsoWeekKey,
  getWeekStart,
  parseIsoWeekKey,
} from "@/lib/ecosystem/pulso-config";
import type { VerticalSlug } from "@/lib/ecosystem/verticals";
import { getPulsoItemsFromStore } from "@/lib/storage/store";

export { getPulsoEdition, PULSO_EDITIONS };

export type PulsoFilters = {
  vertical?: string;
  city?: string;
  category?: string;
  week?: string;
};

function allPulsoItems(): PulsoItem[] {
  return [...PULSO_SEED_ITEMS, ...getPulsoItemsFromStore()];
}

export function getPulsoItems(filters: PulsoFilters = {}): PulsoItem[] {
  const currentIso = getIsoWeekKey();
  const weekKey = filters.week ?? (PULSO_EDITIONS[currentIso] ? currentIso : "2026-W40");
  const weekStart = parseIsoWeekKey(weekKey) ?? getWeekStart();
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 7);

  return allPulsoItems()
    .filter((item) => {
      const added = new Date(item.addedAt);
      if (added < weekStart || added >= weekEnd) return false;
      if (filters.vertical && filters.vertical !== "all" && item.verticalSlug !== filters.vertical)
        return false;
      if (filters.city && filters.city !== "all" && item.cityId !== filters.city)
        return false;
      if (
        filters.category &&
        filters.category !== "all" &&
        item.category !== filters.category
      )
        return false;
      return true;
    })
    .sort((a, b) => new Date(b.addedAt).getTime() - new Date(a.addedAt).getTime());
}

export function getRecentWeekKeys(count = 8): string[] {
  const predefined = Object.keys(PULSO_EDITIONS);
  if (predefined.length > 0) return predefined;
  const keys: string[] = [];
  const cursor = new Date();
  for (let i = 0; i < count; i++) {
    keys.push(getIsoWeekKey(cursor));
    cursor.setDate(cursor.getDate() - 7);
  }
  return keys;
}

export function getCategoryOptionsForVertical(
  vertical: string
): { value: string; label: string }[] {
  if (vertical === "all") return [{ value: "all", label: "all" }];
  const items = allPulsoItems().filter((i) => i.verticalSlug === vertical);
  const categories = [...new Set(items.map((i) => i.category))];
  return [
    { value: "all", label: "all" },
    ...categories.map((c) => ({ value: c, label: c })),
  ];
}

export function groupPulsoByVertical(
  items: PulsoItem[]
): Partial<Record<VerticalSlug, PulsoItem[]>> {
  const grouped: Partial<Record<VerticalSlug, PulsoItem[]>> = {};
  for (const item of items) {
    if (!grouped[item.verticalSlug]) grouped[item.verticalSlug] = [];
    grouped[item.verticalSlug]!.push(item);
  }
  return grouped;
}
