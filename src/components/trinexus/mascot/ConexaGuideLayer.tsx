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
import { ConexaGuideActionsProvider } from "@/components/trinexus/mascot/ConexaGuideActionsContext";
import { ConexaMascotImage } from "@/components/trinexus/mascot/ConexaMascotImage";
import { ConexaSpotlight } from "@/components/trinexus/mascot/ConexaSpotlight";
import { useJoinModal } from "@/components/trinexus/providers/JoinModalProvider";
import { useI18n } from "@/components/trinexus/providers/I18nProvider";
import { T } from "@/components/trinexus/ui/T";
import {
  computeConexaScrub,
  useConexaScrollScrub,
  type ConexaScrubState,
} from "@/hooks/useConexaScrollScrub";
import {
  getConexaSections,
  resolveSectionTargets,
  type ConexaSectionTarget,
} from "@/lib/conexa-sections";
import { MASCOT_CONCEPTS } from "@/lib/mascot-concepts";
import {
  computeMascotLayout,
  getMascotPlacement,
} from "@/lib/mascot-placements";
import type { MascotPose } from "@/lib/mascot-poses";

const ConexaMascotOrbit = dynamic(
  () =>
    import("@/components/trinexus/mascot/ConexaMascotOrbit").then(
      (m) => m.ConexaMascotOrbit,
    ),
  { ssr: false },
);

const PROMPT_KEY = "conexa-guide-prompt-v1";
const SPINE_RIGHT = 54;
type GuideMode = "ambient" | "prompt" | "tour";

