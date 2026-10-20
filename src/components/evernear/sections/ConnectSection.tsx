import { ConnectNetwork } from "@/components/evernear/sections/ConnectNetwork";
import { Scene3D } from "@/components/evernear/three/Scene3D";
import { EcoSectionFrame } from "@/components/evernear/ui/EcoSectionFrame";
import { Reveal } from "@/components/evernear/ui/Reveal";
import { T, THtml } from "@/components/evernear/ui/T";

const ROLES = ["con.r1", "con.r2", "con.r3", "con.r4", "con.r5", "con.r6"] as const;

export function ConnectSection({ embedded = false }: { embedded?: boolean }) {
  return (
    <EcoSectionFrame
      embedded={embedded}
      className="dark"
      id="connect"
      backdrop={<Scene3D variant="network" className="scene3d--right" />}
    >
      <div className="grid g-7-5">
        <Reveal>
          <ConnectNetwork />
        </Reveal>
        <Reveal delay={1} className="stack">
          <h2 className="h-xl">
            <T k="con.h" />
          </h2>
          <p className="lead">
            <T k="con.lead" />
          </p>
          <div className="roles">
            {ROLES.map((key) => (
              <div key={key}>
                <THtml k={key} />
              </div>
            ))}
          </div>
          <p className="quote">
            <THtml k="con.q" />
          </p>
        </Reveal>
      </div>
    </EcoSectionFrame>
  );
}
