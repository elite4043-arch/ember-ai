<div align="center">

# 🔥 Ember

### The AI Venture Builder for Ecommerce

**From idea to launch-ready business in under 5 minutes.**

[![Live](https://img.shields.io/badge/Live-useember.io-EA580C?style=for-the-badge)](https://useember.io)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://typescriptlang.org)
[![Supabase](https://img.shields.io/badge/Supabase-green?style=for-the-badge&logo=supabase)](https://supabase.com)
[![Stripe](https://img.shields.io/badge/Stripe-Payments-635BFF?style=for-the-badge&logo=stripe)](https://stripe.com)

</div>

---

## What is Ember?

Ember is an **AI Venture Builder** — the first platform that automatically transforms any business idea into a complete launch-ready ecommerce business in under 5 minutes.

Not just idea generation. Not just a store builder. Full venture creation from market signal to launch.

```
Type an idea
  → AI-scored product recommendations (real TikTok + Shopify data)
  → 3-month week-by-week business plan
  → Branded ecommerce store (4 premium templates, click to edit)
  → TikTok hooks + Meta ad angles + supplier contacts
  → Business dashboard with market pulse
  → Everything emailed to you
```

### 🌐 Live at [useember.io](https://useember.io)

---

## Traction

```
100+   businesses generated
60%    completion rate (industry average: 20-30%)
5 min  average time from idea to complete business
£0     cost to start — full flow is free
8      industries · 40+ validated products
```

---

## What Ember generates

Every business built with Ember includes:

| Output | Description |
|--------|-------------|
| ✅ Validated product idea | AI-scored 0-100 using TikTok trends + Shopify data |
| ✅ 3-month business plan | Week-by-week with revenue targets and action steps |
| ✅ Branded ecommerce store | 4 premium templates, click-to-edit, Shopify export |
| ✅ TikTok hook scripts | 3 proven hooks written for your specific product |
| ✅ Meta ad angles | 2 tested angles with audience targeting |
| ✅ Supplier contacts | Vetted manufacturers ready to fulfil |
| ✅ Competitor analysis | Top 3 competitors with weaknesses and your gap |
| ✅ Business dashboard | Market pulse, demand trends, weekly actions |
| ✅ Pricing strategy | Optimal price points for maximum margin |
| ✅ Email delivery | Full package sent to your inbox on completion |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Auth | NextAuth v5 (Google OAuth) |
| Database | Supabase (PostgreSQL) |
| Payments | Stripe (webhooks + subscriptions) |
| Email | Resend (verified domain) |
| Deployment | Vercel |
| Analytics | Vercel Analytics |

---

## Architecture

```
app/
├── page.tsx                    # Server component — static SEO sections
├── components/
│   ├── HomeApp.tsx             # Client component — interactive flow
│   ├── EmberDemo.tsx           # Animated product demo
│   └── shared/
│       ├── Background.tsx      # Animated gradient background
│       ├── Keyframes.tsx       # CSS animations
│       └── SignupModal.tsx     # Email capture modal
├── api/
│   ├── idea/                   # Product scoring + recommendations
│   ├── plan/                   # Business plan generation
│   ├── store/                  # Store data generation
│   ├── sell/                   # Sales playbook generation
│   ├── send-store/             # Email delivery via Resend
│   ├── store-save/             # Supabase persistence
│   ├── stripe/webhook/         # Stripe subscription webhooks
│   ├── user/plan/              # User plan check (free/pro)
│   └── waitlist/               # Waitlist capture
├── dashboard/                  # Business dashboard
├── final/                      # Completion + CTA page
├── pricing/                    # Pricing page (Free/Pro/Enterprise)
├── examples/                   # Example businesses built with Ember
├── how-it-works/               # SEO/GEO dedicated page
├── hooks/
│   └── useUserPlan.ts          # Client-side plan detection
├── lib/
│   └── generateStoreHTML.ts    # 4-template HTML/Shopify generator
└── auth.ts                     # NextAuth v5 config
public/
├── llms.txt                    # GEO optimisation for AI crawlers
├── robots.txt                  # Search engine directives
└── sitemap.ts                  # Dynamic sitemap
```

---

## Getting Started

### Prerequisites

```bash
Node.js 18+
npm
```

### Installation

```bash
# Clone
git clone https://github.com/elite4043-arch/ember-ai.git
cd ember-ai

# Install
npm install

# Environment variables
cp .env.example .env.local
```

### Environment Variables

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=

# Auth (NextAuth v5)
AUTH_SECRET=
AUTH_GOOGLE_ID=
AUTH_GOOGLE_SECRET=
NEXTAUTH_URL=http://localhost:3000

# Email
RESEND_API_KEY=

# Payments
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

```bash
# Run locally
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Pricing

| Plan | Price | Features |
|------|-------|----------|
| Free | £0 | Full idea → plan → store → playbook flow |
| Pro | £19/month or £15/month annual | Hosted store, Shopify connect, AI advisor, full analytics |
| Enterprise | Custom | White label, team seats, API access, dedicated support |

---

## Roadmap

### Phase 1 — Live ✅
- [x] 8 industries, 40+ products
- [x] AI-scored product recommendations
- [x] 3-month business plan generator
- [x] 4-template store builder with live editing
- [x] Sales playbook (hooks, angles, suppliers)
- [x] Google OAuth (NextAuth v5)
- [x] Supabase users table + plan tracking
- [x] Stripe subscriptions (Free/Pro/Enterprise)
- [x] Email delivery via Resend (verified domain)
- [x] Business dashboard
- [x] Mobile responsive
- [x] Server-rendered SEO + GEO optimisation
- [x] useember.io custom domain

### Phase 2 — In Development 🔄
- [ ] Live product data (Shopify /products.json crawler)
- [ ] Hosted stores on ember subdomain
- [ ] Shopify store connection
- [ ] AI business advisor chat
- [ ] Full analytics dashboard with revenue tracking
- [ ] Pro feature restrictions

### Phase 3 — Planned 📋
- [ ] Autonomous business monitoring
- [ ] Multi-product store management
- [ ] TikTok Shop integration
- [ ] API access for Enterprise
- [ ] Geo-targeted landing pages

---

## Contributing

Ember is in active development. To contribute:

1. Open an issue
2. Fork the repo
3. Submit a pull request

---

## License

MIT — see [LICENSE](LICENSE) for details.

---

<div align="center">

Built by [@daanyaal](https://twitter.com/daanyaal)

**[useember.io](https://useember.io) · ⚡ Star this repo if Ember helped you 🌟**

</div>
