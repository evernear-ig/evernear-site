import { VerticalPageShell } from "@/components/ecosystem/VerticalPageShell";
import { PublishEventForm } from "@/components/ecosystem/PublishEventForm";
import { T } from "@/components/evernear/ui/T";

export default function PublicarEventoPage() {
  return (
    <VerticalPageShell verticalSlug="eventos">
      <h2 className="h-xl" style={{ fontSize: "clamp(1.4rem,3vw,2rem)", marginBottom: "1em" }}>
        <T k="events.publish" />
      </h2>
      <p style={{ marginBottom: "2em", color: "var(--ink-2)" }}>
        <T k="events.publish.lead" />
      </p>
      <PublishEventForm />
    </VerticalPageShell>
  );
}
