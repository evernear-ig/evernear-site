import { Suspense } from "react";
import { DiscoveryPageContent } from "@/components/ecosystem/DiscoveryPageContent";
import { VerticalPageShell } from "@/components/ecosystem/VerticalPageShell";
import { AccessSection } from "@/components/trinexus/sections/AccessSection";
import { BuildSection } from "@/components/trinexus/sections/BuildSection";
import { ConnectSection } from "@/components/trinexus/sections/ConnectSection";

export default function DescubrimientoPage() {
  return (
    <VerticalPageShell
      verticalSlug="descubrimiento"
      beforeCatalog={
        <>
          <ConnectSection embedded />
          <AccessSection embedded />
          <BuildSection embedded variant="community" />
        </>
      }
      catalogDividerKey="eco.catalog.directory"
    >
      <Suspense fallback={null}>
        <DiscoveryPageContent />
      </Suspense>
    </VerticalPageShell>
  );
}
