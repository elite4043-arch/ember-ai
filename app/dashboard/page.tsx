"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { getSupplierMatches } from "@/app/lib/supplier-match";

// ── Colours ──────────────────────────────────────────────────────
const C = {
  orange:"#EA580C", amber:"#F59E0B", green:"#16A34A",
  red:"#EF4444", pink:"#FB7185", yellow:"#FDE047",
  slate:"#1E293B", muted:"#6B7280", border:"#E2E8F0",
  light:"#F8FAFC", white:"#FFFFFF",
};
const GRAD = "linear-gradient(135deg,#FDE047,#F59E0B,#EA580C,#EF4444,#FB7185)";

// ── Types ─────────────────────────────────────────────────────────
type NavItem = {
  id: string; label: string; icon: string;
  section: string; phase2?: boolean;
};

type DashData = {
  marketSize:string; growth:string;
  demand:"High"|"Very High"|"Explosive"; trend:"Rising"|"Stable"|"Surging";
  season:string; trendScore:number;
  searchVolume:string; socialMomentum:string;
  competitors:{name:string;price:string;strength:string;weakness:string;gap:string}[];
  actions:{label:string;impact:"High"|"Medium";icon:string}[];
  insight:string;
};

// ── Nav structure ─────────────────────────────────────────────────
const NAV: NavItem[] = [
  { id:"overview",    label:"Overview",      icon:"⊞",  section:"MAIN" },
  { id:"store",       label:"My Store",      icon:"🏪", section:"BUSINESS" },
  { id:"products",    label:"Products",      icon:"📦", section:"BUSINESS" },
  { id:"plan",        label:"Business Plan", icon:"📋", section:"BUSINESS" },
  { id:"marketing",   label:"Marketing",     icon:"📣", section:"GROWTH" },
  { id:"suppliers",   label:"Suppliers",     icon:"🏭", section:"GROWTH" },
  { id:"playbook",    label:"Sales Playbook",icon:"🎯", section:"GROWTH" },
  { id:"revenue",     label:"Revenue",       icon:"💰", section:"ANALYTICS", phase2:true },
  { id:"orders",      label:"Orders",        icon:"🛒", section:"ANALYTICS" },
  { id:"customers",   label:"Customers",     icon:"👥", section:"ANALYTICS", phase2:true },
  { id:"traffic",     label:"Traffic",       icon:"📈", section:"ANALYTICS" },
  { id:"advisor",     label:"AI Advisor",    icon:"🤖", section:"TOOLS",     phase2:true },
  { id:"alerts",      label:"Product Alerts",icon:"🔔", section:"TOOLS",     phase2:true },
  { id:"abtests",     label:"A/B Tests",     icon:"⚗️", section:"TOOLS",     phase2:true },
  { id:"settings",    label:"Settings",      icon:"⚙️", section:"ACCOUNT" },
  { id:"grant",       label:"Business Grant",icon:"🎁", section:"ACCOUNT" },
];

const SECTIONS = ["MAIN","BUSINESS","GROWTH","ANALYTICS","TOOLS","ACCOUNT"];

// ── Dashboard data ────────────────────────────────────────────────
const DASHBOARD_DATA: Record<string, DashData> = {
  "Resistance Bands": {
    marketSize:"£4.2B", growth:"+18% YoY", demand:"Very High", trend:"Rising",
    season:"Peak Jan-Mar (New Year), Sep-Oct (back to routine)",
    trendScore:87, searchVolume:"1.2M searches/month UK", socialMomentum:"TikTok views +340% this quarter",
    competitors:[
      { name:"Gymshark", price:"£35-55", strength:"Massive brand loyalty", weakness:"Premium pricing excludes beginners", gap:"Affordable beginner positioning" },
      { name:"Amazon Basics", price:"£12-18", strength:"Low price, Prime delivery", weakness:"Zero brand story", gap:"Brand story and lifestyle angle" },
      { name:"Decathlon", price:"£8-25", strength:"Physical stores, trusted", weakness:"Generic, boring content", gap:"Content-led brand with personality" },
    ],
    actions:[
      { label:"Film 3 TikTok videos this week — resistance band workouts under 60 seconds", impact:"High", icon:"🎬" },
      { label:"Contact 5 beginner fitness creators (10k-50k followers) for gifting", impact:"High", icon:"📩" },
      { label:"Set up Meta ad at £10/day targeting women 18-35, fitness beginners", impact:"High", icon:"📣" },
      { label:"Order 10 sample units from your supplier and film unboxing content", impact:"Medium", icon:"📦" },
      { label:"Add customer review request email to trigger 7 days after purchase", impact:"Medium", icon:"⭐" },
    ],
    insight:"Resistance bands are outperforming all other home fitness products on TikTok Shop this quarter. The beginner angle is underserved.",
  },
  "LED Face Mask": {
    marketSize:"£1.8B", growth:"+34% YoY", demand:"Explosive", trend:"Surging",
    season:"Year-round with peaks Nov-Dec (gifting) and Jan (New Year skin goals)",
    trendScore:91, searchVolume:"890K searches/month UK", socialMomentum:"Skincare TikTok views +580% this quarter",
    competitors:[
      { name:"CurrentBody", price:"£299-499", strength:"Clinical credibility", weakness:"Price excludes mass market", gap:"Accessible at-home clinic positioning" },
      { name:"Dr Dennis Gross", price:"£189-249", strength:"Dermatologist backed", weakness:"No lifestyle content", gap:"Lifestyle and routine-based content" },
      { name:"Amazon sellers", price:"£39-79", strength:"Low price", weakness:"Zero trust, no brand", gap:"Trusted brand with real results" },
    ],
    actions:[
      { label:"Create a 30-day skin transformation challenge content series", impact:"High", icon:"✨" },
      { label:"Partner with skincare micro-influencers for authentic before/after content", impact:"High", icon:"📩" },
      { label:"Target Meta ads at women 25-45 interested in skincare, anti-aging", impact:"High", icon:"📣" },
      { label:"Build an email sequence educating customers on LED wavelength benefits", impact:"Medium", icon:"📧" },
      { label:"Create a skincare routine bundle — mask + serum + moisturiser", impact:"Medium", icon:"🛍️" },
    ],
    insight:"LED skincare is the fastest growing beauty category globally. The gap between £300+ clinical devices and cheap unbranded options is massive.",
  },
};

function getDefaultData(product: string): DashData {
  return {
    marketSize:"£2.5B", growth:"+20% YoY", demand:"High", trend:"Rising",
    season:"Year-round with seasonal peaks",
    trendScore:80, searchVolume:"500K searches/month UK", socialMomentum:"Social engagement trending upward",
    competitors:[
      { name:"Amazon sellers", price:"Variable", strength:"Low price, fast delivery", weakness:"No brand story", gap:"Brand positioning and lifestyle content" },
      { name:"Established brands", price:"Premium", strength:"Brand recognition", weakness:"High price point", gap:"Accessible quality positioning" },
      { name:"Local retailers", price:"Mid-range", strength:"Physical presence", weakness:"Limited online reach", gap:"Digital-first brand with strong content" },
    ],
    actions:[
      { label:`Research the top 5 ${product} creators on TikTok and study their best performing content`, impact:"High", icon:"🔍" },
      { label:"Film your first unboxing or demo video — raw and authentic outperforms produced", impact:"High", icon:"🎬" },
      { label:"Order 10-20 units to test before scaling — validate demand with real customers first", impact:"High", icon:"📦" },
      { label:"Set up your email list and add a welcome sequence for new customers", impact:"Medium", icon:"📧" },
      { label:"Identify 3 micro-influencers in your niche and DM them this week", impact:"Medium", icon:"📩" },
    ],
    insight:`${product} is showing strong market signals. Focus on building authentic content before scaling paid advertising.`,
  };
}

