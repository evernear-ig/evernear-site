import { VerticalPageShell } from "@/components/ecosystem/VerticalPageShell";
import { InnovacionPageContent } from "@/components/ecosystem/InnovacionPageContent";

export default function InnovacionPage() {
  return (
    <VerticalPageShell
      verticalSlug="innovacion"
      catalogDividerKey="eco.innovation.pillars"
    >
      <InnovacionPageContent />
    </VerticalPageShell>
  );
}
