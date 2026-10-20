"use client";

import { useI18n } from "@/components/evernear/providers/I18nProvider";
import { ARTWORK } from "@/lib/artwork";
import { IMAGES, getImageSpec, imageAlt, resolveImageSrc } from "@/lib/images";
import { useState } from "react";

type EvernearPhotoProps = {
  imageKey: string;
  className?: string;
  priority?: boolean;
  show?: boolean;
  cityImg?: string;
  /** Render only image/art layers (for stacked city photos inside one .ph). */
  asLayer?: boolean;
};

export function EvernearPhoto({
  imageKey,
  className = "",
  priority = false,
  show = false,
  cityImg,
  asLayer = false,
}: EvernearPhotoProps) {
  const { lang } = useI18n();
  const spec = getImageSpec(imageKey);
  const [failed, setFailed] = useState(false);
  const artwork = ARTWORK[imageKey];

  if (!spec && !artwork) return null;

  const alt = spec ? imageAlt(spec, lang) : "";
  const src = spec ? resolveImageSrc(imageKey, 1000) : undefined;
  const usesLocalFile = Boolean(spec?.file);
  const srcSet =
    spec && !usesLocalFile
      ? IMAGES.widths.map((w) => `${IMAGES.base(spec.u, w)} ${w}w`).join(", ")
      : undefined;

  const showPhoto = IMAGES.mode !== "artwork" && spec && !failed && Boolean(src);
  const showArt = Boolean(artwork) && (!showPhoto || failed);

  const layers = (
    <>
      {showArt ? (
        <div
          className={`art${show ? " show" : ""}`}
          aria-hidden="true"
          data-city-art={cityImg}
          dangerouslySetInnerHTML={{ __html: artwork }}
        />
      ) : null}
      {showPhoto ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          srcSet={srcSet}
          sizes="(max-width:900px) 100vw, 45vw"
          alt={alt}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "low"}
          decoding="async"
          referrerPolicy="no-referrer"
          className={show ? "show" : undefined}
          style={
            spec.pos && !className.includes("eco-hero-photo")
              ? { objectPosition: spec.pos }
              : undefined
          }
          onError={() => setFailed(true)}
          onLoad={() => setFailed(false)}
        />
      ) : null}
    </>
  );

  if (asLayer) return layers;

  return (
    <div className={`ph${failed ? " no-img" : ""}${className ? ` ${className}` : ""}`}>
      {layers}
      <div className="veil" />
    </div>
  );
}
