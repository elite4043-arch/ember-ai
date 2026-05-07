// ─── Random brand name pools ──────────────────────────────────────
const BRAND_POOLS = {
  "Adjustable Dumbbells":   ["ForgeHaus","IronForm","HeavySet","LiftLab","CoreForge","BoldLift","SteelHome"],
  "Resistance Bands":       ["Flexora","BandLab","ElastiX","PeakFlex","SnapFit","PureFlex","BandCore"],
  "Posture Corrector":      ["Aligna","SpineSync","StandTrue","PostureX","TrueAlign","UpRight","FormFix"],
  "Smart Jump Rope":        ["SkipIQ","JumpSync","CardioLoop","PaceRope","SwiftSkip","RhythmRope","JumpLab"],
  "Gym Gloves":             ["GripX","IronGrip","GloveLab","HoldFast","GripForge","FitGrip","PureHold"],
  "LED Face Mask":          ["GlowLab","LumiSkin","RadiantRx","ClearGlow","SkinPhase","LightRitual","AuraGlow"],
  "Lash Serum":             ["LashLux","FlutterX","LashLab","PureLash","BoldLash","LashRx","SilkLash"],
  "Ice Roller":             ["ChillSkin","IceGlow","CoolRitual","FrostFace","PureChil","IceLab","CalmSkin"],
  "Hair Curler":            ["CurlCo","WaveLab","StyleRx","SilkCurl","GlossWave","CurlLux","TwistLab"],
  "Makeup Organiser":       ["VanityX","GlowOrder","BeautyBox","MirrorLab","VanityLab","GlossBox","PureVanity"],
  "Auto Pet Feeder":        ["PawTime","FeedBot","PetSync","NomNom","SmartPaws","PetFlow","FeedLab"],
  "Cat Fountain":           ["SipSync","PureFlo","AquaPaw","CatFlow","SipLab","HydroKitty","PawFlow"],
  "Dog Cooling Mat":        ["CoolPaw","ChillDog","FrostPet","CoolMutt","PawChill","IcePet","CoolBone"],
  "Grooming Kit":           ["GroomLab","PawPerfect","ClipCo","TrimSync","PawGroom","CoatLab","SnipSync"],
  "LED Dog Collar":         ["GlowLeash","SafePaw","NightWoof","LumipPet","GlowPet","SafeLeash","BrightPaw"],
  "Under Sink Organiser":   ["NeatSink","OrderLab","CleanBase","SinkSync","TidyBase","PureOrder","UnderCo"],
  "Magnetic Spice Rack":    ["SpiceSync","MagniRack","KitchenX","SpiceRow","MagRack","NeatSpice","RackLab"],
  "Foldable Storage Boxes": ["FoldNest","StoreSync","BoxLab","NeatFold","StackLab","PureFold","FoldBox"],
  "Cable Management Kit":   ["CableSync","DeskOrder","WireNeat","CableLab","CleanDesk","NeatWire","LoopLab"],
  "Space Saving Hangers":   ["HangSync","SlimHang","SpaceHang","NeatHang","HangLab","ThinHang","PureHang"],
  "Wireless Charging Stand":["ChargeSync","DeskCharge","WireFree","ChargeLab","PowerDesk","ZeroWire","ChargeX"],
  "Portable Phone Charger": ["PowerPack","ChargeMate","JuiceBox","PowerSync","CarryCharge","ChargeLab","PowerX"],
  "Smart LED Light Strip":  ["LumiStrip","GlowSync","RoomRay","LightLab","NeonX","VibeLights","StripSync"],
  "Mini Projector":         ["CinemaBox","PocketScreen","LumiCast","ProjectX","CineSync","MiniCast","ScreenLab"],
  "Bluetooth Tracker Tag":  ["TrackX","FindSync","TagLab","LocateX","PingTag","FindTag","TraceSync"],
  "Crossbody Bag":          ["StrideX","CarryLab","SlingSync","BagLab","WalkWith","CarryX","StrideSync"],
  "Minimalist Watch":       ["TimeForm","WristLab","ClockX","PureTime","SlimWatch","TimeSync","WristSync"],
  "Layered Necklace Set":   ["LayerLux","GoldSync","ChainLab","NecklaceX","LayerGold","GlintLab","CharmSync"],
  "Oversized Hoodie":       ["CozyX","SoftSync","WarmLab","HoodLab","CozySync","PlushX","SoftForm"],
  "Polarized Sunglasses":   ["ShadeSync","LensLab","ShadeCo","GlareX","ShadeX","PureLens","ViewSync"],
  "Massage Gun":            ["PulseLife","RecoverX","KinetiQ","DeepRelief","FlowState","MuscleReset","PeakRecovery"],
  "Aromatherapy Diffuser":  ["ZenMist","ScentSync","AromaLab","PureMist","CalmScent","DiffuseX","ScentLab"],
  "Sleep Aid Device":       ["SleepSync","DreamLab","NightX","RestSync","SlumberLab","CalmNight","SleepX"],
  "Blue Light Glasses":     ["ClearView","ScreenSync","FocusX","EyeLab","BluBlock","ClearSync","ScreenLab"],
  "Stress Relief Ring":     ["CalmX","ZenSync","MindLab","CalmRing","SerenSync","ZenRing","PeaceX"],
  "Solar Power Bank":       ["SolarX","SunCharge","EcoSync","SolarPack","SunPower","EcoCharge","SolarLab"],
  "Camping Hammock":        ["SwingSync","HangLab","CampRest","WildSwing","HammockX","RestSync","CampLab"],
  "Portable Water Filter":  ["PureTrail","FilterX","ClearFlow","PureSync","TrailFilter","FlowLab","ClearX"],
  "Compact Camping Stove":  ["FlameSync","CampFire","CookLab","TrailFlame","CampStove","FlameX","WildCook"],
  "Waterproof Backpack":    ["TrailX","DryPack","StormSync","WetProof","TrailSync","DrySync","StormPack"],
};

