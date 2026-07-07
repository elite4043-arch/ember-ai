// app/store/[slug]/success/page.tsx
// ─────────────────────────────────────────────────────────────
// Order confirmation page shown after successful Stripe checkout
// ─────────────────────────────────────────────────────────────
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ slug: string }> };

export default async function SuccessPage({ params }: Props) {
  const { slug } = await params;

  const { data: store } = await supabase
    .from("stores")
    .select("brand, product_name")
    .eq("subdomain", slug)
    .eq("published", true)
    .single();

  if (!store) notFound();

  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif", background: "#f9fafb", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", padding: "60px 24px", maxWidth: "480px" }}>
          <div style={{ fontSize: "56px", marginBottom: "16px" }}>✅</div>
          <h1 style={{ fontSize: "28px", fontWeight: 800, color: "#111827", marginBottom: "12px", letterSpacing: "-0.03em" }}>
            Order confirmed!
          </h1>
          <p style={{ fontSize: "16px", color: "#6b7280", lineHeight: 1.7, marginBottom: "28px" }}>
            Thank you for your purchase from <strong>{store.brand}</strong>.
            You'll receive a confirmation email shortly.
          </p>
          <a
            href={`https://${slug}.useember.io`}
            style={{ display: "inline-block", padding: "14px 32px", background: "#111827", color: "white", borderRadius: "12px", fontSize: "15px", fontWeight: 700, textDecoration: "none" }}
          >
            ← Back to {store.brand}
          </a>
          <div style={{ marginTop: "32px", fontSize: "12px", color: "#9ca3af" }}>
            Powered by <a href="https://www.useember.io" style={{ color: "#EA580C", fontWeight: 600, textDecoration: "none" }}>Ember</a> 🔥
          </div>
        </div>
      </body>
    </html>
  );
}
