// app/api/track/route.ts
// ─────────────────────────────────────────────────────────────
// Records a pageview or heartbeat from a live store.
// Called by the tracking script injected into every store.
// ─────────────────────────────────────────────────────────────
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  try {
    const { subdomain, visitorId, referrer, isView } = await req.json();

    if (!subdomain || !visitorId) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    // Basic sanity limits
    const cleanSub = String(subdomain).toLowerCase().slice(0, 63);
    const cleanVisitor = String(visitorId).slice(0, 64);
    const cleanRef = referrer ? String(referrer).slice(0, 300) : null;

    await supabase.from("page_views").insert({
      subdomain: cleanSub,
      visitor_id: cleanVisitor,
      referrer: cleanRef,
      is_view: isView !== false, // default true
    });

    return NextResponse.json({ ok: true });
  } catch {
    // Never let analytics break the store — fail silently
    return NextResponse.json({ ok: false });
  }
}
