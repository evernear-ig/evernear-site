import { FoundingSection } from "@/components/trinexus/sections/FoundingSection";
import { T } from "@/components/trinexus/ui/T";
import { Suspense } from "react";
import { HistoriasPageContent } from "@/components/ecosystem/HistoriasPageContent";

const INFO_BLOCKS = [
  {
    titleKey: "info.role.h",
    bodyKeys: ["info.role.p1", "info.role.p2"],
  },
  {
    titleKey: "info.region.h",
    bodyKeys: ["info.region.p1", "info.region.p2"],
  },
  {
    titleKey: "info.how.h",
    bodyKeys: ["info.how.p1", "info.how.p2"],
  },
] as const;

function LegalChapter({
  id,
  titleKey,
  bodyKeys,
}: {
  id: string;
  titleKey: string;
  bodyKeys: readonly string[];
}) {
  return (
    <section id={id} className="about-journey-chapter about-journey-chapter--legal">
      <div className="wrap">
        <article className="about-journey-block">
          <h2>
            <T k={titleKey} />
          </h2>
          {bodyKeys.map((key) => (
            <p key={key}>
              <T k={key} />
            </p>
          ))}
        </article>
      </div>
    </section>
  );
}

export function AboutJourneyChapters() {
  return (
    <>
      <section id="informacion" className="about-journey-chapter about-journey-chapter--info">
        <div className="wrap about-journey-chapter__grid">
          <header className="about-journey-chapter__head">
            <h2 className="h-xl">
              <T k="info.page.h" />
            </h2>
            <p className="lead">
              <T k="info.page.lead" />
            </p>
          </header>
          <div className="about-journey-chapter__body">
            {INFO_BLOCKS.map((block) => (
              <article key={block.titleKey} className="about-journey-block">
                <h3>
                  <T k={block.titleKey} />
                </h3>
                {block.bodyKeys.map((key) => (
                  <p key={key}>
                    <T k={key} />
                  </p>
                ))}
              </article>
            ))}
          </div>
        </div>
      </section>

      <Suspense>
        <HistoriasPageContent asChapter />
      </Suspense>

      <FoundingSection />

      <LegalChapter
        id="terminos"
        titleKey="legal.terms"
        bodyKeys={["legal.terms.p1", "legal.terms.p2", "legal.terms.p3"]}
      />
      <LegalChapter
        id="privacidad"
        titleKey="legal.privacy"
        bodyKeys={["legal.privacy.p1", "legal.privacy.p2", "legal.privacy.p3"]}
      />
    </>
  );
}
