"use client";

import { EcoCardLink } from "@/components/ecosystem/EcoCardLink";
import {
  COMMUNITY_VERTICALS,
  REGION_VERTICALS,
} from "@/lib/ecosystem/verticals";
import { slugFromEcoHref } from "@/lib/eco-vt-name";
import { Carousel } from "@/components/trinexus/ui/Carousel";
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
          <Carousel
            variant="cards"
            items={COMMUNITY_VERTICALS}
            itemsPerPage={{ desktop: 3, mobile: 1 }}
            stagger
            renderItem={(vertical) => <AreaCard vertical={vertical} />}
          />
        </Reveal>

        <Reveal className="areas-block" id="region">
          <h3 className="areas-family">
            <T k="nav.family.region" />
          </h3>
          <Carousel
            variant="cards"
            items={REGION_VERTICALS}
            itemsPerPage={{ desktop: 3, mobile: 1 }}
            stagger
            renderItem={(vertical) => <AreaCard vertical={vertical} />}
          />
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
