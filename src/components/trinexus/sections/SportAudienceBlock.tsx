"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { JoinButton } from "@/components/trinexus/ui/JoinButton";
import { THtml, T } from "@/components/trinexus/ui/T";

export const SPORT_AUDIENCES = [
  { title: "join.org.sport.club", sub: "sport.guide.a1.s" },
  { title: "join.org.sport.athlete", sub: "sport.guide.a2.s" },
  { title: "sport.guide.a3", sub: "sport.guide.a3.s" },
  { title: "join.org.sport.sponsor", sub: "sport.guide.a4.s" },
] as const;

const STEP_VH = 14;

function getDocumentTop(el: HTMLElement): number {
  let top = 0;
  let node: HTMLElement | null = el;
  while (node) {
    top += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return top;
}

type SportAudienceScrubProps = {
  region: ReactNode;
};

export function SportAudienceScrub({ region }: SportAudienceScrubProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const windowRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const [translateY, setTranslateY] = useState(0);
  const [windowHeight, setWindowHeight] = useState<number | undefined>(undefined);
  const [staticMode, setStaticMode] = useState(false);

  const measure = useCallback(() => {
    const track = trackRef.current;
    const sticky = stickyRef.current;
    const windowEl = windowRef.current;
    const stack = stackRef.current;
    if (!track || !sticky || !windowEl || !stack) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.innerWidth < 900;
    const isStatic = reduce || mobile;
    setStaticMode(isStatic);

    if (isStatic) {
      track.style.height = "";
      setWindowHeight(undefined);
      setTranslateY(0);
      return;
    }

    const nav = parseInt(getComputedStyle(document.documentElement).getPropertyValue("--nav-h"), 10) || 72;
    const stackHeight = stack.offsetHeight;
    const visibleHeight = Math.min(stackHeight, window.innerHeight - nav - 40);
    const maxTranslate = Math.max(0, stackHeight - visibleHeight);
    const stepRange = Math.max(1, (SPORT_AUDIENCES.length - 1) * (window.innerHeight * STEP_VH) / 100);
    const scrollRange = Math.max(maxTranslate, stepRange);

    setWindowHeight(visibleHeight);
    track.style.height = `${visibleHeight + scrollRange}px`;

    const start = getDocumentTop(track);
    const progress = Math.min(1, Math.max(0, (window.scrollY - start) / scrollRange));
    setTranslateY(progress * maxTranslate);
  }, []);

  useEffect(() => {
    measure();

    const onScroll = () => measure();
    const onResize = () => measure();

    const resizeObserver = new ResizeObserver(() => measure());
    if (stackRef.current) resizeObserver.observe(stackRef.current);
    if (stickyRef.current) resizeObserver.observe(stickyRef.current);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      resizeObserver.disconnect();
    };
  }, [measure]);

  return (
    <div ref={trackRef} className="sport-audience-scrub">
      <div ref={stickyRef} className="sport-audience-scrub-sticky">
        <div
          ref={windowRef}
          className={`sport-audience-window${staticMode ? " sport-audience-window--static" : ""}`}
          style={!staticMode && windowHeight ? { height: windowHeight } : undefined}
        >
          <div
            ref={stackRef}
            className="sport-guide-stack"
            style={staticMode ? undefined : { transform: `translate3d(0, -${translateY}px, 0)` }}
          >
            <div className="sport-guide-region">{region}</div>
            <div className={`sport-audience-col${staticMode ? "" : " sport-audience-col--scrub"}`}>
              <h3 className="sport-guide-audience-title">
                <T k="sport.guide.audience.h" />
              </h3>
              {SPORT_AUDIENCES.map((item) => (
                <article key={item.title} className="sport-audience-panel">
                  <h4>
                    <T k={item.title} />
                  </h4>
                  <p>
                    <T k={item.sub} />
                  </p>
                </article>
              ))}
            </div>
            <div className="sport-guide-foot">
              <p className="quote">
                <THtml k="sport.guide.q" />
              </p>
              <JoinButton
                className="btn btn-green"
                labelKey="sport.guide.cta"
                prefill={{ track: "sport" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
