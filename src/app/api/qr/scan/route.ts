import { NextRequest, NextResponse } from "next/server";
import { getQrScanCount, recordQrScan } from "@/lib/storage/store";

const LOYALTY_THRESHOLD = 20;

export async function POST(request: Request) {
  const { token } = await request.json();
  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }
  const scan = recordQrScan(token);
  const rewardEligible = scan.count >= LOYALTY_THRESHOLD;
  return NextResponse.json({
    count: scan.count,
    rewardEligible,
    threshold: LOYALTY_THRESHOLD,
  });
}

export async function GET(request: NextRequest) {
  const token = request.nextUrl.searchParams.get("token");
  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }
  const count = getQrScanCount(token);
  return NextResponse.json({
    count,
    rewardEligible: count >= LOYALTY_THRESHOLD,
    threshold: LOYALTY_THRESHOLD,
  });
}
