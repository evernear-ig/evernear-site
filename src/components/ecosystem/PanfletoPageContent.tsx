"use client";

import { useEffect, useState } from "react";
import { T } from "@/components/trinexus/ui/T";

type Preview = {
  events: { title: string; date: string }[];
  businesses: { name: string; promo?: string }[];
  entries: { businessName: string; promo: string }[];
};

export function PanfletoPageContent() {
  const [preview, setPreview] = useState<Preview | null>(null);
  const [userStatus, setUserStatus] = useState("");
  const [bizStatus, setBizStatus] = useState("");

  useEffect(() => {
    fetch("/api/panfleto/preview")
      .then((r) => r.json())
      .then(setPreview)
      .catch(() => {});
  }, []);

  async function subscribeUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email");
    const res = await fetch("/api/panfleto/subscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    setUserStatus(data.ok ? "ok" : "exists");
  }

  async function subscribeBusiness(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const res = await fetch("/api/panfleto/entry", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        businessName: fd.get("businessName"),
        promo: fd.get("promo"),
      }),
    });
    setBizStatus(res.ok ? "ok" : "error");
    const p = await fetch("/api/panfleto/preview").then((r) => r.json());
    setPreview(p);
  }

  return (
    <div className="panfleto-page">
      <section className="panfleto-section">
        <h2><T k="panfleto.user.h" /></h2>
        <p><T k="panfleto.user.lead" /></p>
        <form className="eco-form" onSubmit={subscribeUser}>
          <label>
            <T k="panfleto.email" />
            <input name="email" type="email" required />
          </label>
          <button type="submit" className="btn btn-green btn-sm">
            <T k="panfleto.subscribe" />
          </button>
        </form>
        {userStatus === "ok" && <p className="form-ok"><T k="panfleto.subscribed" /></p>}
        {userStatus === "exists" && <p className="form-err"><T k="panfleto.exists" /></p>}
      </section>

      <section className="panfleto-section">
        <h2><T k="panfleto.biz.h" /></h2>
        <p><T k="panfleto.biz.lead" /></p>
        <form className="eco-form" onSubmit={subscribeBusiness}>
          <label>
            <T k="panfleto.biz.name" />
            <input name="businessName" required />
          </label>
          <label>
            <T k="panfleto.biz.promo" />
            <input name="promo" required />
          </label>
          <button type="submit" className="btn btn-green btn-sm">
            <T k="panfleto.biz.submit" />
          </button>
        </form>
        {bizStatus === "ok" && <p className="form-ok"><T k="panfleto.biz.ok" /></p>}
      </section>

      {preview && (
        <section className="panfleto-preview">
          <h2><T k="panfleto.preview.h" /></h2>
          <div className="panfleto-email">
            <header>
              <strong>TRINEXUS Panfleto Semanal</strong>
              <span>Triple Frontera</span>
            </header>
            <h3><T k="panfleto.preview.events" /></h3>
            <ul>
              {preview.events.map((e) => (
                <li key={e.title}>{e.date} — {e.title}</li>
              ))}
            </ul>
            <h3><T k="panfleto.preview.promos" /></h3>
            <ul>
              {preview.businesses
                .filter((b) => b.promo)
                .map((b) => (
                  <li key={b.name}>
                    <strong>{b.name}</strong>: {b.promo}
                  </li>
                ))}
              {preview.entries.map((e) => (
                <li key={e.businessName}>
                  <strong>{e.businessName}</strong>: {e.promo}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}
    </div>
  );
}
