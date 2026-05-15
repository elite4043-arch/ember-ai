"use client";

import { useEffect, useState, useRef } from "react";

const C = {
  amber:  "#F59E0B",
  orange: "#EA580C",
  pink:   "#FB7185",
  yellow: "#FDE047",
  red:    "#EF4444",
};

const GRAD = `linear-gradient(135deg,#FDE047,#F59E0B,#EA580C,#EF4444,#FB7185)`;
const GLOW = `0 0 0 1px rgba(245,158,11,0.3), 0 0 24px rgba(234,88,12,0.12), 0 4px 16px rgba(0,0,0,0.3)`;
const GLOW_STRONG = `0 0 0 1px rgba(245,158,11,0.5), 0 0 40px rgba(234,88,12,0.2), 0 8px 24px rgba(0,0,0,0.4)`;
const GLOW_DRAG = `0 0 0 2px #F59E0B, 0 0 40px rgba(234,88,12,0.35), 0 20px 40px rgba(0,0,0,0.4)`;

// ── Dashboard data per product ──────────────────────────────────
type DashData = {
  marketSize: string;
  growth: string;
  demand: "High" | "Very High" | "Explosive";
  trend: "Rising" | "Stable" | "Surging";
  season: string;
  trendScore: number;
  searchVolume: string;
  socialMomentum: string;
  competitors: { name: string; price: string; strength: string; weakness: string; gap: string }[];
  actions: { label: string; impact: "High" | "Medium"; icon: string }[];
  insight: string;
};

