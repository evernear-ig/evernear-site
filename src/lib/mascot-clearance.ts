export const MASCOT_CLEAR_SIZE = { width: 108, height: 132 };

export function getMascotClearSize(viewportWidth = 1024) {
  if (viewportWidth < 480) return { width: 64, height: 78 };
  if (viewportWidth < 768) return { width: 72, height: 88 };
  if (viewportWidth < 1024) return { width: 88, height: 108 };
  return MASCOT_CLEAR_SIZE;
}

type Box = { left: number; top: number; right: number; bottom: number };
type Point = { left: number; top: number };

const OBSTACLE_SELECTOR = [
  "img",
  "video",
  "picture",
  "canvas",
  "h1",
  "h2",
  "h3",
  "h4",
  "p",
  "li",
  "a",
  "button",
  "label",
  "figcaption",
  "blockquote",
  "header",
  "nav",
  "footer",
  "form",
  "input",
  "textarea",
  "select",
  ".ph",
  ".pcard",
  ".eco-card",
  ".eco-entity-card",
  ".pillar",
  ".city-photo",
  ".hero-content",
  ".hero-bridge-cinema",
  ".eco-hero-content",
  ".eco-breadcrumb",
  ".eco-catalog-head",
  ".eco-filters",
  ".eco-filter",
  ".eco-disclaimer-bar",
  ".path",
  ".list-lg",
  ".quote",
  ".chips",
  ".chip",
  ".sport-guide-region",
  ".sport-audience-scrub-sticky",
  ".sport-audience-window",
  ".sport-path-scrub-sticky",
  ".sport-path-window",
  ".sport-audience-panel",
  ".sport-guide-foot",
  ".b-map-wrap",
  ".border-city-panel",
  ".about-full-slide-list",
  ".conexa-guide__prompt",
  ".conexa-guide__tour-panel",
].join(",");

const MAP_OBSTACLE_INSET = 32;

const PAD = 18;
const MARGIN = 18;
const HEADER_PAD = 84;

function layoutConstants(viewportWidth: number) {
  if (viewportWidth < 768) {
    return { pad: 14, margin: 10, headerPad: 72, footerGap: 20 };
  }
  return { pad: PAD, margin: MARGIN, headerPad: HEADER_PAD, footerGap: 24 };
}

function getFooterCap(viewport: { width: number; height: number }, footerGap: number) {
  const footer = document.querySelector("footer");
  if (!(footer instanceof HTMLElement)) return viewport.height;

  const rect = footer.getBoundingClientRect();
  if (rect.bottom < viewport.height * 0.2 || rect.top > viewport.height) {
    return viewport.height;
  }

  return Math.max(HEADER_PAD, rect.top - footerGap);
}

let parked: Point | null = null;
let parkedIndex = -1;

export function resetMascotPark() {
  parked = null;
  parkedIndex = -1;
}

function overlapArea(box: Box, obstacles: Box[]) {
  let area = 0;
  for (const obstacle of obstacles) {
    const left = Math.max(box.left, obstacle.left - PAD);
    const right = Math.min(box.right, obstacle.right + PAD);
    const top = Math.max(box.top, obstacle.top - PAD);
    const bottom = Math.min(box.bottom, obstacle.bottom + PAD);
    if (right > left && bottom > top) area += (right - left) * (bottom - top);
  }
  return area;
}

function collectObstacles(viewport: { width: number; height: number }) {
  const obstacles: Box[] = [];
  const nodes = document.querySelectorAll(OBSTACLE_SELECTOR);

  nodes.forEach((node) => {
    if (!(node instanceof HTMLElement)) return;
    if (node.closest(".conexa-guide") && !node.closest(".conexa-guide__prompt, .conexa-guide__tour-panel")) {
      return;
    }
    const rect = node.getBoundingClientRect();
    if (rect.width < 28 || rect.height < 16) return;
    if (rect.bottom < -20 || rect.top > viewport.height + 20) return;
    if (rect.right < 0 || rect.left > viewport.width) return;
    if (rect.width > viewport.width * 0.92 && rect.height > viewport.height * 0.72) return;
    const inset = node.matches(".b-map-wrap, .border-city-panel") ? MAP_OBSTACLE_INSET : 0;
    obstacles.push({
      left: rect.left - inset,
      top: rect.top - inset,
      right: rect.right + inset,
      bottom: rect.bottom + inset,
    });
  });

  return obstacles;
}

