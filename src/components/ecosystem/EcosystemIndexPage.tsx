import Link from "next/link";
import { SiteShell } from "@/components/trinexus/SiteShell";
import { T } from "@/components/trinexus/ui/T";
import {
  COMMUNITY_VERTICALS,
  REGION_VERTICALS,
} from "@/lib/ecosystem/verticals";

function VerticalGrid({
  verticals,
}: {
  verticals: readonly {
    href: string;
    titleKey: string;
    leadKey: string;
    featured?: boolean;
  }[];
}) {
  return (
    <ul className="eco-grid">
      {verticals.map((vertical) => (
        <li key={vertical.href}>
          <Link
            href={vertical.href}
            className={`eco-card${vertical.featured ? " eco-card--featured" : ""}`}
          >
            {vertical.featured && (
              <span className="eco-card-badge">
                <T k="areas.featured" />
              </span>
            )}
            <h2>
              <T k={vertical.titleKey} />
            </h2>
            <p>
              <T k={vertical.leadKey} />
            </p>
            <span className="eco-card-link">
              <T k="eco.enter" />
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export function EcosystemIndexPage() {
  return (
    <SiteShell>
      <main id="main" className="eco-page">
        <section className="dark eco-hero">
          <div className="wrap">
            <h1 className="h-xl">
              <T k="eco.index.h" />
            </h1>
            <p className="lead">
              <T k="eco.index.lead" />
            </p>
          </div>
        </section>
        <section className="light eco-body">
          <div className="wrap">
            <header className="eco-catalog-head">
              <h2 className="eco-catalog-title">
                <T k="nav.family.community" />
              </h2>
            </header>
            <VerticalGrid verticals={COMMUNITY_VERTICALS} />

            <header className="eco-catalog-head" style={{ marginTop: "48px" }}>
              <h2 className="eco-catalog-title">
                <T k="nav.family.region" />
              </h2>
            </header>
            <VerticalGrid verticals={REGION_VERTICALS} />
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
