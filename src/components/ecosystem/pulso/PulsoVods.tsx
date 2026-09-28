"use client";

import Image from "next/image";
import { PULSO_EDITIONS } from "@/data/pulso-editions";

type PulsoVodsProps = {
  currentWeek: string;
  onSelectWeek: (week: string) => void;
};

export function PulsoVods({ currentWeek, onSelectWeek }: PulsoVodsProps) {
  const editions = Object.values(PULSO_EDITIONS);

  return (
    <section className="pulso-vods-section" aria-labelledby="pulso-vods-title">
      <div className="pulso-vods-head">
        <div className="pulso-badge-status">
          <span className="pulso-badge-status__dot" />
          <span>ARCHIVO DE PROGRAMAS</span>
        </div>
        <h2 id="pulso-vods-title" className="pulso-vods-title">
          Transmisiones Anteriores & Repeticiones
        </h2>
        <p className="pulso-vods-lead">
          Reviví los programas emitidos en semanas anteriores con la cobertura completa de novedades.
        </p>
      </div>

      <div className="pulso-vods-grid">
        {editions.map((ed) => {
          const isSelected = ed.weekKey === currentWeek;

          return (
            <article
              key={ed.weekKey}
              className={`pulso-vod-card ${isSelected ? "is-selected" : ""}`}
            >
              <div className="pulso-vod-card__media">
                <Image
                  src={ed.streamThumbnail ?? "/images/ecosystem/ecosystem-hero-index.webp"}
                  alt={ed.headline}
                  fill
                  className="pulso-vod-card__img"
                  sizes="(max-width: 768px) 100vw, 360px"
                />
                <div className="pulso-vod-card__overlay" />

                <span className="pulso-vod-card__duration">
                  {ed.streamDuration ?? "30:00"}
                </span>

                <span className="pulso-vod-card__edition-tag">
                  EDICIÓN #{ed.editionNumber} · {ed.weekKey}
                </span>

                <button
                  type="button"
                  onClick={() => onSelectWeek(ed.weekKey)}
                  className="pulso-vod-card__play-btn"
                  aria-label={`Ver programa ${ed.weekKey}`}
                >
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </button>
              </div>

              <div className="pulso-vod-card__body">
                <h3 className="pulso-vod-card__title">
                  {ed.headline}
                </h3>
                <p className="pulso-vod-card__lead">
                  {ed.lead}
                </p>

                <div className="pulso-vod-card__footer">
                  <span className="pulso-vod-card__stats">
                    {ed.stats?.totalUpdates ?? 10} novedades tratadas
                  </span>

                  <button
                    type="button"
                    onClick={() => {
                      onSelectWeek(ed.weekKey);
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className={`btn btn-sm ${isSelected ? "btn-green" : "btn-outline-cyan"}`}
                  >
                    {isSelected ? "Viendo ahora" : "Cargar emisión"}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
