"use client";

import { TransitionLink } from "@/components/trinexus/ui/TransitionLink";
import { T } from "@/components/trinexus/ui/T";
import { TrinexusPhoto } from "@/components/trinexus/ui/TrinexusPhoto";

export type SlideBlock = {
  titleKey: string;
  deckKey?: string;
  bodyKeys: readonly string[];
  imageKey: string;
  list?: boolean;
};

type AboutSlidesPageProps = {
  titleKey: string;
  leadKey?: string;
  introKey?: string;
  heroImageKey: string;
  blocks?: readonly SlideBlock[];
  footerLinks?: readonly { href: string; key: string }[];
};

export function AboutSlidesPage({
  titleKey,
  leadKey,
  introKey,
  heroImageKey,
  blocks = [],
  footerLinks,
}: AboutSlidesPageProps) {
  const footer =
    footerLinks && footerLinks.length > 0 ? (
      <nav className="about-full-links" aria-label="Related">
        <ul className="btns">
          {footerLinks.map((link) => (
            <li key={link.href}>
              <TransitionLink
                href={link.href}
                transition={
                  link.href.startsWith("#") || link.href.startsWith("/#")
                    ? "fade"
                    : "forward"
                }
                className="btn btn-ghost btn-sm"
              >
                <T k={link.key} />
              </TransitionLink>
            </li>
          ))}
        </ul>
      </nav>
    ) : null;

  return (
    <section id="que-es" className="dark eco-hero eco-hero--about-full">
      <div className="eco-hero-bg" aria-hidden="true">
        <div className="about-full-photo-layer">
          <TrinexusPhoto imageKey={heroImageKey} className="eco-hero-photo" priority />
        </div>
        <div className="eco-hero-veil" />
      </div>

      <div className="wrap eco-hero-content about-full-content">
        <header className="about-full-head sec-head sec-head--center">
          <h1 className="h-xl">
            <T k={titleKey} />
          </h1>
          {leadKey ? (
            <p className="lead">
              <T k={leadKey} />
            </p>
          ) : null}
          {introKey ? (
            <p className="about-full-intro">
              <T k={introKey} />
            </p>
          ) : null}
          {footer}
        </header>

        <div className="about-full-pillars">
          {blocks.map((block) => (
            <article key={block.titleKey} className="about-pillar">
              <h2 className="about-pillar-title">
                <T k={block.titleKey} />
              </h2>
              {block.deckKey ? (
                <p className="about-pillar-deck">
                  <T k={block.deckKey} />
                </p>
              ) : null}
              {block.list ? (
                <ul className="about-pillar-list">
                  {block.bodyKeys.map((key) => (
                    <li key={key}>
                      <T k={key} />
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="about-pillar-body">
                  {block.bodyKeys.map((key) => (
                    <p key={key}>
                      <T k={key} />
                    </p>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
