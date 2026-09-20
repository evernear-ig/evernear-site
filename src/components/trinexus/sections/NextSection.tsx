import { JoinButton } from "@/components/trinexus/ui/JoinButton";
import { Reveal } from "@/components/trinexus/ui/Reveal";
import { Seam } from "@/components/trinexus/ui/Seam";
import { T } from "@/components/trinexus/ui/T";

export function NextSection() {
  return (
    <section className="dark" id="next">
      <Seam />
      <div className="wrap">
        <Reveal>
          <h2 className="h-xl">
            <T k="next.h" />
          </h2>
        </Reveal>
        <Reveal className="event">
          <div className="code">
            001
            <small>
              <T k="next.name" />
            </small>
          </div>
          <div className="stack">
            <div className="status">
              <i />
              <span>
                <T k="next.status" />
              </span>
            </div>
            <h3>TRINEXUS 001</h3>
            <p>
              <T k="next.p" />
            </p>
            <div className="btns">
              <JoinButton className="btn btn-ghost" labelKey="cta.updates" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
