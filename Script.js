// ---------- SMOOTH SCROLL ----------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});

// ---------- NAVBAR SHADOW ON SCROLL ----------
window.addEventListener("scroll", () => {
    const header = document.querySelector("header");
    if (window.scrollY > 50) {
        header.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
    } else {
        header.style.boxShadow = "none";
    }
});

// ---------- FADE-IN ANIMATIONS ----------
const elements = document.querySelectorAll(".fade");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("fade-visible");
        }
    });
});

elements.forEach(el => observer.observe(el));
