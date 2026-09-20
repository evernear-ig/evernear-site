"use client";

import { useI18n } from "@/components/trinexus/providers/I18nProvider";

export function ConnectNetwork() {
  const { t } = useI18n();

  return (
    <svg
      className="network"
      viewBox="0 0 640 480"
      role="img"
      aria-label={String(t("a11y.network"))}
    >
      <line className="l" x1="120" y1="380" x2="220" y2="300" />
      <line className="l" x1="120" y1="380" x2="90" y2="290" />
      <line className="l" x1="90" y1="290" x2="220" y2="300" />
      <line className="l" x1="520" y1="140" x2="440" y2="220" />
      <line className="l" x1="520" y1="140" x2="560" y2="250" />
      <line className="l" x1="560" y1="250" x2="440" y2="220" />
      <line className="l" x1="110" y1="110" x2="200" y2="160" />
      <line className="l" x1="200" y1="160" x2="150" y2="210" />
      <line className="l" x1="110" y1="110" x2="150" y2="210" />
      <line className="l" x1="480" y1="380" x2="400" y2="340" />
      <line className="l" x1="480" y1="380" x2="540" y2="410" />
      <line className="l hot" x1="220" y1="300" x2="320" y2="240" />
      <line className="l hot" x1="440" y1="220" x2="320" y2="240" />
      <line className="l hot" x1="200" y1="160" x2="320" y2="240" />
      <line className="l hot" x1="400" y1="340" x2="320" y2="240" />
      <line className="l hot" x1="150" y1="210" x2="220" y2="300" />
      <line className="l hot" x1="440" y1="220" x2="400" y2="340" />
      <line className="l" x1="320" y1="240" x2="320" y2="90" />
      <line className="l" x1="320" y1="90" x2="200" y2="160" />
      <line className="l" x1="320" y1="90" x2="520" y2="140" />
      <circle className="pk k1" r="3" />
      <circle className="pk k2" r="3" />
      <circle className="pk k3" r="3" />
      <circle className="pk k4" r="3" />
      <circle className="halo" cx="320" cy="240" r="8" />
      <circle className="np" cx="220" cy="300" r="5" style={{ animationDelay: "1s" }} />
      <circle className="np" cx="440" cy="220" r="5" style={{ animationDelay: "2.5s" }} />
      <circle className="np" cx="200" cy="160" r="5" style={{ animationDelay: "4s" }} />
      <circle className="p g" cx="320" cy="240" r="8" />
      <circle className="p" cx="220" cy="300" r="5" />
      <circle className="p v" cx="120" cy="380" r="5" />
      <circle className="p" cx="90" cy="290" r="4" />
      <circle className="p v" cx="440" cy="220" r="5" />
      <circle className="p" cx="520" cy="140" r="5" />
      <circle className="p" cx="560" cy="250" r="4" />
      <circle className="p" cx="200" cy="160" r="5" />
      <circle className="p v" cx="110" cy="110" r="4" />
      <circle className="p" cx="150" cy="210" r="4" />
      <circle className="p v" cx="400" cy="340" r="5" />
      <circle className="p" cx="480" cy="380" r="5" />
      <circle className="p" cx="540" cy="410" r="4" />
      <circle className="p" cx="320" cy="90" r="5" />
      <text className="t" x="220" y="325" textAnchor="middle">
        {String(t("n.student"))}
      </text>
      <text className="t" x="440" y="205" textAnchor="middle">
        {String(t("n.dev"))}
      </text>
      <text className="t" x="200" y="145" textAnchor="middle">
        {String(t("n.ent"))}
      </text>
      <text className="t" x="400" y="365" textAnchor="middle">
        {String(t("n.biz"))}
      </text>
      <text className="t" x="320" y="75" textAnchor="middle">
        {String(t("n.uni"))}
      </text>
      <text className="t" x="520" y="125" textAnchor="middle">
        {String(t("n.org"))}
      </text>
      <text className="t" x="120" y="405" textAnchor="middle">
        {String(t("n.creator"))}
      </text>
      <text className="t" x="480" y="405" textAnchor="middle">
        {String(t("n.company"))}
      </text>
      <text className="t" x="70" y="460" style={{ fill: "#2EE59D" }}>
        AR
      </text>
      <text className="t" x="310" y="460" style={{ fill: "#2EE59D" }}>
        PY
      </text>
      <text className="t" x="560" y="460" style={{ fill: "#2EE59D" }}>
        BR
      </text>
    </svg>
  );
}
