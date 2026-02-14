

// Navigation animation with terminal effect
/*document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const sectionName = this.textContent;
        const targetUrl = this.href;
        
        // Create terminal overlay
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
                    <div class="terminal-title">${sectionName}</div>
                </div>
                <div class="terminal-body">
                    <div class="typewriter">$ loading: ${sectionName}</div>
                    <div class="progress-code"></div>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);
*/
        // Animate progress bar
       /* const progress = overlay.querySelector('.progress-code');
        let width = 0;
        const interval = setInterval(() => {
            width += 2;
            progress.style.width = `${width}%`;
            
            if(width >= 100) {
                clearInterval(interval);
                setTimeout(() => {
                    window.open(targetUrl, '_blank');
                    overlay.remove();
                }, 0);
            }
        }, 0);
    });
});
*/
// Other existing animations (typewriter, hover effects, etc.) remain unchanged
// ... [rest of your existing animation code]
// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute("href"));
        if (target) target.scrollIntoView({ behavior: "smooth" });
    });
});

// Active nav highlight
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        if (scrollY >= section.offsetTop - 120) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle(
            "active",
            link.getAttribute("href") === `#${current}`
        );
    });
});

// Mobile menu
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-links");
hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("open");
});

// Fade-in animation
const fadeElements = document.querySelectorAll(
    ".project-card, .skill-category, .certificate-item"
);

const fadeInOnScroll = () => {
    fadeElements.forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 100) {
            el.classList.add("visible");
        }
    });
};
window.addEventListener("scroll", fadeInOnScroll);
fadeInOnScroll();

// ✅ FORM SUBMIT (ONLY ONE)
const form = document.querySelector(".contact-form");
const modal = document.getElementById("thankyou-modal");
const okBtn = document.getElementById("thankyou-ok");

if (form) {
    form.addEventListener("submit", async e => {
        e.preventDefault(); // 🚫 redirect STOP

        const formData = new FormData(form);

        try {
            const res = await fetch(form.action, {
                method: "POST",
                body: formData,
                headers: { "Accept": "application/json" }
            });

            if (res.ok) {
                form.reset();
                modal.style.display = "flex";

                setTimeout(() => {
                    modal.style.display = "none";
                }, 2000);
            }
        } catch (err) {
            console.error("Form error:", err);
        }
    });
}

okBtn.addEventListener("click", () => {
    modal.style.display = "none";
});



