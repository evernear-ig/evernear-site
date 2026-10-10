import { SiteShell } from "@/components/trinexus/SiteShell";
import { BorderSection } from "@/components/trinexus/sections/BorderSection";
import { EcosystemSection } from "@/components/trinexus/sections/EcosystemSection";
import { FoundingSection } from "@/components/trinexus/sections/FoundingSection";
import { HeroSection } from "@/components/trinexus/sections/HeroSection";
import { PeopleSection } from "@/components/trinexus/sections/PeopleSection";
import { ScrollSection } from "@/components/trinexus/ui/ScrollSection";

export default function Home() {
  return (
    <SiteShell>
      <main id="main">
        <span id="top" />
        <ScrollSection>
          <HeroSection />
        </ScrollSection>
        <ScrollSection>
          <BorderSection />
        </ScrollSection>
        <ScrollSection>
          <PeopleSection />
        </ScrollSection>
        <ScrollSection>
          <EcosystemSection />
        </ScrollSection>
        <ScrollSection>
          <FoundingSection />
        </ScrollSection>
      </main>
    </SiteShell>
  );
}
