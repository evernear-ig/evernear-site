import { JoinButton } from "@/components/trinexus/ui/JoinButton";
import { THtml, T } from "@/components/trinexus/ui/T";
import type { AudienceItem } from "@/lib/ecosystem/vertical-catalog";
import type { JoinTrack } from "@/lib/join-tracks";

type VerticalAudienceCarouselProps = {
  prefix: string;
  items: readonly AudienceItem[];
  quoteKey: string;
  ctaKey: string;
  joinTrack?: JoinTrack;
};

export function VerticalAudienceCarousel({
  prefix,
  items,
  quoteKey,
  ctaKey,
  joinTrack,
}: VerticalAudienceCarouselProps) {
  const joinButton = joinTrack ? (
    <JoinButton className="btn btn-green" labelKey={ctaKey} prefill={{ track: joinTrack }} />
  ) : (
    <JoinButton className="btn btn-green" labelKey={ctaKey} />
  );

  return (
    <div className="sport-audience-static" id={`${prefix}-audience`}>
      {items.map((item, stepIndex) => (
        <article
          key={item.title}
          id={`${prefix}-audience-panel-${stepIndex}`}
          className="sport-audience-panel"
        >
          <h4>
            <T k={item.title} />
          </h4>
          <p>
            <T k={item.sub} />
          </p>
        </article>
      ))}
      <article
        id={`${prefix}-audience-panel-quote`}
        className="sport-audience-panel sport-audience-panel--quote"
      >
        <p className="quote">
          <THtml k={quoteKey} />
        </p>
        {joinButton}
      </article>
    </div>
  );
}
