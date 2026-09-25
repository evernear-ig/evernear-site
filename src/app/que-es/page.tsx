import { AboutJourneyChapters } from "@/components/ecosystem/AboutJourneyChapters";
import { AboutSlidesPage } from "@/components/ecosystem/AboutSlidesPage";
import { SiteShell } from "@/components/trinexus/SiteShell";
import { ScrollToHash } from "@/components/trinexus/ui/ScrollToHash";
import "@/styles/historias.css";

export default function QueEsPage() {
  return (
    <SiteShell>
      <ScrollToHash />
      <main id="main" className="eco-page about-page about-page--journey">
        <AboutSlidesPage
          titleKey="about.page.h"
          leadKey="about.page.lead"
          introKey="about.page.intro"
          heroImageKey="about.vision"
          blocks={[
            {
              titleKey: "about.vision.h",
              deckKey: "about.vision.deck",
              bodyKeys: ["about.vision.p1", "about.vision.p2", "about.vision.p3"],
              imageKey: "about.vision",
            },
            {
              titleKey: "about.mission.h",
              deckKey: "about.mission.deck",
              bodyKeys: ["about.mission.p1", "about.mission.p2", "about.mission.p3"],
              imageKey: "about.mission",
            },
            {
              titleKey: "about.goals.h",
              deckKey: "about.goals.deck",
              bodyKeys: ["about.goals.p1", "about.goals.p2", "about.goals.p3"],
              imageKey: "about.goals",
              list: true,
            },
          ]}
          footerLinks={[
            { href: "#informacion", key: "nav.information" },
            { href: "#historias", key: "nav.stories" },
            { href: "#join", key: "nav.join.cta" },
          ]}
        />
        <AboutJourneyChapters />
      </main>
    </SiteShell>
  );
}
