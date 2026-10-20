import { FoundingSection } from "@/components/evernear/sections/FoundingSection";
import { ScrollSection } from "@/components/evernear/ui/ScrollSection";
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
