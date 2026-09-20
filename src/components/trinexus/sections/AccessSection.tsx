import { AccessBridgeSvg } from "@/components/trinexus/sections/AccessBridgeSvg";
import { Reveal } from "@/components/trinexus/ui/Reveal";
import { Seam } from "@/components/trinexus/ui/Seam";
import { T, THtml } from "@/components/trinexus/ui/T";
import { TrinexusPhoto } from "@/components/trinexus/ui/TrinexusPhoto";

const OPPS = [
  { title: "acc.o1", body: "acc.o1.p" },
  { title: "acc.o2", body: "acc.o2.p" },
  { title: "acc.o3", body: "acc.o3.p" },
  { title: "acc.o4", body: "acc.o4.p" },
  { title: "acc.o5", body: "acc.o5.p" },
  { title: "acc.o6", body: "acc.o6.p" },
] as const;

export function AccessSection() {
  return (
    <section className="dark" id="access">
      <Seam />
      <div className="wrap">
        <Reveal className="grid g-7-5" style={{ alignItems: "end" }}>
          <h2 className="h-xl">
            <T k="acc.h" />
          </h2>
          <p className="lead dim">
            <T k="acc.lead" />
          </p>
        </Reveal>
        <Reveal>
          <figure className="bridge-wrap">
            <TrinexusPhoto imageKey="access.bridge" />
            <AccessBridgeSvg />
          <figcaption className="ph-meta">
            <T k="ph.access" /> · <T k="ph.placeholder" />
          </figcaption>
          </figure>
        </Reveal>
        <Reveal className="opps">
          {OPPS.map((item) => (
            <div key={item.title}>
              <i />
              <h3>
                <T k={item.title} />
              </h3>
              <p>
                <T k={item.body} />
              </p>
            </div>
          ))}
        </Reveal>
        <Reveal>
          <p className="quote" style={{ marginTop: "64px" }}>
            <THtml k="acc.q" />
          </p>
        </Reveal>
      </div>
    </section>
  );
}
