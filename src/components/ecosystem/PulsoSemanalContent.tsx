"use client";

import { useCallback, useEffect, useState } from "react";
import { PulsoCityRadar } from "@/components/ecosystem/pulso/PulsoCityRadar";
import { PulsoHero } from "@/components/ecosystem/pulso/PulsoHero";
import { PulsoPassport } from "@/components/ecosystem/pulso/PulsoPassport";
import { PulsoRundown } from "@/components/ecosystem/pulso/PulsoRundown";
import { PulsoSpotlight } from "@/components/ecosystem/pulso/PulsoSpotlight";
import { PulsoStreamPlayer } from "@/components/ecosystem/pulso/PulsoStreamPlayer";
import { PulsoTicker } from "@/components/ecosystem/pulso/PulsoTicker";
import { PulsoVods } from "@/components/ecosystem/pulso/PulsoVods";
import { getPulsoEdition } from "@/lib/ecosystem/pulso";
import type { PulsoEdition, PulsoItem, PulsoRundownSegment } from "@/lib/ecosystem/types";

type PreviewResponse = {
  items: PulsoItem[];
  edition?: PulsoEdition;
  nextPublishAt: string;
  liveSessionAt: string | null;
  liveEmbedUrl: string | null;
  weekKeys: string[];
};

type PulsoSemanalContentProps = {
  initialVertical?: string;
  initialCity?: string;
  initialCategory?: string;
  initialWeek?: string;
  onFiltersChange?: (filters: Record<string, string>) => void;
};

export function PulsoSemanalContent({
  initialVertical = "all",
  initialCity = "all",
  initialWeek,
  onFiltersChange,
}: PulsoSemanalContentProps) {
  const [vertical, setVertical] = useState(initialVertical);
  const [city, setCity] = useState(initialCity);
  const [week, setWeek] = useState(initialWeek ?? "2026-W40");
  const [preview, setPreview] = useState<PreviewResponse | null>(null);
  const [activeSegment, setActiveSegment] = useState<PulsoRundownSegment | null>(null);

  const fetchPreview = useCallback(async () => {
    const params = new URLSearchParams({
      vertical,
      city,
    });
    if (week) params.set("week", week);
    const res = await fetch(`/api/pulso/preview?${params}`);
    const data: PreviewResponse = await res.json();
    setPreview(data);
    if (!week && data.weekKeys?.[0]) setWeek(data.weekKeys[0]);
  }, [vertical, city, week]);

  useEffect(() => {
    fetchPreview().catch(() => {});
  }, [fetchPreview]);

  const handleFilterChange = (next: { city?: string; vertical?: string; week?: string }) => {
    const nextCity = next.city !== undefined ? next.city : city;
    const nextVertical = next.vertical !== undefined ? next.vertical : vertical;
    const nextWeek = next.week !== undefined ? next.week : week;

    if (next.city !== undefined) setCity(next.city);
    if (next.vertical !== undefined) setVertical(next.vertical);
    if (next.week !== undefined) setWeek(next.week);

    onFiltersChange?.({
      city: nextCity,
      vertical: nextVertical,
      week: nextWeek,
    });
  };

  const handleSelectSegment = (segment: PulsoRundownSegment) => {
    setActiveSegment(segment);
  };

  const edition = preview?.edition ?? getPulsoEdition(week);
  const items = preview?.items ?? [];

  // Portada destacada: si hay un segmento activo con itemId, prioriza ese item; de lo contrario coverItemId o primer item
  const selectedSegmentItem = activeSegment?.itemId
    ? items.find((i) => i.id === activeSegment.itemId)
    : null;

  const coverItem =
    selectedSegmentItem ??
    items.find((i) => i.id === edition.coverItemId) ??
    items.find((i) => Boolean(i.image)) ??
    items[0];

  return (
    <div className="pulso-container">
      {/* 1. Hero con información y cuenta regresiva de la transmisión */}
      <PulsoHero
        edition={edition}
        nextPublishAt={preview?.nextPublishAt ?? ""}
      />

      {/* 2. Reproductor Central de Streaming (En vivo o Replay) */}
      <PulsoStreamPlayer
        edition={edition}
        activeSegment={activeSegment}
        onSelectSegment={handleSelectSegment}
      />

      {/* 3. Breaking Ticker continuo */}
      <PulsoTicker items={items} />

      {/* 4. Cobertura unificada: Radar de ciudades, Escaleta del stream, Tema Central y Novedades */}
      <section id="pulso-radar" className="pulso-feed-section" aria-label="Cobertura y capítulos de la emisión">
        <div className="wrap">
          {/* Cabecera unificada de la sección */}
          <div className="pulso-feed-header">
            <div className="pulso-badge-status">
              <span className="pulso-badge-status__dot" />
              <span>COBERTURA DE LA EMISIÓN · RADAR & CAPÍTULOS</span>
            </div>
            <h2 className="pulso-feed-title">
              Cobertura y temas de la emisión
            </h2>
            <p className="pulso-feed-lead">
              Seguí los temas del streaming por capítulos con sus marcas de tiempo y explorá el foco de cada discusión en la Triple Frontera.
            </p>
          </div>

          {/* Barra de radar y filtros por ciudad */}
          <PulsoCityRadar
            currentCity={city}
            currentVertical={vertical}
            currentWeek={week}
            weekKeys={preview?.weekKeys ?? []}
            totalItemsCount={items.length}
            onFilterChange={handleFilterChange}
          />

          {/* Bloque superior integrado: Escaleta del programa + Tema Central */}
          <div className="pulso-feed-lead-block">
            <div className="pulso-stream-breakdown-grid">
              <div className="pulso-breakdown-col-header">
                <div className="pulso-rundown-badge">
                  <span className="pulso-rundown-dot" />
                  <span>ESCALETA DEL PROGRAMA · CAPÍTULOS</span>
                </div>
                <span className="pulso-rundown-hint">Hacé clic en un bloque para saltar al tema</span>
              </div>

              <span className="pulso-breakdown-col-header pulso-breakdown-col-header--spotlight">
                {activeSegment
                  ? `TEMA SELECCIONADO · ${activeSegment.timestamp}`
                  : "TEMA CENTRAL DE LA TRANSMISIÓN"}
              </span>

              <PulsoRundown
                rundown={edition.rundown}
                activeSegment={activeSegment}
                onSelectSegment={handleSelectSegment}
                filterCity={city}
                showHeader={false}
              />

              {coverItem && (
                <div className="pulso-rundown-spotlight-col">
                  <PulsoSpotlight item={coverItem} segment={activeSegment} compact />
                </div>
              )}
            </div>
          </div>

          {/* Repeticiones y VODs de programas pasados */}
          <PulsoVods
            currentWeek={week}
            onSelectWeek={(selectedWeek) => handleFilterChange({ week: selectedWeek })}
          />
        </div>
      </section>

      {/* 7. Pasaporte y alerta para el próximo stream */}
      <PulsoPassport />
    </div>
  );
}
