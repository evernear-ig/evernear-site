import { SiteShell } from "@/components/evernear/SiteShell";
import { BorderSection } from "@/components/evernear/sections/BorderSection";
import { EcosystemSection } from "@/components/evernear/sections/EcosystemSection";
import { FoundingSection } from "@/components/evernear/sections/FoundingSection";
import { HeroSection } from "@/components/evernear/sections/HeroSection";
import { PeopleSection } from "@/components/evernear/sections/PeopleSection";
import { ScrollSection } from "@/components/evernear/ui/ScrollSection";

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
