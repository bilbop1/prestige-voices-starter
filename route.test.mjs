import {test} from "node:test";
import assert from "node:assert/strict";
import {readFile} from "node:fs/promises";
const source = (await readFile(new URL("./app/api/speak/route.js", import.meta.url), "utf8"))
 .replace('import voices from "../../../voices.json";', `const voices=${await readFile(new URL("./voices.json", import.meta.url), "utf8")};`)
 .replace('"./limiter.mjs"', JSON.stringify(new URL("./app/api/speak/limiter.mjs", import.meta.url).href));
const {POST}=await import("data:text/javascript;base64,"+Buffer.from(source).toString("base64"));
const voices=JSON.parse(await readFile(new URL("./voices.json",import.meta.url),"utf8"));
const password="test-password-which-is-long-enough";
process.env.ELEVENLABS_API_KEY="test-key"; process.env.ACCESS_PASSWORD=password;
let calls=0;globalThis.fetch=async()=>{calls++;return new Response("audio",{status:200})};
function req(auth,body={voice:voices[0].id,text:"Test script"}) {return new Request("http://localhost/api/speak",{method:"POST",headers:{authorization:auth,"content-type":"application/json"},body:JSON.stringify(body)});}
test("rejects missing password and limits authorized requests before generation",async()=>{
 assert.equal((await POST(req(""))).status,401); assert.equal(calls,0);
 for(let i=0;i<3;i++) assert.equal((await POST(req("Bearer "+password))).status,200);
 assert.equal((await POST(req("Bearer "+password))).status,429); assert.equal(calls,3);
});
