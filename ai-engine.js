<script src="background.js"></script>
/* =====================================================
   V5 ULTRA AI ENGINE — SAIM + SOFIA SUPER BRAIN
   Intro Voice • Memory • Mood System • Dual AI Logic
   ===================================================== */

// ====== MEMORY SYSTEM ======
let AIMemory = {
    username: null,
    preferences: {},
    lastTopic: null
};

// ====== CURRENT STATES ======
let currentAI = "saim";
let currentMood = "friendly";   // friendly, technical, sales
let longAnswerMode = false;

// ===== CHAT UI ELEMENTS =====
const chatMessages = document.getElementById("chat-messages");
const chatInput = document.getElementById("chat-input");
const chatSend = document.getElementById("chat-send");

// ===== VOICE RECOGNITION =====
let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
let recognition = new SpeechRecognition();
recognition.lang = "hi-IN";
recognition.interimResults = false;

// ===== VOICES LOADING =====
let voices = [];
let maleVoice = null;
let femaleVoice = null;

function loadVoices() {
    voices = speechSynthesis.getVoices();

    maleVoice = voices.find(v => v.name.toLowerCase().includes("male")) ||
                voices.find(v => v.name.includes("Google UK English Male")) ||
                voices[0];

    femaleVoice = voices.find(v => v.name.toLowerCase().includes("female")) ||
                  voices.find(v => v.name.includes("Google UK English Female")) ||
                  voices[0];
}
speechSynthesis.onvoiceschanged = loadVoices;

// ===== SPEAK FUNCTION (Mood + Language + Personality) =====
function speak(text, ai = currentAI) {
    let utter = new SpeechSynthesisUtterance(text);

    // Hindi / English auto detect
    utter.lang = /[अ-ह]/.test(text) ? "hi-IN" : "en-US";

    // AI voice
    utter.voice = ai === "saim" ? maleVoice : femaleVoice;

    // Apply mood tone
    if (currentMood === "friendly") utter.pitch = 1.1;
    if (currentMood === "technical") utter.pitch = 0.9;
    if (currentMood === "sales") utter.pitch = 1.2;

    // Add hologram glow sync
    updateHologramGlow(ai);

    speechSynthesis.speak(utter);
    addBotMessage(text, ai);
}

// ===== HOLOGRAM GLOW SYNC =====
function updateHologramGlow(ai) {
    let holo = document.getElementById("hologram-container");

    if (ai === "saim") {
        holo.style.filter = "drop-shadow(0 0 25px #ffbb33)";
    } else {
        holo.style.filter = "drop-shadow(0 0 25px #ffeeaa)";
    }
}

// ===== CHAT UI MESSAGE HANDLING =====
function addUserMessage(msg) {
    chatMessages.innerHTML += `<div style="text-align:right; margin:8px;">
        <span style="background:#444; padding:8px 12px; border-radius:10px; color:#fff;">${msg}</span>
    </div>`;
}

function addBotMessage(msg, ai) {
    let color = ai === "saim" ? "#ffcc66" : "#ffeeaa";
    chatMessages.innerHTML += `<div style="text-align:left; margin:8px;">
        <span style="background:${color}; padding:8px 12px; border-radius:10px; color:#000;">${msg}</span>
    </div>`;
}

chatSend.onclick = () => {
    let msg = chatInput.value.trim();
    if (msg !== "") {
        addUserMessage(msg);
        processMessage(msg.toLowerCase());
        chatInput.value = "";
    }
};

// ===== INTELLIGENT MESSAGE PROCESSOR =====
function processMessage(msg) {
    AIMemory.lastTopic = msg;

    // ----- NAME REMEMBER -----
    if (msg.startsWith("my name is") || msg.startsWith("mera naam")) {
        let name = msg.replace("my name is", "").replace("mera naam", "").trim();
        AIMemory.username = name;

        speak(`Nice to meet you, ${name}. I will remember your name.`, currentAI);
        return;
    }

    // ----- ASK NAME -----
    if (msg.includes("what is my name") || msg.includes("mera naam kya")) {
        if (AIMemory.username)
            speak(`Your name is ${AIMemory.username}.`, currentAI);
        else
            speak("I don't know your name yet. Please tell me once.", currentAI);
        return;
    }

    // ----- CHANGE AI -----
    if (msg.includes("talk to saim")) {
        currentAI = "saim";
        speak("Switched to Saim.", "saim");
        return;
    }
    if (msg.includes("talk to sofia")) {
        currentAI = "sofia";
        speak("Switched to Sofia.", "sofia");
        return;
    }

    // ----- MOOD CONTROLS -----
    if (msg.includes("friendly")) {
        currentMood = "friendly";
        speak("I am now in friendly mode.", currentAI);
        return;
    }
    if (msg.includes("technical")) {
        currentMood = "technical";
        speak("Switching to technical mode.", currentAI);
        return;
    }
    if (msg.includes("sales")) {
        currentMood = "sales";
        speak("Sales mode enabled.", currentAI);
        return;
    }

    // ----- LONG ANSWER MODE -----
    if (msg.includes("explain in detail")) {
        longAnswerMode = true;
        speak("Alright, I will start giving detailed answers.", currentAI);
        return;
    }

    // ----- AUTOMATION EXPLANATION -----
    if (msg.includes("automation")) {
        if (longAnswerMode) {
            speak("Automation means using intelligent systems to reduce manual effort.", "saim");
            setTimeout(() => {
                speak("In simple words, automation saves time and works automatically.", "sofia");
            }, 3000);
        } else {
            speak("Automation reduces work and increases efficiency.", currentAI);
        }
        return;
    }

    // ----- DEFAULT SMART RESPONSE -----
    speak("I am processing your request.", currentAI);
}

// ===== INTRO VOICE (Runs on page load) =====
setTimeout(() => {
    speak("System initialized. Saim reporting online.", "saim");
    setTimeout(() => {
        speak("Hello Saleem. I am Sofia, your AI assistant.", "sofia");
    }, 2500);
}, 2000);

// ===== VOICE RECOGNITION START =====
document.getElementById("voice-button").onclick = () => {
    recognition.start();
};

recognition.onresult = function (event) {
    let msg = event.results[0][0].transcript.toLowerCase();
    addUserMessage(msg);
    processMessage(msg);
};
