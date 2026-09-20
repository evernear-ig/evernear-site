"use client";

import { useState } from "react";
import { Reveal } from "@/components/trinexus/ui/Reveal";
import { Seam } from "@/components/trinexus/ui/Seam";
import { T, THtml } from "@/components/trinexus/ui/T";
import { TrinexusPhoto } from "@/components/trinexus/ui/TrinexusPhoto";

type PersonId =
  | "student"
  | "developer"
  | "entrepreneur"
  | "business"
  | "creator"
  | "builder";

const PEOPLE: {
  id: PersonId;
  roleKey?: string;
  roleText?: string;
  quoteKey: string;
  hubLine: "top" | "br" | "bl";
  activeNode: "top" | "br" | "bl";
}[] = [
  { id: "student", roleKey: "ppl.student", quoteKey: "ppl.student.q", hubLine: "top", activeNode: "top" },
  { id: "developer", roleKey: "ppl.dev", quoteKey: "ppl.dev.q", hubLine: "br", activeNode: "br" },
  { id: "entrepreneur", roleKey: "ppl.ent", quoteKey: "ppl.ent.q", hubLine: "bl", activeNode: "bl" },
  { id: "business", roleKey: "ppl.biz", quoteKey: "ppl.biz.q", hubLine: "top", activeNode: "top" },
  { id: "creator", roleKey: "ppl.creator", quoteKey: "ppl.creator.q", hubLine: "br", activeNode: "br" },
  { id: "builder", roleText: "Builder", quoteKey: "ppl.builder.q", hubLine: "bl", activeNode: "bl" },
];

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

export function PeopleSection() {
  const [active, setActive] = useState<PersonId | null>(null);

  const toggle = (id: PersonId) => {
    setActive((prev) => (prev === id ? null : id));
  };

  return (
    <section className="dark people-sec" id="people">
      <Seam />
      <div className="wrap">
        <Reveal className="grid g-7-5" style={{ alignItems: "end" }}>
          <h2 className="h-xl">
            <T k="ppl.h" />
          </h2>
          <p className="lead">
            <T k="ppl.lead" />
          </p>
        </Reveal>
        <Reveal className="people-grid" id="peopleGrid">
          {PEOPLE.map((person) => {
            const on = active === person.id;
            return (
              <div
                key={person.id}
                className={`pcard${on ? " on" : ""}`}
                data-p={person.id}
                tabIndex={0}
                role="button"
                aria-pressed={on}
                onClick={() => toggle(person.id)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    toggle(person.id);
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
          })}
        </Reveal>
        <Reveal>
          <p className="people-note">
            <T k="ppl.note" />
          </p>
          <p className="people-cta">
            <a href="/descubrimiento" className="btn btn-outline">
              <T k="pil.link" />
            </a>
          </p>
        </Reveal>
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
