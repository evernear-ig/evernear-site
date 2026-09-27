import { VerticalAudienceCarousel } from "@/components/trinexus/sections/VerticalAudienceCarousel";
import { EcoSectionFrame } from "@/components/trinexus/ui/EcoSectionFrame";
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
      <div className="sport-guide-body">
        <div className="sport-guide-audience">
          <h3 className="eco-aud-label">
            <T k={`${prefix}.guide.audience.h`} />
          </h3>
          <VerticalAudienceCarousel
            prefix={prefix}
            items={config.audienceItems}
            imageKeys={config.listings.map((item) => item.imageKey)}
            quoteKey={config.quoteKey}
            ctaKey={config.ctaKey}
            exploreKey="cta.fold.explore"
            joinTrack={config.joinTrack}
          />
        </div>
      </div>
    </EcoSectionFrame>
  );
}
