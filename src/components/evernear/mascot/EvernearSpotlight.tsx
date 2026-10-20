"use client";

import { useEffect, useState } from "react";

type EvernearSpotlightProps = {
  anchor: HTMLElement | null;
};

type Rect = { top: number; left: number; width: number; height: number };

export function EvernearSpotlight({ anchor }: EvernearSpotlightProps) {
  const [rect, setRect] = useState<Rect | null>(null);

  useEffect(() => {
    if (!anchor) {
      setRect(null);
      return;
    }

    const sync = () => {
      const r = anchor.getBoundingClientRect();
      const pad = 10;
      setRect({
        top: r.top - pad,
        left: r.left - pad,
        width: r.width + pad * 2,
        height: r.height + pad * 2,
      });
    };

    sync();
    anchor.scrollIntoView({ behavior: "smooth", block: "center" });
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [anchor]);

  if (!rect) return null;

  return (
    <div
      className="evernear-spotlight"
      style={{
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      }}
    />
  );
}
