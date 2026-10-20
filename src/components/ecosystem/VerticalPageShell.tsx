import type { ReactNode } from "react";
import { SiteShell } from "@/components/evernear/SiteShell";
import { ScrollSection } from "@/components/evernear/ui/ScrollSection";
import { T } from "@/components/evernear/ui/T";
import { getVerticalCatalog } from "@/lib/ecosystem/vertical-catalog";
import { ECOSYSTEM_VERTICALS, type VerticalSlug } from "@/lib/ecosystem/verticals";
import { VerticalHero } from "./VerticalHero";
import { EcoFoldMotion } from "./EcoFoldMotion";
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
  const catalog = beforeCatalog ? getVerticalCatalog(vertical.slug as VerticalSlug) : null;

  return (
    <SiteShell>
      <main id="main" className="eco-page">
        <div className={beforeCatalog ? "eco-fold" : undefined}>
          <VerticalHero
            slug={vertical.slug}
            accent={vertical.accent}
            imageKey={vertical.imageKey}
            titleKey={vertical.titleKey}
            leadKey={vertical.leadKey}
            stage={Boolean(catalog)}
            asideKey={vertical.slug === "deporte" ? "sport.hero.aside" : catalog?.quoteKey}
            asideFromQuote={vertical.slug !== "deporte"}
          />
          {beforeCatalog}
          {beforeCatalog ? <EcoFoldMotion /> : null}
        </div>
        <ScrollSection>
          <section id="catalogo" className="light eco-body eco-catalog">
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
        </ScrollSection>
        <VerticalNavStrip activeSlug={verticalSlug} />
      </main>
    </SiteShell>
  );
}
