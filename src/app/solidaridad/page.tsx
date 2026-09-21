import { VerticalPageShell } from "@/components/ecosystem/VerticalPageShell";
import { SolidarityPageContent } from "@/components/ecosystem/SolidarityPageContent";

export default function SolidaridadPage() {
  return (
    <VerticalPageShell
      verticalSlug="solidaridad"
      catalogDividerKey="eco.catalog.solidarity"
    >
      <SolidarityPageContent />
    </VerticalPageShell>
  );
}
