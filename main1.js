const canvas = document.getElementById('stars-canvas');
const ctx = canvas.getContext('2d');
let stars = [];
let particles = [];
let animationId = null;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

class NeonStar {
    constructor() {
        this.reset();
    }
    
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.size = Math.random() * 3 + 1.5;
        this.glow = Math.random() * 0.6 + 0.4;
        this.rotation = 0;
        this.rotSpeed = (Math.random() - 0.5) * 0.02;
    }
    
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.rotation += this.rotSpeed;
        
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        
        if (this.x < -50 || this.x > canvas.width + 50 || 
            this.y < -50 || this.y > canvas.height + 50) {
            this.reset();
        }
    }
    
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.shadowBlur = this.size * 8;
        ctx.shadowColor = '#00f5ff';
        
        ctx.beginPath();
        ctx.arc(0, 0, this.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 245, 255, ${this.glow * 0.3})`;
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 245, 255, ${this.glow})`;
        ctx.fill();
        
        ctx.restore();
    }
}

for (let i = 0; i < 120; i++) {
    stars.push(new NeonStar());
}

function animateStars() {
    animationId = requestAnimationFrame(animateStars);
    
    ctx.fillStyle = 'rgba(10, 15, 30, 0.12)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    stars.forEach(star => {
        star.update();
        star.draw();
    });
    
    particles = particles.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.1;
        p.life -= 0.025;
        
        ctx.save();
        ctx.globalAlpha = p.life;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00f5ff';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 245, 255, ${p.life})`;
        ctx.fill();
        ctx.restore();
        
        return p.life > 0;
    });
}

function createParticleFade(element) {
    const rect = element.getBoundingClientRect();
    const particleCount = 60;
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: rect.left + Math.random() * rect.width,
            y: rect.top + Math.random() * rect.height,
            vx: (Math.random() - 0.5) * 6,
            vy: (Math.random() - 0.8) * 5,
            size: Math.random() * 4 + 2,
            life: 1
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const knowBtn = document.getElementById('know-btn');
    const contentWrapper = document.getElementById('content-wrapper');
    const sections = document.querySelectorAll('.section');
    const knowContainer = document.getElementById('know-container');

    knowBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        createParticleFade(knowBtn);
        
        knowContainer.style.opacity = '0';
        knowContainer.style.transition = 'opacity 0.5s ease-out';
        
        setTimeout(() => {
            knowContainer.style.display = 'none';
            contentWrapper.classList.add('show');
            
            sections.forEach((section, index) => {
                setTimeout(() => {
                    section.classList.add('show');
                }, 600 + (index * 200));
            });
        }, 500);
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, observerOptions);
    
    sections.forEach(section => observer.observe(section));

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const title = document.querySelector('.title-float');
        const speed = scrolled * -0.5;
        if (title) {
            title.style.transform = `translateY(${speed}px)`;
        }
    });

    let mouseX = 0, mouseY = 0;
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        if (Math.random() > 0.7) {
            particles.push({
                x: mouseX,
                y: mouseY,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                size: Math.random() * 2 + 1,
                life: 0.8
            });
        }
    });
});

window.addEventListener('blur', () => {
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
});

window.addEventListener('focus', animateStars);
animateStars();
