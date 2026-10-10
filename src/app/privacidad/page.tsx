import { LegalPage } from "@/components/ecosystem/LegalPage";

export default function PrivacidadPage() {
  return (
    <LegalPage
      titleKey="legal.privacy"
      bodyKeys={["legal.privacy.p1", "legal.privacy.p2", "legal.privacy.p3"]}
    />
  );
}
