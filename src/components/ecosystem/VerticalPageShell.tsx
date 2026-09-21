import type { ReactNode } from "react";
import { SiteShell } from "@/components/trinexus/SiteShell";
import { T } from "@/components/trinexus/ui/T";
import { ECOSYSTEM_VERTICALS } from "@/lib/ecosystem/verticals";
import { VerticalHero } from "./VerticalHero";
import { VerticalNavStrip } from "./VerticalNavStrip";

type VerticalPageShellProps = {
  verticalSlug: string;
  beforeCatalog?: ReactNode;
  catalogDividerKey?: string;
  children: ReactNode;
};

export function VerticalPageShell({
  verticalSlug,
  beforeCatalog,
  catalogDividerKey,
  children,
}: VerticalPageShellProps) {
  const vertical = ECOSYSTEM_VERTICALS.find((v) => v.slug === verticalSlug);
  if (!vertical) return null;

  return (
    <SiteShell>
      <main id="main" className="eco-page">
        <VerticalHero
          accent={vertical.accent}
          imageKey={vertical.imageKey}
          titleKey={vertical.titleKey}
          leadKey={vertical.leadKey}
        />
        {vertical.informational ? (
          <section className="light eco-disclaimer-bar">
            <div className="wrap">
              <p className="eco-disclaimer">
                <T k="legal.vertical.disclaimer" />
              </p>
            </div>
          </section>
        ) : null}
        {beforeCatalog}
        <section className="light eco-body eco-catalog">
          <div className="wrap">
            {catalogDividerKey ? (
              <header className="eco-catalog-head">
                <h2 className="eco-catalog-title">
                  <T k={catalogDividerKey} />
                </h2>
              </header>
            ) : null}
            {children}
          </div>
        </section>
        <VerticalNavStrip activeSlug={verticalSlug} />
      </main>
    </SiteShell>
  );
}
