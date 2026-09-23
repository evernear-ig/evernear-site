import Link from "next/link";
import {
  AboutSlidesPage,
  type SlideBlock,
} from "@/components/ecosystem/AboutSlidesPage";
import { SiteShell } from "@/components/trinexus/SiteShell";
import { TransitionLink } from "@/components/trinexus/ui/TransitionLink";
import { T } from "@/components/trinexus/ui/T";

type AboutContentPageProps = {
  titleKey: string;
  leadKey?: string;
  heroImageKey?: string;
  blocks?: readonly SlideBlock[];
  footerLinks?: readonly { href: string; key: string }[];
  layout?: "scroll" | "fullscreen";
};

export function AboutContentPage({
  titleKey,
  leadKey,
  heroImageKey = "about.vision",
  blocks = [],
  footerLinks,
  layout = "scroll",
}: AboutContentPageProps) {
  if (layout === "fullscreen") {
    return (
      <SiteShell>
        <main id="main" className="eco-page about-page about-page--full">
          <AboutSlidesPage
            titleKey={titleKey}
            leadKey={leadKey}
            heroImageKey={heroImageKey}
            blocks={blocks}
            footerLinks={footerLinks}
          />
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
                      <TransitionLink
                        href={link.href}
                        transition={link.href.startsWith("/#") ? "fade" : "forward"}
                        className="btn btn-outline btn-sm"
                      >
                        <T k={link.key} />
                      </TransitionLink>
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
