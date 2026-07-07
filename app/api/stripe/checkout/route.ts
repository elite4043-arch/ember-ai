// app/api/stripe/checkout/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

function getCorsHeaders(req: NextRequest) {
  const origin = req.headers.get("origin") || "";
  // Allow any *.useember.io subdomain (store pages) and the main domain
  const allowed =
    origin === "https://www.useember.io" ||
    origin.endsWith(".useember.io");
  return {
    "Access-Control-Allow-Origin": allowed ? origin : "https://www.useember.io",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Credentials": "false",
  };
}

// Handle CORS preflight
export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, { status: 204, headers: getCorsHeaders(req) });
}

export async function POST(req: NextRequest) {
  const corsHeaders = getCorsHeaders(req);
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-06-24.dahlia" });
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

  try {
    const { storeId, subdomain, quantity } = await req.json();
    const qty = Math.max(1, Math.min(parseInt(quantity) || 1, 10));

    if (!storeId && !subdomain) {
      return NextResponse.json({ error: "Missing storeId or subdomain" }, { status: 400, headers: corsHeaders });
    }

    const query = storeId
      ? supabase.from("stores").select("*").eq("id", storeId).single()
      : supabase.from("stores").select("*").eq("subdomain", subdomain).eq("published", true).single();

    const { data: store, error } = await query;

    if (error || !store) {
      return NextResponse.json({ error: "Store not found" }, { status: 404, headers: corsHeaders });
    }

    // Auto-heal: if account exists in DB but onboarded flag is stale, check Stripe directly
    if (store.stripe_account_id && !store.stripe_onboarded) {
      try {
        const acct = await stripe.accounts.retrieve(store.stripe_account_id);
        if (acct.charges_enabled && acct.payouts_enabled) {
          await supabase.from("stores").update({ stripe_onboarded: true }).eq("id", store.id);
          store.stripe_onboarded = true;
        }
      } catch (e) {
        console.error("Stripe account check failed:", e);
      }
    }

    if (!store.stripe_account_id || !store.stripe_onboarded) {
      return NextResponse.json(
        { error: "Store payments not set up yet. Complete Stripe setup in your dashboard." },
        { status: 400, headers: corsHeaders }
      );
    }

    // Fallback: extract price from string field if price_pence is missing
    if (!store.price_pence || store.price_pence < 100) {
      if (store.price) {
        const extracted = Math.round(parseFloat(String(store.price).replace(/[^0-9.]/g, "")) * 100);
        if (extracted >= 100) {
          store.price_pence = extracted;
          await supabase.from("stores").update({ price_pence: extracted }).eq("id", store.id);
        }
      }
    }

    if (!store.price_pence || store.price_pence < 100) {
      console.error("CHECKOUT: invalid price_pence:", store.price_pence, "price:", store.price, "store:", store.id);
      return NextResponse.json(
        { error: "Invalid product price — set a price in your store settings" },
        { status: 400, headers: corsHeaders }
      );
    }

    console.log("CHECKOUT: store", store.id, "price_pence", store.price_pence, "stripe_account_id", store.stripe_account_id, "stripe_onboarded", store.stripe_onboarded);

    const storeUrl = `https://${store.subdomain}.useember.io`;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: store.currency || "gbp",
            unit_amount: store.price_pence,
            product_data: {
              name: store.product_name || store.brand || "Product",
              description: store.description || undefined,
            },
          },
          quantity: qty,
        },
      ],
      ...(store.shipping_pence && store.shipping_pence > 0
        ? {
            shipping_options: [
              {
                shipping_rate_data: {
                  type: "fixed_amount",
                  fixed_amount: { amount: store.shipping_pence, currency: store.currency || "gbp" },
                  display_name: "Standard Shipping",
                  delivery_estimate: {
                    minimum: { unit: "business_day", value: 3 },
                    maximum: { unit: "business_day", value: 7 },
                  },
                },
              },
            ],
          }
        : {}),
      ...(store.is_digital ? {} : { shipping_address_collection: { allowed_countries: ["GB"] } }),
      payment_intent_data: {
        transfer_data: { destination: store.stripe_account_id },
      },
      success_url: `${storeUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: storeUrl,
      metadata: {
        ember_store_id: store.id,
        subdomain: store.subdomain,
        product_name: store.product_name || "",
      },
    });

    return NextResponse.json({ url: session.url }, { headers: corsHeaders });
  } catch (err: any) {
    console.error("CHECKOUT ERROR:", err);
    return NextResponse.json(
      { error: err.message || "Failed to create checkout session" },
      { status: 500, headers: corsHeaders }
    );
  }
}
