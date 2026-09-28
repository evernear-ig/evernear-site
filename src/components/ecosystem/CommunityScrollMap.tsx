"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import {
  BORDER_LINKS,
  COUNTRY_BORDERS,
  GROUP_COLORS,
  MAP_VIEWBOX,
  groupOpacities,
  interpolateWaypoint,
  linkPath,
  type BorderGroup,
} from "@/lib/community-map-borders";

const MAP_SRC = "/images/ecosystem/que-es-americas-satellite.png";

function mainScrollProgress(main: HTMLElement): number {
  const total = Math.max(main.offsetHeight - window.innerHeight, 1);
  const scrolled = Math.min(Math.max(-main.getBoundingClientRect().top, 0), total);
  return scrolled / total;
}

/** Fade only when the site footer enters the viewport — not at end of main. */
function mapFooterFade(): number {
  const footer = document.querySelector("footer");
  if (!footer) return 1;
  const top = footer.getBoundingClientRect().top;
  if (top >= window.innerHeight) return 1;
  return Math.max(0, Math.min(1, (top - 48) / 260));
}

export function CommunityScrollMap() {
  const rootRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);

  useEffect(() => {
    const root = rootRef.current;
    const stage = stageRef.current;
    const main = document.querySelector<HTMLElement>(".about-page--journey");
    if (!root || !stage || !main) return;

    let frame = 0;

    const apply = () => {
      const progress = mainScrollProgress(main);
      const fade = mapFooterFade();
      const opacities = groupOpacities(progress);
      const pan = reducedMotion ? interpolateWaypoint(0) : interpolateWaypoint(progress);
      const scale = window.innerWidth < 768 ? 1.04 : 1.08;

      root.style.opacity = String(fade);
      stage.style.transform = `translate3d(${pan.x}vw, ${pan.y}vh, 0) scale(${scale})`;

      root.style.setProperty("--group-origin", String(opacities.origin));
      root.style.setProperty("--group-stories", String(opacities.stories));
      root.style.setProperty("--group-join", String(opacities.join));

      const active: BorderGroup =
        opacities.join >= opacities.stories && opacities.join >= opacities.origin
          ? "join"
          : opacities.stories >= opacities.origin
            ? "stories"
            : "origin";
      root.dataset.activeGroup = active;
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(apply);
    };

    const ro = new ResizeObserver(onScroll);
    ro.observe(main);

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reducedMotion]);

  return (
    <div ref={rootRef} className="community-map" aria-hidden="true">
      <div ref={stageRef} className="community-map__stage">
        <Image
          src={MAP_SRC}
          alt=""
          fill
          priority
          sizes="100vw"
          className="community-map__photo"
        />
        <svg
          className="community-map__borders"
          viewBox={`0 0 ${MAP_VIEWBOX.width} ${MAP_VIEWBOX.height}`}
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {(["origin", "stories", "join"] as BorderGroup[]).map((group) => (
              <filter key={group} id={`cm-glow-${group}`} x="-40%" y="-40%" width="180%" height="180%">
                <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor={GROUP_COLORS[group]} floodOpacity="0.9" />
                <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor={GROUP_COLORS[group]} floodOpacity="0.45" />
              </filter>
            ))}
          </defs>

          {BORDER_LINKS.map((link) => (
            <path
              key={`${link.group}-${link.from}-${link.to}`}
              d={linkPath(link.from, link.to)}
              className={`community-map__link community-map__link--${link.group}`}
              pathLength={1}
            />
          ))}

          {COUNTRY_BORDERS.map((country) => (
            <path
              key={country.id}
              d={country.path}
              className={`community-map__country community-map__country--${country.group}`}
              filter={`url(#cm-glow-${country.group})`}
            />
          ))}
        </svg>
      </div>
      <div className="community-map__veil" />
    </div>
  );
}
