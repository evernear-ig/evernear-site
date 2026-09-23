"use client";

import { useCallback, useEffect, useRef } from "react";
import type { ConexaSectionTarget } from "@/lib/conexa-sections";
import {
  getMascotClearSize,
  placeFreeMascot,
  resetMascotPark,
} from "@/lib/mascot-clearance";
import type { MascotLayout } from "@/lib/mascot-placements";
import type { MascotConcept } from "@/lib/mascot-concepts";
import type { MascotPose } from "@/lib/mascot-poses";

export type ConexaScrubState = {
  layout: MascotLayout;
  activeIndex: number;
  globalProgress: number;
  pose: MascotPose;
  concept: MascotConcept;
  sectionKey: string;
  tipKey: string;
  stepKey: string;
  nodeYs: number[];
};

function layoutFromSpot(
  spot: { left: number; top: number },
  size: { width: number; height: number },
): MascotLayout {
  return {
    mascotTop: spot.top,
    mascotLeft: spot.left,
    mascotSize: size.width,
    mascotCenterX: spot.left + size.width / 2,
    mascotCenterY: spot.top + size.height / 2,
    focusX: 0,
    focusY: 0,
    connectorStartX: 0,
    connectorStartY: 0,
  };
}

export function computeConexaScrub(
  targets: ConexaSectionTarget[],
  reducedMotion = false,
): ConexaScrubState | null {
  if (!targets.length) return null;

  const viewport = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  const viewLine = viewport.height * 0.36;

  const segments = targets.map((target) => {
    const rect = target.el.getBoundingClientRect();
    return {
      target,
      centerY: rect.top + rect.height * 0.5,
    };
  });

  const nodeYs = segments.map((s) =>
    Math.max(16, Math.min(viewport.height - 16, s.centerY)),
  );

  const doc = document.documentElement;
  const scrollMax = Math.max(1, doc.scrollHeight - viewport.height);
  const globalProgress = doc.scrollTop / scrollMax;

  let activeIndex = 0;
  if (reducedMotion || segments.length === 1) {
    let bestDist = Infinity;
    segments.forEach((seg, i) => {
      const dist = Math.abs(seg.centerY - viewLine);
      if (dist < bestDist) {
        bestDist = dist;
        activeIndex = i;
      }
    });
  } else {
    const first = segments[0];
    const last = segments[segments.length - 1];
    if (viewLine <= first.centerY) {
      activeIndex = 0;
    } else if (viewLine >= last.centerY) {
      activeIndex = segments.length - 1;
    } else {
      for (let i = 0; i < segments.length - 1; i++) {
        const a = segments[i];
        const b = segments[i + 1];
        const lo = Math.min(a.centerY, b.centerY);
        const hi = Math.max(a.centerY, b.centerY);
        if (viewLine >= lo && viewLine <= hi) {
          const span = b.centerY - a.centerY || 1;
          const t = (viewLine - a.centerY) / span;
          activeIndex = t < 0.5 ? i : i + 1;
          break;
        }
      }
    }
  }

  const seg = segments[activeIndex] ?? segments[0];
  const hintY = Math.max(96, Math.min(viewport.height - 96, seg.centerY));
  const hintX =
    seg.target.key === "border" ? viewport.width * 0.24 : viewport.width * 0.5;
  const mascotSize = getMascotClearSize(viewport.width);
  const spot = placeFreeMascot(
    mascotSize,
    { x: hintX, y: hintY },
    activeIndex,
  );

  return {
    layout: layoutFromSpot(spot, mascotSize),
    activeIndex,
    globalProgress,
    pose: seg.target.pose,
    concept: seg.target.concept,
    sectionKey: seg.target.key,
    tipKey: seg.target.tipKey,
    stepKey: seg.target.stepKey,
    nodeYs,
  };
}

export function useConexaScrollScrub(
  targets: ConexaSectionTarget[],
  enabled: boolean,
  reducedMotion: boolean,
  onUpdate: (state: ConexaScrubState | null) => void,
) {
  const rafRef = useRef(0);

  const tick = useCallback(() => {
    onUpdate(computeConexaScrub(targets, reducedMotion));
  }, [targets, reducedMotion, onUpdate]);

  useEffect(() => {
    resetMascotPark();
  }, [targets]);

  useEffect(() => {
    if (!enabled || !targets.length) return;

    tick();
    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(tick);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", tick);
    };
  }, [enabled, targets, tick]);
}
