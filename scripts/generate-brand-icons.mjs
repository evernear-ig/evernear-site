import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const mascotPath = join(root, "public/images/mascot/conexa-welcome.webp");
const appDir = join(root, "src/app");
const brandBg = { r: 7, g: 11, b: 26, alpha: 1 };

async function writeSquareIcon(size, outPath) {
  const inner = Math.round(size * 0.82);
  const mascot = await sharp(mascotPath)
    .resize(inner, inner, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  await sharp({
    create: { width: size, height: size, channels: 4, background: brandBg },
  })
    .composite([{ input: mascot, gravity: "center" }])
    .png()
    .toFile(outPath);
}

async function writeShareImage(outPath) {
  const width = 1200;
  const height = 630;
  const mascot = await sharp(mascotPath)
    .resize(420, 280, {
      fit: "contain",
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .png()
    .toBuffer();

  const textLayer = Buffer.from(`
    <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#070B1A"/>
          <stop offset="55%" stop-color="#121834"/>
          <stop offset="100%" stop-color="#0A1025"/>
        </linearGradient>
      </defs>
      <rect width="${width}" height="${height}" fill="url(#bg)"/>
      <text x="520" y="270" fill="#F6F7FB" font-size="72" font-family="Arial, Helvetica, sans-serif" font-weight="700" letter-spacing="10">CONEXA</text>
      <text x="520" y="340" fill="#94A3B8" font-size="30" font-family="Arial, Helvetica, sans-serif">Descubrí deporte, comercio, turismo</text>
      <text x="520" y="382" fill="#94A3B8" font-size="30" font-family="Arial, Helvetica, sans-serif">e innovación en tu región.</text>
    </svg>
  `);

  await sharp(textLayer)
    .composite([{ input: mascot, left: 72, top: 175 }])
    .png()
    .toFile(outPath);
}

await mkdir(appDir, { recursive: true });
await writeSquareIcon(32, join(appDir, "icon.png"));
await writeSquareIcon(180, join(appDir, "apple-icon.png"));
await writeShareImage(join(appDir, "opengraph-image.png"));
await writeShareImage(join(appDir, "twitter-image.png"));

console.log(
  "Generated src/app/icon.png, apple-icon.png, opengraph-image.png, twitter-image.png",
);
