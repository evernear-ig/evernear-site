"use client";

import { useOnboarding } from "@onboardjs/react";
import { usePathname } from "next/navigation";
import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
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
import { getMascotClearSize } from "@/lib/mascot-clearance";
import {
  getConexaSections,
  resolveSectionTargets,
  type ConexaSectionTarget,
} from "@/lib/conexa-sections";

const POS_KEY = "conexa-mascot-pos-v1";
type GuideMode = "idle" | "menu" | "tour" | "chat";
type DockPos = { left: number; top: number };

function dockSize() {
  const size = getMascotClearSize(window.innerWidth);
  return {
    width: Math.round(size.width * 0.64),
    height: Math.round(size.height * 0.64),
  };
}

function defaultDock(size: { width: number; height: number }): DockPos {
  const pad = 16;
  return {
    left: Math.max(pad, window.innerWidth - size.width - pad),
    top: Math.max(pad, window.innerHeight - size.height - pad),
  };
}

function clampDock(
  pos: DockPos,
  size: { width: number; height: number },
): DockPos {
  const pad = 8;
  return {
    left: Math.max(pad, Math.min(pos.left, window.innerWidth - size.width - pad)),
    top: Math.max(pad, Math.min(pos.top, window.innerHeight - size.height - pad)),
  };
}