const DASHBOARD_DATA: Record<string, DashData> = {
  "Resistance Bands": {
    marketSize: "£4.2B", growth: "+18% YoY", demand: "Very High", trend: "Rising",
    season: "Peak demand Jan-Mar (New Year), Sep-Oct (back to routine)",
    trendScore: 87, searchVolume: "1.2M searches/month UK", socialMomentum: "TikTok views +340% this quarter",
    competitors: [
      { name: "Gymshark", price: "£35-55", strength: "Massive brand loyalty, influencer network", weakness: "Premium pricing excludes beginners", gap: "Affordable beginner positioning" },
      { name: "Amazon Basics", price: "£12-18", strength: "Low price, Prime delivery", weakness: "Zero brand story, no community", gap: "Brand story and lifestyle angle" },
      { name: "Decathlon", price: "£8-25", strength: "Physical stores, trusted name", weakness: "Generic, no personality, boring content", gap: "Content-led brand with personality" },
    ],
    actions: [
      { label: "Film 3 TikTok videos this week — resistance band workouts under 60 seconds", impact: "High", icon: "🎬" },
      { label: "Contact 5 beginner fitness creators (10k-50k followers) for gifting", impact: "High", icon: "📩" },
      { label: "Set up Meta ad at £10/day targeting women 18-35, fitness beginners", impact: "High", icon: "📣" },
      { label: "Order 10 sample units from your supplier and film unboxing content", impact: "Medium", icon: "📦" },
      { label: "Add customer review request email to trigger 7 days after purchase", impact: "Medium", icon: "⭐" },
    ],
    insight: "Resistance bands are outperforming all other home fitness products on TikTok Shop this quarter. The beginner angle is underserved — major brands chase experienced gym-goers.",
  },
  "LED Face Mask": {
    marketSize: "£1.8B", growth: "+34% YoY", demand: "Explosive", trend: "Surging",
    season: "Year-round with peaks Nov-Dec (gifting) and Jan (New Year skin goals)",
    trendScore: 91, searchVolume: "890K searches/month UK", socialMomentum: "Skincare TikTok views +580% this quarter",
    competitors: [
      { name: "CurrentBody", price: "£299-499", strength: "Clinical credibility, medical-grade claims", weakness: "Price excludes mass market", gap: "Accessible at-home clinic positioning" },
      { name: "Dr Dennis Gross", price: "£189-249", strength: "Dermatologist backed, premium brand", weakness: "No lifestyle content, very corporate", gap: "Lifestyle and routine-based content" },
      { name: "Amazon sellers", price: "£39-79", strength: "Low price, fast delivery", weakness: "Zero trust, no brand, no story", gap: "Trusted brand with real results content" },
    ],
    actions: [
      { label: "Create a 30-day skin transformation challenge content series", impact: "High", icon: "✨" },
      { label: "Partner with skincare micro-influencers for authentic before/after content", impact: "High", icon: "📩" },
      { label: "Target Meta ads at women 25-45 interested in skincare, anti-aging", impact: "High", icon: "📣" },
      { label: "Build an email sequence educating customers on LED wavelength benefits", impact: "Medium", icon: "📧" },
      { label: "Create a skincare routine bundle — mask + serum + moisturiser", impact: "Medium", icon: "🛍️" },
    ],
    insight: "LED skincare is the fastest growing beauty category globally. The gap between £300+ clinical devices and cheap unbranded options is massive — and yours fills it perfectly.",
  },
  "Auto Pet Feeder": {
    marketSize: "£2.1B", growth: "+22% YoY", demand: "High", trend: "Rising",
    season: "Peak demand Dec (gifting), Jan (New Year pet goals), consistent year-round",
    trendScore: 82, searchVolume: "540K searches/month UK", socialMomentum: "Pet TikTok content +220% engagement",
    competitors: [
      { name: "Petlibro", price: "£45-89", strength: "Strong Amazon presence, good reviews", weakness: "No UK-specific brand story", gap: "UK-first pet brand with personality" },
      { name: "PetSafe", price: "£59-120", strength: "Trusted vet-recommended brand", weakness: "Expensive, clinical not lifestyle", gap: "Fun, relatable pet parent content" },
      { name: "Amazon unbranded", price: "£25-40", strength: "Low price, accessible", weakness: "No trust, poor quality perception", gap: "Quality positioning with social proof" },
    ],
    actions: [
      { label: "Film your pet using the feeder — authentic content outperforms staged ads", impact: "High", icon: "🎬" },
      { label: "Join pet owner Facebook groups and share genuinely helpful content", impact: "High", icon: "🐾" },
      { label: "Target Meta ads at pet owners, dog/cat lovers, urban apartment dwellers", impact: "High", icon: "📣" },
      { label: "Create a 'working from home pet parent' content angle", impact: "Medium", icon: "🏠" },
      { label: "Set up subscription model for premium food pouches as upsell", impact: "Medium", icon: "🔄" },
    ],
    insight: "Pet spending is recession-proof — owners treat pets like family members and don't cut back. The smart feeding angle appeals to guilt-conscious pet parents who work long hours.",
  },
  "Massage Gun": {
    marketSize: "£3.4B", growth: "+28% YoY", demand: "Very High", trend: "Rising",
    season: "Peak Jan (New Year fitness), consistent growth throughout year",
    trendScore: 88, searchVolume: "780K searches/month UK", socialMomentum: "Recovery content +410% on TikTok",
    competitors: [
      { name: "Theragun", price: "£175-599", strength: "Market leader, clinical credibility", weakness: "Premium price alienates casual users", gap: "Same results at accessible price" },
      { name: "Hyperice", price: "£129-399", strength: "Pro athlete endorsements", weakness: "Too sports-focused, misses wellness angle", gap: "Everyday wellness and recovery positioning" },
      { name: "Bob and Brad", price: "£45-89", strength: "YouTube reviews drove massive sales", weakness: "Brand feels generic and clinical", gap: "Lifestyle recovery content and community" },
    ],
    actions: [
      { label: "Create 'post workout recovery routine' content series for TikTok", impact: "High", icon: "💪" },
      { label: "Target gym goers, runners, CrossFit community on Meta", impact: "High", icon: "📣" },
      { label: "Partner with fitness and physio creators for credibility content", impact: "High", icon: "📩" },
      { label: "Create a muscle group targeting guide as lead magnet", impact: "Medium", icon: "📋" },
      { label: "Bundle with resistance bands for a 'complete recovery kit'", impact: "Medium", icon: "🛍️" },
    ],
    insight: "Recovery is the fastest growing fitness segment. As workout culture grows, so does the demand for recovery tools. The wellness angle opens this beyond just athletes to office workers, parents, and anyone with muscle tension.",
  },
};

