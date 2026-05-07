import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { email, brandName, productName, storeHTML, planSummary } = await req.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: "Ember <onboarding@resend.dev>",
      to: [email],
      subject: `Your ${brandName} store is ready 🔥`,
      html: `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Your Ember store is ready</title>
</head>
<body style="margin:0;padding:0;background:#fef3e2;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background:#fef3e2;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="text-align:center;padding-bottom:32px;">
              <div style="font-size:32px;margin-bottom:8px;">🔥</div>
              <div style="font-size:24px;font-weight:800;color:#111827;letter-spacing:-0.03em;">Ember</div>
            </td>
          </tr>

          <!-- Main card -->
          <tr>
            <td style="background:white;border-radius:20px;padding:40px;box-shadow:0 4px 24px rgba(0,0,0,0.06);">

              <h1 style="font-size:28px;font-weight:800;color:#111827;margin:0 0 8px;letter-spacing:-0.03em;">
                Your ${brandName} store is ready
              </h1>
              <p style="font-size:16px;color:#6b7280;margin:0 0 32px;line-height:1.6;">
                You just built a complete ecommerce business for <strong style="color:#111827;">${productName}</strong>. 
                Here's everything you need to launch.
              </p>

              <!-- Steps -->
              <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom:32px;">
                <tr>
                  <td style="padding:16px;background:#fff9f0;border-radius:12px;border-left:4px solid #EA580C;margin-bottom:12px;display:block;">
                    <div style="font-size:12px;font-weight:700;color:#EA580C;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:4px;">Step 1</div>
                    <div style="font-size:15px;font-weight:600;color:#111827;">Download your store</div>
                    <div style="font-size:13px;color:#6b7280;margin-top:4px;">Your store HTML is attached to this email. Open it in any browser to see it live.</div>
                  </td>
                </tr>
                <tr><td style="height:10px;"></td></tr>
                <tr>
                  <td style="padding:16px;background:#fff9f0;border-radius:12px;border-left:4px solid #EA580C;">
                    <div style="font-size:12px;font-weight:700;color:#EA580C;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:4px;">Step 2</div>
                    <div style="font-size:15px;font-weight:600;color:#111827;">Upload to Shopify or your store</div>
                    <div style="font-size:13px;color:#6b7280;margin-top:4px;">Copy the HTML into Shopify, Wix, or any website builder. Your brand is ready to go.</div>
                  </td>
                </tr>
                <tr><td style="height:10px;"></td></tr>
                <tr>
                  <td style="padding:16px;background:#fff9f0;border-radius:12px;border-left:4px solid #EA580C;">
                    <div style="font-size:12px;font-weight:700;color:#EA580C;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:4px;">Step 3</div>
                    <div style="font-size:15px;font-weight:600;color:#111827;">Follow your sales playbook</div>
                    <div style="font-size:13px;color:#6b7280;margin-top:4px;">Use your hooks, angles and supplier details to start getting your first sales.</div>
                  </td>
                </tr>
              </table>

              ${planSummary ? `
              <!-- Plan summary -->
              <div style="background:#f9fafb;border-radius:12px;padding:20px;margin-bottom:32px;">
                <div style="font-size:12px;font-weight:700;color:#9ca3af;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:12px;">Your business plan</div>
                <div style="font-size:14px;color:#374151;line-height:1.7;">${planSummary}</div>
              </div>
              ` : ""}

              <!-- CTA -->
              <div style="text-align:center;">
                <a href="https://ember-ai-six.vercel.app" 
                  style="display:inline-block;padding:16px 40px;background:linear-gradient(135deg,#F59E0B,#EA580C,#FB7185);color:white;font-weight:700;font-size:16px;border-radius:12px;text-decoration:none;box-shadow:0 8px 24px rgba(234,88,12,0.3);">
                  Build another business →
                </a>
              </div>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="text-align:center;padding:28px 0 0;">
              <p style="font-size:13px;color:#9ca3af;margin:0;">
                Built with <strong>Ember</strong> · <a href="https://ember-ai-six.vercel.app" style="color:#EA580C;text-decoration:none;">ember-ai-six.vercel.app</a>
              </p>
              <p style="font-size:12px;color:#d1d5db;margin:8px 0 0;">
                You're receiving this because you built a business on Ember.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
      `,
      attachments: storeHTML ? [
        {
          filename: `${brandName.toLowerCase().replace(/\s+/g, "-")}-store.html`,
          content: Buffer.from(storeHTML).toString("base64"),
        }
      ] : [],
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
    }

    console.log("Email sent:", data);
    return NextResponse.json({ success: true });

  } catch (e) {
    console.error("Send store email error:", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}