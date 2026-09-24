"use client";

import { useState } from "react";
import { Carousel } from "@/components/trinexus/ui/Carousel";
import { Reveal } from "@/components/trinexus/ui/Reveal";
import { T } from "@/components/trinexus/ui/T";
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

  const toggle = (id: PersonId) => {
    setActive((prev) => (prev === id ? null : id));
  };

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
        <Carousel
          variant="cards"
          className="people-carousel"
          items={PEOPLE}
          itemsPerPage={{ desktop: 3, mobile: 1 }}
          stagger
          renderItem={(person) => (
            <PersonCard
              person={person}
              active={active === person.id}
              onToggle={() => toggle(person.id)}
            />
          )}
        />
      </div>
    </section>
  );
}
