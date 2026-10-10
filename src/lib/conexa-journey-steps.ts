import type { OnboardingStep } from "@onboardjs/react";
import { ConexaTourStep } from "@/components/trinexus/mascot/ConexaTourStep";
import type { ConexaSectionConfig } from "@/lib/conexa-sections";
import type { ConexaJourneyStepPayload } from "@/lib/mascot-concepts";

export type ConexaJourneyContext = {
  flowData: Record<string, unknown>;
  currentUser?: { id: string };
};

export function buildConexaJourneySteps(
  configs: ConexaSectionConfig[],
): OnboardingStep<ConexaJourneyContext>[] {
  return configs.map((config, index) => ({
    id: config.key,
    component: ConexaTourStep,
    payload: {
      title: config.key,
      mainText: "",
      pose: config.pose,
      concept: config.concept,
      sectionKey: config.key,
      tipKey: config.tipKey,
      stepKey: config.stepKey,
      anchorSelector: config.id ? `#${config.id}` : config.selector,
    } satisfies ConexaJourneyStepPayload & {
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
