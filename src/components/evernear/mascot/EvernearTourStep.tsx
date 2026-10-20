"use client";

import { useOnboarding, type StepComponentProps } from "@onboardjs/react";
import { useEvernearGuideActions } from "@/components/evernear/mascot/EvernearGuideActionsContext";
import { useI18n } from "@/components/evernear/providers/I18nProvider";
import { T } from "@/components/evernear/ui/T";
import type { EvernearJourneyStepPayload } from "@/lib/mascot-concepts";

type TourPayload = EvernearJourneyStepPayload & {
  title: string;
  mainText: string;
};

export function EvernearTourStep({ payload }: StepComponentProps<TourPayload>) {
  const { t } = useI18n();
  const guideActions = useEvernearGuideActions();
  const { state, next, previous, loading } = useOnboarding();

  const exitTour = () => guideActions?.exitTour();

  const stepLabel = String(t(payload.stepKey));
  const tip = String(t(payload.tipKey));

  return (
    <div className="evernear-tour-card" role="document">
      <header className="evernear-tour-card__head">
        <p className="evernear-tour-card__step">{stepLabel}</p>
        <span className="evernear-tour-card__count">
          {state?.currentStepNumber ?? 1}/{state?.totalSteps ?? 1}
        </span>
      </header>
      <p className="evernear-tour-card__body">{tip}</p>
      <footer className="evernear-tour-card__actions">
        {state?.canGoPrevious ? (
          <button
            type="button"
            className="evernear-tour-card__btn evernear-tour-card__btn--ghost"
            onClick={() => previous()}
            disabled={loading.isAnyLoading}
          >
            <T k="journey.btn.back" />
          </button>
        ) : (
          <span />
        )}
        <div className="evernear-tour-card__actions-right">
          <button
            type="button"
            className="evernear-tour-card__btn evernear-tour-card__btn--ghost"
            onClick={exitTour}
            disabled={loading.isAnyLoading}
          >
            <T k="journey.btn.close" />
          </button>
          {state?.canGoNext ? (
            <button
              type="button"
              className="evernear-tour-card__btn evernear-tour-card__btn--primary"
              onClick={() => next()}
              disabled={loading.isAnyLoading}
            >
              <T k="journey.btn.next" />
            </button>
          ) : (
            <button
              type="button"
              className="evernear-tour-card__btn evernear-tour-card__btn--primary"
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
