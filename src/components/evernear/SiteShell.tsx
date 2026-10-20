"use client";

import type { ReactNode } from "react";
import { I18nProvider } from "@/components/evernear/providers/I18nProvider";
import { JoinModalProvider } from "@/components/evernear/providers/JoinModalProvider";
import { Footer } from "@/components/evernear/layout/Footer";
import { Header } from "@/components/evernear/layout/Header";
import { JoinModal } from "@/components/evernear/layout/JoinModal";
import { EvernearGuideLayer } from "@/components/evernear/mascot/EvernearGuideLayer";
import { EvernearJourneyProvider } from "@/components/evernear/providers/EvernearJourneyProvider";
import { AppToaster } from "@/components/evernear/ui/AppToaster";
import { SmoothScroll } from "@/components/evernear/ui/SmoothScroll";
import { T } from "@/components/evernear/ui/T";

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
        <EvernearJourneyProvider>
          <SmoothScroll>
            <SkipLink />
            <Header />
            <div className="page-surface">{children}</div>
            <Footer />
            <JoinModal />
            <EvernearGuideLayer />
            <AppToaster />
          </SmoothScroll>
        </EvernearJourneyProvider>
      </JoinModalProvider>
    </I18nProvider>
  );
}
