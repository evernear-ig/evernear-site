"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useI18n } from "@/components/trinexus/providers/I18nProvider";
import { T } from "@/components/trinexus/ui/T";

const INTEREST_OPTIONS = [
  { id: "eventos", label: "Eventos & Festivales" },
  { id: "comercios", label: "Ofertas & Gastronomía" },
  { id: "educacion", label: "Becas & Formación" },
  { id: "innovacion", label: "Innovación & Startups" },
  { id: "live", label: "Sesiones en Vivo" },
];

export function PulsoPassport() {
  const { t } = useI18n();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    "eventos",
    "comercios",
  ]);
  const [email, setEmail] = useState("");
  const [notifyLive, setNotifyLive] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const toggleInterest = (id: string) => {
    setSelectedInterests((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || submitting) return;

    setSubmitting(true);
    try {
      const res = await fetch("/api/pulso/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          notifyLive,
          interests: selectedInterests,
        }),
      });

      const data = await res.json();
      if (data.ok) {
        toast.success(
          String(t(data.created ? "pulso.subscribed" : "pulso.exists"))
        );
        setEmail("");
      } else {
        toast.error(String(t("err.email")));
      }
    } catch {
      toast.error(String(t("err.email")));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="pulso-passport" className="pulso-passport-section" aria-labelledby="pulso-passport-title">
      <div className="wrap">
        <div className="pulso-passport-card">
          {/* Header del pasaporte */}
          <div className="pulso-passport-card__head">
            <div className="pulso-passport-badge">
              <span className="pulso-passport-badge__icon" aria-hidden="true">✦</span>
              <span>ALERTA DE TRANSMISIÓN SEMANAL · TRIPLE FRONTERA</span>
            </div>

            <h2 id="pulso-passport-title" className="pulso-passport-card__title">
              No te pierdas el próximo streaming en vivo
            </h2>
            <p className="pulso-passport-card__lead">
              Te avisamos 15 minutos antes de salir al aire cada viernes y te enviamos el resumen con los enlaces y oportunidades de la semana.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="pulso-passport-form">
            {/* Chips de interés */}
            <div className="pulso-passport-interests">
              <span className="pulso-passport-interests__label">
                Elegí tus frecuencias de interés:
              </span>
              <div className="pulso-passport-chips">
                {INTEREST_OPTIONS.map((opt) => {
                  const isChecked = selectedInterests.includes(opt.id);
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      className={`pulso-chip ${isChecked ? "is-active" : ""}`}
                      onClick={() => toggleInterest(opt.id)}
                    >
                      <span className="pulso-chip__check">
                        {isChecked ? "✓" : "+"}
                      </span>
                      <span>{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Input & Botón de envío */}
            <div className="pulso-passport-input-group">
              <div className="pulso-passport-field">
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="tu@email.com…"
                  required
                  spellCheck={false}
                  autoComplete="email"
                  className="pulso-passport-input"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="btn btn-green btn-pulse pulso-passport-submit"
              >
                {submitting ? "Suscribiendo…" : <T k="pulso.subscribe.btn" />}
              </button>
            </div>

            {/* Notificar sesiones en vivo */}
            <label className="pulso-passport-live-check">
              <input
                type="checkbox"
                checked={notifyLive}
                onChange={(e) => setNotifyLive(e.target.checked)}
              />
              <span>
                <T k="pulso.subscribe.live" />
              </span>
            </label>
          </form>
        </div>
      </div>
    </section>
  );
}
