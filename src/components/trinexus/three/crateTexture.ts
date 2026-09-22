import { CanvasTexture, SRGBColorSpace } from "three";
import { C } from "./palette";

export type CrateIcon =
  | "ball"
  | "code"
  | "pin"
  | "heart"
  | "bag"
  | "mic"
  | "spark"
  | "dots";

const W = 320;
const H = 242;

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
) {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

/** Simple line glyphs so every crate visibly carries what its owner brings. */
function drawIcon(ctx: CanvasRenderingContext2D, icon: CrateIcon, cx: number, cy: number, s: number) {
  ctx.strokeStyle = C.green;
  ctx.fillStyle = C.green;
  ctx.lineWidth = s * 0.11;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  switch (icon) {
    case "ball": {
      ctx.beginPath();
      ctx.arc(cx, cy, s * 0.5, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx - s * 0.5, cy);
      ctx.lineTo(cx + s * 0.5, cy);
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(cx, cy, s * 0.22, s * 0.5, 0, 0, Math.PI * 2);
      ctx.stroke();
      break;
    }
    case "code": {
      ctx.beginPath();
      ctx.moveTo(cx - s * 0.12, cy - s * 0.42);
      ctx.lineTo(cx - s * 0.5, cy);
      ctx.lineTo(cx - s * 0.12, cy + s * 0.42);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx + s * 0.12, cy - s * 0.42);
      ctx.lineTo(cx + s * 0.5, cy);
      ctx.lineTo(cx + s * 0.12, cy + s * 0.42);
      ctx.stroke();
      break;
    }
    case "pin": {
      ctx.beginPath();
      ctx.arc(cx, cy - s * 0.16, s * 0.3, 0, Math.PI * 2);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx - s * 0.22, cy + s * 0.06);
      ctx.lineTo(cx, cy + s * 0.5);
      ctx.lineTo(cx + s * 0.22, cy + s * 0.06);
      ctx.stroke();
      break;
    }
    case "heart": {
      const r = s * 0.26;
      ctx.beginPath();
      ctx.moveTo(cx, cy + s * 0.46);
      ctx.bezierCurveTo(cx - s * 0.62, cy - s * 0.06, cx - r, cy - s * 0.56, cx, cy - s * 0.2);
      ctx.bezierCurveTo(cx + r, cy - s * 0.56, cx + s * 0.62, cy - s * 0.06, cx, cy + s * 0.46);
      ctx.closePath();
      ctx.fill();
      break;
    }
    case "bag": {
      ctx.beginPath();
      ctx.rect(cx - s * 0.4, cy - s * 0.18, s * 0.8, s * 0.64);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(cx, cy - s * 0.18, s * 0.22, Math.PI, 0);
      ctx.stroke();
      break;
    }
    case "mic": {
      roundRect(ctx, cx - s * 0.17, cy - s * 0.5, s * 0.34, s * 0.52, s * 0.17);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx, cy + s * 0.06);
      ctx.lineTo(cx, cy + s * 0.36);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(cx - s * 0.26, cy + s * 0.44);
      ctx.lineTo(cx + s * 0.26, cy + s * 0.44);
      ctx.stroke();
      break;
    }
    case "spark": {
      ctx.beginPath();
      ctx.moveTo(cx, cy - s * 0.52);
      ctx.quadraticCurveTo(cx + s * 0.1, cy - s * 0.1, cx + s * 0.52, cy);
      ctx.quadraticCurveTo(cx + s * 0.1, cy + s * 0.1, cx, cy + s * 0.52);
      ctx.quadraticCurveTo(cx - s * 0.1, cy + s * 0.1, cx - s * 0.52, cy);
      ctx.quadraticCurveTo(cx - s * 0.1, cy - s * 0.1, cx, cy - s * 0.52);
      ctx.closePath();
      ctx.fill();
      break;
    }
    case "dots": {
      for (const dx of [-s * 0.38, 0, s * 0.38]) {
        ctx.beginPath();
        ctx.arc(cx + dx, cy, s * 0.11, 0, Math.PI * 2);
        ctx.fill();
      }
      break;
    }
  }
}

function drawTracked(ctx: CanvasRenderingContext2D, text: string, cx: number, y: number, tracking: number) {
  const widths = [...text].map((ch) => ctx.measureText(ch).width);
  const total = widths.reduce((a, b) => a + b, 0) + tracking * (text.length - 1);
  let x = cx - total / 2;
  for (let i = 0; i < text.length; i++) {
    ctx.fillText(text[i], x, y);
    x += widths[i] + tracking;
  }
}

/**
 * Builds the printed face of a crate. Runs on the client only, inside the
 * WebGL canvas tree, so `document` is always available here.
 */
export function createCrateTexture(label: string, icon: CrateIcon): CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d");

  if (!ctx) return new CanvasTexture(canvas);

  ctx.fillStyle = "#070C1E";
  ctx.fillRect(0, 0, W, H);

  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, "rgba(138,109,230,.26)");
  grad.addColorStop(1, "rgba(46,229,157,.06)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  ctx.strokeStyle = "rgba(46,229,157,.7)";
  ctx.lineWidth = 7;
  roundRect(ctx, 10, 10, W - 20, H - 20, 12);
  ctx.stroke();

  drawIcon(ctx, icon, W / 2, 68, 46);

  ctx.strokeStyle = "rgba(46,229,157,.45)";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(W / 2 - 54, 112);
  ctx.lineTo(W / 2 + 54, 112);
  ctx.stroke();

  const text = label.toLocaleUpperCase();
  ctx.fillStyle = "#FFFFFF";
  ctx.textBaseline = "middle";
  ctx.textAlign = "left";

  let size = 58;
  const maxWidth = W - 52;
  for (; size >= 22; size -= 2) {
    ctx.font = `700 ${size}px "Space Grotesk", system-ui, sans-serif`;
    const tracking = size * 0.04;
    const w =
      [...text].reduce((a, ch) => a + ctx.measureText(ch).width, 0) +
      tracking * (text.length - 1);
    if (w <= maxWidth) break;
  }
  drawTracked(ctx, text, W / 2, 172, size * 0.04);

  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.anisotropy = 4;
  return texture;
}
