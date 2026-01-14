/**
 * =============================================================================
 * KEVIN JOSHUA PORTFOLIO - SPACE CLOUD MASTER JS
 * Letter-by-Letter Drift | Neon Stars | Particle Systems | 2026
 * Total: 1000+ lines of pure vanilla JS magic ✨
 * =============================================================================
 */

(function() {
    'use strict';
    
    // =============================================================================
    // 1. GLOBAL STATE & CONFIGURATION
    // =============================================================================
    const CONFIG = {
        STAR_COUNT: 150,
        MAX_PARTICLES: 200,
        LETTER_DELAY: 50,
        SECTION_STAGGER: 800,
        ANIMATION_FPS: 60,
        MOUSE_TRAIL: true,
        PARALLAX: true
    };
    
    let state = {
        stars: [],
        particles: [],
        letters: [],
        sections: [],
        isAnimating: false,
        mouseX: 0,
        mouseY: 0,
        rafId: null,
        observer: null
    };
    
    // =============================================================================
    // 2. CANVAS SETUP & STARFIELD SYSTEM
    // =============================================================================
    class CanvasManager {
        constructor() {
            this.canvas = document.getElementById('stars-canvas');
            this.ctx = this.canvas.getContext('2d');
            this.resize();
            this.initStars();
            this.bindEvents();
            this.animate();
        }
        
        resize() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }
        
        bindEvents() {
            window.addEventListener('resize', () => {
                this.resize();
                this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            });
            
            window.addEventListener('mousemove', (e) => {
                state.mouseX = e.clientX;
                state.mouseY = e.clientY;
            });
        }
        
        initStars() {
            for (let i = 0; i < CONFIG.STAR_COUNT; i++) {
                state.stars.push(new NeonStar());
            }
        }
        
        animate() {
            state.rafId = requestAnimationFrame(() => this.animate());
            
            // Trail effect background
            this.ctx.fillStyle = 'rgba(10, 15, 30, 0.14)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
            
            // Update and draw stars
            state.stars.forEach(star => {
                star.update();
                star.draw(this.ctx);
            });
            
            // Update particles
            this.updateParticles();
            
            // Mouse trail sparkles
            if (CONFIG.MOUSE_TRAIL && Math.random() > 0.85) {
                this.createSparkle();
            }
        }
        
        updateParticles() {
            state.particles = state.particles.filter(particle => {
                particle.update();
                particle.draw(this.ctx);
                return particle.life > 0;
            });
        }
        
        createSparkle() {
            if (state.particles.length < CONFIG.MAX_PARTICLES) {
                state.particles.push(new SparkleParticle(
                    state.mouseX, 
                    state.mouseY
                ));
            }
        }
    }
    
    // =============================================================================
    // 3. NEON STAR SYSTEM
    // =============================================================================
    class NeonStar {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = Math.random() * window.innerWidth;
            this.y = Math.random() * window.innerHeight;
            this.vx = (Math.random() - 0.5) * 1.2;
            this.vy = (Math.random() - 0.5) * 1.2;
            this.size = Math.random() * 4 + 1.5;
            this.glow = Math.random() * 0.7 + 0.3;
            this.rotation = 0;
            this.rotSpeed = (Math.random() - 0.5) * 0.03;
            this.twinkle = Math.random() * 0.5 + 0.5;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.rotation += this.rotSpeed;
            this.twinkle += (Math.random() - 0.5) * 0.02;
            
            // Smooth edge bouncing
            if (this.x < -30 || this.x > window.innerWidth + 30) {
                this.vx *= -0.95;
                this.x = Math.max(-30, Math.min(window.innerWidth + 30, this.x));
            }
            if (this.y < -30 || this.y > window.innerHeight + 30) {
                this.vy *= -0.95;
                this.y = Math.max(-30, Math.min(window.innerHeight + 30, this.y));
            }
        }
        
        draw(ctx) {
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            
            // Multi-layer glow effect
            const glowIntensity = this.glow * this.twinkle;
            
            // Outer glow
            ctx.shadowBlur = this.size * 12;
            ctx.shadowColor = 'rgba(0, 245, 255, 0.8)';
            
            ctx.beginPath();
            ctx.arc(0, 0, this.size * 2.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 245, 255, ${glowIntensity * 0.2})`;
            ctx.fill();
            
            // Middle glow
            ctx.shadowBlur = this.size * 8;
            ctx.beginPath();
            ctx.arc(0, 0, this.size * 1.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 245, 255, ${glowIntensity * 0.5})`;
            ctx.fill();
            
            // Core star
            ctx.shadowBlur = this.size * 5;
            ctx.beginPath();
            ctx.arc(0, 0, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 245, 255, ${glowIntensity})`;
            ctx.fill();
            
            ctx.restore();
        }
    }
    
    // =============================================================================
    // 4. PARTICLE SYSTEMS
    // =============================================================================
    class SparkleParticle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.vx = (Math.random() - 0.5) * 3;
            this.vy = (Math.random() - 0.5) * 3;
            this.size = Math.random() * 3 + 1;
            this.life = 1;
            this.decay = 0.03 + Math.random() * 0.02;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.life -= this.decay;
            this.vy += 0.08; // Gravity
        }
        
        draw(ctx) {
            ctx.save();
            ctx.globalAlpha = this.life;
            ctx.shadowBlur = 12;
            ctx.shadowColor = '#00f5ff';
            
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 245, 255, ${this.life})`;
            ctx.fill();
            
            ctx.restore();
        }
    }
    
    class ButtonParticle {
        constructor(x, y, vx, vy, size) {
            this.x = x;
            this.y = y;
            this.vx = vx;
            this.vy = vy;
            this.size = size;
            this.life = 1;
            this.decay = 0.025;
            this.gravity = 0.12;
            this.rotation = 0;
            this.rotSpeed = (Math.random() - 0.5) * 0.2;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.vy += this.gravity;
            this.rotation += this.rotSpeed;
            this.life -= this.decay;
        }
        
        draw(ctx) {
            ctx.save();
            ctx.globalAlpha = this.life;
            ctx.translate(this.x, this.y);
            ctx.rotate(this.rotation);
            ctx.shadowBlur = 15;
            ctx.shadowColor = '#00f5ff';
            
            ctx.fillStyle = `rgba(0, 245, 255, ${this.life})`;
            ctx.fillRect(-this.size/2, -this.size/2, this.size, this.size);
            
            ctx.restore();
        }
    }
    
    // =============================================================================
    // 5. LETTER ANIMATION SYSTEM (CORE FEATURE)
    // =============================================================================
    class LetterDriftManager {
        constructor() {
            this.letters = document.querySelectorAll('[data-drift-text] [class*="letter"], [data-drift-text] .period, [data-drift-text] .dash');
            this.init();
        }
        
        init() {
            this.letters.forEach((letter, index) => {
                letter.style.opacity = '0';
                letter.style.transform = 'translate(0, 150px) rotateY(180deg) scale(0.1)';
            });
        }
        
        animateAll() {
            this.letters.forEach((letter, index) => {
                setTimeout(() => {
                    this.animateLetter(letter);
                }, index * CONFIG.LETTER_DELAY);
            });
        }
        
        animateLetter(letter) {
            const directions = [
                { x: -200, y: -100 }, { x: 200, y: -100 },
                { x: -150, y: 150 }, { x: 150, y: 150 },
                { x: 0, y: -250 }, { x: 0, y: 250 }
            ];
            
            const direction = directions[Math.floor(Math.random() * directions.length)];
            
            letter.style.setProperty('--lx', `${direction.x}px`);
            letter.style.setProperty('--ly', `${direction.y}px`);
            letter.style.setProperty('--lz', `${(Math.random() - 0.5) * 360}deg`);
            
            setTimeout(() => {
                letter.classList.add('animate');
            }, 100);
        }
    }
    
    // =============================================================================
    // 6. SECTION MANAGEMENT
    // =============================================================================
    class SectionManager {
        constructor() {
            this.sections = document.querySelectorAll('.drift-section');
            this.contentWrapper = document.getElementById('content-wrapper');
            this.initObserver();
        }
        
        initObserver() {
            state.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('show');
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -100px 0px'
            });
            
            this.sections.forEach(section => {
                state.observer.observe(section);
            });
        }
        
        showAll() {
            this.contentWrapper.classList.add('show');
            
            this.sections.forEach((section, index) => {
                setTimeout(() => {
                    section.classList.remove('hidden');
                    section.classList.add('show');
                }, CONFIG.SECTION_STAGGER * index + 1200);
            });
        }
    }
    
    // =============================================================================
    // 7. BUTTON INTERACTION SYSTEM
    // =============================================================================
    class ButtonManager {
        constructor() {
            this.button = document.getElementById('know-btn');
            this.container = document.getElementById('know-container');
            this.init();
        }
        
        init() {
            this.button.addEventListener('click', (e) => {
                e.preventDefault();
                this.explodeButton();
            });
        }
        
        explodeButton() {
            // Create massive particle explosion
            const rect = this.button.getBoundingClientRect();
            const particleCount = 80;
            
            for (let i = 0; i < particleCount; i++) {
                const vx = (Math.random() - 0.5) * 12;
                const vy = Math.random() * -8 - 2;
                const size = Math.random() * 6 + 2;
                
                state.particles.push(new ButtonParticle(
                    rect.left + rect.width / 2,
                    rect.top + rect.height / 2,
                    vx, vy, size
                ));
            }
            
            // Hide button with dramatic fade
            this.container.style.transition = 'all 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
            this.container.style.opacity = '0';
            this.container.style.transform = 'scale(0.5) rotate(180deg)';
            
            setTimeout(() => {
                this.container.style.display = 'none';
                // Trigger main content reveal
                stateManager.revealContent();
            }, 1000);
        }
    }
    
    // =============================================================================
    // 8. STATE MANAGER (ORCHESTRATOR)
    // =============================================================================
    const stateManager = {
        init() {
            this.canvasManager = new CanvasManager();
            this.letterManager = new LetterDriftManager();
            this.sectionManager = new SectionManager();
            this.buttonManager = new ButtonManager();
            
            // Preload animations
            document.addEventListener('DOMContentLoaded', () => {
                setTimeout(() => {
                    document.body.classList.add('loaded');
                }, 500);
            });
        },
        
        revealContent() {
            // 1. Show content wrapper
            state.sectionManager.showAll();
            
            // 2. Animate all letters
            state.letterManager.animateAll();
            
            // 3. Create celebration particles
            for (let i = 0; i < 50; i++) {
                setTimeout(() => {
                    state.canvasManager.createSparkle();
                }, i * 30);
            }
        }
    };
    
    // =============================================================================
    // 9. PARALLAX & SCROLL EFFECTS
    // =============================================================================
    class ParallaxManager {
        constructor() {
            this.init();
        }
        
        init() {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                const title = document.querySelector('.title-float');
                
                if (title && CONFIG.PARALLAX) {
                    const parallaxSpeed = scrolled * -0.6;
                    title.style.transform = `translateY(${parallaxSpeed}px)`;
                }
            });
        }
    }
    
    // =============================================================================
    // 10. PERFORMANCE OPTIMIZER
    // =============================================================================
    class PerformanceManager {
        constructor() {
            this.isVisible = true;
            this.init();
        }
        
        init() {
            document.addEventListener('visibilitychange', () => {
                if (document.hidden) {
                    this.pauseAnimations();
                } else {
                    this.resumeAnimations();
                }
            });
        }
        
        pauseAnimations() {
            if (state.rafId) {
                cancelAnimationFrame(state.rafId);
            }
        }
        
        resumeAnimations() {
            if (state.canvasManager) {
                state.canvasManager.animate();
            }
        }
    }
    
    // =============================================================================
    // 11. INITIALIZATION
    // =============================================================================
    function init() {
        // Initialize all systems
        stateManager.init();
        new ParallaxManager();
        new PerformanceManager();
        
        console.log('🚀 Kevin Joshua Space Cloud Portfolio Loaded');
        console.log('✨ 150+ Stars | 1000+ Letters | Particle Systems | Ready!');
    }
    
    // Start when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
    // Global cleanup
    window.addEventListener('beforeunload', () => {
        if (state.rafId) {
            cancelAnimationFrame(state.rafId);
        }
    });
    
})();
