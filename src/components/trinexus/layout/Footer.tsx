"use client";

import { useI18n } from "@/components/trinexus/providers/I18nProvider";
import { LangSwitch } from "@/components/trinexus/ui/LangSwitch";
import { T } from "@/components/trinexus/ui/T";

const ECO_LINKS = [
  { href: "#about", key: "nav.about" },
  { href: "#learn", key: "pil.learn" },
  { href: "#connect", key: "pil.connect" },
  { href: "#build", key: "pil.build" },
  { href: "#access", key: "pil.access" },
] as const;

const COM_LINKS = [
  { href: "#next", key: "foot.events" },
  { href: "#join", key: "foot.com" },
  { href: "#partners", key: "foot.partners" },
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
    <footer>
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <a href="#top" className="logo" aria-label={String(t("a11y.home"))}>
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
              TRINEXUS
            </a>
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
              <T k="foot.eco" />
            </h4>
            <ul>
              {ECO_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>
                    <T k={link.key} />
                  </a>
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
                  <a href={link.href}>
                    <T k={link.key} />
                  </a>
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
                <a href="mailto:hello@trinexus.org">hello@trinexus.org</a>
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
            © 2026 TRINEXUS · <T k="foot.photo" />
          </span>
        </div>
      </div>
    </footer>
  );
}
