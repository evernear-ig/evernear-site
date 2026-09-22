"use client";

import { SOLIDARITY_CAUSES } from "@/data/solidaridad";
import { EntityCard } from "./EntityCard";
import { T } from "@/components/trinexus/ui/T";

export function SolidarityPageContent() {
  return (
    <>
      <p className="eco-disclaimer">
        <T k="legal.solidarity.disclaimer" />
      </p>
      <ul className="eco-entity-grid">
        {SOLIDARITY_CAUSES.map((cause) => {
          const externalHref =
            cause.organizerUrl ??
            (cause.contactEmail
              ? `mailto:${cause.contactEmail}?subject=${encodeURIComponent(cause.title)}`
              : "#join");

          return (
            <li key={cause.id}>
              <EntityCard
                href={externalHref}
                title={cause.title}
                subtitle={cause.organizer}
                description={cause.story}
                cityId={cause.cityId}
                accent="solidarity"
                imageKey="ecosystem.solidaridad"
                badge={cause.status}
                meta={cause.kind}
              />
            </li>
          );
        })}
      </ul>
      <p className="eco-disclaimer eco-disclaimer--muted">
        <T k="solidarity.cta.note" />
      </p>
    </>
  );
}
