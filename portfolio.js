document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".contact-form");
    const modal = document.getElementById("thankyou-modal");
    const okBtn = document.getElementById("thankyou-ok");

    if (!form) return;

    form.addEventListener("submit", async (e) => {
        e.preventDefault(); // 🚫 FORM REDIRECT STOP

        const formData = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: "POST",
                body: formData,
                headers: { "Accept": "application/json" }
            });

            if (response.ok) {
                form.reset();
                modal.style.display = "flex";

                // ⏱ auto close after 2 sec
                setTimeout(() => {
                    modal.style.display = "none";
                }, 2000);
            }
        } catch (err) {
            console.error("Form submit error", err);
        }
    });

    okBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });
});


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

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
            link.classList.add("active");
        }
    });
});

const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-links");

hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("open");
});


const form = document.querySelector(".contact-form");
const successMsg = document.getElementById("form-success");

if (form) {
    form.addEventListener("submit", async function (e) {
        e.preventDefault();

        const formData = new FormData(form);
        const action = form.getAttribute("action");

        const response = await fetch(action, {
            method: "POST",
            body: formData,
            headers: { "Accept": "application/json" }
        });

        if (response.ok) {
            form.reset();
            successMsg.style.display = "block";
        }
    });
}


const fadeElements = document.querySelectorAll(".project-card, .skill-category, .certificate-item");

const fadeInOnScroll = () => {
    fadeElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            el.classList.add("visible");
        }
    });
};

window.addEventListener("scroll", fadeInOnScroll);
fadeInOnScroll();



const form = document.querySelector(".contact-form");
const modal = document.getElementById("thankyou-modal");
const okBtn = document.getElementById("thankyou-ok");

if (form) {
    form.addEventListener("submit", async (e) => {
        e.preventDefault(); // 🔥 redirect stop

        const formData = new FormData(form);

        const response = await fetch(form.action, {
            method: "POST",
            body: formData,
            headers: { "Accept": "application/json" }
        });

        if (response.ok) {
            form.reset();
            modal.style.display = "flex";

            // auto hide after 2 seconds
            setTimeout(() => {
                modal.style.display = "none";
            }, 2000);
        }
    });
}

// OK button close
okBtn.addEventListener("click", () => {
    modal.style.display = "none";
});


const form = document.querySelector(".contact-form");
const successMsg = document.getElementById("form-success");

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(form);
    const action = form.getAttribute("action");

    const response = await fetch(action, {
        method: "POST",
        body: formData,
        headers: { "Accept": "application/json" }
    });

    if (response.ok) {
        form.reset();
        successMsg.style.display = "block";
    }
});



