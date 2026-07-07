// app/lib/supplier-match.ts
// Maps product names to recommended dropshipping/fulfilment suppliers

export type SupplierMatch = {
  name: string;
  tagline: string;
  logo: string;
  connectUrl: string;
  recommended: boolean;
  bestFor: string;
  proCons: { pros: string[]; cons: string[] };
  fulfilment: string;
  setupSteps: string[];
};

// ── Supplier definitions ──────────────────────────────────────────

const ZENDROP: SupplierMatch = {
  name: "Zendrop",
  tagline: "Fast US & UK fulfilment for physical products",
  logo: "⚡",
  connectUrl: "https://zendrop.com",
  recommended: true,
  bestFor: "UK sellers who want fast shipping (5–10 days) with no upfront stock. Integrates directly with Shopify and most store builders.",
  proCons: {
    pros: [
      "5–10 day UK delivery (no customs delays)",
      "No monthly fee on free plan",
      "Automated order fulfilment",
      "UK & US warehouse options",
    ],
    cons: [
      "Smaller product catalogue than AliExpress",
      "Some products cost slightly more than CJ",
    ],
  },
  fulfilment: "Customer orders on your store → Zendrop automatically receives the order → picks, packs and ships direct to customer → you receive tracking info. You never touch the stock.",
  setupSteps: [
    "Create a free Zendrop account at zendrop.com",
    "Search for your product and click 'Import'",
    "Connect your Ember store by adding the Zendrop checkout integration",
    "Set your selling price (aim for 3–4x your Zendrop cost)",
    "Place a test order to yourself to check quality and packaging",
    "Go live — orders fulfil automatically from there",
  ],
};

const CJ: SupplierMatch = {
  name: "CJDropshipping",
  tagline: "Massive catalogue, competitive pricing, UK shipping",
  logo: "🏭",
  connectUrl: "https://cjdropshipping.com",
  recommended: false,
  bestFor: "Sellers who want the widest product selection and lowest unit costs. Great for scaling once you've validated demand.",
  proCons: {
    pros: [
      "Huge catalogue — almost any physical product",
      "Very competitive unit prices",
      "UK warehouse available for faster shipping",
      "Free product sourcing service",
    ],
    cons: [
      "Quality can vary — always sample first",
      "UK warehouse stock is limited vs AliExpress",
      "Dashboard takes time to learn",
    ],
  },
  fulfilment: "Customer orders on your store → you forward order to CJ (or use auto-fulfilment) → CJ ships direct to customer from UK/EU or China warehouse → tracking sent automatically.",
  setupSteps: [
    "Sign up free at cjdropshipping.com",
    "Search for your product or submit a sourcing request",
    "Connect your store via the CJ app or API key",
    "Set pricing with 3–4x markup on CJ cost",
    "Order a sample unit to verify quality",
    "Enable auto-fulfilment so orders process without manual work",
  ],
};

const SPOCKET: SupplierMatch = {
  name: "Spocket",
  tagline: "EU & UK suppliers — faster delivery, better quality",
  logo: "🇬🇧",
  connectUrl: "https://spocket.co",
  recommended: false,
  bestFor: "Sellers who want premium UK and EU-sourced products with 2–5 day delivery. Higher prices but better margins on branded items.",
  proCons: {
    pros: [
      "2–5 day UK delivery from UK suppliers",
      "Higher quality products vs AliExpress",
      "Branded invoicing available",
      "No minimum order quantities",
    ],
    cons: [
      "Monthly fee required (from £19/month)",
      "Smaller catalogue than CJ or Zendrop",
      "Unit costs higher than Chinese suppliers",
    ],
  },
  fulfilment: "Customer orders → Spocket notifies supplier → UK/EU supplier ships direct within 2–5 days → tracking auto-sent to customer. Branded packaging available on some suppliers.",
  setupSteps: [
    "Start a free trial at spocket.co",
    "Browse UK/EU suppliers for your product category",
    "Import your chosen products to your store",
    "Set pricing — Spocket products support higher margins due to quality",
    "Order a sample to verify before going live",
    "Upgrade to paid plan once you get consistent sales",
  ],
};

