import { NextResponse } from "next/server";
import { getEvents } from "@/lib/storage/store";
import { BUSINESSES } from "@/data/commerce";
import { getPanfletoEntries } from "@/lib/storage/store";

export async function GET() {
  const events = getEvents().slice(0, 3);
  const businesses = BUSINESSES.filter((b) => b.panfletoSubscribed);
  const entries = getPanfletoEntries();
  return NextResponse.json({ events, businesses, entries });
}
