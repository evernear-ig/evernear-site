"use client";

import { useRef } from "react";
import { useI18n } from "@/components/trinexus/providers/I18nProvider";
import { T } from "@/components/trinexus/ui/T";

type SubLink = { href: string; key: string };

type NavDropdownProps = {
  triggerHref: string;
  triggerKey: string;
  subLinks: readonly SubLink[];
  submenuAriaKey: string;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  onSubLinkClick?: () => void;
};

export function NavDropdown({
  triggerHref,
  triggerKey,
  subLinks,
  submenuAriaKey,
  open,
  onOpen,
  onClose,
  onSubLinkClick,
}: NavDropdownProps) {
  const { t } = useI18n();

  return (
    <li
      className={`nav-dropdown${open ? " open" : ""}`}
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
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
        {subLinks.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              onClick={() => {
                onClose();
                onSubLinkClick?.();
              }}
            >
              <T k={link.key} />
            </a>
          </li>
        ))}
      </ul>
    </li>
  );
}

export function useNavDropdown() {
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimer = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
  };

  const scheduleClose = (setOpen: (open: boolean) => void) => {
    clearCloseTimer();
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  };

  const open = (setOpen: (open: boolean) => void) => {
    clearCloseTimer();
    setOpen(true);
  };

  const cleanup = () => {
    clearCloseTimer();
  };

  return { open, scheduleClose, cleanup };
}
