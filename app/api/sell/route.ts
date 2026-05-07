import { NextResponse } from "next/server";

type Industry =
  | "fitness" | "beauty" | "pets" | "home"
  | "tech" | "fashion" | "wellness" | "outdoor" | "general";

function getIndustryFromProduct(product: string): Industry {
  const map: Record<string, Industry> = {
    "Adjustable Dumbbells": "fitness", "Resistance Bands": "fitness",
    "Posture Corrector": "fitness", "Smart Jump Rope": "fitness", "Gym Gloves": "fitness",
    "LED Face Mask": "beauty", "Lash Serum": "beauty", "Ice Roller": "beauty",
    "Hair Curler": "beauty", "Makeup Organiser": "beauty",
    "Auto Pet Feeder": "pets", "Cat Fountain": "pets", "Dog Cooling Mat": "pets",
    "Grooming Kit": "pets", "LED Dog Collar": "pets",
    "Under Sink Organiser": "home", "Magnetic Spice Rack": "home",
    "Foldable Storage Boxes": "home", "Cable Management Kit": "home", "Space Saving Hangers": "home",
    "Wireless Charging Stand": "tech", "Portable Phone Charger": "tech",
    "Smart LED Light Strip": "tech", "Mini Projector": "tech", "Bluetooth Tracker Tag": "tech",
    "Crossbody Bag": "fashion", "Minimalist Watch": "fashion",
    "Layered Necklace Set": "fashion", "Oversized Hoodie": "fashion", "Polarized Sunglasses": "fashion",
    "Massage Gun": "wellness", "Aromatherapy Diffuser": "wellness",
    "Sleep Aid Device": "wellness", "Blue Light Glasses": "wellness", "Stress Relief Ring": "wellness",
    "Solar Power Bank": "outdoor", "Camping Hammock": "outdoor",
    "Portable Water Filter": "outdoor", "Compact Camping Stove": "outdoor", "Waterproof Backpack": "outdoor",
  };
  return map[product] || "general";
}

// ─── Product-specific hooks ───────────────────────────────────────
function getProductHooks(product: string): string[] {
  const hooks: Record<string, string[]> = {
    "Adjustable Dumbbells": [
      "I cancelled my gym membership and never looked back",
      "Home gym under £200 — everything you need",
      "This replaces an entire rack of weights",
      "The only equipment serious home gym people use",
      "I trained every day for 30 days at home — here's what happened",
    ],
    "Resistance Bands": [
      "3 exercises anyone can do at home — no equipment needed",
      "I worked out every day for a week with just this",
      "Start your fitness journey for under £20",
      "The easiest way to get back into working out",
      "You don't need a gym membership for this",
    ],
    "Posture Corrector": [
      "If you sit at a desk all day, watch this",
      "I wore this for 7 days — my back actually feels different",
      "Fix your posture in minutes, not months",
      "The reason your back hurts at the end of every day",
      "Office workers need to see this",
    ],
    "LED Face Mask": [
      "I used an LED face mask every day for 30 days — honest results",
      "Luxury skincare at home for a fraction of clinic prices",
      "This is why people are cancelling their facials",
      "My skin looked different after the first week",
      "The skincare tool every beauty routine is missing",
    ],
    "Lash Serum": [
      "I stopped wearing false lashes after this",
      "This became part of my daily routine in one week",
      "Fuller lashes in 6 weeks — no extensions, no filler",
      "The beauty habit I actually kept",
      "One product I tell every girl about",
    ],
    "Massage Gun": [
      "I used to be sore for 3 days after leg day — not anymore",
      "My recovery completely changed when I added this",
      "If you train hard, you need this",
      "Physical therapists use this — now you can too",
      "I used this every day for a month — here's what happened",
    ],
    "Auto Pet Feeder": [
      "I used to rush home from work just to feed my cat",
      "Peace of mind for every busy pet owner",
      "My cat gets fed on time even when I'm stuck in traffic",
      "This changed how I manage my pet's routine completely",
      "The smart upgrade every pet owner needs",
    ],
    "Wireless Charging Stand": [
      "The one thing that cleaned up my entire desk",
      "My desk transformation cost less than £50",
      "I haven't touched a charging cable in 3 weeks",
      "Work from home setup upgrade that actually matters",
      "This made my setup look twice as expensive",
    ],
    "Camping Hammock": [
      "I set this up in under 3 minutes between two trees",
      "The most relaxing thing I've added to camping",
      "Van life essential — packs down to nothing",
      "Why I never go camping without this now",
      "Best £40 I've ever spent on outdoor gear",
    ],
    "Crossbody Bag": [
      "The bag I use literally every single day",
      "Simple style upgrade that goes with everything I own",
      "Looks expensive, isn't expensive — I always get asked about it",
      "5 outfits, one bag — this is the one",
      "Everything I need fits in here and it still looks great",
    ],
    "Sleep Aid Device": [
      "I've struggled to sleep for years — this actually helped",
      "If you can't fall asleep, watch this",
      "I tried this for 14 nights — honest review",
      "The drug-free sleep fix I wish I found sooner",
      "My sleep completely changed in 2 weeks",
    ],
    "Magnetic Spice Rack": [
      "The most satisfying kitchen upgrade I've ever made",
      "I organised my entire kitchen for £30",
      "Before vs after my kitchen — unreal difference",
      "This cleared up so much counter space",
      "The small upgrade that made my kitchen feel brand new",
    ],
  };

  return hooks[product] || [
    `I didn't expect ${product} to actually work this well`,
    `This is the underrated way to use ${product}`,
    `Why everyone is suddenly buying ${product}`,
    `I wish I'd found ${product} earlier`,
    `${product} makes this so much easier than expected`,
  ];
}

