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
import { JOIN_CITY_OPTIONS, JOIN_TRACKS } from "@/lib/join-tracks";
import { ConexaMascotFallback } from "@/components/trinexus/ui/ConexaMascotFallback";
import { T, THtml } from "@/components/trinexus/ui/T";
import type { MascotPose } from "@/lib/mascot-poses";
import { toast } from "sonner";

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

function toggleValue(list: string[], value: string) {
  return list.includes(value) ? list.filter((item) => item !== value) : [...list, value];
}

export function JoinModal() {
  const { t, lang } = useI18n();
  const { open, prefill, closeJoin } = useJoinModal();
  const track = prefill?.track;
  const trackConfig = track ? JOIN_TRACKS[track] : null;

  const [success, setSuccess] = useState(false);
  const [errorKey, setErrorKey] = useState<string | null>(null);
  const [orgName, setOrgName] = useState("");
  const [orgType, setOrgType] = useState("");
  const [cityZone, setCityZone] = useState("");
  const [cityDetail, setCityDetail] = useState("");
  const [role, setRole] = useState("");
  const [focusAreas, setFocusAreas] = useState<string[]>([]);
  const [collaboration, setCollaboration] = useState<string[]>([]);
  const [question, setQuestion] = useState("");

  const lastFocus = useRef<HTMLElement | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    setSuccess(false);
    setErrorKey(null);
    setOrgName("");
    setOrgType("");
    setCityZone("");
    setCityDetail("");
    setFocusAreas([]);
    setRole(trackConfig?.defaultRole ?? "");
    setCollaboration(trackConfig?.defaultCollaboration ?? []);
    setQuestion(trackConfig ? String(t(trackConfig.questionKey)) : "");
    formRef.current?.reset();

    window.setTimeout(() => {
      (track
        ? document.getElementById("forg")
        : document.getElementById("fname")
      )?.focus();
    }, 50);
  }, [open, track, trackConfig, t]);

  useEffect(() => {
    if (open) {
      lastFocus.current = document.activeElement as HTMLElement | null;
      document.body.style.overflow = "hidden";
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
    const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    const country = (form.elements.namedItem("country") as HTMLSelectElement).value.trim();
    const linkedin = (form.elements.namedItem("linkedin") as HTMLInputElement).value.trim();
    const website = (form.elements.namedItem("website") as HTMLInputElement).value.trim();

    const city =
      track && cityZone && cityZone !== "other"
        ? String(t(JOIN_CITY_OPTIONS.find((item) => item.value === cityZone)?.key ?? "form.other"))
        : (cityDetail.trim() ||
            (form.elements.namedItem("city") as HTMLInputElement | null)?.value.trim()) ??
          "";

    const missingTrack =
      track &&
      (!orgName.trim() || !orgType || !cityZone || (cityZone === "other" && !cityDetail.trim()) || !collaboration.length);

    if (
      !name ||
      !email ||
      !country ||
      !city ||
      (track && !role) ||
      (!track && !role) ||
      missingTrack ||
      !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)
    ) {
      const key = !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email) ? "err.email" : "err.required";
      setErrorKey(key);
      toast.error(String(t(key)));
      if (!name) document.getElementById("fname")?.focus();
      else if (!email) document.getElementById("femail")?.focus();
      else if (track && !orgName.trim()) document.getElementById("forg")?.focus();
      else if (track && !orgType) document.getElementById("forgtype")?.focus();
      else if (!country) document.getElementById("fcountry")?.focus();
      else if (!city) document.getElementById(track ? "fcitydetail" : "fcity")?.focus();
      else if (!role) document.getElementById("frole")?.focus();
      return;
    }

    const payload: Record<string, unknown> = {
      name,
      email,
      country,
      city,
      role,
      linkedin,
      website,
      question: question.trim(),
      interests: Array.from(
        form.querySelectorAll<HTMLInputElement>('input[name="interests"]:checked')
      ).map((input) => input.value),
      lang,
    };

    if (track) {
      payload.partner_track = track;
      payload.org_name = orgName.trim();
      payload.org_type = orgType;
      payload.city_zone = cityZone;
      payload.focus_areas = focusAreas;
      payload.collaboration = collaboration;
    }

    console.log("CONEXA join (prototype, not stored)", payload);
    setSuccess(true);
    window.setTimeout(() => {
      modalRef.current
        ?.querySelector<HTMLButtonElement>("#successView button")
        ?.focus();
    }, 0);
  };

  const titleKey = trackConfig ? trackConfig.titleKey : "form.h";
  const subKey = trackConfig ? trackConfig.subKey : "form.sub";
  const modalPose: MascotPose = success ? "globe" : track ? "think" : "welcome";

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
        <ConexaMascotFallback pose={modalPose} className="modal-mascot" alt="CONEXA" />
        <button
          type="button"
          className="modal-close"
          aria-label={String(t("a11y.close"))}
          onClick={closeJoin}
        >
          ×
        </button>
        <div id="formView" hidden={success}>
          {track ? (
            <p className="form-track-badge">
              <T k="join.track.label" />
            </p>
          ) : null}
          <h2 id="joinTitle">
            <T k={titleKey} />
          </h2>
          <p className="sub">
            <T k={subKey} />
          </p>
          <form id="joinForm" ref={formRef} noValidate onSubmit={onSubmit}>
            {track ? <input type="hidden" name="partner_track" value={track} /> : null}
            <div className="form-grid">
              {track ? (
                <>
                  <div className="field full">
                    <label htmlFor="forg">
                      <T k="form.org" />
                    </label>
                    <input
                      id="forg"
                      name="org_name"
                      type="text"
                      required
                      value={orgName}
                      onChange={(e) => setOrgName(e.target.value)}
                      autoComplete="organization"
                    />
                  </div>
                  <div className="field full">
                    <label htmlFor="forgtype">
                      <T k="form.org_type" />
                    </label>
                    <select
                      id="forgtype"
                      name="org_type"
                      required
                      value={orgType}
                      onChange={(e) => setOrgType(e.target.value)}
                    >
                      <option value="">{String(t("form.select"))}</option>
                      {trackConfig?.orgTypes.map((item) => (
                        <option key={item.value} value={item.value}>
                          {String(t(item.key))}
                        </option>
                      ))}
                    </select>
                  </div>
                </>
              ) : null}
              <div className="field">
                <label htmlFor="fname">
                  <T k={track ? "form.contact" : "form.name"} />
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
              {track ? (
                <>
                  <div className="field">
                    <label htmlFor="fcityzone">
                      <T k="form.city_zone" />
                    </label>
                    <select
                      id="fcityzone"
                      name="city_zone"
                      required
                      value={cityZone}
                      onChange={(e) => setCityZone(e.target.value)}
                    >
                      <option value="">{String(t("form.select"))}</option>
                      {JOIN_CITY_OPTIONS.map((item) => (
                        <option key={item.value} value={item.value}>
                          {String(t(item.key))}
                        </option>
                      ))}
                    </select>
                  </div>
                  {cityZone === "other" || cityZone === "region" ? (
                    <div className="field">
                      <label htmlFor="fcitydetail">
                        <T k="form.city_detail" />
                      </label>
                      <input
                        id="fcitydetail"
                        name="city_detail"
                        type="text"
                        required={cityZone === "other"}
                        value={cityDetail}
                        onChange={(e) => setCityDetail(e.target.value)}
                        autoComplete="address-level2"
                      />
                    </div>
                  ) : null}
                </>
              ) : (
                <div className="field">
                  <label htmlFor="fcity">
                    <T k="form.city" />
                  </label>
                  <input id="fcity" name="city" type="text" required autoComplete="address-level2" />
                </div>
              )}
              <div className="field full">
                <label htmlFor="frole">
                  <T k="form.role" />
                </label>
                <select
                  id="frole"
                  name="role"
                  required
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
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
              {track && trackConfig ? (
                <>
                  <div className="field full">
                    <label>
                      <THtml k="form.focus_areas" />
                    </label>
                    <div className="check-grid">
                      {trackConfig.focusAreas.map((item) => (
                        <label key={item.value}>
                          <input
                            type="checkbox"
                            name="focus_areas"
                            value={item.value}
                            checked={focusAreas.includes(item.value)}
                            onChange={() =>
                              setFocusAreas((current) => toggleValue(current, item.value))
                            }
                          />
                          <T k={item.key} />
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="field full">
                    <label>
                      <THtml k="form.collaboration" />
                    </label>
                    <div className="check-grid">
                      {trackConfig.collaboration.map((item) => (
                        <label key={item.value}>
                          <input
                            type="checkbox"
                            name="collaboration"
                            value={item.value}
                            checked={collaboration.includes(item.value)}
                            onChange={() =>
                              setCollaboration((current) => toggleValue(current, item.value))
                            }
                          />
                          <T k={item.key} />
                        </label>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
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
              )}
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
                <textarea
                  id="fq"
                  name="question"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                />
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
