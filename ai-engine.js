let currentAI = "saim";

let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let reco = new SpeechRecognition();
reco.lang = "hi-IN";
reco.interimResults = false;

let voices = [];
let maleVoice, femaleVoice;

function loadVoices() {
    voices = speechSynthesis.getVoices();

    maleVoice = voices.find(v => v.name.toLowerCase().includes("male")) || voices[0];
    femaleVoice = voices.find(v => v.name.toLowerCase().includes("female")) || voices[1];
}
speechSynthesis.onvoiceschanged = loadVoices;

function speak(text) {
    let msg = new SpeechSynthesisUtterance(text);
    msg.voice = currentAI === "saim" ? maleVoice : femaleVoice;
    msg.rate = 1;
    msg.pitch = 1;
    speechSynthesis.speak(msg);
}

reco.onresult = function(e) {
    let userText = e.results[0][0].transcript;
    addMessage("You: " + userText);

    botReply(userText);
};

document.getElementById("voice-btn").onclick = () => reco.start();
document.getElementById("switch-btn").onclick = () => {
    currentAI = currentAI === "saim" ? "sofia" : "saim";
    addMessage("🟡 Voice switched to " + currentAI);
};

document.getElementById("chat-send").onclick = sendMsg;

function sendMsg() {
    let text = document.getElementById("chat-input").value;
    if (!text) return;

    addMessage("You: " + text);
    botReply(text);
}

function botReply(q) {
    let reply = "Mujhe samajh nahi aaya.";

    if (q.includes("hello")) reply = "Hello! How can I help?";
    if (q.includes("kaun ho")) reply = "Main ek AI automation agent hoon.";
    if (q.includes("automation")) reply = "Automation se aapka kaam 5x faster ho jaata hai.";

    addMessage("AI: " + reply);
    speak(reply);
}

function addMessage(msg) {
    let box = document.getElementById("chat-messages");
    box.innerHTML += "<div>" + msg + "</div>";
    box.scrollTop = box.scrollHeight;
}
