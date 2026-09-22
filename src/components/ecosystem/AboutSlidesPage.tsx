"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
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

  const go = useCallback(
    (delta: number) => {
      if (count < 2) return;
      setIndex((current) => (current + delta + count) % count);
    },
    [count],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (count < 2) return;
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [count, go]);

  return (
    <section className="dark eco-hero eco-hero--about-full">
      <div className="eco-hero-bg" aria-hidden="true">
        <TrinexusPhoto imageKey={imageKey} className="eco-hero-photo" priority />
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

          {active ? (
            <article className="about-full-slide" aria-live="polite">
              <h2 className="about-full-slide-title">
                <T k={active.titleKey} />
              </h2>
              {active.list ? (
                <ul className="about-full-slide-list">
                  {active.bodyKeys.map((key) => (
                    <li key={key}>
                      <T k={key} />
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="about-full-slide-body">
                  {active.bodyKeys.map((key) => (
                    <p key={key}>
                      <T k={key} />
                    </p>
                  ))}
                </div>
              )}
            </article>
          ) : null}

          {count > 1 ? (
            <nav className="about-full-nav" aria-label="Secciones">
            <button
              type="button"
              className="about-full-nav-btn"
              onClick={() => go(-1)}
              aria-label="Anterior"
            >
              ←
            </button>
            <div className="about-full-dots" role="tablist">
              {blocks.map((block, i) => (
                <button
                  key={block.titleKey}
                  type="button"
                  role="tab"
                  aria-selected={i === index}
                  aria-label={`Sección ${i + 1}`}
                  className={i === index ? "active" : undefined}
                  onClick={() => setIndex(i)}
                />
              ))}
            </div>
            <button
              type="button"
              className="about-full-nav-btn"
              onClick={() => go(1)}
              aria-label="Siguiente"
            >
              →
            </button>
            </nav>
          ) : null}

          {footerLinks && footerLinks.length > 0 ? (
            <nav className="about-full-links" aria-label="Related">
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
      </div>
    </section>
  );
}
