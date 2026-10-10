import { ECOSYSTEM_VERTICALS } from "@/lib/ecosystem/verticals";

/** Example cross-area connections shown in the hero hub (pairs cycle in the UI). */
export const HERO_HUB_PAIRS: readonly { a: string; b: string }[] = [
  { a: "deporte", b: "turismo" },
  { a: "comercios", b: "innovacion" },
  { a: "salud", b: "solidaridad" },
  { a: "educacion", b: "descubrimiento" },
  { a: "comunicacion", b: "eventos" },
  { a: "bienestar", b: "deporte" },
];

export const HERO_HUB_NODES = ECOSYSTEM_VERTICALS;

export const HERO_HUB_RADIUS = 42;

export function hubNodePosition(index: number, total: number, radius = HERO_HUB_RADIUS) {
  const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
  return {
    x: 50 + radius * Math.cos(angle),
    y: 50 + radius * Math.sin(angle),
  };
}

export function hubSlugIndex(slug: string) {
  return HERO_HUB_NODES.findIndex((v) => v.slug === slug);
}
