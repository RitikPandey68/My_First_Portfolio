// Navigation animation with terminal effect
document.querySelectorAll('.nav-link').forEach(link => {
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
