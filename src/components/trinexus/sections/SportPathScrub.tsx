"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/trinexus/providers/I18nProvider";
import { T } from "@/components/trinexus/ui/T";

export const SPORT_PATH_STEPS = [
  { title: "sport.guide.s1", body: "sport.guide.s1.p" },
  { title: "sport.guide.s2", body: "sport.guide.s2.p" },
  { title: "sport.guide.s3", body: "sport.guide.s3.p" },
  { title: "sport.guide.s4", body: "sport.guide.s4.p" },
] as const;

const STEP_VH = 9;

function getDocumentTop(el: HTMLElement): number {
  let top = 0;
  let node: HTMLElement | null = el;
  while (node) {
    top += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return top;
}

export function SportPathScrub() {
  const { t } = useI18n();
  const trackRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const railRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const [translateX, setTranslateX] = useState(0);
  const [windowHeight, setWindowHeight] = useState<number | undefined>(undefined);
  const [staticMode, setStaticMode] = useState(false);
  const count = SPORT_PATH_STEPS.length;

  const measure = useCallback(() => {
    const track = trackRef.current;
    const sticky = stickyRef.current;
    const windowEl = windowRef.current;
    const steps = stepsRef.current;
    if (!track || !sticky || !windowEl || !steps) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.innerWidth < 900;
    const isStatic = reduce || mobile;
    setStaticMode(isStatic);

    if (isStatic) {
      track.style.height = "";
      windowEl.style.removeProperty("--sport-path-step-w");
      setWindowHeight(undefined);
      setTranslateX(0);
      return;
    }

    const nav = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--nav-h"), 10) || 72;
    const windowWidth = windowEl.clientWidth;
    const stepHeight = steps.offsetHeight;
    const visibleHeight = stepHeight + 12;
    const maxTranslate = Math.max(0, windowWidth * (count - 1));
    const scrollRange = Math.max(1, (count - 1) * (window.innerHeight * STEP_VH) / 100);

    windowEl.style.setProperty("--sport-path-step-w", `${windowWidth}px`);

    setWindowHeight(visibleHeight);
    track.style.height = `${visibleHeight + scrollRange}px`;

    const start = getDocumentTop(track);
    const progress = Math.min(1, Math.max(0, (window.scrollY - start) / scrollRange));
    setTranslateX(progress * maxTranslate);
  }, [count]);

  useEffect(() => {
    measure();

    const onScroll = () => measure();
    const onResize = () => measure();

    const resizeObserver = new ResizeObserver(() => measure());
    if (stepsRef.current) resizeObserver.observe(stepsRef.current);
    if (windowRef.current) resizeObserver.observe(windowRef.current);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      resizeObserver.disconnect();
    };
  }, [measure]);

  return (
    <div ref={trackRef} className="sport-path-scrub">
      <div ref={stickyRef} className="sport-path-scrub-sticky">
        <div
          ref={windowRef}
          className={`sport-path-window${staticMode ? " sport-path-window--static" : ""}`}
          style={!staticMode && windowHeight ? { height: windowHeight } : undefined}
          role="region"
          aria-label={String(t("sport.guide.path.aria"))}
        >
          <div ref={railRef} className="sport-path-rail" aria-hidden />
          <div
            ref={stepsRef}
            className="sport-path-track"
            style={staticMode ? undefined : { transform: `translate3d(-${translateX}px, 0, 0)` }}
          >
            {SPORT_PATH_STEPS.map((step, index) => (
              <div
                key={step.title}
                className={`sport-path-step${index === count - 1 ? " sport-path-step--last" : ""}`}
              >
                <b>
                  <T k={step.title} />
                </b>
                <span>
                  <T k={step.body} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
