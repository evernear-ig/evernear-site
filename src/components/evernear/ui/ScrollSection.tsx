"use client";

import { useEffect, useRef, type ReactNode } from "react";

type ScrollSectionProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export function ScrollSection({ children, className = "", id }: ScrollSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("scroll-sec--in");
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      id={id}
      data-scroll-section
      className={`scroll-sec${className ? ` ${className}` : ""}`}
    >
      {children}
    </div>
  );
}
