import Link from "next/link";
import { ContentSlides, type SlideBlock } from "@/components/ecosystem/ContentSlides";
import { SiteShell } from "@/components/trinexus/SiteShell";
import { T } from "@/components/trinexus/ui/T";

type AboutContentPageProps = {
  titleKey: string;
  leadKey?: string;
  blocks: readonly SlideBlock[];
  footerLinks?: readonly { href: string; key: string }[];
  layout?: "scroll" | "slides";
};

export function AboutContentPage({
  titleKey,
  leadKey,
  blocks,
  footerLinks,
  layout = "scroll",
}: AboutContentPageProps) {
  if (layout === "slides") {
    return (
      <SiteShell>
        <main id="main" className="eco-page about-page about-page--slides">
          <section className="dark about-slides">
            <div className="wrap about-slides-shell">
              <header className="about-slides-head">
                <h1 className="h-xl">
                  <T k={titleKey} />
                </h1>
                {leadKey ? (
                  <p className="lead">
                    <T k={leadKey} />
                  </p>
                ) : null}
              </header>

              <ContentSlides blocks={blocks} priorityImage />

              {footerLinks && footerLinks.length > 0 ? (
                <nav className="about-slides-links" aria-label="Related">
                  <ul>
                    {footerLinks.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} className="btn btn-ghost btn-sm">
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

  return (
    <SiteShell>
      <main id="main" className="eco-page">
        <section className="dark eco-hero eco-hero--about">
          <div className="wrap sec-head sec-head--stack">
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
                {block.list ? (
                  <ul>
                    {block.bodyKeys.map((key) => (
                      <li key={key}>
                        <T k={key} />
                      </li>
                    ))}
                  </ul>
                ) : (
                  block.bodyKeys.map((key) => (
                    <p key={key}>
                      <T k={key} />
                    </p>
                  ))
                )}
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
