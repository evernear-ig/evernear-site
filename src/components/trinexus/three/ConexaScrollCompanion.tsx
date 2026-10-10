"use client";

import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import { useJoinModal } from "@/components/trinexus/providers/JoinModalProvider";
import { ConexaMascotFallback } from "@/components/trinexus/ui/ConexaMascotFallback";
import {
  getConexaSections,
  resolveSectionTargets,
  type ConexaSectionTarget,
} from "@/lib/conexa-sections";
import type { MascotPose } from "@/lib/mascot-poses";

const PARTICLE_COUNT = 8;
const MASCOT_SIZE = 136;
const SPINE_RIGHT = 52;

type JourneyLayout = {
  mascotTop: number;
  mascotCenterY: number;
  mascotLeft: number;
  sectionX: number;
  sectionY: number;
  nodeYs: number[];
  spineTop: number;
  spineBottom: number;
};

function sectionCenters(targets: ConexaSectionTarget[]) {
  return targets.map((target) => {
    const rect = target.el.getBoundingClientRect();
    return rect.top + rect.height / 2;
  });
}

function computeLayout(
  targets: ConexaSectionTarget[],
  activeIndex: number,
): JourneyLayout {
  const viewFocus = window.innerHeight * 0.36;
  const width = window.innerWidth;
  const centers = sectionCenters(targets);

  let travelY = centers[0] ?? viewFocus;

  if (centers.length > 1) {
    for (let i = 0; i < centers.length - 1; i++) {
      const a = centers[i];
      const b = centers[i + 1];
      const lo = Math.min(a, b);
      const hi = Math.max(a, b);
      if (viewFocus >= lo && viewFocus <= hi) {
        const t = (viewFocus - a) / (b - a || 1);
        travelY = a + (b - a) * t;
        break;
      }
    }
    if (viewFocus < centers[0]) travelY = centers[0];
    if (viewFocus > centers[centers.length - 1]) {
      travelY = centers[centers.length - 1];
    }
  }

  const mascotTop = Math.max(
    20,
    Math.min(window.innerHeight - MASCOT_SIZE - 20, travelY - MASCOT_SIZE / 2),
  );
  const mascotCenterY = mascotTop + MASCOT_SIZE / 2;
  const mascotLeft = width - SPINE_RIGHT - MASCOT_SIZE - 8;

  const active = targets[activeIndex]?.el;
  let sectionX = width * 0.52;
  let sectionY = mascotCenterY;
  if (active) {
    const rect = active.getBoundingClientRect();
    sectionX = Math.min(rect.left + Math.min(rect.width * 0.14, 120), mascotLeft - 48);
    sectionY = rect.top + rect.height / 2;
  }

  const nodeYs = centers.map((y) =>
    Math.max(16, Math.min(window.innerHeight - 16, y)),
  );

  const spineTop = nodeYs[0] ?? mascotCenterY;
  const spineBottom = nodeYs[nodeYs.length - 1] ?? mascotCenterY;

  return {
    mascotTop,
    mascotCenterY,
    mascotLeft,
    sectionX,
    sectionY,
    nodeYs,
    spineTop,
    spineBottom,
  };
}

