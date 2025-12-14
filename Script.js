window.addEventListener("scroll", () => {
    document.querySelector("header").style.background =
        window.scrollY > 50 ? "rgba(20,20,20,0.9)" : "rgba(20,20,20,0.6)";
});
