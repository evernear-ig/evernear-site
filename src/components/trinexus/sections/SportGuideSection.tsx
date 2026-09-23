import { EcoSectionFrame } from "@/components/trinexus/ui/EcoSectionFrame";
import { Reveal } from "@/components/trinexus/ui/Reveal";
import { T } from "@/components/trinexus/ui/T";
import { CityBadge } from "@/components/ecosystem/CityBadge";
import { SportAudienceScrub } from "@/components/trinexus/sections/SportAudienceBlock";
import { SportPathScrub } from "@/components/trinexus/sections/SportPathScrub";
import type { CityId } from "@/lib/ecosystem/cities";

const REGION_CITIES: CityId[] = ["pi", "foz", "cde"];

export function SportGuideSection({ embedded = false }: { embedded?: boolean }) {
  return (
    <EcoSectionFrame embedded={embedded} className="light" id="sport-guide">
      <SportPathScrub />

      <Reveal className="sport-guide-grid-wrap">
        <SportAudienceScrub
          region={
            <>
              <h3 className="sport-guide-region-title">
                <T k="sport.guide.region.h" />
              </h3>
              <p>
                <T k="sport.guide.region.p" />
              </p>
              <div className="sport-guide-cities">
                {REGION_CITIES.map((cityId) => (
                  <CityBadge key={cityId} cityId={cityId} />
                ))}
              </div>
            </>
          }
        />
      </Reveal>

      <Reveal className="sport-guide-disclaimer">
        <p className="eco-disclaimer eco-disclaimer--muted">
          <T k="sport.guide.disclaimer" />
        </p>
      </Reveal>
    </EcoSectionFrame>
  );
}
