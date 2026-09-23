import type { CSSProperties, ReactNode } from "react";
import { TransitionLink } from "@/components/trinexus/ui/TransitionLink";
import { T } from "@/components/trinexus/ui/T";
import { TrinexusPhoto } from "@/components/trinexus/ui/TrinexusPhoto";

type EcoCardLinkProps = {
  href: string;
  slug: string;
  titleKey: string;
  leadKey: string;
  imageKey: string;
  featured?: boolean;
  className?: string;
  badge?: ReactNode;
};

export function EcoCardLink({
  href,
  slug,
  titleKey,
  leadKey,
  imageKey,
  featured = false,
  className = "",
  badge,
}: EcoCardLinkProps) {
  const vtName = `eco-vt-${slug}` as const;

  return (
    <TransitionLink
      href={href}
      prefetch
      className={`eco-card${featured ? " eco-card--featured" : ""}${className ? ` ${className}` : ""}`}
    >
      <div
        className="eco-card-img"
        style={{ viewTransitionName: vtName } satisfies CSSProperties}
      >
        <TrinexusPhoto imageKey={imageKey} />
      </div>
      <div className="eco-card-body">
        {badge ??
          (featured ? (
            <span className="eco-card-badge">
              <T k="areas.featured" />
            </span>
          ) : null)}
        <h2>
          <T k={titleKey} />
        </h2>
        <p>
          <T k={leadKey} />
        </p>
        <span className="eco-card-link">
          <T k="eco.enter" />
        </span>
      </div>
    </TransitionLink>
  );
}
