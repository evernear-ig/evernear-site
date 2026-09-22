"use client";

import { useCallback, useEffect, useRef } from "react";
import type { ConexaSectionTarget } from "@/lib/conexa-sections";
import {
  computeMascotLayout,
  getMascotPlacement,
  type MascotLayout,
} from "@/lib/mascot-placements";
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

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function lerpLayout(a: MascotLayout, b: MascotLayout, t: number): MascotLayout {
  return {
    mascotTop: lerp(a.mascotTop, b.mascotTop, t),
    mascotLeft: lerp(a.mascotLeft, b.mascotLeft, t),
    mascotSize: lerp(a.mascotSize, b.mascotSize, t),
    mascotCenterX: lerp(a.mascotCenterX, b.mascotCenterX, t),
    mascotCenterY: lerp(a.mascotCenterY, b.mascotCenterY, t),
    focusX: lerp(a.focusX, b.focusX, t),
    focusY: lerp(a.focusY, b.focusY, t),
    connectorStartX: lerp(a.connectorStartX, b.connectorStartX, t),
    connectorStartY: lerp(a.connectorStartY, b.connectorStartY, t),
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
    const placement = getMascotPlacement(target.key);
    return {
      target,
      centerY: rect.top + rect.height * 0.5,
      layout: computeMascotLayout(rect, placement, viewport),
    };
  });

  const nodeYs = segments.map((s) =>
    Math.max(16, Math.min(viewport.height - 16, s.centerY)),
  );

  const doc = document.documentElement;
  const scrollMax = Math.max(1, doc.scrollHeight - viewport.height);
  const globalProgress = doc.scrollTop / scrollMax;

  if (reducedMotion || segments.length === 1) {
    let best = 0;
    let bestDist = Infinity;
    segments.forEach((seg, i) => {
      const dist = Math.abs(seg.centerY - viewLine);
      if (dist < bestDist) {
        bestDist = dist;
        best = i;
      }
    });
    const seg = segments[best];
    return {
      layout: seg.layout,
      activeIndex: best,
      globalProgress,
      pose: seg.target.pose,
      concept: seg.target.concept,
      sectionKey: seg.target.key,
      tipKey: seg.target.tipKey,
      stepKey: seg.target.stepKey,
      nodeYs,
    };
  }

  const first = segments[0];
  const last = segments[segments.length - 1];

  if (viewLine <= first.centerY) {
    return {
      layout: first.layout,
      activeIndex: 0,
      globalProgress,
      pose: first.target.pose,
      concept: first.target.concept,
      sectionKey: first.target.key,
      tipKey: first.target.tipKey,
      stepKey: first.target.stepKey,
      nodeYs,
    };
  }

  if (viewLine >= last.centerY) {
    const li = segments.length - 1;
    return {
      layout: last.layout,
      activeIndex: li,
      globalProgress,
      pose: last.target.pose,
      concept: last.target.concept,
      sectionKey: last.target.key,
      tipKey: last.target.tipKey,
      stepKey: last.target.stepKey,
      nodeYs,
    };
  }

  for (let i = 0; i < segments.length - 1; i++) {
    const a = segments[i];
    const b = segments[i + 1];
    const lo = Math.min(a.centerY, b.centerY);
    const hi = Math.max(a.centerY, b.centerY);

    if (viewLine >= lo && viewLine <= hi) {
      const span = b.centerY - a.centerY || 1;
      const t = (viewLine - a.centerY) / span;
      const clamped = Math.max(0, Math.min(1, t));
      const activeIndex = clamped < 0.5 ? i : i + 1;
      const seg = clamped < 0.5 ? a : b;

      return {
        layout: lerpLayout(a.layout, b.layout, clamped),
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
  }

  return {
    layout: first.layout,
    activeIndex: 0,
    globalProgress,
    pose: first.target.pose,
    concept: first.target.concept,
    sectionKey: first.target.key,
    tipKey: first.target.tipKey,
    stepKey: first.target.stepKey,
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
