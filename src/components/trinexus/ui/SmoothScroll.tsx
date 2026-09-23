"use client";

import Lenis from "lenis";
import { useEffect, type ReactNode } from "react";

export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.innerWidth < 1024;
    if (reduce || mobile) return;

    const lenis = new Lenis({
      duration: 1.05,
      smoothWheel: true,
    });

    const onLock = () => lenis.stop();
    const onUnlock = () => lenis.start();
    window.addEventListener("conexa:scroll-lock", onLock);
    window.addEventListener("conexa:scroll-unlock", onUnlock);

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("conexa:scroll-lock", onLock);
      window.removeEventListener("conexa:scroll-unlock", onUnlock);
      cancelAnimationFrame(raf);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
