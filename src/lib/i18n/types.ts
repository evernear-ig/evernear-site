import type { I18N } from "./translations";

export type LangCode = keyof typeof I18N.langs;

export type TranslationValue = string | readonly string[];

export type TranslationDict = Record<string, TranslationValue>;
