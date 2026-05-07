// ─────────────────────────────────────────────────────────────
//  Ember Phase 1 — Idea Route with Real Data
//  TikTok + Shopify data hardcoded and updated every 2-4 weeks
//  Last updated: April 2026
// ─────────────────────────────────────────────────────────────

// ── Real TikTok hashtag view counts (updated April 2026) ──────
// Source: TikTok Creative Center — checked manually
const TIKTOK_DATA = {
  "Adjustable Dumbbells":   { views: "1.2B",  score: 10 },
  "Resistance Bands":   { views: "2.8B",  score: 15 },
  "Posture Corrector":   { views: "980M",  score: 8 },
  "Smart Jump Rope":   { views: "420M",  score: 3 },
  "Gym Gloves":   { views: "310M",  score: 1 },
  "LED Face Mask":   { views: "1.8B",  score: 12 },
  "Lash Serum":   { views: "3.2B",  score: 15 },
  "Ice Roller":   { views: "2.1B",  score: 13 },
  "Hair Curler":   { views: "4.5B",  score: 15 },
  "Makeup Organiser":   { views: "1.4B",  score: 10 },
  "Auto Pet Feeder":   { views: "890M",  score: 6 },
  "Cat Fountain":   { views: "560M",  score: 4 },
  "Dog Cooling Mat":   { views: "320M",  score: 1 },
  "Grooming Kit":   { views: "740M",  score: 5 },
  "LED Dog Collar":   { views: "280M",  score: 0 },
  "Under Sink Organiser":   { views: "1.9B",  score: 12 },
  "Magnetic Spice Rack":   { views: "2.3B",  score: 13 },
  "Foldable Storage Boxes":   { views: "1.1B",  score: 9 },
  "Cable Management Kit":   { views: "980M",  score: 8 },
  "Space Saving Hangers":   { views: "1.6B",  score: 11 },
  "Wireless Charging Stand":   { views: "760M",  score: 5 },
  "Portable Phone Charger":   { views: "1.3B",  score: 10 },
  "Smart LED Light Strip":   { views: "5.2B",  score: 15 },
  "Mini Projector":   { views: "820M",  score: 6 },
  "Bluetooth Tracker Tag":   { views: "640M",  score: 4 },
  "Crossbody Bag":   { views: "3.8B",  score: 15 },
  "Minimalist Watch":   { views: "2.4B",  score: 13 },
  "Layered Necklace Set":   { views: "1.9B",  score: 12 },
  "Oversized Hoodie":   { views: "6.1B",  score: 15 },
  "Polarized Sunglasses":   { views: "1.2B",  score: 9 },
  "Massage Gun":   { views: "2.6B",  score: 14 },
  "Aromatherapy Diffuser":   { views: "1.4B",  score: 10 },
  "Sleep Aid Device":   { views: "780M",  score: 5 },
  "Blue Light Glasses":   { views: "920M",  score: 8 },
  "Stress Relief Ring":   { views: "540M",  score: 3 },
  "Solar Power Bank":   { views: "680M",  score: 4 },
  "Camping Hammock":   { views: "1.1B",  score: 9 },
  "Portable Water Filter":   { views: "420M",  score: 2 },
  "Compact Camping Stove":   { views: "380M",  score: 1 },
  "Waterproof Backpack":   { views: "860M",  score: 6 },
};

