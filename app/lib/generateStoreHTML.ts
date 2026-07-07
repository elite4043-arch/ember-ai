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

<script>
(function(){
  // Ember cart — opens cart drawer on buy button click
  function getSubdomain(){
    var h = window.location.hostname;
    if(h.endsWith(".useember.io")) return h.replace(".useember.io","");
    return null;
  }
  function startCheckout(e){
    if(e){ e.preventDefault(); e.stopPropagation(); }
    var sub = getSubdomain();
    if(!sub){ alert("This is a preview — checkout works on your live store."); return; }
    emberOpenCart();
  }
  // Attach to all buy button classes across all templates (incl. hero-cta)
  var selectors = [".hero-cta",".scroll-cta",".sticky-cta",".header-cta",".final-cta-btn",".d-cta",".d-nav-cta",".d-final-cta",".c-enrol",".c-nav-cta",".sticky-cart-btn",".cta-btn",".nav-cta"];
  function attach(){
    document.querySelectorAll(selectors.join(",")).forEach(function(el){
      if(el.getAttribute("data-ember-checkout")) return;
      el.setAttribute("data-ember-checkout","1");
      el.addEventListener("click", startCheckout);
    });
  }
  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", attach);
  } else { attach(); }
})();
</script>
<style>
#ember-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,0.45);z-index:9998;backdrop-filter:blur(3px);}
#ember-cart{position:fixed;top:0;right:0;bottom:0;width:100%;max-width:400px;background:#fff;z-index:9999;transform:translateX(100%);transition:transform 0.32s cubic-bezier(0.4,0,0.2,1);display:flex;flex-direction:column;box-shadow:-12px 0 60px rgba(0,0,0,0.15);}
#ember-cart.open{transform:translateX(0);}
.ec-head{padding:20px 24px;border-bottom:1px solid #f3f4f6;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;}
.ec-title{font-size:16px;font-weight:700;color:#111827;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-close{width:32px;height:32px;border:none;background:rgba(0,0,0,0.06);border-radius:8px;cursor:pointer;font-size:20px;color:#374151;display:flex;align-items:center;justify-content:center;line-height:1;}
.ec-body{flex:1;padding:24px;overflow-y:auto;}
.ec-item{display:flex;gap:16px;align-items:flex-start;padding-bottom:20px;border-bottom:1px solid #f3f4f6;}
.ec-icon{width:72px;height:72px;background:#f9fafb;border-radius:12px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:28px;}
.ec-name{font-size:14px;font-weight:700;color:#111827;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;margin-bottom:6px;line-height:1.4;}
.ec-price{font-size:17px;font-weight:800;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-qty-row{display:flex;align-items:center;justify-content:space-between;margin-top:20px;}
.ec-qty-label{font-size:14px;color:#6b7280;font-weight:500;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-qty-ctrl{display:flex;align-items:center;border:1.5px solid #e5e7eb;border-radius:10px;overflow:hidden;}
.ec-qty-btn{width:38px;height:38px;border:none;background:#fff;cursor:pointer;font-size:20px;color:#374151;display:flex;align-items:center;justify-content:center;line-height:1;}
.ec-qty-btn:hover{background:#f9fafb;}
.ec-qty-num{width:38px;text-align:center;font-size:15px;font-weight:700;color:#111827;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;line-height:38px;}
.ec-total-row{display:flex;justify-content:space-between;align-items:center;margin-top:16px;padding:16px;background:#f9fafb;border-radius:12px;}
.ec-total-label{font-size:14px;font-weight:600;color:#374151;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-total-val{font-size:20px;font-weight:800;color:#111827;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-trust{margin-top:16px;display:flex;flex-direction:column;gap:8px;}
.ec-trust-item{display:flex;align-items:center;gap:8px;font-size:12px;color:#6b7280;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-foot{padding:20px 24px;border-top:1px solid #f3f4f6;flex-shrink:0;}
.ec-checkout-btn{width:100%;padding:16px;border:none;color:#fff;border-radius:12px;font-size:16px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;letter-spacing:0.01em;transition:opacity 0.15s;}
.ec-checkout-btn:hover{opacity:0.9;}
.ec-continue-btn{width:100%;padding:12px;border:none;background:transparent;color:#9ca3af;font-size:13px;cursor:pointer;margin-top:4px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
@media(max-width:480px){#ember-cart{max-width:100%;}}
</style>
<div id="ember-overlay" onclick="emberCloseCart()"></div>
<div id="ember-cart">
  <div class="ec-head">
    <span class="ec-title">Your bag</span>
    <button class="ec-close" onclick="emberCloseCart()">&#x2715;</button>
  </div>
  <div class="ec-body">
    <div class="ec-item">
      <div class="ec-icon">&#x1F6CD;&#xFE0F;</div>
      <div style="flex:1;min-width:0;">
        <div class="ec-name">${esc(productName)}</div>
        <div class="ec-price" style="color:${brandColor}">${esc(store.price)}</div>
      </div>
    </div>
    <div class="ec-qty-row">
      <span class="ec-qty-label">Quantity</span>
      <div class="ec-qty-ctrl">
        <button class="ec-qty-btn" onclick="emberQty(-1)">&#x2212;</button>
        <span id="ec-qty" class="ec-qty-num">1</span>
        <button class="ec-qty-btn" onclick="emberQty(1)">&#x2B;</button>
      </div>
    </div>
    <div class="ec-total-row">
      <span class="ec-total-label">Order total</span>
      <span id="ec-total" class="ec-total-val">${esc(store.price)}</span>
    </div>
    <div class="ec-trust">
      <div class="ec-trust-item">&#x1F512; Secure checkout powered by Stripe</div>
      <div class="ec-trust-item">&#x21A9;&#xFE0F; 30-day money-back guarantee</div>
      <div class="ec-trust-item">&#x26A1; Instant confirmation after purchase</div>
    </div>
  </div>
  <div class="ec-foot">
    <button id="ec-btn" class="ec-checkout-btn" style="background:${brandColor}" onclick="emberCheckout()">Checkout &#x2192; <span id="ec-btn-price">${esc(store.price)}</span></button>
    <button class="ec-continue-btn" onclick="emberCloseCart()">Continue shopping</button>
  </div>
</div>
<script>
(function(){
  var ecBase=parseFloat("${esc(store.price)}".replace(/[^0-9.]/g,""))*100|0,ecQty=1;
  function ecFmt(p){return"£"+(p/100).toFixed(2);}
  window.emberQty=function(d){
    ecQty=Math.max(1,Math.min(ecQty+d,10));
    document.getElementById("ec-qty").textContent=ecQty;
    var t=ecFmt(ecBase*ecQty);
    document.getElementById("ec-total").textContent=t;
    document.getElementById("ec-btn-price").textContent=t;
  };
  window.emberOpenCart=function(){
    document.getElementById("ember-cart").classList.add("open");
    document.getElementById("ember-overlay").style.display="block";
    document.body.style.overflow="hidden";
  };
  window.emberCloseCart=function(){
    document.getElementById("ember-cart").classList.remove("open");
    document.getElementById("ember-overlay").style.display="none";
    document.body.style.overflow="";
  };
  window.emberCheckout=async function(){
    var sub=window.location.hostname.endsWith(".useember.io")?window.location.hostname.replace(".useember.io",""):null;
    if(!sub){alert("Checkout works on your live store.");return;}
    var btn=document.getElementById("ec-btn"),orig=btn.innerHTML;
    btn.textContent="Processing…";btn.style.opacity="0.6";btn.style.pointerEvents="none";
    try{
      var r=await fetch("/api/stripe/checkout",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({subdomain:sub,quantity:ecQty})
      });
      var d=await r.json();
      if(d.url){window.location.href=d.url;}
      else{alert(d.error||"Payments not set up yet.");btn.innerHTML=orig;btn.style.opacity="1";btn.style.pointerEvents="auto";}
    }catch(e){alert("Something went wrong — please try again.");btn.innerHTML=orig;btn.style.opacity="1";btn.style.pointerEvents="auto";}
  };
})();
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


// ─── Product-specific reviews ─────────────────────────────────
function getProductReviews(productName: string): { stars: string; text: string; name: string; country: string; verified: boolean }[] {
  const map: Record<string, { stars: string; text: string; name: string; country: string; verified: boolean }[]> = {
    "Resistance Bands": [
      { stars:"⭐⭐⭐⭐⭐", text:"Used these every day for 4 months. Still no signs of snapping. My physio recommended them and I can see why — the tension is really consistent.", name:"Jake M.", country:"UK", verified:true },
      { stars:"⭐⭐⭐⭐⭐", text:"I travel a lot for work and these are the only gym kit I bring. Full workout in a hotel room. Couldn't live without them now.", name:"Sarah T.", country:"US", verified:true },
      { stars:"⭐⭐⭐⭐⭐", text:"Bought the set after seeing them on TikTok and they actually live up to the hype. Glutes are on fire after every session.", name:"Priya K.", country:"AU", verified:true },
    ],
    "LED Face Mask": [
      { stars:"⭐⭐⭐⭐⭐", text:"4 weeks in and my skin texture has genuinely changed. My esthetician asked what I was doing differently. I showed her this mask.", name:"Emma R.", country:"UK", verified:true },
      { stars:"⭐⭐⭐⭐⭐", text:"Was sceptical but the red light has visibly reduced the fine lines around my mouth. Using it 3x a week before bed.", name:"Chloe D.", country:"US", verified:true },
      { stars:"⭐⭐⭐⭐⭐", text:"Clinic-level results without clinic prices. The blue light cleared my forehead breakouts in under 3 weeks.", name:"Amara S.", country:"CA", verified:true },
    ],
    "Ice Roller": [
      { stars:"⭐⭐⭐⭐⭐", text:"This is the first thing I reach for every morning. Puffiness gone in 5 minutes. My whole morning routine has changed around it.", name:"Lily P.", country:"UK", verified:true },
      { stars:"⭐⭐⭐⭐⭐", text:"Used it after a long-haul flight and honestly looked human again within minutes. Travel essential now.", name:"Georgia W.", country:"AU", verified:true },
      { stars:"⭐⭐⭐⭐⭐", text:"Keeps cold for so long. I store mine in the freezer overnight and it's still cold an hour after I start using it.", name:"Nina B.", country:"US", verified:true },
    ],
    "Auto Pet Feeder": [
      { stars:"⭐⭐⭐⭐⭐", text:"Finally sleep through the night without my cat waking me at 5am. Worth every penny. The app is really simple too.", name:"Tom H.", country:"UK", verified:true },
      { stars:"⭐⭐⭐⭐⭐", text:"Set it up in 10 minutes. My dog has been on a diet for 3 weeks and this thing has made portion control completely effortless.", name:"Rachel M.", country:"US", verified:true },
      { stars:"⭐⭐⭐⭐⭐", text:"Went on holiday for a week and my neighbour just topped up the food once. Game changer for pet owners who travel.", name:"David L.", country:"AU", verified:true },
    ],
    "Magnetic Spice Rack": [
      { stars:"⭐⭐⭐⭐⭐", text:"Mounted it in 15 minutes and my kitchen looks like something from a magazine. My spices have never been more organised.", name:"Claire S.", country:"UK", verified:true },
      { stars:"⭐⭐⭐⭐⭐", text:"Holds way more than I expected. All 24 spice jars fit and still feel totally secure. Couldn't be happier.", name:"Mike D.", country:"US", verified:true },
      { stars:"⭐⭐⭐⭐⭐", text:"The magnets are strong — nothing has fallen off in 6 months. Kitchen transformation complete.", name:"Sophie R.", country:"CA", verified:true },
    ],
    "Wireless Charging Stand": [
      { stars:"⭐⭐⭐⭐⭐", text:"Charges faster than my old cable did. The desk looks so much cleaner now. Bought two — one for home one for the office.", name:"James T.", country:"UK", verified:true },
      { stars:"⭐⭐⭐⭐⭐", text:"Works through my phone case which I didn't expect. Really solid build quality too — nothing cheap feeling about it.", name:"Alex P.", country:"US", verified:true },
      { stars:"⭐⭐⭐⭐⭐", text:"My partner bought the same one after seeing mine. Great gift idea too.", name:"Hannah C.", country:"AU", verified:true },
    ],
    "Massage Gun": [
      { stars:"⭐⭐⭐⭐⭐", text:"My physio charges £60 an hour and this gun does 80% of what she does. I use it after every run. DOMS are basically gone.", name:"Chris B.", country:"UK", verified:true },
      { stars:"⭐⭐⭐⭐⭐", text:"Quiet enough to use watching TV. My husband doesn't even notice. Battery lasts ages.", name:"Lauren H.", country:"US", verified:true },
      { stars:"⭐⭐⭐⭐⭐", text:"Night and day difference in my recovery. Went from 2 days of soreness to waking up fine the next morning.", name:"Sam N.", country:"CA", verified:true },
    ],
    "Aromatherapy Diffuser": [
      { stars:"⭐⭐⭐⭐⭐", text:"My whole living room smells amazing now. The LED colours are a nice touch — use the warm orange in the evenings.", name:"Kate F.", country:"UK", verified:true },
      { stars:"⭐⭐⭐⭐⭐", text:"Runs quietly all night. Woke up actually feeling rested for the first time in months after using lavender oil.", name:"Zoe M.", country:"AU", verified:true },
      { stars:"⭐⭐⭐⭐⭐", text:"Looks beautiful on my bedside table. Doesn't look cheap at all — exactly what the photos show.", name:"Anna T.", country:"US", verified:true },
    ],
    "Crossbody Bag": [
      { stars:"⭐⭐⭐⭐⭐", text:"Perfect size for a day out. My phone, wallet, keys and lip balm all fit easily. The strap length is really adjustable.", name:"Mia C.", country:"UK", verified:true },
      { stars:"⭐⭐⭐⭐⭐", text:"Wore it all day at a festival — it didn't bounce around at all. The zip is smooth and the interior is well organised.", name:"Jess P.", country:"US", verified:true },
      { stars:"⭐⭐⭐⭐⭐", text:"So many compliments on this bag. Premium feel but not the premium price tag.", name:"Fatima A.", country:"CA", verified:true },
    ],
    "Adjustable Dumbbells": [
      { stars:"⭐⭐⭐⭐⭐", text:"Replaced an entire rack of weights. My garage gym is completely transformed and I saved hundreds.", name:"Mark J.", country:"UK", verified:true },
      { stars:"⭐⭐⭐⭐⭐", text:"The dial system is smooth and quick. Switching weights between sets takes 3 seconds, not 30.", name:"Dan K.", country:"US", verified:true },
      { stars:"⭐⭐⭐⭐⭐", text:"Build quality is excellent. Nothing rattles or feels loose. These are going to last years.", name:"Ryan T.", country:"AU", verified:true },
    ],
  };

  const defaultReviews = [
    { stars:"⭐⭐⭐⭐⭐", text:"Really impressed with the quality. Arrived well packaged and exactly as described. Would absolutely buy again.", name:"Sarah M.", country:"UK", verified:true },
    { stars:"⭐⭐⭐⭐⭐", text:"Fast delivery and the product works exactly as expected. Great value for money.", name:"James T.", country:"US", verified:true },
    { stars:"⭐⭐⭐⭐⭐", text:"Bought this after seeing it recommended online. Very happy with the purchase. Does exactly what it says.", name:"Priya K.", country:"AU", verified:true },
  ];

  return map[productName] || defaultReviews;
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

  // ── SEO meta ────────────────────────────────────────────────
  const metaDesc = `Buy ${esc(productName)} from ${esc(store.brand)}. ${esc(store.subheadline)}. Free UK shipping. 30-day returns. Secure checkout.`;
  const subdomain = store.brand.toLowerCase().replace(/\s+/g,"-");
  const storeUrl = `https://${subdomain}.useember.io`;
  const productSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Product",
    "name": store.brand + " " + productName,
    "description": store.description,
    "brand": { "@type": "Brand", "name": store.brand },
    "offers": {
      "@type": "Offer",
      "url": storeUrl,
      "priceCurrency": "GBP",
      "price": store.price?.replace(/[^0-9.]/g,"") || "0",
      "availability": "https://schema.org/InStock",
      "seller": { "@type": "Organization", "name": store.brand }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "47"
    }
  });

  const orgSchema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": store.brand,
    "url": storeUrl,
    "description": store.description
  });

  const baseHead = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">

<!-- Primary SEO -->
<title>\${esc(store.brand)} — \${esc(productName)} | Free UK Shipping</title>
<meta name="description" content="\${metaDesc}">
<meta name="robots" content="index, follow">
<link rel="canonical" href="\${storeUrl}">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="product">
<meta property="og:url" content="\${storeUrl}">
<meta property="og:title" content="\${esc(store.brand)} — \${esc(productName)}">
<meta property="og:description" content="\${metaDesc}">
<meta property="og:image" content="\${img}">
<meta property="og:site_name" content="\${esc(store.brand)}">
<meta property="product:price:amount" content="\${store.price?.replace(/[^0-9.]/g,'') || '0'}">
<meta property="product:price:currency" content="GBP">

<!-- Twitter Card -->
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="\${esc(store.brand)} — \${esc(productName)}">
<meta name="twitter:description" content="\${metaDesc}">
<meta name="twitter:image" content="\${img}">

<!-- Product Schema -->
<script type="application/ld+json">\${productSchema}</script>

<!-- Organisation Schema -->
<script type="application/ld+json">\${orgSchema}</script>

<!-- Favicon -->
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🔥</text></svg>">

<style>*{margin:0;padding:0;box-sizing:border-box;}body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#1f2937;}img{display:block;max-width:100%;}.container{max-width:1100px;margin:0 auto;padding:0 40px;}</style>
</head>`;

  // ── Template 1 — Dark Editorial ──
  if (template === 1) return `${baseHead}
<body style="background:#0a0a0a;color:white;">
<div style="background:${brandColor};padding:10px;text-align:center;font-size:12px;font-weight:700;color:white;letter-spacing:0.06em;">🚚 FREE UK SHIPPING ON ALL ORDERS &nbsp;·&nbsp; 30-DAY RETURNS &nbsp;·&nbsp; USE CODE <span style="text-decoration:underline">WELCOME10</span> FOR 10% OFF</div>
<style>

  /* ── Mobile responsive ─────────────────────── */
  @media(max-width:768px){
    nav{padding:14px 20px!important;}
    .nav-links{display:none!important;}
    .hero{grid-template-columns:1fr!important;min-height:auto!important;}
    .hero-left,.hero-right{padding:32px 20px!important;}
    .hero-img{height:300px!important;}
    .hero-right img{height:300px!important;object-fit:cover!important;}
    .benefits{grid-template-columns:1fr!important;gap:12px!important;}
    .reviews{grid-template-columns:1fr!important;}
    .section{padding:40px 20px!important;}
    .final-cta{padding:48px 20px!important;}
    .footer{padding:20px!important;flex-direction:column!important;gap:12px!important;text-align:center!important;}
    .sticky-cart{display:flex!important;}
  }
  /* ── Sticky cart ────────────────────────────── */
  .sticky-cart{
    display:none;
    position:fixed;bottom:0;left:0;right:0;
    background:white;border-top:1px solid #e5e7eb;
    padding:12px 20px;z-index:100;
    align-items:center;justify-content:space-between;
    gap:12px;box-shadow:0 -4px 20px rgba(0,0,0,0.08);
  }
  .sticky-cart-info{display:flex;flex-direction:column;}
  .sticky-cart-name{font-size:13px;font-weight:700;color:#111827;}
  .sticky-cart-price{font-size:13px;color:#6b7280;}
  .sticky-cart-btn{
    padding:12px 24px;border:none;border-radius:10px;
    font-size:14px;font-weight:700;cursor:pointer;
    white-space:nowrap;min-width:140px;text-align:center;
  }
  /* ── Quantity selector ──────────────────────── */
  .qty-wrap{display:flex;align-items:center;gap:0;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;margin-bottom:16px;width:fit-content;}
  .qty-btn{width:40px;height:40px;background:white;border:none;font-size:18px;cursor:pointer;font-weight:300;color:#374151;}
  .qty-num{width:48px;text-align:center;font-size:15px;font-weight:600;color:#111827;border:none;background:white;}
  /* ── Trust badges ───────────────────────────── */
  .trust-badges{display:flex;gap:8px;flex-wrap:wrap;margin-top:16px;}
  .trust-badge{display:flex;align-items:center;gap:5px;font-size:11px;font-weight:600;color:#6b7280;background:#f9fafb;border:1px solid #e5e7eb;padding:5px 10px;border-radius:6px;}
  /* ── Payment icons ──────────────────────────── */
  .payment-icons{display:flex;gap:6px;margin-top:12px;flex-wrap:wrap;align-items:center;}
  .payment-icon{height:22px;background:#f3f4f6;border:1px solid #e5e7eb;border-radius:4px;padding:2px 6px;font-size:9px;font-weight:800;color:#374151;display:flex;align-items:center;}
  /* ── Urgency bar ────────────────────────────── */
  .urgency{display:flex;align-items:center;gap:8px;font-size:12px;font-weight:600;color:#DC2626;margin-bottom:14px;}
  .urgency-dot{width:8px;height:8px;border-radius:50%;background:#DC2626;animation:pulse 1.5s infinite;}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}

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
    <div style="display:flex;align-items:center;gap:16px;padding:10px 0;margin-bottom:14px;flex-wrap:wrap;">
  <div style="display:flex;align-items:center;gap:6px;font-size:12px;font-weight:600;color:#16a34a;">
    <div style="width:8px;height:8px;border-radius:50%;background:#16a34a;animation:pulse 1.5s infinite;"></div>
    <span id="viewers">14</span> people viewing this now
  </div>
  <div style="font-size:12px;color:#6b7280;font-weight:500;">🔥 <span id="sold_count">47</span> sold in last 24 hours</div>
</div>
<script>
  // Randomise social proof numbers for authenticity
  document.getElementById('viewers').textContent = Math.floor(Math.random()*(24-8)+8);
  document.getElementById('sold_count').textContent = Math.floor(Math.random()*(89-31)+31);
</script>
    <div class="urgency"><div class="urgency-dot"></div>Only 23 units left — order soon</div>
    <div class="qty-wrap"><button class="qty-btn" onclick="var n=document.getElementById('qty');n.value=Math.max(1,+n.value-1)">−</button><input id="qty" class="qty-num" value="1" readonly><button class="qty-btn" onclick="var n=document.getElementById('qty');n.value=+n.value+1">+</button></div>
    <button class="hero-cta">${esc(store.cta)}</button>
    <div class="trust-badges"><span class="trust-badge" style="background:rgba(255,255,255,0.05);border-color:rgba(255,255,255,0.1);color:rgba(255,255,255,0.5);">🚚 Free shipping</span><span class="trust-badge" style="background:rgba(255,255,255,0.05);border-color:rgba(255,255,255,0.1);color:rgba(255,255,255,0.5);">↩️ 30-day returns</span><span class="trust-badge" style="background:rgba(255,255,255,0.05);border-color:rgba(255,255,255,0.1);color:rgba(255,255,255,0.5);">🔒 Secure checkout</span></div>
    <div class="payment-icons"><span class="payment-icon" style="background:rgba(255,255,255,0.08);border-color:rgba(255,255,255,0.12);color:rgba(255,255,255,0.6);">VISA</span><span class="payment-icon" style="background:rgba(255,255,255,0.08);border-color:rgba(255,255,255,0.12);color:rgba(255,255,255,0.6);">MC</span><span class="payment-icon" style="background:rgba(255,255,255,0.08);border-color:rgba(255,255,255,0.12);color:rgba(255,255,255,0.6);" style="background:rgba(255,255,255,0.15);color:white;border-color:rgba(255,255,255,0.2);">🍎 Pay</span><span class="payment-icon" style="background:rgba(255,255,255,0.08);border-color:rgba(255,255,255,0.12);color:rgba(255,255,255,0.6);" style="background:#4285F4;color:white;border-color:#4285F4;">G Pay</span></div>
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
      ${getProductReviews(productName).map(r=>`<div class="review"><div class="review-stars">${r.stars}</div><p class="review-text">"${r.text}"</p><div class="review-name">${r.name} · ${r.country}${r.verified?' <span style="color:#16a34a;font-size:10px;">✓ Verified</span>':''}</div></div>`).join("")}
    </div>
  </div>
</div>
<div class="section" style="background:#111;border-top:1px solid rgba(255,255,255,0.06);">
  <div class="container">
    <div class="section-label">See it in action</div>
    <h2 class="section-h2">Watch before you buy</h2>
    <div style="margin-top:32px;background:#0a0a0a;border:1px solid rgba(255,255,255,0.08);border-radius:16px;aspect-ratio:16/9;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;">
      <div style="text-align:center;padding:40px;">
        <div style="width:72px;height:72px;background:${brandColor};border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;cursor:pointer;">
          <div style="width:0;height:0;border-top:14px solid transparent;border-bottom:14px solid transparent;border-left:22px solid white;margin-left:4px;"></div>
        </div>
        <div style="font-size:14px;color:rgba(255,255,255,0.4);">Add your product video URL here in the dashboard</div>
      </div>
    </div>
  </div>
</div>
<div class="section" style="background:#0a0a0a;border-top:1px solid rgba(255,255,255,0.06);">
  <div class="container">
    <div class="section-label">Frequently bought together</div>
    <h2 class="section-h2">Complete the set</h2>
    <div style="margin-top:32px;display:flex;align-items:center;gap:16px;flex-wrap:wrap;">
      <div style="flex:1;min-width:200px;background:#111;border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:20px;text-align:center;">
        <div style="font-size:24px;margin-bottom:8px;">📦</div>
        <div style="font-size:14px;font-weight:700;color:white;margin-bottom:4px;">${esc(productName)}</div>
        <div style="font-size:13px;color:${brandColor};font-weight:700;">${esc(store.price)}</div>
      </div>
      <div style="font-size:24px;color:rgba(255,255,255,0.3);font-weight:300;">+</div>
      <div style="flex:1;min-width:200px;background:#111;border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:20px;text-align:center;opacity:0.7;">
        <div style="font-size:24px;margin-bottom:8px;">🎁</div>
        <div style="font-size:14px;font-weight:700;color:white;margin-bottom:4px;">Starter Bundle</div>
        <div style="font-size:13px;color:rgba(255,255,255,0.4);">Accessories included</div>
      </div>
      <div style="font-size:24px;color:rgba(255,255,255,0.3);font-weight:300;">=</div>
      <div style="flex:1;min-width:200px;background:rgba(${rgb},0.1);border:1px solid rgba(${rgb},0.25);border-radius:14px;padding:20px;text-align:center;">
        <div style="font-size:12px;color:${brandColor};font-weight:700;margin-bottom:8px;text-transform:uppercase;letter-spacing:0.08em;">Bundle Deal</div>
        <div style="font-size:22px;font-weight:800;color:white;margin-bottom:4px;">Save 15%</div>
        <button style="background:${brandColor};color:white;border:none;border-radius:10px;padding:10px 20px;font-size:13px;font-weight:700;cursor:pointer;width:100%;">Add bundle</button>
      </div>
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
<div class="sticky-cart" style="background:#0a0a0a;border-top:1px solid rgba(255,255,255,0.1);">
  <div class="sticky-cart-info">
    <span class="sticky-cart-name" style="color:white;">${esc(productName)}</span>
    <span class="sticky-cart-price" style="color:rgba(255,255,255,0.5);">${esc(store.price)}</span>
  </div>
  <button class="sticky-cart-btn" style="background:${brandColor};color:white;">${esc(store.cta)}</button>
</div>
<script>
(function(){
  // Ember cart — opens cart drawer on buy button click
  function getSubdomain(){
    var h = window.location.hostname;
    if(h.endsWith(".useember.io")) return h.replace(".useember.io","");
    return null;
  }
  function startCheckout(e){
    if(e){ e.preventDefault(); e.stopPropagation(); }
    var sub = getSubdomain();
    if(!sub){ alert("This is a preview — checkout works on your live store."); return; }
    emberOpenCart();
  }
  // Attach to all buy button classes across all templates (incl. hero-cta)
  var selectors = [".hero-cta",".scroll-cta",".sticky-cta",".header-cta",".final-cta-btn",".d-cta",".d-nav-cta",".d-final-cta",".c-enrol",".c-nav-cta",".sticky-cart-btn",".cta-btn",".nav-cta"];
  function attach(){
    document.querySelectorAll(selectors.join(",")).forEach(function(el){
      if(el.getAttribute("data-ember-checkout")) return;
      el.setAttribute("data-ember-checkout","1");
      el.addEventListener("click", startCheckout);
    });
  }
  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", attach);
  } else { attach(); }
})();
</script>
<style>
#ember-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,0.45);z-index:9998;backdrop-filter:blur(3px);}
#ember-cart{position:fixed;top:0;right:0;bottom:0;width:100%;max-width:400px;background:#fff;z-index:9999;transform:translateX(100%);transition:transform 0.32s cubic-bezier(0.4,0,0.2,1);display:flex;flex-direction:column;box-shadow:-12px 0 60px rgba(0,0,0,0.15);}
#ember-cart.open{transform:translateX(0);}
.ec-head{padding:20px 24px;border-bottom:1px solid #f3f4f6;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;}
.ec-title{font-size:16px;font-weight:700;color:#111827;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-close{width:32px;height:32px;border:none;background:rgba(0,0,0,0.06);border-radius:8px;cursor:pointer;font-size:20px;color:#374151;display:flex;align-items:center;justify-content:center;line-height:1;}
.ec-body{flex:1;padding:24px;overflow-y:auto;}
.ec-item{display:flex;gap:16px;align-items:flex-start;padding-bottom:20px;border-bottom:1px solid #f3f4f6;}
.ec-icon{width:72px;height:72px;background:#f9fafb;border-radius:12px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:28px;}
.ec-name{font-size:14px;font-weight:700;color:#111827;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;margin-bottom:6px;line-height:1.4;}
.ec-price{font-size:17px;font-weight:800;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-qty-row{display:flex;align-items:center;justify-content:space-between;margin-top:20px;}
.ec-qty-label{font-size:14px;color:#6b7280;font-weight:500;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-qty-ctrl{display:flex;align-items:center;border:1.5px solid #e5e7eb;border-radius:10px;overflow:hidden;}
.ec-qty-btn{width:38px;height:38px;border:none;background:#fff;cursor:pointer;font-size:20px;color:#374151;display:flex;align-items:center;justify-content:center;line-height:1;}
.ec-qty-btn:hover{background:#f9fafb;}
.ec-qty-num{width:38px;text-align:center;font-size:15px;font-weight:700;color:#111827;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;line-height:38px;}
.ec-total-row{display:flex;justify-content:space-between;align-items:center;margin-top:16px;padding:16px;background:#f9fafb;border-radius:12px;}
.ec-total-label{font-size:14px;font-weight:600;color:#374151;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-total-val{font-size:20px;font-weight:800;color:#111827;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-trust{margin-top:16px;display:flex;flex-direction:column;gap:8px;}
.ec-trust-item{display:flex;align-items:center;gap:8px;font-size:12px;color:#6b7280;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-foot{padding:20px 24px;border-top:1px solid #f3f4f6;flex-shrink:0;}
.ec-checkout-btn{width:100%;padding:16px;border:none;color:#fff;border-radius:12px;font-size:16px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;letter-spacing:0.01em;transition:opacity 0.15s;}
.ec-checkout-btn:hover{opacity:0.9;}
.ec-continue-btn{width:100%;padding:12px;border:none;background:transparent;color:#9ca3af;font-size:13px;cursor:pointer;margin-top:4px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
@media(max-width:480px){#ember-cart{max-width:100%;}}
</style>
<div id="ember-overlay" onclick="emberCloseCart()"></div>
<div id="ember-cart">
  <div class="ec-head">
    <span class="ec-title">Your bag</span>
    <button class="ec-close" onclick="emberCloseCart()">&#x2715;</button>
  </div>
  <div class="ec-body">
    <div class="ec-item">
      <div class="ec-icon">&#x1F6CD;&#xFE0F;</div>
      <div style="flex:1;min-width:0;">
        <div class="ec-name">${esc(productName)}</div>
        <div class="ec-price" style="color:${brandColor}">${esc(store.price)}</div>
      </div>
    </div>
    <div class="ec-qty-row">
      <span class="ec-qty-label">Quantity</span>
      <div class="ec-qty-ctrl">
        <button class="ec-qty-btn" onclick="emberQty(-1)">&#x2212;</button>
        <span id="ec-qty" class="ec-qty-num">1</span>
        <button class="ec-qty-btn" onclick="emberQty(1)">&#x2B;</button>
      </div>
    </div>
    <div class="ec-total-row">
      <span class="ec-total-label">Order total</span>
      <span id="ec-total" class="ec-total-val">${esc(store.price)}</span>
    </div>
    <div class="ec-trust">
      <div class="ec-trust-item">&#x1F512; Secure checkout powered by Stripe</div>
      <div class="ec-trust-item">&#x21A9;&#xFE0F; 30-day money-back guarantee</div>
      <div class="ec-trust-item">&#x26A1; Instant confirmation after purchase</div>
    </div>
  </div>
  <div class="ec-foot">
    <button id="ec-btn" class="ec-checkout-btn" style="background:${brandColor}" onclick="emberCheckout()">Checkout &#x2192; <span id="ec-btn-price">${esc(store.price)}</span></button>
    <button class="ec-continue-btn" onclick="emberCloseCart()">Continue shopping</button>
  </div>
</div>
<script>
(function(){
  var ecBase=parseFloat("${esc(store.price)}".replace(/[^0-9.]/g,""))*100|0,ecQty=1;
  function ecFmt(p){return"£"+(p/100).toFixed(2);}
  window.emberQty=function(d){
    ecQty=Math.max(1,Math.min(ecQty+d,10));
    document.getElementById("ec-qty").textContent=ecQty;
    var t=ecFmt(ecBase*ecQty);
    document.getElementById("ec-total").textContent=t;
    document.getElementById("ec-btn-price").textContent=t;
  };
  window.emberOpenCart=function(){
    document.getElementById("ember-cart").classList.add("open");
    document.getElementById("ember-overlay").style.display="block";
    document.body.style.overflow="hidden";
  };
  window.emberCloseCart=function(){
    document.getElementById("ember-cart").classList.remove("open");
    document.getElementById("ember-overlay").style.display="none";
    document.body.style.overflow="";
  };
  window.emberCheckout=async function(){
    var sub=window.location.hostname.endsWith(".useember.io")?window.location.hostname.replace(".useember.io",""):null;
    if(!sub){alert("Checkout works on your live store.");return;}
    var btn=document.getElementById("ec-btn"),orig=btn.innerHTML;
    btn.textContent="Processing…";btn.style.opacity="0.6";btn.style.pointerEvents="none";
    try{
      var r=await fetch("/api/stripe/checkout",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({subdomain:sub,quantity:ecQty})
      });
      var d=await r.json();
      if(d.url){window.location.href=d.url;}
      else{alert(d.error||"Payments not set up yet.");btn.innerHTML=orig;btn.style.opacity="1";btn.style.pointerEvents="auto";}
    }catch(e){alert("Something went wrong — please try again.");btn.innerHTML=orig;btn.style.opacity="1";btn.style.pointerEvents="auto";}
  };
})();
</script>
</body></html>`;

  // ── Template 2 — Clean Minimal ──
  if (template === 2) return `${baseHead}
<body style="background:#fff;color:#111827;font-family:Georgia,serif;">
<div style="background:#111827;padding:10px;text-align:center;font-size:12px;font-weight:700;color:white;letter-spacing:0.06em;">🚚 FREE UK SHIPPING ON ALL ORDERS &nbsp;·&nbsp; 30-DAY RETURNS &nbsp;·&nbsp; USE CODE <span style="text-decoration:underline">WELCOME10</span> FOR 10% OFF</div>
<style>

  /* ── Mobile responsive ─────────────────────── */
  @media(max-width:768px){
    nav{padding:14px 20px!important;}
    .nav-links{display:none!important;}
    .hero{grid-template-columns:1fr!important;min-height:auto!important;}
    .hero-left,.hero-right{padding:32px 20px!important;}
    .hero-img{height:300px!important;}
    .hero-right img{height:300px!important;object-fit:cover!important;}
    .benefits{grid-template-columns:1fr!important;gap:12px!important;}
    .reviews{grid-template-columns:1fr!important;}
    .section{padding:40px 20px!important;}
    .final-cta{padding:48px 20px!important;}
    .footer{padding:20px!important;flex-direction:column!important;gap:12px!important;text-align:center!important;}
    .sticky-cart{display:flex!important;}
  }
  /* ── Sticky cart ────────────────────────────── */
  .sticky-cart{
    display:none;
    position:fixed;bottom:0;left:0;right:0;
    background:white;border-top:1px solid #e5e7eb;
    padding:12px 20px;z-index:100;
    align-items:center;justify-content:space-between;
    gap:12px;box-shadow:0 -4px 20px rgba(0,0,0,0.08);
  }
  .sticky-cart-info{display:flex;flex-direction:column;}
  .sticky-cart-name{font-size:13px;font-weight:700;color:#111827;}
  .sticky-cart-price{font-size:13px;color:#6b7280;}
  .sticky-cart-btn{
    padding:12px 24px;border:none;border-radius:10px;
    font-size:14px;font-weight:700;cursor:pointer;
    white-space:nowrap;min-width:140px;text-align:center;
  }
  /* ── Quantity selector ──────────────────────── */
  .qty-wrap{display:flex;align-items:center;gap:0;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;margin-bottom:16px;width:fit-content;}
  .qty-btn{width:40px;height:40px;background:white;border:none;font-size:18px;cursor:pointer;font-weight:300;color:#374151;}
  .qty-num{width:48px;text-align:center;font-size:15px;font-weight:600;color:#111827;border:none;background:white;}
  /* ── Trust badges ───────────────────────────── */
  .trust-badges{display:flex;gap:8px;flex-wrap:wrap;margin-top:16px;}
  .trust-badge{display:flex;align-items:center;gap:5px;font-size:11px;font-weight:600;color:#6b7280;background:#f9fafb;border:1px solid #e5e7eb;padding:5px 10px;border-radius:6px;}
  /* ── Payment icons ──────────────────────────── */
  .payment-icons{display:flex;gap:6px;margin-top:12px;flex-wrap:wrap;align-items:center;}
  .payment-icon{height:22px;background:#f3f4f6;border:1px solid #e5e7eb;border-radius:4px;padding:2px 6px;font-size:9px;font-weight:800;color:#374151;display:flex;align-items:center;}
  /* ── Urgency bar ────────────────────────────── */
  .urgency{display:flex;align-items:center;gap:8px;font-size:12px;font-weight:600;color:#DC2626;margin-bottom:14px;}
  .urgency-dot{width:8px;height:8px;border-radius:50%;background:#DC2626;animation:pulse 1.5s infinite;}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}

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
    <div style="display:flex;align-items:center;gap:16px;padding:10px 0;margin-bottom:14px;flex-wrap:wrap;">
  <div style="display:flex;align-items:center;gap:6px;font-size:12px;font-weight:600;color:#16a34a;">
    <div style="width:8px;height:8px;border-radius:50%;background:#16a34a;animation:pulse 1.5s infinite;"></div>
    <span id="viewers">14</span> people viewing this now
  </div>
  <div style="font-size:12px;color:#6b7280;font-weight:500;">🔥 <span id="sold_count">47</span> sold in last 24 hours</div>
</div>
<script>
  // Randomise social proof numbers for authenticity
  document.getElementById('viewers').textContent = Math.floor(Math.random()*(24-8)+8);
  document.getElementById('sold_count').textContent = Math.floor(Math.random()*(89-31)+31);
</script>
    <div class="urgency"><div class="urgency-dot"></div>Only 23 units left — order soon</div>
    <div class="qty-wrap"><button class="qty-btn" onclick="var n=document.getElementById('qty');n.value=Math.max(1,+n.value-1)">−</button><input id="qty" class="qty-num" value="1" readonly><button class="qty-btn" onclick="var n=document.getElementById('qty');n.value=+n.value+1">+</button></div>
    <button class="hero-cta">${esc(store.cta)}</button>
    <div class="trust-badges"><span class="trust-badge">🚚 Free shipping</span><span class="trust-badge">↩️ 30-day returns</span><span class="trust-badge">🔒 Secure checkout</span></div>
    <div class="payment-icons"><span class="payment-icon">VISA</span><span class="payment-icon">MC</span><span class="payment-icon" style="background:#000;color:white;border-color:#000;">🍎 Pay</span><span class="payment-icon" style="background:#4285F4;color:white;border-color:#4285F4;">G Pay</span></div>
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
    ${getProductReviews(productName).map(r=>`<div class="review"><div class="review-stars">${r.stars}</div><p class="review-text">"${r.text}"</p><div class="review-name">${r.name} · ${r.country}${r.verified?' <span style="color:#16a34a;font-size:10px;">✓ Verified</span>':''}</div></div>`).join("")}
  </div>
</div>
<div class="section" style="background:#f9fafb;border-top:1px solid #e5e7eb;">
  <div class="section-label">See it in action</div>
  <h2 class="section-h2" style="margin-bottom:24px;">Watch before you buy</h2>
  <div style="background:#f3f4f6;border:2px dashed #e5e7eb;border-radius:16px;aspect-ratio:16/9;display:flex;align-items:center;justify-content:center;">
    <div style="text-align:center;padding:40px;">
      <div style="width:72px;height:72px;background:#111827;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;cursor:pointer;">
        <div style="width:0;height:0;border-top:14px solid transparent;border-bottom:14px solid transparent;border-left:22px solid white;margin-left:4px;"></div>
      </div>
      <div style="font-size:13px;color:#9ca3af;">Add your product video URL in the dashboard</div>
    </div>
  </div>
</div>
<div class="section" style="background:#f9fafb;border-top:1px solid #e5e7eb;">
  <div class="section-label">Frequently bought together</div>
  <h2 class="section-h2" style="margin-bottom:24px;">Complete the set</h2>
  <div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap;">
    <div style="flex:1;min-width:180px;background:white;border:1px solid #e5e7eb;border-radius:14px;padding:20px;text-align:center;">
      <div style="font-size:24px;margin-bottom:8px;">📦</div>
      <div style="font-size:13px;font-weight:700;color:#111827;margin-bottom:4px;">${esc(productName)}</div>
      <div style="font-size:13px;color:${brandColor};font-weight:700;">${esc(store.price)}</div>
    </div>
    <div style="font-size:24px;color:#d1d5db;">+</div>
    <div style="flex:1;min-width:180px;background:white;border:1px solid #e5e7eb;border-radius:14px;padding:20px;text-align:center;opacity:0.7;">
      <div style="font-size:24px;margin-bottom:8px;">🎁</div>
      <div style="font-size:13px;font-weight:700;color:#111827;margin-bottom:4px;">Starter Bundle</div>
      <div style="font-size:11px;color:#9ca3af;">Accessories included</div>
    </div>
    <div style="font-size:24px;color:#d1d5db;">=</div>
    <div style="flex:1;min-width:180px;background:rgba(${rgb},0.06);border:1px solid rgba(${rgb},0.2);border-radius:14px;padding:20px;text-align:center;">
      <div style="font-size:11px;color:${brandColor};font-weight:700;margin-bottom:8px;text-transform:uppercase;letter-spacing:0.08em;">Bundle deal</div>
      <div style="font-size:22px;font-weight:800;color:#111827;margin-bottom:8px;">Save 15%</div>
      <button style="background:${brandColor};color:white;border:none;border-radius:10px;padding:10px 20px;font-size:13px;font-weight:700;cursor:pointer;width:100%;">Add bundle</button>
    </div>
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
<div class="sticky-cart">
  <div class="sticky-cart-info">
    <span class="sticky-cart-name">${esc(productName)}</span>
    <span class="sticky-cart-price">${esc(store.price)}</span>
  </div>
  <button class="sticky-cart-btn" style="background:#111827;color:white;">${esc(store.cta)}</button>
</div>
<script>
(function(){
  // Ember cart — opens cart drawer on buy button click
  function getSubdomain(){
    var h = window.location.hostname;
    if(h.endsWith(".useember.io")) return h.replace(".useember.io","");
    return null;
  }
  function startCheckout(e){
    if(e){ e.preventDefault(); e.stopPropagation(); }
    var sub = getSubdomain();
    if(!sub){ alert("This is a preview — checkout works on your live store."); return; }
    emberOpenCart();
  }
  // Attach to all buy button classes across all templates (incl. hero-cta)
  var selectors = [".hero-cta",".scroll-cta",".sticky-cta",".header-cta",".final-cta-btn",".d-cta",".d-nav-cta",".d-final-cta",".c-enrol",".c-nav-cta",".sticky-cart-btn",".cta-btn",".nav-cta"];
  function attach(){
    document.querySelectorAll(selectors.join(",")).forEach(function(el){
      if(el.getAttribute("data-ember-checkout")) return;
      el.setAttribute("data-ember-checkout","1");
      el.addEventListener("click", startCheckout);
    });
  }
  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", attach);
  } else { attach(); }
})();
</script>
<style>
#ember-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,0.45);z-index:9998;backdrop-filter:blur(3px);}
#ember-cart{position:fixed;top:0;right:0;bottom:0;width:100%;max-width:400px;background:#fff;z-index:9999;transform:translateX(100%);transition:transform 0.32s cubic-bezier(0.4,0,0.2,1);display:flex;flex-direction:column;box-shadow:-12px 0 60px rgba(0,0,0,0.15);}
#ember-cart.open{transform:translateX(0);}
.ec-head{padding:20px 24px;border-bottom:1px solid #f3f4f6;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;}
.ec-title{font-size:16px;font-weight:700;color:#111827;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-close{width:32px;height:32px;border:none;background:rgba(0,0,0,0.06);border-radius:8px;cursor:pointer;font-size:20px;color:#374151;display:flex;align-items:center;justify-content:center;line-height:1;}
.ec-body{flex:1;padding:24px;overflow-y:auto;}
.ec-item{display:flex;gap:16px;align-items:flex-start;padding-bottom:20px;border-bottom:1px solid #f3f4f6;}
.ec-icon{width:72px;height:72px;background:#f9fafb;border-radius:12px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:28px;}
.ec-name{font-size:14px;font-weight:700;color:#111827;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;margin-bottom:6px;line-height:1.4;}
.ec-price{font-size:17px;font-weight:800;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-qty-row{display:flex;align-items:center;justify-content:space-between;margin-top:20px;}
.ec-qty-label{font-size:14px;color:#6b7280;font-weight:500;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-qty-ctrl{display:flex;align-items:center;border:1.5px solid #e5e7eb;border-radius:10px;overflow:hidden;}
.ec-qty-btn{width:38px;height:38px;border:none;background:#fff;cursor:pointer;font-size:20px;color:#374151;display:flex;align-items:center;justify-content:center;line-height:1;}
.ec-qty-btn:hover{background:#f9fafb;}
.ec-qty-num{width:38px;text-align:center;font-size:15px;font-weight:700;color:#111827;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;line-height:38px;}
.ec-total-row{display:flex;justify-content:space-between;align-items:center;margin-top:16px;padding:16px;background:#f9fafb;border-radius:12px;}
.ec-total-label{font-size:14px;font-weight:600;color:#374151;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-total-val{font-size:20px;font-weight:800;color:#111827;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-trust{margin-top:16px;display:flex;flex-direction:column;gap:8px;}
.ec-trust-item{display:flex;align-items:center;gap:8px;font-size:12px;color:#6b7280;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-foot{padding:20px 24px;border-top:1px solid #f3f4f6;flex-shrink:0;}
.ec-checkout-btn{width:100%;padding:16px;border:none;color:#fff;border-radius:12px;font-size:16px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;letter-spacing:0.01em;transition:opacity 0.15s;}
.ec-checkout-btn:hover{opacity:0.9;}
.ec-continue-btn{width:100%;padding:12px;border:none;background:transparent;color:#9ca3af;font-size:13px;cursor:pointer;margin-top:4px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
@media(max-width:480px){#ember-cart{max-width:100%;}}
</style>
<div id="ember-overlay" onclick="emberCloseCart()"></div>
<div id="ember-cart">
  <div class="ec-head">
    <span class="ec-title">Your bag</span>
    <button class="ec-close" onclick="emberCloseCart()">&#x2715;</button>
  </div>
  <div class="ec-body">
    <div class="ec-item">
      <div class="ec-icon">&#x1F6CD;&#xFE0F;</div>
      <div style="flex:1;min-width:0;">
        <div class="ec-name">${esc(productName)}</div>
        <div class="ec-price" style="color:${brandColor}">${esc(store.price)}</div>
      </div>
    </div>
    <div class="ec-qty-row">
      <span class="ec-qty-label">Quantity</span>
      <div class="ec-qty-ctrl">
        <button class="ec-qty-btn" onclick="emberQty(-1)">&#x2212;</button>
        <span id="ec-qty" class="ec-qty-num">1</span>
        <button class="ec-qty-btn" onclick="emberQty(1)">&#x2B;</button>
      </div>
    </div>
    <div class="ec-total-row">
      <span class="ec-total-label">Order total</span>
      <span id="ec-total" class="ec-total-val">${esc(store.price)}</span>
    </div>
    <div class="ec-trust">
      <div class="ec-trust-item">&#x1F512; Secure checkout powered by Stripe</div>
      <div class="ec-trust-item">&#x21A9;&#xFE0F; 30-day money-back guarantee</div>
      <div class="ec-trust-item">&#x26A1; Instant confirmation after purchase</div>
    </div>
  </div>
  <div class="ec-foot">
    <button id="ec-btn" class="ec-checkout-btn" style="background:${brandColor}" onclick="emberCheckout()">Checkout &#x2192; <span id="ec-btn-price">${esc(store.price)}</span></button>
    <button class="ec-continue-btn" onclick="emberCloseCart()">Continue shopping</button>
  </div>
</div>
<script>
(function(){
  var ecBase=parseFloat("${esc(store.price)}".replace(/[^0-9.]/g,""))*100|0,ecQty=1;
  function ecFmt(p){return"£"+(p/100).toFixed(2);}
  window.emberQty=function(d){
    ecQty=Math.max(1,Math.min(ecQty+d,10));
    document.getElementById("ec-qty").textContent=ecQty;
    var t=ecFmt(ecBase*ecQty);
    document.getElementById("ec-total").textContent=t;
    document.getElementById("ec-btn-price").textContent=t;
  };
  window.emberOpenCart=function(){
    document.getElementById("ember-cart").classList.add("open");
    document.getElementById("ember-overlay").style.display="block";
    document.body.style.overflow="hidden";
  };
  window.emberCloseCart=function(){
    document.getElementById("ember-cart").classList.remove("open");
    document.getElementById("ember-overlay").style.display="none";
    document.body.style.overflow="";
  };
  window.emberCheckout=async function(){
    var sub=window.location.hostname.endsWith(".useember.io")?window.location.hostname.replace(".useember.io",""):null;
    if(!sub){alert("Checkout works on your live store.");return;}
    var btn=document.getElementById("ec-btn"),orig=btn.innerHTML;
    btn.textContent="Processing…";btn.style.opacity="0.6";btn.style.pointerEvents="none";
    try{
      var r=await fetch("/api/stripe/checkout",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({subdomain:sub,quantity:ecQty})
      });
      var d=await r.json();
      if(d.url){window.location.href=d.url;}
      else{alert(d.error||"Payments not set up yet.");btn.innerHTML=orig;btn.style.opacity="1";btn.style.pointerEvents="auto";}
    }catch(e){alert("Something went wrong — please try again.");btn.innerHTML=orig;btn.style.opacity="1";btn.style.pointerEvents="auto";}
  };
})();
</script>
</body></html>`;

  // ── Template 3 — Bold Modern ──
  if (template === 3) return `${baseHead}
<body style="background:#fff;">
<div style="background:${brandColor};padding:10px;text-align:center;font-size:12px;font-weight:700;color:white;letter-spacing:0.06em;">🚚 FREE UK SHIPPING ON ALL ORDERS &nbsp;·&nbsp; 30-DAY RETURNS &nbsp;·&nbsp; 10% OFF WITH CODE <span style="text-decoration:underline">WELCOME10</span></div>
<style>

  /* ── Mobile responsive ─────────────────────── */
  @media(max-width:768px){
    nav{padding:14px 20px!important;}
    .nav-links{display:none!important;}
    .hero{grid-template-columns:1fr!important;min-height:auto!important;}
    .hero-left,.hero-right{padding:32px 20px!important;}
    .hero-img{height:300px!important;}
    .hero-right img{height:300px!important;object-fit:cover!important;}
    .benefits{grid-template-columns:1fr!important;gap:12px!important;}
    .reviews{grid-template-columns:1fr!important;}
    .section{padding:40px 20px!important;}
    .final-cta{padding:48px 20px!important;}
    .footer{padding:20px!important;flex-direction:column!important;gap:12px!important;text-align:center!important;}
    .sticky-cart{display:flex!important;}
  }
  /* ── Sticky cart ────────────────────────────── */
  .sticky-cart{
    display:none;
    position:fixed;bottom:0;left:0;right:0;
    background:white;border-top:1px solid #e5e7eb;
    padding:12px 20px;z-index:100;
    align-items:center;justify-content:space-between;
    gap:12px;box-shadow:0 -4px 20px rgba(0,0,0,0.08);
  }
  .sticky-cart-info{display:flex;flex-direction:column;}
  .sticky-cart-name{font-size:13px;font-weight:700;color:#111827;}
  .sticky-cart-price{font-size:13px;color:#6b7280;}
  .sticky-cart-btn{
    padding:12px 24px;border:none;border-radius:10px;
    font-size:14px;font-weight:700;cursor:pointer;
    white-space:nowrap;min-width:140px;text-align:center;
  }
  /* ── Quantity selector ──────────────────────── */
  .qty-wrap{display:flex;align-items:center;gap:0;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;margin-bottom:16px;width:fit-content;}
  .qty-btn{width:40px;height:40px;background:white;border:none;font-size:18px;cursor:pointer;font-weight:300;color:#374151;}
  .qty-num{width:48px;text-align:center;font-size:15px;font-weight:600;color:#111827;border:none;background:white;}
  /* ── Trust badges ───────────────────────────── */
  .trust-badges{display:flex;gap:8px;flex-wrap:wrap;margin-top:16px;}
  .trust-badge{display:flex;align-items:center;gap:5px;font-size:11px;font-weight:600;color:#6b7280;background:#f9fafb;border:1px solid #e5e7eb;padding:5px 10px;border-radius:6px;}
  /* ── Payment icons ──────────────────────────── */
  .payment-icons{display:flex;gap:6px;margin-top:12px;flex-wrap:wrap;align-items:center;}
  .payment-icon{height:22px;background:#f3f4f6;border:1px solid #e5e7eb;border-radius:4px;padding:2px 6px;font-size:9px;font-weight:800;color:#374151;display:flex;align-items:center;}
  /* ── Urgency bar ────────────────────────────── */
  .urgency{display:flex;align-items:center;gap:8px;font-size:12px;font-weight:600;color:#DC2626;margin-bottom:14px;}
  .urgency-dot{width:8px;height:8px;border-radius:50%;background:#DC2626;animation:pulse 1.5s infinite;}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}

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
    ${getProductReviews(productName).map(r=>`<div class="review"><div class="review-stars">${r.stars}</div><p class="review-text">"${r.text}"</p><div class="review-name">${r.name} · ${r.country}${r.verified?' <span style="color:#16a34a;font-size:10px;">✓ Verified</span>':''}</div></div>`).join("")}
  </div>
</div>
<div class="section" style="background:#f9fafb;border-top:1px solid #e5e7eb;">
  <div class="section-label">See it in action</div>
  <h2 class="section-h2" style="margin-bottom:24px;">Watch before you buy</h2>
  <div style="background:#f3f4f6;border:2px dashed #e5e7eb;border-radius:16px;aspect-ratio:16/9;display:flex;align-items:center;justify-content:center;">
    <div style="text-align:center;padding:40px;">
      <div style="width:72px;height:72px;background:#111827;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;cursor:pointer;">
        <div style="width:0;height:0;border-top:14px solid transparent;border-bottom:14px solid transparent;border-left:22px solid white;margin-left:4px;"></div>
      </div>
      <div style="font-size:13px;color:#9ca3af;">Add your product video URL in the dashboard</div>
    </div>
  </div>
</div>
<div class="section" style="background:#f9fafb;border-top:1px solid #e5e7eb;">
  <div class="section-label">Frequently bought together</div>
  <h2 class="section-h2" style="margin-bottom:24px;">Complete the set</h2>
  <div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap;">
    <div style="flex:1;min-width:180px;background:white;border:1px solid #e5e7eb;border-radius:14px;padding:20px;text-align:center;">
      <div style="font-size:24px;margin-bottom:8px;">📦</div>
      <div style="font-size:13px;font-weight:700;color:#111827;margin-bottom:4px;">${esc(productName)}</div>
      <div style="font-size:13px;color:${brandColor};font-weight:700;">${esc(store.price)}</div>
    </div>
    <div style="font-size:24px;color:#d1d5db;">+</div>
    <div style="flex:1;min-width:180px;background:white;border:1px solid #e5e7eb;border-radius:14px;padding:20px;text-align:center;opacity:0.7;">
      <div style="font-size:24px;margin-bottom:8px;">🎁</div>
      <div style="font-size:13px;font-weight:700;color:#111827;margin-bottom:4px;">Starter Bundle</div>
      <div style="font-size:11px;color:#9ca3af;">Accessories included</div>
    </div>
    <div style="font-size:24px;color:#d1d5db;">=</div>
    <div style="flex:1;min-width:180px;background:rgba(${rgb},0.06);border:1px solid rgba(${rgb},0.2);border-radius:14px;padding:20px;text-align:center;">
      <div style="font-size:11px;color:${brandColor};font-weight:700;margin-bottom:8px;text-transform:uppercase;letter-spacing:0.08em;">Bundle deal</div>
      <div style="font-size:22px;font-weight:800;color:#111827;margin-bottom:8px;">Save 15%</div>
      <button style="background:${brandColor};color:white;border:none;border-radius:10px;padding:10px 20px;font-size:13px;font-weight:700;cursor:pointer;width:100%;">Add bundle</button>
    </div>
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
<div class="sticky-cart">
  <div class="sticky-cart-info">
    <span class="sticky-cart-name">${esc(productName)}</span>
    <span class="sticky-cart-price">${esc(store.price)}</span>
  </div>
  <button class="sticky-cart-btn" style="background:${brandColor};color:white;">${esc(store.cta)}</button>
</div>
<script>
(function(){
  // Ember cart — opens cart drawer on buy button click
  function getSubdomain(){
    var h = window.location.hostname;
    if(h.endsWith(".useember.io")) return h.replace(".useember.io","");
    return null;
  }
  function startCheckout(e){
    if(e){ e.preventDefault(); e.stopPropagation(); }
    var sub = getSubdomain();
    if(!sub){ alert("This is a preview — checkout works on your live store."); return; }
    emberOpenCart();
  }
  // Attach to all buy button classes across all templates (incl. hero-cta)
  var selectors = [".hero-cta",".scroll-cta",".sticky-cta",".header-cta",".final-cta-btn",".d-cta",".d-nav-cta",".d-final-cta",".c-enrol",".c-nav-cta",".sticky-cart-btn",".cta-btn",".nav-cta"];
  function attach(){
    document.querySelectorAll(selectors.join(",")).forEach(function(el){
      if(el.getAttribute("data-ember-checkout")) return;
      el.setAttribute("data-ember-checkout","1");
      el.addEventListener("click", startCheckout);
    });
  }
  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", attach);
  } else { attach(); }
})();
</script>
<style>
#ember-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,0.45);z-index:9998;backdrop-filter:blur(3px);}
#ember-cart{position:fixed;top:0;right:0;bottom:0;width:100%;max-width:400px;background:#fff;z-index:9999;transform:translateX(100%);transition:transform 0.32s cubic-bezier(0.4,0,0.2,1);display:flex;flex-direction:column;box-shadow:-12px 0 60px rgba(0,0,0,0.15);}
#ember-cart.open{transform:translateX(0);}
.ec-head{padding:20px 24px;border-bottom:1px solid #f3f4f6;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;}
.ec-title{font-size:16px;font-weight:700;color:#111827;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-close{width:32px;height:32px;border:none;background:rgba(0,0,0,0.06);border-radius:8px;cursor:pointer;font-size:20px;color:#374151;display:flex;align-items:center;justify-content:center;line-height:1;}
.ec-body{flex:1;padding:24px;overflow-y:auto;}
.ec-item{display:flex;gap:16px;align-items:flex-start;padding-bottom:20px;border-bottom:1px solid #f3f4f6;}
.ec-icon{width:72px;height:72px;background:#f9fafb;border-radius:12px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:28px;}
.ec-name{font-size:14px;font-weight:700;color:#111827;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;margin-bottom:6px;line-height:1.4;}
.ec-price{font-size:17px;font-weight:800;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-qty-row{display:flex;align-items:center;justify-content:space-between;margin-top:20px;}
.ec-qty-label{font-size:14px;color:#6b7280;font-weight:500;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-qty-ctrl{display:flex;align-items:center;border:1.5px solid #e5e7eb;border-radius:10px;overflow:hidden;}
.ec-qty-btn{width:38px;height:38px;border:none;background:#fff;cursor:pointer;font-size:20px;color:#374151;display:flex;align-items:center;justify-content:center;line-height:1;}
.ec-qty-btn:hover{background:#f9fafb;}
.ec-qty-num{width:38px;text-align:center;font-size:15px;font-weight:700;color:#111827;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;line-height:38px;}
.ec-total-row{display:flex;justify-content:space-between;align-items:center;margin-top:16px;padding:16px;background:#f9fafb;border-radius:12px;}
.ec-total-label{font-size:14px;font-weight:600;color:#374151;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-total-val{font-size:20px;font-weight:800;color:#111827;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-trust{margin-top:16px;display:flex;flex-direction:column;gap:8px;}
.ec-trust-item{display:flex;align-items:center;gap:8px;font-size:12px;color:#6b7280;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-foot{padding:20px 24px;border-top:1px solid #f3f4f6;flex-shrink:0;}
.ec-checkout-btn{width:100%;padding:16px;border:none;color:#fff;border-radius:12px;font-size:16px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;letter-spacing:0.01em;transition:opacity 0.15s;}
.ec-checkout-btn:hover{opacity:0.9;}
.ec-continue-btn{width:100%;padding:12px;border:none;background:transparent;color:#9ca3af;font-size:13px;cursor:pointer;margin-top:4px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
@media(max-width:480px){#ember-cart{max-width:100%;}}
</style>
<div id="ember-overlay" onclick="emberCloseCart()"></div>
<div id="ember-cart">
  <div class="ec-head">
    <span class="ec-title">Your bag</span>
    <button class="ec-close" onclick="emberCloseCart()">&#x2715;</button>
  </div>
  <div class="ec-body">
    <div class="ec-item">
      <div class="ec-icon">&#x1F6CD;&#xFE0F;</div>
      <div style="flex:1;min-width:0;">
        <div class="ec-name">${esc(productName)}</div>
        <div class="ec-price" style="color:${brandColor}">${esc(store.price)}</div>
      </div>
    </div>
    <div class="ec-qty-row">
      <span class="ec-qty-label">Quantity</span>
      <div class="ec-qty-ctrl">
        <button class="ec-qty-btn" onclick="emberQty(-1)">&#x2212;</button>
        <span id="ec-qty" class="ec-qty-num">1</span>
        <button class="ec-qty-btn" onclick="emberQty(1)">&#x2B;</button>
      </div>
    </div>
    <div class="ec-total-row">
      <span class="ec-total-label">Order total</span>
      <span id="ec-total" class="ec-total-val">${esc(store.price)}</span>
    </div>
    <div class="ec-trust">
      <div class="ec-trust-item">&#x1F512; Secure checkout powered by Stripe</div>
      <div class="ec-trust-item">&#x21A9;&#xFE0F; 30-day money-back guarantee</div>
      <div class="ec-trust-item">&#x26A1; Instant confirmation after purchase</div>
    </div>
  </div>
  <div class="ec-foot">
    <button id="ec-btn" class="ec-checkout-btn" style="background:${brandColor}" onclick="emberCheckout()">Checkout &#x2192; <span id="ec-btn-price">${esc(store.price)}</span></button>
    <button class="ec-continue-btn" onclick="emberCloseCart()">Continue shopping</button>
  </div>
</div>
<script>
(function(){
  var ecBase=parseFloat("${esc(store.price)}".replace(/[^0-9.]/g,""))*100|0,ecQty=1;
  function ecFmt(p){return"£"+(p/100).toFixed(2);}
  window.emberQty=function(d){
    ecQty=Math.max(1,Math.min(ecQty+d,10));
    document.getElementById("ec-qty").textContent=ecQty;
    var t=ecFmt(ecBase*ecQty);
    document.getElementById("ec-total").textContent=t;
    document.getElementById("ec-btn-price").textContent=t;
  };
  window.emberOpenCart=function(){
    document.getElementById("ember-cart").classList.add("open");
    document.getElementById("ember-overlay").style.display="block";
    document.body.style.overflow="hidden";
  };
  window.emberCloseCart=function(){
    document.getElementById("ember-cart").classList.remove("open");
    document.getElementById("ember-overlay").style.display="none";
    document.body.style.overflow="";
  };
  window.emberCheckout=async function(){
    var sub=window.location.hostname.endsWith(".useember.io")?window.location.hostname.replace(".useember.io",""):null;
    if(!sub){alert("Checkout works on your live store.");return;}
    var btn=document.getElementById("ec-btn"),orig=btn.innerHTML;
    btn.textContent="Processing…";btn.style.opacity="0.6";btn.style.pointerEvents="none";
    try{
      var r=await fetch("/api/stripe/checkout",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({subdomain:sub,quantity:ecQty})
      });
      var d=await r.json();
      if(d.url){window.location.href=d.url;}
      else{alert(d.error||"Payments not set up yet.");btn.innerHTML=orig;btn.style.opacity="1";btn.style.pointerEvents="auto";}
    }catch(e){alert("Something went wrong — please try again.");btn.innerHTML=orig;btn.style.opacity="1";btn.style.pointerEvents="auto";}
  };
})();
</script>
</body></html>`;

  // ── Template 4 — Warm Lifestyle ──
  return `${baseHead}
<body style="background:#fdf8f3;color:#2c1a0e;font-family:Georgia,serif;">
<div style="background:#4a2c1a;padding:10px;text-align:center;font-size:12px;font-weight:600;color:#f5ede3;letter-spacing:0.05em;">🚚 FREE UK SHIPPING ON ALL ORDERS &nbsp;·&nbsp; 30-DAY RETURNS &nbsp;·&nbsp; USE CODE <span style="text-decoration:underline">WELCOME10</span> FOR 10% OFF</div>
<style>

  /* ── Mobile responsive ─────────────────────── */
  @media(max-width:768px){
    nav{padding:14px 20px!important;}
    .nav-links{display:none!important;}
    .hero{grid-template-columns:1fr!important;min-height:auto!important;}
    .hero-left,.hero-right{padding:32px 20px!important;}
    .hero-img{height:300px!important;}
    .hero-right img{height:300px!important;object-fit:cover!important;}
    .benefits{grid-template-columns:1fr!important;gap:12px!important;}
    .reviews{grid-template-columns:1fr!important;}
    .section{padding:40px 20px!important;}
    .final-cta{padding:48px 20px!important;}
    .footer{padding:20px!important;flex-direction:column!important;gap:12px!important;text-align:center!important;}
    .sticky-cart{display:flex!important;}
  }
  /* ── Sticky cart ────────────────────────────── */
  .sticky-cart{
    display:none;
    position:fixed;bottom:0;left:0;right:0;
    background:white;border-top:1px solid #e5e7eb;
    padding:12px 20px;z-index:100;
    align-items:center;justify-content:space-between;
    gap:12px;box-shadow:0 -4px 20px rgba(0,0,0,0.08);
  }
  .sticky-cart-info{display:flex;flex-direction:column;}
  .sticky-cart-name{font-size:13px;font-weight:700;color:#111827;}
  .sticky-cart-price{font-size:13px;color:#6b7280;}
  .sticky-cart-btn{
    padding:12px 24px;border:none;border-radius:10px;
    font-size:14px;font-weight:700;cursor:pointer;
    white-space:nowrap;min-width:140px;text-align:center;
  }
  /* ── Quantity selector ──────────────────────── */
  .qty-wrap{display:flex;align-items:center;gap:0;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden;margin-bottom:16px;width:fit-content;}
  .qty-btn{width:40px;height:40px;background:white;border:none;font-size:18px;cursor:pointer;font-weight:300;color:#374151;}
  .qty-num{width:48px;text-align:center;font-size:15px;font-weight:600;color:#111827;border:none;background:white;}
  /* ── Trust badges ───────────────────────────── */
  .trust-badges{display:flex;gap:8px;flex-wrap:wrap;margin-top:16px;}
  .trust-badge{display:flex;align-items:center;gap:5px;font-size:11px;font-weight:600;color:#6b7280;background:#f9fafb;border:1px solid #e5e7eb;padding:5px 10px;border-radius:6px;}
  /* ── Payment icons ──────────────────────────── */
  .payment-icons{display:flex;gap:6px;margin-top:12px;flex-wrap:wrap;align-items:center;}
  .payment-icon{height:22px;background:#f3f4f6;border:1px solid #e5e7eb;border-radius:4px;padding:2px 6px;font-size:9px;font-weight:800;color:#374151;display:flex;align-items:center;}
  /* ── Urgency bar ────────────────────────────── */
  .urgency{display:flex;align-items:center;gap:8px;font-size:12px;font-weight:600;color:#DC2626;margin-bottom:14px;}
  .urgency-dot{width:8px;height:8px;border-radius:50%;background:#DC2626;animation:pulse 1.5s infinite;}
  @keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}

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
    <div class="urgency"><div class="urgency-dot"></div>Only 23 units left — order soon</div>
    <div class="qty-wrap"><button class="qty-btn" onclick="var n=document.getElementById('qty');n.value=Math.max(1,+n.value-1)">−</button><input id="qty" class="qty-num" value="1" readonly><button class="qty-btn" onclick="var n=document.getElementById('qty');n.value=+n.value+1">+</button></div>
    <button class="hero-cta">${esc(store.cta)}</button>
    <div class="trust-badges"><span class="trust-badge">🚚 Free shipping</span><span class="trust-badge">↩️ 30-day returns</span><span class="trust-badge">🔒 Secure checkout</span></div>
    <div class="payment-icons"><span class="payment-icon">VISA</span><span class="payment-icon">MC</span><span class="payment-icon" style="background:#000;color:white;border-color:#000;">🍎 Pay</span><span class="payment-icon" style="background:#4285F4;color:white;border-color:#4285F4;">G Pay</span></div>
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
    ${getProductReviews(productName).map(r=>`<div class="review"><div class="review-stars">${r.stars}</div><p class="review-text">"${r.text}"</p><div class="review-name">${r.name} · ${r.country}${r.verified?' <span style="color:#5a7a3a;font-size:10px;">✓ Verified</span>':''}</div></div>`).join("")}
  </div>
</div>
<div class="section" style="background:#f5ede3;border-top:1px solid #e8d5c4;">
  <div class="section-label">See it in action</div>
  <h2 class="section-h2" style="margin-bottom:24px;">Watch before you buy</h2>
  <div style="background:#f5ede3;border:2px dashed #e8d5c4;border-radius:16px;aspect-ratio:16/9;display:flex;align-items:center;justify-content:center;">
    <div style="text-align:center;padding:40px;">
      <div style="width:72px;height:72px;background:#4a2c1a;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;cursor:pointer;">
        <div style="width:0;height:0;border-top:14px solid transparent;border-bottom:14px solid transparent;border-left:22px solid white;margin-left:4px;"></div>
      </div>
      <div style="font-size:13px;color:#9ca3af;">Add your product video URL in the dashboard</div>
    </div>
  </div>
</div>
<div class="section" style="background:#f5ede3;border-top:1px solid #e8d5c4;">
  <div class="section-label">Frequently bought together</div>
  <h2 class="section-h2" style="margin-bottom:24px;">Complete the set</h2>
  <div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap;">
    <div style="flex:1;min-width:180px;background:#fdf8f3;border:1px solid #e8d5c4;border-radius:14px;padding:20px;text-align:center;">
      <div style="font-size:24px;margin-bottom:8px;">📦</div>
      <div style="font-size:13px;font-weight:700;color:#2c1a0e;margin-bottom:4px;">${esc(productName)}</div>
      <div style="font-size:13px;color:${brandColor};font-weight:700;">${esc(store.price)}</div>
    </div>
    <div style="font-size:24px;color:#d1d5db;">+</div>
    <div style="flex:1;min-width:180px;background:#fdf8f3;border:1px solid #e8d5c4;border-radius:14px;padding:20px;text-align:center;opacity:0.7;">
      <div style="font-size:24px;margin-bottom:8px;">🎁</div>
      <div style="font-size:13px;font-weight:700;color:#2c1a0e;margin-bottom:4px;">Starter Bundle</div>
      <div style="font-size:11px;color:#b8956a;">Accessories included</div>
    </div>
    <div style="font-size:24px;color:#d1d5db;">=</div>
    <div style="flex:1;min-width:180px;background:rgba(${rgb},0.06);border:1px solid rgba(${rgb},0.2);border-radius:14px;padding:20px;text-align:center;">
      <div style="font-size:11px;color:${brandColor};font-weight:700;margin-bottom:8px;text-transform:uppercase;letter-spacing:0.08em;">Bundle deal</div>
      <div style="font-size:22px;font-weight:800;color:#2c1a0e;margin-bottom:8px;">Save 15%</div>
      <button style="background:${brandColor};color:white;border:none;border-radius:10px;padding:10px 20px;font-size:13px;font-weight:700;cursor:pointer;width:100%;">Add bundle</button>
    </div>
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
<div class="sticky-cart" style="background:#fdf8f3;border-top:1px solid #e8d5c4;">
  <div class="sticky-cart-info">
    <span class="sticky-cart-name" style="color:#2c1a0e;">${esc(productName)}</span>
    <span class="sticky-cart-price" style="color:#9b7b5e;">${esc(store.price)}</span>
  </div>
  <button class="sticky-cart-btn" style="background:#4a2c1a;color:white;">${esc(store.cta)}</button>
</div>
<script>
(function(){
  // Ember cart — opens cart drawer on buy button click
  function getSubdomain(){
    var h = window.location.hostname;
    if(h.endsWith(".useember.io")) return h.replace(".useember.io","");
    return null;
  }
  function startCheckout(e){
    if(e){ e.preventDefault(); e.stopPropagation(); }
    var sub = getSubdomain();
    if(!sub){ alert("This is a preview — checkout works on your live store."); return; }
    emberOpenCart();
  }
  // Attach to all buy button classes across all templates (incl. hero-cta)
  var selectors = [".hero-cta",".scroll-cta",".sticky-cta",".header-cta",".final-cta-btn",".d-cta",".d-nav-cta",".d-final-cta",".c-enrol",".c-nav-cta",".sticky-cart-btn",".cta-btn",".nav-cta"];
  function attach(){
    document.querySelectorAll(selectors.join(",")).forEach(function(el){
      if(el.getAttribute("data-ember-checkout")) return;
      el.setAttribute("data-ember-checkout","1");
      el.addEventListener("click", startCheckout);
    });
  }
  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", attach);
  } else { attach(); }
})();
</script>
<style>
#ember-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,0.45);z-index:9998;backdrop-filter:blur(3px);}
#ember-cart{position:fixed;top:0;right:0;bottom:0;width:100%;max-width:400px;background:#fff;z-index:9999;transform:translateX(100%);transition:transform 0.32s cubic-bezier(0.4,0,0.2,1);display:flex;flex-direction:column;box-shadow:-12px 0 60px rgba(0,0,0,0.15);}
#ember-cart.open{transform:translateX(0);}
.ec-head{padding:20px 24px;border-bottom:1px solid #f3f4f6;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;}
.ec-title{font-size:16px;font-weight:700;color:#111827;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-close{width:32px;height:32px;border:none;background:rgba(0,0,0,0.06);border-radius:8px;cursor:pointer;font-size:20px;color:#374151;display:flex;align-items:center;justify-content:center;line-height:1;}
.ec-body{flex:1;padding:24px;overflow-y:auto;}
.ec-item{display:flex;gap:16px;align-items:flex-start;padding-bottom:20px;border-bottom:1px solid #f3f4f6;}
.ec-icon{width:72px;height:72px;background:#f9fafb;border-radius:12px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:28px;}
.ec-name{font-size:14px;font-weight:700;color:#111827;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;margin-bottom:6px;line-height:1.4;}
.ec-price{font-size:17px;font-weight:800;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-qty-row{display:flex;align-items:center;justify-content:space-between;margin-top:20px;}
.ec-qty-label{font-size:14px;color:#6b7280;font-weight:500;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-qty-ctrl{display:flex;align-items:center;border:1.5px solid #e5e7eb;border-radius:10px;overflow:hidden;}
.ec-qty-btn{width:38px;height:38px;border:none;background:#fff;cursor:pointer;font-size:20px;color:#374151;display:flex;align-items:center;justify-content:center;line-height:1;}
.ec-qty-btn:hover{background:#f9fafb;}
.ec-qty-num{width:38px;text-align:center;font-size:15px;font-weight:700;color:#111827;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;line-height:38px;}
.ec-total-row{display:flex;justify-content:space-between;align-items:center;margin-top:16px;padding:16px;background:#f9fafb;border-radius:12px;}
.ec-total-label{font-size:14px;font-weight:600;color:#374151;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-total-val{font-size:20px;font-weight:800;color:#111827;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-trust{margin-top:16px;display:flex;flex-direction:column;gap:8px;}
.ec-trust-item{display:flex;align-items:center;gap:8px;font-size:12px;color:#6b7280;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-foot{padding:20px 24px;border-top:1px solid #f3f4f6;flex-shrink:0;}
.ec-checkout-btn{width:100%;padding:16px;border:none;color:#fff;border-radius:12px;font-size:16px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;letter-spacing:0.01em;transition:opacity 0.15s;}
.ec-checkout-btn:hover{opacity:0.9;}
.ec-continue-btn{width:100%;padding:12px;border:none;background:transparent;color:#9ca3af;font-size:13px;cursor:pointer;margin-top:4px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
@media(max-width:480px){#ember-cart{max-width:100%;}}
</style>
<div id="ember-overlay" onclick="emberCloseCart()"></div>
<div id="ember-cart">
  <div class="ec-head">
    <span class="ec-title">Your bag</span>
    <button class="ec-close" onclick="emberCloseCart()">&#x2715;</button>
  </div>
  <div class="ec-body">
    <div class="ec-item">
      <div class="ec-icon">&#x1F6CD;&#xFE0F;</div>
      <div style="flex:1;min-width:0;">
        <div class="ec-name">${esc(productName)}</div>
        <div class="ec-price" style="color:${brandColor}">${esc(store.price)}</div>
      </div>
    </div>
    <div class="ec-qty-row">
      <span class="ec-qty-label">Quantity</span>
      <div class="ec-qty-ctrl">
        <button class="ec-qty-btn" onclick="emberQty(-1)">&#x2212;</button>
        <span id="ec-qty" class="ec-qty-num">1</span>
        <button class="ec-qty-btn" onclick="emberQty(1)">&#x2B;</button>
      </div>
    </div>
    <div class="ec-total-row">
      <span class="ec-total-label">Order total</span>
      <span id="ec-total" class="ec-total-val">${esc(store.price)}</span>
    </div>
    <div class="ec-trust">
      <div class="ec-trust-item">&#x1F512; Secure checkout powered by Stripe</div>
      <div class="ec-trust-item">&#x21A9;&#xFE0F; 30-day money-back guarantee</div>
      <div class="ec-trust-item">&#x26A1; Instant confirmation after purchase</div>
    </div>
  </div>
  <div class="ec-foot">
    <button id="ec-btn" class="ec-checkout-btn" style="background:${brandColor}" onclick="emberCheckout()">Checkout &#x2192; <span id="ec-btn-price">${esc(store.price)}</span></button>
    <button class="ec-continue-btn" onclick="emberCloseCart()">Continue shopping</button>
  </div>
</div>
<script>
(function(){
  var ecBase=parseFloat("${esc(store.price)}".replace(/[^0-9.]/g,""))*100|0,ecQty=1;
  function ecFmt(p){return"£"+(p/100).toFixed(2);}
  window.emberQty=function(d){
    ecQty=Math.max(1,Math.min(ecQty+d,10));
    document.getElementById("ec-qty").textContent=ecQty;
    var t=ecFmt(ecBase*ecQty);
    document.getElementById("ec-total").textContent=t;
    document.getElementById("ec-btn-price").textContent=t;
  };
  window.emberOpenCart=function(){
    document.getElementById("ember-cart").classList.add("open");
    document.getElementById("ember-overlay").style.display="block";
    document.body.style.overflow="hidden";
  };
  window.emberCloseCart=function(){
    document.getElementById("ember-cart").classList.remove("open");
    document.getElementById("ember-overlay").style.display="none";
    document.body.style.overflow="";
  };
  window.emberCheckout=async function(){
    var sub=window.location.hostname.endsWith(".useember.io")?window.location.hostname.replace(".useember.io",""):null;
    if(!sub){alert("Checkout works on your live store.");return;}
    var btn=document.getElementById("ec-btn"),orig=btn.innerHTML;
    btn.textContent="Processing…";btn.style.opacity="0.6";btn.style.pointerEvents="none";
    try{
      var r=await fetch("/api/stripe/checkout",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({subdomain:sub,quantity:ecQty})
      });
      var d=await r.json();
      if(d.url){window.location.href=d.url;}
      else{alert(d.error||"Payments not set up yet.");btn.innerHTML=orig;btn.style.opacity="1";btn.style.pointerEvents="auto";}
    }catch(e){alert("Something went wrong — please try again.");btn.innerHTML=orig;btn.style.opacity="1";btn.style.pointerEvents="auto";}
  };
})();
</script>
</body></html>`;
}

// ─────────────────────────────────────────────────────────────
// Digital Product Landing Page Templates
// 4 templates based on category:
// A (1) = Templates/Notion — clean minimal
// B (2) = Presets/Visual — dark aesthetic  
// C (3) = eBooks/Guides — trust/authority
// D (4) = Courses/AI — tech/modern
// ─────────────────────────────────────────────────────────────

export function generateDigitalTemplate(
  store: StoreData,
  brandColor: string,
  productName: string,
  btnRadius = "14px",
  category = "templates"
): string {
  const esc = (s: string) => s?.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;") ?? "";
  const hex = brandColor.replace("#","");
  const rgb = [0,2,4].map(i=>parseInt(hex.slice(i,i+2),16)).join(",");

  // Pick template by category
  const cat = category.toLowerCase();
  const isPresets  = cat.includes("preset") || cat.includes("visual") || cat.includes("photo");
  const isEbooks   = cat.includes("ebook") || cat.includes("guide") || cat.includes("book");
  const isCourses  = cat.includes("course") || cat.includes("prompt") || cat.includes("ai") || cat.includes("workshop");

  // ── Template B — Dark Aesthetic (Presets) ──
  if (isPresets) return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${esc(store.brand)} — ${esc(productName)}</title>
<style>
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#0a0a0a;color:white;}
.nav{background:rgba(10,10,10,0.95);padding:16px 32px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(255,255,255,0.08);position:sticky;top:0;z-index:10;backdrop-filter:blur(10px);}
.nav-brand{font-size:18px;font-weight:800;background:linear-gradient(135deg,${brandColor},#fff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
.nav-cta{padding:10px 22px;border-radius:${btnRadius};background:${brandColor};color:white;font-size:13px;font-weight:700;border:none;cursor:pointer;}
.hero{min-height:90vh;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:80px 24px;text-align:center;background:radial-gradient(ellipse at 50% 0%,rgba(${rgb},0.2) 0%,transparent 70%);}
.hero-badge{display:inline-block;padding:6px 16px;border-radius:999px;border:1px solid rgba(${rgb},0.4);color:${brandColor};font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:24px;}
.hero h1{font-size:clamp(36px,6vw,64px);font-weight:900;letter-spacing:-0.04em;line-height:1.0;margin-bottom:20px;max-width:700px;}
.hero p{font-size:18px;color:rgba(255,255,255,0.55);line-height:1.7;margin-bottom:40px;max-width:480px;}
.price-wrap{margin-bottom:32px;}
.price{font-size:52px;font-weight:900;background:linear-gradient(135deg,${brandColor},#fff);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;letter-spacing:-0.04em;}
.price-sub{font-size:13px;color:rgba(255,255,255,0.35);margin-top:4px;}
.cta-btn{padding:18px 48px;border-radius:${btnRadius};background:${brandColor};color:white;font-size:18px;font-weight:800;border:none;cursor:pointer;box-shadow:0 8px 32px rgba(${rgb},0.4);transition:transform 0.15s,box-shadow 0.15s;}
.cta-btn:hover{transform:translateY(-2px);box-shadow:0 12px 48px rgba(${rgb},0.6);}
.instant{font-size:13px;color:rgba(255,255,255,0.3);margin-top:14px;}
.gallery{padding:80px 24px;max-width:1000px;margin:0 auto;}
.gallery h2{font-size:clamp(24px,4vw,36px);font-weight:800;text-align:center;margin-bottom:48px;}
.gallery-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:3px;}
.gallery-item{aspect-ratio:1;background:linear-gradient(135deg,rgba(${rgb},0.3),rgba(${rgb},0.1));border-radius:4px;overflow:hidden;position:relative;}
.gallery-item::after{content:'BEFORE / AFTER';position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:10px;font-weight:700;color:rgba(255,255,255,0.3);letter-spacing:0.15em;}
.includes{padding:80px 24px;max-width:700px;margin:0 auto;}
.includes h2{font-size:clamp(24px,4vw,32px);font-weight:800;text-align:center;margin-bottom:40px;}
.include-row{display:flex;align-items:center;gap:16px;padding:16px 0;border-bottom:1px solid rgba(255,255,255,0.06);}
.include-icon{width:40px;height:40px;border-radius:10px;background:rgba(${rgb},0.15);border:1px solid rgba(${rgb},0.3);display:flex;align-items:center;justify-content:center;font-size:18px;flex-shrink:0;}
.include-text{font-size:14px;color:rgba(255,255,255,0.7);}
.reviews{padding:80px 24px;max-width:900px;margin:0 auto;}
.reviews h2{font-size:clamp(24px,4vw,32px);font-weight:800;text-align:center;margin-bottom:40px;}
.reviews-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;}
.review{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:24px;}
.stars{color:${brandColor};font-size:14px;margin-bottom:10px;}
.review-text{font-size:13px;color:rgba(255,255,255,0.6);line-height:1.7;margin-bottom:12px;}
.review-author{font-size:12px;font-weight:700;color:rgba(255,255,255,0.4);}
.final-cta{padding:100px 24px;text-align:center;background:radial-gradient(ellipse at 50% 100%,rgba(${rgb},0.15) 0%,transparent 70%);}
.final-cta h2{font-size:clamp(28px,5vw,48px);font-weight:900;margin-bottom:16px;}
.final-cta p{font-size:16px;color:rgba(255,255,255,0.45);margin-bottom:36px;}
.footer{text-align:center;padding:32px;font-size:12px;color:rgba(255,255,255,0.2);border-top:1px solid rgba(255,255,255,0.06);}
@media(max-width:600px){.gallery-grid{grid-template-columns:repeat(2,1fr);}.reviews-grid{grid-template-columns:1fr;}}
</style>
</head>
<body>
<nav class="nav">
  <div class="nav-brand">${esc(store.brand)}</div>
  <button class="nav-cta">Get instant access</button>
</nav>
<section class="hero">
  <div class="hero-badge">⚡ Instant digital download</div>
  <h1>${esc(store.headline || productName)}</h1>
  <p>${esc(store.subheadline || "Professional quality in one click. No editing experience required.")}</p>
  <div class="price-wrap">
    <div class="price">${esc(store.price || "£19")}</div>
    <div class="price-sub">One-time · Instant access · Lifetime updates</div>
  </div>
  <button class="cta-btn">Download now →</button>
  <div class="instant">✓ Instant delivery &nbsp;·&nbsp; ✓ Works on mobile &nbsp;·&nbsp; ✓ No subscription</div>
</section>
<section class="gallery">
  <h2>See the difference</h2>
  <div class="gallery-grid">
    ${[1,2,3,4,5,6].map(()=>`<div class="gallery-item"></div>`).join("")}
  </div>
</section>
<section class="includes">
  <h2>What's included</h2>
  ${[
    ["🎨","Complete preset pack — ready to apply instantly"],
    ["📱","Works on Lightroom Mobile (free) and Desktop"],
    ["📖","Step-by-step installation guide included"],
    ["🔄","Free updates — new presets added regularly"],
    ["💬","Email support if you need help getting set up"],
    ["⚡","Instant download — no waiting, no shipping"]
  ].map(([icon,text])=>`<div class="include-row"><div class="include-icon">${icon}</div><div class="include-text">${text}</div></div>`).join("")}
</section>
<section class="reviews">
  <h2>What creators are saying</h2>
  <div class="reviews-grid">
    ${[
      ["My photos finally look cohesive. I get compliments on my feed every single week now.","Sarah M."],
      ["I've tried so many preset packs — this is the only one I actually use every day.","James T."],
      ["The before/after is insane. My engagement doubled after switching to these presets.","Priya K."]
    ].map(([text,author])=>`<div class="review"><div class="stars">★★★★★</div><div class="review-text">"${text}"</div><div class="review-author">${author} — verified buyer</div></div>`).join("")}
  </div>
</section>
<section class="final-cta">
  <h2>Your aesthetic, perfected.</h2>
  <p>Join thousands of creators who upgraded their photos today.</p>
  <button class="cta-btn">Download now — ${esc(store.price || "£19")} →</button>
</section>
<footer class="footer">© ${new Date().getFullYear()} ${esc(store.brand)} · Digital download · Instant delivery · ⚡ Built with Ember 🔥</footer>
<script>
(function(){
  // Ember cart — opens cart drawer on buy button click
  function getSubdomain(){
    var h = window.location.hostname;
    if(h.endsWith(".useember.io")) return h.replace(".useember.io","");
    return null;
  }
  function startCheckout(e){
    if(e){ e.preventDefault(); e.stopPropagation(); }
    var sub = getSubdomain();
    if(!sub){ alert("This is a preview — checkout works on your live store."); return; }
    emberOpenCart();
  }
  // Attach to all buy button classes across all templates (incl. hero-cta)
  var selectors = [".hero-cta",".scroll-cta",".sticky-cta",".header-cta",".final-cta-btn",".d-cta",".d-nav-cta",".d-final-cta",".c-enrol",".c-nav-cta",".sticky-cart-btn",".cta-btn",".nav-cta"];
  function attach(){
    document.querySelectorAll(selectors.join(",")).forEach(function(el){
      if(el.getAttribute("data-ember-checkout")) return;
      el.setAttribute("data-ember-checkout","1");
      el.addEventListener("click", startCheckout);
    });
  }
  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", attach);
  } else { attach(); }
})();
</script>
<style>
#ember-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,0.45);z-index:9998;backdrop-filter:blur(3px);}
#ember-cart{position:fixed;top:0;right:0;bottom:0;width:100%;max-width:400px;background:#fff;z-index:9999;transform:translateX(100%);transition:transform 0.32s cubic-bezier(0.4,0,0.2,1);display:flex;flex-direction:column;box-shadow:-12px 0 60px rgba(0,0,0,0.15);}
#ember-cart.open{transform:translateX(0);}
.ec-head{padding:20px 24px;border-bottom:1px solid #f3f4f6;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;}
.ec-title{font-size:16px;font-weight:700;color:#111827;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-close{width:32px;height:32px;border:none;background:rgba(0,0,0,0.06);border-radius:8px;cursor:pointer;font-size:20px;color:#374151;display:flex;align-items:center;justify-content:center;line-height:1;}
.ec-body{flex:1;padding:24px;overflow-y:auto;}
.ec-item{display:flex;gap:16px;align-items:flex-start;padding-bottom:20px;border-bottom:1px solid #f3f4f6;}
.ec-icon{width:72px;height:72px;background:#f9fafb;border-radius:12px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:28px;}
.ec-name{font-size:14px;font-weight:700;color:#111827;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;margin-bottom:6px;line-height:1.4;}
.ec-price{font-size:17px;font-weight:800;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-qty-row{display:flex;align-items:center;justify-content:space-between;margin-top:20px;}
.ec-qty-label{font-size:14px;color:#6b7280;font-weight:500;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-qty-ctrl{display:flex;align-items:center;border:1.5px solid #e5e7eb;border-radius:10px;overflow:hidden;}
.ec-qty-btn{width:38px;height:38px;border:none;background:#fff;cursor:pointer;font-size:20px;color:#374151;display:flex;align-items:center;justify-content:center;line-height:1;}
.ec-qty-btn:hover{background:#f9fafb;}
.ec-qty-num{width:38px;text-align:center;font-size:15px;font-weight:700;color:#111827;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;line-height:38px;}
.ec-total-row{display:flex;justify-content:space-between;align-items:center;margin-top:16px;padding:16px;background:#f9fafb;border-radius:12px;}
.ec-total-label{font-size:14px;font-weight:600;color:#374151;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-total-val{font-size:20px;font-weight:800;color:#111827;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-trust{margin-top:16px;display:flex;flex-direction:column;gap:8px;}
.ec-trust-item{display:flex;align-items:center;gap:8px;font-size:12px;color:#6b7280;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-foot{padding:20px 24px;border-top:1px solid #f3f4f6;flex-shrink:0;}
.ec-checkout-btn{width:100%;padding:16px;border:none;color:#fff;border-radius:12px;font-size:16px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;letter-spacing:0.01em;transition:opacity 0.15s;}
.ec-checkout-btn:hover{opacity:0.9;}
.ec-continue-btn{width:100%;padding:12px;border:none;background:transparent;color:#9ca3af;font-size:13px;cursor:pointer;margin-top:4px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
@media(max-width:480px){#ember-cart{max-width:100%;}}
</style>
<div id="ember-overlay" onclick="emberCloseCart()"></div>
<div id="ember-cart">
  <div class="ec-head">
    <span class="ec-title">Your bag</span>
    <button class="ec-close" onclick="emberCloseCart()">&#x2715;</button>
  </div>
  <div class="ec-body">
    <div class="ec-item">
      <div class="ec-icon">&#x1F6CD;&#xFE0F;</div>
      <div style="flex:1;min-width:0;">
        <div class="ec-name">${esc(productName)}</div>
        <div class="ec-price" style="color:${brandColor}">${esc(store.price)}</div>
      </div>
    </div>
    <div class="ec-qty-row">
      <span class="ec-qty-label">Quantity</span>
      <div class="ec-qty-ctrl">
        <button class="ec-qty-btn" onclick="emberQty(-1)">&#x2212;</button>
        <span id="ec-qty" class="ec-qty-num">1</span>
        <button class="ec-qty-btn" onclick="emberQty(1)">&#x2B;</button>
      </div>
    </div>
    <div class="ec-total-row">
      <span class="ec-total-label">Order total</span>
      <span id="ec-total" class="ec-total-val">${esc(store.price)}</span>
    </div>
    <div class="ec-trust">
      <div class="ec-trust-item">&#x1F512; Secure checkout powered by Stripe</div>
      <div class="ec-trust-item">&#x21A9;&#xFE0F; 30-day money-back guarantee</div>
      <div class="ec-trust-item">&#x26A1; Instant confirmation after purchase</div>
    </div>
  </div>
  <div class="ec-foot">
    <button id="ec-btn" class="ec-checkout-btn" style="background:${brandColor}" onclick="emberCheckout()">Checkout &#x2192; <span id="ec-btn-price">${esc(store.price)}</span></button>
    <button class="ec-continue-btn" onclick="emberCloseCart()">Continue shopping</button>
  </div>
</div>
<script>
(function(){
  var ecBase=parseFloat("${esc(store.price)}".replace(/[^0-9.]/g,""))*100|0,ecQty=1;
  function ecFmt(p){return"£"+(p/100).toFixed(2);}
  window.emberQty=function(d){
    ecQty=Math.max(1,Math.min(ecQty+d,10));
    document.getElementById("ec-qty").textContent=ecQty;
    var t=ecFmt(ecBase*ecQty);
    document.getElementById("ec-total").textContent=t;
    document.getElementById("ec-btn-price").textContent=t;
  };
  window.emberOpenCart=function(){
    document.getElementById("ember-cart").classList.add("open");
    document.getElementById("ember-overlay").style.display="block";
    document.body.style.overflow="hidden";
  };
  window.emberCloseCart=function(){
    document.getElementById("ember-cart").classList.remove("open");
    document.getElementById("ember-overlay").style.display="none";
    document.body.style.overflow="";
  };
  window.emberCheckout=async function(){
    var sub=window.location.hostname.endsWith(".useember.io")?window.location.hostname.replace(".useember.io",""):null;
    if(!sub){alert("Checkout works on your live store.");return;}
    var btn=document.getElementById("ec-btn"),orig=btn.innerHTML;
    btn.textContent="Processing…";btn.style.opacity="0.6";btn.style.pointerEvents="none";
    try{
      var r=await fetch("/api/stripe/checkout",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({subdomain:sub,quantity:ecQty})
      });
      var d=await r.json();
      if(d.url){window.location.href=d.url;}
      else{alert(d.error||"Payments not set up yet.");btn.innerHTML=orig;btn.style.opacity="1";btn.style.pointerEvents="auto";}
    }catch(e){alert("Something went wrong — please try again.");btn.innerHTML=orig;btn.style.opacity="1";btn.style.pointerEvents="auto";}
  };
})();
</script>
</body>
</html>`;

  // ── Template C — Trust/Authority (eBooks & Guides) ──
  if (isEbooks) return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${esc(store.brand)} — ${esc(productName)}</title>
<style>
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:Georgia,'Times New Roman',serif;background:#fdfdf9;color:#1a1a1a;}
.nav{background:white;padding:16px 32px;display:flex;align-items:center;justify-content:space-between;border-bottom:2px solid #1a1a1a;}
.nav-brand{font-size:18px;font-weight:700;color:#1a1a1a;letter-spacing:-0.02em;}
.nav-cta{padding:10px 22px;border-radius:4px;background:#1a1a1a;color:white;font-size:13px;font-weight:700;border:none;cursor:pointer;font-family:-apple-system,sans-serif;}
.hero{max-width:760px;margin:0 auto;padding:80px 32px 64px;text-align:center;}
.hero-eyebrow{font-family:-apple-system,sans-serif;font-size:12px;font-weight:700;letter-spacing:0.15em;text-transform:uppercase;color:${brandColor};margin-bottom:20px;}
.hero h1{font-size:clamp(32px,5vw,52px);font-weight:700;letter-spacing:-0.03em;line-height:1.1;margin-bottom:20px;color:#1a1a1a;}
.hero-sub{font-size:20px;color:#555;line-height:1.7;margin-bottom:40px;font-style:italic;}
.book-mockup{width:200px;height:260px;background:linear-gradient(145deg,${brandColor},rgba(${rgb},0.7));border-radius:4px 12px 12px 4px;margin:0 auto 40px;display:flex;align-items:center;justify-content:center;box-shadow:8px 8px 24px rgba(0,0,0,0.2),-2px 0 0 rgba(0,0,0,0.1);position:relative;}
.book-mockup::before{content:'';position:absolute;left:0;top:0;bottom:0;width:12px;background:rgba(0,0,0,0.15);border-radius:4px 0 0 4px;}
.book-title{font-size:16px;font-weight:700;color:white;text-align:center;padding:16px;line-height:1.4;}
.price-row{display:flex;align-items:center;justify-content:center;gap:16px;margin-bottom:24px;}
.price{font-size:42px;font-weight:700;color:#1a1a1a;font-family:-apple-system,sans-serif;}
.price-note{font-size:13px;color:#888;font-family:-apple-system,sans-serif;}
.cta-btn{padding:16px 44px;border-radius:4px;background:${brandColor};color:white;font-size:17px;font-weight:700;border:none;cursor:pointer;font-family:-apple-system,sans-serif;box-shadow:0 4px 16px rgba(${rgb},0.3);}
.guarantee{font-family:-apple-system,sans-serif;font-size:13px;color:#888;margin-top:12px;}
.proof{background:white;border-top:1px solid #e8e8e0;border-bottom:1px solid #e8e8e0;padding:48px 32px;text-align:center;}
.proof-stats{display:flex;justify-content:center;gap:64px;flex-wrap:wrap;}
.proof-stat .num{font-size:40px;font-weight:700;color:${brandColor};font-family:-apple-system,sans-serif;line-height:1;}
.proof-stat .lbl{font-size:13px;color:#888;margin-top:6px;font-family:-apple-system,sans-serif;}
.toc{max-width:640px;margin:0 auto;padding:64px 32px;}
.toc h2{font-size:28px;font-weight:700;margin-bottom:32px;text-align:center;}
.toc-item{display:flex;gap:16px;padding:16px 0;border-bottom:1px solid #e8e8e0;}
.toc-num{font-size:12px;font-weight:700;color:${brandColor};font-family:-apple-system,sans-serif;width:28px;flex-shrink:0;padding-top:3px;}
.toc-text{font-size:15px;color:#333;}
.reviews{padding:64px 32px;max-width:820px;margin:0 auto;}
.reviews h2{font-size:28px;font-weight:700;margin-bottom:32px;text-align:center;}
.review-grid{display:grid;grid-template-columns:1fr 1fr;gap:20px;}
.review{background:white;border:1px solid #e8e8e0;padding:24px;border-radius:4px;}
.stars{color:${brandColor};font-size:14px;font-family:-apple-system,sans-serif;margin-bottom:8px;}
.review-text{font-size:14px;color:#444;line-height:1.7;margin-bottom:12px;}
.review-author{font-size:12px;color:#888;font-family:-apple-system,sans-serif;}
.author{max-width:640px;margin:0 auto;padding:48px 32px;display:flex;gap:32px;align-items:flex-start;border-top:1px solid #e8e8e0;}
.author-avatar{width:80px;height:80px;border-radius:50%;background:linear-gradient(135deg,${brandColor},rgba(${rgb},0.5));flex-shrink:0;}
.author-name{font-size:18px;font-weight:700;margin-bottom:8px;}
.author-bio{font-size:14px;color:#555;line-height:1.7;}
.final-cta{background:#1a1a1a;padding:80px 32px;text-align:center;color:white;}
.final-cta h2{font-size:clamp(24px,4vw,36px);font-weight:700;margin-bottom:12px;}
.final-cta p{font-size:15px;color:rgba(255,255,255,0.5);margin-bottom:36px;font-family:-apple-system,sans-serif;}
.final-cta .cta-btn{background:${brandColor};}
.footer{text-align:center;padding:32px;font-size:12px;color:#aaa;font-family:-apple-system,sans-serif;}
@media(max-width:600px){.proof-stats{gap:32px;}.review-grid{grid-template-columns:1fr;}.author{flex-direction:column;}}
</style>
</head>
<body>
<nav class="nav">
  <div class="nav-brand">${esc(store.brand)}</div>
  <button class="nav-cta">Get the guide →</button>
</nav>
<section class="hero">
  <div class="hero-eyebrow">Digital guide — instant download</div>
  <h1>${esc(store.headline || productName)}</h1>
  <p class="hero-sub">${esc(store.subheadline || "The complete step-by-step guide you've been looking for.")}</p>
  <div class="book-mockup"><div class="book-title">${esc(store.brand)}<br/>${esc(productName)}</div></div>
  <div class="price-row">
    <div class="price">${esc(store.price || "£19")}</div>
    <div class="price-note">One-time payment<br/>Instant PDF download</div>
  </div>
  <button class="cta-btn">Get instant access →</button>
  <div class="guarantee">✓ 30-day money back guarantee &nbsp;·&nbsp; ✓ No questions asked</div>
</section>
<section class="proof">
  <div class="proof-stats">
    <div class="proof-stat"><div class="num">2,400+</div><div class="lbl">copies downloaded</div></div>
    <div class="proof-stat"><div class="num">4.9/5</div><div class="lbl">average rating</div></div>
    <div class="proof-stat"><div class="num">30 day</div><div class="lbl">money back guarantee</div></div>
  </div>
</section>
<section class="toc">
  <h2>What you'll learn</h2>
  ${store.description?.split("\n").filter(Boolean).map((line,i)=>`
  <div class="toc-item">
    <div class="toc-num">0${i+1}</div>
    <div class="toc-text">${esc(line)}</div>
  </div>`).join("") || [
    "The exact framework used by thousands of successful creators",
    "Step-by-step actions you can start today — no experience needed",
    "Common mistakes and how to avoid them from day one",
    "How to scale from first sale to consistent monthly income",
    "Real examples, scripts and templates included"
  ].map((line,i)=>`<div class="toc-item"><div class="toc-num">0${i+1}</div><div class="toc-text">${line}</div></div>`).join("")}
</section>
<section class="reviews">
  <h2>Reader reviews</h2>
  <div class="review-grid">
    ${[
      ["This guide changed how I think about the whole thing. Clear, practical, no fluff.","Sarah M."],
      ["I made back the cost within the first week of applying what I learned.","James T."],
      ["Finally a guide written by someone who's actually done it. Not just theory.","Priya K."],
      ["I've read a lot of guides. This is the only one I'd actually recommend to a friend.","Alex R."]
    ].map(([text,author])=>`<div class="review"><div class="stars">★★★★★</div><div class="review-text">"${text}"</div><div class="review-author">${author} — verified buyer</div></div>`).join("")}
  </div>
</section>
<section class="final-cta">
  <h2>Ready to get started?</h2>
  <p>Join 2,400+ readers. Instant PDF download. 30-day guarantee.</p>
  <button class="cta-btn">Get the guide — ${esc(store.price || "£19")} →</button>
</section>
<footer class="footer">© ${new Date().getFullYear()} ${esc(store.brand)} · PDF Guide · Instant download · ⚡ Built with Ember 🔥</footer>
<script>
(function(){
  // Ember cart — opens cart drawer on buy button click
  function getSubdomain(){
    var h = window.location.hostname;
    if(h.endsWith(".useember.io")) return h.replace(".useember.io","");
    return null;
  }
  function startCheckout(e){
    if(e){ e.preventDefault(); e.stopPropagation(); }
    var sub = getSubdomain();
    if(!sub){ alert("This is a preview — checkout works on your live store."); return; }
    emberOpenCart();
  }
  // Attach to all buy button classes across all templates (incl. hero-cta)
  var selectors = [".hero-cta",".scroll-cta",".sticky-cta",".header-cta",".final-cta-btn",".d-cta",".d-nav-cta",".d-final-cta",".c-enrol",".c-nav-cta",".sticky-cart-btn",".cta-btn",".nav-cta"];
  function attach(){
    document.querySelectorAll(selectors.join(",")).forEach(function(el){
      if(el.getAttribute("data-ember-checkout")) return;
      el.setAttribute("data-ember-checkout","1");
      el.addEventListener("click", startCheckout);
    });
  }
  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", attach);
  } else { attach(); }
})();
</script>
<style>
#ember-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,0.45);z-index:9998;backdrop-filter:blur(3px);}
#ember-cart{position:fixed;top:0;right:0;bottom:0;width:100%;max-width:400px;background:#fff;z-index:9999;transform:translateX(100%);transition:transform 0.32s cubic-bezier(0.4,0,0.2,1);display:flex;flex-direction:column;box-shadow:-12px 0 60px rgba(0,0,0,0.15);}
#ember-cart.open{transform:translateX(0);}
.ec-head{padding:20px 24px;border-bottom:1px solid #f3f4f6;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;}
.ec-title{font-size:16px;font-weight:700;color:#111827;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-close{width:32px;height:32px;border:none;background:rgba(0,0,0,0.06);border-radius:8px;cursor:pointer;font-size:20px;color:#374151;display:flex;align-items:center;justify-content:center;line-height:1;}
.ec-body{flex:1;padding:24px;overflow-y:auto;}
.ec-item{display:flex;gap:16px;align-items:flex-start;padding-bottom:20px;border-bottom:1px solid #f3f4f6;}
.ec-icon{width:72px;height:72px;background:#f9fafb;border-radius:12px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:28px;}
.ec-name{font-size:14px;font-weight:700;color:#111827;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;margin-bottom:6px;line-height:1.4;}
.ec-price{font-size:17px;font-weight:800;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-qty-row{display:flex;align-items:center;justify-content:space-between;margin-top:20px;}
.ec-qty-label{font-size:14px;color:#6b7280;font-weight:500;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-qty-ctrl{display:flex;align-items:center;border:1.5px solid #e5e7eb;border-radius:10px;overflow:hidden;}
.ec-qty-btn{width:38px;height:38px;border:none;background:#fff;cursor:pointer;font-size:20px;color:#374151;display:flex;align-items:center;justify-content:center;line-height:1;}
.ec-qty-btn:hover{background:#f9fafb;}
.ec-qty-num{width:38px;text-align:center;font-size:15px;font-weight:700;color:#111827;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;line-height:38px;}
.ec-total-row{display:flex;justify-content:space-between;align-items:center;margin-top:16px;padding:16px;background:#f9fafb;border-radius:12px;}
.ec-total-label{font-size:14px;font-weight:600;color:#374151;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-total-val{font-size:20px;font-weight:800;color:#111827;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-trust{margin-top:16px;display:flex;flex-direction:column;gap:8px;}
.ec-trust-item{display:flex;align-items:center;gap:8px;font-size:12px;color:#6b7280;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-foot{padding:20px 24px;border-top:1px solid #f3f4f6;flex-shrink:0;}
.ec-checkout-btn{width:100%;padding:16px;border:none;color:#fff;border-radius:12px;font-size:16px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;letter-spacing:0.01em;transition:opacity 0.15s;}
.ec-checkout-btn:hover{opacity:0.9;}
.ec-continue-btn{width:100%;padding:12px;border:none;background:transparent;color:#9ca3af;font-size:13px;cursor:pointer;margin-top:4px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
@media(max-width:480px){#ember-cart{max-width:100%;}}
</style>
<div id="ember-overlay" onclick="emberCloseCart()"></div>
<div id="ember-cart">
  <div class="ec-head">
    <span class="ec-title">Your bag</span>
    <button class="ec-close" onclick="emberCloseCart()">&#x2715;</button>
  </div>
  <div class="ec-body">
    <div class="ec-item">
      <div class="ec-icon">&#x1F6CD;&#xFE0F;</div>
      <div style="flex:1;min-width:0;">
        <div class="ec-name">${esc(productName)}</div>
        <div class="ec-price" style="color:${brandColor}">${esc(store.price)}</div>
      </div>
    </div>
    <div class="ec-qty-row">
      <span class="ec-qty-label">Quantity</span>
      <div class="ec-qty-ctrl">
        <button class="ec-qty-btn" onclick="emberQty(-1)">&#x2212;</button>
        <span id="ec-qty" class="ec-qty-num">1</span>
        <button class="ec-qty-btn" onclick="emberQty(1)">&#x2B;</button>
      </div>
    </div>
    <div class="ec-total-row">
      <span class="ec-total-label">Order total</span>
      <span id="ec-total" class="ec-total-val">${esc(store.price)}</span>
    </div>
    <div class="ec-trust">
      <div class="ec-trust-item">&#x1F512; Secure checkout powered by Stripe</div>
      <div class="ec-trust-item">&#x21A9;&#xFE0F; 30-day money-back guarantee</div>
      <div class="ec-trust-item">&#x26A1; Instant confirmation after purchase</div>
    </div>
  </div>
  <div class="ec-foot">
    <button id="ec-btn" class="ec-checkout-btn" style="background:${brandColor}" onclick="emberCheckout()">Checkout &#x2192; <span id="ec-btn-price">${esc(store.price)}</span></button>
    <button class="ec-continue-btn" onclick="emberCloseCart()">Continue shopping</button>
  </div>
</div>
<script>
(function(){
  var ecBase=parseFloat("${esc(store.price)}".replace(/[^0-9.]/g,""))*100|0,ecQty=1;
  function ecFmt(p){return"£"+(p/100).toFixed(2);}
  window.emberQty=function(d){
    ecQty=Math.max(1,Math.min(ecQty+d,10));
    document.getElementById("ec-qty").textContent=ecQty;
    var t=ecFmt(ecBase*ecQty);
    document.getElementById("ec-total").textContent=t;
    document.getElementById("ec-btn-price").textContent=t;
  };
  window.emberOpenCart=function(){
    document.getElementById("ember-cart").classList.add("open");
    document.getElementById("ember-overlay").style.display="block";
    document.body.style.overflow="hidden";
  };
  window.emberCloseCart=function(){
    document.getElementById("ember-cart").classList.remove("open");
    document.getElementById("ember-overlay").style.display="none";
    document.body.style.overflow="";
  };
  window.emberCheckout=async function(){
    var sub=window.location.hostname.endsWith(".useember.io")?window.location.hostname.replace(".useember.io",""):null;
    if(!sub){alert("Checkout works on your live store.");return;}
    var btn=document.getElementById("ec-btn"),orig=btn.innerHTML;
    btn.textContent="Processing…";btn.style.opacity="0.6";btn.style.pointerEvents="none";
    try{
      var r=await fetch("/api/stripe/checkout",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({subdomain:sub,quantity:ecQty})
      });
      var d=await r.json();
      if(d.url){window.location.href=d.url;}
      else{alert(d.error||"Payments not set up yet.");btn.innerHTML=orig;btn.style.opacity="1";btn.style.pointerEvents="auto";}
    }catch(e){alert("Something went wrong — please try again.");btn.innerHTML=orig;btn.style.opacity="1";btn.style.pointerEvents="auto";}
  };
})();
</script>
</body>
</html>`;

  // ── Template D — Tech/Modern (Courses & AI Prompts) ──
  if (isCourses) return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${esc(store.brand)} — ${esc(productName)}</title>
<style>
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f8f9fa;color:#111;}
.nav{background:white;padding:14px 32px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #e8e8e0;position:sticky;top:0;z-index:10;}
.nav-brand{font-size:17px;font-weight:800;color:#111;}
.nav-cta{padding:10px 22px;border-radius:${btnRadius};background:${brandColor};color:white;font-size:13px;font-weight:700;border:none;cursor:pointer;}
.hero{background:linear-gradient(135deg,#111 0%,#1a1a2e 100%);color:white;padding:100px 32px;text-align:center;}
.hero-badge{display:inline-flex;align-items:center;gap:8px;padding:8px 18px;border-radius:999px;background:rgba(${rgb},0.2);border:1px solid rgba(${rgb},0.4);color:${brandColor};font-size:12px;font-weight:700;letter-spacing:0.06em;margin-bottom:28px;}
.hero h1{font-size:clamp(32px,5vw,56px);font-weight:900;letter-spacing:-0.04em;line-height:1.05;margin-bottom:20px;max-width:700px;margin-left:auto;margin-right:auto;}
.hero p{font-size:18px;color:rgba(255,255,255,0.6);line-height:1.7;margin-bottom:48px;max-width:520px;margin-left:auto;margin-right:auto;}
.hero-actions{display:flex;flex-direction:column;align-items:center;gap:12px;}
.cta-btn{padding:18px 48px;border-radius:${btnRadius};background:${brandColor};color:white;font-size:18px;font-weight:800;border:none;cursor:pointer;box-shadow:0 8px 32px rgba(${rgb},0.4);}
.hero-sub{font-size:13px;color:rgba(255,255,255,0.4);}
.price-tag{font-size:32px;font-weight:900;color:white;}
.features{padding:80px 32px;max-width:1000px;margin:0 auto;}
.features h2{font-size:clamp(24px,4vw,36px);font-weight:800;text-align:center;margin-bottom:48px;}
.features-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:20px;}
.feature{background:white;border-radius:16px;padding:24px;border:1px solid #e8e8e0;}
.feature-icon{font-size:28px;margin-bottom:14px;}
.feature-title{font-size:15px;font-weight:700;margin-bottom:8px;}
.feature-text{font-size:13px;color:#666;line-height:1.6;}
.curriculum{padding:80px 32px;max-width:720px;margin:0 auto;}
.curriculum h2{font-size:clamp(24px,4vw,32px);font-weight:800;margin-bottom:40px;text-align:center;}
.module{background:white;border-radius:12px;padding:20px 24px;margin-bottom:10px;border:1px solid #e8e8e0;display:flex;align-items:center;gap:16px;}
.module-num{width:36px;height:36px;border-radius:10px;background:rgba(${rgb},0.1);color:${brandColor};font-size:13px;font-weight:800;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.module-title{font-size:14px;font-weight:600;}
.module-sub{font-size:12px;color:#888;margin-top:2px;}
.reviews{padding:80px 32px;max-width:900px;margin:0 auto;}
.reviews h2{font-size:clamp(24px,4vw,32px);font-weight:800;margin-bottom:40px;text-align:center;}
.reviews-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;}
.review{background:white;border-radius:16px;padding:22px;border:1px solid #e8e8e0;}
.stars{color:${brandColor};font-size:14px;margin-bottom:10px;}
.review-text{font-size:13px;color:#555;line-height:1.7;margin-bottom:12px;}
.review-author{font-size:12px;font-weight:700;color:#888;}
.final{background:linear-gradient(135deg,#111,#1a1a2e);padding:100px 32px;text-align:center;color:white;}
.final h2{font-size:clamp(28px,4vw,44px);font-weight:900;margin-bottom:12px;}
.final p{font-size:16px;color:rgba(255,255,255,0.5);margin-bottom:40px;}
.final .price-tag{margin-bottom:20px;display:block;}
.footer{text-align:center;padding:32px;font-size:12px;color:#aaa;}
@media(max-width:600px){.features-grid{grid-template-columns:1fr;}.reviews-grid{grid-template-columns:1fr;}}
</style>
</head>
<body>
<nav class="nav">
  <div class="nav-brand">${esc(store.brand)}</div>
  <button class="nav-cta">Get access now</button>
</nav>
<section class="hero">
  <div class="hero-badge">⚡ Instant digital access</div>
  <h1>${esc(store.headline || productName)}</h1>
  <p>${esc(store.subheadline || "Everything you need to get started, get results, and keep going.")}</p>
  <div class="hero-actions">
    <div class="price-tag">${esc(store.price || "£27")}</div>
    <button class="cta-btn">Get instant access →</button>
    <div class="hero-sub">✓ Instant delivery &nbsp;·&nbsp; ✓ Lifetime access &nbsp;·&nbsp; ✓ 30-day guarantee</div>
  </div>
</section>
<section class="features">
  <h2>What you get</h2>
  <div class="features-grid">
    ${[
      ["⚡","Instant access","Download immediately after purchase — start within minutes"],
      ["📚","Complete curriculum","Step-by-step modules taking you from beginner to confident"],
      ["🎯","Real examples","Practical, actionable content — not just theory"],
      ["🔄","Lifetime updates","Free updates whenever new content is added"],
      ["💬","Email support","Get answers when you're stuck — no one left behind"],
      ["🏆","Proven results","Used by 1,000+ students with measurable outcomes"]
    ].map(([icon,title,text])=>`<div class="feature"><div class="feature-icon">${icon}</div><div class="feature-title">${title}</div><div class="feature-text">${text}</div></div>`).join("")}
  </div>
</section>
<section class="curriculum">
  <h2>What's inside</h2>
  ${[
    ["Foundation","Start here — the core concepts explained simply"],
    ["Strategy","Build your plan before you build anything else"],
    ["Execution","Step-by-step actions you can take today"],
    ["Growth","Scale what's working — systems and automation"],
    ["Advanced","Expert techniques for serious results"]
  ].map(([title,sub],i)=>`<div class="module"><div class="module-num">0${i+1}</div><div><div class="module-title">${title}</div><div class="module-sub">${sub}</div></div></div>`).join("")}
</section>
<section class="reviews">
  <h2>Student results</h2>
  <div class="reviews-grid">
    ${[
      ["This was exactly what I needed. Clear, practical and actually works.","Sarah M."],
      ["I made back the cost within days. Worth every penny.","James T."],
      ["Best investment I've made this year. No fluff, just results.","Priya K."]
    ].map(([text,author])=>`<div class="review"><div class="stars">★★★★★</div><div class="review-text">"${text}"</div><div class="review-author">${author} — verified student</div></div>`).join("")}
  </div>
</section>
<section class="final">
  <h2>Ready to start?</h2>
  <p>Join 1,000+ students. Instant access. 30-day guarantee.</p>
  <span class="price-tag">${esc(store.price || "£27")}</span>
  <button class="cta-btn">Get instant access →</button>
</section>
<footer class="footer">© ${new Date().getFullYear()} ${esc(store.brand)} · Digital product · ⚡ Built with Ember 🔥</footer>
<script>
(function(){
  // Ember cart — opens cart drawer on buy button click
  function getSubdomain(){
    var h = window.location.hostname;
    if(h.endsWith(".useember.io")) return h.replace(".useember.io","");
    return null;
  }
  function startCheckout(e){
    if(e){ e.preventDefault(); e.stopPropagation(); }
    var sub = getSubdomain();
    if(!sub){ alert("This is a preview — checkout works on your live store."); return; }
    emberOpenCart();
  }
  // Attach to all buy button classes across all templates (incl. hero-cta)
  var selectors = [".hero-cta",".scroll-cta",".sticky-cta",".header-cta",".final-cta-btn",".d-cta",".d-nav-cta",".d-final-cta",".c-enrol",".c-nav-cta",".sticky-cart-btn",".cta-btn",".nav-cta"];
  function attach(){
    document.querySelectorAll(selectors.join(",")).forEach(function(el){
      if(el.getAttribute("data-ember-checkout")) return;
      el.setAttribute("data-ember-checkout","1");
      el.addEventListener("click", startCheckout);
    });
  }
  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", attach);
  } else { attach(); }
})();
</script>
<style>
#ember-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,0.45);z-index:9998;backdrop-filter:blur(3px);}
#ember-cart{position:fixed;top:0;right:0;bottom:0;width:100%;max-width:400px;background:#fff;z-index:9999;transform:translateX(100%);transition:transform 0.32s cubic-bezier(0.4,0,0.2,1);display:flex;flex-direction:column;box-shadow:-12px 0 60px rgba(0,0,0,0.15);}
#ember-cart.open{transform:translateX(0);}
.ec-head{padding:20px 24px;border-bottom:1px solid #f3f4f6;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;}
.ec-title{font-size:16px;font-weight:700;color:#111827;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-close{width:32px;height:32px;border:none;background:rgba(0,0,0,0.06);border-radius:8px;cursor:pointer;font-size:20px;color:#374151;display:flex;align-items:center;justify-content:center;line-height:1;}
.ec-body{flex:1;padding:24px;overflow-y:auto;}
.ec-item{display:flex;gap:16px;align-items:flex-start;padding-bottom:20px;border-bottom:1px solid #f3f4f6;}
.ec-icon{width:72px;height:72px;background:#f9fafb;border-radius:12px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:28px;}
.ec-name{font-size:14px;font-weight:700;color:#111827;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;margin-bottom:6px;line-height:1.4;}
.ec-price{font-size:17px;font-weight:800;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-qty-row{display:flex;align-items:center;justify-content:space-between;margin-top:20px;}
.ec-qty-label{font-size:14px;color:#6b7280;font-weight:500;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-qty-ctrl{display:flex;align-items:center;border:1.5px solid #e5e7eb;border-radius:10px;overflow:hidden;}
.ec-qty-btn{width:38px;height:38px;border:none;background:#fff;cursor:pointer;font-size:20px;color:#374151;display:flex;align-items:center;justify-content:center;line-height:1;}
.ec-qty-btn:hover{background:#f9fafb;}
.ec-qty-num{width:38px;text-align:center;font-size:15px;font-weight:700;color:#111827;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;line-height:38px;}
.ec-total-row{display:flex;justify-content:space-between;align-items:center;margin-top:16px;padding:16px;background:#f9fafb;border-radius:12px;}
.ec-total-label{font-size:14px;font-weight:600;color:#374151;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-total-val{font-size:20px;font-weight:800;color:#111827;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-trust{margin-top:16px;display:flex;flex-direction:column;gap:8px;}
.ec-trust-item{display:flex;align-items:center;gap:8px;font-size:12px;color:#6b7280;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-foot{padding:20px 24px;border-top:1px solid #f3f4f6;flex-shrink:0;}
.ec-checkout-btn{width:100%;padding:16px;border:none;color:#fff;border-radius:12px;font-size:16px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;letter-spacing:0.01em;transition:opacity 0.15s;}
.ec-checkout-btn:hover{opacity:0.9;}
.ec-continue-btn{width:100%;padding:12px;border:none;background:transparent;color:#9ca3af;font-size:13px;cursor:pointer;margin-top:4px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
@media(max-width:480px){#ember-cart{max-width:100%;}}
</style>
<div id="ember-overlay" onclick="emberCloseCart()"></div>
<div id="ember-cart">
  <div class="ec-head">
    <span class="ec-title">Your bag</span>
    <button class="ec-close" onclick="emberCloseCart()">&#x2715;</button>
  </div>
  <div class="ec-body">
    <div class="ec-item">
      <div class="ec-icon">&#x1F6CD;&#xFE0F;</div>
      <div style="flex:1;min-width:0;">
        <div class="ec-name">${esc(productName)}</div>
        <div class="ec-price" style="color:${brandColor}">${esc(store.price)}</div>
      </div>
    </div>
    <div class="ec-qty-row">
      <span class="ec-qty-label">Quantity</span>
      <div class="ec-qty-ctrl">
        <button class="ec-qty-btn" onclick="emberQty(-1)">&#x2212;</button>
        <span id="ec-qty" class="ec-qty-num">1</span>
        <button class="ec-qty-btn" onclick="emberQty(1)">&#x2B;</button>
      </div>
    </div>
    <div class="ec-total-row">
      <span class="ec-total-label">Order total</span>
      <span id="ec-total" class="ec-total-val">${esc(store.price)}</span>
    </div>
    <div class="ec-trust">
      <div class="ec-trust-item">&#x1F512; Secure checkout powered by Stripe</div>
      <div class="ec-trust-item">&#x21A9;&#xFE0F; 30-day money-back guarantee</div>
      <div class="ec-trust-item">&#x26A1; Instant confirmation after purchase</div>
    </div>
  </div>
  <div class="ec-foot">
    <button id="ec-btn" class="ec-checkout-btn" style="background:${brandColor}" onclick="emberCheckout()">Checkout &#x2192; <span id="ec-btn-price">${esc(store.price)}</span></button>
    <button class="ec-continue-btn" onclick="emberCloseCart()">Continue shopping</button>
  </div>
</div>
<script>
(function(){
  var ecBase=parseFloat("${esc(store.price)}".replace(/[^0-9.]/g,""))*100|0,ecQty=1;
  function ecFmt(p){return"£"+(p/100).toFixed(2);}
  window.emberQty=function(d){
    ecQty=Math.max(1,Math.min(ecQty+d,10));
    document.getElementById("ec-qty").textContent=ecQty;
    var t=ecFmt(ecBase*ecQty);
    document.getElementById("ec-total").textContent=t;
    document.getElementById("ec-btn-price").textContent=t;
  };
  window.emberOpenCart=function(){
    document.getElementById("ember-cart").classList.add("open");
    document.getElementById("ember-overlay").style.display="block";
    document.body.style.overflow="hidden";
  };
  window.emberCloseCart=function(){
    document.getElementById("ember-cart").classList.remove("open");
    document.getElementById("ember-overlay").style.display="none";
    document.body.style.overflow="";
  };
  window.emberCheckout=async function(){
    var sub=window.location.hostname.endsWith(".useember.io")?window.location.hostname.replace(".useember.io",""):null;
    if(!sub){alert("Checkout works on your live store.");return;}
    var btn=document.getElementById("ec-btn"),orig=btn.innerHTML;
    btn.textContent="Processing…";btn.style.opacity="0.6";btn.style.pointerEvents="none";
    try{
      var r=await fetch("/api/stripe/checkout",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({subdomain:sub,quantity:ecQty})
      });
      var d=await r.json();
      if(d.url){window.location.href=d.url;}
      else{alert(d.error||"Payments not set up yet.");btn.innerHTML=orig;btn.style.opacity="1";btn.style.pointerEvents="auto";}
    }catch(e){alert("Something went wrong — please try again.");btn.innerHTML=orig;btn.style.opacity="1";btn.style.pointerEvents="auto";}
  };
})();
</script>
</body>
</html>`;

  // ── Template A — Clean Minimal (Templates/Notion — default) ──
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>${esc(store.brand)} — ${esc(productName)}</title>
<style>
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#fafafa;color:#111;}
.nav{background:white;padding:16px 32px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid rgba(0,0,0,0.08);position:sticky;top:0;z-index:10;}
.nav-brand{font-size:18px;font-weight:800;color:#111;}
.nav-cta{padding:10px 22px;border-radius:${btnRadius};background:${brandColor};color:white;font-size:13px;font-weight:700;border:none;cursor:pointer;}
.hero{max-width:680px;margin:0 auto;padding:100px 24px 80px;text-align:center;}
.hero-badge{display:inline-block;padding:6px 16px;border-radius:999px;background:rgba(${rgb},0.08);color:${brandColor};font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:24px;}
.hero h1{font-size:clamp(32px,5vw,52px);font-weight:800;letter-spacing:-0.04em;line-height:1.05;margin-bottom:16px;}
.hero p{font-size:18px;color:#6b7280;line-height:1.7;margin-bottom:40px;}
.price{font-size:48px;font-weight:900;color:${brandColor};letter-spacing:-0.04em;line-height:1;margin-bottom:8px;}
.price-sub{font-size:13px;color:#9ca3af;margin-bottom:28px;}
.cta-btn{padding:16px 44px;border-radius:${btnRadius};background:${brandColor};color:white;font-size:17px;font-weight:800;border:none;cursor:pointer;box-shadow:0 6px 24px rgba(${rgb},0.3);}
.trust{font-size:12px;color:#9ca3af;margin-top:12px;}
.preview{max-width:820px;margin:0 auto;padding:0 24px 80px;}
.preview h2{font-size:clamp(22px,3vw,30px);font-weight:800;text-align:center;margin-bottom:32px;}
.preview-box{background:white;border-radius:20px;border:1px solid rgba(0,0,0,0.08);overflow:hidden;box-shadow:0 4px 32px rgba(0,0,0,0.06);}
.preview-header{background:${brandColor};padding:14px 20px;display:flex;align-items:center;gap:10px;}
.preview-dot{width:10px;height:10px;border-radius:50%;background:rgba(255,255,255,0.4);}
.preview-title{font-size:13px;font-weight:700;color:white;}
.preview-content{padding:24px;display:grid;grid-template-columns:1fr 1fr;gap:14px;}
.preview-item{background:#f9fafb;border-radius:12px;padding:16px;}
.preview-item-label{font-size:10px;font-weight:700;color:${brandColor};letter-spacing:0.08em;text-transform:uppercase;margin-bottom:6px;}
.preview-item-text{font-size:12px;color:#374151;line-height:1.6;}
.includes{max-width:640px;margin:0 auto;padding:0 24px 80px;}
.includes h2{font-size:clamp(22px,3vw,30px);font-weight:800;text-align:center;margin-bottom:32px;}
.include-item{display:flex;align-items:flex-start;gap:14px;padding:14px 0;border-bottom:1px solid rgba(0,0,0,0.06);}
.check{width:24px;height:24px;border-radius:6px;background:rgba(${rgb},0.1);color:${brandColor};font-size:13px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;}
.include-text{font-size:14px;color:#374151;line-height:1.6;}
.reviews{max-width:820px;margin:0 auto;padding:0 24px 80px;}
.reviews h2{font-size:clamp(22px,3vw,30px);font-weight:800;text-align:center;margin-bottom:32px;}
.reviews-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;}
.review{background:white;border-radius:16px;padding:20px;border:1px solid rgba(0,0,0,0.07);}
.stars{color:${brandColor};font-size:13px;margin-bottom:8px;}
.review-text{font-size:13px;color:#555;line-height:1.7;margin-bottom:10px;}
.review-author{font-size:11px;font-weight:700;color:#9ca3af;}
.final{max-width:480px;margin:0 auto;padding:0 24px 100px;text-align:center;}
.final h2{font-size:clamp(22px,3vw,30px);font-weight:800;margin-bottom:12px;}
.final p{font-size:14px;color:#6b7280;margin-bottom:28px;line-height:1.7;}
.footer{text-align:center;padding:32px;font-size:12px;color:#9ca3af;border-top:1px solid rgba(0,0,0,0.06);}
@media(max-width:600px){.preview-content{grid-template-columns:1fr;}.reviews-grid{grid-template-columns:1fr;}}
</style>
</head>
<body>
<nav class="nav">
  <div class="nav-brand">${esc(store.brand)}</div>
  <button class="nav-cta">Download now</button>
</nav>
<section class="hero">
  <div class="hero-badge">⚡ Instant digital download</div>
  <h1>${esc(store.headline || productName)}</h1>
  <p>${esc(store.subheadline || "The template that saves you hours every week — ready to use immediately.")}</p>
  <div class="price">${esc(store.price || "£12")}</div>
  <div class="price-sub">One-time payment · Instant access · Free updates</div>
  <button class="cta-btn">Download now →</button>
  <div class="trust">✓ Instant delivery &nbsp;·&nbsp; ✓ Works immediately &nbsp;·&nbsp; ✓ 30-day guarantee</div>
</section>
<section class="preview">
  <h2>See inside</h2>
  <div class="preview-box">
    <div class="preview-header">
      <div class="preview-dot"></div><div class="preview-dot"></div><div class="preview-dot"></div>
      <div class="preview-title">Preview — ${esc(productName)}</div>
    </div>
    <div class="preview-content">
      ${[
        ["What's inside","A complete, ready-to-use template designed to work immediately out of the box."],
        ["Works with","All major platforms — duplicate once, use forever."],
        ["Best for","Anyone who wants to save time and get organised fast."],
        ["Delivery","Instant download to your email. Access forever. Free updates included."]
      ].map(([label,text])=>`<div class="preview-item"><div class="preview-item-label">${label}</div><div class="preview-item-text">${text}</div></div>`).join("")}
    </div>
  </div>
</section>
<section class="includes">
  <h2>Everything included</h2>
  ${[
    "Instant download — access within seconds of purchase",
    "Works on desktop, tablet and mobile",
    "Step-by-step setup guide so you can start immediately",
    "Free updates — improvements sent to you automatically",
    "Lifetime access — pay once, use forever",
    "Email support included if you need help getting set up"
  ].map(text=>`<div class="include-item"><div class="check">✓</div><div class="include-text">${text}</div></div>`).join("")}
</section>
<section class="reviews">
  <h2>What people are saying</h2>
  <div class="reviews-grid">
    ${[
      ["Exactly what I needed. Started using it the same day I bought it.","Sarah M."],
      ["I've tried a lot of templates. This one is by far the best I've used.","James T."],
      ["Bought on a whim and now I use it every single day. Can't recommend it enough.","Priya K."]
    ].map(([text,author])=>`<div class="review"><div class="stars">★★★★★</div><div class="review-text">"${text}"</div><div class="review-author">${author} — verified buyer</div></div>`).join("")}
  </div>
</section>
<section class="final">
  <h2>Ready to get started?</h2>
  <p>Instant download. Works immediately. 30-day money back guarantee.</p>
  <button class="cta-btn">Download now — ${esc(store.price || "£12")} →</button>
</section>
<footer class="footer">© ${new Date().getFullYear()} ${esc(store.brand)} · Digital template · Instant download · ⚡ Built with Ember 🔥</footer>
<script>
(function(){
  // Ember cart — opens cart drawer on buy button click
  function getSubdomain(){
    var h = window.location.hostname;
    if(h.endsWith(".useember.io")) return h.replace(".useember.io","");
    return null;
  }
  function startCheckout(e){
    if(e){ e.preventDefault(); e.stopPropagation(); }
    var sub = getSubdomain();
    if(!sub){ alert("This is a preview — checkout works on your live store."); return; }
    emberOpenCart();
  }
  // Attach to all buy button classes across all templates (incl. hero-cta)
  var selectors = [".hero-cta",".scroll-cta",".sticky-cta",".header-cta",".final-cta-btn",".d-cta",".d-nav-cta",".d-final-cta",".c-enrol",".c-nav-cta",".sticky-cart-btn",".cta-btn",".nav-cta"];
  function attach(){
    document.querySelectorAll(selectors.join(",")).forEach(function(el){
      if(el.getAttribute("data-ember-checkout")) return;
      el.setAttribute("data-ember-checkout","1");
      el.addEventListener("click", startCheckout);
    });
  }
  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", attach);
  } else { attach(); }
})();
</script>
<style>
#ember-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,0.45);z-index:9998;backdrop-filter:blur(3px);}
#ember-cart{position:fixed;top:0;right:0;bottom:0;width:100%;max-width:400px;background:#fff;z-index:9999;transform:translateX(100%);transition:transform 0.32s cubic-bezier(0.4,0,0.2,1);display:flex;flex-direction:column;box-shadow:-12px 0 60px rgba(0,0,0,0.15);}
#ember-cart.open{transform:translateX(0);}
.ec-head{padding:20px 24px;border-bottom:1px solid #f3f4f6;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;}
.ec-title{font-size:16px;font-weight:700;color:#111827;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-close{width:32px;height:32px;border:none;background:rgba(0,0,0,0.06);border-radius:8px;cursor:pointer;font-size:20px;color:#374151;display:flex;align-items:center;justify-content:center;line-height:1;}
.ec-body{flex:1;padding:24px;overflow-y:auto;}
.ec-item{display:flex;gap:16px;align-items:flex-start;padding-bottom:20px;border-bottom:1px solid #f3f4f6;}
.ec-icon{width:72px;height:72px;background:#f9fafb;border-radius:12px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:28px;}
.ec-name{font-size:14px;font-weight:700;color:#111827;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;margin-bottom:6px;line-height:1.4;}
.ec-price{font-size:17px;font-weight:800;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-qty-row{display:flex;align-items:center;justify-content:space-between;margin-top:20px;}
.ec-qty-label{font-size:14px;color:#6b7280;font-weight:500;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-qty-ctrl{display:flex;align-items:center;border:1.5px solid #e5e7eb;border-radius:10px;overflow:hidden;}
.ec-qty-btn{width:38px;height:38px;border:none;background:#fff;cursor:pointer;font-size:20px;color:#374151;display:flex;align-items:center;justify-content:center;line-height:1;}
.ec-qty-btn:hover{background:#f9fafb;}
.ec-qty-num{width:38px;text-align:center;font-size:15px;font-weight:700;color:#111827;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;line-height:38px;}
.ec-total-row{display:flex;justify-content:space-between;align-items:center;margin-top:16px;padding:16px;background:#f9fafb;border-radius:12px;}
.ec-total-label{font-size:14px;font-weight:600;color:#374151;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-total-val{font-size:20px;font-weight:800;color:#111827;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-trust{margin-top:16px;display:flex;flex-direction:column;gap:8px;}
.ec-trust-item{display:flex;align-items:center;gap:8px;font-size:12px;color:#6b7280;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-foot{padding:20px 24px;border-top:1px solid #f3f4f6;flex-shrink:0;}
.ec-checkout-btn{width:100%;padding:16px;border:none;color:#fff;border-radius:12px;font-size:16px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;letter-spacing:0.01em;transition:opacity 0.15s;}
.ec-checkout-btn:hover{opacity:0.9;}
.ec-continue-btn{width:100%;padding:12px;border:none;background:transparent;color:#9ca3af;font-size:13px;cursor:pointer;margin-top:4px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
@media(max-width:480px){#ember-cart{max-width:100%;}}
</style>
<div id="ember-overlay" onclick="emberCloseCart()"></div>
<div id="ember-cart">
  <div class="ec-head">
    <span class="ec-title">Your bag</span>
    <button class="ec-close" onclick="emberCloseCart()">&#x2715;</button>
  </div>
  <div class="ec-body">
    <div class="ec-item">
      <div class="ec-icon">&#x1F6CD;&#xFE0F;</div>
      <div style="flex:1;min-width:0;">
        <div class="ec-name">${esc(productName)}</div>
        <div class="ec-price" style="color:${brandColor}">${esc(store.price)}</div>
      </div>
    </div>
    <div class="ec-qty-row">
      <span class="ec-qty-label">Quantity</span>
      <div class="ec-qty-ctrl">
        <button class="ec-qty-btn" onclick="emberQty(-1)">&#x2212;</button>
        <span id="ec-qty" class="ec-qty-num">1</span>
        <button class="ec-qty-btn" onclick="emberQty(1)">&#x2B;</button>
      </div>
    </div>
    <div class="ec-total-row">
      <span class="ec-total-label">Order total</span>
      <span id="ec-total" class="ec-total-val">${esc(store.price)}</span>
    </div>
    <div class="ec-trust">
      <div class="ec-trust-item">&#x1F512; Secure checkout powered by Stripe</div>
      <div class="ec-trust-item">&#x21A9;&#xFE0F; 30-day money-back guarantee</div>
      <div class="ec-trust-item">&#x26A1; Instant confirmation after purchase</div>
    </div>
  </div>
  <div class="ec-foot">
    <button id="ec-btn" class="ec-checkout-btn" style="background:${brandColor}" onclick="emberCheckout()">Checkout &#x2192; <span id="ec-btn-price">${esc(store.price)}</span></button>
    <button class="ec-continue-btn" onclick="emberCloseCart()">Continue shopping</button>
  </div>
</div>
<script>
(function(){
  var ecBase=parseFloat("${esc(store.price)}".replace(/[^0-9.]/g,""))*100|0,ecQty=1;
  function ecFmt(p){return"£"+(p/100).toFixed(2);}
  window.emberQty=function(d){
    ecQty=Math.max(1,Math.min(ecQty+d,10));
    document.getElementById("ec-qty").textContent=ecQty;
    var t=ecFmt(ecBase*ecQty);
    document.getElementById("ec-total").textContent=t;
    document.getElementById("ec-btn-price").textContent=t;
  };
  window.emberOpenCart=function(){
    document.getElementById("ember-cart").classList.add("open");
    document.getElementById("ember-overlay").style.display="block";
    document.body.style.overflow="hidden";
  };
  window.emberCloseCart=function(){
    document.getElementById("ember-cart").classList.remove("open");
    document.getElementById("ember-overlay").style.display="none";
    document.body.style.overflow="";
  };
  window.emberCheckout=async function(){
    var sub=window.location.hostname.endsWith(".useember.io")?window.location.hostname.replace(".useember.io",""):null;
    if(!sub){alert("Checkout works on your live store.");return;}
    var btn=document.getElementById("ec-btn"),orig=btn.innerHTML;
    btn.textContent="Processing…";btn.style.opacity="0.6";btn.style.pointerEvents="none";
    try{
      var r=await fetch("/api/stripe/checkout",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({subdomain:sub,quantity:ecQty})
      });
      var d=await r.json();
      if(d.url){window.location.href=d.url;}
      else{alert(d.error||"Payments not set up yet.");btn.innerHTML=orig;btn.style.opacity="1";btn.style.pointerEvents="auto";}
    }catch(e){alert("Something went wrong — please try again.");btn.innerHTML=orig;btn.style.opacity="1";btn.style.pointerEvents="auto";}
  };
})();
</script>
</body>
</html>`;
}


// ─── Template 5 — Creator / Content (Digital) ─────────────────
export function generateDigitalCreatorTemplate(
  store: any,
  brandColor: string,
  productName: string,
): string {
  const esc = (s: string) => s?.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;") ?? "";
  const hex = brandColor.replace("#","");
  const rgb = [0,2,4].map(i=>parseInt(hex.slice(i,i+2),16)).join(",");
  const metaDesc = `${esc(productName)} by ${esc(store.brand)}. Instant download. ${esc(store.subheadline || "")}. 30-day money back guarantee.`;
  const storeUrl = `https://${store.brand?.toLowerCase().replace(/\s+/g,"-")}.useember.io`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(store.brand)} — ${esc(productName)} | Instant Download</title>
<meta name="description" content="${metaDesc}">
<meta name="robots" content="index,follow">
<link rel="canonical" href="${storeUrl}">
<meta property="og:type" content="product">
<meta property="og:title" content="${esc(store.brand)} — ${esc(productName)}">
<meta property="og:description" content="${metaDesc}">
<meta property="og:url" content="${storeUrl}">
<meta property="product:price:currency" content="GBP">
<meta property="product:price:amount" content="${store.price?.replace(/[^0-9.]/g,"") || "0"}">
<meta name="twitter:card" content="summary_large_image">
<script type="application/ld+json">${JSON.stringify({"@context":"https://schema.org","@type":"Product","name":store.brand+" "+productName,"description":store.description,"brand":{"@type":"Brand","name":store.brand},"offers":{"@type":"Offer","url":storeUrl,"priceCurrency":"GBP","price":store.price?.replace(/[^0-9.]/g,"")||"0","availability":"https://schema.org/InStock"},"aggregateRating":{"@type":"AggregateRating","ratingValue":"4.9","reviewCount":"38"}})}</script>
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🔥</text></svg>">
<style>
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#ffffff;color:#111827;}
.d-announce{background:#111827;padding:10px;text-align:center;font-size:12px;font-weight:700;color:white;letter-spacing:0.06em;}
.d-announce span{color:${brandColor};}
.d-nav{position:sticky;top:0;z-index:50;background:rgba(255,255,255,0.95);backdrop-filter:blur(12px);border-bottom:1px solid #e5e7eb;padding:16px 40px;display:flex;align-items:center;justify-content:space-between;}
.d-nav-brand{font-size:18px;font-weight:800;color:#111827;}
.d-nav-links{display:flex;align-items:center;gap:24px;font-size:13px;color:#6b7280;}
.d-nav-cta{padding:10px 22px;border-radius:10px;background:${brandColor};color:white;font-size:13px;font-weight:700;border:none;cursor:pointer;}
.d-hero{max-width:1080px;margin:0 auto;padding:72px 40px 56px;display:grid;grid-template-columns:1fr 420px;gap:64px;align-items:center;}
.d-hero-eyebrow{font-size:12px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;color:${brandColor};margin-bottom:16px;}
.d-hero h1{font-size:clamp(28px,4vw,48px);font-weight:800;line-height:1.08;letter-spacing:-0.04em;color:#111827;margin-bottom:20px;}
.d-hero-sub{font-size:17px;color:#6b7280;line-height:1.7;margin-bottom:28px;}
.d-meta{display:flex;gap:20px;margin-bottom:28px;flex-wrap:wrap;}
.d-meta-item{display:flex;align-items:center;gap:6px;font-size:13px;color:#374151;font-weight:500;}
.d-price-row{display:flex;align-items:center;gap:16px;margin-bottom:16px;}
.d-price{font-size:40px;font-weight:800;color:#111827;letter-spacing:-0.03em;}
.d-price-note{font-size:13px;color:#9ca3af;}
.d-cta{width:100%;padding:16px;border-radius:12px;background:${brandColor};color:white;font-size:17px;font-weight:800;border:none;cursor:pointer;box-shadow:0 8px 24px rgba(${rgb},0.3);transition:all 0.2s;margin-bottom:10px;}
.d-cta:hover{transform:translateY(-1px);box-shadow:0 12px 32px rgba(${rgb},0.4);}
.d-guarantee{font-size:12px;color:#9ca3af;text-align:center;}
.d-mockup{background:linear-gradient(135deg,rgba(${rgb},0.08),rgba(${rgb},0.03));border:1px solid rgba(${rgb},0.15);border-radius:20px;padding:32px;position:relative;}
.d-mockup-screen{background:white;border-radius:12px;padding:24px;box-shadow:0 4px 24px rgba(0,0,0,0.08);}
.d-mockup-bar{height:6px;background:${brandColor};border-radius:3px;margin-bottom:10px;width:60%;}
.d-mockup-line{height:4px;background:#e5e7eb;border-radius:2px;margin-bottom:8px;}
.d-mockup-badge{display:inline-block;background:rgba(${rgb},0.1);color:${brandColor};font-size:10px;font-weight:700;padding:4px 10px;border-radius:999px;margin-top:12px;}
.d-social-proof{display:flex;align-items:center;gap:16px;padding:12px 0;margin-bottom:20px;flex-wrap:wrap;}
.d-proof-item{display:flex;align-items:center;gap:6px;font-size:12px;font-weight:600;}
.d-proof-dot{width:7px;height:7px;border-radius:50%;animation:pulse 1.5s infinite;}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.4}}
.d-section{padding:64px 40px;max-width:1080px;margin:0 auto;}
.d-section-label{font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:${brandColor};margin-bottom:12px;}
.d-section-h2{font-size:clamp(22px,3vw,36px);font-weight:800;color:#111827;letter-spacing:-0.03em;margin-bottom:32px;}
.d-includes{display:grid;grid-template-columns:1fr 1fr;gap:12px;}
.d-include-item{display:flex;align-items:flex-start;gap:12px;padding:16px;background:#f9fafb;border:1px solid #e5e7eb;border-radius:14px;}
.d-include-icon{width:36px;height:36px;border-radius:8px;background:rgba(${rgb},0.1);display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;}
.d-include-title{font-size:13px;font-weight:700;color:#111827;margin-bottom:2px;}
.d-include-desc{font-size:12px;color:#6b7280;}
.d-preview{background:#f9fafb;border:1px solid #e5e7eb;border-radius:20px;overflow:hidden;margin-top:24px;}
.d-preview-header{padding:16px 24px;border-bottom:1px solid #e5e7eb;display:flex;align-items:center;gap:8px;}
.d-preview-dot{width:10px;height:10px;border-radius:50%;}
.d-preview-body{padding:24px;position:relative;}
.d-preview-blur{filter:blur(6px);pointer-events:none;user-select:none;}
.d-preview-overlay{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:linear-gradient(to bottom,rgba(249,250,251,0),rgba(249,250,251,0.95));}
.d-reviews-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;}
.d-review{background:#f9fafb;border:1px solid #e5e7eb;border-radius:16px;padding:20px;}
.d-review-stars{color:${brandColor};font-size:13px;margin-bottom:8px;}
.d-review-text{font-size:13px;color:#374151;line-height:1.7;margin-bottom:12px;}
.d-review-name{font-size:12px;color:#9ca3af;font-weight:600;}
.d-ba{display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:32px;}
.d-ba-card{padding:24px;border-radius:16px;}
.d-ba-label{font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:12px;}
.d-faq-item{border-bottom:1px solid #e5e7eb;padding:20px 0;}
.d-faq-q{font-size:15px;font-weight:700;color:#111827;margin-bottom:8px;}
.d-faq-a{font-size:14px;color:#6b7280;line-height:1.7;}
.d-final{background:linear-gradient(135deg,rgba(${rgb},0.06),rgba(${rgb},0.02));border-top:1px solid rgba(${rgb},0.12);border-bottom:1px solid rgba(${rgb},0.12);padding:80px 40px;text-align:center;}
.d-final h2{font-size:clamp(24px,4vw,40px);font-weight:800;color:#111827;letter-spacing:-0.03em;margin-bottom:12px;}
.d-final p{font-size:16px;color:#6b7280;margin-bottom:32px;}
.d-final-cta{padding:18px 48px;border-radius:14px;background:${brandColor};color:white;font-size:18px;font-weight:800;border:none;cursor:pointer;box-shadow:0 8px 28px rgba(${rgb},0.3);}
.d-footer{background:#111827;color:rgba(255,255,255,0.4);padding:24px 40px;display:flex;justify-content:space-between;align-items:center;font-size:12px;flex-wrap:wrap;gap:8px;}
</style>
</head>
<body>
<div class="d-announce">🚀 Instant download · 30-day money back guarantee · <span>Use code WELCOME10 for 10% off</span></div>
<nav class="d-nav">
  <div class="d-nav-brand">${esc(store.brand)}</div>
  <div class="d-nav-links">
    <span>What's inside</span>
    <span>Reviews</span>
    <span>FAQ</span>
  </div>
  <button class="d-nav-cta">Get instant access</button>
</nav>

<!-- HERO -->
<div class="d-hero">
  <div class="d-hero-text">
    <div class="d-hero-eyebrow">⚡ Instant digital download</div>
    <h1>${esc(store.headline || store.brand + " — " + productName)}</h1>
    <div class="d-hero-sub">${esc(store.subheadline || store.description)}</div>
    <div class="d-meta">
      <div class="d-meta-item">📄 Instant download</div>
      <div class="d-meta-item">♾️ Lifetime access</div>
      <div class="d-meta-item">🔄 Free updates</div>
      <div class="d-meta-item">🛡️ 30-day guarantee</div>
    </div>
    <!-- Social proof -->
    <div class="d-social-proof">
      <div class="d-proof-item" style="color:#16a34a;">
        <div class="d-proof-dot" style="background:#16a34a;"></div>
        <span id="d-viewers">12</span> people viewing now
      </div>
      <div class="d-proof-item" style="color:#6b7280;">
        🔥 <span id="d-sold">34</span> purchased this week
      </div>
    </div>
    <div class="d-price-row">
      <div class="d-price">${esc(store.price || "£29")}</div>
      <div class="d-price-note">One-time payment<br>Instant access</div>
    </div>
    <button class="d-cta">Get instant access →</button>
    <div class="d-guarantee">🛡️ 30-day money back guarantee · No questions asked</div>
  </div>
  <!-- Mockup -->
  <div class="d-mockup">
    <div style="font-size:11px;font-weight:700;color:${brandColor};letter-spacing:0.08em;text-transform:uppercase;margin-bottom:16px;">Preview</div>
    <div class="d-mockup-screen">
      <div class="d-mockup-bar"></div>
      <div class="d-mockup-line" style="width:90%"></div>
      <div class="d-mockup-line" style="width:75%"></div>
      <div class="d-mockup-line" style="width:60%"></div>
      <div style="height:1px;background:#e5e7eb;margin:16px 0;"></div>
      <div class="d-mockup-line" style="width:85%"></div>
      <div class="d-mockup-line" style="width:70%"></div>
      <div class="d-mockup-line" style="width:80%"></div>
      <div class="d-mockup-badge">${esc(productName)}</div>
    </div>
    <div style="text-align:center;margin-top:16px;font-size:11px;color:#9ca3af;">
      ⭐⭐⭐⭐⭐ 4.9/5 from 38 verified buyers
    </div>
  </div>
</div>

<!-- WHAT'S INSIDE -->
<div style="background:#f9fafb;border-top:1px solid #e5e7eb;border-bottom:1px solid #e5e7eb;padding:64px 40px;">
  <div style="max-width:1080px;margin:0 auto;">
    <div class="d-section-label">What you get</div>
    <div class="d-section-h2">Everything included in your download</div>
    <div class="d-includes">
      ${[
        ["📄","Instant PDF download","Full ${productName} — ready to use the moment you purchase"],
        ["⚡","Works immediately","No setup required. Open and start using straight away"],
        ["🔄","Free lifetime updates","Every improvement we make gets sent to you automatically"],
        ["📱","All devices","Works on desktop, tablet and mobile without any issues"],
        ["🛡️","30-day guarantee","Full refund if it's not right for you. No questions asked"],
        ["📧","Email support","Questions? We reply within 24 hours every time"],
      ].map(([icon,title,desc])=>`<div class="d-include-item"><div class="d-include-icon">${icon}</div><div><div class="d-include-title">${title}</div><div class="d-include-desc">${desc.replace("${productName}",esc(productName))}</div></div></div>`).join("")}
    </div>
    <!-- Preview -->
    <div class="d-preview">
      <div class="d-preview-header">
        <div class="d-preview-dot" style="background:#FCA5A5;"></div>
        <div class="d-preview-dot" style="background:#FCD34D;"></div>
        <div class="d-preview-dot" style="background:#6EE7B7;"></div>
        <div style="margin-left:8px;font-size:12px;color:#9ca3af;">${esc(productName)} — Preview</div>
      </div>
      <div class="d-preview-body">
        <div class="d-preview-blur">
          <div style="height:8px;background:#111827;border-radius:4px;width:50%;margin-bottom:12px;"></div>
          <div style="height:5px;background:#e5e7eb;border-radius:3px;width:90%;margin-bottom:8px;"></div>
          <div style="height:5px;background:#e5e7eb;border-radius:3px;width:75%;margin-bottom:8px;"></div>
          <div style="height:5px;background:#e5e7eb;border-radius:3px;width:85%;margin-bottom:20px;"></div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
            <div style="height:60px;background:rgba(${rgb},0.1);border-radius:8px;"></div>
            <div style="height:60px;background:rgba(${rgb},0.06);border-radius:8px;"></div>
          </div>
        </div>
        <div class="d-preview-overlay">
          <button class="d-cta" style="width:auto;padding:14px 32px;font-size:15px;">Unlock full access →</button>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- BEFORE / AFTER -->
<div class="d-section">
  <div class="d-section-label">The transformation</div>
  <div class="d-section-h2">Before and after</div>
  <div class="d-ba">
    <div class="d-ba-card" style="background:#fef2f2;border:1px solid #fecaca;">
      <div class="d-ba-label" style="color:#dc2626;">❌ Before</div>
      ${["Spending hours figuring it out yourself","Starting from scratch every time","Inconsistent results and wasted effort","No clear system or structure"].map(t=>`<div style="display:flex;gap:8px;margin-bottom:8px;font-size:13px;color:#374151;"><span>•</span>${t}</div>`).join("")}
    </div>
    <div class="d-ba-card" style="background:#f0fdf4;border:1px solid #bbf7d0;">
      <div class="d-ba-label" style="color:#16a34a;">✓ After</div>
      ${["Ready to use from the moment you download","Clear structure that works every time","Consistent professional results","Save hours every single week"].map(t=>`<div style="display:flex;gap:8px;margin-bottom:8px;font-size:13px;color:#374151;"><span>✓</span>${t}</div>`).join("")}
    </div>
  </div>
</div>

<!-- REVIEWS -->
<div style="background:#f9fafb;border-top:1px solid #e5e7eb;padding:64px 40px;">
  <div style="max-width:1080px;margin:0 auto;">
    <div class="d-section-label">Social proof</div>
    <div class="d-section-h2">What people are saying</div>
    <div class="d-reviews-grid">
      ${[
        ["⭐⭐⭐⭐⭐","Started using it the same day I downloaded it. Saved me hours in the first week alone.","Sarah M.","UK · Verified buyer"],
        ["⭐⭐⭐⭐⭐","I've tried everything in this space. This is by far the most practical and well structured I've found.","James T.","US · Verified buyer"],
        ["⭐⭐⭐⭐⭐","The results speak for themselves. Can't imagine going back to how I did things before.","Priya K.","AU · Verified buyer"],
      ].map(([stars,text,name,meta])=>`<div class="d-review"><div class="d-review-stars">${stars}</div><div class="d-review-text">"${text}"</div><div class="d-review-name">${name} · ${meta}</div></div>`).join("")}
    </div>
  </div>
</div>

<!-- FAQ -->
<div class="d-section">
  <div class="d-section-label">FAQ</div>
  <div class="d-section-h2">Common questions</div>
  ${[
    ["How do I get access?","Instantly — the moment your payment goes through you'll receive a download link by email. No waiting."],
    ["What format is it in?","PDF and where applicable, a working template file. Compatible with all major apps and devices."],
    ["Do I need any special software?","No — works with free tools you likely already have. Full setup instructions included."],
    ["What if it's not right for me?","We offer a 30-day full refund. No questions asked. Just email us."],
    ["Are updates included?","Yes — every future update is sent to you automatically at no extra cost."],
  ].map(([q,a])=>`<div class="d-faq-item"><div class="d-faq-q">${q}</div><div class="d-faq-a">${a}</div></div>`).join("")}
</div>

<!-- FINAL CTA -->
<div class="d-final">
  <div class="d-section-label" style="text-align:center;">Ready to start?</div>
  <h2>Get ${esc(productName)} now</h2>
  <p>Instant download · Lifetime access · 30-day money back guarantee</p>
  <button class="d-final-cta">Get instant access — ${esc(store.price || "£29")} →</button>
  <div style="font-size:12px;color:#9ca3af;margin-top:12px;">
    <span style="margin:0 8px;">✓ Instant delivery</span>
    <span style="margin:0 8px;">✓ Lifetime access</span>
    <span style="margin:0 8px;">✓ 30-day guarantee</span>
  </div>
</div>

<footer class="d-footer">
  <div>© ${new Date().getFullYear()} ${esc(store.brand)}</div>
  <div style="display:flex;gap:16px;"><span>Privacy</span><span>Terms</span><span>Support</span></div>
  <div>⚡ Built with Ember 🔥</div>
</footer>

<!-- Sticky bar (mobile) -->
<div class="d-sticky">
  <div>
    <div style="font-size:13px;font-weight:700;color:#111827;">${esc(productName)}</div>
    <div style="font-size:12px;color:#9ca3af;">${esc(store.price || "£29")} · Instant access</div>
  </div>
  <button style="padding:12px 24px;border-radius:10px;border:none;background:${brandColor};color:white;font-weight:700;font-size:14px;cursor:pointer;white-space:nowrap;">Get access →</button>
</div>

<script>
document.getElementById("d-viewers").textContent = Math.floor(Math.random()*(20-8)+8);
document.getElementById("d-sold").textContent = Math.floor(Math.random()*(60-20)+20);
</script>
<script>
(function(){
  // Ember cart — opens cart drawer on buy button click
  function getSubdomain(){
    var h = window.location.hostname;
    if(h.endsWith(".useember.io")) return h.replace(".useember.io","");
    return null;
  }
  function startCheckout(e){
    if(e){ e.preventDefault(); e.stopPropagation(); }
    var sub = getSubdomain();
    if(!sub){ alert("This is a preview — checkout works on your live store."); return; }
    emberOpenCart();
  }
  // Attach to all buy button classes across all templates (incl. hero-cta)
  var selectors = [".hero-cta",".scroll-cta",".sticky-cta",".header-cta",".final-cta-btn",".d-cta",".d-nav-cta",".d-final-cta",".c-enrol",".c-nav-cta",".sticky-cart-btn",".cta-btn",".nav-cta"];
  function attach(){
    document.querySelectorAll(selectors.join(",")).forEach(function(el){
      if(el.getAttribute("data-ember-checkout")) return;
      el.setAttribute("data-ember-checkout","1");
      el.addEventListener("click", startCheckout);
    });
  }
  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", attach);
  } else { attach(); }
})();
</script>
<style>
#ember-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,0.45);z-index:9998;backdrop-filter:blur(3px);}
#ember-cart{position:fixed;top:0;right:0;bottom:0;width:100%;max-width:400px;background:#fff;z-index:9999;transform:translateX(100%);transition:transform 0.32s cubic-bezier(0.4,0,0.2,1);display:flex;flex-direction:column;box-shadow:-12px 0 60px rgba(0,0,0,0.15);}
#ember-cart.open{transform:translateX(0);}
.ec-head{padding:20px 24px;border-bottom:1px solid #f3f4f6;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;}
.ec-title{font-size:16px;font-weight:700;color:#111827;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-close{width:32px;height:32px;border:none;background:rgba(0,0,0,0.06);border-radius:8px;cursor:pointer;font-size:20px;color:#374151;display:flex;align-items:center;justify-content:center;line-height:1;}
.ec-body{flex:1;padding:24px;overflow-y:auto;}
.ec-item{display:flex;gap:16px;align-items:flex-start;padding-bottom:20px;border-bottom:1px solid #f3f4f6;}
.ec-icon{width:72px;height:72px;background:#f9fafb;border-radius:12px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:28px;}
.ec-name{font-size:14px;font-weight:700;color:#111827;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;margin-bottom:6px;line-height:1.4;}
.ec-price{font-size:17px;font-weight:800;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-qty-row{display:flex;align-items:center;justify-content:space-between;margin-top:20px;}
.ec-qty-label{font-size:14px;color:#6b7280;font-weight:500;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-qty-ctrl{display:flex;align-items:center;border:1.5px solid #e5e7eb;border-radius:10px;overflow:hidden;}
.ec-qty-btn{width:38px;height:38px;border:none;background:#fff;cursor:pointer;font-size:20px;color:#374151;display:flex;align-items:center;justify-content:center;line-height:1;}
.ec-qty-btn:hover{background:#f9fafb;}
.ec-qty-num{width:38px;text-align:center;font-size:15px;font-weight:700;color:#111827;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;line-height:38px;}
.ec-total-row{display:flex;justify-content:space-between;align-items:center;margin-top:16px;padding:16px;background:#f9fafb;border-radius:12px;}
.ec-total-label{font-size:14px;font-weight:600;color:#374151;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-total-val{font-size:20px;font-weight:800;color:#111827;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-trust{margin-top:16px;display:flex;flex-direction:column;gap:8px;}
.ec-trust-item{display:flex;align-items:center;gap:8px;font-size:12px;color:#6b7280;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-foot{padding:20px 24px;border-top:1px solid #f3f4f6;flex-shrink:0;}
.ec-checkout-btn{width:100%;padding:16px;border:none;color:#fff;border-radius:12px;font-size:16px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;letter-spacing:0.01em;transition:opacity 0.15s;}
.ec-checkout-btn:hover{opacity:0.9;}
.ec-continue-btn{width:100%;padding:12px;border:none;background:transparent;color:#9ca3af;font-size:13px;cursor:pointer;margin-top:4px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
@media(max-width:480px){#ember-cart{max-width:100%;}}
</style>
<div id="ember-overlay" onclick="emberCloseCart()"></div>
<div id="ember-cart">
  <div class="ec-head">
    <span class="ec-title">Your bag</span>
    <button class="ec-close" onclick="emberCloseCart()">&#x2715;</button>
  </div>
  <div class="ec-body">
    <div class="ec-item">
      <div class="ec-icon">&#x1F6CD;&#xFE0F;</div>
      <div style="flex:1;min-width:0;">
        <div class="ec-name">${esc(productName)}</div>
        <div class="ec-price" style="color:${brandColor}">${esc(store.price)}</div>
      </div>
    </div>
    <div class="ec-qty-row">
      <span class="ec-qty-label">Quantity</span>
      <div class="ec-qty-ctrl">
        <button class="ec-qty-btn" onclick="emberQty(-1)">&#x2212;</button>
        <span id="ec-qty" class="ec-qty-num">1</span>
        <button class="ec-qty-btn" onclick="emberQty(1)">&#x2B;</button>
      </div>
    </div>
    <div class="ec-total-row">
      <span class="ec-total-label">Order total</span>
      <span id="ec-total" class="ec-total-val">${esc(store.price)}</span>
    </div>
    <div class="ec-trust">
      <div class="ec-trust-item">&#x1F512; Secure checkout powered by Stripe</div>
      <div class="ec-trust-item">&#x21A9;&#xFE0F; 30-day money-back guarantee</div>
      <div class="ec-trust-item">&#x26A1; Instant confirmation after purchase</div>
    </div>
  </div>
  <div class="ec-foot">
    <button id="ec-btn" class="ec-checkout-btn" style="background:${brandColor}" onclick="emberCheckout()">Checkout &#x2192; <span id="ec-btn-price">${esc(store.price)}</span></button>
    <button class="ec-continue-btn" onclick="emberCloseCart()">Continue shopping</button>
  </div>
</div>
<script>
(function(){
  var ecBase=parseFloat("${esc(store.price)}".replace(/[^0-9.]/g,""))*100|0,ecQty=1;
  function ecFmt(p){return"£"+(p/100).toFixed(2);}
  window.emberQty=function(d){
    ecQty=Math.max(1,Math.min(ecQty+d,10));
    document.getElementById("ec-qty").textContent=ecQty;
    var t=ecFmt(ecBase*ecQty);
    document.getElementById("ec-total").textContent=t;
    document.getElementById("ec-btn-price").textContent=t;
  };
  window.emberOpenCart=function(){
    document.getElementById("ember-cart").classList.add("open");
    document.getElementById("ember-overlay").style.display="block";
    document.body.style.overflow="hidden";
  };
  window.emberCloseCart=function(){
    document.getElementById("ember-cart").classList.remove("open");
    document.getElementById("ember-overlay").style.display="none";
    document.body.style.overflow="";
  };
  window.emberCheckout=async function(){
    var sub=window.location.hostname.endsWith(".useember.io")?window.location.hostname.replace(".useember.io",""):null;
    if(!sub){alert("Checkout works on your live store.");return;}
    var btn=document.getElementById("ec-btn"),orig=btn.innerHTML;
    btn.textContent="Processing…";btn.style.opacity="0.6";btn.style.pointerEvents="none";
    try{
      var r=await fetch("/api/stripe/checkout",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({subdomain:sub,quantity:ecQty})
      });
      var d=await r.json();
      if(d.url){window.location.href=d.url;}
      else{alert(d.error||"Payments not set up yet.");btn.innerHTML=orig;btn.style.opacity="1";btn.style.pointerEvents="auto";}
    }catch(e){alert("Something went wrong — please try again.");btn.innerHTML=orig;btn.style.opacity="1";btn.style.pointerEvents="auto";}
  };
})();
</script>
</body>
</html>`;
}



// ─── Template 6 — Course / Program (Digital) ──────────────────
export function generateDigitalCourseTemplate(
  store: any,
  brandColor: string,
  productName: string,
): string {
  const esc = (s: string) => s?.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;") ?? "";
  const hex = brandColor.replace("#","");
  const rgb = [0,2,4].map(i=>parseInt(hex.slice(i,i+2),16)).join(",");
  const metaDesc = `${esc(productName)} by ${esc(store.brand)}. ${esc(store.subheadline || "")}. Instant access. 30-day money back guarantee.`;
  const storeUrl = `https://${store.brand?.toLowerCase().replace(/\s+/g,"-")}.useember.io`;

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(store.brand)} — ${esc(productName)}</title>
<meta name="description" content="${metaDesc}">
<meta name="robots" content="index,follow">
<link rel="canonical" href="${storeUrl}">
<meta property="og:type" content="product">
<meta property="og:title" content="${esc(store.brand)} — ${esc(productName)}">
<meta property="og:description" content="${metaDesc}">
<meta property="og:url" content="${storeUrl}">
<script type="application/ld+json">${JSON.stringify({"@context":"https://schema.org","@type":"Course","name":productName,"description":store.description,"provider":{"@type":"Organization","name":store.brand},"offers":{"@type":"Offer","url":storeUrl,"priceCurrency":"GBP","price":store.price?.replace(/[^0-9.]/g,"")||"0","availability":"https://schema.org/InStock"}})}</script>
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🔥</text></svg>">
<style>
*{box-sizing:border-box;margin:0;padding:0;}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#0a0a0a;color:white;}
.c-announce{background:${brandColor};padding:10px;text-align:center;font-size:12px;font-weight:700;color:white;letter-spacing:0.06em;}
.c-nav{position:sticky;top:0;z-index:50;background:rgba(10,10,10,0.95);backdrop-filter:blur(12px);border-bottom:1px solid rgba(255,255,255,0.08);padding:16px 40px;display:flex;align-items:center;justify-content:space-between;}
.c-nav-brand{font-size:18px;font-weight:800;background:linear-gradient(135deg,${brandColor},white);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
.c-nav-links{display:flex;gap:24px;font-size:13px;color:rgba(255,255,255,0.5);}
.c-nav-cta{padding:10px 22px;border-radius:10px;background:${brandColor};color:white;font-size:13px;font-weight:700;border:none;cursor:pointer;}
.c-hero{padding:100px 40px 80px;max-width:900px;margin:0 auto;text-align:center;position:relative;}
.c-hero::before{content:'';position:absolute;top:0;left:50%;transform:translateX(-50%);width:600px;height:400px;background:radial-gradient(circle,rgba(${rgb},0.15) 0%,transparent 70%);pointer-events:none;}
.c-badge{display:inline-flex;align-items:center;gap:8px;padding:8px 18px;border-radius:999px;border:1px solid rgba(${rgb},0.4);color:${brandColor};font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;margin-bottom:28px;}
.c-hero h1{font-size:clamp(32px,5vw,60px);font-weight:900;line-height:1.04;letter-spacing:-0.04em;margin-bottom:24px;background:linear-gradient(135deg,white 60%,rgba(255,255,255,0.6));-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
.c-hero-sub{font-size:18px;color:rgba(255,255,255,0.55);line-height:1.7;max-width:600px;margin:0 auto 40px;}
.c-stats{display:flex;justify-content:center;gap:48px;margin-bottom:48px;flex-wrap:wrap;}
.c-stat-num{font-size:36px;font-weight:800;color:${brandColor};line-height:1;}
.c-stat-lbl{font-size:12px;color:rgba(255,255,255,0.4);margin-top:4px;}
.c-price-box{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.1);border-radius:20px;padding:32px;max-width:400px;margin:0 auto;}
.c-price{font-size:52px;font-weight:900;background:linear-gradient(135deg,${brandColor},white);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;letter-spacing:-0.04em;margin-bottom:4px;}
.c-price-note{font-size:13px;color:rgba(255,255,255,0.35);margin-bottom:24px;}
.c-enrol{width:100%;padding:18px;border-radius:14px;background:${brandColor};color:white;font-size:18px;font-weight:800;border:none;cursor:pointer;box-shadow:0 8px 32px rgba(${rgb},0.4);margin-bottom:12px;}
.c-guarantee{font-size:12px;color:rgba(255,255,255,0.35);}
.c-social{display:flex;justify-content:center;gap:24px;margin-bottom:32px;flex-wrap:wrap;}
.c-social-item{display:flex;align-items:center;gap:6px;font-size:12px;color:rgba(255,255,255,0.5);}
.c-section{padding:80px 40px;max-width:900px;margin:0 auto;}
.c-section-eyebrow{font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:${brandColor};margin-bottom:12px;}
.c-section-h2{font-size:clamp(24px,4vw,40px);font-weight:800;letter-spacing:-0.03em;margin-bottom:40px;}
.c-modules{display:flex;flex-direction:column;gap:2px;}
.c-module{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:14px;padding:20px 24px;display:flex;align-items:flex-start;gap:16px;margin-bottom:4px;}
.c-module-num{width:36px;height:36px;border-radius:8px;background:rgba(${rgb},0.15);border:1px solid rgba(${rgb},0.3);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:800;color:${brandColor};flex-shrink:0;}
.c-module-title{font-size:14px;font-weight:700;color:white;margin-bottom:4px;}
.c-module-desc{font-size:12px;color:rgba(255,255,255,0.4);}
.c-for-who{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
.c-for-card{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:20px;}
.c-for-title{font-size:13px;font-weight:700;color:white;margin-bottom:12px;}
.c-for-item{display:flex;gap:8px;font-size:12px;color:rgba(255,255,255,0.5);margin-bottom:6px;align-items:flex-start;}
.c-reviews-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;}
.c-review{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:16px;padding:20px;}
.c-review-stars{color:${brandColor};font-size:13px;margin-bottom:8px;}
.c-review-text{font-size:13px;color:rgba(255,255,255,0.6);line-height:1.7;margin-bottom:12px;}
.c-review-name{font-size:11px;color:rgba(255,255,255,0.3);font-weight:600;}
.c-faq-item{border-bottom:1px solid rgba(255,255,255,0.08);padding:20px 0;}
.c-faq-q{font-size:15px;font-weight:700;color:white;margin-bottom:8px;}
.c-faq-a{font-size:14px;color:rgba(255,255,255,0.5);line-height:1.7;}
.c-final{background:radial-gradient(ellipse at 50% 0%,rgba(${rgb},0.2) 0%,transparent 70%);border-top:1px solid rgba(255,255,255,0.06);padding:100px 40px;text-align:center;}
.c-final h2{font-size:clamp(28px,5vw,52px);font-weight:900;letter-spacing:-0.04em;margin-bottom:16px;}
.c-final p{font-size:17px;color:rgba(255,255,255,0.5);margin-bottom:40px;}
.c-footer{background:rgba(255,255,255,0.02);border-top:1px solid rgba(255,255,255,0.06);padding:24px 40px;display:flex;justify-content:space-between;align-items:center;font-size:12px;color:rgba(255,255,255,0.25);flex-wrap:wrap;gap:8px;}
</style>
</head>
<body>
<div class="c-announce">🔥 Limited time — use code WELCOME10 for 10% off · Instant access after payment</div>
<nav class="c-nav">
  <div class="c-nav-brand">${esc(store.brand)}</div>
  <div class="c-nav-links d-nav-links">
    <span>Curriculum</span>
    <span>Results</span>
    <span>FAQ</span>
  </div>
  <button class="c-nav-cta">Enrol now</button>
</nav>

<!-- HERO -->
<div class="c-hero">
  <div class="c-badge">⚡ Digital programme · Instant access</div>
  <h1>${esc(store.headline || productName)}</h1>
  <div class="c-hero-sub">${esc(store.subheadline || store.description)}</div>

  <!-- Social proof signals -->
  <div class="c-social">
    <div class="c-social-item">
      <div style="width:7px;height:7px;border-radius:50%;background:#16a34a;animation:pulse 1.5s infinite;"></div>
      <span id="c-viewers">18</span> people enrolled this week
    </div>
    <div class="c-social-item">⭐⭐⭐⭐⭐ 4.9 rating</div>
    <div class="c-social-item">🛡️ 30-day guarantee</div>
  </div>

  <!-- Stats -->
  <div class="c-stats">
    ${[["4.9★","Student rating"],["100%","Satisfaction rate"],["30 day","Money back"],["Instant","Access"]].map(([num,lbl])=>`<div><div class="c-stat-num">${num}</div><div class="c-stat-lbl">${lbl}</div></div>`).join("")}
  </div>

  <!-- Price box -->
  <div class="c-price-box">
    <div class="c-price">${esc(store.price || "£49")}</div>
    <div class="c-price-note">One-time payment · Lifetime access · Free updates</div>
    <button class="c-enrol">Enrol now and get instant access →</button>
    <div class="c-guarantee">🛡️ 30-day money back guarantee · No questions asked</div>
  </div>
</div>

<!-- CURRICULUM -->
<div style="background:rgba(255,255,255,0.02);border-top:1px solid rgba(255,255,255,0.06);border-bottom:1px solid rgba(255,255,255,0.06);padding:80px 40px;">
  <div style="max-width:900px;margin:0 auto;">
    <div class="c-section-eyebrow">What's inside</div>
    <div class="c-section-h2">The full curriculum</div>
    <div class="c-modules">
      ${[
        ["Module 1","Foundation","Everything you need to know to get started fast. No fluff, no filler."],
        ["Module 2","Core system","The exact framework we use to get consistent results every time."],
        ["Module 3","Advanced tactics","How to take what's working and multiply the results."],
        ["Module 4","Execution","Step-by-step implementation so you can put it all into practice immediately."],
        ["Bonus","Resources & templates","Plug-and-play resources so you're never starting from scratch."],
      ].map(([num,title,desc])=>`<div class="c-module"><div class="c-module-num">${num.replace("Module ","").replace("Bonus","★")}</div><div><div class="c-module-title">${title}</div><div class="c-module-desc">${desc}</div></div></div>`).join("")}
    </div>
  </div>
</div>

<!-- WHO IS IT FOR -->
<div class="c-section">
  <div class="c-section-eyebrow">Is this right for you?</div>
  <div class="c-section-h2">Who this is for</div>
  <div class="c-for-who">
    <div class="c-for-card">
      <div class="c-for-title" style="color:#16a34a;">✓ This is for you if...</div>
      ${["You want proven results not theory","You're tired of figuring it out alone","You want a clear system to follow","You're ready to take action now"].map(t=>`<div class="c-for-item"><span style="color:#16a34a;">✓</span>${t}</div>`).join("")}
    </div>
    <div class="c-for-card">
      <div class="c-for-title" style="color:#ef4444;">✗ This is NOT for you if...</div>
      ${["You want a magic overnight solution","You're not willing to put in the work","You're looking for free content only","You need hand-holding every step"].map(t=>`<div class="c-for-item"><span style="color:#ef4444;">✗</span>${t}</div>`).join("")}
    </div>
  </div>
</div>

<!-- RESULTS -->
<div style="background:rgba(255,255,255,0.02);border-top:1px solid rgba(255,255,255,0.06);border-bottom:1px solid rgba(255,255,255,0.06);padding:80px 40px;">
  <div style="max-width:900px;margin:0 auto;">
    <div class="c-section-eyebrow">Student results</div>
    <div class="c-section-h2">What people are achieving</div>
    <div class="c-reviews-grid d-reviews-grid">
      ${[
        ["⭐⭐⭐⭐⭐","Implemented it in a weekend and saw results in the first week. Genuinely one of the best investments I've made.","Marcus R.","UK · Verified student"],
        ["⭐⭐⭐⭐⭐","Clear, practical and no fluff. Every module builds on the last. I finished the whole thing in 3 days.","Olivia K.","US · Verified student"],
        ["⭐⭐⭐⭐⭐","I've bought other courses in this space. This is the only one I actually finished and used.","Liam T.","AU · Verified student"],
      ].map(([stars,text,name,meta])=>`<div class="c-review"><div class="c-review-stars">${stars}</div><div class="c-review-text">"${text}"</div><div class="c-review-name">${name} · ${meta}</div></div>`).join("")}
    </div>
  </div>
</div>

<!-- FAQ -->
<div class="c-section">
  <div class="c-section-eyebrow">FAQ</div>
  <div class="c-section-h2">Questions answered</div>
  ${[
    ["How do I access it after purchase?","Instantly — you receive a link by email the moment your payment is confirmed. No waiting."],
    ["How long do I have access for?","Forever. Pay once, access for life. All future updates included at no extra cost."],
    ["What if it's not right for me?","30-day full refund. No questions, no hassle. Just email us within 30 days."],
    ["How long does it take to complete?","Most students complete the core modules in a weekend. You go at your own pace."],
    ["Do I need any previous experience?","No — the programme starts from the beginning and builds progressively."],
  ].map(([q,a])=>`<div class="c-faq-item"><div class="c-faq-q">${q}</div><div class="c-faq-a">${a}</div></div>`).join("")}
</div>

<!-- FINAL CTA -->
<div class="c-final">
  <div style="font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:${brandColor};margin-bottom:16px;">Ready to start?</div>
  <h2>Enrol in ${esc(productName)}</h2>
  <p>Instant access · Lifetime updates · 30-day guarantee</p>
  <div class="c-price-box" style="display:inline-block;text-align:center;min-width:360px;">
    <div class="c-price">${esc(store.price || "£49")}</div>
    <div class="c-price-note">One-time · Lifetime access · Free updates</div>
    <button class="c-enrol">Enrol now →</button>
    <div class="c-guarantee">🛡️ 30-day money back guarantee</div>
  </div>
</div>

<footer class="c-footer">
  <div>© ${new Date().getFullYear()} ${esc(store.brand)}</div>
  <div style="display:flex;gap:16px;"><span>Privacy</span><span>Terms</span><span>Support</span></div>
  <div>⚡ Built with Ember 🔥</div>
</footer>

<!-- Sticky bar (mobile) -->
<div class="d-sticky" style="background:#0a0a0a;border-top:1px solid rgba(255,255,255,0.1);">
  <div>
    <div style="font-size:13px;font-weight:700;color:white;">${esc(productName)}</div>
    <div style="font-size:12px;color:rgba(255,255,255,0.4);">${esc(store.price || "£49")} · Instant access</div>
  </div>
  <button style="padding:12px 24px;border-radius:10px;border:none;background:${brandColor};color:white;font-weight:700;font-size:14px;cursor:pointer;white-space:nowrap;">Enrol now →</button>
</div>

<script>
document.getElementById("c-viewers").textContent = Math.floor(Math.random()*(30-10)+10);
</script>
<script>
(function(){
  // Ember cart — opens cart drawer on buy button click
  function getSubdomain(){
    var h = window.location.hostname;
    if(h.endsWith(".useember.io")) return h.replace(".useember.io","");
    return null;
  }
  function startCheckout(e){
    if(e){ e.preventDefault(); e.stopPropagation(); }
    var sub = getSubdomain();
    if(!sub){ alert("This is a preview — checkout works on your live store."); return; }
    emberOpenCart();
  }
  // Attach to all buy button classes across all templates (incl. hero-cta)
  var selectors = [".hero-cta",".scroll-cta",".sticky-cta",".header-cta",".final-cta-btn",".d-cta",".d-nav-cta",".d-final-cta",".c-enrol",".c-nav-cta",".sticky-cart-btn",".cta-btn",".nav-cta"];
  function attach(){
    document.querySelectorAll(selectors.join(",")).forEach(function(el){
      if(el.getAttribute("data-ember-checkout")) return;
      el.setAttribute("data-ember-checkout","1");
      el.addEventListener("click", startCheckout);
    });
  }
  if(document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", attach);
  } else { attach(); }
})();
</script>
<style>
#ember-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,0.45);z-index:9998;backdrop-filter:blur(3px);}
#ember-cart{position:fixed;top:0;right:0;bottom:0;width:100%;max-width:400px;background:#fff;z-index:9999;transform:translateX(100%);transition:transform 0.32s cubic-bezier(0.4,0,0.2,1);display:flex;flex-direction:column;box-shadow:-12px 0 60px rgba(0,0,0,0.15);}
#ember-cart.open{transform:translateX(0);}
.ec-head{padding:20px 24px;border-bottom:1px solid #f3f4f6;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;}
.ec-title{font-size:16px;font-weight:700;color:#111827;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-close{width:32px;height:32px;border:none;background:rgba(0,0,0,0.06);border-radius:8px;cursor:pointer;font-size:20px;color:#374151;display:flex;align-items:center;justify-content:center;line-height:1;}
.ec-body{flex:1;padding:24px;overflow-y:auto;}
.ec-item{display:flex;gap:16px;align-items:flex-start;padding-bottom:20px;border-bottom:1px solid #f3f4f6;}
.ec-icon{width:72px;height:72px;background:#f9fafb;border-radius:12px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:28px;}
.ec-name{font-size:14px;font-weight:700;color:#111827;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;margin-bottom:6px;line-height:1.4;}
.ec-price{font-size:17px;font-weight:800;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-qty-row{display:flex;align-items:center;justify-content:space-between;margin-top:20px;}
.ec-qty-label{font-size:14px;color:#6b7280;font-weight:500;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-qty-ctrl{display:flex;align-items:center;border:1.5px solid #e5e7eb;border-radius:10px;overflow:hidden;}
.ec-qty-btn{width:38px;height:38px;border:none;background:#fff;cursor:pointer;font-size:20px;color:#374151;display:flex;align-items:center;justify-content:center;line-height:1;}
.ec-qty-btn:hover{background:#f9fafb;}
.ec-qty-num{width:38px;text-align:center;font-size:15px;font-weight:700;color:#111827;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;line-height:38px;}
.ec-total-row{display:flex;justify-content:space-between;align-items:center;margin-top:16px;padding:16px;background:#f9fafb;border-radius:12px;}
.ec-total-label{font-size:14px;font-weight:600;color:#374151;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-total-val{font-size:20px;font-weight:800;color:#111827;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-trust{margin-top:16px;display:flex;flex-direction:column;gap:8px;}
.ec-trust-item{display:flex;align-items:center;gap:8px;font-size:12px;color:#6b7280;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-foot{padding:20px 24px;border-top:1px solid #f3f4f6;flex-shrink:0;}
.ec-checkout-btn{width:100%;padding:16px;border:none;color:#fff;border-radius:12px;font-size:16px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;letter-spacing:0.01em;transition:opacity 0.15s;}
.ec-checkout-btn:hover{opacity:0.9;}
.ec-continue-btn{width:100%;padding:12px;border:none;background:transparent;color:#9ca3af;font-size:13px;cursor:pointer;margin-top:4px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
@media(max-width:480px){#ember-cart{max-width:100%;}}
</style>
<div id="ember-overlay" onclick="emberCloseCart()"></div>
<div id="ember-cart">
  <div class="ec-head">
    <span class="ec-title">Your bag</span>
    <button class="ec-close" onclick="emberCloseCart()">&#x2715;</button>
  </div>
  <div class="ec-body">
    <div class="ec-item">
      <div class="ec-icon">&#x1F6CD;&#xFE0F;</div>
      <div style="flex:1;min-width:0;">
        <div class="ec-name">${esc(productName)}</div>
        <div class="ec-price" style="color:${brandColor}">${esc(store.price)}</div>
      </div>
    </div>
    <div class="ec-qty-row">
      <span class="ec-qty-label">Quantity</span>
      <div class="ec-qty-ctrl">
        <button class="ec-qty-btn" onclick="emberQty(-1)">&#x2212;</button>
        <span id="ec-qty" class="ec-qty-num">1</span>
        <button class="ec-qty-btn" onclick="emberQty(1)">&#x2B;</button>
      </div>
    </div>
    <div class="ec-total-row">
      <span class="ec-total-label">Order total</span>
      <span id="ec-total" class="ec-total-val">${esc(store.price)}</span>
    </div>
    <div class="ec-trust">
      <div class="ec-trust-item">&#x1F512; Secure checkout powered by Stripe</div>
      <div class="ec-trust-item">&#x21A9;&#xFE0F; 30-day money-back guarantee</div>
      <div class="ec-trust-item">&#x26A1; Instant confirmation after purchase</div>
    </div>
  </div>
  <div class="ec-foot">
    <button id="ec-btn" class="ec-checkout-btn" style="background:${brandColor}" onclick="emberCheckout()">Checkout &#x2192; <span id="ec-btn-price">${esc(store.price)}</span></button>
    <button class="ec-continue-btn" onclick="emberCloseCart()">Continue shopping</button>
  </div>
</div>
<script>
(function(){
  var ecBase=parseFloat("${esc(store.price)}".replace(/[^0-9.]/g,""))*100|0,ecQty=1;
  function ecFmt(p){return"£"+(p/100).toFixed(2);}
  window.emberQty=function(d){
    ecQty=Math.max(1,Math.min(ecQty+d,10));
    document.getElementById("ec-qty").textContent=ecQty;
    var t=ecFmt(ecBase*ecQty);
    document.getElementById("ec-total").textContent=t;
    document.getElementById("ec-btn-price").textContent=t;
  };
  window.emberOpenCart=function(){
    document.getElementById("ember-cart").classList.add("open");
    document.getElementById("ember-overlay").style.display="block";
    document.body.style.overflow="hidden";
  };
  window.emberCloseCart=function(){
    document.getElementById("ember-cart").classList.remove("open");
    document.getElementById("ember-overlay").style.display="none";
    document.body.style.overflow="";
  };
  window.emberCheckout=async function(){
    var sub=window.location.hostname.endsWith(".useember.io")?window.location.hostname.replace(".useember.io",""):null;
    if(!sub){alert("Checkout works on your live store.");return;}
    var btn=document.getElementById("ec-btn"),orig=btn.innerHTML;
    btn.textContent="Processing…";btn.style.opacity="0.6";btn.style.pointerEvents="none";
    try{
      var r=await fetch("/api/stripe/checkout",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({subdomain:sub,quantity:ecQty})
      });
      var d=await r.json();
      if(d.url){window.location.href=d.url;}
      else{alert(d.error||"Payments not set up yet.");btn.innerHTML=orig;btn.style.opacity="1";btn.style.pointerEvents="auto";}
    }catch(e){alert("Something went wrong — please try again.");btn.innerHTML=orig;btn.style.opacity="1";btn.style.pointerEvents="auto";}
  };
})();
</script>
</body>
</html>`;
}