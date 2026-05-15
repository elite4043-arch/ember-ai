"use client";

import { useState } from "react";

const GRAD = `linear-gradient(135deg,#FDE047,#F59E0B,#EA580C,#EF4444,#FB7185)`;
const C = { amber: "#F59E0B", orange: "#EA580C", pink: "#FB7185", yellow: "#FDE047" };

const EXAMPLES = [
  {
    brand: "FlexBands",
    product: "Resistance Bands",
    industry: "Fitness",
    icon: "🏋️",
    tagline: "Home fitness made simple",
    summary: "A home fitness brand targeting beginner gym-goers who want to train at home without expensive equipment. Positioned as the affordable, beginner-friendly alternative to premium gym memberships.",
    marketSize: "£4.2B",
    demandScore: 87,
    growth: "+18% YoY",
    price: "£34.99",
    hook: '"Why I cancelled my £800/year gym membership"',
    supplier: "AliExpress — resistance band sets, 500 MOQ",
    colour: "#EA580C",
  },
  {
    brand: "Glow Lab",
    product: "LED Face Mask",
    industry: "Beauty",
    icon: "✨",
    tagline: "Clinic-grade skincare at home",
    summary: "A premium skincare brand targeting women 25-45 who want professional results without clinic prices. Positioned in the gap between £300+ clinical devices and cheap unbranded alternatives.",
    marketSize: "£1.8B",
    demandScore: 91,
    growth: "+34% YoY",
    price: "£89.99",
    hook: '"I spent £200 on facials until I found this"',
    supplier: "Alibaba — LED mask manufacturers, 100 MOQ",
    colour: "#FB7185",
  },
  {
    brand: "Paw Co",
    product: "Auto Pet Feeder",
    industry: "Pets",
    icon: "🐾",
    tagline: "Smart feeding for happy pets",
    summary: "A smart pet care brand targeting urban pet owners who work long hours and feel guilty about leaving their pets alone. Recession-proof market — owners treat pets like family.",
    marketSize: "£2.1B",
    demandScore: 82,
    growth: "+22% YoY",
    price: "£49.99",
    hook: '"I stopped worrying about my dog when I got this"',
    supplier: "AliExpress — automatic feeders, WiFi enabled",
    colour: "#F59E0B",
  },
  {
    brand: "Charge Up",
    product: "Wireless Charger",
    industry: "Tech",
    icon: "⚡",
    tagline: "Always powered, always ready",
    summary: "A minimalist tech accessories brand targeting remote workers and commuters who are always running low on battery. Daily use product with high repeat purchase and gifting potential.",
    marketSize: "£3.4B",
    demandScore: 89,
    growth: "+25% YoY",
    price: "£29.99",
    hook: '"I never run out of battery anymore — here\'s why"',
    supplier: "Alibaba — Qi wireless chargers, custom branding",
    colour: "#3b82f6",
  },
  {
    brand: "Restore",
    product: "Massage Gun",
    industry: "Wellness",
    icon: "💆",
    tagline: "Professional recovery at home",
    summary: "A recovery and wellness brand targeting gym goers, runners and office workers with muscle tension. Positioned as the accessible alternative to Theragun at a fraction of the price.",
    marketSize: "£3.4B",
    demandScore: 88,
    growth: "+28% YoY",
    price: "£79.99",
    hook: '"Post-workout recovery that actually works"',
    supplier: "AliExpress — percussion massagers, 200 MOQ",
    colour: "#7c3aed",
  },
  {
    brand: "Bloom",
    product: "Aromatherapy Diffuser",
    industry: "Home",
    icon: "🌸",
    tagline: "Transform your home into a sanctuary",
    summary: "A lifestyle wellness brand targeting homeowners and renters who want to create a calming environment. Strong gifting potential and subscription model opportunity with essential oil refills.",
    marketSize: "£1.2B",
    demandScore: 78,
    growth: "+19% YoY",
    price: "£39.99",
    hook: '"This changed the entire vibe of my flat"',
    supplier: "Alibaba — ultrasonic diffusers with LED, 300 MOQ",
    colour: "#16a34a",
  },
];

