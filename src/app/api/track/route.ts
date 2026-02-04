import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Forward to tracking server with product identifier
    const trackingPayload = {
      ...body,
      product: "hirescript",
      timestamp: new Date().toISOString(),
    };

    // Try to forward to tracking server (fail silently)
    try {
      await fetch("https://track.automatik.studio/api/event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(trackingPayload),
        signal: AbortSignal.timeout(3000),
      });
    } catch {
      // Tracking is best-effort, don't fail the request
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: true });
  }
}
