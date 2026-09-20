import { EducationPageContent } from "@/components/ecosystem/EducationPageContent";
import { VerticalPageShell } from "@/components/ecosystem/VerticalPageShell";
import { LearnSection } from "@/components/trinexus/sections/LearnSection";

export default function EducacionPage() {
  return (
    <VerticalPageShell
      verticalSlug="educacion"
      beforeCatalog={<LearnSection embedded />}
      catalogDividerKey="eco.catalog.courses"
    >
      <EducationPageContent />
    </VerticalPageShell>
  );
}
