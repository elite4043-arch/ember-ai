"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import { generateTemplateHTML, generateShopifySection } from "@/app/lib/generateStoreHTML";

type StoreProduct = { name: string; price: string; description: string };
type StoreData = {
  brand: string; headline: string; subheadline: string;
  price: string; cta: string; description: string;
  benefits: string[];
  sections: { title: string; text: string }[];
  products: StoreProduct[];
};
type StoreView = "preview" | "code";
type Screen = "store" | "editor";
type Template = 1 | 2 | 3 | 4;
type ElemStyle = {
  color: string;
  size: "sm" | "md" | "lg" | "xl";
  weight: "normal" | "bold" | "extrabold";
  align: "left" | "center" | "right";
};
type PopupState = { field: string; value: string; style: ElemStyle; x: number; y: number };

const C = { amber: "#F59E0B", orange: "#EA580C", pink: "#FB7185" };
const SIZE_MAP = { sm: "13px", md: "16px", lg: "22px", xl: "32px" };
const WEIGHT_MAP: Record<string, number> = { normal: 400, bold: 700, extrabold: 800 };

const IMAGE_POOLS: Record<string, string[]> = {
  "Adjustable Dumbbells":    ["photo-1599058917212-d750089bc07e","photo-1581009146145-b5ef050c2e1e"],
  "Resistance Bands":        ["photo-1571019613454-1cb2f99b2d8b","photo-1518611012118-696072aa579a"],
  "Posture Corrector":       ["photo-1554284126-aa88f22d8b74","photo-1552196563-55cd4e45efb3"],
  "Smart Jump Rope":         ["photo-1517960413843-0aee8e2b3285","photo-1571019613454-1cb2f99b2d8b"],
  "Gym Gloves":              ["photo-1599058917212-d750089bc07e","photo-1534438327276-14e5300c3a48"],
  "LED Face Mask":           ["photo-1522335789203-aabd1fc54bc9","photo-1596462502278-27bfdc403348"],
  "Lash Serum":              ["photo-1600185365483-26d7a4cc7519","photo-1522335789203-aabd1fc54bc9"],
  "Ice Roller":              ["photo-1596462502278-27bfdc403348","photo-1570172619644-dfd03ed5d881"],
  "Hair Curler":             ["photo-1585238342024-78d387f4a707","photo-1519500099198-fd81846b8f03"],
  "Makeup Organiser":        ["photo-1522335789203-aabd1fc54bc9","photo-1571781926291-c477ebfd024b"],
  "Auto Pet Feeder":         ["photo-1517849845537-4d257902454a","photo-1548199973-03cce0bbc87b"],
  "Cat Fountain":            ["photo-1518020382113-a7e8fc38eac9","photo-1511044568932-338cba0ad803"],
  "Dog Cooling Mat":         ["photo-1548199973-03cce0bbc87b","photo-1587300003388-59208cc962cb"],
  "Grooming Kit":            ["photo-1537151625747-768eb6cf92b2","photo-1587300003388-59208cc962cb"],
  "LED Dog Collar":          ["photo-1517849845537-4d257902454a","photo-1548199973-03cce0bbc87b"],
  "Under Sink Organiser":    ["photo-1505693416388-ac5ce068fe85","photo-1556911220-bff31c812dba"],
  "Magnetic Spice Rack":     ["photo-1556911220-bff31c812dba","photo-1505693416388-ac5ce068fe85"],
  "Foldable Storage Boxes":  ["photo-1493666438817-866a91353ca9","photo-1505693416388-ac5ce068fe85"],
  "Cable Management Kit":    ["photo-1560185007-cde436f6a4d0","photo-1498050108023-c5249f4df085"],
  "Space Saving Hangers":    ["photo-1505693416388-ac5ce068fe85","photo-1493666438817-866a91353ca9"],
  "Wireless Charging Stand": ["photo-1498050108023-c5249f4df085","photo-1519389950473-47ba0277781c"],
  "Portable Phone Charger":  ["photo-1519389950473-47ba0277781c","photo-1498050108023-c5249f4df085"],
  "Smart LED Light Strip":   ["photo-1517336714731-489689fd1ca8","photo-1498050108023-c5249f4df085"],
  "Mini Projector":          ["photo-1487014679447-9f8336841d58","photo-1517336714731-489689fd1ca8"],
  "Bluetooth Tracker Tag":   ["photo-1498050108023-c5249f4df085","photo-1519389950473-47ba0277781c"],
  "Crossbody Bag":           ["photo-1520975916090-3105956dac38","photo-1548036328-c9fa89d128fa"],
  "Minimalist Watch":        ["photo-1490481651871-ab68de25d43d","photo-1523170335258-f5ed11844a49"],
  "Layered Necklace Set":    ["photo-1529139574466-a303027c1d8b","photo-1515562141207-7a88fb7ce338"],
  "Oversized Hoodie":        ["photo-1519741497674-611481863552","photo-1556821840-3a63f15732ce"],
  "Polarized Sunglasses":    ["photo-1520975916090-3105956dac38","photo-1473966968600-fa801b869a1a"],
  "Massage Gun":             ["photo-1506126613408-eca07ce68773","photo-1552196563-55cd4e45efb3"],
  "Aromatherapy Diffuser":   ["photo-1518611012118-696072aa579a","photo-1506126613408-eca07ce68773"],
  "Sleep Aid Device":        ["photo-1552196563-55cd4e45efb3","photo-1518611012118-696072aa579a"],
  "Blue Light Glasses":      ["photo-1499728603263-13726abce5fd","photo-1498050108023-c5249f4df085"],
  "Stress Relief Ring":      ["photo-1506126613408-eca07ce68773","photo-1552196563-55cd4e45efb3"],
  "Solar Power Bank":        ["photo-1500530855697-b586d89ba3ee","photo-1501785888041-af3ef285b470"],
  "Camping Hammock":         ["photo-1470770841072-f978cf4d019e","photo-1441974231531-c6227db76b6e"],
  "Portable Water Filter":   ["photo-1501785888041-af3ef285b470","photo-1500530855697-b586d89ba3ee"],
  "Compact Camping Stove":   ["photo-1441974231531-c6227db76b6e","photo-1470770841072-f978cf4d019e"],
  "Waterproof Backpack":     ["photo-1500530855697-b586d89ba3ee","photo-1441974231531-c6227db76b6e"],
};

function getProductImage(name: string): string {
  const pool = IMAGE_POOLS[name];
  if (!pool) return "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80";
  return `https://images.unsplash.com/${pool[0]}?w=800&q=80`;
}

function getDefaultStyles(template: Template, brandColor: string): Record<string, ElemStyle> {
  const dark = template === 1;
  return {
    brand:       { color: dark ? "#ffffff" : "#111827", size: "lg",  weight: "extrabold", align: "left"   },
    headline:    { color: "#ffffff",  size: "xl",  weight: "extrabold", align: "left"   },
    subheadline: { color: "rgba(255,255,255,0.85)", size: "md", weight: "normal", align: "left" },
    price:       { color: brandColor, size: "xl",  weight: "extrabold", align: "left"   },
    cta:         { color: "#ffffff",  size: "md",  weight: "bold",      align: "center" },
    description: { color: dark ? "rgba(255,255,255,0.65)" : "#4b5563", size: "md", weight: "normal", align: "left" },
  };
}

function stop(e: React.SyntheticEvent) { e.stopPropagation(); }

