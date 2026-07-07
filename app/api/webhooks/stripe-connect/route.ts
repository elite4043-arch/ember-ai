// app/api/webhooks/stripe-connect/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

function orderConfirmationHtml(opts: {
  customerName: string;
  productName: string;
  brandName: string;
  amountPence: number;
  currency: string;
  shippingAddress?: string | null;
  isDigital: boolean;
}) {
  const amount = `£${(opts.amountPence / 100).toFixed(2)}`;
  const addr = opts.shippingAddress ? (() => {
    try { const a = JSON.parse(opts.shippingAddress!); return [a.line1,a.line2,a.city,a.postal_code,a.country].filter(Boolean).join(", "); }
    catch { return opts.shippingAddress; }
  })() : null;

  return `<!DOCTYPE html><html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f9fafb;padding:40px 20px;">
<tr><td align="center">
<table width="560" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">
  <tr><td style="text-align:center;padding-bottom:28px;">
    <div style="font-size:32px;margin-bottom:6px;">🔥</div>
    <div style="font-size:20px;font-weight:800;color:#111827;">${opts.brandName}</div>
  </td></tr>
  <tr><td style="background:#fff;border-radius:20px;padding:36px;box-shadow:0 2px 16px rgba(0,0,0,0.06);">
    <div style="text-align:center;margin-bottom:28px;">
      <div style="font-size:48px;margin-bottom:12px;">✅</div>
      <h1 style="font-size:24px;font-weight:800;color:#111827;margin:0 0 8px;letter-spacing:-0.02em;">Order confirmed!</h1>
      <p style="font-size:15px;color:#6b7280;margin:0;line-height:1.6;">Thanks ${opts.customerName ? opts.customerName.split(" ")[0] : "for your order"}! We've received your order and ${opts.isDigital ? "it's being processed now." : "we're getting it ready to ship."}</p>
    </div>
    <div style="background:#f9fafb;border-radius:14px;padding:20px;margin-bottom:24px;">
      <div style="font-size:11px;font-weight:700;color:#9ca3af;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:14px;">Order summary</div>
      <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:12px;">
        <div>
          <div style="font-size:15px;font-weight:700;color:#111827;margin-bottom:4px;">${opts.productName}</div>
          ${addr ? `<div style="font-size:12px;color:#6b7280;line-height:1.5;">Delivering to: ${addr}</div>` : ""}
        </div>
        <div style="font-size:20px;font-weight:800;color:#111827;white-space:nowrap;">${amount}</div>
      </div>
    </div>
    ${!opts.isDigital ? `<div style="background:rgba(234,88,12,0.04);border:1px solid rgba(234,88,12,0.15);border-radius:14px;padding:16px;margin-bottom:24px;">
      <div style="font-size:13px;font-weight:600;color:#EA580C;margin-bottom:4px;">📦 Estimated delivery</div>
      <div style="font-size:13px;color:#374151;">3–7 business days. You'll get an email when your order ships.</div>
    </div>` : ""}
    <div style="text-align:center;">
      <p style="font-size:13px;color:#9ca3af;margin:0 0 16px;">Questions? Reply to this email and we'll help.</p>
    </div>
  </td></tr>
  <tr><td style="text-align:center;padding:24px 0 0;">
    <p style="font-size:12px;color:#9ca3af;margin:0;">Powered by <a href="https://www.useember.io" style="color:#EA580C;font-weight:600;text-decoration:none;">Ember</a> 🔥</p>
  </td></tr>
</table>
</td></tr>
</table>
</body></html>`;
}

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2026-06-24.dahlia" });
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const resend = new Resend(process.env.RESEND_API_KEY);
  const webhookSecret = process.env.STRIPE_CONNECT_WEBHOOK_SECRET!;

  const body = await req.text();
  const sig = req.headers.get("stripe-signature");
  if (!sig) return NextResponse.json({ error: "No signature" }, { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
  } catch (err: any) {
    console.error("WEBHOOK SIGNATURE ERROR:", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        const storeId = session.metadata?.ember_store_id;
        const subdomain = session.metadata?.subdomain;
        const productName = session.metadata?.product_name;
        if (!storeId) { console.warn("No ember_store_id in metadata"); break; }

        const shippingDetails = (session as any).collected_information?.shipping_details
          ?? session.shipping_details;

        const { data: order } = await supabase.from("orders").insert({
          store_id: storeId,
          subdomain: subdomain || null,
          product_name: productName || null,
          amount_pence: session.amount_total || 0,
          currency: session.currency || "gbp",
          customer_email: session.customer_details?.email || null,
          customer_name: session.customer_details?.name || null,
          shipping_name: shippingDetails?.name || session.customer_details?.name || null,
          shipping_address: shippingDetails?.address ? JSON.stringify(shippingDetails.address) : null,
          stripe_session_id: session.id,
          stripe_payment_intent: typeof session.payment_intent === "string"
            ? session.payment_intent
            : (session.payment_intent as Stripe.PaymentIntent)?.id || null,
          status: "paid",
        }).select().single();

        console.log(`ORDER: ${subdomain} — ${productName} — £${(session.amount_total || 0) / 100}`);

        // Send order confirmation email to customer
        const customerEmail = session.customer_details?.email;
        if (customerEmail && process.env.RESEND_API_KEY) {
          const { data: storeRow } = await supabase
            .from("stores")
            .select("brand, is_digital")
            .eq("id", storeId)
            .single();

          const brandName = storeRow?.brand || productName || "Your Store";

          await resend.emails.send({
            from: "Orders <orders@useember.io>",
            to: [customerEmail],
            subject: `Order confirmed — ${productName || brandName} ✅`,
            html: orderConfirmationHtml({
              customerName: session.customer_details?.name || "",
              productName: productName || brandName,
              brandName,
              amountPence: session.amount_total || 0,
              currency: session.currency || "gbp",
              shippingAddress: shippingDetails?.address ? JSON.stringify(shippingDetails.address) : null,
              isDigital: storeRow?.is_digital || false,
            }),
          });
          console.log(`CONFIRMATION EMAIL sent to ${customerEmail}`);
        }
        break;
      }

      case "account.updated": {
        const account = event.data.object as Stripe.Account;
        const isOnboarded = account.charges_enabled && account.payouts_enabled;
        await supabase.from("stores").update({ stripe_onboarded: isOnboarded }).eq("stripe_account_id", account.id);
        console.log(`ACCOUNT: ${account.id} — onboarded: ${isOnboarded}`);
        break;
      }

      default:
        console.log(`Unhandled event: ${event.type}`);
    }
    return NextResponse.json({ received: true });
  } catch (err: any) {
    console.error("WEBHOOK PROCESSING ERROR:", err);
    return NextResponse.json({ error: "Webhook processing failed" }, { status: 500 });
  }
}
