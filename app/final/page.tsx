"use client";

import { useEffect, useState, useMemo, useRef } from "react";

const COLOURS = {
  yellow: "#FDE047",
  amber:  "#F59E0B",
  orange: "#EA580C",
  red:    "#EF4444",
  pink:   "#FB7185",
};

// ── Confetti ───────────────────────────────────────────────────
function Confetti() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    const colors = [COLOURS.yellow, COLOURS.amber, COLOURS.orange, COLOURS.pink, "#fff"];
    const particles = Array.from({ length: 120 }, () => ({
      x:    Math.random() * canvas.width,
      y:    -20 - Math.random() * 200,
      vx:   (Math.random() - 0.5) * 4,
      vy:   2 + Math.random() * 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 6 + Math.random() * 8,
      rot:  Math.random() * Math.PI * 2,
      rotV: (Math.random() - 0.5) * 0.2,
      alpha: 1,
    }));
    let frame: number;
    let tick = 0;
    function draw() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      tick++;
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.vy += 0.06; p.rot += p.rotV;
        if (p.y > canvas.height * 0.65) p.alpha -= 0.018;
        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        ctx.restore();
      });
      if (tick < 240) frame = requestAnimationFrame(draw);
      else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, []);
  return <canvas ref={canvasRef} style={{ position:"fixed", inset:0, zIndex:200, pointerEvents:"none" }} />;
}

