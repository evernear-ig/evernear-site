"use client";

import { useCallback, useEffect, useState } from "react";
import { T } from "@/components/trinexus/ui/T";
import { TrinexusPhoto } from "@/components/trinexus/ui/TrinexusPhoto";

export type SlideBlock = {
  titleKey: string;
  bodyKeys: readonly string[];
  imageKey: string;
  list?: boolean;
};

type ContentSlidesProps = {
  blocks: readonly SlideBlock[];
  priorityImage?: boolean;
};

export function ContentSlides({ blocks, priorityImage = false }: ContentSlidesProps) {
  const [index, setIndex] = useState(0);
  const count = blocks.length;
  const active = blocks[index];

  const go = useCallback(
    (delta: number) => {
      if (count < 2) return;
      setIndex((current) => (current + delta + count) % count);
    },
    [count],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  if (!active) return null;

  return (
    <div className="content-slides">
      <div className="content-slides-viewport">
        <article className="content-slide" aria-live="polite">
          <div className="content-slide-media" aria-hidden="true">
            <TrinexusPhoto imageKey={active.imageKey} priority={priorityImage && index === 0} />
          </div>
          <div className="content-slide-scrim" aria-hidden="true" />
          <div className="content-slide-inner">
            <h2 className="content-slide-title">
              <T k={active.titleKey} />
            </h2>
            {active.list ? (
              <ul className="content-slide-list">
                {active.bodyKeys.map((key) => (
                  <li key={key}>
                    <T k={key} />
                  </li>
                ))}
              </ul>
            ) : (
              <div className="content-slide-body">
                {active.bodyKeys.map((key) => (
                  <p key={key}>
                    <T k={key} />
                  </p>
                ))}
              </div>
            )}
          </div>
        </article>
      </div>

      {count > 1 ? (
        <nav className="content-slides-nav" aria-label="Secciones">
          <button
            type="button"
            className="content-slides-btn"
            onClick={() => go(-1)}
            aria-label="Anterior"
          >
            ←
          </button>
          <div className="content-slides-dots" role="tablist">
            {blocks.map((block, i) => (
              <button
                key={block.titleKey}
                type="button"
                role="tab"
                aria-selected={i === index}
                aria-label={`Sección ${i + 1}`}
                className={i === index ? "active" : undefined}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
          <button
            type="button"
            className="content-slides-btn"
            onClick={() => go(1)}
            aria-label="Siguiente"
          >
            →
          </button>
        </nav>
      ) : null}
    </div>
  );
}
