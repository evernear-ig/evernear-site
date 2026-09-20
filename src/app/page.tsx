import { SiteShell } from "@/components/trinexus/SiteShell";
import { BorderSection } from "@/components/trinexus/sections/BorderSection";
import { EcosystemSection } from "@/components/trinexus/sections/EcosystemSection";
import { FoundingSection } from "@/components/trinexus/sections/FoundingSection";
import { HeroSection } from "@/components/trinexus/sections/HeroSection";
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
        <FoundingSection />
      </main>
    </SiteShell>
  );
}
