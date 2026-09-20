"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/trinexus/providers/I18nProvider";
import { useJoinModal } from "@/components/trinexus/providers/JoinModalProvider";
import { useNavSolid } from "@/hooks/useNavSolid";
import { JoinButton } from "@/components/trinexus/ui/JoinButton";
import { LangSwitch } from "@/components/trinexus/ui/LangSwitch";
import { T } from "@/components/trinexus/ui/T";

const ABOUT_SUB_LINKS = [
  { href: "#border", key: "nav.border" },
  { href: "#people", key: "nav.people" },
  { href: "#next", key: "nav.next" },
  { href: "#join", key: "nav.join" },
] as const;

const NAV_LINKS = [{ href: "#ecosystem", key: "nav.eco" }] as const;

export function Header() {
  const { t } = useI18n();
  const { closeJoin } = useJoinModal();
  const solid = useNavSolid();
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const aboutCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openAboutMenu = () => {
    if (aboutCloseTimer.current) {
      clearTimeout(aboutCloseTimer.current);
      aboutCloseTimer.current = null;
    }
    setAboutOpen(true);
  };

  const closeAboutMenu = () => {
    aboutCloseTimer.current = setTimeout(() => setAboutOpen(false), 150);
  };

  const closeMenu = () => {
    setMenuOpen(false);
    document.body.style.overflow = "";
  };

  const openMenu = () => {
    setMenuOpen(true);
    document.body.style.overflow = "hidden";
  };

  const toggleMenu = () => {
    if (menuOpen) closeMenu();
    else openMenu();
  };

  useEffect(() => {
    return () => {
      document.body.style.overflow = "";
      if (aboutCloseTimer.current) clearTimeout(aboutCloseTimer.current);
    };
  }, []);

  const onNavClick = () => {
    closeMenu();
    closeJoin();
    setAboutOpen(false);
  };

  return (
    <>
      <header className={`nav${solid ? " solid" : ""}`} id="nav">
        <div className="wrap">
          <a
            href="#top"
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
            TRINEXUS
          </a>
          <nav aria-label={String(t("a11y.mainnav"))}>
            <ul className="nav-links">
              <li
                className={`nav-dropdown${aboutOpen ? " open" : ""}`}
                onMouseEnter={openAboutMenu}
                onMouseLeave={closeAboutMenu}
              >
                <a
                  href="#top"
                  className="nav-dropdown-trigger"
                  aria-expanded={aboutOpen}
                  aria-haspopup="true"
                >
                  <T k="nav.about" />
                  <svg
                    className="nav-dropdown-chevron"
                    viewBox="0 0 12 12"
                    width="10"
                    height="10"
                    aria-hidden="true"
                  >
                    <path
                      d="M2 4 L6 8 L10 4"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </a>
                <ul
                  className="nav-dropdown-menu"
                  aria-label={String(t("a11y.aboutnav"))}
                >
                  {ABOUT_SUB_LINKS.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} onClick={() => setAboutOpen(false)}>
                        <T k={link.key} />
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a href={link.href}>
                    <T k={link.key} />
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="nav-right">
            <LangSwitch />
            <JoinButton className="btn btn-green btn-sm" />
            <button
              type="button"
              className="burger"
              id="burger"
              aria-label={String(t("a11y.menu"))}
              aria-expanded={menuOpen}
              aria-controls="mobileMenu"
              onClick={toggleMenu}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>
      <div className={`mobile-menu${menuOpen ? " open" : ""}`} id="mobileMenu">
        <a href="#top" onClick={onNavClick}>
          <T k="nav.about" />
        </a>
        <div className="mobile-submenu" aria-label={String(t("a11y.aboutnav"))}>
          {ABOUT_SUB_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={onNavClick}>
              <T k={link.key} />
            </a>
          ))}
        </div>
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} onClick={onNavClick}>
            <T k={link.key} />
          </a>
        ))}
        <LangSwitch />
        <JoinButton className="btn btn-green" onOpen={closeMenu} />
      </div>
    </>
  );
}
