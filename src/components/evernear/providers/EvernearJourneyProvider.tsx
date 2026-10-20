"use client";

import { OnboardingProvider } from "@onboardjs/react";
import { usePathname } from "next/navigation";
import { useMemo, type ReactNode } from "react";
import {
  buildEvernearJourneySteps,
  type EvernearJourneyContext,
} from "@/lib/evernear-journey-steps";
import { getEvernearSections } from "@/lib/evernear-sections";

export function EvernearJourneyProvider({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const sectionConfigs = useMemo(() => getEvernearSections(pathname), [pathname]);
  const steps = useMemo(
    () => buildEvernearJourneySteps(sectionConfigs),
    [sectionConfigs],
  );

  return (
    <OnboardingProvider<EvernearJourneyContext>
      flowId="evernear-scroll-journey"
      flowName="Evernear Scroll Journey"
      flowVersion="1.1.0"
      steps={steps}
      initialStepId={steps[0]?.id}
      initialContext={{ flowData: {} }}
      localStoragePersistence={{ key: "evernear-journey-v1" }}
      debug={false}
    >
      {children}
    </OnboardingProvider>
  );
}
