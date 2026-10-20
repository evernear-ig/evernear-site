import { AccessBridgeSvg } from "@/components/evernear/sections/AccessBridgeSvg";
import { Scene3D } from "@/components/evernear/three/Scene3D";
import { EcoSectionFrame } from "@/components/evernear/ui/EcoSectionFrame";
import { Reveal } from "@/components/evernear/ui/Reveal";
import { T, THtml } from "@/components/evernear/ui/T";
import { EvernearPhoto } from "@/components/evernear/ui/EvernearPhoto";

const OPPS = [
  { title: "acc.o1", body: "acc.o1.p" },
  { title: "acc.o2", body: "acc.o2.p" },
  { title: "acc.o3", body: "acc.o3.p" },
  { title: "acc.o4", body: "acc.o4.p" },
  { title: "acc.o5", body: "acc.o5.p" },
  { title: "acc.o6", body: "acc.o6.p" },
] as const;

export function AccessSection({ embedded = false }: { embedded?: boolean }) {
  return (
    <EcoSectionFrame
      embedded={embedded}
      className="dark"
      id="access"
      backdrop={<Scene3D variant="arc" className="scene3d--wide" />}
    >
        <Reveal className="grid g-7-5" style={{ alignItems: "end" }}>
          <h2 className="h-xl">
            <T k="acc.h" />
          </h2>
          <p className="lead">
            <T k="acc.lead" />
          </p>
        </Reveal>
        <Reveal>
          <figure className="bridge-wrap">
            <EvernearPhoto imageKey="access.bridge" />
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
    </EcoSectionFrame>
  );
}
