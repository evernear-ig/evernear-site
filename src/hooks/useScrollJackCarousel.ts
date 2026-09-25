"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type RefObject,
} from "react";

const THROTTLE_MS = 520;
const WHEEL_THRESHOLD = 10;
const TOUCH_THRESHOLD = 36;

type ScrollJackOptions = {
  enabled?: boolean;
};

/**
 * Scroll-jacks the page while the container occupies the viewport.
 * Wheel / touch advance `currentIndex`; at the first or last item the lock
 * releases so native scroll can continue in that direction.
 */
export function useScrollJackCarousel(
  containerRef: RefObject<HTMLElement | null>,
  itemsCount: number,
  { enabled = true }: ScrollJackOptions = {},
) {
  const [currentIndex, setCurrentIndexState] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const indexRef = useRef(0);
  const throttleUntilRef = useRef(0);
  const releasedRef = useRef(false);
  const touchStartYRef = useRef<number | null>(null);

  const setCurrentIndex = useCallback(
    (next: number) => {
      if (itemsCount < 1) return;
      const clamped = Math.max(0, Math.min(itemsCount - 1, next));
      indexRef.current = clamped;
      setCurrentIndexState(clamped);
    },
    [itemsCount],
  );

  useEffect(() => {
    indexRef.current = currentIndex;
  }, [currentIndex]);

  useEffect(() => {
    if (!enabled || itemsCount < 2) return;
    const container = containerRef.current;
    if (!container) return;

    let locked = false;
    let eligible = false;

    const setLock = (next: boolean) => {
      if (locked === next) return;
      locked = next;
      document.body.style.overflow = next ? "hidden" : "";
      setIsActive(next);
    };

    const occupiesViewport = (entry: IntersectionObserverEntry) => {
      if (!entry.isIntersecting) return false;
      const { top, bottom, height } = entry.boundingClientRect;
      const vh = window.innerHeight;
      const visible = Math.min(bottom, vh) - Math.max(top, 0);
      return visible >= Math.min(height * 0.45, vh * 0.35);
    };

    const tryStep = (direction: 1 | -1) => {
      const now = Date.now();
      if (now < throttleUntilRef.current) return true;

      const atStart = indexRef.current <= 0;
      const atEnd = indexRef.current >= itemsCount - 1;

      if (direction < 0 && atStart) {
        releasedRef.current = true;
        setLock(false);
        return false;
      }
      if (direction > 0 && atEnd) {
        releasedRef.current = true;
        setLock(false);
        return false;
      }

      const next = indexRef.current + direction;
      indexRef.current = next;
      throttleUntilRef.current = now + THROTTLE_MS;
      setCurrentIndexState(next);
      return true;
    };

    const onWheel = (event: WheelEvent) => {
      if (!eligible || Math.abs(event.deltaY) < WHEEL_THRESHOLD) return;
      if (!locked) setLock(true);
      const direction: 1 | -1 = event.deltaY > 0 ? 1 : -1;
      if (tryStep(direction)) event.preventDefault();
    };

    const onTouchStart = (event: TouchEvent) => {
      if (!eligible) return;
      touchStartYRef.current = event.touches[0]?.clientY ?? null;
    };

    const onTouchMove = (event: TouchEvent) => {
      if (!eligible || touchStartYRef.current == null) return;
      if (!locked) setLock(true);
      const deltaY = touchStartYRef.current - (event.touches[0]?.clientY ?? 0);
      if (Math.abs(deltaY) < TOUCH_THRESHOLD) return;

      const direction: 1 | -1 = deltaY > 0 ? 1 : -1;
      const atStart = indexRef.current <= 0;
      const atEnd = indexRef.current >= itemsCount - 1;
      if ((direction < 0 && atStart) || (direction > 0 && atEnd)) {
        releasedRef.current = true;
        setLock(false);
        return;
      }
      event.preventDefault();
    };

    const onTouchEnd = (event: TouchEvent) => {
      if (!eligible || touchStartYRef.current == null) return;
      if (!locked) setLock(true);
      const deltaY =
        touchStartYRef.current - (event.changedTouches[0]?.clientY ?? 0);
      touchStartYRef.current = null;
      if (Math.abs(deltaY) < TOUCH_THRESHOLD) return;
      tryStep(deltaY > 0 ? 1 : -1);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          releasedRef.current = false;
          eligible = false;
          setLock(false);
          return;
        }
        eligible = occupiesViewport(entry) && !releasedRef.current;
        if (!eligible) setLock(false);
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] },
    );

    observer.observe(container);
    window.addEventListener("wheel", onWheel, { passive: false });
    container.addEventListener("touchstart", onTouchStart, { passive: true });
    container.addEventListener("touchmove", onTouchMove, { passive: false });
    container.addEventListener("touchend", onTouchEnd, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("wheel", onWheel);
      container.removeEventListener("touchstart", onTouchStart);
      container.removeEventListener("touchmove", onTouchMove);
      container.removeEventListener("touchend", onTouchEnd);
      setLock(false);
    };
  }, [containerRef, enabled, itemsCount]);

  return { currentIndex, isActive, setCurrentIndex };
}
