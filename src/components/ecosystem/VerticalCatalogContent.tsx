"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
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
import { resolveVigencia } from "@/lib/ecosystem/vigencia";

type VerticalCatalogContentProps = {
  verticalSlug: VerticalSlug;
  beforeFilters?: ReactNode;
};

export function VerticalCatalogContent({
  verticalSlug,
  beforeFilters,
}: VerticalCatalogContentProps) {
  const config = getVerticalCatalog(verticalSlug);
  const [city, setCity] = useState("all");
  const [category, setCategory] = useState("all");
  const [vigencia, setVigencia] = useState("all");

  const filtered = useMemo(() => {
    return config.listings.filter((item) => {
      if (city !== "all" && item.cityId !== city) return false;
      if (category !== "all" && item.category !== category) return false;
      if (vigencia !== "all" && resolveVigencia(item) !== vigencia) return false;
      return true;
    });
  }, [city, category, vigencia, config.listings]);

  useEffect(() => {
    const nodes = document.querySelectorAll(
      ".eco-catalog-head, .sport-coming-lead, .eco-entity-grid > li",
    );
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -6% 0px" },
    );
    nodes.forEach((node) => io.observe(node));
    return () => io.disconnect();
  }, [filtered]);

  return (
    <>
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
          {
            id: "vigencia",
            labelKey: "filter.vigencia",
            value: vigencia,
            onChange: setVigencia,
            options: [
              { value: "all", labelKey: "filter.all" },
              { value: "permanente", labelKey: "filter.vigencia.permanente" },
              { value: "ahora", labelKey: "filter.vigencia.ahora" },
              { value: "proximo", labelKey: "filter.vigencia.proximo" },
              { value: "pasado", labelKey: "filter.vigencia.pasado" },
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
    </>
  );
}
