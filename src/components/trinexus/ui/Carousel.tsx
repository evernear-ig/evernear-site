"use client";

import { type ReactNode, useEffect, useMemo } from "react";
import {
  chunkItems,
  useCarousel,
  useCarouselKeyboard,
  useCarouselPageSize,
  useCarouselSwipe,
  useReducedMotion,
} from "@/hooks/useCarousel";
import { useReveal } from "@/hooks/useReveal";

export type CarouselVariant = "cards" | "panel" | "hero";

type CarouselBaseProps = {
  variant: CarouselVariant;
  ariaLabel?: string;
  className?: string;
  reveal?: boolean;
  loop?: boolean;
  keyboard?: boolean;
  swipe?: boolean;
  showArrows?: boolean;
  showDots?: boolean;
  index?: number;
  onIndexChange?: (index: number) => void;
  dotLabels?: string[];
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
  itemsPerPage?: { desktop: number; mobile: number };
  stagger?: boolean;
};

export type CarouselProps<T = unknown> = CarouselSlidesProps | CarouselItemsProps<T>;

function CarouselNav({
  count,
  index,
  onSelect,
  onPrev,
  onNext,
  canPrev,
  canNext,
  showArrows,
  dotLabels,
}: {
  count: number;
  index: number;
  onSelect: (i: number) => void;
  onPrev: () => void;
  onNext: () => void;
  canPrev: boolean;
  canNext: boolean;
  showArrows: boolean;
  dotLabels?: string[];
}) {
  if (count < 2) return null;

  return (
    <nav className="carousel__nav" aria-label="Navegación del carrusel">
      {showArrows ? (
        <button
          type="button"
          className="carousel__arrow carousel__arrow--prev"
          onClick={onPrev}
          disabled={!canPrev}
          aria-label="Anterior"
        >
          <span aria-hidden="true">←</span>
        </button>
      ) : null}
      <div className="carousel__dots" role="tablist">
        {Array.from({ length: count }, (_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            className={i === index ? "is-active" : undefined}
            aria-selected={i === index}
            aria-label={dotLabels?.[i] ?? `Diapositiva ${i + 1}`}
            onClick={() => onSelect(i)}
          />
        ))}
      </div>
      {showArrows ? (
        <button
          type="button"
          className="carousel__arrow carousel__arrow--next"
          onClick={onNext}
          disabled={!canNext}
          aria-label="Siguiente"
        >
          <span aria-hidden="true">→</span>
        </button>
      ) : null}
    </nav>
  );
}

