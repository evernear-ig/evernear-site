"use client";

import type { ElementType } from "react";
import { useI18n } from "@/components/trinexus/providers/I18nProvider";

export function T({
  k,
  className,
  as: Tag = "span",
}: {
  k: string;
  className?: string;
  as?: ElementType;
}) {
  const { t, isFallback, lang } = useI18n();
  const value = t(k);
  if (Array.isArray(value)) return null;
  return (
    <Tag
      className={className}
      data-fallback={lang !== "es" && isFallback(k) ? true : undefined}
    >
      {value}
    </Tag>
  );
}

export function THtml({ k, className }: { k: string; className?: string }) {
  const { t } = useI18n();
  const value = t(k);
  if (Array.isArray(value)) return null;
  return <span className={className} dangerouslySetInnerHTML={{ __html: value }} />;
}

export function TLines({
  k,
  className,
}: {
  k: string;
  className?: string;
}) {
  const { t } = useI18n();
  const value = t(k);
  const lines = Array.isArray(value) ? value : [String(value)];
  return (
    <span className={className}>
      {lines.map((line) => (
        <span className="line" key={line}>
          <span>{line}</span>
        </span>
      ))}
    </span>
  );
}
