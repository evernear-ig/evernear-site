import fs from "fs";

const html = fs.readFileSync("public/trinexus.html", "utf8");
const script = html.match(/<script>\n([\s\S]*?)<\/script>/)[1];
const start = script.indexOf("const ARTWORK = ");
const end = script.indexOf("\nconst IMAGES = ");
if (start === -1 || end === -1) throw new Error("ARTWORK not found");
const artwork = script.slice(start + "const ARTWORK = ".length, end).trim();
const body = artwork.endsWith(";") ? artwork.slice(0, -1) : artwork;
fs.writeFileSync(
  "src/lib/artwork.ts",
  `export const ARTWORK: Record<string, string> = ${body};\n`
);
console.log("artwork fixed");
