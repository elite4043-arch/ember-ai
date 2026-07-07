// app/api/analytics/route.ts
// ─────────────────────────────────────────────────────────────
// Returns analytics for a store owner's dashboard:
// total views, views today, live visitors, and a 7-day series.
// ─────────────────────────────────────────────────────────────
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");
  if (!email) {
    return NextResponse.json({ analytics: null });
  }

  // Find the user's published store subdomain
  const { data: store } = await supabase
    .from("stores")
    .select("subdomain")
    .eq("email", email)
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(1)
    .single();

  if (!store?.subdomain) {
    return NextResponse.json({
      analytics: { hasStore: false, totalViews: 0, viewsToday: 0, liveNow: 0, series: [] },
    });
  }

  const sub = store.subdomain;
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).toISOString();
  const sixtySecAgo = new Date(now.getTime() - 60 * 1000).toISOString();
  const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();

  // Total views (pageviews only, not heartbeats)
  const { count: totalViews } = await supabase
    .from("page_views")
    .select("*", { count: "exact", head: true })
    .eq("subdomain", sub)
    .eq("is_view", true);

  // Views today
  const { count: viewsToday } = await supabase
    .from("page_views")
    .select("*", { count: "exact", head: true })
    .eq("subdomain", sub)
    .eq("is_view", true)
    .gte("created_at", startOfToday);

  // Live now — distinct visitors active in the last 60 seconds
  const { data: liveRows } = await supabase
    .from("page_views")
    .select("visitor_id")
    .eq("subdomain", sub)
    .gte("created_at", sixtySecAgo);

  const liveNow = new Set((liveRows || []).map((r: any) => r.visitor_id)).size;

  // 7-day series (views per day)
  const { data: weekRows } = await supabase
    .from("page_views")
    .select("created_at")
    .eq("subdomain", sub)
    .eq("is_view", true)
    .gte("created_at", sevenDaysAgo);

  // Bucket into days
  const series: { day: string; views: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    const label = d.toLocaleDateString("en-GB", { weekday: "short" });
    const dayStart = new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime();
    const dayEnd = dayStart + 24 * 60 * 60 * 1000;
    const count = (weekRows || []).filter((r: any) => {
      const t = new Date(r.created_at).getTime();
      return t >= dayStart && t < dayEnd;
    }).length;
    series.push({ day: label, views: count });
  }

  return NextResponse.json({
    analytics: {
      hasStore: true,
      subdomain: sub,
      totalViews: totalViews || 0,
      viewsToday: viewsToday || 0,
      liveNow,
      series,
    },
  });
}
