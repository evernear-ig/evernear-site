import type { ReactNode } from "react";
import { SiteShell } from "@/components/trinexus/SiteShell";
import { ECOSYSTEM_VERTICALS } from "@/lib/ecosystem/verticals";
import { VerticalHero } from "./VerticalHero";
import { VerticalNavStrip } from "./VerticalNavStrip";

type VerticalPageShellProps = {
  verticalSlug: string;
  children: ReactNode;
};

export function VerticalPageShell({
  verticalSlug,
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
        <section className="light eco-body">
          <div className="wrap">{children}</div>
        </section>
        <VerticalNavStrip activeSlug={verticalSlug} />
      </main>
    </SiteShell>
  );
}
