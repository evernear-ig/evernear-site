import { SiteShell } from "@/components/evernear/SiteShell";
import { T } from "@/components/evernear/ui/T";

type LegalPageProps = {
  titleKey: string;
  bodyKeys: readonly string[];
};

export function LegalPage({ titleKey, bodyKeys }: LegalPageProps) {
  return (
    <SiteShell>
      <main id="main" className="eco-page legal-page">
        <section className="dark eco-hero eco-hero--about legal-page__section">
          <div className="wrap legal-wrap sec-head sec-head--stack">
            <h1 className="h-xl">
              <T k={titleKey} />
            </h1>
            {bodyKeys.map((key) => (
              <p key={key}>
                <T k={key} />
              </p>
            ))}
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
