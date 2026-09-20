"use client";

import type { ElementType, ReactNode } from "react";
import { useI18n } from "@/components/trinexus/providers/I18nProvider";

export function I18nAria({
  k,
  as: Tag = "span",
  children,
  ...rest
}: {
  k: string;
  as?: ElementType;
  children?: ReactNode;
} & Record<string, unknown>) {
  const { t } = useI18n();
  return (
    <Tag aria-label={String(t(k))} {...rest}>
      {children}
    </Tag>
  );
}
