"use client";

const GRAD = `linear-gradient(135deg,#FDE047,#F59E0B,#EA580C,#EF4444,#FB7185)`;
const C = { amber: "#F59E0B", orange: "#EA580C", pink: "#FB7185" };

const STEPS = [
  {
    num: "01",
    title: "Search your industry",
    desc: "Type any industry or idea — fitness, beauty, pets, tech, home and more. Ember instantly scans real market data from TikTok trends and Shopify sales to find the highest opportunity products.",
    detail: "Ember analyses 40+ products across 8 industries, scoring each one on demand, competition, margin potential and TikTok momentum. You get a ranked list of validated ideas in seconds.",
    icon: "🔍",
    tags: ["TikTok data", "Shopify trends", "40+ products", "8 industries"],
  },
  {
    num: "02",
    title: "Find your winning idea",
    desc: "Browse AI-scored product recommendations with demand scores, market size and growth data. Each idea comes with a full opportunity breakdown so you can pick with confidence.",
    detail: "Every product is scored 0-100 based on search volume, social momentum, competition level and margin potential. You see exactly why each product ranks where it does.",
    icon: "💡",
    tags: ["Demand scores", "Market size", "Competition data", "Margin analysis"],
  },
  {
    num: "03",
    title: "Build your business plan",
    desc: "Ember generates a complete 3-month week-by-week business plan tailored to your chosen product. Revenue targets, action steps, supplier recommendations and audience analysis — all done automatically.",
    detail: "Your plan includes Month 1 launch actions, Month 2 growth targets and Month 3 scaling strategy. Each week has specific tasks so you always know exactly what to do next.",
    icon: "📋",
    tags: ["3-month plan", "Revenue targets", "Week by week", "Supplier links"],
  },
  {
    num: "04",
    title: "Launch your branded store",
    desc: "Choose from 4 premium store templates and click to customise any element — colours, text, layout. Your store is built in seconds and ready to export to Shopify or download as HTML.",
    detail: "All 4 templates are mobile-first, conversion optimised and fully branded to your product. Export as Shopify section code and paste directly into your theme — no coding needed.",
    icon: "🛍️",
    tags: ["4 templates", "Click to edit", "Shopify export", "Mobile first"],
  },
  {
    num: "05",
    title: "Get your first sales",
    desc: "Ember creates a complete sales playbook for your product — TikTok hook scripts, ad angles, pricing strategy and supplier contacts. Everything you need to start selling from day one.",
    detail: "Your playbook includes 3 proven TikTok hooks, 2 Meta ad angles, recommended price points and vetted supplier options. Built specifically for your product, not generic advice.",
    icon: "📈",
    tags: ["TikTok hooks", "Ad angles", "Pricing strategy", "Supplier list"],
  },
  {
    num: "06",
    title: "Track and grow",
    desc: "Your business dashboard shows market pulse, competitor analysis and this week's action plan. See how your market is trending and exactly what to focus on to grow.",
    detail: "The dashboard includes demand trend bars, top 3 competitor breakdowns with their weaknesses and your opportunity gap, plus 5 prioritised weekly actions ranked by impact.",
    icon: "📊",
    tags: ["Market pulse", "Competitor analysis", "Weekly actions", "Trend data"],
  },
];

const FAQS = [
  ["How long does it take to build a business with Ember?", "The full flow from idea to complete business plan, store and sales playbook takes under 5 minutes. Most users complete it in 3-4 minutes."],
  ["Do I need any experience to use Ember?", "No — Ember is built for complete beginners. No coding, no design skills, no business experience required. If you can type an idea, Ember does the rest."],
  ["What industries does Ember cover?", "Ember covers 8 industries: Fitness, Beauty, Pets, Home, Tech, Fashion, Wellness and Outdoor — with 40+ products across all categories."],
  ["Can I use Ember to build a Shopify store?", "Yes — Ember builds your store and exports it as Shopify section code you can paste directly into your Shopify theme. No coding needed."],
  ["Is Ember free?", "Yes — the full flow is completely free. Build your idea, get a business plan, build a store and get your sales playbook at no cost. Pro features like hosted stores and AI advisor are coming soon."],
  ["How is Ember different from ChatGPT?", "Ember is purpose-built for ecommerce launch. It scores products using real market data, builds stores, generates branded copy and produces sales playbooks automatically. ChatGPT can't do any of these things."],
];

