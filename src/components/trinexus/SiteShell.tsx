"use client";

import type { ReactNode } from "react";
import { I18nProvider } from "@/components/trinexus/providers/I18nProvider";
import { JoinModalProvider } from "@/components/trinexus/providers/JoinModalProvider";
import { Footer } from "@/components/trinexus/layout/Footer";
import { Header } from "@/components/trinexus/layout/Header";
import { JoinModal } from "@/components/trinexus/layout/JoinModal";
import { AppToaster } from "@/components/trinexus/ui/AppToaster";
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
        <SkipLink />
        <Header />
        {children}
        <Footer />
        <JoinModal />
        <AppToaster />
      </JoinModalProvider>
    </I18nProvider>
  );
}