function pickBrand(product) {
  const pool = BRAND_POOLS[product];
  if (!pool) return "EmberStore";
  return pool[Math.floor(Math.random() * pool.length)];
}

// ─── Random image pools ───────────────────────────────────────────
const IMAGE_POOLS = {
  "Adjustable Dumbbells":   ["photo-1599058917212-d750089bc07e","photo-1581009146145-b5ef050c2e1e","photo-1534438327276-14e5300c3a48"],
  "Resistance Bands":       ["photo-1571019613454-1cb2f99b2d8b","photo-1518611012118-696072aa579a","photo-1549060279-7e168fcee0c2"],
  "Posture Corrector":      ["photo-1554284126-aa88f22d8b74","photo-1518611012118-696072aa579a","photo-1552196563-55cd4e45efb3"],
  "Smart Jump Rope":        ["photo-1517960413843-0aee8e2b3285","photo-1571019613454-1cb2f99b2d8b","photo-1518611012118-696072aa579a"],
  "Gym Gloves":             ["photo-1599058917212-d750089bc07e","photo-1534438327276-14e5300c3a48","photo-1581009146145-b5ef050c2e1e"],
  "LED Face Mask":          ["photo-1522335789203-aabd1fc54bc9","photo-1596462502278-27bfdc403348","photo-1570172619644-dfd03ed5d881"],
  "Lash Serum":             ["photo-1600185365483-26d7a4cc7519","photo-1522335789203-aabd1fc54bc9","photo-1571781926291-c477ebfd024b"],
  "Ice Roller":             ["photo-1596462502278-27bfdc403348","photo-1522335789203-aabd1fc54bc9","photo-1570172619644-dfd03ed5d881"],
  "Hair Curler":            ["photo-1585238342024-78d387f4a707","photo-1522335789203-aabd1fc54bc9","photo-1519500099198-fd81846b8f03"],
  "Makeup Organiser":       ["photo-1522335789203-aabd1fc54bc9","photo-1596462502278-27bfdc403348","photo-1571781926291-c477ebfd024b"],
  "Auto Pet Feeder":        ["photo-1517849845537-4d257902454a","photo-1548199973-03cce0bbc87b","photo-1587300003388-59208cc962cb"],
  "Cat Fountain":           ["photo-1518020382113-a7e8fc38eac9","photo-1511044568932-338cba0ad803","photo-1513245543132-31f507417b26"],
  "Dog Cooling Mat":        ["photo-1548199973-03cce0bbc87b","photo-1587300003388-59208cc962cb","photo-1517849845537-4d257902454a"],
  "Grooming Kit":           ["photo-1537151625747-768eb6cf92b2","photo-1587300003388-59208cc962cb","photo-1548199973-03cce0bbc87b"],
  "LED Dog Collar":         ["photo-1517849845537-4d257902454a","photo-1548199973-03cce0bbc87b","photo-1587300003388-59208cc962cb"],
  "Under Sink Organiser":   ["photo-1505693416388-ac5ce068fe85","photo-1556911220-bff31c812dba","photo-1484154218962-a197022b5858"],
  "Magnetic Spice Rack":    ["photo-1556911220-bff31c812dba","photo-1505693416388-ac5ce068fe85","photo-1484154218962-a197022b5858"],
  "Foldable Storage Boxes": ["photo-1493666438817-866a91353ca9","photo-1505693416388-ac5ce068fe85","photo-1556911220-bff31c812dba"],
  "Cable Management Kit":   ["photo-1560185007-cde436f6a4d0","photo-1498050108023-c5249f4df085","photo-1519389950473-47ba0277781c"],
  "Space Saving Hangers":   ["photo-1505693416388-ac5ce068fe85","photo-1493666438817-866a91353ca9","photo-1484154218962-a197022b5858"],
  "Wireless Charging Stand":["photo-1498050108023-c5249f4df085","photo-1519389950473-47ba0277781c","photo-1517336714731-489689fd1ca8"],
  "Portable Phone Charger": ["photo-1519389950473-47ba0277781c","photo-1498050108023-c5249f4df085","photo-1487014679447-9f8336841d58"],
  "Smart LED Light Strip":  ["photo-1517336714731-489689fd1ca8","photo-1498050108023-c5249f4df085","photo-1558618666-fcd25c85cd64"],
  "Mini Projector":         ["photo-1487014679447-9f8336841d58","photo-1517336714731-489689fd1ca8","photo-1519389950473-47ba0277781c"],
  "Bluetooth Tracker Tag":  ["photo-1498050108023-c5249f4df085","photo-1519389950473-47ba0277781c","photo-1487014679447-9f8336841d58"],
  "Crossbody Bag":          ["photo-1520975916090-3105956dac38","photo-1548036328-c9fa89d128fa","photo-1473966968600-fa801b869a1a"],
  "Minimalist Watch":       ["photo-1490481651871-ab68de25d43d","photo-1523170335258-f5ed11844a49","photo-1508057198894-247b23fe5ade"],
  "Layered Necklace Set":   ["photo-1529139574466-a303027c1d8b","photo-1515562141207-7a88fb7ce338","photo-1573408301185-9519f94815b1"],
  "Oversized Hoodie":       ["photo-1519741497674-611481863552","photo-1556821840-3a63f15732ce","photo-1578587018452-892bacefd3f2"],
  "Polarized Sunglasses":   ["photo-1520975916090-3105956dac38","photo-1473966968600-fa801b869a1a","photo-1548036328-c9fa89d128fa"],
  "Massage Gun":            ["photo-1506126613408-eca07ce68773","photo-1552196563-55cd4e45efb3","photo-1518611012118-696072aa579a"],
  "Aromatherapy Diffuser":  ["photo-1518611012118-696072aa579a","photo-1506126613408-eca07ce68773","photo-1552196563-55cd4e45efb3"],
  "Sleep Aid Device":       ["photo-1552196563-55cd4e45efb3","photo-1518611012118-696072aa579a","photo-1506126613408-eca07ce68773"],
  "Blue Light Glasses":     ["photo-1499728603263-13726abce5fd","photo-1498050108023-c5249f4df085","photo-1519389950473-47ba0277781c"],
  "Stress Relief Ring":     ["photo-1506126613408-eca07ce68773","photo-1552196563-55cd4e45efb3","photo-1518611012118-696072aa579a"],
  "Solar Power Bank":       ["photo-1500530855697-b586d89ba3ee","photo-1501785888041-af3ef285b470","photo-1441974231531-c6227db76b6e"],
  "Camping Hammock":        ["photo-1470770841072-f978cf4d019e","photo-1441974231531-c6227db76b6e","photo-1501785888041-af3ef285b470"],
  "Portable Water Filter":  ["photo-1501785888041-af3ef285b470","photo-1500530855697-b586d89ba3ee","photo-1470770841072-f978cf4d019e"],
  "Compact Camping Stove":  ["photo-1441974231531-c6227db76b6e","photo-1470770841072-f978cf4d019e","photo-1501785888041-af3ef285b470"],
  "Waterproof Backpack":    ["photo-1500530855697-b586d89ba3ee","photo-1441974231531-c6227db76b6e","photo-1501785888041-af3ef285b470"],
};

