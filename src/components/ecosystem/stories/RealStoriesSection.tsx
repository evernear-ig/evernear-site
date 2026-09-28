"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useI18n } from "@/components/trinexus/providers/I18nProvider";
import { CTAButton } from "@/components/ecosystem/stories/CTAButton";
import { StoriesCarousel } from "@/components/ecosystem/stories/StoriesCarousel";
import { REAL_STORIES, type RealStory } from "@/components/ecosystem/stories/real-stories";

type RealStoriesSectionProps = {
  titleAs?: "h1" | "h2";
  onTellStory: () => void;
};

const LIGHTS: Array<[number, number, number]> = [
  [168, 78, 5],
  [188, 96, 7],
  [206, 118, 4],
  [196, 142, 6],
  [214, 168, 5],
  [228, 198, 8],
  [248, 214, 5],
  [236, 236, 7],
  [210, 228, 4],
  [198, 258, 6],
  [222, 286, 9],
  [252, 268, 6],
  [286, 246, 8],
  [318, 228, 5],
  [342, 252, 11],
  [378, 236, 7],
  [404, 268, 13],
  [436, 292, 8],
  [412, 318, 10],
  [368, 304, 6],
  [332, 292, 8],
  [298, 312, 5],
  [274, 338, 7],
  [246, 356, 5],
  [228, 388, 8],
  [252, 412, 6],
  [286, 396, 10],
  [324, 378, 7],
  [360, 364, 12],
  [398, 388, 8],
  [428, 356, 6],
  [392, 424, 9],
  [348, 442, 7],
  [304, 456, 11],
  [262, 448, 6],
  [236, 478, 8],
  [258, 508, 5],
  [292, 522, 10],
  [328, 498, 6],
  [354, 528, 8],
  [318, 558, 5],
  [276, 572, 9],
  [242, 548, 4],
  [258, 604, 7],
  [292, 628, 5],
  [268, 656, 4],
  [248, 612, 3],
  [188, 188, 3],
  [454, 248, 4],
  [470, 310, 5],
];

function Equalizer({ tone }: { tone: "gray" | "cyan" | "magenta" }) {
  const fill = tone === "cyan" ? "var(--rs-cyan)" : tone === "magenta" ? "var(--rs-magenta)" : "#9aa3b2";
  const heights = tone === "gray" ? [4, 8, 12, 16, 10] : [5, 9, 14, 18, 11];
  return (
    <svg className="rs-eq__svg" viewBox="0 0 28 18" aria-hidden="true">
      {heights.map((height, index) => (
        <rect
          key={index}
          x={index * 5.6}
          y={18 - height}
          width="3.2"
          height={height}
          rx="1"
          fill={fill}
          opacity={tone === "gray" ? 0.72 : 0.95}
        />
      ))}
    </svg>
  );
}

function NightLatamMap() {
  return (
    <div className="rs-map" aria-hidden="true">
      <svg className="rs-map__svg" viewBox="150 40 380 420" preserveAspectRatio="xMidYMid meet">
        <defs>
          <radialGradient id="rsCity" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff6d2" stopOpacity="0.95" />
            <stop offset="35%" stopColor="#e7c56a" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#e7c56a" stopOpacity="0" />
          </radialGradient>
          <filter id="rsGlow" x="-40%" y="-40%" width="180%" height="180%">
            <feGaussianBlur stdDeviation="1.4" />
          </filter>
        </defs>
        <path
          d="M188 92c18-16 42-8 52 10 8 14 6 28-4 40-14 8-22 22-16 36 8 18 2 34-12 46-10 8-14 22-6 34 10 16 8 32-2 46-12 10-16 28-6 42 12 16 10 36-4 50-16 12-18 32-4 48 14 14 12 34-6 46-18 10-22 30-8 44 16 12 14 32-2 42-20 8-28 28-16 42 8 18 2 36-14 44-22 6-48-8-58-28-8-16-24-22-38-14-16 10-34 4-42-14-6-18 2-36 16-46 10-8 14-22 6-34-10-16-8-34 6-46 12-8 16-24 6-36-12-14-10-32 4-44 12-8 16-22 8-34-10-14-8-32 6-42 14-8 18-24 8-36-12-16-8-34 8-44 14-6 20-20 10-32-8-14-4-30 12-36 14-4 24-16 22-30-2-16 8-28 24-30z"
          fill="#142033"
          opacity="0.55"
        />
        <g filter="url(#rsGlow)">
          {LIGHTS.map(([cx, cy, r], index) => (
            <circle key={index} cx={cx} cy={cy} r={r * 2.4} fill="url(#rsCity)" />
          ))}
        </g>
      </svg>
    </div>
  );
}

export function RealStoriesSection({ titleAs = "h2", onTellStory }: RealStoriesSectionProps) {
  const { t } = useI18n();
  const Title = titleAs;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const wasOpen = useRef(false);
  const [active, setActive] = useState<RealStory | null>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (active && !dialog.open) {
      dialog.showModal();
      closeRef.current?.focus();
      wasOpen.current = true;
      return;
    }
    if (!active && wasOpen.current) {
      wasOpen.current = false;
      if (dialog.open) dialog.close();
      lastFocus.current?.focus();
    }
  }, [active]);

  const openStory = (story: RealStory) => {
    lastFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setActive(story);
  };

  const closeStory = () => setActive(null);

  return (
    <div className="rs">
      <NightLatamMap />
      <Title id="historias-title" className="rs-title">
        {String(t("stories.hero.h"))}
      </Title>

      <div className="rs-panel">
        <span className="rs-eq rs-eq--tl">
          <Equalizer tone="gray" />
        </span>
        <span className="rs-eq rs-eq--tr">
          <Equalizer tone="gray" />
        </span>
        <p className="rs-lead">{String(t("stories.reel.lead"))}</p>
        <StoriesCarousel stories={REAL_STORIES} onSelect={openStory} />
        <div className="rs-rule" />
        <span className="rs-eq rs-eq--bl">
          <Equalizer tone="cyan" />
        </span>
        <span className="rs-eq rs-eq--br">
          <Equalizer tone="magenta" />
        </span>
        <div className="rs-cta-slot">
          <CTAButton
            onClick={() => {
              closeStory();
              onTellStory();
            }}
          />
        </div>
      </div>

      <dialog
        ref={dialogRef}
        className="rs-dialog"
        aria-labelledby={active ? "rs-dialog-title" : undefined}
        onClose={closeStory}
        onClick={(event) => {
          if (event.target === event.currentTarget) closeStory();
        }}
      >
        {active ? (
          <div className="rs-dialog__box">
            <button
              ref={closeRef}
              type="button"
              className="rs-dialog__close"
              onClick={closeStory}
              aria-label={String(t("a11y.close"))}
            >
              ×
            </button>
            <div className={`rs-dialog__stage rs-dialog__stage--${active.accent}`}>
              <Image
                src={active.imageSrc}
                alt={active.imageAlt}
                fill
                sizes="420px"
                className="rs-dialog__img"
              />
              <div className="rs-dialog__hold">
                <p>{String(t(active.kind === "video" ? "stories.media.video" : "stories.media.photo"))}</p>
              </div>
            </div>
            <h3 id="rs-dialog-title" className="rs-dialog__name">
              {active.name}
            </h3>
            <p className="rs-dialog__summary">{active.summary}</p>
            <p className={`rs-dialog__category rs-dialog__category--${active.accent}`}>
              {String(t(active.categoryKey))}
            </p>
          </div>
        ) : null}
      </dialog>
    </div>
  );
}
