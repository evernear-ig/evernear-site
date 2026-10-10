"use client";

import { StoryMedia } from "@/components/ecosystem/StoryMedia";
import { T } from "@/components/trinexus/ui/T";
import type { ConnectionStory } from "@/lib/ecosystem/types";
import { SLUG_TO_PREFIX } from "@/lib/ecosystem/vertical-catalog";

type ConnectionStoryCardProps = {
  story: ConnectionStory;
  active?: boolean;
  onSelect?: () => void;
};

export function ConnectionStoryCard({
  story,
  active = false,
  onSelect,
}: ConnectionStoryCardProps) {
  const verticalKey = `nav.${SLUG_TO_PREFIX[story.verticalSlug]}`;
  const primary = story.participants[0];
  const isVideo = story.mediaType === "video" && Boolean(story.videoSrc);

  return (
    <button
      type="button"
      className={`story-reel${active ? " is-active" : ""}`}
      onClick={onSelect}
      aria-pressed={active}
      aria-labelledby={`story-${story.id}-label`}
    >
      <div className="story-reel__media-wrap">
        <StoryMedia
          posterSrc={story.posterSrc}
          videoSrc={isVideo ? story.videoSrc : undefined}
          alt={story.mediaAlt}
          aspect="reel"
          playWhenVisible
        />
        <div className="story-reel__overlay" aria-hidden="true" />
        {isVideo ? (
          <span className="story-reel__badge">
            <T k="stories.reel.video" />
          </span>
        ) : (
          <span className="story-reel__badge story-reel__badge--photo">
            <T k="stories.reel.photo" />
          </span>
        )}
      </div>
      <div className="story-reel__caption">
        <p id={`story-${story.id}-label`} className="story-reel__name">
          {primary?.name ?? story.title}
        </p>
        <p className="story-reel__hook">{story.achievement}</p>
        <span className="story-reel__tag">
          <T k={verticalKey} />
        </span>
      </div>
    </button>
  );
}