export default function FinalPage() {
  const [data, setData]                 = useState<any>(null);
  const [motionTick, setMotionTick]     = useState(0);
  const [checkedItems, setCheckedItems] = useState<number[]>([]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [activeTab, setActiveTab]       = useState<"plan"|"hooks"|"supplier"|"actions">("plan");
  const [copied, setCopied]             = useState("");
  const [scrolled, setScrolled]         = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  useEffect(() => {
    const i = setInterval(() => setMotionTick(t => t + 1), 40);
    return () => clearInterval(i);
  }, []);

  useEffect(() => {
    const stored = localStorage.getItem("ember-final");
    if (stored) { try { setData(JSON.parse(stored)); } catch {} }
  }, []);

  useEffect(() => {
    [0,1,2,3,4,5].forEach((item, i) => {
      setTimeout(() => {
        setCheckedItems(prev => [...prev, item]);
        if (i === 5) setTimeout(() => setShowConfetti(true), 300);
      }, 400 + i * 350);
    });
  }, []);

  const glowProgress = useMemo(() => 38 - Math.sin(motionTick * 0.06) * 20, [motionTick]);
  const glowScale    = useMemo(() => 1 + Math.sin(motionTick * 0.04) * 0.04, [motionTick]);
  const triProgress  = useMemo(() => 38 - Math.sin(motionTick * 0.038 + 0.8) * 12, [motionTick]);

  const checklistItems = [
    { icon:"🔍", label:"Product discovered & scored" },
    { icon:"📋", label:"3-month business plan created" },
    { icon:"🏪", label:"Branded store built" },
    { icon:"📈", label:"Sales playbook generated" },
    { icon:"🏭", label:"Supplier recommendations ready" },
    { icon:"🎯", label:"Test pack prepared" },
  ];

  const hooks = [
    `I didn't expect ${data?.product || "this product"} to work this well`,
    `Why everyone is suddenly buying ${data?.product || "this"}`,
    `I wish I found this sooner — honest review`,
  ];

  const angles = [
    "Before vs after — show the visual transformation in under 10 seconds",
    "Problem/solution — lead with the pain, end with the product",
  ];

  const day17 = [
    { day:"Day 1", action:"Order 1-2 samples from your supplier. Set up TikTok and Instagram business accounts." },
    { day:"Day 2", action:"Film 5 short videos — unboxing, demo, problem-solution, lifestyle, and honest review." },
    { day:"Day 3", action:"Set up your store. Paste the Ember HTML into Shopify, Wix, or any website builder." },
    { day:"Day 4", action:"Post 2 organic TikToks. No paid ads yet — test what gets traction first." },
    { day:"Day 5", action:"Launch your first Meta ad at £8-10/day. Use your strongest hook from the test pack." },
    { day:"Day 6", action:"Reach out to 5 micro-creators (5k-50k followers) with your creator outreach script." },
    { day:"Day 7", action:"Review ad results. Double budget on the winning hook. Cut everything else." },
  ];

  function copyText(text: string, key: string) {
    navigator.clipboard.writeText(text);
    setCopied(key);
    setTimeout(() => setCopied(""), 2000);
  }

  const tabBtn = (tab: typeof activeTab, label: string) => (
    <button
      onClick={() => setActiveTab(tab)}
      style={{
        padding:"9px 16px", borderRadius:"12px", border:"none", cursor:"pointer",
        fontWeight:700, fontSize:"13px", transition:"all 0.2s ease",
        background: activeTab === tab
          ? `linear-gradient(135deg,${COLOURS.amber},${COLOURS.orange},${COLOURS.pink})`
          : "rgba(255,255,255,0.7)",
        color: activeTab === tab ? "white" : "#4b5563",
        boxShadow: activeTab === tab ? "0 4px 12px rgba(234,88,12,0.22)" : "none",
        whiteSpace:"nowrap" as const,
      }}>
      {label}
    </button>
  );

  return (
    <main style={{ minHeight:"100vh", position:"relative" }}>
      {showConfetti && <Confetti />}

      {/* Background */}
      <div style={{ position:"fixed", inset:0, zIndex:0, pointerEvents:"none", background:"linear-gradient(180deg,#fff9f0 0%,#fff0e0 30%,#ffece0 60%,#fff0e8 80%,#fff9f0 100%)" }} />
      <div style={{ position:"fixed", inset:0, zIndex:0, pointerEvents:"none", backgroundImage:"url('/triangle-hero.svg')", backgroundRepeat:"no-repeat", backgroundPosition:`center ${triProgress}%`, backgroundSize:"2400px auto", opacity:0.95 }} />
      <div style={{ position:"fixed", inset:0, zIndex:0, pointerEvents:"none",
        background:`radial-gradient(ellipse ${90*glowScale}% ${70*glowScale}% at center ${glowProgress}%,rgba(253,224,71,0.58) 0%,rgba(245,158,11,0.54) 14%,rgba(234,88,12,0.50) 30%,rgba(239,68,68,0.34) 48%,rgba(251,113,133,0.22) 62%,rgba(255,255,255,0) 78%)`,
        filter:"blur(55px)"
      }} />

      {/* Navbar */}
      <div style={{ position:"fixed", top:0, left:0, right:0, zIndex:50, padding:"0 32px", height:"64px", display:"flex", alignItems:"center", justifyContent:"space-between",
        background: scrolled ? "rgba(255,255,255,0.75)" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(255,255,255,0.3)" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
        transition:"all 0.4s ease" }}>
        <a href="/" style={{ display:"flex", alignItems:"center", gap:"10px", textDecoration:"none" }}>
          <img src="/favicon.svg" alt="Ember" style={{ width:"32px", height:"32px" }} />
          <span style={{ fontWeight:800, fontSize:"21px", letterSpacing:"-0.03em", color:"#111827" }}>Ember</span>
        </a>
        <div style={{ fontSize:"14px", fontWeight:700, color:"#9a3412" }}>🎉 Business ready</div>
      </div>

      {/* Content */}
      <div style={{ position:"relative", zIndex:3, maxWidth:"920px", margin:"0 auto", padding:"80px 16px 80px" }}>

        {/* Hero */}
        <div style={{ textAlign:"center", marginBottom:"36px" }}>
          <div style={{ fontSize:"clamp(52px,12vw,80px)", marginBottom:"10px", display:"inline-block", animation:"firePulse 1.6s ease-in-out infinite" }}>🔥</div>
          <h1 style={{ fontSize:"clamp(26px,6vw,54px)", fontWeight:800, letterSpacing:"-0.045em", color:"#111827", margin:"0 0 10px", lineHeight:1.0 }}>
            Your business is ready.
          </h1>
          <p style={{ fontSize:"clamp(14px,2.5vw,17px)", color:"rgba(31,41,55,0.6)", maxWidth:"460px", margin:"0 auto 18px", lineHeight:1.55 }}>
            In under 5 minutes, Ember built you a complete business — plan, store, and sales playbook.
          </p>
        </div>

        {/* Checklist reveal */}
        <div style={{ background:"rgba(255,255,255,0.82)", border:"1px solid rgba(0,0,0,0.08)", borderRadius:"24px", padding:"clamp(16px,4vw,24px)", backdropFilter:"blur(12px)", boxShadow:"0 24px 70px rgba(0,0,0,0.07)", marginBottom:"16px" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"16px", gap:"8px", flexWrap:"wrap" }}>
            <div style={{ fontWeight:800, fontSize:"clamp(14px,2.5vw,17px)", color:"#111827" }}>✅ Here's what Ember just built you</div>
            <div style={{ fontSize:"12px", color:"#9ca3af", fontWeight:600 }}>{checkedItems.length} / {checklistItems.length}</div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:"8px" }}>
            {checklistItems.map((item, idx) => (
              <div key={idx} style={{
                display:"flex", alignItems:"center", gap:"8px",
                padding:"11px 13px", borderRadius:"13px",
                background: checkedItems.includes(idx) ? "linear-gradient(135deg,rgba(234,88,12,0.06),rgba(253,224,71,0.04))" : "rgba(249,250,251,0.8)",
                border: checkedItems.includes(idx) ? "1px solid rgba(234,88,12,0.2)" : "1px solid rgba(0,0,0,0.06)",
                transition:"all 0.4s ease",
                opacity: checkedItems.includes(idx) ? 1 : 0.35,
                transform: checkedItems.includes(idx) ? "translateY(0)" : "translateY(6px)",
              }}>
                <span style={{ fontSize:"16px" }}>{item.icon}</span>
                <span style={{ fontSize:"12px", fontWeight:600, color:"#111827", flex:1, lineHeight:1.3 }}>{item.label}</span>
                <div style={{
                  width:"18px", height:"18px", borderRadius:"50%",
                  background: checkedItems.includes(idx) ? COLOURS.orange : "rgba(0,0,0,0.08)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:"9px", color:"white", fontWeight:800,
                  transition:"all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
                  transform: checkedItems.includes(idx) ? "scale(1)" : "scale(0)",
                  flexShrink:0,
                }}>✓</div>
              </div>
            ))}
          </div>
        </div>

        {/* Business card */}
        <div style={{ background:`linear-gradient(135deg,${COLOURS.amber}22,${COLOURS.orange}18,${COLOURS.pink}14)`, border:`1px solid ${COLOURS.orange}44`, borderRadius:"24px", padding:"clamp(18px,4vw,28px)", marginBottom:"16px", position:"relative", overflow:"hidden" }}>
          <div style={{ position:"absolute", top:"-30px", right:"-30px", width:"160px", height:"160px", borderRadius:"50%", background:`${COLOURS.orange}18`, filter:"blur(40px)", pointerEvents:"none" }} />
          <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:"12px", flexWrap:"wrap" }}>
            <div style={{ flex:1, minWidth:"180px" }}>
              <div style={{ fontSize:"11px", fontWeight:700, color:"#9a3412", letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:"6px" }}>🔥 Your business</div>
              <div style={{ fontSize:"clamp(20px,4vw,34px)", fontWeight:800, letterSpacing:"-0.03em", color:"#111827", marginBottom:"6px", lineHeight:1.05 }}>
                {data?.product || "Your Product"}
              </div>
              <div style={{ fontSize:"13px", color:"#4b5563", marginBottom:"14px", lineHeight:1.5 }}>
                {data?.tagline || "A premium product ready to launch"}
              </div>
              <div style={{ display:"flex", gap:"6px", flexWrap:"wrap" }}>
                <span style={{ padding:"4px 10px", background:"rgba(255,255,255,0.7)", border:`1px solid ${COLOURS.orange}33`, borderRadius:"999px", fontSize:"11px", fontWeight:700, color:"#9a3412" }}>{data?.idea || "Ecommerce"}</span>
                <span style={{ padding:"4px 10px", background:"rgba(255,255,255,0.7)", border:"1px solid rgba(22,163,74,0.3)", borderRadius:"999px", fontSize:"11px", fontWeight:700, color:"#16a34a" }}>✓ Ready to launch</span>
              </div>
            </div>
            <div style={{ textAlign:"center" }}>
              <div style={{ fontSize:"clamp(32px,6vw,48px)", fontWeight:800, color:COLOURS.orange, letterSpacing:"-0.04em", lineHeight:1 }}>&lt;5m</div>
              <div style={{ fontSize:"11px", color:"#9ca3af", fontWeight:600, marginTop:"2px" }}>built in</div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div style={{ background:"rgba(255,255,255,0.82)", border:"1px solid rgba(0,0,0,0.08)", borderRadius:"24px", padding:"clamp(16px,4vw,22px)", backdropFilter:"blur(12px)", boxShadow:"0 24px 70px rgba(0,0,0,0.07)", marginBottom:"16px" }}>
          <div style={{ display:"flex", gap:"6px", marginBottom:"18px", overflowX:"auto", paddingBottom:"2px" }}>
            {tabBtn("plan",     "📋 3-Month Plan")}
            {tabBtn("hooks",    "🎣 Hooks")}
            {tabBtn("supplier", "🏭 Supplier")}
            {tabBtn("actions",  "📅 Day 1-7")}
          </div>

          {activeTab === "plan" && (
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:"10px" }}>
              {[
                { label:"Month 1", goal:"First 10 sales", icon:"🚀", color:COLOURS.orange, actions:["Order samples, test product","Film 5 short-form videos","Launch store + first Meta ad","Reach out to 5 micro-creators"] },
                { label:"Month 2", goal:"£1,500+ revenue", icon:"📈", color:COLOURS.amber, actions:["Scale winning ad creative","Test UGC from first customers","Bundle for higher order value","Build email follow-up sequence"] },
                { label:"Month 3", goal:"£3,000+ profitable", icon:"🏆", color:"#16a34a", actions:["Expand to new audiences","Chase reviews aggressively","Retarget visitors with discount","Plan next product expansion"] },
              ].map((month, mi) => (
                <div key={mi} style={{ padding:"16px", borderRadius:"16px", background:"rgba(249,250,251,0.9)", border:"1px solid rgba(0,0,0,0.06)" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"10px" }}>
                    <div>
                      <div style={{ fontSize:"10px", fontWeight:700, color: month.color, letterSpacing:"0.08em", textTransform:"uppercase" }}>{month.label}</div>
                      <div style={{ fontSize:"14px", fontWeight:800, color:"#111827", marginTop:"2px" }}>{month.goal}</div>
                    </div>
                    <span style={{ fontSize:"22px" }}>{month.icon}</span>
                  </div>
                  {month.actions.map((a, ai) => (
                    <div key={ai} style={{ display:"flex", gap:"6px", alignItems:"flex-start", marginBottom:"5px" }}>
                      <div style={{ width:"12px", height:"12px", borderRadius:"50%", background:`${month.color}22`, border:`1.5px solid ${month.color}`, flexShrink:0, marginTop:"4px" }} />
                      <div style={{ fontSize:"12px", color:"#374151", lineHeight:1.5 }}>{a}</div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}

          {activeTab === "hooks" && (
            <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
              <div style={{ fontSize:"12px", color:"#9ca3af", marginBottom:"4px" }}>Tap to copy instantly</div>
              <div style={{ fontWeight:700, fontSize:"13px", color:"#111827", marginBottom:"4px" }}>🎣 3 Hooks to test</div>
              {hooks.map((hook, idx) => (
                <div key={idx} onClick={() => copyText(hook, `h${idx}`)}
                  style={{ padding:"12px 14px", background:"rgba(249,250,251,0.9)", borderRadius:"13px", border: copied===`h${idx}` ? `1px solid ${COLOURS.orange}` : "1px solid rgba(0,0,0,0.06)", cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center", gap:"10px", transition:"all 0.2s ease" }}>
                  <div style={{ display:"flex", gap:"8px", alignItems:"center", minWidth:0 }}>
                    <div style={{ width:"18px", height:"18px", borderRadius:"50%", background:`linear-gradient(135deg,${[COLOURS.yellow,COLOURS.amber,COLOURS.orange][idx]},${[COLOURS.amber,COLOURS.orange,COLOURS.pink][idx]})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"8px", fontWeight:800, color:"white", flexShrink:0 }}>H{idx+1}</div>
                    <span style={{ fontSize:"13px", color:"#111827", fontWeight:500, overflow:"hidden", textOverflow:"ellipsis" }}>"{hook}"</span>
                  </div>
                  <span style={{ fontSize:"11px", color: copied===`h${idx}` ? COLOURS.orange : "#9ca3af", fontWeight:700, flexShrink:0 }}>{copied===`h${idx}` ? "✓" : "copy"}</span>
                </div>
              ))}
              <div style={{ fontWeight:700, fontSize:"13px", color:"#111827", marginTop:"8px", marginBottom:"4px" }}>🎯 2 Angles to test</div>
              {angles.map((angle, idx) => (
                <div key={idx} onClick={() => copyText(angle, `a${idx}`)}
                  style={{ padding:"12px 14px", background:"rgba(249,250,251,0.9)", borderRadius:"13px", border: copied===`a${idx}` ? `1px solid ${COLOURS.amber}` : "1px solid rgba(0,0,0,0.06)", cursor:"pointer", display:"flex", justifyContent:"space-between", alignItems:"center", gap:"10px", transition:"all 0.2s ease" }}>
                  <div style={{ display:"flex", gap:"8px", alignItems:"center" }}>
                    <div style={{ width:"20px", height:"20px", borderRadius:"6px", background:`linear-gradient(135deg,${[COLOURS.yellow,COLOURS.amber][idx]},${[COLOURS.amber,COLOURS.orange][idx]})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"9px", fontWeight:800, color:"white", flexShrink:0 }}>{["A","B"][idx]}</div>
                    <span style={{ fontSize:"13px", color:"#374151" }}>{angle}</span>
                  </div>
                  <span style={{ fontSize:"11px", color: copied===`a${idx}` ? COLOURS.amber : "#9ca3af", fontWeight:700, flexShrink:0 }}>{copied===`a${idx}` ? "✓" : "copy"}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === "supplier" && (
            <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
              <div style={{ padding:"16px", background:"rgba(22,163,74,0.06)", border:"1px solid rgba(22,163,74,0.2)", borderRadius:"16px" }}>
                <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"8px", flexWrap:"wrap" }}>
                  <div style={{ width:"26px", height:"26px", borderRadius:"8px", background:"linear-gradient(135deg,#16a34a,#059669)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"12px", color:"white", fontWeight:800 }}>1</div>
                  <div style={{ fontWeight:800, fontSize:"14px", color:"#111827" }}>CJ Dropshipping</div>
                  <span style={{ padding:"3px 8px", background:"rgba(22,163,74,0.1)", border:"1px solid rgba(22,163,74,0.2)", borderRadius:"999px", fontSize:"10px", fontWeight:700, color:"#16a34a" }}>Start here</span>
                </div>
                <div style={{ fontSize:"13px", color:"#374151", lineHeight:1.65 }}>No minimum order. Test your marketing before committing to bulk stock. Integrates directly with Shopify. Once you hit 15+ orders/month, move to direct Alibaba sourcing for better margins.</div>
              </div>
              <div style={{ padding:"16px", background:"rgba(249,250,251,0.9)", border:"1px solid rgba(0,0,0,0.06)", borderRadius:"16px" }}>
                <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"8px", flexWrap:"wrap" }}>
                  <div style={{ width:"26px", height:"26px", borderRadius:"8px", background:`linear-gradient(135deg,${COLOURS.amber},${COLOURS.orange})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"12px", color:"white", fontWeight:800 }}>2</div>
                  <div style={{ fontWeight:800, fontSize:"14px", color:"#111827" }}>Alibaba Direct</div>
                  <span style={{ padding:"3px 8px", background:"rgba(245,158,11,0.1)", border:"1px solid rgba(245,158,11,0.2)", borderRadius:"999px", fontSize:"10px", fontWeight:700, color:"#92400e" }}>Scale up</span>
                </div>
                <div style={{ fontSize:"13px", color:"#374151", lineHeight:1.65 }}>Once you have proven sales, go direct to factory. MOQ typically 50-200 units. 40-60% cheaper than dropshipping. Always order samples first and use Trade Assurance for payment protection.</div>
              </div>
              <div style={{ padding:"12px 14px", background:"rgba(234,88,12,0.05)", border:"1px solid rgba(234,88,12,0.15)", borderRadius:"12px", fontSize:"12px", color:"#9a3412", lineHeight:1.6 }}>
                💡 <strong>The rule:</strong> Start with CJ to validate. Switch to Alibaba once you have consistent orders. Never bulk order before you have proof of demand.
              </div>
            </div>
          )}

          {activeTab === "actions" && (
            <div style={{ display:"flex", flexDirection:"column", gap:"7px" }}>
              <div style={{ fontSize:"12px", color:"#9ca3af", marginBottom:"4px" }}>One action per day for your first week</div>
              {day17.map((item, idx) => (
                <div key={idx} style={{ display:"flex", gap:"10px", alignItems:"flex-start", padding:"12px 14px", background:"rgba(249,250,251,0.9)", borderRadius:"13px", border:"1px solid rgba(0,0,0,0.06)" }}>
                  <div style={{ width:"38px", height:"38px", borderRadius:"10px", background:`linear-gradient(135deg,${COLOURS.amber},${COLOURS.orange})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"10px", fontWeight:800, color:"white", flexShrink:0 }}>{item.day}</div>
                  <div style={{ fontSize:"13px", color:"#374151", lineHeight:1.6, paddingTop:"9px" }}>{item.action}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Share + CTA */}
        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:"12px" }}>
          <div style={{ fontSize:"13px", color:"#9ca3af", fontWeight:600 }}>What would you like to do next?</div>

          {/* Dashboard — primary CTA */}
          <button
            onClick={() => window.location.href = "/dashboard"}
            style={{ width:"100%", maxWidth:"360px", padding:"14px 28px", borderRadius:"14px", border:"none",
              background:`linear-gradient(135deg,${COLOURS.yellow},${COLOURS.amber},${COLOURS.orange},${COLOURS.red},${COLOURS.pink})`,
              color:"white", fontWeight:800, fontSize:"15px", cursor:"pointer",
              boxShadow:"0 8px 28px rgba(234,88,12,0.35)", display:"flex", alignItems:"center", justifyContent:"center", gap:"8px" }}>
            <span>📊</span> View your dashboard
          </button>

          <div style={{ display:"flex", gap:"8px", flexWrap:"wrap", justifyContent:"center" }}>
            <button
              onClick={async () => {
                const shareData = { title:"I built a business with Ember AI 🔥", text:"I just built a complete ecommerce business in under 5 minutes — plan, store, sales playbook, all done.", url:"https://ember-ai-six.vercel.app" };
                if (navigator.share) { try { await navigator.share(shareData); } catch {} }
                else { await navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`); copyText("Copied!", "share"); }
              }}
              style={{ padding:"11px 18px", borderRadius:"13px", border:"none",
                background:"rgba(255,255,255,0.9)", color:"#374151", fontWeight:700, fontSize:"13px", cursor:"pointer",
                border:"1px solid rgba(0,0,0,0.08)" }}>
              {copied === "share" ? "✓ Shared!" : "📤 Share"}
            </button>

            <button
              onClick={() => window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent("I just built a complete ecommerce business in under 5 minutes with Ember AI 🔥 Plan, store, sales playbook — all done. ember-ai-six.vercel.app")}`, "_blank")}
              style={{ padding:"11px 18px", borderRadius:"13px", border:"none", background:"#000", color:"white", fontWeight:700, fontSize:"13px", cursor:"pointer" }}>
              𝕏 Post on X
            </button>

            <button
              onClick={() => window.location.href = "/"}
              style={{ padding:"11px 18px", borderRadius:"13px", border:"1px solid rgba(0,0,0,0.1)", background:"rgba(255,255,255,0.9)", color:"#374151", fontWeight:700, fontSize:"13px", cursor:"pointer" }}>
              🔥 Build another
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes firePulse {
          0%,100% { transform: scale(1); opacity: 1; }
          50%      { transform: scale(1.15); opacity: 0.85; }
        }
      `}</style>
    </main>
  );
}