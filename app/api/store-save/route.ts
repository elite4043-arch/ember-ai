import { createClient } from "@supabase/supabase-js";
import { NextRequest, NextResponse } from "next/server";

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
    } = await req.json();

    console.log("Store save request for:", email, product_name);

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const { error } = await supabase.from("stores").insert({
      email: email.toLowerCase().trim(),
      product_name: product_name || null,
      industry: industry || null,
      brand_color: brand_color || "#ea580c",
      headline: headline || null,
      subheadline: subheadline || null,
      price: price || null,
      description: description || null,
    });

    if (error) {
      console.error("Supabase store save error:", error);
      return NextResponse.json({ error: "Failed to save store" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Store save API error:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}