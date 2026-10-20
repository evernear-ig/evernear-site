"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

function scrollToHash() {
  const id = decodeURIComponent(window.location.hash.replace(/^#/, ""));
  if (!id) return false;
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
}

export function ScrollToHash() {
  const pathname = usePathname();

  useEffect(() => {
    let frames = 0;
    let raf = 0;
    const tryScroll = () => {
      if (scrollToHash() || frames++ > 40) return;
      raf = window.requestAnimationFrame(tryScroll);
    };
    const t = window.setTimeout(tryScroll, 50);
    window.addEventListener("hashchange", scrollToHash);
    window.addEventListener("popstate", scrollToHash);
    return () => {
      window.clearTimeout(t);
      window.cancelAnimationFrame(raf);
      window.removeEventListener("hashchange", scrollToHash);
      window.removeEventListener("popstate", scrollToHash);
    };
  }, [pathname]);

  return null;
}
