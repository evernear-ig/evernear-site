"use client";

import { T } from "@/components/evernear/ui/T";

export function EventQrBlock({ token }: { token: string }) {
  const scanUrl = `/qr/escanear?token=${encodeURIComponent(token)}`;

  return (
    <div className="qr-block">
      <h3>
        <T k="qr.checkin" />
      </h3>
      <p>
        <T k="qr.checkin.desc" />
      </p>
      <a href={scanUrl} className="btn btn-green btn-sm">
        <T k="qr.simulate" />
      </a>
      <p className="qr-url">
        <code>{scanUrl}</code>
      </p>
    </div>
  );
}
