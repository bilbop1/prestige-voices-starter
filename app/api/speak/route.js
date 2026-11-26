import {timingSafeEqual} from "node:crypto";
import voices from "../../../voices.json";
import {allowGeneration} from "./limiter.mjs";
export const runtime="nodejs";
export async function POST(request){
 const key=process.env.ELEVENLABS_API_KEY, pass=process.env.ACCESS_PASSWORD;
 if(!key||!pass||pass.length<24)return new Response("Deployment is not configured.",{status:503});
 const supplied=request.headers.get("authorization")||""; const expected="Bearer "+pass;
 const a=Buffer.from(supplied),b=Buffer.from(expected); if(a.length!==b.length||!timingSafeEqual(a,b))return new Response("Access denied.",{status:401});
 const length=Number(request.headers.get("content-length")||0);if(length>12000)return new Response("Request too large.",{status:413});
 let data;try {data=await request.json()}catch{return new Response("Invalid request.",{status:400})}
 if(!voices.some(v=>v.id===data.voice)||typeof data.text!=="string"||!data.text.trim()||data.text.length>2000)return new Response("Choose a voice and enter up to 2,000 characters.",{status:400});
 if(!allowGeneration())return new Response("Please wait before generating again.",{status:429,headers:{"Retry-After":"60"}});
 try{const r=await fetch("https://api.elevenlabs.io/v1/text-to-speech/"+encodeURIComponent(data.voice),{method:"POST",redirect:"error",headers:{"xi-api-key":key,"Content-Type":"application/json"},body:JSON.stringify({text:data.text,model_id:"eleven_multilingual_v2"})});if(!r.ok)return new Response("ElevenLabs could not generate audio. Check your account and selected voice.",{status:502});return new Response(r.body,{headers:{"Content-Type":"audio/mpeg","Cache-Control":"no-store"}})}catch{return new Response("Generation could not be completed. Check your ElevenLabs history before retrying.",{status:502})}
}
