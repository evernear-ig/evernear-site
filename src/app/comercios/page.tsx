import { VerticalPageShell } from "@/components/ecosystem/VerticalPageShell";
import { CommercePageContent } from "@/components/ecosystem/CommercePageContent";

export default function ComerciosPage() {
  return (
    <VerticalPageShell verticalSlug="comercios">
      <CommercePageContent />
    </VerticalPageShell>
  );
}
