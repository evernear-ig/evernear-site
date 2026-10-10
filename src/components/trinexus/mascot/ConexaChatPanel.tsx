"use client";

import { useChat } from "@ai-sdk/react";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { DefaultChatTransport } from "ai";
import { useI18n } from "@/components/trinexus/providers/I18nProvider";
import { T } from "@/components/trinexus/ui/T";

type ConexaChatPanelProps = {
  onClose: () => void;
};

function messageText(parts: { type: string; text?: string }[]) {
  return parts
    .filter((part) => part.type === "text" && part.text)
    .map((part) => part.text)
    .join("");
}

export function ConexaChatPanel({ onClose }: ConexaChatPanelProps) {
  const { t, lang } = useI18n();
  const pathname = usePathname();
  const logRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const [input, setInput] = useState("");
  const transport = useMemo(() => new DefaultChatTransport({ api: "/api/chat" }), []);
  const { messages, sendMessage, status, error, stop, regenerate, clearError } = useChat({
    transport,
  });

  const busy = status === "submitted" || status === "streaming";
  const billingRequired = messages.some((message) =>
    messageText(message.parts).includes("billing_required"),
  );

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    const log = logRef.current;
    if (!log) return;
    log.scrollTop = log.scrollHeight;
  }, [messages, status, error]);

  const submit = () => {
    const text = input.trim();
    if (!text || status !== "ready") return;
    clearError();
    void sendMessage({ text }, { body: { lang, pathname } });
    setInput("");
  };

  return (
    <div
      className="conexa-guide__chat"
      role="dialog"
      aria-modal="true"
      aria-labelledby="conexa-chat-title"
    >
      <div className="conexa-guide__chat-head">
        <p id="conexa-chat-title" className="conexa-guide__chat-title">
          <T k="journey.chat.title" />
        </p>
        <button
          type="button"
          className="conexa-guide__chat-close"
          onClick={onClose}
        >
          <T k="journey.btn.close" />
        </button>
      </div>

      <div
        ref={logRef}
        className="conexa-guide__chat-log"
        aria-live="polite"
        aria-busy={busy}
      >
        {messages.length === 0 ? (
          <p className="conexa-guide__chat-body">
            <T k="journey.chat.body" />
          </p>
        ) : null}

        {messages.map((message) => {
          const text = messageText(message.parts);
          if (!text) return null;
          return (
            <p
              key={message.id}
              className={`conexa-guide__chat-msg conexa-guide__chat-msg--${message.role}`}
            >
              {text}
            </p>
          );
        })}

        {status === "submitted" ? (
          <p className="conexa-guide__chat-msg conexa-guide__chat-msg--assistant conexa-guide__chat-msg--pending">
            …
          </p>
        ) : null}

        {error || billingRequired ? (
          <p className="conexa-guide__chat-error" role="alert">
            <T k={billingRequired ? "journey.chat.errorBilling" : "journey.chat.error"} />
          </p>
        ) : null}
      </div>

      <form
        className="conexa-guide__chat-form"
        onSubmit={(event) => {
          event.preventDefault();
          submit();
        }}
      >
        <label className="sr" htmlFor="conexa-chat-input">
          <T k="journey.chat.title" />
        </label>
        <textarea
          ref={inputRef}
          id="conexa-chat-input"
          className="conexa-guide__chat-input"
          rows={2}
          value={input}
          placeholder={String(t("journey.chat.placeholder"))}
          onChange={(event) => setInput(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              submit();
            }
          }}
        />
        {busy ? (
          <button
            type="button"
            className="conexa-guide__prompt-btn conexa-guide__prompt-btn--ghost"
            onClick={() => stop()}
          >
            <T k="journey.chat.stop" />
          </button>
        ) : error || billingRequired ? (
          <button
            type="button"
            className="conexa-guide__prompt-btn conexa-guide__prompt-btn--primary"
            onClick={() => {
              clearError();
              void regenerate();
            }}
          >
            <T k="journey.chat.retry" />
          </button>
        ) : (
          <button
            type="submit"
            className="conexa-guide__prompt-btn conexa-guide__prompt-btn--primary"
            disabled={!input.trim() || status !== "ready"}
          >
            <T k="journey.chat.send" />
          </button>
        )}
      </form>
    </div>
  );
}
