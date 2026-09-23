import type { CSSProperties } from "react";
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
};

export function VerticalHero({
  slug,
  accent,
  imageKey,
  titleKey,
  leadKey,
}: VerticalHeroProps) {
  const vtName = ecoViewTransitionName(slug);

  return (
    <section className={`dark eco-hero eco-hero--${accent}`}>
      <div className="eco-hero-bg">
        <div
          className="eco-hero-photo-wrap"
          style={{ viewTransitionName: vtName } satisfies CSSProperties}
        >
          <TrinexusPhoto imageKey={imageKey} className="eco-hero-photo" priority />
        </div>
        <div className="eco-hero-veil" />
      </div>
      <div className="wrap eco-hero-content">
        <nav className="eco-breadcrumb" aria-label="Breadcrumb">
          <TransitionLink href="/ecosistema" transition="back">
            <T k="nav.eco" />
          </TransitionLink>
          <span aria-hidden="true">/</span>
          <span>
            <T k={titleKey} />
          </span>
        </nav>
        <h1 className="h-xl">
          <T k={titleKey} />
        </h1>
        <p className="lead">
          <T k={leadKey} />
        </p>
      </div>
    </section>
  );
}
