"use client";

import { useState } from "react";
import Link from "next/link";
import { ConnectionStoryCard } from "@/components/ecosystem/ConnectionStoryCard";
import { CityBadge } from "@/components/ecosystem/CityBadge";
import { T } from "@/components/evernear/ui/T";
import type { ConnectionStory } from "@/lib/ecosystem/types";
import { SLUG_TO_PREFIX } from "@/lib/ecosystem/vertical-catalog";

type StoryReelsStripProps = {
  stories: ConnectionStory[];
};

export function StoryReelsStrip({ stories }: StoryReelsStripProps) {
  const [activeId, setActiveId] = useState(stories[0]?.id ?? "");
  const active = stories.find((s) => s.id === activeId) ?? stories[0];

  return (
    <div className="story-reels">
      <p className="story-reels__lead">
        <T k="stories.reel.lead" />
      </p>
      <div className="story-reels__track" role="list" aria-label="Historias en video">
        {stories.map((story) => (
          <div key={story.id} role="listitem" className="story-reels__item">
            <ConnectionStoryCard
              story={story}
              active={story.id === activeId}
              onSelect={() => setActiveId(story.id)}
            />
          </div>
        ))}
      </div>

      {active ? (
        <article className="story-reels__detail" aria-live="polite">
          <div className="story-reels__detail-head">
            <h2 className="story-reels__detail-title">{active.title}</h2>
            <CityBadge cityId={active.cityId} />
            <span className="story-reels__detail-vertical">
              <T k={`nav.${SLUG_TO_PREFIX[active.verticalSlug]}`} />
            </span>
          </div>
          <p className="story-reels__detail-text">{active.achievement}</p>
          <p className="story-reels__detail-connected">
            <T k="stories.card.connected" />: {active.connectedWith.join(", ")}
          </p>
          <ul className="story-reels__detail-people">
            {active.participants.map((p) => (
              <li key={p.name}>
                <strong>{p.name}</strong>
                <span>{p.role}</span>
              </li>
            ))}
          </ul>
          {active.profileId ? (
            <Link
              href={`/descubrimiento/personas/${active.profileId}`}
              className="story-reels__detail-link"
            >
              <T k="stories.card.profile" />
            </Link>
          ) : null}
        </article>
      ) : null}
    </div>
  );
}
