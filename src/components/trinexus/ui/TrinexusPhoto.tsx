"use client";

import { useI18n } from "@/components/trinexus/providers/I18nProvider";
import { ARTWORK } from "@/lib/artwork";
import { IMAGES, getImageSpec, imageAlt } from "@/lib/images";
import { useState } from "react";

type TrinexusPhotoProps = {
  imageKey: string;
  className?: string;
  priority?: boolean;
  show?: boolean;
  cityImg?: string;
  /** Render only image/art layers (for stacked city photos inside one .ph). */
  asLayer?: boolean;
};

export function TrinexusPhoto({
  imageKey,
  className = "",
  priority = false,
  show = false,
  cityImg,
  asLayer = false,
}: TrinexusPhotoProps) {
  const { lang } = useI18n();
  const spec = getImageSpec(imageKey);
  const [failed, setFailed] = useState(false);
  const artwork = ARTWORK[imageKey];

  if (!spec && !artwork) return null;

  const alt = spec ? imageAlt(spec, lang) : "";
  const src = spec
    ? spec.file && IMAGES.localBase
      ? `${IMAGES.localBase}${spec.file}`
      : IMAGES.base(spec.u, 1000)
    : undefined;
  const srcSet = spec
    ? IMAGES.widths.map((w) => `${IMAGES.base(spec.u, w)} ${w}w`).join(", ")
    : undefined;

  const showPhoto = IMAGES.mode !== "artwork" && spec && !failed;

  const layers = (
    <>
      {artwork ? (
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
          style={spec.pos ? { objectPosition: spec.pos } : undefined}
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
