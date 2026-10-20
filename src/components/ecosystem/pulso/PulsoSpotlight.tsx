"use client";

import Image from "next/image";
import { TransitionLink } from "@/components/evernear/ui/TransitionLink";
import { T } from "@/components/evernear/ui/T";
import type { PulsoItem, PulsoRundownSegment } from "@/lib/ecosystem/types";
import { SLUG_TO_PREFIX } from "@/lib/ecosystem/vertical-catalog";

type PulsoSpotlightProps = {
  item: PulsoItem;
  segment?: PulsoRundownSegment | null;
  compact?: boolean;
};

export function PulsoSpotlight({ item, segment, compact = false }: PulsoSpotlightProps) {
  const displayTitle = segment?.title ?? item.title;
  const displaySummary = segment?.summary ?? item.summary;
  const displayCityId = segment?.cityId ?? item.cityId;
  const displayVerticalSlug = segment?.verticalSlug ?? item.verticalSlug;
  const displayVerticalKey = SLUG_TO_PREFIX[displayVerticalSlug];

  const getCityName = (cityId: string) => {
    switch (cityId) {
      case "pi":
        return "Puerto Iguazú · Argentina";
      case "foz":
        return "Foz do Iguaçu · Brasil";
      case "cde":
        return "Ciudad del Este · Paraguay";
      default:
        return "Triple Frontera";
    }
  };

  return (
    <div
      className={`pulso-spotlight-card${compact ? " is-compact" : ""}`}
      aria-labelledby="pulso-spotlight-title"
    >
      {/* Background image & gradient overlay */}
      <div className="pulso-spotlight-card__media">
        <Image
          src={item.image ?? "/images/ecosystem/ecosystem-eventos.webp"}
          alt={item.title}
          fill
          className="pulso-spotlight-card__img"
          sizes="(max-width: 900px) 100vw, 1200px"
          priority
        />
        <div className="pulso-spotlight-card__overlay" />
      </div>

      {/* Content overlay */}
      <div className="pulso-spotlight-card__body">
        <div className="pulso-spotlight-card__tags">
          <span className="pulso-badge-neon">
            {item.badge ?? "RADAR DE LA SEMANA"}
          </span>

          <span className={`pulso-city-pill pulso-city-pill--${displayCityId}`}>
            {getCityName(displayCityId)}
          </span>

          {displayVerticalKey && (
            <span className="pulso-vertical-pill">
              <T k={`nav.${displayVerticalKey}`} />
            </span>
          )}

          {!compact && item.readTime && (
            <span className="pulso-readtime-pill">
              {item.readTime}
            </span>
          )}
        </div>

        <h2 id="pulso-spotlight-title" className="pulso-spotlight-card__title">
          {displayTitle}
        </h2>

        {displaySummary && (
          <p className="pulso-spotlight-card__summary">
            {displaySummary}
          </p>
        )}

        <div className="pulso-spotlight-card__action">
          <TransitionLink
            href={item.href ?? `/${item.verticalSlug}`}
            className="btn btn-green btn-pulse"
          >
            <span>{segment ? "Ver tema del capítulo" : "Explorar en detalle"}</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </TransitionLink>
        </div>
      </div>
    </div>
  );
}