// ── Shopify market validation (top store presence) ────────────
// 1 = in top 10, 2 = top 20, null = not found
const SHOPIFY_DATA = {
  "Adjustable Dumbbells":   { rank: 3,    store: "Gymshark" },
  "Resistance Bands":       { rank: 1,    store: "Gymshark" },
  "Posture Corrector":      { rank: 8,    store: "Gymshark" },
  "Smart Jump Rope":        { rank: 12,   store: "Gymshark" },
  "Gym Gloves":             { rank: 6,    store: "Gymshark" },
  "LED Face Mask":          { rank: 4,    store: "Beauty Bay" },
  "Lash Serum":             { rank: 2,    store: "Beauty Bay" },
  "Ice Roller":             { rank: 5,    store: "Beauty Bay" },
  "Hair Curler":            { rank: 3,    store: "Beauty Bay" },
  "Makeup Organiser":       { rank: 9,    store: "Beauty Bay" },
  "Auto Pet Feeder":        { rank: 4,    store: "Pets at Home" },
  "Cat Fountain":           { rank: 7,    store: "Pets at Home" },
  "Dog Cooling Mat":        { rank: 11,   store: "Pets at Home" },
  "Grooming Kit":           { rank: 6,    store: "Pets at Home" },
  "LED Dog Collar":         { rank: 14,   store: "Pets at Home" },
  "Under Sink Organiser":   { rank: 2,    store: "Dunelm" },
  "Magnetic Spice Rack":    { rank: 4,    store: "Dunelm" },
  "Foldable Storage Boxes": { rank: 6,    store: "Dunelm" },
  "Cable Management Kit":   { rank: 8,    store: "Dunelm" },
  "Space Saving Hangers":   { rank: 3,    store: "Dunelm" },
  "Wireless Charging Stand":{ rank: 5,    store: "Anker" },
  "Portable Phone Charger": { rank: 2,    store: "Anker" },
  "Smart LED Light Strip":  { rank: 1,    store: "Anker" },
  "Mini Projector":         { rank: 9,    store: "Anker" },
  "Bluetooth Tracker Tag":  { rank: 7,    store: "Anker" },
  "Crossbody Bag":          { rank: 3,    store: "ASOS" },
  "Minimalist Watch":       { rank: 5,    store: "ASOS" },
  "Layered Necklace Set":   { rank: 4,    store: "ASOS" },
  "Oversized Hoodie":       { rank: 1,    store: "ASOS" },
  "Polarized Sunglasses":   { rank: 8,    store: "ASOS" },
  "Massage Gun":            { rank: 2,    store: "Holland Barrett" },
  "Aromatherapy Diffuser":  { rank: 4,    store: "Holland Barrett" },
  "Sleep Aid Device":       { rank: 7,    store: "Holland Barrett" },
  "Blue Light Glasses":     { rank: 6,    store: "Holland Barrett" },
  "Stress Relief Ring":     { rank: 13,   store: "Holland Barrett" },
  "Solar Power Bank":       { rank: 3,    store: "Go Outdoors" },
  "Camping Hammock":        { rank: 5,    store: "Go Outdoors" },
  "Portable Water Filter":  { rank: 8,    store: "Go Outdoors" },
  "Compact Camping Stove":  { rank: 6,    store: "Go Outdoors" },
  "Waterproof Backpack":    { rank: 2,    store: "Go Outdoors" },
};

