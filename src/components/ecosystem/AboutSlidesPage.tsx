"use client";

import { useState } from "react";
import { Carousel } from "@/components/trinexus/ui/Carousel";
import { TransitionLink } from "@/components/trinexus/ui/TransitionLink";
import { T } from "@/components/trinexus/ui/T";
import { TrinexusPhoto } from "@/components/trinexus/ui/TrinexusPhoto";

export type SlideBlock = {
  titleKey: string;
  bodyKeys: readonly string[];
  imageKey: string;
  list?: boolean;
};

type AboutSlidesPageProps = {
  titleKey: string;
  leadKey?: string;
  heroImageKey: string;
  blocks?: readonly SlideBlock[];
  footerLinks?: readonly { href: string; key: string }[];
};

export function AboutSlidesPage({
  titleKey,
  leadKey,
  heroImageKey,
  blocks = [],
  footerLinks,
}: AboutSlidesPageProps) {
  const [index, setIndex] = useState(0);
  const count = blocks.length;
  const active = count > 0 ? blocks[index] : null;
  const imageKey = active?.imageKey ?? heroImageKey;

  const slides = blocks.map((block) => (
    <article key={block.titleKey} className="about-full-slide">
      <h2 className="about-full-slide-title">
        <T k={block.titleKey} />
      </h2>
      {block.list ? (
        <div className="about-full-slide-body">
          <ul className="about-full-slide-list">
            {block.bodyKeys.map((key) => (
              <li key={key}>
                <T k={key} />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="about-full-slide-body">
          {block.bodyKeys.map((key) => (
            <p key={key}>
              <T k={key} />
            </p>
          ))}
        </div>
      )}
    </article>
  ));

  const footer = footerLinks && footerLinks.length > 0 ? (
    <nav className="about-full-links" aria-label="Related">
      <ul>
        {footerLinks.map((link) => (
          <li key={link.href}>
            <TransitionLink
              href={link.href}
              transition={link.href.startsWith("/#") ? "fade" : "forward"}
              className="btn btn-ghost btn-sm"
            >
              <T k={link.key} />
            </TransitionLink>
          </li>
        ))}
      </ul>
    </nav>
  ) : undefined;

  return (
    <section className="dark eco-hero eco-hero--about-full">
      <div className="eco-hero-bg" aria-hidden="true">
        <div key={imageKey} className="about-full-photo-layer">
          <TrinexusPhoto imageKey={imageKey} className="eco-hero-photo" priority />
        </div>
        <div className="eco-hero-veil" />
      </div>

      <div className="wrap eco-hero-content about-full-content">
        <div className="about-full-stack">
          <header className="about-full-head">
            <h1 className="h-xl">
              <T k={titleKey} />
            </h1>
            {leadKey ? (
              <p className="lead">
                <T k={leadKey} />
              </p>
            ) : null}
          </header>

          {count > 0 ? (
            <Carousel
              variant="panel"
              drive="wheel"
              transition="fade"
              slides={slides}
              index={index}
              onIndexChange={setIndex}
              reveal={false}
              footer={footer}
              className="about-full-carousel"
            />
          ) : (
            footer
          )}
        </div>
      </div>
    </section>
  );
}
