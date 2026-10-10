import { AboutJourneyChapters } from "@/components/ecosystem/AboutJourneyChapters";
import { CommunityScrollMap } from "@/components/ecosystem/CommunityScrollMap";
import { QueEsHero } from "@/components/ecosystem/QueEsShowcase";
import { SiteShell } from "@/components/trinexus/SiteShell";
import { ScrollSection } from "@/components/trinexus/ui/ScrollSection";
import { ScrollToHash } from "@/components/trinexus/ui/ScrollToHash";
import "@/styles/community-map.css";
import "@/styles/historias.css";
import "@/styles/que-es.css";

export default function QueEsPage() {
  return (
    <SiteShell>
      <ScrollToHash />
      <CommunityScrollMap />
      <main id="main" className="eco-page about-page about-page--journey">
        <span id="top" />
        <ScrollSection>
          <QueEsHero />
        </ScrollSection>
        <AboutJourneyChapters />
      </main>
    </SiteShell>
  );
}
