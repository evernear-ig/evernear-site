import type { Metadata } from "next";
import { Suspense } from "react";
import { HistoriasPageContent } from "@/components/ecosystem/HistoriasPageContent";
import { SiteShell } from "@/components/trinexus/SiteShell";
import "@/styles/historias.css";

export const metadata: Metadata = {
  title: "Historias — CONEXA",
  description:
    "Casos reales de conexiones logradas en la Triple Frontera y el pulso semanal de novedades del ecosistema.",
};

export default function HistoriasPage() {
  return (
    <SiteShell>
      <main id="main" className="eco-page historias-page">
        <Suspense>
          <HistoriasPageContent />
        </Suspense>
      </main>
    </SiteShell>
  );
}
