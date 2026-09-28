"use client";

import { type ReactNode, useRef } from "react";
import { useCarouselPanOffset } from "@/hooks/useCarouselPanOffset";
import {
  useCarousel,
  useReducedMotion,
  useWheelDrive,
} from "@/hooks/useCarousel";
import { useScrollJackCarousel } from "@/hooks/useScrollJackCarousel";
import { useReveal } from "@/hooks/useReveal";

export type CarouselVariant = "cards" | "panel" | "hero";
export type CarouselDrive = "scroll" | "wheel" | "strip" | "held" | "snap";

type CarouselBaseProps = {
  variant: CarouselVariant;
  ariaLabel?: string;
  className?: string;
  reveal?: boolean;
  drive?: CarouselDrive;
  index?: number;
  onIndexChange?: (index: number) => void;
  footer?: ReactNode;
  liveRegion?: string;
};

type CarouselSlidesProps = CarouselBaseProps & {
  slides: ReactNode[];
  transition?: "slide" | "fade";
};

type CarouselItemsProps<T> = CarouselBaseProps & {
  items: readonly T[];
  renderItem: (item: T, index: number) => ReactNode;
};

export type CarouselProps<T = unknown> = CarouselSlidesProps | CarouselItemsProps<T>;

function CarouselStage({
  slides,
  index,
  transition,
}: {
  slides: ReactNode[];
  index: number;
  transition: "slide" | "fade";
}) {
  if (transition === "fade") {
    return (
      <div className="carousel__fade-stage">
        {slides.map((slide, slideIndex) => (
          <div
            key={slideIndex}
            className="carousel__fade-slide"
            aria-hidden={slideIndex !== index}
            data-active={slideIndex === index ? "true" : undefined}
          >
            {slide}
          </div>
        ))}
      </div>
    );
  }

  const count = slides.length;
  return (
    <div
      className="carousel__track"
      style={{
        width: `${count * 100}%`,
        transform: `translateX(-${(index * 100) / count}%)`,
      }}
    >
      {slides.map((slide, slideIndex) => (
        <div
          key={slideIndex}
          className="carousel__slide"
          style={{ width: `${100 / count}%` }}
          aria-hidden={slideIndex !== index}
        >
          {slide}
        </div>
      ))}
    </div>
  );
}

function CarouselSlides({
  variant,
  slides,
  transition = "slide",
  ariaLabel,
  className = "",
  reveal = true,
  drive = "scroll",
  index: controlledIndex,
  onIndexChange,
  footer,
  liveRegion,
}: CarouselSlidesProps) {
  const rootRef = useReveal<HTMLDivElement>();
  const reducedMotion = useReducedMotion();
  const count = slides.length;
  const scrollJack = drive === "scroll" && !reducedMotion && count > 1;

  const { index: carouselIndex, setIndex } = useCarousel({
    count,
    index: controlledIndex,
    onIndexChange,
  });

  const { currentIndex, isActive } = useScrollJackCarousel(rootRef, count, {
    enabled: scrollJack,
  });
  const index = scrollJack ? currentIndex : carouselIndex;

  useWheelDrive(
    rootRef,
    count,
    index,
    setIndex,
    drive === "wheel" && !reducedMotion,
  );

  const rootClass = [
    "carousel",
    `carousel--${variant}`,
    `carousel--drive-${drive}`,
    scrollJack ? "carousel--jack" : "",
    scrollJack && isActive ? "is-active" : "",
    transition === "fade" ? "carousel--fade" : "",
    reveal ? "carousel--reveal rv" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (reducedMotion && count > 1) {
    return (
      <div className={`${rootClass} carousel--static`} aria-label={ariaLabel}>
        {slides}
      </div>
    );
  }

  return (
    <div
      ref={rootRef}
      className={rootClass}
      aria-label={ariaLabel}
      aria-roledescription="carousel"
    >
      <div className="carousel__sticky">
        <div className="carousel__viewport">
          <CarouselStage slides={slides} index={index} transition={transition} />
        </div>
        {count > 1 ? (
          <div className="carousel__progress" aria-hidden="true">
            <span
              className="carousel__progress-bar"
              style={{ width: `${((index + 1) / count) * 100}%` }}
            />
          </div>
        ) : null}
        {liveRegion ? (
          <p className="carousel__live sr" aria-live="polite">{liveRegion}</p>
        ) : null}
        {footer}
      </div>
    </div>
  );
}

function CarouselStrip<T>({
  variant,
  items,
  renderItem,
  ariaLabel,
  className = "",
  reveal = true,
  drive = "strip",
}: CarouselItemsProps<T>) {
  const revealRef = useReveal<HTMLDivElement>();
  const rootRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const scrollJack = drive === "scroll" && !reducedMotion && items.length > 1;

  const { currentIndex, isActive } = useScrollJackCarousel(rootRef, items.length, {
    enabled: scrollJack,
  });

  useCarouselPanOffset(viewportRef, trackRef, currentIndex, scrollJack);

  const rootClass = [
    "carousel",
    `carousel--${variant}`,
    `carousel--drive-${drive}`,
    scrollJack ? "carousel--jack carousel--pan" : "",
    scrollJack && isActive ? "is-active" : "",
    reveal ? "carousel--reveal rv" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const cards = items.map((item, itemIndex) => (
    <div key={itemIndex} className="carousel__strip-item">
      {renderItem(item, itemIndex)}
    </div>
  ));

  if (scrollJack) {
    return (
      <div
        ref={rootRef}
        className={rootClass}
        aria-label={ariaLabel}
        aria-roledescription="carousel"
      >
        <div className="carousel__sticky">
          <div ref={viewportRef} className="carousel__viewport">
            <div ref={trackRef} className="carousel__pan-track">
              {cards}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={reveal ? revealRef : undefined}
      className={rootClass}
      aria-label={ariaLabel}
    >
      <div className="carousel__strip" tabIndex={0}>
        {cards}
      </div>
    </div>
  );
}

export function Carousel<T>(props: CarouselProps<T>) {
  if ("renderItem" in props && "items" in props) {
    return (
      <CarouselStrip
        {...props}
        drive={props.drive ?? "strip"}
      />
    );
  }
  if ("slides" in props) {
    return <CarouselSlides {...(props as CarouselSlidesProps)} />;
  }
  return null;
}
