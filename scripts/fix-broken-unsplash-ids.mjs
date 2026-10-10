import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const themesPath = join(root, "scripts/listing-photo-themes.mjs");
const text = readFileSync(themesPath, "utf8");
const themeIds = [...new Set([...text.matchAll(/"(photo-[a-z0-9-]+)"/g)].map((m) => m[1]))];
const imagesText = readFileSync(join(root, "src/lib/images.ts"), "utf8");
const imageIds = [...new Set([...imagesText.matchAll(/u: "(photo-[a-z0-9-]+)"/g)].map((m) => m[1]))];
const allIds = [...new Set([...themeIds, ...imageIds])];

function url(id) {
  return `https://images.unsplash.com/${id}?ixlib=rb-4.1.0&fm=jpg&fit=crop&auto=format&q=70&w=200`;
}

async function isOk(id) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10000);
  try {
    const res = await fetch(url(id), { method: "GET", redirect: "follow", signal: controller.signal });
    return res.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(timer);
  }
}

async function filterOk(list) {
  const ok = [];
  for (let i = 0; i < list.length; i += 8) {
    const chunk = list.slice(i, i + 8);
    const results = await Promise.all(chunk.map(async (id) => ({ id, ok: await isOk(id) })));
    ok.push(...results.filter((r) => r.ok).map((r) => r.id));
  }
  return ok;
}

const okIds = await filterOk(allIds);
if (okIds.length < 20) {
  console.error(`Verified pool too small: ${okIds.length}`);
  process.exit(1);
}
console.log(`Verified pool: ${okIds.length}/${allIds.length}`);

let next = 0;
function pickReplacement() {
  const id = okIds[next % okIds.length];
  next += 1;
  return id;
}

let replaced = 0;
const fixed = text.replace(/"(photo-[a-z0-9-]+)"/g, (match, id) => {
  if (okIds.includes(id)) return match;
  replaced += 1;
  return `"${pickReplacement()}"`;
});

writeFileSync(themesPath, fixed, "utf8");
console.log(`Replaced ${replaced} broken photo references in listing-photo-themes.mjs`);