// ── Revenue stat card ─────────────────────────────────────────────
function StatCard({ icon, label, value, sub, connected, accent = C.orange }:
  { icon:string; label:string; value:string; sub:string; connected:boolean; accent?:string }) {
  return (
    <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:"16px", padding:"20px",
      boxShadow:"0 1px 8px rgba(0,0,0,0.04)", position:"relative" as const, overflow:"hidden" }}>
      <div style={{ fontSize:"11px", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase" as const, color:C.muted, marginBottom:"8px" }}>
        {label}
      </div>
      {connected ? (
        <>
          <div style={{ fontSize:"28px", fontWeight:800, color:"#111827", marginBottom:"4px" }}>{value}</div>
          <div style={{ fontSize:"12px", color:C.green, fontWeight:600 }}>{sub}</div>
        </>
      ) : (
        <>
          <div style={{ fontSize:"28px", fontWeight:800, color:"#D1D5DB", marginBottom:"4px", filter:"blur(6px)", userSelect:"none" as const }}>£0.00</div>
          <div style={{ fontSize:"11px", color:C.muted }}>Connect store to track</div>
        </>
      )}
    </div>
  );
}

// ── Phase 2 locked card ───────────────────────────────────────────
function LockedCard({ icon, title, desc }: { icon:string; title:string; desc:string }) {
  return (
    <div style={{ background:C.light, border:`1px solid ${C.border}`, borderRadius:"16px", padding:"24px",
      display:"flex", flexDirection:"column" as const, gap:"8px", opacity:0.7 }}>
      <div style={{ fontSize:"24px" }}>{icon}</div>
      <div style={{ fontSize:"14px", fontWeight:700, color:"#374151" }}>{title}</div>
      <div style={{ fontSize:"12px", color:C.muted, lineHeight:1.6 }}>{desc}</div>
      <div style={{ fontSize:"10px", fontWeight:700, color:C.orange, marginTop:"4px",
        background:"rgba(234,88,12,0.08)", padding:"3px 8px", borderRadius:"999px", width:"fit-content" }}>
        Phase 2
      </div>
    </div>
  );
}

