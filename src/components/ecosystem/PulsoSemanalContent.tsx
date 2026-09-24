"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { FilterBar } from "@/components/ecosystem/FilterBar";
import { PulsoTicker } from "@/components/ecosystem/PulsoTicker";
import { useI18n } from "@/components/trinexus/providers/I18nProvider";
import { T } from "@/components/trinexus/ui/T";
import { getCategoryOptionsForVertical } from "@/lib/ecosystem/pulso";
import { CITY_FILTER_OPTIONS } from "@/lib/ecosystem/vertical-catalog";
import type { PulsoItem } from "@/lib/ecosystem/types";
import { SLUG_TO_PREFIX } from "@/lib/ecosystem/vertical-catalog";
import { ECOSYSTEM_VERTICALS } from "@/lib/ecosystem/verticals";
import { toast } from "sonner";

type PreviewResponse = {
  items: PulsoItem[];
  nextPublishAt: string;
  liveSessionAt: string | null;
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
  initialCategory = "all",
  initialWeek,
  onFiltersChange,
}: PulsoSemanalContentProps) {
  const { t, lang } = useI18n();
  const [vertical, setVertical] = useState(initialVertical);
  const [city, setCity] = useState(initialCity);
  const [category, setCategory] = useState(initialCategory);
  const [week, setWeek] = useState(initialWeek ?? "");
  const [preview, setPreview] = useState<PreviewResponse | null>(null);
  const [countdown, setCountdown] = useState("");

  const fetchPreview = useCallback(async () => {
    const params = new URLSearchParams({
      vertical,
      city,
      category,
    });
    if (week) params.set("week", week);
    const res = await fetch(`/api/pulso/preview?${params}`);
    const data = await res.json();
    setPreview(data);
    if (!week && data.weekKeys?.[0]) setWeek(data.weekKeys[0]);
  }, [vertical, city, category, week]);

  useEffect(() => {
    fetchPreview().catch(() => {});
  }, [fetchPreview]);

  useEffect(() => {
    if (!preview?.nextPublishAt) return;
    const tick = () => {
      const diff = new Date(preview.nextPublishAt).getTime() - Date.now();
      if (diff <= 0) {
        setCountdown(String(t("pulso.schedule.now")));
        return;
      }
      const h = Math.floor(diff / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setCountdown(`${h}h ${m}m ${s}s`);
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [preview?.nextPublishAt, t]);

  const categoryOptions = useMemo(() => {
    const opts = getCategoryOptionsForVertical(vertical);
    return opts.map((o) => ({
      value: o.value,
      labelKey: o.value === "all" ? "filter.all" : "",
      label: o.value === "all" ? undefined : o.label,
    }));
  }, [vertical]);

  const syncFilters = (next: Record<string, string>) => {
    onFiltersChange?.(next);
  };

  const nextPublishLabel = preview?.nextPublishAt
    ? new Intl.DateTimeFormat(lang === "pt" ? "pt-BR" : lang === "en" ? "en" : "es", {
        dateStyle: "full",
        timeStyle: "short",
        timeZone: "America/Argentina/Buenos_Aires",
      }).format(new Date(preview.nextPublishAt))
    : "";

  async function subscribe(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/pulso/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: fd.get("email"),
        notifyLive: fd.get("notifyLive") === "on",
      }),
    });
    const data = await res.json();
    if (data.ok) {
      toast.success(String(t(data.created ? "pulso.subscribed" : "pulso.exists")));
      e.currentTarget.reset();
    } else {
      toast.error(String(t("err.email")));
    }
  }

  return (
    <div className="pulso-panel">
      <div className="pulso-schedule">
        <div className="pulso-schedule__block">
          <h3><T k="pulso.schedule.web" /></h3>
          <p className="pulso-schedule__when">{nextPublishLabel}</p>
          <p className="pulso-schedule__countdown" aria-live="polite">
            <T k="pulso.schedule.countdown" />: <strong>{countdown}</strong>
          </p>
        </div>
        <div className="pulso-schedule__block pulso-schedule__block--live">
          <h3><T k="pulso.live.soon" /></h3>
          <p><T k="pulso.live.lead" /></p>
        </div>
      </div>

      <FilterBar
        filters={[
          {
            id: "week",
            labelKey: "pulso.filters.week",
            value: week,
            onChange: (v) => {
              setWeek(v);
              syncFilters({ vertical, city, category, week: v });
            },
            options: (preview?.weekKeys ?? []).map((k) => ({
              value: k,
              labelKey: "filter.all",
              label: k,
            })),
          },
          {
            id: "vertical",
            labelKey: "pulso.filters.vertical",
            value: vertical,
            onChange: (v) => {
              setVertical(v);
              setCategory("all");
              syncFilters({ vertical: v, city, category: "all", week });
            },
            options: [
              { value: "all", labelKey: "filter.all" },
              ...ECOSYSTEM_VERTICALS.map((v) => ({
                value: v.slug,
                labelKey: v.navKey,
              })),
            ],
          },
          {
            id: "city",
            labelKey: "filter.city",
            value: city,
            onChange: (v) => {
              setCity(v);
              syncFilters({ vertical, city: v, category, week });
            },
            options: [...CITY_FILTER_OPTIONS],
          },
          {
            id: "category",
            labelKey: "filter.category",
            value: category,
            onChange: (v) => {
              setCategory(v);
              syncFilters({ vertical, city, category: v, week });
            },
            options: categoryOptions,
          },
        ]}
      />

      {preview ? <PulsoTicker items={preview.items} /> : null}

      <ul className="pulso-feed" aria-label="Novedades de la semana">
        {preview?.items.map((item) => (
          <li key={item.id} className="pulso-feed__item">
            <span className="pulso-feed__kind">{item.kind}</span>
            <strong>{item.title}</strong>
            <span className="pulso-feed__meta">
              <T k={`nav.${SLUG_TO_PREFIX[item.verticalSlug]}`} />
              {" · "}
              <T k={`city.${item.cityId}.b`} />
            </span>
          </li>
        ))}
      </ul>

      <section className="pulso-subscribe panfleto-section">
        <h3><T k="pulso.subscribe.h" /></h3>
        <p><T k="pulso.subscribe.lead" /></p>
        <form className="eco-form" onSubmit={subscribe}>
          <label>
            <T k="panfleto.email" />
            <input
              name="email"
              type="email"
              autoComplete="email"
              spellCheck={false}
              required
              placeholder="tu@email.com…"
            />
          </label>
          <label className="pulso-subscribe__live">
            <input name="notifyLive" type="checkbox" />
            <T k="pulso.subscribe.live" />
          </label>
          <button type="submit" className="btn btn-green btn-sm">
            <T k="pulso.subscribe.btn" />
          </button>
        </form>
      </section>
    </div>
  );
}
