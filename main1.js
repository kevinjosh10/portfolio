/* ⭐ GLOWING STARS */
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const stars = Array.from({ length: 160 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  r: Math.random() * 1.5 + 0.5,
  o: Math.random()
}));

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  stars.forEach(s => {
    ctx.beginPath();
    ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(180,220,255,${s.o})`;
    ctx.shadowBlur = 12;
    ctx.shadowColor = "#7dd3fc";
    ctx.fill();
  });
  requestAnimationFrame(drawStars);
}
drawStars();

/* ZOOM INTO B */
document.getElementById("knowBtn").addEventListener("click", () => {
  const b = document.getElementById("zoomB");
  b.animate(
    [
      { transform: "scale(1)" },
      { transform: "scale(6)" },
      { transform: "scale(1)" }
    ],
    { duration: 1400, easing: "ease-in-out" }
  );

  setTimeout(() => {
    document.querySelectorAll(".section").forEach(sec =>
      sec.classList.add("show")
    );
  }, 600);
});

/* RESIZE */
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
