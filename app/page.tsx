"use client";

import { generateStoreHTML, generateShopifySection } from "@/app/lib/generateStoreHTML";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Background    from "@/app/components/shared/Background";
import Keyframes     from "@/app/components/shared/Keyframes";
import SignupModal   from "@/app/components/shared/SignupModal";
import StoreBuilder  from "@/app/components/StoreBuilder";

type Idea = {
  name:         string;
  score:        number;
  top:          boolean;
  why:          string;
  audience:     string;
  sell:         string;
  difficulty:   string;
  tiktokViews?: string | null;
  shopifyRank?: number | null;
  dataEnriched?: boolean;
};

type StoreProduct = {
  name: string;
  price: string;
  description: string;
};

type StoreData = {
  brand: string;
  headline: string;
  subheadline: string;
  price: string;
  cta: string;
  description: string;
  benefits: string[];
  sections: { title: string; text: string }[];
  products: StoreProduct[];
};

type SellData = {
  title: string;
  launchActions: string[];
  hooks: string[];
  adAngles: string[];
  creatorScript: string;
  supplierSuggestions: { name: string; reason: string }[];
};

type AppState = "idle" | "results" | "plan" | "store" | "sell";
type StoreView = "preview" | "code";
type CopyFormat = "html" | "shopify" | "download";

const TOP_INDUSTRIES = [
  "🏋️ Fitness","💄 Beauty","🐾 Pets","🏠 Home",
  "💻 Tech","👗 Fashion","🧘 Wellness","🏕️ Outdoor",
];

const COLOURS = {
  yellow: "#FDE047", amber: "#F59E0B", orange: "#EA580C",
  red: "#EF4444", pink: "#FB7185",
};

function getScoreLabel(score: number) {
  if (score >= 90) return "🔥 High potential";
  if (score >= 80) return "👍 Good opportunity";
  return "⚠️ Average";
}

function getFirstStep(productName: string) {
  const steps: Record<string, string> = {
    "Adjustable Dumbbells":   "Order a sample and test 3 premium home-gym ad hooks.",
    "Resistance Bands":       "Create 3 beginner workout TikTok concepts and test bundle pricing.",
    "Posture Corrector":      "Write 3 posture pain-point hooks aimed at office workers.",
    "Smart Jump Rope":        "Draft 3 fast UGC-style video ideas around the smart features.",
    "Gym Gloves":             "Bundle it with other gym accessories and test a starter offer.",
    "LED Face Mask":          "Create a premium skincare angle and test 3 before/after hooks.",
    "Lash Serum":             "Write 3 testimonial-led ad angles focused on repeat use.",
    "Ice Roller":             "Create 3 morning routine/self-care content ideas for TikTok.",
    "Hair Curler":            "Draft 3 hairstyle transformation video concepts.",
    "Makeup Organiser":       "Create 3 aesthetic vanity setup content concepts.",
    "Auto Pet Feeder":        "Write 3 busy-pet-owner hooks focused on convenience and peace of mind.",
    "Cat Fountain":           "Create a hydration-focused product story and pet-health angle.",
    "Dog Cooling Mat":        "Draft 3 summer comfort hooks for dog owners.",
    "Grooming Kit":           "Create 3 at-home grooming content ideas with bundle messaging.",
    "LED Dog Collar":         "Write 3 safety-focused headlines for night walks.",
    "Under Sink Organiser":   "Create 3 before-and-after decluttering content concepts.",
    "Magnetic Spice Rack":    "Test 3 kitchen organisation hooks around saving space.",
    "Foldable Storage Boxes": "Build 3 home reset and tidy-up content ideas.",
    "Cable Management Kit":   "Write 3 desk transformation hooks for productivity setups.",
    "Space Saving Hangers":   "Create 3 wardrobe decluttering angles with visual payoff.",
    "Wireless Charging Stand":"Create 3 desk setup and convenience-led ad angles.",
    "Portable Phone Charger": "Test 3 travel and daily-use convenience hooks.",
    "Smart LED Light Strip":  "Build 3 room transformation short-form video concepts.",
    "Mini Projector":         "Create 3 cosy-night-in lifestyle content angles.",
    "Bluetooth Tracker Tag":  "Write 3 problem-solution hooks around losing keys or bags.",
    "Crossbody Bag":          "Test 3 everyday outfit and convenience-led fashion hooks.",
    "Minimalist Watch":       "Create 3 premium style and gifting content angles.",
    "Layered Necklace Set":   "Draft 3 outfit-upgrade and aesthetic styling clips.",
    "Oversized Hoodie":       "Test 3 comfort-meets-style content concepts.",
    "Polarized Sunglasses":   "Create 3 lifestyle and protection-led ad hooks.",
    "Massage Gun":            "Write 3 recovery and pain-relief hooks for active adults.",
    "Aromatherapy Diffuser":  "Create 3 evening routine and calm-home content concepts.",
    "Sleep Aid Device":       "Test 3 better-sleep transformation hooks.",
    "Blue Light Glasses":     "Write 3 screen-fatigue and productivity-led hooks.",
    "Stress Relief Ring":     "Create 3 calming daily habit content concepts.",
    "Solar Power Bank":       "Create 3 outdoor preparedness and travel hooks.",
    "Camping Hammock":        "Test 3 relaxation and adventure lifestyle angles.",
    "Portable Water Filter":  "Write 3 problem-solution hooks for travel and camping.",
    "Compact Camping Stove":  "Create 3 outdoor cooking and travel utility clips.",
    "Waterproof Backpack":    "Test 3 durability and adventure-led content angles.",
  };
  return steps[productName] || "Pick a clear first action and test 3 content angles.";
}

const primaryButton: React.CSSProperties = {
  width: "100%", padding: "14px 18px", borderRadius: "14px",
  border: "1px solid transparent",
  backgroundImage: "linear-gradient(white, white), linear-gradient(135deg, #FDE047 0%, #EA580C 55%, #FB7185 100%)",
  backgroundOrigin: "border-box", backgroundClip: "padding-box, border-box",
  color: "#111827", fontWeight: 800, fontSize: "15px", cursor: "pointer",
  transition: "all 0.25s ease", boxShadow: "0 10px 26px rgba(234,88,12,0.14)",
  position: "relative", overflow: "hidden",
};

const secondaryButton: React.CSSProperties = {
  width: "100%", padding: "12px 16px", borderRadius: "12px",
  border: "1px solid rgba(0,0,0,0.1)", background: "rgba(255,255,255,0.9)",
  color: "#374151", fontWeight: 600, fontSize: "14px", cursor: "pointer",
  transition: "all 0.2s ease",
};

const unlockButton: React.CSSProperties = {
  ...primaryButton,
  backgroundImage: "linear-gradient(135deg, #fffbe8 0%, #fff4e6 50%, #fff0f3 100%), linear-gradient(135deg, #FDE047 0%, #EA580C 55%, #FB7185 100%)",
  boxShadow: "0 0 0 1px rgba(234,88,12,0.18), 0 14px 36px rgba(234,88,12,0.22), 0 0 60px rgba(253,224,71,0.10)",
  display: "flex", alignItems: "center", justifyContent: "center", gap: "8px",
};

function getRect(el: HTMLElement | null) {
  return el?.getBoundingClientRect() ?? null;
}

