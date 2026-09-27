"use client";

import { useEffect } from "react";

const RANGE = 680;

export function EcoFoldMotion() {
  useEffect(() => {
    const fold = document.querySelector(".eco-fold");
    const photo = fold?.querySelector<HTMLElement>(".eco-hero-photo-wrap");
    const copy = fold?.querySelector<HTMLElement>(".eco-hero-content");
    if (!photo && !copy) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const apply = () => {
      const progress = Math.min(1, Math.max(0, window.scrollY / RANGE));
      const scale = 1.08 + progress * 0.08;
      const shift = -2 + progress * 9;
      if (photo) photo.style.transform = `scale(${scale}) translate3d(0, ${shift}%, 0)`;
      if (copy) copy.style.transform = `translate3d(0, ${(-28 * progress).toFixed(2)}px, 0)`;
    };

    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(apply);
    };

    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      if (photo) photo.style.transform = "";
      if (copy) copy.style.transform = "";
    };
  }, []);

  return null;
}
