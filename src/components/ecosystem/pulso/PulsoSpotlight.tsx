"use client";

import Image from "next/image";
import { TransitionLink } from "@/components/trinexus/ui/TransitionLink";
import { T } from "@/components/trinexus/ui/T";
import type { PulsoItem } from "@/lib/ecosystem/types";
import { SLUG_TO_PREFIX } from "@/lib/ecosystem/vertical-catalog";

type PulsoSpotlightProps = {
  item: PulsoItem;
};

export function PulsoSpotlight({ item }: PulsoSpotlightProps) {
  const verticalKey = SLUG_TO_PREFIX[item.verticalSlug];

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
    <div className="pulso-spotlight-card" aria-labelledby="pulso-spotlight-title">
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

          <span className={`pulso-city-pill pulso-city-pill--${item.cityId}`}>
            {getCityName(item.cityId)}
          </span>

          {verticalKey && (
            <span className="pulso-vertical-pill">
              <T k={`nav.${verticalKey}`} />
            </span>
          )}

          {item.readTime && (
            <span className="pulso-readtime-pill">
              {item.readTime}
            </span>
          )}
        </div>

        <h2 id="pulso-spotlight-title" className="pulso-spotlight-card__title">
          {item.title}
        </h2>

        {item.summary && (
          <p className="pulso-spotlight-card__summary">
            {item.summary}
          </p>
        )}

        <div className="pulso-spotlight-card__action">
          <TransitionLink
            href={item.href ?? `/${item.verticalSlug}`}
            className="btn btn-green btn-pulse"
          >
            <span>Explorar en detalle</span>
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
