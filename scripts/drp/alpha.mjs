import { spawn } from "node:child_process";
import { readFileSync } from "node:fs";
import { setTimeout as sleep } from "node:timers/promises";
const CHROME="/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";
const PORT=9357;
const files=process.argv.slice(2);
const chrome=spawn(CHROME,["--headless=new",`--remote-debugging-port=${PORT}`,
 "--user-data-dir=/tmp/drp-alpha","--no-first-run","--disable-extensions","about:blank"],{stdio:"ignore"});
const rpc=(ws)=>{let id=0;const p=new Map();
 ws.addEventListener("message",e=>{const m=JSON.parse(e.data);if(m.id&&p.has(m.id)){p.get(m.id)(m);p.delete(m.id);}});
 return (m,pr={})=>new Promise((res,rej)=>{const i=++id;p.set(i,x=>x.error?rej(new Error(x.error.message)):res(x.result));ws.send(JSON.stringify({id:i,method:m,params:pr}));});};
let t;for(let i=0;i<40;i++){try{const r=await fetch(`http://127.0.0.1:${PORT}/json/list`);t=(await r.json()).find(x=>x.type==="page");if(t)break;}catch{}await sleep(250);}
const ws=new WebSocket(t.webSocketDebuggerUrl);await new Promise(r=>ws.addEventListener("open",r));
const send=rpc(ws);await send("Runtime.enable");
for(const f of files){
 const b64="data:image/png;base64,"+readFileSync(f).toString("base64");
 const r=await send("Runtime.evaluate",{awaitPromise:true,returnByValue:true,expression:`
  (async()=>{const im=new Image();im.src="${b64}";await im.decode();
   const c=document.createElement('canvas');c.width=im.width;c.height=im.height;
   const x=c.getContext('2d');x.drawImage(im,0,0);
   const d=x.getImageData(0,0,im.width,im.height).data;
   let transparent=0,opaque=0,nonWhite=0;
   for(let i=0;i<d.length;i+=4){ if(d[i+3]<255) transparent++; else opaque++;
     if(d[i+3]===255 && !(d[i]>250&&d[i+1]>250&&d[i+2]>250)) nonWhite++; }
   const total=d.length/4;
   return JSON.stringify({size:im.width+'x'+im.height,
     pctTransparent:+(100*transparent/total).toFixed(1),
     pctOpaqueNonWhite:+(100*nonWhite/total).toFixed(1)});})()`});
 console.log(f.split('/').pop().padEnd(24), r.result.value);
}
ws.close();chrome.kill();