function boxAt(point: Point, size: { width: number; height: number }): Box {
  return {
    left: point.left,
    top: point.top,
    right: point.left + size.width,
    bottom: point.top + size.height,
  };
}

export function placeFreeMascot(
  size: { width: number; height: number },
  hint: { x: number; y: number },
  activeIndex: number,
) {
  const viewport = { width: window.innerWidth, height: window.innerHeight };
  const { pad, margin, headerPad, footerGap } = layoutConstants(viewport.width);
  const obstacles = collectObstacles(viewport);
  const maxLeft = Math.max(margin, viewport.width - size.width - margin);
  const footerCap = getFooterCap(viewport, footerGap);
  const maxTop = Math.max(
    headerPad,
    Math.min(footerCap - size.height, viewport.height - size.height - margin),
  );

  if (
    parked &&
    parkedIndex === activeIndex &&
    overlapArea(boxAt(parked, size), obstacles) === 0 &&
    parked.left >= margin &&
    parked.left <= maxLeft &&
    parked.top >= headerPad &&
    parked.top <= maxTop
  ) {
    return parked;
  }

  const cols = viewport.width < 768 ? 4 : 8;
  const rows = viewport.width < 768 ? 4 : 6;
  const candidates: Point[] = [];

  if (viewport.width < 768) {
    candidates.push(
      { left: maxLeft, top: maxTop },
      { left: margin, top: maxTop },
      { left: maxLeft, top: headerPad },
      { left: margin, top: headerPad },
    );
  }

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      candidates.push({
        left: margin + ((maxLeft - margin) * col) / Math.max(1, cols - 1),
        top: headerPad + ((maxTop - headerPad) * row) / Math.max(1, rows - 1),
      });
    }
  }

  for (const obstacle of obstacles) {
    const midY = (obstacle.top + obstacle.bottom) / 2 - size.height / 2;
    const midX = (obstacle.left + obstacle.right) / 2 - size.width / 2;
    candidates.push(
      { left: obstacle.left - pad - size.width, top: midY },
      { left: obstacle.right + pad, top: midY },
      { left: midX, top: obstacle.top - pad - size.height },
      { left: midX, top: obstacle.bottom + pad },
    );
  }

  let best: Point | null = null;
  let bestScore = Infinity;

  for (const raw of candidates) {
    const point = {
      left: Math.max(margin, Math.min(maxLeft, raw.left)),
      top: Math.max(headerPad, Math.min(maxTop, raw.top)),
    };
    const area = overlapArea(boxAt(point, size), obstacles);
    if (area > 0) continue;
    const cx = point.left + size.width / 2;
    const cy = point.top + size.height / 2;
    const dist = Math.hypot(cx - hint.x, cy - hint.y);
    const stay = parked ? Math.hypot(point.left - parked.left, point.top - parked.top) * 0.35 : 0;
    const score = dist + stay;
    if (score < bestScore) {
      bestScore = score;
      best = point;
    }
  }

  if (!best) {
    bestScore = Infinity;
    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        const left = margin + ((maxLeft - margin) * col) / Math.max(1, cols - 1);
        const top = headerPad + ((maxTop - headerPad) * row) / Math.max(1, rows - 1);
        const point = { left, top };
        const area = overlapArea(boxAt(point, size), obstacles);
        const dist = parked ? Math.hypot(left - parked.left, top - parked.top) : 0;
        const score = area + dist;
        if (score < bestScore) {
          bestScore = score;
          best = point;
        }
      }
    }
  }

  parked = best ?? { left: viewport.width < 768 ? maxLeft : margin, top: maxTop };
  parkedIndex = activeIndex;
  return parked;
}
