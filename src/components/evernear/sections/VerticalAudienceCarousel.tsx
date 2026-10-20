import { JoinButton } from "@/components/evernear/ui/JoinButton";
import { EvernearPhoto } from "@/components/evernear/ui/EvernearPhoto";
import { THtml, T } from "@/components/evernear/ui/T";
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
            {imageKey ? <EvernearPhoto imageKey={imageKey} className="eco-aud-photo" /> : null}
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
        <svg className="eco-aud-map" viewBox="0 0 160 180" aria-hidden="true">
          <path
            className="eco-aud-map-land"
            d="M8 118c18-22 28-18 42-28 16-12 18-34 36-40 20-7 28 8 46 6 14-2 22-16 34-14 8 2 16 14 18 28-6 10-4 22 2 34-14 6-22 18-38 16-18-2-24 12-42 18-16 6-28-4-44-2-18 2-34 16-54 8-8-18-10-16-10-26z"
          />
          <path
            className="eco-aud-map-land eco-aud-map-land--soft"
            d="M-6 86c22-8 34 6 52-2 16-8 20-24 38-22 14 2 22 16 36 12 12-4 18-18 32-14 10 18-2 28-8 40-16 4-20 16-36 18-18 2-26-10-42-6-14 4-24 18-40 14-18-4-28 6-42 2-6-14-2-28 10-42z"
          />
          <path
            className="eco-aud-map-contour"
            d="M4 132c24-16 40-8 58-22 14-12 22-28 40-32 16-4 26 6 40 4"
          />
          <path
            className="eco-aud-map-contour"
            d="M-2 104c20-6 32 8 48 2 18-6 24-20 42-18 14 2 24 12 38 8"
          />
          <path
            className="eco-aud-map-route"
            d="M28 158c8-22 6-36 22-48 14-10 16-28 34-36 12-6 22-4 30-16"
          />
          <circle className="eco-aud-map-start" cx="28" cy="158" r="5" />
          <g className="eco-aud-map-pin" transform="translate(108 42)">
            <path d="M0 0c0-9 14-9 14 0 0 7-7 16-7 16S0 7 0 0z" />
            <circle cx="7" cy="1" r="2.4" />
          </g>
        </svg>
      </article>
    </div>
  );
}
