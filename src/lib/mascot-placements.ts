export type MascotSide = "left" | "right" | "center";
export type CalloutSide = "left" | "right" | "top" | "bottom";

const CONTENT_MAX = 1240;
const SPINE_RESERVE = 96;
const GUTTER_GAP = 16;

function getContentBounds(viewport: { width: number }) {
  const pad = Math.min(72, Math.max(20, viewport.width * 0.05));
  const contentWidth = Math.min(CONTENT_MAX, viewport.width - pad * 2);
  const contentLeft = (viewport.width - contentWidth) / 2;
  return {
    contentLeft,
    contentRight: contentLeft + contentWidth,
    pad,
  };
}

export type MascotPlacement = {
  side: MascotSide;
  /** 0–1 vertical anchor inside the section */
  anchorY: number;
  /** 0–1 point the connector line targets */
  focusX: number;
  focusY: number;
  offsetX: number;
  offsetY: number;
  callout: CalloutSide;
  size: number;
};

export const MASCOT_PLACEMENTS: Record<string, MascotPlacement> = {
  hero: {
    side: "right",
    anchorY: 0.38,
    focusX: 0.52,
    focusY: 0.48,
    offsetX: 28,
    offsetY: 0,
    callout: "left",
    size: 128,
  },
  border: {
    side: "left",
    anchorY: 0.42,
    focusX: 0.62,
    focusY: 0.45,
    offsetX: 20,
    offsetY: 0,
    callout: "right",
    size: 118,
  },
  people: {
    side: "right",
    anchorY: 0.5,
    focusX: 0.38,
    focusY: 0.5,
    offsetX: 24,
    offsetY: 0,
    callout: "left",
    size: 118,
  },
  ecosystem: {
    side: "left",
    anchorY: 0.55,
    focusX: 0.55,
    focusY: 0.5,
    offsetX: 16,
    offsetY: 0,
    callout: "right",
    size: 122,
  },
  join: {
    side: "center",
    anchorY: 0.4,
    focusX: 0.5,
    focusY: 0.62,
    offsetX: 0,
    offsetY: -24,
    callout: "top",
    size: 112,
  },
  "eco-hero": {
    side: "right",
    anchorY: 0.4,
    focusX: 0.35,
    focusY: 0.45,
    offsetX: 32,
    offsetY: 0,
    callout: "left",
    size: 120,
  },
  "eco-body": {
    side: "left",
    anchorY: 0.45,
    focusX: 0.58,
    focusY: 0.5,
    offsetX: 24,
    offsetY: 0,
    callout: "right",
    size: 116,
  },
  "about-hero": {
    side: "right",
    anchorY: 0.38,
    focusX: 0.4,
    focusY: 0.45,
    offsetX: 28,
    offsetY: 0,
    callout: "left",
    size: 120,
  },
  "about-slide": {
    side: "left",
    anchorY: 0.5,
    focusX: 0.55,
    focusY: 0.5,
    offsetX: 20,
    offsetY: 0,
    callout: "right",
    size: 116,
  },
  "main-hero": {
    side: "right",
    anchorY: 0.4,
    focusX: 0.45,
    focusY: 0.45,
    offsetX: 28,
    offsetY: 0,
    callout: "left",
    size: 120,
  },
  "main-body": {
    side: "left",
    anchorY: 0.5,
    focusX: 0.55,
    focusY: 0.5,
    offsetX: 20,
    offsetY: 0,
    callout: "right",
    size: 116,
  },
  "main-join": {
    side: "center",
    anchorY: 0.42,
    focusX: 0.5,
    focusY: 0.6,
    offsetX: 0,
    offsetY: -20,
    callout: "top",
    size: 112,
  },
  main: {
    side: "right",
    anchorY: 0.4,
    focusX: 0.4,
    focusY: 0.45,
    offsetX: 28,
    offsetY: 0,
    callout: "left",
    size: 120,
  },
};

export function getMascotPlacement(sectionKey: string): MascotPlacement {
  return MASCOT_PLACEMENTS[sectionKey] ?? MASCOT_PLACEMENTS.main;
}

export type MascotLayout = {
  mascotTop: number;
  mascotLeft: number;
  mascotSize: number;
  mascotCenterX: number;
  mascotCenterY: number;
  focusX: number;
  focusY: number;
  connectorStartX: number;
  connectorStartY: number;
};

export function computeMascotLayout(
  sectionRect: DOMRect,
  placement: MascotPlacement,
  viewport: { width: number; height: number },
): MascotLayout {
  const size = placement.size;
  const headerPad = 72;
  const footerPad = 24;
  const bounds = getContentBounds(viewport);

  const dockRight = () => viewport.width - SPINE_RESERVE - size - 12;
  const leftLaneWidth = bounds.contentLeft - 12 - GUTTER_GAP;
  const rightLaneWidth =
    viewport.width - SPINE_RESERVE - bounds.contentRight - GUTTER_GAP - 8;
  const minLane = size + 8;

  let left: number;
  if (placement.side === "left" && leftLaneWidth >= minLane) {
    const laneRight = bounds.contentLeft - GUTTER_GAP;
    left = Math.max(12, laneRight - size);
  } else if (placement.side === "right" && rightLaneWidth >= minLane) {
    const laneLeft = bounds.contentRight + GUTTER_GAP;
    const laneRight = viewport.width - SPINE_RESERVE - 8;
    left = Math.min(laneRight - size, laneLeft);
    left = Math.max(laneLeft, left);
  } else {
    left = dockRight();
  }

  let top =
    sectionRect.top +
    sectionRect.height * placement.anchorY -
    size / 2 +
    placement.offsetY;

  left = Math.max(12, Math.min(viewport.width - SPINE_RESERVE - size, left));
  top = Math.max(headerPad, Math.min(viewport.height - size - footerPad, top));

  const mascotCenterX = left + size / 2;
  const mascotCenterY = top + size / 2;

  const focusX = sectionRect.left + sectionRect.width * placement.focusX;
  const focusY = sectionRect.top + sectionRect.height * placement.focusY;

  const dx = focusX - mascotCenterX;
  const dy = focusY - mascotCenterY;
  const dist = Math.hypot(dx, dy) || 1;
  const connectorStartX = mascotCenterX + (dx / dist) * (size * 0.32);
  const connectorStartY = mascotCenterY + (dy / dist) * (size * 0.32);

  return {
    mascotTop: top,
    mascotLeft: left,
    mascotSize: size,
    mascotCenterX,
    mascotCenterY,
    focusX,
    focusY,
    connectorStartX,
    connectorStartY,
  };
}
