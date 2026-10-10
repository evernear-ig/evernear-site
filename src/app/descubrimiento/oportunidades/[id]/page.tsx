import Link from "next/link";
import { notFound } from "next/navigation";
import { OPPORTUNITIES } from "@/data/discovery";
import { VerticalPageShell } from "@/components/ecosystem/VerticalPageShell";
import { CityBadge } from "@/components/ecosystem/CityBadge";
import { T } from "@/components/trinexus/ui/T";

export function generateStaticParams() {
  return OPPORTUNITIES.map((o) => ({ id: o.id }));
}

export default async function OpportunityPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const opp = OPPORTUNITIES.find((o) => o.id === id);
  if (!opp) notFound();

  return (
    <VerticalPageShell verticalSlug="descubrimiento">
      <article className="eco-detail">
        <p className="eco-entity-badge">{opp.type}</p>
        <h2 className="h-xl" style={{ fontSize: "clamp(1.6rem,3.5vw,2.4rem)" }}>
          {opp.title}
        </h2>
        <p className="eco-entity-sub">{opp.company}</p>
        <CityBadge cityId={opp.cityId} />
        <p style={{ marginTop: "1.5em" }}>{opp.description}</p>
        <p className="eco-entity-meta" style={{ marginTop: "1em" }}>
          {opp.modality}
        </p>
        <Link href="/descubrimiento" className="btn btn-outline-ink btn-sm" style={{ marginTop: "2em" }}>
          <T k="eco.back" />
        </Link>
      </article>
    </VerticalPageShell>
  );
}