const PRINTFUL: SupplierMatch = {
  name: "Printful",
  tagline: "Print-on-demand — no stock, fully custom products",
  logo: "🖨️",
  connectUrl: "https://printful.com",
  recommended: true,
  bestFor: "Selling branded merchandise, clothing, accessories, or home decor with your own designs. Zero upfront cost, ships from UK/EU.",
  proCons: {
    pros: [
      "No stock — print per order",
      "UK & EU fulfilment centre",
      "Full custom branding (labels, packaging)",
      "No minimum order",
    ],
    cons: [
      "Higher per-unit cost than bulk",
      "Limited to print-on-demand products",
      "3–5 day production time before shipping",
    ],
  },
  fulfilment: "Customer orders your branded product → Printful prints and packs it → ships from UK warehouse → customer gets branded product within 5–7 days. No involvement from you.",
  setupSteps: [
    "Create a free Printful account at printful.com",
    "Upload your brand designs (logo, patterns, text)",
    "Add products to your store — Printful syncs automatically",
    "Set prices (aim for 2.5–3x Printful base cost)",
    "Order a sample of each product you'll sell",
    "Connect your store and go live — orders fulfil automatically",
  ],
};

// ── Category → supplier mapping ───────────────────────────────────

type CategoryRule = {
  keywords: string[];
  suppliers: SupplierMatch[];
};

const CATEGORY_RULES: CategoryRule[] = [
  {
    keywords: ["resistance band", "yoga mat", "gym", "dumbbell", "fitness", "workout", "pilates", "posture", "foam roller", "jump rope", "pull-up", "protein", "supplement"],
    suppliers: [
      { ...ZENDROP, recommended: true },
      { ...CJ, recommended: false },
    ],
  },
  {
    keywords: ["led face mask", "skincare", "face mask", "beauty", "hair", "nail", "lash", "eyebrow", "lip", "serum", "gua sha", "jade roller", "microneedle", "derma"],
    suppliers: [
      { ...ZENDROP, recommended: true },
      { ...SPOCKET, recommended: false },
    ],
  },
  {
    keywords: ["candle", "diffuser", "essential oil", "wax melt", "aromatherapy", "scent", "fragrance"],
    suppliers: [
      { ...CJ, recommended: true, tagline: "Blank candles and vessels at trade prices" },
      { ...SPOCKET, recommended: false },
    ],
  },
  {
    keywords: ["t-shirt", "hoodie", "clothing", "apparel", "hat", "cap", "tote", "bag", "mug", "phone case", "poster", "print", "merch"],
    suppliers: [
      { ...PRINTFUL, recommended: true },
      { ...CJ, recommended: false },
    ],
  },
  {
    keywords: ["pet", "dog", "cat", "animal", "paw"],
    suppliers: [
      { ...ZENDROP, recommended: true },
      { ...CJ, recommended: false },
    ],
  },
  {
    keywords: ["baby", "kids", "children", "toy", "educational"],
    suppliers: [
      { ...SPOCKET, recommended: true, tagline: "UK/EU certified baby and kids products" },
      { ...ZENDROP, recommended: false },
    ],
  },
  {
    keywords: ["home", "kitchen", "office", "desk", "organiser", "storage", "lamp", "light", "cleaning", "plant"],
    suppliers: [
      { ...CJ, recommended: true },
      { ...ZENDROP, recommended: false },
    ],
  },
];

const DEFAULT_SUPPLIERS: SupplierMatch[] = [
  { ...ZENDROP, recommended: true },
  { ...CJ, recommended: false },
];

// ── Main export ───────────────────────────────────────────────────

export function getSupplierMatches(productName: string, isDigital: boolean): SupplierMatch[] {
  if (isDigital) return [];

  const lower = productName.toLowerCase();

  for (const rule of CATEGORY_RULES) {
    if (rule.keywords.some(kw => lower.includes(kw))) {
      return rule.suppliers;
    }
  }

  return DEFAULT_SUPPLIERS;
}