function getDefaultData(product: string): DashData {
  return {
    marketSize: "£2.5B", growth: "+20% YoY", demand: "High", trend: "Rising",
    season: "Strong year-round demand with seasonal peaks",
    trendScore: 78, searchVolume: "600K searches/month UK", socialMomentum: "Social engagement growing fast",
    competitors: [
      { name: "Market Leader", price: "£50-150", strength: "Brand recognition, large marketing budget", weakness: "Premium pricing excludes beginners", gap: "Accessible entry-level positioning" },
      { name: "Amazon Sellers", price: "£20-40", strength: "Low price, Prime delivery", weakness: "Zero brand story or trust", gap: "Branded experience with community" },
      { name: "Established Retailer", price: "£40-80", strength: "Physical presence, trust", weakness: "Outdated marketing, no social presence", gap: "Content-first social brand" },
    ],
    actions: [
      { label: `Create 3 short-form videos showing ${product} in action this week`, impact: "High", icon: "🎬" },
      { label: "Contact 5 micro-influencers in your niche for gifting partnerships", impact: "High", icon: "📩" },
      { label: "Launch your first Meta ad at £10/day to your target audience", impact: "High", icon: "📣" },
      { label: "Order samples and document the unboxing experience on camera", impact: "Medium", icon: "📦" },
      { label: "Set up an automated review request email sequence", impact: "Medium", icon: "⭐" },
    ],
    insight: `${product} is showing strong market momentum. The key opportunity is building a brand story that the generic sellers cannot replicate.`,
  };
}

// ── Components ──────────────────────────────────────────────────
function Card({ children, style, id, onDragStart, onDragOver, onDrop, isDragging, isOver }: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  id?: string;
  onDragStart?: () => void;
  onDragOver?: (e: React.DragEvent) => void;
  onDrop?: () => void;
  isDragging?: boolean;
  isOver?: boolean;
}) {
  return (
    <div
      draggable={!!id}
      onDragStart={onDragStart}
      onDragOver={onDragOver}
      onDrop={onDrop}
      onDragEnd={() => {}}
      style={{
        background: "var(--card-bg)",
        borderRadius: "16px",
        padding: "24px",
        boxShadow: isDragging ? GLOW_DRAG : isOver ? GLOW_STRONG : GLOW,
        border: isOver ? "1px solid rgba(245,158,11,0.5)" : "1px solid rgba(245,158,11,0.15)",
        transition: "box-shadow 0.2s ease, transform 0.2s ease, opacity 0.2s ease",
        opacity: isDragging ? 0.4 : 1,
        transform: isOver ? "scale(1.01)" : "scale(1)",
        cursor: id ? "grab" : "default",
        position: "relative" as const,
        ...style,
      }}
      onMouseEnter={(e) => { if (!isDragging) e.currentTarget.style.boxShadow = GLOW_STRONG; }}
      onMouseLeave={(e) => { if (!isDragging) e.currentTarget.style.boxShadow = GLOW; }}>
      {id && (
        <div style={{
          position: "absolute" as const, top: "14px", right: "14px",
          color: "var(--sub)", fontSize: "14px", opacity: 0.4,
          cursor: "grab", userSelect: "none" as const,
        }}>
          ⠿
        </div>
      )}
      {children}
    </div>
  );
}

