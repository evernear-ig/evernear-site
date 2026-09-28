import { NextResponse } from "next/server";
import { subscribePulso } from "@/lib/storage/store";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, notifyLive, interests } = body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  const cleanInterests = Array.isArray(interests)
    ? interests.map(String).filter(Boolean)
    : undefined;

  const created = subscribePulso(String(email), Boolean(notifyLive), cleanInterests);
  return NextResponse.json({ ok: true, created });
}