function readSavedDock(size: { width: number; height: number }): DockPos | null {
  try {
    const raw = localStorage.getItem(POS_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as DockPos;
    if (typeof parsed.left !== "number" || typeof parsed.top !== "number") return null;
    return clampDock(parsed, size);
  } catch {
    return null;
  }
}

export function ConexaGuideLayer() {
  const pathname = usePathname();
  const { t } = useI18n();
  const { open: joinOpen } = useJoinModal();
  const { goToStep, renderStep, state } = useOnboarding();

  const [allowed, setAllowed] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [visible, setVisible] = useState(true);
  const [mode, setMode] = useState<GuideMode>("idle");
  const [targets, setTargets] = useState<ConexaSectionTarget[]>([]);
  const [scrub, setScrub] = useState<ConexaScrubState | null>(null);
  const [pos, setPos] = useState<DockPos>({ left: 0, top: 0 });
  const [size, setSize] = useState({ width: 88, height: 108 });
  const [dragging, setDragging] = useState(false);
  const [dockReady, setDockReady] = useState(false);
  const customPos = useRef(false);
  const dragRef = useRef({
    pointerId: -1,
    moved: false,
    startX: 0,
    startY: 0,
    origLeft: 0,
    origTop: 0,
  });

  const sectionConfigs = useMemo(() => getConexaSections(pathname), [pathname]);

  const syncTargets = useCallback(() => {
    setTargets(resolveSectionTargets(sectionConfigs));
  }, [sectionConfigs]);

  const placeDefault = useCallback(() => {
    const nextSize = dockSize();
    setSize(nextSize);
    const saved = customPos.current ? readSavedDock(nextSize) : null;
    setPos(saved ?? defaultDock(nextSize));
  }, []);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => {
      setReducedMotion(reduce.matches);
      setAllowed(true);
    };
    sync();
    reduce.addEventListener("change", sync);
    return () => reduce.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const saved = readSavedDock(dockSize());
    customPos.current = Boolean(saved);
    placeDefault();
    setDockReady(true);
  }, [placeDefault]);

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
    const onResize = () => {
      const nextSize = dockSize();
      setSize(nextSize);
      setPos((prev) =>
        customPos.current ? clampDock(prev, nextSize) : defaultDock(nextSize),
      );
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useConexaScrollScrub(
    targets,
    allowed && visible && !joinOpen,
    reducedMotion,
    setScrub,
  );

  const activeIndex = mode === "tour"
    ? Math.max(0, (state?.currentStepNumber ?? 1) - 1)
    : scrub?.activeIndex ?? 0;

  const openTour = useCallback(() => {
    const key = targets[0]?.key ?? targets[scrub?.activeIndex ?? 0]?.key;
    if (key) void goToStep(key);
    setMode("tour");
  }, [goToStep, scrub?.activeIndex, targets]);

  const exitTour = useCallback(() => {
    setMode("idle");
  }, []);

  useEffect(() => {
    if (mode !== "tour" && mode !== "chat") return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMode("idle");
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mode]);

  useEffect(() => {
    if (state?.isCompleted) setMode("idle");
  }, [state?.isCompleted]);

  const onPointerDown = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (event.button !== 0) return;
    dragRef.current = {
      pointerId: event.pointerId,
      moved: false,
      startX: event.clientX,
      startY: event.clientY,
      origLeft: pos.left,
      origTop: pos.top,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (dragRef.current.pointerId !== event.pointerId) return;
    const dx = event.clientX - dragRef.current.startX;
    const dy = event.clientY - dragRef.current.startY;
    if (!dragRef.current.moved && dx * dx + dy * dy < 36) return;
    dragRef.current.moved = true;
    setDragging(true);
    setMode((m) => (m === "menu" ? "idle" : m));
    customPos.current = true;
    setPos(
      clampDock(
        {
          left: dragRef.current.origLeft + dx,
          top: dragRef.current.origTop + dy,
        },
        size,
      ),
    );
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (dragRef.current.pointerId !== event.pointerId) return;
    event.currentTarget.releasePointerCapture(event.pointerId);
    const wasDrag = dragRef.current.moved;
    dragRef.current.pointerId = -1;
    setDragging(false);
    if (wasDrag) {
      setPos((current) => {
        const next = clampDock(current, size);
        localStorage.setItem(POS_KEY, JSON.stringify(next));
        return next;
      });
      return;
    }
    if (mode === "tour" || mode === "chat") return;
    setMode((m) => (m === "menu" ? "idle" : "menu"));
  };

  const tourAnchor = mode === "tour" ? targets[activeIndex]?.el ?? null : null;
  const show = allowed && visible && !joinOpen && dockReady;
  if (!show) return null;

  const flipMenu = pos.top < 220;
  const mascotSize = size.width;

  return (
    <ConexaGuideActionsProvider exitTour={exitTour}>
      <div
        className={`conexa-guide${mode === "tour" ? " conexa-guide--tour" : ""}${reducedMotion ? " conexa-guide--reduced" : ""}`}
        data-mode={mode}
      >
        {mode === "tour" ? (
          <button
            type="button"
            className="conexa-guide__backdrop"
            aria-label={String(t("journey.btn.close"))}
            onClick={exitTour}
          />
        ) : null}

        {mode === "menu" ? (
          <button
            type="button"
            className="conexa-guide__dismiss"
            aria-label={String(t("journey.btn.close"))}
            onClick={() => setMode("idle")}
          />
        ) : null}

        {mode === "tour" ? <ConexaSpotlight anchor={tourAnchor} /> : null}

        <div
          className={`conexa-guide__dock${dragging ? " conexa-guide__dock--dragging" : ""}${flipMenu ? " conexa-guide__dock--flip" : ""}`}
          style={{
            width: mascotSize,
            transform: `translate3d(${pos.left}px, ${pos.top}px, 0)`,
          }}
        >
          {mode === "menu" ? (
            <div
              className="conexa-guide__menu"
              role="menu"
              aria-label={String(t("journey.menu.label"))}
            >
              <button
                type="button"
                role="menuitem"
                className="conexa-guide__menu-btn"
                disabled={targets.length === 0}
                onClick={() => openTour()}
              >
                <span className="conexa-guide__menu-kicker">
                  <T k="journey.menu.guideKicker" />
                </span>
                <span>
                  <T k="journey.menu.guide" />
                </span>
              </button>
              <button
                type="button"
                role="menuitem"
                className="conexa-guide__menu-btn"
                onClick={() => setMode("chat")}
              >
                <span className="conexa-guide__menu-kicker">
                  <T k="journey.menu.chatKicker" />
                </span>
                <span>
                  <T k="journey.menu.chat" />
                </span>
              </button>
            </div>
          ) : null}

          <button
            type="button"
            className={`conexa-guide__actor${dragging ? " conexa-guide__actor--dragging" : ""}`}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
            aria-label={String(t("journey.ambient.tap"))}
            aria-expanded={mode === "menu"}
            title={String(t("journey.drag.hint"))}
          >
            <span className="conexa-guide__float">
              <ConexaMascotImage pose="think" assemble={1} compact alt="" />
            </span>
          </button>
        </div>

        {mode === "tour" ? (
          <div className="conexa-guide__tour-panel" role="dialog" aria-modal="true">
            {renderStep()}
          </div>
        ) : null}

        {mode === "chat" ? (
          <div
            className="conexa-guide__chat"
            role="dialog"
            aria-modal="true"
            aria-labelledby="conexa-chat-title"
          >
            <p id="conexa-chat-title" className="conexa-guide__chat-title">
              <T k="journey.chat.title" />
            </p>
            <p className="conexa-guide__chat-body">
              <T k="journey.chat.body" />
            </p>
            <input
              className="conexa-guide__chat-input"
              disabled
              placeholder={String(t("journey.chat.placeholder"))}
            />
            <button
              type="button"
              className="conexa-guide__prompt-btn conexa-guide__prompt-btn--primary"
              onClick={() => setMode("idle")}
            >
              <T k="journey.btn.close" />
            </button>
          </div>
        ) : null}
      </div>
    </ConexaGuideActionsProvider>
  );
}
