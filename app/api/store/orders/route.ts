// app/api/store/orders/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

  const email = req.nextUrl.searchParams.get("email");
  if (!email) return NextResponse.json({ orders: [] });

  const { data: stores } = await supabase
    .from("stores")
    .select("id")
    .eq("email", email);

  if (!stores || stores.length === 0) {
    return NextResponse.json({ orders: [] });
  }

  const storeIds = stores.map((s: any) => s.id);

  const { data: orders } = await supabase
    .from("orders")
    .select("*")
    .in("store_id", storeIds)
    .order("created_at", { ascending: false })
    .limit(100);

  return NextResponse.json({ orders: orders || [] });
}
