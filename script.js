document.addEventListener('DOMContentLoaded', function() {
    
    // --- ELEMENTS KO SELECT KARNA ---
    const activateBtn = document.getElementById('activate-btn');
    const chatInterface = document.getElementById('chat-interface');
    const closeChatBtn = document.getElementById('close-chat');
    const sendBtn = document.getElementById('send-btn');
    const userInput = document.getElementById('user-input');
    const chatHistory = document.getElementById('chat-history');

    // --- 1. CHAT OPEN KARNE KA LOGIC ---
    if (activateBtn) {
        activateBtn.addEventListener('click', function() {
            chatInterface.classList.remove('hidden'); // Hidden class hatayega
            addMessage("System", "Welcome back! Saim and Sofia are online. How can we help?");
        });
    }

    // --- 2. CHAT CLOSE KARNE KA LOGIC ---
    if (closeChatBtn) {
        closeChatBtn.addEventListener('click', function() {
            chatInterface.classList.add('hidden'); // Wapas chupa dega
        });
    }

    // --- 3. MESSAGE BHEJNE KA LOGIC ---
    if (sendBtn) {
        sendBtn.addEventListener('click', function() {
            sendMessage();
        });
    }

    // Enter button dabane par bhi message jaye
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // --- MAIN FUNCTION: MESSAGE HANDLE KARNA ---
    function sendMessage() {
        const text = userInput.value.trim();
        if (text === "") return; // Agar khali hai to kuch mat karo

        // 1. User ka message add karo
        addMessage("You", text);
        userInput.value = ""; // Input saaf karo

        // 2. Thoda wait karke AI ka jawab (Simulation)
        const loadingDiv = document.createElement('div');
        loadingDiv.textContent = "AI is thinking...";
        loadingDiv.style.fontSize = "0.8rem";
        loadingDiv.style.color = "#888";
        loadingDiv.style.padding = "5px 10px";
        chatHistory.appendChild(loadingDiv);
        chatHistory.scrollTop = chatHistory.scrollHeight;

        setTimeout(() => {
            chatHistory.removeChild(loadingDiv); // Loading hatao
            
            // Simple Logic: Agar "hello" bole to Sofia, technical ho to Saim
            let aiResponse = "";
            if (text.toLowerCase().includes("hello") || text.toLowerCase().includes("hi")) {
                aiResponse = "👋 Hi there! I am Sofia. Ready to assist you!";
            } else if (text.toLowerCase().includes("price") || text.toLowerCase().includes("cost")) {
                aiResponse = "💰 Our pricing starts at ₹499/month. Check the Pricing section!";
            } else {
                aiResponse = "🤖 (Saim): I have analyzed your request. Processing data...";
            }
            
            addMessage("AI", aiResponse);
        }, 1500); // 1.5 second ka delay real lagne ke liye
    }

    // --- HELPER: SCREEN PAR MESSAGE DIKHANA ---
    function addMessage(sender, text) {
        const msgDiv = document.createElement('div');
        msgDiv.style.marginBottom = "10px";
        msgDiv.style.padding = "8px";
        msgDiv.style.borderRadius = "5px";
        
        if (sender === "You") {
            msgDiv.style.background = "#333";
            msgDiv.style.textAlign = "right";
            msgDiv.innerHTML = `<strong>You:</strong> ${text}`;
        } else {
            msgDiv.style.background = "#1a1a1a";
            msgDiv.style.border = "1px solid #333";
            msgDiv.style.color = "#e0cea4"; // Gold color for AI
            msgDiv.innerHTML = `<strong>${sender}:</strong> ${text}`;
        }
        
        chatHistory.appendChild(msgDiv);
        // Auto scroll to bottom
        chatHistory.scrollTop = chatHistory.scrollHeight;
    }
});
