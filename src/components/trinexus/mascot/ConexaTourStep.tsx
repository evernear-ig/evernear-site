"use client";

import { useOnboarding, type StepComponentProps } from "@onboardjs/react";
import { useConexaGuideActions } from "@/components/trinexus/mascot/ConexaGuideActionsContext";
import { useI18n } from "@/components/trinexus/providers/I18nProvider";
import { T } from "@/components/trinexus/ui/T";
import type { ConexaJourneyStepPayload } from "@/lib/mascot-concepts";

type TourPayload = ConexaJourneyStepPayload & {
  title: string;
  mainText: string;
};

export function ConexaTourStep({ payload }: StepComponentProps<TourPayload>) {
  const { t } = useI18n();
  const guideActions = useConexaGuideActions();
  const { state, next, previous, loading } = useOnboarding();

  const exitTour = () => guideActions?.exitTour();

  const stepLabel = String(t(payload.stepKey));
  const tip = String(t(payload.tipKey));

  return (
    <div className="conexa-tour-card" role="document">
      <header className="conexa-tour-card__head">
        <p className="conexa-tour-card__step">{stepLabel}</p>
        <span className="conexa-tour-card__count">
          {state?.currentStepNumber ?? 1}/{state?.totalSteps ?? 1}
        </span>
      </header>
      <p className="conexa-tour-card__body">{tip}</p>
      <footer className="conexa-tour-card__actions">
        {state?.canGoPrevious ? (
          <button
            type="button"
            className="conexa-tour-card__btn conexa-tour-card__btn--ghost"
            onClick={() => previous()}
            disabled={loading.isAnyLoading}
          >
            <T k="journey.btn.back" />
          </button>
        ) : (
          <span />
        )}
        <div className="conexa-tour-card__actions-right">
          <button
            type="button"
            className="conexa-tour-card__btn conexa-tour-card__btn--ghost"
            onClick={exitTour}
            disabled={loading.isAnyLoading}
          >
            <T k="journey.btn.close" />
          </button>
          {state?.canGoNext ? (
            <button
              type="button"
              className="conexa-tour-card__btn conexa-tour-card__btn--primary"
              onClick={() => next()}
              disabled={loading.isAnyLoading}
            >
              <T k="journey.btn.next" />
            </button>
          ) : (
            <button
              type="button"
              className="conexa-tour-card__btn conexa-tour-card__btn--primary"
              onClick={exitTour}
              disabled={loading.isAnyLoading}
            >
              <T k="journey.btn.done" />
            </button>
          )}
        </div>
      </footer>
    </div>
  );
}
