"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { BUSINESSES } from "@/data/commerce";
import { EntityCard } from "./EntityCard";
import { FilterBar } from "./FilterBar";
import { T } from "@/components/trinexus/ui/T";

export function CommercePageContent() {
  const [city, setCity] = useState("all");
  const [category, setCategory] = useState("all");

  const categories = useMemo(
    () => [...new Set(BUSINESSES.map((b) => b.category))],
    []
  );

  const filtered = useMemo(() => {
    return BUSINESSES.filter((b) => {
      if (city !== "all" && b.cityId !== city) return false;
      if (category !== "all" && b.category !== category) return false;
      return true;
    });
  }, [city, category]);

  return (
    <>
      <div className="eco-actions">
        <Link href="/comercios/panfleto" className="btn btn-green btn-sm">
          <T k="commerce.panfleto" />
        </Link>
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
          {
            id: "category",
            labelKey: "filter.category",
            value: category,
            onChange: setCategory,
            options: [
              { value: "all", labelKey: "filter.all" },
              ...categories.map((c) => ({ value: c, labelKey: c, label: c })),
            ],
          },
        ]}
      />
      <ul className="eco-entity-grid">
        {filtered.map((biz) => (
          <li key={biz.slug}>
            <EntityCard
              href={`/comercios/${biz.slug}`}
              title={biz.name}
              subtitle={biz.category}
              description={biz.promo ?? biz.description}
              cityId={biz.cityId}
              accent="commerce"
              imageKey="ecosystem.commerce"
              badge={biz.panfletoSubscribed ? "Panfleto" : undefined}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
