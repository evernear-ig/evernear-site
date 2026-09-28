export const MAP_VIEWBOX = { width: 1000, height: 1400 } as const;

export type BorderGroup = "origin" | "stories" | "join";

export type CountryBorder = {
  id: string;
  group: BorderGroup;
  /** Simplified border outline (viewBox coordinates). */
  path: string;
  /** Connection hub for link lines. */
  centroid: [number, number];
};

export type BorderLink = {
  group: BorderGroup;
  from: string;
  to: string;
};

/** Approximate outlines aligned to que-es-americas-satellite.png (1000×1400). */
export const COUNTRY_BORDERS: CountryBorder[] = [
  {
    id: "py",
    group: "origin",
    centroid: [548, 1048],
    path: "M 520 1028 L 548 1018 L 576 1028 L 582 1052 L 568 1072 L 538 1070 L 518 1054 Z",
  },
  {
    id: "br",
    group: "origin",
    centroid: [612, 968],
    path: "M 548 820 L 640 798 L 698 842 L 712 928 L 688 1028 L 628 1088 L 558 1072 L 522 1008 L 512 908 L 528 852 Z",
  },
  {
    id: "ar",
    group: "origin",
    centroid: [518, 1148],
    path: "M 468 1068 L 538 1054 L 558 1108 L 548 1188 L 498 1228 L 448 1198 L 438 1128 L 452 1088 Z",
  },
  {
    id: "co",
    group: "stories",
    centroid: [492, 748],
    path: "M 448 718 L 498 702 L 538 728 L 532 772 L 498 792 L 458 778 L 442 742 Z",
  },
  {
    id: "mx",
    group: "stories",
    centroid: [398, 548],
    path: "M 348 508 L 418 492 L 458 518 L 448 572 L 408 598 L 358 582 L 338 538 Z",
  },
  {
    id: "pe",
    group: "stories",
    centroid: [438, 868],
    path: "M 408 828 L 448 812 L 472 848 L 468 902 L 438 928 L 402 912 L 392 862 Z",
  },
  {
    id: "us",
    group: "join",
    centroid: [468, 358],
    path: "M 358 288 L 488 268 L 568 298 L 588 358 L 558 418 L 468 438 L 378 418 L 348 358 L 358 318 Z",
  },
  {
    id: "mx-join",
    group: "join",
    centroid: [398, 548],
    path: "M 348 508 L 418 492 L 458 518 L 448 572 L 408 598 L 358 582 L 338 538 Z",
  },
  {
    id: "ca",
    group: "join",
    centroid: [478, 218],
    path: "M 388 168 L 498 148 L 568 178 L 578 238 L 538 278 L 458 288 L 388 258 L 368 208 Z",
  },
];

export const BORDER_LINKS: BorderLink[] = [
  { group: "origin", from: "py", to: "br" },
  { group: "origin", from: "br", to: "ar" },
  { group: "origin", from: "py", to: "ar" },
  { group: "stories", from: "co", to: "mx" },
  { group: "stories", from: "mx", to: "pe" },
  { group: "stories", from: "co", to: "pe" },
  { group: "join", from: "us", to: "mx-join" },
  { group: "join", from: "mx-join", to: "ca" },
  { group: "join", from: "us", to: "ca" },
];

export const GROUP_COLORS: Record<BorderGroup, string> = {
  origin: "#ff9c30",
  stories: "#3ef0d4",
  join: "#8a6de6",
};

const countryById = new Map(COUNTRY_BORDERS.map((c) => [c.id, c]));

export function linkPath(fromId: string, toId: string): string {
  const from = countryById.get(fromId)?.centroid;
  const to = countryById.get(toId)?.centroid;
  if (!from || !to) return "";
  const [x1, y1] = from;
  const [x2, y2] = to;
  const mx = (x1 + x2) / 2;
  const my = (y1 + y2) / 2 - Math.abs(x2 - x1) * 0.08;
  return `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`;
}

/** Pan waypoints (vw/vh): sur → centro → norte del continente. */
export const MAP_WAYPOINTS = [
  { x: 0, y: -12 },
  { x: 2, y: 6 },
  { x: 5, y: 32 },
] as const;

export function groupOpacities(progress: number): Record<BorderGroup, number> {
  const residual = 0.14;
  let origin = 0;
  let stories = 0;
  let join = 0;

  if (progress <= 0.2) {
    origin = 1;
  } else if (progress <= 0.4) {
    const t = (progress - 0.2) / 0.2;
    origin = 1 - t * (1 - residual);
    stories = t;
  } else if (progress <= 0.6) {
    origin = residual;
    stories = 1;
  } else if (progress <= 0.8) {
    const t = (progress - 0.6) / 0.2;
    origin = residual;
    stories = 1 - t * (1 - residual);
    join = t;
  } else {
    origin = residual;
    stories = residual;
    join = 1;
  }

  return { origin, stories, join };
}

export function interpolateWaypoint(progress: number): { x: number; y: number } {
  const pts = MAP_WAYPOINTS;
  if (progress <= 0.5) {
    const t = progress / 0.5;
    return {
      x: pts[0].x + (pts[1].x - pts[0].x) * t,
      y: pts[0].y + (pts[1].y - pts[0].y) * t,
    };
  }
  const t = (progress - 0.5) / 0.5;
  return {
    x: pts[1].x + (pts[2].x - pts[1].x) * t,
    y: pts[1].y + (pts[2].y - pts[1].y) * t,
  };
}
