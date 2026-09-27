import { FoundingSection } from "@/components/trinexus/sections/FoundingSection";
import { Suspense } from "react";
import { HistoriasPageContent } from "@/components/ecosystem/HistoriasPageContent";

export function AboutJourneyChapters() {
  return (
    <>
      <Suspense>
        <HistoriasPageContent asChapter />
      </Suspense>

      <FoundingSection />
    </>
  );
}
