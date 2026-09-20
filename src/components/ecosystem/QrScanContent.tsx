"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { T } from "@/components/trinexus/ui/T";

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
    return <p><T k="qr.no.token" /></p>;
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
