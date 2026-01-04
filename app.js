const WEBHOOK = "https://sallu1196.app.n8n.cloud/webhook/meta-verify";
let demoCount = 0;
const DEMO_LIMIT = 5;

const demoBox = document.getElementById("demoBox");
const messages = document.getElementById("messages");
const input = document.getElementById("userInput");

function openDemo(){ demoBox.style.display="flex"; }
function closeDemo(){ demoBox.style.display="none"; }

input.addEventListener("keydown",e=>{
  if(e.key==="Enter"){
    if(demoCount >= DEMO_LIMIT){
      messages.innerHTML += `<div style="color:#D4AF37">Demo limit reached. Contact us.</div>`;
      return;
    }

    const msg = input.value;
    const industry = document.getElementById("industry").value;
    input.value="";
    demoCount++;

    messages.innerHTML += `<div>You: ${msg}</div>`;

    fetch(WEBHOOK,{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body:JSON.stringify({
        message: msg,
        source: "website",
        demo_mode: true,
        industry: industry,
        language: "auto"
      })
    })
    .then(r=>r.json())
    .then(d=>{
      messages.innerHTML += `<div style="color:#D4AF37">AI: ${d.reply}</div>`;
      messages.scrollTop = messages.scrollHeight;
    });
  }
});
