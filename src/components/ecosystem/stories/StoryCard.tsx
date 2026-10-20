"use client";

import Image from "next/image";
import { useI18n } from "@/components/evernear/providers/I18nProvider";
import type { RealStory } from "@/components/ecosystem/stories/real-stories";

type StoryCardProps = {
  story: RealStory;
  onSelect: (story: RealStory) => void;
};

export function StoryCard({ story, onSelect }: StoryCardProps) {
  const { t } = useI18n();
  const category = String(t(story.categoryKey));
  const kindLabel = String(t(story.kind === "video" ? "stories.reel.video" : "stories.reel.photo"));

  return (
    <button
      type="button"
      className={`rs-card rs-card--${story.accent}`}
      onClick={() => onSelect(story)}
      aria-haspopup="dialog"
      aria-label={`${String(t("stories.reel.open"))} ${story.name}`}
    >
      <span className="rs-card__frame">
        <Image
          src={story.imageSrc}
          alt={story.imageAlt}
          fill
          sizes="(max-width: 1099px) 70vw, 18vw"
          className="rs-card__img"
        />
        <span className={`rs-card__badge rs-card__badge--${story.kind}`}>{kindLabel}</span>
      </span>
      <span className="rs-card__name">{story.name}</span>
      <span className="rs-card__summary">{story.summary}</span>
      <span className="rs-card__category">{category}</span>
    </button>
  );
}
