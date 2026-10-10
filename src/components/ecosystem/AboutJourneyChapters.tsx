import { FoundingSection } from "@/components/trinexus/sections/FoundingSection";
import { ScrollSection } from "@/components/trinexus/ui/ScrollSection";
import { Suspense } from "react";
import { HistoriasPageContent } from "@/components/ecosystem/HistoriasPageContent";

export function AboutJourneyChapters() {
  return (
    <>
      <ScrollSection>
        <Suspense>
          <HistoriasPageContent asChapter />
        </Suspense>
      </ScrollSection>
      <ScrollSection>
        <FoundingSection />
      </ScrollSection>
    </>
  );
}
