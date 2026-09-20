import { JoinButton } from "@/components/trinexus/ui/JoinButton";
import { Reveal } from "@/components/trinexus/ui/Reveal";
import { Seam } from "@/components/trinexus/ui/Seam";
import { T } from "@/components/trinexus/ui/T";

export function FinalCtaSection() {
  return (
    <section className="light final">
      <Seam />
      <div className="wrap grid g-7-5" style={{ alignItems: "center" }}>
        <Reveal>
          <h2 className="h-xl">
            <T k="final.h" />
          </h2>
          <p className="lead" style={{ marginTop: "22px" }}>
            <T k="final.sub" />
          </p>
        </Reveal>
        <Reveal delay={1} className="btns">
          <JoinButton className="btn btn-ink" />
          <a href="#manifesto" className="btn btn-outline-ink">
            <T k="cta.vision" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}
