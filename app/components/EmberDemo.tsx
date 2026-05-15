"use client";

import { useEffect, useRef, useState } from "react";

export default function EmberDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mountedRef = useRef(false);
  const headingRef = useRef<HTMLDivElement>(null);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    // Scroll trigger for heading
    const el = headingRef.current;
    if (el) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTriggered(true);
            observer.disconnect();
          }
        },
        { threshold: 0.3 }
      );
      observer.observe(el);
    }
  }, []);

  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;

    const prompts = [
      "find me a fitness idea",
      "I want to sell beauty products",
      "help me start a pet brand",
      "find me a tech product to sell",
    ];
    let loop = 0;
    let cancelled = false;

    function delay(ms: number) {
      return new Promise<void>((r) => setTimeout(r, ms));
    }

    function g(id: string) {
      return document.getElementById(id);
    }

    function showSlide(id: string) {
      document.querySelectorAll(".ember-slide").forEach((s) =>
        s.classList.remove("active")
      );
      g(id)?.classList.add("active");
      const p = g("ember-panel");
      if (p) p.classList.toggle("no-border", id === "es1");
    }

    function setDot(i: number) {
      [0, 1, 2, 3].forEach((j) => {
        const d = g("ed" + j);
        if (d) d.className = "edot" + (j === i ? " on" : "");
      });
    }

    function setTitle(i: number) {
      [0, 1, 2, 3].forEach((j) => {
        const t = g("et" + j);
        if (t) t.className = "etitle" + (j === i ? " active" : "");
      });
    }

    function typeText(text: string, el: HTMLElement, cb: () => void) {
      el.innerHTML = '<span class="ecur"></span>';
      let i = 0;
      const iv = setInterval(() => {
        if (cancelled) { clearInterval(iv); return; }
        if (i >= text.length) { clearInterval(iv); setTimeout(cb, 200); return; }
        el.innerHTML = text.slice(0, ++i) + '<span class="ecur"></span>';
      }, 55);
    }

    function confetti() {
      const c = g("ecc") as HTMLCanvasElement;
      const p = g("ember-panel");
      if (!c || !p) return;
      c.width = p.offsetWidth;
      c.height = p.offsetHeight;
      const ctx = c.getContext("2d")!;
      const cols = ["#FDE047","#F59E0B","#EA580C","#EF4444","#FB7185","#fff"];
      const pts = Array.from({ length: 90 }, () => ({
        x: Math.random() * c.width, y: -10 - Math.random() * 60,
        vx: (Math.random() - 0.5) * 4, vy: 3 + Math.random() * 3.5,
        col: cols[Math.floor(Math.random() * cols.length)],
        s: 5 + Math.random() * 7, r: Math.random() * Math.PI * 2,
        rv: (Math.random() - 0.5) * 0.18, a: 1,
      }));
      function draw() {
        if (cancelled) return;
        ctx.clearRect(0, 0, c.width, c.height);
        let alive = false;
        pts.forEach((p) => {
          p.x += p.vx; p.y += p.vy; p.r += p.rv;
          if (p.y < c.height + 10) alive = true;
          if (p.y > c.height - 20) p.a = Math.max(0, p.a - 0.04);
          ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.r);
          ctx.globalAlpha = p.a; ctx.fillStyle = p.col;
          ctx.fillRect(-p.s / 2, -p.s / 2, p.s, p.s); ctx.restore();
        });
        if (alive) requestAnimationFrame(draw);
        else ctx.clearRect(0, 0, c.width, c.height);
      }
      draw();
    }

    async function moveMouse(el: HTMLElement, ox = 0, oy = 0) {
      const pR = g("ember-panel")!.getBoundingClientRect();
      const eR = el.getBoundingClientRect();
      const mouse = g("emouse")!;
      mouse.style.transition = "left 0.5s cubic-bezier(0.22,1,0.36,1),top 0.5s cubic-bezier(0.22,1,0.36,1)";
      mouse.style.left = (eR.left - pR.left + eR.width / 2 + ox) + "px";
      mouse.style.top = (eR.top - pR.top + eR.height / 2 + oy) + "px";
      await delay(550);
    }

    function resetCards() {
      ["eic1","eic2","eic3","eic4"].forEach((id) => {
        const el = g(id); if (el) el.className = "eidea-card";
      });
      const merged = g("emerged"); if (merged) merged.className = "emerged egrad";
      ["epc1","epc2","epc3","epc4","epc5","epc6"].forEach((id) => {
        const el = g(id); if (el) el.className = "epcard";
      });
      g("esidepop")?.classList.remove("in");
      ["edh","eds1","eds2","eds3","edp","edmt","edch","edco","edsc","edbig","edba","edbb","edbc"].forEach((id) => {
        g(id)?.classList.remove("in");
      });
      // reset colours
      document.querySelectorAll("#es3 .epc-bar").forEach((b: any) => {
        b.style.transition = ""; b.style.background = "";
      });
      document.querySelectorAll("#es3 .epc-lbl, #es3 .epc-stat-v").forEach((el: any) => {
        el.style.transition = ""; el.style.background = "";
      });
      document.querySelectorAll("#es3 .epc-pill.hi").forEach((el: any) => {
        el.style.transition = ""; el.style.background = "";
      });
      document.querySelectorAll(".esp-sw").forEach((el: any, i) => {
        el.style.outline = i === 0 ? "2px solid #EA580C" : "none";
        el.style.outlineOffset = "2px";
      });
    }

    async function runPlan() {
      const panel = g("ember-panel")!;
      const mouse = g("emouse")!;
      const exp = g("eexp")!;
      const sbox = g("esbox")!;
      const abtn = g("eabtn")!;
      const inp = g("einp")!;

      showSlide("es3");
      setDot(2); setTitle(2);
      await delay(150); g("emerged")?.classList.add("in");
      await delay(500); g("epc1")?.classList.add("in");
      await delay(280); g("epc2")?.classList.add("in");
      await delay(280); g("epc3")?.classList.add("in");
      await delay(280); g("epc4")?.classList.add("in");
      await delay(280); g("epc5")?.classList.add("in");
      await delay(280); g("epc6")?.classList.add("in");
      await delay(600);

      const pc2 = g("epc2")!;
      const pc2R = pc2.getBoundingClientRect();
      const curPR = panel.getBoundingClientRect();
      mouse.style.cssText = `position:absolute;z-index:30;pointer-events:none;opacity:1;left:${pc2R.left - curPR.left + 16}px;top:${pc2R.top - curPR.top - 16}px;transition:none;filter:drop-shadow(0 2px 5px rgba(0,0,0,0.3));`;
      await delay(50);
      await moveMouse(pc2, 8, 8);
      pc2.classList.add("sel");

      const sp = g("esidepop")!;
      // Fixed position — right of panel, in the gap before titles
      sp.style.left = (curPR.right + 12) + "px";
      sp.style.top = (pc2R.top + pc2R.height/2 - 80) + "px";
      sp.classList.add("in");
      confetti();
      await delay(900);

      const blueSwatch = document.querySelector(".esp-sw:nth-child(2)") as HTMLElement;
      if (blueSwatch) {
        const blueR = blueSwatch.getBoundingClientRect();
        const panelR = panel.getBoundingClientRect();
        mouse.style.transition = "left 0.45s cubic-bezier(0.22,1,0.36,1),top 0.45s cubic-bezier(0.22,1,0.36,1)";
        mouse.style.left = (blueR.left - panelR.left + blueR.width / 2) + "px";
        mouse.style.top = (blueR.top - panelR.top + blueR.height / 2) + "px";
        await delay(500);

        blueSwatch.style.outline = "2px solid #93c5fd";
        blueSwatch.style.outlineOffset = "2px";
        const activeSw = document.querySelector(".esp-sw.active") as HTMLElement;
        if (activeSw) activeSw.style.outline = "none";
        pc2.querySelectorAll(".epc-bar").forEach((b: any) => {
          b.style.transition = "background 0.5s ease";
          b.style.background = "linear-gradient(180deg,#bfdbfe,#93c5fd)";
        });
        document.querySelectorAll("#es3 .epc-lbl, #es3 .epc-stat-v").forEach((el: any) => {
          el.style.transition = "background 0.5s ease";
          el.style.background = "linear-gradient(90deg,#bfdbfe,#93c5fd)";
        });
        document.querySelectorAll("#es3 .epc-pill.hi").forEach((el: any) => {
          el.style.transition = "background 0.5s ease";
          el.style.background = "linear-gradient(90deg,rgba(147,197,253,0.35),rgba(96,165,250,0.25))";
        });
      }
      await delay(1800);
      sp.classList.remove("in");
      await delay(300);
      pc2.classList.remove("sel");
      mouse.style.transition = "opacity 0.2s"; mouse.style.opacity = "0";
      await delay(600);
    }

    async function runDash() {
      setDot(3); setTitle(3); showSlide("es4");
      const ids = ["edh","eds1","eds2","eds3","edp","edmt","edch","edco","edsc","edbig","edba","edbb","edbc"];
      const gaps = [100,80,60,60,90,70,80,80,70,80,60,60,70];
      for (let i = 0; i < ids.length; i++) {
        if (cancelled) return;
        await delay(gaps[i]);
        g(ids[i])?.classList.add("in");
      }
      await delay(3000);
    }

    async function expandFromBox() {
      const panel = g("ember-panel")!;
      const sbox = g("esbox")!;
      const exp = g("eexp")!;
      const mouse = g("emouse")!;
      const abtn = g("eabtn")!;
      const pR = panel.getBoundingClientRect();
      const bR = abtn.getBoundingClientRect();

      mouse.style.cssText = `position:absolute;z-index:30;pointer-events:none;opacity:1;left:${bR.left-pR.left+60}px;top:${bR.top-pR.top+60}px;transition:none;filter:drop-shadow(0 2px 5px rgba(0,0,0,0.3));`;
      await delay(50);
      mouse.style.transition = "left 0.5s cubic-bezier(0.22,1,0.36,1),top 0.5s cubic-bezier(0.22,1,0.36,1)";
      mouse.style.left = (bR.left-pR.left+bR.width/2) + "px";
      mouse.style.top = (bR.top-pR.top+bR.height/2) + "px";
      await delay(550);

      abtn.classList.add("pressed"); await delay(150); abtn.classList.remove("pressed");
      mouse.style.opacity = "0";

      const sbR = sbox.getBoundingClientRect();
      exp.style.cssText = `position:absolute;z-index:4;pointer-events:none;border-radius:999px;opacity:1;left:${sbR.left-pR.left}px;top:${sbR.top-pR.top}px;width:${sbR.width}px;height:${sbR.height}px;transition:none;`;
      exp.className = "eexpander egrad";
      sbox.style.transition = "opacity 0.2s"; sbox.style.opacity = "0";
      await delay(80);
      exp.style.transition = "left 0.65s cubic-bezier(0.22,1,0.36,1),top 0.65s cubic-bezier(0.22,1,0.36,1),width 0.65s cubic-bezier(0.22,1,0.36,1),height 0.65s cubic-bezier(0.22,1,0.36,1),border-radius 0.65s cubic-bezier(0.22,1,0.36,1)";
      exp.style.left="0"; exp.style.top="0"; exp.style.width="100%"; exp.style.height="100%"; exp.style.borderRadius="22px";
      await delay(700);
      exp.style.transition = "opacity 0.4s"; exp.style.opacity = "0";
      await delay(450);
      exp.className = "eexpander egrad"; exp.removeAttribute("style");
    }

    async function run() {
      if (cancelled) return;
      const panel = g("ember-panel")!;
      const exp = g("eexp")!;
      const sbox = g("esbox")!;
      const inp = g("einp")!;

      showSlide("es1"); setDot(0); setTitle(0);
      g("emouse")!.style.cssText = "position:absolute;z-index:30;pointer-events:none;opacity:0;";
      exp.style.cssText = "position:absolute;z-index:4;border-radius:999px;opacity:0;pointer-events:none;";
      sbox.style.opacity = "0"; sbox.style.transition = "none";
      g("eabtn")!.className = "eabtn egrad";
      inp.innerHTML = '<span class="ecur"></span>';
      resetCards();

      // open with full ember fill then condense into search box
      const pRinit = panel.getBoundingClientRect();
      exp.style.cssText = `position:absolute;z-index:40;pointer-events:none;left:0;top:0;width:100%;height:100%;border-radius:22px;opacity:1;transition:none;`;
      exp.className = "eexpander egrad";
      await delay(600);
      const sbRinit = sbox.getBoundingClientRect();
      exp.style.transition = "left 0.7s cubic-bezier(0.22,1,0.36,1),top 0.7s cubic-bezier(0.22,1,0.36,1),width 0.7s cubic-bezier(0.22,1,0.36,1),height 0.7s cubic-bezier(0.22,1,0.36,1),border-radius 0.7s cubic-bezier(0.22,1,0.36,1)";
      exp.style.left = (sbRinit.left-pRinit.left)+"px";
      exp.style.top = (sbRinit.top-pRinit.top)+"px";
      exp.style.width = sbRinit.width+"px";
      exp.style.height = sbRinit.height+"px";
      exp.style.borderRadius = "999px";
      await delay(750);
      exp.style.transition = "opacity 0.35s ease"; exp.style.opacity = "0";
      sbox.style.transition = "opacity 0.35s ease"; sbox.style.opacity = "1";
      await delay(400);
      exp.className = "eexpander egrad"; exp.removeAttribute("style");

      // S1: type + click
      await new Promise<void>((r) => typeText(prompts[loop % prompts.length], inp, r));
      await delay(300);
      await expandFromBox();

      // S2: ideas
      setDot(1); setTitle(1); showSlide("es2");
      await delay(100); g("eic1")?.classList.add("in");
      await delay(160); g("eic2")?.classList.add("in");
      await delay(160); g("eic3")?.classList.add("in");
      await delay(160); g("eic4")?.classList.add("in");
      await delay(2800);

      // S3: plan
      await runPlan();

      // S4: dashboard
      await runDash();

      // loop transition: fill then condense
      const pRloop = panel.getBoundingClientRect();
      exp.style.cssText = `position:absolute;z-index:40;pointer-events:none;left:0;top:0;width:100%;height:100%;border-radius:22px;opacity:0;transition:none;`;
      exp.className = "eexpander egrad";
      await delay(30);
      exp.style.transition = "opacity 0.5s ease"; exp.style.opacity = "1";
      await delay(600);

      loop++;
      showSlide("es1"); setDot(0); setTitle(0);
      g("emouse")!.style.cssText = "position:absolute;z-index:30;pointer-events:none;opacity:0;";
      sbox.style.opacity = "0"; sbox.style.transition = "none";
      g("eabtn")!.className = "eabtn egrad";
      inp.innerHTML = '<span class="ecur"></span>';
      resetCards();
      await delay(50);

      const sbRloop = sbox.getBoundingClientRect();
      exp.style.transition = "left 0.7s cubic-bezier(0.22,1,0.36,1),top 0.7s cubic-bezier(0.22,1,0.36,1),width 0.7s cubic-bezier(0.22,1,0.36,1),height 0.7s cubic-bezier(0.22,1,0.36,1),border-radius 0.7s cubic-bezier(0.22,1,0.36,1)";
      exp.style.left = (sbRloop.left-pRloop.left)+"px";
      exp.style.top = (sbRloop.top-pRloop.top)+"px";
      exp.style.width = sbRloop.width+"px";
      exp.style.height = sbRloop.height+"px";
      exp.style.borderRadius = "999px";
      await delay(750);
      exp.style.transition = "opacity 0.35s ease"; exp.style.opacity = "0";
      sbox.style.transition = "opacity 0.35s ease"; sbox.style.opacity = "1";
      await delay(400);
      exp.className = "eexpander egrad"; exp.removeAttribute("style");

      await new Promise<void>((r) => typeText(prompts[loop % prompts.length], inp, r));
      await delay(300);
      await expandFromBox();

      setDot(1); setTitle(1); showSlide("es2");
      await delay(100); g("eic1")?.classList.add("in");
      await delay(160); g("eic2")?.classList.add("in");
      await delay(160); g("eic3")?.classList.add("in");
      await delay(160); g("eic4")?.classList.add("in");
      await delay(2800);

      await runPlan();
      await runDash();

      if (!cancelled) run();
    }

    run();

    return () => { cancelled = true; };
  }, []);

  return (
    <>
      <style>{`
        @keyframes egs{0%{background-position:0% 50%;}50%{background-position:100% 50%;}100%{background-position:0% 50%;}}
        @keyframes emberSweep{0%{background-position:-100% 0;}60%{background-position:100% 0;}100%{background-position:200% 0;}}
        .say-hello-text{background:linear-gradient(90deg,#111827 0%,#111827 20%,#FDE047 35%,#F59E0B 45%,#EA580C 55%,#FB7185 65%,#111827 80%,#111827 100%);background-size:300% 100%;-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;background-position:-100% 0;}
        .say-hello-text.sweep{animation:emberSweep 1.4s cubic-bezier(0.4,0,0.2,1) 0.2s forwards;}
        .egrad{background:linear-gradient(135deg,#FDE047,#F59E0B,#EA580C,#EF4444,#FB7185);background-size:200% 200%;animation:egs 3s ease infinite;}        .esk{background:rgba(0,0,0,0.08);border-radius:3px;}
        .esk-amber{background:linear-gradient(90deg,#F59E0B,#EA580C);border-radius:4px;}
        .ecur{display:inline-block;width:2px;height:15px;background:#EA580C;border-radius:1px;vertical-align:middle;animation:eblink 0.8s step-end infinite;}
        @keyframes eblink{0%,100%{opacity:1;}50%{opacity:0;}}
        .ember-slide{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:7px;gap:4px;opacity:0;pointer-events:none;transition:opacity 0.4s ease;}
        .ember-slide.active{opacity:1;pointer-events:all;}
        .eexpander{position:absolute;z-index:4;border-radius:999px;opacity:0;pointer-events:none;}
        .emouse{position:absolute;z-index:30;pointer-events:none;opacity:0;filter:drop-shadow(0 2px 5px rgba(0,0,0,0.3));}
        #ember-panel.no-border{box-shadow:none!important;}

        /* Ideas */
        .eidea-card{width:100%;display:flex;align-items:center;gap:5px;padding:7px;border-radius:8px;background:white;box-shadow:0 0 0 1.5px #F59E0B,0 0 0 3px #EA580C,0 0 12px rgba(234,88,12,0.1);opacity:0;transform:translateX(-20px);transition:opacity 0.4s cubic-bezier(0.22,1,0.36,1),transform 0.4s cubic-bezier(0.22,1,0.36,1);}
        .eidea-card.in{opacity:1;transform:translateX(0);}
        .eidea-badge{width:20px;height:20px;border-radius:5px;flex-shrink:0;}
        .eidea-lines{flex:1;display:flex;flex-direction:column;gap:5px;}
        .eidea-tag{height:8px;width:28px;border-radius:999px;background:linear-gradient(90deg,rgba(245,158,11,0.2),rgba(234,88,12,0.15));margin-top:2px;}

        /* Plan */
        .emerged{width:100%;border-radius:6px;padding:7px;display:flex;align-items:center;gap:14px;flex-shrink:0;opacity:0;transform:scale(0.95);transition:opacity 0.5s cubic-bezier(0.22,1,0.36,1),transform 0.5s cubic-bezier(0.22,1,0.36,1);}
        .emerged.in{opacity:1;transform:scale(1);}
        .emerged-ico{width:22px;height:22px;border-radius:5px;background:rgba(255,255,255,0.3);flex-shrink:0;}
        .emerged-lines{flex:1;display:flex;flex-direction:column;gap:8px;}
        .emerged-line{height:4px;border-radius:2px;background:rgba(255,255,255,0.45);}
        .emerged-dots{display:flex;gap:5px;margin-top:2px;}
        .emerged-dot{width:4px;height:4px;border-radius:50%;background:rgba(255,255,255,0.5);}
        .epcard{width:100%;border-radius:6px;background:white;padding:5px 7px;display:flex;flex-direction:column;gap:9px;box-shadow:0 0 0 1.5px #F59E0B,0 0 0 3px #EA580C,0 0 10px rgba(234,88,12,0.1);opacity:0;transform:translateY(10px);transition:opacity 0.45s cubic-bezier(0.22,1,0.36,1),transform 0.45s cubic-bezier(0.22,1,0.36,1);position:relative;flex-shrink:0;}
        .epcard.in{opacity:1;transform:translateY(0);}
        .epcard.sel{box-shadow:0 0 0 2px #F59E0B,0 0 0 4px #EA580C,0 0 0 6px rgba(251,113,133,0.4),0 0 20px rgba(234,88,12,0.2);}
        .epc-lbl{width:28px;height:4px;}
        .epc-ln{height:5px;}
        .epc-stats{display:flex;gap:7px;}
        .epc-stat{flex:1;background:#f8f8f8;border-radius:4px;padding:3px;display:flex;flex-direction:column;gap:5px;border:1px solid rgba(0,0,0,0.05);}
        .epc-stat-v{height:5px;}
        .epc-stat-l{height:5px;}
        .epc-bars{display:flex;align-items:flex-end;gap:2px;height:14px;}
        .epc-bar{border-radius:3px 3px 0 0;background:linear-gradient(180deg,#F59E0B,#EA580C);flex:1;opacity:0.65;}
        .epc-pills{display:flex;gap:4px;}
        .epc-pill{height:10px;border-radius:999px;flex:1;background:rgba(234,88,12,0.08);}
        .epc-pill.hi{background:linear-gradient(90deg,rgba(245,158,11,0.25),rgba(234,88,12,0.18));}

        /* Sidepop */
        .esidepop{position:fixed;width:64px;background:white;border-radius:6px;padding:5px;display:flex;flex-direction:column;gap:3px;box-shadow:0 0 0 1.5px rgba(245,158,11,0.5),0 0 0 3px rgba(234,88,12,0.2),0 12px 32px rgba(0,0,0,0.14);opacity:0;transform:translateX(-8px) scale(0.97);transition:opacity 0.3s cubic-bezier(0.22,1,0.36,1),transform 0.3s cubic-bezier(0.22,1,0.36,1);z-index:100;pointer-events:none;}
        .esidepop.in{opacity:1;transform:translateX(0) scale(1);}
        .esp-lbl{height:3px;border-radius:2px;background:rgba(0,0,0,0.1);}
        .esp-swatches{display:flex;flex-wrap:wrap;gap:5px;}
        .esp-sw{width:9px;height:9px;border-radius:2px;}
        .esp-sw.active{outline:2px solid #EA580C;outline-offset:2px;}
        .esp-div{height:1px;background:rgba(0,0,0,0.06);}
        .esp-track{height:3px;border-radius:3px;background:rgba(0,0,0,0.07);position:relative;overflow:visible;margin-top:3px;}
        .esp-fill{position:absolute;inset-block:0;left:0;border-radius:3px;background:linear-gradient(90deg,#F59E0B,#EA580C);}

        /* Dashboard */
        .edc{background:white;border-radius:8px;box-shadow:0 0 0 1px rgba(245,158,11,0.15),0 1px 4px rgba(0,0,0,0.06);opacity:0;transform:translateY(5px);transition:opacity 0.35s cubic-bezier(0.22,1,0.36,1),transform 0.35s cubic-bezier(0.22,1,0.36,1);}
        .edc.in{opacity:1;transform:translateY(0);}

        /* Dots */
        .edot{width:6px;height:6px;border-radius:50%;background:rgba(128,128,128,0.2);transition:all 0.35s;display:inline-block;}
        .edot.on{background:#EA580C;width:18px;border-radius:3px;}

        /* Titles */
        .etitle{display:flex;flex-direction:column;gap:6px;opacity:0.3;transition:opacity 0.5s ease,transform 0.5s ease;transform:translateX(8px);}
        .etitle.active{opacity:1;transform:translateX(0);}
        .etitle-num{font-size:12px;font-weight:600;letter-spacing:0.08em;text-transform:uppercase;color:#EA580C;opacity:0;}
        .etitle.active .etitle-num{opacity:1;}
        .etitle-head{font-size:clamp(18px,2vw,26px);font-weight:800;letter-spacing:-0.03em;color:#111;line-height:1.1;}
        .etitle.active .etitle-head{background:linear-gradient(135deg,#F59E0B,#EA580C,#FB7185);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;}
        .etitle-sub{font-size:clamp(12px,1vw,14px);color:#888;line-height:1.5;max-width:240px;}

        /* Search box */
        .esbox{width:100%;background:white;border-radius:999px;padding:7px 7px 7px 12px;display:flex;align-items:center;gap:10px;border:1.5px solid rgba(234,88,12,0.3);box-shadow:0 0 0 3px rgba(234,88,12,0.07),0 0 24px rgba(245,158,11,0.18),0 4px 12px rgba(0,0,0,0.07);}
        .einp{font-size:11px;flex:1;white-space:nowrap;overflow:visible;color:#111;}
        .eabtn{width:26px;height:26px;border-radius:999px;border:none;flex-shrink:0;color:white;font-size:12px;font-weight:800;display:flex;align-items:center;justify-content:center;box-shadow:0 6px 18px rgba(234,88,12,0.4);cursor:pointer;transition:transform 0.15s;}
        .eabtn.pressed{transform:scale(0.82);}

        /* Dashboard top nav */
        .edash-top{width:100%;height:28px;background:white;border-bottom:1px solid rgba(0,0,0,0.06);display:flex;align-items:center;padding:0 12px;gap:7px;flex-shrink:0;}
      `}</style>

      {/* Say hello to Ember heading */}
      <div
        ref={headingRef}
        style={{
          textAlign: "center" as const,
          padding: "4px 24px 48px",
          opacity: triggered ? 1 : 0,
          transform: triggered ? "translateY(0)" : "translateY(12px)",
          transition: "opacity 0.5s ease, transform 0.5s cubic-bezier(0.22,1,0.36,1)",
        }}>
        <h2
          className={"say-hello-text" + (triggered ? " sweep" : "")}
          style={{
            fontSize: "clamp(40px,5.5vw,80px)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1.05,
            margin: 0,
          }}>
          Say hello to Ember
        </h2>
      </div>

      {/* Demo layout */}
      <div ref={containerRef} className="ember-demo-layout" style={{ width: "100%", maxWidth: "1200px", margin: "0 auto", display: "flex", alignItems: "center", gap: "56px", padding: "0 24px", flexWrap: "wrap" as const }}>
        <style>{`
          @media(max-width:900px){
            .ember-demo-layout{ flex-direction:column!important; align-items:center!important; gap:32px!important; }
            .ember-demo-panel{ width:min(90vw,480px)!important; }
            .ember-demo-panel{ width:min(65vw,480px)!important; }
            .ember-demo-titles{ padding-left:0!important; flex-direction:column!important; flex-wrap:nowrap!important; gap:12px!important; align-items:flex-start!important; width:min(90vw,480px)!important; }
            .ember-demo-panel{ width:min(65vw,480px)!important; }
          }
        `}</style>

        {/* Panel */}
        <div className="ember-demo-panel" style={{ flexShrink: 0, display: "flex", flexDirection: "column" as const, alignItems: "center" }}>
          <div id="ember-halo" style={{ background: "#faf8f5", borderRadius: "24px", padding: "16px", position: "relative" as const }}>
            <div
              id="ember-panel"
              style={{
                width: "min(65vw,480px)",
                aspectRatio: "3/4",
                borderRadius: "24px",
                position: "relative" as const,
                overflow: "visible",
                background: "white",
                boxShadow: "0 0 0 2px #F59E0B,0 0 0 4px #EA580C,0 0 0 6px #FB7185,0 0 40px rgba(234,88,12,0.2)",
                transition: "box-shadow 0.5s ease",
              }}>

              {/* Inner clip */}
              <div style={{ position: "absolute" as const, inset: 0, borderRadius: "24px", overflow: "hidden", background: "white" }}>
                <canvas id="ecc" style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 10 }} />

                {/* Mouse */}
                <div className="emouse" id="emouse" style={{ position: "absolute", zIndex: 30, pointerEvents: "none" }}>
                  <svg width="20" height="26" viewBox="0 0 20 26" fill="none">
                    <path d="M1 1L1 20L6 15L9 22.5L11.5 21.5L8.5 14H15L1 1Z" fill="white" stroke="#444" strokeWidth="1.3" strokeLinejoin="round"/>
                  </svg>
                </div>

                {/* Expander */}
                <div className="eexpander egrad" id="eexp" />

                {/* S1: Prompt */}
                <div className="ember-slide active" id="es1">
                  <div className="esbox" id="esbox">
                    <div className="einp" id="einp"><span className="ecur" /></div>
                    <button className="eabtn egrad" id="eabtn">↑</button>
                  </div>
                </div>

                {/* S2: Ideas */}
                <div className="ember-slide" id="es2" style={{ gap: 14 }}>
                  {[1,2,3,4].map(n => (
                    <div className="eidea-card" id={`eic${n}`} key={n}>
                      <div className="eidea-badge egrad" />
                      <div className="eidea-lines">
                        <div className="esk" style={{ height: 9, width: `${[70,62,66,74][n-1]}%` }} />
                        <div className="esk" style={{ height: 9, width: `${[48,42,50,46][n-1]}%` }} />
                        <div className="eidea-tag" />
                      </div>
                    </div>
                  ))}
                </div>

                {/* S3: Business Plan */}
                <div className="ember-slide" id="es3" style={{ justifyContent: "flex-start", paddingTop: 6, gap: 4, overflowY: "auto" }}>
                  <div className="emerged egrad" id="emerged">
                    <div className="emerged-ico" />
                    <div className="emerged-lines">
                      <div className="emerged-line" style={{ width: "72%" }} />
                      <div className="emerged-line" style={{ width: "50%" }} />
                      <div className="emerged-dots">
                        <div className="emerged-dot" /><div className="emerged-dot" /><div className="emerged-dot" />
                      </div>
                    </div>
                  </div>

                  {/* Card 1: stats */}
                  <div className="epcard" id="epc1">
                    <div className="epc-lbl esk-amber" />
                    <div className="epc-ln esk" style={{ width: "88%" }} />
                    <div className="epc-ln esk" style={{ width: "72%" }} />
                    <div className="epc-stats">
                      {[0,1,2].map(i => (
                        <div className="epc-stat" key={i}><div className="epc-stat-v esk-amber" /><div className="epc-stat-l esk" /></div>
                      ))}
                    </div>
                  </div>

                  {/* Card 2: bars */}
                  <div className="epcard" id="epc2">
                    <div className="epc-lbl esk-amber" />
                    <div className="epc-ln esk" style={{ width: "80%" }} />
                    <div className="epc-bars">
                      {[45,70,52,88,60,74,48].map((h,i) => <div className="epc-bar" key={i} style={{ height: `${h}%` }} />)}
                    </div>
                    <div className="epc-pills">
                      <div className="epc-pill hi" /><div className="epc-pill" /><div className="epc-pill hi" />
                    </div>
                  </div>

                  {/* Card 3: strategy */}
                  <div className="epcard" id="epc3">
                    <div className="epc-lbl esk-amber" />
                    <div className="epc-ln esk" style={{ width: "85%" }} />
                    <div className="epc-ln esk" style={{ width: "65%" }} />
                    <div className="epc-pills">
                      <div className="epc-pill hi" /><div className="epc-pill hi" /><div className="epc-pill" /><div className="epc-pill" />
                    </div>
                  </div>

                  {/* Card 4: competitors */}
                  <div className="epcard" id="epc4">
                    <div className="epc-lbl esk-amber" />
                    <div style={{ display:"flex",flexDirection:"column",gap:7,marginTop:2 }}>
                      {[["#F59E0B","60%"],["#EA580C","50%"],["#FB7185","68%"]].map(([col,w],i) => (
                        <div key={i} style={{ display:"flex",alignItems:"center",gap:8 }}>
                          <div style={{ width:8,height:8,borderRadius:"50%",background:col,flexShrink:0 }} />
                          <div className="esk" style={{ flex:1,height:7,width:w }} />
                          <div style={{ width:28,height:14,borderRadius:5,background:"linear-gradient(90deg,rgba(245,158,11,0.2),rgba(234,88,12,0.15))" }} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card 5: revenue */}
                  <div className="epcard" id="epc5">
                    <div className="epc-lbl esk-amber" />
                    <div className="epc-ln esk" style={{ width: "78%" }} />
                    <div style={{ display:"flex",gap:8,marginTop:2 }}>
                      {[0,1].map(i => (
                        <div key={i} style={{ flex:1,background:"#f8f8f8",borderRadius:9,padding:8,display:"flex",flexDirection:"column",gap:5,border:"1px solid rgba(0,0,0,0.05)" }}>
                          <div className="esk-amber" style={{ height:9,borderRadius:4,width:i===0?"80%":"70%" }} />
                          <div className="esk" style={{ height:5,borderRadius:3,width:i===0?"60%":"55%" }} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card 6: actions */}
                  <div className="epcard" id="epc6">
                    <div className="epc-lbl esk-amber" />
                    <div style={{ display:"flex",flexDirection:"column",gap:7,marginTop:2 }}>
                      {[["linear-gradient(135deg,#FDE047,#EA580C)","100%"],["rgba(234,88,12,0.15)","75%"],["rgba(234,88,12,0.1)","60%"]].map(([bg,w],i) => (
                        <div key={i} style={{ display:"flex",alignItems:"center",gap:8 }}>
                          <div style={{ width:18,height:18,borderRadius:5,background:bg,flexShrink:0 }} />
                          <div className="esk" style={{ flex:1,height:6,width:w }} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* S4: Dashboard */}
                <div className="ember-slide" id="es4" style={{ justifyContent:"flex-start",padding:0,gap:0 }}>
                  <div className="edash-top">
                    <div className="esk-amber" style={{ width:46,height:7,borderRadius:3 }} />
                    <div style={{ width:1,height:13,background:"rgba(0,0,0,0.1)" }} />
                    <div className="esk" style={{ width:36,height:7,borderRadius:3 }} />
                    <div style={{ width:52,height:17,borderRadius:999,background:"linear-gradient(135deg,#EA580C,#FB7185)",marginLeft:"auto" }} />
                  </div>
                  <div style={{ width:"100%",flex:1,background:"#f0f0f0",padding:7,display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:5,alignContent:"start",overflow:"hidden" }}>
                    {/* hero */}
                    <div className="edc" id="edh" style={{ gridColumn:"1/-1",padding:"11px 13px",display:"flex",justifyContent:"space-between" }}>
                      <div style={{ display:"flex",flexDirection:"column",gap:6 }}>
                        <div className="esk" style={{ width:36,height:5,borderRadius:3 }} />
                        <div className="esk-amber" style={{ width:88,height:10,borderRadius:4 }} />
                        <div className="esk" style={{ width:64,height:5,borderRadius:3 }} />
                        <div style={{ display:"flex",gap:4 }}>
                          <div style={{ height:14,width:34,borderRadius:999,background:"rgba(234,88,12,0.1)" }} />
                          <div style={{ height:14,width:48,borderRadius:999,background:"rgba(234,88,12,0.1)" }} />
                        </div>
                      </div>
                      <div style={{ display:"flex",flexDirection:"column",alignItems:"flex-end",gap:5 }}>
                        <div className="esk" style={{ width:42,height:5,borderRadius:3 }} />
                        <div className="esk-amber" style={{ width:28,height:16,borderRadius:5 }} />
                        <div className="esk" style={{ width:32,height:5,borderRadius:3 }} />
                      </div>
                    </div>
                    {/* stat cards */}
                    {[["linear-gradient(135deg,#FDE047,#EA580C)","eds1"],["linear-gradient(135deg,#FB7185,#EA580C)","eds2"],["linear-gradient(135deg,#F59E0B,#FDE047)","eds3"]].map(([bg,id]) => (
                      <div className="edc" id={id} key={id} style={{ padding:"10px 8px",display:"flex",flexDirection:"column",gap:5,alignItems:"center" }}>
                        <div style={{ width:22,height:22,borderRadius:7,background:bg }} />
                        <div className="esk" style={{ width:30,height:5,borderRadius:3 }} />
                        <div className="esk-amber" style={{ width:42,height:10,borderRadius:4 }} />
                        <div className="esk" style={{ width:26,height:5,borderRadius:3 }} />
                      </div>
                    ))}
                    {/* pulse */}
                    <div className="edc" id="edp" style={{ gridColumn:"span 2",padding:"10px 12px",display:"flex",gap:9 }}>
                      <div style={{ flex:1,display:"flex",flexDirection:"column",gap:7 }}>
                        <div className="esk" style={{ width:50,height:5,borderRadius:3 }} />
                        {[87,95,77,91].map((w,i) => (
                          <div key={i} style={{ display:"flex",alignItems:"center",gap:5 }}>
                            <div style={{ flex:1,height:6,borderRadius:3,background:"rgba(0,0,0,0.07)",overflow:"visible" }}>
                              <div style={{ height:"100%",borderRadius:3,background:"linear-gradient(90deg,#F59E0B,#EA580C)",width:`${w}%` }} />
                            </div>
                            <div className="esk" style={{ width:16,height:5,borderRadius:3,flexShrink:0 }} />
                          </div>
                        ))}
                      </div>
                      <div style={{ width:64,borderLeft:"1px solid rgba(0,0,0,0.05)",paddingLeft:9,display:"flex",flexDirection:"column",gap:5 }}>
                        <div style={{ height:14,borderRadius:999,background:"rgba(234,88,12,0.12)" }} />
                        <div className="esk" style={{ height:5,borderRadius:3 }} />
                        <div className="esk" style={{ height:5,borderRadius:3,width:"80%" }} />
                        <div className="esk" style={{ height:5,borderRadius:3,width:"65%" }} />
                      </div>
                    </div>
                    {/* mini trend */}
                    <div className="edc" id="edmt" style={{ padding:10,display:"flex",flexDirection:"column",gap:6 }}>
                      <div className="esk" style={{ height:5,width:"50%",borderRadius:3 }} />
                      <div style={{ display:"flex",alignItems:"flex-end",gap:3,height:28,marginTop:4 }}>
                        {[["40%","linear-gradient(180deg,#FDE047,#F59E0B)"],["65%","linear-gradient(180deg,#F59E0B,#EA580C)"],["50%","linear-gradient(180deg,#EA580C,#EF4444)"],["85%","linear-gradient(180deg,#EA580C,#FB7185)"],["70%","linear-gradient(180deg,#F59E0B,#EA580C)"]].map(([h,bg],i) => (
                          <div key={i} style={{ flex:1,borderRadius:"3px 3px 0 0",height:h,background:bg }} />
                        ))}
                      </div>
                      <div className="esk" style={{ height:4,width:"70%",borderRadius:3 }} />
                    </div>
                    {/* chart */}
                    <div className="edc" id="edch" style={{ gridColumn:"1/-1",padding:"10px 12px",display:"flex",flexDirection:"column",gap:6 }}>
                      <div className="esk" style={{ width:50,height:5,borderRadius:3 }} />
                      <div style={{ display:"flex",alignItems:"flex-end",gap:4,height:40 }}>
                        {[[45,"#FDE047","#F59E0B"],[72,"#F59E0B","#EA580C"],[55,"#F59E0B","#EA580C"],[90,"#EA580C","#EF4444"],[65,"#EA580C","#FB7185"],[78,"#F59E0B","#EA580C"],[58,"#FDE047","#F59E0B"],[82,"#EA580C","#EF4444"],[48,"#F59E0B","#EA580C"]].map(([h,c1,c2],i) => (
                          <div key={i} style={{ flex:1,borderRadius:"3px 3px 0 0",height:`${h}%`,background:`linear-gradient(180deg,${c1},${c2})` }} />
                        ))}
                      </div>
                    </div>
                    {/* competitor */}
                    <div className="edc" id="edco" style={{ gridColumn:"span 2",padding:"10px 12px",display:"flex",flexDirection:"column",gap:6 }}>
                      <div className="esk" style={{ width:58,height:5,borderRadius:3 }} />
                      {[["#F59E0B","60%"],["#EA580C","50%"],["#FB7185","65%"]].map(([col,w],i) => (
                        <div key={i} style={{ display:"flex",alignItems:"center",gap:7,padding:"4px 0",borderBottom:i<2?"1px solid rgba(0,0,0,0.04)":"none" }}>
                          <div style={{ width:8,height:8,borderRadius:"50%",background:col,flexShrink:0 }} />
                          <div className="esk" style={{ flex:1,height:6,width:w }} />
                          <div style={{ width:26,height:13,borderRadius:4,background:"linear-gradient(90deg,rgba(245,158,11,0.2),rgba(234,88,12,0.15))" }} />
                        </div>
                      ))}
                    </div>
                    {/* social */}
                    <div className="edc" id="edsc" style={{ padding:10,display:"flex",flexDirection:"column",gap:6 }}>
                      <div className="esk" style={{ height:5,width:"55%",borderRadius:3 }} />
                      {[["#FB7185","100%"],["#F59E0B","70%"],["#EA580C","55%"]].map(([col,w],i) => (
                        <div key={i} style={{ display:"flex",alignItems:"center",gap:6 }}>
                          <div style={{ width:8,height:8,borderRadius:"50%",background:col,flexShrink:0 }} />
                          <div className="esk" style={{ flex:1,height:5,width:w }} />
                        </div>
                      ))}
                    </div>
                    {/* big summary */}
                    <div className="edc" id="edbig" style={{ gridColumn:"1/-1",padding:"12px 14px",display:"flex",alignItems:"center",gap:14 }}>
                      <div style={{ width:36,height:36,borderRadius:10,flexShrink:0,background:"linear-gradient(135deg,#FDE047,#EA580C)" }} />
                      <div style={{ flex:1,display:"flex",flexDirection:"column",gap:7 }}>
                        <div className="esk-amber" style={{ height:8,borderRadius:4,width:"55%" }} />
                        <div className="esk" style={{ height:6,borderRadius:3,width:"80%" }} />
                        <div className="esk" style={{ height:6,borderRadius:3,width:"65%" }} />
                      </div>
                      <div style={{ display:"flex",flexDirection:"column",gap:5,alignItems:"flex-end" }}>
                        <div style={{ width:48,height:20,borderRadius:999,background:"linear-gradient(135deg,#EA580C,#FB7185)" }} />
                        <div className="esk" style={{ height:5,width:36,borderRadius:3 }} />
                      </div>
                    </div>
                    {/* small bottom */}
                    <div className="edc" id="edba" style={{ padding:10,display:"flex",flexDirection:"column",gap:6 }}>
                      <div className="esk" style={{ height:5,width:"50%",borderRadius:3 }} />
                      <div className="esk-amber" style={{ height:9,borderRadius:4,width:"60%",marginTop:2 }} />
                      <div className="esk" style={{ height:5,width:"70%",borderRadius:3 }} />
                    </div>
                    <div className="edc" id="edbb" style={{ gridColumn:"span 2",padding:10,display:"flex",flexDirection:"column",gap:6 }}>
                      <div className="esk" style={{ height:5,width:"45%",borderRadius:3 }} />
                      <div style={{ display:"flex",gap:4,alignItems:"flex-end",height:22,marginTop:4 }}>
                        {[[50,"#FDE047","#F59E0B"],[80,"#F59E0B","#EA580C"],[60,"#EA580C","#EF4444"],[95,"#EA580C","#FB7185"],[70,"#F59E0B","#EA580C"]].map(([h,c1,c2],i) => (
                          <div key={i} style={{ flex:1,borderRadius:"3px 3px 0 0",height:`${h}%`,background:`linear-gradient(180deg,${c1},${c2})` }} />
                        ))}
                      </div>
                    </div>
                    {/* bottom full */}
                    <div className="edc" id="edbc" style={{ gridColumn:"1/-1",padding:"11px 14px",display:"flex",alignItems:"center",gap:10 }}>
                      <div style={{ display:"flex",flexDirection:"column",gap:6,flex:1 }}>
                        <div className="esk" style={{ height:5,width:"40%",borderRadius:3 }} />
                        <div style={{ display:"flex",gap:5 }}>
                          <div style={{ flex:3,height:7,borderRadius:3,background:"linear-gradient(90deg,#F59E0B,#EA580C)",opacity:0.6 }} />
                          <div style={{ flex:1,height:7,borderRadius:3,background:"rgba(0,0,0,0.07)" }} />
                          <div style={{ flex:0.8,height:7,borderRadius:3,background:"rgba(0,0,0,0.07)" }} />
                        </div>
                        <div className="esk" style={{ height:5,width:"55%",borderRadius:3 }} />
                      </div>
                      <div style={{ width:52,height:22,borderRadius:999,background:"linear-gradient(135deg,#EA580C,#FB7185)",flexShrink:0 }} />
                    </div>
                  </div>
                </div>

              </div>{/* end panel-inner */}
            </div>{/* end panel */}
          </div>{/* end halo */}

          {/* Sidepop outside panel but inside halo */}
          <div className="esidepop" id="esidepop">
            <div className="esp-lbl" style={{ width: "55%" }} />
            <div className="esp-swatches">
              <div className="esp-sw active" style={{ background: "linear-gradient(135deg,#FDE047,#EA580C)" }} />
              <div className="esp-sw" style={{ background: "linear-gradient(135deg,#3b82f6,#6366f1)" }} />
              <div className="esp-sw" style={{ background: "linear-gradient(135deg,#22c55e,#16a34a)" }} />
              <div className="esp-sw" style={{ background: "linear-gradient(135deg,#ec4899,#a855f7)" }} />
            </div>
            <div className="esp-div" />
            <div className="esp-lbl" style={{ width: "75%" }} />
            <div className="esp-track"><div className="esp-fill" style={{ width: "65%" }} /></div>
            <div className="esp-lbl" style={{ width: "65%" }} />
            <div className="esp-track"><div className="esp-fill" style={{ width: "45%" }} /></div>
          </div>

          {/* Dots */}
          <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 14 }}>
            {[0,1,2,3].map(i => <div className="edot" id={`ed${i}`} key={i} />)}
          </div>
        </div>

        {/* Titles */}
        <div className="ember-demo-titles" style={{ flex: 1, display: "flex", flexDirection: "column" as const, gap: "clamp(20px,3vw,32px)", minWidth: 200, paddingLeft: "136px" }}>
          {[
            ["01", "Search your industry", "Tell Ember what you're interested in. It scans live data from TikTok, Shopify and more."],
            ["02", "Find your idea", "Get validated, trending business ideas backed by real market signals."],
            ["03", "Launch it", "Ember builds your full business plan instantly — ready to act on."],
            ["04", "Track it", "Monitor your market, competitors and momentum from one dashboard."],
          ].map(([num, head, sub], i) => (
            <div className={`etitle${i === 0 ? " active" : ""}`} id={`et${i}`} key={i}>
              <div className="etitle-num">{num}</div>
              <div className="etitle-head">{head}</div>
              <div className="etitle-sub">{sub}</div>
            </div>
          ))}
        </div>

      </div>
    </>
  );
}