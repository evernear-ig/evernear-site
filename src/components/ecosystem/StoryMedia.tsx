"use client";

import { useEffect, useState } from "react";

type StoryMediaProps = {
  posterSrc: string;
  alt: string;
  videoSrc?: string;
  className?: string;
  priority?: boolean;
  aspect?: "landscape" | "portrait" | "square";
};

export function StoryMedia({
  posterSrc,
  alt,
  videoSrc,
  className = "",
  priority = false,
  aspect = "landscape",
}: StoryMediaProps) {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const showVideo = Boolean(videoSrc) && !reduceMotion;
  const aspectClass =
    aspect === "portrait"
      ? "story-media--portrait"
      : aspect === "square"
        ? "story-media--square"
        : "story-media--landscape";

  return (
    <div
      className={`story-media ${aspectClass}${className ? ` ${className}` : ""}`}
    >
      {showVideo ? (
        <video
          src={videoSrc}
          poster={posterSrc}
          muted
          playsInline
          loop
          autoPlay
          preload={priority ? "auto" : "metadata"}
          aria-label={alt}
          className={videoReady ? "story-media__video is-ready" : "story-media__video"}
          onCanPlay={() => setVideoReady(true)}
        />
      ) : null}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={posterSrc}
        alt={alt}
        width={aspect === "portrait" ? 480 : 960}
        height={aspect === "portrait" ? 640 : 540}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "low"}
        decoding="async"
        className={
          showVideo && videoReady
            ? "story-media__poster is-hidden"
            : "story-media__poster"
        }
      />
    </div>
  );
}
