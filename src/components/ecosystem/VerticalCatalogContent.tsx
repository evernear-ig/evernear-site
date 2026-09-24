"use client";

import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import { CityBadge } from "./CityBadge";
import { FilterBar } from "./FilterBar";
import { TrinexusPhoto } from "@/components/trinexus/ui/TrinexusPhoto";
import { T } from "@/components/trinexus/ui/T";
import {
  CITY_FILTER_OPTIONS,
  getVerticalCatalog,
  listingBadgeKey,
} from "@/lib/ecosystem/vertical-catalog";
import type { VerticalSlug } from "@/lib/ecosystem/verticals";

type VerticalCatalogContentProps = {
  verticalSlug: VerticalSlug;
  beforeFilters?: ReactNode;
  disclaimerKey?: string;
};

export function VerticalCatalogContent({
  verticalSlug,
  beforeFilters,
  disclaimerKey = "legal.vertical.disclaimer",
}: VerticalCatalogContentProps) {
  const config = getVerticalCatalog(verticalSlug);
  const [city, setCity] = useState("all");
  const [category, setCategory] = useState("all");

  const filtered = useMemo(() => {
    return config.listings.filter((item) => {
      if (city !== "all" && item.cityId !== city) return false;
      if (category !== "all" && item.category !== category) return false;
      return true;
    });
  }, [city, category, config.listings]);

  return (
    <>
      <p className="eco-disclaimer">
        <T k={disclaimerKey} />
      </p>
      {beforeFilters}
      <p className="sport-coming-lead">
        <T k={config.comingLeadKey} />
      </p>
      <FilterBar
        filters={[
          {
            id: "city",
            labelKey: "filter.city",
            value: city,
            onChange: setCity,
            options: [...CITY_FILTER_OPTIONS],
          },
          {
            id: "category",
            labelKey: config.categoryFilterLabelKey,
            value: category,
            onChange: setCategory,
            options: [
              { value: "all", labelKey: "filter.all" },
              ...config.categoryOptions,
            ],
          },
        ]}
      />
      <p className="sport-coming-filter-note">
        <T k={config.comingFilterNoteKey} />
      </p>
      {filtered.length === 0 ? (
        <p className="sport-coming-empty">
          <T k={config.comingEmptyKey} />
        </p>
      ) : (
        <ul className="eco-entity-grid">
          {filtered.map((item) => (
            <li key={item.id}>
              <article className={`eco-entity-card eco-entity-card--${config.accent}`}>
                <div className="eco-entity-card-img">
                  <TrinexusPhoto imageKey={item.imageKey} />
                </div>
                <div className="eco-entity-card-body">
                  <span className="eco-entity-badge">
                    <T k={listingBadgeKey(config.prefix, item.kind, item.category)} />
                  </span>
                  <h3>{item.title}</h3>
                  <p className="eco-entity-sub">{item.subtitle}</p>
                  <p className="eco-entity-desc">{item.description}</p>
                  <div className="eco-entity-footer">
                    <CityBadge cityId={item.cityId} />
                    {item.meta ? (
                      <span className="eco-entity-meta">{item.meta}</span>
                    ) : null}
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
      <p className="eco-disclaimer eco-disclaimer--muted">
        <T k={config.comingNoteKey} />
      </p>
    </>
  );
}
