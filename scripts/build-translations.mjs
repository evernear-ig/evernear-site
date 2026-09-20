import fs from "fs";

const html = fs.readFileSync("public/trinexus.html", "utf8");
const i18nSrc = fs.readFileSync("src/lib/i18n/translations-data.js", "utf8");
const I18N = eval(i18nSrc + "; I18N");

const es = { ...I18N.es };

for (const m of html.matchAll(/data-i18n="([^"]+)"[^>]*>([^<]+)</g)) {
  if (!(m[1] in es)) es[m[1]] = m[2].trim();
}

for (const m of html.matchAll(/data-i18n-html="([^"]+)"[^>]*>([\s\S]*?)<\//g)) {
  if (!(m[1] in es)) es[m[1]] = m[2].trim();
}

const heroMatch = html.match(
  /data-i18n-lines="hero\.title"[^>]*>([\s\S]*?)<\/h1>/
);
if (heroMatch) {
  const lines = [...heroMatch[1].matchAll(/<span class="line"><span>([^<]*)<\/span><\/span>/g)].map(
    (x) => x[1]
  );
  if (lines.length) es["hero.title"] = lines;
}

for (const m of html.matchAll(/data-i18n-attr="([^"]+)"[^>]*>/g)) {
  for (const pair of m[1].split(";")) {
    const [attr, key] = pair.split(":");
    if (!key || key in es) continue;
    const tag = m[0];
    const am = tag.match(new RegExp(`${attr}="([^"]*)"`));
    if (am) es[key] = am[1];
  }
}

I18N.es = es;

const out = `export const I18N = ${JSON.stringify(I18N, null, 2)} as const;\n`;
fs.writeFileSync("src/lib/i18n/translations.ts", out);
console.log("ES keys:", Object.keys(es).length);
