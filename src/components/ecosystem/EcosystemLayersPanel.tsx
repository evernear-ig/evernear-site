"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { EventItem } from "@/lib/ecosystem/types";
import { PROFILES } from "@/data/discovery";
import { T } from "@/components/evernear/ui/T";
import { CITY_LIST } from "@/lib/ecosystem/cities";
import { ECOSYSTEM_VERTICALS } from "@/lib/ecosystem/verticals";
import { EcosystemQrDemo } from "./EcosystemQrDemo";

const LAYERS = [
  { title: "Evernear ID", body: "fut.id", kind: "id" as const },
  { title: "Evernear QR", body: "fut.qr", kind: "qr" as const },
  { title: "Evernear MAP", body: "fut.map", kind: "map" as const },
  { title: "Evernear HUB", body: "fut.hub", kind: "hub" as const },
  { title: "Evernear EVENTOS", body: "fut.summit", kind: "events" as const },
] as const;

type EcosystemLayersPanelProps = {
  compact?: boolean;
};

export function EcosystemLayersPanel({ compact = false }: EcosystemLayersPanelProps) {
  const [events, setEvents] = useState<EventItem[]>([]);
  const profileLimit = compact ? 2 : 3;
  const eventLimit = compact ? 2 : 3;

  useEffect(() => {
    fetch("/api/events")
      .then((r) => r.json())
      .then(setEvents)
      .catch(() => setEvents([]));
  }, []);

  return (
    <div className={`eco-layers${compact ? " eco-layers--compact" : ""}`}>
      {LAYERS.map((layer) => (
        <article key={layer.title} className="eco-layer">
          <h3>{layer.title}</h3>
          <p className="eco-layer-lead">
            <T k={layer.body} />
          </p>
          {layer.kind === "id" && (
            <ul className="eco-layer-list">
              {PROFILES.slice(0, profileLimit).map((profile) => (
                <li key={profile.id}>
                  <Link href={`/descubrimiento/personas/${profile.id}`}>
                    <strong>{profile.name}</strong>
                    <span>{profile.role}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {layer.kind === "qr" && <EcosystemQrDemo compact={compact} />}
          {layer.kind === "map" && (
            <ul className={`eco-layer-map${compact ? " eco-layer-map--compact" : ""}`}>
              {CITY_LIST.map((city) => {
                if (compact) {
                  return (
                    <li key={city.id}>
                      <Link href="/descubrimiento" className="eco-layer-city">
                        <T k={`city.${city.id}.b`} />
                      </Link>
                    </li>
                  );
                }

                const people = PROFILES.filter((p) => p.cityId === city.id).slice(0, 2);
                return (
                  <li key={city.id}>
                    <Link href="/descubrimiento" className="eco-layer-city">
                      <T k={`city.${city.id}.b`} />
                    </Link>
                    <ul>
                      {people.map((person) => (
                        <li key={person.id}>
                          <Link href={`/descubrimiento/personas/${person.id}`}>
                            {person.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                );
              })}
            </ul>
          )}
          {layer.kind === "hub" && (
            <ul className={`eco-layer-hub${compact ? " eco-layer-hub--chips" : ""}`}>
              {ECOSYSTEM_VERTICALS.map((vertical) => (
                <li key={vertical.slug}>
                  <Link href={vertical.href}>
                    <T k={vertical.navKey} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {layer.kind === "events" && (
            <ul className="eco-layer-list">
              {events.slice(0, eventLimit).map((event) => (
                <li key={event.slug}>
                  <Link href={`/eventos/${event.slug}`}>
                    <strong>{event.title}</strong>
                    <span>{event.date}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {layer.kind === "id" && (
            <Link href="/descubrimiento" className="eco-layer-link">
              <T k="pil.link" />
            </Link>
          )}
          {layer.kind === "map" && (
            <Link href="/descubrimiento" className="eco-layer-link">
              <T k="fut.map.open" />
            </Link>
          )}
          {layer.kind === "hub" && (
            <Link href="/ecosistema" className="eco-layer-link">
              <T k="pil.link" />
            </Link>
          )}
          {layer.kind === "events" && (
            <Link href="/eventos" className="eco-layer-link">
              <T k="pil.link" />
            </Link>
          )}
        </article>
      ))}
    </div>
  );
}
