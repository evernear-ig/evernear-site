"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import type { PulsoEdition, PulsoRundownSegment } from "@/lib/ecosystem/types";

type PulsoStreamPlayerProps = {
  edition: PulsoEdition;
  activeSegment?: PulsoRundownSegment | null;
  onSelectSegment?: (segment: PulsoRundownSegment) => void;
};

type Reaction = {
  id: number;
  emoji: string;
  x: number;
};

export function PulsoStreamPlayer({
  edition,
  activeSegment,
  onSelectSegment,
}: PulsoStreamPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [reactions, setReactions] = useState<Reaction[]>([]);
  const [reactionCounts, setReactionCounts] = useState({
    fire: 142,
    heart: 289,
    clap: 88,
    rocket: 64,
  });

  const isLive = edition.streamStatus === "live";
  const currentSegment = activeSegment ?? edition.rundown?.[0];

  const handleAddReaction = (emoji: string, key: keyof typeof reactionCounts) => {
    setReactionCounts((prev) => ({ ...prev, [key]: prev[key] + 1 }));
    const newReaction: Reaction = {
      id: Date.now() + Math.random(),
      emoji,
      x: 20 + Math.random() * 60, // porcentaje horizontal
    };
    setReactions((prev) => [...prev.slice(-15), newReaction]);
  };

  useEffect(() => {
    if (reactions.length === 0) return;
    const timer = setTimeout(() => {
      setReactions((prev) => prev.filter((r) => Date.now() - r.id < 2500));
    }, 2500);
    return () => clearTimeout(timer);
  }, [reactions]);

  return (
    <section id="pulso-stream" className="pulso-stream-stage" aria-label="Transmisión en vivo">
      <div className="wrap">
        <div className="pulso-stream-frame">
          {/* Top stream header bar */}
          <div className="pulso-stream-frame__topbar">
            <div className="pulso-stream-frame__status">
              {isLive ? (
                <span className="pulso-live-indicator">
                  <span className="pulso-live-indicator__dot" />
                  <span>TRANSMISIÓN EN DIRECTO</span>
                </span>
              ) : (
                <span className="pulso-vod-indicator">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  <span>PROGRAMA COMPLETO · REPETICIÓN</span>
                </span>
              )}

              <span className="pulso-stream-viewers">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
                <span>{edition.viewersPeak ?? 312} viendo ahora</span>
              </span>
            </div>

            <div className="pulso-stream-frame__channel">
              <span className="pulso-stream-tag">CONEXA TV</span>
              <span className="pulso-stream-hd">1080p 60FPS</span>
            </div>
          </div>

          {/* Central Video / Broadcast screen */}
          <div className="pulso-stream-screen">
            {/* Poster / Backdrop */}
            <div className="pulso-stream-screen__bg">
              <Image
                src={edition.streamThumbnail ?? "/images/ecosystem/ecosystem-hero-index.webp"}
                alt={edition.headline}
                fill
                priority
                className={`pulso-stream-screen__img ${isPlaying ? "is-playing" : ""}`}
              />
              <div className="pulso-stream-screen__overlay" />
            </div>

            {/* Floating Live Reactions Layer */}
            <div className="pulso-stream-reactions-layer" aria-hidden="true">
              {reactions.map((r) => (
                <span
                  key={r.id}
                  className="pulso-floating-reaction"
                  style={{ left: `${r.x}%` }}
                >
                  {r.emoji}
                </span>
              ))}
            </div>

            {/* Play Button Center Trigger */}
            <button
              type="button"
              className={`pulso-stream-center-play ${isPlaying ? "is-hidden" : ""}`}
              onClick={() => setIsPlaying(!isPlaying)}
              aria-label={isPlaying ? "Pausar transmisión" : "Reproducir transmisión"}
            >
              <div className="pulso-stream-center-play__glow" />
              <div className="pulso-stream-center-play__icon">
                <svg width="34" height="34" viewBox="0 0 24 24" fill="currentColor">
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
              </div>
              <span className="pulso-stream-center-play__text">
                {isLive ? "Conectar al streaming" : "Reproducir programa"}
              </span>
            </button>

            {/* On-screen lower third ("Zócalo de TV") */}
            <div className="pulso-stream-lower-third">
              <div className="pulso-stream-lower-third__badge">
                <span className="pulso-dot pulso-dot--all" />
                <span>PULSO LIVE · EDICIÓN #{edition.editionNumber ?? 40}</span>
              </div>

              <div
                className="pulso-stream-lower-third__content"
                style={{ pointerEvents: "auto", cursor: "pointer" }}
                onClick={() => currentSegment && onSelectSegment?.(currentSegment)}
                title="Hacé clic para ver este bloque"
              >
                <div className="pulso-stream-lower-third__avatar">
                  <Image
                    src="/images/mascot/conexa-point.webp"
                    alt="Host Conexa"
                    width={44}
                    height={44}
                    className="pulso-host-avatar"
                  />
                </div>
                <div className="pulso-stream-lower-third__text">
                  <span className="pulso-stream-topic-time">
                    {currentSegment ? `EN PANTALLA [${currentSegment.timestamp}]` : "EN DIRECTO"}
                  </span>
                  <h3 className="pulso-stream-topic-title">
                    {currentSegment?.title ?? edition.headline}
                  </h3>
                </div>
              </div>
            </div>

            {/* Equalizer Waveform overlay bottom */}
            <div className="pulso-stream-audio-wave" aria-hidden="true">
              <div className="pulso-stream-wave-track">
                {Array.from({ length: 32 }).map((_, i) => (
                  <span
                    key={i}
                    className={`pulso-stream-wave-bar ${isPlaying ? "is-active" : ""}`}
                    style={{ animationDelay: `${(i % 8) * 0.12}s` }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Stream Controls & Reactions Toolbar */}
          <div className="pulso-stream-controls-bar">
            <div className="pulso-stream-ctrl-left">
              <button
                type="button"
                className="pulso-stream-btn"
                onClick={() => setIsPlaying(!isPlaying)}
                aria-label={isPlaying ? "Pausar" : "Reproducir"}
              >
                {isPlaying ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                )}
              </button>

              <button
                type="button"
                className="pulso-stream-btn"
                onClick={() => setIsMuted(!isMuted)}
                aria-label={isMuted ? "Activar sonido" : "Silenciar"}
              >
                {isMuted ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="1" y1="1" x2="23" y2="23" />
                    <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6" />
                    <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                  </svg>
                )}
              </button>

              <span className="pulso-stream-duration">
                <span className="pulso-stream-duration__curr">{isPlaying ? "12:45" : "00:00"}</span>
                <span className="pulso-stream-duration__sep">/</span>
                <span className="pulso-stream-duration__total">{edition.streamDuration ?? "36:45"}</span>
              </span>
            </div>

            {/* Reaction buttons like in Instagram Live / Twitch */}
            <div className="pulso-stream-reactions-bar">
              <span className="pulso-stream-reactions-hint">Reaccioná en vivo:</span>
              <button
                type="button"
                className="pulso-reaction-btn"
                onClick={() => handleAddReaction("🔥", "fire")}
              >
                <span>🔥</span>
                <span className="pulso-reaction-count">{reactionCounts.fire}</span>
              </button>
              <button
                type="button"
                className="pulso-reaction-btn"
                onClick={() => handleAddReaction("❤️", "heart")}
              >
                <span>❤️</span>
                <span className="pulso-reaction-count">{reactionCounts.heart}</span>
              </button>
              <button
                type="button"
                className="pulso-reaction-btn"
                onClick={() => handleAddReaction("👏", "clap")}
              >
                <span>👏</span>
                <span className="pulso-reaction-count">{reactionCounts.clap}</span>
              </button>
              <button
                type="button"
                className="pulso-reaction-btn"
                onClick={() => handleAddReaction("🚀", "rocket")}
              >
                <span>🚀</span>
                <span className="pulso-reaction-count">{reactionCounts.rocket}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
