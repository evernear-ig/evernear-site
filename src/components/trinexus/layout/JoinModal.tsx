"use client";

import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { useI18n } from "@/components/trinexus/providers/I18nProvider";
import { useJoinModal } from "@/components/trinexus/providers/JoinModalProvider";
import { T, THtml } from "@/components/trinexus/ui/T";

const INTERESTS = [
  { value: "blockchain", label: "Blockchain" },
  { value: "ai", key: "i.ai" },
  { value: "programming", key: "t.prog" },
  { value: "technology", key: "i.tech" },
  { value: "startups", label: "Startups" },
  { value: "entrepreneurship", key: "t.ent" },
  { value: "education", key: "i.edu" },
  { value: "innovation", key: "i.inn" },
] as const;

export function JoinModal() {
  const { t, lang } = useI18n();
  const { open, closeJoin } = useJoinModal();
  const [success, setSuccess] = useState(false);
  const [errorKey, setErrorKey] = useState<string | null>(null);
  const lastFocus = useRef<HTMLElement | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) {
      lastFocus.current = document.activeElement as HTMLElement | null;
      document.body.style.overflow = "hidden";
      setSuccess(false);
      setErrorKey(null);
      window.setTimeout(() => {
        document.getElementById("fname")?.focus();
      }, 50);
    } else {
      document.body.style.overflow = "";
      lastFocus.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    const onKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape" && open) closeJoin();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, closeJoin]);

  const onModalKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab" || !modalRef.current) return;
    const focusable = Array.from(
      modalRef.current.querySelectorAll<HTMLElement>(
        'button,input,select,textarea,a[href]'
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

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorKey(null);
    const form = e.currentTarget;
    const missing = Array.from(form.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>("[required]")).filter(
      (field) => !field.value.trim()
    );
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    if (missing.length || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setErrorKey(missing.length ? "err.required" : "err.email");
      (missing[0] ?? form.elements.namedItem("email"))?.focus();
      return;
    }

    const payload: Record<string, unknown> = Object.fromEntries(new FormData(form).entries());
    payload.interests = Array.from(
      form.querySelectorAll<HTMLInputElement>('input[name="interests"]:checked')
    ).map((input) => input.value);
    payload.lang = lang;

    console.log("TRINEXUS join (prototype, not stored)", payload);
    setSuccess(true);
    window.setTimeout(() => {
      modalRef.current
        ?.querySelector<HTMLButtonElement>("#successView button")
        ?.focus();
    }, 0);
  };

  return (
    <div
      ref={modalRef}
      className={`modal${open ? " open" : ""}`}
      id="joinModal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="joinTitle"
      onKeyDown={onModalKeyDown}
    >
      <div className="modal-bg" onClick={closeJoin} aria-hidden="true" />
      <div className="modal-box">
        <button
          type="button"
          className="modal-close"
          aria-label={String(t("a11y.close"))}
          onClick={closeJoin}
        >
          ×
        </button>
        <div id="formView" hidden={success}>
          <h2 id="joinTitle">
            <T k="form.h" />
          </h2>
          <p className="sub">
            <T k="form.sub" />
          </p>
          <form id="joinForm" ref={formRef} noValidate onSubmit={onSubmit}>
            <div className="form-grid">
              <div className="field">
                <label htmlFor="fname">
                  <T k="form.name" />
                </label>
                <input id="fname" name="name" type="text" required autoComplete="name" />
              </div>
              <div className="field">
                <label htmlFor="femail">
                  <T k="form.email" />
                </label>
                <input id="femail" name="email" type="email" required autoComplete="email" />
              </div>
              <div className="field">
                <label htmlFor="fcountry">
                  <T k="form.country" />
                </label>
                <select id="fcountry" name="country" required defaultValue="">
                  <option value="">{String(t("form.select"))}</option>
                  <option value="AR">Argentina</option>
                  <option value="BR">{String(t("c.br"))}</option>
                  <option value="PY">Paraguay</option>
                  <option value="other">{String(t("form.other"))}</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="fcity">
                  <T k="form.city" />
                </label>
                <input id="fcity" name="city" type="text" required autoComplete="address-level2" />
              </div>
              <div className="field full">
                <label htmlFor="frole">
                  <T k="form.role" />
                </label>
                <select id="frole" name="role" required defaultValue="">
                  <option value="">{String(t("form.select"))}</option>
                  <option value="student">{String(t("r.student"))}</option>
                  <option value="developer">{String(t("r.dev"))}</option>
                  <option value="entrepreneur">{String(t("r.ent"))}</option>
                  <option value="business">{String(t("r.biz"))}</option>
                  <option value="company">{String(t("r.company"))}</option>
                  <option value="university">{String(t("r.uni"))}</option>
                  <option value="organization">{String(t("r.org"))}</option>
                  <option value="community">{String(t("r.com"))}</option>
                  <option value="other">{String(t("form.other"))}</option>
                </select>
              </div>
              <div className="field full">
                <label>
                  <THtml k="form.interests" />
                </label>
                <div className="check-grid">
                  {INTERESTS.map((item) => (
                    <label key={item.value}>
                      <input type="checkbox" name="interests" value={item.value} />
                      {"key" in item && item.key ? <T k={item.key} /> : item.label}
                    </label>
                  ))}
                </div>
              </div>
              <div className="field">
                <label htmlFor="flinkedin">
                  <THtml k="form.linkedin" />
                </label>
                <input id="flinkedin" name="linkedin" type="url" placeholder="https://" />
              </div>
              <div className="field">
                <label htmlFor="fsite">
                  <THtml k="form.site" />
                </label>
                <input id="fsite" name="website" type="url" placeholder="https://" />
              </div>
              <div className="field full">
                <label htmlFor="fq">
                  <T k="form.q" />
                </label>
                <textarea id="fq" name="question" />
              </div>
            </div>
            <button className="btn btn-ink" type="submit">
              <T k="cta.join" />
            </button>
            <p className="form-note" id="formError" role="alert" hidden={!errorKey}>
              {errorKey ? String(t(errorKey)) : ""}
            </p>
          </form>
        </div>
        <div id="successView" className="success" hidden={!success}>
          <svg viewBox="0 0 100 100" aria-hidden="true">
            <path d="M50 10 L90 80 L10 80 Z" fill="none" stroke="#4B2FA6" strokeWidth="1.5" />
            <circle cx="50" cy="10" r="4" fill="#4B2FA6" />
            <circle cx="90" cy="80" r="4" fill="#4B2FA6" />
            <circle cx="10" cy="80" r="4" fill="#4B2FA6" />
            <circle cx="50" cy="57" r="6" fill="#2EE59D" />
          </svg>
          <h2>
            <T k="form.ok.h" />
          </h2>
          <p>
            <T k="form.ok.p" />
          </p>
          <button type="button" className="btn btn-ink" onClick={closeJoin}>
            <T k="form.ok.back" />
          </button>
        </div>
      </div>
    </div>
  );
}
