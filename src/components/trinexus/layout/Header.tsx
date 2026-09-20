"use client";

import { useEffect, useState } from "react";
import { useI18n } from "@/components/trinexus/providers/I18nProvider";
import {
  NavDropdown,
  useNavDropdown,
} from "@/components/trinexus/layout/NavDropdown";
import { useJoinModal } from "@/components/trinexus/providers/JoinModalProvider";
import { useNavSolid } from "@/hooks/useNavSolid";
import { JoinButton } from "@/components/trinexus/ui/JoinButton";
import { LangSwitch } from "@/components/trinexus/ui/LangSwitch";
import { T } from "@/components/trinexus/ui/T";
import {
  ABOUT_NAV_LINKS,
  ECOSYSTEM_NAV_LINKS,
} from "@/lib/ecosystem/verticals";

export function Header() {
  const { t } = useI18n();
  const { closeJoin } = useJoinModal();
  const solid = useNavSolid();
  const [menuOpen, setMenuOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [ecoOpen, setEcoOpen] = useState(false);
  const dropdown = useNavDropdown();

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
      dropdown.cleanup();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- cleanup on unmount only
  }, []);

  const onNavClick = () => {
    closeMenu();
    closeJoin();
    setAboutOpen(false);
    setEcoOpen(false);
  };

  return (
    <>
      <header className={`nav${solid ? " solid" : ""}`} id="nav">
        <div className="wrap">
          <a href="/" className="logo" aria-label={String(t("a11y.home"))}>
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
              <NavDropdown
                triggerHref="/"
                triggerKey="nav.about"
                subLinks={ABOUT_NAV_LINKS}
                submenuAriaKey="a11y.aboutnav"
                open={aboutOpen}
                onOpen={() => dropdown.open(setAboutOpen)}
                onClose={() => dropdown.scheduleClose(setAboutOpen)}
              />
              <NavDropdown
                triggerHref="/ecosistema"
                triggerKey="nav.eco"
                subLinks={ECOSYSTEM_NAV_LINKS}
                submenuAriaKey="a11y.ecosystemnav"
                open={ecoOpen}
                onOpen={() => dropdown.open(setEcoOpen)}
                onClose={() => dropdown.scheduleClose(setEcoOpen)}
              />
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
        <a href="/" onClick={onNavClick}>
          <T k="nav.about" />
        </a>
        <div className="mobile-submenu" aria-label={String(t("a11y.aboutnav"))}>
          {ABOUT_NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={onNavClick}>
              <T k={link.key} />
            </a>
          ))}
        </div>
        <a href="/ecosistema" onClick={onNavClick}>
          <T k="nav.eco" />
        </a>
        <div
          className="mobile-submenu"
          aria-label={String(t("a11y.ecosystemnav"))}
        >
          {ECOSYSTEM_NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={onNavClick}>
              <T k={link.key} />
            </a>
          ))}
        </div>
        <LangSwitch />
        <JoinButton className="btn btn-green" onOpen={closeMenu} />
      </div>
    </>
  );
}
