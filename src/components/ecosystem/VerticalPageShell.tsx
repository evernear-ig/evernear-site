import type { ReactNode } from "react";
import Link from "next/link";
import { SiteShell } from "@/components/trinexus/SiteShell";
import { T } from "@/components/trinexus/ui/T";
import { ECOSYSTEM_VERTICALS } from "@/lib/ecosystem/verticals";

type VerticalPageShellProps = {
  verticalSlug: string;
  titleKey: string;
  leadKey: string;
  children?: ReactNode;
};

export function VerticalPageShell({
  verticalSlug,
  titleKey,
  leadKey,
  children,
}: VerticalPageShellProps) {
  return (
    <SiteShell>
      <main id="main" className="eco-page">
        <section className="dark eco-hero">
          <div className="wrap">
            <nav className="eco-breadcrumb" aria-label="Breadcrumb">
              <Link href="/ecosistema">
                <T k="nav.eco" />
              </Link>
              <span aria-hidden="true">/</span>
              <span>
                <T k={titleKey} />
              </span>
            </nav>
            <h1 className="h-xl">
              <T k={titleKey} />
            </h1>
            <p className="lead">
              <T k={leadKey} />
            </p>
          </div>
        </section>
        <section className="light eco-body">
          <div className="wrap">
            {children ?? (
              <p className="eco-status">
                <T k="eco.coming" />
              </p>
            )}
          </div>
        </section>
        <section className="tint eco-nav-strip">
          <div className="wrap">
            <p className="eco-nav-label">
              <T k="eco.explore" />
            </p>
            <ul className="eco-nav-links">
              {ECOSYSTEM_VERTICALS.map((vertical) => (
                <li key={vertical.slug}>
                  <Link
                    href={vertical.href}
                    className={
                      vertical.slug === verticalSlug ? "active" : undefined
                    }
                    aria-current={
                      vertical.slug === verticalSlug ? "page" : undefined
                    }
                  >
                    <T k={vertical.navKey} />
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
