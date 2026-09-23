"use client";

import type { ReactNode } from "react";
import { I18nProvider } from "@/components/trinexus/providers/I18nProvider";
import { JoinModalProvider } from "@/components/trinexus/providers/JoinModalProvider";
import { Footer } from "@/components/trinexus/layout/Footer";
import { Header } from "@/components/trinexus/layout/Header";
import { JoinModal } from "@/components/trinexus/layout/JoinModal";
import { ConexaGuideLayer } from "@/components/trinexus/mascot/ConexaGuideLayer";
import { ConexaJourneyProvider } from "@/components/trinexus/providers/ConexaJourneyProvider";
import { AppToaster } from "@/components/trinexus/ui/AppToaster";
import { SmoothScroll } from "@/components/trinexus/ui/SmoothScroll";
import { T } from "@/components/trinexus/ui/T";

function SkipLink() {
  return (
    <a className="sr" href="#main">
      <T k="a11y.skip" />
    </a>
  );
}

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <I18nProvider>
      <JoinModalProvider>
        <ConexaJourneyProvider>
          <SmoothScroll>
            <SkipLink />
            <Header />
            <div className="page-surface">{children}</div>
            <Footer />
            <JoinModal />
            <ConexaGuideLayer />
            <AppToaster />
          </SmoothScroll>
        </ConexaJourneyProvider>
      </JoinModalProvider>
    </I18nProvider>
  );
}