function pickImage(product) {
  const pool = IMAGE_POOLS[product];
  if (!pool) return "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80";
  const id = pool[Math.floor(Math.random() * pool.length)];
  return `https://images.unsplash.com/${id}?w=800&q=80`;
}

export async function GET() {
  return Response.json({ status: "Store route is working" });
}

export async function POST(req) {
  const { product } = await req.json();

  const stores = {

    // ── FITNESS ──────────────────────────────────────────────────

    "Adjustable Dumbbells": {
      brand: "ForgeHaus",
      headline: "Stop paying for a gym you barely use",
      subheadline: "One set of dumbbells that replaces a full rack — and fits under your bed.",
      price: "£149.99",
      cta: "Build your home gym today",
      description: "You keep meaning to get back in shape, but the commute, the queues, the monthly fee — it all gets in the way. ForgeHaus Adjustable Dumbbells remove every excuse. One set, infinite weights, zero wasted space.",
      benefits: [
        "Replaces 15 sets of weights in the space of one",
        "Adjusts in seconds — no fumbling between sets",
        "Never pay a gym membership again",
      ],
      sections: [{ title: "Why it converts", text: "Hits the guilt of unused gym memberships and the desire for a real home gym." }, { title: "Best angle", text: "Cost vs gym membership over 12 months." }],
    },

    "Resistance Bands": {
      brand: "Flexora",
      headline: "Your first workout — no gym, no excuses",
      subheadline: "Everything you need to start training today, for under £25.",
      price: "£24.99",
      cta: "Start moving today",
      description: "You don't need a gym membership to get fit. You don't need equipment that costs hundreds. You just need to start — and Flexora Resistance Bands make starting as easy as it gets.",
      benefits: [
        "Full body workout in 20 minutes from your living room",
        "Fits in your bag — train anywhere, anytime",
        "Beginner-friendly with zero learning curve",
      ],
      sections: [{ title: "Why it converts", text: "Removes every barrier to starting a fitness routine." }, { title: "Best angle", text: "The easiest way to start working out at home." }],
    },

    "Posture Corrector": {
      brand: "Aligna",
      headline: "Your back hurts because you sit like this all day",
      subheadline: "Fix your posture in minutes a day — not months of physio.",
      price: "£29.99",
      cta: "Fix your posture today",
      description: "Eight hours at a desk. Hunched over a screen. That dull ache in your shoulders by 3pm. You know it's your posture — you just haven't done anything about it. Until now.",
      benefits: [
        "Noticeable improvement in days, not months",
        "Wear under your clothes — nobody knows it's there",
        "Designed for desk workers who sit for hours",
      ],
      sections: [{ title: "Why it converts", text: "Speaks directly to the daily pain of office workers." }, { title: "Best angle", text: "The 3pm shoulder ache that everyone recognises." }],
    },

    "Smart Jump Rope": {
      brand: "SkipIQ",
      headline: "20 minutes. 300 calories. No gym required.",
      subheadline: "The jump rope that tracks every rep, every calorie, every session.",
      price: "£39.99",
      cta: "Upgrade your cardio",
      description: "You already know cardio works. You just need something that keeps you accountable. SkipIQ tracks your jumps in real time so you always know exactly how hard you worked.",
      benefits: [
        "Burns more calories than running in less time",
        "Tracks reps, calories, and workout time automatically",
        "Works anywhere — no gym, no equipment, no excuses",
      ],
      sections: [{ title: "Why it converts", text: "Data-driven fitness appeals to buyers who want proof of progress." }, { title: "Best angle", text: "20 minutes vs a full gym session — same results." }],
    },

    "Gym Gloves": {
      brand: "GripX",
      headline: "Stop tearing up your hands every session",
      subheadline: "Train harder, grip better, and actually look forward to lifting.",
      price: "£14.99",
      cta: "Get your grip right",
      description: "You started going to the gym. Your hands didn't get the memo. GripX Gym Gloves protect your palms so the only thing that gets sore is your muscles.",
      benefits: [
        "Non-slip grip so the bar never slips mid-set",
        "Padded palms — no more calluses or blisters",
        "Wrist support built in for heavier lifts",
      ],
      sections: [{ title: "Why it converts", text: "Solves a real physical pain point every gym beginner experiences." }, { title: "Best angle", text: "The essential first purchase for anyone starting to lift." }],
    },

    // ── BEAUTY ───────────────────────────────────────────────────

    "LED Face Mask": {
      brand: "GlowLab",
      headline: "Your skin deserves more than a £5 moisturiser",
      subheadline: "Clinic-grade LED therapy at home — for a fraction of the price.",
      price: "£89.99",
      cta: "Start your glow ritual",
      description: "You've seen the results in clinics. You've seen them on your favourite creators. Now GlowLab brings the same LED technology into your bathroom — no appointment, no travel, no £200 sessions.",
      benefits: [
        "Targets acne, fine lines, and dull skin simultaneously",
        "10-minute sessions — fits into any routine",
        "Results visible within the first two weeks",
      ],
      sections: [{ title: "Why it converts", text: "Clinic results at home pricing is a powerful value gap to close." }, { title: "Best angle", text: "30-day skin transformation with daily photo diary." }],
    },

    "Lash Serum": {
      brand: "LashLux",
      headline: "Cancel your lash appointment. You won't need it.",
      subheadline: "Fuller, longer-looking lashes in 6 weeks — no extensions, no filler.",
      price: "£19.99",
      cta: "Start your lash routine",
      description: "Extensions are expensive. Falsies fall off at the worst moment. LashLux Lash Serum gives you the lashes you want without the monthly cost, the glue, or the maintenance.",
      benefits: [
        "Visible difference in 4-6 weeks of daily use",
        "30 seconds a night — just brush it on before bed",
        "No extensions, no appointments, no ongoing cost",
      ],
      sections: [{ title: "Why it converts", text: "Cost comparison against extensions makes the value obvious." }, { title: "Best angle", text: "Extensions cancelled — natural results comparison content." }],
    },

    "Ice Roller": {
      brand: "ChillSkin",
      headline: "Your face is still puffy. This fixes that in 5 minutes.",
      subheadline: "The morning skin reset that wakes you up better than coffee.",
      price: "£16.99",
      cta: "Refresh your routine",
      description: "You wake up. Your face is tired. Your skin is dull. Two minutes with a ChillSkin Ice Roller and you look like you slept properly. It's the simplest upgrade your morning routine is missing.",
      benefits: [
        "Reduces puffiness and redness in under 5 minutes",
        "Keeps skin looking awake before makeup",
        "Feels incredible — genuinely something to look forward to",
      ],
      sections: [{ title: "Why it converts", text: "Morning routine content with immediate visible results." }, { title: "Best angle", text: "Watch my face depuff in real time — always goes viral." }],
    },

    "Hair Curler": {
      brand: "CurlCo",
      headline: "Salon curls in 10 minutes. At home. Every time.",
      subheadline: "Stop spending £60 on blowdries when you can do it yourself.",
      price: "£34.99",
      cta: "Style your look",
      description: "Every time you leave the salon you think — I should learn to do this myself. With CurlCo you can. Bouncy, lasting curls in minutes, without the appointment or the price tag.",
      benefits: [
        "Professional-looking curls in under 10 minutes",
        "Holds all day — even in UK weather",
        "Works on all hair types and lengths",
      ],
      sections: [{ title: "Why it converts", text: "The cost of salon visits vs one-time purchase is a compelling argument." }, { title: "Best angle", text: "Straight to curled in 10 minutes — live transformation." }],
    },

    "Makeup Organiser": {
      brand: "VanityX",
      headline: "Your makeup collection deserves better than a drawer",
      subheadline: "Turn your beauty chaos into the vanity setup you've always wanted.",
      price: "£22.99",
      cta: "Organise your beauty space",
      description: "You have good makeup. It deserves to be displayed properly. VanityX transforms the messy drawer you avoid opening into a vanity setup you actually enjoy using every morning.",
      benefits: [
        "Find exactly what you need in seconds — no more digging",
        "Makes your space look twice as expensive",
        "Aesthetic enough to leave out — no hiding it away",
      ],
      sections: [{ title: "Why it converts", text: "The frustration of a messy beauty drawer is universally relatable." }, { title: "Best angle", text: "Before/after vanity transformation — deeply satisfying content." }],
    },

    // ── PETS ─────────────────────────────────────────────────────

    "Auto Pet Feeder": {
      brand: "PawTime",
      headline: "Stop rushing home just to feed your cat",
      subheadline: "Your pet gets fed on time, every time — whether you're home or not.",
      price: "£59.99",
      cta: "Give your pet the routine they deserve",
      description: "You love your pet. But life gets in the way — late meetings, traffic, spontaneous plans. PawTime Auto Pet Feeder means your pet never waits, and you never feel guilty.",
      benefits: [
        "Scheduled feeding even when you're stuck at work",
        "Portion control — no overfeeding, no underfeeding",
        "Peace of mind every single day",
      ],
      sections: [{ title: "Why it converts", text: "Pet owner guilt is one of the most powerful emotional purchase drivers." }, { title: "Best angle", text: "The relief of knowing your pet is fed no matter what." }],
    },

    "Cat Fountain": {
      brand: "SipSync",
      headline: "Your cat ignores their water bowl. This is why.",
      subheadline: "Cats prefer running water. Give them what they actually want.",
      price: "£29.99",
      cta: "Keep your cat healthier",
      description: "Most cats are chronically dehydrated because they don't like still water. SipSync Cat Fountain mimics a running stream — the kind cats are instinctively drawn to. Better hydration, healthier kidneys, happier cat.",
      benefits: [
        "Encourages cats to drink 3x more water daily",
        "Reduces risk of kidney and urinary problems",
        "Whisper-quiet motor — won't disturb you or your cat",
      ],
      sections: [{ title: "Why it converts", text: "Health-based pet purchase with a clear educational angle." }, { title: "Best angle", text: "Why cats ignore their water bowl — educational hook." }],
    },

    "Dog Cooling Mat": {
      brand: "CoolPaw",
      headline: "Your dog is overheating and can't tell you",
      subheadline: "Keep them cool and comfortable through every warm day.",
      price: "£21.99",
      cta: "Keep your dog comfortable",
      description: "Dogs can't sweat. They can't tell you they're too hot. CoolPaw Cooling Mat gives them instant relief the moment they lie down — no water, no electricity, no effort from you.",
      benefits: [
        "Self-cooling — activates on contact, no water or power needed",
        "Reduces body temperature in minutes",
        "Works indoors, outdoors, and in the car",
      ],
      sections: [{ title: "Why it converts", text: "Dog safety in summer is an emotional trigger for responsible owners." }, { title: "Best angle", text: "Signs your dog is overheating — then the solution." }],
    },

    "Grooming Kit": {
      brand: "GroomLab",
      headline: "Stop paying £50 every 6 weeks to groom your dog",
      subheadline: "Professional results at home — and your dog will actually enjoy it.",
      price: "£27.99",
      cta: "Groom at home from today",
      description: "Grooming appointments are expensive, stressful for your dog, and hard to book. GroomLab gives you everything you need to do it yourself — quietly, gently, and on your schedule.",
      benefits: [
        "Save £400+ a year on professional grooming",
        "Low-noise design — less stress for anxious dogs",
        "Complete kit — nothing extra to buy",
      ],
      sections: [{ title: "Why it converts", text: "Annual cost saving is a powerful and concrete value argument." }, { title: "Best angle", text: "I spent £420 on dog grooming last year — never again." }],
    },

    "LED Dog Collar": {
      brand: "GlowLeash",
      headline: "You can barely see your dog on evening walks",
      subheadline: "Be seen from 500 metres — keep your dog safe after dark.",
      price: "£15.99",
      cta: "Make every walk safer",
      description: "One near-miss on a dark road is enough. GlowLeash LED Dog Collar makes your dog impossible to miss — by cars, cyclists, and other walkers — so every evening walk stays safe.",
      benefits: [
        "Visible from 500 metres in complete darkness",
        "Clips on in 10 seconds — no setup required",
        "USB rechargeable — always ready when you need it",
      ],
      sections: [{ title: "Why it converts", text: "Safety anxiety on evening walks is real and immediate." }, { title: "Best angle", text: "Near miss story then the solution — powerful emotional hook." }],
    },

    // ── HOME ─────────────────────────────────────────────────────

    "Under Sink Organiser": {
      brand: "NeatSink",
      headline: "You know that cupboard you avoid opening?",
      subheadline: "15 minutes and £19 to never dread it again.",
      price: "£18.99",
      cta: "Sort it out today",
      description: "Every home has that one cupboard. Under the sink — bottles falling over, cleaning products crammed in, no system at all. NeatSink turns it into clean, organised storage in under 15 minutes.",
      benefits: [
        "Doubles under-sink storage without drilling anything",
        "Everything visible at a glance — no more digging",
        "Takes 15 minutes to install and transform the space",
      ],
      sections: [{ title: "Why it converts", text: "The universally chaotic under-sink cupboard is instantly relatable." }, { title: "Best angle", text: "Open the cupboard before — then after. The contrast sells it." }],
    },

    "Magnetic Spice Rack": {
      brand: "SpiceSync",
      headline: "Your kitchen counter is running out of space",
      subheadline: "Move your spices to the wall and get your counter back.",
      price: "£22.99",
      cta: "Free up your kitchen today",
      description: "Every time you cook, you're moving things out of the way. SpiceSync Magnetic Spice Rack clears your counter completely by moving your spices to the wall — clean, accessible, and actually beautiful.",
      benefits: [
        "Clears your entire counter in one simple move",
        "Strong magnets — nothing falls, nothing tips",
        "Looks like a kitchen feature, not a storage hack",
      ],
      sections: [{ title: "Why it converts", text: "Counter space anxiety is a universal kitchen frustration." }, { title: "Best angle", text: "Before/after kitchen counter — the space difference is dramatic." }],
    },

    "Foldable Storage Boxes": {
      brand: "FoldNest",
      headline: "Your home is organised. Until you open any cupboard.",
      subheadline: "Storage that actually disappears when you don't need it.",
      price: "£24.99",
      cta: "Start the declutter",
      description: "Most storage solutions just move the mess somewhere else. FoldNest Foldable Storage Boxes actually fix it — and when you don't need them, they fold flat so they're not part of the problem.",
      benefits: [
        "Folds completely flat when empty — stores in 2cm",
        "Stackable design for wardrobes, shelves, and under beds",
        "Strong enough for heavy items, light enough to move",
      ],
      sections: [{ title: "Why it converts", text: "The storage box that stores itself is a genuinely clever angle." }, { title: "Best angle", text: "January declutter — the product everyone needs in the new year." }],
    },

    "Cable Management Kit": {
      brand: "CableSync",
      headline: "Your desk looks chaotic and it's affecting your focus",
      subheadline: "One afternoon, one kit — cable chaos gone for good.",
      price: "£19.99",
      cta: "Clean up your desk today",
      description: "You sit at that desk for 8 hours a day. You deserve for it to not look like a server room exploded. CableSync turns the tangle behind your monitor into a clean, professional setup in one afternoon.",
      benefits: [
        "Eliminates every visible cable from your desk surface",
        "Works with any setup — Mac, PC, monitors, speakers",
        "Takes one afternoon — stays tidy permanently",
      ],
      sections: [{ title: "Why it converts", text: "Desk chaos affects productivity and mood — everyone feels this." }, { title: "Best angle", text: "Before/after desk transformation — dramatic and satisfying." }],
    },

    "Space Saving Hangers": {
      brand: "HangSync",
      headline: "You have more clothes than your wardrobe can handle",
      subheadline: "Triple your hanging space without buying a new wardrobe.",
      price: "£17.99",
      cta: "Take back your wardrobe",
      description: "Your wardrobe is full but somehow you never have anything to wear — because it's all crammed in so tightly you can't see it. HangSync Slim Velvet Hangers fit 3x more in the same space and keep everything visible.",
      benefits: [
        "Fits 3x more clothes in the same wardrobe space",
        "Non-slip velvet — clothes stay put, no sliding",
        "See everything at a glance — no more missing outfits",
      ],
      sections: [{ title: "Why it converts", text: "The overfull wardrobe problem is universal and immediately relatable." }, { title: "Best angle", text: "Count how many clothes fit before and after — the number surprises people." }],
    },

    // ── TECH ─────────────────────────────────────────────────────

    "Wireless Charging Stand": {
      brand: "ChargeSync",
      headline: "Why is there still a cable on your desk?",
      subheadline: "Put your phone down and it charges. That's it.",
      price: "£29.99",
      cta: "Go cable-free today",
      description: "Every time you grab your phone you unplug it. Every time you put it down you have to find the cable again. ChargeSync ends that loop — put your phone down anywhere on the stand and it charges instantly.",
      benefits: [
        "Just set it down — no plugging in, no fiddling with cables",
        "Charges through phone cases up to 5mm thick",
        "Keeps your desk looking clean and intentional",
      ],
      sections: [{ title: "Why it converts", text: "The daily frustration of cable hunting is immediately relatable." }, { title: "Best angle", text: "Clean desk transformation — this is the final piece." }],
    },

    "Portable Phone Charger": {
      brand: "PowerPack",
      headline: "Your phone dies at exactly the wrong moment. Every time.",
      subheadline: "3 full charges in your pocket — never panic about battery again.",
      price: "£27.99",
      cta: "Never run out again",
      description: "Festival. Long journey. Important day. And then 10% battery. PowerPack Portable Charger means that moment never happens again — 3 full charges in something that fits in your pocket.",
      benefits: [
        "3 full phone charges before it needs recharging itself",
        "Slim enough to fit in any bag or jacket pocket",
        "Charges two devices simultaneously",
      ],
      sections: [{ title: "Why it converts", text: "Dead battery at the wrong moment is a story everyone has lived." }, { title: "Best angle", text: "Festival or travel content — the universal battery anxiety story." }],
    },

    "Smart LED Light Strip": {
      brand: "LumiStrip",
      headline: "Your room looks exactly like everyone else's room",
      subheadline: "60 seconds to transform it into something that actually reflects you.",
      price: "£24.99",
      cta: "Transform your room tonight",
      description: "Plain walls. Basic lighting. A room that could belong to anyone. LumiStrip LED Strips change the entire mood of a room in 60 seconds — with colours, scenes, and effects that make it yours.",
      benefits: [
        "App-controlled — change the mood of your room in seconds",
        "Peel and stick — set up in under a minute, no damage",
        "Syncs to music for gaming, parties, and film nights",
      ],
      sections: [{ title: "Why it converts", text: "Room identity and personalisation resonate strongly with younger buyers." }, { title: "Best angle", text: "Lights off to lights on room reveal — consistently goes viral." }],
    },

    "Mini Projector": {
      brand: "CinemaBox",
      headline: "Your bedroom could be a cinema. It just isn't yet.",
      subheadline: "Turn any wall into a screen — movie nights will never be the same.",
      price: "£69.99",
      cta: "Create your home cinema",
      description: "You don't need a cinema room. You don't need a massive TV. CinemaBox Mini Projector turns your bedroom wall into a 100-inch screen so movie nights actually feel like an event.",
      benefits: [
        "100-inch picture from a device smaller than your phone",
        "Works anywhere — bedroom wall, white sheet, garden fence",
        "Built-in speaker — unbox it and start watching immediately",
      ],
      sections: [{ title: "Why it converts", text: "The cinema bedroom is an aspirational concept everyone relates to." }, { title: "Best angle", text: "Cosy bedroom cinema setup — warm lighting, blankets, big screen." }],
    },

    "Bluetooth Tracker Tag": {
      brand: "TrackX",
      headline: "You will lose your keys again tomorrow morning",
      subheadline: "Find them in seconds — from your phone, from anywhere.",
      price: "£24.99",
      cta: "Stop losing things",
      description: "It happens every morning. Keys, wallet, bag — somewhere in the flat, nowhere obvious. TrackX tags your most-lost items so finding them takes one tap, not ten minutes of stress.",
      benefits: [
        "Find any tagged item from your phone in seconds",
        "Works even when out of Bluetooth range via crowd-find",
        "Tiny enough to live on your keys permanently",
      ],
      sections: [{ title: "Why it converts", text: "The lost keys morning panic is one of the most universal frustrations." }, { title: "Best angle", text: "Live demo — hide the keys and find them in real time." }],
    },

    // ── FASHION ──────────────────────────────────────────────────

    "Crossbody Bag": {
      brand: "StrideX",
      headline: "A bag you actually want to use every single day",
      subheadline: "Stylish enough for any outfit. Practical enough for real life.",
      price: "£34.99",
      cta: "Shop the look",
      description: "You want a bag that works with everything — not one you have to coordinate. StrideX Crossbody Bag goes from coffee run to night out without you having to think about it.",
      benefits: [
        "Fits phone, cards, keys, and essentials without bulk",
        "Adjustable strap — wear it crossbody or over the shoulder",
        "Works with literally every outfit you own",
      ],
      sections: [{ title: "Why it converts", text: "The effortless everyday bag is something everyone wants but rarely finds." }, { title: "Best angle", text: "5 different outfits, same bag — shows the versatility instantly." }],
    },

    "Minimalist Watch": {
      brand: "TimeForm",
      headline: "The watch that goes with everything you own",
      subheadline: "Clean, timeless design that makes every outfit look more intentional.",
      price: "£44.99",
      cta: "Wear something timeless",
      description: "You don't need a watch collection. You need one watch that works with suits, with jeans, with everything in between. TimeForm is that watch — and it costs a fraction of what it looks like.",
      benefits: [
        "Goes with every outfit — casual, smart, and everything between",
        "Looks twice the price it actually is",
        "The kind of watch people ask about",
      ],
      sections: [{ title: "Why it converts", text: "The one-watch solution with premium aesthetics is highly giftable." }, { title: "Best angle", text: "Styling the same watch 5 different ways — shows the versatility." }],
    },

    "Layered Necklace Set": {
      brand: "LayerLux",
      headline: "The layered look took 2 minutes. Nobody needs to know.",
      subheadline: "A curated necklace set that does the styling for you.",
      price: "£21.99",
      cta: "Get the layered look",
      description: "You've seen the layered necklace look everywhere and wondered how to pull it off. LayerLux makes it effortless — three perfectly paired chains that look like a stylist put them together.",
      benefits: [
        "Three lengths perfectly balanced — looks intentional every time",
        "Works with any neckline, any outfit, any occasion",
        "Tarnish-resistant — looks good week after week",
      ],
      sections: [{ title: "Why it converts", text: "The effortless look that looks effortful is a powerful fashion angle." }, { title: "Best angle", text: "How I layer necklaces — make it look styled in under 2 minutes." }],
    },

    "Oversized Hoodie": {
      brand: "CozyX",
      headline: "You deserve to be this comfortable",
      subheadline: "The hoodie you'll reach for every single day — without thinking about it.",
      price: "£34.99",
      cta: "Feel the difference",
      description: "Most hoodies are fine. This one is different. CozyX Oversized Hoodie is the kind of thing you put on once and immediately understand — softer than it looks, warmer than it needs to be, and somehow goes with everything.",
      benefits: [
        "So soft you'll wear it every day without washing — and get away with it",
        "Oversized fit that flatters every body type",
        "Thick enough for winter, not too heavy for autumn",
      ],
      sections: [{ title: "Why it converts", text: "Tactile comfort content — you have to make people feel the softness through the screen." }, { title: "Best angle", text: "Cosy aesthetic content — coffee, candles, this hoodie." }],
    },

    "Polarized Sunglasses": {
      brand: "ShadeSync",
      headline: "You've been squinting into the sun for years",
      subheadline: "Polarized lenses. Designer look. Under £30.",
      price: "£27.99",
      cta: "See the difference",
      description: "Real polarized lenses don't just block the sun — they cut the glare entirely. ShadeSync Polarized Sunglasses give you the clarity of premium eyewear without the premium price tag.",
      benefits: [
        "Polarized lenses cut glare completely — not just reduce it",
        "Look expensive without being expensive",
        "UV400 protection — your eyes are actually protected",
      ],
      sections: [{ title: "Why it converts", text: "The polarized vs non-polarized visual difference is dramatic and demonstrable." }, { title: "Best angle", text: "Hold up non-polarized vs polarized against a bright window — the difference is immediate." }],
    },

    // ── WELLNESS ─────────────────────────────────────────────────

    "Massage Gun": {
      brand: "PulseLife",
      headline: "Still sore 3 days after leg day? That's not normal.",
      subheadline: "Deep tissue recovery in 10 minutes — from your sofa.",
      price: "£59.99",
      cta: "Recover smarter",
      description: "Training hard is only half of it. The other half is recovering fast enough to do it again. PulseLife Massage Gun works 60% deeper than foam rolling and cuts recovery time in half.",
      benefits: [
        "60% deeper than foam rolling — actually reaches the muscle",
        "5 attachments for every muscle group",
        "Quiet enough to use while watching TV",
      ],
      sections: [{ title: "Why it converts", text: "Post-workout soreness is something every active person knows." }, { title: "Best angle", text: "Day after leg day — before and after using it for 10 minutes." }],
    },

    "Aromatherapy Diffuser": {
      brand: "ZenMist",
      headline: "Your flat could smell like a spa. Right now.",
      subheadline: "Set the mood in seconds — and keep it there for hours.",
      price: "£29.99",
      cta: "Create your calm space",
      description: "Scent is the fastest way to change how a room feels. ZenMist Aromatherapy Diffuser fills your space with calm — so when you walk through the door after a long day, you immediately decompress.",
      benefits: [
        "Fills a room in minutes — changes the mood instantly",
        "Runs for 8 hours on a single fill",
        "Doubles as a humidifier — good for skin and sleep",
      ],
      sections: [{ title: "Why it converts", text: "The emotional reset of walking into a calming-smelling home is deeply relatable." }, { title: "Best angle", text: "Evening wind-down routine — show the whole ritual, not just the product." }],
    },

    "Sleep Aid Device": {
      brand: "SleepSync",
      headline: "You're tired. But you can't sleep. Sound familiar?",
      subheadline: "Fall asleep faster and wake up actually rested — without medication.",
      price: "£39.99",
      cta: "Sleep better tonight",
      description: "You're exhausted but your brain won't switch off. SleepSync uses gentle sound and light therapy to guide your mind into sleep — no pills, no dependency, just rest.",
      benefits: [
        "Fall asleep up to 40% faster in the first week",
        "No medication, no grogginess the next morning",
        "Tracks your sleep so you can see the improvement",
      ],
      sections: [{ title: "Why it converts", text: "The tired-but-can't-sleep experience is one of the most frustrating modern problems." }, { title: "Best angle", text: "14-night sleep diary — honest documented improvement." }],
    },

    "Blue Light Glasses": {
      brand: "ClearView",
      headline: "Your eyes hurt by 3pm and your sleep is suffering for it",
      subheadline: "Block the blue light. Reduce the strain. Sleep like you used to.",
      price: "£24.99",
      cta: "Protect your eyes today",
      description: "Eight hours of screen time takes a toll you don't fully notice until you try to sleep. ClearView Blue Light Glasses filter out the wavelengths that cause eye fatigue and disrupt melatonin — so your eyes recover and your sleep improves.",
      benefits: [
        "Reduces eye strain after long screen sessions noticeably",
        "Improves sleep quality by blocking sleep-disrupting blue light",
        "Lightweight — forget you're wearing them within minutes",
      ],
      sections: [{ title: "Why it converts", text: "The screen fatigue to sleep disruption link is increasingly well-known." }, { title: "Best angle", text: "I wore blue light glasses for a week — honest review of what actually changed." }],
    },

    "Stress Relief Ring": {
      brand: "CalmX",
      headline: "You need something to do with your hands when anxiety hits",
      subheadline: "A discreet, wearable way to ground yourself in any situation.",
      price: "£16.99",
      cta: "Find your calm",
      description: "Anxiety doesn't announce itself. It shows up in meetings, on public transport, in situations where you can't just walk away. CalmX Stress Relief Ring gives you something tangible to focus on — quietly, discreetly, anywhere.",
      benefits: [
        "Spin it when anxiety spikes — immediate grounding effect",
        "Looks like a normal ring — nobody knows it's therapeutic",
        "Wearable all day — always there when you need it",
      ],
      sections: [{ title: "Why it converts", text: "Discreet anxiety management tools resonate strongly with younger audiences." }, { title: "Best angle", text: "Empathetic, calm content — not clinical, not dramatic." }],
    },

    // ── OUTDOOR ──────────────────────────────────────────────────

    "Solar Power Bank": {
      brand: "SolarX",
      headline: "You're off-grid. Your phone doesn't have to be.",
      subheadline: "Solar-powered charging for festivals, camping, and anywhere else the grid doesn't reach.",
      price: "£37.99",
      cta: "Power your adventures",
      description: "You're in a field at a festival. You're three days into a camping trip. You're somewhere beautiful with no plug socket in sight. SolarX keeps your phone alive using nothing but sunlight.",
      benefits: [
        "Charges from sunlight — works even on cloudy UK days",
        "3 full phone charges stored when fully charged",
        "Waterproof and shockproof — built for real outdoor use",
      ],
      sections: [{ title: "Why it converts", text: "Festival and camping power anxiety is immediately understood." }, { title: "Best angle", text: "Charging your phone in a field with nothing but sunlight — the visual tells the whole story." }],
    },

    "Camping Hammock": {
      brand: "SwingSync",
      headline: "A tent is a room. A hammock is an experience.",
      subheadline: "Set up between two trees in 3 minutes — and never want to leave.",
      price: "£32.99",
      cta: "Take it outdoors",
      description: "Sleeping in a tent is camping. Lying in a hammock watching the trees move above you — that's something else. SwingSync Camping Hammock sets up in 3 minutes and packs down to the size of a water bottle.",
      benefits: [
        "Sets up between any two trees in under 3 minutes",
        "Packs down to the size of a water bottle — weighs almost nothing",
        "Holds up to 200kg — built to last years of adventures",
      ],
      sections: [{ title: "Why it converts", text: "The hammock lifestyle is aspirational and highly shareable content." }, { title: "Best angle", text: "Setup speed challenge — 3 minutes from bag to lying down in a forest." }],
    },

    "Portable Water Filter": {
      brand: "PureTrail",
      headline: "You're carrying 2 litres of water when you don't have to",
      subheadline: "Drink from any stream, river, or lake — filtered clean in seconds.",
      price: "£31.99",
      cta: "Travel lighter from today",
      description: "Heavy water bottles slow you down and run out at the worst moments. PureTrail Portable Water Filter lets you drink from any natural source — rivers, streams, lakes — filtered clean on the spot.",
      benefits: [
        "Filters 99.9999% of bacteria and parasites instantly",
        "Drink directly from any natural water source",
        "Weighs 56g — you'll forget it's in your pack",
      ],
      sections: [{ title: "Why it converts", text: "The weight and logistics of carrying water on hikes is a genuine pain point." }, { title: "Best angle", text: "Live demo — fill from a river, filter, drink. The visual trust-builder." }],
    },

    "Compact Camping Stove": {
      brand: "FlameSync",
      headline: "Hot food makes any camping trip worth it",
      subheadline: "Boiling water in 3 minutes — from a stove that fits in your palm.",
      price: "£29.99",
      cta: "Cook anywhere",
      description: "Cold meals are fine. Hot food in the middle of nowhere is a completely different experience. FlameSync Compact Camping Stove fits in your palm and boils water in under 3 minutes wherever you are.",
      benefits: [
        "Boils 500ml of water in under 3 minutes",
        "Folds flat — takes up less space than a paperback",
        "Works in wind and rain — built for real UK outdoor conditions",
      ],
      sections: [{ title: "Why it converts", text: "The joy of hot food in the outdoors is a sensory and aspirational hook." }, { title: "Best angle", text: "Full hot meal cooked on a mountain with just this stove." }],
    },

    "Waterproof Backpack": {
      brand: "TrailX",
      headline: "It will rain. Your bag should be ready for it.",
      subheadline: "Fully waterproof. Laptop-safe. Built for the UK.",
      price: "£44.99",
      cta: "Pack for anything",
      description: "You've had a wet laptop. You've pulled soggy lunch out of your bag. It doesn't have to be like that. TrailX Waterproof Backpack protects everything you carry through rain, commutes, and everything the UK weather throws at it.",
      benefits: [
        "Fully waterproof — not water-resistant, actually waterproof",
        "Padded laptop sleeve fits up to 15-inch — completely protected",
        "Looks as good in the office as it does on a trail",
      ],
      sections: [{ title: "Why it converts", text: "UK rain is a daily reality — this product has year-round relevance." }, { title: "Best angle", text: "Pour water over a fully loaded bag — the reveal that nothing got wet." }],
    },

  };

  const base = stores[product];
  if (!base) return Response.json({ store: null });

  const randomBrand = pickBrand(product);
  const randomImage = pickImage(product);

  const oldBrand = base.brand;
  const newDescription = base.description.startsWith(oldBrand)
    ? randomBrand + base.description.slice(oldBrand.length)
    : base.description;

  const store = {
    ...base,
    brand: randomBrand,
    description: newDescription,
    image: randomImage,
    products: [],
  };

  return Response.json({ store });
}