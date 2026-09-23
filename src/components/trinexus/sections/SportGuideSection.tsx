import { JoinButton } from "@/components/trinexus/ui/JoinButton";
import { EcoSectionFrame } from "@/components/trinexus/ui/EcoSectionFrame";
import { Reveal } from "@/components/trinexus/ui/Reveal";
import { T, THtml } from "@/components/trinexus/ui/T";
import { CityBadge } from "@/components/ecosystem/CityBadge";
import type { CityId } from "@/lib/ecosystem/cities";

const PATH_STEPS = [
  { title: "sport.guide.s1", body: "sport.guide.s1.p" },
  { title: "sport.guide.s2", body: "sport.guide.s2.p" },
  { title: "sport.guide.s3", body: "sport.guide.s3.p" },
  { title: "sport.guide.s4", body: "sport.guide.s4.p" },
] as const;

const AUDIENCES = [
  { title: "join.org.sport.club", sub: "sport.guide.a1.s" },
  { title: "join.org.sport.athlete", sub: "sport.guide.a2.s" },
  { title: "sport.guide.a3", sub: "sport.guide.a3.s" },
  { title: "join.org.sport.sponsor", sub: "sport.guide.a4.s" },
] as const;

const REGION_CITIES: CityId[] = ["pi", "foz", "cde"];

export function SportGuideSection({ embedded = false }: { embedded?: boolean }) {
  return (
    <EcoSectionFrame embedded={embedded} className="light" id="sport-guide">
      <Reveal className="grid g-5-7">
        <h2 className="h-xl">
          <T k="sport.guide.h" />
        </h2>
        <div>
          <p className="lead">
            <T k="sport.guide.lead" />
          </p>
          <p className="eco-disclaimer eco-disclaimer--muted" style={{ marginTop: "1.25em" }}>
            <T k="sport.guide.disclaimer" />
          </p>
        </div>
      </Reveal>

      <Reveal className="path" a11yKey="sport.guide.path.aria">
        {PATH_STEPS.map((step) => (
          <div key={step.title}>
            <b>
              <T k={step.title} />
            </b>
            <span>
              <T k={step.body} />
            </span>
          </div>
        ))}
      </Reveal>

      <Reveal className="grid g-5-7 sport-guide-grid" style={{ marginTop: "88px" }}>
        <div className="sport-guide-region">
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
        </div>
        <div>
          <h3 className="sport-guide-audience-title">
            <T k="sport.guide.audience.h" />
          </h3>
          <ul className="list-lg">
            {AUDIENCES.map((item) => (
              <li key={item.title}>
                <span>
                  <T k={item.title} />
                </span>
                <small>
                  <T k={item.sub} />
                </small>
              </li>
            ))}
          </ul>
          <p className="quote" style={{ marginTop: "48px" }}>
            <THtml k="sport.guide.q" />
          </p>
          <JoinButton
            className="btn btn-green"
            labelKey="sport.guide.cta"
            prefill={{ track: "sport" }}
          />
        </div>
      </Reveal>
    </EcoSectionFrame>
  );
}
