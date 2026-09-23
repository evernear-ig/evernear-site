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
  useConexaScrollScrub,
  type ConexaScrubState,
} from "@/hooks/useConexaScrollScrub";
import { resetMascotPark } from "@/lib/mascot-clearance";
import {
  getConexaSections,
  resolveSectionTargets,
  type ConexaSectionTarget,
} from "@/lib/conexa-sections";
import { MASCOT_CONCEPTS } from "@/lib/mascot-concepts";
import type { MascotPose } from "@/lib/mascot-poses";

const ConexaMascotOrbit = dynamic(
  () =>
    import("@/components/trinexus/mascot/ConexaMascotOrbit").then(
      (m) => m.ConexaMascotOrbit,
    ),
  { ssr: false },
);

const PROMPT_KEY = "conexa-guide-prompt-v1";
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
  const prevIndexRef = useRef(0);
  const assembleRaf = useRef(0);

  const sectionConfigs = useMemo(() => getConexaSections(pathname), [pathname]);

  const syncTargets = useCallback(() => {
    setTargets(resolveSectionTargets(sectionConfigs));
  }, [sectionConfigs]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

    const sync = () => {
      setReducedMotion(reduce.matches);
      setAllowed(true);
    };
    sync();
    reduce.addEventListener("change", sync);
    return () => {
      reduce.removeEventListener("change", sync);
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
    allowed && visible && !joinOpen,
    reducedMotion,
    setScrub,
  );

  useEffect(() => {
    resetMascotPark();
    window.dispatchEvent(new Event("resize"));
  }, [mode]);

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

  const layout = scrub?.layout;

  const tourAnchor =
    mode === "tour" ? targets[activeIndex]?.el ?? null : null;

  const show =
    allowed && visible && !joinOpen && targets.length > 0 && layout;

  if (!show || !layout) return null;

  const mascotSize = layout.mascotSize;

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
          width: mascotSize,
          transform: `translate3d(${layout.mascotLeft}px, ${layout.mascotTop}px, 0)`,
        }}
        onClick={() => {
          if (mode === "tour") return;
          openTour();
        }}
        disabled={mode === "tour"}
        aria-label={String(t("journey.ambient.tap"))}
      >
        <span className="conexa-guide__float">
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
            compact
            alt=""
          />
        </span>
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
