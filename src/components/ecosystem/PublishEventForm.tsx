"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { T } from "@/components/trinexus/ui/T";

export function PublishEventForm() {
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const fd = new FormData(e.currentTarget);
    try {
      const res = await fetch("/api/events", {
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
      });
      const event = await res.json();
      if (!res.ok) throw new Error();
      setStatus("done");
      router.push(`/eventos/${event.slug}`);
    } catch {
      setStatus("error");
    }
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
      <button type="submit" className="btn btn-green" disabled={status === "loading"}>
        <T k="events.form.submit" />
      </button>
      {status === "error" && <p className="form-err"><T k="events.form.error" /></p>}
    </form>
  );
}
