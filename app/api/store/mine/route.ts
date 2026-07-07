// app/api/store/mine/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

  const email = req.nextUrl.searchParams.get("email");
  if (!email) return NextResponse.json({ store: null });

  const { data: stores } = await supabase
    .from("stores")
    .select("id, email, subdomain, published, brand, product_name, description, price_pence, stripe_account_id, stripe_onboarded, is_digital, store_html, created_at")
    .eq("email", email)
    .order("created_at", { ascending: false });

  return NextResponse.json({ store: stores?.[0] || null, stores: stores || [] });
}
