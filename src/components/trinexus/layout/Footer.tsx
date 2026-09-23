"use client";

import type { CSSProperties } from "react";
import { useI18n } from "@/components/trinexus/providers/I18nProvider";
import { LangSwitch } from "@/components/trinexus/ui/LangSwitch";
import { TransitionLink } from "@/components/trinexus/ui/TransitionLink";
import { T } from "@/components/trinexus/ui/T";
import {
  ABOUT_NAV_LINKS,
  ECOSYSTEM_NAV_LINKS,
} from "@/lib/ecosystem/verticals";

const COM_LINKS = [
  { href: "/eventos", key: "foot.events" },
  { href: "/#join", key: "foot.com" },
  { href: "/#partners", key: "foot.partners" },
  { href: "/terminos", key: "legal.terms" },
  { href: "/privacidad", key: "legal.privacy" },
] as const;

const SOCIAL = [
  { href: "#", key: "a11y.soon.li", label: "LinkedIn" },
  { href: "#", key: "a11y.soon.x", label: "X" },
  { href: "#", key: "a11y.soon.ig", label: "Instagram" },
  { href: "#", key: "a11y.soon.gh", label: "GitHub" },
] as const;

export function Footer() {
  const { t } = useI18n();

  return (
    <footer style={{ viewTransitionName: "site-footer" } satisfies CSSProperties}>
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <TransitionLink
              href="/"
              transition="fade"
              className="logo"
              aria-label={String(t("a11y.home"))}
            >
              <svg viewBox="0 0 40 40" aria-hidden="true">
                <path
                  d="M20 5 L35 31 L5 31 Z"
                  fill="none"
                  stroke="#F6F7FB"
                  strokeWidth="1.5"
                />
                <circle cx="20" cy="5" r="3" fill="#F6F7FB" />
                <circle cx="35" cy="31" r="3" fill="#F6F7FB" />
                <circle cx="5" cy="31" r="3" fill="#F6F7FB" />
                <circle cx="20" cy="22" r="3.5" fill="#2EE59D" />
              </svg>
              CONEXA
            </TransitionLink>
            <p>
              <T k="foot.p" />
            </p>
            <div className="foot-countries">
              <span>Argentina</span>
              <span>
                <T k="c.br" />
              </span>
              <span>Paraguay</span>
            </div>
          </div>
          <div>
            <h4>
              <T k="nav.about" />
            </h4>
            <ul>
              {ABOUT_NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <TransitionLink href={link.href}>
                    <T k={link.key} />
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="foot-col foot-col--eco">
            <h4>
              <T k="foot.eco" />
            </h4>
            <ul className="foot-eco-links">
              {ECOSYSTEM_NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <TransitionLink href={link.href}>
                    <T k={link.key} />
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>
              <T k="foot.com" />
            </h4>
            <ul>
              {COM_LINKS.map((link) => (
                <li key={link.href}>
                  <TransitionLink
                    href={link.href}
                    transition={link.href.startsWith("/#") ? "fade" : "forward"}
                  >
                    <T k={link.key} />
                  </TransitionLink>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4>
              <T k="foot.contact" />
            </h4>
            <ul>
              <li>
                <a href="mailto:hello@conexa.org">hello@conexa.org</a>
              </li>
              {SOCIAL.map((item) => (
                <li key={item.label}>
                  <a href={item.href} aria-label={String(t(item.key))}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="foot-bottom">
          <b>
            <T k="foot.line" />
          </b>
          <LangSwitch />
          <span>
            © 2026 CONEXA · <T k="foot.photo" />
          </span>
        </div>
      </div>
    </footer>
  );
}
