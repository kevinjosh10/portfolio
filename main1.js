// Starfield background with Canvas - continuous space motion [web:10][web:14][web:19]
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let stars = [];
let animationId;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class Star {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.z = Math.random() * 1000;
        this.size = Math.random() * 2 + 0.5;
        this.speed = Math.random() * 2 + 0.5;
    }
    update() {
        this.z -= this.speed;
        if (this.z <= 0) this.reset();
    }
    draw() {
        const sx = (this.x / this.z) * 1000 + canvas.width / 2;
        const sy = (this.y / this.z) * 1000 + canvas.height / 2;
        const size = this.size * (1000 / this.z);
        ctx.beginPath();
        ctx.arc(sx, sy, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 245, 255, ${1000 / this.z / 1000})`;
        ctx.fill();
    }
}

for (let i = 0; i < 200; i++) stars.push(new Star());

function animate() {
    ctx.fillStyle = 'rgba(0,0,0,0.1)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => { star.update(); star.draw(); });
    animationId = requestAnimationFrame(animate);
}
animate();

// "Know About Me" button reveals sections with staggered float-in [web:22]
const knowBtn = document.getElementById('know-btn');
const sections = document.querySelectorAll('.section');

knowBtn.addEventListener('click', () => {
    sections.forEach((sec, i) => {
        sec.classList.remove('hidden');
        setTimeout(() => sec.classList.add('show'), i * 200); // Staggered entrance
    });
    knowBtn.style.display = 'none';
});

// Intersection Observer for smooth scroll-triggered fade/float-ins
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, { threshold: 0.1 });

sections.forEach(sec => observer.observe(sec));
