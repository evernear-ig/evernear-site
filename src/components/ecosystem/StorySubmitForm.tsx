"use client";

import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import { useI18n } from "@/components/trinexus/providers/I18nProvider";
import { T } from "@/components/trinexus/ui/T";
import { ECOSYSTEM_VERTICALS } from "@/lib/ecosystem/verticals";
import { CITY_FILTER_OPTIONS } from "@/lib/ecosystem/vertical-catalog";
import { toast } from "sonner";

type MediaMode = "video" | "photo";

const MAX_MEDIA_BYTES = 20 * 1024 * 1024;

type StorySubmitFormProps = {
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  hideTrigger?: boolean;
};

export function StorySubmitForm({
  defaultOpen = false,
  onOpenChange,
  hideTrigger = false,
}: StorySubmitFormProps) {
  const { t } = useI18n();
  const [open, setOpenState] = useState(defaultOpen);
  const setOpen = (next: boolean) => {
    setOpenState(next);
    onOpenChange?.(next);
  };
  const [mediaMode, setMediaMode] = useState<MediaMode>("video");
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const modalBoxRef = useRef<HTMLDivElement>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setOpenState(defaultOpen);
  }, [defaultOpen]);

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  useEffect(() => {
    if (open) {
      lastFocus.current = document.activeElement as HTMLElement | null;
      document.body.style.overflow = "hidden";
      document.body.classList.add("join-modal-open");
      window.dispatchEvent(new Event("conexa:scroll-lock"));
      window.setTimeout(() => {
        modalBoxRef.current
          ?.querySelector<HTMLElement>("input,textarea,select,button")
          ?.focus();
      }, 50);
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
    const onKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape" && open) setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open]);

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

  const onModalKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab" || !modalRef.current) return;
    const focusable = Array.from(
      modalRef.current.querySelectorAll<HTMLElement>(
        "button,input,select,textarea,a[href]"
      )
    ).filter((el) => !el.hidden && el.offsetParent !== null);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  function onMediaModeChange(mode: MediaMode) {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setMediaMode(mode);
    setPreviewUrl(null);
    if (fileRef.current) fileRef.current.value = "";
  }

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) {
      setPreviewUrl(null);
      return;
    }
    if (file.size > MAX_MEDIA_BYTES) {
      toast.error(String(t("stories.form.media.tooLarge")));
      e.target.value = "";
      setPreviewUrl(null);
      return;
    }
    const isVideo = file.type.startsWith("video/");
    const isImage = file.type.startsWith("image/");
    if (mediaMode === "video" && !isVideo) {
      toast.error(String(t("stories.form.media.videoOnly")));
      e.target.value = "";
      return;
    }
    if (mediaMode === "photo" && !isImage) {
      toast.error(String(t("stories.form.media.photoOnly")));
      e.target.value = "";
      return;
    }
    setPreviewUrl(URL.createObjectURL(file));
  }

  async function submitStory(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    const form = e.currentTarget;
    const fd = new FormData(form);
    fd.set("mediaType", mediaMode);

    try {
      const res = await fetch("/api/historias/submit", {
        method: "POST",
        body: fd,
      });
      const data = await res.json();
      if (data.ok) {
        toast.success(String(t("stories.form.ok")));
        form.reset();
        setPreviewUrl(null);
        onMediaModeChange("video");
        setOpen(false);
      } else {
        toast.error(String(t("stories.form.error")));
      }
    } catch {
      toast.error(String(t("stories.form.error")));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      {hideTrigger ? null : (
        <section className="historias-form panfleto-section historias-form--cta">
          <button
            type="button"
            className="btn btn-green"
            onClick={() => setOpen(true)}
          >
            <T k="stories.form.h" />
          </button>
        </section>
      )}

      <div
        ref={modalRef}
        className={`modal${open ? " open" : ""}`}
        id="storyModal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="storyModalTitle"
        onKeyDown={onModalKeyDown}
      >
        <div
          className="modal-bg"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
        <div className="modal-box modal-box--story" ref={modalBoxRef}>
          <button
            type="button"
            className="modal-close"
            aria-label={String(t("a11y.close"))}
            onClick={() => setOpen(false)}
          >
            ×
          </button>
          <h2 id="storyModalTitle">
            <T k="stories.form.h" />
          </h2>
          <p className="sub">
            <T k="stories.form.lead" />
          </p>

          <div
            className="historias-form historias-form--modal"
            id="conta-tu-historia"
          >
            <div
              className="historias-form__media-toggle"
              role="radiogroup"
              aria-label="Tipo de archivo"
            >
              <button
                type="button"
                role="radio"
                aria-checked={mediaMode === "video"}
                className={`historias-form__mode${mediaMode === "video" ? " is-active" : ""}`}
                onClick={() => onMediaModeChange("video")}
              >
                <T k="stories.form.media.video" />
              </button>
              <button
                type="button"
                role="radio"
                aria-checked={mediaMode === "photo"}
                className={`historias-form__mode${mediaMode === "photo" ? " is-active" : ""}`}
                onClick={() => onMediaModeChange("photo")}
              >
                <T k="stories.form.media.photo" />
              </button>
            </div>

            <form className="eco-form historias-form__grid" onSubmit={submitStory}>
              <label className="historias-form__full historias-form__upload">
                <T
                  k={
                    mediaMode === "video"
                      ? "stories.form.media.uploadVideo"
                      : "stories.form.media.uploadPhoto"
                  }
                />
                <input
                  ref={fileRef}
                  name="media"
                  type="file"
                  accept={mediaMode === "video" ? "video/*" : "image/*"}
                />
                <span className="historias-form__upload-hint">
                  <T k="stories.form.media.optional" />
                </span>
              </label>

              {previewUrl ? (
                <div className="historias-form__preview historias-form__full">
                  {mediaMode === "video" ? (
                    <video
                      src={previewUrl}
                      muted
                      playsInline
                      controls
                      className="historias-form__preview-media"
                    />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={previewUrl}
                      alt=""
                      className="historias-form__preview-media"
                    />
                  )}
                </div>
              ) : null}

              <label>
                <T k="stories.form.name" />
                <input name="name" autoComplete="name" required />
              </label>
              <label>
                <T k="panfleto.email" />
                <input
                  name="email"
                  type="email"
                  autoComplete="email"
                  spellCheck={false}
                  required
                  placeholder="tu@email.com…"
                />
              </label>
              <label className="historias-form__full">
                <T k="stories.form.connection" />
                <textarea
                  name="story"
                  rows={3}
                  required
                  placeholder={String(t("stories.form.connection.placeholder"))}
                />
              </label>
              <label>
                <T k="stories.form.connected" />
                <input
                  name="connectedWith"
                  required
                  placeholder={String(t("stories.form.connected.placeholder"))}
                />
              </label>
              <label>
                <T k="stories.form.achievement" />
                <input name="achievement" required />
              </label>
              <label>
                <T k="pulso.filters.vertical" />
                <select name="verticalSlug" defaultValue="descubrimiento">
                  {ECOSYSTEM_VERTICALS.map((v) => (
                    <option key={v.slug} value={v.slug}>
                      {String(t(v.navKey))}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <T k="filter.city" />
                <select name="cityId" defaultValue="pi">
                  {CITY_FILTER_OPTIONS.filter((c) => c.value !== "all").map(
                    (c) => (
                      <option key={c.value} value={c.value}>
                        {String(t(c.labelKey))}
                      </option>
                    )
                  )}
                </select>
              </label>
              <div className="historias-form__full">
                <button
                  type="submit"
                  className="btn btn-green"
                  disabled={submitting}
                >
                  <T k={submitting ? "stories.form.sending" : "stories.form.submit"} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
