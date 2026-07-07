import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

// Convert a price string like "£29.99" or "29.99" into integer pennies
function toPence(price: any): number | null {
  if (price === null || price === undefined) return null;
  const num = parseFloat(String(price).replace(/[^0-9.]/g, ""));
  if (isNaN(num) || num <= 0) return null;
  return Math.round(num * 100);
}

export async function POST(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  try {
    const {
      email,
      product_name,
      industry,
      brand_color,
      headline,
      subheadline,
      price,
      description,
      store_html,
      brand,
      is_digital,
    } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const cleanEmail = email.toLowerCase().trim();
    const price_pence = toPence(price);

    // Build the row payload
    const payload: any = {
      email: cleanEmail,
      product_name: product_name || null,
      industry: industry || null,
      brand_color: brand_color || "#ea580c",
      headline: headline || null,
      subheadline: subheadline || null,
      price: price || null,
      price_pence: price_pence,
      description: description || null,
      brand: brand || headline || product_name || null,
      is_digital: !!is_digital,
    };
    if (store_html) payload.store_html = store_html;

    // ── Find most recent UNPUBLISHED row for this email + product ──
    const { data: existing } = await supabase
      .from("stores")
      .select("id")
      .eq("email", cleanEmail)
      .eq("product_name", product_name || "")
      .eq("published", false)
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (existing?.id) {
      // Update the existing draft
      const { error } = await supabase
        .from("stores")
        .update(payload)
        .eq("id", existing.id);
      if (error) {
        console.error("Supabase store update error:", error);
        return NextResponse.json({ error: "Failed to save store" }, { status: 500 });
      }
      return NextResponse.json({ success: true, id: existing.id, updated: true });
    } else {
      // Insert a new draft
      const { data: inserted, error } = await supabase
        .from("stores")
        .insert(payload)
        .select("id")
        .single();
      if (error) {
        console.error("Supabase store insert error:", error);
        return NextResponse.json({ error: "Failed to save store" }, { status: 500 });
      }
      return NextResponse.json({ success: true, id: inserted?.id, updated: false });
    }
  } catch (e) {
    console.error("Store save API error:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}