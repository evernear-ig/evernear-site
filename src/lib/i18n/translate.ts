import { I18N } from "./translations";
import type { LangCode, TranslationValue } from "./types";
import { VERTICAL_FILTERS } from "./vertical-filters";
import { VERTICAL_GUIDES } from "./vertical-guides";

const FALLBACK = I18N.fallback as LangCode;

function dictFor(lang: LangCode): Record<string, TranslationValue | undefined> {
  return {
    ...(I18N[lang] as unknown as Record<string, TranslationValue | undefined>),
    ...VERTICAL_GUIDES[lang],
    ...VERTICAL_FILTERS[lang],
  };
}

export function translate(lang: LangCode, key: string): TranslationValue {
  const active = dictFor(lang);
  const fallback = dictFor(FALLBACK);
  const value = active?.[key];
  if (value !== undefined && value !== "") return value;
  const fb = fallback?.[key];
  if (fb !== undefined) return fb;
  return value === "" ? "" : key;
}

export function isFallbackTranslation(lang: LangCode, key: string) {
  return dictFor(lang)[key] === undefined;
}

export function langTag(lang: LangCode) {
  return I18N.langs[lang].tag;
}
