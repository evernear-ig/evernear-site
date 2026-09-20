import { Reveal } from "@/components/trinexus/ui/Reveal";
import { Seam } from "@/components/trinexus/ui/Seam";
import { T, THtml } from "@/components/trinexus/ui/T";

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

export function PartnersSection() {
  return (
    <section className="light" id="partners">
      <Seam />
      <div className="wrap">
        <Reveal className="grid g-7-5" style={{ alignItems: "end" }}>
          <h2 className="h-xl">
            <T k="part.h" />
          </h2>
          <p className="lead">
            <T k="part.lead" />
          </p>
        </Reveal>
        <Reveal className="partners">
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
        </Reveal>
      </div>
    </section>
  );
}