function ScoreBar({ value }: { value: number }) {
  return (
    <div style={{ height: "6px", background: "rgba(0,0,0,0.07)", borderRadius: "3px", overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${value}%`, background: GRAD, borderRadius: "3px" }} />
    </div>
  );
}

export default function ExamplesPage() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg,#fef3e2 0%,#fde8c8 30%,#fddfc0 60%,#fde4cc 80%,#fef3e2 100%)",
      fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",
    }}>
      <style>{`
        @keyframes fadeInUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        .ex-card{animation:fadeInUp 0.5s ease both;transition:transform 0.2s ease,box-shadow 0.2s ease;}
        .ex-card:hover{transform:translateY(-4px);}
      `}</style>

      {/* Navbar */}
      <div style={{ position:"sticky", top:0, zIndex:50, padding:"0 32px", height:"64px", display:"flex", alignItems:"center", justifyContent:"space-between", background:"rgba(254,243,226,0.85)", backdropFilter:"blur(20px)", borderBottom:"1px solid rgba(234,88,12,0.1)" }}>
        <a href="/" style={{ display:"flex", alignItems:"center", gap:"10px", textDecoration:"none" }}>
          <img src="/favicon.svg" alt="Ember" style={{ width:"32px", height:"32px" }} />
          <span style={{ fontWeight:800, fontSize:"21px", letterSpacing:"-0.03em", color:"#111827" }}>Ember</span>
        </a>
        <div style={{ display:"flex", alignItems:"center", gap:"20px" }}>
          <a href="/how-it-works" style={{ fontSize:"14px", color:"#4b5563", textDecoration:"none", fontWeight:500 }}>How it works</a>
          <a href="/pricing" style={{ fontSize:"14px", color:"#4b5563", textDecoration:"none", fontWeight:500 }}>Pricing</a>
          <a href="/" style={{ padding:"9px 20px", borderRadius:"999px", border:"none", background:GRAD, color:"white", fontWeight:700, fontSize:"14px", cursor:"pointer", textDecoration:"none", boxShadow:"0 4px 14px rgba(234,88,12,0.28)" }}>
            Get started free →
          </a>
        </div>
      </div>

      {/* Hero */}
      <div style={{ textAlign:"center", padding:"64px 24px 48px", maxWidth:"700px", margin:"0 auto" }}>
        <div style={{ display:"inline-block", padding:"6px 16px", borderRadius:"999px", background:"rgba(234,88,12,0.1)", border:"1px solid rgba(234,88,12,0.2)", fontSize:"12px", fontWeight:700, color:C.orange, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:"20px" }}>
          Real businesses built with Ember
        </div>
        <h1 style={{ fontSize:"clamp(32px,5vw,56px)", fontWeight:800, color:"#111827", letterSpacing:"-0.04em", marginBottom:"16px", lineHeight:1.1 }}>
          From idea to live business.{" "}
          <span style={{ background:GRAD, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
            See how it's done.
          </span>
        </h1>
        <p style={{ fontSize:"17px", color:"#6b7280", marginBottom:"0", lineHeight:1.7 }}>
          Six complete businesses built with Ember in under 5 minutes each. Browse the plans, stores and playbooks — then build your own.
        </p>
      </div>

      {/* Stats row */}
      <div style={{ display:"flex", justifyContent:"center", gap:"48px", padding:"0 24px 56px", flexWrap:"wrap" }}>
        {[["100+","Businesses built"],["5 mins","Average build time"],["60%","Completion rate"],["8","Industries covered"]].map(([val, label]) => (
          <div key={label} style={{ textAlign:"center" }}>
            <div style={{ fontSize:"clamp(28px,4vw,40px)", fontWeight:800, background:GRAD, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", letterSpacing:"-0.03em" }}>{val}</div>
            <div style={{ fontSize:"13px", color:"#6b7280", marginTop:"4px" }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Deliverables section */}
      <div style={{ maxWidth:"900px", margin:"0 auto", padding:"0 24px 64px" }}>
        <div style={{ background:"rgba(255,255,255,0.7)", backdropFilter:"blur(20px)", borderRadius:"20px", padding:"32px", border:"1px solid rgba(0,0,0,0.06)", boxShadow:"0 4px 24px rgba(0,0,0,0.06)" }}>
          <div style={{ textAlign:"center" as const, marginBottom:"28px" }}>
            <div style={{ fontSize:"11px", fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase" as const, color:C.orange, marginBottom:"8px" }}>What Ember generates</div>
            <h2 style={{ fontSize:"clamp(22px,3vw,32px)", fontWeight:800, color:"#111827", letterSpacing:"-0.03em", marginBottom:"8px" }}>Your complete launch package</h2>
            <p style={{ fontSize:"14px", color:"#6b7280" }}>Everything included. Free to generate. Ready in under 5 minutes.</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:"12px" }}>
            {[
              { icon:"💡", title:"Validated product idea", desc:"AI-scored with real market data" },
              { icon:"📋", title:"3-month business plan", desc:"Week-by-week with revenue targets" },
              { icon:"🛍️", title:"Branded store", desc:"4 premium templates, click to edit" },
              { icon:"📱", title:"TikTok hook scripts", desc:"3 proven hooks for your product" },
              { icon:"📣", title:"Meta ad angles", desc:"2 ad angles ready to launch" },
              { icon:"📦", title:"Supplier contacts", desc:"Vetted suppliers for your product" },
              { icon:"🔍", title:"Competitor analysis", desc:"Top 3 competitors and your gap" },
              { icon:"📊", title:"Business dashboard", desc:"Market pulse and weekly actions" },
              { icon:"💰", title:"Pricing strategy", desc:"Optimal price points for margin" },
              { icon:"📧", title:"Email delivery", desc:"Full plan emailed to you" },
            ].map((item, i) => (
              <div key={i} style={{ padding:"14px", borderRadius:"12px", background:"rgba(0,0,0,0.02)", border:"1px solid rgba(0,0,0,0.05)" }}>
                <div style={{ fontSize:"20px", marginBottom:"6px" }}>{item.icon}</div>
                <div style={{ fontSize:"13px", fontWeight:700, color:"#111827", marginBottom:"3px" }}>{item.title}</div>
                <div style={{ fontSize:"11px", color:"#6b7280" }}>{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Examples grid */}
      <div style={{ maxWidth:"1100px", margin:"0 auto", padding:"0 24px 80px", display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(320px,1fr))", gap:"20px" }}>
        {EXAMPLES.map((ex, i) => (
          <div
            key={ex.brand}
            className="ex-card"
            style={{ animationDelay:`${i * 0.08}s`, background:"rgba(255,255,255,0.85)", backdropFilter:"blur(20px)", borderRadius:"20px", overflow:"hidden", border:"1px solid rgba(0,0,0,0.06)", boxShadow:"0 4px 24px rgba(0,0,0,0.06)", cursor:"pointer" }}
            onClick={() => setActive(active === i ? null : i)}>

            {/* Card header */}
            <div style={{ background:GRAD, padding:"20px 20px 16px", position:"relative" }}>
              <div style={{ fontSize:"32px", marginBottom:"8px" }}>{ex.icon}</div>
              <div style={{ fontSize:"20px", fontWeight:800, color:"white", letterSpacing:"-0.02em" }}>{ex.brand}</div>
              <div style={{ fontSize:"13px", color:"rgba(255,255,255,0.75)", marginTop:"2px" }}>{ex.tagline}</div>
              <div style={{ position:"absolute", top:"16px", right:"16px", padding:"4px 10px", borderRadius:"999px", background:"rgba(255,255,255,0.2)", fontSize:"11px", fontWeight:700, color:"white" }}>
                {ex.industry}
              </div>
            </div>

            {/* Card body */}
            <div style={{ padding:"20px" }}>
              <p style={{ fontSize:"13px", color:"#6b7280", lineHeight:1.7, margin:"0 0 16px" }}>
                {ex.summary}
              </p>

              {/* Stats */}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"10px", marginBottom:"16px" }}>
                {[["Market", ex.marketSize], ["Growth", ex.growth], ["Price", ex.price]].map(([label, val]) => (
                  <div key={label} style={{ background:"rgba(0,0,0,0.03)", borderRadius:"10px", padding:"10px", textAlign:"center" }}>
                    <div style={{ fontSize:"11px", color:"#9ca3af", marginBottom:"4px", fontWeight:600 }}>{label}</div>
                    <div style={{ fontSize:"14px", fontWeight:800, color:"#111827" }}>{val}</div>
                  </div>
                ))}
              </div>

              {/* Demand score */}
              <div style={{ marginBottom:"16px" }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"6px" }}>
                  <span style={{ fontSize:"12px", color:"#6b7280", fontWeight:600 }}>Demand score</span>
                  <span style={{ fontSize:"12px", fontWeight:800, color:C.orange }}>{ex.demandScore}/100</span>
                </div>
                <ScoreBar value={ex.demandScore} />
              </div>

              {/* Expanded content */}
              {active === i && (
                <div style={{ borderTop:"1px solid rgba(0,0,0,0.07)", paddingTop:"16px", display:"flex", flexDirection:"column", gap:"12px", animation:"fadeInUp 0.3s ease" }}>
                  <div>
                    <div style={{ fontSize:"11px", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.amber, marginBottom:"6px" }}>TikTok hook</div>
                    <div style={{ fontSize:"13px", color:"#374151", padding:"10px 12px", background:"rgba(234,88,12,0.05)", borderRadius:"10px", border:"1px solid rgba(234,88,12,0.1)", lineHeight:1.6 }}>
                      {ex.hook}
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize:"11px", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:C.amber, marginBottom:"6px" }}>Supplier</div>
                    <div style={{ fontSize:"13px", color:"#374151" }}>{ex.supplier}</div>
                  </div>
                </div>
              )}

              {/* Expand toggle */}
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:"12px" }}>
                <span style={{ fontSize:"12px", color:C.orange, fontWeight:600, cursor:"pointer" }}
                  onClick={(e) => { e.stopPropagation(); setActive(active === i ? null : i); }}>
                  {active === i ? "Show less ↑" : "See full plan ↓"}
                </span>
                <a href="/" onClick={(e) => e.stopPropagation()}
                  style={{ padding:"8px 16px", borderRadius:"999px", border:"none", background:GRAD, color:"white", fontWeight:700, fontSize:"12px", cursor:"pointer", textDecoration:"none", boxShadow:"0 4px 12px rgba(234,88,12,0.25)" }}>
                  Build mine →
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div style={{ textAlign:"center", padding:"0 24px 80px" }}>
        <div style={{ fontSize:"clamp(24px,3vw,36px)", fontWeight:800, color:"#111827", letterSpacing:"-0.03em", marginBottom:"12px" }}>
          Ready to build yours?
        </div>
        <p style={{ fontSize:"15px", color:"#6b7280", marginBottom:"28px" }}>
          Join 100+ businesses launched with Ember. Free to start, live in 5 minutes.
        </p>
        <a href="/" style={{ display:"inline-block", padding:"16px 40px", borderRadius:"999px", border:"none", background:GRAD, color:"white", fontWeight:700, fontSize:"16px", cursor:"pointer", textDecoration:"none", boxShadow:"0 8px 28px rgba(234,88,12,0.35)" }}>
          Get started free →
        </a>
      </div>

    </div>
  );
}