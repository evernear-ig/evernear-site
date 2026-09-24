"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { JoinButton } from "@/components/trinexus/ui/JoinButton";
import { useI18n } from "@/components/trinexus/providers/I18nProvider";
import { THtml, T } from "@/components/trinexus/ui/T";

export const SPORT_AUDIENCE_ITEMS = [
  { title: "join.org.sport.club", sub: "sport.guide.a1.s" },
  { title: "join.org.sport.athlete", sub: "sport.guide.a2.s" },
  { title: "sport.guide.a3", sub: "sport.guide.a3.s" },
  { title: "join.org.sport.sponsor", sub: "sport.guide.a4.s" },
] as const;

const SWIPE_THRESHOLD = 48;
const SLIDE_COUNT = SPORT_AUDIENCE_ITEMS.length + 1;
const QUOTE_INDEX = SPORT_AUDIENCE_ITEMS.length;

export function SportAudienceCarousel() {
  const { t } = useI18n();
  const [index, setIndex] = useState(0);
  const [staticMode, setStaticMode] = useState(false);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setStaticMode(mq.matches);
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  const goTo = useCallback((next: number) => {
    setIndex(Math.max(0, Math.min(SLIDE_COUNT - 1, next)));
  }, []);

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

  const dotLabel = (stepIndex: number) => {
    if (stepIndex === QUOTE_INDEX) return String(t("sport.guide.cta"));
    const item = SPORT_AUDIENCE_ITEMS[stepIndex];
    return item ? String(t(item.title)) : "";
  };

  const liveMessage = () => {
    if (index === QUOTE_INDEX) {
      return `${t("sport.guide.q")}`;
    }
    const item = SPORT_AUDIENCE_ITEMS[index];
    return item ? `${t(item.title)}. ${t(item.sub)}` : "";
  };

  if (staticMode) {
    return (
      <div className="sport-audience-static" role="region" aria-label={String(t("sport.guide.audience.h"))}>
        {SPORT_AUDIENCE_ITEMS.map((item) => (
          <article key={item.title} className="sport-audience-panel">
            <h4>
              <T k={item.title} />
            </h4>
            <p>
              <T k={item.sub} />
            </p>
          </article>
        ))}
        <article className="sport-audience-panel sport-audience-panel--quote">
          <p className="quote">
            <THtml k="sport.guide.q" />
          </p>
          <JoinButton
            className="btn btn-green"
            labelKey="sport.guide.cta"
            prefill={{ track: "sport" }}
          />
        </article>
      </div>
    );
  }

  return (
    <section
      className="sport-audience-carousel"
      aria-label={String(t("sport.guide.audience.h"))}
      aria-roledescription="carousel"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="sport-audience-carousel-viewport">
        <div
          className="sport-audience-carousel-track"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {SPORT_AUDIENCE_ITEMS.map((item, stepIndex) => (
            <article
              key={item.title}
              id={`sport-audience-panel-${stepIndex}`}
              className="sport-audience-carousel-slide"
              aria-hidden={stepIndex !== index}
            >
              <h4>
                <T k={item.title} />
              </h4>
              <p>
                <T k={item.sub} />
              </p>
            </article>
          ))}
          <article
            id={`sport-audience-panel-${QUOTE_INDEX}`}
            className="sport-audience-carousel-slide sport-audience-carousel-slide--quote"
            aria-hidden={index !== QUOTE_INDEX}
          >
            <p className="quote">
              <THtml k="sport.guide.q" />
            </p>
            <JoinButton
              className="btn btn-green"
              labelKey="sport.guide.cta"
              prefill={{ track: "sport" }}
            />
          </article>
        </div>
      </div>

      <div
        className="sport-audience-carousel-dots"
        role="tablist"
        aria-label={String(t("sport.guide.audience.h"))}
      >
        {Array.from({ length: SLIDE_COUNT }, (_, stepIndex) => (
          <button
            key={stepIndex}
            type="button"
            role="tab"
            className={stepIndex === index ? "is-active" : undefined}
            aria-selected={stepIndex === index}
            aria-controls={`sport-audience-panel-${stepIndex}`}
            aria-label={dotLabel(stepIndex)}
            onClick={() => goTo(stepIndex)}
          />
        ))}
      </div>

      <p className="sport-audience-carousel-live sr" aria-live="polite">
        {liveMessage()}
      </p>
    </section>
  );
}
