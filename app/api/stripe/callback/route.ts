// app/api/stripe/callback/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-06-24.dahlia" });
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://www.useember.io").replace(/^http:/, "https:");
  const accountId = req.nextUrl.searchParams.get("account");
  const storeId = req.nextUrl.searchParams.get("store");

  if (!accountId || !storeId) {
    return NextResponse.redirect(`${siteUrl}/dashboard?stripe=error`);
  }

  try {
    const account = await stripe.accounts.retrieve(accountId);
    const isOnboarded = account.charges_enabled && account.payouts_enabled;

    await supabase
      .from("stores")
      .update({ stripe_account_id: accountId, stripe_onboarded: isOnboarded })
      .eq("id", storeId);

    return NextResponse.redirect(
      `${siteUrl}/dashboard?stripe=${isOnboarded ? "success" : "pending"}`
    );
  } catch (err) {
    console.error("STRIPE CALLBACK ERROR:", err);
    return NextResponse.redirect(`${siteUrl}/dashboard?stripe=error`);
  }
}
