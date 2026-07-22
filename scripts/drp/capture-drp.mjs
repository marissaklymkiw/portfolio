/**
 * Recapture the DRP carousel screens as LOSSLESS PNGs at 2x.
 *
 * Why not the browser-tool screenshots: those come back as JPEG, and next/image
 * then re-encodes to WebP. Two lossy passes over flat UI fills and 11px table
 * text is exactly where ringing and mosquito noise come from. CDP's
 * Page.captureScreenshot returns PNG, and deviceScaleFactor:2 gives 2732x1708 —
 * genuine 2x for the ~820px carousel slot instead of a 1.2x upscale.
 */
import { spawn } from "node:child_process";
import { writeFileSync, mkdirSync } from "node:fs";
import { setTimeout as sleep } from "node:timers/promises";

const CHROME = "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT = 9333;
const BASE = "https://phase2.d3j837z0lknp4p.amplifyapp.com";
const OUT = process.argv[2];
const W = 1366, H = 854; // 16:10, matching the carousel card aspect exactly

mkdirSync(OUT, { recursive: true });

const chrome = spawn(CHROME, [
  "--headless=new",
  `--remote-debugging-port=${PORT}`,
  "--user-data-dir=/tmp/drp-shot-profile",
  "--no-first-run",
  "--hide-scrollbars",
  "--force-color-profile=srgb",
  "--disable-extensions",
  `--window-size=${W},${H}`,
  "about:blank",
], { stdio: "ignore" });

const rpc = (ws) => {
  let id = 0;
  const pending = new Map();
  ws.addEventListener("message", (e) => {
    const m = JSON.parse(e.data);
    if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); }
  });
  return (method, params = {}) =>
    new Promise((res, rej) => {
      const myId = ++id;
      pending.set(myId, (m) => (m.error ? rej(new Error(method + ": " + m.error.message)) : res(m.result)));
      ws.send(JSON.stringify({ id: myId, method, params }));
    });
};

