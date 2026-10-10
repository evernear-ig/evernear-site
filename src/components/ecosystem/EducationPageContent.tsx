"use client";

import { useMemo, useState } from "react";
import { COURSES } from "@/data/education";
import { EntityCard } from "./EntityCard";
import { FilterBar } from "./FilterBar";

export function EducationPageContent() {
  const [country, setCountry] = useState("all");
  const [modality, setModality] = useState("all");

  const filtered = useMemo(() => {
    return COURSES.filter((c) => {
      if (country !== "all" && c.country !== country) return false;
      if (modality !== "all" && c.modality !== modality) return false;
      return true;
    });
  }, [country, modality]);

  return (
    <>
      <FilterBar
        filters={[
          {
            id: "country",
            labelKey: "filter.country",
            value: country,
            onChange: setCountry,
            options: [
              { value: "all", labelKey: "filter.all" },
              { value: "ar", labelKey: "country.ar" },
              { value: "br", labelKey: "country.br" },
              { value: "py", labelKey: "country.py" },
            ],
          },
          {
            id: "modality",
            labelKey: "filter.modality",
            value: modality,
            onChange: setModality,
            options: [
              { value: "all", labelKey: "filter.all" },
              { value: "presencial", labelKey: "filter.presencial" },
              { value: "online", labelKey: "filter.online" },
              { value: "hibrido", labelKey: "filter.hibrido" },
            ],
          },
        ]}
      />
      <ul className="eco-entity-grid">
        {filtered.map((course) => (
          <li key={course.slug}>
            <EntityCard
              href={`/educacion/${course.slug}`}
              title={course.title}
              subtitle={course.institution}
              description={course.description}
              cityId={course.cityId}
              accent="education"
              badge={course.type}
              meta={course.modality}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
