"use client";

import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { useI18n } from "@/components/trinexus/providers/I18nProvider";
import type { RealStory } from "@/components/ecosystem/stories/real-stories";

type StoryViewerModalProps = {
  stories: RealStory[];
  index: number | null;
  onClose: () => void;
  onIndexChange: (index: number) => void;
};

export function StoryViewerModal({
  stories,
  index,
  onClose,
  onIndexChange,
}: StoryViewerModalProps) {
  const { t } = useI18n();
  const open = index !== null && stories.length > 0;
  const story = open && index !== null ? stories[index] : null;
  const modalRef = useRef<HTMLDivElement>(null);
  const modalBoxRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [failedVideoId, setFailedVideoId] = useState<string | null>(null);

  const step = useCallback(
    (delta: number) => {
      if (index === null || stories.length === 0) return;
      onIndexChange((index + delta + stories.length) % stories.length);
    },
    [index, onIndexChange, stories.length]
  );

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mq.matches);
    const onChange = () => setReduceMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (open) {
      const active = document.activeElement;
      if (active instanceof HTMLElement && !modalRef.current?.contains(active)) {
        lastFocus.current = active;
      }
      document.body.style.overflow = "hidden";
      document.body.classList.add("join-modal-open");
      window.dispatchEvent(new Event("conexa:scroll-lock"));
      closeRef.current?.focus();
    } else {
      document.body.style.overflow = "";
      document.body.classList.remove("join-modal-open");
      window.dispatchEvent(new Event("conexa:scroll-unlock"));
      lastFocus.current?.focus();
    }

    return () => {
      document.body.style.overflow = "";
      document.body.classList.remove("join-modal-open");
      window.dispatchEvent(new Event("conexa:scroll-unlock"));
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") {
        event.preventDefault();
        step(1);
      }
      if (event.key === "ArrowLeft") {
        event.preventDefault();
        step(-1);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose, step]);

  useEffect(() => {
    if (!open) return;
    const modal = modalRef.current;
    const box = modalBoxRef.current;
    if (!modal || !box) return;

    const onWheel = (event: WheelEvent) => {
      if (!modal.contains(event.target as Node)) return;
      event.preventDefault();
      event.stopImmediatePropagation();
      if (!box.contains(event.target as Node)) return;
      const maxScroll = box.scrollHeight - box.clientHeight;
      if (maxScroll <= 0) return;
      box.scrollTop = Math.max(0, Math.min(maxScroll, box.scrollTop + event.deltaY));
    };

    window.addEventListener("wheel", onWheel, { passive: false, capture: true });
    return () => window.removeEventListener("wheel", onWheel, { capture: true });
  }, [open]);

  const onModalKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key !== "Tab" || !modalRef.current) return;
    const focusable = Array.from(
      modalRef.current.querySelectorAll<HTMLElement>("button, video, a[href]")
    ).filter((el) => !el.hidden && el.offsetParent !== null);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const showVideo = Boolean(
    story && story.kind === "video" && story.videoSrc && failedVideoId !== story.id
  );

  return (
    <div
      ref={modalRef}
      className={`modal${open ? " open" : ""}`}
      id="storyViewerModal"
      role="dialog"
      aria-modal="true"
      aria-labelledby={story ? "storyViewerTitle" : undefined}
      onKeyDown={onModalKeyDown}
    >
      <div className="modal-bg" onClick={onClose} aria-hidden="true" />
      <div className="modal-box modal-box--viewer" ref={modalBoxRef}>
        <button
          ref={closeRef}
          type="button"
          className="modal-close"
          aria-label={String(t("a11y.close"))}
          onClick={onClose}
        >
          ×
        </button>
        {story ? (
          <>
            <div className={`rs-viewer__stage rs-viewer__stage--${story.accent}`}>
              {showVideo ? (
                <video
                  key={story.id}
                  className="rs-viewer__video"
                  src={story.videoSrc}
                  poster={story.imageSrc}
                  muted
                  loop
                  playsInline
                  autoPlay={!reduceMotion}
                  controls
                  preload="metadata"
                  aria-label={story.imageAlt}
                  onError={() => setFailedVideoId(story.id)}
                />
              ) : (
                <Image
                  src={story.imageSrc}
                  alt={story.imageAlt}
                  fill
                  sizes="420px"
                  className="rs-viewer__img"
                />
              )}
              <button
                type="button"
                className="rs-viewer__nav rs-viewer__nav--prev"
                aria-label={String(t("stories.viewer.prev"))}
                onClick={() => step(-1)}
              >
                ‹
              </button>
              <button
                type="button"
                className="rs-viewer__nav rs-viewer__nav--next"
                aria-label={String(t("stories.viewer.next"))}
                onClick={() => step(1)}
              >
                ›
              </button>
            </div>
            <p className="rs-viewer__count">
              {(index ?? 0) + 1} / {stories.length}
            </p>
            <h2 id="storyViewerTitle" className="rs-viewer__name">
              {story.name}
            </h2>
            <p className="rs-viewer__summary">{story.summary}</p>
            <p className={`rs-viewer__category rs-viewer__category--${story.accent}`}>
              {String(t(story.categoryKey))}
            </p>
          </>
        ) : null}
      </div>
    </div>
  );
}
