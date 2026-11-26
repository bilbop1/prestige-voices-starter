"use client";
import {useState} from "react";
import voices from "../voices.json";
export default function Home(){
 const [voice,setVoice]=useState(voices[0].id),[text,setText]=useState(""),[pass,setPass]=useState(""),[audio,setAudio]=useState(""),[error,setError]=useState("");
 const selected=voices.find(v=>v.id===voice);
 async function generate(e){e.preventDefault();setError(""); if(audio)URL.revokeObjectURL(audio);setAudio("");try{let r=await fetch("/api/speak",{method:"POST",headers:{"Content-Type":"application/json","Authorization":"Bearer "+pass},body:JSON.stringify({voice,text})});if(!r.ok)throw Error(await r.text());setAudio(URL.createObjectURL(await r.blob()))}catch(e){setError(e.message)}}
 return <main style={{fontFamily:"sans-serif",maxWidth:680,margin:"3rem auto",padding:20}}><h1>Prestige Voices</h1><p>Choose a voice and play its sample. Enter a script to make narration.</p><form onSubmit={generate}><p><label>Voice <select value={voice} onChange={e=>setVoice(e.target.value)}>{voices.map(v=><option value={v.id} key={v.id}>{v.name}</option>)}</select></label></p><p><audio controls src={selected.preview}/></p><p><a href={selected.share} target="_blank" rel="noreferrer">Add this voice to ElevenLabs</a></p><p><textarea required maxLength={2000} rows={8} style={{width:"100%"}} value={text} onChange={e=>setText(e.target.value)} placeholder="Your script"/></p><p><input required type="password" autoComplete="off" value={pass} onChange={e=>setPass(e.target.value)} placeholder="Deployment access password"/></p><button>Generate narration</button></form><p>Generation uses your ElevenLabs account and credits. Voice Library API access requires an eligible plan.</p>{error&&<p role="alert">{error}</p>}{audio&&<audio controls src={audio}/>}</main>
}
