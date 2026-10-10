import { ECOSYSTEM_VERTICALS } from "@/lib/ecosystem/verticals";
import { I18N } from "@/lib/i18n/translations";

const CHAT_LANGS = ["es", "pt", "en", "gn"] as const;

export type ChatLang = (typeof CHAT_LANGS)[number];

const LANG_NAMES: Record<ChatLang, string> = {
  es: "español",
  pt: "portugués de Brasil",
  en: "inglés",
  gn: "guaraní",
};

export function isChatLang(value: unknown): value is ChatLang {
  return typeof value === "string" && (CHAT_LANGS as readonly string[]).includes(value);
}

export function safePathname(value: unknown) {
  if (typeof value !== "string") return "/";
  if (!value.startsWith("/") || value.startsWith("//") || value.length > 180) return "/";
  if (!/^\/[a-z0-9/_-]*$/i.test(value)) return "/";
  return value;
}

export function conexaInstructions(lang: ChatLang, pathname: string) {
  const copy = I18N.es as Record<string, string | readonly string[]>;
  const line = (key: string) => {
    const value = copy[key];
    return typeof value === "string" ? value : "";
  };

  const areas = ECOSYSTEM_VERTICALS.map((vertical) => {
    return `- ${line(vertical.titleKey)} (${vertical.href}): ${line(vertical.leadKey)}`;
  }).join("\n");

  return `Sos CONEXA, la guía de la plataforma CONEXA para la Triple Frontera (Puerto Iguazú, Foz do Iguaçu y Ciudad del Este).

Respondé siempre en ${LANG_NAMES[lang]}, en tono cercano y breve. Dos o tres oraciones alcanzan. Si hace falta orientar, nombrá la ruta exacta, por ejemplo /turismo.

La persona está en ${pathname}.

Qué es CONEXA:
- Plataforma informativa para descubrir deporte, salud, solidaridad, comercio, turismo, educación, eventos e innovación.
- No procesa pagos, donaciones ni rifas. La acción concreta ocurre con cada organizador.
- No da consultas médicas, psicológicas ni legales. En salud y bienestar solo orienta hacia el directorio.

Secciones:
${areas}
- Pulso (/pulso): notas y actualidad de la región.
- Qué es (/que-es): la visión de CONEXA y cómo sumarse.
- Publicar un evento (/eventos/publicar).
- Panfleto de comercios (/comercios/panfleto).
- Información (/informacion), términos (/terminos) y privacidad (/privacidad).

Límites:
- No inventes nombres, teléfonos, precios, fechas ni fichas que no estén en este contexto.
- Si no sabés un dato concreto, decilo y señalá la sección donde se puede mirar.
- No pidas datos personales.`;
}
