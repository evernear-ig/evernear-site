import { Reveal } from "@/components/trinexus/ui/Reveal";
import { Seam } from "@/components/trinexus/ui/Seam";
import { T, THtml } from "@/components/trinexus/ui/T";

export function WhySection() {
  return (
    <section className="light why" id="about">
      <Seam />
      <div className="ghost" aria-hidden="true">
        3
      </div>
      <div className="wrap">
        <Reveal>
          <h2 className="h-xl">
            <T k="why.h" />
          </h2>
          <div className="why-lead">
            <span>
              <T k="why.l1" />
            </span>
            <span className="beat">
              <T k="why.l2" />
            </span>
            <span className="beat">
              <T k="why.l3" />
            </span>
          </div>
        </Reveal>
        <Reveal className="why-statement">
          <h3 className="h-giant">
            <THtml k="why.big" />
          </h3>
          <p>
            <T k="why.p" />
          </p>
        </Reveal>
      </div>
    </section>
  );
}
