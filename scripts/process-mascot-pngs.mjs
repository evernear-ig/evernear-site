import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const DIR = path.join(ROOT, "public", "images", "mascot");
const POSES = ["welcome", "peace", "think", "globe", "point"];

async function removeWhiteBg(inputPath, outputPath) {
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const pixels = new Uint8Array(data);
  for (let i = 0; i < pixels.length; i += 4) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    const brightness = (r + g + b) / 3;
    if (brightness > 238 && r > 230 && g > 230 && b > 230) {
      const fade = Math.min(1, (brightness - 238) / 17);
      pixels[i + 3] = Math.round(pixels[i + 3] * (1 - fade));
    }
  }

  await sharp(pixels, {
    raw: { width: info.width, height: info.height, channels: 4 },
  })
    .webp({ quality: 92, alphaQuality: 100 })
    .toFile(outputPath);
}

for (const pose of POSES) {
  const png = path.join(DIR, `conexa-${pose}.png`);
  const webp = path.join(DIR, `conexa-${pose}.webp`);
  if (!fs.existsSync(png)) {
    console.warn(`skip ${pose}: ${png} not found`);
    continue;
  }
  await removeWhiteBg(png, webp);
  console.log(`processed ${pose} -> ${webp}`);
}
