"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  startTransition,
  type ComponentProps,
  type MouseEvent,
  type ReactNode,
} from "react";

export type NavTransition = "forward" | "back" | "fade";

type TransitionLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
  transition?: NavTransition;
  children: ReactNode;
};

function vtDataset(transition: NavTransition) {
  if (transition === "back") return "nav-back";
  if (transition === "fade") return "fade";
  return "nav-forward";
}

function samePageHash(href: string) {
  const hashIndex = href.indexOf("#");
  if (hashIndex === -1) return false;
  const path = href.slice(0, hashIndex);
  return path === "" || path === window.location.pathname;
}

function shouldSkipTransition(href: string, target: HTMLAnchorElement) {
  if (href.startsWith("#") || href.startsWith("http") || samePageHash(href)) return true;
  if (target.target === "_blank") return true;
  if (typeof document.startViewTransition !== "function") return true;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;
  return false;
}

export function runViewTransition(
  transition: NavTransition,
  update: () => void,
) {
  const token = vtDataset(transition);
  document.documentElement.dataset.vt = token;

  const finish = () => {
    delete document.documentElement.dataset.vt;
  };

  const vt = document.startViewTransition({
    update() {
      startTransition(update);
    },
  });

  void vt.finished.finally(finish);
}

export function TransitionLink({
  href,
  transition = "forward",
  onClick,
  prefetch = true,
  ...rest
}: TransitionLinkProps) {
  const router = useRouter();

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(e);
    if (e.defaultPrevented) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;

    const url = e.currentTarget.getAttribute("href");
    if (!url) return;

    if (samePageHash(url)) {
      e.preventDefault();
      const hash = url.slice(url.indexOf("#") + 1);
      const next = url.startsWith("#") ? `${window.location.pathname}${url}` : url;
      window.history.pushState(null, "", next);
      document.getElementById(decodeURIComponent(hash))?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
      return;
    }

    if (shouldSkipTransition(url, e.currentTarget)) return;

    e.preventDefault();
    runViewTransition(transition, () => {
      router.push(url);
    });
  };

  return (
    <Link href={href} prefetch={prefetch} onClick={handleClick} {...rest} />
  );
}
