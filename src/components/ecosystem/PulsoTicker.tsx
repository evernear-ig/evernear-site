"use client";

import { useEffect, useState } from "react";
import { CityBadge } from "@/components/ecosystem/CityBadge";
import { useI18n } from "@/components/trinexus/providers/I18nProvider";
import { T } from "@/components/trinexus/ui/T";
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

  if (items.length === 0) {
    return (
      <p className="pulso-empty">
        <T k="pulso.empty" />
      </p>
    );
  }

  const doubled = [...items, ...items];

  return (
    <div className="pulso-ticker-wrap">
      <button
        type="button"
        className="pulso-ticker-toggle btn btn-sm"
        onClick={() => setPaused((p) => !p)}
        aria-pressed={paused}
        aria-label={String(t(paused ? "pulso.ticker.play" : "pulso.ticker.pause"))}
      >
        <T k={paused ? "pulso.ticker.play" : "pulso.ticker.pause"} />
      </button>
      <div
        className={`pulso-ticker-track${paused || reduceMotion ? " is-paused" : ""}`}
        aria-live="polite"
      >
        <ul className="pulso-ticker">
          {doubled.map((item, i) => (
            <li key={`${item.id}-${i}`} className="pulso-ticker__item">
              <span className="pulso-ticker__kind">{item.kind}</span>
              <strong>{item.title}</strong>
              <CityBadge cityId={item.cityId} />
              <span className="pulso-ticker__vertical">
                <T k={`nav.${SLUG_TO_PREFIX[item.verticalSlug]}`} />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
