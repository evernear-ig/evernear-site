"use client";

import { useState } from "react";
import { useI18n } from "@/components/trinexus/providers/I18nProvider";
import { Carousel } from "@/components/trinexus/ui/Carousel";
import { T } from "@/components/trinexus/ui/T";
import type { GuideStep } from "@/lib/ecosystem/vertical-catalog";

type VerticalPathCarouselProps = {
  prefix: string;
  steps: readonly GuideStep[];
};

export function VerticalPathCarousel({ prefix, steps }: VerticalPathCarouselProps) {
  const { t } = useI18n();
  const [index, setIndex] = useState(0);
  const ariaKey = `${prefix}.guide.path.aria`;
  const activeStep = steps[index];

  const slides = steps.map((step, stepIndex) => (
    <article
      key={step.title}
      id={`${prefix}-path-panel-${stepIndex}`}
      className="carousel-hero-slide"
    >
      <b>
        <T k={step.title} />
      </b>
      <span>
        <T k={step.body} />
      </span>
    </article>
  ));

  return (
    <Carousel
      variant="hero"
      drive="scroll"
      slides={slides}
      onIndexChange={setIndex}
      ariaLabel={String(t(ariaKey))}
      reveal
      liveRegion={
        activeStep ? `${t(activeStep.title)}. ${t(activeStep.body)}` : ""
      }
      className="sport-path-carousel"
    />
  );
}
