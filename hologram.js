/* ====================================================
   HOLOGRAM FACE ENGINE (V4)
   Creates 3D-like hologram effect using Canvas + Glow
   ==================================================== */

const holoCanvas = document.getElementById("holoFace");
const ctx = holoCanvas.getContext("2d");

holoCanvas.width = 350;
holoCanvas.height = 350;

let angle = 0;

// ======= HOLOGRAM FACE LINES (SIMULATED 3D HEAD OUTLINE) =======
function drawHologramFace() {
    ctx.clearRect(0, 0, holoCanvas.width, holoCanvas.height);

    ctx.save();

    // Center the head
    ctx.translate(175, 175);

    // Slight rotation
    ctx.rotate(Math.sin(angle) * 0.1);

    // Hologram glow
    ctx.shadowBlur = 25;
    ctx.shadowColor = "#00eaff";

    // NEON FACE OUTLINE
    ctx.strokeStyle = "#00cfff";
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.ellipse(0, 0, 90, 120, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Eyes
    ctx.beginPath();
    ctx.ellipse(-30, -20, 12, 6, 0, 0, Math.PI * 2);
    ctx.stroke();

    ctx.beginPath();
    ctx.ellipse(30, -20, 12, 6, 0, 0, Math.PI * 2);
    ctx.stroke();

    // Mouth
    ctx.beginPath();
    ctx.moveTo(-25, 40);
    ctx.quadraticCurveTo(0, 55, 25, 40);
    ctx.stroke();

    // Vertical scan line
    ctx.strokeStyle = "rgba(0,255,255,0.3)";
    ctx.beginPath();
    ctx.moveTo(Math.sin(angle * 2) * 80, -150);
    ctx.lineTo(Math.sin(angle * 2) * 80, 150);
    ctx.stroke();

    ctx.restore();

    angle += 0.03;
}

// ======== ANIMATION LOOP ===========
function animateHologram() {
    drawHologramFace();
    requestAnimationFrame(animateHologram);
}

animateHologram();
