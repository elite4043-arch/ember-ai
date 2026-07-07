// app/store/[slug]/page.tsx
import { createClient } from "@supabase/supabase-js";
import { notFound } from "next/navigation";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const dynamic = "force-dynamic";
export const runtime = "edge";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const { data: store } = await supabase
    .from("stores")
    .select("brand, product_name, description")
    .eq("subdomain", slug)
    .eq("published", true)
    .single();

  if (!store) return { title: "Store not found" };

  const brand = store.brand || store.product_name || "Store";
  const product = store.product_name || "";
  const title = product && product !== brand ? `${brand} — ${product}` : brand;

  return {
    title,
    description: store.description || `Shop ${brand} on Ember`,
    icons: {
      icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🔥</text></svg>",
    },
  };
}

// Inject cart into legacy store HTML that predates the cart system
function patchHtml(html: string, store: any): string {
  // Fix hardcoded absolute URLs → relative so fetch is same-origin (no CORS from subdomain)
  html = html.replace(/https:\/\/www\.useember\.io\/api\/stripe\/checkout/g, "/api/stripe/checkout");

  if (html.includes('id="ember-cart"')) return html; // already has cart

  const subdomain = store.subdomain || "";
  const priceStr = (store.price || "£0").replace(/&amp;/g, "&");
  const pricePence = store.price_pence || 0;
  const productName = (store.product_name || "").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  const brandColor = store.brand_color || "#ea580c";

  const patch = `
<style>
#ember-overlay{display:none;position:fixed;inset:0;background:rgba(0,0,0,0.45);z-index:9998;backdrop-filter:blur(3px);}
#ember-cart{position:fixed;top:0;right:0;bottom:0;width:100%;max-width:400px;background:#fff;z-index:9999;transform:translateX(100%);transition:transform 0.32s cubic-bezier(0.4,0,0.2,1);display:flex;flex-direction:column;box-shadow:-12px 0 60px rgba(0,0,0,0.15);}
#ember-cart.open{transform:translateX(0);}
.ec-head{padding:20px 24px;border-bottom:1px solid #f3f4f6;display:flex;align-items:center;justify-content:space-between;flex-shrink:0;}
.ec-title{font-size:16px;font-weight:700;color:#111827;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-close{width:32px;height:32px;border:none;background:rgba(0,0,0,0.06);border-radius:8px;cursor:pointer;font-size:20px;color:#374151;display:flex;align-items:center;justify-content:center;}
.ec-body{flex:1;padding:24px;overflow-y:auto;}
.ec-item{display:flex;gap:16px;align-items:flex-start;padding-bottom:20px;border-bottom:1px solid #f3f4f6;}
.ec-icon{width:72px;height:72px;background:#f9fafb;border-radius:12px;flex-shrink:0;display:flex;align-items:center;justify-content:center;font-size:28px;}
.ec-name{font-size:14px;font-weight:700;color:#111827;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;margin-bottom:6px;line-height:1.4;}
.ec-price{font-size:17px;font-weight:800;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-qty-row{display:flex;align-items:center;justify-content:space-between;margin-top:20px;}
.ec-qty-label{font-size:14px;color:#6b7280;font-weight:500;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-qty-ctrl{display:flex;align-items:center;border:1.5px solid #e5e7eb;border-radius:10px;overflow:hidden;}
.ec-qty-btn{width:38px;height:38px;border:none;background:#fff;cursor:pointer;font-size:20px;color:#374151;display:flex;align-items:center;justify-content:center;}
.ec-qty-btn:hover{background:#f9fafb;}
.ec-qty-num{width:38px;text-align:center;font-size:15px;font-weight:700;color:#111827;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;line-height:38px;}
.ec-total-row{display:flex;justify-content:space-between;align-items:center;margin-top:16px;padding:16px;background:#f9fafb;border-radius:12px;}
.ec-total-label{font-size:14px;font-weight:600;color:#374151;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-total-val{font-size:20px;font-weight:800;color:#111827;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-trust{margin-top:16px;display:flex;flex-direction:column;gap:8px;}
.ec-trust-item{display:flex;align-items:center;gap:8px;font-size:12px;color:#6b7280;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;}
.ec-foot{padding:20px 24px;border-top:1px solid #f3f4f6;flex-shrink:0;}
.ec-checkout-btn{width:100%;padding:16px;border:none;color:#fff;border-radius:12px;font-size:16px;font-weight:700;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;transition:opacity 0.15s;}
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
        <div class="ec-name">${productName}</div>
        <div class="ec-price" style="color:${brandColor}">${priceStr}</div>
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
      <span id="ec-total" class="ec-total-val">${priceStr}</span>
    </div>
    <div class="ec-trust">
      <div class="ec-trust-item">&#x1F512; Secure checkout powered by Stripe</div>
      <div class="ec-trust-item">&#x21A9;&#xFE0F; 30-day money-back guarantee</div>
      <div class="ec-trust-item">&#x26A1; Instant confirmation after purchase</div>
    </div>
  </div>
  <div class="ec-foot">
    <button id="ec-btn" class="ec-checkout-btn" style="background:${brandColor}" onclick="emberCheckout()">Checkout &#x2192; <span id="ec-btn-price">${priceStr}</span></button>
    <button class="ec-continue-btn" onclick="emberCloseCart()">Continue shopping</button>
  </div>
</div>
<script>
(function(){
  var ecBase=${pricePence},ecQty=1;
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
    var btn=document.getElementById("ec-btn"),orig=btn.innerHTML;
    btn.textContent="Processing…";btn.style.opacity="0.6";btn.style.pointerEvents="none";
    try{
      var r=await fetch("/api/stripe/checkout",{
        method:"POST",headers:{"Content-Type":"application/json"},
        body:JSON.stringify({subdomain:"${subdomain}",quantity:ecQty})
      });
      var d=await r.json();
      if(d.url){window.location.href=d.url;}
      else{alert(d.error||"Payments not set up yet.");btn.innerHTML=orig;btn.style.opacity="1";btn.style.pointerEvents="auto";}
    }catch(e){alert("Something went wrong — please try again.");btn.innerHTML=orig;btn.style.opacity="1";btn.style.pointerEvents="auto";}
  };
  // Wire ALL buy buttons to open cart (capture phase overrides old direct-Stripe handlers)
  document.addEventListener("click",function(e){
    var el=e.target;
    while(el&&el!==document){
      if(el.matches&&el.matches(".hero-cta,.scroll-cta,.sticky-cta,.header-cta,.final-cta-btn,.d-cta,.d-nav-cta,.d-final-cta,.c-enrol,.c-nav-cta,.sticky-cart-btn,.cta-btn,.nav-cta")){
        e.preventDefault();e.stopImmediatePropagation();
        window.emberOpenCart();
        return;
      }
      el=el.parentElement;
    }
  },true);
})();
</script>`;

  // Ensure favicon is present in <head>
  if (!html.includes("rel=\"icon\"") && html.includes("</head>")) {
    html = html.replace("</head>", `<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🔥</text></svg>">\n</head>`);
  }

  // Inject cart before </body> if present, otherwise append
  if (html.includes("</body>")) {
    return html.replace("</body>", patch + "\n</body>");
  }
  return html + patch;
}

export default async function StorePage({ params }: Props) {
  const { slug } = await params;

  const { data: store, error } = await supabase
    .from("stores")
    .select("*")
    .eq("subdomain", slug)
    .eq("published", true)
    .single();

  if (error || !store) {
    notFound();
  }

  const html = patchHtml(store.store_html || "", store);

  return (
    <html lang="en">
      <body>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </body>
    </html>
  );
}
