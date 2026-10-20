import { EcoCardLink } from "@/components/ecosystem/EcoCardLink";
import { VerticalHero } from "@/components/ecosystem/VerticalHero";
import { SiteShell } from "@/components/evernear/SiteShell";
import { ScrollSection } from "@/components/evernear/ui/ScrollSection";
import { T } from "@/components/evernear/ui/T";
import {
  COMMUNITY_VERTICALS,
  REGION_VERTICALS,
} from "@/lib/ecosystem/verticals";
import { slugFromEcoHref } from "@/lib/eco-vt-name";

function VerticalGrid({
  verticals,
}: {
  verticals: readonly {
    href: string;
    titleKey: string;
    leadKey: string;
    imageKey: string;
    featured?: boolean;
  }[];
}) {
  return (
    <ul className="eco-grid">
      {verticals.map((vertical) => (
        <li key={vertical.href}>
          <EcoCardLink
            href={vertical.href}
            slug={slugFromEcoHref(vertical.href)}
            titleKey={vertical.titleKey}
            leadKey={vertical.leadKey}
            imageKey={vertical.imageKey}
            featured={vertical.featured}
          />
        </li>
      ))}
    </ul>
  );
}

export function EcosystemIndexPage() {
  return (
    <SiteShell>
      <main id="main" className="eco-page">
        <div className="eco-fold">
          <VerticalHero
            slug="ecosistema"
            accent="index"
            imageKey="ecosystem.heroIndex"
            titleKey="eco.index.h"
            leadKey="eco.index.lead"
            stage
            hideBreadcrumb
            stageAccentWords={3}
          />
        </div>
        <ScrollSection>
          <section className="light eco-body eco-catalog">
            <div className="wrap">
              <header className="eco-catalog-head" id="comunidad">
                <h2 className="eco-catalog-title">
                  <T k="nav.family.community" />
                </h2>
              </header>
              <VerticalGrid verticals={COMMUNITY_VERTICALS} />

              <header
                className="eco-catalog-head"
                id="region"
                style={{ marginTop: "48px" }}
              >
                <h2 className="eco-catalog-title">
                  <T k="nav.family.region" />
                </h2>
              </header>
              <VerticalGrid verticals={REGION_VERTICALS} />
            </div>
          </section>
        </ScrollSection>
      </main>
    </SiteShell>
  );
}
