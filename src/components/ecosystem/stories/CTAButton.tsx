"use client";

import { useI18n } from "@/components/trinexus/providers/I18nProvider";

type CTAButtonProps = {
  onClick: () => void;
};

function MicIcon() {
  return (
    <svg className="rs-cta__icon" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="9" y="3" width="6" height="11" rx="3" fill="currentColor" />
      <path
        d="M6.5 11.5a5.5 5.5 0 0 0 11 0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <path d="M12 17v3.2" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg className="rs-cta__icon" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M5 5.5h14a1.5 1.5 0 0 1 1.5 1.5v7.2a1.5 1.5 0 0 1-1.5 1.5h-6.2L8 19.2v-3.5H5A1.5 1.5 0 0 1 3.5 14.2V7A1.5 1.5 0 0 1 5 5.5Z"
      />
    </svg>
  );
}

export function CTAButton({ onClick }: CTAButtonProps) {
  const { t } = useI18n();

  return (
    <button type="button" className="rs-cta" onClick={onClick}>
      <span>{String(t("stories.reel.cta"))}</span>
      <MicIcon />
      <ChatIcon />
    </button>
  );
}