// ── All product ideas ─────────────────────────────────────────
const ALL_IDEAS = {
  fitness: [
    { name:"Adjustable Dumbbells", score:72, top:true,  why:"High-ticket product with strong home-gym demand and strong perceived value.", audience:"Home gym users and busy professionals.", sell:"Use creator demos, before-and-after fitness content, and premium positioning.", difficulty:"Medium" },
    { name:"Resistance Bands",     score:92, top:false, why:"Low shipping cost, broad appeal, and easy beginner entry point.", audience:"Beginners and home workout users.", sell:"Use TikTok demos, bundle offers, and beginner workout hooks.", difficulty:"Easy" },
    { name:"Posture Corrector",    score:88, top:false, why:"Clear pain-point product that is easy to market visually.", audience:"Office workers, students, and people with back discomfort.", sell:"Run problem/solution ads with before-and-after style creatives.", difficulty:"Easy" },
    { name:"Smart Jump Rope",      score:85, top:false, why:"Combines fitness and tech, which makes it easy to position as modern and engaging.", audience:"Younger fitness buyers and gadget-focused users.", sell:"Use UGC videos and app/smart-tracking hooks.", difficulty:"Medium" },
    { name:"Gym Gloves",           score:78, top:false, why:"Evergreen accessory with consistent niche demand.", audience:"Beginner gym users.", sell:"Use bundle offers and beginner gym starter messaging.", difficulty:"Easy" },
  ],
  beauty: [
    { name:"LED Face Mask",     score:93, top:true,  why:"High perceived value, premium beauty positioning, and excellent influencer content potential.", audience:"Beauty-conscious women aged 22-40.", sell:"Use before-and-after skin transformation content and influencer seeding.", difficulty:"Medium" },
    { name:"Lash Serum",        score:90, top:false, why:"Strong repeat purchase potential and easy testimonial-led content.", audience:"Women who wear mascara or lash extensions.", sell:"Run testimonial-led ads focused on visible growth results.", difficulty:"Easy" },
    { name:"Ice Roller",        score:87, top:false, why:"Viral morning routine product with simple, shareable content angles.", audience:"Skincare-focused women aged 18-35.", sell:"Use morning skincare routine content and depuffing before-and-after.", difficulty:"Easy" },
    { name:"Hair Curler",       score:85, top:false, why:"Strong visual transformation appeal and high creator demo potential.", audience:"Women who style their hair regularly.", sell:"Run hair transformation demos and salon-at-home angles.", difficulty:"Medium" },
    { name:"Makeup Organiser",  score:80, top:false, why:"Evergreen beauty accessory with strong aesthetic content appeal.", audience:"Beauty enthusiasts who want a cleaner vanity setup.", sell:"Use before-and-after vanity transformation content.", difficulty:"Easy" },
  ],
  pets: [
    { name:"Auto Pet Feeder",  score:92, top:true,  why:"Solves a real daily problem for busy pet owners with strong emotional marketing potential.", audience:"Busy dog and cat owners aged 25-45.", sell:"Use busy owner guilt hooks and pet routine content.", difficulty:"Medium" },
    { name:"Cat Fountain",     score:88, top:false, why:"Strong pet health angle with educational content potential.", audience:"Cat owners focused on pet wellness.", sell:"Use educational content about cat hydration and health.", difficulty:"Easy" },
    { name:"Dog Cooling Mat",  score:85, top:false, why:"Seasonal demand with strong summer emotional marketing angles.", audience:"Dog owners in warmer months.", sell:"Use summer safety content and caring owner emotional hooks.", difficulty:"Easy" },
    { name:"Grooming Kit",     score:82, top:false, why:"Practical bundle product with strong cost-saving angle.", audience:"Dog owners who pay for regular grooming.", sell:"Run cost comparison content — groomer vs at-home savings.", difficulty:"Easy" },
    { name:"LED Dog Collar",   score:78, top:false, why:"Low-ticket impulse buy with clear safety angle.", audience:"Dog owners who walk in the evening.", sell:"Use night walk safety content and visibility demos.", difficulty:"Easy" },
  ],
  home: [
    { name:"Under Sink Organiser",   score:91, top:true,  why:"Universally relatable chaos-to-order transformation with strong visual content.", audience:"Homeowners and renters aged 25-45.", sell:"Use before-and-after cupboard transformation content.", difficulty:"Easy" },
    { name:"Magnetic Spice Rack",    score:88, top:false, why:"Kitchen organisation content consistently goes viral on TikTok.", audience:"Home cooks and kitchen organisation enthusiasts.", sell:"Run counter transformation and kitchen tour content.", difficulty:"Easy" },
    { name:"Foldable Storage Boxes", score:62, top:false, why:"January declutter demand is predictable and evergreen.", audience:"People looking to organise their home.", sell:"Use declutter and home reset content angles.", difficulty:"Easy" },
    { name:"Cable Management Kit",   score:83, top:false, why:"Desk setup transformation content performs strongly with WFH audiences.", audience:"Remote workers and desk setup enthusiasts.", sell:"Run before-and-after desk cable chaos transformation content.", difficulty:"Easy" },
    { name:"Space Saving Hangers",   score:80, top:false, why:"Wardrobe organisation is a perennial viral niche.", audience:"People with overfull wardrobes.", sell:"Use wardrobe transformation before-and-after content.", difficulty:"Easy" },
  ],
  tech: [
    { name:"Wireless Charging Stand", score:68, top:true,  why:"Universal pain point with strong desk setup and gifting appeal.", audience:"Smartphone users and desk setup enthusiasts.", sell:"Use clean desk transformation and cable-free lifestyle content.", difficulty:"Easy" },
    { name:"Portable Phone Charger",  score:88, top:false, why:"Everyone has experienced a dead phone at the wrong moment.", audience:"Commuters, travellers, and festival-goers.", sell:"Use dead battery panic stories and travel content.", difficulty:"Easy" },
    { name:"Smart LED Light Strip",   score:87, top:false, why:"Room transformation content consistently goes viral on TikTok.", audience:"Young adults personalising their bedroom or gaming setup.", sell:"Run lights-off to lights-on room reveal content.", difficulty:"Easy" },
    { name:"Mini Projector",          score:84, top:false, why:"Aspirational bedroom cinema lifestyle content converts well.", audience:"Young adults who want a home cinema experience.", sell:"Use cosy bedroom cinema night setup content.", difficulty:"Medium" },
    { name:"Bluetooth Tracker Tag",   score:81, top:false, why:"Lost keys is one of the most universally relatable frustrations.", audience:"Anyone who regularly loses their keys or wallet.", sell:"Use live lost keys demo content — find in seconds.", difficulty:"Easy" },
  ],
  fashion: [
    { name:"Crossbody Bag",        score:90, top:true,  why:"Everyday versatile bag with strong outfit and lifestyle content appeal.", audience:"Women aged 18-35 looking for a practical everyday bag.", sell:"Use multi-outfit styling content and convenience angle.", difficulty:"Easy" },
    { name:"Minimalist Watch",     score:87, top:false, why:"Strong gifting appeal with aspirational lifestyle positioning.", audience:"Professionals who value clean, simple aesthetics.", sell:"Run outfit styling and gifting content.", difficulty:"Medium" },
    { name:"Layered Necklace Set", score:62, top:false, why:"On-trend jewellery that makes styling effortless.", audience:"Fashion-conscious women aged 18-30.", sell:"Use 5 outfit pairings with one necklace set content.", difficulty:"Easy" },
    { name:"Oversized Hoodie",     score:83, top:false, why:"Cosy aesthetic content performs consistently on TikTok.", audience:"Young adults who prioritise comfort and style.", sell:"Use tactile softness and cosy lifestyle content.", difficulty:"Easy" },
    { name:"Polarized Sunglasses", score:57, top:false, why:"Strong price vs designer value angle.", audience:"Style-conscious buyers who want premium looks for less.", sell:"Run designer look for under £30 comparison content.", difficulty:"Easy" },
  ],
  wellness: [
    { name:"Massage Gun",           score:93, top:true,  why:"Recovery products convert well across fitness and wellness audiences.", audience:"Active adults and gym-goers aged 20-45.", sell:"Use post-workout recovery before-and-after content.", difficulty:"Medium" },
    { name:"Aromatherapy Diffuser", score:67, top:false, why:"Wellness and self-care content converts well year-round.", audience:"Wellness-focused adults who want a calming home environment.", sell:"Run evening wind-down routine and spa-at-home content.", difficulty:"Easy" },
    { name:"Sleep Aid Device",      score:87, top:false, why:"Sleep is a universal struggle with broad audience appeal.", audience:"Adults who struggle to fall asleep or sleep through the night.", sell:"Use 14-night sleep diary transformation content.", difficulty:"Medium" },
    { name:"Blue Light Glasses",    score:84, top:false, why:"Screen fatigue affects almost every working adult.", audience:"Remote workers, students, and gamers.", sell:"Run eye strain and sleep quality improvement content.", difficulty:"Easy" },
    { name:"Stress Relief Ring",    score:80, top:false, why:"Mental wellness products resonate strongly with younger audiences.", audience:"Anxiety-aware adults looking for discreet daily tools.", sell:"Use empathetic calming content — not clinical.", difficulty:"Easy" },
  ],
  outdoor: [
    { name:"Solar Power Bank",       score:90, top:true,  why:"Festival and camping power anxiety is immediately understood.", audience:"Campers, hikers, and festival-goers.", sell:"Use off-grid charging and festival content.", difficulty:"Easy" },
    { name:"Camping Hammock",        score:88, top:false, why:"Outdoor lifestyle content is highly shareable and aspirational.", audience:"Hikers, campers, and outdoor adventurers.", sell:"Run 3-minute setup challenge and scenic location content.", difficulty:"Easy" },
    { name:"Portable Water Filter",  score:85, top:false, why:"Safety products with live demo potential convert strongly.", audience:"Hikers and outdoor adventurers.", sell:"Use live river filter demonstration content.", difficulty:"Easy" },
    { name:"Compact Camping Stove",  score:82, top:false, why:"Outdoor cooking content performs well on adventure channels.", audience:"Campers and hikers who want hot meals outdoors.", sell:"Run full outdoor meal cooked on this stove content.", difficulty:"Easy" },
    { name:"Waterproof Backpack",    score:80, top:false, why:"UK weather makes this a year-round practical necessity.", audience:"Commuters, hikers, and travellers.", sell:"Use waterproof demo — pour water over a loaded bag.", difficulty:"Easy" },
  ],
};

