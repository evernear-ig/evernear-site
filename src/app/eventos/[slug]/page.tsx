import Link from "next/link";
import { notFound } from "next/navigation";
import { SEED_EVENTS } from "@/data/events";
import { getEventBySlug } from "@/lib/storage/store";
import { VerticalPageShell } from "@/components/ecosystem/VerticalPageShell";
import { CityBadge } from "@/components/ecosystem/CityBadge";
import { EventQrBlock } from "@/components/ecosystem/EventQrBlock";
import { T } from "@/components/trinexus/ui/T";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return SEED_EVENTS.map((e) => ({ slug: e.slug }));
}

export default async function EventPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = getEventBySlug(slug);
  if (!event) notFound();

  return (
    <VerticalPageShell verticalSlug="eventos">
      <article className="eco-detail">
        <h2 className="h-xl" style={{ fontSize: "clamp(1.6rem,3.5vw,2.4rem)" }}>
          {event.title}
        </h2>
        <p className="eco-entity-sub">{event.organizer}</p>
        <CityBadge cityId={event.cityId} />
        <p className="eco-entity-meta">{event.date}</p>
        <p style={{ marginTop: "1.5em" }}>{event.description}</p>
        <ul className="skill-tags">
          {event.tags.map((tag) => (
            <li key={tag}>{tag}</li>
          ))}
        </ul>
        <EventQrBlock token={event.qrToken} />
        <Link href="/eventos" className="btn btn-outline-ink btn-sm" style={{ marginTop: "2em" }}>
          <T k="eco.back" />
        </Link>
      </article>
    </VerticalPageShell>
  );
}
