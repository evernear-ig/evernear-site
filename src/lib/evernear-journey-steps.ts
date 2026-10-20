import type { OnboardingStep } from "@onboardjs/react";
import { EvernearTourStep } from "@/components/evernear/mascot/EvernearTourStep";
import type { EvernearSectionConfig } from "@/lib/evernear-sections";
import type { EvernearJourneyStepPayload } from "@/lib/mascot-concepts";

export type EvernearJourneyContext = {
  flowData: Record<string, unknown>;
  currentUser?: { id: string };
};

export function buildEvernearJourneySteps(
  configs: EvernearSectionConfig[],
): OnboardingStep<EvernearJourneyContext>[] {
  return configs.map((config, index) => ({
    id: config.key,
    component: EvernearTourStep,
    payload: {
      title: config.key,
      mainText: "",
      pose: config.pose,
      concept: config.concept,
      sectionKey: config.key,
      tipKey: config.tipKey,
      stepKey: config.stepKey,
      anchorSelector: config.id ? `#${config.id}` : config.selector,
    } satisfies EvernearJourneyStepPayload & {
      title: string;
      mainText: string;
      tipKey: string;
      stepKey: string;
      anchorSelector?: string;
    },
    nextStep: configs[index + 1]?.key ?? null,
    previousStep: configs[index - 1]?.key ?? null,
  }));
}
