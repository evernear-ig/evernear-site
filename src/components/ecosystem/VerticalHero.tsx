import Link from "next/link";
import { TrinexusPhoto } from "@/components/trinexus/ui/TrinexusPhoto";
import { T } from "@/components/trinexus/ui/T";

type VerticalHeroProps = {
  accent: string;
  imageKey: string;
  titleKey: string;
  leadKey: string;
};

export function VerticalHero({
  accent,
  imageKey,
  titleKey,
  leadKey,
}: VerticalHeroProps) {
  return (
    <section className={`dark eco-hero eco-hero--${accent}`}>
      <div className="eco-hero-bg">
        <TrinexusPhoto imageKey={imageKey} className="eco-hero-photo" priority />
        <div className="eco-hero-veil" />
      </div>
      <div className="wrap eco-hero-content">
        <nav className="eco-breadcrumb" aria-label="Breadcrumb">
          <Link href="/ecosistema">
            <T k="nav.eco" />
          </Link>
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
