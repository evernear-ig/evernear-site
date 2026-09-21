"use client";

import { useEffect, useRef, useState } from "react";
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
  ECOSYSTEM_NAV_GROUPS,
  ECOSYSTEM_NAV_LINKS,
} from "@/lib/ecosystem/verticals";

export function Header() {
  const { t } = useI18n();
  const { closeJoin } = useJoinModal();
  const solid = useNavSolid();
  const [menuOpen, setMenuOpen] = useState(false);
  const { activeMenu, open, scheduleClose, closeNow, cleanup } =
    useNavDropdown();
  const navRef = useRef<HTMLElement>(null);

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
      cleanup();
    };
  }, [cleanup]);

  useEffect(() => {
    if (!activeMenu) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeNow();
    };

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node;
      if (navRef.current && !navRef.current.contains(target)) {
        closeNow();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [activeMenu, closeNow]);

  const onNavClick = () => {
    closeMenu();
    closeJoin();
    closeNow();
  };

  const navClass = [
    "nav",
    solid ? "solid" : "",
    menuOpen ? "menu-open" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      <header className={navClass} id="nav">
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
            CONEXA
          </a>
          <nav ref={navRef} aria-label={String(t("a11y.mainnav"))}>
            <ul className="nav-links" onMouseLeave={scheduleClose}>
              <NavDropdown
                triggerHref="/"
                triggerKey="nav.about"
                subLinks={ABOUT_NAV_LINKS}
                submenuAriaKey="a11y.aboutnav"
                open={activeMenu === "about"}
                onOpen={() => open("about")}
                onCloseNow={closeNow}
              />
              <NavDropdown
                triggerHref="/ecosistema"
                triggerKey="nav.eco"
                subGroups={ECOSYSTEM_NAV_GROUPS}
                submenuAriaKey="a11y.ecosystemnav"
                open={activeMenu === "eco"}
                onOpen={() => open("eco")}
                onCloseNow={closeNow}
              />
            </ul>
          </nav>
          <div className="nav-right">
            <LangSwitch />
            <JoinButton className="btn btn-green btn-sm" />
            <button
              type="button"
              className={`burger${menuOpen ? " open" : ""}`}
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
        {ECOSYSTEM_NAV_GROUPS.map((group) => (
          <div
            key={group.labelKey}
            className="mobile-submenu"
            aria-label={String(t(group.labelKey))}
          >
            <span className="mobile-submenu-label">
              <T k={group.labelKey} />
            </span>
            {group.links.map((link) => (
              <a key={link.href} href={link.href} onClick={onNavClick}>
                <T k={link.key} />
              </a>
            ))}
          </div>
        ))}
        <LangSwitch />
        <JoinButton className="btn btn-green" onOpen={closeMenu} />
      </div>
    </>
  );
}