// ── Main Dashboard ────────────────────────────────────────────────
export default function DashboardPage() {
  const { data: session } = useSession();
  const [activeNav, setActiveNav] = useState("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [data, setData] = useState<any>(null);
  const [dash, setDash] = useState<DashData | null>(null);
  const [isDigital, setIsDigital] = useState(false);
  const [isPro, setIsPro] = useState(false);
  const [checkingPro, setCheckingPro] = useState(true);
  const [storeData, setStoreData] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [storeLoading, setStoreLoading] = useState(true);
  const [connectLoading, setConnectLoading] = useState(false);
  const [publishLoading, setPublishLoading] = useState(false);
  const [subdomainInput, setSubdomainInput] = useState("");
  const [subdomainError, setSubdomainError] = useState("");
  const [analytics, setAnalytics] = useState<any>(null);

  const launchDate = new Date().toLocaleDateString("en-GB", { day:"numeric", month:"long", year:"numeric" });

  useEffect(() => {
    // Load business data
    const stored = localStorage.getItem("ember-final");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setData(parsed);
        setDash(DASHBOARD_DATA[parsed.product] || getDefaultData(parsed.product || "Your Product"));
        if (parsed.mode === "digital") setIsDigital(true);
      } catch {}
    } else {
      setData({ product:"Resistance Bands", brand:"FlexBands", industry:"Fitness", tagline:"Home fitness made simple" });
      setDash(DASHBOARD_DATA["Resistance Bands"]);
    }

    // Check Pro status
    async function checkPro() {
      const email = session?.user?.email || localStorage.getItem("ember-email");
      if (!email) { setCheckingPro(false); return; }
      try {
        const res = await fetch("/api/check-plan", {
          method:"POST", headers:{"Content-Type":"application/json"},
          body: JSON.stringify({ email }),
        });
        const d = await res.json();
        setIsPro(d.isPro || false);
      } catch { setIsPro(false); }
      setCheckingPro(false);
    }
    checkPro();
    loadStoreData();
    loadOrders();
    loadAnalytics();
    // Poll analytics every 20s so "live now" stays fresh
    const analyticsTimer = setInterval(loadAnalytics, 20000);
    return () => clearInterval(analyticsTimer);
  }, [session]);

  async function loadAnalytics() {
    const email = session?.user?.email || localStorage.getItem("ember-email");
    if (!email) return;
    try {
      const res = await fetch(`/api/analytics?email=${encodeURIComponent(email)}`);
      if (res.ok) {
        const d = await res.json();
        setAnalytics(d.analytics || null);
      }
    } catch (e) { console.error(e); }
  }

  async function loadStoreData() {
    const email = session?.user?.email || localStorage.getItem("ember-email");
    if (!email) { setStoreLoading(false); return; }
    try {
      const res = await fetch(`/api/store/mine?email=${encodeURIComponent(email)}`);
      if (res.ok) {
        const d = await res.json();
        setStoreData(d.store || null);
        if (d.store?.subdomain) setSubdomainInput(d.store.subdomain);
      }
    } catch (e) { console.error(e); }
    setStoreLoading(false);
  }

  async function loadOrders() {
    const email = session?.user?.email || localStorage.getItem("ember-email");
    if (!email) return;
    try {
      const res = await fetch(`/api/store/orders?email=${encodeURIComponent(email)}`);
      if (res.ok) {
        const d = await res.json();
        setOrders(d.orders || []);
      }
    } catch (e) { console.error(e); }
  }

  async function publishStore() {
    if (!subdomainInput.trim()) { setSubdomainError("Enter a subdomain"); return; }
    const clean = subdomainInput.toLowerCase().replace(/[^a-z0-9-]/g, "").replace(/^-|-$/g, "");
    if (clean.length < 3) { setSubdomainError("Must be at least 3 characters"); return; }
    if (["www","api","app","admin","mail"].includes(clean)) { setSubdomainError("That subdomain is reserved"); return; }
    setPublishLoading(true);
    setSubdomainError("");
    try {
      const res = await fetch("/api/store/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: session?.user?.email, subdomain: clean }),
      });
      const d = await res.json();
      if (!res.ok) { setSubdomainError(d.error || "Failed to publish"); setPublishLoading(false); return; }
      setStoreData(d.store);
      setSubdomainInput(clean);
    } catch (e) { setSubdomainError("Something went wrong"); }
    setPublishLoading(false);
  }

  async function connectStripe() {
    if (!storeData?.id) return;
    setConnectLoading(true);
    try {
      const res = await fetch("/api/stripe/connect", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: session?.user?.email, storeId: storeData.id }),
      });
      const d = await res.json();
      if (d.url) window.location.href = d.url;
    } catch (e) { console.error(e); }
    setConnectLoading(false);
  }

  // Pro gate — free users see upgrade prompt
  if (checkingPro) {
    return (
      <div style={{ minHeight:"100vh", background:"#F8FAFC", display:"flex", alignItems:"center", justifyContent:"center" }}>
        <div style={{ width:"32px", height:"32px", border:"3px solid rgba(234,88,12,0.2)", borderTop:`3px solid ${C.orange}`,
          borderRadius:"50%", animation:"spin 0.8s linear infinite" }} />
        <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
      </div>
    );
  }

  if (!isPro) {
    return (
      <div style={{ minHeight:"100vh", background:"#F8FAFC", display:"flex", alignItems:"center", justifyContent:"center", padding:"24px" }}>
        <div style={{ maxWidth:"480px", width:"100%", textAlign:"center" as const }}>
          <div style={{ fontSize:"48px", marginBottom:"16px" }}>🔥</div>
          <h1 style={{ fontSize:"28px", fontWeight:800, color:"#111827", letterSpacing:"-0.03em", marginBottom:"12px" }}>
            Your dashboard is ready
          </h1>
          <p style={{ fontSize:"15px", color:C.muted, lineHeight:1.6, marginBottom:"28px" }}>
            Upgrade to Ember Pro to unlock your full business dashboard, host your store on your own subdomain and track real sales.
          </p>
          <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:"20px", padding:"24px", marginBottom:"20px", textAlign:"left" as const }}>
            <div style={{ fontSize:"13px", fontWeight:700, color:C.orange, marginBottom:"16px", letterSpacing:"0.06em" }}>WHAT YOU UNLOCK WITH PRO</div>
            {[
              "Full dashboard with sidebar navigation",
              "Host your store on yourstore.useember.io",
              "Track real orders and revenue",
              "Supplier contacts and full playbook",
              "Weekly trending product alerts",
              "Monthly Ember Business Grant entry",
              "AI advisor (Phase 2)",
            ].map((f, i) => (
              <div key={i} style={{ display:"flex", gap:"10px", alignItems:"center", padding:"8px 0",
                borderBottom: i < 6 ? `1px solid ${C.border}` : "none" }}>
                <div style={{ width:"18px", height:"18px", borderRadius:"50%", background:"rgba(234,88,12,0.1)",
                  display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, fontSize:"10px", color:C.orange }}>✓</div>
                <span style={{ fontSize:"14px", color:"#374151" }}>{f}</span>
              </div>
            ))}
          </div>
          <button onClick={() => window.location.href = "/pricing"}
            style={{ width:"100%", padding:"16px", borderRadius:"14px", border:"none",
              background:GRAD, color:"white", fontWeight:800, fontSize:"16px", cursor:"pointer",
              boxShadow:"0 8px 28px rgba(234,88,12,0.35)", marginBottom:"12px" }}>
            Upgrade to Pro — £29/month →
          </button>
          <button onClick={() => window.location.href = "/"}
            style={{ width:"100%", padding:"12px", borderRadius:"14px", border:`1px solid ${C.border}`,
              background:C.white, color:C.muted, fontWeight:600, fontSize:"14px", cursor:"pointer" }}>
            Back to Ember
          </button>
        </div>
      </div>
    );
  }

  if (!dash) return null;

  // ── Sidebar content ───────────────────────────────────────────
  const sidebar = (
    <div style={{ width:"240px", flexShrink:0, background:C.white, borderRight:`1px solid ${C.border}`,
      height:"100vh", position:"sticky" as const, top:0, overflowY:"auto" as const, display:"flex", flexDirection:"column" as const }}>

      {/* Logo */}
      <div style={{ padding:"20px 20px 16px", borderBottom:`1px solid ${C.border}` }}>
        <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"12px" }}>
          <span style={{ fontSize:"22px" }}>🔥</span>
          <span style={{ fontSize:"16px", fontWeight:800, color:"#111827" }}>Ember</span>
          <span style={{ fontSize:"10px", fontWeight:700, color:C.orange, background:"rgba(234,88,12,0.1)",
            padding:"2px 8px", borderRadius:"999px", marginLeft:"auto" }}>PRO</span>
        </div>
        {/* Business name */}
        <div style={{ fontSize:"13px", fontWeight:700, color:"#111827", marginBottom:"2px" }}>
          {data?.brand || "Your Brand"}
        </div>
        <div style={{ fontSize:"11px", color:C.muted }}>
          {isDigital ? "Digital Product" : (data?.industry || "Ecommerce")} · {launchDate}
        </div>
      </div>

      {/* Nav items */}
      <div style={{ flex:1, padding:"12px 0" }}>
        {SECTIONS.map(section => {
          const items = NAV.filter(n => n.section === section);
          if (!items.length) return null;
          return (
            <div key={section} style={{ marginBottom:"4px" }}>
              {section !== "MAIN" && (
                <div style={{ fontSize:"10px", fontWeight:700, letterSpacing:"0.1em", color:C.muted,
                  padding:"8px 20px 4px", textTransform:"uppercase" as const }}>
                  {section === "ANALYTICS" || section === "TOOLS" ? `${section} · PHASE 2` : section}
                </div>
              )}
              {items.map(item => (
                <button key={item.id}
                  onClick={() => { setActiveNav(item.id); setSidebarOpen(false); }}
                  style={{ width:"100%", display:"flex", alignItems:"center", gap:"10px",
                    padding:"9px 20px", background: activeNav === item.id ? "rgba(234,88,12,0.08)" : "transparent",
                    border:"none", cursor:"pointer", textAlign:"left" as const, transition:"all 0.15s",
                    borderLeft: activeNav === item.id ? `3px solid ${C.orange}` : "3px solid transparent" }}>
                  <span style={{ fontSize:"15px", opacity: item.phase2 ? 0.5 : 1 }}>{item.icon}</span>
                  <span style={{ fontSize:"13px", fontWeight: activeNav === item.id ? 700 : 500,
                    color: activeNav === item.id ? C.orange : item.phase2 ? C.muted : "#374151" }}>
                    {item.label}
                  </span>
                  {item.phase2 && (
                    <span style={{ fontSize:"9px", fontWeight:700, color:C.orange,
                      background:"rgba(234,88,12,0.08)", padding:"1px 6px", borderRadius:"999px", marginLeft:"auto" }}>
                      P2
                    </span>
                  )}
                </button>
              ))}
            </div>
          );
        })}
      </div>

      {/* Bottom — build another */}
      <div style={{ padding:"16px 20px", borderTop:`1px solid ${C.border}` }}>
        <button onClick={() => window.location.href = "/"}
          style={{ width:"100%", padding:"10px", borderRadius:"10px", border:"none",
            background:GRAD, color:"white", fontWeight:700, fontSize:"13px", cursor:"pointer" }}>
          Build another →
        </button>
      </div>
    </div>
  );

  // ── Page content by nav ───────────────────────────────────────
  function renderContent() {
    if (!dash) return null;

    // ── OVERVIEW ───────────────────────────────────────────────
    if (activeNav === "overview") return (
      <div>
        <div style={{ marginBottom:"24px" }}>
          <h1 style={{ fontSize:"24px", fontWeight:800, color:"#111827", letterSpacing:"-0.03em", marginBottom:"4px" }}>
            Good {new Date().getHours() < 12 ? "morning" : new Date().getHours() < 18 ? "afternoon" : "evening"} 👋
          </h1>
          <p style={{ fontSize:"14px", color:C.muted }}>Here's how {data?.brand || "your business"} is doing</p>
        </div>

        {/* Revenue row — live from orders */}
        {(() => {
          const isConnected = storeData?.stripe_onboarded;
          const totalRevenue = orders.reduce((sum: number, o: any) => sum + (o.amount_pence || 0), 0);
          const totalOrders = orders.length;
          const avgOrder = totalOrders > 0 ? Math.round(totalRevenue / totalOrders) : 0;
          return (
            <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:"20px", padding:"20px", marginBottom:"20px" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"16px" }}>
                <div style={{ fontSize:"14px", fontWeight:700, color:"#111827" }}>Revenue overview</div>
                <div style={{ display:"flex", alignItems:"center", gap:"6px", fontSize:"11px",
                  color: isConnected ? C.green : C.muted,
                  background: isConnected ? "rgba(22,163,74,0.06)" : C.light,
                  padding:"5px 10px", borderRadius:"999px",
                  border: isConnected ? "1px solid rgba(22,163,74,0.2)" : `1px solid ${C.border}` }}>
                  <div style={{ width:"6px", height:"6px", borderRadius:"50%", background: isConnected ? C.green : "#D1D5DB" }} />
                  {isConnected ? "Connected" : "Not connected"}
                </div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:"12px", marginBottom:"16px" }}>
                {[
                  { label:"Total Revenue", value: isConnected ? `£${(totalRevenue / 100).toFixed(2)}` : "£0", color: totalRevenue > 0 ? C.green : "#D1D5DB" },
                  { label:"Orders", value: isConnected ? `${totalOrders}` : "0", color: totalOrders > 0 ? "#111827" : "#D1D5DB" },
                  { label:"Avg Order", value: isConnected ? `£${(avgOrder / 100).toFixed(2)}` : "£0", color: avgOrder > 0 ? "#111827" : "#D1D5DB" },
                ].map((s, i) => (
                  <div key={i} style={{ background:C.light, borderRadius:"14px", padding:"16px", border:`1px solid ${C.border}` }}>
                    <div style={{ fontSize:"11px", fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase" as const, color:C.muted, marginBottom:"8px" }}>{s.label}</div>
                    <div style={{ fontSize:"24px", fontWeight:800, color:s.color, marginBottom:"2px" }}>{s.value}</div>
                  </div>
                ))}
              </div>
              {!isConnected && (
                <div style={{ background:"rgba(234,88,12,0.04)", border:"1px solid rgba(234,88,12,0.15)", borderRadius:"14px", padding:"16px", display:"flex", alignItems:"center", justifyContent:"space-between", gap:"12px", flexWrap:"wrap" as const }}>
                  <div>
                    <div style={{ fontSize:"13px", fontWeight:700, color:"#111827", marginBottom:"4px" }}>Connect your store to start tracking sales</div>
                    <div style={{ fontSize:"12px", color:C.muted }}>Publish your store and connect Stripe to see real revenue here</div>
                  </div>
                  <button onClick={() => setActiveNav("store")} style={{ padding:"10px 20px", borderRadius:"10px", border:"none", background:GRAD, color:"white", fontWeight:700, fontSize:"13px", cursor:"pointer", flexShrink:0, whiteSpace:"nowrap" as const }}>
                    Set up store →
                  </button>
                </div>
              )}
            </div>
          );
        })()}

        {/* Market intelligence row */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:"12px", marginBottom:"20px" }}>
          {[
            { label:"Market Size", value:dash.marketSize, sub:dash.growth, color:C.orange },
            { label:"Demand Score", value:`${dash.trendScore}/100`, sub:dash.demand, color:C.amber },
            { label:"Search Volume", value:dash.searchVolume.split(" ")[0], sub:"per month UK", color:"#7C3AED" },
            { label:"Social Trend", value:dash.trend, sub:dash.socialMomentum.split(" ").slice(0,3).join(" "), color:C.green },
          ].map((s, i) => (
            <div key={i} style={{ background:C.white, border:`1px solid ${C.border}`,
              borderRadius:"16px", padding:"18px", boxShadow:"0 1px 6px rgba(0,0,0,0.04)" }}>
              <div style={{ fontSize:"10px", fontWeight:700, letterSpacing:"0.1em",
                textTransform:"uppercase" as const, color:C.muted, marginBottom:"8px" }}>{s.label}</div>
              <div style={{ fontSize:"22px", fontWeight:800, color:s.color, marginBottom:"4px" }}>{s.value}</div>
              <div style={{ fontSize:"11px", color:C.muted }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* This week's top action */}
        <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:"20px",
          padding:"20px", marginBottom:"20px" }}>
          <div style={{ fontSize:"14px", fontWeight:700, color:"#111827", marginBottom:"14px" }}>
            This week's priority
          </div>
          <div style={{ background:"rgba(234,88,12,0.04)", border:"1px solid rgba(234,88,12,0.15)",
            borderRadius:"14px", padding:"16px", display:"flex", gap:"14px", alignItems:"flex-start" }}>
            <div style={{ fontSize:"24px", flexShrink:0 }}>{dash.actions[0].icon}</div>
            <div>
              <div style={{ fontSize:"14px", fontWeight:600, color:"#111827", lineHeight:1.5, marginBottom:"6px" }}>
                {dash.actions[0].label}
              </div>
              <span style={{ fontSize:"11px", fontWeight:700, color:C.orange,
                background:"rgba(234,88,12,0.1)", padding:"3px 8px", borderRadius:"999px" }}>
                High impact
              </span>
            </div>
          </div>
        </div>

        {/* Insight */}
        <div style={{ background:"rgba(234,88,12,0.04)", border:"1px solid rgba(234,88,12,0.15)",
          borderRadius:"16px", padding:"20px" }}>
          <div style={{ fontSize:"12px", fontWeight:700, color:C.orange, marginBottom:"8px", letterSpacing:"0.06em" }}>
            EMBER INSIGHT
          </div>
          <div style={{ fontSize:"14px", color:"#374151", lineHeight:1.7 }}>{dash.insight}</div>
        </div>
      </div>
    );

    // ── STORE (functional) ──────────────────────────────────────
    if (activeNav === "store") {
      const isPublished = storeData?.published && storeData?.subdomain;
      const isStripeReady = storeData?.stripe_onboarded;
      const storeUrl = isPublished ? `https://${storeData.subdomain}.useember.io` : null;

      return (
        <div>
          <h2 style={{ fontSize:"22px", fontWeight:800, color:"#111827", marginBottom:"4px" }}>My Store</h2>
          <p style={{ fontSize:"14px", color:C.muted, marginBottom:"24px" }}>Publish your store and accept payments</p>

          {/* Subdomain section */}
          <div style={{ background:C.white, border: isPublished ? `2px solid ${C.green}` : `2px solid rgba(234,88,12,0.2)`, borderRadius:"20px", padding:"24px", marginBottom:"16px" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", flexWrap:"wrap" as const, gap:"16px", marginBottom:"20px" }}>
              <div>
                <div style={{ fontSize:"11px", fontWeight:700, color: isPublished ? C.green : C.orange, letterSpacing:"0.08em", textTransform:"uppercase" as const, marginBottom:"6px" }}>
                  {isPublished ? "Live store" : "Your subdomain"}
                </div>
                {isPublished ? (
                  <a href={storeUrl!} target="_blank" rel="noopener" style={{ fontSize:"20px", fontWeight:800, color:C.orange, textDecoration:"none" }}>
                    {storeData.subdomain}.useember.io ↗
                  </a>
                ) : (
                  <div style={{ display:"flex", alignItems:"center", gap:"4px", flexWrap:"wrap" as const }}>
                    <input
                      value={subdomainInput}
                      onChange={e => { setSubdomainInput(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g,"")); setSubdomainError(""); }}
                      placeholder="yourbrand"
                      style={{ fontSize:"18px", fontWeight:800, color:"#111827", border:"none", outline:"none", background:"transparent", width:"160px" }}
                    />
                    <span style={{ fontSize:"18px", fontWeight:800, color:C.muted }}>.useember.io</span>
                  </div>
                )}
                {subdomainError && <div style={{ fontSize:"12px", color:C.red, marginTop:"6px" }}>{subdomainError}</div>}
              </div>
              <div style={{ padding:"6px 14px", borderRadius:"999px",
                background: isPublished ? "rgba(22,163,74,0.1)" : "rgba(234,88,12,0.08)",
                border: isPublished ? "1px solid rgba(22,163,74,0.3)" : "1px solid rgba(234,88,12,0.2)",
                fontSize:"12px", fontWeight:700, color: isPublished ? C.green : C.orange }}>
                {isPublished ? "✓ Live" : "Not published"}
              </div>
            </div>

            <div style={{ display:"flex", gap:"8px", flexWrap:"wrap" as const }}>
              <button onClick={() => window.location.href = "/"}
                style={{ padding:"10px 18px", borderRadius:"10px", border:"none", background:GRAD, color:"white", fontWeight:700, fontSize:"13px", cursor:"pointer" }}>
                {isPublished ? "Edit store →" : "Build store →"}
              </button>
              {!isPublished && (
                <button onClick={publishStore} disabled={publishLoading}
                  style={{ padding:"10px 18px", borderRadius:"10px", border:"none", background:"#111827", color:"white", fontWeight:700, fontSize:"13px", cursor: publishLoading ? "wait" : "pointer", opacity: publishLoading ? 0.6 : 1 }}>
                  {publishLoading ? "Publishing..." : "Publish to subdomain →"}
                </button>
              )}
              {isPublished && storeUrl && (
                <button onClick={() => { navigator.clipboard.writeText(storeUrl); }}
                  style={{ padding:"10px 18px", borderRadius:"10px", border:`1px solid ${C.border}`, background:C.white, color:"#374151", fontWeight:600, fontSize:"13px", cursor:"pointer" }}>
                  Copy URL
                </button>
              )}
            </div>
          </div>

          {/* Stripe Connect section */}
          <div style={{ background:C.white, border: isStripeReady ? `2px solid ${C.green}` : `1px solid ${C.border}`, borderRadius:"20px", padding:"24px" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"12px" }}>
              <div style={{ fontSize:"15px", fontWeight:700, color:"#111827" }}>Payment setup</div>
              <div style={{ display:"flex", alignItems:"center", gap:"6px", fontSize:"11px", padding:"5px 10px", borderRadius:"999px",
                background: isStripeReady ? "rgba(22,163,74,0.08)" : C.light,
                border: isStripeReady ? "1px solid rgba(22,163,74,0.2)" : `1px solid ${C.border}`,
                color: isStripeReady ? C.green : C.muted }}>
                <div style={{ width:"6px", height:"6px", borderRadius:"50%", background: isStripeReady ? C.green : "#D1D5DB" }} />
                {isStripeReady ? "Connected" : "Not connected"}
              </div>
            </div>
            <div style={{ fontSize:"13px", color:C.muted, lineHeight:1.6, marginBottom:"16px" }}>
              {isStripeReady
                ? "Stripe is connected — customers can pay on your store and money goes directly to your bank account."
                : "Connect Stripe to accept payments on your store. Customers pay you directly — Ember never touches your revenue."}
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))", gap:"12px", marginBottom:"16px" }}>
              {[
                { icon:"💳", title:"Card payments", desc:"Visa, Mastercard, Amex" },
                { icon:"📱", title:"Apple & Google Pay", desc:"One tap checkout" },
                { icon:"🏦", title:"Direct payouts", desc:"Money to your bank" },
                { icon:"🛡️", title:"Fraud protection", desc:"Stripe handles disputes" },
              ].map((f,i) => (
                <div key={i} style={{ background:C.light, borderRadius:"12px", padding:"14px", border:`1px solid ${C.border}` }}>
                  <div style={{ fontSize:"20px", marginBottom:"6px" }}>{f.icon}</div>
                  <div style={{ fontSize:"12px", fontWeight:700, color:"#374151", marginBottom:"2px" }}>{f.title}</div>
                  <div style={{ fontSize:"11px", color:C.muted }}>{f.desc}</div>
                </div>
              ))}
            </div>
            {isStripeReady ? (
              <div style={{ padding:"12px 18px", borderRadius:"12px", background:"rgba(22,163,74,0.06)", border:"1px solid rgba(22,163,74,0.15)", fontSize:"13px", fontWeight:600, color:C.green }}>
                ✓ Stripe Connected — ready to accept payments
              </div>
            ) : (
              <button onClick={connectStripe} disabled={connectLoading || !isPublished}
                style={{ padding:"12px 24px", borderRadius:"12px", border:"none", background: isPublished ? GRAD : "#D1D5DB", color:"white", fontWeight:700, fontSize:"14px", cursor: isPublished ? "pointer" : "not-allowed", opacity: connectLoading ? 0.6 : 1 }}>
                {connectLoading ? "Connecting..." : isPublished ? "Connect Stripe →" : "Publish your store first"}
              </button>
            )}
          </div>
        </div>
      );
    }

    // ── PRODUCTS ───────────────────────────────────────────────
    if (activeNav === "products") return (
      <div>
        <h2 style={{ fontSize:"22px", fontWeight:800, color:"#111827", marginBottom:"4px" }}>Products</h2>
        <p style={{ fontSize:"14px", color:C.muted, marginBottom:"24px" }}>Your scored product ideas</p>
        <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:"20px", padding:"24px" }}>
          <div style={{ fontSize:"24px", fontWeight:800, color:"#111827", marginBottom:"6px" }}>{data?.product}</div>
          <div style={{ display:"flex", gap:"8px", flexWrap:"wrap" as const, marginBottom:"16px" }}>
            <span style={{ fontSize:"12px", padding:"4px 12px", borderRadius:"999px",
              background:"rgba(234,88,12,0.08)", color:C.orange, fontWeight:700, border:"1px solid rgba(234,88,12,0.2)" }}>
              {dash.trendScore}/100 demand score
            </span>
            <span style={{ fontSize:"12px", padding:"4px 12px", borderRadius:"999px",
              background:"rgba(22,163,74,0.08)", color:C.green, fontWeight:700, border:"1px solid rgba(22,163,74,0.2)" }}>
              {dash.demand} demand
            </span>
          </div>
          <div style={{ fontSize:"14px", color:"#374151", lineHeight:1.7, marginBottom:"16px" }}>{dash.insight}</div>
          <div style={{ fontSize:"13px", color:C.muted }}>
            {dash.season}
          </div>
        </div>
      </div>
    );

    // ── PLAN ───────────────────────────────────────────────────
    if (activeNav === "plan") return (
      <div>
        <h2 style={{ fontSize:"22px", fontWeight:800, color:"#111827", marginBottom:"4px" }}>Business Plan</h2>
        <p style={{ fontSize:"14px", color:C.muted, marginBottom:"24px" }}>Your 3-month roadmap</p>
        <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:"20px", padding:"24px" }}>
          <div style={{ fontSize:"14px", color:"#374151", lineHeight:1.8, whiteSpace:"pre-wrap" as const }}>
            {data?.plan || "Your business plan will appear here after completing the full flow."}
          </div>
        </div>
      </div>
    );

    // ── MARKETING ─────────────────────────────────────────────
    if (activeNav === "marketing") return (
      <div>
        <h2 style={{ fontSize:"22px", fontWeight:800, color:"#111827", marginBottom:"4px" }}>Marketing</h2>
        <p style={{ fontSize:"14px", color:C.muted, marginBottom:"24px" }}>TikTok hooks, Meta angles and creator outreach</p>
        <div style={{ display:"flex", flexDirection:"column" as const, gap:"12px" }}>
          {dash.actions.map((a, i) => (
            <div key={i} style={{ background:C.white, border:`1px solid ${i===0 ? "rgba(234,88,12,0.25)" : C.border}`,
              borderRadius:"16px", padding:"18px", display:"flex", gap:"14px", alignItems:"flex-start" }}>
              <div style={{ fontSize:"22px", flexShrink:0 }}>{a.icon}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:"14px", color:"#111827", lineHeight:1.55, marginBottom:"8px" }}>{a.label}</div>
                <span style={{ fontSize:"11px", fontWeight:700,
                  color: a.impact === "High" ? C.orange : C.muted,
                  background: a.impact === "High" ? "rgba(234,88,12,0.08)" : C.light,
                  padding:"3px 8px", borderRadius:"999px",
                  border:`1px solid ${a.impact === "High" ? "rgba(234,88,12,0.2)" : C.border}` }}>
                  {a.impact} impact
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    );

    // ── SUPPLIERS ─────────────────────────────────────────────
    // ── SUPPLIERS (matchmaker) ────────────────────────────────
    if (activeNav === "suppliers") {
      const productName = storeData?.product_name || data?.product || "";
      const isDigital = storeData?.is_digital || false;
      const matches = getSupplierMatches(productName, isDigital);

      if (isDigital) {
        return (
          <div>
            <h2 style={{ fontSize:"22px", fontWeight:800, color:"#111827", marginBottom:"4px" }}>Suppliers</h2>
            <p style={{ fontSize:"14px", color:C.muted, marginBottom:"24px" }}>Fulfilment for your product</p>
            <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:"20px", padding:"32px", textAlign:"center" }}>
              <div style={{ fontSize:"36px", marginBottom:"12px" }}>💾</div>
              <div style={{ fontSize:"16px", fontWeight:700, color:"#111827", marginBottom:"8px" }}>No supplier needed</div>
              <div style={{ fontSize:"13px", color:C.muted, lineHeight:1.6, maxWidth:"420px", margin:"0 auto" }}>
                This is a digital product — there's nothing to source or ship. Your files are delivered automatically to customers after purchase. Just focus on marketing and sales.
              </div>
            </div>
          </div>
        );
      }

      return (
        <div>
          <h2 style={{ fontSize:"22px", fontWeight:800, color:"#111827", marginBottom:"4px" }}>Suppliers</h2>
          <p style={{ fontSize:"14px", color:C.muted, marginBottom:"20px" }}>
            {productName ? `Connect a supplier to fulfil orders for ${productName}` : "Connect a supplier to fulfil your orders"}
          </p>

          {/* How it works strip */}
          <div style={{ background:"rgba(234,88,12,0.04)", border:"1px solid rgba(234,88,12,0.15)", borderRadius:"16px", padding:"16px 18px", marginBottom:"20px", display:"flex", gap:"12px", alignItems:"flex-start" }}>
            <div style={{ fontSize:"20px", flexShrink:0 }}>💡</div>
            <div style={{ fontSize:"13px", color:"#374151", lineHeight:1.6 }}>
              <strong>How this works:</strong> Ember matches you to the best supplier for your product. You connect them to your store using their free tool, and they ship orders directly to your customers — you never hold stock. Start with the recommended option to test with zero risk.
            </div>
          </div>

          {/* Supplier cards */}
          <div style={{ display:"flex", flexDirection:"column" as const, gap:"14px" }}>
            {matches.map((s, i) => (
              <div key={i} style={{
                background:C.white,
                border: s.recommended ? `2px solid ${C.orange}` : `1px solid ${C.border}`,
                borderRadius:"20px", padding:"22px", position:"relative" as const,
              }}>
                {s.recommended && (
                  <div style={{ position:"absolute" as const, top:"-11px", left:"22px", background:C.orange, color:"white", fontSize:"10px", fontWeight:800, padding:"4px 12px", borderRadius:"999px", letterSpacing:"0.06em" }}>
                    ⭐ START HERE
                  </div>
                )}

                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:"12px", marginBottom:"12px", flexWrap:"wrap" as const }}>
                  <div style={{ display:"flex", gap:"12px", alignItems:"center" }}>
                    <div style={{ fontSize:"32px" }}>{s.logo}</div>
                    <div>
                      <div style={{ fontSize:"17px", fontWeight:800, color:"#111827" }}>{s.name}</div>
                      <div style={{ fontSize:"13px", color:C.orange, fontWeight:600 }}>{s.tagline}</div>
                    </div>
                  </div>
                  <a href={s.connectUrl} target="_blank" rel="noopener noreferrer"
                    style={{ padding:"10px 20px", borderRadius:"12px", border:"none",
                      background: s.recommended ? GRAD : "#111827", color:"white",
                      fontWeight:700, fontSize:"13px", cursor:"pointer", textDecoration:"none",
                      whiteSpace:"nowrap" as const, flexShrink:0 }}>
                    Connect {s.name.split(" ")[0]} →
                  </a>
                </div>

                <div style={{ fontSize:"13px", color:"#6b7280", lineHeight:1.6, marginBottom:"16px" }}>
                  <strong style={{ color:"#374151" }}>Best for:</strong> {s.bestFor}
                </div>

                {/* Pros / cons */}
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px", marginBottom:"16px" }} className="supplier-proscons">
                  <div style={{ background:"rgba(22,163,74,0.04)", border:"1px solid rgba(22,163,74,0.12)", borderRadius:"12px", padding:"12px 14px" }}>
                    <div style={{ fontSize:"10px", fontWeight:700, color:C.green, letterSpacing:"0.06em", textTransform:"uppercase" as const, marginBottom:"8px" }}>Pros</div>
                    {s.proCons.pros.map((pro, j) => (
                      <div key={j} style={{ fontSize:"12px", color:"#374151", lineHeight:1.5, marginBottom:"5px", display:"flex", gap:"6px" }}>
                        <span style={{ color:C.green, flexShrink:0 }}>✓</span> {pro}
                      </div>
                    ))}
                  </div>
                  <div style={{ background:"rgba(0,0,0,0.02)", border:`1px solid ${C.border}`, borderRadius:"12px", padding:"12px 14px" }}>
                    <div style={{ fontSize:"10px", fontWeight:700, color:C.muted, letterSpacing:"0.06em", textTransform:"uppercase" as const, marginBottom:"8px" }}>Trade-offs</div>
                    {s.proCons.cons.map((con, j) => (
                      <div key={j} style={{ fontSize:"12px", color:"#6b7280", lineHeight:1.5, marginBottom:"5px", display:"flex", gap:"6px" }}>
                        <span style={{ color:C.muted, flexShrink:0 }}>•</span> {con}
                      </div>
                    ))}
                  </div>
                </div>

                {/* How fulfilment works */}
                <div style={{ background:C.light, borderRadius:"12px", padding:"12px 14px", marginBottom:"16px" }}>
                  <div style={{ fontSize:"10px", fontWeight:700, color:"#374151", letterSpacing:"0.06em", textTransform:"uppercase" as const, marginBottom:"6px" }}>How fulfilment works</div>
                  <div style={{ fontSize:"12px", color:"#6b7280", lineHeight:1.6 }}>{s.fulfilment}</div>
                </div>

                {/* Setup steps */}
                <details style={{ cursor:"pointer" }}>
                  <summary style={{ fontSize:"13px", fontWeight:700, color:C.orange, listStyle:"none", userSelect:"none" as const }}>
                    Show setup steps ↓
                  </summary>
                  <div style={{ marginTop:"12px", display:"flex", flexDirection:"column" as const, gap:"8px" }}>
                    {s.setupSteps.map((step, j) => (
                      <div key={j} style={{ display:"flex", gap:"10px", alignItems:"flex-start" }}>
                        <div style={{ width:"20px", height:"20px", borderRadius:"50%", background:"rgba(234,88,12,0.1)", color:C.orange, fontSize:"11px", fontWeight:800, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:"1px" }}>{j+1}</div>
                        <div style={{ fontSize:"13px", color:"#374151", lineHeight:1.6 }}>{step}</div>
                      </div>
                    ))}
                  </div>
                </details>
              </div>
            ))}
          </div>

          {/* Footer note */}
          <div style={{ marginTop:"16px", padding:"14px 18px", background:C.light, borderRadius:"14px", fontSize:"12px", color:C.muted, lineHeight:1.6 }}>
            💡 Always order a sample before selling — check quality, shipping time and packaging yourself first. Ember matches you to suppliers but doesn't handle fulfilment directly.
          </div>
        </div>
      );
    }

    // ── PLAYBOOK ──────────────────────────────────────────────
    if (activeNav === "playbook") return (
      <div>
        <h2 style={{ fontSize:"22px", fontWeight:800, color:"#111827", marginBottom:"4px" }}>Sales Playbook</h2>
        <p style={{ fontSize:"14px", color:C.muted, marginBottom:"24px" }}>Your complete guide to first sales</p>
        <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:"20px", padding:"24px" }}>
          {dash.competitors.map((comp, i) => (
            <div key={i} style={{ padding:"18px", borderRadius:"14px", background:C.light,
              border:`1px solid ${C.border}`, marginBottom:"12px" }}>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center",
                marginBottom:"12px" }}>
                <div style={{ fontSize:"15px", fontWeight:700, color:"#111827" }}>{comp.name}</div>
                <div style={{ fontSize:"12px", fontWeight:600, color:C.orange,
                  background:"rgba(234,88,12,0.08)", padding:"3px 10px", borderRadius:"999px" }}>
                  {comp.price}
                </div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:"12px" }}>
                {[
                  { label:"Strength", val:comp.strength, color:C.green },
                  { label:"Weakness", val:comp.weakness, color:C.red },
                  { label:"Your gap", val:comp.gap, color:C.orange },
                ].map((item, j) => (
                  <div key={j}>
                    <div style={{ fontSize:"10px", fontWeight:700, letterSpacing:"0.08em",
                      textTransform:"uppercase" as const, color:item.color, marginBottom:"4px" }}>{item.label}</div>
                    <div style={{ fontSize:"12px", color:"#374151", lineHeight:1.5 }}>{item.val}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );

    // ── PHASE 2 ANALYTICS ─────────────────────────────────────
    // ── ORDERS (live) ────────────────────────────────────────────
    if (activeNav === "orders") {
      return (
        <div>
          <h2 style={{ fontSize:"22px", fontWeight:800, color:"#111827", marginBottom:"4px" }}>Orders</h2>
          <p style={{ fontSize:"14px", color:C.muted, marginBottom:"24px" }}>
            {orders.length > 0 ? `${orders.length} total orders` : "No orders yet — share your store link to get your first sale"}
          </p>
          {orders.length === 0 ? (
            <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:"20px", padding:"40px", textAlign:"center" }}>
              <div style={{ fontSize:"40px", marginBottom:"12px" }}>🛒</div>
              <div style={{ fontSize:"15px", fontWeight:700, color:"#111827", marginBottom:"6px" }}>No orders yet</div>
              <div style={{ fontSize:"13px", color:C.muted, marginBottom:"20px" }}>
                {storeData?.subdomain
                  ? `Share ${storeData.subdomain}.useember.io to get your first sale`
                  : "Publish your store to start selling"}
              </div>
              <button onClick={() => setActiveNav("store")} style={{ padding:"10px 20px", borderRadius:"10px", border:"none", background:GRAD, color:"white", fontWeight:700, fontSize:"13px", cursor:"pointer" }}>
                {storeData?.subdomain ? "Copy store link" : "Set up store →"}
              </button>
            </div>
          ) : (
            <div style={{ display:"flex", flexDirection:"column" as const, gap:"8px" }}>
              {orders.map((order: any, i: number) => (
                <div key={i} style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:"16px", padding:"16px", display:"flex", justifyContent:"space-between", alignItems:"center", gap:"12px", flexWrap:"wrap" as const }}>
                  <div>
                    <div style={{ fontSize:"14px", fontWeight:700, color:"#111827" }}>{order.product_name || "Order"}</div>
                    <div style={{ fontSize:"12px", color:C.muted }}>{order.customer_email || "No email"} · {new Date(order.created_at).toLocaleDateString("en-GB")}</div>
                  </div>
                  <div style={{ fontSize:"16px", fontWeight:800, color:C.green }}>£{((order.amount_pence || 0) / 100).toFixed(2)}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    // ── TRAFFIC (live analytics) ──────────────────────────────
    if (activeNav === "traffic") {
      const a = analytics;
      const hasStore = a?.hasStore;
      const maxViews = a?.series ? Math.max(...a.series.map((s: any) => s.views), 1) : 1;

      return (
        <div>
          <h2 style={{ fontSize:"22px", fontWeight:800, color:"#111827", marginBottom:"4px" }}>Traffic</h2>
          <p style={{ fontSize:"14px", color:C.muted, marginBottom:"24px" }}>
            {hasStore ? `Live analytics for ${a.subdomain}.useember.io` : "Publish your store to start tracking traffic"}
          </p>

          {!hasStore ? (
            <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:"20px", padding:"40px", textAlign:"center" }}>
              <div style={{ fontSize:"40px", marginBottom:"12px" }}>📈</div>
              <div style={{ fontSize:"15px", fontWeight:700, color:"#111827", marginBottom:"6px" }}>No traffic data yet</div>
              <div style={{ fontSize:"13px", color:C.muted, marginBottom:"20px" }}>Publish your store to a subdomain and traffic will start showing here.</div>
              <button onClick={() => setActiveNav("store")} style={{ padding:"10px 20px", borderRadius:"10px", border:"none", background:GRAD, color:"white", fontWeight:700, fontSize:"13px", cursor:"pointer" }}>
                Set up store →
              </button>
            </div>
          ) : (
            <>
              {/* Stat cards */}
              <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))", gap:"12px", marginBottom:"20px" }}>
                {/* Live now */}
                <div style={{ background:C.white, border: a.liveNow > 0 ? `2px solid ${C.green}` : `1px solid ${C.border}`, borderRadius:"16px", padding:"18px" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"6px", marginBottom:"8px" }}>
                    <div style={{ width:"8px", height:"8px", borderRadius:"50%", background: a.liveNow > 0 ? C.green : "#D1D5DB", animation: a.liveNow > 0 ? "pulse 1.5s ease-in-out infinite" : "none" }} />
                    <div style={{ fontSize:"11px", fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase" as const, color:C.muted }}>Live now</div>
                  </div>
                  <div style={{ fontSize:"28px", fontWeight:800, color: a.liveNow > 0 ? C.green : "#111827" }}>{a.liveNow}</div>
                  <div style={{ fontSize:"11px", color:C.muted }}>active in last 60s</div>
                </div>
                {/* Views today */}
                <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:"16px", padding:"18px" }}>
                  <div style={{ fontSize:"11px", fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase" as const, color:C.muted, marginBottom:"8px" }}>Views today</div>
                  <div style={{ fontSize:"28px", fontWeight:800, color:"#111827" }}>{a.viewsToday}</div>
                  <div style={{ fontSize:"11px", color:C.muted }}>since midnight</div>
                </div>
                {/* Total views */}
                <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:"16px", padding:"18px" }}>
                  <div style={{ fontSize:"11px", fontWeight:700, letterSpacing:"0.06em", textTransform:"uppercase" as const, color:C.muted, marginBottom:"8px" }}>Total views</div>
                  <div style={{ fontSize:"28px", fontWeight:800, color:C.orange }}>{a.totalViews}</div>
                  <div style={{ fontSize:"11px", color:C.muted }}>all time</div>
                </div>
              </div>

              {/* 7-day chart */}
              <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:"20px", padding:"24px" }}>
                <div style={{ fontSize:"14px", fontWeight:700, color:"#111827", marginBottom:"20px" }}>Last 7 days</div>
                <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", gap:"8px", height:"140px" }}>
                  {a.series.map((s: any, i: number) => (
                    <div key={i} style={{ flex:1, display:"flex", flexDirection:"column" as const, alignItems:"center", gap:"8px", height:"100%" }}>
                      <div style={{ flex:1, width:"100%", display:"flex", alignItems:"flex-end", justifyContent:"center" }}>
                        <div style={{
                          width:"70%", maxWidth:"36px",
                          height: `${Math.max((s.views / maxViews) * 100, s.views > 0 ? 6 : 2)}%`,
                          background: s.views > 0 ? GRAD : "#E5E7EB",
                          borderRadius:"6px 6px 0 0",
                          transition:"height 0.4s ease",
                          position:"relative" as const,
                        }} title={`${s.views} views`}>
                          {s.views > 0 && (
                            <div style={{ position:"absolute" as const, top:"-20px", left:"50%", transform:"translateX(-50%)", fontSize:"11px", fontWeight:700, color:"#374151", whiteSpace:"nowrap" as const }}>{s.views}</div>
                          )}
                        </div>
                      </div>
                      <div style={{ fontSize:"11px", color:C.muted, fontWeight:600 }}>{s.day}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginTop:"16px", padding:"14px 18px", background:C.light, borderRadius:"14px", fontSize:"12px", color:C.muted, lineHeight:1.6 }}>
                💡 Traffic updates live. Share your store link on TikTok, Reddit and with creators to drive visitors — then watch this fill up.
              </div>
            </>
          )}
        </div>
      );
    }

    // ── PHASE 2 ANALYTICS (revenue/customers only now) ────────
    if (["revenue","customers"].includes(activeNav)) {
      const phase2Items: Record<string, {icon:string;title:string;desc:string}> = {
        revenue:   { icon:"💰", title:"Revenue tracking", desc:"See total revenue, daily trends and profit margins from your Ember store in real time" },
        orders:    { icon:"🛒", title:"Order management", desc:"View all incoming orders, manage fulfilment and track delivery status" },
        customers: { icon:"👥", title:"Customer insights", desc:"See who your customers are, their purchase history and lifetime value" },
        traffic:   { icon:"📈", title:"Traffic analytics", desc:"See where your visitors come from and which channels convert best" },
      };
      const item = phase2Items[activeNav];
      return (
        <div style={{ display:"flex", flexDirection:"column" as const, alignItems:"center",
          justifyContent:"center", minHeight:"60vh", textAlign:"center" as const, padding:"40px" }}>
          <div style={{ fontSize:"48px", marginBottom:"16px" }}>{item.icon}</div>
          <h2 style={{ fontSize:"24px", fontWeight:800, color:"#111827", marginBottom:"8px" }}>{item.title}</h2>
          <p style={{ fontSize:"15px", color:C.muted, maxWidth:"400px", lineHeight:1.6, marginBottom:"24px" }}>{item.desc}</p>
          <div style={{ padding:"6px 16px", background:"rgba(234,88,12,0.08)",
            border:"1px solid rgba(234,88,12,0.2)", borderRadius:"999px",
            fontSize:"13px", fontWeight:700, color:C.orange }}>
            Launching in Phase 2 — connected to Stripe
          </div>
        </div>
      );
    }

    // ── PHASE 2 TOOLS ─────────────────────────────────────────
    if (["advisor","alerts","abtests"].includes(activeNav)) {
      const toolItems: Record<string, {icon:string;title:string;desc:string}> = {
        advisor: { icon:"🤖", title:"AI Advisor", desc:"Ask Ember anything about your business. Get instant advice on marketing, pricing, suppliers and growth strategy." },
        alerts:  { icon:"🔔", title:"Product Alerts", desc:"Every Monday we send you the top 3 trending products in your niche based on live TikTok and Shopify data." },
        abtests: { icon:"⚗️", title:"A/B Tests", desc:"Test different store headlines, prices and layouts. Ember picks the winner automatically." },
      };
      const item = toolItems[activeNav];
      return (
        <div style={{ display:"flex", flexDirection:"column" as const, alignItems:"center",
          justifyContent:"center", minHeight:"60vh", textAlign:"center" as const, padding:"40px" }}>
          <div style={{ fontSize:"48px", marginBottom:"16px" }}>{item.icon}</div>
          <h2 style={{ fontSize:"24px", fontWeight:800, color:"#111827", marginBottom:"8px" }}>{item.title}</h2>
          <p style={{ fontSize:"15px", color:C.muted, maxWidth:"400px", lineHeight:1.6, marginBottom:"24px" }}>{item.desc}</p>
          <div style={{ padding:"6px 16px", background:"rgba(234,88,12,0.08)",
            border:"1px solid rgba(234,88,12,0.2)", borderRadius:"999px",
            fontSize:"13px", fontWeight:700, color:C.orange }}>
            Launching in Phase 2
          </div>
        </div>
      );
    }

    // ── SETTINGS ──────────────────────────────────────────────
    if (activeNav === "settings") return (
      <div>
        <h2 style={{ fontSize:"22px", fontWeight:800, color:"#111827", marginBottom:"4px" }}>Settings</h2>
        <p style={{ fontSize:"14px", color:C.muted, marginBottom:"24px" }}>Manage your account and plan</p>
        <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:"20px", padding:"24px", marginBottom:"16px" }}>
          <div style={{ fontSize:"13px", fontWeight:700, color:C.muted, marginBottom:"12px", letterSpacing:"0.06em" }}>PLAN</div>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", flexWrap:"wrap" as const, gap:"12px" }}>
            <div>
              <div style={{ fontSize:"18px", fontWeight:800, color:"#111827", marginBottom:"4px" }}>Ember Pro</div>
              <div style={{ fontSize:"13px", color:C.muted }}>£29/month · Founding member rate</div>
            </div>
            <button onClick={() => window.location.href = "/pricing"}
              style={{ padding:"10px 20px", borderRadius:"10px", border:`1px solid ${C.border}`,
                background:C.white, color:C.muted, fontWeight:600, fontSize:"13px", cursor:"pointer" }}>
              Manage plan
            </button>
          </div>
        </div>
        <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:"20px", padding:"24px" }}>
          <div style={{ fontSize:"13px", fontWeight:700, color:C.muted, marginBottom:"12px", letterSpacing:"0.06em" }}>ACCOUNT</div>
          <div style={{ fontSize:"14px", color:"#374151", marginBottom:"8px" }}>
            {session?.user?.email || localStorage.getItem("ember-email") || "Not signed in"}
          </div>
          <button onClick={() => window.location.href = "/"}
            style={{ padding:"10px 20px", borderRadius:"10px", border:`1px solid ${C.border}`,
              background:C.white, color:C.muted, fontWeight:600, fontSize:"13px", cursor:"pointer" }}>
            Sign out
          </button>
        </div>
      </div>
    );

    // ── GRANT ─────────────────────────────────────────────────
    if (activeNav === "grant") return (
      <div>
        <h2 style={{ fontSize:"22px", fontWeight:800, color:"#111827", marginBottom:"4px" }}>Ember Business Grant</h2>
        <p style={{ fontSize:"14px", color:C.muted, marginBottom:"24px" }}>Your monthly chance to win a fully built business</p>
        <div style={{ background:"rgba(234,88,12,0.04)", border:"1px solid rgba(234,88,12,0.2)",
          borderRadius:"20px", padding:"28px", textAlign:"center" as const }}>
          <div style={{ fontSize:"48px", marginBottom:"16px" }}>🎁</div>
          <div style={{ fontSize:"20px", fontWeight:800, color:"#111827", marginBottom:"8px" }}>
            You're entered this month
          </div>
          <div style={{ fontSize:"14px", color:C.muted, lineHeight:1.7, maxWidth:"400px", margin:"0 auto 20px" }}>
            Every Pro member is automatically entered into a monthly draw.
            One winner gets a fully built and coached ecom business — built by Ember,
            run for a month with real ad spend, then handed over with training.
          </div>
          <div style={{ display:"flex", gap:"12px", justifyContent:"center", flexWrap:"wrap" as const }}>
            <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:"14px", padding:"16px 20px" }}>
              <div style={{ fontSize:"11px", fontWeight:700, color:C.muted, marginBottom:"4px" }}>DRAW DATE</div>
              <div style={{ fontSize:"16px", fontWeight:800, color:"#111827" }}>End of month</div>
            </div>
            <div style={{ background:C.white, border:`1px solid ${C.border}`, borderRadius:"14px", padding:"16px 20px" }}>
              <div style={{ fontSize:"11px", fontWeight:700, color:C.muted, marginBottom:"4px" }}>YOUR ENTRIES</div>
              <div style={{ fontSize:"16px", fontWeight:800, color:C.orange }}>1 this month</div>
            </div>
          </div>
        </div>
      </div>
    );

    return null;
  }

  // ── Layout ────────────────────────────────────────────────────
  return (
    <div style={{ display:"flex", minHeight:"100vh", background:C.light,
      fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif" }}>

      {/* Desktop sidebar */}
      <div className="desktop-sidebar">
        {sidebar}
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <>
          <div onClick={() => setSidebarOpen(false)}
            style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.4)", zIndex:100 }} />
          <div style={{ position:"fixed", left:0, top:0, bottom:0, zIndex:101, width:"240px" }}>
            {sidebar}
          </div>
        </>
      )}

      {/* Main content */}
      <div style={{ flex:1, minWidth:0 }}>

        {/* Top bar */}
        <div style={{ position:"sticky" as const, top:0, zIndex:50, background:"rgba(248,250,252,0.9)",
          backdropFilter:"blur(12px)", borderBottom:`1px solid ${C.border}`,
          padding:"0 24px", height:"56px", display:"flex", alignItems:"center",
          justifyContent:"space-between" }}>

          {/* Mobile hamburger */}
          <button onClick={() => setSidebarOpen(true)} className="mobile-menu-btn"
            style={{ width:"36px", height:"36px", borderRadius:"8px", border:`1px solid ${C.border}`,
              background:C.white, cursor:"pointer", display:"flex", flexDirection:"column" as const,
              alignItems:"center", justifyContent:"center", gap:"4px", marginRight:"12px" }}>
            <div style={{ width:"16px", height:"2px", background:"#374151", borderRadius:"1px" }} />
            <div style={{ width:"16px", height:"2px", background:"#374151", borderRadius:"1px" }} />
            <div style={{ width:"16px", height:"2px", background:"#374151", borderRadius:"1px" }} />
          </button>

          <div style={{ fontSize:"15px", fontWeight:700, color:"#111827" }}>
            {NAV.find(n => n.id === activeNav)?.label || "Dashboard"}
          </div>

          <button onClick={() => window.location.href = "/"}
            style={{ padding:"8px 16px", borderRadius:"10px", border:"none",
              background:GRAD, color:"white", fontWeight:700, fontSize:"13px", cursor:"pointer" }}>
            Build another →
          </button>
        </div>

        {/* Page content */}
        <div style={{ padding:"28px 24px 80px", maxWidth:"900px" }}>
          {renderContent()}
        </div>

        {/* Mobile bottom tabs */}
        <div className="mobile-tabs" style={{ position:"fixed" as const, bottom:0, left:0, right:0,
          background:C.white, borderTop:`1px solid ${C.border}`, display:"flex",
          padding:"8px 0 env(safe-area-inset-bottom)", zIndex:50 }}>
          {[
            { id:"overview", icon:"⊞", label:"Home" },
            { id:"store",    icon:"🏪", label:"Store" },
            { id:"marketing",icon:"📣", label:"Growth" },
            { id:"settings", icon:"⚙️", label:"Account" },
          ].map(tab => (
            <button key={tab.id} onClick={() => setActiveNav(tab.id)}
              style={{ flex:1, display:"flex", flexDirection:"column" as const, alignItems:"center",
                gap:"3px", padding:"6px 4px", border:"none", background:"transparent",
                cursor:"pointer" }}>
              <span style={{ fontSize:"20px" }}>{tab.icon}</span>
              <span style={{ fontSize:"10px", fontWeight: activeNav === tab.id ? 700 : 500,
                color: activeNav === tab.id ? C.orange : C.muted }}>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <style>{`
        .desktop-sidebar { display:flex; }
        .mobile-menu-btn { display:none; }
        .mobile-tabs { display:none; }
        @media(max-width:768px){
          .desktop-sidebar { display:none; }
          .mobile-menu-btn { display:flex !important; }
          .mobile-tabs { display:flex !important; }
        }
        @keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
      `}</style>
    </div>
  );
}