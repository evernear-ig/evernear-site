"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { T } from "@/components/trinexus/ui/T";

const DEMOS = [
  { token: "evt-trinexus-001", labelKey: "fut.qr.event", href: "/eventos/trinexus-001" },
  { token: "biz-cafe-frontera", labelKey: "fut.qr.business", href: "/comercios/cafe-frontera" },
  { token: "biz-verduleria-si", labelKey: "fut.qr.store", href: "/comercios/verduleria-san-ignacio" },
] as const;

export function QrScanContent() {
  const params = useSearchParams();
  const token = params.get("token") ?? "";
  const [result, setResult] = useState<{
    count: number;
    rewardEligible: boolean;
    threshold: number;
  } | null>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    if (!token) return;
    fetch("/api/qr/scan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then((r) => r.json())
      .then((d) => {
        setResult(d);
        setScanned(true);
      })
      .catch(() => {});
  }, [token]);

  if (!token) {
    return (
      <div className="qr-scan-page">
        <h2 className="h-xl" style={{ fontSize: "clamp(1.4rem,3vw,2rem)" }}>
          <T k="qr.scan.title" />
        </h2>
        <p className="lead"><T k="qr.demo.lead" /></p>
        <ul className="qr-demo-list">
          {DEMOS.map((demo) => (
            <li key={demo.token}>
              <Link
                href={`/qr/escanear?token=${encodeURIComponent(demo.token)}`}
                className="qr-demo-card"
              >
                <strong><T k={demo.labelKey} /></strong>
                <span><T k="qr.simulate" /></span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  return (
    <div className="qr-scan-page">
      <h2 className="h-xl" style={{ fontSize: "clamp(1.4rem,3vw,2rem)" }}>
        <T k="qr.scan.title" />
      </h2>
      {scanned && result && (
        <>
          <p className="scan-ok"><T k="qr.scan.ok" /></p>
          <p>
            Visitas: <strong>{result.count}</strong> / {result.threshold}
          </p>
          {result.rewardEligible && (
            <p className="reward-msg"><T k="commerce.loyalty.reward" /></p>
          )}
        </>
      )}
      {!scanned && <p><T k="qr.scan.processing" /></p>}
    </div>
  );
}
