"use client";

import { useEffect, useRef } from "react";
import { useI18n } from "@/components/trinexus/providers/I18nProvider";
import { JoinButton } from "@/components/trinexus/ui/JoinButton";
import { LangNote } from "@/components/trinexus/ui/LangSwitch";
import { T, TLines } from "@/components/trinexus/ui/T";
import { TrinexusPhoto } from "@/components/trinexus/ui/TrinexusPhoto";

export function HeroSection() {
  const { t } = useI18n();
  const heroRef = useRef<HTMLElement>(null);
  const triRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const tri = triRef.current;
    const hero = heroRef.current;
    if (rm || !tri || !hero) return;

    let sy = 0;
    let rx = 0;
    let ry = 0;

    const paint = () => {
      tri.style.transform = `translateY(${sy * 0.12}px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const r = hero.getBoundingClientRect();
      ry = ((e.clientX - r.left) / r.width - 0.5) * 10;
      rx = -((e.clientY - r.top) / r.height - 0.5) * 8;
      paint();
    };

    const onLeave = () => {
      rx = 0;
      ry = 0;
      paint();
    };

    const onScroll = () => {
      sy = Math.min(window.scrollY, 800);
      paint();
    };

    hero.addEventListener("pointermove", onMove);
    hero.addEventListener("pointerleave", onLeave);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section className="hero" id="hero" ref={heroRef}>
      <div className="hero-bg" aria-hidden="true">
        <TrinexusPhoto imageKey="hero.place" className="hero-photo" priority />
        <div className="glow g1" />
        <div className="glow g2" />
        <div className="grid" />
        <svg className="topo" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice">
          <path d="M-50 520 C 200 480 320 620 520 560 S 900 420 1100 520 S 1400 640 1500 560" />
          <path d="M-50 580 C 220 540 340 680 540 620 S 920 480 1120 580 S 1420 700 1500 620" />
          <path d="M-50 640 C 240 600 360 740 560 680 S 940 540 1140 640 S 1440 760 1500 680" />
          <path d="M-50 700 C 260 660 380 800 580 740 S 960 600 1160 700 S 1460 820 1500 740" />
          <path d="M-50 760 C 280 720 400 860 600 800 S 980 660 1180 760 S 1480 880 1500 800" />
          <path d="M-50 820 C 300 780 420 920 620 860 S 1000 720 1200 820 S 1500 940 1500 860" />
          <path d="M700 -20 C 660 120 760 220 700 360 S 640 560 720 700" />
          <path d="M760 -20 C 720 120 820 220 760 360 S 700 560 780 700" />
        </svg>
      </div>
      <div className="wrap">
        <div>
          <LangNote />
          <div className="hero-desc">
            <T k="brand.desc" />
          </div>
          <h1 className="h-display" id="heroTitle">
            <TLines k="hero.title" />
          </h1>
          <p className="lead dim">
            <T k="hero.sub" />
          </p>
          <div className="btns">
            <JoinButton />
            <a href="#border" className="btn btn-ghost">
              <T k="cta.explore" />
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
        <div className="tri-wrap">
          <svg
            ref={triRef}
            className="trinode"
            id="trinode"
            viewBox="0 0 500 460"
            role="img"
            aria-label={String(t("a11y.trinode"))}
          >
            <circle className="ring" cx="250" cy="287" r="150" />
            <circle className="ring r2" cx="250" cy="287" r="205" />
            <line className="edge" x1="250" y1="60" x2="440" y2="400" />
            <line className="edge" x1="440" y1="400" x2="60" y2="400" />
            <line className="edge" x1="60" y1="400" x2="250" y2="60" />
            <line className="spoke" x1="250" y1="60" x2="250" y2="287" />
            <line className="spoke" x1="440" y1="400" x2="250" y2="287" />
            <line className="spoke" x1="60" y1="400" x2="250" y2="287" />
            <circle className="npulse a" cx="250" cy="60" r="6" />
            <circle className="npulse b" cx="440" cy="400" r="6" />
            <circle className="npulse c" cx="60" cy="400" r="6" />
            <circle className="node n1" cx="250" cy="60" r="6" />
            <circle className="node n2" cx="440" cy="400" r="6" />
            <circle className="node n3" cx="60" cy="400" r="6" />
            <circle className="pulse" cx="250" cy="287" r="8" />
            <circle className="center" cx="250" cy="287" r="9" />
            <circle className="tv t1" r="3" />
            <circle className="tv t2" r="3" />
            <circle className="tv t3" r="3" />
            <circle className="tv t4" r="2.5" />
            <circle className="tv t5" r="2.5" />
            <circle className="tv t6" r="2.5" />
            <text x="250" y="36" textAnchor="middle">
              PARAGUAY
            </text>
            <text x="440" y="432" textAnchor="middle">
              {String(t("c.br.up"))}
            </text>
            <text x="60" y="432" textAnchor="middle">
              ARGENTINA
            </text>
            <text
              x="250"
              y="322"
              textAnchor="middle"
              style={{ fill: "#2EE59D", letterSpacing: ".24em", fontSize: "12px" }}
            >
              TRINEXUS
            </text>
          </svg>
        </div>
      </div>
      <div className="scroll-hint" aria-hidden="true" />
    </section>
  );
}
