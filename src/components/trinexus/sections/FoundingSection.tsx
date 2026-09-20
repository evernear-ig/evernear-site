import { JoinButton } from "@/components/trinexus/ui/JoinButton";
import { Reveal } from "@/components/trinexus/ui/Reveal";
import { T, THtml } from "@/components/trinexus/ui/T";

const WHO = [
  { key: "w.students" },
  { key: "w.devs" },
  { key: "w.ents" },
  { key: "w.biz" },
  { key: "w.unis" },
  { key: "w.orgs" },
  { text: "Builders" },
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
        <Reveal style={{ maxWidth: "42em" }}>
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
          <p className="lead" style={{ marginTop: "22px" }}>
            <T k="found.sub" />
          </p>
          <p style={{ marginTop: "18px" }}>
            <T k="found.p" />
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
          <p className="quote" style={{ marginTop: "56px", color: "var(--white)" }}>
            <THtml k="found.q" />
          </p>
        </Reveal>
      </div>
    </section>
  );
}
