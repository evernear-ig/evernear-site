import { EventsPageContent } from "@/components/ecosystem/EventsPageContent";
import { VerticalPageShell } from "@/components/ecosystem/VerticalPageShell";
import { BuildSection } from "@/components/trinexus/sections/BuildSection";
import { NextSection } from "@/components/trinexus/sections/NextSection";

export default function EventosPage() {
  return (
    <VerticalPageShell
      verticalSlug="eventos"
      beforeCatalog={
        <>
          <NextSection embedded />
          <BuildSection embedded variant="events" />
        </>
      }
      catalogDividerKey="eco.catalog.calendar"
    >
      <EventsPageContent />
    </VerticalPageShell>
  );
}
