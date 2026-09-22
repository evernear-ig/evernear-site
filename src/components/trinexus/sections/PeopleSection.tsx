"use client";

import { useEffect, useMemo, useState } from "react";
import { Reveal } from "@/components/trinexus/ui/Reveal";
import { T, THtml } from "@/components/trinexus/ui/T";
import { TrinexusPhoto } from "@/components/trinexus/ui/TrinexusPhoto";

type PersonId =
  | "student"
  | "athlete"
  | "developer"
  | "foundation"
  | "business"
  | "creator";

const PEOPLE: {
  id: PersonId;
  roleKey?: string;
  roleText?: string;
  quoteKey: string;
  hubLine: "top" | "br" | "bl";
  activeNode: "top" | "br" | "bl";
}[] = [
  { id: "student", roleKey: "ppl.student", quoteKey: "ppl.student.q", hubLine: "top", activeNode: "top" },
  { id: "athlete", roleKey: "ppl.athlete", quoteKey: "ppl.athlete.q", hubLine: "br", activeNode: "br" },
  { id: "developer", roleKey: "ppl.dev", quoteKey: "ppl.dev.q", hubLine: "bl", activeNode: "bl" },
  { id: "foundation", roleKey: "ppl.foundation", quoteKey: "ppl.foundation.q", hubLine: "top", activeNode: "top" },
  { id: "business", roleKey: "ppl.biz", quoteKey: "ppl.biz.q", hubLine: "br", activeNode: "br" },
  { id: "creator", roleKey: "ppl.creator", quoteKey: "ppl.creator.q", hubLine: "bl", activeNode: "bl" },
];

const PEOPLE_PAGE_SIZE_DESKTOP = 3;
const PEOPLE_PAGE_SIZE_MOBILE = 1;

function PersonTri({
  hubLine,
  activeNode,
}: {
  hubLine: "top" | "br" | "bl";
  activeNode: "top" | "br" | "bl";
}) {
  const line =
    hubLine === "top" ? (
      <line className="ln" x1="22" y1="6" x2="22" y2="25" />
    ) : hubLine === "br" ? (
      <line className="ln" x1="38" y1="34" x2="22" y2="25" />
    ) : (
      <line className="ln" x1="6" y1="34" x2="22" y2="25" />
    );

  return (
    <svg className="tri" viewBox="0 0 44 44" aria-hidden="true">
      <path d="M22 6 L38 34 L6 34 Z" />
      {line}
      <circle className="hub" cx="22" cy="25" r="3" />
      <circle className={`c${activeNode === "top" ? " c1" : ""}`} cx="22" cy="6" r="2.5" />
      <circle className={`c${activeNode === "br" ? " c1" : ""}`} cx="38" cy="34" r="2.5" />
      <circle className={`c${activeNode === "bl" ? " c1" : ""}`} cx="6" cy="34" r="2.5" />
    </svg>
  );
}

type PersonCardProps = {
  person: (typeof PEOPLE)[number];
  active: boolean;
  onToggle: () => void;
};

function PersonCard({ person, active, onToggle }: PersonCardProps) {
  return (
    <div
      className={`pcard${active ? " on" : ""}`}
      data-p={person.id}
      tabIndex={0}
      role="button"
      aria-pressed={active}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
    >
      <TrinexusPhoto imageKey={`people.${person.id}`} />
      <PersonTri hubLine={person.hubLine} activeNode={person.activeNode} />
      <div className="txt">
        <div className="role">
          {person.roleKey ? <T k={person.roleKey} /> : person.roleText}
        </div>
        <div className="say">
          <T k={person.quoteKey} />
        </div>
        <div className="meta ph-meta">
          <span>
            <T k="ppl.rep" />
          </span>
          <span>
            <T k="ppl.region" />
          </span>
        </div>
      </div>
    </div>
  );
}

