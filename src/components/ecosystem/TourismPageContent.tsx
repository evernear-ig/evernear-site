"use client";

import { useState } from "react";
import { T } from "@/components/evernear/ui/T";
import { EvernearPhoto } from "@/components/evernear/ui/EvernearPhoto";
import { CITY_LIST, type CityId } from "@/lib/ecosystem/cities";
import { REGIONAL_ROUTES, TOURISM_SOURCES } from "@/data/tourism";
import { SourceAttribution } from "./SourceAttribution";

export function TourismPageContent() {
  const [city, setCity] = useState<CityId>("pi");
  const source = TOURISM_SOURCES.find((s) => s.cityId === city)!;

  return (
    <>
      <div className="city-tabs">
        {CITY_LIST.map((c) => (
          <button
            key={c.id}
            type="button"
            className={city === c.id ? "active" : undefined}
            onClick={() => setCity(c.id)}
          >
            <T k={`city.${c.id}.b`} />
          </button>
        ))}
      </div>

      <div className="city-panel">
        <div className="city-panel-photo">
          <EvernearPhoto imageKey={`cities.${city}`} />
        </div>
        <SourceAttribution
          status={source.status}
          officialName={source.officialName}
          officialUrl={source.officialUrl}
        />
        <ul className="tourism-links">
          {source.links.map((link) => (
            <li key={link.labelKey}>
              <a
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              >
                <T k={link.labelKey} />
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="regional-block">
        <h2 className="h-xl" style={{ fontSize: "clamp(1.4rem,3vw,2rem)" }}>
          <T k="tourism.regional.h" />
        </h2>
        <p className="lead" style={{ marginTop: "1em" }}>
          <T k="tourism.regional.lead" />
        </p>
        <ul className="eco-grid" style={{ marginTop: "32px" }}>
          {REGIONAL_ROUTES.map((route) => (
            <li key={route.id} className="eco-card-static">
              <h3>
                <T k={route.titleKey} />
              </h3>
              <p>
                <T k={route.descKey} />
              </p>
              <div className="route-cities">
                {route.cities.map((c) => (
                  <span key={c} className={`city-badge city-badge--${c}`}>
                    <T k={`city.${c}`} />
                  </span>
                ))}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
