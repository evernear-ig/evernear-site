import type { Metadata } from "next";
import { Suspense } from "react";
import { PulsoPageContent } from "@/components/ecosystem/PulsoPageContent";
import { SiteShell } from "@/components/evernear/SiteShell";
import "@/styles/pulso.css";

export const metadata: Metadata = {
  title: "Pulso Semanal — Evernear",
  description:
    "El latido y radar semanal de la Triple Frontera: Puerto Iguazú, Foz do Iguaçu y Ciudad del Este sincronizadas en tiempo real.",
};

export default function PulsoPage() {
  return (
    <SiteShell>
      <main id="main" className="pulso-page">
        <Suspense>
          <PulsoPageContent />
        </Suspense>
      </main>
    </SiteShell>
  );
}
