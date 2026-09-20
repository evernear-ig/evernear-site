import { VerticalPageShell } from "@/components/ecosystem/VerticalPageShell";
import { PanfletoPageContent } from "@/components/ecosystem/PanfletoPageContent";

export default function PanfletoPage() {
  return (
    <VerticalPageShell verticalSlug="comercios">
      <PanfletoPageContent />
    </VerticalPageShell>
  );
}
