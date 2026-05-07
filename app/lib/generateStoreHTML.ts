// ─────────────────────────────────────────────────────────────────
//  Ember — Store HTML Generator
//  Full high-converting landing page with 9 sections
//  Works anywhere: Shopify, Wix, plain HTML, any website builder
// ─────────────────────────────────────────────────────────────────

export type StoreProduct = {
  name: string;
  price: string;
  description: string;
};

export type StoreData = {
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

// ─── HTML escape ──────────────────────────────────────────────────
function esc(s: string): string {
  return (s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// ─── Image mapping ────────────────────────────────────────────────
const IMAGE_MAP: Record<string, string> = {
  // Fitness
  "Adjustable Dumbbells":   "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=800&q=80",
  "Resistance Bands":       "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&q=80",
  "Posture Corrector":      "https://images.unsplash.com/photo-1554284126-aa88f22d8b74?w=800&q=80",
  "Smart Jump Rope":        "https://images.unsplash.com/photo-1517960413843-0aee8e2b3285?w=800&q=80",
  "Gym Gloves":             "https://images.unsplash.com/photo-1599058917212-d750089bc07e?w=800&q=80",

  // Beauty
  "LED Face Mask":          "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80",
  "Lash Serum":             "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&q=80",
  "Ice Roller":             "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&q=80",
  "Hair Curler":            "https://images.unsplash.com/photo-1585238342024-78d387f4a707?w=800&q=80",
  "Makeup Organiser":       "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&q=80",

  // Pets
  "Auto Pet Feeder":        "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=800&q=80",
  "Cat Fountain":           "https://images.unsplash.com/photo-1518020382113-a7e8fc38eac9?w=800&q=80",
  "Dog Cooling Mat":        "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=800&q=80",
  "Grooming Kit":           "https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=800&q=80",
  "LED Dog Collar":         "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=800&q=80",

  // Home
  "Under Sink Organiser":   "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80",
  "Magnetic Spice Rack":    "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=800&q=80",
  "Foldable Storage Boxes": "https://images.unsplash.com/photo-1493666438817-866a91353ca9?w=800&q=80",
  "Cable Management Kit":   "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&q=80",
  "Space Saving Hangers":   "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=800&q=80",

  // Tech
  "Wireless Charging Stand": "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",
  "Portable Phone Charger":  "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80",
  "Smart LED Light Strip":   "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&q=80",
  "Mini Projector":          "https://images.unsplash.com/photo-1487014679447-9f8336841d58?w=800&q=80",
  "Bluetooth Tracker Tag":   "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80",

  // Fashion
  "Crossbody Bag":           "https://images.unsplash.com/photo-1520975916090-3105956dac38?w=800&q=80",
  "Minimalist Watch":        "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80",
  "Layered Necklace Set":    "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&q=80",
  "Oversized Hoodie":        "https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80",
  "Polarized Sunglasses":    "https://images.unsplash.com/photo-1520975916090-3105956dac38?w=800&q=80",

  // Wellness
  "Massage Gun":             "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",
  "Aromatherapy Diffuser":   "https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&q=80",
  "Sleep Aid Device":        "https://images.unsplash.com/photo-1552196563-55cd4e45efb3?w=800&q=80",
  "Blue Light Glasses":      "https://images.unsplash.com/photo-1499728603263-13726abce5fd?w=800&q=80",
  "Stress Relief Ring":      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&q=80",

  // Outdoor
  "Solar Power Bank":        "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=80",
  "Camping Hammock":         "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=800&q=80",
  "Portable Water Filter":   "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800&q=80",
  "Compact Camping Stove":   "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
  "Waterproof Backpack":     "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=800&q=80",
};

function getProductImage(productName: string, overrideImage?: string): string {
  if (overrideImage) return overrideImage;
  return IMAGE_MAP[productName] || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80";
}

// ─── How it works (product-specific) ─────────────────────────────
function getHowItWorks(productName: string): { icon: string; title: string; desc: string }[] {
  const map: Record<string, { icon: string; title: string; desc: string }[]> = {
    "Adjustable Dumbbells": [
      { icon: "⚡", title: "Set your weight", desc: "Dial to your perfect resistance in seconds. No plates, no mess." },
      { icon: "🏋️", title: "Train at home", desc: "Full workout with one compact set that replaces an entire rack." },
      { icon: "💪", title: "See real results", desc: "Progressive overload made simple. Add weight as you get stronger." },
    ],
    "Resistance Bands": [
      { icon: "📦", title: "Choose your band", desc: "Pick the resistance level that matches your fitness level today." },
      { icon: "🔄", title: "Train anywhere", desc: "Home, gym, hotel room. No equipment needed. Just the band." },
      { icon: "💪", title: "Build strength fast", desc: "Progressive tension builds real muscle without the bulk." },
    ],
    "Posture Corrector": [
      { icon: "👕", title: "Put it on", desc: "Adjustable straps fit any body type. Wears discreetly under clothes." },
      { icon: "⏱️", title: "Wear 20-30 mins daily", desc: "Gently trains your muscles to hold the correct position naturally." },
      { icon: "🧍", title: "Stand taller", desc: "Most users notice a real difference within the first two weeks." },
    ],
    "Smart Jump Rope": [
      { icon: "📱", title: "Connect the app", desc: "Pair in seconds. Track your jumps, calories, and workout history." },
      { icon: "🔄", title: "Jump and track", desc: "Real-time feedback keeps you in the zone every session." },
      { icon: "🏆", title: "Hit your goals", desc: "Set targets and beat them. Every session logged automatically." },
    ],
    "Gym Gloves": [
      { icon: "✋", title: "Find your fit", desc: "Multiple sizes available. Snug fit that doesn't slip mid-set." },
      { icon: "🏋️", title: "Lift with confidence", desc: "Full grip support means heavier lifts and better form." },
      { icon: "🔄", title: "Wash and repeat", desc: "Machine washable. Ready for your next session every time." },
    ],
    "LED Face Mask": [
      { icon: "🧼", title: "Cleanse your skin", desc: "Start with a clean, dry face for maximum light penetration." },
      { icon: "😷", title: "Wear for 10 minutes", desc: "Relax while LED light works beneath the surface of your skin." },
      { icon: "✨", title: "See the glow", desc: "Consistent use delivers clearer, firmer skin in as little as 4 weeks." },
    ],
    "Lash Serum": [
      { icon: "💧", title: "Apply every night", desc: "One stroke along the lash line before bed. Takes 10 seconds." },
      { icon: "⏳", title: "Wait 4-6 weeks", desc: "Works with your natural growth cycle to strengthen each lash." },
      { icon: "😍", title: "Wake up transformed", desc: "No extensions, no falsies. Just your own lashes, visibly fuller." },
    ],
    "Ice Roller": [
      { icon: "❄️", title: "Freeze overnight", desc: "Store in the freezer for 2+ hours before your morning routine." },
      { icon: "🔄", title: "Roll for 5 minutes", desc: "Glide over face and neck in upward strokes. Instantly refreshing." },
      { icon: "✨", title: "Glow all day", desc: "Reduced puffiness and tightened pores — visible from the first use." },
    ],
    "Hair Curler": [
      { icon: "🔌", title: "Heat up fast", desc: "Ready in 30 seconds. Ceramic barrels protect your hair every time." },
      { icon: "💁", title: "Curl your way", desc: "Choose your barrel size for loose waves or tight curls." },
      { icon: "💫", title: "Hold all day", desc: "Long-lasting curls that stay in place from morning to night." },
    ],
    "Makeup Organiser": [
      { icon: "📦", title: "Unbox and place", desc: "No assembly needed. Place on your vanity and start filling." },
      { icon: "💄", title: "Sort your collection", desc: "A place for everything — brushes, palettes, skincare, all of it." },
      { icon: "✨", title: "Love getting ready", desc: "An organised space that makes your morning routine a pleasure." },
    ],
    "Auto Pet Feeder": [
      { icon: "📱", title: "Set your schedule", desc: "Programme up to 6 meals a day from the app in under 2 minutes." },
      { icon: "🍽️", title: "Fill and forget", desc: "Holds up to 6L of food. Lasts weeks between refills." },
      { icon: "🐾", title: "Happy pet every time", desc: "Consistent feeding reduces anxiety and improves your pet's health." },
    ],
    "Cat Fountain": [
      { icon: "💧", title: "Fill and plug in", desc: "Setup takes 2 minutes. Quiet pump runs 24 hours a day." },
      { icon: "🔄", title: "Filtered fresh water", desc: "Triple filtration removes impurities your cat can taste." },
      { icon: "😻", title: "Watch them drink more", desc: "Running water encourages hydration and improves kidney health." },
    ],
    "Dog Cooling Mat": [
      { icon: "❄️", title: "Unfold and place", desc: "No freezing, no water needed. Just unfold and let your dog use it." },
      { icon: "🐕", title: "Self-activating cooling", desc: "Activated by your dog's body weight. Cools on contact instantly." },
      { icon: "😌", title: "Happy dog all summer", desc: "Keep your dog comfortable in heat without the mess or fuss." },
    ],
    "Grooming Kit": [
      { icon: "🔋", title: "Charge once a week", desc: "Long battery life means no interruptions mid-groom." },
      { icon: "✂️", title: "Choose your attachment", desc: "Multiple lengths and tools for every coat type." },
      { icon: "🐾", title: "Salon results at home", desc: "Save on grooming bills and bond with your pet at the same time." },
    ],
    "LED Dog Collar": [
      { icon: "🔋", title: "Charge in 1 hour", desc: "USB charging. Lasts up to 8 hours of continuous light per charge." },
      { icon: "💡", title: "Clip on and go", desc: "Fits over any existing collar. Waterproof for all weather walks." },
      { icon: "🌙", title: "Walk with confidence", desc: "Visible from 500m away. Drivers see your dog before you see them." },
    ],
    "Under Sink Organiser": [
      { icon: "📐", title: "Measure your space", desc: "Adjustable design fits almost any under-sink cabinet size." },
      { icon: "🗂️", title: "Sort and stack", desc: "Pull-out drawers and shelves make everything instantly accessible." },
      { icon: "✨", title: "Transform the chaos", desc: "Before and after is night and day. Takes 15 minutes to install." },
    ],
    "Magnetic Spice Rack": [
      { icon: "🔧", title: "Mount in minutes", desc: "Comes with everything you need. Strong enough for any wall." },
      { icon: "🧲", title: "Snap your spices on", desc: "Magnetic base holds firmly. One hand removal and replacement." },
      { icon: "👨‍🍳", title: "Cook without the clutter", desc: "Find any spice in seconds. Your kitchen will never look the same." },
    ],
    "Foldable Storage Boxes": [
      { icon: "📦", title: "Fold out instantly", desc: "Rigid structure pops open in seconds. No tools, no assembly." },
      { icon: "🗂️", title: "Label and stack", desc: "Clear window front panels. Stack up to 4 high safely." },
      { icon: "🏠", title: "Transform any room", desc: "Closet, kids room, office. Instant organisation wherever you need it." },
    ],
    "Cable Management Kit": [
      { icon: "📋", title: "Plan your desk", desc: "Lay out your cables before you start. The kit handles everything." },
      { icon: "🔌", title: "Clip, route, hide", desc: "Cable clips, sleeves, and ties work together to eliminate every wire." },
      { icon: "🖥️", title: "Desk transformation", desc: "A clean desk is a clear mind. Takes under 30 minutes to install." },
    ],
    "Space Saving Hangers": [
      { icon: "📐", title: "Replace your hangers", desc: "Swap out bulky plastic hangers for slim, velvet-grip alternatives." },
      { icon: "👗", title: "Triple your space", desc: "The same wardrobe holds 3x more clothes. No more overstuffed rails." },
      { icon: "✨", title: "Wardrobe goals", desc: "Everything visible, nothing crumpled. Getting dressed becomes a joy." },
    ],
    "Wireless Charging Stand": [
      { icon: "📍", title: "Place on your desk", desc: "No cables to plug in each time. Just set and leave it." },
      { icon: "📱", title: "Drop your phone on", desc: "Charges through most cases. No alignment needed." },
      { icon: "🔋", title: "Always full battery", desc: "Pick up a fully charged phone every single morning." },
    ],
    "Portable Phone Charger": [
      { icon: "🔋", title: "Charge it up", desc: "Full charge in 2 hours. Holds enough for 3 full phone charges." },
      { icon: "🎒", title: "Take it anywhere", desc: "Slim enough to forget it's in your bag until you need it." },
      { icon: "📱", title: "Never run out", desc: "Festivals, travel, long days out — you're always covered." },
    ],
    "Smart LED Light Strip": [
      { icon: "📏", title: "Measure and cut", desc: "Customisable length. Sticks to any clean, flat surface instantly." },
      { icon: "📱", title: "Connect to the app", desc: "16 million colours and effects. Voice control compatible." },
      { icon: "🌈", title: "Transform your room", desc: "Gaming setup, bedroom ambience, home cinema — endless possibilities." },
    ],
    "Mini Projector": [
      { icon: "🔌", title: "Plug in and project", desc: "HDMI and wireless connection. Ready in under 60 seconds." },
      { icon: "📐", title: "Aim and focus", desc: "Projects up to 120 inches. Auto keystone for a perfect image." },
      { icon: "🎬", title: "Cinema anywhere", desc: "Bedroom wall, garden, holiday cottage — movies wherever you are." },
    ],
    "Bluetooth Tracker Tag": [
      { icon: "🔗", title: "Attach to anything", desc: "Keys, bag, wallet, luggage. Slim enough to go anywhere." },
      { icon: "📱", title: "Open the app", desc: "See exactly where your item is on a live map. Updated in real time." },
      { icon: "🔍", title: "Never lose anything", desc: "Ring it remotely or let the crowd network find it for you." },
    ],
    "Crossbody Bag": [
      { icon: "👜", title: "Pack your essentials", desc: "Multiple compartments. Fits phone, wallet, keys, and more." },
      { icon: "🔒", title: "Secure and go", desc: "Adjustable strap, secure zip closure. Comfortable all day." },
      { icon: "✨", title: "Elevate any outfit", desc: "Versatile enough for casual days and nights out alike." },
    ],
    "Minimalist Watch": [
      { icon: "📦", title: "Unbox and set the time", desc: "Simple crown adjustment. Ready to wear in under a minute." },
      { icon: "⌚", title: "Wear it daily", desc: "Lightweight design you forget is there — until someone compliments it." },
      { icon: "💎", title: "Elevate every look", desc: "The right watch changes everything. Simple, clean, timeless." },
    ],
    "Layered Necklace Set": [
      { icon: "📦", title: "Unbox and lay out", desc: "Each piece is designed to work together or stand alone." },
      { icon: "✨", title: "Layer your way", desc: "Mix lengths and textures for a curated, effortless look." },
      { icon: "💛", title: "Wear with confidence", desc: "Compliment-worthy every time. Styled for everyday or occasion." },
    ],
    "Oversized Hoodie": [
      { icon: "📦", title: "Unbox and try it on", desc: "Soft from the first wear. No break-in period needed." },
      { icon: "😌", title: "Feel the difference", desc: "Premium weight fabric that's warm without being heavy." },
      { icon: "👗", title: "Style it your way", desc: "With leggings, jeans, or nothing underneath — it works every time." },
    ],
    "Polarized Sunglasses": [
      { icon: "☀️", title: "Put them on", desc: "Immediate glare reduction. Your eyes will thank you instantly." },
      { icon: "🌊", title: "Take them anywhere", desc: "UV400 protection. Built for beach, driving, hiking — all of it." },
      { icon: "😎", title: "Look the part", desc: "Classic shapes that suit every face. Style meets serious function." },
    ],
    "Massage Gun": [
      { icon: "🔋", title: "Charge and power on", desc: "Full charge in 2 hours. Up to 6 hours per charge." },
      { icon: "🎯", title: "Target the muscle", desc: "Choose your attachment and speed. Apply gentle pressure." },
      { icon: "💆", title: "Feel the release", desc: "60 seconds per muscle group. The difference is immediate." },
    ],
    "Aromatherapy Diffuser": [
      { icon: "💧", title: "Fill with water", desc: "Add a few drops of your favourite essential oil to the reservoir." },
      { icon: "🌿", title: "Set your timer", desc: "Choose continuous or intermittent mist. Whisper quiet operation." },
      { icon: "😌", title: "Transform the room", desc: "Instant calm. Your home smells incredible within minutes." },
    ],
    "Sleep Aid Device": [
      { icon: "🌙", title: "Place bedside", desc: "Simple setup. Choose your preferred sound or breathing guide." },
      { icon: "😴", title: "Let it work", desc: "Signals your nervous system that it's time to wind down." },
      { icon: "☀️", title: "Wake up restored", desc: "Fall asleep faster. Wake more refreshed. Feel the difference in days." },
    ],
    "Blue Light Glasses": [
      { icon: "👓", title: "Put them on", desc: "Lightweight frame you barely notice. Works with any screen." },
      { icon: "💻", title: "Work without strain", desc: "Hours in front of a screen without the headache or tired eyes." },
      { icon: "😴", title: "Sleep better at night", desc: "Reduced blue light exposure means your body knows when to rest." },
    ],
    "Stress Relief Ring": [
      { icon: "💍", title: "Wear it daily", desc: "Sized for comfort. Sits naturally on any finger." },
      { icon: "🔄", title: "Spin when you need it", desc: "The spinning motion is a proven technique for redirecting anxiety." },
      { icon: "😌", title: "Find your calm", desc: "A quiet tool for stressful moments. Always on hand, always there." },
    ],
    "Solar Power Bank": [
      { icon: "☀️", title: "Charge in the sun", desc: "Solar panel charges in direct sunlight. USB charging also available." },
      { icon: "🎒", title: "Take it anywhere", desc: "Waterproof, rugged, and light enough to forget about." },
      { icon: "📱", title: "Never run out off-grid", desc: "Camping, festivals, hiking — power wherever the sun reaches." },
    ],
    "Camping Hammock": [
      { icon: "🌲", title: "Find two trees", desc: "Straps wrap around any trunk in seconds. No knot expertise required." },
      { icon: "🔗", title: "Clip and adjust", desc: "Carabiner clips and adjustable straps. Perfect height every time." },
      { icon: "😌", title: "Lie back and relax", desc: "Holds up to 300kg. The most comfortable seat in any forest." },
    ],
    "Portable Water Filter": [
      { icon: "💧", title: "Fill from any source", desc: "River, lake, tap — the filter handles it all safely." },
      { icon: "🔄", title: "Squeeze and drink", desc: "No pumping, no tablets, no waiting. Clean water in seconds." },
      { icon: "🌍", title: "Go anywhere", desc: "Safe water on every adventure. Never dependent on plastic bottles again." },
    ],
    "Compact Camping Stove": [
      { icon: "🔧", title: "Screw on the canister", desc: "Compatible with standard gas canisters. Ready in under a minute." },
      { icon: "🔥", title: "Light and cook", desc: "Piezo ignition. Boils a litre of water in under 4 minutes." },
      { icon: "🍳", title: "Eat well outdoors", desc: "Real hot meals wherever you are. Weighs less than your phone." },
    ],
    "Waterproof Backpack": [
      { icon: "🎒", title: "Pack your gear", desc: "Organised compartments for everything. Laptop sleeve included." },
      { icon: "🌧️", title: "Walk into any weather", desc: "Fully waterproof shell. Everything stays dry no matter what." },
      { icon: "🏔️", title: "Go further", desc: "Comfortable straps and back panel built for long days on the move." },
    ],
  };

  return map[productName] || [
    { icon: "📦", title: "Unbox and set up", desc: "Simple setup. Ready to use within minutes of opening." },
    { icon: "✨", title: "Use daily", desc: "Designed to fit seamlessly into your everyday routine." },
    { icon: "🏆", title: "See the results", desc: "Built to deliver a real, noticeable difference from day one." },
  ];
}

// ─── Before / After (product-specific) ───────────────────────────
function getBeforeAfter(productName: string): { before: string[]; after: string[] } {
  const map: Record<string, { before: string[]; after: string[] }> = {
    "Adjustable Dumbbells":  { before: ["Gym membership fees every month", "Travel time to and from the gym", "Waiting for equipment", "No flexibility in your schedule"], after: ["Full gym workout at home", "Train whenever you want", "No commute, no waiting", "Save hundreds per year"] },
    "Resistance Bands":      { before: ["Expensive gym equipment", "No space at home to train", "Inconsistent workout schedule", "Paying for classes you don't use"], after: ["Full body training anywhere", "Fits in a pocket or bag", "Train on your own terms", "One investment, used forever"] },
    "Posture Corrector":     { before: ["Constant back and neck pain", "Slouching at your desk all day", "Tension headaches by evening", "Low energy and poor confidence"], after: ["Upright posture without thinking", "No more end-of-day aches", "More energy, better focus", "Stand taller, feel better"] },
    "LED Face Mask":         { before: ["Expensive salon appointments", "Dull, tired-looking skin", "Uneven tone and texture", "Spending hundreds on serums"], after: ["Clinical results at home", "Glowing, refreshed skin", "Visibly clearer in weeks", "One mask, long-term results"] },
    "Lash Serum":            { before: ["Falsies that fall off mid-day", "Extensions that damage your lashes", "Thin, sparse natural lashes", "Spending £50+ per month"], after: ["Naturally fuller lashes", "No maintenance required", "Wake up looking put-together", "Real results in 6 weeks"] },
    "Massage Gun":           { before: ["Sore muscles for days after training", "Expensive sports massage appointments", "Delayed recovery slowing you down", "Avoiding workouts because of DOMS"], after: ["Recover in hours not days", "Professional-level relief at home", "Train harder, more consistently", "Save hundreds on appointments"] },
    "Auto Pet Feeder":       { before: ["Rushing home to feed your pet", "Feeling guilty about being late", "Inconsistent meal times", "Relying on neighbours when away"], after: ["Freedom to stay out later", "Pet fed on time, every time", "Consistent routine for better health", "Travel without the worry"] },
    "Sleep Aid Device":      { before: ["Lying awake for hours at night", "Waking up exhausted", "Relying on melatonin and medication", "Anxiety about not sleeping"], after: ["Falling asleep in minutes", "Deep, uninterrupted sleep", "Natural, drug-free solution", "Wake up genuinely rested"] },
    "Wireless Charging Stand": { before: ["Cable clutter on your desk", "Fumbling with cables in the dark", "Forgetting to charge overnight", "Multiple cables for multiple devices"], after: ["Clean, minimal desk setup", "Drop and charge instantly", "Full battery every morning", "One stand charges everything"] },
    "Camping Hammock":       { before: ["Heavy, bulky camping gear", "Uncomfortable sleeping on hard ground", "Complex setup taking hours", "Missing out on the outdoors"], after: ["Packs down to the size of a water bottle", "Sleep comfortably anywhere", "Set up in under 5 minutes", "Adventure more, stress less"] },
  };

  return map[productName] || {
    before: ["Expensive alternatives that don't work", "Wasting time on ineffective solutions", "Frustration with the status quo", "Spending more than you should"],
    after: ["A solution that actually delivers", "Time and money saved every week", "Real, noticeable results", "Wondering why you didn't try it sooner"],
  };
}

// ─── FAQ (product-specific) ───────────────────────────────────────
function getFAQs(productName: string): { q: string; a: string }[] {
  const generic = [
    { q: "How long does shipping take?", a: "We ship within 1-2 business days. Standard delivery takes 3-5 days. Express options available at checkout." },
    { q: "What's your returns policy?", a: "We offer a full 30-day no-questions-asked return policy. If you're not happy for any reason, we'll refund you in full." },
    { q: "Is this suitable for beginners?", a: "Absolutely. This product is designed to be accessible for all experience levels, with clear instructions included." },
    { q: "How do I contact support?", a: "Our team is available 7 days a week via email and live chat. We typically respond within 2 hours." },
    { q: "Do you offer a warranty?", a: "Yes — all products come with a 12-month warranty against manufacturing defects." },
  ];

  const map: Record<string, { q: string; a: string }[]> = {
    "Adjustable Dumbbells": [
      { q: "What weight range do they go up to?", a: "Our adjustable dumbbells go from 2.5kg up to 24kg per dumbbell, giving you a full range for any workout." },
      { q: "Are they safe for home use?", a: "Completely safe. The locking mechanism is tested to hold securely at every weight setting." },
      { q: "How quickly can I change the weight?", a: "Weight adjustment takes under 5 seconds with the quick-dial system." },
      { q: "What's your returns policy?", a: "Full 30-day return policy. No questions asked. We'll cover return shipping costs." },
      { q: "Do they come with a warranty?", a: "Yes — 2-year warranty on all mechanical components." },
    ],
    "LED Face Mask": [
      { q: "How often should I use it?", a: "For best results use 3-5 times per week for the first month, then maintain with 2-3 sessions weekly." },
      { q: "Is it safe for sensitive skin?", a: "Yes. LED light therapy is non-invasive and safe for all skin types including sensitive skin." },
      { q: "How long before I see results?", a: "Most users report visible improvements in skin tone and texture within 4 weeks of consistent use." },
      { q: "Can I use it with my other skincare?", a: "Yes. Apply your serum or moisturiser after your session for even better results." },
      { q: "What's included in the box?", a: "LED mask, USB charging cable, remote control, protective goggles, and instruction manual." },
    ],
    "Massage Gun": [
      { q: "How long does the battery last?", a: "Up to 6 hours of continuous use per charge. A full charge takes approximately 2 hours." },
      { q: "Is it loud?", a: "Our motor runs at under 45 decibels — quieter than a normal conversation. Use it anywhere." },
      { q: "What attachments are included?", a: "Comes with 6 interchangeable heads: round, flat, fork, bullet, cushion, and wedge." },
      { q: "How deep does it penetrate?", a: "Up to 12mm of percussive depth — enough to reach deep muscle tissue effectively." },
      { q: "Can I use it every day?", a: "Yes. Daily use is safe and recommended for active recovery. Limit to 2 minutes per muscle group." },
    ],
    "Sleep Aid Device": [
      { q: "How quickly does it work?", a: "Most users fall asleep 20-30 minutes faster within the first week of consistent use." },
      { q: "Is it drug-free?", a: "Completely. No medication, no supplements. Just science-backed light and sound technology." },
      { q: "Will it disturb my partner?", a: "The sound is directional and quiet. Light is gentle and localised. Partner-friendly." },
      { q: "What sounds are included?", a: "White noise, pink noise, brown noise, rain, ocean, and breathing guide programmes." },
      { q: "Does it turn off automatically?", a: "Yes. Set a timer for 20, 40, or 60 minutes and it powers down automatically." },
    ],
  };

  return map[productName] || generic;
}

// ═══════════════════════════════════════════════════════════════════
//  MAIN GENERATOR
// ═══════════════════════════════════════════════════════════════════

export function generateStoreHTML(
  store: StoreData & { image?: string },
  brandColor: string,
  productName: string
): string {
  const productImage = getProductImage(productName, store.image);
  const howItWorks   = getHowItWorks(productName);
  const beforeAfter  = getBeforeAfter(productName);
  const faqs         = getFAQs(productName);

  const bc = brandColor.replace("#", "");
  const r = parseInt(bc.substring(0, 2), 16);
  const g = parseInt(bc.substring(2, 4), 16);
  const b = parseInt(bc.substring(4, 6), 16);
  const brandRgb = `${r},${g},${b}`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(store.brand)} — ${esc(productName)}</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }

  :root {
    --brand: ${brandColor};
    --brand-rgb: ${brandRgb};
    --brand-light: rgba(${brandRgb}, 0.08);
    --brand-mid: rgba(${brandRgb}, 0.18);
    --brand-border: rgba(${brandRgb}, 0.3);
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    color: #1f2937;
    background: #ffffff;
    line-height: 1.6;
  }

  img { display: block; max-width: 100%; }
  a { color: inherit; text-decoration: none; }

  .container { max-width: 1100px; margin: 0 auto; padding: 0 24px; }

  /* ── STICKY CTA BAR (bottom mobile) ── */
  .sticky-bar {
    position: fixed;
    bottom: 0; left: 0; right: 0;
    background: white;
    border-top: 1px solid rgba(0,0,0,0.1);
    padding: 12px 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    z-index: 999;
    box-shadow: 0 -4px 24px rgba(0,0,0,0.08);
  }

  .sticky-price {
    font-size: 22px;
    font-weight: 800;
    color: #111827;
    letter-spacing: -0.02em;
  }

  .sticky-cta {
    flex: 1;
    max-width: 260px;
    padding: 14px 20px;
    background: var(--brand);
    color: white;
    border: none;
    border-radius: 12px;
    font-size: 15px;
    font-weight: 700;
    cursor: pointer;
    text-align: center;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }

  .sticky-cta:hover {
    transform: translateY(-1px);
    box-shadow: 0 8px 24px rgba(var(--brand-rgb), 0.35);
  }

  /* ── TOP SCROLL BAR (desktop) ── */
  .scroll-bar {
    position: fixed;
    top: 0; left: 0; right: 0;
    background: white;
    border-bottom: 1px solid rgba(0,0,0,0.08);
    padding: 10px 24px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    z-index: 998;
    transform: translateY(-100%);
    transition: transform 0.3s ease;
    box-shadow: 0 4px 20px rgba(0,0,0,0.06);
  }

  .scroll-bar.visible { transform: translateY(0); }

  .scroll-brand { font-size: 18px; font-weight: 800; color: #111827; }
  .scroll-product { font-size: 14px; color: #6b7280; }

  .scroll-cta {
    padding: 10px 24px;
    background: var(--brand);
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    white-space: nowrap;
    transition: transform 0.2s ease;
  }

  .scroll-cta:hover { transform: translateY(-1px); }

  /* ── HEADER ── */
  .header {
    background: white;
    border-bottom: 1px solid rgba(0,0,0,0.08);
    padding: 16px 0;
    position: sticky;
    top: 0;
    z-index: 50;
  }

  .header-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .header-brand {
    font-size: 20px;
    font-weight: 800;
    letter-spacing: -0.02em;
    color: #111827;
  }

  .header-nav {
    display: flex;
    align-items: center;
    gap: 28px;
    font-size: 14px;
    color: #6b7280;
  }

  .header-nav a:hover { color: var(--brand); }

  .header-cta {
    padding: 10px 22px;
    background: var(--brand);
    color: white;
    border: none;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    transition: transform 0.2s ease;
  }

  .header-cta:hover { transform: translateY(-1px); }

  /* ── HERO ── */
  .hero {
    padding: 64px 0 0;
    background: linear-gradient(180deg, var(--brand-light) 0%, white 100%);
  }

  .hero-inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 60px;
    align-items: center;
    padding-bottom: 64px;
  }

  .hero-tag {
    display: inline-block;
    padding: 6px 14px;
    background: var(--brand-mid);
    border: 1px solid var(--brand-border);
    border-radius: 999px;
    font-size: 12px;
    font-weight: 700;
    color: var(--brand);
    letter-spacing: 0.06em;
    text-transform: uppercase;
    margin-bottom: 18px;
  }

  .hero-headline {
    font-size: clamp(32px, 5vw, 52px);
    font-weight: 800;
    letter-spacing: -0.04em;
    line-height: 1.05;
    color: #111827;
    margin-bottom: 18px;
  }

  .hero-sub {
    font-size: 17px;
    color: #4b5563;
    line-height: 1.7;
    margin-bottom: 28px;
  }

  .hero-price {
    font-size: 40px;
    font-weight: 800;
    letter-spacing: -0.03em;
    color: #111827;
    margin-bottom: 8px;
  }

  .hero-price-note {
    font-size: 13px;
    color: #9ca3af;
    margin-bottom: 22px;
  }

  .hero-cta {
    display: inline-block;
    padding: 16px 32px;
    background: var(--brand);
    color: white;
    border: none;
    border-radius: 14px;
    font-size: 16px;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 12px 32px rgba(var(--brand-rgb), 0.35);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    margin-bottom: 16px;
    display: block;
    text-align: center;
    max-width: 280px;
  }

  .hero-cta:hover {
    transform: translateY(-2px);
    box-shadow: 0 18px 40px rgba(var(--brand-rgb), 0.42);
  }

  .hero-trust {
    font-size: 13px;
    color: #9ca3af;
    display: flex;
    align-items: center;
    gap: 6px;
  }

  .hero-image-wrap {
    border-radius: 28px;
    overflow: hidden;
    box-shadow: 0 32px 80px rgba(0,0,0,0.12);
    aspect-ratio: 4/5;
    position: relative;
  }

  .hero-image-wrap img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  /* ── TRUST STRIP ── */
  .trust-strip {
    background: #f9fafb;
    border-top: 1px solid rgba(0,0,0,0.06);
    border-bottom: 1px solid rgba(0,0,0,0.06);
    padding: 18px 0;
  }

  .trust-strip-inner {
    display: flex;
    justify-content: center;
    gap: 48px;
    flex-wrap: wrap;
  }

  .trust-item {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    font-weight: 600;
    color: #374151;
  }

  /* ── SECTION COMMON ── */
  .section { padding: 80px 0; }
  .section-alt { background: #f9fafb; }

  .section-label {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--brand);
    margin-bottom: 10px;
  }

  .section-title {
    font-size: clamp(28px, 4vw, 42px);
    font-weight: 800;
    letter-spacing: -0.035em;
    color: #111827;
    margin-bottom: 12px;
    line-height: 1.1;
  }

  .section-sub {
    font-size: 16px;
    color: #6b7280;
    max-width: 580px;
    line-height: 1.65;
    margin-bottom: 48px;
  }

  /* ── BENEFITS ── */
  .benefits-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
  }

  .benefit-card {
    background: white;
    border: 1px solid rgba(0,0,0,0.08);
    border-radius: 20px;
    padding: 24px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.04);
    transition: transform 0.2s ease;
  }

  .benefit-card:hover { transform: translateY(-4px); }

  .benefit-icon {
    width: 44px; height: 44px;
    background: var(--brand-mid);
    border-radius: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    margin-bottom: 14px;
  }

  .benefit-title {
    font-size: 16px;
    font-weight: 700;
    color: #111827;
    margin-bottom: 6px;
  }

  .benefit-desc {
    font-size: 14px;
    color: #6b7280;
    line-height: 1.65;
  }

  /* ── HOW IT WORKS ── */
  .steps-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
    position: relative;
  }

  .step-card {
    text-align: center;
    padding: 32px 24px;
    background: white;
    border-radius: 24px;
    border: 1px solid rgba(0,0,0,0.08);
    box-shadow: 0 8px 24px rgba(0,0,0,0.04);
  }

  .step-num {
    width: 48px; height: 48px;
    background: var(--brand);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 18px;
    font-weight: 800;
    color: white;
    margin: 0 auto 16px;
  }

  .step-icon { font-size: 32px; margin-bottom: 14px; }

  .step-title {
    font-size: 17px;
    font-weight: 700;
    color: #111827;
    margin-bottom: 8px;
  }

  .step-desc { font-size: 14px; color: #6b7280; line-height: 1.65; }

  /* ── BEFORE / AFTER ── */
  .ba-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
  }

  .ba-card {
    border-radius: 24px;
    padding: 32px;
  }

  .ba-before {
    background: #fef2f2;
    border: 1px solid #fecaca;
  }

  .ba-after {
    background: var(--brand-light);
    border: 1px solid var(--brand-border);
  }

  .ba-label {
    font-size: 12px;
    font-weight: 800;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .ba-before .ba-label { color: #dc2626; }
  .ba-after .ba-label { color: var(--brand); }

  .ba-list { list-style: none; }
  .ba-list li {
    padding: 10px 0;
    border-bottom: 1px solid rgba(0,0,0,0.06);
    font-size: 15px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .ba-list li:last-child { border-bottom: none; }

  /* ── SOCIAL PROOF ── */
  .reviews-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-bottom: 32px;
  }

  .review-card {
    background: white;
    border: 1px solid rgba(0,0,0,0.08);
    border-radius: 20px;
    padding: 24px;
    box-shadow: 0 4px 16px rgba(0,0,0,0.04);
  }

  .review-stars { color: #f59e0b; font-size: 16px; margin-bottom: 12px; }

  .review-text {
    font-size: 14px;
    color: #374151;
    line-height: 1.7;
    margin-bottom: 16px;
    font-style: italic;
  }

  .review-author {
    font-size: 13px;
    font-weight: 700;
    color: #111827;
  }

  .review-verified {
    font-size: 11px;
    color: #22c55e;
    font-weight: 600;
    margin-top: 2px;
  }

  .review-summary {
    display: flex;
    align-items: center;
    gap: 20px;
    padding: 24px;
    background: var(--brand-light);
    border: 1px solid var(--brand-border);
    border-radius: 20px;
  }

  .review-score {
    font-size: 52px;
    font-weight: 800;
    color: var(--brand);
    letter-spacing: -0.04em;
    line-height: 1;
  }

  /* ── FAQ ── */
  .faq-list { max-width: 720px; margin: 0 auto; }

  .faq-item {
    border-bottom: 1px solid rgba(0,0,0,0.08);
    padding: 20px 0;
  }

  .faq-q {
    font-size: 16px;
    font-weight: 700;
    color: #111827;
    cursor: pointer;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 16px;
  }

  .faq-arrow { font-size: 18px; transition: transform 0.2s ease; }
  .faq-item.open .faq-arrow { transform: rotate(180deg); }

  .faq-a {
    font-size: 14px;
    color: #6b7280;
    line-height: 1.75;
    padding-top: 12px;
    display: none;
  }

  .faq-item.open .faq-a { display: block; }

  /* ── GUARANTEE ── */
  .guarantee-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 20px;
  }

  .guarantee-card {
    text-align: center;
    padding: 28px 20px;
    background: white;
    border-radius: 20px;
    border: 1px solid rgba(0,0,0,0.08);
    box-shadow: 0 4px 16px rgba(0,0,0,0.04);
  }

  .guarantee-icon { font-size: 36px; margin-bottom: 12px; }
  .guarantee-title { font-size: 15px; font-weight: 700; color: #111827; margin-bottom: 6px; }
  .guarantee-desc { font-size: 13px; color: #6b7280; line-height: 1.6; }

  /* ── FINAL CTA SECTION ── */
  .final-cta {
    background: linear-gradient(135deg, var(--brand-light) 0%, white 100%);
    padding: 80px 0;
    text-align: center;
  }

  .final-cta-btn {
    display: inline-block;
    padding: 18px 48px;
    background: var(--brand);
    color: white;
    border: none;
    border-radius: 16px;
    font-size: 18px;
    font-weight: 700;
    cursor: pointer;
    box-shadow: 0 16px 40px rgba(var(--brand-rgb), 0.35);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    margin-top: 28px;
  }

  .final-cta-btn:hover {
    transform: translateY(-2px);
    box-shadow: 0 22px 50px rgba(var(--brand-rgb), 0.42);
  }

  /* ── FOOTER ── */
  .footer {
    background: #111827;
    color: rgba(255,255,255,0.6);
    padding: 40px 0 100px;
  }

  .footer-inner {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
  }

  .footer-brand { font-size: 18px; font-weight: 800; color: white; }
  .footer-links { display: flex; gap: 24px; font-size: 13px; }
  .footer-links a:hover { color: var(--brand); }

  .ember-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 6px 14px;
    background: rgba(255,255,255,0.06);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 999px;
    font-size: 12px;
    font-weight: 600;
    color: rgba(255,255,255,0.5);
    text-decoration: none;
    transition: all 0.2s ease;
  }

  .ember-badge:hover {
    background: rgba(255,255,255,0.1);
    color: white;
  }

  /* ── RESPONSIVE ── */
  @media (max-width: 768px) {
    .hero-inner { grid-template-columns: 1fr; gap: 32px; }
    .hero-image-wrap { order: -1; aspect-ratio: 16/9; }
    .benefits-grid { grid-template-columns: 1fr; }
    .steps-grid { grid-template-columns: 1fr; }
    .ba-grid { grid-template-columns: 1fr; }
    .reviews-grid { grid-template-columns: 1fr; }
    .guarantee-grid { grid-template-columns: 1fr 1fr; }
    .trust-strip-inner { gap: 20px; }
    .header-nav { display: none; }
    .scroll-bar { display: none; }
  }
</style>
</head>
<body>

<!-- ── Scroll bar (desktop, appears on scroll) ── -->
<div class="scroll-bar" id="scrollBar">
  <div>
    <div class="scroll-brand">${esc(store.brand)}</div>
    <div class="scroll-product">${esc(productName)}</div>
  </div>
  <div style="display:flex;align-items:center;gap:16px;">
    <span style="font-size:20px;font-weight:800;color:#111827;">${esc(store.price)}</span>
    <button class="scroll-cta">${esc(store.cta || "Buy now")}</button>
  </div>
</div>

<!-- ── Sticky bottom bar ── -->
<div class="sticky-bar">
  <div class="sticky-price">${esc(store.price)}</div>
  <button class="sticky-cta">${esc(store.cta || "Buy now")} →</button>
</div>

<!-- ══════════════════════════════════════════
     HEADER
══════════════════════════════════════════ -->
<header class="header">
  <div class="container">
    <div class="header-inner">
      <div class="header-brand">${esc(store.brand)}</div>
      <nav class="header-nav">
        <a href="#benefits">Benefits</a>
        <a href="#how-it-works">How it works</a>
        <a href="#reviews">Reviews</a>
        <a href="#faq">FAQ</a>
      </nav>
      <button class="header-cta">${esc(store.cta || "Buy now")}</button>
    </div>
  </div>
</header>

<!-- ══════════════════════════════════════════
     HERO
══════════════════════════════════════════ -->
<section class="hero">
  <div class="container">
    <div class="hero-inner">
      <div>
        <div class="hero-tag">🔥 Trending right now</div>
        <h1 class="hero-headline">${esc(store.headline)}</h1>
        <p class="hero-sub">${esc(store.subheadline)}</p>
        <div class="hero-price">${esc(store.price)}</div>
        <div class="hero-price-note">Free shipping • Ships in 1-2 days</div>
        <a href="#" class="hero-cta">${esc(store.cta || "Shop now")} →</a>
        <div class="hero-trust">⭐⭐⭐⭐⭐ &nbsp;4.9/5 from 2,400+ reviews</div>
      </div>
      <div class="hero-image-wrap">
        <img src="${productImage}" alt="${esc(productName)}" loading="eager" />
      </div>
    </div>
  </div>
</section>

<!-- ── Trust strip ── -->
<div class="trust-strip">
  <div class="container">
    <div class="trust-strip-inner">
      <div class="trust-item">🚚 Free shipping on all orders</div>
      <div class="trust-item">↩️ 30-day free returns</div>
      <div class="trust-item">🔒 Secure checkout</div>
      <div class="trust-item">⭐ 4.9/5 customer rating</div>
      <div class="trust-item">📦 Ships in 1-2 days</div>
    </div>
  </div>
</div>

<!-- ══════════════════════════════════════════
     BENEFITS — Why people love this
══════════════════════════════════════════ -->
<section class="section" id="benefits">
  <div class="container">
    <div class="section-label">Why people love this</div>
    <h2 class="section-title">Built different.<br>Results that show.</h2>
    <p class="section-sub">${esc(store.description)}</p>
    <div class="benefits-grid">
      ${store.benefits.map((b, i) => {
        const icons = ["⚡","🎯","💪","✨","🔥","🏆","💡","🛡️","🌟","🔑"];
        return `
      <div class="benefit-card">
        <div class="benefit-icon">${icons[i % icons.length]}</div>
        <div class="benefit-title">${esc(b)}</div>
        <div class="benefit-desc">Experience the difference that sets ${esc(store.brand)} apart from the rest.</div>
      </div>`;
      }).join("")}
    </div>
  </div>
</section>

<!-- ══════════════════════════════════════════
     HOW IT WORKS
══════════════════════════════════════════ -->
<section class="section section-alt" id="how-it-works">
  <div class="container">
    <div class="section-label">Simple by design</div>
    <h2 class="section-title">How it works</h2>
    <p class="section-sub">Three steps is all it takes. No complicated setup, no learning curve.</p>
    <div class="steps-grid">
      ${howItWorks.map((step, i) => `
      <div class="step-card">
        <div class="step-icon">${step.icon}</div>
        <div class="step-num">${i + 1}</div>
        <div class="step-title">${esc(step.title)}</div>
        <div class="step-desc">${esc(step.desc)}</div>
      </div>`).join("")}
    </div>
  </div>
</section>

<!-- ══════════════════════════════════════════
     BEFORE / AFTER
══════════════════════════════════════════ -->
<section class="section">
  <div class="container">
    <div class="section-label">The difference is real</div>
    <h2 class="section-title">Before vs After</h2>
    <p class="section-sub">See exactly what changes when you make the switch.</p>
    <div class="ba-grid">
      <div class="ba-card ba-before">
        <div class="ba-label">❌ Before ${esc(store.brand)}</div>
        <ul class="ba-list">
          ${beforeAfter.before.map(item => `
          <li><span style="color:#dc2626;font-weight:700;">✗</span> ${esc(item)}</li>`).join("")}
        </ul>
      </div>
      <div class="ba-card ba-after">
        <div class="ba-label">✅ After ${esc(store.brand)}</div>
        <ul class="ba-list">
          ${beforeAfter.after.map(item => `
          <li><span style="color:var(--brand);font-weight:700;">✓</span> ${esc(item)}</li>`).join("")}
        </ul>
      </div>
    </div>
  </div>
</section>

<!-- ══════════════════════════════════════════
     SOCIAL PROOF
══════════════════════════════════════════ -->
<section class="section section-alt" id="reviews">
  <div class="container">
    <div class="section-label">Social proof</div>
    <h2 class="section-title">2,400+ happy customers</h2>
    <p class="section-sub" style="margin-bottom:32px;">Don't take our word for it. Here's what real customers say.</p>

    <div class="review-summary" style="margin-bottom:32px;">
      <div class="review-score">4.9</div>
      <div>
        <div style="font-size:22px;color:#f59e0b;margin-bottom:4px;">⭐⭐⭐⭐⭐</div>
        <div style="font-size:15px;font-weight:700;color:#111827;">Based on 2,400+ verified reviews</div>
        <div style="font-size:13px;color:#6b7280;margin-top:4px;">97% would recommend to a friend</div>
      </div>
    </div>

    <div class="reviews-grid">
      <div class="review-card">
        <div class="review-stars">⭐⭐⭐⭐⭐</div>
        <p class="review-text">"Honestly didn't expect much but this completely exceeded my expectations. The quality is incredible for the price."</p>
        <div class="review-author">Sarah M.</div>
        <div class="review-verified">✓ Verified buyer</div>
      </div>
      <div class="review-card">
        <div class="review-stars">⭐⭐⭐⭐⭐</div>
        <p class="review-text">"I've tried so many alternatives and nothing comes close. This is the one I recommend to everyone I know."</p>
        <div class="review-author">James T.</div>
        <div class="review-verified">✓ Verified buyer</div>
      </div>
      <div class="review-card">
        <div class="review-stars">⭐⭐⭐⭐⭐</div>
        <p class="review-text">"Looks way more premium than I expected. Fast delivery, great packaging, and the results speak for themselves."</p>
        <div class="review-author">Priya K.</div>
        <div class="review-verified">✓ Verified buyer</div>
      </div>
    </div>
  </div>
</section>

<!-- ══════════════════════════════════════════
     FAQ
══════════════════════════════════════════ -->
<section class="section" id="faq">
  <div class="container" style="text-align:center;">
    <div class="section-label">Got questions?</div>
    <h2 class="section-title">Frequently asked</h2>
    <p class="section-sub" style="margin:0 auto 48px;">Everything you need to know before you buy.</p>
    <div class="faq-list">
      ${faqs.map((faq, i) => `
      <div class="faq-item" id="faq-${i}">
        <div class="faq-q" onclick="toggleFaq(${i})">
          <span>${esc(faq.q)}</span>
          <span class="faq-arrow">⌄</span>
        </div>
        <div class="faq-a">${esc(faq.a)}</div>
      </div>`).join("")}
    </div>
  </div>
</section>

<!-- ══════════════════════════════════════════
     GUARANTEE / TRUST
══════════════════════════════════════════ -->
<section class="section section-alt">
  <div class="container" style="text-align:center;">
    <div class="section-label">Our promise</div>
    <h2 class="section-title">Shop with confidence</h2>
    <p class="section-sub" style="margin:0 auto 48px;">We stand behind every product we sell. No asterisks, no fine print.</p>
    <div class="guarantee-grid">
      <div class="guarantee-card">
        <div class="guarantee-icon">↩️</div>
        <div class="guarantee-title">30-Day Returns</div>
        <div class="guarantee-desc">Not happy? Return it within 30 days for a full refund. No questions asked.</div>
      </div>
      <div class="guarantee-card">
        <div class="guarantee-icon">🚚</div>
        <div class="guarantee-title">Free Shipping</div>
        <div class="guarantee-desc">Free delivery on every order. Ships within 1-2 business days.</div>
      </div>
      <div class="guarantee-card">
        <div class="guarantee-icon">🔒</div>
        <div class="guarantee-title">Secure Checkout</div>
        <div class="guarantee-desc">256-bit SSL encryption. Your payment information is always safe.</div>
      </div>
      <div class="guarantee-card">
        <div class="guarantee-icon">🛡️</div>
        <div class="guarantee-title">12-Month Warranty</div>
        <div class="guarantee-desc">Full warranty against any manufacturing defects. We've got you covered.</div>
      </div>
    </div>
  </div>
</section>

<!-- ══════════════════════════════════════════
     FINAL CTA
══════════════════════════════════════════ -->
<section class="final-cta">
  <div class="container">
    <div class="section-label" style="text-align:center;">Ready to get started?</div>
    <h2 class="section-title" style="text-align:center;">Get yours today</h2>
    <p style="text-align:center;font-size:16px;color:#6b7280;max-width:480px;margin:0 auto;">
      Join 2,400+ customers who made the switch. Free shipping. 30-day guarantee. Ships in 1-2 days.
    </p>
    <div style="text-align:center;">
      <div style="font-size:36px;font-weight:800;color:#111827;margin-top:24px;letter-spacing:-0.03em;">${esc(store.price)}</div>
      <a href="#" class="final-cta-btn">${esc(store.cta || "Buy now")} →</a>
      <div style="margin-top:14px;font-size:13px;color:#9ca3af;">Free shipping • 30-day returns • Secure checkout</div>
    </div>
  </div>
</section>

<!-- ══════════════════════════════════════════
     FOOTER
══════════════════════════════════════════ -->
<footer class="footer">
  <div class="container">
    <div class="footer-inner">
      <div class="footer-brand">${esc(store.brand)}</div>
      <nav class="footer-links">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="#">Contact Us</a>
        <a href="#">Shipping Info</a>
      </nav>
      <a href="https://ember.ai" class="ember-badge" target="_blank">
        ⚡ Built with Ember 🔥
      </a>
    </div>
    <div style="margin-top:24px;padding-top:24px;border-top:1px solid rgba(255,255,255,0.08);font-size:12px;color:rgba(255,255,255,0.3);text-align:center;">
      © ${new Date().getFullYear()} ${esc(store.brand)}. All rights reserved.
    </div>
  </div>
</footer>

<script>
  // ── Scroll bar ──
  const scrollBar = document.getElementById('scrollBar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollBar.classList.add('visible');
    } else {
      scrollBar.classList.remove('visible');
    }
  });

  // ── FAQ accordion ──
  function toggleFaq(i) {
    const item = document.getElementById('faq-' + i);
    item.classList.toggle('open');
  }
</script>

</body>
</html>`;
}

// ─── Shopify section wrapper ───────────────────────────────────────
export function generateShopifySection(
  store: StoreData,
  brandColor: string,
  productName: string
): string {
  const html = generateStoreHTML(store, brandColor, productName);
  return `{% comment %}
  Ember-generated storefront section
  Product: ${productName}
  Brand: ${store.brand}
  Generated: ${new Date().toISOString()}
{% endcomment %}

${html}

{% schema %}
{
  "name": "Ember Storefront",
  "settings": [
    {
      "type": "color",
      "id": "brand_color",
      "label": "Brand colour",
      "default": "${brandColor}"
    }
  ],
  "presets": [
    { "name": "Ember Storefront" }
  ]
}
{% endschema %}`;
}

// ─── Template HTML Generator ──────────────────────────────────
// Generates genuinely different HTML for each of the 4 templates
// so See Live matches the preview exactly

export function generateTemplateHTML(
  store: StoreData,
  brandColor: string,
  productName: string,
  template: 1 | 2 | 3 | 4,
  buttonRadius = "14px",
  imageRadius = "16px"
): string {
  const img = (() => {
    const IMAGE_POOLS: Record<string, string[]> = {
      "Adjustable Dumbbells":["photo-1599058917212-d750089bc07e","photo-1581009146145-b5ef050c2e1e"],
      "Resistance Bands":["photo-1571019613454-1cb2f99b2d8b","photo-1518611012118-696072aa579a"],
      "LED Face Mask":["photo-1522335789203-aabd1fc54bc9","photo-1596462502278-27bfdc403348"],
      "Lash Serum":["photo-1600185365483-26d7a4cc7519","photo-1522335789203-aabd1fc54bc9"],
      "Ice Roller":["photo-1596462502278-27bfdc403348","photo-1570172619644-dfd03ed5d881"],
      "Hair Curler":["photo-1585238342024-78d387f4a707","photo-1519500099198-fd81846b8f03"],
      "Makeup Organiser":["photo-1522335789203-aabd1fc54bc9","photo-1571781926291-c477ebfd024b"],
      "Auto Pet Feeder":["photo-1517849845537-4d257902454a","photo-1548199973-03cce0bbc87b"],
      "Massage Gun":["photo-1506126613408-eca07ce68773","photo-1552196563-55cd4e45efb3"],
      "Aromatherapy Diffuser":["photo-1518611012118-696072aa579a","photo-1506126613408-eca07ce68773"],
      "Sleep Aid Device":["photo-1552196563-55cd4e45efb3","photo-1518611012118-696072aa579a"],
      "Crossbody Bag":["photo-1520975916090-3105956dac38","photo-1548036328-c9fa89d128fa"],
      "Minimalist Watch":["photo-1490481651871-ab68de25d43d","photo-1523170335258-f5ed11844a49"],
      "Oversized Hoodie":["photo-1519741497674-611481863552","photo-1556821840-3a63f15732ce"],
      "Camping Hammock":["photo-1470770841072-f978cf4d019e","photo-1441974231531-c6227db76b6e"],
      "Waterproof Backpack":["photo-1500530855697-b586d89ba3ee","photo-1441974231531-c6227db76b6e"],
    };
    const pool = IMAGE_POOLS[productName];
    const id = pool ? pool[0] : "photo-1560472354-b33ff0c44a43";
    return `https://images.unsplash.com/${id}?w=800&q=80`;
  })();

  const bc = brandColor.replace("#","");
  const r = parseInt(bc.substring(0,2),16);
  const g = parseInt(bc.substring(2,4),16);
  const b2 = parseInt(bc.substring(4,6),16);
  const rgb = `${r},${g},${b2}`;
  const benefits = store.benefits?.slice(0,3) || [];
  const br = buttonRadius;
  const ir = imageRadius;

  const baseHead = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(store.brand)}</title>
