import { JoinButton } from "@/components/trinexus/ui/JoinButton";
import { Reveal } from "@/components/trinexus/ui/Reveal";
import { T } from "@/components/trinexus/ui/T";

const PARTNERS = [
  {
    title: "part.1",
    body: "part.1.p",
    subject: "Deporte y clubes — CONEXA",
  },
  {
    title: "part.2",
    body: "part.2.p",
    subject: "Salud e instituciones — CONEXA",
  },
  {
    title: "part.3",
    body: "part.3.p",
    subject: "Solidaridad y fundaciones — CONEXA",
  },
  {
    title: "part.4",
    body: "part.4.p",
    subject: "Innovación y educación — CONEXA",
  },
] as const;

export function FoundingSection() {
  return (
    <section className="founding" id="join">
      <svg className="deco" viewBox="0 0 500 460" aria-hidden="true">
        <path d="M250 40 L460 420 L40 420 Z" />
        <line x1="250" y1="40" x2="250" y2="293" />
        <line x1="460" y1="420" x2="250" y2="293" />
        <line x1="40" y1="420" x2="250" y2="293" />
        <g className="spin">
          <circle cx="250" cy="293" r="40" />
          <circle cx="250" cy="293" r="80" strokeDasharray="4 8" />
          <circle cx="250" cy="293" r="120" />
          <circle cx="250" cy="173" r="4" fill="#F6F7FB" />
        </g>
      </svg>
      <div className="wrap" style={{ position: "relative", zIndex: 1 }}>
        <Reveal className="founding-intro sec-head sec-head--center">
          <h2 className="h-xl">
            <T k="found.h" />
          </h2>
          <p className="lead founding-lead">
            <T k="found.lead" />
          </p>
          <div className="btns">
            <JoinButton className="btn btn-green" />
          </div>
        </Reveal>
        <Reveal className="founding-partners" id="partners">
          <div className="partners">
            {PARTNERS.map((partner) => (
              <div key={partner.title} className="partner">
                <div>
                  <h3>
                    <T k={partner.title} />
                  </h3>
                  <p>
                    <T k={partner.body} />
                  </p>
                </div>
                <a href={`mailto:hello@conexa.org?subject=${encodeURIComponent(partner.subject)}`}>
                  <T k="part.cta" />
                </a>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
