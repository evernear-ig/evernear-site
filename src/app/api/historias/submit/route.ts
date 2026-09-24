import { NextResponse } from "next/server";
import { submitStory } from "@/lib/storage/store";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, story, connectedWith, achievement, verticalSlug, cityId } =
    body;

  if (!name || !email || !story || !achievement) {
    return NextResponse.json({ ok: false, error: "missing_fields" }, { status: 400 });
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email))) {
    return NextResponse.json({ ok: false, error: "invalid_email" }, { status: 400 });
  }

  submitStory({
    name: String(name),
    email: String(email),
    story: String(story),
    connectedWith: String(connectedWith ?? ""),
    achievement: String(achievement),
    verticalSlug: String(verticalSlug ?? "descubrimiento"),
    cityId: String(cityId ?? "pi"),
  });

  return NextResponse.json({ ok: true });
}
