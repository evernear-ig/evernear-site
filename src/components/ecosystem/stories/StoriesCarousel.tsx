"use client";

import { useI18n } from "@/components/trinexus/providers/I18nProvider";
import { StoryCard } from "@/components/ecosystem/stories/StoryCard";
import type { RealStory } from "@/components/ecosystem/stories/real-stories";

type StoriesCarouselProps = {
  stories: RealStory[];
  onSelect: (story: RealStory) => void;
};

export function StoriesCarousel({ stories, onSelect }: StoriesCarouselProps) {
  const { t } = useI18n();

  if (stories.length === 0) {
    return <p className="rs-carousel__empty">{String(t("stories.reel.empty"))}</p>;
  }

  return (
    <div
      className="rs-carousel"
      role="list"
      aria-label={String(t("stories.reel.list"))}
    >
      {stories.map((story) => (
        <div key={story.id} className="rs-carousel__item" role="listitem">
          <StoryCard story={story} onSelect={onSelect} />
        </div>
      ))}
    </div>
  );
}
