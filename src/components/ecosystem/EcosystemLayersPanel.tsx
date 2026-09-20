"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { EventItem } from "@/lib/ecosystem/types";
import { PROFILES } from "@/data/discovery";
import { T } from "@/components/trinexus/ui/T";
import { CITY_LIST } from "@/lib/ecosystem/cities";
import { ECOSYSTEM_VERTICALS } from "@/lib/ecosystem/verticals";
import { EcosystemQrDemo } from "./EcosystemQrDemo";

const LAYERS = [
  { title: "TRINEXUS ID", body: "fut.id", kind: "id" as const },
  { title: "TRINEXUS QR", body: "fut.qr", kind: "qr" as const },
  { title: "TRINEXUS MAP", body: "fut.map", kind: "map" as const },
  { title: "TRINEXUS HUB", body: "fut.hub", kind: "hub" as const },
  { title: "TRINEXUS EVENTOS", body: "fut.summit", kind: "events" as const },
] as const;

export function EcosystemLayersPanel() {
  const [events, setEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    fetch("/api/events")
      .then((r) => r.json())
      .then(setEvents)
      .catch(() => setEvents([]));
  }, []);

  return (
    <div className="eco-layers">
      {LAYERS.map((layer) => (
        <article key={layer.title} className="eco-layer">
          <h3>{layer.title}</h3>
          <p className="eco-layer-lead">
            <T k={layer.body} />
          </p>
          {layer.kind === "id" && (
            <ul className="eco-layer-list">
              {PROFILES.slice(0, 3).map((profile) => (
                <li key={profile.id}>
                  <Link href={`/descubrimiento/personas/${profile.id}`}>
                    <strong>{profile.name}</strong>
                    <span>{profile.role}</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {layer.kind === "qr" && <EcosystemQrDemo />}
          {layer.kind === "map" && (
            <ul className="eco-layer-map">
              {CITY_LIST.map((city) => {
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
            <ul className="eco-layer-hub">
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
              {events.slice(0, 3).map((event) => (
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
            <Link href="/#border" className="eco-layer-link">
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
