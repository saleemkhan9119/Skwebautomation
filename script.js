// HEADER SCROLL EFFECT
window.addEventListener("scroll", () => {
    const header = document.querySelector(".header");
    if (window.scrollY > 50) {
        header.style.background = "rgba(0,0,0,0.9)";
    } else {
        header.style.background = "rgba(0,0,0,0.6)";
    }
});

// SECTION FADE-IN ANIMATION
const sections = document.querySelectorAll("section");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0px)";
        }
    });
}, { threshold: 0.2 });

sections.forEach(section => {
    section.style.opacity = 0;
    section.style.transform = "translateY(40px)";
    section.style.transition = "0.8s ease-out";
    observer.observe(section);
});

// GOLD GLOW BACKGROUND EFFECT
setInterval(() => {
    document.body.style.background = 
    `radial-gradient(circle at ${Math.random()*100}% ${Math.random()*100}%, 
    rgba(255,215,0,0.15), 
    transparent 60%)`;
}, 1500);
