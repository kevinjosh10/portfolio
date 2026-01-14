// Enhanced floating neon stars + particle effects + drift animations
const canvas = document.getElementById('stars-canvas');
const ctx = canvas.getContext('2d');
let stars = [];
let particles = [];

// Canvas setup for full viewport coverage
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Neon floating stars class
class NeonStar {
    constructor() {
        this.reset();
    }
    
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.8; // Smooth floating motion
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
        
        // Bounce off edges smoothly
        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
        
        // Reset if too far offscreen
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
        
        // Outer glow
        ctx.beginPath();
        ctx.arc(0, 0, this.size * 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 245, 255, ${this.glow * 0.3})`;
        ctx.fill();
        
        // Main star
        ctx.beginPath();
        ctx.arc(0, 0, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0, 245, 255, ${this.glow})`;
        ctx.fill();
        
        ctx.restore();
    }
}

// Initialize stars
for (let i = 0; i < 120; i++) {
    stars.push(new NeonStar());
}

// Main animation loop for stars
function animateStars() {
    // Trail effect background
    ctx.fillStyle = 'rgba(10, 15, 30, 0.12)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    stars.forEach(star => {
        star.update();
        star.draw();
    });
    
    // Animate particles (button fade effect)
    particles = particles.filter(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.1; // Gravity effect
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
    
    requestAnimationFrame(animateStars);
}
animateStars();

// Particle fade effect for "Know About Me" button
function createParticleFade(element) {
    const rect = element.getBoundingClientRect();
    const particleCount = 60;
    
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: rect.left + Math.random() * rect.width,
            y: rect.top + Math.random() * rect.height,
            vx: (Math.random() - 0.5) * 6,
            vy: (Math.random() - 0.8) * 5, // Mostly upward
            size: Math.random() * 4 + 2,
            life: 1
        });
    }
    
    // Hide container after particle animation
    setTimeout(() => {
        document.getElementById('know-container').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('know-container').style.display = 'none';
        }, 500);
    }, 800);
}

// Main interaction logic
document.addEventListener('DOMContentLoaded', () => {
    const knowBtn = document.getElementById('know-btn');
    const sections = document.querySelectorAll('.drift-in');
    
    knowBtn.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Create dramatic particle fade
        createParticleFade(knowBtn);
        
        // Animate sections with random drift origins
        sections.forEach((section, index) => {
            // Random drift from screen edges
            const side = Math.floor(Math.random() * 4);
            let driftX = 0, driftY = 0;
            
            switch(side) {
                case 0: // Left
                    driftX = -window.innerWidth * 0.3;
                    driftY = (Math.random() - 0.5) * 200;
                    break;
                case 1: // Right
                    driftX = window.innerWidth * 0.3;
                    driftY = (Math.random() - 0.5) * 200;
                    break;
                case 2: // Top
                    driftY = -window.innerHeight * 0.4;
                    driftX = (Math.random() - 0.5) * 300;
                    break;
                case 3: // Bottom
                    driftY = window.innerHeight * 0.3;
                    driftX = (Math.random() - 0.5) * 300;
                    break;
            }
            
            section.style.setProperty('--drift-x', `${driftX}px`);
            section.style.setProperty('--drift-y', `${driftY}px`);
            
            // Staggered entrance with smooth timing
            setTimeout(() => {
                section.classList.add('show');
            }, index * 400 + 600); // Delay + stagger
        });
    });
    
    // Smooth scroll-triggered enhancements
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
    
    // Add subtle parallax to title on scroll
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const title = document.querySelector('.title-float');
        const speed = scrolled * -0.5;
        if (title) {
            title.style.transform = `translateY(${speed}px)`;
        }
    });
});

// Mouse trail effect for extra polish
let mouseX = 0, mouseY = 0;
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Create temporary sparkle particles
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

// Performance optimization
window.addEventListener('blur', () => {
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
});

window.addEventListener('focus', animateStars);
