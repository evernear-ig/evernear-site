"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { JoinButton } from "@/components/trinexus/ui/JoinButton";
import { useI18n } from "@/components/trinexus/providers/I18nProvider";
import { THtml, T } from "@/components/trinexus/ui/T";
import type { AudienceItem } from "@/lib/ecosystem/vertical-catalog";
import type { JoinTrack } from "@/lib/join-tracks";

const SWIPE_THRESHOLD = 48;

type VerticalAudienceCarouselProps = {
  prefix: string;
  items: readonly AudienceItem[];
  quoteKey: string;
  ctaKey: string;
  joinTrack?: JoinTrack;
};

export function VerticalAudienceCarousel({
  prefix,
  items,
  quoteKey,
  ctaKey,
  joinTrack,
}: VerticalAudienceCarouselProps) {
  const { t } = useI18n();
  const slideCount = items.length + 1;
  const quoteIndex = items.length;
  const audienceKey = `${prefix}.guide.audience.h`;
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

  const goTo = useCallback(
    (next: number) => {
      setIndex(Math.max(0, Math.min(slideCount - 1, next)));
    },
    [slideCount]
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

  const dotLabel = (stepIndex: number) => {
    if (stepIndex === quoteIndex) return String(t(ctaKey));
    const item = items[stepIndex];
    return item ? String(t(item.title)) : "";
  };

  const liveMessage = () => {
    if (index === quoteIndex) {
      return `${t(quoteKey)}`;
    }
    const item = items[index];
    return item ? `${t(item.title)}. ${t(item.sub)}` : "";
  };

  const joinButton = joinTrack ? (
    <JoinButton className="btn btn-green" labelKey={ctaKey} prefill={{ track: joinTrack }} />
  ) : (
    <JoinButton className="btn btn-green" labelKey={ctaKey} />
  );

  if (staticMode) {
    return (
      <div className="sport-audience-static" role="region" aria-label={String(t(audienceKey))}>
        {items.map((item) => (
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
            <THtml k={quoteKey} />
          </p>
          {joinButton}
        </article>
      </div>
    );
  }

  return (
    <section
      className="sport-audience-carousel"
      aria-label={String(t(audienceKey))}
      aria-roledescription="carousel"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="sport-audience-carousel-viewport">
        <div
          className="sport-audience-carousel-track"
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {items.map((item, stepIndex) => (
            <article
              key={item.title}
              id={`${prefix}-audience-panel-${stepIndex}`}
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
            id={`${prefix}-audience-panel-${quoteIndex}`}
            className="sport-audience-carousel-slide sport-audience-carousel-slide--quote"
            aria-hidden={index !== quoteIndex}
          >
            <p className="quote">
              <THtml k={quoteKey} />
            </p>
            {joinButton}
          </article>
        </div>
      </div>

      <div
        className="sport-audience-carousel-dots"
        role="tablist"
        aria-label={String(t(audienceKey))}
      >
        {Array.from({ length: slideCount }, (_, stepIndex) => (
          <button
            key={stepIndex}
            type="button"
            role="tab"
            className={stepIndex === index ? "is-active" : undefined}
            aria-selected={stepIndex === index}
            aria-controls={`${prefix}-audience-panel-${stepIndex}`}
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
