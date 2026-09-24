"use client";

import { useState } from "react";
import { JoinButton } from "@/components/trinexus/ui/JoinButton";
import { useI18n } from "@/components/trinexus/providers/I18nProvider";
import { Carousel } from "@/components/trinexus/ui/Carousel";
import { THtml, T } from "@/components/trinexus/ui/T";
import type { AudienceItem } from "@/lib/ecosystem/vertical-catalog";
import type { JoinTrack } from "@/lib/join-tracks";

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
  const [index, setIndex] = useState(0);
  const quoteIndex = items.length;
  const audienceKey = `${prefix}.guide.audience.h`;

  const joinButton = joinTrack ? (
    <JoinButton className="btn btn-green" labelKey={ctaKey} prefill={{ track: joinTrack }} />
  ) : (
    <JoinButton className="btn btn-green" labelKey={ctaKey} />
  );

  const slides = [
    ...items.map((item, stepIndex) => (
      <article
        key={item.title}
        id={`${prefix}-audience-panel-${stepIndex}`}
        className="carousel-audience-slide"
      >
        <h4>
          <T k={item.title} />
        </h4>
        <p>
          <T k={item.sub} />
        </p>
      </article>
    )),
    <article
      key="quote"
      id={`${prefix}-audience-panel-${quoteIndex}`}
      className="carousel-audience-slide carousel-audience-slide--quote"
    >
      <p className="quote">
        <THtml k={quoteKey} />
      </p>
      {joinButton}
    </article>,
  ];

  const dotLabels = [
    ...items.map((item) => String(t(item.title))),
    String(t(ctaKey)),
  ];

  const liveMessage = () => {
    if (index === quoteIndex) return String(t(quoteKey));
    const item = items[index];
    return item ? `${t(item.title)}. ${t(item.sub)}` : "";
  };

  return (
    <Carousel
      variant="hero"
      className="sport-audience-carousel"
      slides={slides}
      index={index}
      onIndexChange={setIndex}
      ariaLabel={String(t(audienceKey))}
      showArrows={false}
      swipe
      reveal
      dotLabels={dotLabels}
      liveRegion={liveMessage()}
    />
  );
}
