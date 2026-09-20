"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { I18N } from "@/lib/i18n/translations";
import {
  isFallbackTranslation,
  langTag,
  translate,
} from "@/lib/i18n/translate";
import type { LangCode, TranslationValue } from "@/lib/i18n/types";

const STORAGE_KEY = "trinexus.lang.v1";

type I18nContextValue = {
  lang: LangCode;
  setLang: (lang: LangCode) => void;
  t: (key: string) => TranslationValue;
  isFallback: (key: string) => boolean;
};

const I18nContext = createContext<I18nContextValue | null>(null);

function readStoredLang(): LangCode {
  try {
    const saved = localStorage.getItem(STORAGE_KEY) as LangCode | null;
    if (saved && saved in I18N.langs) return saved;
  } catch {
    /* ignore */
  }
  return "es";
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<LangCode>("es");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setLangState(readStoredLang());
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.lang = langTag(lang);
  }, [lang, ready]);

  const setLang = useCallback((next: LangCode) => {
    if (!(next in I18N.langs)) return;
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<I18nContextValue>(
    () => ({
      lang,
      setLang,
      t: (key) => translate(lang, key),
      isFallback: (key) => isFallbackTranslation(lang, key),
    }),
    [lang, setLang]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