export default function Home() {
  const [appState, setAppState]             = useState<AppState>("idle");
  const [prompt, setPrompt]                 = useState("");
  const [ideas, setIdeas]                   = useState<Idea[]>([]);
  const [ideaTip, setIdeaTip]               = useState<string>("");
  const [selectedIdea, setSelectedIdea]     = useState("");
  const [activePlan, setActivePlan]         = useState("");
  const [loading, setLoading]               = useState(false);
  const [planLoading, setPlanLoading]       = useState(false);
  const [storeLoading, setStoreLoading]     = useState(false);
  const [activeStore, setActiveStore]       = useState<StoreData | null>(null);
  const [storeProductName, setStoreProductName] = useState("");
  const [sellLoading, setSellLoading]       = useState(false);
  const [activeSell, setActiveSell]         = useState<SellData | null>(null);
  const [displayText, setDisplayText]       = useState("");
  const [phraseIndex, setPhraseIndex]       = useState(0);
  const [charIndex, setCharIndex]           = useState(0);
  const [isDeleting, setIsDeleting]         = useState(false);
  const [searchDocked, setSearchDocked]     = useState(false);
  const [igniting, setIgniting]             = useState(false);
  const [brandColor, setBrandColor]         = useState("#ea580c");
  const [showSignup, setShowSignup]         = useState(false);
  const [signupEmail, setSignupEmail]       = useState("");
  const [signupStatus, setSignupStatus]     = useState<"idle"|"loading"|"success"|"error">("idle");
  const [signupTrigger, setSignupTrigger]   = useState("");
  const [userEmail, setUserEmail]           = useState<string | null>(null);
  const [saveStatus, setSaveStatus]         = useState<"idle"|"saving"|"saved">("idle");
  const saveTimeoutRef                      = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [storeView, setStoreView]           = useState<StoreView>("preview");
  const [copyDropdownOpen, setCopyDropdownOpen] = useState(false);
  const [copyFeedback, setCopyFeedback]     = useState("");
  const [expandedMonth, setExpandedMonth]   = useState<number | null>(null);
  const copyDropdownRef                     = useRef<HTMLDivElement>(null);
  const heroSearchRef                       = useRef<HTMLDivElement>(null);
  const [flipStyle, setFlipStyle]           = useState<React.CSSProperties | null>(null);
  const [isFlipping, setIsFlipping]         = useState(false);

  const phrases = [
    "create a fitness brand you can launch today",
    "find trending pet products to sell this week",
    "build a beauty store from scratch",
    "discover what's hot in home and living",
    "create a tech brand ready to launch",
    "find the best wellness products right now",
    "build something in fashion you can sell today",
    "discover trending outdoor products to sell",
  ];

  useEffect(() => {
    if (appState !== "idle") return;
    const currentPhrase = phrases[phraseIndex];
    let timeout: ReturnType<typeof setTimeout>;
    if (!isDeleting) {
      if (charIndex < currentPhrase.length) {
        timeout = setTimeout(() => { setDisplayText(currentPhrase.slice(0, charIndex + 1)); setCharIndex((p) => p + 1); }, 55);
      } else {
        timeout = setTimeout(() => setIsDeleting(true), 1800);
      }
    } else {
      if (charIndex > 0) {
        timeout = setTimeout(() => { setDisplayText(currentPhrase.slice(0, charIndex - 1)); setCharIndex((p) => p - 1); }, 28);
      } else {
        setIsDeleting(false);
        setPhraseIndex((p) => (p + 1) % phrases.length);
      }
    }
    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, phraseIndex, appState]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (copyDropdownRef.current && !copyDropdownRef.current.contains(e.target as Node)) {
        setCopyDropdownOpen(false);
      }
    }
    if (copyDropdownOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [copyDropdownOpen]);

  const runFlipAnimation = useCallback(() => {
    const heroEl = heroSearchRef.current;
    if (!heroEl) return;
    const firstRect = getRect(heroEl);
    if (!firstRect) return;
    const vw = window.innerWidth;
    const barWidth = Math.min(680, vw - 48);
    const barLeft = (vw - barWidth) / 2;
    const lastTop = window.innerHeight - 24 - 62;
    const dx = barLeft - firstRect.left;
    const dy = lastTop - firstRect.top;
    const scaleX = barWidth / firstRect.width;
    setFlipStyle({
      position: "fixed", top: firstRect.top, left: firstRect.left,
      width: firstRect.width, height: firstRect.height,
      zIndex: 200, pointerEvents: "none", borderRadius: "22px",
      background: "rgba(255,255,255,0.94)", border: "1px solid rgba(17,24,39,0.08)",
      boxShadow: "0 20px 60px rgba(0,0,0,0.08)", backdropFilter: "blur(10px)",
      transform: "translate(0,0) scaleX(1)", transition: "none", opacity: 1,
    });
    setIsFlipping(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setFlipStyle((prev) => prev ? {
          ...prev,
          transform: `translate(${dx}px, ${dy}px) scaleX(${scaleX})`,
          borderRadius: "20px",
          transition: "transform 0.52s cubic-bezier(0.22,1,0.36,1), border-radius 0.3s ease, opacity 0.4s ease 0.15s",
          opacity: 0,
        } : null);
        setTimeout(() => { setIsFlipping(false); setFlipStyle(null); setSearchDocked(true); }, 560);
      });
    });
  }, []);

  async function saveStoreToSupabase(emailArg: string, productArg: string, colorArg: string, storeArg: StoreData) {
    try {
      setSaveStatus("saving");
      await fetch("/api/store-save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailArg, product_name: productArg, industry: prompt || null,
          brand_color: colorArg, headline: storeArg.headline, subheadline: storeArg.subheadline,
          price: storeArg.price, description: storeArg.description,
        }),
      });
      setSaveStatus("saved");
      setTimeout(() => setSaveStatus("idle"), 2000);
    } catch (e) { console.error("STORE SAVE ERROR:", e); setSaveStatus("idle"); }
  }

  function triggerDebouncedSave(nextStore: StoreData, nextColor?: string) {
    if (!userEmail) return;
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => {
      saveStoreToSupabase(userEmail, storeProductName, nextColor ?? brandColor, nextStore);
    }, 1500);
  }

  function resetToIdle() {
    setAppState("idle"); setPrompt(""); setIdeas([]); setSelectedIdea("");
    setActivePlan(""); setActiveStore(null); setStoreProductName("");
    setActiveSell(null); setSearchDocked(false); setIsFlipping(false);
    setFlipStyle(null); setBrandColor("#ea580c"); setStoreView("preview");
  }

  async function generate(overridePrompt?: string) {
    const value = overridePrompt ?? prompt;
    if (!value.trim()) return;
    runFlipAnimation();
    setLoading(true); setIdeas([]); setSelectedIdea(""); setActivePlan("");
    setActiveStore(null); setActiveSell(null); setStoreProductName("");
    setAppState("results");
    try {
      const res = await fetch("/api/idea", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: value }),
      });
      const data = await res.json();
      setIdeas(data.ideas || []);
      setIdeaTip(data.tip || "");
    } catch (e) { console.error("IDEA ERROR:", e); setIdeas([]); }
    finally { setLoading(false); }
  }

  function handlePillClick(industry: string) {
    const keyword = industry.split(" ")[1].toLowerCase();
    setPrompt(keyword);
    generate(keyword);
  }

  async function generatePlan(productName: string) {
    setSelectedIdea(productName); setActivePlan(""); setActiveStore(null);
    setActiveSell(null); setPlanLoading(true); setAppState("plan");
    try {
      const res = await fetch("/api/plan", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product: productName }),
      });
      const data = await res.json();
      setActivePlan(data.plan || "No plan found.");
    } catch (e) { console.error("PLAN ERROR:", e); setActivePlan("Something went wrong."); }
    finally { setPlanLoading(false); }
  }

  async function buildStore(productName: string) {
    setIgniting(true);
    await new Promise((r) => setTimeout(r, 420));
    setIgniting(false);
    setStoreLoading(true); setActiveStore(null); setActiveSell(null);
    setStoreProductName(productName); setBrandColor("#ea580c");
    setStoreView("preview");
    setAppState("store");
    try {
      const res = await fetch("/api/store", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product: productName }),
      });
      if (!res.ok) throw new Error(`Store API failed: ${res.status}`);
      const data = await res.json();
      setActiveStore(data.store || null);
      if (userEmail && data.store) {
        saveStoreToSupabase(userEmail, productName, "#ea580c", data.store);
      }
    } catch (e) { console.error("STORE ERROR:", e); setActiveStore(null); }
    finally { setStoreLoading(false); }
  }

  function updateStoreField<K extends keyof StoreData>(field: K, value: StoreData[K]) {
    setActiveStore((prev) => {
      if (!prev) return prev;
      const next = { ...prev, [field]: value };
      triggerDebouncedSave(next);
      return next;
    });
  }

  function updateStoreProduct(idx: number, field: keyof StoreProduct, value: string) {
    setActiveStore((prev) => {
      if (!prev) return prev;
      const products = prev.products.map((p, i) => i === idx ? { ...p, [field]: value } : p);
      const next = { ...prev, products };
      triggerDebouncedSave(next);
      return next;
    });
  }

  function updateBrandColor(newColor: string) {
    setBrandColor(newColor);
    if (activeStore) triggerDebouncedSave(activeStore, newColor);
  }

  function openSignup(trigger: string) {
    setSignupTrigger(trigger); setSignupEmail(""); setSignupStatus("idle"); setShowSignup(true);
  }

  async function submitSignup() {
    if (!signupEmail.includes("@")) return;
    setSignupStatus("loading");
    try {
      const emailTrimmed = signupEmail.trim();
      const res = await fetch("/api/waitlist", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailTrimmed, industry: selectedIdea || prompt || null }),
      });
      const data = await res.json();
      if (data.success) {
        setUserEmail(emailTrimmed);
        setShowSignup(false); setSignupStatus("idle");
        if (signupTrigger === "unlock") buildStore(selectedIdea);
        if (signupTrigger === "plan")   generatePlan(selectedIdea);
      } else { setSignupStatus("error"); }
    } catch { setSignupStatus("error"); }
  }

  async function generateSell(productName: string) {
    setSellLoading(true); setActiveSell(null); setAppState("sell");
    try {
      const res = await fetch("/api/sell", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ product: productName }),
      });
      if (!res.ok) throw new Error(`Sell API failed: ${res.status}`);
      const data = await res.json();
      setActiveSell(data.sell || null);

      // ── Send store email ──────────────────────────────────────
      if (userEmail && activeStore) {
        try {
          const storeHTML = generateStoreHTML(activeStore, brandColor, storeProductName);
          await fetch("/api/send-store", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: userEmail,
              brandName: activeStore.brand,
              productName: storeProductName,
              storeHTML,
            }),
          });
          console.log("Store email sent to", userEmail);
        } catch (emailErr) {
          console.error("Email send failed (non-blocking):", emailErr);
        }
      }

    } catch (e) { console.error("SELL ERROR:", e); setActiveSell(null); }
    finally { setSellLoading(false); }
  }

  function handleCopy(format: CopyFormat) {
    if (!activeStore) return;
    const html = format === "shopify"
      ? generateShopifySection(activeStore, brandColor, storeProductName)
      : generateStoreHTML(activeStore, brandColor, storeProductName);
    if (format === "download") {
      const blob = new Blob([html], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${storeProductName.toLowerCase().replace(/\s+/g, "-")}-store.html`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setCopyFeedback("Downloaded ✓");
    } else {
      navigator.clipboard.writeText(html).then(() => {
        setCopyFeedback(format === "shopify" ? "Shopify section copied ✓" : "HTML copied ✓");
      });
    }
    setCopyDropdownOpen(false);
    setTimeout(() => setCopyFeedback(""), 2500);
  }

  /* ─── Shared background ──────────────────────────────────────── */

  // Responsive pill count
  const [pillCount, setPillCount] = useState(5);
  useEffect(() => {
    function update() {
      const w = window.innerWidth;
      setPillCount(w < 400 ? 3 : w < 600 ? 4 : 5);
    }
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const sharedBg = (
    <>
      <Background appState={appState} igniting={igniting} />
      {flipStyle && <div style={flipStyle} />}
      <SignupModal
        show={showSignup}
        onClose={() => setShowSignup(false)}
        signupEmail={signupEmail}
        setSignupEmail={setSignupEmail}
        signupTrigger={signupTrigger}
        signupStatus={signupStatus}
        onSubmit={submitSignup}
      />
    </>
  );

  /* ─── Navbar ─────────────────────────────────────────────────── */
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    // Also check scrollable containers inside the page
    const containers = document.querySelectorAll('[style*="overflow"]');
    containers.forEach(c => c.addEventListener("scroll", handler, { passive: true }));
    return () => {
      window.removeEventListener("scroll", handler);
      containers.forEach(c => c.removeEventListener("scroll", handler));
    };
  }, []);

  const navbar = (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      padding: "0 32px",
      height: "64px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      background: scrolled ? "rgba(255,255,255,0.75)" : "transparent",
      borderBottom: scrolled ? "1px solid rgba(255,255,255,0.3)" : "1px solid transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      WebkitBackdropFilter: scrolled ? "blur(20px)" : "none",
      transition: "all 0.4s ease",
    }}>
      <div onClick={resetToIdle} style={{ display:"flex", alignItems:"center", gap:"10px", cursor:"pointer" }}>
        <img src="/favicon.svg" alt="Ember icon" style={{ width:"32px", height:"32px", objectFit:"contain" }} />
        <span style={{ fontWeight:800, fontSize:"21px", letterSpacing:"-0.03em", color:"#111827" }}>Ember</span>
      </div>
      {(appState === "idle" || appState === "results") && (
        <div style={{ display:"flex", alignItems:"center", gap:"22px", fontSize:"14px", color:"#4b5563" }}>
          <span style={{ cursor:"pointer" }}>How it works</span>
        </div>
      )}
      {appState === "plan" && <div style={{ fontSize:"14px", fontWeight:700, color:"#9a3412" }}>Step 2 — Business plan</div>}
      {appState === "store" && (
        <div style={{ display:"flex", alignItems:"center", gap:"12px" }}>
          {saveStatus === "saving" && <span style={{ fontSize:"12px", color:"#6b7280" }}>Saving…</span>}
          {saveStatus === "saved"  && <span style={{ fontSize:"12px", color:COLOURS.orange, fontWeight:600 }}>✓ Saved</span>}
          <div style={{ fontSize:"14px", fontWeight:700, color:"#9a3412" }}>Step 3 — Store ready</div>
        </div>
      )}
      {appState === "sell" && <div style={{ fontSize:"14px", fontWeight:700, color:"#9a3412" }}>Step 4 — Get your first sales</div>}
    </div>
  );

  /* ─── Keyframes ──────────────────────────────────────────────── */
  const keyframes = <Keyframes />;

  /* ════════════════════════════════════════════════════════════════
     PLAN VIEW
  ════════════════════════════════════════════════════════════════ */
  if (appState === "plan") {

    // ── Parse the raw plan text ──────────────────────────────────
    const rawPlan = activePlan || "";

    // Everything before the first ━━━ is the intro block
    const introBlock = rawPlan.split("━━━━━━━━━━━━━━━━━━━━━━")[0].trim();

    // Extract named intro sections
    const extractSection = (label: string, next: string) => {
      const re = new RegExp(`${label}\\n([\\s\\S]*?)(?=\\n[A-Z ]{4,}\\n|━━━|$)`);
      return rawPlan.match(re)?.[1]?.trim() || "";
    };
    const brandPos   = extractSection("BRAND POSITION", "WHO");
    const whoBuys    = extractSection("WHO BUYS THIS", "WHY");
    const whyWins    = extractSection("WHY THIS PRODUCT WINS", "━");
    const margins    = rawPlan.match(/REALISTIC MARGINS\n([^\n]+)/)?.[1] || "";

    // Extract each month block (between ━━━ pairs)
    const monthBlocks: { title: string; goal: string; weeks: { title: string; bullets: string[] }[] }[] = [];
    const monthRegex = /━━━━━━━━━━━━━━━━━━━━━━\n(MONTH \d[^\n]*)\nGoal: ([^\n]+)\n━━━━━━━━━━━━━━━━━━━━━━([\s\S]*?)(?=━━━━━━━━━━━━━━━━━━━━━━|REALISTIC MARGINS|$)/g;
    let m;
    while ((m = monthRegex.exec(rawPlan)) !== null) {
      const title    = m[1].trim();
      const goal     = m[2].trim();
      const body     = m[3].trim();
      // Split body into week blocks
      const weekSections = body.split(/\n(?=Week \d+)/).filter(s => s.trim());
      const weeks = weekSections.map(ws => {
        const lines   = ws.split("\n").filter(l => l.trim());
        const wTitle  = lines[0]?.replace(/^Week \d+ — /, "").trim() || "";
        const bullets = lines.slice(1).filter(l => l.trim().startsWith("•")).map(l => l.replace("•","").trim());
        return { title: wTitle, bullets };
      });
      monthBlocks.push({ title, goal, weeks });
    }

    const monthMeta = [
      { bg:"rgba(234,88,12,0.08)", border:"rgba(234,88,12,0.25)", badge:"#EA580C", icon:"🚀", expandBg:"rgba(234,88,12,0.03)" },
      { bg:"rgba(245,158,11,0.08)", border:"rgba(245,158,11,0.25)", badge:"#F59E0B", icon:"📈", expandBg:"rgba(245,158,11,0.03)" },
      { bg:"rgba(22,163,74,0.08)",  border:"rgba(22,163,74,0.25)",  badge:"#16a34a", icon:"🏆", expandBg:"rgba(22,163,74,0.03)"  },
    ];

    return (
      <main style={{ minHeight:"100vh", position:"relative", overflow:"hidden" }}>
        {sharedBg}{navbar}
        <div style={{ position:"relative", zIndex:3, maxWidth:"1080px", margin:"0 auto", padding:"110px 24px 80px", animation:"fadeUp 0.45s ease forwards" }}>

          {/* Header */}
          <div style={{ marginBottom:"8px", fontSize:"13px", fontWeight:700, color:"#9a3412", letterSpacing:"0.08em", textTransform:"uppercase" }}>Step 2 — Your business plan</div>
          <h1 style={{ margin:"0 0 6px", fontSize:"clamp(32px,5vw,52px)", lineHeight:1.02, letterSpacing:"-0.04em", color:"#111827" }}>{selectedIdea}</h1>
          <p style={{ margin:"0 0 28px", fontSize:"16px", color:"#6b7280" }}>Your 3-month roadmap from zero to profitable.</p>

          {planLoading ? (
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"20px", padding:"80px 0" }}>
              <div style={{ fontSize:"52px", animation:"firePulse 1.1s ease-in-out infinite" }}>🔥</div>
              <div style={{ fontSize:"17px", fontWeight:700, color:"#111827" }}>Building your 3-month plan...</div>
              <div style={{ display:"flex", flexDirection:"column", gap:"10px", width:"100%", maxWidth:"320px" }}>
                {[
                  { label:"Analysing your market", delay:"0s" },
                  { label:"Building revenue targets", delay:"1.5s" },
                  { label:"Writing week-by-week actions", delay:"3s" },
                ].map(({ label, delay }, i) => (
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:"10px", opacity:0, animation:`fadeIn 0.4s ease ${delay} forwards` }}>
                    <div style={{ width:"20px", height:"20px", borderRadius:"50%", background:`linear-gradient(135deg,${COLOURS.amber},${COLOURS.orange})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"11px", flexShrink:0 }}>✓</div>
                    <div style={{ fontSize:"13px", color:"#6b7280", fontWeight:500 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* ── Intro cards row ── */}
              <div className="plan-intro-grid" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))", gap:"14px", marginBottom:"16px" }}>

                {/* Brand position */}
                <div style={{ background:"rgba(255,248,240,0.35)", backdropFilter:"blur(16px)", border:"1px solid rgba(0,0,0,0.08)", borderRadius:"20px", padding:"20px", boxShadow:"0 4px 16px rgba(0,0,0,0.04)" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"12px" }}>
                    <div style={{ width:"26px", height:"26px", background:"linear-gradient(135deg,#FDE047,#EA580C)", borderRadius:"8px", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"13px" }}>🎯</div>
                    <span style={{ fontWeight:800, fontSize:"13px", color:"#111827", textTransform:"uppercase", letterSpacing:"0.06em" }}>Brand Position</span>
                  </div>
                  <div style={{ fontSize:"13px", color:"#374151", lineHeight:1.75 }}>{brandPos || introBlock}</div>
                </div>

                {/* Who buys this */}
                <div style={{ background:"rgba(255,248,240,0.35)", backdropFilter:"blur(16px)", border:"1px solid rgba(0,0,0,0.08)", borderRadius:"20px", padding:"20px", boxShadow:"0 4px 16px rgba(0,0,0,0.04)" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"12px" }}>
                    <div style={{ width:"26px", height:"26px", background:"linear-gradient(135deg,#FB7185,#EA580C)", borderRadius:"8px", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"13px" }}>👤</div>
                    <span style={{ fontWeight:800, fontSize:"13px", color:"#111827", textTransform:"uppercase", letterSpacing:"0.06em" }}>Who Buys This</span>
                  </div>
                  <div style={{ fontSize:"13px", color:"#374151", lineHeight:1.75 }}>{whoBuys}</div>
                </div>

                {/* Why it wins */}
                <div style={{ background:"rgba(255,248,240,0.35)", backdropFilter:"blur(16px)", border:"1px solid rgba(0,0,0,0.08)", borderRadius:"20px", padding:"20px", boxShadow:"0 4px 16px rgba(0,0,0,0.04)" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"12px" }}>
                    <div style={{ width:"26px", height:"26px", background:"linear-gradient(135deg,#EA580C,#F59E0B)", borderRadius:"8px", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"13px" }}>⚡</div>
                    <span style={{ fontWeight:800, fontSize:"13px", color:"#111827", textTransform:"uppercase", letterSpacing:"0.06em" }}>Why It Wins</span>
                  </div>
                  <div style={{ fontSize:"13px", color:"#374151", lineHeight:1.75 }}>{whyWins}</div>
                </div>
              </div>

              {/* ── First move strip ── */}
              <div style={{ background:"linear-gradient(135deg,rgba(234,88,12,0.1),rgba(253,224,71,0.07))", border:"1px solid rgba(234,88,12,0.22)", borderRadius:"18px", padding:"16px 20px", marginBottom:"16px", display:"flex", alignItems:"center", justifyContent:"space-between", gap:"16px", flexWrap:"wrap" }}>
                <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                  <span style={{ fontSize:"20px" }}>👉</span>
                  <div>
                    <div style={{ fontSize:"11px", fontWeight:700, color:"#9a3412", letterSpacing:"0.08em", textTransform:"uppercase", marginBottom:"3px" }}>Your First Move</div>
                    <div style={{ fontSize:"14px", fontWeight:700, color:"#111827" }}>{getFirstStep(selectedIdea)}</div>
                  </div>
                </div>
                <div style={{ display:"flex", gap:"6px", flexShrink:0 }}>
                  {["TikTok", "Instagram Reels", "Meta Ads"].map(ch => (
                    <span key={ch} style={{ padding:"4px 10px", background:"rgba(234,88,12,0.1)", border:"1px solid rgba(234,88,12,0.2)", borderRadius:"999px", fontSize:"11px", fontWeight:700, color:"#9a3412" }}>{ch}</span>
                  ))}
                </div>
              </div>

              {/* ── Month cards with full expandable detail ── */}
              <div style={{ display:"flex", flexDirection:"column", gap:"12px", marginBottom:"16px" }}>
                {monthBlocks.map((month, mi) => {
                  const meta       = monthMeta[mi] || monthMeta[2];
                  const isExpanded = expandedMonth === mi;

                  return (
                    <div key={mi} style={{ borderRadius:"20px", overflow:"hidden", border:`1px solid ${meta.border}`, boxShadow:"0 4px 16px rgba(0,0,0,0.04)" }}>

                      {/* Card header */}
                      <div style={{ background: meta.bg, padding:"20px 22px", cursor:"pointer" }}
                        onClick={() => setExpandedMonth(isExpanded ? null : mi)}>
                        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", gap:"12px" }}>
                          <div style={{ display:"flex", alignItems:"center", gap:"14px" }}>
                            <div style={{ fontSize:"30px" }}>{meta.icon}</div>
                            <div>
                              <div style={{ fontSize:"11px", fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color: meta.badge, marginBottom:"2px" }}>{month.title}</div>
                              <div style={{ fontSize:"20px", fontWeight:800, color:"#111827", letterSpacing:"-0.02em", marginBottom:"3px" }}>🎯 Goal: {month.goal}</div>
                              <div style={{ fontSize:"13px", color:"#6b7280" }}>{month.weeks.length} weeks · {month.weeks.reduce((a, w) => a + w.bullets.length, 0)} actions</div>
                            </div>
                          </div>
                          <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
                            <div style={{ padding:"8px 14px", borderRadius:"12px", border:`1px solid ${meta.border}`, background: isExpanded ? meta.badge : "rgba(255,255,255,0.7)", color: isExpanded ? "white" : meta.badge, fontWeight:700, fontSize:"12px", whiteSpace:"nowrap", transition:"all 0.2s ease" }}>
                              {isExpanded ? "Hide ↑" : "Full plan ↓"}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Expandable week-by-week detail */}
                      {isExpanded && (
                        <div style={{ background: meta.expandBg, padding:"22px", borderTop:`1px solid ${meta.border}` }}>
                          <div className="week-grid" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(260px, 1fr))", gap:"12px" }}>
                            {month.weeks.map((week, wi) => (
                              <div key={wi} style={{ background:"rgba(255,248,240,0.35)", backdropFilter:"blur(16px)", borderRadius:"16px", padding:"18px", border:`1px solid ${meta.border}` }}>
                                {/* Week header */}
                                <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"14px" }}>
                                  <div style={{ width:"28px", height:"28px", borderRadius:"8px", background: meta.badge, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"11px", fontWeight:800, color:"white", flexShrink:0 }}>{wi+1}</div>
                                  <div style={{ fontWeight:800, fontSize:"14px", color:"#111827" }}>{week.title}</div>
                                </div>
                                {/* Bullet actions */}
                                <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
                                  {week.bullets.map((bullet, bi) => (
                                    <div key={bi} style={{ display:"flex", gap:"8px", alignItems:"flex-start" }}>
                                      <div style={{ width:"16px", height:"16px", borderRadius:"50%", background:`${meta.badge}22`, border:`1.5px solid ${meta.badge}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:"3px" }}>
                                        <div style={{ width:"5px", height:"5px", borderRadius:"50%", background: meta.badge }} />
                                      </div>
                                      <div style={{ fontSize:"13px", color:"#374151", lineHeight:1.65 }}>{bullet}</div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* ── Margins strip ── */}
              {margins && (
                <div style={{ background:"rgba(255,248,240,0.35)", backdropFilter:"blur(16px)", border:"1px solid rgba(0,0,0,0.08)", borderRadius:"18px", padding:"18px 24px", marginBottom:"20px", display:"flex", alignItems:"center", gap:"8px", flexWrap:"wrap" }}>
                  <span style={{ fontSize:"18px" }}>💰</span>
                  <span style={{ fontWeight:700, fontSize:"13px", color:"#111827", marginRight:"8px" }}>Realistic Margins:</span>
                  {margins.split("|").map((part, i) => {
                    const [label, val] = part.split(":").map(s => s.trim());
                    return (
                      <div key={i} style={{ display:"flex", alignItems:"center", gap:"6px", padding:"6px 12px", background:"rgba(234,88,12,0.07)", border:"1px solid rgba(234,88,12,0.15)", borderRadius:"999px" }}>
                        <span style={{ fontSize:"12px", color:"#6b7280" }}>{label}:</span>
                        <span style={{ fontSize:"13px", fontWeight:800, color:"#111827" }}>{val}</span>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* ── CTA buttons ── */}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px", maxWidth:"480px" }}>
                <button className="ripple-btn"
                  onClick={() => buildStore(selectedIdea)}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px) scale(1.03)"; e.currentTarget.style.boxShadow = "0 0 0 1px rgba(234,88,12,0.28), 0 20px 48px rgba(234,88,12,0.32), 0 0 80px rgba(253,224,71,0.16)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.boxShadow = "0 0 0 1px rgba(234,88,12,0.18), 0 14px 36px rgba(234,88,12,0.22), 0 0 60px rgba(253,224,71,0.10)"; }}
                  style={unlockButton as React.CSSProperties}>
                  <span style={{ fontSize:"15px" }}>🔓</span><span>Unlock my store</span><span style={{ opacity:0.6, fontSize:"13px" }}>→</span>
                </button>
                <button onClick={() => setAppState("results")}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,1)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.9)"; }}
                  style={secondaryButton}>← Back to ideas</button>
              </div>
            </>
          )}
        </div>
        {keyframes}
      </main>
    );
  }

  /* ════════════════════════════════════════════════════════════════
     STORE VIEW
  ════════════════════════════════════════════════════════════════ */
  if (appState === "store") {
    return (
      <StoreBuilder
        selectedIdea={selectedIdea}
        storeProductName={storeProductName}
        activeStore={activeStore}
        storeLoading={storeLoading}
        brandColor={brandColor}
        sharedBg={sharedBg}
        navbar={navbar}
        onUpdateField={(field, value) => updateStoreField(field as keyof StoreData, value as any)}
        onUpdateBrandColor={updateBrandColor}
        onGenerateSell={() => generateSell(selectedIdea)}
        onBack={() => setAppState("results")}
      />
    );
  }

    /* ════════════════════════════════════════════════════════════════
     SELL VIEW
  ════════════════════════════════════════════════════════════════ */
  if (appState === "sell") {
    return (
      <main style={{ minHeight:"100vh", position:"relative", overflow:"hidden" }}>
        {sharedBg}{navbar}
        <div style={{ position:"relative", zIndex:3, maxWidth:"1080px", margin:"0 auto", padding:"110px 24px 80px", animation:"fadeUp 0.45s ease forwards" }}>

          {/* Header */}
          <div style={{ marginBottom:"8px", fontSize:"13px", fontWeight:700, color:"#9a3412", letterSpacing:"0.08em", textTransform:"uppercase" }}>Step 4 — Your sales playbook</div>
          <h1 style={{ margin:"0 0 6px", fontSize:"clamp(32px,5vw,52px)", lineHeight:1.02, letterSpacing:"-0.04em", color:"#111827" }}>{selectedIdea}</h1>
          <p style={{ margin:"0 0 32px", fontSize:"16px", color:"#6b7280" }}>Everything you need to make your first sale.</p>

          {sellLoading && (
            <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:"20px", padding:"80px 0" }}>
              <div style={{ fontSize:"52px", animation:"firePulse 1.1s ease-in-out infinite" }}>📈</div>
              <div style={{ fontSize:"17px", fontWeight:700, color:"#111827" }}>Building your sales playbook...</div>
              <div style={{ display:"flex", flexDirection:"column", gap:"10px", width:"100%", maxWidth:"320px" }}>
                {[
                  { label:"Writing your hook scripts", delay:"0s" },
                  { label:"Finding ad angles that convert", delay:"1.5s" },
                  { label:"Sourcing supplier recommendations", delay:"3s" },
                ].map(({ label, delay }, i) => (
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:"10px", opacity:0, animation:`fadeIn 0.4s ease ${delay} forwards` }}>
                    <div style={{ width:"20px", height:"20px", borderRadius:"50%", background:`linear-gradient(135deg,${COLOURS.amber},${COLOURS.orange})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"11px", flexShrink:0 }}>✓</div>
                    <div style={{ fontSize:"13px", color:"#6b7280", fontWeight:500 }}>{label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!sellLoading && activeSell && (
            <>
              {/* Test Pack header */}
              <div style={{ display:"flex", alignItems:"center", gap:"12px", padding:"16px 20px", background:"linear-gradient(135deg,rgba(234,88,12,0.08),rgba(253,224,71,0.06))", border:"1px solid rgba(234,88,12,0.2)", borderRadius:"18px", marginBottom:"20px" }}>
                <div style={{ fontSize:"22px" }}>🧪</div>
                <div>
                  <div style={{ fontWeight:800, fontSize:"15px", color:"#111827" }}>Your Test Pack</div>
                  <div style={{ fontSize:"13px", color:"#6b7280", marginTop:"2px" }}>3 hooks · 2 angles · 1 supplier · 1 price. Test first, scale what works.</div>
                </div>
                <div style={{ marginLeft:"auto", padding:"8px 16px", background:"rgba(234,88,12,0.1)", border:"1px solid rgba(234,88,12,0.2)", borderRadius:"12px", fontSize:"12px", fontWeight:700, color:"#9a3412", whiteSpace:"nowrap" }}>
                  Test budget: £50-100
                </div>
              </div>

              {/* Row 1 — Launch actions + Hooks */}
              <div className="sell-grid" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))", gap:"16px", marginBottom:"16px" }}>

                {/* Launch actions */}
                <div style={{ background:"rgba(255,248,240,0.35)", backdropFilter:"blur(16px)", border:"1px solid rgba(0,0,0,0.08)", borderRadius:"22px", padding:"22px", boxShadow:"0 8px 24px rgba(0,0,0,0.05)" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"8px", marginBottom:"16px" }}>
                    <div style={{ width:"32px", height:"32px", background:"linear-gradient(135deg,#FDE047,#EA580C)", borderRadius:"10px", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"15px" }}>🚀</div>
                    <span style={{ fontWeight:800, fontSize:"16px", color:"#111827" }}>Launch Actions</span>
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
                    {(activeSell.launchActions ?? []).map((item, idx) => (
                      <div key={idx} style={{ display:"flex", gap:"10px", alignItems:"flex-start", padding:"12px 14px", background: idx === 0 ? "linear-gradient(135deg,rgba(234,88,12,0.08),rgba(253,224,71,0.06))" : "rgba(249,250,251,0.8)", borderRadius:"14px", border: idx === 0 ? "1px solid rgba(234,88,12,0.2)" : "1px solid rgba(0,0,0,0.06)" }}>
                        <div style={{ width:"22px", height:"22px", borderRadius:"50%", background: idx === 0 ? "#EA580C" : "#e5e7eb", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"11px", fontWeight:800, color: idx === 0 ? "white" : "#6b7280", flexShrink:0, marginTop:"1px" }}>{idx + 1}</div>
                        <div style={{ fontSize:"13px", color: idx === 0 ? "#111827" : "#4b5563", lineHeight:1.65, fontWeight: idx === 0 ? 600 : 400 }}>{item}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Content hooks — TOP 3 ONLY */}
                <div style={{ background:"rgba(255,248,240,0.35)", backdropFilter:"blur(16px)", border:"1px solid rgba(0,0,0,0.08)", borderRadius:"22px", padding:"22px", boxShadow:"0 8px 24px rgba(0,0,0,0.05)" }}>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"6px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                      <div style={{ width:"32px", height:"32px", background:"linear-gradient(135deg,#FB7185,#EA580C)", borderRadius:"10px", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"15px" }}>🎣</div>
                      <span style={{ fontWeight:800, fontSize:"16px", color:"#111827" }}>3 Hooks to Test</span>
                    </div>
                    <span style={{ fontSize:"11px", padding:"3px 8px", background:"rgba(234,88,12,0.08)", border:"1px solid rgba(234,88,12,0.15)", borderRadius:"999px", color:"#9a3412", fontWeight:700 }}>Test all 3</span>
                  </div>
                  <p style={{ fontSize:"12px", color:"#9ca3af", marginBottom:"14px" }}>Tap to copy. Run each for 2 days at £8-10/day. Keep the winner.</p>
                  <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
                    {(activeSell.hooks ?? []).slice(0, 3).map((item, idx) => (
                      <div key={idx}
                        onClick={() => { navigator.clipboard.writeText(item); }}
                        style={{ padding:"12px 14px", background:"rgba(249,250,251,0.9)", borderRadius:"14px", border:"1px solid rgba(0,0,0,0.06)", cursor:"pointer", transition:"all 0.2s ease", display:"flex", justifyContent:"space-between", alignItems:"center", gap:"8px" }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(234,88,12,0.06)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(234,88,12,0.2)"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(249,250,251,0.9)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(0,0,0,0.06)"; }}>
                        <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                          <div style={{ width:"18px", height:"18px", borderRadius:"50%", background:`linear-gradient(135deg,${["#FDE047","#F59E0B","#EA580C"][idx]},${["#F59E0B","#EA580C","#FB7185"][idx]})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"9px", fontWeight:800, color:"white", flexShrink:0 }}>H{idx+1}</div>
                          <span style={{ fontSize:"13px", color:"#111827", lineHeight:1.55, fontWeight:500 }}>"{item}"</span>
                        </div>
                        <span style={{ fontSize:"11px", color:"#9ca3af", flexShrink:0 }}>copy</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Row 2 — 2 Ad angles + Creator script */}
              <div className="sell-grid" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(300px, 1fr))", gap:"16px", marginBottom:"16px" }}>

                {/* Ad angles — TOP 2 ONLY */}
                <div style={{ background:"rgba(255,248,240,0.35)", backdropFilter:"blur(16px)", border:"1px solid rgba(0,0,0,0.08)", borderRadius:"22px", padding:"22px", boxShadow:"0 8px 24px rgba(0,0,0,0.05)" }}>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"16px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                      <div style={{ width:"32px", height:"32px", background:"linear-gradient(135deg,#F59E0B,#EA580C)", borderRadius:"10px", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"15px" }}>🎯</div>
                      <span style={{ fontWeight:800, fontSize:"16px", color:"#111827" }}>2 Angles to Test</span>
                    </div>
                    <span style={{ fontSize:"11px", padding:"3px 8px", background:"rgba(245,158,11,0.08)", border:"1px solid rgba(245,158,11,0.2)", borderRadius:"999px", color:"#92400e", fontWeight:700 }}>A vs B</span>
                  </div>
                  <div style={{ display:"flex", flexDirection:"column", gap:"10px" }}>
                    {(activeSell.adAngles ?? []).slice(0, 2).map((item, idx) => (
                      <div key={idx} style={{ padding:"14px 16px", background:"rgba(249,250,251,0.8)", borderRadius:"14px", border:"1px solid rgba(0,0,0,0.06)", display:"flex", gap:"10px", alignItems:"flex-start" }}>
                        <div style={{ width:"26px", height:"26px", borderRadius:"8px", background:`linear-gradient(135deg,${["#FDE047","#F59E0B"][idx]},${["#F59E0B","#EA580C"][idx]})`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"11px", fontWeight:800, color:"white", flexShrink:0 }}>
                          {["A","B"][idx]}
                        </div>
                        <span style={{ fontSize:"13px", color:"#374151", lineHeight:1.65 }}>{item}</span>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop:"12px", padding:"10px 12px", background:"rgba(249,250,251,0.8)", borderRadius:"12px", fontSize:"12px", color:"#6b7280" }}>
                    💡 Run Angle A for 3 days, then Angle B for 3 days. Keep whichever has the lower cost per click.
                  </div>
                </div>

                {/* Creator script */}
                <div style={{ background:"rgba(255,248,240,0.35)", backdropFilter:"blur(16px)", border:"1px solid rgba(0,0,0,0.08)", borderRadius:"22px", padding:"22px", boxShadow:"0 8px 24px rgba(0,0,0,0.05)" }}>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"16px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                      <div style={{ width:"32px", height:"32px", background:"linear-gradient(135deg,#8b5cf6,#FB7185)", borderRadius:"10px", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"15px" }}>✉️</div>
                      <span style={{ fontWeight:800, fontSize:"16px", color:"#111827" }}>Creator Outreach</span>
                    </div>
                    <button
                      onClick={() => navigator.clipboard.writeText(activeSell.creatorScript || "")}
                      style={{ fontSize:"11px", padding:"5px 10px", borderRadius:"8px", border:"1px solid rgba(0,0,0,0.1)", background:"rgba(249,250,251,0.9)", color:"#6b7280", cursor:"pointer", fontWeight:600 }}>
                      Copy
                    </button>
                  </div>
                  <div style={{ background:"rgba(234,88,12,0.06)", border:"1px solid rgba(234,88,12,0.15)", borderRadius:"18px 18px 18px 4px", padding:"16px 18px", fontSize:"13px", color:"#374151", lineHeight:1.75, whiteSpace:"pre-wrap" }}>
                    {activeSell.creatorScript}
                  </div>
                  <div style={{ marginTop:"10px", fontSize:"11px", color:"#9ca3af", display:"flex", alignItems:"center", gap:"4px" }}>
                    <span>💡</span> Send to 5 creators with 5k-50k followers. Aim for 1-2 posts.
                  </div>
                </div>
              </div>

              {/* Top supplier — 1 recommended only */}
              <div style={{ background:"rgba(255,248,240,0.35)", backdropFilter:"blur(16px)", border:"1px solid rgba(0,0,0,0.08)", borderRadius:"22px", padding:"22px", boxShadow:"0 8px 24px rgba(0,0,0,0.05)", marginBottom:"16px" }}>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"18px" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:"8px" }}>
                    <div style={{ width:"32px", height:"32px", background:"linear-gradient(135deg,#16a34a,#059669)", borderRadius:"10px", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"15px" }}>🏭</div>
                    <span style={{ fontWeight:800, fontSize:"16px", color:"#111827" }}>Start With This Supplier</span>
                  </div>
                  <span style={{ fontSize:"11px", padding:"4px 10px", background:"rgba(22,163,74,0.08)", border:"1px solid rgba(22,163,74,0.2)", borderRadius:"999px", color:"#16a34a", fontWeight:700 }}>Recommended first</span>
                </div>
                <div className="supplier-grid" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(250px, 1fr))", gap:"14px" }}>
                  {(activeSell.supplierSuggestions ?? []).map((supplier, idx) => {
                    const badges = [
                      { label:"Start here", color:"#16a34a", bg:"rgba(22,163,74,0.08)", border:"rgba(22,163,74,0.2)", highlight: true },
                      { label:"Scale up",   color:"#6b7280", bg:"rgba(107,114,128,0.06)", border:"rgba(107,114,128,0.15)", highlight: false },
                      { label:"Alternative",color:"#6b7280", bg:"rgba(107,114,128,0.06)", border:"rgba(107,114,128,0.15)", highlight: false },
                    ];
                    const badge = badges[idx] || badges[2];
                    return (
                      <div key={idx} style={{ background: badge.highlight ? "rgba(22,163,74,0.04)" : "rgba(249,250,251,0.9)", borderRadius:"18px", padding:"18px", border:`1px solid ${badge.border}`, opacity: badge.highlight ? 1 : 0.7 }}>
                        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:"8px", marginBottom:"10px" }}>
                          <div style={{ fontWeight:800, fontSize:"14px", color:"#111827", lineHeight:1.3 }}>{supplier.name}</div>
                          <span style={{ padding:"3px 8px", borderRadius:"999px", fontSize:"10px", fontWeight:700, color: badge.color, background: badge.bg, whiteSpace:"nowrap", flexShrink:0 }}>{badge.label}</span>
                        </div>
                        <div style={{ fontSize:"12px", color:"#4b5563", lineHeight:1.7 }}>{supplier.reason}</div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Bottom nav */}
              <div className="sell-grid" style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(160px, 1fr))", gap:"12px", maxWidth:"680px" }}>
                <button onClick={() => setAppState("store")}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,1)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.9)"; }}
                  style={secondaryButton}>← Back to store</button>
                <button onClick={() => setAppState("results")}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,1)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.9)"; }}
                  style={secondaryButton}>← Back to ideas</button>
                <button className="ripple-btn"
                  onClick={() => window.location.href = "/final"}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-2px) scale(1.03)"; e.currentTarget.style.boxShadow = "0 20px 48px rgba(234,88,12,0.36)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.boxShadow = "0 14px 36px rgba(234,88,12,0.22)"; }}
                  style={{ ...unlockButton, width:"100%" } as React.CSSProperties}>
                  <span style={{ fontSize:"15px" }}>🎉</span>
                  <span>View final plan</span>
                  <span style={{ opacity:0.6, fontSize:"13px" }}>→</span>
                </button>
              </div>
            </>
          )}
        </div>
        {keyframes}
      </main>
    );
  }

  /* ════════════════════════════════════════════════════════════════
     IDLE + RESULTS VIEW
  ════════════════════════════════════════════════════════════════ */
  const isIdle    = appState === "idle";
  const isResults = appState === "results";

  return (
    <main style={{ minHeight:"100vh", position:"relative" }}>
      {sharedBg}{navbar}
      <div style={{ position:"relative", zIndex:3 }}>
        <section style={{ textAlign:"center", maxWidth:"860px", margin:"0 auto", width:"100%", paddingTop: isIdle ? "clamp(160px,38vh,280px)" : "96px", paddingLeft:"24px", paddingRight:"24px", paddingBottom:0, transition:"padding-top 0.65s cubic-bezier(0.4,0,0.2,1)" }}>
          <div style={{ overflow:"hidden", maxHeight: isIdle ? "240px" : "0px", opacity: isIdle ? 1 : 0, transform: isIdle ? "translateY(0)" : "translateY(-20px)", transition:"max-height 0.55s cubic-bezier(0.4,0,0.2,1), opacity 0.3s ease, transform 0.4s ease", pointerEvents: isIdle ? "auto" : "none" }}>
            <h1 style={{ fontSize:"clamp(32px,5vw,52px)", lineHeight:1.02, fontWeight:800, letterSpacing:"-0.045em", margin:"0 0 14px", color:"#111827" }}>Start your Ember</h1>
            <p style={{ fontSize:"18px", lineHeight:1.45, color:"rgba(31,41,55,0.64)", maxWidth:"560px", margin:"0 auto 28px" }}>Find, build, and launch a business with AI</p>
          </div>

          {isIdle && (
            <div style={{ maxWidth:"780px", margin:"0 auto" }}>
              <div ref={heroSearchRef} style={{ background:"rgba(255,255,255,0.94)", border:"1px solid rgba(17,24,39,0.08)", borderRadius:"22px", padding:"14px", boxShadow:"0 20px 60px rgba(0,0,0,0.08)", backdropFilter:"blur(10px)", opacity: isFlipping ? 0 : 1, transition:"opacity 0.1s ease" }}>
                <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); generate(); } }} placeholder={`Ask Ember to ${displayText}...`} rows={2} style={{ width:"100%", resize:"none", border:"none", outline:"none", background:"transparent", color:"#111827", fontSize:"15px", lineHeight:1.5, boxSizing:"border-box" }} />
                <div style={{ display:"flex", justifyContent:"flex-end", marginTop:"8px" }}>
                  <button className="ripple-btn" onClick={() => generate()} disabled={loading || !prompt.trim()} style={{ width:"42px", height:"42px", borderRadius:"999px", border:"none", background: loading || !prompt.trim() ? "#e5e7eb" : `linear-gradient(135deg,${COLOURS.amber} 0%,${COLOURS.orange} 50%,${COLOURS.pink} 100%)`, color:"white", fontSize:"18px", cursor: loading || !prompt.trim() ? "not-allowed" : "pointer", fontWeight:700, boxShadow: loading || !prompt.trim() ? "none" : "0 12px 28px rgba(251,113,133,0.22)", transition:"all 0.2s ease", position:"relative", overflow:"hidden" }}>↑</button>
                </div>
              </div>
              <div style={{ marginTop:"20px" }}>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:"6px", marginBottom:"12px" }}>
                  <div style={{ width:"6px", height:"6px", borderRadius:"50%", background:COLOURS.orange, animation:"firePulse 1.5s ease-in-out infinite" }} />
                  <p style={{ margin:0, fontSize:"13px", fontWeight:600, color:"#9a3412" }}>Top trending industries this week</p>
                  <div style={{ width:"6px", height:"6px", borderRadius:"50%", background:COLOURS.orange, animation:"firePulse 1.5s ease-in-out infinite" }} />
                </div>
                <div style={{ display:"flex", flexWrap:"wrap", justifyContent:"center", gap:"8px", fontSize:"13px", padding:"0 8px", maxWidth: pillCount === 3 ? "280px" : pillCount === 4 ? "380px" : "480px", margin:"0 auto" }}>
                  {TOP_INDUSTRIES.map((industry) => (
                    <span key={industry} onClick={() => handlePillClick(industry)}
                      onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.98)"; e.currentTarget.style.borderColor = "rgba(234,88,12,0.4)"; e.currentTarget.style.color = COLOURS.orange; e.currentTarget.style.transform = "translateY(-2px)"; }}
                      onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.7)"; e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)"; e.currentTarget.style.color = "#374151"; e.currentTarget.style.transform = "translateY(0)"; }}
                      style={{ padding:"8px 14px", borderRadius:"999px", background:"rgba(255,255,255,0.7)", border:"1px solid rgba(0,0,0,0.08)", cursor:"pointer", fontWeight:500, color:"#374151", transition:"all 0.2s ease", backdropFilter:"blur(8px)", whiteSpace:"nowrap" as const }}>
                      {industry}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}
        </section>

        {isResults && (
          <section style={{ maxWidth:"760px", width:"100%", margin:"32px auto 0", padding:"0 24px 220px", animation:"fadeUp 0.45s ease forwards" }}>
            {loading && (
              <div style={{ textAlign:"center", color:"#4b5563", padding:"40px 0" }}>
                <div style={{ fontSize:"42px", animation:"firePulse 1.1s ease-in-out infinite", marginBottom:"12px" }}>🔥</div>
                <div style={{ fontSize:"16px", fontWeight:700, color:"#111827", marginBottom:"6px" }}>Ember is scanning real data...</div>
                <div style={{ fontSize:"13px", color:"#9ca3af" }}>Checking TikTok trends + Shopify bestsellers</div>
              </div>
            )}

            {!loading && ideas.length === 0 && appState === "results" && (
              <div style={{ textAlign:"center", padding:"48px 24px" }}>
                <div style={{ fontSize:"48px", marginBottom:"16px" }}>🤔</div>
                <div style={{ fontSize:"20px", fontWeight:700, color:"#111827", marginBottom:"8px" }}>
                  We don't recognise that industry yet
                </div>
                <div style={{ fontSize:"14px", color:"#6b7280", marginBottom:"32px", lineHeight:1.6, maxWidth:"420px", margin:"0 auto 32px" }}>
                  Ember currently covers 8 of the top trending industries. Try one of these to get started — more industries coming soon.
                </div>
                <div style={{ display:"flex", flexWrap:"wrap", gap:"10px", justifyContent:"center", marginBottom:"32px" }}>
                  {["🏋️ Fitness","💄 Beauty","🐾 Pets","🏠 Home","💻 Tech","👗 Fashion","🌿 Wellness","🏕️ Outdoor"].map(industry => (
                    <button
                      key={industry}
                      onClick={() => { const kw = industry.split(" ")[1].toLowerCase(); setPrompt(kw); generate(kw); }}
                      style={{ padding:"10px 18px", borderRadius:"999px", border:"1.5px solid rgba(234,88,12,0.3)", background:"rgba(234,88,12,0.06)", color:"#ea580c", fontSize:"14px", fontWeight:600, cursor:"pointer" }}
                    >
                      {industry}
                    </button>
                  ))}
                </div>
                <div style={{ fontSize:"12px", color:"#9ca3af" }}>
                  Want us to add your industry? We're tracking requests for Phase 2.
                </div>
              </div>
            )}
            {ideas.map((idea, index) => {
              // ── Decision badge ──
              const decision = idea.score >= 90
                ? { label:"🔥 Top Pick",    color:"#ea580c", bg:"rgba(234,88,12,0.08)",  border:"rgba(234,88,12,0.25)",  reason:"High demand, clear audience, and strong sales potential. A great place to start." }
                : idea.score >= 75
                ? { label:"⚡ Strong Pick", color:"#d97706", bg:"rgba(245,158,11,0.08)", border:"rgba(245,158,11,0.25)", reason:"Solid potential with room to grow. Worth testing with a small budget to validate." }
                : { label:"👀 Explore",     color:"#6b7280", bg:"rgba(107,114,128,0.06)", border:"rgba(107,114,128,0.2)", reason:"Lower competition and niche appeal. Could be a hidden gem for the right person." };

              return (
              <div key={idea.name} className="idea-card" style={{ marginBottom:"16px", opacity:0, animation:`cardFanIn${index % 6} 0.5s cubic-bezier(0.22,1,0.36,1) forwards`, animationDelay:`${index * 0.09}s`, borderRadius:"18px", boxShadow: idea.top ? "0 14px 34px rgba(234,88,12,0.12)" : "0 4px 16px rgba(0,0,0,0.04)" }}>
                <div style={{ padding:"18px", borderRadius:"18px", background: idea.top ? "rgba(255,255,255,0.74)" : "rgba(255,255,255,0.56)", backdropFilter:"blur(8px)", border: idea.top ? "1.5px solid rgba(234,88,12,0.45)" : "1px solid rgba(0,0,0,0.12)" }}>

                  {/* Card header row */}
                  <div style={{ display:"flex", justifyContent:"space-between", gap:"12px", alignItems:"flex-start", marginBottom:"12px" }}>
                    <strong style={{ color:"#1f2937", fontSize:"17px" }}>{index + 1}. {idea.name}</strong>
                    <div style={{ display:"flex", gap:"8px", flexShrink:0, alignItems:"center" }}>
                      <div style={{ fontSize:"12px", color:"#9a3412", background:"rgba(255,247,237,0.85)", border:"1px solid rgba(245,158,11,0.25)", padding:"5px 10px", borderRadius:"999px", whiteSpace:"nowrap", fontWeight:600 }}>
                        {idea.score}/100
                      </div>
                    </div>
                  </div>

                  {/* Real data signals */}
                  {(idea.tiktokViews || idea.shopifyRank) && (
                    <div style={{ display:"flex", gap:"8px", marginBottom:"12px", flexWrap:"wrap" }}>
                      {idea.tiktokViews && (
                        <div style={{ display:"flex", alignItems:"center", gap:"5px", padding:"4px 10px", background:"rgba(0,0,0,0.04)", border:"1px solid rgba(0,0,0,0.08)", borderRadius:"999px" }}>
                          <span style={{ fontSize:"12px" }}>📱</span>
                          <span style={{ fontSize:"11px", fontWeight:600, color:"#374151" }}>{idea.tiktokViews} TikTok views</span>
                        </div>
                      )}
                      {idea.shopifyRank && idea.shopifyRank <= 20 && (
                        <div style={{ display:"flex", alignItems:"center", gap:"5px", padding:"4px 10px", background:"rgba(0,0,0,0.04)", border:"1px solid rgba(0,0,0,0.08)", borderRadius:"999px" }}>
                          <span style={{ fontSize:"12px" }}>🛍️</span>
                          <span style={{ fontSize:"11px", fontWeight:600, color:"#374151" }}>#{idea.shopifyRank} on {(idea as any).shopifyStore || "Shopify"}</span>
                        </div>
                      )}
                      {idea.dataEnriched && (
                        <div style={{ display:"flex", alignItems:"center", gap:"5px", padding:"4px 10px", background:"rgba(234,88,12,0.06)", border:"1px solid rgba(234,88,12,0.15)", borderRadius:"999px" }}>
                          <span style={{ fontSize:"12px" }}>⚡</span>
                          <span style={{ fontSize:"11px", fontWeight:600, color:"#9a3412" }}>Live data</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Decision banner — the key new element */}
                  <div style={{ display:"flex", alignItems:"center", gap:"10px", padding:"12px 14px", background: decision.bg, border:`1px solid ${decision.border}`, borderRadius:"14px", marginBottom:"14px" }}>
                    <div style={{ fontWeight:800, fontSize:"13px", color: decision.color, whiteSpace:"nowrap" }}>{decision.label}</div>
                    <div style={{ width:"1px", height:"14px", background: decision.border, flexShrink:0 }} />
                    <div style={{ fontSize:"12px", color:"#4b5563", lineHeight:1.5 }}>{decision.reason}</div>
                  </div>

                  {/* Product details */}
                  <div style={{ fontSize:"14px", color:"#555", lineHeight:1.7 }}>
                    {idea.top && (
                      <div style={{ color:COLOURS.orange, fontWeight:700, marginBottom:"8px", fontSize:"13px" }}>🔥 Best Opportunity — We recommend starting with this product first.</div>
                    )}
                    <div><strong>Why:</strong> {idea.why}</div>
                    <div><strong>Audience:</strong> {idea.audience}</div>
                    <div><strong>Sell:</strong> {idea.sell}</div>
                    <div><strong>Difficulty:</strong> {idea.difficulty}</div>

                    <div style={{ marginTop:"14px", display:"flex", gap:"10px", alignItems:"center" }}>
                      <button className="ripple-btn" onClick={() => {
                        if (userEmail) {
                          generatePlan(idea.name);
                        } else {
                          setSelectedIdea(idea.name);
                          openSignup("plan");
                        }
                      }}
                        onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-1px) scale(1.03)"; e.currentTarget.style.boxShadow = "0 10px 22px rgba(234,88,12,0.28)"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0) scale(1)"; e.currentTarget.style.boxShadow = "0 6px 16px rgba(234,88,12,0.2)"; }}
                        style={{ border:"none", borderRadius:"12px", padding:"10px 16px", background:`linear-gradient(135deg,${COLOURS.amber} 0%,${COLOURS.orange} 50%,${COLOURS.red} 100%)`, color:"white", fontWeight:700, fontSize:"14px", cursor:"pointer", transition:"all 0.2s ease", boxShadow:"0 6px 16px rgba(234,88,12,0.2)", position:"relative", overflow:"hidden" }}>
                        Plan & build →
                      </button>
                    </div>

                    {idea.top && (
                      <div style={{ marginTop:"12px", padding:"12px 14px", borderRadius:"14px", background:"rgba(255,255,255,0.55)", border:"1px solid rgba(0,0,0,0.08)" }}>
                        <div style={{ fontWeight:700, color:"#1f2937", marginBottom:"6px" }}>👉 First step</div>
                        <div style={{ color:"#4b5563" }}>{getFirstStep(idea.name)}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              );
            })}
          </section>
        )}
      </div>

      {isResults && (
        <div style={{ position:"fixed", bottom:0, left:0, right:0, zIndex:40, padding:"16px 24px 24px", background:"linear-gradient(to top,rgba(255,252,248,0.97) 60%,rgba(255,252,248,0.78) 80%,rgba(255,252,248,0) 100%)", backdropFilter:"blur(10px)", WebkitBackdropFilter:"blur(10px)", transform: searchDocked ? "translateY(0)" : "translateY(100%)", transition:"transform 0.48s cubic-bezier(0.22,1,0.36,1)" }}>
          <div style={{ maxWidth:"680px", margin:"0 auto" }}>
            <div style={{ background:"rgba(255,255,255,0.96)", border:"1px solid rgba(17,24,39,0.1)", borderRadius:"20px", padding:"10px 12px", boxShadow:"0 -2px 30px rgba(0,0,0,0.06), 0 20px 60px rgba(0,0,0,0.08)", display:"flex", alignItems:"center", gap:"10px" }}>
              <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); generate(); } }} placeholder="Search another niche or product..." rows={1} style={{ flex:1, resize:"none", border:"none", outline:"none", background:"transparent", color:"#111827", fontSize:"15px", lineHeight:1.5, boxSizing:"border-box", padding:"4px 0" }} />
              <button className="ripple-btn" onClick={() => generate()} disabled={loading || !prompt.trim()} style={{ width:"38px", height:"38px", borderRadius:"999px", border:"none", background: loading || !prompt.trim() ? "#e5e7eb" : `linear-gradient(135deg,${COLOURS.amber} 0%,${COLOURS.orange} 50%,${COLOURS.pink} 100%)`, color:"white", fontSize:"16px", cursor: loading || !prompt.trim() ? "not-allowed" : "pointer", fontWeight:700, flexShrink:0, boxShadow: loading || !prompt.trim() ? "none" : "0 8px 20px rgba(251,113,133,0.22)", transition:"all 0.2s ease", position:"relative", overflow:"hidden" }}>↑</button>
            </div>
          </div>
        </div>
      )}
      {keyframes}
    </main>
  );
}