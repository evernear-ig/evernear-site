"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/trinexus/providers/I18nProvider";
import { T } from "@/components/trinexus/ui/T";
import type { GuideStep } from "@/lib/ecosystem/vertical-catalog";

const SWIPE_THRESHOLD = 48;

type VerticalPathCarouselProps = {
  prefix: string;
  steps: readonly GuideStep[];
};

export function VerticalPathCarousel({ prefix, steps }: VerticalPathCarouselProps) {
  const { t } = useI18n();
  const [index, setIndex] = useState(0);
  const [staticMode, setStaticMode] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const ariaKey = `${prefix}.guide.path.aria`;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setStaticMode(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const goTo = useCallback(
    (next: number) => {
      setIndex(Math.max(0, Math.min(steps.length - 1, next)));
    },
    [steps.length]
  );

  const onTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.changedTouches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const delta = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < SWIPE_THRESHOLD) return;
    goTo(delta < 0 ? index + 1 : index - 1);
  };

  if (staticMode) {
    return (
      <div className="path sport-path-static" role="region" aria-label={String(t(ariaKey))}>
        {steps.map((step) => (
          <div key={step.title}>
            <b>
              <T k={step.title} />
            </b>
            <span>
              <T k={step.body} />
            </span>
          </div>
        ))}
      </div>
    );
  }

  const activeStep = steps[index];

  return (
    <section
      className="sport-path-carousel"
      aria-label={String(t(ariaKey))}
      aria-roledescription="carousel"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="sport-path-carousel-viewport">
        <div
          className="sport-path-carousel-track"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {steps.map((step, stepIndex) => (
            <article
              key={step.title}
              id={`${prefix}-path-panel-${stepIndex}`}
              className="sport-path-carousel-slide"
              aria-hidden={stepIndex !== index}
            >
              <b>
                <T k={step.title} />
              </b>
              <span>
                <T k={step.body} />
              </span>
            </article>
          ))}
        </div>
      </div>

      <div className="sport-path-carousel-dots" role="tablist" aria-label={String(t(ariaKey))}>
        {steps.map((step, stepIndex) => (
          <button
            key={step.title}
            type="button"
            role="tab"
            className={stepIndex === index ? "is-active" : undefined}
            aria-selected={stepIndex === index}
            aria-controls={`${prefix}-path-panel-${stepIndex}`}
            aria-label={String(t(step.title))}
            onClick={() => goTo(stepIndex)}
          />
        ))}
      </div>

      <p className="sport-path-carousel-live sr" aria-live="polite">
        {activeStep ? `${t(activeStep.title)}. ${t(activeStep.body)}` : ""}
      </p>
    </section>
  );
}