<style>*{margin:0;padding:0;box-sizing:border-box;}body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#1f2937;}img{display:block;max-width:100%;}.container{max-width:1100px;margin:0 auto;padding:0 40px;}</style>
</head>`;

  // ── Template 1 — Dark Editorial ──
  if (template === 1) return `${baseHead}
<body style="background:#0a0a0a;color:white;">
<style>
  nav{position:sticky;top:0;background:#0a0a0a;border-bottom:1px solid rgba(255,255,255,0.08);padding:20px 40px;display:flex;justify-content:space-between;align-items:center;z-index:10;}
  .nav-brand{font-size:20px;font-weight:800;color:white;letter-spacing:-0.02em;}
  .nav-links{display:flex;gap:32px;font-size:13px;color:rgba(255,255,255,0.5);letter-spacing:0.06em;text-transform:uppercase;}
  .nav-cta{padding:10px 24px;background:${brandColor};color:white;border:none;border-radius:${br};font-size:13px;font-weight:700;cursor:pointer;letter-spacing:0.04em;}
  .hero{display:grid;grid-template-columns:1fr 1fr;min-height:90vh;}
  .hero-left{padding:80px 48px;display:flex;flex-direction:column;justify-content:center;}
  .hero-tag{font-size:11px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:${brandColor};margin-bottom:24px;}
  .hero-h1{font-size:clamp(36px,5vw,64px);font-weight:800;line-height:1.0;letter-spacing:-0.04em;color:white;margin-bottom:24px;}
  .hero-sub{font-size:17px;color:rgba(255,255,255,0.6);line-height:1.7;margin-bottom:40px;}
  .hero-price{font-size:44px;font-weight:800;color:${brandColor};letter-spacing:-0.03em;margin-bottom:6px;}
  .hero-note{font-size:12px;color:rgba(255,255,255,0.3);margin-bottom:28px;}
  .hero-cta{display:inline-block;padding:18px 44px;background:${brandColor};color:white;border:none;border-radius:${br};font-size:16px;font-weight:700;cursor:pointer;letter-spacing:0.04em;box-shadow:0 12px 40px rgba(${rgb},0.4);}
  .hero-right{position:relative;overflow:hidden;}
  .hero-right img{width:100%;height:100%;object-fit:cover;filter:brightness(0.8);}
  .hero-overlay{position:absolute;inset:0;background:linear-gradient(to right,#0a0a0a 0%,transparent 35%);}
  .trust{padding:20px 40px;border-top:1px solid rgba(255,255,255,0.06);border-bottom:1px solid rgba(255,255,255,0.06);display:flex;justify-content:center;gap:48px;flex-wrap:wrap;}
  .trust span{font-size:12px;font-weight:600;color:rgba(255,255,255,0.4);letter-spacing:0.04em;}
  .section{padding:80px 0;}
  .section-label{font-size:11px;font-weight:700;letter-spacing:0.18em;text-transform:uppercase;color:${brandColor};margin-bottom:16px;}
  .section-h2{font-size:clamp(28px,4vw,44px);font-weight:800;color:white;letter-spacing:-0.03em;margin-bottom:12px;}
  .section-sub{font-size:16px;color:rgba(255,255,255,0.5);line-height:1.7;margin-bottom:48px;}
  .benefits{display:grid;grid-template-columns:repeat(3,1fr);gap:2px;}
  .benefit{padding:32px;background:#111;font-size:15px;}
  .benefit-num{font-size:28px;font-weight:900;color:${brandColor};margin-bottom:12px;}
  .benefit-title{font-weight:700;color:white;margin-bottom:8px;}
  .benefit-desc{font-size:13px;color:rgba(255,255,255,0.4);line-height:1.6;}
  .reviews{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:48px;}
  .review{padding:28px;background:#111;border:1px solid rgba(255,255,255,0.06);}
  .review-stars{color:#f59e0b;margin-bottom:12px;}
  .review-text{font-size:14px;color:rgba(255,255,255,0.6);line-height:1.75;margin-bottom:16px;font-style:italic;}
  .review-name{font-size:12px;font-weight:700;color:white;letter-spacing:0.06em;text-transform:uppercase;}
  .faq-item{border-bottom:1px solid rgba(255,255,255,0.08);padding:24px 0;}
  .faq-q{font-size:16px;font-weight:700;color:white;margin-bottom:10px;}
  .faq-a{font-size:14px;color:rgba(255,255,255,0.5);line-height:1.75;}
  .final-cta{padding:100px 0;text-align:center;background:linear-gradient(135deg,#0a0a0a,rgba(${rgb},0.15));border-top:1px solid rgba(255,255,255,0.06);}
  .final-cta h2{font-size:48px;font-weight:800;color:white;letter-spacing:-0.04em;margin-bottom:20px;}
  .final-cta .price{font-size:40px;font-weight:800;color:${brandColor};margin-bottom:28px;}
  .final-cta button{padding:20px 56px;background:${brandColor};color:white;border:none;border-radius:${br};font-size:17px;font-weight:700;cursor:pointer;box-shadow:0 20px 50px rgba(${rgb},0.4);letter-spacing:0.04em;}
  .footer{padding:32px 40px;background:#050505;display:flex;justify-content:space-between;align-items:center;border-top:1px solid rgba(255,255,255,0.06);}
  .footer-brand{font-size:16px;font-weight:800;color:white;}
  .ember-badge{font-size:11px;padding:5px 12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.08);border-radius:999px;color:rgba(255,255,255,0.3);}
</style>
<nav>
  <div class="nav-brand">${esc(store.brand)}</div>
  <div class="nav-links"><span>Shop</span><span>About</span><span>Reviews</span></div>
  <button class="nav-cta">${esc(store.cta)}</button>
</nav>
<div class="hero">
  <div class="hero-left">
    <div class="hero-tag">New Collection</div>
    <h1 class="hero-h1">${esc(store.headline)}</h1>
    <p class="hero-sub">${esc(store.subheadline)}</p>
    <div class="hero-price">${esc(store.price)}</div>
    <div class="hero-note">Free shipping · Ships in 1-2 days</div>
    <button class="hero-cta">${esc(store.cta)}</button>
  </div>
  <div class="hero-right">
    <img src="${img}" alt="${esc(productName)}">
    <div class="hero-overlay"></div>
  </div>
</div>
<div class="trust"><span>🚚 Free Shipping</span><span>↩️ 30-Day Returns</span><span>🔒 Secure Checkout</span><span>⭐ 4.9/5 Rating</span></div>
<div class="section" style="background:#0a0a0a;">
  <div class="container">
    <div class="section-label">Why choose us</div>
    <h2 class="section-h2">Built different.</h2>
    <p class="section-sub">${esc(store.description)}</p>
    <div class="benefits">
      ${benefits.map((b,i)=>`<div class="benefit"><div class="benefit-num">0${i+1}</div><div class="benefit-title">${esc(b)}</div><div class="benefit-desc">Experience the difference.</div></div>`).join("")}
    </div>
  </div>
</div>
<div class="section" style="background:#111;border-top:1px solid rgba(255,255,255,0.06);">
  <div class="container">
    <div class="section-label">Social proof</div>
    <h2 class="section-h2">2,400+ happy customers</h2>
    <div class="reviews">
      <div class="review"><div class="review-stars">⭐⭐⭐⭐⭐</div><p class="review-text">"Completely exceeded my expectations."</p><div class="review-name">Sarah M.</div></div>
      <div class="review"><div class="review-stars">⭐⭐⭐⭐⭐</div><p class="review-text">"Nothing comes close to this quality."</p><div class="review-name">James T.</div></div>
      <div class="review"><div class="review-stars">⭐⭐⭐⭐⭐</div><p class="review-text">"More premium than I expected."</p><div class="review-name">Priya K.</div></div>
    </div>
  </div>
</div>
<div class="section" style="background:#0a0a0a;">
  <div class="container">
    <div class="section-label">FAQ</div>
    <h2 class="section-h2">Questions answered</h2>
    <div style="margin-top:40px;">
      <div class="faq-item"><div class="faq-q">How long does shipping take?</div><div class="faq-a">We ship within 1-2 business days. Standard delivery takes 3-5 days.</div></div>
      <div class="faq-item"><div class="faq-q">What's your returns policy?</div><div class="faq-a">Full 30-day no-questions-asked return policy. Refunded in full.</div></div>
      <div class="faq-item"><div class="faq-q">Do you offer a warranty?</div><div class="faq-a">Yes — 12-month warranty against all manufacturing defects.</div></div>
    </div>
  </div>
</div>
<div class="final-cta">
  <div class="container">
    <h2>Get yours today</h2>
    <div class="price">${esc(store.price)}</div>
    <button>${esc(store.cta)}</button>
    <div style="font-size:13px;color:rgba(255,255,255,0.3);margin-top:16px;">Free shipping · 30-day returns · Secure checkout</div>
  </div>
</div>
<div class="footer">
  <div class="footer-brand">${esc(store.brand)}</div>
  <div class="ember-badge">⚡ Built with Ember 🔥</div>
</div>
</body></html>`;

  // ── Template 2 — Clean Minimal ──
  if (template === 2) return `${baseHead}
<body style="background:#fff;color:#111827;font-family:Georgia,serif;">
<style>
  nav{padding:24px 64px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #e5e7eb;background:white;position:sticky;top:0;z-index:10;}
  .nav-brand{font-size:22px;font-weight:700;color:#111827;letter-spacing:-0.02em;}
  .nav-links{display:flex;gap:32px;font-size:13px;color:#9ca3af;font-family:-apple-system,sans-serif;letter-spacing:0.04em;}
  .nav-cta{padding:10px 28px;background:#111827;color:white;border:none;border-radius:${br};font-size:13px;font-weight:600;cursor:pointer;font-family:-apple-system,sans-serif;}
  .hero{display:grid;grid-template-columns:1fr 1fr;min-height:90vh;}
  .hero-img{overflow:hidden;border-radius:0 0 ${ir} 0;}
  .hero-img img{width:100%;height:100%;object-fit:cover;}
  .hero-right{padding:80px 64px;display:flex;flex-direction:column;justify-content:center;background:#fafaf8;}
  .hero-tag{font-size:10px;font-weight:600;letter-spacing:0.25em;text-transform:uppercase;color:${brandColor};margin-bottom:24px;font-family:-apple-system,sans-serif;}
  .hero-h1{font-size:clamp(32px,4vw,52px);font-weight:400;line-height:1.1;color:#111827;margin-bottom:20px;}
  .hero-sub{font-size:17px;color:#6b7280;line-height:1.8;margin-bottom:36px;font-style:italic;}
  .hero-price{font-size:36px;font-weight:700;color:${brandColor};margin-bottom:8px;font-family:-apple-system,sans-serif;}
  .hero-note{font-size:12px;color:#9ca3af;margin-bottom:28px;font-family:-apple-system,sans-serif;}
  .hero-cta{display:inline-block;padding:16px 40px;background:#111827;color:white;border:none;border-radius:${br};font-size:15px;font-weight:600;cursor:pointer;font-family:-apple-system,sans-serif;max-width:260px;text-align:center;}
  .section{padding:80px 64px;}
  .section-label{font-size:10px;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;color:${brandColor};margin-bottom:16px;font-family:-apple-system,sans-serif;}
  .section-h2{font-size:clamp(28px,3.5vw,40px);font-weight:400;color:#111827;margin-bottom:40px;}
  .benefits{display:grid;grid-template-columns:repeat(3,1fr);gap:48px;}
  .benefit{text-align:center;}
  .benefit-icon{font-size:32px;margin-bottom:16px;}
  .benefit-title{font-size:15px;font-weight:600;color:#111827;margin-bottom:10px;font-family:-apple-system,sans-serif;}
  .benefit-desc{font-size:13px;color:#9ca3af;line-height:1.7;font-family:-apple-system,sans-serif;}
  .reviews{display:grid;grid-template-columns:repeat(3,1fr);gap:32px;margin-top:40px;}
  .review{padding:32px;border:1px solid #e5e7eb;text-align:center;}
  .review-stars{color:#f59e0b;margin-bottom:16px;font-size:14px;}
  .review-text{font-size:15px;color:#374151;line-height:1.8;margin-bottom:20px;font-style:italic;}
  .review-name{font-size:11px;font-weight:600;color:#111827;letter-spacing:0.1em;text-transform:uppercase;font-family:-apple-system,sans-serif;}
  .faq-item{border-bottom:1px solid #e5e7eb;padding:24px 0;max-width:680px;margin:0 auto;}
  .faq-q{font-size:16px;font-weight:600;color:#111827;margin-bottom:10px;font-family:-apple-system,sans-serif;}
  .faq-a{font-size:14px;color:#6b7280;line-height:1.75;font-family:-apple-system,sans-serif;}
  .final-cta{padding:100px 64px;text-align:center;}
  .final-cta h2{font-size:42px;font-weight:400;color:#111827;margin-bottom:16px;}
  .final-cta .price{font-size:36px;font-weight:700;color:${brandColor};margin-bottom:28px;font-family:-apple-system,sans-serif;}
  .final-cta button{padding:18px 56px;background:#111827;color:white;border:none;border-radius:${br};font-size:16px;font-weight:600;cursor:pointer;font-family:-apple-system,sans-serif;}
  .footer{padding:32px 64px;background:#111827;display:flex;justify-content:space-between;align-items:center;}
  .footer-brand{font-size:16px;font-weight:600;color:white;}
  .ember-badge{font-size:11px;padding:5px 12px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.1);border-radius:999px;color:rgba(255,255,255,0.4);}
</style>
<nav>
  <div class="nav-brand">${esc(store.brand)}</div>
  <div class="nav-links"><span>Shop</span><span>About</span><span>FAQ</span></div>
  <button class="nav-cta">${esc(store.cta)}</button>
</nav>
<div class="hero">
  <div class="hero-img"><img src="${img}" alt="${esc(productName)}"></div>
  <div class="hero-right">
    <div class="hero-tag">New Arrival</div>
    <h1 class="hero-h1">${esc(store.headline)}</h1>
    <p class="hero-sub">${esc(store.subheadline)}</p>
    <div class="hero-price">${esc(store.price)}</div>
    <div class="hero-note">Complimentary shipping on all orders</div>
    <button class="hero-cta">${esc(store.cta)}</button>
    <div style="font-size:12px;color:#9ca3af;margin-top:16px;font-family:-apple-system,sans-serif;">⭐⭐⭐⭐⭐ 4.9/5 from 2,400+ reviews</div>
  </div>
</div>
<div class="section" style="background:#fafaf8;border-top:1px solid #e5e7eb;">
  <div class="section-label">About</div>
  <p style="font-size:18px;color:#374151;line-height:2;max-width:720px;">${esc(store.description)}</p>
</div>
<div class="section">
  <div class="section-label">What makes it different</div>
  <div class="benefits">
    ${benefits.map((b,i)=>`<div class="benefit"><div class="benefit-icon">${["✦","◆","●"][i]}</div><div class="benefit-title">${esc(b)}</div><div class="benefit-desc">Crafted for those who demand the best.</div></div>`).join("")}
  </div>
</div>
<div class="section" style="background:#fafaf8;border-top:1px solid #e5e7eb;">
  <div class="section-label" style="text-align:center;">Customer Stories</div>
  <h2 class="section-h2" style="text-align:center;">Trusted by 2,400+</h2>
  <div class="reviews">
    <div class="review"><div class="review-stars">⭐⭐⭐⭐⭐</div><p class="review-text">"Completely exceeded my expectations."</p><div class="review-name">Sarah M.</div></div>
    <div class="review"><div class="review-stars">⭐⭐⭐⭐⭐</div><p class="review-text">"Nothing comes close to this quality."</p><div class="review-name">James T.</div></div>
    <div class="review"><div class="review-stars">⭐⭐⭐⭐⭐</div><p class="review-text">"More premium than I expected."</p><div class="review-name">Priya K.</div></div>
  </div>
</div>
<div class="section" style="border-top:1px solid #e5e7eb;">
  <div class="section-label" style="text-align:center;">Frequently Asked</div>
  <div style="margin-top:32px;">
    <div class="faq-item"><div class="faq-q">How long does shipping take?</div><div class="faq-a">We ship within 1-2 business days. Standard delivery takes 3-5 days.</div></div>
    <div class="faq-item"><div class="faq-q">What's your returns policy?</div><div class="faq-a">Full 30-day no-questions-asked return policy.</div></div>
    <div class="faq-item"><div class="faq-q">Do you offer a warranty?</div><div class="faq-a">Yes — 12-month warranty on all products.</div></div>
  </div>
</div>
<div class="final-cta">
  <h2>Ready to begin?</h2>
  <div class="price">${esc(store.price)}</div>
  <button>${esc(store.cta)}</button>
</div>
<div class="footer">
  <div class="footer-brand">${esc(store.brand)}</div>
  <div class="ember-badge">⚡ Built with Ember 🔥</div>
</div>
</body></html>`;

  // ── Template 3 — Bold Modern ──
  if (template === 3) return `${baseHead}
<body style="background:#fff;">
<style>
  nav{padding:16px 48px;display:flex;justify-content:space-between;align-items:center;background:${brandColor};}
  .nav-brand{font-size:20px;font-weight:800;color:white;letter-spacing:-0.02em;}
  .nav-links{display:flex;gap:28px;font-size:13px;color:rgba(255,255,255,0.75);font-weight:600;}
  .nav-cta{padding:10px 24px;background:white;color:${brandColor};border:none;border-radius:${br};font-size:13px;font-weight:800;cursor:pointer;}
  .hero{background:${brandColor};padding:80px 48px 0;display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:flex-end;}
  .hero-left{padding-bottom:80px;}
  .hero-tag{display:inline-block;padding:6px 16px;background:rgba(255,255,255,0.2);border-radius:999px;font-size:12px;font-weight:700;color:white;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:20px;}
  .hero-h1{font-size:clamp(32px,5vw,60px);font-weight:800;color:white;letter-spacing:-0.03em;line-height:1.05;margin-bottom:20px;}
  .hero-sub{font-size:17px;color:rgba(255,255,255,0.75);line-height:1.7;margin-bottom:32px;}
  .hero-price{font-size:44px;font-weight:800;color:white;letter-spacing:-0.03em;margin-bottom:8px;}
  .hero-note{font-size:12px;color:rgba(255,255,255,0.55);margin-bottom:24px;}
  .hero-cta{display:inline-block;padding:16px 40px;background:white;color:${brandColor};border:none;border-radius:${br};font-size:16px;font-weight:800;cursor:pointer;box-shadow:0 12px 32px rgba(0,0,0,0.2);}
  .hero-img{border-radius:${ir} ${ir} 0 0;overflow:hidden;max-height:480px;}
  .hero-img img{width:100%;height:100%;object-fit:cover;}
  .trust{padding:18px 48px;background:#111827;display:flex;justify-content:center;gap:48px;flex-wrap:wrap;}
  .trust span{font-size:12px;font-weight:600;color:rgba(255,255,255,0.5);}
  .section{padding:80px 48px;}
  .section-accent{display:flex;align-items:center;gap:16px;margin-bottom:40px;}
  .section-bar{height:4px;background:${brandColor};width:40px;border-radius:2px;flex-shrink:0;}
  .section-h2{font-size:clamp(28px,4vw,40px);font-weight:800;color:#111827;letter-spacing:-0.03em;}
  .benefits{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:48px;}
  .benefit{padding:28px;border-left:4px solid ${brandColor};background:#f9fafb;}
  .benefit-num{font-size:28px;font-weight:900;color:${brandColor};margin-bottom:10px;}
  .benefit-title{font-size:15px;font-weight:700;color:#111827;margin-bottom:8px;}
  .benefit-desc{font-size:13px;color:#6b7280;line-height:1.6;}
  .reviews{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;margin-top:40px;}
  .review{padding:28px;background:white;border:1px solid #e5e7eb;border-top:3px solid ${brandColor};}
  .review-stars{color:#f59e0b;margin-bottom:12px;}
  .review-text{font-size:14px;color:#374151;line-height:1.7;margin-bottom:16px;font-style:italic;}
  .review-name{font-size:12px;font-weight:700;color:#111827;}
  .faq-item{border-bottom:1px solid #e5e7eb;padding:24px 0;}
  .faq-q{font-size:16px;font-weight:700;color:#111827;margin-bottom:8px;}
  .faq-a{font-size:14px;color:#6b7280;line-height:1.75;}
  .final-cta{padding:80px 48px;background:${brandColor};text-align:center;}
  .final-cta h2{font-size:40px;font-weight:800;color:white;letter-spacing:-0.03em;margin-bottom:12px;}
  .final-cta .price{font-size:40px;font-weight:800;color:white;margin-bottom:24px;}
  .final-cta button{padding:18px 56px;background:white;color:${brandColor};border:none;border-radius:${br};font-size:17px;font-weight:800;cursor:pointer;box-shadow:0 16px 40px rgba(0,0,0,0.2);}
  .footer{padding:32px 48px;background:#111827;display:flex;justify-content:space-between;align-items:center;}
  .footer-brand{font-size:16px;font-weight:800;color:white;}
  .ember-badge{font-size:11px;padding:5px 12px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.1);border-radius:999px;color:rgba(255,255,255,0.4);}
</style>
<nav>
  <div class="nav-brand">${esc(store.brand)}</div>
  <div class="nav-links"><span>Shop</span><span>About</span><span>Reviews</span></div>
  <button class="nav-cta">${esc(store.cta)}</button>
</nav>
<div class="hero">
  <div class="hero-left">
    <div class="hero-tag">🔥 Trending Now</div>
    <h1 class="hero-h1">${esc(store.headline)}</h1>
    <p class="hero-sub">${esc(store.subheadline)}</p>
    <div class="hero-price">${esc(store.price)}</div>
    <div class="hero-note">Free shipping · Ships in 1-2 days</div>
    <button class="hero-cta">${esc(store.cta)}</button>
  </div>
  <div class="hero-img"><img src="${img}" alt="${esc(productName)}"></div>
</div>
<div class="trust"><span>🚚 Free Shipping</span><span>↩️ 30-Day Returns</span><span>🔒 Secure Checkout</span><span>⭐ 4.9/5 Rating</span></div>
<div class="section">
  <div class="section-accent"><div class="section-bar"></div><h2 class="section-h2">Why ${esc(store.brand)}?</h2></div>
  <p style="font-size:16px;color:#4b5563;line-height:1.8;max-width:640px;margin-bottom:0;">${esc(store.description)}</p>
  <div class="benefits">
    ${benefits.map((b,i)=>`<div class="benefit"><div class="benefit-num">0${i+1}</div><div class="benefit-title">${esc(b)}</div><div class="benefit-desc">Experience the difference.</div></div>`).join("")}
  </div>
</div>
<div class="section" style="background:#f9fafb;border-top:1px solid #e5e7eb;">
  <div class="section-accent"><div class="section-bar"></div><h2 class="section-h2">Real Reviews</h2></div>
  <div class="reviews">
    <div class="review"><div class="review-stars">⭐⭐⭐⭐⭐</div><p class="review-text">"Completely exceeded my expectations."</p><div class="review-name">Sarah M.</div></div>
    <div class="review"><div class="review-stars">⭐⭐⭐⭐⭐</div><p class="review-text">"Nothing comes close to this quality."</p><div class="review-name">James T.</div></div>
    <div class="review"><div class="review-stars">⭐⭐⭐⭐⭐</div><p class="review-text">"More premium than I expected."</p><div class="review-name">Priya K.</div></div>
  </div>
</div>
<div class="section" style="border-top:1px solid #e5e7eb;">
  <div class="section-accent"><div class="section-bar"></div><h2 class="section-h2">Questions?</h2></div>
  <div style="margin-top:32px;">
    <div class="faq-item"><div class="faq-q">How long does shipping take?</div><div class="faq-a">We ship within 1-2 business days. Standard delivery takes 3-5 days.</div></div>
    <div class="faq-item"><div class="faq-q">What's your returns policy?</div><div class="faq-a">Full 30-day no-questions-asked return policy. Refunded in full.</div></div>
    <div class="faq-item"><div class="faq-q">Do you offer a warranty?</div><div class="faq-a">Yes — 12-month warranty against all manufacturing defects.</div></div>
  </div>
</div>
<div class="final-cta">
  <h2>Ready to get started?</h2>
  <div class="price">${esc(store.price)}</div>
  <button>${esc(store.cta)}</button>
  <div style="font-size:13px;color:rgba(255,255,255,0.6);margin-top:16px;">Free shipping · 30-day returns · Secure checkout</div>
</div>
<div class="footer">
  <div class="footer-brand">${esc(store.brand)}</div>
  <div class="ember-badge">⚡ Built with Ember 🔥</div>
</div>
</body></html>`;

  // ── Template 4 — Warm Lifestyle ──
  return `${baseHead}
<body style="background:#fdf8f3;color:#2c1a0e;font-family:Georgia,serif;">
<style>
  nav{padding:20px 56px;display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid #e8d5c4;background:#fdf8f3;position:sticky;top:0;z-index:10;}
  .nav-brand{font-size:22px;font-weight:700;color:#2c1a0e;letter-spacing:-0.02em;}
  .nav-links{display:flex;gap:28px;font-size:13px;color:#9b7b5e;font-family:-apple-system,sans-serif;letter-spacing:0.05em;}
  .nav-cta{padding:10px 24px;background:#4a2c1a;color:white;border:none;border-radius:${br};font-size:13px;font-weight:600;cursor:pointer;font-family:-apple-system,sans-serif;}
  .hero{display:grid;grid-template-columns:1fr 1fr;min-height:85vh;}
  .hero-img{overflow:hidden;border-radius:0 0 0 ${ir};position:relative;}
  .hero-img img{width:100%;height:100%;object-fit:cover;}
  .hero-img::after{content:'';position:absolute;inset:0;background:linear-gradient(to bottom,transparent 60%,rgba(253,248,243,0.3));}
  .hero-right{padding:72px 56px;display:flex;flex-direction:column;justify-content:center;background:#fdf8f3;}
  .hero-tag{font-size:10px;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;color:${brandColor};margin-bottom:20px;font-family:-apple-system,sans-serif;}
  .hero-h1{font-size:clamp(30px,4vw,50px);font-weight:400;line-height:1.1;letter-spacing:-0.02em;color:#2c1a0e;margin-bottom:20px;}
  .hero-sub{font-size:16px;color:#7a5c45;line-height:1.8;margin-bottom:36px;font-style:italic;}
  .hero-price{font-size:36px;font-weight:700;color:${brandColor};margin-bottom:8px;font-family:-apple-system,sans-serif;}
  .hero-note{font-size:12px;color:#b8956a;margin-bottom:28px;font-family:-apple-system,sans-serif;}
  .hero-cta{display:inline-block;padding:16px 40px;background:#4a2c1a;color:white;border:none;border-radius:${br};font-size:15px;font-weight:600;cursor:pointer;font-family:-apple-system,sans-serif;max-width:260px;text-align:center;}
  .section{padding:72px 56px;}
  .section-label{font-size:10px;font-weight:600;letter-spacing:0.2em;text-transform:uppercase;color:${brandColor};margin-bottom:16px;font-family:-apple-system,sans-serif;}
  .section-h2{font-size:clamp(26px,3.5vw,38px);font-weight:400;color:#2c1a0e;margin-bottom:40px;}
  .benefits{display:grid;grid-template-columns:repeat(3,1fr);gap:32px;}
  .benefit{text-align:center;padding:36px 24px;background:#f5ede3;border-radius:${ir};}
  .benefit-icon{font-size:28px;margin-bottom:16px;}
  .benefit-title{font-size:15px;font-weight:600;color:#2c1a0e;margin-bottom:10px;font-family:-apple-system,sans-serif;}
  .benefit-desc{font-size:13px;color:#9b7b5e;line-height:1.7;font-family:-apple-system,sans-serif;}
  .reviews{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-top:40px;}
  .review{padding:28px;background:#fdf8f3;border:1px solid #e8d5c4;border-radius:${ir};}
  .review-stars{color:#f59e0b;margin-bottom:12px;font-size:13px;}
  .review-text{font-size:14px;color:#5a3a25;line-height:1.8;margin-bottom:16px;font-style:italic;}
  .review-name{font-size:12px;font-weight:600;color:#2c1a0e;font-family:-apple-system,sans-serif;}
  .faq-item{border-bottom:1px solid #e8d5c4;padding:24px 0;max-width:680px;margin:0 auto;}
  .faq-q{font-size:15px;font-weight:600;color:#2c1a0e;margin-bottom:10px;font-family:-apple-system,sans-serif;}
  .faq-a{font-size:14px;color:#9b7b5e;line-height:1.75;font-family:-apple-system,sans-serif;}
  .final-cta{padding:80px 56px;text-align:center;background:linear-gradient(135deg,rgba(${rgb},0.08),#f5ede3);border-top:1px solid #e8d5c4;}
  .final-cta h2{font-size:38px;font-weight:400;color:#2c1a0e;margin-bottom:16px;}
  .final-cta .price{font-size:36px;font-weight:700;color:${brandColor};margin-bottom:24px;font-family:-apple-system,sans-serif;}
  .final-cta button{padding:18px 56px;background:#4a2c1a;color:white;border:none;border-radius:${br};font-size:16px;font-weight:600;cursor:pointer;font-family:-apple-system,sans-serif;}
  .footer{padding:32px 56px;background:#2c1a0e;display:flex;justify-content:space-between;align-items:center;}
  .footer-brand{font-size:16px;font-weight:600;color:#e8d5c4;}
  .ember-badge{font-size:11px;padding:5px 12px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.1);border-radius:999px;color:rgba(255,255,255,0.4);}
</style>
<nav>
  <div class="nav-brand">${esc(store.brand)}</div>
  <div class="nav-links"><span>Shop</span><span>About</span><span>Reviews</span></div>
  <button class="nav-cta">${esc(store.cta)}</button>
</nav>
<div class="hero">
  <div class="hero-img"><img src="${img}" alt="${esc(productName)}"></div>
  <div class="hero-right">
    <div class="hero-tag">New In</div>
    <h1 class="hero-h1">${esc(store.headline)}</h1>
    <p class="hero-sub">${esc(store.subheadline)}</p>
    <div class="hero-price">${esc(store.price)}</div>
    <div class="hero-note">Complimentary shipping · Easy returns</div>
    <button class="hero-cta">${esc(store.cta)}</button>
    <div style="font-size:12px;color:#b8956a;margin-top:16px;font-family:-apple-system,sans-serif;">⭐⭐⭐⭐⭐ 4.9/5 from 2,400+ reviews</div>
  </div>
</div>
<div class="section" style="background:#f5ede3;border-top:1px solid #e8d5c4;">
  <div class="section-label">The story</div>
  <p style="font-size:18px;color:#5a3a25;line-height:2;max-width:720px;">${esc(store.description)}</p>
</div>
<div class="section">
  <div class="section-label" style="text-align:center;">What makes it different</div>
  <div class="benefits" style="margin-top:32px;">
    ${benefits.map((b,i)=>`<div class="benefit"><div class="benefit-icon">${["🌿","✨","🌸"][i]}</div><div class="benefit-title">${esc(b)}</div><div class="benefit-desc">Made with intention.</div></div>`).join("")}
  </div>
</div>
<div class="section" style="background:#f5ede3;border-top:1px solid #e8d5c4;">
  <div class="section-label" style="text-align:center;">Our community</div>
  <h2 class="section-h2" style="text-align:center;">2,400+ happy customers</h2>
  <div class="reviews">
    <div class="review"><div class="review-stars">⭐⭐⭐⭐⭐</div><p class="review-text">"Completely exceeded my expectations."</p><div class="review-name">Sarah M.</div></div>
    <div class="review"><div class="review-stars">⭐⭐⭐⭐⭐</div><p class="review-text">"Nothing comes close to this quality."</p><div class="review-name">James T.</div></div>
    <div class="review"><div class="review-stars">⭐⭐⭐⭐⭐</div><p class="review-text">"More premium than I expected."</p><div class="review-name">Priya K.</div></div>
  </div>
</div>
<div class="section" style="border-top:1px solid #e8d5c4;">
  <div class="section-label" style="text-align:center;">Questions & Answers</div>
  <div style="margin-top:32px;">
    <div class="faq-item"><div class="faq-q">How long does shipping take?</div><div class="faq-a">We ship within 1-2 business days. Standard delivery takes 3-5 days.</div></div>
    <div class="faq-item"><div class="faq-q">What's your returns policy?</div><div class="faq-a">Full 30-day no-questions-asked return policy.</div></div>
    <div class="faq-item"><div class="faq-q">Do you offer a warranty?</div><div class="faq-a">Yes — 12-month warranty on all products.</div></div>
  </div>
</div>
<div class="final-cta">
  <h2>Begin your ritual</h2>
  <div class="price">${esc(store.price)}</div>
  <button>${esc(store.cta)}</button>
  <div style="font-size:12px;color:#b8956a;margin-top:16px;font-family:-apple-system,sans-serif;">Complimentary shipping · Easy returns</div>
</div>
<div class="footer">
  <div class="footer-brand">${esc(store.brand)}</div>
  <div class="ember-badge">⚡ Built with Ember 🔥</div>
</div>
</body></html>`;
}