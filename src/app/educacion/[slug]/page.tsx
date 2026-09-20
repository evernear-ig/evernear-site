import Link from "next/link";
import { notFound } from "next/navigation";
import { COURSES } from "@/data/education";
import { VerticalPageShell } from "@/components/ecosystem/VerticalPageShell";
import { CityBadge } from "@/components/ecosystem/CityBadge";
import { T } from "@/components/trinexus/ui/T";

export function generateStaticParams() {
  return COURSES.map((c) => ({ slug: c.slug }));
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = COURSES.find((c) => c.slug === slug);
  if (!course) notFound();

  return (
    <VerticalPageShell verticalSlug="educacion">
      <article className="eco-detail">
        <p className="eco-entity-badge">{course.type}</p>
        <h2 className="h-xl" style={{ fontSize: "clamp(1.6rem,3.5vw,2.4rem)" }}>
          {course.title}
        </h2>
        <p className="eco-entity-sub">{course.institution}</p>
        <CityBadge cityId={course.cityId} />
        <p style={{ marginTop: "1.5em" }}>{course.description}</p>
        <p className="eco-entity-meta" style={{ marginTop: "1em" }}>
          {course.modality} · {course.country.toUpperCase()}
        </p>
        <Link href="/educacion" className="btn btn-outline-ink btn-sm" style={{ marginTop: "2em" }}>
          <T k="eco.back" />
        </Link>
      </article>
    </VerticalPageShell>
  );
}
