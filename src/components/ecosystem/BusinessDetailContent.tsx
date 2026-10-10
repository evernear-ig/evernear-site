"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import type { Business } from "@/lib/ecosystem/types";
import { CityBadge } from "./CityBadge";
import { T } from "@/components/trinexus/ui/T";

export function BusinessDetailContent({ business }: { business: Business }) {
  const [scanCount, setScanCount] = useState(0);
  const [threshold, setThreshold] = useState(20);

  useEffect(() => {
    fetch(`/api/qr/scan?token=${business.qrId}`)
      .then((r) => r.json())
      .then((d) => {
        setScanCount(d.count);
        setThreshold(d.threshold);
      })
      .catch(() => {});
  }, [business.qrId]);

  async function simulateScan() {
    const res = await fetch("/api/qr/scan", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: business.qrId }),
    });
    const data = await res.json();
    setScanCount(data.count);
  }

  const rewardEligible = scanCount >= threshold;

  return (
    <article className="eco-detail">
      <p className="eco-entity-badge">{business.category}</p>
      <h2 className="h-xl" style={{ fontSize: "clamp(1.6rem,3.5vw,2.4rem)" }}>
        {business.name}
      </h2>
      <CityBadge cityId={business.cityId} />
      {business.hours && (
        <p className="eco-entity-meta" style={{ marginTop: "1em" }}>
          {business.hours}
        </p>
      )}
      <p style={{ marginTop: "1.5em" }}>{business.description}</p>
      {business.promo && (
        <div className="promo-box">
          <strong><T k="commerce.promo.active" /></strong>
          <p>{business.promo}</p>
          {business.promoUntil && (
            <small>
              <T k="commerce.promo.until" /> {business.promoUntil}
            </small>
          )}
        </div>
      )}
      <div className="qr-block">
        <h3><T k="commerce.loyalty" /></h3>
        <p>
          <T k="commerce.loyalty.desc" /> ({scanCount}/{threshold})
        </p>
        <div className="loyalty-bar">
          <div
            className="loyalty-fill"
            style={{ width: `${Math.min(100, (scanCount / threshold) * 100)}%` }}
          />
        </div>
        {rewardEligible && (
          <p className="reward-msg"><T k="commerce.loyalty.reward" /></p>
        )}
        <button type="button" className="btn btn-green btn-sm" onClick={simulateScan}>
          <T k="qr.simulate" />
        </button>
      </div>
      <Link href="/comercios" className="btn btn-outline-ink btn-sm" style={{ marginTop: "2em" }}>
        <T k="eco.back" />
      </Link>
    </article>
  );
}
