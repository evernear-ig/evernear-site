"use client";

import { useEffect, useRef, useState } from "react";

type StoryMediaProps = {
  posterSrc: string;
  alt: string;
  videoSrc?: string;
  className?: string;
  priority?: boolean;
  aspect?: "landscape" | "portrait" | "square" | "reel";
  playWhenVisible?: boolean;
};

export function StoryMedia({
  posterSrc,
  alt,
  videoSrc,
  className = "",
  priority = false,
  aspect = "landscape",
  playWhenVisible = false,
}: StoryMediaProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!playWhenVisible || !rootRef.current) return;
    const el = rootRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.55 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [playWhenVisible]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !videoSrc || reduceMotion) return;
    if (playWhenVisible) {
      if (inView) video.play().catch(() => {});
      else video.pause();
    }
  }, [inView, playWhenVisible, reduceMotion, videoSrc]);

  const showVideo = Boolean(videoSrc) && !reduceMotion;
  const aspectClass =
    aspect === "reel"
      ? "story-media--reel"
      : aspect === "portrait"
        ? "story-media--portrait"
        : aspect === "square"
          ? "story-media--square"
          : "story-media--landscape";

  const autoPlay = showVideo && (!playWhenVisible || inView);

  return (
    <div
      ref={rootRef}
      className={`story-media ${aspectClass}${className ? ` ${className}` : ""}`}
    >
      {showVideo ? (
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          muted
          playsInline
          loop
          autoPlay={autoPlay}
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
        width={aspect === "reel" ? 180 : aspect === "portrait" ? 480 : 960}
        height={aspect === "reel" ? 320 : aspect === "portrait" ? 640 : 540}
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
