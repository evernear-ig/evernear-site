"use client";

import { useI18n } from "@/components/trinexus/providers/I18nProvider";
import { JoinButton } from "@/components/trinexus/ui/JoinButton";
import { LangNote } from "@/components/trinexus/ui/LangSwitch";
import { T, TLines } from "@/components/trinexus/ui/T";
import { Scene3D } from "@/components/trinexus/three/Scene3D";

/** What each figure carries across the bridge, in walking order. */
const CRATE_KEYS = [
  "nav.sport",
  "nav.tourism",
  "nav.innovation",
  "nav.solidarity",
  "nav.commerce",
  "nav.communication",
  "hero.crate.you",
] as const;

export function HeroSection() {
  const { t } = useI18n();

  return (
    <section className="hero" id="hero">
      <div className="hero-bg">
        <Scene3D
          variant="bridge"
          className="scene3d--hero"
          onMobile
          labels={CRATE_KEYS.map((key) => String(t(key)))}
        />
        <div className="glow g1" aria-hidden="true" />
        <div className="glow g2" aria-hidden="true" />
        <div className="grid" aria-hidden="true" />
        <svg
          className="topo"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <path d="M-50 520 C 200 480 320 620 520 560 S 900 420 1100 520 S 1400 640 1500 560" />
          <path d="M-50 580 C 220 540 340 680 540 620 S 920 480 1120 580 S 1420 700 1500 620" />
          <path d="M-50 640 C 240 600 360 740 560 680 S 940 540 1140 640 S 1440 760 1500 680" />
          <path d="M-50 700 C 260 660 380 800 580 740 S 960 600 1160 700 S 1460 820 1500 740" />
          <path d="M-50 760 C 280 720 400 860 600 800 S 980 660 1180 760 S 1480 880 1500 800" />
          <path d="M-50 820 C 300 780 420 920 620 860 S 1000 720 1200 820 S 1500 940 1500 860" />
        </svg>
      </div>
      <div className="wrap">
        <div className="hero-content">
          <LangNote />
          <div className="hero-desc">
            <T k="brand.desc" />
          </div>
          <h1 className="h-display" id="heroTitle">
            <TLines k="hero.title" />
          </h1>
          <p className="lead">
            <T k="hero.sub" />
          </p>
          <div className="btns">
            <JoinButton />
            <a href="/que-es" className="btn btn-ghost">
              <T k="nav.vision" />
            </a>
          </div>
          <div
            className="hero-countries"
            aria-label={String(t("a11y.countries"))}
          >
            <span>
              <i />Argentina
            </span>
            <span>
              <i />
              <T k="c.br" />
            </span>
            <span>
              <i />Paraguay
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
