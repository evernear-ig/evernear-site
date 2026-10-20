"use client";

import { useEffect, useState } from "react";
import { TransitionLink } from "@/components/evernear/ui/TransitionLink";
import { useI18n } from "@/components/evernear/providers/I18nProvider";
import { T } from "@/components/evernear/ui/T";
import type { PulsoItem } from "@/lib/ecosystem/types";
import { SLUG_TO_PREFIX } from "@/lib/ecosystem/vertical-catalog";

type PulsoTickerProps = {
  items: PulsoItem[];
};

export function PulsoTicker({ items }: PulsoTickerProps) {
  const { t } = useI18n();
  const [paused, setPaused] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  if (items.length === 0) return null;

  // Duplicamos los elementos para generar un bucle infinito suave
  const displayItems = [...items, ...items];

  const getCityLabel = (cityId: string) => {
    switch (cityId) {
      case "pi":
        return "IGU · AR";
      case "foz":
        return "FOZ · BR";
      case "cde":
        return "CDE · PY";
      default:
        return cityId.toUpperCase();
    }
  };

  return (
    <div
      className={`pulso-ticker-bar ${paused ? "is-paused" : ""}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      <div className="pulso-ticker-bar__label">
        <span className="pulso-ticker-bar__dot" />
        <span className="pulso-ticker-bar__text">FRECUENCIA EN VIVO</span>
      </div>

      <div className="pulso-ticker-bar__track-wrap">
        <div className={`pulso-ticker-bar__track ${reduceMotion ? "is-static" : ""}`}>
          {displayItems.map((item, index) => {
            const verticalKey = SLUG_TO_PREFIX[item.verticalSlug];
            const content = (
              <>
                <span className={`pulso-ticker-pill__city pulso-ticker-pill__city--${item.cityId}`}>
                  {getCityLabel(item.cityId)}
                </span>
                <span className="pulso-ticker-pill__kind">{item.kind}</span>
                <span className="pulso-ticker-pill__title">{item.title}</span>
                {verticalKey && (
                  <span className="pulso-ticker-pill__vertical">
                    · <T k={`nav.${verticalKey}`} />
                  </span>
                )}
              </>
            );

            return item.href ? (
              <TransitionLink
                key={`${item.id}-${index}`}
                href={item.href}
                className="pulso-ticker-pill"
              >
                {content}
              </TransitionLink>
            ) : (
              <span key={`${item.id}-${index}`} className="pulso-ticker-pill">
                {content}
              </span>
            );
          })}
        </div>
      </div>

      <button
        type="button"
        className="pulso-ticker-bar__control"
        onClick={() => setPaused((p) => !p)}
        aria-label={String(t(paused ? "pulso.ticker.play" : "pulso.ticker.pause"))}
      >
        {paused ? (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3" />
          </svg>
        ) : (
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <rect x="6" y="4" width="4" height="16" />
            <rect x="14" y="4" width="4" height="16" />
          </svg>
        )}
      </button>
    </div>
  );
}
