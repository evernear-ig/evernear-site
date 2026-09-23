"use client";

import { useEffect, useMemo, useState } from "react";
import { EcoCardLink } from "@/components/ecosystem/EcoCardLink";
import {
  COMMUNITY_VERTICALS,
  REGION_VERTICALS,
} from "@/lib/ecosystem/verticals";
import { slugFromEcoHref } from "@/lib/eco-vt-name";
import { Reveal } from "@/components/trinexus/ui/Reveal";
import { TransitionLink } from "@/components/trinexus/ui/TransitionLink";
import { T, THtml } from "@/components/trinexus/ui/T";

type AreaVertical = {
  href: string;
  titleKey: string;
  leadKey: string;
  imageKey: string;
  featured?: boolean;
};

const AREA_PAGE_SIZE_DESKTOP = 3;
const AREA_PAGE_SIZE_MOBILE = 1;

function AreaCard({ vertical }: { vertical: AreaVertical }) {
  return (
    <EcoCardLink
      href={vertical.href}
      slug={slugFromEcoHref(vertical.href)}
      titleKey={vertical.titleKey}
      leadKey={vertical.leadKey}
      imageKey={vertical.imageKey}
      featured={vertical.featured}
    />
  );
}

function AreasCarousel({ verticals }: { verticals: readonly AreaVertical[] }) {
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(AREA_PAGE_SIZE_DESKTOP);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)");
    const syncPageSize = () => {
      setPageSize(mq.matches ? AREA_PAGE_SIZE_MOBILE : AREA_PAGE_SIZE_DESKTOP);
      setPage(0);
    };
    syncPageSize();
    mq.addEventListener("change", syncPageSize);
    return () => mq.removeEventListener("change", syncPageSize);
  }, []);

  const pages = useMemo(() => {
    const chunks: AreaVertical[][] = [];
    for (let i = 0; i < verticals.length; i += pageSize) {
      chunks.push(verticals.slice(i, i + pageSize));
    }
    return chunks;
  }, [verticals, pageSize]);

  useEffect(() => {
    setPage((current) => Math.min(current, Math.max(0, pages.length - 1)));
  }, [pages.length]);

  const canPrev = page > 0;
  const canNext = page < pages.length - 1;

  return (
    <div className="areas-carousel">
      <div className="areas-carousel-viewport">
        <div
          className="areas-carousel-track"
          style={{
            width: `${pages.length * 100}%`,
            transform: `translateX(-${(page * 100) / pages.length}%)`,
          }}
        >
          {pages.map((group, pageIndex) => (
            <ul
              key={pageIndex}
              className="areas-carousel-page"
              style={{ width: `${100 / pages.length}%` }}
              aria-hidden={pageIndex !== page}
            >
              {group.map((vertical) => (
                <li key={vertical.href}>
                  <AreaCard vertical={vertical} />
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
      {pages.length > 1 && (
        <div className="areas-carousel-nav">
          <button
            type="button"
            className="areas-carousel-btn"
            onClick={() => setPage((p) => Math.max(0, p - 1))}
            disabled={!canPrev}
            aria-label="Anterior"
          >
            ←
          </button>
          <div className="areas-carousel-dots" role="tablist">
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
            className="areas-carousel-btn"
            onClick={() => setPage((p) => Math.min(pages.length - 1, p + 1))}
            disabled={!canNext}
            aria-label="Siguiente"
          >
            →
          </button>
        </div>
      )}
    </div>
  );
}

export function EcosystemSection() {
  return (
    <section className="dark areas-sec" id="ecosystem">
      <div className="wrap">
        <Reveal className="sec-head sec-head--split-invert">
          <p className="lead">
            <T k="areas.lead" />
          </p>
          <h2 className="h-xl">
            <THtml k="areas.h" />
          </h2>
        </Reveal>

        <Reveal className="areas-block" id="comunidad">
          <h3 className="areas-family">
            <T k="nav.family.community" />
          </h3>
          <AreasCarousel verticals={COMMUNITY_VERTICALS} />
        </Reveal>

        <Reveal className="areas-block" id="region">
          <h3 className="areas-family">
            <T k="nav.family.region" />
          </h3>
          <AreasCarousel verticals={REGION_VERTICALS} />
        </Reveal>

        <Reveal className="areas-cta">
          <TransitionLink href="/ecosistema" className="btn btn-ghost">
            <T k="areas.seeAll" />
          </TransitionLink>
        </Reveal>
      </div>
    </section>
  );
}
