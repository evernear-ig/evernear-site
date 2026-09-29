"use client";

import { T } from "@/components/trinexus/ui/T";
import type { PulsoRundownSegment } from "@/lib/ecosystem/types";
import { SLUG_TO_PREFIX } from "@/lib/ecosystem/vertical-catalog";

type PulsoRundownProps = {
  rundown?: PulsoRundownSegment[];
  activeSegment?: PulsoRundownSegment | null;
  onSelectSegment: (segment: PulsoRundownSegment) => void;
  filterCity?: string;
  showHeader?: boolean;
};

export function PulsoRundown({
  rundown = [],
  activeSegment,
  onSelectSegment,
  filterCity,
  showHeader = true,
}: PulsoRundownProps) {
  if (rundown.length === 0) return null;

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
    <div className="pulso-rundown-box" aria-label="Escaleta del programa">
      {showHeader && (
        <div className="pulso-rundown-box__header">
          <div className="pulso-rundown-badge">
            <span className="pulso-rundown-dot" />
            <span>ESCALETA DEL PROGRAMA · CAPÍTULOS</span>
          </div>
          <span className="pulso-rundown-hint">Hacé clic en un bloque para saltar al tema</span>
        </div>
      )}

      <div className="pulso-rundown-list">
        {rundown.map((seg, idx) => {
          const isActive = activeSegment?.timestamp === seg.timestamp;
          const isCityMatch = !filterCity || filterCity === "all" || seg.cityId === filterCity;
          const verticalKey = SLUG_TO_PREFIX[seg.verticalSlug];

          return (
            <button
              key={`${seg.timestamp}-${idx}`}
              type="button"
              className={`pulso-rundown-item ${isActive ? "is-active" : ""} ${
                isCityMatch ? "is-city-match" : "is-city-dimmed"
              }`}
              onClick={() => onSelectSegment(seg)}
            >
              <span className="pulso-rundown-time">{seg.timestamp}</span>

              <div className="pulso-rundown-content">
                <div className="pulso-rundown-meta">
                  <span className={`pulso-mini-city pulso-mini-city--${seg.cityId}`}>
                    <span className={`pulso-dot pulso-dot--${seg.cityId}`} />
                    {getCityLabel(seg.cityId)}
                  </span>
                  {verticalKey && (
                    <span className="pulso-rundown-vertical">
                      · <T k={`nav.${verticalKey}`} />
                    </span>
                  )}
                </div>
                <h4 className="pulso-rundown-title">{seg.title}</h4>
                {seg.summary && <p className="pulso-rundown-summary">{seg.summary}</p>}
              </div>

              <div className="pulso-rundown-action" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
