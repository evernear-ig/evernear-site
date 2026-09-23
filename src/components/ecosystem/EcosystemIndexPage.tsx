import { EcoCardLink } from "@/components/ecosystem/EcoCardLink";
import { SiteShell } from "@/components/trinexus/SiteShell";
import { ScrollSection } from "@/components/trinexus/ui/ScrollSection";
import { T } from "@/components/trinexus/ui/T";
import { TrinexusPhoto } from "@/components/trinexus/ui/TrinexusPhoto";
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
        <section className="dark eco-hero eco-hero--index">
          <div className="eco-hero-bg">
            <TrinexusPhoto
              imageKey="ecosystem.heroIndex"
              className="eco-hero-photo"
              priority
            />
            <div className="eco-hero-veil" />
          </div>
          <div className="wrap sec-head sec-head--center eco-hero-content">
            <h1 className="h-xl">
              <T k="eco.index.h" />
            </h1>
            <p className="lead">
              <T k="eco.index.lead" />
            </p>
          </div>
        </section>
        <ScrollSection>
          <section className="light eco-body">
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
