"use client";

import { useState } from "react";

const C = {
  amber:  "#F59E0B",
  orange: "#EA580C",
  pink:   "#FB7185",
  yellow: "#FDE047",
};
const GRAD = `linear-gradient(135deg,#FDE047,#F59E0B,#EA580C,#EF4444,#FB7185)`;

// ── Stripe payment links — replace with your actual links ──
const STRIPE = {
  proMonthly: "https://buy.stripe.com/aFa7sN7NZauQ4quccF6sw02",
  proAnnual:  "https://buy.stripe.com/28E3cx7NZfPa0ae7Wp6sw03",
  enterprise: "mailto:hello@useember.io?subject=Enterprise enquiry",
};

const FREE_FEATURES = [
  "Full idea → plan → store → playbook",
  "AI-scored product recommendations",
  "3-month business plan generator",
  "4 premium store templates",
  "Click-to-edit store builder",
  "TikTok hooks and sales playbook",
  "Store emailed on completion",
  "Basic business dashboard",
  "Market pulse and trend data",
  "Competitor analysis (top 3)",
  "This week's action plan",
  "HTML and Shopify export",
];

const PRO_FEATURES = [
  "Everything in Free",
  "Hosted store on ember domain",
  "Shopify store connection",
  "Full analytics dashboard",
  "Real revenue and order tracking",
  "AI business advisor chat",
  "Weekly performance email report",
  "Stock level alerts",
  "Customer inbox with AI replies",
  "Unlimited business builds",
  "Priority support",
  "Early access to new features",
];

const ENTERPRISE_FEATURES = [
  "Everything in Pro",
  "Custom domain (yourbrand.com)",
  "White label option",
  "Team accounts (up to 10 seats)",
  "Dedicated account manager",
  "Custom product catalogue",
  "API access",
  "SLA guarantee",
  "Custom onboarding",
  "Invoice billing",
];

