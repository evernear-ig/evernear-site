"use client";

import { useMemo, useState } from "react";
import { CityBadge } from "./CityBadge";
import { FilterBar } from "./FilterBar";
import { TrinexusPhoto } from "@/components/trinexus/ui/TrinexusPhoto";
import { T } from "@/components/trinexus/ui/T";
import { SPORT_LISTINGS } from "@/data/sport";
import type { SportListingKind } from "@/lib/ecosystem/types";
import { JOIN_TRACKS } from "@/lib/join-tracks";

const SPORT_DISCIPLINES = JOIN_TRACKS.sport.focusAreas.slice(0, 8);

const BADGE_KEYS: Record<SportListingKind, string> = {
  club: "join.org.sport.club",
  athlete: "join.org.sport.athlete",
  call: "sport.guide.a3",
  team: "join.org.sport.team",
};

export function SportComingSoonContent() {
  const [city, setCity] = useState("all");
  const [discipline, setDiscipline] = useState("all");

  const filtered = useMemo(() => {
    return SPORT_LISTINGS.filter((item) => {
      if (city !== "all" && item.cityId !== city) return false;
      if (discipline !== "all" && item.discipline !== discipline) return false;
      return true;
    });
  }, [city, discipline]);

  return (
    <>
      <p className="eco-disclaimer">
        <T k="legal.vertical.disclaimer" />
      </p>
      <p className="sport-coming-lead">
        <T k="sport.coming.p" />
      </p>
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
            id: "discipline",
            labelKey: "filter.modality",
            value: discipline,
            onChange: setDiscipline,
            options: [
              { value: "all", labelKey: "filter.all" },
              ...SPORT_DISCIPLINES.map((item) => ({
                value: item.value,
                labelKey: item.key,
              })),
            ],
          },
        ]}
      />
      <p className="sport-coming-filter-note">
        <T k="sport.coming.filter.note" />
      </p>
      {filtered.length === 0 ? (
        <p className="sport-coming-empty">
          <T k="sport.coming.empty" />
        </p>
      ) : (
        <ul className="eco-entity-grid">
          {filtered.map((item) => (
            <li key={item.id}>
              <article className="eco-entity-card eco-entity-card--sport">
                <div className="eco-entity-card-img">
                  <TrinexusPhoto imageKey={item.imageKey} />
                </div>
                <div className="eco-entity-card-body">
                  <span className="eco-entity-badge">
                    <T k={BADGE_KEYS[item.kind]} />
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
        <T k="sport.coming.note" />
      </p>
    </>
  );
}
