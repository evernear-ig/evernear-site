"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useI18n } from "@/components/evernear/providers/I18nProvider";
import { FormWizard, reportStepValidity } from "@/components/evernear/ui/FormWizard";
import { T } from "@/components/evernear/ui/T";
import { toast } from "sonner";

const EVENT_STEPS = [
  { id: "when", titleKey: "events.wizard.when" },
  { id: "where", titleKey: "events.wizard.where" },
  { id: "about", titleKey: "events.wizard.about" },
] as const;

export function PublishEventForm() {
  const router = useRouter();
  const { t } = useI18n();
  const [step, setStep] = useState(0);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  function goNext() {
    if (!reportStepValidity(panelRefs.current[step])) return;
    setStep((current) => Math.min(EVENT_STEPS.length - 1, current + 1));
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!reportStepValidity(panelRefs.current[step])) return;
    const fd = new FormData(e.currentTarget);
    const promise = fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: fd.get("title"),
        date: fd.get("date"),
        cityId: fd.get("cityId"),
        organizer: fd.get("organizer"),
        tags: fd.get("tags"),
        description: fd.get("description"),
      }),
    }).then(async (res) => {
      const event = await res.json();
      if (!res.ok) throw new Error();
      router.push(`/eventos/${event.slug}`);
      return event;
    });

    toast.promise(promise, {
      loading: String(t("events.form.submit")) + "…",
      success: String(t("events.form.submit")),
      error: String(t("events.form.error")),
    });
  }

  return (
    <form className="eco-form eco-form--wizard" noValidate onSubmit={onSubmit}>
      <FormWizard
        tone="light"
        steps={[...EVENT_STEPS]}
        step={step}
        onStepSelect={setStep}
        onBack={() => setStep((current) => Math.max(0, current - 1))}
        onNext={goNext}
        submitControl={
          <button type="submit" className="btn btn-green">
            <T k="events.form.submit" />
          </button>
        }
      >
        <div ref={(el) => { panelRefs.current[0] = el; }}>
          <label>
            <T k="events.form.title" />
            <input name="title" required />
          </label>
          <label>
            <T k="events.form.date" />
            <input name="date" type="date" required />
          </label>
        </div>
        <div ref={(el) => { panelRefs.current[1] = el; }}>
          <label>
            <T k="events.form.city" />
            <select name="cityId" required>
              <option value="pi">Puerto Iguazú</option>
              <option value="foz">Foz do Iguaçu</option>
              <option value="cde">Ciudad del Este</option>
            </select>
          </label>
          <label>
            <T k="events.form.organizer" />
            <input name="organizer" required />
          </label>
        </div>
        <div ref={(el) => { panelRefs.current[2] = el; }}>
          <label>
            <T k="events.form.tags" />
            <input name="tags" placeholder="meetup, tech" />
          </label>
          <label>
            <T k="events.form.description" />
            <textarea name="description" rows={4} required />
          </label>
        </div>
      </FormWizard>
    </form>
  );
}
