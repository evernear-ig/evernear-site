"use client";

import { Children, type ReactNode, useEffect, useRef } from "react";
import { useI18n } from "@/components/trinexus/providers/I18nProvider";
import { T } from "@/components/trinexus/ui/T";

export type FormWizardStep = {
  id: string;
  titleKey: string;
};

export function reportStepValidity(root: HTMLElement | null): boolean {
  if (!root) return true;
  const controls = Array.from(
    root.querySelectorAll<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(
      "input, select, textarea"
    )
  ).filter((el) => !el.disabled && el.type !== "hidden");

  for (const el of controls) {
    if (!el.checkValidity()) {
      el.reportValidity();
      el.focus();
      return false;
    }
  }
  return true;
}

type FormWizardProps = {
  steps: FormWizardStep[];
  step: number;
  onStepSelect: (index: number) => void;
  onBack: () => void;
  onNext: () => void;
  submitControl: ReactNode;
  tone?: "dark" | "light";
  children: ReactNode;
};

export function FormWizard({
  steps,
  step,
  onStepSelect,
  onBack,
  onNext,
  submitControl,
  tone = "dark",
  children,
}: FormWizardProps) {
  const { t } = useI18n();
  const panelWrapRef = useRef<HTMLDivElement>(null);
  const panels = Children.toArray(children);
  const last = step === steps.length - 1;
  const total = steps.length;

  useEffect(() => {
    const first = panelWrapRef.current?.querySelector<HTMLElement>(
      "input:not([type=hidden]),select,textarea,button"
    );
    first?.focus();
  }, [step]);

  return (
    <div
      className={`form-wizard form-wizard--${tone}`}
      style={{ ["--wizard-steps" as string]: String(total) }}
    >
      <ol className="form-wizard__nav" aria-label={String(t("wizard.nav"))}>
        {steps.map((item, index) => {
          const current = index === step;
          const done = index < step;
          return (
            <li key={item.id}>
              <button
                type="button"
                className={`form-wizard__tab${done ? " is-done" : ""}`}
                aria-current={current ? "step" : undefined}
                disabled={index > step}
                onClick={() => onStepSelect(index)}
              >
                <span className="form-wizard__tab-label">
                  <T k={item.titleKey} />
                </span>
                <span className="form-wizard__tab-bar" aria-hidden="true">
                  <i />
                </span>
              </button>
            </li>
          );
        })}
      </ol>

      <p className="sr" aria-live="polite">
        {String(t("wizard.nav"))}: {step + 1} / {total}
      </p>

      <div className="form-wizard__panels" ref={panelWrapRef}>
        {panels.map((panel, index) => (
          <div
            key={steps[index]?.id ?? index}
            className="form-wizard__panel"
            hidden={index !== step}
            inert={index !== step ? true : undefined}
          >
            {panel}
          </div>
        ))}
      </div>

      <div className="form-wizard__actions">
        {step > 0 ? (
          <button type="button" className={`btn ${tone === "light" ? "btn-outline-ink" : "btn-ghost"}`} onClick={onBack}>
            <T k="wizard.back" />
          </button>
        ) : null}
        {last ? (
          submitControl
        ) : (
          <button type="button" className="btn btn-green" onClick={onNext}>
            <T k="wizard.next" />
          </button>
        )}
      </div>
    </div>
  );
}
