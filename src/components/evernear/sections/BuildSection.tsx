import { EcoSectionFrame } from "@/components/evernear/ui/EcoSectionFrame";
import { Reveal } from "@/components/evernear/ui/Reveal";
import { T, THtml } from "@/components/evernear/ui/T";
import { EvernearPhoto } from "@/components/evernear/ui/EvernearPhoto";

type BuildSectionVariant = "full" | "events" | "community";

const JOURNEY = [
  { key: "build.j1" },
  { key: "build.j2" },
  { key: "build.j3" },
  { key: "build.j4" },
  { key: "build.j5" },
] as const;

const TAGS = [
  { title: "Hackathons", subKey: "build.t1" },
  { titleKey: "build.t2", subKey: "build.t2.s" },
  { title: "Open Source", subKey: "build.t3" },
  { title: "Startups", subKey: "build.t4" },
  { titleKey: "build.t5", subKey: "build.t5.s" },
] as const;

export function BuildSection({
  embedded = false,
  variant = "full",
}: {
  embedded?: boolean;
  variant?: BuildSectionVariant;
}) {
  const showHeader = variant !== "community";
  const showPhoto = variant !== "community";
  const showJourney = variant === "full" || variant === "events";
  const showTags = variant === "full" || variant === "community";

  return (
    <EcoSectionFrame embedded={embedded} className="tint" id="build">
      {showHeader ? (
        <Reveal className="grid g-7-5" style={{ alignItems: "end" }}>
          <h2 className="h-xl">
            <T k="build.h" />
          </h2>
          <p className="lead">
            <T k="build.lead" />
          </p>
        </Reveal>
      ) : null}
      {showPhoto ? (
        <Reveal>
          <figure className="ph-band">
            <EvernearPhoto imageKey="build.makers" />
            <figcaption className="ph-meta">
              <T k="ph.build" /> · <T k="ph.placeholder" />
            </figcaption>
          </figure>
        </Reveal>
      ) : null}
      {showJourney ? (
        <Reveal className="journey" a11yKey="build.j.aria">
          {JOURNEY.map((step, index) => (
            <div key={step.key} className="step">
              <div className="k">{String(index + 1).padStart(2, "0")}</div>
              <div className="v">
                <T k={step.key} />
              </div>
            </div>
          ))}
        </Reveal>
      ) : null}
      {showTags ? (
        <Reveal className="tags-lg">
          {TAGS.map((tag) => (
            <div key={tag.subKey}>
              {"titleKey" in tag && tag.titleKey ? <T k={tag.titleKey} /> : tag.title}
              <small>
                <T k={tag.subKey} />
              </small>
            </div>
          ))}
        </Reveal>
      ) : null}
      {showJourney || showTags ? (
        <Reveal>
          <p className="quote" style={{ marginTop: "64px" }}>
            <THtml k="build.q" />
          </p>
        </Reveal>
      ) : null}
    </EcoSectionFrame>
  );
}
