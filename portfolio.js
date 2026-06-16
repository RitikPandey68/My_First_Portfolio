/* ===================================================
   Ritik Pandey — Portfolio JavaScript
   Premium interactions, animations, and UX effects
   =================================================== */

'use strict';

// ===== NAVBAR SCROLL EFFECT =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    updateActiveNav();
    toggleBackToTop();
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Close on outside click
document.addEventListener('click', (e) => {
    if (!navbar.contains(e.target)) {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    }
});

// ===== ACTIVE NAV LINK ON SCROLL =====
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const scrollY  = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop    = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const id            = section.getAttribute('id');
        const navLink       = document.querySelector(`.nav-link[href="#${id}"]`);

        if (navLink) {
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
                navLink.classList.add('active');
            }
        }
    });
}

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            e.preventDefault();
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
    });
});

// ===== BACK TO TOP BUTTON =====
const backToTopBtn = document.getElementById('back-to-top');
function toggleBackToTop() {
    if (window.scrollY > 400) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
}
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===== PARTICLE CANVAS =====
(function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    let particles = [];
    let animationId;

    function resize() {
        canvas.width  = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    window.addEventListener('resize', () => {
        resize();
        initParticlesArray();
    });

    resize();

    class Particle {
        constructor() { this.reset(); }
        reset() {
            this.x      = Math.random() * canvas.width;
            this.y      = Math.random() * canvas.height;
            this.radius = Math.random() * 1.8 + 0.5;
            this.alpha  = Math.random() * 0.5 + 0.1;
            this.vx     = (Math.random() - 0.5) * 0.3;
            this.vy     = (Math.random() - 0.5) * 0.3;
            // Color: mix of indigo, cyan, emerald
            const colors = ['99,102,241', '6,182,212', '16,185,129'];
            this.color   = colors[Math.floor(Math.random() * colors.length)];
        }
        update() {
            this.x += this.vx;
            this.y += this.vy;
            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                this.reset();
            }
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
            ctx.fill();
        }
    }

    function initParticlesArray() {
        const count = Math.floor((canvas.width * canvas.height) / 12000);
        particles   = Array.from({ length: Math.min(count, 120) }, () => new Particle());
    }

    function drawConnections() {
        const maxDist = 120;
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx   = particles[i].x - particles[j].x;
                const dy   = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < maxDist) {
                    const alpha = (1 - dist / maxDist) * 0.12;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(99,102,241,${alpha})`;
                    ctx.lineWidth   = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        drawConnections();
        animationId = requestAnimationFrame(animate);
    }

    initParticlesArray();
    animate();
})();

// ===== TYPED TEXT ANIMATION =====
(function initTypedText() {
    const el     = document.getElementById('typed-text');
    if (!el) return;
    const words  = [
        'Java Full Stack Developer',
        'Backend Systems Engineer',
        'REST API Architect',
        'Spring Boot Specialist',
        'Open Source Enthusiast'
    ];
    let wordIdx  = 0;
    let charIdx  = 0;
    let deleting = false;

    function type() {
        const current = words[wordIdx];
        if (deleting) {
            el.textContent = current.substring(0, charIdx--);
        } else {
            el.textContent = current.substring(0, charIdx++);
        }

        let delay = deleting ? 40 : 85;

        if (!deleting && charIdx === current.length + 1) {
            delay    = 1800;
            deleting = true;
        } else if (deleting && charIdx === 0) {
            deleting = false;
            wordIdx  = (wordIdx + 1) % words.length;
            delay    = 400;
        }

        setTimeout(type, delay);
    }

    setTimeout(type, 800);
})();

// ===== COUNTER ANIMATION =====
function animateCounter(el, target) {
    let start   = 0;
    const dur   = 1800;
    const step  = Math.ceil(target / (dur / 16));
    const timer = setInterval(() => {
        start = Math.min(start + step, target);
        el.textContent = start + '+';
        if (start >= target) {
            el.textContent = target + '+';
            clearInterval(timer);
        }
    }, 16);
}

// ===== INTERSECTION OBSERVER — scroll reveal =====
const observerOptions = {
    threshold:  0.12,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');

            // Trigger counters when stats section is visible
            if (entry.target.classList.contains('stat-item') || entry.target.closest('.hero-stats')) {
                document.querySelectorAll('.stat-number[data-target]').forEach(el => {
                    if (!el.dataset.animated) {
                        el.dataset.animated = 'true';
                        animateCounter(el, parseInt(el.dataset.target));
                    }
                });
            }

            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

// Observe hero stats specifically
const heroStats = document.querySelector('.hero-stats');
if (heroStats) observer.observe(heroStats);

// ===== PROJECT FILTER =====
const filterBtns   = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', function() {
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const filter = this.dataset.filter;

        projectCards.forEach(card => {
            const category = card.dataset.category || '';
            if (filter === 'all' || category.includes(filter)) {
                card.style.display      = 'flex';
                card.style.animation    = 'fadeIn 0.4s ease forwards';
                card.style.opacity      = '0';
                requestAnimationFrame(() => { card.style.opacity = '1'; });
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// ===== NAV LINK TRANSITION (terminal style) =====
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        // Only intercept external page navigation (not anchor links)
        const href = this.getAttribute('href');
        if (href && !href.startsWith('#')) {
            e.preventDefault();
            const sectionName = this.textContent;
            const targetUrl   = href;

            const overlay = document.createElement('div');
            overlay.className = 'code-overlay';
            overlay.innerHTML = `
                <div class="terminal-window">
                    <div class="terminal-header">
                        <div class="terminal-buttons">
                            <span class="terminal-btn red"></span>
                            <span class="terminal-btn yellow"></span>
                            <span class="terminal-btn green"></span>
                        </div>
                        <div class="terminal-title">portfolio.sh — ${sectionName}</div>
                    </div>
                    <div class="terminal-body">
                        <div class="typewriter">$ cd /ritik/${sectionName.toLowerCase().replace(/ /g, '-')}</div>
                        <div style="color:#58a6ff;margin-top:8px;font-size:0.85rem;">Loading module... please wait.</div>
                        <div class="progress-code" style="margin-top:16px;"></div>
                    </div>
                </div>
            `;
            document.body.appendChild(overlay);

            const bar   = overlay.querySelector('.progress-code');
            let   width = 0;
            const tick  = setInterval(() => {
                width += 2;
                bar.style.width = `${width}%`;
                if (width >= 100) {
                    clearInterval(tick);
                    setTimeout(() => {
                        window.location.href = targetUrl;
                        overlay.remove();
                    }, 300);
                }
            }, 25);
        }
    });
});

// ===== FOOTER LINKS SMOOTH SCROLL =====
document.querySelectorAll('.footer-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href.startsWith('#')) {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
            }
        }
    });
});

// ===== STAGGER ANIMATION FOR CARDS =====
function staggerCards(selector, delay = 80) {
    const cards = document.querySelectorAll(selector);
    cards.forEach((card, i) => {
        card.style.transitionDelay = `${i * delay}ms`;
    });
}

staggerCards('.project-card', 60);
staggerCards('.skill-category-card', 50);
staggerCards('.certificate-item', 70);

// ===== CURSOR GLOW EFFECT (desktop only) =====
if (window.innerWidth > 768) {
    const glow = document.createElement('div');
    glow.style.cssText = `
        position: fixed;
        width: 300px;
        height: 300px;
        border-radius: 50%;
        background: radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%);
        pointer-events: none;
        z-index: 0;
        transform: translate(-50%, -50%);
        transition: left 0.15s ease, top 0.15s ease;
    `;
    document.body.appendChild(glow);

    document.addEventListener('mousemove', (e) => {
        glow.style.left = e.clientX + 'px';
        glow.style.top  = e.clientY + 'px';
    });
}

// ===== CONTACT FORM FEEDBACK =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        const btn = this.querySelector('.btn-submit');
        btn.innerHTML = '<i class="fas fa-check"></i>&nbsp; Message Sent!';
        btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
        setTimeout(() => {
            btn.innerHTML = '<i class="fas fa-paper-plane"></i>&nbsp; Send Message';
            btn.style.background = '';
        }, 3000);
    });
}

// ===== SHOW / HIDE TOGGLE LOGIC =====
window.toggleSection = function(prefix, targetId, btnId, expandText, collapseText) {
    const target = document.getElementById(targetId);
    const btn = document.getElementById(btnId);
    if (!target || !btn) return;

    const isHidden = target.classList.contains('item-hidden');
    const iconClass = prefix === 'exp' ? 'fas fa-briefcase' : 'fas fa-layer-group';

    if (isHidden) {
        // Expand
        target.classList.remove('item-hidden');
        target.classList.add('item-visible');
        btn.classList.add('expanded');
        btn.innerHTML = `<i class="${iconClass}"></i> ${collapseText} <i class="fas fa-chevron-up vab-arrow"></i>`;
    } else {
        // Collapse
        target.classList.add('item-hidden');
        target.classList.remove('item-visible');
        btn.classList.remove('expanded');
        btn.innerHTML = `<i class="${iconClass}"></i> ${expandText} <span class="vab-count">+1 more</span> <i class="fas fa-chevron-down vab-arrow"></i>`;
    }
    
    // Trigger scroll reveal observer check
    if (window.scrollY > 0) {
        window.dispatchEvent(new Event('scroll'));
    }
};

window.toggleMultiple = function(type, btnId, expandText, collapseText) {
    const btn = document.getElementById(btnId);
    if (!btn) return;

    let items = [];
    let iconClass = '';
    let countNum = 0;

    if (type === 'skills-extras') {
        // Find all skill categories with item-hidden or item-visible in skills section
        items = document.querySelectorAll('#skills .skill-category-card');
        // Filter out the first 3 (which should always be visible)
        items = Array.from(items).slice(3);
        iconClass = 'fas fa-layer-group';
        countNum = items.length;
    } else if (type === 'projects-extras') {
        // Find all project cards
        items = document.querySelectorAll('#projects .project-card');
        // Filter out the first 6 (which should always be visible)
        items = Array.from(items).slice(6);
        iconClass = 'fas fa-rocket';
        countNum = items.length;
    } else if (type === 'certs-extras') {
        // Find all cert items
        items = document.querySelectorAll('#certifications .certificate-item');
        // Filter out the first 3 (which should always be visible)
        items = Array.from(items).slice(3);
        iconClass = 'fas fa-certificate';
        countNum = items.length;
    }

    if (items.length === 0) return;

    const isExpanded = btn.classList.contains('expanded');

    if (!isExpanded) {
        // Expand all target items
        items.forEach(item => {
            item.classList.remove('item-hidden');
            item.classList.add('item-visible');
        });
        btn.classList.add('expanded');
        btn.innerHTML = `<i class="${iconClass}"></i> ${collapseText} <i class="fas fa-chevron-up vab-arrow"></i>`;
    } else {
        // Collapse all target items
        items.forEach(item => {
            item.classList.add('item-hidden');
            item.classList.remove('item-visible');
        });
        btn.classList.remove('expanded');
        btn.innerHTML = `<i class="${iconClass}"></i> ${expandText} <span class="vab-count">+${countNum} more</span> <i class="fas fa-chevron-down vab-arrow"></i>`;
    }
    
    // Trigger scroll reveal observer check
    if (window.scrollY > 0) {
        window.dispatchEvent(new Event('scroll'));
    }
};

console.log('%cRitik Pandey — Portfolio 🚀', 'color:#6366f1;font-size:1.2rem;font-weight:bold;');
console.log('%cJava Full Stack Developer | Bengaluru, India', 'color:#06b6d4;font-size:0.9rem;');

