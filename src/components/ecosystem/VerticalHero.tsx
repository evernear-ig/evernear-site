"use client";

import type { CSSProperties } from "react";
import { useI18n } from "@/components/trinexus/providers/I18nProvider";
import { TransitionLink } from "@/components/trinexus/ui/TransitionLink";
import { TrinexusPhoto } from "@/components/trinexus/ui/TrinexusPhoto";
import { T } from "@/components/trinexus/ui/T";
import { ecoViewTransitionName } from "@/lib/eco-vt-name";

type VerticalHeroProps = {
  slug: string;
  accent: string;
  imageKey: string;
  titleKey: string;
  leadKey: string;
  stage?: boolean;
  asideKey?: string;
  /** When true, the aside is the bold sentence inside an HTML quote. */
  asideFromQuote?: boolean;
};

function StageTitle({ titleKey }: { titleKey: string }) {
  const { t } = useI18n();
  const value = String(t(titleKey) ?? "");
  const words = value.trim().split(/\s+/).filter(Boolean);
  if (words.length < 2) {
    return <span className="eco-stage-title-lead">{value}</span>;
  }
  const accent = words.pop();
  return (
    <>
      <span className="eco-stage-title-lead">{words.join(" ")}</span>{" "}
      <span className="eco-stage-title-accent">{accent}</span>
    </>
  );
}

function StageAside({
  asideKey,
  asideFromQuote,
}: {
  asideKey: string;
  asideFromQuote?: boolean;
}) {
  const { t } = useI18n();
  const raw = String(t(asideKey) ?? "");
  const text = asideFromQuote ? (raw.match(/<b>(.*?)<\/b>/i)?.[1] ?? raw.replace(/<[^>]+>/g, "")) : raw;
  return <p className="eco-stage-aside">{text}</p>;
}

export function VerticalHero({
  slug,
  accent,
  imageKey,
  titleKey,
  leadKey,
  stage = false,
  asideKey,
  asideFromQuote = false,
}: VerticalHeroProps) {
  const vtName = ecoViewTransitionName(slug);

  return (
    <section className={`dark eco-hero eco-hero--${accent}${stage ? " eco-stage" : ""}`}>
      <div className="eco-hero-bg">
        <div
          className="eco-hero-photo-wrap"
          style={{ viewTransitionName: vtName } satisfies CSSProperties}
        >
          <TrinexusPhoto imageKey={imageKey} className="eco-hero-photo" priority />
        </div>
        <div className="eco-hero-veil" />
        {stage ? (
          <svg className="eco-stage-arcs" viewBox="0 0 1200 520" preserveAspectRatio="xMaxYMid slice" aria-hidden="true">
            <path d="M560 70 C 780 18, 980 36, 1188 150" />
            <path d="M480 430 C 740 250, 980 230, 1220 330" />
            <circle cx="560" cy="70" r="3.2" />
            <circle cx="1188" cy="150" r="3.6" />
            <circle cx="480" cy="430" r="3" />
            <circle cx="860" cy="250" r="2.4" />
            <circle cx="1220" cy="330" r="3.4" />
          </svg>
        ) : null}
      </div>
      <div className={`wrap eco-hero-content${stage ? " eco-stage-layout" : ""}`}>
        <div className="eco-stage-copy">
          <nav className="eco-breadcrumb" aria-label="Breadcrumb">
            <TransitionLink href="/ecosistema" transition="back">
              <T k="nav.eco" />
            </TransitionLink>
            <span aria-hidden="true">/</span>
            <span>
              <T k={titleKey} />
            </span>
          </nav>
          <h1 className={stage ? "eco-stage-title" : "h-xl"}>
            {stage ? <StageTitle titleKey={titleKey} /> : <T k={titleKey} />}
          </h1>
          <p className="lead">
            <T k={leadKey} />
          </p>
        </div>
      </div>
      {stage && asideKey ? (
        <StageAside asideKey={asideKey} asideFromQuote={asideFromQuote} />
      ) : null}
    </section>
  );
}