export default function HowItWorksPage() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(180deg,#fef3e2 0%,#fde8c8 30%,#fddfc0 60%,#fde4cc 80%,#fef3e2 100%)",
      fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",
    }}>
      <style>{`
        @keyframes fadeInUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        .step-card{animation:fadeInUp 0.5s ease both;}
      `}</style>

      {/* Navbar */}
      <div style={{ position:"sticky", top:0, zIndex:50, padding:"0 32px", height:"64px", display:"flex", alignItems:"center", justifyContent:"space-between", background:"rgba(254,243,226,0.85)", backdropFilter:"blur(20px)", borderBottom:"1px solid rgba(234,88,12,0.1)" }}>
        <a href="/" style={{ display:"flex", alignItems:"center", gap:"10px", textDecoration:"none" }}>
          <img src="/favicon.svg" alt="Ember" style={{ width:"32px", height:"32px" }} />
          <span style={{ fontWeight:800, fontSize:"21px", letterSpacing:"-0.03em", color:"#111827" }}>Ember</span>
        </a>
        <div style={{ display:"flex", alignItems:"center", gap:"20px" }}>
          <a href="/how-it-works" style={{ fontSize:"14px", color:C.orange, textDecoration:"none", fontWeight:700 }}>How it works</a>
          <a href="/examples" style={{ fontSize:"14px", color:"#4b5563", textDecoration:"none", fontWeight:500 }}>Examples</a>
          <a href="/pricing" style={{ fontSize:"14px", color:"#4b5563", textDecoration:"none", fontWeight:500 }}>Pricing</a>
          <a href="/" style={{ padding:"9px 20px", borderRadius:"999px", border:"none", background:GRAD, color:"white", fontWeight:700, fontSize:"14px", cursor:"pointer", textDecoration:"none", boxShadow:"0 4px 14px rgba(234,88,12,0.28)" }}>
            Get started free →
          </a>
        </div>
      </div>

      {/* Hero */}
      <div style={{ textAlign:"center", padding:"64px 24px 56px", maxWidth:"700px", margin:"0 auto" }}>
        <div style={{ display:"inline-block", padding:"6px 16px", borderRadius:"999px", background:"rgba(234,88,12,0.1)", border:"1px solid rgba(234,88,12,0.2)", fontSize:"12px", fontWeight:700, color:C.orange, letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:"20px" }}>
          How Ember works
        </div>
        <h1 style={{ fontSize:"clamp(32px,5vw,60px)", fontWeight:800, color:"#111827", letterSpacing:"-0.04em", marginBottom:"16px", lineHeight:1.1 }}>
          Idea to live business.{" "}
          <span style={{ background:GRAD, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>
            In under 5 minutes.
          </span>
        </h1>
        <p style={{ fontSize:"17px", color:"#6b7280", marginBottom:"16px", lineHeight:1.7 }}>
          Ember is an <strong style={{ color:"#111827" }}>AI Venture Builder</strong> — not just a store builder, not just idea generation. Full venture creation from market signal to launch. Validates markets, generates business plans, builds branded stores and creates sales playbooks automatically.
        </p>
        <div style={{ display:"flex", flexWrap:"wrap" as const, gap:"8px", justifyContent:"center", marginBottom:"28px" }}>
          {["More than a store builder","Beyond no-code","Not just idea generation","From validation to launch"].map(tag => (
            <span key={tag} style={{ padding:"5px 14px", borderRadius:"999px", background:"rgba(234,88,12,0.08)", border:"1px solid rgba(234,88,12,0.2)", fontSize:"12px", fontWeight:600, color:C.orange }}>
              {tag}
            </span>
          ))}
        </div>
        <a href="/" style={{ display:"inline-block", padding:"14px 32px", borderRadius:"999px", border:"none", background:GRAD, color:"white", fontWeight:700, fontSize:"15px", cursor:"pointer", textDecoration:"none", boxShadow:"0 6px 20px rgba(234,88,12,0.3)" }}>
          Try it free →
        </a>
      </div>

      {/* Stats */}
      <div style={{ display:"flex", justifyContent:"center", gap:"48px", padding:"0 24px 64px", flexWrap:"wrap" }}>
        {[["100+","Businesses built"],["5 mins","Average time"],["60%","Completion rate"],["£0","To get started"]].map(([val, label]) => (
          <div key={label} style={{ textAlign:"center" }}>
            <div style={{ fontSize:"clamp(28px,4vw,40px)", fontWeight:800, background:GRAD, WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", letterSpacing:"-0.03em" }}>{val}</div>
            <div style={{ fontSize:"13px", color:"#6b7280", marginTop:"4px" }}>{label}</div>
          </div>
        ))}
      </div>

      {/* Steps */}
      <div style={{ maxWidth:"900px", margin:"0 auto", padding:"0 24px 80px", display:"flex", flexDirection:"column", gap:"20px" }}>
        {STEPS.map((step, i) => (
          <div
            key={step.num}
            className="step-card"
            style={{ animationDelay:`${i * 0.1}s`, background:"rgba(255,255,255,0.85)", backdropFilter:"blur(20px)", borderRadius:"20px", padding:"28px 32px", border:"1px solid rgba(0,0,0,0.06)", boxShadow:"0 4px 24px rgba(0,0,0,0.06)", display:"flex", gap:"24px", alignItems:"flex-start" }}>

            {/* Number + icon */}
            <div style={{ flexShrink:0, display:"flex", flexDirection:"column", alignItems:"center", gap:"8px" }}>
              <div style={{ width:"52px", height:"52px", borderRadius:"14px", background:GRAD, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"24px", boxShadow:"0 4px 14px rgba(234,88,12,0.25)" }}>
                {step.icon}
              </div>
              <div style={{ fontSize:"11px", fontWeight:700, color:C.orange, letterSpacing:"0.1em" }}>
                {step.num}
              </div>
            </div>

            {/* Content */}
            <div style={{ flex:1 }}>
              <h2 style={{ fontSize:"clamp(18px,2vw,22px)", fontWeight:800, color:"#111827", letterSpacing:"-0.02em", marginBottom:"8px" }}>
                {step.title}
              </h2>
              <p style={{ fontSize:"15px", color:"#6b7280", lineHeight:1.7, marginBottom:"12px" }}>
                {step.desc}
              </p>
              <p style={{ fontSize:"13px", color:"#9ca3af", lineHeight:1.7, marginBottom:"14px" }}>
                {step.detail}
              </p>
              {/* Tags */}
              <div style={{ display:"flex", flexWrap:"wrap", gap:"8px" }}>
                {step.tags.map((tag) => (
                  <span key={tag} style={{ padding:"4px 12px", borderRadius:"999px", background:"rgba(234,88,12,0.07)", border:"1px solid rgba(234,88,12,0.15)", fontSize:"12px", fontWeight:600, color:C.orange }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Vs competitors */}
      <div style={{ maxWidth:"900px", margin:"0 auto", padding:"0 24px 80px" }}>
        <h2 style={{ fontSize:"clamp(24px,3vw,36px)", fontWeight:800, color:"#111827", letterSpacing:"-0.03em", marginBottom:"8px", textAlign:"center" }}>
          Why Ember?
        </h2>
        <p style={{ fontSize:"15px", color:"#6b7280", marginBottom:"32px", textAlign:"center" }}>
          Other tools do one thing. Ember does everything.
        </p>
        <div style={{ background:"rgba(255,255,255,0.85)", backdropFilter:"blur(20px)", borderRadius:"20px", overflow:"hidden", border:"1px solid rgba(0,0,0,0.06)", boxShadow:"0 4px 24px rgba(0,0,0,0.06)" }}>
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse", fontSize:"14px" }}>
              <thead>
                <tr style={{ borderBottom:"1px solid rgba(0,0,0,0.08)" }}>
                  <th style={{ padding:"16px 20px", textAlign:"left", fontWeight:700, color:"#111827" }}>Feature</th>
                  {["Ember","Shopify","Dropship.io","Triple Whale","Minea"].map((h) => (
                    <th key={h} style={{ padding:"16px 20px", textAlign:"center", fontWeight:700, color: h === "Ember" ? C.orange : "#6b7280" }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Product research",    true,  false, true,  false, true ],
                  ["Business plan",       true,  false, false, false, false],
                  ["Store builder",       true,  true,  false, false, false],
                  ["Sales playbook",      true,  false, false, false, false],
                  ["TikTok hooks",        true,  false, false, false, true ],
                  ["Analytics dashboard", true,  true,  false, true,  false],
                  ["Competitor analysis", true,  false, true,  true,  true ],
                  ["Full lifecycle",       true,  false, false, false, false],
                ].map(([feature, ...vals], i) => (
                  <tr key={feature as string} style={{ borderBottom:"1px solid rgba(0,0,0,0.05)", background: i % 2 === 0 ? "transparent" : "rgba(0,0,0,0.015)" }}>
                    <td style={{ padding:"14px 20px", fontWeight:500, color:"#374151" }}>{feature as string}</td>
                    {vals.map((v, j) => (
                      <td key={j} style={{ padding:"14px 20px", textAlign:"center" }}>
                        {v
                          ? <span style={{ fontSize:"16px", color: j === 0 ? C.orange : "#22c55e" }}>✓</span>
                          : <span style={{ fontSize:"16px", color:"#d1d5db" }}>✗</span>
                        }
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* FAQ */}
      <div style={{ maxWidth:"680px", margin:"0 auto", padding:"0 24px 80px" }}>
        <h2 style={{ fontSize:"clamp(24px,3vw,36px)", fontWeight:800, color:"#111827", letterSpacing:"-0.03em", marginBottom:"32px", textAlign:"center" }}>
          Common questions
        </h2>
        {FAQS.map(([q, a], i) => (
          <div key={i} style={{ borderBottom:"1px solid rgba(0,0,0,0.08)", padding:"20px 0" }}>
            <div style={{ fontSize:"15px", fontWeight:700, color:"#111827", marginBottom:"8px" }}>{q}</div>
            <div style={{ fontSize:"14px", color:"#6b7280", lineHeight:1.75 }}>{a}</div>
          </div>
        ))}
      </div>

      {/* Bottom CTA */}
      <div style={{ textAlign:"center", padding:"0 24px 80px" }}>
        <div style={{ fontSize:"clamp(24px,3vw,40px)", fontWeight:800, color:"#111827", letterSpacing:"-0.03em", marginBottom:"12px" }}>
          Ready to build your business?
        </div>
        <p style={{ fontSize:"15px", color:"#6b7280", marginBottom:"28px" }}>
          Free to start. No experience needed. Live in under 5 minutes.
        </p>
        <a href="/" style={{ display:"inline-block", padding:"16px 40px", borderRadius:"999px", border:"none", background:GRAD, color:"white", fontWeight:700, fontSize:"16px", cursor:"pointer", textDecoration:"none", boxShadow:"0 8px 28px rgba(234,88,12,0.35)" }}>
          Get started free →
        </a>
        <div style={{ marginTop:"16px", fontSize:"13px", color:"#9ca3af" }}>
          Join 100+ businesses already built with Ember
        </div>
      </div>

    </div>
  );
}