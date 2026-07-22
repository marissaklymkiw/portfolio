/**
 * Mobile pass of the case-study test plan at a TRUE 390x844.
 *
 * The desktop browser cannot be resized below ~528px, so measuring "mobile" in
 * it silently tests the wrong breakpoint. CDP's setDeviceMetricsOverride gives
 * the real viewport and device pixel ratio.
 */
import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = 9340;
const URL = process.argv[2] || "http://localhost:3000/work/device-registration";
const W = 390, H = 844, DPR = 3;

const chrome = spawn(CHROME, ["--headless=new", `--remote-debugging-port=${PORT}`,
  "--user-data-dir=/tmp/drp-audit", "--no-first-run", "--hide-scrollbars",
  "--disable-extensions", "about:blank"], { stdio: "ignore" });

const rpc = (ws) => { let id = 0; const p = new Map();
  ws.addEventListener("message", (e) => { const m = JSON.parse(e.data);
    if (m.id && p.has(m.id)) { p.get(m.id)(m); p.delete(m.id); } });
  return (method, params = {}) => new Promise((res, rej) => { const i = ++id;
    p.set(i, (m) => (m.error ? rej(new Error(m.error.message)) : res(m.result)));
    ws.send(JSON.stringify({ id: i, method, params })); }); };

let t;
for (let i = 0; i < 40; i++) {
  try { const r = await fetch(`http://127.0.0.1:${PORT}/json/list`);
    t = (await r.json()).find((x) => x.type === "page"); if (t) break; } catch {}
  await sleep(250);
}
const ws = new WebSocket(t.webSocketDebuggerUrl);
await new Promise((r) => ws.addEventListener("open", r));
const send = rpc(ws);
await send("Page.enable"); await send("Runtime.enable");
await send("Emulation.setDeviceMetricsOverride", { width: W, height: H, deviceScaleFactor: DPR, mobile: true });
await send("Page.navigate", { url: URL });
await sleep(5000);

const ev = async (e) => (await send("Runtime.evaluate", { expression: e, awaitPromise: true, returnByValue: true })).result?.value;

// force lazy images so resolution can be measured
await ev(`(async()=>{document.querySelectorAll('img[loading="lazy"]').forEach(i=>i.loading='eager');
 for(let y=0;y<document.body.scrollHeight;y+=600){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,60));}
 window.scrollTo(0,0);return 1})()`);
await sleep(4000);

const out = await ev(`(()=>{
  const de=document.documentElement;
  const textEls=[...document.querySelectorAll('article *')].filter(e=>[...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim())&&e.offsetParent!==null);
  const sizes=textEls.map(e=>({s:parseFloat(getComputedStyle(e).fontSize),t:e.textContent.trim().slice(0,30)}));
  const bodyish=sizes.filter(x=>x.s>=14);
  const under16=sizes.filter(x=>x.s<16&&x.s>=12);
  const under12=sizes.filter(x=>x.s<12);

  const focus=[...document.querySelectorAll('article a[href],article button,article input,article summary')].filter(e=>e.offsetParent!==null);
  const small=focus.map(e=>{const r=e.getBoundingClientRect();
    return {tag:e.tagName,t:(e.textContent||e.getAttribute('aria-label')||'').trim().slice(0,26),w:Math.round(r.width),h:Math.round(r.height)};})
    .filter(e=>e.h>0&&e.h<44);

  const imgs=[...document.querySelectorAll('article img')].filter(i=>i.getBoundingClientRect().width>0);
  const imgRows=imgs.map(i=>{const w=i.getBoundingClientRect().width;
    const m=(i.currentSrc||'').match(/[?&]w=(\\d+)/); const served=m?+m[1]:(i.naturalWidth||0);
    return {f:decodeURIComponent((i.getAttribute('src')||'').replace(/^.*?url=/,'').split('&')[0]).split('/').pop().slice(0,26),
      rendered:Math.round(w),served,x:+(served/w).toFixed(2),svg:/\\.svg$/.test(i.currentSrc||''),
      overflow: Math.round(i.getBoundingClientRect().right) > de.clientWidth+1};});

  return JSON.stringify({
    viewport:{w:innerWidth,h:innerHeight,dpr:devicePixelRatio},
    hScroll:{scrollW:de.scrollWidth,client:de.clientWidth,overflowPx:de.scrollWidth-de.clientWidth},
    type:{min:Math.min(...sizes.map(x=>x.s)), bodyMin:Math.min(...bodyish.map(x=>x.s)),
      under16:under16.length, under12:under12.length,
      under12Samples:[...new Set(under12.map(x=>x.s))],
      h1:getComputedStyle(document.querySelector('article h1')).fontSize},
    touch:{total:focus.length, under44:small.length, worst:small.sort((a,b)=>a.h-b.h).slice(0,6)},
    images:{count:imgRows.length, under2x:imgRows.filter(r=>!r.svg&&r.x<2).length,
      under2xList:imgRows.filter(r=>!r.svg&&r.x<2).map(r=>({f:r.f,x:r.x,rendered:r.rendered,served:r.served})),
      overflowing:imgRows.filter(r=>r.overflow).map(r=>r.f)}
  });
})()`);

console.log(out);
ws.close(); chrome.kill();
