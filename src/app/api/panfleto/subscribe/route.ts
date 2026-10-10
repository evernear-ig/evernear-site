import { NextResponse } from "next/server";
import { subscribePanfleto } from "@/lib/storage/store";

export async function POST(request: Request) {
  const { email } = await request.json();
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 });
  }
  const ok = subscribePanfleto(email);
  return NextResponse.json({ ok, message: ok ? "subscribed" : "already_subscribed" });
}