export function ConexaScrollCompanion() {
  const pathname = usePathname();
  const { open: joinOpen } = useJoinModal();
  const [allowed, setAllowed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [visible, setVisible] = useState(true);
  const [targets, setTargets] = useState<ConexaSectionTarget[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [pose, setPose] = useState<MascotPose>("welcome");
  const [layout, setLayout] = useState<JourneyLayout | null>(null);
  const [transitioning, setTransitioning] = useState(false);
  const prevIndexRef = useRef(0);
  const rafRef = useRef(0);

  const sectionConfigs = useMemo(() => getConexaSections(pathname), [pathname]);

  const syncTargets = useCallback(() => {
    setTargets(resolveSectionTargets(sectionConfigs));
  }, [sectionConfigs]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const desktop = window.matchMedia("(min-width: 1024px)");

    const sync = () => {
      setReducedMotion(reduce.matches);
      setAllowed(desktop.matches);
    };
    sync();
    reduce.addEventListener("change", sync);
    desktop.addEventListener("change", sync);
    return () => {
      reduce.removeEventListener("change", sync);
      desktop.removeEventListener("change", sync);
    };
  }, []);

  useEffect(() => {
    const onVisibility = () => setVisible(document.visibilityState === "visible");
    document.addEventListener("visibilitychange", onVisibility);
    onVisibility();
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  useEffect(() => {
    syncTargets();
    const timer = window.setTimeout(syncTargets, 400);
    return () => window.clearTimeout(timer);
  }, [syncTargets, pathname]);

  useEffect(() => {
    if (!allowed || !targets.length) return;

    const ratios = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const key = (entry.target as HTMLElement).dataset.conexaKey;
          if (key) ratios.set(key, entry.intersectionRatio);
        });

        let bestKey = targets[0]?.key;
        let bestRatio = -1;
        targets.forEach((target) => {
          const ratio = ratios.get(target.key) ?? 0;
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestKey = target.key;
          }
        });

        const index = targets.findIndex((t) => t.key === bestKey);
        const nextIndex = index >= 0 ? index : 0;
        setActiveIndex(nextIndex);
        setPose(targets[nextIndex]?.pose ?? "welcome");
      },
      { rootMargin: "-22% 0px -52% 0px", threshold: [0, 0.15, 0.35, 0.55, 0.75] },
    );

    targets.forEach((target) => {
      target.el.dataset.conexaKey = target.key;
      observer.observe(target.el);
    });

    const pickInitial = () => {
      let best = 0;
      let bestDist = Infinity;
      const viewMid = window.innerHeight * 0.35;
      targets.forEach((target, index) => {
        const rect = target.el.getBoundingClientRect();
        const mid = rect.top + rect.height / 2;
        const dist = Math.abs(mid - viewMid);
        if (dist < bestDist) {
          bestDist = dist;
          best = index;
        }
      });
      setActiveIndex(best);
      setPose(targets[best]?.pose ?? "welcome");
    };

    pickInitial();
    window.addEventListener("resize", pickInitial);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", pickInitial);
    };
  }, [allowed, targets]);

  useEffect(() => {
    if (prevIndexRef.current === activeIndex) return;
    prevIndexRef.current = activeIndex;
    if (reducedMotion) return;
    setTransitioning(true);
    const timer = window.setTimeout(() => setTransitioning(false), 560);
    return () => window.clearTimeout(timer);
  }, [activeIndex, reducedMotion]);

  const refreshLayout = useCallback(() => {
    if (!targets.length) return;
    setLayout(computeLayout(targets, activeIndex));
  }, [targets, activeIndex]);

  useEffect(() => {
    if (!allowed || !targets.length) return;

    refreshLayout();

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(refreshLayout);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", refreshLayout);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", refreshLayout);
    };
  }, [allowed, targets, activeIndex, refreshLayout]);

  const show = allowed && visible && !joinOpen && targets.length > 0 && layout;

  if (!show) return null;

  const spineX = window.innerWidth - SPINE_RIGHT;
  const connectorStartX = layout.mascotLeft + MASCOT_SIZE * 0.22;
  const connectorStartY = layout.mascotCenterY;
  const connectorMidX = (connectorStartX + layout.sectionX) * 0.42;
  const connectorPath = `M ${connectorStartX} ${connectorStartY} Q ${connectorMidX} ${connectorStartY}, ${layout.sectionX} ${layout.sectionY}`;

  return (
    <div
      className={`conexa-journey${transitioning ? " conexa-journey--transitioning" : ""}${reducedMotion ? " conexa-journey--reduced" : ""}`}
      aria-hidden="true"
    >
      <svg className="conexa-journey__svg" width="100%" height="100%">
        <defs>
          <linearGradient id="conexa-spine-grad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#8A6DE6" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#8A6DE6" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#2EE59D" stopOpacity="0.35" />
          </linearGradient>
          <linearGradient id="conexa-link-grad" x1="1" y1="0" x2="0" y2="0">
            <stop offset="0%" stopColor="#2EE59D" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#8A6DE6" stopOpacity="0.25" />
          </linearGradient>
        </defs>

        <line
          x1={spineX}
          y1={layout.spineTop}
          x2={spineX}
          y2={layout.spineBottom}
          className="conexa-journey__spine-line"
        />

        {activeIndex > 0 && layout.nodeYs[activeIndex] !== undefined ? (
          <line
            x1={spineX}
            y1={layout.nodeYs[activeIndex - 1]}
            x2={spineX}
            y2={layout.nodeYs[activeIndex]}
            className="conexa-journey__spine-active"
          />
        ) : null}

        <path d={connectorPath} className="conexa-journey__connector" />

        {transitioning
          ? Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
              const angle = (i / PARTICLE_COUNT) * Math.PI * 2;
              const burst = 72 + (i % 3) * 18;
              const endX = connectorStartX + Math.cos(angle) * burst;
              const endY = connectorStartY + Math.sin(angle) * burst;
              return (
                <line
                  key={i}
                  x1={connectorStartX}
                  y1={connectorStartY}
                  x2={endX}
                  y2={endY}
                  className="conexa-journey__burst"
                  style={{ animationDelay: `${i * 35}ms` }}
                />
              );
            })
          : null}
      </svg>

      <div className="conexa-journey__nodes" style={{ right: SPINE_RIGHT - 6 }}>
        {targets.map((target, index) => (
          <span
            key={target.key}
            className={`conexa-journey__node${index === activeIndex ? " is-active" : ""}${index < activeIndex ? " is-visited" : ""}`}
            style={{ top: layout.nodeYs[index] }}
          />
        ))}
      </div>

      <div
        className="conexa-journey__orbit"
        style={{
          top: layout.mascotTop + MASCOT_SIZE / 2,
          left: layout.mascotLeft + MASCOT_SIZE / 2,
        }}
      >
        {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
          <span
            key={i}
            className="conexa-journey__particle"
            style={{ "--i": i } as CSSProperties}
          />
        ))}
      </div>

      <div
        className="conexa-journey__mascot"
        style={{ top: layout.mascotTop, left: layout.mascotLeft }}
      >
        <div className="conexa-journey__mascot-glow" />
        <ConexaMascotFallback
          pose={pose}
          className="conexa-journey__mascot-sprite"
          alt="CONEXA"
        />
      </div>
    </div>
  );
}
