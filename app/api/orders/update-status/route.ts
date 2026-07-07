// app/api/orders/update-status/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

function dispatchedHtml(opts: { customerName: string; productName: string; brandName: string }) {
  const firstName = opts.customerName ? opts.customerName.split(" ")[0] : "there";
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
      <div style="font-size:48px;margin-bottom:12px;">🚀</div>
      <h1 style="font-size:24px;font-weight:800;color:#111827;margin:0 0 8px;letter-spacing:-0.02em;">Your order is on its way!</h1>
      <p style="font-size:15px;color:#6b7280;margin:0;line-height:1.6;">Hi ${firstName}! Great news — your <strong style="color:#111827;">${opts.productName}</strong> has been dispatched and is heading your way.</p>
    </div>
    <div style="background:rgba(234,88,12,0.04);border:1px solid rgba(234,88,12,0.15);border-radius:14px;padding:20px;margin-bottom:24px;">
      <div style="font-size:13px;font-weight:600;color:#EA580C;margin-bottom:8px;">📦 What happens next</div>
      <div style="font-size:13px;color:#374151;line-height:1.7;">Your order is now with the carrier. Estimated delivery is <strong>2–5 business days</strong>. We'll send another email when it arrives.</div>
    </div>
    <p style="font-size:13px;color:#9ca3af;text-align:center;margin:0;">Questions? Reply to this email and we'll sort it out.</p>
  </td></tr>
  <tr><td style="text-align:center;padding:24px 0 0;">
    <p style="font-size:12px;color:#9ca3af;margin:0;">Powered by <a href="https://www.useember.io" style="color:#EA580C;font-weight:600;text-decoration:none;">Ember</a> 🔥</p>
  </td></tr>
</table>
</td></tr>
</table>
</body></html>`;
}

function deliveredHtml(opts: { customerName: string; productName: string; brandName: string }) {
  const firstName = opts.customerName ? opts.customerName.split(" ")[0] : "there";
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
      <div style="font-size:48px;margin-bottom:12px;">🎉</div>
      <h1 style="font-size:24px;font-weight:800;color:#111827;margin:0 0 8px;letter-spacing:-0.02em;">Your order has arrived!</h1>
      <p style="font-size:15px;color:#6b7280;margin:0;line-height:1.6;">Hi ${firstName}! Your <strong style="color:#111827;">${opts.productName}</strong> should be with you now. We hope you love it!</p>
    </div>
    <div style="background:#f9fafb;border-radius:14px;padding:20px;margin-bottom:24px;">
      <div style="font-size:13px;font-weight:600;color:#374151;margin-bottom:8px;">How was your experience?</div>
      <div style="font-size:13px;color:#6b7280;line-height:1.7;">We'd love to hear what you think. If anything isn't right, just reply to this email and we'll make it right — guaranteed.</div>
    </div>
    <div style="background:rgba(22,163,74,0.05);border:1px solid rgba(22,163,74,0.2);border-radius:14px;padding:16px;text-align:center;">
      <div style="font-size:13px;font-weight:600;color:#16A34A;">✓ 30-day money-back guarantee</div>
      <div style="font-size:12px;color:#6b7280;margin-top:4px;">Not happy? We'll sort it — no questions asked.</div>
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
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { order_id, status, seller_email } = await req.json();

    if (!order_id || !status || !seller_email) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    if (!["dispatched", "delivered"].includes(status)) {
      return NextResponse.json({ error: "Invalid status" }, { status: 400 });
    }

    // Fetch order + verify seller owns the store
    const { data: order, error: orderErr } = await supabase
      .from("orders")
      .select("*, stores(brand, product_name, email, is_digital)")
      .eq("id", order_id)
      .single();

    if (orderErr || !order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    const store = (order as any).stores;
    if (!store || store.email !== seller_email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Update order status
    const { error: updateErr } = await supabase
      .from("orders")
      .update({ status })
      .eq("id", order_id);

    if (updateErr) {
      return NextResponse.json({ error: "Failed to update status" }, { status: 500 });
    }

    // Send email to customer
    const customerEmail = order.customer_email;
    const productName = order.product_name || store.product_name || "your order";
    const brandName = store.brand || productName;
    const customerName = order.customer_name || order.shipping_name || "";

    if (customerEmail && process.env.RESEND_API_KEY) {
      const emailOpts = { customerName, productName, brandName };

      if (status === "dispatched") {
        await resend.emails.send({
          from: "Orders <orders@useember.io>",
          to: [customerEmail],
          subject: `Your ${productName} is on its way! 🚀`,
          html: dispatchedHtml(emailOpts),
        });
      } else if (status === "delivered") {
        await resend.emails.send({
          from: "Orders <orders@useember.io>",
          to: [customerEmail],
          subject: `Your order has arrived! 🎉`,
          html: deliveredHtml(emailOpts),
        });
      }
      console.log(`STATUS EMAIL (${status}) sent to ${customerEmail}`);
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("UPDATE STATUS ERROR:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
