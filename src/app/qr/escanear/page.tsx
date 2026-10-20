import { Suspense } from "react";
import { SiteShell } from "@/components/evernear/SiteShell";
import { QrScanContent } from "@/components/ecosystem/QrScanContent";

export default function QrEscanearPage() {
  return (
    <SiteShell>
      <main id="main" className="eco-page">
        <section className="light eco-body">
          <div className="wrap">
            <Suspense>
              <QrScanContent />
            </Suspense>
          </div>
        </section>
      </main>
    </SiteShell>
  );
}
