import { AboutJourneyChapters } from "@/components/ecosystem/AboutJourneyChapters";
import { QueEsShowcase } from "@/components/ecosystem/QueEsShowcase";
import { SiteShell } from "@/components/trinexus/SiteShell";
import { ScrollToHash } from "@/components/trinexus/ui/ScrollToHash";
import "@/styles/historias.css";
import "@/styles/que-es.css";

export default function QueEsPage() {
  return (
    <SiteShell>
      <ScrollToHash />
      <main id="main" className="eco-page about-page about-page--journey">
        <QueEsShowcase />
        <AboutJourneyChapters />
      </main>
    </SiteShell>
  );
}
