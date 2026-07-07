// app/api/stripe/connect/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-06-24.dahlia" });
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

  try {
    const { email, storeId } = await req.json();

    if (!email || !storeId) {
      return NextResponse.json({ error: "Missing email or storeId" }, { status: 400 });
    }

    const { data: store } = await supabase
      .from("stores")
      .select("stripe_account_id, subdomain")
      .eq("id", storeId)
      .single();

    let accountId = store?.stripe_account_id;

    if (!accountId) {
      const account = await stripe.accounts.create({
        type: "express",
        email,
        country: "GB",
        capabilities: {
          card_payments: { requested: true },
          transfers: { requested: true },
        },
        business_type: "individual",
        metadata: {
          ember_store_id: storeId,
          subdomain: store?.subdomain || "",
        },
      });

      accountId = account.id;

      await supabase
        .from("stores")
        .update({ stripe_account_id: accountId })
        .eq("id", storeId);
    }

    const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.useember.io").replace(/^http:/, "https:");

    const accountLink = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: `${siteUrl}/dashboard?stripe=retry`,
      return_url: `${siteUrl}/api/stripe/callback?account=${accountId}&store=${storeId}`,
      type: "account_onboarding",
    });

    return NextResponse.json({ url: accountLink.url });
  } catch (err: any) {
    console.error("STRIPE CONNECT ERROR:", err);
    return NextResponse.json({ error: err.message || "Failed to create connect account" }, { status: 500 });
  }
}