function GradText({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <span style={{
      background: GRAD,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      ...style,
    }}>
      {children}
    </span>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontSize: "10px", fontWeight: 700, letterSpacing: "0.15em",
      textTransform: "uppercase" as const, color: "var(--sub)",
      marginBottom: "12px",
    }}>
      {children}
    </div>
  );
}

function TrendBar({ value, label }: { value: number; label: string }) {
  return (
    <div style={{ marginBottom: "12px" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "6px" }}>
        <span style={{ fontSize: "12px", color: "var(--sub)" }}>{label}</span>
        <span style={{ fontSize: "12px", fontWeight: 700, color: C.amber }}>{value}/100</span>
      </div>
      <div style={{ height: "6px", background: "rgba(255,255,255,0.06)", borderRadius: "3px", overflow: "hidden" }}>
        <div style={{
          height: "100%", width: `${value}%`,
          background: GRAD,
          borderRadius: "3px",
          transition: "width 1s cubic-bezier(0.22,1,0.36,1)",
        }} />
      </div>
    </div>
  );
}

// ── Main Dashboard ──────────────────────────────────────────────
export default function DashboardPage() {
  const [data, setData] = useState<any>(null);
  const [dash, setDash] = useState<DashData | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [cardOrder, setCardOrder] = useState(["market","competitors","actions","shopify","coming"]);
  const [dragging, setDragging] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("ember-final");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setData(parsed);
        const d = DASHBOARD_DATA[parsed.product] || getDefaultData(parsed.product || "Your Product");
        setDash(d);
      } catch {}
    } else {
      setData({ product: "Resistance Bands", brand: "FlexBands", industry: "Fitness", tagline: "Home fitness made simple" });
      setDash(DASHBOARD_DATA["Resistance Bands"]);
    }
    // Load saved card order
    const savedOrder = localStorage.getItem("ember-card-order");
    if (savedOrder) { try { setCardOrder(JSON.parse(savedOrder)); } catch {} }
    setTimeout(() => setLoaded(true), 100);
  }, []);

  function handleDragStart(id: string) {
    setDragging(id);
  }

  function handleDragOver(e: React.DragEvent, id: string) {
    e.preventDefault();
    if (id !== dragging) setDragOver(id);
  }

  function handleDrop(targetId: string) {
    if (!dragging || dragging === targetId) { setDragging(null); setDragOver(null); return; }
    const newOrder = [...cardOrder];
    const fromIdx = newOrder.indexOf(dragging);
    const toIdx = newOrder.indexOf(targetId);
    newOrder.splice(fromIdx, 1);
    newOrder.splice(toIdx, 0, dragging);
    setCardOrder(newOrder);
    localStorage.setItem("ember-card-order", JSON.stringify(newOrder));
    setDragging(null);
    setDragOver(null);
  }

  function handleDragEnd() {
    setDragging(null);
    setDragOver(null);
  }

  const launchDate = new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" });

  if (!dash) return (
    <div style={{ minHeight: "100vh", background: "#0a0a0a", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ fontSize: "40px", animation: "pulse 1.5s ease-in-out infinite" }}>🔥</div>
    </div>
  );

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif" }}
      className="dashboard-root">
      <style>{`
        :root { --bg:#0a0a0a; --card-bg:rgba(255,255,255,0.03); --text:white; --sub:rgba(255,255,255,0.4); --border:rgba(245,158,11,0.15); }
        @media(prefers-color-scheme:light){
          :root { --bg:#f9fafb; --card-bg:white; --text:#111827; --sub:#6b7280; --border:rgba(234,88,12,0.15); }
          .dashboard-root { color:#111827; }
        }
        @keyframes fadeInUp { from{opacity:0;transform:translateY(16px)} to{opacity:1;transform:translateY(0)} }
        @keyframes pulse { 0%,100%{transform:scale(1)} 50%{transform:scale(1.08)} }
        .card-anim { animation: fadeInUp 0.5s ease both; }
      `}</style>

      {/* Navbar */}
      <div style={{
        position: "sticky", top: 0, zIndex: 50,
        padding: "14px 32px",
        background: "var(--bg)",
        borderBottom: "1px solid var(--border)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        backdropFilter: "blur(20px)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "20px" }}>🔥</span>
          <span style={{ fontSize: "15px", fontWeight: 800, color: "var(--text)" }}>Ember</span>
          <span style={{ fontSize: "12px", color: "var(--sub)", marginLeft: "4px" }}>/ Dashboard</span>
        </div>
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => window.location.href = "/final"}
            style={{ padding: "8px 16px", borderRadius: "10px", border: "1px solid var(--border)", background: "transparent", color: "var(--sub)", fontWeight: 600, fontSize: "13px", cursor: "pointer" }}>
            ← Back
          </button>
          <button onClick={() => window.location.href = "/"}
            style={{ padding: "8px 16px", borderRadius: "10px", border: "none",
              background: GRAD, color: "white", fontWeight: 700, fontSize: "13px", cursor: "pointer",
              boxShadow: "0 4px 14px rgba(234,88,12,0.3)" }}>
            🔥 Build another
          </button>
        </div>
      </div>

      <div style={{ maxWidth: "960px", margin: "0 auto", padding: "40px 24px 80px" }}>

        {/* Business card */}
        <div className="card-anim" style={{ animationDelay: "0s", marginBottom: "24px" }}>
          <Card style={{ padding: "28px 28px", background: "rgba(234,88,12,0.05)", border: "1px solid rgba(234,88,12,0.2)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap" as const, gap: "16px" }}>
              <div>
                <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: C.amber, marginBottom: "8px" }}>
                  Your business
                </div>
                <div style={{ fontSize: "clamp(24px,4vw,36px)", fontWeight: 800, color: "var(--text)", letterSpacing: "-0.03em", marginBottom: "6px" }}>
                  <GradText>{data?.brand || "Your Brand"}</GradText>
                </div>
                <div style={{ fontSize: "15px", color: "var(--sub)", marginBottom: "12px" }}>
                  {data?.tagline || data?.product}
                </div>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" as const }}>
                  <span style={{ fontSize: "12px", padding: "4px 12px", borderRadius: "999px", background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.25)", color: C.amber, fontWeight: 600 }}>
                    {data?.industry || "Ecommerce"}
                  </span>
                  <span style={{ fontSize: "12px", padding: "4px 12px", borderRadius: "999px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--sub)", fontWeight: 600 }}>
                    Built {launchDate}
                  </span>
                  <span style={{ fontSize: "12px", padding: "4px 12px", borderRadius: "999px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "var(--sub)", fontWeight: 600 }}>
                    ⚡ Powered by Ember
                  </span>
                </div>
              </div>
              <div style={{ textAlign: "right" as const }}>
                <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "var(--sub)", marginBottom: "6px" }}>Market demand</div>
                <div style={{ fontSize: "40px", fontWeight: 800, letterSpacing: "-0.03em" }}>
                  <GradText>{dash.trendScore}</GradText>
                </div>
                <div style={{ fontSize: "12px", color: "var(--sub)" }}>out of 100</div>
              </div>
            </div>
          </Card>
        </div>

        {/* 3 col stats */}
        <div className="card-anim" style={{ animationDelay: "0.1s", display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "16px", marginBottom: "24px" }}>
          {[
            { label: "Market Size", value: dash.marketSize, sub: dash.growth, icon: "📊" },
            { label: "Monthly Searches", value: dash.searchVolume.split(" ")[0], sub: dash.searchVolume.split(" ").slice(1).join(" "), icon: "🔍" },
            { label: "Social Momentum", value: dash.trend, sub: dash.socialMomentum, icon: "📱" },
          ].map((s, i) => (
            <Card key={i} style={{ textAlign: "center" as const }}>
              <div style={{ fontSize: "24px", marginBottom: "10px" }}>{s.icon}</div>
              <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase" as const, color: "var(--sub)", marginBottom: "8px" }}>{s.label}</div>
              <div style={{ fontSize: "clamp(16px,3vw,22px)", fontWeight: 800, marginBottom: "4px" }}>
                <GradText>{s.value}</GradText>
              </div>
              <div style={{ fontSize: "11px", color: "var(--sub)" }}>{s.sub}</div>
            </Card>
          ))}
        </div>

        {/* Drag hint */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "16px", opacity: 0.5 }}>
          <span style={{ fontSize: "12px" }}>⠿</span>
          <span style={{ fontSize: "11px", color: "var(--sub)" }}>Drag cards to personalise your dashboard</span>
        </div>

        {/* Draggable cards in order */}
        {cardOrder.map((cardId, i) => {
          const delay = `${0.15 + i * 0.05}s`;
          const dragProps = {
            id: cardId,
            isDragging: dragging === cardId,
            isOver: dragOver === cardId,
            onDragStart: () => handleDragStart(cardId),
            onDragOver: (e: React.DragEvent) => handleDragOver(e, cardId),
            onDrop: () => handleDrop(cardId),
          };

          if (cardId === "market") return (
            <div key="market" className="card-anim" style={{ animationDelay: delay, marginBottom: "24px" }}
              onDragEnd={handleDragEnd}>
              <Card {...dragProps}>
                <Label>📈 Market pulse</Label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
                  <div>
                    <TrendBar value={dash!.trendScore} label="Overall demand score" />
                    <TrendBar value={Math.min(dash!.trendScore + 8, 100)} label="Social media momentum" />
                    <TrendBar value={Math.max(dash!.trendScore - 10, 50)} label="Search volume trend" />
                    <TrendBar value={Math.min(dash!.trendScore + 4, 100)} label="Market growth rate" />
                  </div>
                  <div>
                    <div style={{ fontSize: "12px", fontWeight: 700, color: C.amber, marginBottom: "10px" }}>Demand status</div>
                    <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "8px 16px", borderRadius: "999px", background: "rgba(234,88,12,0.1)", border: "1px solid rgba(234,88,12,0.25)", marginBottom: "16px" }}>
                      <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: C.orange, boxShadow: `0 0 8px ${C.orange}`, animation: "pulse 1.5s ease-in-out infinite" }} />
                      <span style={{ fontSize: "13px", fontWeight: 700, color: C.orange }}>{dash!.demand}</span>
                    </div>
                    <div style={{ fontSize: "13px", color: "var(--sub)", lineHeight: 1.7, marginBottom: "12px" }}>{dash!.season}</div>
                    <div style={{ fontSize: "13px", color: "var(--sub)", lineHeight: 1.7, padding: "12px", background: "rgba(245,158,11,0.05)", borderRadius: "10px", border: "1px solid rgba(245,158,11,0.1)" }}>
                      💡 {dash!.insight}
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          );

          if (cardId === "competitors") return (
            <div key="competitors" className="card-anim" style={{ animationDelay: delay, marginBottom: "24px" }}
              onDragEnd={handleDragEnd}>
              <Card {...dragProps}>
                <Label>🔍 Competitor analysis</Label>
                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {dash!.competitors.map((comp, i) => (
                    <div key={i} style={{ padding: "18px", borderRadius: "12px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px", flexWrap: "wrap" as const, gap: "8px" }}>
                        <div style={{ fontSize: "15px", fontWeight: 700, color: "var(--text)" }}>{comp.name}</div>
                        <div style={{ fontSize: "12px", fontWeight: 600, color: C.amber, padding: "3px 10px", borderRadius: "999px", background: "rgba(245,158,11,0.1)", border: "1px solid rgba(245,158,11,0.2)" }}>{comp.price}</div>
                      </div>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "12px" }}>
                        <div>
                          <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "rgba(34,197,94,0.7)", marginBottom: "5px" }}>✓ Strength</div>
                          <div style={{ fontSize: "12px", color: "var(--sub)", lineHeight: 1.6 }}>{comp.strength}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "rgba(239,68,68,0.7)", marginBottom: "5px" }}>✗ Weakness</div>
                          <div style={{ fontSize: "12px", color: "var(--sub)", lineHeight: 1.6 }}>{comp.weakness}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: C.amber, marginBottom: "5px" }}>⚡ Your gap</div>
                          <div style={{ fontSize: "12px", color: "var(--sub)", lineHeight: 1.6 }}>{comp.gap}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          );

          if (cardId === "actions") return (
            <div key="actions" className="card-anim" style={{ animationDelay: delay, marginBottom: "24px" }}
              onDragEnd={handleDragEnd}>
              <Card {...dragProps}>
                <Label>⚡ This week's actions</Label>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  {dash!.actions.map((a, i) => (
                    <div key={i} style={{
                      display: "flex", alignItems: "center", gap: "14px",
                      padding: "14px 16px", borderRadius: "12px",
                      background: i === 0 ? "rgba(234,88,12,0.06)" : "rgba(255,255,255,0.02)",
                      border: `1px solid ${i === 0 ? "rgba(234,88,12,0.2)" : "rgba(255,255,255,0.05)"}`,
                    }}>
                      <div style={{ fontSize: "22px", flexShrink: 0 }}>{a.icon}</div>
                      <div style={{ flex: 1, fontSize: "13px", color: "var(--text)", lineHeight: 1.6 }}>{a.label}</div>
                      <div style={{
                        fontSize: "10px", fontWeight: 700, padding: "3px 10px", borderRadius: "999px", flexShrink: 0,
                        background: a.impact === "High" ? "rgba(234,88,12,0.12)" : "rgba(255,255,255,0.05)",
                        border: `1px solid ${a.impact === "High" ? "rgba(234,88,12,0.3)" : "rgba(255,255,255,0.08)"}`,
                        color: a.impact === "High" ? C.orange : "var(--sub)",
                      }}>
                        {a.impact} impact
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          );

          if (cardId === "shopify") return (
            <div key="shopify" className="card-anim" style={{ animationDelay: delay, marginBottom: "24px" }}
              onDragEnd={handleDragEnd}>
              <Card {...dragProps} style={{ background: "rgba(255,255,255,0.02)", position: "relative" as const, overflow: "hidden" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
                  <Label>🛍️ Store performance</Label>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "5px 12px", borderRadius: "999px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: "rgba(255,255,255,0.2)" }} />
                    <span style={{ fontSize: "11px", color: "var(--sub)", fontWeight: 600 }}>Not connected</span>
                  </div>
                </div>
                <div style={{ position: "relative" as const }}>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "12px", marginBottom: "12px" }}>
                    {[
                      { icon: "💰", label: "Total revenue", value: "£2,340", sub: "+18% this week" },
                      { icon: "📦", label: "Orders placed", value: "67", sub: "Last 30 days" },
                      { icon: "📈", label: "Conversion rate", value: "3.4%", sub: "Industry avg 2.1%" },
                      { icon: "🏷️", label: "Avg order value", value: "£34.92", sub: "Per customer" },
                      { icon: "💵", label: "Gross profit", value: "£1,170", sub: "After product cost" },
                      { icon: "🔄", label: "Repeat customers", value: "23%", sub: "Returning buyers" },
                    ].map((m, i) => (
                      <div key={i} style={{ padding: "16px", borderRadius: "12px", background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.05)", filter: "blur(6px)", userSelect: "none" as const, pointerEvents: "none" as const }}>
                        <div style={{ fontSize: "18px", marginBottom: "6px" }}>{m.icon}</div>
                        <div style={{ fontSize: "10px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" as const, color: "var(--sub)", marginBottom: "6px" }}>{m.label}</div>
                        <div style={{ fontSize: "22px", fontWeight: 800, color: C.amber, marginBottom: "2px" }}>{m.value}</div>
                        <div style={{ fontSize: "11px", color: "var(--sub)" }}>{m.sub}</div>
                      </div>
                    ))}
                  </div>
                  <div style={{ position: "absolute" as const, inset: 0, display: "flex", flexDirection: "column" as const, alignItems: "center", justifyContent: "center", gap: "12px", background: "linear-gradient(to bottom, transparent 0%, var(--bg) 60%)" }}>
                    <div style={{ textAlign: "center" as const, padding: "0 24px", marginTop: "40px" }}>
                      <div style={{ fontSize: "24px", marginBottom: "10px" }}>🔒</div>
                      <div style={{ fontSize: "16px", fontWeight: 800, color: "var(--text)", marginBottom: "6px" }}>Connect your Shopify store</div>
                      <div style={{ fontSize: "13px", color: "var(--sub)", marginBottom: "16px", lineHeight: 1.6 }}>Track real revenue, orders, profit and conversion rate — all in one place</div>
                      <button onClick={() => { const email = prompt("Enter your email and we'll notify you when Shopify integration launches:"); if (email && email.includes("@")) { alert("You're on the list! We'll email you as soon as Shopify Connect launches 🔥"); } }}
                        style={{ padding: "12px 28px", borderRadius: "999px", border: "none", background: GRAD, color: "white", fontWeight: 700, fontSize: "14px", cursor: "pointer", boxShadow: "0 6px 20px rgba(234,88,12,0.3)" }}>
                        Connect Shopify →
                      </button>
                      <div style={{ fontSize: "11px", color: "var(--sub)", marginTop: "10px" }}>Coming in Phase 2 · Join waitlist to get early access</div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          );

          if (cardId === "coming") return (
            <div key="coming" className="card-anim" style={{ animationDelay: delay, marginBottom: "24px" }}
              onDragEnd={handleDragEnd}>
              <Card {...dragProps} style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)" }}>
                <Label>🚀 Coming to your dashboard</Label>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))", gap: "12px" }}>
                  {[
                    { icon: "📊", title: "Sales tracking", desc: "Revenue, orders and conversion rate in real time" },
                    { icon: "🤖", title: "AI advisor", desc: "Ask Ember anything about your business" },
                    { icon: "📧", title: "Customer inbox", desc: "AI drafts replies to every customer email" },
                    { icon: "📦", title: "Stock alerts", desc: "Never run out of your best seller again" },
                    { icon: "📣", title: "Ad performance", desc: "ROAS and attribution across TikTok and Meta" },
                    { icon: "📅", title: "Weekly report", desc: "Monday morning business summary to your inbox" },
                  ].map((f, i) => (
                    <div key={i} style={{ padding: "16px", borderRadius: "12px", background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.05)", opacity: 0.65 }}>
                      <div style={{ fontSize: "20px", marginBottom: "8px" }}>{f.icon}</div>
                      <div style={{ fontSize: "13px", fontWeight: 700, color: "var(--text)", marginBottom: "4px" }}>{f.title}</div>
                      <div style={{ fontSize: "11px", color: "var(--sub)", lineHeight: 1.6 }}>{f.desc}</div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: "20px", textAlign: "center" as const }}>
                  <div style={{ fontSize: "12px", color: "var(--sub)", marginBottom: "12px" }}>Phase 2 launching soon — be the first to know</div>
                  <button style={{ padding: "10px 28px", borderRadius: "999px", border: "none", background: GRAD, color: "white", fontWeight: 700, fontSize: "13px", cursor: "pointer", boxShadow: "0 6px 18px rgba(234,88,12,0.25)" }}>
                    Join the waitlist →
                  </button>
                </div>
              </Card>
            </div>
          );

          return null;
        })}

      </div>
    </div>
  );
}