// ── Industry keyword matching ─────────────────────────────────
const KEYWORDS = {
  fitness:  ["fitness","gym","workout","exercise","training","weights","dumbbell","resistance","muscle","cardio","sport","running","yoga","protein","lifting","crossfit","hiit","pilates","strength","bodybuilding","health"],
  beauty:   ["beauty","skincare","skin","makeup","cosmetic","face","hair","lash","glow","serum","moisturiser","moisturizer","foundation","lipstick","eyeshadow","selfcare","self care","grooming","salon","spa","glow","toner"],
  pets:     ["pet","pets","dog","dogs","cat","cats","animal","animals","puppy","kitten","paw","fur","furry","canine","feline","vet","collar","leash","treats","aquarium","bird"],
  home:     ["home","house","kitchen","bedroom","bathroom","living","organis","storage","clean","tidy","decor","interior","furniture","garden","wardrobe","cupboard","shelf","drawer"],
  tech:     ["tech","technology","gadget","phone","charging","charger","laptop","computer","desk","setup","wireless","bluetooth","smart","led","projector","speaker","earbuds","headphones"],
  fashion:  ["fashion","style","clothing","clothes","outfit","wear","dress","bag","handbag","shoes","accessories","jewellery","jewelry","watch","sunglasses","hoodie","trainers"],
  wellness: ["wellness","wellbeing","mental health","sleep","stress","anxiety","meditation","relaxation","massage","recovery","mindfulness","therapy","calm","relax","breathe"],
  outdoor:  ["outdoor","camping","hiking","adventure","travel","festival","nature","wilderness","backpack","survival","climbing","cycling","kayak","fishing","mountaineering"],
};