// ─── Product-specific ad angles ───────────────────────────────────
function getAdAngles(product: string): string[] {
  const angles: Record<string, string[]> = {
    "Adjustable Dumbbells": [
      "Cost vs gym membership — show the annual saving",
      "Space comparison — one set vs a full rack",
      "Before/after home gym transformation",
    ],
    "Resistance Bands": [
      "Beginner transformation — week 1 to week 4",
      "Travel/hotel room workout — no excuses angle",
      "Price shock — full workout for under £20",
    ],
    "Posture Corrector": [
      "Pain relief — before/after wearing it at a desk",
      "Confidence angle — standing taller, feeling better",
      "Employer gift angle — buy for your team",
    ],
    "LED Face Mask": [
      "Clinic vs at-home cost comparison",
      "30-day skin transformation with daily photo log",
      "Premium unboxing and ritual content",
    ],
    "Lash Serum": [
      "Extensions cancelled — natural results comparison",
      "Daily routine integration — simplicity angle",
      "6-week before/after with real customer results",
    ],
    "Massage Gun": [
      "Post-workout recovery comparison — with vs without",
      "Pain relief demo — target specific muscle groups",
      "Professional tool vs at-home price angle",
    ],
    "Auto Pet Feeder": [
      "Busy owner guilt removed — emotional angle",
      "Routine consistency — healthier pet angle",
      "Tech setup demo — show how simple it is",
    ],
    "Wireless Charging Stand": [
      "Desk transformation — before/after cable mess",
      "Morning routine upgrade — phone always charged",
      "Gift angle — perfect for anyone who works at a desk",
    ],
    "Camping Hammock": [
      "Setup speed — under 3 minutes challenge",
      "Location content — scenic outdoor settings",
      "Pack size comparison — vs tent and sleeping bag",
    ],
    "Crossbody Bag": [
      "Outfit styling — show 5 different looks with same bag",
      "What's in my bag — practical capacity content",
      "Price vs high street comparison",
    ],
    "Sleep Aid Device": [
      "Sleep diary — document 14 nights honestly",
      "Drug-free vs supplement comparison",
      "Partner-friendly angle — quiet and gentle",
    ],
    "Magnetic Spice Rack": [
      "Before/after transformation — messy to clean kitchen",
      "Time-lapse install — shows simplicity",
      "Space saved calculation — show the difference in numbers",
    ],
  };

  return angles[product] || [
    `Show ${product} solving a clear everyday problem in under 10 seconds`,
    `Before vs after using ${product} — visual payoff`,
    `Price comparison — ${product} vs the expensive alternative`,
  ];
}

