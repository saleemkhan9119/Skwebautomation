/* ================================================
   GOLDEN GRID + PARTICLE ANIMATION BACKGROUND
================================================ */

const gridCanvas = document.getElementById("gridCanvas");
const gctx = gridCanvas.getContext("2d");

const particleCanvas = document.getElementById("particleCanvas");
const pctx = particleCanvas.getContext("2d");

function resizeCanvas() {
    gridCanvas.width = window.innerWidth;
    gridCanvas.height = window.innerHeight;
    particleCanvas.width = window.innerWidth;
    particleCanvas.height = window.innerHeight;
}

resizeCanvas();
window.onresize = resizeCanvas;

/* ========= GRID ANIMATION ========= */
let t = 0;

function drawGrid() {
    gctx.clearRect(0, 0, gridCanvas.width, gridCanvas.height);
    gctx.strokeStyle = "rgba(255, 204, 102, 0.25)";
    gctx.lineWidth = 1;

    let gap = 40;
    t += 0.01;

    for (let x = 0; x < gridCanvas.width; x += gap) {
        gctx.beginPath();
        gctx.moveTo(x, 0);
        gctx.lineTo(x, gridCanvas.height);
        gctx.stroke();
    }

    for (let y = 0; y < gridCanvas.height; y += gap) {
        gctx.beginPath();
        gctx.moveTo(0, y + Math.sin(t + y * 0.01) * 10);
        gctx.lineTo(gridCanvas.width, y + Math.sin(t + y * 0.01) * 10);
        gctx.stroke();
    }
}

/* ========= PARTICLE ANIMATION ========= */
let particles = [];

for (let i = 0; i < 80; i++) {
    particles.push({
        x: Math.random() * particleCanvas.width,
        y: Math.random() * particleCanvas.height,
        size: Math.random() * 3 + 1,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25
    });
}

function drawParticles() {
    pctx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

    pctx.fillStyle = "#ffcc66";

    particles.forEach(p => {
        pctx.beginPath();
        pctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        pctx.fill();

        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = particleCanvas.width;
        if (p.x > particleCanvas.width) p.x = 0;
        if (p.y < 0) p.y = particleCanvas.height;
        if (p.y > particleCanvas.height) p.y = 0;
    });
}

/* ========= MAIN LOOP ========= */
function animateBG() {
    drawGrid();
    drawParticles();
    requestAnimationFrame(animateBG);
}

animateBG();
