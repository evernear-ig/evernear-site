import { Reveal } from "@/components/trinexus/ui/Reveal";
import { Seam } from "@/components/trinexus/ui/Seam";
import { T, THtml } from "@/components/trinexus/ui/T";

const MANIFESTO_LINES = ["mani.1", "mani.2"] as const;

export function ManifestoSection() {
  return (
    <section className="dark manifesto" id="manifesto">
      <Seam />
      <div className="bg" aria-hidden="true">
        <div className="mglow" />
        <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
          <line x1="0" y1="900" x2="720" y2="120" />
          <line x1="720" y1="120" x2="1440" y2="900" />
          <line x1="0" y1="600" x2="1440" y2="560" />
          <circle cx="720" cy="120" r="4" />
          <circle cx="1440" cy="560" r="4" />
          <circle cx="0" cy="600" r="4" />
        </svg>
      </div>
      <div className="wrap" style={{ position: "relative" }}>
        <Reveal>
          <h2 className="mani-head">
            <THtml k="mani.h" />
          </h2>
        </Reveal>
        <Reveal className="mani-text">
          {MANIFESTO_LINES.map((key, index) => (
            <span key={key} className={index > 0 ? "beat" : undefined}>
              <T k={key} />
            </span>
          ))}
        </Reveal>
        <Reveal className="mani-final">
          <T k="mani.final" />
        </Reveal>
      </div>
    </section>
  );
}
