"use client";

import { ECOSYSTEM_VERTICALS } from "@/lib/ecosystem/verticals";

type PulsoCityRadarProps = {
  currentCity: string;
  currentVertical: string;
  currentWeek: string;
  weekKeys: string[];
  totalItemsCount: number;
  onFilterChange: (filters: { city?: string; vertical?: string; week?: string }) => void;
};

export function PulsoCityRadar({
  currentCity,
  currentVertical,
  currentWeek,
  weekKeys,
  totalItemsCount,
  onFilterChange,
}: PulsoCityRadarProps) {
  const cities = [
    { id: "all", label: "Toda la Frontera", dotClass: "pulso-dot--all" },
    { id: "pi", label: "Puerto Iguazú (AR)", dotClass: "pulso-dot--pi" },
    { id: "foz", label: "Foz do Iguaçu (BR)", dotClass: "pulso-dot--foz" },
    { id: "cde", label: "Ciudad del Este (PY)", dotClass: "pulso-dot--cde" },
  ];

  return (
    <div className="pulso-radar-toolbar">
      {/* Botones de ciudad estilo píldoras de radar */}
      <div className="pulso-radar-tabs" role="tablist" aria-label="Filtro de ciudad">
        {cities.map((city) => {
          const isActive = currentCity === city.id;
          return (
            <button
              key={city.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              className={`pulso-radar-tab ${isActive ? "is-active" : ""}`}
              onClick={() => onFilterChange({ city: city.id })}
            >
              <span className={`pulso-dot ${city.dotClass}`} aria-hidden="true" />
              <span>{city.label}</span>
            </button>
          );
        })}
      </div>

      {/* Selectores secundarios: Vertical y Semana */}
      <div className="pulso-radar-filters">
        <label className="pulso-select-wrap">
          <span className="pulso-select-label">Área:</span>
          <select
            value={currentVertical}
            onChange={(e) => onFilterChange({ vertical: e.target.value })}
            className="pulso-select"
          >
            <option value="all">Todas las áreas</option>
            {ECOSYSTEM_VERTICALS.map((v) => (
              <option key={v.slug} value={v.slug}>
                {v.slug.charAt(0).toUpperCase() + v.slug.slice(1)}
              </option>
            ))}
          </select>
        </label>

        {weekKeys.length > 0 && (
          <label className="pulso-select-wrap">
            <span className="pulso-select-label">Edición:</span>
            <select
              value={currentWeek}
              onChange={(e) => onFilterChange({ week: e.target.value })}
              className="pulso-select"
            >
              {weekKeys.map((w) => (
                <option key={w} value={w}>
                  {w} {w === weekKeys[0] ? "(Actual)" : ""}
                </option>
              ))}
            </select>
          </label>
        )}

        <div className="pulso-radar-count">
          <span>{totalItemsCount}</span> {totalItemsCount === 1 ? "tema en el radar" : "temas en el radar"}
        </div>
      </div>
    </div>
  );
}
