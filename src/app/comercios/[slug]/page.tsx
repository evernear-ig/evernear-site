import { notFound } from "next/navigation";
import { BUSINESSES } from "@/data/commerce";
import { VerticalPageShell } from "@/components/ecosystem/VerticalPageShell";
import { BusinessDetailContent } from "@/components/ecosystem/BusinessDetailContent";

export function generateStaticParams() {
  return BUSINESSES.map((b) => ({ slug: b.slug }));
}

export default async function BusinessPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const business = BUSINESSES.find((b) => b.slug === slug);
  if (!business) notFound();

  return (
    <VerticalPageShell verticalSlug="comercios">
      <BusinessDetailContent business={business} />
    </VerticalPageShell>
  );
}
