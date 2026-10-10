"use client";

import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/components/trinexus/providers/I18nProvider";
import { useScrollJackCarousel } from "@/hooks/useScrollJackCarousel";
import { T } from "@/components/trinexus/ui/T";

export const SPORT_PATH_STEPS = [
  { title: "sport.guide.s1", body: "sport.guide.s1.p" },
  { title: "sport.guide.s2", body: "sport.guide.s2.p" },
  { title: "sport.guide.s3", body: "sport.guide.s3.p" },
  { title: "sport.guide.s4", body: "sport.guide.s4.p" },
] as const;

export function SportPathCarousel() {
  const { t } = useI18n();
  const [staticMode, setStaticMode] = useState(false);
  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setStaticMode(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const { currentIndex, isActive, setCurrentIndex } = useScrollJackCarousel(
    rootRef,
    SPORT_PATH_STEPS.length,
    { enabled: !staticMode },
  );

  if (staticMode) {
    return (
      <div className="path sport-path-static" role="region" aria-label={String(t("sport.guide.path.aria"))}>
        {SPORT_PATH_STEPS.map((step) => (
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

  const activeStep = SPORT_PATH_STEPS[currentIndex];

  return (
    <section
      ref={rootRef}
      className={`sport-path-carousel carousel--jack${isActive ? " is-active" : ""}`}
      aria-label={String(t("sport.guide.path.aria"))}
      aria-roledescription="carousel"
    >
      <div className="sport-path-carousel-viewport">
        <div
          className="sport-path-carousel-track"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {SPORT_PATH_STEPS.map((step, stepIndex) => (
            <article
              key={step.title}
              id={`sport-path-panel-${stepIndex}`}
              className="sport-path-carousel-slide"
              aria-hidden={stepIndex !== currentIndex}
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

      <div className="sport-path-carousel-dots" role="tablist" aria-label={String(t("sport.guide.path.aria"))}>
        {SPORT_PATH_STEPS.map((step, stepIndex) => (
          <button
            key={step.title}
            type="button"
            role="tab"
            className={stepIndex === currentIndex ? "is-active" : undefined}
            aria-selected={stepIndex === currentIndex}
            aria-controls={`sport-path-panel-${stepIndex}`}
            aria-label={String(t(step.title))}
            onClick={() => setCurrentIndex(stepIndex)}
          />
        ))}
      </div>

      <p className="sport-path-carousel-live sr" aria-live="polite">
        {activeStep ? `${t(activeStep.title)}. ${t(activeStep.body)}` : ""}
      </p>
    </section>
  );
}
