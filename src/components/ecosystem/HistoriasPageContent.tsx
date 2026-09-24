"use client";

import { useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { PulsoSemanalContent } from "@/components/ecosystem/PulsoSemanalContent";
import { StoryReelsStrip } from "@/components/ecosystem/StoryReelsStrip";
import { StorySubmitForm } from "@/components/ecosystem/StorySubmitForm";
import { T } from "@/components/trinexus/ui/T";
import { CONNECTION_STORIES } from "@/data/stories";

type Tab = "historias" | "pulso";

export function HistoriasPageContent() {
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
      <section className="dark historias-hero historias-hero--compact">
        <div className="wrap historias-hero__copy">
          <h1 className="h-xl">
            <T k="stories.hero.h" />
          </h1>
          <p className="lead">
            <T k="stories.hero.lead" />
          </p>
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
              <StoryReelsStrip stories={CONNECTION_STORIES} />
              <StorySubmitForm />
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
