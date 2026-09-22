"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import type { Scene3DVariant } from "./Scene3DCanvas";

const Scene3DCanvas = dynamic(() => import("./Scene3DCanvas"), { ssr: false });

export type Scene3DProps = {
  variant: Scene3DVariant;
  /** Crate captions for the bridge scene, already translated. */
  labels?: string[];
  className?: string;
  /** Decorative scenes stay off on small screens unless explicitly allowed. */
  onMobile?: boolean;
};

/**
 * Mounts a WebGL layer only while its host element is near the viewport. Keeping
 * the canvas tied to visibility means a page with several scenes never holds
 * more than the one or two live GL contexts it actually needs.
 */
export function Scene3D({ variant, labels, className, onMobile = false }: Scene3DProps) {
  const host = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);
  const [still, setStill] = useState(false);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const small = window.matchMedia("(max-width: 900px)");

    const sync = () => {
      setStill(reduce.matches);
      setAllowed(onMobile || !small.matches);
    };
    sync();

    reduce.addEventListener("change", sync);
    small.addEventListener("change", sync);
    return () => {
      reduce.removeEventListener("change", sync);
      small.removeEventListener("change", sync);
    };
  }, [onMobile]);

  useEffect(() => {
    const node = host.current;
    if (!node || !allowed) {
      setNear(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => setNear(entry.isIntersecting),
      { rootMargin: "40% 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [allowed]);

  return (
    <div
      ref={host}
      className={className ? `scene3d ${className}` : "scene3d"}
      aria-hidden="true"
    >
      {near ? (
        <Scene3DCanvas
          variant={variant}
          labels={labels}
          frameloop={still ? "demand" : "always"}
        />
      ) : null}
    </div>
  );
}