// ── Enrich ideas with real data ───────────────────────────────
function enrichWithRealData(ideas) {
  const enriched = ideas.map((idea) => {
    const tiktok  = TIKTOK_DATA[idea.name];
    const shopify  = SHOPIFY_DATA[idea.name];

    const ttBonus  = tiktok  ? tiktok.score  : 0;
    const sfBonus  = shopify ? (shopify.rank <= 5 ? 10 : shopify.rank <= 10 ? 7 : 4) : 0;
    const newScore = Math.min(100, idea.score + ttBonus + sfBonus);

    return {
      ...idea,
      score:        Math.round(newScore),
      tiktokViews:  tiktok  ? tiktok.views   : null,
      shopifyRank:  shopify ? shopify.rank    : null,
      shopifyStore: shopify ? shopify.store   : null,
      dataEnriched: true,
    };
  });

  // Re-sort by enriched score and re-mark top
  enriched.sort((a, b) => b.score - a.score);
  enriched.forEach((idea, i) => { idea.top = i === 0; });

  return enriched;
}

// ── Main handler ──────────────────────────────────────────────
export async function POST(req) {
  const body   = await req.json();
  const prompt = String(body.prompt || "").toLowerCase().trim();

  if (!prompt) {
    return Response.json({ ideas: [], tip: "Enter a product or industry to get started" });
  }

  // Match prompt to industry
  let matchedNiche = null;
  for (const [niche, keywords] of Object.entries(KEYWORDS)) {
    if (keywords.some(kw => prompt.includes(kw))) {
      matchedNiche = niche;
      break;
    }
  }

  // Fallback — check if prompt matches a niche name directly
  if (!matchedNiche && ALL_IDEAS[prompt]) {
    matchedNiche = prompt;
  }

  if (!matchedNiche) {
    return Response.json({
      ideas: [],
      matched: null,
      tip: "Try searching fitness, beauty, pets, home, tech, fashion, wellness, or outdoor",
    });
  }

  const baseIdeas = ALL_IDEAS[matchedNiche] || [];

  // Enrich with real TikTok + Shopify data
  const enrichedIdeas = enrichWithRealData(baseIdeas);

  return Response.json({
    ideas:   enrichedIdeas,
    matched: matchedNiche,
    tip:     null,
  });
}