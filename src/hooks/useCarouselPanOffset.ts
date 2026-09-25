"use client";

import { useLayoutEffect, type RefObject } from "react";

/** Maps a scroll-jack index to a horizontal pan offset for strip carousels. */
export function useCarouselPanOffset(
  viewportRef: RefObject<HTMLElement | null>,
  trackRef: RefObject<HTMLElement | null>,
  currentIndex: number,
  enabled = true,
) {
  useLayoutEffect(() => {
    if (!enabled) return;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const apply = () => {
      const travel = Math.max(0, track.scrollWidth - viewport.clientWidth);
      if (travel < 1) {
        track.style.transform = "none";
        return;
      }
      const gap =
        Number.parseFloat(getComputedStyle(track).columnGap) || 0;
      const first = track.children[0] as HTMLElement | undefined;
      const stride = Math.max(
        (first?.getBoundingClientRect().width ?? viewport.clientWidth) + gap,
        1,
      );
      const offset = Math.min(currentIndex * stride, travel);
      track.style.transform =
        offset <= 0 ? "none" : `translate3d(${-offset}px,0,0)`;
    };

    apply();
    const ro = new ResizeObserver(apply);
    ro.observe(viewport);
    ro.observe(track);
    return () => {
      ro.disconnect();
      track.style.transform = "";
    };
  }, [currentIndex, enabled, trackRef, viewportRef]);
}
