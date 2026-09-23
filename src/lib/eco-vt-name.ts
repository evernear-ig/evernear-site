export function ecoViewTransitionName(slug: string) {
  return `eco-vt-${slug}` as const;
}

export function slugFromEcoHref(href: string) {
  return href.replace(/^\//, "").split("/")[0] || "eco";
}