async function main() {
  // wait for the debugger to come up
  let target;
  for (let i = 0; i < 40; i++) {
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}/json/list`);
      const list = await r.json();
      target = list.find((t) => t.type === "page");
      if (target) break;
    } catch {}
    await sleep(250);
  }
  if (!target) throw new Error("Chrome debugger never came up");

  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener("open", r));
  const send = rpc(ws);

  await send("Page.enable");
  await send("Runtime.enable");
  await send("Emulation.setDeviceMetricsOverride", {
    width: W, height: H, deviceScaleFactor: 2, mobile: false,
  });

  const goto = async (url) => {
    await send("Page.navigate", { url });
    await sleep(2600);
  };
  const evaluate = async (expression) => {
    const r = await send("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
    return r.result?.value;
  };
  /* Redact the surnames of REAL people. The prototype seeds itself with a real
     UCLA colleague's name for the super-admin account; the remaining names in
     the fixtures are generated demo data and are left alone.
     Capitalised match on purpose: it rewrites the displayed "Krishna Seelam"
     while leaving the "kseelam" logon IDs in the Owner and User columns intact,
     which is what keeps those tables looking like real data. */
  const REAL_SURNAMES = [["Seelam", "S."]];
  const redact = async () => {
    const n = await evaluate(`(()=>{
      const pairs = ${JSON.stringify(REAL_SURNAMES)};
      const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      const nodes = []; while (w.nextNode()) nodes.push(w.currentNode);
      let hits = 0;
      for (const t of nodes) {
        let v = t.nodeValue;
        for (const [sur, rep] of pairs) {
          if (v.includes(sur)) { v = v.split(sur).join(rep); hits++; }
        }
        if (v !== t.nodeValue) t.nodeValue = v;
      }
      return hits;
    })()`);
    const left = await evaluate(
      `${JSON.stringify(REAL_SURNAMES.map((p) => p[0]))}.filter(s=>document.body.innerText.includes(s))`,
    );
    if (left.length) throw new Error("surname survived redaction: " + left.join(", "));
    return n;
  };

  const shot = async (name) => {
    // strip prototype-only scaffolding: it's the harness, not the product
    await evaluate(`(()=>{const s=document.createElement('style');
      s.textContent='.proto-switcher,.proto-toggle-wrap{display:none !important;}';
      document.head.appendChild(s); window.scrollTo(0,0); return 1;})()`);
    const redacted = await redact();
    if (redacted) console.log(`  redacted ${redacted} node(s)`);
    await sleep(500);
    const { data } = await send("Page.captureScreenshot", { format: "png", captureBeyondViewport: false });
    writeFileSync(`${OUT}/${name}.png`, Buffer.from(data, "base64"));
    console.log("captured", name);
  };

  const loginAs = async (roleLabel, expectRole) => {
    // clear the stored session first — the app skips the role picker when it
    // already has one, which is why every shot came back as `basic` on the
    // first run. Match on includes(), not startsWith(): the role cards lead
    // with an icon glyph before the label text.
    await goto(`${BASE}/login`);
    await evaluate(`localStorage.removeItem('drp-prototype-auth'); 1`);
    await goto(`${BASE}/login`);
    const picked = await evaluate(`(()=>{const b=[...document.querySelectorAll('button')]
      .find(x=>x.textContent.includes(${JSON.stringify(roleLabel)}));
      if(b) b.click(); return !!b;})()`);
    if (!picked) throw new Error("role card not found: " + roleLabel);
    await sleep(400);
    await evaluate(`(()=>{const b=[...document.querySelectorAll('button')]
      .find(x=>/Sign in with UCLA/.test(x.textContent)); if(b) b.click(); return !!b;})()`);
    await sleep(2600);
    const got = await evaluate(`JSON.parse(localStorage.getItem('drp-prototype-auth')||'{}').role`);
    const greeting = await evaluate(`document.querySelector('h1,h2')?.textContent.trim()`);
    if (got !== expectRole) throw new Error(`wanted ${expectRole}, got ${got}`);
    console.log(`  ${roleLabel} -> role=${got} ${JSON.stringify(greeting)}`);
    return got;
  };

  await loginAs("Basic User", "basic");
  await shot("01-basic-user-home");

  await loginAs("Group Admin", "group-admin");
  await shot("02-group-admin-home");

  await loginAs("Super Admin", "super-admin");
  await shot("03-super-admin-home");

  await goto(`${BASE}/device-management/register`);
  await shot("04-register-device");

  await goto(`${BASE}/device-management/manage`);
  await shot("05-manage-devices");

  // Open the row action menu, then Edit, to get the drawer. The menu renders in
  // an overlay portal, so the Edit item does not exist until after the trigger
  // click settles — hence the wait between the two, and the assertion that the
  // drawer actually appeared rather than trusting the clicks fired.
  await evaluate(`(()=>{const btns=[...document.querySelectorAll('button')]
    .filter(b=>/more|actions/i.test(b.getAttribute('aria-label')||''));
    (btns[1]||btns[0])?.click(); return btns.length;})()`);
  await sleep(1400);
  const candidates = await evaluate(`JSON.stringify([...document.querySelectorAll('button,[role="menuitem"],a,li')]
    .map(x=>(x.innerText||'').trim()).filter(t=>t&&t.length<24).slice(0,25))`);
  console.log("  menu candidates:", candidates);
  // match on innerText and allow an icon ligature to precede the label
  const clickedEdit = await evaluate(`(()=>{const e=[...document.querySelectorAll('button,[role="menuitem"],a,li')]
    .find(x=>/(^|\\s)Edit$/.test((x.innerText||'').trim()));
    if(e){e.click();return true;} return false;})()`);
  await sleep(2200);
  const drawerOpen = await evaluate(`/Edit device/.test(document.body.innerText)`);
  if (!clickedEdit || !drawerOpen) {
    throw new Error(`edit drawer failed (clicked=${clickedEdit}, open=${drawerOpen})`);
  }
  await shot("06-manage-devices-edit-drawer");

  await goto(`${BASE}/admin/audit-logs`);
  await shot("07-audit-log");

  ws.close();
  chrome.kill();
  console.log("done");
}

main().catch((e) => { console.error("FAIL", e.message); chrome.kill(); process.exit(1); });
