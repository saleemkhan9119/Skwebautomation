// --------- Smooth Scrolling ----------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute("href")).scrollIntoView({
            behavior: "smooth"
        });
    });
});

// --------- Navbar Shadow on Scroll ----------
window.addEventListener("scroll", function () {
    const header = document.querySelector(".header");
    if (window.scrollY > 20) {
        header.style.boxShadow = "0 3px 8px rgba(0,0,0,0.1)";
    } else {
        header.style.boxShadow = "none";
    }
});

// --------- Fade-in Effect (Auto Animation) ----------
const elements = document.querySelectorAll("section");

const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = 1;
            entry.target.style.transform = "translateY(0px)";
        }
    });
}, { threshold: 0.2 });

elements.forEach(el => {
    el.style.opacity = 0;
    el.style.transform = "translateY(30px)";
    el.style.transition = "0.7s ease";
    observer.observe(el);
});
