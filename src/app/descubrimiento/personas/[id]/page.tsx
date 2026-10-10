import Link from "next/link";
import { notFound } from "next/navigation";
import { PROFILES } from "@/data/discovery";
import { VerticalPageShell } from "@/components/ecosystem/VerticalPageShell";
import { CityBadge } from "@/components/ecosystem/CityBadge";
import { TrinexusPhoto } from "@/components/trinexus/ui/TrinexusPhoto";
import { T } from "@/components/trinexus/ui/T";

export function generateStaticParams() {
  return PROFILES.map((p) => ({ id: p.id }));
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const profile = PROFILES.find((p) => p.id === id);
  if (!profile) notFound();

  return (
    <VerticalPageShell verticalSlug="descubrimiento">
      <article className="eco-detail">
        <div className="eco-detail-photo">
          <TrinexusPhoto imageKey={profile.imageKey} />
        </div>
        <h2 className="h-xl" style={{ fontSize: "clamp(1.6rem,3.5vw,2.4rem)" }}>
          {profile.name}
        </h2>
        <p className="eco-entity-sub">{profile.role}</p>
        <CityBadge cityId={profile.cityId} />
        <blockquote style={{ marginTop: "1.5em", fontStyle: "italic" }}>
          &ldquo;{profile.quote}&rdquo;
        </blockquote>
        <ul className="skill-tags">
          {profile.skills.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ul>
        <Link href="/descubrimiento" className="btn btn-outline-ink btn-sm" style={{ marginTop: "2em" }}>
          <T k="eco.back" />
        </Link>
      </article>
    </VerticalPageShell>
  );
}
