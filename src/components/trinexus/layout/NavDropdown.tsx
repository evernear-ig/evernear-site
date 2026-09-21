"use client";

import { useCallback, useRef, useState } from "react";
import { useI18n } from "@/components/trinexus/providers/I18nProvider";
import { T } from "@/components/trinexus/ui/T";
import type { NavLinkGroup } from "@/lib/ecosystem/verticals";

export type NavMenuId = "about" | "eco";

type SubLink = { href: string; key: string };

type NavDropdownProps = {
  triggerHref: string;
  triggerKey: string;
  subLinks?: readonly SubLink[];
  subGroups?: readonly NavLinkGroup[];
  submenuAriaKey: string;
  open: boolean;
  onOpen: () => void;
  onCloseNow: () => void;
  onSubLinkClick?: () => void;
};

export function NavDropdown({
  triggerHref,
  triggerKey,
  subLinks,
  subGroups,
  submenuAriaKey,
  open,
  onOpen,
  onCloseNow,
  onSubLinkClick,
}: NavDropdownProps) {
  const { t } = useI18n();

  const handleLinkClick = () => {
    onCloseNow();
    onSubLinkClick?.();
  };

  return (
    <li
      className={`nav-dropdown${open ? " open" : ""}${subGroups ? " nav-dropdown--wide" : ""}`}
      onMouseEnter={onOpen}
    >
      <a
        href={triggerHref}
        className="nav-dropdown-trigger"
        aria-expanded={open}
        aria-haspopup="true"
      >
        <T k={triggerKey} />
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
      <ul className="nav-dropdown-menu" aria-label={String(t(submenuAriaKey))}>
        {subGroups
          ? subGroups.map((group) => (
              <li key={group.labelKey} className="nav-dropdown-group">
                <span className="nav-dropdown-group-label">
                  <T k={group.labelKey} />
                </span>
                <ul>
                  {group.links.map((link) => (
                    <li key={link.href}>
                      <a href={link.href} onClick={handleLinkClick}>
                        <T k={link.key} />
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
            ))
          : subLinks?.map((link) => (
              <li key={link.href}>
                <a href={link.href} onClick={handleLinkClick}>
                  <T k={link.key} />
                </a>
              </li>
            ))}
      </ul>
    </li>
  );
}

export function useNavDropdown() {
  const [activeMenu, setActiveMenu] = useState<NavMenuId | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const open = useCallback((id: NavMenuId) => {
    clearCloseTimer();
    setActiveMenu(id);
  }, []);

  const scheduleClose = useCallback(() => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setActiveMenu(null), 150);
  }, []);

  const closeNow = useCallback(() => {
    clearCloseTimer();
    setActiveMenu(null);
  }, []);

  const cleanup = useCallback(() => {
    clearCloseTimer();
  }, []);

  return { activeMenu, open, scheduleClose, closeNow, cleanup };
}
