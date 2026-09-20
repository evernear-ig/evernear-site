import { Reveal } from "@/components/trinexus/ui/Reveal";
import { Seam } from "@/components/trinexus/ui/Seam";
import { T, THtml } from "@/components/trinexus/ui/T";

const PILLARS = [
  {
    id: "0",
    num: "01",
    title: "pil.learn",
    body: "pil.learn.p",
    more: "pil.learn.m",
    href: "#learn",
    icon: (
      <svg viewBox="0 0 52 52" aria-hidden="true">
        <circle cx="26" cy="26" r="20" />
        <circle cx="26" cy="26" r="4" />
        <line className="a" x1="26" y1="6" x2="26" y2="22" />
      </svg>
    ),
  },
  {
    id: "1",
    num: "02",
    title: "pil.connect",
    body: "pil.connect.p",
    more: "pil.connect.m",
    href: "#connect",
    icon: (
      <svg viewBox="0 0 52 52" aria-hidden="true">
        <circle cx="10" cy="26" r="4" />
        <circle cx="42" cy="26" r="4" />
        <circle className="up" cx="26" cy="10" r="4" />
        <line x1="14" y1="26" x2="38" y2="26" />
        <line className="up" x1="26" y1="14" x2="12" y2="23" />
        <line className="up" x1="26" y1="14" x2="40" y2="23" />
      </svg>
    ),
  },
  {
    id: "2",
    num: "03",
    title: "pil.build",
    body: "pil.build.p",
    more: "pil.build.m",
    href: "#build",
    icon: (
      <svg viewBox="0 0 52 52" aria-hidden="true">
        <rect x="8" y="30" width="36" height="14" />
        <rect className="up" x="14" y="18" width="24" height="12" />
        <rect className="up" x="20" y="8" width="12" height="10" />
      </svg>
    ),
  },
  {
    id: "3",
    num: "04",
    title: "pil.access",
    body: "pil.access.p",
    more: "pil.access.m",
    href: "#access",
    icon: (
      <svg viewBox="0 0 52 52" aria-hidden="true">
        <path d="M8 40 L26 12 L44 40" />
        <line x1="8" y1="40" x2="44" y2="40" />
        <circle className="up" cx="26" cy="12" r="4" />
      </svg>
    ),
  },
] as const;

export function EcosystemSection() {
  return (
    <section className="dark" id="ecosystem">
      <Seam />
      <div className="wrap">
        <Reveal className="grid g-7-5" style={{ alignItems: "end" }}>
          <h2 className="h-xl">
            <THtml k="pil.h" />
          </h2>
          <p className="lead dim">
            <T k="pil.lead" />
          </p>
        </Reveal>
        <Reveal className="pillar-sys">
          <svg className="sys-line" viewBox="0 0 1200 80" aria-hidden="true" preserveAspectRatio="none">
            <line className="rail" x1="150" y1="30" x2="1050" y2="30" />
            <line className="beam" x1="150" y1="30" x2="1050" y2="30" />
            <line className="stem" data-p="0" x1="150" y1="30" x2="150" y2="80" />
            <line className="stem" data-p="1" x1="450" y1="30" x2="450" y2="80" />
            <line className="stem" data-p="2" x1="750" y1="30" x2="750" y2="80" />
            <line className="stem" data-p="3" x1="1050" y1="30" x2="1050" y2="80" />
            <circle className="pn" data-p="0" cx="150" cy="30" r="6" />
            <circle className="pn" data-p="1" cx="450" cy="30" r="6" />
            <circle className="pn" data-p="2" cx="750" cy="30" r="6" />
            <circle className="pn" data-p="3" cx="1050" cy="30" r="6" />
          </svg>
          <div className="pillars" id="pillars">
            {PILLARS.map((pillar) => (
              <div key={pillar.id} className="pillar" data-p={pillar.id}>
                <span className="pnum" aria-hidden="true">
                  {pillar.num}
                </span>
                {pillar.icon}
                <h3>
                  <T k={pillar.title} />
                </h3>
                <p>
                  <T k={pillar.body} />
                </p>
                <div className="more">
                  <T k={pillar.more} />
                </div>
                <a href={pillar.href}>
                  <T k="pil.link" />
                </a>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
