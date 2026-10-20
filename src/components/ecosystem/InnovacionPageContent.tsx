import { T } from "@/components/evernear/ui/T";

const PILLARS = [
  {
    num: "01",
    title: "pil.learn",
    body: "pil.learn.p",
    more: "pil.learn.m",
    href: "/educacion",
  },
  {
    num: "02",
    title: "pil.connect",
    body: "pil.connect.p",
    more: "pil.connect.m",
    href: "/descubrimiento",
  },
  {
    num: "03",
    title: "pil.build",
    body: "pil.build.p",
    more: "pil.build.m",
    href: "/eventos",
  },
  {
    num: "04",
    title: "pil.access",
    body: "pil.access.p",
    more: "pil.access.m",
    href: "/descubrimiento?tab=opportunities",
  },
] as const;

export function InnovacionPageContent() {
  return (
    <div className="innovacion-pillars">
      <p className="lead dim innovacion-lead">
        <T k="pil.lead" />
      </p>
      <div className="pillars innovacion-pillar-grid">
        {PILLARS.map((pillar) => (
          <div key={pillar.num} className="pillar">
            <span className="pnum" aria-hidden="true">{pillar.num}</span>
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
    </div>
  );
}
