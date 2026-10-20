"use client";

import { useI18n } from "@/components/evernear/providers/I18nProvider";

export function AccessBridgeSvg() {
  const { t } = useI18n();

  return (
    <svg className="bridge" viewBox="0 0 1000 240" aria-hidden="true">
      <path className="arc2" d="M80 200 Q 500 -80 920 200" />
      <path className="arc" d="M80 200 Q 500 -80 920 200" />
      <line className="pier" x1="290" y1="106" x2="290" y2="200" />
      <line className="pier" x1="500" y1="60" x2="500" y2="200" />
      <line className="pier" x1="710" y1="106" x2="710" y2="200" />
      <line className="pier" x1="40" y1="200" x2="960" y2="200" />
      <circle className="bt b1" r="4" />
      <circle className="bt b2" r="4" />
      <circle className="base" cx="80" cy="200" r="7" />
      <circle className="end" cx="920" cy="200" r="7" />
      <text x="80" y="232" textAnchor="middle">
        {String(t("acc.from"))}
      </text>
      <text x="920" y="232" textAnchor="middle">
        {String(t("acc.to"))}
      </text>
    </svg>
  );
}
