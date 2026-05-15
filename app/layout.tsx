import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SessionProvider } from "next-auth/react";

// ── Canonical positioning statement — repeated everywhere ──
const POSITIONING = "Ember is an AI Venture Builder that transforms any idea into a launch-ready ecommerce business in under 5 minutes. More than a store builder — Ember validates markets, generates business plans, builds branded stores and produces complete sales playbooks automatically.";

const TITLE = "Ember — AI Venture Builder | Launch a Business in 5 Minutes";
const DESC  = "Ember is the AI Venture Builder that turns any idea into a launch-ready ecommerce business in 5 minutes. Free to start.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  icons: { icon: "/favicon.svg" },
  keywords: [
    // Category terms
    "AI venture builder", "venture generation platform", "AI startup foundry",
    "business generation engine", "autonomous venture engine",
    // Core use cases
    "start a business", "ecommerce business", "AI business builder",
    "how to start a dropshipping business", "side hustle ideas",
    "launch a business", "ecommerce store builder", "business plan generator",
    // Semantic expansion
    "startup generation", "venture creation", "market validation",
    "launch automation", "opportunity intelligence", "startup automation",
    "AI native business", "autonomous entrepreneurship",
    // Specific queries
    "TikTok products to sell", "best products to sell online",
    "dropshipping business ideas", "how to start an online store",
    "AI ecommerce tool", "start a side hustle", "business idea generator",
    "how to launch an ecommerce store", "best products to dropship",
    "ecommerce business plan", "how to make money online 2026",
    "start a business with no money", "online business ideas UK",
    // Comparison terms
    "better than Shopify for beginners", "alternative to Dropship.io",
    "from validation to launch", "beyond no-code store builder",
  ],
  openGraph: {
    title: TITLE,
    description: DESC,
    url: "https://useember.io",
    siteName: "Ember — AI Venture Builder",
    type: "website",
    images: [
      {
        url: "https://useember.io/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ember — AI Venture Builder. From idea to live business in 5 minutes.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: "The AI Venture Builder that takes anyone from idea to launch-ready ecommerce business in under 5 minutes. Free to start.",
    images: ["https://useember.io/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://useember.io",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#fffdf8",
};

// ── Schema: SoftwareApplication ──
const schemaMarkup = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Ember",
  "alternateName": ["Ember AI", "Ember Venture Builder", "AI Venture Builder"],
  "url": "https://useember.io",
  "description": POSITIONING,
  "applicationCategory": "BusinessApplication",
  "applicationSubCategory": "AI Venture Builder",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "GBP",
    "description": "Free to start — full business generation flow at no cost",
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "100",
  },
  "featureList": [
    "AI-powered product discovery with TikTok and Shopify market data",
    "Automatic market validation and demand scoring",
    "3-month week-by-week business plan generation",
    "Branded store builder with 4 premium templates",
    "TikTok hooks and sales playbook generation",
    "Competitor analysis and opportunity detection",
    "Business dashboard with market pulse tracking",
    "Supplier recommendations and contact details",
    "Shopify section code export",
    "Email delivery of complete business package",
  ],
  "useCase": [
    "Starting an ecommerce business from scratch",
    "Finding winning dropshipping products",
    "Generating a business plan automatically",
    "Building a branded store with AI",
    "Validating a product idea before investing",
    "Creating a TikTok sales strategy",
  ],
  "targetAudience": {
    "@type": "Audience",
    "audienceType": "First-time entrepreneurs, beginner dropshippers, side hustle seekers, aspiring ecommerce founders",
  },
};

// ── Schema: Organisation ──
const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Ember",
  "url": "https://useember.io",
  "logo": "https://useember.io/favicon.svg",
  "description": POSITIONING,
  "foundingDate": "2026",
  "sameAs": [
    "https://github.com/elite4043-arch/ember-ai",
  ],
};