function CarouselSlides({
  variant,
  slides,
  transition = "slide",
  ariaLabel,
  className = "",
  reveal = true,
  loop = false,
  keyboard = false,
  swipe = true,
  showArrows,
  showDots = true,
  index: controlledIndex,
  onIndexChange,
  dotLabels,
  footer,
  liveRegion,
}: CarouselSlidesProps) {
  const revealRef = useReveal<HTMLDivElement>();
  const reducedMotion = useReducedMotion();
  const count = slides.length;

  const { index, setIndex, goPrev, goNext, canPrev, canNext } = useCarousel({
    count,
    loop,
    index: controlledIndex,
    onIndexChange,
  });

  const arrowsVisible = showArrows ?? variant !== "hero";
  const swipeEnabled = swipe && !reducedMotion;

  const handleSwipe = (direction: "prev" | "next") => {
    if (direction === "prev" && canPrev) goPrev();
    if (direction === "next" && canNext) goNext();
  };

  const touch = useCarouselSwipe(handleSwipe, swipeEnabled);
  useCarouselKeyboard(goPrev, goNext, keyboard && count > 1);

  const rootClass = [
    "carousel",
    `carousel--${variant}`,
    transition === "fade" ? "carousel--fade" : "",
    reveal ? "carousel--reveal rv" : "",
    variant === "hero" || variant === "cards" ? "carousel--mobile-swipe" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (reducedMotion && variant === "hero" && count > 1) {
    return (
      <div className={`${rootClass} carousel--static`} aria-label={ariaLabel}>
        {slides}
      </div>
    );
  }

  const trackStyle =
    transition === "slide"
      ? {
          width: `${count * 100}%`,
          transform: `translateX(-${(index * 100) / count}%)`,
        }
      : undefined;

  return (
    <div
      ref={reveal ? revealRef : undefined}
      className={rootClass}
      aria-label={ariaLabel}
      aria-roledescription="carousel"
      onTouchStart={touch.onTouchStart}
      onTouchEnd={touch.onTouchEnd}
    >
      <div className="carousel__viewport">
        {transition === "fade" ? (
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
        ) : (
          <div className="carousel__track" style={trackStyle}>
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
        )}
      </div>

      {showDots || arrowsVisible ? (
        <CarouselNav
          count={count}
          index={index}
          onSelect={setIndex}
          onPrev={goPrev}
          onNext={goNext}
          canPrev={canPrev}
          canNext={canNext}
          showArrows={arrowsVisible}
          dotLabels={dotLabels}
        />
      ) : null}

      {liveRegion ? (
        <p className="carousel__live sr" aria-live="polite">{liveRegion}</p>
      ) : null}

      {footer}
    </div>
  );
}

function CarouselItems<T>({
  variant,
  items,
  renderItem,
  itemsPerPage = { desktop: 3, mobile: 1 },
  stagger = true,
  ariaLabel,
  className = "",
  reveal = true,
  swipe = true,
  showArrows,
  showDots = true,
  index: controlledIndex,
  onIndexChange,
}: CarouselItemsProps<T>) {
  const revealRef = useReveal<HTMLDivElement>();
  const pageSize = useCarouselPageSize(itemsPerPage.desktop, itemsPerPage.mobile);
  const pages = useMemo(() => chunkItems(items, pageSize), [items, pageSize]);
  const count = pages.length;

  const { index, setIndex, goPrev, goNext, canPrev, canNext } = useCarousel({
    count,
    index: controlledIndex,
    onIndexChange,
  });

  useEffect(() => {
    if (controlledIndex === undefined && index >= count) {
      setIndex(Math.max(0, count - 1));
    }
  }, [count, controlledIndex, index, setIndex]);

  const handleSwipe = (direction: "prev" | "next") => {
    if (direction === "prev" && canPrev) goPrev();
    if (direction === "next" && canNext) goNext();
  };
  const touch = useCarouselSwipe(handleSwipe, swipe);

  const rootClass = [
    "carousel",
    `carousel--${variant}`,
    reveal ? "carousel--reveal rv" : "",
    stagger ? "carousel--stagger" : "",
    "carousel--mobile-swipe",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const arrowsVisible = showArrows ?? true;

  return (
    <div
      ref={reveal ? revealRef : undefined}
      className={rootClass}
      aria-label={ariaLabel}
      aria-roledescription="carousel"
      onTouchStart={touch.onTouchStart}
      onTouchEnd={touch.onTouchEnd}
    >
      <div className="carousel__shell">
        {arrowsVisible ? (
          <button
            type="button"
            className="carousel__arrow carousel__arrow--prev carousel__arrow--outside"
            onClick={goPrev}
            disabled={!canPrev}
            aria-label="Anterior"
          >
            <span aria-hidden="true">←</span>
          </button>
        ) : null}

        <div className="carousel__viewport">
          <div
            className="carousel__track"
            style={{
              width: `${count * 100}%`,
              transform: `translateX(-${(index * 100) / count}%)`,
            }}
          >
            {pages.map((group, pageIndex) => (
              <ul
                key={pageIndex}
                className="carousel__page"
                style={{ width: `${100 / count}%` }}
                aria-hidden={pageIndex !== index}
              >
                {group.map((item, itemIndex) => (
                  <li
                    key={itemIndex}
                    className="carousel__page-item"
                    data-stagger={itemIndex}
                  >
                    {renderItem(item, pageIndex * pageSize + itemIndex)}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        {arrowsVisible ? (
          <button
            type="button"
            className="carousel__arrow carousel__arrow--next carousel__arrow--outside"
            onClick={goNext}
            disabled={!canNext}
            aria-label="Siguiente"
          >
            <span aria-hidden="true">→</span>
          </button>
        ) : null}
      </div>

      {showDots && count > 1 ? (
        <div className="carousel__dots" role="tablist">
          {pages.map((_, pageIndex) => (
            <button
              key={pageIndex}
              type="button"
              role="tab"
              className={pageIndex === index ? "is-active" : undefined}
              aria-selected={pageIndex === index}
              aria-label={`Grupo ${pageIndex + 1}`}
              onClick={() => setIndex(pageIndex)}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}

export function Carousel<T>(props: CarouselProps<T>) {
  if ("renderItem" in props && "items" in props) {
    return <CarouselItems {...(props as CarouselItemsProps<T>)} />;
  }
  if ("slides" in props) {
    return <CarouselSlides {...(props as CarouselSlidesProps)} />;
  }
  return null;
}
