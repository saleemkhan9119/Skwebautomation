// ✅ आपका n8n Webhook URL
const WEBHOOK_URL = "https://sallu1196.app.n8n.cloud/webhook/sofia-chat";

// चैट विंडो को खोलने/बंद करने के लिए
function toggleChat() {
    const window = document.getElementById('chat-window');
    const btn = document.getElementById('chat-widget-btn');
    
    if (window.style.display === 'flex') {
        window.style.display = 'none';
        btn.style.transform = 'scale(1)';
    } else {
        window.style.display = 'flex';
        btn.style.transform = 'scale(0)';
        setTimeout(() => document.getElementById('user-input').focus(), 100);
    }
}

// Enter बटन दबाने पर मैसेज भेजने के लिए
function handleEnter(e) {
    if (e.key === 'Enter') sendMessage();
}

// मैसेज भेजने का असली फंक्शन
async function sendMessage() {
    const inputField = document.getElementById('user-input');
    const message = inputField.value.trim();
    if (!message) return;

    // 1. यूजर का मैसेज दिखाएं
    appendMessage(message, 'user');
    inputField.value = '';

    // 2. 'Typing...' दिखाएं
    const typingId = appendMessage('Typing...', 'ai-temp');

    try {
        // 3. n8n को डेटा भेजें
        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: message }) 
        });

        const data = await response.json();

        // 4. टाइपिंग हटाएं और जवाब दिखाएं
        removeMessage(typingId);
        
        // जवाब को पकड़ना (reply या output दोनों के लिए)
        const replyText = data.reply || data.output || "I apologize, I am momentarily unavailable.";
        appendMessage(replyText, 'ai');

    } catch (error) {
        removeMessage(typingId);
        appendMessage("⚠️ Connection issue. Please try again.", 'ai');
        console.error(error);
    }
}

// चैट बॉक्स में मैसेज जोड़ने के लिए
function appendMessage(text, sender) {
    const msgDiv = document.createElement('div');
    const id = Date.now();
    msgDiv.id = id;
    
    if (sender === 'user') {
        msgDiv.className = 'msg msg-user';
        msgDiv.innerText = text;
    } else if (sender === 'ai-temp') {
        msgDiv.className = 'msg msg-ai';
        msgDiv.style.fontStyle = 'italic';
        msgDiv.style.color = '#888';
        msgDiv.innerText = 'Sofia is thinking...';
    } else {
        msgDiv.className = 'msg msg-ai';
        msgDiv.innerText = text;
    }

    const container = document.getElementById('messages');
    container.appendChild(msgDiv);
    container.scrollTop = container.scrollHeight;
    return id;
}

// टाइपिंग वाला मैसेज हटाने के लिए
function removeMessage(id) {
    const element = document.getElementById(id);
    if (element) element.remove();
}
