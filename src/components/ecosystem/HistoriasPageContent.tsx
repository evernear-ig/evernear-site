"use client";

import { useCallback, useMemo, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { ConnectionStoryCard } from "@/components/ecosystem/ConnectionStoryCard";
import { PulsoSemanalContent } from "@/components/ecosystem/PulsoSemanalContent";
import { StoryMedia } from "@/components/ecosystem/StoryMedia";
import { useI18n } from "@/components/trinexus/providers/I18nProvider";
import { T } from "@/components/trinexus/ui/T";
import { CONNECTION_STORIES } from "@/data/stories";
import { ECOSYSTEM_VERTICALS } from "@/lib/ecosystem/verticals";
import { CITY_FILTER_OPTIONS } from "@/lib/ecosystem/vertical-catalog";
import { toast } from "sonner";

type Tab = "historias" | "pulso";

export function HistoriasPageContent() {
  const { t } = useI18n();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const tab: Tab = searchParams.get("tab") === "pulso" ? "pulso" : "historias";

  const setTab = useCallback(
    (next: Tab) => {
      const params = new URLSearchParams(searchParams.toString());
      if (next === "pulso") params.set("tab", "pulso");
      else params.delete("tab");
      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  const featured = useMemo(
    () => CONNECTION_STORIES.find((s) => s.featured) ?? CONNECTION_STORIES[0],
    []
  );
  const rest = useMemo(
    () => CONNECTION_STORIES.filter((s) => s.id !== featured?.id),
    [featured]
  );

  async function submitStory(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/historias/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: fd.get("name"),
        email: fd.get("email"),
        story: fd.get("story"),
        connectedWith: fd.get("connectedWith"),
        achievement: fd.get("achievement"),
        verticalSlug: fd.get("verticalSlug"),
        cityId: fd.get("cityId"),
      }),
    });
    const data = await res.json();
    if (data.ok) {
      toast.success(String(t("stories.form.ok")));
      e.currentTarget.reset();
    } else {
      toast.error(String(t("stories.form.error")));
    }
  }

  const onPulsoFiltersChange = (filters: Record<string, string>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", "pulso");
    Object.entries(filters).forEach(([k, v]) => {
      if (v && v !== "all") params.set(k, v);
      else params.delete(k);
    });
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <>
      <section className="dark historias-hero">
        <div className="wrap historias-hero__grid">
          <div className="historias-hero__copy">
            <h1 className="h-xl">
              <T k="stories.hero.h" />
            </h1>
            <p className="lead">
              <T k="stories.hero.lead" />
            </p>
          </div>
          <StoryMedia
            posterSrc="/images/ecosystem/ecosystem-descubrimiento.webp"
            alt="Personas conectando en la Triple Frontera"
            aspect="landscape"
            priority
            className="historias-hero__media"
          />
        </div>
      </section>

      <section className="light historias-body">
        <div className="wrap">
          <div className="historias-tabs" role="tablist" aria-label="Secciones de historias">
            <button
              type="button"
              role="tab"
              id="tab-historias"
              aria-selected={tab === "historias"}
              aria-controls="panel-historias"
              className={`historias-tab${tab === "historias" ? " is-active" : ""}`}
              onClick={() => setTab("historias")}
            >
              <T k="nav.stories" />
            </button>
            <button
              type="button"
              role="tab"
              id="tab-pulso"
              aria-selected={tab === "pulso"}
              aria-controls="panel-pulso"
              className={`historias-tab${tab === "pulso" ? " is-active" : ""}`}
              onClick={() => setTab("pulso")}
            >
              <T k="nav.pulso" />
            </button>
          </div>

          {tab === "historias" ? (
            <div
              id="panel-historias"
              role="tabpanel"
              aria-labelledby="tab-historias"
              className="historias-panel"
            >
              {featured ? (
                <ConnectionStoryCard story={featured} variant="featured" />
              ) : null}
              <div className="historias-grid">
                {rest.slice(0, 2).map((story) => (
                  <ConnectionStoryCard key={story.id} story={story} />
                ))}
              </div>
              {rest[2] ? (
                <ConnectionStoryCard story={rest[2]} variant="wide" />
              ) : null}
              {rest.slice(3).map((story) => (
                <ConnectionStoryCard key={story.id} story={story} />
              ))}

              <section className="historias-form panfleto-section">
                <h2><T k="stories.form.h" /></h2>
                <p><T k="stories.form.lead" /></p>
                <form className="eco-form historias-form__grid" onSubmit={submitStory}>
                  <label>
                    <T k="stories.form.name" />
                    <input name="name" autoComplete="name" required />
                  </label>
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
                  <label className="historias-form__full">
                    <T k="stories.form.story" />
                    <textarea name="story" rows={4} required />
                  </label>
                  <label>
                    <T k="stories.form.connected" />
                    <input name="connectedWith" required />
                  </label>
                  <label>
                    <T k="stories.form.achievement" />
                    <input name="achievement" required />
                  </label>
                  <label>
                    <T k="pulso.filters.vertical" />
                    <select name="verticalSlug" defaultValue="descubrimiento">
                      {ECOSYSTEM_VERTICALS.map((v) => (
                        <option key={v.slug} value={v.slug}>
                          {String(t(v.navKey))}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label>
                    <T k="filter.city" />
                    <select name="cityId" defaultValue="pi">
                      {CITY_FILTER_OPTIONS.filter((c) => c.value !== "all").map(
                        (c) => (
                          <option key={c.value} value={c.value}>
                            {String(t(c.labelKey))}
                          </option>
                        )
                      )}
                    </select>
                  </label>
                  <div className="historias-form__full">
                    <button type="submit" className="btn btn-green btn-sm">
                      <T k="stories.form.submit" />
                    </button>
                  </div>
                </form>
              </section>
            </div>
          ) : (
            <div
              id="panel-pulso"
              role="tabpanel"
              aria-labelledby="tab-pulso"
              className="historias-panel"
            >
              <PulsoSemanalContent
                initialVertical={searchParams.get("vertical") ?? "all"}
                initialCity={searchParams.get("city") ?? "all"}
                initialCategory={searchParams.get("category") ?? "all"}
                initialWeek={searchParams.get("week") ?? undefined}
                onFiltersChange={onPulsoFiltersChange}
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
