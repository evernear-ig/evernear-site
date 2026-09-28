"use client";

import Image from "next/image";
import { TransitionLink } from "@/components/trinexus/ui/TransitionLink";
import { T } from "@/components/trinexus/ui/T";
import type { PulsoItem } from "@/lib/ecosystem/types";
import { SLUG_TO_PREFIX } from "@/lib/ecosystem/vertical-catalog";

type PulsoBentoGridProps = {
  items: PulsoItem[];
  coverItemId?: string;
  activeItemId?: string | null;
};

export function PulsoBentoGrid({ items, coverItemId, activeItemId }: PulsoBentoGridProps) {
  // Si hay coverItemId y más de 1 ítem, no repetimos el cover en la grilla para que tenga protagonismo exclusivo
  const gridItems = items.filter((item) => item.id !== coverItemId);
  const displayItems = gridItems.length > 0 ? gridItems : items;

  if (displayItems.length === 0) {
    return (
      <div className="pulso-empty-box">
        <div className="pulso-empty-box__icon">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <circle cx="12" cy="12" r="10" />
            <line x1="8" y1="12" x2="16" y2="12" />
          </svg>
        </div>
        <h3 className="pulso-empty-box__title">Sin novedades para este filtro</h3>
        <p className="pulso-empty-box__text">
          No hay publicaciones registradas para los filtros seleccionados en esta semana.
          Probá seleccionando "Toda la Frontera" o explorando otra área.
        </p>
      </div>
    );
  }

  const getCityLabel = (cityId: string) => {
    switch (cityId) {
      case "pi":
        return "Puerto Iguazú";
      case "foz":
        return "Foz do Iguaçu";
      case "cde":
        return "Ciudad del Este";
      default:
        return "Frontera";
    }
  };

  return (
    <div className="pulso-bento-grid">
      {displayItems.map((item, index) => {
        const verticalKey = SLUG_TO_PREFIX[item.verticalSlug];
        const isFeaturedCard = index % 5 === 0 && Boolean(item.image);
        const isHighlighted = activeItemId === item.id;

        return (
          <article
            key={item.id}
            id={`news-${item.id}`}
            className={`pulso-card ${isFeaturedCard ? "pulso-card--featured" : ""} ${
              isHighlighted ? "is-highlighted" : ""
            } ${item.image ? "has-image" : "no-image"}`}
          >
            {item.image && (
              <div className="pulso-card__media">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="pulso-card__img"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="pulso-card__media-overlay" />
                {item.badge && (
                  <span className="pulso-card__floating-badge">
                    {item.badge}
                  </span>
                )}
              </div>
            )}

            <div className="pulso-card__body">
              <div className="pulso-card__meta">
                <span className={`pulso-mini-city pulso-mini-city--${item.cityId}`}>
                  <span className={`pulso-dot pulso-dot--${item.cityId}`} />
                  {getCityLabel(item.cityId)}
                </span>

                {verticalKey && (
                  <span className="pulso-card__vertical">
                    <T k={`nav.${verticalKey}`} />
                  </span>
                )}

                {!item.image && item.badge && (
                  <span className="pulso-card__badge-inline">
                    {item.badge}
                  </span>
                )}
              </div>

              <h3 className="pulso-card__title">
                {item.href ? (
                  <TransitionLink href={item.href} className="pulso-card__title-link">
                    {item.title}
                  </TransitionLink>
                ) : (
                  item.title
                )}
              </h3>

              {item.summary && (
                <p className="pulso-card__summary">
                  {item.summary}
                </p>
              )}

              <div className="pulso-card__footer">
                <span className="pulso-card__kind-tag">
                  {item.kind}
                </span>

                {item.readTime && (
                  <span className="pulso-card__read-time">
                    {item.readTime}
                  </span>
                )}

                {item.href && (
                  <TransitionLink href={item.href} className="pulso-card__arrow-btn" aria-label="Ver novedad">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </TransitionLink>
                )}
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
