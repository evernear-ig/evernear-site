"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { TransitionLink } from "@/components/evernear/ui/TransitionLink";
import { T } from "@/components/evernear/ui/T";
import type { PulsoItem } from "@/lib/ecosystem/types";
import { SLUG_TO_PREFIX } from "@/lib/ecosystem/vertical-catalog";

type PulsoBentoGridProps = {
  items: PulsoItem[];
  coverItemId?: string;
  activeItemId?: string | null;
};

export function PulsoBentoGrid({ items, coverItemId, activeItemId }: PulsoBentoGridProps) {
  const [showAll, setShowAll] = useState(false);
  const INITIAL_LIMIT = 6;

  // Si hay coverItemId y más de 1 ítem, no repetimos el cover en la grilla para que tenga protagonismo exclusivo
  const gridItems = items.filter((item) => item.id !== coverItemId);
  const displayItems = gridItems.length > 0 ? gridItems : items;

  // Si se selecciona un capítulo de la escaleta cuyo ítem está oculto, expandimos automáticamente la grilla
  useEffect(() => {
    if (activeItemId) {
      const targetIndex = displayItems.findIndex((it) => it.id === activeItemId);
      if (targetIndex >= INITIAL_LIMIT) {
        setShowAll(true);
      }
    }
  }, [activeItemId, displayItems]);

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

  const visibleItems =
    showAll || displayItems.length <= INITIAL_LIMIT
      ? displayItems
      : displayItems.slice(0, INITIAL_LIMIT);

  const remainingCount = displayItems.length - INITIAL_LIMIT;

  return (
    <div className="pulso-bento-container">
      <div className="pulso-bento-grid">
        {visibleItems.map((item, index) => {
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

      {displayItems.length > INITIAL_LIMIT && (
        <div className="pulso-bento-more-wrap">
          <button
            type="button"
            className="pulso-bento-more-btn"
            onClick={() => setShowAll((prev) => !prev)}
            aria-expanded={showAll}
          >
            <span>
              {showAll
                ? "Mostrar menos novedades"
                : `Ver ${remainingCount} novedades más de esta edición`}
            </span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`pulso-bento-more-arrow ${showAll ? "is-open" : ""}`}
              aria-hidden="true"
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
