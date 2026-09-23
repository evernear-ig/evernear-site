"use client";

import { useMemo, useState } from "react";
import { CityBadge } from "./CityBadge";
import { FilterBar } from "./FilterBar";
import { TrinexusPhoto } from "@/components/trinexus/ui/TrinexusPhoto";
import { T } from "@/components/trinexus/ui/T";
import type { CityId } from "@/lib/ecosystem/cities";
import { JOIN_TRACKS } from "@/lib/join-tracks";

const SPORT_DISCIPLINES = JOIN_TRACKS.sport.focusAreas.slice(0, 8);

type PreviewItem = {
  id: string;
  cityId: CityId;
  discipline: string;
  titleKey: string;
  subtitleKey: string;
  descKey: string;
  badgeKey: string;
};

const PREVIEW_ITEMS: PreviewItem[] = [
  {
    id: "club",
    cityId: "pi",
    discipline: "basketball",
    titleKey: "sport.preview.club.title",
    subtitleKey: "sport.preview.club.sub",
    descKey: "sport.preview.club.desc",
    badgeKey: "join.org.sport.club",
  },
  {
    id: "athlete",
    cityId: "foz",
    discipline: "futsal",
    titleKey: "sport.preview.athlete.title",
    subtitleKey: "sport.preview.athlete.sub",
    descKey: "sport.preview.athlete.desc",
    badgeKey: "join.org.sport.athlete",
  },
  {
    id: "call",
    cityId: "cde",
    discipline: "futsal",
    titleKey: "sport.preview.call.title",
    subtitleKey: "sport.preview.call.sub",
    descKey: "sport.preview.call.desc",
    badgeKey: "solidarity.kind.sponsorship",
  },
];

export function SportComingSoonContent() {
  const [city, setCity] = useState("all");
  const [discipline, setDiscipline] = useState("all");

  const filtered = useMemo(() => {
    return PREVIEW_ITEMS.filter((item) => {
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
      <ul className="eco-entity-grid">
        {filtered.map((item) => (
          <li key={item.id}>
            <article
              className="eco-entity-card eco-entity-card--sport eco-entity-card--preview"
              aria-label={item.id}
            >
              <div className="eco-entity-card-img">
                <TrinexusPhoto imageKey="ecosystem.deporte" />
              </div>
              <div className="eco-entity-card-body">
                <span className="eco-entity-badge eco-entity-badge--preview">
                  <T k={item.badgeKey} />
                </span>
                <h3>
                  <T k={item.titleKey} />
                </h3>
                <p className="eco-entity-sub">
                  <T k={item.subtitleKey} />
                </p>
                <p className="eco-entity-desc">
                  <T k={item.descKey} />
                </p>
                <div className="eco-entity-footer">
                  <CityBadge cityId={item.cityId} />
                  <span className="eco-entity-meta">
                    <T k="sport.coming.preview.label" />
                  </span>
                </div>
              </div>
            </article>
          </li>
        ))}
      </ul>
      <p className="eco-disclaimer eco-disclaimer--muted">
        <T k="sport.coming.note" />
      </p>
    </>
  );
}
