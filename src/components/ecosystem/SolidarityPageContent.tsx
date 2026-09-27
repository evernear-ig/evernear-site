"use client";

import { SOLIDARITY_CAUSES } from "@/data/solidaridad";
import { EntityCard } from "./EntityCard";

export function SolidarityPageContent() {
  return (
    <>
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
    </>
  );
}
