"use client";

import { useEffect } from "react";

export function RedirectToCommunityHash({ hash }: { hash: string }) {
  useEffect(() => {
    window.location.replace(`/que-es#${hash}`);
  }, [hash]);

  return null;
}