// ─── Product-specific creator scripts ─────────────────────────────
function getCreatorScript(product: string): string {
  const scripts: Record<string, string> = {
    "Adjustable Dumbbells": `Hey [Name],

Love your fitness content — especially your home workout videos.

We've just launched a home gym brand and we think you'd genuinely love our adjustable dumbbells. They're the product we wish existed when we started training at home.

We'd love to send you a set completely free. All we ask is an honest review — no script, no requirements, just your genuine thoughts.

If that sounds good, reply with your address and we'll get them out to you this week.

[Your name]`,

    "LED Face Mask": `Hey [Name],

Your skincare content is exactly what we've been looking for.

We've just launched an LED face mask brand and we'd love for you to try it as part of your honest skincare routine. No brief, no requirements — just 30 days of genuine use and your real thoughts.

We'll send it completely free. If you love it, post about it. If you don't, no hard feelings — honest feedback still helps us.

Let me know if you're interested and we'll send it straight out.

[Your name]`,

    "Massage Gun": `Hey [Name],

We've been following your recovery content and think our massage gun would be a great fit for what you cover.

We're a new recovery brand and we'd love for you to test it honestly over a few weeks of training. No script, just your real experience.

We'll send it free — interested?

[Your name]`,
  };

  return scripts[product] || `Hey [Name],

We've been following your content and think ${product} would genuinely fit what you create.

We're a new brand in this space and we'd love to send you a free unit in exchange for your honest review — no script, no requirements. Just try it and share your real thoughts if you love it.

Let me know if you're interested and we'll get it out to you this week.

[Your name]`;
}

// ─── Product-specific launch actions ─────────────────────────────
function getLaunchActions(product: string): string[] {
  const actions: Record<string, string[]> = {
    "Adjustable Dumbbells": [
      "Order 1-2 samples — test the weight range and adjustment mechanism yourself before you sell it",
      "Film 5 short-form videos this week: unboxing, home workout demo, space saving comparison, cost vs gym membership, and one honest review",
      "Launch Meta ads at £10/day — target gym leavers, home gym and fitness equipment interests",
      "Reach out to 5 fitness micro-creators (5k-50k followers) with a free unit offer — no script required",
      "Set your price at £129-159 — this product supports premium positioning",
    ],
    "LED Face Mask": [
      "Order your sample and use it every single day — document your skin with daily photos from day 1",
      "Build a premium brand feel — clean fonts, warm lighting, editorial photography. First impressions matter in beauty.",
      "Film your 30-day skin journey as a content series — this is your most powerful long-term marketing asset",
      "Launch Meta ads targeting beauty buyers, skincare enthusiasts, and audiences interested in premium self-care — start at £10/day",
      "Reach out to 5 beauty creators with 10k-100k followers — offer a free mask, no obligation to post",
    ],
    "Massage Gun": [
      "Order sample and test every attachment — know which one works best for quads, shoulders, and lower back",
      "Film your first week of post-workout recovery using it — be honest about what you feel",
      "Target gym-goers, runners, CrossFit audiences on Meta — recovery angle converts best",
      "Reach out to fitness creators and personal trainers — they have exactly the right audience",
      "Price at £54-74 — recovery products support strong pricing when positioned correctly",
    ],
    "Camping Hammock": [
      "Order sample and set it up in 3 different outdoor locations — film each one",
      "Create a setup speed video — '3 minutes, 2 trees, ready to relax' always performs well",
      "Target camping, hiking, and van life audiences on TikTok and Meta",
      "Reach out to outdoor adventure and travel creators — gifting works extremely well in this niche",
      "Price at £32-45 — competitive but profitable at low ad spend",
    ],
  };

  return actions[product] || [
    `Order 1-2 samples of ${product} and test it yourself before selling — you need to understand the product to sell it well`,
    `Film 5 short videos this week: unboxing, demo in use, problem-solution angle, lifestyle content, and one honest review`,
    `Launch Meta ads at £8-10/day — start with one hook and let the data tell you what works`,
    `Reach out to 5 relevant micro-creators in this niche — offer a free unit, no posting obligation`,
    `Set your pricing at a minimum 3x product cost — don't underprice, it signals low quality`,
  ];
}