// ── Schema: HowTo ──
const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How Ember Generates a Launch-Ready Business in 5 Minutes",
  "description": "Ember is an AI Venture Builder that automatically validates markets, generates business plans, builds branded stores and creates sales playbooks in under 5 minutes.",
  "totalTime": "PT5M",
  "estimatedCost": {
    "@type": "MonetaryAmount",
    "currency": "GBP",
    "value": "0",
  },
  "tool": [
    { "@type": "HowToTool", "name": "Ember AI Venture Builder" },
  ],
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Search your industry",
      "text": "Type any industry or idea — fitness, beauty, pets, tech and more. Ember scans real TikTok and Shopify market data instantly.",
      "url": "https://useember.io",
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Get AI-scored product recommendations",
      "text": "Ember analyses 40+ products across 8 industries, scoring each on demand, competition, margin and TikTok momentum. Pick your winning idea.",
      "url": "https://useember.io",
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Receive your complete business plan",
      "text": "Ember automatically generates a full 3-month week-by-week business plan with revenue targets, audience analysis and action steps.",
      "url": "https://useember.io",
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Build your branded store",
      "text": "Choose from 4 premium store templates, click to customise any element, then export as Shopify code or HTML. No coding needed.",
      "url": "https://useember.io",
    },
    {
      "@type": "HowToStep",
      "position": 5,
      "name": "Get your sales playbook",
      "text": "Ember generates 3 proven TikTok hook scripts, 2 Meta ad angles, pricing strategy and vetted supplier contacts — all specific to your product.",
      "url": "https://useember.io",
    },
  ],
};

// ── Schema: FAQ ──
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Ember?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ember is an AI Venture Builder — the first platform that automatically transforms any business idea into a complete launch-ready ecommerce business in under 5 minutes. It validates markets, generates business plans, builds branded stores and creates full sales playbooks automatically. Not just idea generation — full venture creation from signal to launch."
      }
    },
    {
      "@type": "Question",
      "name": "What does Ember generate?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ember generates a complete launch package: validated product idea with demand score, 3-month business plan with revenue targets, branded ecommerce store with 4 templates, TikTok hook scripts, Meta ad angles, supplier contacts, competitor analysis and a business dashboard — all in under 5 minutes."
      }
    },
    {
      "@type": "Question",
      "name": "How is Ember different from a store builder like Shopify?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Shopify requires you to already know what to sell and how to market it. Ember is an AI Venture Builder — it tells you what to sell based on real market data, validates the opportunity, generates your business plan, builds the store and gives you the complete go-to-market strategy. More than a store builder — a complete venture generation platform."
      }
    },
    {
      "@type": "Question",
      "name": "How does Ember validate business ideas?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ember analyses 40+ products across 8 industries using TikTok trend data, Shopify sales signals and search volume intelligence. Each product receives a demand score 0-100 based on market size, competition level, margin potential and social momentum. Only validated high-opportunity products are recommended."
      }
    },
    {
      "@type": "Question",
      "name": "What data sources does Ember use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ember uses TikTok trend signals, Shopify market data, search volume intelligence, competitor pricing analysis and industry demand forecasting to score and validate every product opportunity."
      }
    },
    {
      "@type": "Question",
      "name": "How do I start an ecommerce business from scratch?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ember takes you from idea to live ecommerce business in under 5 minutes. Type your industry, get AI-scored product recommendations, receive a full 3-month business plan, build a branded store and get a TikTok sales playbook — all free at useember.io."
      }
    },
    {
      "@type": "Question",
      "name": "Is Ember free to use?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes — Ember's full venture generation flow is completely free. Build your idea, validate the market, get a business plan, build a store and receive a sales playbook at no cost. Pro features including hosted stores, AI advisor and full analytics dashboard are available from £19/month."
      }
    },
    {
      "@type": "Question",
      "name": "How long does it take to generate a business with Ember?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The complete flow from idea to launch-ready business takes under 5 minutes. Most users complete the full venture generation process in 3-4 minutes — producing a validated product, business plan, branded store and sales playbook."
      }
    },
    {
      "@type": "Question",
      "name": "What industries does Ember cover?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Ember covers 8 industries: Fitness, Beauty, Pets, Home, Tech, Fashion, Wellness and Outdoor — with 40+ validated products across all categories, each scored using real market data."
      }
    },
    {
      "@type": "Question",
      "name": "Can Ember build a Shopify store?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes — Ember builds a fully branded ecommerce store and exports it as Shopify section code you can paste directly into your Shopify theme. No coding or design experience needed."
      }
    },
  ],
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      </head>
      <body>
        <SessionProvider>
          {children}
        </SessionProvider>
        <Analytics />
      </body>
    </html>
  );
}
