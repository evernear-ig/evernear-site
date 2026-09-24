import Link from "next/link";
import { CityBadge } from "@/components/ecosystem/CityBadge";
import { StoryMedia } from "@/components/ecosystem/StoryMedia";
import { Reveal } from "@/components/trinexus/ui/Reveal";
import { T } from "@/components/trinexus/ui/T";
import type { ConnectionStory } from "@/lib/ecosystem/types";
import { SLUG_TO_PREFIX } from "@/lib/ecosystem/vertical-catalog";

type ConnectionStoryCardProps = {
  story: ConnectionStory;
  variant?: "featured" | "default" | "wide";
};

export function ConnectionStoryCard({
  story,
  variant = "default",
}: ConnectionStoryCardProps) {
  const verticalKey = `nav.${SLUG_TO_PREFIX[story.verticalSlug]}`;
  const aspect =
    variant === "featured" ? "portrait" : variant === "wide" ? "landscape" : "square";

  return (
    <Reveal>
      <article
        className={`story-card story-card--${variant}`}
        aria-labelledby={`story-${story.id}-title`}
      >
        <StoryMedia
          posterSrc={story.posterSrc}
          videoSrc={story.videoSrc}
          alt={story.mediaAlt}
          aspect={aspect}
          priority={variant === "featured"}
        />
        <div className="story-card__body">
          <div className="story-card__meta">
            <CityBadge cityId={story.cityId} />
            <span className="story-card__vertical">
              <T k={verticalKey} />
            </span>
          </div>
          <h2 id={`story-${story.id}-title`} className="story-card__title">
            {story.title}
          </h2>
          <p className="story-card__achievement">{story.achievement}</p>
          <p className="story-card__connected">
            <T k="stories.card.connected" />: {story.connectedWith.join(", ")}
          </p>
          <ul className="story-card__people" aria-label="Participantes">
            {story.participants.map((p) => (
              <li key={p.name}>
                <strong>{p.name}</strong>
                <span>{p.role}</span>
              </li>
            ))}
          </ul>
          {story.profileId ? (
            <Link
              href={`/descubrimiento/personas/${story.profileId}`}
              className="story-card__link"
            >
              <T k="stories.card.profile" />
            </Link>
          ) : null}
        </div>
      </article>
    </Reveal>
  );
}
