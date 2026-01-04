// 3D Tilt Effect Initialization
document.addEventListener('DOMContentLoaded', () => {
    // VanillaTilt लाइब्रेरी का इस्तेमाल कार्ड्स को 3D बनाने के लिए
    if (typeof VanillaTilt !== 'undefined') {
        VanillaTilt.init(document.querySelectorAll(".glass-card"), {
            max: 15,        // कार्ड कितना झुकेगा
            speed: 400,     // झुकाव की गति
            glare: true,    // कांच जैसी चमक
            "max-glare": 0.2,
        });
    }
});

// Function to open AI Chat
function openAIChat() {
    const chatButton = document.querySelector('.n8n-chat-widget-toggle-button');
    if (chatButton) {
        chatButton.click();
    } else {
        alert("Sofia System is initializing. Please wait...");
    }
}

// Scroll Reveal Animation (Simple logic)
window.addEventListener('scroll', () => {
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }
    });
});
