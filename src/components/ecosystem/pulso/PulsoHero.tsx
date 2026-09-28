"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useI18n } from "@/components/trinexus/providers/I18nProvider";
import { T } from "@/components/trinexus/ui/T";
import type { PulsoEdition } from "@/lib/ecosystem/types";

type PulsoHeroProps = {
  edition: PulsoEdition;
  nextPublishAt: string;
};

export function PulsoHero({ edition, nextPublishAt }: PulsoHeroProps) {
  const { lang } = useI18n();
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: false });

  useEffect(() => {
    if (!nextPublishAt) return;
    const calculateTime = () => {
      const diff = new Date(nextPublishAt).getTime() - Date.now();
      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true });
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setTimeLeft({ days, hours, minutes, seconds, isPast: false });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [nextPublishAt]);

  const formattedNextDate = nextPublishAt
    ? new Intl.DateTimeFormat(lang === "pt" ? "pt-BR" : lang === "en" ? "en" : "es", {
        weekday: "short",
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "America/Argentina/Buenos_Aires",
      }).format(new Date(nextPublishAt))
    : "";

  return (
    <header className="pulso-hero">
      {/* Fondo ambiental con cuadrícula y sismógrafo */}
      <div className="pulso-hero__ambient" aria-hidden="true">
        <div className="pulso-hero__glow" />
        <svg
          className="pulso-hero__ekg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
          fill="none"
        >
          <defs>
            <linearGradient id="ekg-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#2EE59D" stopOpacity="0" />
              <stop offset="25%" stopColor="#2EE59D" stopOpacity="0.4" />
              <stop offset="48%" stopColor="#3EF0D4" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#2EE59D" stopOpacity="1" />
              <stop offset="52%" stopColor="#3EF0D4" stopOpacity="0.8" />
              <stop offset="75%" stopColor="#2EE59D" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#2EE59D" stopOpacity="0" />
            </linearGradient>
          </defs>
          <path
            className="pulso-hero__ekg-line"
            d="M0,60 L280,60 L295,30 L305,95 L315,15 L325,100 L335,60 L540,60 L555,20 L565,105 L575,10 L585,110 L595,60 L850,60 L865,25 L875,100 L885,15 L895,105 L905,60 L1200,60"
            stroke="url(#ekg-gradient)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      <div className="wrap pulso-hero__inner">
        {/* Top bar: Estado & badges */}
        <div className="pulso-hero__topbar">
          <div className="pulso-badge-status">
            <span className="pulso-badge-status__dot" aria-hidden="true" />
            <span className="pulso-badge-status__text">
              STREAM SEMANAL EN DIRECTO · EDICIÓN #{edition.editionNumber ?? 40} · {edition.weekKey}
            </span>
          </div>

          <div className="pulso-hero__cities-tag">
            <span className="pulso-dot pulso-dot--pi" title="Puerto Iguazú" />
            <span className="pulso-dot pulso-dot--foz" title="Foz do Iguaçu" />
            <span className="pulso-dot pulso-dot--cde" title="Ciudad del Este" />
            <span>3 CIUDADES CONECTADAS</span>
          </div>
        </div>

        {/* Contenido principal del Hero en 2 columnas */}
        <div className="pulso-hero__content">
          <div className="pulso-hero__headline-col">
            <h1 className="pulso-hero__title">
              {edition.headline}
            </h1>
            <p className="pulso-hero__lead">
              {edition.lead}
            </p>

            {/* Quick stats de la edición */}
            {edition.stats && (
              <div className="pulso-hero__stats">
                <div className="pulso-stat-chip">
                  <strong>{edition.stats.totalUpdates ?? 12}</strong>
                  <span>novedades</span>
                </div>
                <div className="pulso-stat-chip">
                  <strong>{edition.stats.citiesCount ?? 3}</strong>
                  <span>ciudades</span>
                </div>
                <div className="pulso-stat-chip">
                  <strong>{edition.stats.featuredCount ?? 3}</strong>
                  <span>destacados</span>
                </div>
              </div>
            )}
          </div>

          {/* Columna derecha: Reloj de Cuenta Regresiva & Cápsula Conexa */}
          <div className="pulso-hero__dashboard-col">
            {/* Reloj Digital de Precisión */}
            <div className="pulso-clock-card">
              <div className="pulso-clock-card__header">
                <span className="pulso-clock-card__label">
                  <T k="pulso.schedule.web" />
                </span>
                <span className="pulso-clock-card__date">{formattedNextDate}</span>
              </div>

              {timeLeft.isPast ? (
                <div className="pulso-clock-card__live-now">
                  <span className="pulso-badge-status__dot" />
                  <T k="pulso.schedule.now" />
                </div>
              ) : (
                <div className="pulso-clock-grid" aria-label="Tiempo restante hasta la próxima edición">
                  <div className="pulso-clock-box">
                    <span className="pulso-clock-box__num">{String(timeLeft.days).padStart(2, "0")}</span>
                    <span className="pulso-clock-box__unit">DÍAS</span>
                  </div>
                  <div className="pulso-clock-sep">:</div>
                  <div className="pulso-clock-box">
                    <span className="pulso-clock-box__num">{String(timeLeft.hours).padStart(2, "0")}</span>
                    <span className="pulso-clock-box__unit">HORAS</span>
                  </div>
                  <div className="pulso-clock-sep">:</div>
                  <div className="pulso-clock-box">
                    <span className="pulso-clock-box__num">{String(timeLeft.minutes).padStart(2, "0")}</span>
                    <span className="pulso-clock-box__unit">MIN</span>
                  </div>
                  <div className="pulso-clock-sep">:</div>
                  <div className="pulso-clock-box">
                    <span className="pulso-clock-box__num">{String(timeLeft.seconds).padStart(2, "0")}</span>
                    <span className="pulso-clock-box__unit">SEG</span>
                  </div>
                </div>
              )}
            </div>

            {/* Cápsula de Conexa con quote editorial */}
            {edition.mascotQuote && (
              <div className="pulso-mascot-card">
                <div className="pulso-mascot-card__avatar">
                  <Image
                    src="/images/mascot/conexa-think.webp"
                    alt="Conexa"
                    width={56}
                    height={56}
                    className="pulso-mascot-card__img"
                  />
                </div>
                <div className="pulso-mascot-card__balloon">
                  <span className="pulso-mascot-card__badge">NOTA DE CONEXA</span>
                  <p>{edition.mascotQuote}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
