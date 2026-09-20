"use client";

import type { CSSProperties, ReactNode } from "react";
import { useReveal } from "@/hooks/useReveal";
import { useI18n } from "@/components/trinexus/providers/I18nProvider";

export function Reveal({
  children,
  className = "",
  delay,
  id,
  a11yKey,
  style,
}: {
  children: ReactNode;
  className?: string;
  delay?: 1 | 2;
  id?: string;
  a11yKey?: string;
  style?: CSSProperties;
}) {
  const ref = useReveal<HTMLDivElement>();
  const { t } = useI18n();
  const delayClass = delay === 1 ? " d1" : delay === 2 ? " d2" : "";
  return (
    <div
      ref={ref}
      id={id}
      style={style}
      className={`rv${delayClass}${className ? ` ${className}` : ""}`}
      aria-label={a11yKey ? String(t(a11yKey)) : undefined}
    >
      {children}
    </div>
  );
}
