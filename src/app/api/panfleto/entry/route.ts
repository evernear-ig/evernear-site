import { NextResponse } from "next/server";
import { addPanfletoEntry } from "@/lib/storage/store";

export async function POST(request: Request) {
  const { businessName, promo } = await request.json();
  if (!businessName || !promo) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }
  addPanfletoEntry(businessName, promo);
  return NextResponse.json({ ok: true });
}