// ── Edit Popup ────────────────────────────────────────────────
function EditPopup({ popup, brandColor, onSave, onDiscard }: {
  popup: PopupState; brandColor: string;
  onSave: (value: string, style: ElemStyle) => void;
  onDiscard: () => void;
}) {
  const [value, setValue]   = useState(popup.value);
  const [style, setStyle]   = useState<ElemStyle>(popup.style);
  const ref                 = useRef<HTMLDivElement>(null);
  const [pos, setPos]       = useState({ x: popup.x, y: popup.y });

  useEffect(() => {
    if (!ref.current) return;
    let x = popup.x, y = popup.y;
    if (x + 320 > window.innerWidth - 16) x = window.innerWidth - 336;
    if (y + (ref.current.offsetHeight || 480) > window.innerHeight - 16)
      y = window.innerHeight - (ref.current.offsetHeight || 480) - 16;
    if (x < 16) x = 16;
    if (y < 16) y = 16;
    setPos({ x, y });
  }, [popup.x, popup.y]);

  const fieldLabel: Record<string, string> = {
    brand:"Brand Name", headline:"Headline", subheadline:"Subheadline",
    price:"Price", cta:"Button Text", description:"Description",
  };
  const swatches = ["#111827","#ffffff","#EA580C","#6b7280","#1e40af","#16a34a","#dc2626", brandColor];

  const inner = (
    <div onClick={stop} onMouseDown={stop} onTouchStart={stop}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"16px" }}>
        <span style={{ fontSize:"13px", fontWeight:700, color:"white" }}>Edit {fieldLabel[popup.field] || popup.field}</span>
        <button onClick={(e) => { stop(e); onDiscard(); }}
          style={{ background:"transparent", border:"none", color:"rgba(255,255,255,0.4)", cursor:"pointer", fontSize:"22px", lineHeight:1 }}>
          {"\u00d7"}
        </button>
      </div>

      <div style={{ marginBottom:"12px" }}>
        <label style={{ fontSize:"10px", color:"rgba(255,255,255,0.4)", fontWeight:700, letterSpacing:"0.08em", display:"block", marginBottom:"6px" }}>CONTENT</label>
        <textarea value={value}
          onChange={(e) => { stop(e); setValue(e.target.value); }}
          onClick={stop} onMouseDown={stop} onTouchStart={stop} rows={2}
          style={{ width:"100%", background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.12)", borderRadius:"8px", padding:"10px", color:"white", fontSize:"14px", resize:"vertical" as const, outline:"none", fontFamily:"inherit", boxSizing:"border-box" as const }} />
      </div>

      <div style={{ marginBottom:"12px" }}>
        <label style={{ fontSize:"10px", color:"rgba(255,255,255,0.4)", fontWeight:700, letterSpacing:"0.08em", display:"block", marginBottom:"8px" }}>TEXT COLOUR</label>
        <div style={{ display:"flex", alignItems:"center", gap:"8px", flexWrap:"wrap" as const }}>
          <input type="color" value={style.color}
            onChange={(e) => { stop(e); setStyle(s => ({ ...s, color: e.target.value })); }}
            onClick={stop} onMouseDown={stop} onTouchStart={stop}
            style={{ width:"40px", height:"36px", border:"none", cursor:"pointer", borderRadius:"8px", background:"transparent" }} />
          <div style={{ display:"flex", gap:"5px", flexWrap:"wrap" as const }}>
            {swatches.map(col => (
              <button key={col}
                onClick={(e) => { stop(e); setStyle(s => ({ ...s, color: col })); }}
                onMouseDown={stop} onTouchStart={stop}
                style={{ width:"24px", height:"24px", borderRadius:"50%", background:col, flexShrink:0,
                  border: style.color === col ? "3px solid white" : "2px solid rgba(255,255,255,0.15)", cursor:"pointer" }} />
            ))}
          </div>
        </div>
      </div>

      <div style={{ marginBottom:"12px" }}>
        <label style={{ fontSize:"10px", color:"rgba(255,255,255,0.4)", fontWeight:700, letterSpacing:"0.08em", display:"block", marginBottom:"6px" }}>SIZE</label>
        <div style={{ display:"flex", gap:"5px" }}>
          {(["sm","md","lg","xl"] as const).map(s => (
            <button key={s} onClick={(e) => { stop(e); setStyle(st => ({ ...st, size: s })); }} onMouseDown={stop}
              style={{ flex:1, padding:"7px", borderRadius:"8px", border:"none", cursor:"pointer", fontSize:"11px", fontWeight:600,
                background: style.size===s ? C.orange : "rgba(255,255,255,0.08)",
                color: style.size===s ? "white" : "rgba(255,255,255,0.5)" }}>
              {s.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom:"12px" }}>
        <label style={{ fontSize:"10px", color:"rgba(255,255,255,0.4)", fontWeight:700, letterSpacing:"0.08em", display:"block", marginBottom:"6px" }}>WEIGHT</label>
        <div style={{ display:"flex", gap:"5px" }}>
          {(["normal","bold","extrabold"] as const).map(w => (
            <button key={w} onClick={(e) => { stop(e); setStyle(st => ({ ...st, weight: w })); }} onMouseDown={stop}
              style={{ flex:1, padding:"7px", borderRadius:"8px", border:"none", cursor:"pointer", fontSize:"11px", fontWeight:WEIGHT_MAP[w],
                background: style.weight===w ? C.orange : "rgba(255,255,255,0.08)",
                color: style.weight===w ? "white" : "rgba(255,255,255,0.5)" }}>
              {w==="extrabold" ? "Black" : w.charAt(0).toUpperCase()+w.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div style={{ marginBottom:"16px" }}>
        <label style={{ fontSize:"10px", color:"rgba(255,255,255,0.4)", fontWeight:700, letterSpacing:"0.08em", display:"block", marginBottom:"6px" }}>ALIGNMENT</label>
        <div style={{ display:"flex", gap:"5px" }}>
          {([["left","\u2190"],["center","\u2194"],["right","\u2192"]] as const).map(([a,icon]) => (
            <button key={a} onClick={(e) => { stop(e); setStyle(st => ({ ...st, align: a })); }} onMouseDown={stop}
              style={{ flex:1, padding:"7px", borderRadius:"8px", border:"none", cursor:"pointer", fontSize:"15px",
                background: style.align===a ? C.orange : "rgba(255,255,255,0.08)",
                color: style.align===a ? "white" : "rgba(255,255,255,0.5)" }}>
              {icon}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display:"flex", gap:"8px" }}>
        <button onClick={(e) => { stop(e); onDiscard(); }}
          style={{ flex:1, padding:"11px", borderRadius:"10px", border:"1px solid rgba(255,255,255,0.12)", background:"transparent", color:"rgba(255,255,255,0.6)", fontWeight:600, fontSize:"13px", cursor:"pointer" }}>
          Discard
        </button>
        <button onClick={(e) => { stop(e); onSave(value, style); }}
          style={{ flex:2, padding:"11px", borderRadius:"10px", border:"none", background:C.orange, color:"white", fontWeight:700, fontSize:"13px", cursor:"pointer" }}>
          Save
        </button>
      </div>
    </div>
  );

  // Bottom sheet on mobile, floating on desktop
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  if (isMobile) return (
    <>
      <div onClick={(e) => { stop(e); onDiscard(); }}
        style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", zIndex:9998 }} />
      <div style={{ position:"fixed", bottom:0, left:0, right:0, zIndex:9999,
        background:"#1a1a1a", borderRadius:"20px 20px 0 0", padding:"20px 20px 40px",
        boxShadow:"0 -24px 60px rgba(0,0,0,0.5)", maxHeight:"92vh", overflowY:"auto" }}>
        <div style={{ width:"40px", height:"4px", background:"rgba(255,255,255,0.2)", borderRadius:"2px", margin:"0 auto 18px" }} />
        {inner}
      </div>
    </>
  );

  return (
    <div ref={ref} onClick={stop} onMouseDown={stop}
      style={{ position:"fixed", left:pos.x, top:pos.y, zIndex:9999,
        background:"#1a1a1a", borderRadius:"16px", padding:"20px", width:"320px",
        boxShadow:"0 24px 60px rgba(0,0,0,0.5)", border:"1px solid rgba(255,255,255,0.1)" }}>
      {inner}
    </div>
  );
}

// ── Clickable element ─────────────────────────────────────────
function SE({ field, value, elemStyle, onClick, extraStyle }: {
  field: string; value: string; elemStyle: ElemStyle;
  onClick: (field: string, value: string, x: number, y: number) => void;
  extraStyle?: React.CSSProperties;
}) {
  const [hover, setHover] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  function handleClick(e: React.MouseEvent) {
    e.stopPropagation();
    const rect = ref.current?.getBoundingClientRect();
    onClick(field, value, (rect?.left ?? e.clientX) + 10, (rect?.bottom ?? e.clientY) + 10);
  }
  return (
    <div ref={ref}
      onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
      onClick={handleClick}
      style={{ cursor:"text", position:"relative",
        outline: hover ? "2px dashed rgba(255,255,255,0.6)" : "none",
        borderRadius:"4px", padding: hover ? "2px 4px" : "0",
        transition:"all 0.1s",
        fontSize: SIZE_MAP[elemStyle.size],
        fontWeight: WEIGHT_MAP[elemStyle.weight],
        color: elemStyle.color,
        textAlign: elemStyle.align,
        ...extraStyle }}>
      {hover && (
        <div style={{ position:"absolute", top:-20, left:0, fontSize:"9px", fontWeight:700,
          color:"white", background:"rgba(0,0,0,0.7)", padding:"2px 6px", borderRadius:"4px",
          letterSpacing:"0.08em", textTransform:"uppercase" as const, whiteSpace:"nowrap" as const, zIndex:10 }}>
          Click to edit
        </div>
      )}
      {value}
    </div>
  );
}

// ── Template 1 — Dark Editorial (full bleed) ──────────────────
function Template1({ store, es, openPopup, brandColor, br, rgb, img }: any) {
  return (
    <div style={{ background:"#0a0a0a", fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif", minHeight:"100vh" }}>
      {/* Full bleed hero */}
      <div style={{ position:"relative", minHeight:"100vh", overflow:"hidden" }}>
        <img src={img} alt="Product"
          style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", filter:"brightness(0.45)" }} />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)" }} />
        {/* Nav */}
        <div style={{ position:"relative", zIndex:2, padding:"24px 32px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <SE field="brand" value={store.brand} elemStyle={es("brand")} onClick={openPopup}
            extraStyle={{ fontSize:"18px", fontWeight:800, letterSpacing:"0.08em", textTransform:"uppercase" as const }} />
          <div style={{ display:"flex", gap:"28px", fontSize:"12px", color:"rgba(255,255,255,0.6)", letterSpacing:"0.12em", textTransform:"uppercase" as const }}>
            <span>Shop</span><span>About</span>
          </div>
          <div style={{ fontSize:"12px", color:"rgba(255,255,255,0.6)", letterSpacing:"0.1em" }}>BAG</div>
        </div>
        {/* Announcement bar */}
        <div style={{ position:"relative", zIndex:2, textAlign:"center" as const, padding:"8px", background:"rgba(255,255,255,0.06)", fontSize:"11px", color:"rgba(255,255,255,0.5)", letterSpacing:"0.15em" }}>
          — COMPLIMENTARY SHIPPING OVER {store.price} —
        </div>
        {/* Hero content */}
        <div style={{ position:"relative", zIndex:2, padding:"80px 32px 48px", marginTop:"auto", paddingTop:"20vh" }}>
          <div style={{ fontSize:"11px", fontWeight:600, letterSpacing:"0.2em", textTransform:"uppercase" as const, color:"rgba(255,255,255,0.5)", marginBottom:"16px" }}>
            New Collection · {new Date().getFullYear()}
          </div>
          <SE field="headline" value={store.headline} elemStyle={es("headline")} onClick={openPopup}
            extraStyle={{ fontSize:"clamp(36px,8vw,72px)", lineHeight:1.0, letterSpacing:"-0.02em", marginBottom:"20px", maxWidth:"600px" }} />
          <SE field="subheadline" value={store.subheadline} elemStyle={es("subheadline")} onClick={openPopup}
            extraStyle={{ fontSize:"16px", lineHeight:1.7, marginBottom:"36px", maxWidth:"480px", color:"rgba(255,255,255,0.75)" }} />
          <div style={{ display:"flex", gap:"16px", alignItems:"center", flexWrap:"wrap" as const }}>
            <SE field="cta" value={store.cta} elemStyle={es("cta")} onClick={openPopup}
              extraStyle={{ display:"inline-block", padding:"14px 32px", background:"white", borderRadius:br, color:"#111827", fontWeight:700, fontSize:"14px", letterSpacing:"0.06em", textTransform:"uppercase" as const }} />
            <span style={{ fontSize:"12px", color:"rgba(255,255,255,0.5)", letterSpacing:"0.1em", textTransform:"uppercase" as const, cursor:"pointer" }}>OUR STORY</span>
          </div>
        </div>
      </div>
      {/* Benefits */}
      <div style={{ padding:"64px 32px", background:"#0a0a0a" }}>
        <SE field="description" value={store.description} elemStyle={es("description")} onClick={openPopup}
          extraStyle={{ lineHeight:1.8, maxWidth:"600px", marginBottom:"48px", color:"rgba(255,255,255,0.6)", fontSize:"16px" }} />
        <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:"1px", background:"rgba(255,255,255,0.06)" }}>
          {store.benefits?.slice(0,3).map((b: string, i: number) => (
            <div key={i} style={{ padding:"32px 24px", background:"#0a0a0a" }}>
              <div style={{ fontSize:"24px", fontWeight:800, color:brandColor, marginBottom:"12px" }}>0{i+1}</div>
              <div style={{ fontSize:"14px", fontWeight:600, color:"white", marginBottom:"6px" }}>{b}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Reviews */}
      <div style={{ padding:"64px 32px", background:"#111" }}>
        <div style={{ fontSize:"11px", letterSpacing:"0.15em", textTransform:"uppercase" as const, color:"rgba(255,255,255,0.4)", marginBottom:"32px" }}>Customer reviews</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(240px,1fr))", gap:"20px" }}>
          {[["Sarah M.","Completely exceeded expectations."],["James T.","Nothing comes close."],["Priya K.","More premium than expected."]].map(([name,text],i) => (
            <div key={i} style={{ padding:"24px", border:"1px solid rgba(255,255,255,0.06)" }}>
              <div style={{ color:"#f59e0b", marginBottom:"10px", fontSize:"13px" }}>⭐⭐⭐⭐⭐</div>
              <p style={{ fontSize:"14px", color:"rgba(255,255,255,0.6)", lineHeight:1.7, marginBottom:"12px", fontStyle:"italic" }}>"{text}"</p>
              <div style={{ fontSize:"11px", fontWeight:700, color:"rgba(255,255,255,0.4)", letterSpacing:"0.08em", textTransform:"uppercase" as const }}>{name}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Final CTA */}
      <div style={{ padding:"80px 32px", textAlign:"center" as const, background:`linear-gradient(135deg,#0a0a0a,rgba(${rgb},0.12))` }}>
        <SE field="price" value={store.price} elemStyle={es("price")} onClick={openPopup}
          extraStyle={{ fontSize:"48px", fontWeight:800, marginBottom:"8px", justifyContent:"center" }} />
        <div style={{ fontSize:"13px", color:"rgba(255,255,255,0.3)", marginBottom:"28px" }}>Free shipping · 30-day returns</div>
        <SE field="cta" value={store.cta} elemStyle={es("cta")} onClick={openPopup}
          extraStyle={{ display:"inline-block", padding:"16px 48px", background:brandColor, borderRadius:br, fontWeight:700, fontSize:"15px", boxShadow:`0 16px 40px rgba(${rgb},0.4)` }} />
      </div>
      <div style={{ padding:"24px 32px", background:"#050505", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div style={{ fontSize:"13px", fontWeight:700, color:"rgba(255,255,255,0.4)", letterSpacing:"0.08em" }}>{store.brand.toUpperCase()}</div>
        <div style={{ fontSize:"11px", padding:"4px 10px", background:"rgba(255,255,255,0.04)", border:"1px solid rgba(255,255,255,0.06)", borderRadius:"999px", color:"rgba(255,255,255,0.25)" }}>⚡ Built with Ember</div>
      </div>
    </div>
  );
}

// ── Template 2 — Clean Minimal (full bleed) ───────────────────
function Template2({ store, es, openPopup, brandColor, br, rgb, img }: any) {
  return (
    <div style={{ background:"#fafaf8", fontFamily:"Georgia,serif" }}>
      {/* Full bleed hero */}
      <div style={{ position:"relative", minHeight:"100vh", overflow:"hidden" }}>
        <img src={img} alt="Product"
          style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", filter:"brightness(0.55)" }} />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 60%, transparent 100%)" }} />
        {/* Nav */}
        <div style={{ position:"relative", zIndex:2, padding:"24px 40px", display:"flex", justifyContent:"space-between", alignItems:"center", borderBottom:"1px solid rgba(255,255,255,0.1)" }}>
          <SE field="brand" value={store.brand} elemStyle={{ ...es("brand"), color:"white" }} onClick={openPopup}
            extraStyle={{ fontSize:"20px", fontWeight:400, letterSpacing:"0.15em", textTransform:"uppercase" as const }} />
          <div style={{ display:"flex", gap:"32px", fontSize:"12px", color:"rgba(255,255,255,0.6)", letterSpacing:"0.1em", textTransform:"uppercase" as const, fontFamily:"-apple-system,sans-serif" }}>
            <span>Shop</span><span>About</span><span>FAQ</span>
          </div>
          <div style={{ fontSize:"12px", color:"rgba(255,255,255,0.5)", letterSpacing:"0.08em", fontFamily:"-apple-system,sans-serif" }}>BAG</div>
        </div>
        {/* Hero content */}
        <div style={{ position:"relative", zIndex:2, padding:"0 40px 60px", paddingTop:"18vh" }}>
          <div style={{ fontSize:"10px", fontWeight:600, letterSpacing:"0.25em", textTransform:"uppercase" as const, color:"rgba(255,255,255,0.5)", marginBottom:"20px", fontFamily:"-apple-system,sans-serif" }}>
            New Arrival
          </div>
          <SE field="headline" value={store.headline} elemStyle={es("headline")} onClick={openPopup}
            extraStyle={{ fontSize:"clamp(32px,7vw,68px)", lineHeight:1.05, marginBottom:"20px", maxWidth:"550px", fontWeight:400 }} />
          <SE field="subheadline" value={store.subheadline} elemStyle={es("subheadline")} onClick={openPopup}
            extraStyle={{ fontSize:"16px", lineHeight:1.8, marginBottom:"36px", maxWidth:"420px", fontStyle:"italic" }} />
          <SE field="price" value={store.price} elemStyle={{ ...es("price"), color:"white" }} onClick={openPopup}
            extraStyle={{ fontSize:"28px", fontWeight:700, marginBottom:"24px", fontFamily:"-apple-system,sans-serif" }} />
          <div style={{ display:"flex", gap:"16px", alignItems:"center" }}>
            <SE field="cta" value={store.cta} elemStyle={es("cta")} onClick={openPopup}
              extraStyle={{ display:"inline-block", padding:"14px 36px", background:"white", borderRadius:br, color:"#111827", fontWeight:600, fontSize:"14px", fontFamily:"-apple-system,sans-serif" }} />
            <span style={{ fontSize:"12px", color:"rgba(255,255,255,0.5)", letterSpacing:"0.1em", textTransform:"uppercase" as const, fontFamily:"-apple-system,sans-serif", cursor:"pointer" }}>OUR STORY</span>
          </div>
        </div>
      </div>
      {/* About */}
      <div style={{ padding:"72px 40px", maxWidth:"720px", margin:"0 auto", textAlign:"center" as const }}>
        <div style={{ fontSize:"10px", fontWeight:600, letterSpacing:"0.2em", textTransform:"uppercase" as const, color:brandColor, marginBottom:"16px", fontFamily:"-apple-system,sans-serif" }}>About this product</div>
        <SE field="description" value={store.description} elemStyle={{ ...es("description"), color:"#374151" }} onClick={openPopup}
          extraStyle={{ lineHeight:2, fontSize:"18px" }} />
      </div>
      {/* Benefits */}
      <div style={{ padding:"64px 40px", background:"white", borderTop:"1px solid #e5e7eb" }}>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:"48px" }}>
          {store.benefits?.slice(0,3).map((b: string, i: number) => (
            <div key={i} style={{ textAlign:"center" as const }}>
              <div style={{ fontSize:"28px", marginBottom:"14px" }}>{["✦","◆","●"][i]}</div>
              <div style={{ fontSize:"14px", fontWeight:600, color:"#111827", marginBottom:"8px", fontFamily:"-apple-system,sans-serif" }}>{b}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Reviews */}
      <div style={{ padding:"64px 40px" }}>
        <div style={{ textAlign:"center" as const, marginBottom:"40px", fontSize:"32px", fontWeight:400, color:"#111827" }}>Customer Stories</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:"24px" }}>
          {[["Sarah M.","Exceeded expectations."],["James T.","Nothing comes close."],["Priya K.","More premium than expected."]].map(([name,text],i) => (
            <div key={i} style={{ padding:"28px", border:"1px solid #e5e7eb", textAlign:"center" as const }}>
              <div style={{ color:"#f59e0b", marginBottom:"12px" }}>⭐⭐⭐⭐⭐</div>
              <p style={{ fontSize:"14px", color:"#374151", lineHeight:1.8, marginBottom:"16px", fontStyle:"italic" }}>"{text}"</p>
              <div style={{ fontSize:"11px", fontWeight:600, color:"#111827", letterSpacing:"0.1em", textTransform:"uppercase" as const, fontFamily:"-apple-system,sans-serif" }}>{name}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Final CTA */}
      <div style={{ padding:"80px 40px", textAlign:"center" as const, background:"#fafaf8", borderTop:"1px solid #e5e7eb" }}>
        <div style={{ fontSize:"36px", fontWeight:400, color:"#111827", marginBottom:"16px" }}>Ready to begin?</div>
        <SE field="price" value={store.price} elemStyle={es("price")} onClick={openPopup}
          extraStyle={{ fontSize:"36px", marginBottom:"24px", justifyContent:"center", fontFamily:"-apple-system,sans-serif" }} />
        <SE field="cta" value={store.cta} elemStyle={es("cta")} onClick={openPopup}
          extraStyle={{ display:"inline-block", padding:"16px 48px", background:"#111827", borderRadius:br, fontFamily:"-apple-system,sans-serif" }} />
      </div>
      <div style={{ padding:"24px 40px", background:"#111827", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div style={{ fontSize:"14px", fontWeight:600, color:"white", letterSpacing:"0.08em" }}>{store.brand}</div>
        <div style={{ fontSize:"11px", padding:"4px 10px", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:"999px", color:"rgba(255,255,255,0.3)" }}>⚡ Built with Ember</div>
      </div>
    </div>
  );
}

// ── Template 3 — Bold Modern (full bleed) ─────────────────────
function Template3({ store, es, openPopup, brandColor, br, rgb, img }: any) {
  return (
    <div style={{ background:"#ffffff", fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif" }}>
      {/* Full bleed hero with brand colour overlay */}
      <div style={{ position:"relative", minHeight:"100vh", overflow:"hidden" }}>
        <img src={img} alt="Product"
          style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", filter:"brightness(0.4) saturate(0.8)" }} />
        <div style={{ position:"absolute", inset:0, background:`linear-gradient(135deg, rgba(${rgb},0.85) 0%, rgba(${rgb},0.4) 50%, rgba(0,0,0,0.6) 100%)` }} />
        {/* Nav */}
        <div style={{ position:"relative", zIndex:2, padding:"20px 40px", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <SE field="brand" value={store.brand} elemStyle={{ ...es("brand"), color:"white" }} onClick={openPopup}
            extraStyle={{ fontSize:"20px", fontWeight:800, letterSpacing:"-0.02em" }} />
          <div style={{ display:"flex", gap:"28px", fontSize:"13px", color:"rgba(255,255,255,0.75)", fontWeight:600 }}>
            <span>Shop</span><span>About</span><span>Reviews</span>
          </div>
          <SE field="cta" value={store.cta} elemStyle={es("cta")} onClick={openPopup}
            extraStyle={{ padding:"10px 22px", background:"white", borderRadius:br, color:brandColor, fontWeight:800, fontSize:"13px" }} />
        </div>
        {/* Trust bar */}
        <div style={{ position:"relative", zIndex:2, background:"rgba(0,0,0,0.25)", padding:"8px 40px", textAlign:"center" as const }}>
          <span style={{ fontSize:"11px", color:"rgba(255,255,255,0.6)", letterSpacing:"0.12em" }}>🚚 FREE SHIPPING &nbsp;·&nbsp; ↩️ 30-DAY RETURNS &nbsp;·&nbsp; ⭐ 4.9/5</span>
        </div>
        {/* Hero content */}
        <div style={{ position:"relative", zIndex:2, padding:"0 40px 60px", paddingTop:"15vh" }}>
          <div style={{ display:"inline-block", padding:"6px 14px", background:"rgba(255,255,255,0.15)", borderRadius:"999px", fontSize:"11px", fontWeight:700, color:"white", letterSpacing:"0.1em", textTransform:"uppercase" as const, marginBottom:"20px" }}>
            🔥 Trending Now
          </div>
          <SE field="headline" value={store.headline} elemStyle={es("headline")} onClick={openPopup}
            extraStyle={{ fontSize:"clamp(36px,8vw,72px)", lineHeight:1.0, letterSpacing:"-0.03em", marginBottom:"20px", maxWidth:"600px" }} />
          <SE field="subheadline" value={store.subheadline} elemStyle={es("subheadline")} onClick={openPopup}
            extraStyle={{ fontSize:"17px", lineHeight:1.7, marginBottom:"32px", maxWidth:"500px" }} />
          <div style={{ display:"flex", gap:"16px", alignItems:"center", marginBottom:"20px" }}>
            <SE field="price" value={store.price} elemStyle={{ ...es("price"), color:"white" }} onClick={openPopup}
              extraStyle={{ fontSize:"40px", fontWeight:800 }} />
            <div style={{ fontSize:"12px", color:"rgba(255,255,255,0.5)" }}>Free shipping</div>
          </div>
          <SE field="cta" value={store.cta} elemStyle={es("cta")} onClick={openPopup}
            extraStyle={{ display:"inline-block", padding:"16px 40px", background:"white", borderRadius:br, color:brandColor, fontWeight:800, fontSize:"16px", boxShadow:"0 12px 32px rgba(0,0,0,0.25)" }} />
        </div>
      </div>
      {/* Benefits */}
      <div style={{ padding:"64px 40px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"16px", marginBottom:"32px" }}>
          <div style={{ height:"4px", background:brandColor, width:"40px", borderRadius:"2px" }} />
          <div style={{ fontSize:"28px", fontWeight:800, color:"#111827" }}>Why {store.brand}?</div>
        </div>
        <SE field="description" value={store.description} elemStyle={es("description")} onClick={openPopup}
          extraStyle={{ lineHeight:1.8, maxWidth:"640px", marginBottom:"40px", color:"#4b5563" }} />
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:"16px" }}>
          {store.benefits?.slice(0,3).map((b: string, i: number) => (
            <div key={i} style={{ padding:"24px", borderLeft:`4px solid ${brandColor}`, background:"#f9fafb" }}>
              <div style={{ fontSize:"24px", fontWeight:900, color:brandColor, marginBottom:"8px" }}>0{i+1}</div>
              <div style={{ fontSize:"14px", fontWeight:700, color:"#111827" }}>{b}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Reviews */}
      <div style={{ padding:"64px 40px", background:"#f9fafb" }}>
        <div style={{ display:"flex", alignItems:"center", gap:"16px", marginBottom:"32px" }}>
          <div style={{ height:"4px", background:brandColor, width:"40px", borderRadius:"2px" }} />
          <div style={{ fontSize:"28px", fontWeight:800, color:"#111827" }}>Real Reviews</div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:"16px" }}>
          {[["Sarah M.","Exceeded expectations."],["James T.","Nothing comes close."],["Priya K.","More premium than expected."]].map(([name,text],i) => (
            <div key={i} style={{ padding:"24px", background:"white", border:"1px solid #e5e7eb", borderTop:`3px solid ${brandColor}` }}>
              <div style={{ color:"#f59e0b", marginBottom:"10px" }}>⭐⭐⭐⭐⭐</div>
              <p style={{ fontSize:"14px", color:"#374151", lineHeight:1.7, marginBottom:"12px", fontStyle:"italic" }}>"{text}"</p>
              <div style={{ fontSize:"12px", fontWeight:700, color:"#111827" }}>{name}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Final CTA */}
      <div style={{ padding:"80px 40px", background:brandColor, textAlign:"center" as const }}>
        <div style={{ fontSize:"36px", fontWeight:800, color:"white", marginBottom:"12px" }}>Ready to get started?</div>
        <SE field="price" value={store.price} elemStyle={{ ...es("price"), color:"white" }} onClick={openPopup}
          extraStyle={{ fontSize:"40px", fontWeight:800, marginBottom:"24px", justifyContent:"center" }} />
        <SE field="cta" value={store.cta} elemStyle={es("cta")} onClick={openPopup}
          extraStyle={{ display:"inline-block", padding:"16px 48px", background:"white", borderRadius:br, color:brandColor, fontWeight:800, fontSize:"16px" }} />
      </div>
      <div style={{ padding:"24px 40px", background:"#111827", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div style={{ fontSize:"14px", fontWeight:800, color:"white" }}>{store.brand}</div>
        <div style={{ fontSize:"11px", padding:"4px 10px", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:"999px", color:"rgba(255,255,255,0.3)" }}>⚡ Built with Ember</div>
      </div>
    </div>
  );
}

// ── Template 4 — Warm Lifestyle (full bleed) ──────────────────
function Template4({ store, es, openPopup, brandColor, br, rgb, img }: any) {
  return (
    <div style={{ background:"#fdf8f3", fontFamily:"Georgia,serif" }}>
      {/* Full bleed hero */}
      <div style={{ position:"relative", minHeight:"100vh", overflow:"hidden" }}>
        <img src={img} alt="Product"
          style={{ position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", filter:"brightness(0.5) sepia(0.2)" }} />
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(44,26,14,0.92) 0%, rgba(44,26,14,0.4) 50%, rgba(44,26,14,0.1) 100%)" }} />
        {/* Nav */}
        <div style={{ position:"relative", zIndex:2, padding:"24px 40px", display:"flex", justifyContent:"space-between", alignItems:"center", borderBottom:"1px solid rgba(232,213,196,0.15)" }}>
          <SE field="brand" value={store.brand} elemStyle={{ ...es("brand"), color:"#e8d5c4" }} onClick={openPopup}
            extraStyle={{ fontSize:"20px", fontWeight:400, letterSpacing:"0.15em", textTransform:"uppercase" as const }} />
          <div style={{ display:"flex", gap:"28px", fontSize:"12px", color:"rgba(232,213,196,0.55)", letterSpacing:"0.1em", fontFamily:"-apple-system,sans-serif" }}>
            <span>Shop</span><span>About</span><span>Reviews</span>
          </div>
          <div style={{ fontSize:"12px", color:"rgba(232,213,196,0.4)", fontFamily:"-apple-system,sans-serif", letterSpacing:"0.08em" }}>BAG</div>
        </div>
        {/* Hero content */}
        <div style={{ position:"relative", zIndex:2, padding:"0 40px 60px", paddingTop:"20vh" }}>
          <div style={{ fontSize:"10px", fontWeight:600, letterSpacing:"0.2em", textTransform:"uppercase" as const, color:"rgba(232,213,196,0.5)", marginBottom:"20px", fontFamily:"-apple-system,sans-serif" }}>
            New In
          </div>
          <SE field="headline" value={store.headline} elemStyle={{ ...es("headline"), color:"#e8d5c4" }} onClick={openPopup}
            extraStyle={{ fontSize:"clamp(32px,7vw,64px)", lineHeight:1.05, letterSpacing:"-0.02em", marginBottom:"20px", maxWidth:"560px", fontWeight:400, color:"#e8d5c4" }} />
          <SE field="subheadline" value={store.subheadline} elemStyle={{ ...es("subheadline"), color:"rgba(232,213,196,0.7)" }} onClick={openPopup}
            extraStyle={{ fontSize:"16px", lineHeight:1.8, marginBottom:"36px", maxWidth:"440px", fontStyle:"italic" }} />
          <SE field="price" value={store.price} elemStyle={{ ...es("price"), color:"#e8d5c4" }} onClick={openPopup}
            extraStyle={{ fontSize:"32px", fontWeight:700, marginBottom:"8px", fontFamily:"-apple-system,sans-serif" }} />
          <div style={{ fontSize:"12px", color:"rgba(232,213,196,0.4)", marginBottom:"24px", fontFamily:"-apple-system,sans-serif" }}>Complimentary shipping</div>
          <SE field="cta" value={store.cta} elemStyle={es("cta")} onClick={openPopup}
            extraStyle={{ display:"inline-block", padding:"14px 36px", background:"#e8d5c4", borderRadius:br, color:"#2c1a0e", fontWeight:600, fontSize:"14px", fontFamily:"-apple-system,sans-serif" }} />
        </div>
      </div>
      {/* About */}
      <div style={{ padding:"72px 40px", background:"#f5ede3", borderTop:"1px solid #e8d5c4" }}>
        <div style={{ maxWidth:"680px", margin:"0 auto", textAlign:"center" as const }}>
          <div style={{ fontSize:"10px", fontWeight:600, letterSpacing:"0.2em", textTransform:"uppercase" as const, color:brandColor, marginBottom:"16px", fontFamily:"-apple-system,sans-serif" }}>The story</div>
          <SE field="description" value={store.description} elemStyle={{ ...es("description"), color:"#5a3a25" }} onClick={openPopup}
            extraStyle={{ lineHeight:2, fontSize:"17px" }} />
        </div>
      </div>
      {/* Benefits */}
      <div style={{ padding:"64px 40px" }}>
        <div style={{ textAlign:"center" as const, marginBottom:"40px", fontSize:"28px", fontWeight:400, color:"#2c1a0e" }}>What makes it different</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))", gap:"24px" }}>
          {store.benefits?.slice(0,3).map((b: string, i: number) => (
            <div key={i} style={{ textAlign:"center" as const, padding:"32px 20px", background:"#f5ede3", borderRadius:"16px" }}>
              <div style={{ fontSize:"26px", marginBottom:"12px" }}>{["🌿","✨","🌸"][i]}</div>
              <div style={{ fontSize:"14px", fontWeight:600, color:"#2c1a0e", fontFamily:"-apple-system,sans-serif" }}>{b}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Reviews */}
      <div style={{ padding:"64px 40px", background:"#f5ede3" }}>
        <div style={{ textAlign:"center" as const, marginBottom:"32px", fontSize:"28px", fontWeight:400, color:"#2c1a0e" }}>Our community</div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))", gap:"20px" }}>
          {[["Sarah M.","Exceeded expectations."],["James T.","Nothing comes close."],["Priya K.","More premium than expected."]].map(([name,text],i) => (
            <div key={i} style={{ padding:"24px", background:"#fdf8f3", border:"1px solid #e8d5c4", borderRadius:"12px" }}>
              <div style={{ color:"#f59e0b", marginBottom:"10px", fontSize:"13px" }}>⭐⭐⭐⭐⭐</div>
              <p style={{ fontSize:"14px", color:"#5a3a25", lineHeight:1.8, marginBottom:"12px", fontStyle:"italic" }}>"{text}"</p>
              <div style={{ fontSize:"12px", fontWeight:600, color:"#2c1a0e", fontFamily:"-apple-system,sans-serif" }}>{name}</div>
            </div>
          ))}
        </div>
      </div>
      {/* Final CTA */}
      <div style={{ padding:"80px 40px", textAlign:"center" as const, background:`linear-gradient(135deg,rgba(${rgb},0.1),#f5ede3)` }}>
        <div style={{ fontSize:"34px", fontWeight:400, color:"#2c1a0e", marginBottom:"16px" }}>Begin your ritual</div>
        <SE field="price" value={store.price} elemStyle={es("price")} onClick={openPopup}
          extraStyle={{ fontSize:"36px", marginBottom:"24px", justifyContent:"center", fontFamily:"-apple-system,sans-serif" }} />
        <SE field="cta" value={store.cta} elemStyle={es("cta")} onClick={openPopup}
          extraStyle={{ display:"inline-block", padding:"16px 48px", background:"#4a2c1a", borderRadius:br, fontFamily:"-apple-system,sans-serif" }} />
      </div>
      <div style={{ padding:"24px 40px", background:"#2c1a0e", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
        <div style={{ fontSize:"14px", fontWeight:400, color:"#e8d5c4", letterSpacing:"0.1em" }}>{store.brand}</div>
        <div style={{ fontSize:"11px", padding:"4px 10px", background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:"999px", color:"rgba(255,255,255,0.25)" }}>⚡ Built with Ember</div>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────
export default function StoreBuilder({
  selectedIdea, storeProductName, activeStore, storeLoading,
  brandColor, sharedBg, navbar,
  onUpdateField, onUpdateBrandColor, onGenerateSell, onBack,
}: {
  selectedIdea: string; storeProductName: string;
  activeStore: StoreData | null; storeLoading: boolean;
  brandColor: string; sharedBg: React.ReactNode; navbar: React.ReactNode;
  onUpdateField: (field: keyof StoreData, value: string) => void;
  onUpdateBrandColor: (color: string) => void;
  onGenerateSell: () => void; onBack: () => void;
}) {
  // Default to "store" screen — user lands on full preview
  const [screen, setScreen]               = useState<Screen>("store");
  const [storeView, setStoreView]         = useState<StoreView>("preview");
  const [copyFeedback, setCopyFeedback]   = useState("");
  const [copyOpen, setCopyOpen]           = useState(false);
  const [btnRadius, setBtnRadius]         = useState(14);
  const [imgRadius, setImgRadius]         = useState(16);
  const [showDesign, setShowDesign]       = useState(false);
  const [popup, setPopup]                 = useState<PopupState | null>(null);
  const [elemStyles, setElemStyles]       = useState<Record<string, ElemStyle>>({});
  const copyRef                           = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile]           = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);

  const template     = useMemo<Template>(() => ((Math.floor(Math.random() * 4) + 1) as Template), [storeProductName]);
  const productImg   = useMemo(() => getProductImage(storeProductName), [storeProductName]);
  const defaultStyles = useMemo(() => getDefaultStyles(template, brandColor), [template, brandColor]);
  const es = (field: string): ElemStyle => elemStyles[field] || defaultStyles[field] || defaultStyles.description;

  const br  = `${btnRadius}px`;
  const ir  = `${imgRadius}px`;
  const rgb = useMemo(() => {
    const hex = brandColor.replace("#","");
    return [0,2,4].map(i => parseInt(hex.slice(i, i+2), 16)).join(",");
  }, [brandColor]);

  const currentHTML = activeStore
    ? generateTemplateHTML(activeStore, brandColor, storeProductName, template, br, ir)
    : "";

  function openPopup(field: string, value: string, x: number, y: number) {
    setPopup({ field, value, style: es(field), x, y });
  }

  function handleSave(value: string, style: ElemStyle) {
    if (!popup) return;
    const field = popup.field;
    onUpdateField(field as keyof StoreData, value);
    setElemStyles(prev => ({ ...prev, [field]: style }));
    setPopup(null);
  }

  async function handleCopy(f: "html" | "shopify" | "download") {
    setCopyOpen(false);
    if (!activeStore) return;
    if (f === "download") {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([currentHTML], { type: "text/html" }));
      a.download = `${storeProductName.toLowerCase().replace(/\s+/g,"-")}-store.html`;
      a.click();
      setCopyFeedback("Downloaded!");
    } else {
      await navigator.clipboard.writeText(
        f === "shopify" ? generateShopifySection(activeStore, brandColor, storeProductName) : currentHTML
      );
      setCopyFeedback(f === "shopify" ? "Shopify copied!" : "HTML copied!");
    }
    setTimeout(() => setCopyFeedback(""), 2500);
  }

  const templateProps = { store: activeStore, es, openPopup, brandColor, br, ir, rgb, img: productImg };

  const gradBtn: React.CSSProperties = {
    border:"none", borderRadius:"12px", padding:"10px 18px",
    background:`linear-gradient(135deg,${C.amber},${C.orange},${C.pink})`,
    color:"white", fontWeight:700, fontSize:"13px", cursor:"pointer",
    boxShadow:"0 6px 18px rgba(234,88,12,0.25)", transition:"all 0.2s",
    display:"flex", alignItems:"center", gap:"6px",
  };

  // ── SCREEN 1 — Full screen store ──────────────────────────────
  if (screen === "store") {
    return (
      <div style={{ position:"fixed", inset:0, zIndex:20, overflowY:"auto", background:"white" }}
        onClick={() => setPopup(null)}>

        {popup && activeStore && (
          <EditPopup popup={popup} brandColor={brandColor} onSave={handleSave} onDiscard={() => setPopup(null)} />
        )}

        {/* Store loading */}
        {storeLoading && (
          <div style={{ minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"20px", background:"#0a0a0a" }}>
            <div style={{ fontSize:"52px", animation:"firePulse 1.1s ease-in-out infinite" }}>🔥</div>
            <div style={{ fontSize:"17px", fontWeight:700, color:"white" }}>Building your store...</div>
            <div style={{ display:"flex", flexDirection:"column", gap:"10px", width:"100%", maxWidth:"300px" }}>
              {[
                { label:"Naming your brand", delay:"0s" },
                { label:"Writing your copy", delay:"1.5s" },
                { label:"Designing your store", delay:"3s" },
              ].map(({ label, delay }, i) => (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:"10px", opacity:0, animation:`fadeIn 0.4s ease ${delay} forwards` }}>
                  <div style={{ width:"20px", height:"20px", borderRadius:"50%", background:`linear-gradient(135deg,#F59E0B,#EA580C)`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"11px", flexShrink:0, color:"white" }}>✓</div>
                  <div style={{ fontSize:"13px", color:"rgba(255,255,255,0.5)", fontWeight:500 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Store content */}
        {!storeLoading && activeStore && (
          <div style={{ paddingBottom:"80px" }}>
            {template === 1 && <Template1 {...templateProps} />}
            {template === 2 && <Template2 {...templateProps} />}
            {template === 3 && <Template3 {...templateProps} />}
            {template === 4 && <Template4 {...templateProps} />}
          </div>
        )}

        {/* Fixed bottom bar — matches phone dark/light mode */}
        <div style={{
          position:"fixed", bottom:0, left:0, right:0,
          padding:"12px 20px",
          paddingBottom:"calc(12px + env(safe-area-inset-bottom))",
          background:"var(--bar-bg, rgba(255,255,255,0.95))",
          backdropFilter:"blur(20px)",
          WebkitBackdropFilter:"blur(20px)",
          borderTop:"1px solid var(--bar-border, rgba(0,0,0,0.08))",
          display:"flex", alignItems:"center", gap:"10px",
          zIndex:50,
        }}
          className="store-bottom-bar">
          <style>{`
            @media (prefers-color-scheme: dark) {
              .store-bottom-bar {
                --bar-bg: rgba(18,18,18,0.96) !important;
                --bar-border: rgba(255,255,255,0.08) !important;
              }
              .store-bottom-bar .edit-btn {
                background: rgba(255,255,255,0.08) !important;
                color: rgba(255,255,255,0.85) !important;
                border-color: rgba(255,255,255,0.12) !important;
              }
              .store-bottom-bar .back-btn {
                background: rgba(255,255,255,0.06) !important;
                color: rgba(255,255,255,0.6) !important;
                border-color: rgba(255,255,255,0.1) !important;
              }
            }
          `}</style>

          {/* Back to Ember */}
          <button className="back-btn" onClick={onBack}
            style={{ display:"flex", alignItems:"center", gap:"6px", padding:"10px 14px", borderRadius:"12px",
              border:"1px solid rgba(0,0,0,0.1)", background:"rgba(0,0,0,0.04)", color:"#374151",
              fontWeight:600, fontSize:"13px", cursor:"pointer", whiteSpace:"nowrap" as const }}>
            {"\u2190"} Back
          </button>

          {/* Edit store */}
          <button className="edit-btn" onClick={() => setScreen("editor")}
            style={{ display:"flex", alignItems:"center", gap:"6px", padding:"10px 16px", borderRadius:"12px",
              border:"1px solid rgba(0,0,0,0.1)", background:"rgba(0,0,0,0.04)", color:"#374151",
              fontWeight:700, fontSize:"13px", cursor:"pointer", whiteSpace:"nowrap" as const }}>
            ✏️ Edit store
          </button>

          {/* How to sell */}
          <button onClick={onGenerateSell} style={{ ...gradBtn, flex:1, justifyContent:"center", padding:"11px 16px" }}>
            📈 How to sell this
          </button>

          {/* Download */}
          <button onClick={() => handleCopy("download")}
            style={{ width:"44px", height:"44px", borderRadius:"12px", border:"1px solid rgba(0,0,0,0.1)",
              background:"rgba(0,0,0,0.04)", color:"#374151", fontSize:"18px", cursor:"pointer", flexShrink:0 }}>
            💾
          </button>
        </div>
      </div>
    );
  }

  // ── SCREEN 2 — Editor ─────────────────────────────────────────

  // Mobile editor — clean edit controls, no preview
  if (screen === "editor" && isMobile) {
    const fields: { key: keyof StoreData; label: string; icon: string }[] = [
      { key:"brand",       label:"Brand name",  icon:"🏷️" },
      { key:"headline",    label:"Headline",    icon:"✍️" },
      { key:"subheadline", label:"Subheadline", icon:"💬" },
      { key:"price",       label:"Price",       icon:"💰" },
      { key:"cta",         label:"Button text", icon:"🔘" },
      { key:"description", label:"Description", icon:"📝" },
    ];

    return (
      <div style={{ position:"fixed", inset:0, zIndex:20, background:"var(--editor-bg)",
        fontFamily:"-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif", overflowY:"auto" }}
        className="mobile-editor">
        <style>{`
          .mobile-editor { --editor-bg: #f9fafb; --card-bg: white; --text: #111827; --sub: #6b7280; --border: rgba(0,0,0,0.08); }
          @media (prefers-color-scheme: dark) {
            .mobile-editor { --editor-bg: #0f0f0f !important; --card-bg: #1a1a1a !important; --text: rgba(255,255,255,0.9) !important; --sub: rgba(255,255,255,0.45) !important; --border: rgba(255,255,255,0.08) !important; }
          }
        `}</style>

        {popup && activeStore && (
          <EditPopup popup={popup} brandColor={brandColor} onSave={handleSave} onDiscard={() => setPopup(null)} />
        )}

        {/* Header */}
        <div style={{ padding:"16px 20px", display:"flex", alignItems:"center", justifyContent:"space-between",
          borderBottom:"1px solid var(--border)", background:"var(--card-bg)", position:"sticky", top:0, zIndex:10 }}>
          <button onClick={() => setScreen("store")}
            style={{ display:"flex", alignItems:"center", gap:"6px", padding:"8px 14px", borderRadius:"10px",
              border:"1px solid var(--border)", background:"transparent", color:"var(--sub)",
              fontWeight:600, fontSize:"14px", cursor:"pointer" }}>
            {"\u2190"} Back
          </button>
          <span style={{ fontSize:"15px", fontWeight:700, color:"var(--text)" }}>Edit store</span>
          <button onClick={() => setScreen("store")}
            style={{ display:"flex", alignItems:"center", gap:"6px", padding:"8px 14px", borderRadius:"10px",
              border:"none", background:`linear-gradient(135deg,${C.amber},${C.orange},${C.pink})`,
              color:"white", fontWeight:700, fontSize:"13px", cursor:"pointer" }}>
            👁️ Preview
          </button>
        </div>

        <div style={{ padding:"16px 20px 100px" }}>

          {/* Design controls */}
          <div style={{ background:"var(--card-bg)", borderRadius:"16px", padding:"16px", marginBottom:"16px",
            border:"1px solid var(--border)", boxShadow:"0 2px 12px rgba(0,0,0,0.04)" }}>
            <div style={{ fontSize:"11px", fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase" as const,
              color:C.orange, marginBottom:"14px" }}>Design</div>

            {/* Brand colour */}
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"16px" }}>
              <span style={{ fontSize:"14px", fontWeight:600, color:"var(--text)" }}>Brand colour</span>
              <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                <div style={{ width:"28px", height:"28px", borderRadius:"8px", background:brandColor, border:"1px solid var(--border)" }} />
                <input type="color" value={brandColor} onChange={(e) => onUpdateBrandColor(e.target.value)}
                  style={{ width:"44px", height:"36px", border:"none", cursor:"pointer", background:"transparent", borderRadius:"8px" }} />
              </div>
            </div>

            {/* Button shape */}
            <div style={{ marginBottom:"16px" }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"8px" }}>
                <span style={{ fontSize:"14px", fontWeight:600, color:"var(--text)" }}>Button shape</span>
                <button style={{ padding:"5px 16px", borderRadius:br, background:brandColor, color:"white", border:"none", fontSize:"12px", fontWeight:700, cursor:"default" }}>
                  {activeStore?.cta || "Buy Now"}
                </button>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                <span style={{ fontSize:"11px", color:"var(--sub)" }}>Sharp</span>
                <input type="range" min="0" max="32" value={btnRadius} onChange={(e) => setBtnRadius(parseInt(e.target.value))}
                  style={{ flex:1, accentColor:brandColor, cursor:"pointer", height:"6px" }} />
                <span style={{ fontSize:"11px", color:"var(--sub)" }}>Pill</span>
              </div>
            </div>

            {/* Image corners */}
            <div>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:"8px" }}>
                <span style={{ fontSize:"14px", fontWeight:600, color:"var(--text)" }}>Image corners</span>
                <div style={{ width:"32px", height:"32px", borderRadius:ir, background:`linear-gradient(135deg,${C.amber},${C.orange},${C.pink})`, flexShrink:0 }} />
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                <span style={{ fontSize:"11px", color:"var(--sub)" }}>Sharp</span>
                <input type="range" min="0" max="32" value={imgRadius} onChange={(e) => setImgRadius(parseInt(e.target.value))}
                  style={{ flex:1, accentColor:brandColor, cursor:"pointer", height:"6px" }} />
                <span style={{ fontSize:"11px", color:"var(--sub)" }}>Round</span>
              </div>
            </div>
          </div>

          {/* Text fields */}
          <div style={{ background:"var(--card-bg)", borderRadius:"16px", padding:"16px", marginBottom:"16px",
            border:"1px solid var(--border)", boxShadow:"0 2px 12px rgba(0,0,0,0.04)" }}>
            <div style={{ fontSize:"11px", fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase" as const,
              color:C.orange, marginBottom:"14px" }}>Content</div>
            {activeStore && fields.map(({ key, label, icon }) => (
              <button key={key}
                onClick={() => openPopup(key, String(activeStore[key] ?? ""), 20, 100)}
                style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between",
                  padding:"14px 0", background:"transparent", border:"none", borderBottom:"1px solid var(--border)",
                  cursor:"pointer", textAlign:"left" as const }}>
                <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                  <span style={{ fontSize:"18px" }}>{icon}</span>
                  <div>
                    <div style={{ fontSize:"12px", fontWeight:600, color:"var(--sub)", marginBottom:"2px" }}>{label}</div>
                    <div style={{ fontSize:"14px", fontWeight:500, color:"var(--text)", maxWidth:"220px",
                      overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" as const }}>
                      {String(activeStore[key] ?? "")}
                    </div>
                  </div>
                </div>
                <span style={{ fontSize:"18px", color:"var(--sub)" }}>›</span>
              </button>
            ))}
          </div>

          {/* Export */}
          <div style={{ background:"var(--card-bg)", borderRadius:"16px", padding:"16px",
            border:"1px solid var(--border)", boxShadow:"0 2px 12px rgba(0,0,0,0.04)" }}>
            <div style={{ fontSize:"11px", fontWeight:700, letterSpacing:"0.08em", textTransform:"uppercase" as const,
              color:C.orange, marginBottom:"14px" }}>Export</div>
            {[["📄","Copy HTML","html"],["🛍️","Copy as Shopify","shopify"],["💾","Download .html","download"]].map(([icon,label,f]) => (
              <button key={f} onClick={() => handleCopy(f as "html"|"shopify"|"download")}
                style={{ width:"100%", display:"flex", alignItems:"center", gap:"12px", padding:"14px 0",
                  background:"transparent", border:"none", borderBottom:"1px solid var(--border)",
                  cursor:"pointer", textAlign:"left" as const }}>
                <span style={{ fontSize:"20px" }}>{icon}</span>
                <span style={{ fontSize:"14px", fontWeight:500, color:"var(--text)" }}>{label}</span>
              </button>
            ))}
            {copyFeedback && <div style={{ fontSize:"13px", color:C.orange, fontWeight:600, marginTop:"8px" }}>{copyFeedback}</div>}
          </div>
        </div>

        {/* Fixed bottom — preview changes + how to sell */}
        <div style={{ position:"fixed", bottom:0, left:0, right:0, padding:"12px 16px",
          paddingBottom:"calc(12px + env(safe-area-inset-bottom))",
          background:"var(--card-bg)", borderTop:"1px solid var(--border)",
          display:"flex", gap:"10px", zIndex:20 }}>
          <button onClick={() => setScreen("store")}
            style={{ flex:1, padding:"13px", borderRadius:"12px", border:`1.5px solid ${C.orange}`,
              background:"transparent", color:C.orange, fontWeight:700, fontSize:"14px", cursor:"pointer" }}>
            👁️ Preview changes
          </button>
          <button onClick={onGenerateSell}
            style={{ flex:1, padding:"13px", borderRadius:"12px", border:"none",
              background:`linear-gradient(135deg,${C.amber},${C.orange},${C.pink})`,
              color:"white", fontWeight:700, fontSize:"14px", cursor:"pointer",
              boxShadow:"0 6px 18px rgba(234,88,12,0.3)" }}>
            📈 How to sell
          </button>
        </div>
      </div>
    );
  }

  // Desktop editor — full editor with preview
  return (
    <main style={{ minHeight:"100vh", height:"100vh", position:"relative", overflow:"hidden" }}
      className="store-view"
      onClick={() => setPopup(null)}>
      {sharedBg}{navbar}

      {popup && activeStore && (
        <EditPopup popup={popup} brandColor={brandColor} onSave={handleSave} onDiscard={() => setPopup(null)} />
      )}

      <div style={{ position:"absolute", inset:0, overflowY:"auto", padding:"88px 0 0", zIndex:3 }}>

        {/* Top bar */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"0 24px 12px", gap:"8px", flexWrap:"wrap" as const }}>
          <div style={{ display:"flex", alignItems:"center", gap:"8px", flexWrap:"wrap" as const }}>

            {/* View store — back to Screen 1 */}
            <button onClick={() => setScreen("store")}
              style={{ ...gradBtn, padding:"9px 16px" }}>
              👁️ View store
            </button>

            <div style={{ display:"flex", background:"rgba(255,248,240,0.7)", backdropFilter:"blur(12px)", borderRadius:"10px", padding:"3px", border:"1px solid rgba(0,0,0,0.08)" }}>
              {(["preview","code"] as StoreView[]).map(v => (
                <button key={v} onClick={() => setStoreView(v)}
                  style={{ padding:"7px 14px", borderRadius:"8px", border:"none", cursor:"pointer", fontWeight:700, fontSize:"12px", transition:"all 0.2s",
                    background: storeView===v ? `linear-gradient(135deg,${C.amber},${C.orange},${C.pink})` : "transparent",
                    color: storeView===v ? "white" : "#6b7280",
                    boxShadow: storeView===v ? "0 4px 12px rgba(234,88,12,0.2)" : "none" }}>
                  {v==="preview" ? "📱 Preview" : "</> Code"}
                </button>
              ))}
            </div>

            <button onClick={(e) => { e.stopPropagation(); setShowDesign(!showDesign); }}
              style={{ padding:"8px 14px", borderRadius:"10px",
                border:`1.5px solid ${showDesign ? C.orange : "rgba(0,0,0,0.1)"}`,
                background: showDesign ? `${C.orange}12` : "rgba(255,255,255,0.9)",
                color: showDesign ? C.orange : "#6b7280", fontWeight:700, fontSize:"13px", cursor:"pointer" }}>
              🎨 Design
            </button>
          </div>

          <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
            {copyFeedback && <span style={{ fontSize:"13px", color:C.orange, fontWeight:600 }}>{copyFeedback}</span>}
            <button onClick={onGenerateSell} style={gradBtn}
              onMouseEnter={(e) => { e.currentTarget.style.transform="translateY(-1px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform="translateY(0)"; }}>
              📈 How to sell
            </button>
            <div ref={copyRef} style={{ position:"relative" }}>
              <button onClick={(e) => { e.stopPropagation(); setCopyOpen(!copyOpen); }}
                style={{ padding:"9px 14px", borderRadius:"10px", border:"1px solid rgba(0,0,0,0.1)", background:"rgba(255,255,255,0.9)", color:"#374151", fontWeight:700, fontSize:"13px", cursor:"pointer" }}>
                📋 ▾
              </button>
              {copyOpen && (
                <div style={{ position:"absolute", top:"calc(100% + 6px)", right:0, background:"white", border:"1px solid rgba(0,0,0,0.08)", borderRadius:"14px", boxShadow:"0 14px 36px rgba(0,0,0,0.12)", overflow:"hidden", zIndex:100, minWidth:"210px" }}>
                  {([["html","📄","Copy HTML"],["shopify","🛍️","Copy as Shopify"],["download","💾","Download .html"]] as const).map(([f,icon,label]) => (
                    <button key={f} onClick={() => handleCopy(f)}
                      style={{ display:"block", width:"100%", padding:"13px 16px", background:"transparent", border:"none", borderTop:f!=="html"?"1px solid rgba(0,0,0,0.06)":"none", textAlign:"left" as const, cursor:"pointer", fontSize:"13px", color:"#1f2937", fontWeight:500 }}
                      onMouseEnter={(e) => { e.currentTarget.style.background="#fff7ed"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background="transparent"; }}>
                      {icon} {label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Design controls */}
        {showDesign && (
          <div onClick={(e) => e.stopPropagation()}
            style={{ margin:"0 24px 12px", background:"rgba(255,255,255,0.88)", backdropFilter:"blur(20px)", border:"1px solid rgba(0,0,0,0.08)", borderRadius:"16px", padding:"14px 20px", display:"flex", flexWrap:"wrap" as const, gap:"16px", alignItems:"center" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
              <span style={{ fontSize:"12px", fontWeight:600, color:"#6b7280" }}>Brand colour</span>
              <div style={{ width:"22px", height:"22px", borderRadius:"6px", background:brandColor, border:"1px solid rgba(0,0,0,0.1)" }} />
              <input type="color" value={brandColor} onChange={(e) => onUpdateBrandColor(e.target.value)}
                style={{ width:"36px", height:"28px", border:"none", cursor:"pointer", background:"transparent" }} />
            </div>
            <div style={{ width:"1px", height:"28px", background:"rgba(0,0,0,0.1)" }} />
            <div style={{ display:"flex", alignItems:"center", gap:"8px", flex:1, minWidth:"200px" }}>
              <span style={{ fontSize:"12px", fontWeight:600, color:"#6b7280", whiteSpace:"nowrap" as const }}>Button shape</span>
              <span style={{ fontSize:"10px", color:"#9ca3af" }}>Sharp</span>
              <input type="range" min="0" max="32" value={btnRadius} onChange={(e) => setBtnRadius(parseInt(e.target.value))}
                style={{ flex:1, accentColor:brandColor, cursor:"pointer" }} />
              <span style={{ fontSize:"10px", color:"#9ca3af" }}>Round</span>
              <button style={{ padding:"5px 12px", borderRadius:br, background:brandColor, color:"white", border:"none", fontSize:"11px", fontWeight:700, cursor:"default", whiteSpace:"nowrap" as const }}>
                {activeStore?.cta || "Buy Now"}
              </button>
            </div>
            <div style={{ width:"1px", height:"28px", background:"rgba(0,0,0,0.1)" }} />
            <div style={{ display:"flex", alignItems:"center", gap:"8px", flex:1, minWidth:"180px" }}>
              <span style={{ fontSize:"12px", fontWeight:600, color:"#6b7280", whiteSpace:"nowrap" as const }}>Image corners</span>
              <span style={{ fontSize:"10px", color:"#9ca3af" }}>Sharp</span>
              <input type="range" min="0" max="32" value={imgRadius} onChange={(e) => setImgRadius(parseInt(e.target.value))}
                style={{ flex:1, accentColor:brandColor, cursor:"pointer" }} />
              <span style={{ fontSize:"10px", color:"#9ca3af" }}>Round</span>
              <div style={{ width:"28px", height:"28px", borderRadius:ir, background:`linear-gradient(135deg,${C.amber},${C.orange},${C.pink})`, flexShrink:0 }} />
            </div>
          </div>
        )}

        {storeView === "preview" && (
          <div style={{ margin:"0 24px 10px", display:"flex", alignItems:"center", gap:"8px", padding:"9px 14px",
            background:"rgba(234,88,12,0.06)", border:"1px solid rgba(234,88,12,0.15)", borderRadius:"10px", fontSize:"12px", color:"#9a3412", fontWeight:600 }}>
            ✏️ Click any text in the store to edit it — colours, size, weight and more
          </div>
        )}

        {storeView === "code" && (
          <div style={{ margin:"0 24px 12px", display:"flex", alignItems:"center", gap:"10px", padding:"12px 16px",
            background:`${C.orange}12`, border:`1px solid ${C.orange}33`, borderRadius:"12px", color:"#9a3412", fontSize:"13px", fontWeight:600 }}>
            <span style={{ color:C.orange }}>✓</span> Ready to paste into Shopify, Wix, or any website builder
          </div>
        )}

        {/* Editor preview */}
        {storeView === "preview" && activeStore && (
          <div style={{ margin:"0 24px 24px", borderRadius:"20px", overflow:"hidden",
            boxShadow:"0 24px 70px rgba(0,0,0,0.1)", border:"1px solid rgba(0,0,0,0.06)" }}
            onClick={(e) => e.stopPropagation()}>
            <div style={{ height:"calc(100vh - 220px)", overflowY:"auto" }}>
              {template === 1 && <Template1 {...templateProps} />}
              {template === 2 && <Template2 {...templateProps} />}
              {template === 3 && <Template3 {...templateProps} />}
              {template === 4 && <Template4 {...templateProps} />}
            </div>
          </div>
        )}

        {storeView === "preview" && storeLoading && (
          <div style={{ minHeight:"calc(100vh - 200px)", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"12px", color:"#6b7280" }}>
            <div style={{ fontSize:"52px", animation:"firePulse 1.1s ease-in-out infinite" }}>🔥</div>
            <div style={{ fontSize:"17px", fontWeight:700 }}>Building your store...</div>
          </div>
        )}

        {storeView === "code" && (
          <div style={{ margin:"0 24px 24px", background:"#0f172a", borderRadius:"20px", overflow:"hidden", border:"1px solid rgba(0,0,0,0.08)" }}>
            <div style={{ display:"flex", alignItems:"center", gap:"8px", padding:"14px 20px", background:"#1e293b", borderBottom:"1px solid rgba(255,255,255,0.08)" }}>
              <div style={{ display:"flex", gap:"6px" }}>
                {["#ef4444","#f59e0b","#22c55e"].map(bg => (
                  <div key={bg} style={{ width:"12px", height:"12px", borderRadius:"50%", background:bg }} />
                ))}
              </div>
              <span style={{ color:"#94a3b8", fontSize:"13px", marginLeft:"10px", fontFamily:"Menlo,Monaco,Consolas,monospace" }}>
                {storeProductName.toLowerCase().replace(/\s+/g,"-")}-store.html
              </span>
            </div>
            <pre style={{ margin:0, padding:"24px", overflow:"auto", fontSize:"12px", lineHeight:1.65, color:"#e2e8f0", fontFamily:"Menlo,Monaco,Consolas,monospace", maxHeight:"calc(100vh - 260px)" }}>
              {currentHTML}
            </pre>
          </div>
        )}
      </div>
    </main>
  );
}