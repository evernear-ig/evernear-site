"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const SWIPE_THRESHOLD = 48;

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

  const goPrev = useCallback(() => setIndex(index - 1), [index, setIndex]);
  const goNext = useCallback(() => setIndex(index + 1), [index, setIndex]);

  const canPrev = loop || index > 0;
  const canNext = loop || index < count - 1;

  return { index, setIndex, goPrev, goNext, canPrev, canNext };
}

export function useCarouselPageSize(
  desktop: number,
  mobile: number,
  breakpoint = 900,
) {
  const [pageSize, setPageSize] = useState(desktop);

  useEffect(() => {
    const mq = window.matchMedia(`(max-width: ${breakpoint}px)`);
    const sync = () => setPageSize(mq.matches ? mobile : desktop);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, [desktop, mobile, breakpoint]);

  return pageSize;
}

export function useCarouselSwipe(
  onSwipe: (direction: "prev" | "next") => void,
  enabled = true,
) {
  const touchStartX = useRef<number | null>(null);

  const onTouchStart = (event: React.TouchEvent) => {
    if (!enabled) return;
    touchStartX.current = event.changedTouches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event: React.TouchEvent) => {
    if (!enabled || touchStartX.current == null) return;
    const delta = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < SWIPE_THRESHOLD) return;
    onSwipe(delta < 0 ? "next" : "prev");
  };

  return { onTouchStart, onTouchEnd };
}

export function useCarouselKeyboard(
  onPrev: () => void,
  onNext: () => void,
  enabled = true,
) {
  useEffect(() => {
    if (!enabled) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") onPrev();
      if (event.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [enabled, onPrev, onNext]);
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
