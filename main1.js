/* STAR FIELD */
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.addEventListener("resize", resize);

const stars = Array.from({ length: 220 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 1.8,
  vx: Math.random() * 0.3,
  vy: Math.random() * 0.3
}));

function animateStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(s => {
    s.x += s.vx;
    s.y += s.vy;
    if (s.x > canvas.width) s.x = 0;
    if (s.y > canvas.height) s.y = 0;

    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(180,220,255,0.9)";
    ctx.shadowBlur = 12;
    ctx.shadowColor = "#9ae6ff";
    ctx.fill();
  });
  requestAnimationFrame(animateStars);
}
animateStars();

/* REVEAL CONTENT */
document.getElementById("knowBtn").addEventListener("click", () => {
  document.querySelectorAll(".section").forEach(sec =>
    sec.classList.add("show")
  );
});
