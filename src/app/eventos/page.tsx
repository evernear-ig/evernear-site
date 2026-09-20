import { EventsPageContent } from "@/components/ecosystem/EventsPageContent";
import { VerticalPageShell } from "@/components/ecosystem/VerticalPageShell";
import { BuildSection } from "@/components/trinexus/sections/BuildSection";

export default function EventosPage() {
  return (
    <VerticalPageShell
      verticalSlug="eventos"
      beforeCatalog={<BuildSection embedded variant="events" />}
      catalogDividerKey="eco.catalog.calendar"
    >
      <EventsPageContent />
    </VerticalPageShell>
  );
}
