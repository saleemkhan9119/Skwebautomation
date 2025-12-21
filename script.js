document.addEventListener('DOMContentLoaded', () => {
    const activateBtn = document.getElementById('activate-btn');
    const chatInterface = document.getElementById('chat-interface');
    const closeChat = document.getElementById('close-chat');
    const sendBtn = document.getElementById('send-btn');
    const userInput = document.getElementById('user-input');
    const chatBody = document.getElementById('chat-history');

    // Chat Toggle
    if(activateBtn) activateBtn.addEventListener('click', () => {
        chatInterface.classList.remove('hidden');
        if(chatBody.children.length === 0) {
            botType("Hello! I am Sofia, your Master AI. I can control your entire workflow. How can I help today?");
        }
    });

    if(closeChat) closeChat.addEventListener('click', () => chatInterface.classList.add('hidden'));

    // Send Message
    sendBtn.addEventListener('click', handleSend);
    userInput.addEventListener('keypress', (e) => { if(e.key === 'Enter') handleSend(); });

    // Global function for Quick Chips
    window.quickReply = (text) => {
        userInput.value = text;
        handleSend();
    };

    function handleSend() {
        const text = userInput.value.trim();
        if(!text) return;

        addMessage(text, 'user-msg');
        userInput.value = '';

        // FAST RESPONSE: Only 600ms delay (Speed increased)
        setTimeout(() => {
            const response = generateResponse(text);
            botType(response);
        }, 600); 
    }

    function addMessage(text, className) {
        const div = document.createElement('div');
        div.classList.add('msg', className);
        div.textContent = text;
        chatBody.appendChild(div);
        chatBody.scrollTop = chatBody.scrollHeight;
    }

    // Typing Effect Function (Cool Look)
    function botType(text) {
        const div = document.createElement('div');
        div.classList.add('msg', 'bot-msg');
        chatBody.appendChild(div);
        
        let i = 0;
        const interval = setInterval(() => {
            div.textContent += text.charAt(i);
            i++;
            chatBody.scrollTop = chatBody.scrollHeight;
            if(i > text.length - 1) clearInterval(interval);
        }, 20); // Typing speed
    }

    // Sofia's Brain
    function generateResponse(input) {
        input = input.toLowerCase();
        
        if(input.includes("price") || input.includes("cost")) 
            return "Our Master Suite starts at ₹1499/mo. It includes unlimited automation and sub-agents.";
        
        if(input.includes("hello") || input.includes("hi")) 
            return "Hey there! Ready to automate your business?";
            
        if(input.includes("status")) 
            return "System Status: 🟢 All Systems Operational. 0% Latency.";

        if(input.includes("feature") || input.includes("do"))
            return "I can handle CRM updates, send WhatsApp replies, manage bookings, and even analyze your sales data instantly.";

        return "I am Sofia, the Master AI. I am analyzing that request... (Simulating detailed analysis).";
    }
});
