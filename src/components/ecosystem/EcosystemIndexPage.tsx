import Link from "next/link";
import { SiteShell } from "@/components/trinexus/SiteShell";
import { T } from "@/components/trinexus/ui/T";
import { ECOSYSTEM_VERTICALS } from "@/lib/ecosystem/verticals";

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
            <ul className="eco-grid">
              {ECOSYSTEM_VERTICALS.map((vertical) => (
                <li key={vertical.slug}>
                  <Link href={vertical.href} className="eco-card">
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
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
