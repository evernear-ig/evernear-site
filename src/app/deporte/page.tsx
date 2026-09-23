import { SportComingSoonContent } from "@/components/ecosystem/SportComingSoonContent";
import { VerticalPageShell } from "@/components/ecosystem/VerticalPageShell";
import { SportGuideSection } from "@/components/trinexus/sections/SportGuideSection";

export default function DeportePage() {
  return (
    <VerticalPageShell
      verticalSlug="deporte"
      beforeCatalog={<SportGuideSection embedded />}
      catalogDividerKey="eco.catalog.sport"
    >
      <SportComingSoonContent />
    </VerticalPageShell>
  );
}
