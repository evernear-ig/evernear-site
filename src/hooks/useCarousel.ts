"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type RefObject } from "react";

type UseCarouselOptions = {
  count: number;
  loop?: boolean;
  initialIndex?: number;
  index?: number;
  onIndexChange?: (index: number) => void;
};

export function useCarousel({
  count,
  loop = false,
  initialIndex = 0,
  index: controlledIndex,
  onIndexChange,
}: UseCarouselOptions) {
  const [internalIndex, setInternalIndex] = useState(initialIndex);
  const index = controlledIndex ?? internalIndex;

  const setIndex = useCallback(
    (next: number) => {
      if (count < 1) return;
      const clamped = loop
        ? ((next % count) + count) % count
        : Math.max(0, Math.min(count - 1, next));
      if (controlledIndex === undefined) {
        setInternalIndex(clamped);
      }
      onIndexChange?.(clamped);
    },
    [count, loop, controlledIndex, onIndexChange],
  );

  return { index, setIndex };
}

/**
 * Page scroll drives slide index as the block crosses the viewport.
 * Does not need a taller-than-screen runway (that left blank gaps).
 */
export function useScrollDrive(
  containerRef: RefObject<HTMLElement | null>,
  count: number,
  enabled = true,
) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!enabled || count < 2) return;
    const el = containerRef.current;
    if (!el) return;

    let ticking = false;
    const update = () => {
      ticking = false;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight;
      const center = rect.top + rect.height / 2;
      const start = vh * 0.82;
      const end = vh * 0.22;
      const span = Math.max(start - end, 1);
      const progress = (start - center) / span;
      const clamped = Math.min(1, Math.max(0, progress));
      const next = Math.min(
        count - 1,
        Math.max(0, Math.round(clamped * (count - 1))),
      );
      setIndex((prev) => (prev === next ? prev : next));
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [count, enabled, containerRef]);

  return index;
}

/** Wheel / trackpad scroll advances slides (fullscreen sections). */
export function useWheelDrive(
  containerRef: RefObject<HTMLElement | null>,
  count: number,
  index: number,
  setIndex: (next: number) => void,
  enabled = true,
) {
  useEffect(() => {
    if (!enabled || count < 2) return;
    const el = containerRef.current;
    if (!el) return;

    let locked = false;
    const onWheel = (event: WheelEvent) => {
      if (locked || Math.abs(event.deltaY) < 10) return;
      const next =
        event.deltaY > 0
          ? Math.min(count - 1, index + 1)
          : Math.max(0, index - 1);
      if (next === index) return;
      locked = true;
      setIndex(next);
      window.setTimeout(() => {
        locked = false;
      }, 480);
    };

    el.addEventListener("wheel", onWheel, { passive: true });
    return () => el.removeEventListener("wheel", onWheel);
  }, [count, enabled, index, setIndex, containerRef]);
}

/** Page scroll pans the row. Height stays auto — no empty pin runway. */
export function useScrollPan(
  rootRef: RefObject<HTMLElement | null>,
  stickyRef: RefObject<HTMLElement | null>,
  viewportRef: RefObject<HTMLElement | null>,
  trackRef: RefObject<HTMLElement | null>,
  enabled = true,
) {
  useLayoutEffect(() => {
    if (!enabled) return;
    const root = rootRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!root || !viewport || !track) return;

    const apply = () => {
      root.style.height = "";
      const travel = Math.max(0, track.scrollWidth - viewport.clientWidth);
      const rect = root.getBoundingClientRect();
      const vh = window.innerHeight;
      const nav =
        Number.parseFloat(
          getComputedStyle(document.documentElement).getPropertyValue("--nav-h"),
        ) || 72;
      const start = nav + 48;
      const end = nav - vh * 0.42;
      const raw = Math.min(1, Math.max(0, (start - rect.top) / Math.max(1, start - end)));
      const dwell = 0.18;
      const span = 1 - 2 * dwell;
      const progress =
        raw <= dwell ? 0 : raw >= 1 - dwell ? 1 : (raw - dwell) / span;
      track.style.transform =
        progress <= 0 ? "none" : `translate3d(${-progress * travel}px,0,0)`;
    };

    let raf = 0;
    let inView = false;

    const loop = () => {
      apply();
      raf = inView ? requestAnimationFrame(loop) : 0;
    };

    const ro = new ResizeObserver(apply);
    ro.observe(viewport);
    ro.observe(track);

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView && raf === 0) {
          raf = requestAnimationFrame(loop);
        }
      },
      { root: null, rootMargin: "40% 0px" },
    );
    io.observe(root);

    window.addEventListener("resize", apply);
    apply();
    inView = true;
    raf = requestAnimationFrame(loop);

    return () => {
      inView = false;
      if (raf) cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("resize", apply);
      root.style.height = "";
      track.style.transform = "";
    };
  }, [enabled, rootRef, stickyRef, viewportRef, trackRef]);
}

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setReduced(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return reduced;
}

export function chunkItems<T>(items: readonly T[], pageSize: number): T[][] {
  const pages: T[][] = [];
  for (let i = 0; i < items.length; i += pageSize) {
    pages.push(items.slice(i, i + pageSize));
  }
  return pages;
}
