import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Ember — Launch a Real Business in Minutes",
  description: "From idea to a launch-ready ecommerce business in under 5 minutes. Real TikTok and Shopify data. Full business plan, branded store and sales playbook — in one flow.",
  icons: { icon: "/favicon.svg" },
  keywords: [
    "start a business", "ecommerce business", "AI business builder",
    "how to start a dropshipping business", "side hustle ideas",
    "launch a business", "ecommerce store builder", "business plan generator",
    "TikTok products to sell", "best products to sell online",
    "dropshipping business ideas", "how to start an online store",
    "AI ecommerce tool", "start a side hustle", "business idea generator",
    "how to launch an ecommerce store", "best products to dropship",
    "ecommerce business plan", "how to make money online 2026",
    "start a business with no money", "online business ideas UK"
  ],
  openGraph: {
    title: "Ember — Launch a Real Business in Minutes",
    description: "From idea to a launch-ready ecommerce business in under 5 minutes. Real data. Real plan. Real store.",
    url: "https://ember-ai-six.vercel.app",
    siteName: "Ember",
    type: "website",
    images: [
      {
        url: "https://ember-ai-six.vercel.app/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ember — Launch a Real Business in Minutes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ember — Launch a Real Business in Minutes",
    description: "From idea to a launch-ready ecommerce business in under 5 minutes.",
    images: ["https://ember-ai-six.vercel.app/og-image.png"],
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
    canonical: "https://ember-ai-six.vercel.app",
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

const schemaMarkup = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Ember",
  "url": "https://ember-ai-six.vercel.app",
  "description": "AI platform that takes anyone from idea to a launch-ready ecommerce business in under 5 minutes. Includes product discovery, business plan, branded store and sales playbook.",
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "GBP",
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.8",
    "ratingCount": "100",
  },
  "featureList": [
    "AI product discovery with TikTok and Shopify data",
    "3-month business plan generator",
    "Branded store builder",
    "Sales playbook with hooks and angles",
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
      </head>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}