// ─── Product-specific supplier suggestions ───────────────────────
function getSupplierSuggestions(product: string): { name: string; reason: string }[] {
  const suppliers: Record<string, { name: string; reason: string }[]> = {

    "Adjustable Dumbbells": [
      {
        name: "Alibaba — Direct Factory",
        reason: "Best option for adjustable dumbbells. Search 'adjustable dumbbell set OEM' and filter by Gold Suppliers with 3+ years trading. Expect to pay £30-50 per set at MOQ of 20-50 units. Request samples first — quality varies significantly between manufacturers. Ask specifically about the dial/pin mechanism durability as this is where cheap versions fail.",
      },
      {
        name: "CJ Dropshipping",
        reason: "Good for starting with zero inventory risk. They stock several adjustable dumbbell variations and handle fulfilment. Margins are lower (£55-70 landed cost) but you can validate the market before committing to bulk stock. Connect your Shopify store directly to automate orders.",
      },
      {
        name: "Made-in-China.com",
        reason: "Alternative to Alibaba with a strong fitness equipment category. Often slightly cheaper factories than Alibaba for heavy goods like weights. Good for getting 3-5 competing quotes. Always use Trade Assurance to protect your payment.",
      },
    ],

    "Resistance Bands": [
      {
        name: "CJ Dropshipping",
        reason: "Resistance bands are one of CJ's strongest products. No minimum order, ships to UK in 7-14 days, and you can get custom logo printing from 50 units. Start dropshipping to test hooks before committing to bulk. Landed cost is typically £4-7 per set.",
      },
      {
        name: "Alibaba — TPE Band Factories",
        reason: "Search for 'TPE resistance band set OEM' for fabric-covered bands which feel premium. MOQ is usually 100-200 sets at £2-4 each. Fabric bands command higher prices (£18-25) vs latex bands (£12-17) so the margin improvement is significant. Request samples from 3 different suppliers before choosing.",
      },
      {
        name: "Zendrop",
        reason: "US-based but ships to UK. Slightly faster than AliExpress suppliers. Good branding options including custom packaging inserts which improve the unboxing experience and reduce returns. Useful if you want a premium feel from day one.",
      },
    ],

    "LED Face Mask": [
      {
        name: "Alibaba — LED Beauty Factories",
        reason: "Search 'LED photon therapy mask OEM' and look specifically for factories with CE and FDA certification — this is critical for a beauty product and will be required if you ever want to sell on Amazon or in retail. Expect to pay £18-28 per unit at MOQ of 30-50. Ask for the certification documents before ordering samples.",
      },
      {
        name: "CJ Dropshipping",
        reason: "Has several LED mask variants ready to dropship to UK customers. Good starting point to test your marketing before committing to custom branded stock. Landed cost is £25-35 but you avoid upfront inventory risk. Move to direct sourcing once you're hitting 20+ orders per month.",
      },
      {
        name: "DHgate",
        reason: "Strong beauty device category with lower MOQ than Alibaba (some suppliers accept 10 unit minimums). Useful for getting your first branded samples quickly. Check seller ratings carefully — beauty devices have more quality variation than simpler products. Always request a video of the device working before paying.",
      },
    ],

    "Lash Serum": [
      {
        name: "Alibaba — Cosmetics OEM Factories",
        reason: "Search 'eyelash growth serum OEM private label'. Many factories offer private label from 100-200 units with custom packaging. This is the route to a real brand. Cost per unit is £3-6 including custom box and bottle. You will need to check UK cosmetic ingredient regulations — ensure the formula complies with UK/EU CPSR (Cosmetic Product Safety Report) requirements.",
      },
      {
        name: "Zendrop",
        reason: "Good for initial validation before committing to private label. Ships to UK, handles fulfilment, and has decent lash serum options. Margin is lower at dropshipping rates but you avoid regulatory complexity at the start. Test your marketing first, then move to private label once you have traction.",
      },
      {
        name: "Alibaba — UK-based cosmetics manufacturers",
        reason: "Search specifically for UK cosmetic manufacturers on Alibaba if you want to skip import complexity. UK manufacturers are more expensive (£6-10 per unit) but your product arrives already UK-compliant and you can get proper CPSR documentation easily. Important if you plan to scale significantly.",
      },
    ],

    "Auto Pet Feeder": [
      {
        name: "Alibaba — Smart Pet Product Factories",
        reason: "Search 'automatic pet feeder OEM' and prioritise factories that show app connectivity in their product videos. MOQ is typically 20-50 units at £12-18 each. This is a tech product so order at least 2 samples and test the app, WiFi connection, and motor reliability over 2 weeks before committing to bulk stock.",
      },
      {
        name: "CJ Dropshipping",
        reason: "Has multiple auto feeder variants with no minimum order. Ideal for testing multiple models to find which one customers prefer. App quality varies significantly between models — order samples of the top 2-3 and test them yourself. Once you identify the winner, consider moving to direct sourcing for better margins.",
      },
      {
        name: "AliExpress",
        reason: "Best for finding the most popular models based on order counts and reviews. A product with 5,000+ orders on AliExpress has proven demand. Use this to identify the exact model before sourcing it more cheaply through Alibaba direct factory. Don't use AliExpress for your actual business fulfilment — shipping is too slow and margins are too thin.",
      },
    ],

    "Massage Gun": [
      {
        name: "Alibaba — Percussion Massager Factories",
        reason: "Search 'percussion massage gun OEM' and look for factories with CE certification — essential for selling in the UK. Expect £14-22 per unit at MOQ of 20-30 units. Test specifically: battery life, motor noise level (under 45dB is the selling point), and whether all attachment heads fit securely. Quality varies enormously — test 3 different factories.",
      },
      {
        name: "CJ Dropshipping",
        reason: "Good for validation — they stock several massage gun models and ship to UK. Higher cost per unit (£28-38 landed) but no upfront stock risk. Run ads and prove the market converts before ordering bulk. Once you hit 15+ sales, switch to direct Alibaba sourcing to increase your margin.",
      },
      {
        name: "Made-in-China.com",
        reason: "Strong electronics and sports equipment category. Often has more factory options than Alibaba for percussion devices. Useful for getting 4-5 competing quotes. Always use escrow/Trade Assurance equivalent and request video of the finished product before shipping.",
      },
    ],

    "Wireless Charging Stand": [
      {
        name: "Alibaba — Electronics Accessories Factories",
        reason: "Search 'wireless charging stand OEM Qi certified'. Qi certification is non-negotiable — without it you cannot legally sell in the UK. MOQ is typically 50-100 units at £6-10 each. Ask specifically for MFi certification if you want to position as Apple-compatible. Test charging speed and heat output on samples before bulk ordering.",
      },
      {
        name: "CJ Dropshipping",
        reason: "Tech accessories are one of CJ's strongest categories. Good for initial validation — they handle UK fulfilment and you can test multiple charging stand models. Move to direct sourcing once you identify the best-performing model. Current landed cost via CJ is approximately £12-16.",
      },
      {
        name: "Zendrop",
        reason: "Faster shipping than CJ for UK customers on some products. Good branding options including custom packaging. Useful if speed to customer matters for your positioning. Compare landed costs with CJ before committing to one platform.",
      },
    ],

    "Camping Hammock": [
      {
        name: "Alibaba — Outdoor Equipment Factories",
        reason: "Search 'camping hammock nylon OEM' for best quality. Look specifically for 210T nylon or higher — this is the material that determines durability. Weight capacity should be stated as 150kg+ minimum. MOQ is 50-100 units at £7-12 each. This is a simple product so quality variation is low — get 2 samples and test both with full weight before ordering bulk.",
      },
      {
        name: "CJ Dropshipping",
        reason: "Has a solid hammock range for no-MOQ dropshipping. Good for testing your marketing angles — especially setup videos and outdoor content. Landed cost is £14-18 but gives you zero inventory risk. Move to bulk once you prove the content works and orders come in consistently.",
      },
      {
        name: "AliExpress Wholesale",
        reason: "Some AliExpress sellers offer wholesale pricing at 20+ units that undercuts CJ significantly. Look for sellers with 4.8+ ratings and 500+ reviews on the specific hammock model. Can get landed cost down to £9-12 per unit at small quantities. Good middle ground between CJ and full Alibaba factory sourcing.",
      },
    ],

    "Crossbody Bag": [
      {
        name: "Alibaba — Leather Goods Factories",
        reason: "Search 'crossbody bag OEM PU leather' or 'vegan leather crossbody' for the current trend. Factories in Guangzhou and Yiwu specialize in bags. MOQ is typically 30-50 units per colour at £7-12 each. Order multiple colour samples — colour accuracy from photos to reality varies significantly for bags. Test zips, stitching, and strap attachment points.",
      },
      {
        name: "Faire (UK/EU wholesale)",
        reason: "If you want a UK-held brand to white label or resell, Faire has independent bag brands offering wholesale. Higher cost per unit (£15-25) but stock arrives in days, not weeks, and you avoid customs complexity. Good for a fast launch while you build relationships with Alibaba suppliers.",
      },
      {
        name: "Yiwu Market Agents",
        reason: "Yiwu in China is the world's largest small commodities market — bags are one of its specialities. Use a Yiwu sourcing agent (search on Alibaba for 'Yiwu sourcing agent') who will visit suppliers on your behalf, take photos, and negotiate pricing. Useful for getting below-market prices on fashion accessories.",
      },
    ],

    "Sleep Aid Device": [
      {
        name: "Alibaba — Sleep Technology Factories",
        reason: "Search 'white noise sleep machine OEM' or 'sleep aid light therapy device'. MOQ is typically 20-30 units at £9-14 each. For this product, sound quality is everything — test the white noise, pink noise, and brown noise on samples before ordering bulk. Also test auto-shutoff timer reliability as this is a common complaint in reviews.",
      },
      {
        name: "CJ Dropshipping",
        reason: "Has several sleep device variants for no-MOQ testing. Good for running initial marketing tests. Landed cost is £16-22 but gives you flexibility to test multiple models. This is a product where the app or controls matter — order CJ samples and test the user experience before scaling.",
      },
      {
        name: "Zendrop",
        reason: "Worth comparing to CJ on sleep devices — sometimes has better model selection in wellness categories. Faster UK shipping on some products. Check both platforms and compare the exact product quality before choosing.",
      },
    ],

    "Magnetic Spice Rack": [
      {
        name: "Alibaba — Kitchen Organization Factories",
        reason: "Search 'magnetic spice rack wall mounted OEM'. Magnet strength is the critical quality factor — weak magnets cause jars to fall. Ask suppliers for the specific magnet grade (N35 or N52 — N52 is stronger). MOQ is 50-100 units at £6-10 each. Test on different surface types including tiles, painted walls, and metal before selling.",
      },
      {
        name: "CJ Dropshipping",
        reason: "Kitchen organisation is a strong CJ category. Good for testing content before bulk ordering. Landed cost is £12-16. This product is photogenic and easy to demo — test whether organic TikTok content drives sales before spending on ads. Many sellers in this niche grow almost entirely through organic before touching paid.",
      },
      {
        name: "AliExpress Wholesale",
        reason: "Home organisation products on AliExpress have high review counts that make quality assessment easy. Find the model with 3,000+ orders and 4.7+ reviews, then source the same product directly from the manufacturer on Alibaba. This research step saves you from testing poor-quality suppliers.",
      },
    ],
  };

  // Default suppliers for any product not specifically listed
  const defaultSuppliers = [
    {
      name: "CJ Dropshipping",
      reason: `Best starting point for ${product}. No minimum order quantity means you can test your marketing with zero inventory risk. They handle UK fulfilment, integrate directly with Shopify, and allow custom branding from 50+ units. Use CJ to validate your hooks and prove the product sells before committing to bulk stock. Landed cost will be higher than direct sourcing but the flexibility is worth it at the start.`,
    },
    {
      name: "Alibaba — Direct Factory",
      reason: `Once you've proven ${product} sells via CJ, move to direct factory sourcing on Alibaba for significantly better margins. Search for Gold Suppliers with 3+ years trading and Trade Assurance. Always order 2-3 samples from different factories before committing to bulk. Negotiate payment terms — 30% upfront, 70% on dispatch is standard. MOQ typically 50-200 units at 40-60% lower cost than dropshipping.`,
    },
    {
      name: "Zendrop",
      reason: `Good alternative to CJ for UK fulfilment, particularly for products where shipping speed matters. Has a strong branding and custom packaging programme which improves the unboxing experience and reduces negative reviews. Compare Zendrop and CJ pricing on your specific product — costs vary by category and Zendrop is sometimes cheaper for wellness and beauty items.`,
    },
  ];

  return suppliers[product] || defaultSuppliers;
}

// ─── Main sell playbook ───────────────────────────────────────────
function getSellPlaybook(product: string) {
  const industry = getIndustryFromProduct(product);

  return {
    title: `How to sell ${product}`,
    launchActions: getLaunchActions(product),
    hooks: getProductHooks(product),
    adAngles: getAdAngles(product),
    creatorScript: getCreatorScript(product),
    supplierSuggestions: getSupplierSuggestions(product),
  };
}

// ─── API Route ────────────────────────────────────────────────────
export async function POST(req: Request) {
  try {
    let body: any;

    try {
      body = await req.json();
    } catch (err) {
      console.error("Invalid JSON:", err);
      return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
    }

    const product = String(body?.product ?? "").trim();

    if (!product) {
      return NextResponse.json({ error: "Product is required" }, { status: 400 });
    }

    let sell;
    try {
      sell = getSellPlaybook(product);
    } catch (err) {
      console.error("PLAYBOOK ERROR:", err);
      return NextResponse.json({ error: "Failed to generate sell playbook" }, { status: 500 });
    }

    return NextResponse.json({ sell });
  } catch (error) {
    console.error("SELL API FATAL ERROR:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}