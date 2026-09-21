import Link from "next/link";
import { SiteShell } from "@/components/trinexus/SiteShell";
import { T } from "@/components/trinexus/ui/T";

type ContentBlock = {
  titleKey: string;
  bodyKeys: readonly string[];
};

type AboutContentPageProps = {
  titleKey: string;
  leadKey?: string;
  blocks: readonly ContentBlock[];
  footerLinks?: readonly { href: string; key: string }[];
};

export function AboutContentPage({
  titleKey,
  leadKey,
  blocks,
  footerLinks,
}: AboutContentPageProps) {
  return (
    <SiteShell>
      <main id="main" className="eco-page">
        <section className="dark eco-hero eco-hero--about">
          <div className="wrap">
            <h1 className="h-xl">
              <T k={titleKey} />
            </h1>
            {leadKey ? (
              <p className="lead">
                <T k={leadKey} />
              </p>
            ) : null}
          </div>
        </section>
        <section className="light eco-body about-page">
          <div className="wrap about-wrap">
            {blocks.map((block) => (
              <article key={block.titleKey} className="about-block">
                <h2 className="about-block-title">
                  <T k={block.titleKey} />
                </h2>
                {block.bodyKeys.map((key) => (
                  <p key={key}>
                    <T k={key} />
                  </p>
                ))}
              </article>
            ))}
            {footerLinks && footerLinks.length > 0 ? (
              <nav className="about-links" aria-label="Related">
                <ul>
                  {footerLinks.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href}>
                        <T k={link.key} />
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ) : null}
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
