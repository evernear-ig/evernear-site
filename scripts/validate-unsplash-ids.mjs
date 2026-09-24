import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const text = readFileSync(join(root, "scripts/listing-photo-themes.mjs"), "utf8");
const ids = [...new Set([...text.matchAll(/"(photo-[a-z0-9-]+)"/g)].map((m) => m[1]))];

function url(id) {
  return `https://images.unsplash.com/${id}?ixlib=rb-4.1.0&fm=jpg&fit=crop&auto=format&q=70&w=200`;
}

async function check(id) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 10000);
  try {
    const res = await fetch(url(id), { method: "GET", redirect: "follow", signal: controller.signal });
    return { id, ok: res.ok, status: res.status };
  } catch (error) {
    return { id, ok: false, status: error.name === "AbortError" ? "timeout" : "error" };
  } finally {
    clearTimeout(timer);
  }
}

const bad = [];
for (let i = 0; i < ids.length; i += 8) {
  const chunk = ids.slice(i, i + 8);
  const results = await Promise.all(chunk.map(check));
  for (const result of results) {
    if (!result.ok) bad.push(result);
  }
}

console.log(`Checked ${ids.length} ids, ${bad.length} broken`);
for (const item of bad) console.log(`${item.status}\t${item.id}`);
