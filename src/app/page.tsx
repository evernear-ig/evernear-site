import { SiteShell } from "@/components/trinexus/SiteShell";
import { AccessSection } from "@/components/trinexus/sections/AccessSection";
import { BorderSection } from "@/components/trinexus/sections/BorderSection";
import { BuildSection } from "@/components/trinexus/sections/BuildSection";
import { ConnectSection } from "@/components/trinexus/sections/ConnectSection";
import { EcosystemSection } from "@/components/trinexus/sections/EcosystemSection";
import { FinalCtaSection } from "@/components/trinexus/sections/FinalCtaSection";
import { FoundingSection } from "@/components/trinexus/sections/FoundingSection";
import { FutureSection } from "@/components/trinexus/sections/FutureSection";
import { HeroSection } from "@/components/trinexus/sections/HeroSection";
import { LearnSection } from "@/components/trinexus/sections/LearnSection";
import { ManifestoSection } from "@/components/trinexus/sections/ManifestoSection";
import { NextSection } from "@/components/trinexus/sections/NextSection";
import { PartnersSection } from "@/components/trinexus/sections/PartnersSection";
import { PeopleSection } from "@/components/trinexus/sections/PeopleSection";
export default function Home() {
  return (
    <SiteShell>
      <main id="main">
        <span id="top" />
        <HeroSection />
        <BorderSection />
        <PeopleSection />
        <EcosystemSection />
        <LearnSection />
        <ConnectSection />
        <BuildSection />
        <AccessSection />
        <FutureSection />
        <NextSection />
        <FoundingSection />
        <PartnersSection />
        <ManifestoSection />
        <FinalCtaSection />
      </main>
    </SiteShell>
  );
}
