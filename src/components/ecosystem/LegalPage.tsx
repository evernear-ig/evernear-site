import { SiteShell } from "@/components/trinexus/SiteShell";
import { T } from "@/components/trinexus/ui/T";

type LegalPageProps = {
  titleKey: string;
  bodyKeys: readonly string[];
};

export function LegalPage({ titleKey, bodyKeys }: LegalPageProps) {
  return (
    <SiteShell>
      <main id="main" className="eco-page">
        <section className="light eco-body legal-page">
          <div className="wrap legal-wrap">
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
