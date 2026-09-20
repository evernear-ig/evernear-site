import { VerticalPageShell } from "@/components/ecosystem/VerticalPageShell";
import { EventsPageContent } from "@/components/ecosystem/EventsPageContent";

export default function EventosPage() {
  return (
    <VerticalPageShell verticalSlug="eventos">
      <EventsPageContent />
    </VerticalPageShell>
  );
}
