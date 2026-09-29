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
          <div className="pulso-passport-grid">
            {/* Columna Izquierda: Información editorial y propuesta de valor */}
            <div className="pulso-passport-card__left">
              <div className="pulso-passport-badge">
                <span className="pulso-passport-badge__icon" aria-hidden="true">✦</span>
                <span>ALERTA DE TRANSMISIÓN SEMANAL · TRIPLE FRONTERA</span>
              </div>

              <h2 id="pulso-passport-title" className="pulso-passport-card__title">
                No te pierdas el próximo streaming en vivo
              </h2>
              <p className="pulso-passport-card__lead">
                Te avisamos 15 minutos antes de salir al aire cada viernes y te enviamos el resumen con los enlaces, oportunidades y convocatorias de la semana.
              </p>

              <div className="pulso-passport-features">
                <div className="pulso-passport-feature">
                  <div className="pulso-passport-feature__icon" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </div>
                  <div className="pulso-passport-feature__text">
                    <strong>Viernes 19:00 ART / BRT / PYT</strong>
                    <span>Transmisión en simultáneo para las 3 ciudades de la frontera</span>
                  </div>
                </div>

                <div className="pulso-passport-feature">
                  <div className="pulso-passport-feature__icon" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                  </div>
                  <div className="pulso-passport-feature__text">
                    <strong>Resumen editorial curado</strong>
                    <span>Enlaces directos, becas académicas y radar de empleos</span>
                  </div>
                </div>

                <div className="pulso-passport-feature">
                  <div className="pulso-passport-feature__icon" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <div className="pulso-passport-feature__text">
                    <strong>Cero spam & baja en 1 clic</strong>
                    <span>Frecuencias personalizadas según lo que realmente te interesa</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Columna Derecha: Módulo interactivo de suscripción */}
            <div className="pulso-passport-card__right">
              <div className="pulso-passport-box">
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
                  <div className="pulso-passport-bottom-row">
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

                    <span className="pulso-passport-privacy-note">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                      <span>Privacidad garantizada</span>
                    </span>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
