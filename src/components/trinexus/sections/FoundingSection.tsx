import { JoinButton } from "@/components/trinexus/ui/JoinButton";
import { Reveal } from "@/components/trinexus/ui/Reveal";
import { T } from "@/components/trinexus/ui/T";

const WHO = [
  { key: "w.students" },
  { key: "w.devs" },
  { key: "w.ents" },
  { key: "w.biz" },
  { key: "w.unis" },
  { key: "w.orgs" },
  { text: "Builders" },
] as const;

const PARTNERS = [
  {
    title: "part.1",
    body: "part.1.p",
    subject: "Technology partnership",
  },
  {
    title: "part.2",
    body: "part.2.p",
    subject: "Education partnership",
  },
  {
    title: "part.3",
    body: "part.3.p",
    subject: "Community partnership",
  },
  {
    title: "part.4",
    body: "part.4.p",
    subject: "Institutional partnership",
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
        <Reveal className="founding-intro">
          <div className="observer">
            <span>
              <T k="found.from" />
            </span>
            <i />
            <b>
              <T k="found.to" />
            </b>
          </div>
          <h2 className="h-xl">
            <T k="found.h" />
          </h2>
          <p className="lead founding-lead">
            <T k="found.lead" />
          </p>
          <div className="who">
            {WHO.map((item, index) => (
              <span key={index}>
                {"key" in item && item.key ? <T k={item.key} /> : item.text}
              </span>
            ))}
          </div>
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
                <a href={`mailto:hello@trinexus.org?subject=${partner.subject}`}>
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
