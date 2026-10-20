import Link from "next/link";
import { VerticalCatalogContent } from "@/components/ecosystem/VerticalCatalogContent";
import { VerticalGuideSection } from "@/components/evernear/sections/VerticalGuideSection";
import { VerticalPageShell } from "@/components/ecosystem/VerticalPageShell";
import { T } from "@/components/evernear/ui/T";

export default function ComerciosPage() {
  return (
    <VerticalPageShell
      verticalSlug="comercios"
      beforeCatalog={<VerticalGuideSection verticalSlug="comercios" embedded />}
      catalogDividerKey="eco.catalog.commerce"
    >
      <VerticalCatalogContent
        verticalSlug="comercios"
        beforeFilters={
          <div className="eco-actions">
            <Link href="/comercios/panfleto" className="btn btn-green btn-sm">
              <T k="commerce.panfleto" />
            </Link>
          </div>
        }
      />
    </VerticalPageShell>
  );
}
