"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { OPPORTUNITIES, PROFILES } from "@/data/discovery";
import { EntityCard } from "./EntityCard";
import { FilterBar } from "./FilterBar";
import { T } from "@/components/trinexus/ui/T";

export function DiscoveryPageContent() {
  const searchParams = useSearchParams();
  const initialTab =
    searchParams.get("tab") === "opportunities" ? "opportunities" : "people";
  const [tab, setTab] = useState<"people" | "opportunities">(initialTab);
  const [city, setCity] = useState("all");

  const profiles = useMemo(() => {
    return PROFILES.filter((p) => city === "all" || p.cityId === city);
  }, [city]);

  const opportunities = useMemo(() => {
    return OPPORTUNITIES.filter((o) => city === "all" || o.cityId === city);
  }, [city]);

  return (
    <>
      <div className="eco-tabs">
        <button
          type="button"
          className={tab === "people" ? "active" : undefined}
          onClick={() => setTab("people")}
        >
          <T k="discovery.tab.people" />
        </button>
        <button
          type="button"
          className={tab === "opportunities" ? "active" : undefined}
          onClick={() => setTab("opportunities")}
        >
          <T k="discovery.tab.opportunities" />
        </button>
      </div>
      <FilterBar
        filters={[
          {
            id: "city",
            labelKey: "filter.city",
            value: city,
            onChange: setCity,
            options: [
              { value: "all", labelKey: "filter.all" },
              { value: "pi", labelKey: "city.pi.b" },
              { value: "foz", labelKey: "city.foz.b" },
              { value: "cde", labelKey: "city.cde.b" },
            ],
          },
        ]}
      />
      <ul className="eco-entity-grid">
        {tab === "people"
          ? profiles.map((p) => (
              <li key={p.id}>
                <EntityCard
                  href={`/descubrimiento/personas/${p.id}`}
                  title={p.name}
                  subtitle={p.role}
                  description={p.quote}
                  cityId={p.cityId}
                  imageKey={p.imageKey}
                  accent="discovery"
                />
              </li>
            ))
          : opportunities.map((o) => (
              <li key={o.id}>
                <EntityCard
                  href={`/descubrimiento/oportunidades/${o.id}`}
                  title={o.title}
                  subtitle={o.company}
                  description={o.description}
                  cityId={o.cityId}
                  accent="discovery"
                  badge={o.type}
                  meta={o.modality}
                />
              </li>
            ))}
      </ul>
    </>
  );
}
