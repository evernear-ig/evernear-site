import Link from "next/link";
import {
  COMMUNITY_VERTICALS,
  REGION_VERTICALS,
} from "@/lib/ecosystem/verticals";
import { Reveal } from "@/components/trinexus/ui/Reveal";
import { T, THtml } from "@/components/trinexus/ui/T";

function AreaGrid({
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
    <ul className="eco-grid areas-grid">
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

export function EcosystemSection() {
  return (
    <section className="light areas-sec" id="ecosystem">
      <div className="wrap">
        <Reveal className="grid g-7-5" style={{ alignItems: "end" }}>
          <h2 className="h-xl">
            <THtml k="areas.h" />
          </h2>
          <p className="lead">
            <T k="areas.lead" />
          </p>
        </Reveal>

        <Reveal className="areas-block">
          <h3 className="areas-family">
            <T k="nav.family.community" />
          </h3>
          <AreaGrid verticals={COMMUNITY_VERTICALS} />
        </Reveal>

        <Reveal className="areas-block">
          <h3 className="areas-family">
            <T k="nav.family.region" />
          </h3>
          <AreaGrid verticals={REGION_VERTICALS} />
        </Reveal>

        <Reveal className="areas-cta">
          <Link href="/ecosistema" className="btn btn-outline-ink">
            <T k="areas.seeAll" />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
