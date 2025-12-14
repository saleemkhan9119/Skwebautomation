/* ===============================================
   V4 AI ENGINE — SAIM + SOFIA DUAL AI SYSTEM
   Voice Recognition + Speech + Auto Language Detect
   =============================================== */

// GLOBAL VARIABLES
let currentAI = "saim"; 
let recognizing = false;

// Chat Elements
const chatButton = document.getElementById("chat-button");
const chatWindow = document.getElementById("chat-window");
const chatMessages = document.getElementById("chat-messages");
const chatInput = document.getElementById("chat-input");
const chatSend = document.getElementById("chat-send");

// ====== SHOW / HIDE CHAT WINDOW ======
chatButton.onclick = () => {
    chatWindow.style.display =
        chatWindow.style.display === "block" ? "none" : "block";
};

// ======== SPEECH RECOGNITION SETUP ==========
let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();
recognition.lang = "hi-IN"; 
recognition.continuous = false;
recognition.interimResults = false;

function startListening() {
    if (!recognizing) {
        recognition.start();
        recognizing = true;
    }
}

recognition.onresult = function(event) {
    let transcript = event.results[0][0].transcript.toLowerCase();
    addUserMessage(transcript);
    processUserMessage(transcript);
};

recognition.onend = function () {
    recognizing = false;
};

// ======== SPEECH SYNTHESIS SETUP ===========
let voices = [];
let maleVoice = null;
let femaleVoice = null;

function loadVoices() {
    voices = speechSynthesis.getVoices();

    maleVoice = voices.find(v => v.name.toLowerCase().includes("male")) 
                 || voices.find(v => v.name.includes("Google UK English Male"))
                 || voices[0];

    femaleVoice = voices.find(v => v.name.toLowerCase().includes("female"))
                   || voices.find(v => v.name.includes("Google UK English Female"))
                   || voices[0];
}

speechSynthesis.onvoiceschanged = loadVoices;

// ======= AI SPEAK FUNCTION ==========
function speak(text, ai="saim", lang="auto") {
    let utter = new SpeechSynthesisUtterance(text);

    // Auto language detect
    if (/[अ-ह]/.test(text)) {
        utter.lang = "hi-IN";
    } else {
        utter.lang = "en-US";
    }

    // Choose voice
    utter.voice = ai === "saim" ? maleVoice : femaleVoice;

    speechSynthesis.speak(utter);

    addBotMessage(text, ai);
}

// ======== CHAT MESSAGE HANDLING ==========
function addUserMessage(msg) {
    chatMessages.innerHTML += `<div style="text-align:right; margin:8px;">
        <span style="background:#0077ff;padding:8px 12px;border-radius:10px;color:#fff;">${msg}</span>
    </div>`;
}

function addBotMessage(msg, ai) {
    let color = ai === "saim" ? "#00d5ff" : "#ff66cc";

    chatMessages.innerHTML += `<div style="text-align:left; margin:8px;">
        <span style="background:${color};padding:8px 12px;border-radius:10px;color:black;">${msg}</span>
    </div>`;
}

chatSend.onclick = () => {
    let msg = chatInput.value;
    if (msg.trim() !== "") {
        addUserMessage(msg);
        processUserMessage(msg.toLowerCase());
    }
    chatInput.value = "";
};

// ======== MAIN AI BRAIN ==========
function processUserMessage(msg) {

    // ---------- VOICE SWITCHING ----------
    if (msg.includes("talk to saim") || msg.includes("male")) {
        currentAI = "saim";
        speak("Switched to Saim. I am ready to assist.", "saim");
        return;
    }

    if (msg.includes("talk to sofia") || msg.includes("female")) {
        currentAI = "sofia";
        speak("Switched to Sofia. How may I help you?", "sofia");
        return;
    }

    if (msg.includes("switch voice")) {
        currentAI = currentAI === "saim" ? "sofia" : "saim";
        speak("Voice switched successfully.", currentAI);
        return;
    }

    // ---------- LANGUAGE DETECTION ----------
    let isHindi = /[अ-ह]/.test(msg);

    // ---------- AI RESPONSES ----------
    if (msg.includes("hello") || msg.includes("hi") || msg.includes("namaste")) {
        if (isHindi) speak("Namaste! Main aapki kaise madad kar sakta hoon?", currentAI);
        else speak("Hello! How can I assist you today?", currentAI);
        return;
    }

    if (msg.includes("automation")) {
        if (currentAI === "saim") {
            speak("Automation reduces manual work and increases speed and accuracy by 70 percent.", "saim");
            setTimeout(() => {
                speak("Simple words mein, automation matlab kaam apne aap hota rehega.", "sofia");
            }, 2500);
        }
        return;
    }

    // DEFAULT REPLY
    if (isHindi) speak("Theek hai, main aapki baat process kar raha hoon.", currentAI);
    else speak("Alright, I am processing your request.", currentAI);
}

// =============== VOICE BUTTON ===============
document.getElementById("voice-button").onclick = () => {
    startListening();
};
