import Link from "next/link";
import { TrinexusPhoto } from "@/components/trinexus/ui/TrinexusPhoto";
import { CityBadge } from "./CityBadge";
import type { CityId } from "@/lib/ecosystem/cities";

type EntityCardProps = {
  href: string;
  title: string;
  subtitle?: string;
  description: string;
  cityId?: CityId;
  imageKey?: string;
  accent?: string;
  badge?: string;
  meta?: string;
};

export function EntityCard({
  href,
  title,
  subtitle,
  description,
  cityId,
  imageKey,
  accent = "discovery",
  badge,
  meta,
}: EntityCardProps) {
  return (
    <Link href={href} className={`eco-entity-card eco-entity-card--${accent}`}>
      {imageKey && (
        <div className="eco-entity-card-img">
          <TrinexusPhoto imageKey={imageKey} />
        </div>
      )}
      <div className="eco-entity-card-body">
        {badge && <span className="eco-entity-badge">{badge}</span>}
        <h3>{title}</h3>
        {subtitle && <p className="eco-entity-sub">{subtitle}</p>}
        <p className="eco-entity-desc">{description}</p>
        <div className="eco-entity-footer">
          {cityId && <CityBadge cityId={cityId} />}
          {meta && <span className="eco-entity-meta">{meta}</span>}
        </div>
      </div>
    </Link>
  );
}
