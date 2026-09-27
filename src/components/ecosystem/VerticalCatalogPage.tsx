import { VerticalCatalogContent } from "@/components/ecosystem/VerticalCatalogContent";
import { VerticalGuideSection } from "@/components/trinexus/sections/VerticalGuideSection";
import { VerticalPageShell } from "@/components/ecosystem/VerticalPageShell";
import { getVerticalCatalog } from "@/lib/ecosystem/vertical-catalog";
import type { VerticalSlug } from "@/lib/ecosystem/verticals";

type VerticalCatalogPageProps = {
  verticalSlug: VerticalSlug;
};

export function VerticalCatalogPage({
  verticalSlug,
}: VerticalCatalogPageProps) {
  const config = getVerticalCatalog(verticalSlug);

  return (
    <VerticalPageShell
      verticalSlug={verticalSlug}
      beforeCatalog={<VerticalGuideSection verticalSlug={verticalSlug} embedded />}
      catalogDividerKey={config.catalogDividerKey}
    >
      <VerticalCatalogContent verticalSlug={verticalSlug} />
    </VerticalPageShell>
  );
}
