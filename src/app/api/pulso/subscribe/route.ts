import { NextResponse } from "next/server";
import { subscribePulso } from "@/lib/storage/store";

export async function POST(request: Request) {
  const body = await request.json();
  const { email, notifyLive } = body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  const created = subscribePulso(String(email), Boolean(notifyLive));
  return NextResponse.json({ ok: true, created });
}
