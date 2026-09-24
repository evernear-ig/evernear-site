import { VerticalAudienceCarousel } from "@/components/trinexus/sections/VerticalAudienceCarousel";
import { VerticalPathCarousel } from "@/components/trinexus/sections/VerticalPathCarousel";
import { EcoSectionFrame } from "@/components/trinexus/ui/EcoSectionFrame";
import { Reveal } from "@/components/trinexus/ui/Reveal";
import { T } from "@/components/trinexus/ui/T";
import { getVerticalCatalog } from "@/lib/ecosystem/vertical-catalog";
import type { VerticalSlug } from "@/lib/ecosystem/verticals";

type VerticalGuideSectionProps = {
  verticalSlug: VerticalSlug;
  embedded?: boolean;
};

export function VerticalGuideSection({
  verticalSlug,
  embedded = false,
}: VerticalGuideSectionProps) {
  const config = getVerticalCatalog(verticalSlug);
  const { prefix } = config;

  return (
    <EcoSectionFrame embedded={embedded} className="light" id={`${prefix}-guide`}>
      <Reveal>
        <VerticalPathCarousel prefix={prefix} steps={config.pathSteps} />
      </Reveal>

      <Reveal className="sport-guide-body">
        <div className="sport-guide-audience">
          <h3 className="sport-guide-audience-title">
            <T k={`${prefix}.guide.audience.h`} />
          </h3>
          <VerticalAudienceCarousel
            prefix={prefix}
            items={config.audienceItems}
            quoteKey={config.quoteKey}
            ctaKey={config.ctaKey}
            joinTrack={config.joinTrack}
          />
        </div>
      </Reveal>

      <Reveal className="sport-guide-disclaimer">
        <p className="eco-disclaimer eco-disclaimer--muted">
          <T k={config.disclaimerKey} />
        </p>
      </Reveal>
    </EcoSectionFrame>
  );
}
