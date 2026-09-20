import { Reveal } from "@/components/trinexus/ui/Reveal";
import { Seam } from "@/components/trinexus/ui/Seam";
import { T, THtml } from "@/components/trinexus/ui/T";
import { TrinexusPhoto } from "@/components/trinexus/ui/TrinexusPhoto";

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

export function BuildSection() {
  return (
    <section className="tint" id="build">
      <Seam />
      <div className="wrap">
        <Reveal className="grid g-7-5" style={{ alignItems: "end" }}>
          <h2 className="h-xl">
            <T k="build.h" />
          </h2>
          <p className="lead">
            <T k="build.lead" />
          </p>
        </Reveal>
        <Reveal>
          <figure className="ph-band">
            <TrinexusPhoto imageKey="build.makers" />
            <figcaption className="ph-meta">
              <T k="ph.build" /> · <T k="ph.placeholder" />
            </figcaption>
          </figure>
        </Reveal>
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
        <Reveal>
          <p className="quote" style={{ marginTop: "64px" }}>
            <THtml k="build.q" />
          </p>
        </Reveal>
      </div>
    </section>
  );
}
