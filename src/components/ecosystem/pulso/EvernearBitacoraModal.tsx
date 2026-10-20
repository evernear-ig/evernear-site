"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { PulsoEdition } from "@/lib/ecosystem/types";

type EvernearBitacoraModalProps = {
  isOpen: boolean;
  onClose: () => void;
  edition: PulsoEdition;
};

export function EvernearBitacoraModal({
  isOpen,
  onClose,
  edition,
}: EvernearBitacoraModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const editorial = edition.mascotEditorial ?? {
    title: `Bitácora de Evernear · Edición #${edition.editionNumber ?? 40}`,
    dateLabel: "Edición semanal de la Triple Frontera",
    intro:
      edition.mascotQuote ??
      "¡Bienvenidos al streaming de la frontera! Conectate y explorá cada novedad con nosotros.",
    paragraphs: [
      edition.lead,
      "Cada semana recorremos los puentes que unen Puerto Iguazú, Foz do Iguaçu y Ciudad del Este para acercarte iniciativas de innovación, encuentros comunitarios, ferias gastronómicas y becas de estudio.",
      "La frontera no es una línea que divide, sino un punto de encuentro donde nacen proyectos únicos con identidad trinacional.",
    ],
    keyTakeaways: [
      {
        cityId: "pi",
        topic: "Puerto Iguazú",
        description: "Encuentros de comunidad técnica y nuevos circuitos naturales sustentables.",
      },
      {
        cityId: "cde",
        topic: "Ciudad del Este",
        description: "Innovación en transacciones locales y apoyo a ferias de cercanía.",
      },
      {
        cityId: "foz",
        topic: "Foz do Iguaçu",
        description: "Formación de avanzada y torneos deportivos que integran la región.",
      },
    ],
    signOff: "Evernear · Guardiana del pulso trinacional",
  };

  // Bloqueo de scroll y listener de Escape
  useEffect(() => {
    if (!isOpen) return;

    document.body.classList.add("join-modal-open");

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Enfoque inicial en el botón de cierre para accesibilidad
    const timer = setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 50);

    return () => {
      document.body.classList.remove("join-modal-open");
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(timer);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      className="pulso-bitacora-modal-layer open"
      role="dialog"
      aria-modal="true"
      aria-labelledby="evernear-bitacora-title"
    >
      {/* Fondo con blur */}
      <div
        className="pulso-bitacora-modal__bg"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Contenedor principal de la bitácora */}
      <div className="pulso-bitacora-modal__box">
        {/* Botón de cierre */}
        <button
          ref={closeBtnRef}
          type="button"
          onClick={onClose}
          className="pulso-bitacora-modal__close"
          aria-label="Cerrar bitácora de Evernear"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {/* Encabezado Editorial */}
        <div className="pulso-bitacora__header">
          <div className="pulso-bitacora__avatar-wrap">
            <div className="pulso-bitacora__avatar-glow" aria-hidden="true" />
            <Image
              src="/images/mascot/evernear-think.webp"
              alt="Evernear"
              width={76}
              height={76}
              className="pulso-bitacora__avatar-img"
              priority
            />
          </div>

          <div className="pulso-bitacora__titles">
            <div className="pulso-bitacora__tags">
              <span className="pulso-bitacora__badge">BITÁCORA EDITORIAL</span>
              <span className="pulso-bitacora__edition-tag">
                EDICIÓN #{edition.editionNumber ?? 40} · {edition.weekKey}
              </span>
            </div>
            <h2 id="evernear-bitacora-title" className="pulso-bitacora__title">
              {editorial.title}
            </h2>
            {editorial.dateLabel && (
              <p className="pulso-bitacora__date">{editorial.dateLabel}</p>
            )}
          </div>
        </div>

        {/* Separador decorativo */}
        <div className="pulso-bitacora__divider" aria-hidden="true">
          <span className="pulso-bitacora__divider-dot" />
        </div>

        {/* Cuerpo editorial de lectura confortable */}
        <div className="pulso-bitacora__body">
          {/* Cita de apertura */}
          <blockquote className="pulso-bitacora__quote">
            <p>"{editorial.intro}"</p>
          </blockquote>

          {/* Párrafos editoriales */}
          <div className="pulso-bitacora__prose">
            {editorial.paragraphs.map((para, idx) => (
              <p key={idx} className={idx === 0 ? "pulso-bitacora__first-p" : ""}>
                {para}
              </p>
            ))}
          </div>

          {/* Apuntes destacados de la semana */}
          {editorial.keyTakeaways && editorial.keyTakeaways.length > 0 && (
            <div className="pulso-bitacora__takeaways">
              <h3 className="pulso-bitacora__takeaways-title">
                Apuntes del radar trinacional
              </h3>
              <div className="pulso-bitacora__takeaways-grid">
                {editorial.keyTakeaways.map((item, idx) => (
                  <div key={idx} className="pulso-bitacora__takeaway-card">
                    <div className="pulso-bitacora__takeaway-header">
                      {item.cityId === "pi" && (
                        <span className="pulso-dot pulso-dot--pi" />
                      )}
                      {item.cityId === "foz" && (
                        <span className="pulso-dot pulso-dot--foz" />
                      )}
                      {item.cityId === "cde" && (
                        <span className="pulso-dot pulso-dot--cde" />
                      )}
                      <strong>{item.topic}</strong>
                    </div>
                    <p>{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Firma cálida de Evernear */}
          {editorial.signOff && (
            <div className="pulso-bitacora__signoff">
              <span className="pulso-bitacora__signoff-dash" aria-hidden="true" />
              <p className="pulso-bitacora__signoff-text">{editorial.signOff}</p>
            </div>
          )}
        </div>

        {/* Footer del Modal con acciones */}
        <div className="pulso-bitacora__footer">
          <button
            type="button"
            onClick={onClose}
            className="pulso-bitacora__btn-close"
          >
            Volver a la transmisión
          </button>
          <a
            href="#pulso-radar"
            onClick={onClose}
            className="pulso-bitacora__btn-explore"
          >
            <span>Explorar novedades tratadas</span>
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <line x1="5" y1="12" x2="19" y2="12" />
              <polyline points="12 5 19 12 12 19" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
