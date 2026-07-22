import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";
const CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT=9344, URL="http://localhost:3000/work/device-registration";
const chrome=spawn(CHROME,["--headless=new",`--remote-debugging-port=${PORT}`,
 "--user-data-dir=/tmp/drp-net","--no-first-run","--disable-extensions","about:blank"],{stdio:"ignore"});
const bad=[];
const rpc=(ws)=>{let id=0;const p=new Map();
 ws.addEventListener("message",e=>{const m=JSON.parse(e.data);
  if(m.id&&p.has(m.id)){p.get(m.id)(m);p.delete(m.id);}
  else if(m.method==='Network.responseReceived'&&m.params.response.status>=400)
    bad.push(m.params.response.status+' '+m.params.response.url.slice(0,150));});
 return (m,pr={})=>new Promise((res,rej)=>{const i=++id;p.set(i,x=>x.error?rej(new Error(x.error.message)):res(x.result));ws.send(JSON.stringify({id:i,method:m,params:pr}));});};
let t;for(let i=0;i<40;i++){try{const r=await fetch(`http://127.0.0.1:${PORT}/json/list`);t=(await r.json()).find(x=>x.type==="page");if(t)break;}catch{}await sleep(250);}
const ws=new WebSocket(t.webSocketDebuggerUrl);await new Promise(r=>ws.addEventListener("open",r));
const send=rpc(ws);await send("Network.enable");await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride",{width:390,height:844,deviceScaleFactor:3,mobile:true});
await send("Page.navigate",{url:URL});await sleep(8000);
console.log(bad.length?bad.join("\n"):"no 4xx/5xx");
ws.close();chrome.kill();
