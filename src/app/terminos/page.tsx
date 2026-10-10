import { LegalPage } from "@/components/ecosystem/LegalPage";

export default function TerminosPage() {
  return (
    <LegalPage
      titleKey="legal.terms"
      bodyKeys={["legal.terms.p1", "legal.terms.p2", "legal.terms.p3"]}
    />
  );
}
