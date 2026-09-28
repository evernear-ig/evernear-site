"use client";

import { useCallback, useEffect, useState } from "react";
import { PulsoBentoGrid } from "@/components/ecosystem/pulso/PulsoBentoGrid";
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
  const [week, setWeek] = useState(initialWeek ?? "");
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
    if (segment.itemId) {
      const el = document.getElementById(`news-${segment.itemId}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  const edition = preview?.edition ?? getPulsoEdition(week);
  const items = preview?.items ?? [];

  // Portada destacada: busca por coverItemId, o toma el primer elemento con imagen
  const coverItem =
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

      {/* 4. Escaleta del Stream y Tema de Portada */}
      <section className="pulso-rundown-section">
        <div className="wrap">
          <div className="pulso-stream-breakdown-grid">
            <PulsoRundown
              rundown={edition.rundown}
              activeSegment={activeSegment}
              onSelectSegment={handleSelectSegment}
            />

            {coverItem && (
              <div className="pulso-rundown-spotlight-col">
                <span className="pulso-rundown-spotlight-label">TEMA CENTRAL DE LA TRANSMISIÓN</span>
                <PulsoSpotlight item={coverItem} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. Novedades completas tratadas en la emisión con radar de ciudades */}
      <section className="pulso-feed-section" aria-label="Novedades tratadas en la emisión">
        <div className="wrap">
          <div className="pulso-feed-header">
            <h2 className="pulso-feed-title">
              Novedades revisadas en esta emisión
            </h2>
            <p className="pulso-feed-lead">
              Explorá las oportunidades, eventos y proyectos mencionados durante la transmisión semanal.
            </p>
          </div>

          <PulsoCityRadar
            currentCity={city}
            currentVertical={vertical}
            currentWeek={week}
            weekKeys={preview?.weekKeys ?? []}
            totalItemsCount={items.length}
            onFilterChange={handleFilterChange}
          />

          <PulsoBentoGrid
            items={items}
            coverItemId={coverItem?.id}
            activeItemId={activeSegment?.itemId}
          />

          {/* 6. Repeticiones y VODs de programas pasados */}
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
