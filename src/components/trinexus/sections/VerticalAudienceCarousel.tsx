import { JoinButton } from "@/components/trinexus/ui/JoinButton";
import { ConexaMascotImage } from "@/components/trinexus/mascot/ConexaMascotImage";
import { TrinexusPhoto } from "@/components/trinexus/ui/TrinexusPhoto";
import { THtml, T } from "@/components/trinexus/ui/T";
import type { AudienceItem } from "@/lib/ecosystem/vertical-catalog";
import type { JoinTrack } from "@/lib/join-tracks";

type VerticalAudienceCarouselProps = {
  prefix: string;
  items: readonly AudienceItem[];
  imageKeys: readonly string[];
  quoteKey: string;
  ctaKey: string;
  exploreKey: string;
  joinTrack?: JoinTrack;
};

const ICONS = [
  <svg key="run" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="14" cy="5" r="1.6" />
    <path d="M6 20l3.2-4.2 2.2 1.2 2.4-3.2 3.4 1.4M8.2 14.2 5 11.4M13.2 9.6 16 12" />
  </svg>,
  <svg key="club" viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="8" cy="9" r="2" />
    <circle cx="16" cy="9" r="2" />
    <path d="M4.5 18c.6-2.2 2.2-3.4 3.8-3.4h.4c1.6 0 3.2 1.2 3.8 3.4M11.5 18c.6-2.2 2.2-3.4 3.8-3.4h.4c1.6 0 3.2 1.2 3.8 3.4" />
  </svg>,
  <svg key="call" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M5 10v6a2 2 0 0 0 2 2h1l2-4V8L8 6H7a2 2 0 0 0-2 2v2zM14 9.5h6M14 13h4" />
  </svg>,
  <svg key="heart" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 18s-6-3.6-6-7.2A3.3 3.3 0 0 1 12 8a3.3 3.3 0 0 1 6 2.8C18 14.4 12 18 12 18z" />
  </svg>,
];

export function VerticalAudienceCarousel({
  prefix,
  items,
  imageKeys,
  quoteKey,
  ctaKey,
  exploreKey,
  joinTrack,
}: VerticalAudienceCarouselProps) {
  const joinButton = (
    <JoinButton
      className="btn btn-green"
      labelKey={ctaKey}
      prefill={joinTrack ? { track: joinTrack } : undefined}
    />
  );

  return (
    <div className="eco-aud" id={`${prefix}-audience`}>
      {items.map((item, stepIndex) => {
        const imageKey = imageKeys[stepIndex] ?? imageKeys[0];
        return (
          <a
            key={item.title}
            id={`${prefix}-audience-panel-${stepIndex}`}
            className="eco-aud-card"
            href="#catalogo"
          >
            {imageKey ? <TrinexusPhoto imageKey={imageKey} className="eco-aud-photo" /> : null}
            <span className="eco-aud-shade" aria-hidden="true" />
            <span className="eco-aud-ico">{ICONS[stepIndex % ICONS.length]}</span>
            <span className="eco-aud-arrow" aria-hidden="true">
              <svg viewBox="0 0 24 24">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </span>
            <span className="eco-aud-copy">
              <h4>
                <T k={item.title} />
              </h4>
              <p>
                <T k={item.sub} />
              </p>
              <span className="eco-aud-more">
                <T k={exploreKey} />
              </span>
            </span>
          </a>
        );
      })}
      <article id={`${prefix}-audience-panel-quote`} className="eco-aud-quote">
        <div className="eco-aud-quote-copy">
          <p className="quote">
            <THtml k={quoteKey} />
          </p>
          {joinButton}
        </div>
        <ConexaMascotImage
          pose="point"
          assemble={1}
          compact
          alt=""
          className="eco-aud-mascot"
        />
      </article>
    </div>
  );
}
