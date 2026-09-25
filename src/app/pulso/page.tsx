import type { Metadata } from "next";
import { Suspense } from "react";
import { PulsoPageContent } from "@/components/ecosystem/PulsoPageContent";
import { SiteShell } from "@/components/trinexus/SiteShell";
import "@/styles/historias.css";

export const metadata: Metadata = {
  title: "Pulso — CONEXA",
  description:
    "Novedades semanales del ecosistema CONEXA en la Triple Frontera.",
};

export default function PulsoPage() {
  return (
    <SiteShell>
      <main id="main" className="eco-page historias-page">
        <Suspense>
          <PulsoPageContent />
        </Suspense>
      </main>
    </SiteShell>
  );
}
