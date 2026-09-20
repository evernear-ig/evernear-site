import fs from "fs";

const src = fs.readFileSync("src/lib/images-data.js", "utf8");
const IMAGES = eval(src + "; IMAGES");

const out = `export type ImageMode = "auto" | "artwork" | "photo";

export type ImageSpec = {
  u: string;
  pos?: string;
  credit?: string;
  file?: string;
  alt: Partial<Record<"es" | "pt" | "en" | "gn", string>> & {
    es?: string;
    pt?: string;
    en?: string;
  };
};

export const IMAGES = ${JSON.stringify(IMAGES, null, 2)} as {
  mode: ImageMode;
  localBase: string;
  base: (u: string, w: number) => string;
  widths: number[];
  people: Record<string, ImageSpec>;
  cities: Record<string, ImageSpec>;
  hero: Record<string, ImageSpec>;
  learn: Record<string, ImageSpec>;
  build: Record<string, ImageSpec>;
  access: Record<string, ImageSpec>;
  band: Record<string, ImageSpec>;
};

IMAGES.base = (u, w) =>
  /^(https?:|\.|\\/)/.test(u)
    ? u
    : \`https://images.unsplash.com/\${u}?ixlib=rb-4.1.0&fm=jpg&fit=crop&auto=format&q=70&w=\${w}\`;
`;

fs.writeFileSync("src/lib/images.ts", out);
