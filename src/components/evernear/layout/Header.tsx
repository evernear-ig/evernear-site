"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { useI18n } from "@/components/evernear/providers/I18nProvider";
import {
  NavDropdown,
  useNavDropdown,
} from "@/components/evernear/layout/NavDropdown";
import { useJoinModal } from "@/components/evernear/providers/JoinModalProvider";
import { useNavSolid } from "@/hooks/useNavSolid";
import { EvernearLogo } from "@/components/evernear/ui/EvernearLogo";
import { JoinButton } from "@/components/evernear/ui/JoinButton";
import { LangSwitch } from "@/components/evernear/ui/LangSwitch";
import { TransitionLink } from "@/components/evernear/ui/TransitionLink";
import { T } from "@/components/evernear/ui/T";
import {
  COMMUNITY_NAV_LINKS,
  ECOSYSTEM_NAV_GROUPS,
} from "@/lib/ecosystem/verticals";

export function Header() {
  const { t } = useI18n();
  const { closeJoin } = useJoinModal();
  const solid = useNavSolid();
  const [menuOpen, setMenuOpen] = useState(false);
  const [mobileEcoOpen, setMobileEcoOpen] = useState<string | null>(null);
  const { activeMenu, open, scheduleClose, closeNow, cleanup } =
    useNavDropdown();
  const navRef = useRef<HTMLElement>(null);

  const closeMenu = () => {
    setMenuOpen(false);
    setMobileEcoOpen(null);
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

  const toggleMobileEco = (key: string) => {
    setMobileEcoOpen((prev) => (prev === key ? null : key));
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
      <header
        className={navClass}
        id="nav"
        style={{ viewTransitionName: "site-header" } satisfies CSSProperties}
      >
        <div className="wrap">
          <TransitionLink
            href="/"
            transition="fade"
            className="logo"
            aria-label={String(t("a11y.home"))}
          >
            <EvernearLogo />
          </TransitionLink>
          <nav ref={navRef} aria-label={String(t("a11y.mainnav"))}>
            <ul className="nav-links" onMouseLeave={scheduleClose}>
              <NavDropdown
                triggerHref="/ecosistema"
                triggerKey="nav.eco"
                subGroups={ECOSYSTEM_NAV_GROUPS}
                megaMenu
                submenuAriaKey="a11y.ecosystemnav"
                open={activeMenu === "eco"}
                onOpen={() => open("eco")}
                onCloseNow={closeNow}
              />
              <NavDropdown
                triggerHref="/que-es"
                triggerKey="nav.community"
                subLinks={COMMUNITY_NAV_LINKS}
                submenuAriaKey="a11y.communitynav"
                open={activeMenu === "community"}
                onOpen={() => open("community")}
                onCloseNow={closeNow}
              />
              <li>
                <TransitionLink href="/pulso" className="nav-plain">
                  <T k="nav.pulso" />
                </TransitionLink>
              </li>
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
        <span className="mobile-menu-section">
          <T k="nav.eco" />
        </span>
        {ECOSYSTEM_NAV_GROUPS.map((group) => {
          const expanded = mobileEcoOpen === group.labelKey;
          return (
            <div key={group.labelKey} className="mobile-eco-group">
              <button
                type="button"
                className={`mobile-eco-family${expanded ? " open" : ""}`}
                aria-expanded={expanded}
                onClick={() => toggleMobileEco(group.labelKey)}
              >
                <T k={group.labelKey} />
                <span className="mobile-eco-chevron" aria-hidden="true" />
              </button>
              {expanded ? (
                <div className="mobile-submenu mobile-eco-links">
                  {group.links.map((link) => (
                    <TransitionLink key={link.href} href={link.href} onClick={onNavClick}>
                      <T k={link.key} />
                    </TransitionLink>
                  ))}
                </div>
              ) : null}
            </div>
          );
        })}
        <span className="mobile-menu-section">
          <T k="nav.community" />
        </span>
        <div className="mobile-submenu" aria-label={String(t("a11y.communitynav"))}>
          {COMMUNITY_NAV_LINKS.map((link) => (
            <TransitionLink key={link.href} href={link.href} onClick={onNavClick}>
              <T k={link.key} />
            </TransitionLink>
          ))}
        </div>
        <TransitionLink href="/pulso" onClick={onNavClick}>
          <T k="nav.pulso" />
        </TransitionLink>
        <LangSwitch />
        <JoinButton className="btn btn-green" onOpen={closeMenu} />
      </div>
    </>
  );
}
