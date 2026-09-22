"use client";

import { useRouter } from "next/navigation";
import { useI18n } from "@/components/trinexus/providers/I18nProvider";
import { T } from "@/components/trinexus/ui/T";
import { toast } from "sonner";

export function PublishEventForm() {
  const router = useRouter();
  const { t } = useI18n();

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
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
    <form className="eco-form" onSubmit={onSubmit}>
      <label>
        <T k="events.form.title" />
        <input name="title" required />
      </label>
      <label>
        <T k="events.form.date" />
        <input name="date" type="date" required />
      </label>
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
      <label>
        <T k="events.form.tags" />
        <input name="tags" placeholder="meetup, tech" />
      </label>
      <label>
        <T k="events.form.description" />
        <textarea name="description" rows={4} required />
      </label>
      <button type="submit" className="btn btn-green">
        <T k="events.form.submit" />
      </button>
    </form>
  );
}
