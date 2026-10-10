"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { EventItem } from "@/lib/ecosystem/types";
import { EntityCard } from "./EntityCard";
import { T } from "@/components/trinexus/ui/T";

export function EventsPageContent() {
  const [events, setEvents] = useState<EventItem[]>([]);

  useEffect(() => {
    fetch("/api/events")
      .then((r) => r.json())
      .then(setEvents)
      .catch(() => setEvents([]));
  }, []);

  return (
    <>
      <div className="eco-actions">
        <Link href="/eventos/publicar" className="btn btn-green btn-sm">
          <T k="events.publish" />
        </Link>
      </div>
      <ul className="eco-entity-grid">
        {events.map((event) => (
          <li key={event.slug}>
            <EntityCard
              href={`/eventos/${event.slug}`}
              title={event.title}
              subtitle={event.organizer}
              description={event.description}
              cityId={event.cityId}
              accent="events"
              meta={event.date}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