function Check({ highlight }: { highlight?: boolean }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" style={{ flexShrink: 0 }}>
      <circle cx="8" cy="8" r="8" fill={highlight ? "rgba(234,88,12,0.15)" : "rgba(0,0,0,0.06)"} />
      <path d="M5 8l2 2 4-4" stroke={highlight ? C.orange : "#6b7280"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function PricingPage() {
  const [annual, setAnnual] = useState(false);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg,#fef3e2 0%,#fde8c8 30%,#fddfc0 60%,#fde4cc 80%,#fef3e2 100%)",
      fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",
    }}>
      <style>{`
        @keyframes fadeInUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        .pricing-card { animation: fadeInUp 0.5s ease both; }
      `}</style>

      {/* Navbar */}
      <div style={{
        position: "sticky" as const, top: 0, zIndex: 50,
        padding: "0 32px", height: "64px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "rgba(254,243,226,0.85)", backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(234,88,12,0.1)",
      }}>
        <a href="/" style={{ display:"flex", alignItems:"center", gap:"10px", textDecoration:"none" }}>
          <img src="/favicon.svg" alt="Ember" style={{ width:"32px", height:"32px" }} />
          <span style={{ fontWeight:800, fontSize:"21px", letterSpacing:"-0.03em", color:"#111827" }}>Ember</span>
        </a>
        <div style={{ display:"flex", alignItems:"center", gap:"24px" }}>
          <a href="/" style={{ fontSize:"14px", color:"#4b5563", textDecoration:"none", fontWeight:500 }}>How it works</a>
          <a href="/pricing" style={{ fontSize:"14px", color:C.orange, textDecoration:"none", fontWeight:700 }}>Pricing</a>
          <a href="/"
            style={{ padding:"9px 20px", borderRadius:"999px", border:"none", background:GRAD, color:"white", fontWeight:700, fontSize:"14px", cursor:"pointer", textDecoration:"none", boxShadow:"0 4px 14px rgba(234,88,12,0.28)" }}>
            Get started free →
          </a>
        </div>
      </div>

      {/* Hero */}
      <div style={{ textAlign:"center" as const, padding:"64px 24px 48px", maxWidth:"700px", margin:"0 auto" }}>
        <div style={{ display:"inline-block", padding:"6px 16px", borderRadius:"999px", background:"rgba(234,88,12,0.1)", border:"1px solid rgba(234,88,12,0.2)", fontSize:"12px", fontWeight:700, color:C.orange, letterSpacing:"0.08em", textTransform:"uppercase" as const, marginBottom:"20px" }}>
          Simple pricing
        </div>
        <h1 style={{ fontSize:"clamp(32px,5vw,52px)", fontWeight:800, color:"#111827", letterSpacing:"-0.04em", marginBottom:"16px", lineHeight:1.1 }}>
          Start free.<br/>
          <span style={{ background:GRAD, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
            Scale when you're ready.
          </span>
        </h1>
        <p style={{ fontSize:"17px", color:"#6b7280", marginBottom:"36px", lineHeight:1.7 }}>
          Build your first business for free. Upgrade to Pro when you're ready to go live and grow.
        </p>

        {/* Annual toggle */}
        <div style={{ display:"inline-flex", alignItems:"center", gap:"12px", padding:"6px 6px 6px 16px", borderRadius:"999px", background:"rgba(255,255,255,0.7)", border:"1px solid rgba(0,0,0,0.08)", backdropFilter:"blur(12px)" }}>
          <span style={{ fontSize:"13px", fontWeight:600, color: annual ? "#9ca3af" : "#111827" }}>Monthly</span>
          <button
            onClick={() => setAnnual(!annual)}
            style={{
              width:"44px", height:"24px", borderRadius:"999px", border:"none", cursor:"pointer", position:"relative" as const,
              background: annual ? GRAD : "rgba(0,0,0,0.12)",
              transition:"background 0.3s ease",
            }}>
            <div style={{
              position:"absolute" as const, top:"3px",
              left: annual ? "22px" : "3px",
              width:"18px", height:"18px", borderRadius:"50%", background:"white",
              boxShadow:"0 1px 4px rgba(0,0,0,0.2)",
              transition:"left 0.25s cubic-bezier(0.22,1,0.36,1)",
            }} />
          </button>
          <div style={{ display:"flex", alignItems:"center", gap:"6px" }}>
            <span style={{ fontSize:"13px", fontWeight:600, color: annual ? "#111827" : "#9ca3af" }}>Annual</span>
            {annual && (
              <span style={{ fontSize:"11px", fontWeight:700, padding:"2px 8px", borderRadius:"999px", background:"rgba(234,88,12,0.1)", color:C.orange, border:"1px solid rgba(234,88,12,0.2)" }}>
                Save 21%
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Pricing cards */}
      <div style={{ maxWidth:"1100px", margin:"0 auto", padding:"0 24px 80px", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))", gap:"20px", alignItems:"start" }}>

        {/* FREE */}
        <div className="pricing-card" style={{ animationDelay:"0s", background:"rgba(255,255,255,0.7)", backdropFilter:"blur(20px)", borderRadius:"20px", padding:"32px", border:"1px solid rgba(0,0,0,0.08)", boxShadow:"0 4px 24px rgba(0,0,0,0.06)" }}>
          <div style={{ marginBottom:"24px" }}>
            <div style={{ fontSize:"13px", fontWeight:700, color:"#6b7280", letterSpacing:"0.08em", textTransform:"uppercase" as const, marginBottom:"8px" }}>Free</div>
            <div style={{ display:"flex", alignItems:"baseline", gap:"4px", marginBottom:"8px" }}>
              <span style={{ fontSize:"42px", fontWeight:800, color:"#111827", letterSpacing:"-0.04em" }}>£0</span>
              <span style={{ fontSize:"15px", color:"#9ca3af" }}>/month</span>
            </div>
            <div style={{ fontSize:"14px", color:"#6b7280", lineHeight:1.6 }}>
              Everything you need to build and launch your first business.
            </div>
          </div>

          <a href="/"
            style={{ display:"block", width:"100%", padding:"13px", borderRadius:"12px", border:"1.5px solid rgba(0,0,0,0.12)", background:"transparent", color:"#111827", fontWeight:700, fontSize:"14px", cursor:"pointer", textAlign:"center" as const, textDecoration:"none", marginBottom:"28px", transition:"all 0.2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.background="rgba(0,0,0,0.04)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background="transparent"; }}>
            Get started free
          </a>

          <div style={{ display:"flex", flexDirection:"column" as const, gap:"12px" }}>
            {FREE_FEATURES.map((f, i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                <Check />
                <span style={{ fontSize:"14px", color:"#374151" }}>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* PRO */}
        <div className="pricing-card" style={{ animationDelay:"0.1s", background:"#111827", borderRadius:"20px", padding:"32px", border:"1px solid rgba(255,255,255,0.08)", boxShadow:"0 20px 60px rgba(0,0,0,0.2)", position:"relative" as const, overflow:"hidden" }}>
          {/* Glow */}
          <div style={{ position:"absolute" as const, top:"-40px", right:"-40px", width:"160px", height:"160px", borderRadius:"50%", background:"rgba(234,88,12,0.25)", filter:"blur(50px)", pointerEvents:"none" }} />

          {/* Popular badge */}
          <div style={{ position:"absolute" as const, top:"20px", right:"20px", padding:"4px 12px", borderRadius:"999px", background:GRAD, fontSize:"11px", fontWeight:700, color:"white" }}>
            Most popular
          </div>

          <div style={{ marginBottom:"24px" }}>
            <div style={{ fontSize:"13px", fontWeight:700, color:"rgba(255,255,255,0.5)", letterSpacing:"0.08em", textTransform:"uppercase" as const, marginBottom:"8px" }}>Pro</div>
            <div style={{ display:"flex", alignItems:"baseline", gap:"4px", marginBottom:"4px" }}>
              <span style={{ fontSize:"42px", fontWeight:800, color:"white", letterSpacing:"-0.04em" }}>
                {annual ? "£15" : "£19"}
              </span>
              <span style={{ fontSize:"15px", color:"rgba(255,255,255,0.4)" }}>/month</span>
            </div>
            {annual && (
              <div style={{ fontSize:"13px", color:"rgba(255,255,255,0.4)", marginBottom:"4px" }}>
                £180 billed annually
              </div>
            )}
            <div style={{ fontSize:"14px", color:"rgba(255,255,255,0.5)", lineHeight:1.6 }}>
              Go live, connect your store and grow your business with AI.
            </div>
          </div>

          <button
            onClick={() => window.open(annual ? STRIPE.proAnnual : STRIPE.proMonthly, "_blank")}
            style={{ display:"block", width:"100%", padding:"13px", borderRadius:"12px", border:"none", background:GRAD, color:"white", fontWeight:700, fontSize:"14px", cursor:"pointer", textAlign:"center" as const, marginBottom:"28px", boxShadow:"0 8px 24px rgba(234,88,12,0.35)", transition:"transform 0.2s, box-shadow 0.2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.transform="translateY(-1px)"; e.currentTarget.style.boxShadow="0 12px 32px rgba(234,88,12,0.45)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform="translateY(0)"; e.currentTarget.style.boxShadow="0 8px 24px rgba(234,88,12,0.35)"; }}>
            Start Pro {annual ? "— save 21%" : "→"}
          </button>

          <div style={{ display:"flex", flexDirection:"column" as const, gap:"12px" }}>
            {PRO_FEATURES.map((f, i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                <Check highlight />
                <span style={{ fontSize:"14px", color: i === 0 ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.85)", fontWeight: i === 0 ? 400 : 500 }}>{f}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ENTERPRISE */}
        <div className="pricing-card" style={{ animationDelay:"0.2s", background:"rgba(255,255,255,0.7)", backdropFilter:"blur(20px)", borderRadius:"20px", padding:"32px", border:"1px solid rgba(0,0,0,0.08)", boxShadow:"0 4px 24px rgba(0,0,0,0.06)" }}>
          <div style={{ marginBottom:"24px" }}>
            <div style={{ fontSize:"13px", fontWeight:700, color:"#6b7280", letterSpacing:"0.08em", textTransform:"uppercase" as const, marginBottom:"8px" }}>Enterprise</div>
            <div style={{ display:"flex", alignItems:"baseline", gap:"4px", marginBottom:"8px" }}>
              <span style={{ fontSize:"42px", fontWeight:800, color:"#111827", letterSpacing:"-0.04em" }}>Custom</span>
            </div>
            <div style={{ fontSize:"14px", color:"#6b7280", lineHeight:1.6 }}>
              For teams, agencies and brands that need more control and scale.
            </div>
          </div>

          <a href={STRIPE.enterprise}
            style={{ display:"block", width:"100%", padding:"13px", borderRadius:"12px", border:"1.5px solid rgba(234,88,12,0.3)", background:"rgba(234,88,12,0.04)", color:C.orange, fontWeight:700, fontSize:"14px", cursor:"pointer", textAlign:"center" as const, textDecoration:"none", marginBottom:"28px", transition:"all 0.2s" }}
            onMouseEnter={(e) => { e.currentTarget.style.background="rgba(234,88,12,0.08)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.background="rgba(234,88,12,0.04)"; }}>
            Contact us →
          </a>

          <div style={{ display:"flex", flexDirection:"column" as const, gap:"12px" }}>
            {ENTERPRISE_FEATURES.map((f, i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                <Check />
                <span style={{ fontSize:"14px", color:"#374151" }}>{f}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* FAQ */}
      <div style={{ maxWidth:"680px", margin:"0 auto", padding:"0 24px 80px" }}>
        <h2 style={{ fontSize:"28px", fontWeight:800, color:"#111827", letterSpacing:"-0.03em", marginBottom:"32px", textAlign:"center" as const }}>
          Common questions
        </h2>
        {[
          ["Can I really start for free?", "Yes — the full flow is completely free. You can build your idea, get a business plan, build a store and get your sales playbook without paying anything."],
          ["What do I get with Pro?", "Pro adds everything you need to actually run your business — a live hosted store, real analytics, Shopify integration, an AI advisor and weekly performance reports."],
          ["Can I cancel anytime?", "Yes — no contracts, no cancellation fees. Cancel anytime from your account settings and you keep access until the end of your billing period."],
          ["What is the annual plan?", "Paying annually costs £180 — the equivalent of £15/month instead of £19/month. You save £48 per year."],
          ["Do you offer refunds?", "Yes — we offer a full refund within 14 days if you're not satisfied, no questions asked."],
          ["What is Enterprise for?", "Enterprise is for agencies, teams or brands that want white labelling, custom domains, team seats, API access and dedicated support. Contact us to discuss."],
        ].map(([q, a], i) => (
          <div key={i} style={{ borderBottom:"1px solid rgba(0,0,0,0.08)", padding:"20px 0" }}>
            <div style={{ fontSize:"15px", fontWeight:700, color:"#111827", marginBottom:"8px" }}>{q}</div>
            <div style={{ fontSize:"14px", color:"#6b7280", lineHeight:1.75 }}>{a}</div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div style={{ textAlign:"center" as const, padding:"0 24px 80px" }}>
        <div style={{ fontSize:"28px", fontWeight:800, color:"#111827", letterSpacing:"-0.03em", marginBottom:"12px" }}>
          Ready to build your business?
        </div>
        <div style={{ fontSize:"15px", color:"#6b7280", marginBottom:"28px" }}>
          Start free — no credit card required.
        </div>
        <a href="/"
          style={{ display:"inline-block", padding:"16px 40px", borderRadius:"999px", border:"none", background:GRAD, color:"white", fontWeight:700, fontSize:"16px", cursor:"pointer", textDecoration:"none", boxShadow:"0 8px 28px rgba(234,88,12,0.35)", transition:"transform 0.2s" }}>
          Get started free →
        </a>
      </div>

    </div>
  );
}