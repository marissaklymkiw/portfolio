import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";
const CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT=9343, URL="http://localhost:3000/work/device-registration";
const chrome=spawn(CHROME,["--headless=new",`--remote-debugging-port=${PORT}`,
 "--user-data-dir=/tmp/drp-con","--no-first-run","--disable-extensions","about:blank"],{stdio:"ignore"});
const rpc=(ws)=>{let id=0;const p=new Map();const ev=[];
 ws.addEventListener("message",e=>{const m=JSON.parse(e.data);
  if(m.id&&p.has(m.id)){p.get(m.id)(m);p.delete(m.id);}
  else if(m.method==='Log.entryAdded'&&['error','warning'].includes(m.params.entry.level)) ev.push(m.params.entry.level+': '+m.params.entry.text.slice(0,160));
  else if(m.method==='Runtime.exceptionThrown') ev.push('EXC: '+(m.params.exceptionDetails.exception?.description||'').slice(0,160));
  else if(m.method==='Runtime.consoleAPICalled'&&['error','warning'].includes(m.params.type)) ev.push(m.params.type+': '+(m.params.args[0]?.value||'').toString().slice(0,160));});
 return [(m,pr={})=>new Promise((res,rej)=>{const i=++id;p.set(i,x=>x.error?rej(new Error(x.error.message)):res(x.result));ws.send(JSON.stringify({id:i,method:m,params:pr}));}),ev];};
let t;for(let i=0;i<40;i++){try{const r=await fetch(`http://127.0.0.1:${PORT}/json/list`);t=(await r.json()).find(x=>x.type==="page");if(t)break;}catch{}await sleep(250);}
const ws=new WebSocket(t.webSocketDebuggerUrl);await new Promise(r=>ws.addEventListener("open",r));
const [send,events]=rpc(ws);
await send("Log.enable");await send("Runtime.enable");await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride",{width:390,height:844,deviceScaleFactor:3,mobile:true});
await send("Page.navigate",{url:URL});await sleep(7000);
console.log(events.length?events.join("\n"):"NO ERRORS OR WARNINGS");
ws.close();chrome.kill();
