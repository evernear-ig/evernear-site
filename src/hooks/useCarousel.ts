"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";

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