export function PeopleSection() {
  const [active, setActive] = useState<PersonId | null>(null);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(PEOPLE_PAGE_SIZE_DESKTOP);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)");
    const syncPageSize = () => {
      setPageSize(mq.matches ? PEOPLE_PAGE_SIZE_MOBILE : PEOPLE_PAGE_SIZE_DESKTOP);
      setPage(0);
    };
    syncPageSize();
    mq.addEventListener("change", syncPageSize);
    return () => mq.removeEventListener("change", syncPageSize);
  }, []);

  const pages = useMemo(() => {
    const chunks: (typeof PEOPLE)[] = [];
    for (let i = 0; i < PEOPLE.length; i += pageSize) {
      chunks.push(PEOPLE.slice(i, i + pageSize));
    }
    return chunks;
  }, [pageSize]);

  useEffect(() => {
    setPage((current) => Math.min(current, Math.max(0, pages.length - 1)));
  }, [pages.length]);

  const toggle = (id: PersonId) => {
    setActive((prev) => (prev === id ? null : id));
  };

  const canPrev = page > 0;
  const canNext = page < pages.length - 1;

  return (
    <section className="dark people-sec" id="people">
      <div className="wrap">
        <Reveal className="sec-head sec-head--center">
          <h2 className="h-xl">
            <T k="ppl.h" />
          </h2>
          <p className="lead">
            <T k="ppl.lead" />
          </p>
        </Reveal>
        <div className="people-carousel" id="peopleGrid">
          <div className="people-carousel-viewport">
            <div
              className="people-carousel-track"
              style={{
                width: `${pages.length * 100}%`,
                transform: `translateX(-${(page * 100) / pages.length}%)`,
              }}
            >
              {pages.map((group, pageIndex) => (
                <div
                  key={pageIndex}
                  className="people-carousel-page"
                  style={{ width: `${100 / pages.length}%` }}
                  aria-hidden={pageIndex !== page}
                >
                  {group.map((person) => (
                    <PersonCard
                      key={person.id}
                      person={person}
                      active={active === person.id}
                      onToggle={() => toggle(person.id)}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
          {pages.length > 1 && (
            <div className="people-carousel-nav">
              <button
                type="button"
                className="people-carousel-btn"
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={!canPrev}
                aria-label="Anterior"
              >
                ←
              </button>
              <div className="people-carousel-dots" role="tablist" aria-label="Personas">
                {pages.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    role="tab"
                    className={index === page ? "active" : undefined}
                    aria-selected={index === page}
                    aria-label={`Grupo ${index + 1}`}
                    onClick={() => setPage(index)}
                  />
                ))}
              </div>
              <button
                type="button"
                className="people-carousel-btn"
                onClick={() => setPage((p) => Math.min(pages.length - 1, p + 1))}
                disabled={!canNext}
                aria-label="Siguiente"
              >
                →
              </button>
            </div>
          )}
        </div>
        <Reveal className="people-band">
          <TrinexusPhoto imageKey="band.community" />
          <svg className="nodes" viewBox="0 0 120 60" aria-hidden="true">
            <line x1="10" y1="50" x2="60" y2="12" />
            <line x1="60" y1="12" x2="110" y2="50" />
            <line x1="10" y1="50" x2="110" y2="50" />
            <line x1="60" y1="12" x2="60" y2="38" style={{ stroke: "#2EE59D" }} />
            <circle cx="10" cy="50" r="3" style={{ fill: "#F6F7FB", stroke: "none" }} />
            <circle cx="110" cy="50" r="3" style={{ fill: "#F6F7FB", stroke: "none" }} />
            <circle cx="60" cy="12" r="3" style={{ fill: "#F6F7FB", stroke: "none" }} />
            <circle className="g" cx="60" cy="38" r="4" />
          </svg>
          <div className="cap">
            <h3 className="h-xl">
              <THtml k="ppl.band" />
            </h3>
            <span className="ph-meta">
              <T k="ppl.band.meta" />
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
