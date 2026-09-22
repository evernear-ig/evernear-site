"use client";

import { useOnboarding } from "@onboardjs/react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ConexaMascotImage } from "@/components/trinexus/mascot/ConexaMascotImage";
import { useJoinModal } from "@/components/trinexus/providers/JoinModalProvider";
import { useI18n } from "@/components/trinexus/providers/I18nProvider";
import { T } from "@/components/trinexus/ui/T";
import {
  getConexaSections,
  resolveSectionTargets,
  type ConexaSectionTarget,
} from "@/lib/conexa-sections";
import type { MascotConcept } from "@/lib/mascot-concepts";
import { MASCOT_CONCEPTS } from "@/lib/mascot-concepts";
import {
  computeMascotLayout,
  getMascotPlacement,
  type MascotLayout,
} from "@/lib/mascot-placements";
import type { MascotPose } from "@/lib/mascot-poses";

const ConexaMascotOrbit = dynamic(
  () =>
    import("@/components/trinexus/mascot/ConexaMascotOrbit").then(
      (m) => m.ConexaMascotOrbit,
    ),
  { ssr: false },
);

const SPINE_RIGHT = 54;

type JourneyLayout = MascotLayout & {
  nodeYs: number[];
  spineTop: number;
  spineBottom: number;
  callout: string;
  stepLabel: string;
  placementKey: string;
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
  tip: string,
  stepLabel: string,
): JourneyLayout | null {
  const active = targets[activeIndex];
  if (!active) return null;

  const placement = getMascotPlacement(active.key);
  const sectionRect = active.el.getBoundingClientRect();
  const viewport = { width: window.innerWidth, height: window.innerHeight };
  const mascot = computeMascotLayout(sectionRect, placement, viewport);
  const centers = sectionCenters(targets);
  const nodeYs = centers.map((y) =>
    Math.max(16, Math.min(window.innerHeight - 16, y)),
  );

  return {
    ...mascot,
    nodeYs,
    spineTop: nodeYs[0] ?? mascot.mascotCenterY,
    spineBottom: nodeYs[nodeYs.length - 1] ?? mascot.mascotCenterY,
    callout: placement.callout,
    stepLabel,
    placementKey: active.key,
  };
}

export function ConexaJourneyCompanion() {
  const pathname = usePathname();
  const { t } = useI18n();
  const { open: joinOpen } = useJoinModal();
  const { goToStep, currentStep, state } = useOnboarding();

  const [allowed, setAllowed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [visible, setVisible] = useState(true);
  const [targets, setTargets] = useState<ConexaSectionTarget[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [pose, setPose] = useState<MascotPose>("welcome");
  const [concept, setConcept] = useState<MascotConcept>("default");
  const [tipKey, setTipKey] = useState("journey.hero.tip");
  const [stepKey, setStepKey] = useState("journey.hero.step");
  const [layout, setLayout] = useState<JourneyLayout | null>(null);
  const [assemble, setAssemble] = useState(1);
  const prevIndexRef = useRef(0);
  const rafRef = useRef(0);
  const assembleRaf = useRef(0);

  const sectionConfigs = useMemo(() => getConexaSections(pathname), [pathname]);
  const tokens = MASCOT_CONCEPTS[concept];
  const tip = String(t(tipKey));
  const stepLabel = String(t(stepKey));

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

  const applyTarget = useCallback((target: ConexaSectionTarget) => {
    setPose(target.pose);
    setConcept(target.concept);
    setTipKey(target.tipKey);
    setStepKey(target.stepKey);
  }, []);

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
        applyTarget(targets[nextIndex] ?? targets[0]);
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
      applyTarget(targets[best] ?? targets[0]);
    };

    pickInitial();
    window.addEventListener("resize", pickInitial);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", pickInitial);
    };
  }, [allowed, targets, applyTarget]);

  useEffect(() => {
    const key = targets[activeIndex]?.key;
    if (!key || currentStep?.id === key) return;
    void goToStep(key);
  }, [activeIndex, currentStep?.id, goToStep, targets]);

  useEffect(() => {
    if (prevIndexRef.current === activeIndex) return;
    prevIndexRef.current = activeIndex;

    if (reducedMotion) {
      setAssemble(1);
      return;
    }

    cancelAnimationFrame(assembleRaf.current);
    setAssemble(0);

    const start = performance.now();
    const duration = 520;

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      setAssemble(eased < 0.35 ? 0 : eased);
      if (progress < 1) {
        assembleRaf.current = requestAnimationFrame(tick);
      } else {
        setAssemble(1);
      }
    };

    assembleRaf.current = requestAnimationFrame(tick);
  }, [activeIndex, reducedMotion]);

  const refreshLayout = useCallback(() => {
    if (!targets.length) return;
    setLayout(computeLayout(targets, activeIndex, tip, stepLabel));
  }, [targets, activeIndex, tip, stepLabel]);

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
  const progress = state?.progressPercentage ?? 0;

  if (!show) return null;

  const spineX = window.innerWidth - SPINE_RIGHT;
  const connectorMidX = (layout.connectorStartX + layout.focusX) * 0.5;
  const connectorMidY = (layout.connectorStartY + layout.focusY) * 0.5;
  const connectorPath = `M ${layout.connectorStartX} ${layout.connectorStartY} Q ${connectorMidX} ${connectorMidY}, ${layout.focusX} ${layout.focusY}`;

  return (
    <div
      className={`conexa-journey${reducedMotion ? " conexa-journey--reduced" : ""}`}
      aria-hidden="true"
      data-concept={concept}
      data-placement={layout.placementKey}
    >
      <svg className="conexa-journey__svg" width="100%" height="100%">
        <defs>
          <radialGradient id="conexa-focus-grad">
            <stop offset="0%" stopColor={tokens.accent} stopOpacity="0.35" />
            <stop offset="100%" stopColor={tokens.accent} stopOpacity="0" />
          </radialGradient>
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
            style={{ stroke: tokens.accent }}
          />
        ) : null}

        <path d={connectorPath} className="conexa-journey__connector" />
        <circle
          cx={layout.focusX}
          cy={layout.focusY}
          r="18"
          fill="url(#conexa-focus-grad)"
          className="conexa-journey__focus"
        />
        <circle
          cx={layout.focusX}
          cy={layout.focusY}
          r="4"
          fill={tokens.accent}
          className="conexa-journey__focus-dot"
        />
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

      <div className="conexa-journey__progress" style={{ right: SPINE_RIGHT + 18 }}>
        <span className="conexa-journey__progress-fill" style={{ height: `${progress}%` }} />
      </div>

      <div
        className={`conexa-journey__mascot conexa-journey__mascot--${layout.callout}`}
        style={{
          top: layout.mascotTop,
          left: layout.mascotLeft,
          width: layout.mascotSize,
        }}
      >
        <div className="conexa-journey__orbit-wrap">
          <ConexaMascotOrbit
            tokens={tokens}
            assemble={assemble}
            reducedMotion={reducedMotion}
          />
        </div>

        <ConexaMascotImage pose={pose} assemble={assemble} />

        <div className={`conexa-journey__callout conexa-journey__callout--${layout.callout}`}>
          <p className="conexa-journey__callout-step">
            <T k={stepKey} />
            <span className="conexa-journey__callout-count">
              {activeIndex + 1}/{targets.length}
            </span>
          </p>
          <p className="conexa-journey__callout-tip">{tip}</p>
        </div>
      </div>
    </div>
  );
}
