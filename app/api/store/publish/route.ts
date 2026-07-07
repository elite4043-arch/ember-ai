// app/api/store/publish/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const RESERVED = ["www", "api", "app", "admin", "mail", "staging", "dev"];

export async function POST(req: NextRequest) {
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

  try {
    const { email, subdomain, store_html: clientHtml, product_name, store_id } = await req.json();

    if (!email || !subdomain) {
      return NextResponse.json({ error: "Missing email or subdomain" }, { status: 400 });
    }

    const clean = subdomain.toLowerCase().replace(/[^a-z0-9-]/g, "").replace(/^-|-$/g, "");

    if (clean.length < 3) {
      return NextResponse.json({ error: "Subdomain must be at least 3 characters" }, { status: 400 });
    }

    if (RESERVED.includes(clean)) {
      return NextResponse.json({ error: "That subdomain is reserved" }, { status: 400 });
    }

    // Check subdomain isn't taken by a different user
    const { data: takenBy } = await supabase
      .from("stores")
      .select("id, email")
      .eq("subdomain", clean)
      .single();

    if (takenBy && takenBy.email !== email) {
      return NextResponse.json({ error: "That subdomain is already taken" }, { status: 409 });
    }

    // Find the right draft to publish:
    // 1. By explicit store_id (most reliable)
    // 2. By product_name + unpublished
    // 3. Most recent unpublished draft
    let draft: any = null;

    if (store_id) {
      const { data } = await supabase.from("stores").select("*").eq("id", store_id).eq("email", email).single();
      draft = data;
    }

    if (!draft && product_name) {
      const { data } = await supabase
        .from("stores").select("*")
        .eq("email", email).eq("product_name", product_name).eq("published", false)
        .order("created_at", { ascending: false }).limit(1).single();
      draft = data;
    }

    if (!draft) {
      const { data } = await supabase
        .from("stores").select("*")
        .eq("email", email).eq("published", false)
        .order("created_at", { ascending: false }).limit(1).single();
      draft = data;
    }

    const htmlToSave = draft?.store_html || clientHtml || null;

    if (!htmlToSave) {
      return NextResponse.json({ error: "Store has no content — build it first" }, { status: 400 });
    }

    let published: any;

    if (draft) {
      const { data, error } = await supabase
        .from("stores")
        .update({ subdomain: clean, published: true, store_html: htmlToSave })
        .eq("id", draft.id)
        .select().single();
      if (error) return NextResponse.json({ error: "Failed to publish" }, { status: 500 });
      published = data;
    } else {
      // No draft at all — create a new published row from client HTML
      const { data, error } = await supabase
        .from("stores")
        .insert({ email, product_name: product_name || "", subdomain: clean, published: true, store_html: clientHtml })
        .select().single();
      if (error) return NextResponse.json({ error: "Failed to publish" }, { status: 500 });
      published = data;
    }

    return NextResponse.json({ store: published });
  } catch (err) {
    console.error("PUBLISH ERROR:", err);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
