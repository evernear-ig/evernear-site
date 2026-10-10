"use client";

import { useEffect, useMemo, useState } from "react";
import { useI18n } from "@/components/trinexus/providers/I18nProvider";
import {
  HERO_HUB_NODES,
  HERO_HUB_PAIRS,
  HERO_HUB_RADIUS,
  hubNodePosition,
  hubSlugIndex,
} from "@/lib/hero-hub";
import { getImageSpec, resolveImageSrc } from "@/lib/images";

const PAIR_MS = 3400;
const CENTER = { x: 50, y: 50 };

export function HeroBridgeVisual() {
  const { t } = useI18n();
  const bridgeSrc = resolveImageSrc("ecosystem.heroIndex", 1600);
  const [pairIndex, setPairIndex] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  const pair = HERO_HUB_PAIRS[pairIndex % HERO_HUB_PAIRS.length];
  const nodeTotal = HERO_HUB_NODES.length;

  const positions = useMemo(
    () =>
      HERO_HUB_NODES.map((_, i) => hubNodePosition(i, nodeTotal, HERO_HUB_RADIUS)),
    [nodeTotal],
  );

  const activeSlugs = useMemo(() => new Set([pair.a, pair.b]), [pair.a, pair.b]);

  const activeLines = useMemo(() => {
    const ia = hubSlugIndex(pair.a);
    const ib = hubSlugIndex(pair.b);
    if (ia < 0 || ib < 0) return [];
    return [
      { from: positions[ia], key: pair.a },
      { from: positions[ib], key: pair.b },
    ];
  }, [pair.a, pair.b, positions]);

  const activeLabels = useMemo(() => {
    const a = HERO_HUB_NODES.find((v) => v.slug === pair.a);
    const b = HERO_HUB_NODES.find((v) => v.slug === pair.b);
    if (!a || !b) return "";
    return `${t(a.navKey)} · ${t(b.navKey)}`;
  }, [pair.a, pair.b, t]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReducedMotion(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const timer = window.setInterval(() => {
      setPairIndex((i) => (i + 1) % HERO_HUB_PAIRS.length);
    }, PAIR_MS);
    return () => window.clearInterval(timer);
  }, [reducedMotion]);

  return (
    <div className="hero-bridge-cinema" aria-hidden="true">
      {bridgeSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="hero-bridge-cinema__photo"
          src={bridgeSrc}
          alt=""
          decoding="async"
          fetchPriority="high"
        />
      ) : null}
      <div className="hero-bridge-cinema__veil" />

      <div className="hero-hub">
        <div className="hero-hub__stage">
        <svg className="hero-hub__wires" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
          <circle className="hero-hub__orbit" cx="50" cy="50" r={HERO_HUB_RADIUS} />
          {activeLines.map((line) => (
            <line
              key={line.key}
              className="hero-hub__link"
              x1={line.from.x}
              y1={line.from.y}
              x2={CENTER.x}
              y2={CENTER.y}
            />
          ))}
          <g className="hero-hub__core">
            <circle className="hero-hub__core-ring" cx="50" cy="50" r="9.5" />
            <path className="hero-hub__core-mark" d="M 50 42 L 56.5 54 L 43.5 54 Z" fill="none" />
          </g>
        </svg>

        <div className="hero-hub__center">
          <svg className="hero-hub__center-mark" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M 12 4 L 20 18 L 4 18 Z" fill="none" />
          </svg>
          <p className="hero-hub__connected">{t("hero.hub.connected")}</p>
          <p className="hero-hub__pair" key={pairIndex}>{activeLabels}</p>
          <p className="hero-hub__tagline">{t("hero.hub.tagline")}</p>
        </div>

        <div className="hero-hub__ring">
          {HERO_HUB_NODES.map((node, i) => {
            const pos = positions[i];
            const spec = getImageSpec(node.imageKey);
            const photo = resolveImageSrc(node.imageKey, 320);
            const label = String(t(node.navKey));
            const isActive = activeSlugs.has(node.slug);

            return (
              <div
                key={node.slug}
                className={`hero-hub__node${isActive ? " is-active" : ""}`}
                style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              >
                <div className="hero-hub__node-card">
                  {photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      className="hero-hub__node-img"
                      src={photo}
                      alt=""
                      decoding="async"
                      referrerPolicy="no-referrer"
                      style={{ objectPosition: spec?.pos ?? "50% 40%" }}
                    />
                  ) : null}
                </div>
                <span className="hero-hub__node-label">{label}</span>
              </div>
            );
          })}
        </div>
        </div>
      </div>
    </div>
  );
}
