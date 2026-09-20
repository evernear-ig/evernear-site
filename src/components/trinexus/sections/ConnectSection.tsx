import { ConnectNetwork } from "@/components/trinexus/sections/ConnectNetwork";
import { Reveal } from "@/components/trinexus/ui/Reveal";
import { Seam } from "@/components/trinexus/ui/Seam";
import { T, THtml } from "@/components/trinexus/ui/T";

const ROLES = ["con.r1", "con.r2", "con.r3", "con.r4", "con.r5", "con.r6"] as const;

export function ConnectSection() {
  return (
    <section className="dark" id="connect">
      <Seam />
      <div className="wrap grid g-7-5">
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
    </section>
  );
}
