import { NextResponse } from "next/server";
import {
  getNextPulsoDate,
  PULSO_CONFIG,
} from "@/lib/ecosystem/pulso-config";
import {
  getPulsoEdition,
  getPulsoItems,
  getRecentWeekKeys,
} from "@/lib/ecosystem/pulso";
import { ECOSYSTEM_VERTICALS } from "@/lib/ecosystem/verticals";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const vertical = searchParams.get("vertical") ?? "all";
  const city = searchParams.get("city") ?? "all";
  const category = searchParams.get("category") ?? "all";
  const week = searchParams.get("week") ?? undefined;

  const items = getPulsoItems({ vertical, city, category, week });
  const edition = getPulsoEdition(week);
  const nextPublishAt = getNextPulsoDate().toISOString();

  return NextResponse.json({
    items,
    edition,
    nextPublishAt,
    liveSessionAt: PULSO_CONFIG.liveSessionAt,
    liveEmbedUrl: PULSO_CONFIG.liveEmbedUrl,
    weekKeys: getRecentWeekKeys(8),
    verticals: ECOSYSTEM_VERTICALS.map((v) => ({
      slug: v.slug,
      navKey: v.navKey,
    })),
  });
}
