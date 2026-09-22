"use client";

import { OnboardingProvider } from "@onboardjs/react";
import { usePathname } from "next/navigation";
import { useMemo, type ReactNode } from "react";
import {
  buildConexaJourneySteps,
  type ConexaJourneyContext,
} from "@/lib/conexa-journey-steps";
import { getConexaSections } from "@/lib/conexa-sections";

export function ConexaJourneyProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const sectionConfigs = useMemo(() => getConexaSections(pathname), [pathname]);
  const steps = useMemo(
    () => buildConexaJourneySteps(sectionConfigs),
    [sectionConfigs],
  );

  return (
    <OnboardingProvider<ConexaJourneyContext>
      flowId="conexa-scroll-journey"
      flowName="CONEXA Scroll Journey"
      flowVersion="1.1.0"
      steps={steps}
      initialStepId={steps[0]?.id}
      initialContext={{ flowData: {} }}
      localStoragePersistence={{ key: "conexa-journey-v1" }}
      debug={false}
    >
      {children}
    </OnboardingProvider>
  );
}
