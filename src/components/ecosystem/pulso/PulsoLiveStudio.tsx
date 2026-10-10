"use client";

import { useI18n } from "@/components/trinexus/providers/I18nProvider";
import { T } from "@/components/trinexus/ui/T";

type PulsoLiveStudioProps = {
  liveSessionAt: string | null;
  liveEmbedUrl: string | null;
  onNotifyClick?: () => void;
};

export function PulsoLiveStudio({
  liveSessionAt,
  liveEmbedUrl,
  onNotifyClick,
}: PulsoLiveStudioProps) {
  const { lang } = useI18n();

  const formattedLiveDate = liveSessionAt
    ? new Intl.DateTimeFormat(lang === "pt" ? "pt-BR" : lang === "en" ? "en" : "es", {
        dateStyle: "full",
        timeStyle: "short",
        timeZone: "America/Argentina/Buenos_Aires",
      }).format(new Date(liveSessionAt))
    : null;

  return (
    <section className="pulso-live-section" aria-labelledby="pulso-live-title">
      <div className="pulso-live-card">
        {/* Cabecera del estudio con ecualizador */}
        <div className="pulso-live-card__header">
          <div className="pulso-live-card__badge">
            <span className="pulso-live-dot" />
            <span>ESTUDIO PULSO LIVE</span>
          </div>

          <div className="pulso-equalizer" aria-hidden="true">
            <span className="pulso-eq-bar bar-1" />
            <span className="pulso-eq-bar bar-2" />
            <span className="pulso-eq-bar bar-3" />
            <span className="pulso-eq-bar bar-4" />
            <span className="pulso-eq-bar bar-5" />
            <span className="pulso-eq-bar bar-6" />
          </div>
        </div>

        <div className="pulso-live-card__body">
          <div className="pulso-live-card__info">
            <h2 id="pulso-live-title" className="pulso-live-card__title">
              {liveSessionAt ? "Sesión en vivo programada" : <T k="pulso.live.soon" />}
            </h2>
            <p className="pulso-live-card__desc">
              {liveSessionAt && formattedLiveDate
                ? `Transmisión fijada para el ${formattedLiveDate} (Hora de la Triple Frontera).`
                : <T k="pulso.live.lead" />}
            </p>
          </div>

          <div className="pulso-live-card__actions">
            {liveEmbedUrl ? (
              <a
                href={liveEmbedUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-green btn-pulse"
              >
                <span>Entrar a la sesión</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </a>
            ) : (
              <button
                type="button"
                onClick={onNotifyClick}
                className="btn btn-outline-cyan"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                <span>Avisarme cuando empiece</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
