"use client";

import { useState } from "react";
import Link from "next/link";
import { useI18n } from "@/components/trinexus/providers/I18nProvider";
import { T } from "@/components/trinexus/ui/T";
import { toast } from "sonner";

const DEMOS = [
  {
    token: "evt-trinexus-001",
    labelKey: "fut.qr.event",
    href: "/eventos/trinexus-001",
  },
  {
    token: "biz-cafe-frontera",
    labelKey: "fut.qr.business",
    href: "/comercios/cafe-frontera",
  },
] as const;

type EcosystemQrDemoProps = {
  compact?: boolean;
};

export function EcosystemQrDemo({ compact = false }: EcosystemQrDemoProps) {
  const { t } = useI18n();
  const [activeToken, setActiveToken] = useState<string | null>(null);
  const [result, setResult] = useState<{
    count: number;
    rewardEligible: boolean;
    threshold: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  async function simulateScan(token: string) {
    setActiveToken(token);
    setLoading(true);
    setResult(null);
    try {
      const response = await fetch("/api/qr/scan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      const data = await response.json();
      setResult(data);
    } catch {
      setResult(null);
      toast.error(String(t("events.form.error")));
    } finally {
      setLoading(false);
    }
  }

  const activeDemo = DEMOS.find((demo) => demo.token === activeToken);

  return (
    <div className={`eco-layer-qr${compact ? " eco-layer-qr--compact" : ""}`}>
      <div className="eco-layer-qr-actions">
        {DEMOS.map((demo) => (
          <button
            key={demo.token}
            type="button"
            className={`btn btn-sm${activeToken === demo.token ? " btn-ink" : " btn-outline-ink"}`}
            onClick={() => simulateScan(demo.token)}
            disabled={loading}
          >
            <T k={demo.labelKey} />
          </button>
        ))}
      </div>
      {loading && <p className="eco-layer-note"><T k="qr.scan.processing" /></p>}
      {result && (
        <p className="eco-layer-qr-result">
          <T k="qr.scan.ok" />{" "}
          <strong>{result.count}</strong> / {result.threshold}
        </p>
      )}
      {activeDemo && (
        <Link href={activeDemo.href} className="eco-layer-link">
          <T k="pil.link" />
        </Link>
      )}
    </div>
  );
}