export function ConexaGuideLayer() {
  const pathname = usePathname();
  const { t } = useI18n();
  const { open: joinOpen } = useJoinModal();
  const { goToStep, renderStep, state } = useOnboarding();

  const [allowed, setAllowed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [visible, setVisible] = useState(true);
  const [mode, setMode] = useState<GuideMode>("ambient");
  const [targets, setTargets] = useState<ConexaSectionTarget[]>([]);
  const [scrub, setScrub] = useState<ConexaScrubState | null>(null);
  const [assemble, setAssemble] = useState(1);
  const [prevPose, setPrevPose] = useState<MascotPose>("welcome");
  const [tourLayout, setTourLayout] = useState(scrub?.layout ?? null);
  const prevIndexRef = useRef(0);
  const assembleRaf = useRef(0);

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
    if (!allowed || joinOpen) return;
    if (localStorage.getItem(PROMPT_KEY)) return;
    const timer = window.setTimeout(() => setMode("prompt"), 1400);
    return () => window.clearTimeout(timer);
  }, [allowed, joinOpen]);

  useConexaScrollScrub(
    targets,
    allowed && mode === "ambient" && visible && !joinOpen,
    reducedMotion,
    setScrub,
  );

  const activeIndex = mode === "tour"
    ? Math.max(0, (state?.currentStepNumber ?? 1) - 1)
    : scrub?.activeIndex ?? 0;

  const pose =
    mode === "tour"
      ? (targets[activeIndex]?.pose ?? "welcome")
      : (scrub?.pose ?? "welcome");

  const concept =
    mode === "tour"
      ? (targets[activeIndex]?.concept ?? "default")
      : (scrub?.concept ?? "default");

  const tokens = MASCOT_CONCEPTS[concept];

  useEffect(() => {
    if (mode !== "tour" || !targets.length) return;
    const index = Math.max(0, (state?.currentStepNumber ?? 1) - 1);
    const target = targets[index];
    if (!target) return;

    const rect = target.el.getBoundingClientRect();
    const placement = getMascotPlacement(target.key);
    setTourLayout(
      computeMascotLayout(rect, placement, {
        width: window.innerWidth,
        height: window.innerHeight,
      }),
    );
  }, [mode, state?.currentStepNumber, targets]);

  useEffect(() => {
    if (prevIndexRef.current === activeIndex) return;
    setPrevPose(
      targets[prevIndexRef.current]?.pose ?? scrub?.pose ?? "welcome",
    );
    prevIndexRef.current = activeIndex;

    if (reducedMotion) {
      setAssemble(1);
      return;
    }

    cancelAnimationFrame(assembleRaf.current);
    setAssemble(0);
    const start = performance.now();
    const duration = 480;

    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setAssemble(eased < 0.3 ? 0 : eased);
      if (p < 1) assembleRaf.current = requestAnimationFrame(tick);
      else setAssemble(1);
    };
    assembleRaf.current = requestAnimationFrame(tick);
  }, [activeIndex, reducedMotion, targets, scrub?.pose]);

  const openTour = useCallback(
    (index?: number) => {
      const idx = index ?? scrub?.activeIndex ?? 0;
      const key = targets[idx]?.key;
      if (key) void goToStep(key);
      setMode("tour");
    },
    [goToStep, scrub?.activeIndex, targets],
  );

  const exitTour = useCallback(() => {
    setMode("ambient");
  }, []);

  const dismissPrompt = useCallback((startTour: boolean) => {
    localStorage.setItem(PROMPT_KEY, "1");
    if (startTour) openTour(0);
    else setMode("ambient");
  }, [openTour]);

  useEffect(() => {
    if (mode !== "tour") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") exitTour();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mode, exitTour]);

  useEffect(() => {
    if (state?.isCompleted) setMode("ambient");
  }, [state?.isCompleted]);

  const layout = mode === "tour" && tourLayout ? tourLayout : scrub?.layout;
  const nodeYs = scrub?.nodeYs ?? [];
  const progress =
    mode === "tour"
      ? (state?.progressPercentage ?? 0)
      : (scrub?.globalProgress ?? 0) * 100;

  const tourAnchor =
    mode === "tour" ? targets[activeIndex]?.el ?? null : null;

  const show =
    allowed && visible && !joinOpen && targets.length > 0 && layout;

  if (!show) return null;

  const spineX = window.innerWidth - SPINE_RIGHT;
  const connectorMidX = (layout.connectorStartX + layout.focusX) * 0.5;
  const connectorMidY = (layout.connectorStartY + layout.focusY) * 0.5;
  const connectorPath = `M ${layout.connectorStartX} ${layout.connectorStartY} Q ${connectorMidX} ${connectorMidY}, ${layout.focusX} ${layout.focusY}`;
  const chipLabel = String(t(scrub?.stepKey ?? "journey.hero.step"));
  const mascotSize =
    mode === "ambient"
      ? layout.mascotSize * 0.68
      : mode === "tour"
        ? layout.mascotSize * 0.55
        : layout.mascotSize;

  return (
    <ConexaGuideActionsProvider exitTour={exitTour}>
    <div
      className={`conexa-guide${mode === "tour" ? " conexa-guide--tour" : ""}${reducedMotion ? " conexa-guide--reduced" : ""}`}
      data-concept={concept}
      data-mode={mode}
    >
      {mode === "tour" ? (
        <button
          type="button"
          className="conexa-guide__backdrop"
          aria-label="Cerrar tour"
          onClick={exitTour}
        />
      ) : null}

      {mode === "tour" ? <ConexaSpotlight anchor={tourAnchor} /> : null}

      <svg className="conexa-guide__svg" width="100%" height="100%" aria-hidden="true">
        {nodeYs.length > 1 ? (
          <line
            x1={spineX}
            y1={nodeYs[0]}
            x2={spineX}
            y2={nodeYs[nodeYs.length - 1]}
            className="conexa-guide__spine"
          />
        ) : null}
        {activeIndex > 0 && nodeYs[activeIndex] !== undefined ? (
          <line
            x1={spineX}
            y1={nodeYs[activeIndex - 1]}
            x2={spineX}
            y2={nodeYs[activeIndex]}
            className="conexa-guide__spine-active"
            style={{ stroke: tokens.accent }}
          />
        ) : null}
        <path d={connectorPath} className="conexa-guide__connector" />
        <circle
          cx={layout.focusX}
          cy={layout.focusY}
          r="16"
          fill={tokens.accent}
          className="conexa-guide__focus"
          opacity="0.2"
        />
        <circle
          cx={layout.focusX}
          cy={layout.focusY}
          r="4"
          fill={tokens.accent}
          className="conexa-guide__focus-dot"
        />
      </svg>

      <div className="conexa-guide__nodes" style={{ right: SPINE_RIGHT - 6 }}>
        {targets.map((target, index) => (
          <span
            key={target.key}
            className={`conexa-guide__node${index === activeIndex ? " is-active" : ""}${index < activeIndex ? " is-visited" : ""}`}
            style={{ top: nodeYs[index] ?? layout.mascotCenterY }}
          />
        ))}
      </div>

      <div className="conexa-guide__progress" style={{ right: SPINE_RIGHT + 18 }}>
        <span className="conexa-guide__progress-fill" style={{ height: `${progress}%` }} />
      </div>

      {mode === "prompt" ? (
        <div className="conexa-guide__prompt" role="dialog" aria-labelledby="conexa-prompt-title">
          <p id="conexa-prompt-title" className="conexa-guide__prompt-title">
            <T k="journey.prompt.title" />
          </p>
          <p className="conexa-guide__prompt-body">
            <T k="journey.prompt.body" />
          </p>
          <div className="conexa-guide__prompt-actions">
            <button
              type="button"
              className="conexa-guide__prompt-btn conexa-guide__prompt-btn--ghost"
              onClick={() => dismissPrompt(false)}
            >
              <T k="journey.prompt.later" />
            </button>
            <button
              type="button"
              className="conexa-guide__prompt-btn conexa-guide__prompt-btn--primary"
              onClick={() => dismissPrompt(true)}
            >
              <T k="journey.prompt.start" />
            </button>
          </div>
        </div>
      ) : null}

      <button
        type="button"
        className="conexa-guide__actor"
        style={{
          top: layout.mascotTop + (layout.mascotSize - mascotSize) / 2,
          left: layout.mascotLeft + (layout.mascotSize - mascotSize) / 2,
          width: mascotSize,
        }}
        onClick={() => {
          if (mode === "tour") return;
          openTour();
        }}
        disabled={mode === "tour"}
        aria-label={String(t("journey.ambient.tap"))}
      >
        <div className="conexa-guide__orbit-wrap">
          <ConexaMascotOrbit
            tokens={tokens}
            assemble={assemble}
            reducedMotion={reducedMotion}
          />
        </div>
        <ConexaMascotImage
          pose={pose}
          prevPose={prevPose}
          assemble={assemble}
          compact={mode === "ambient"}
        />
        {mode === "ambient" ? (
          <span className="conexa-guide__chip">
            {chipLabel}
            <span className="conexa-guide__chip-count">
              {activeIndex + 1}/{targets.length}
            </span>
          </span>
        ) : null}
      </button>

      {mode === "tour" ? (
        <div
          className="conexa-guide__tour-panel"
          role="dialog"
          aria-modal="true"
        >
          {renderStep()}
        </div>
      ) : null}
    </div>
    </ConexaGuideActionsProvider>
  );
}
