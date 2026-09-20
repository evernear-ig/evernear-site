import { I18nAria } from "@/components/trinexus/ui/I18nAria";
import { EcoSectionFrame } from "@/components/trinexus/ui/EcoSectionFrame";
import { Reveal } from "@/components/trinexus/ui/Reveal";
import { T, THtml } from "@/components/trinexus/ui/T";
import { TrinexusPhoto } from "@/components/trinexus/ui/TrinexusPhoto";

const PATH_STEPS = [
  { title: "learn.s1", body: "learn.s1.p" },
  { title: "learn.s2", body: "learn.s2.p" },
  { title: "learn.s3", body: "learn.s3.p" },
  { title: "learn.s4", body: "learn.s4.p" },
] as const;

const LIST_ITEMS = [
  { title: "learn.f1", sub: "learn.f1.s" },
  { title: "learn.f2", sub: "learn.f2.s" },
  { title: "learn.f3", sub: "learn.f3.s" },
  { title: "learn.f4", sub: "learn.f4.s" },
  { title: "learn.f5", sub: "learn.f5.s" },
  { title: "learn.f6", sub: "learn.f6.s" },
] as const;

export function LearnSection({ embedded = false }: { embedded?: boolean }) {
  return (
    <EcoSectionFrame embedded={embedded} className="light" id="learn">
        <Reveal className="grid g-5-7">
          <h2 className="h-xl">
            <T k="learn.h" />
          </h2>
          <div>
            <p className="lead">
              <T k="learn.lead" />
            </p>
          </div>
        </Reveal>
        <Reveal className="path" a11yKey="learn.path.aria">
          {PATH_STEPS.map((step) => (
            <div key={step.title}>
              <b>
                <T k={step.title} />
              </b>
              <span>
                <T k={step.body} />
              </span>
            </div>
          ))}
        </Reveal>
        <Reveal className="grid g-5-7" style={{ marginTop: "88px" }}>
          <div>
            <figure className="ph-figure">
              <TrinexusPhoto imageKey="learn.workshop" />
              <svg className="ph-tri" viewBox="0 0 44 44" aria-hidden="true">
                <path d="M22 6 L38 34 L6 34 Z" />
                <circle className="c" cx="22" cy="6" r="2.5" />
                <circle className="c" cx="38" cy="34" r="2.5" />
                <circle className="c" cx="6" cy="34" r="2.5" />
                <circle className="g" cx="22" cy="25" r="3" />
              </svg>
              <figcaption className="ph-meta">
                <T k="ph.learn" /> · <T k="ph.placeholder" />
              </figcaption>
            </figure>
            <I18nAria k="learn.topics" as="div" className="chips">
              <span className="chip">Blockchain</span>
              <span className="chip">
                <T k="t.ai" />
              </span>
              <span className="chip">
                <T k="t.prog" />
              </span>
              <span className="chip">Web3</span>
              <span className="chip">Open Source</span>
              <span className="chip">
                <T k="t.fin" />
              </span>
              <span className="chip">
                <T k="t.ent" />
              </span>
              <span className="chip">Startups</span>
            </I18nAria>
          </div>
          <div>
            <ul className="list-lg">
              {LIST_ITEMS.map((item) => (
                <li key={item.title}>
                  <span>
                    <T k={item.title} />
                  </span>
                  <small>
                    <T k={item.sub} />
                  </small>
                </li>
              ))}
            </ul>
            <p className="quote" style={{ marginTop: "48px" }}>
              <THtml k="learn.q" />
            </p>
          </div>
        </Reveal>
    </EcoSectionFrame>
  );
}
