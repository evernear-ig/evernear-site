"use client";

import { useI18n } from "@/components/trinexus/providers/I18nProvider";
import { T } from "@/components/trinexus/ui/T";
import type { LangCode } from "@/lib/i18n/types";

const LANGS: { code: LangCode; label: string; lang: string }[] = [
  { code: "es", label: "ES", lang: "es" },
  { code: "pt", label: "PT", lang: "pt-BR" },
  { code: "en", label: "EN", lang: "en" },
  { code: "gn", label: "GN", lang: "gn" },
];

export function LangSwitch() {
  const { lang, setLang, t } = useI18n();

  return (
    <div className="lang" role="group" aria-label={String(t("a11y.lang"))}>
      {LANGS.map((item) => (
        <button
          key={item.code}
          type="button"
          data-lang={item.code}
          lang={item.lang}
          aria-label={
            item.code === "es"
              ? "Español"
              : item.code === "pt"
                ? "Português"
                : item.code === "en"
                  ? "English"
                  : "Guaraní"
          }
          aria-pressed={lang === item.code}
          onClick={() => setLang(item.code)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

export function LangNote() {
  const { t } = useI18n();
  const note = String(t("langnote") || "");
  if (!note) return <div className="lang-note" id="langNote" hidden />;
  return (
    <div className="lang-note show" id="langNote">
      {note}
    </div>
  );
}
