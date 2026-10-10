import { NextResponse } from "next/server";
import { addEvent, getEvents } from "@/lib/storage/store";

export async function GET() {
  return NextResponse.json(getEvents());
}

export async function POST(request: Request) {
  const body = await request.json();
  const slug = body.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
  const event = addEvent({
    slug: `${slug}-${Date.now()}`,
    title: body.title,
    date: body.date,
    cityId: body.cityId,
    organizer: body.organizer,
    tags: body.tags?.split(",").map((t: string) => t.trim()) ?? [],
    description: body.description,
    qrToken: `evt-${slug}-${Date.now()}`,
  });
  return NextResponse.json(event, { status: 201 });
}
