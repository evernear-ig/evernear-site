"use client";

import type { ReactNode } from "react";
import { useI18n } from "@/components/evernear/providers/I18nProvider";

/** HTML tags only: the WebGL layers add three.js elements to the JSX namespace. */
type HtmlTag = keyof React.JSX.IntrinsicElements & keyof HTMLElementTagNameMap;

export function I18nAria({
  k,
  as: Tag = "span",
  children,
  ...rest
}: {
  k: string;
  as?: HtmlTag;
  children?: ReactNode;
} & Record<string, unknown>) {
  const { t } = useI18n();
  return (
    <Tag aria-label={String(t(k))} {...rest}>
      {children}
    </Tag>
  );
}
