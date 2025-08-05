document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. LOGICA PENTRU MENIUL MOBIL (HAMBURGER) ---
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    const navLinks = document.querySelectorAll(".nav-link");

    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    });
    navLinks.forEach(link => link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }));

    // --- 2. ANIMAȚII LA DERULARE (SCROLL) ---
    const hiddenSections = document.querySelectorAll('.section--hidden');
    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { root: null, threshold: 0.15 });
    hiddenSections.forEach(section => sectionObserver.observe(section));

    // --- 3. LOGICA PENTRU DEMONSTRAȚIA AI ---
    const generateBtn = document.getElementById('generate-btn');
    const descriptionTextarea = document.getElementById('component-description');
    const previewIframe = document.getElementById('preview-iframe');
    const loadingSpinner = document.getElementById('loading-spinner');

    if (generateBtn) {
        generateBtn.addEventListener('click', () => {
            const prompt = descriptionTextarea.value.toLowerCase();
            if (prompt.trim() === "") { alert("Te rog, introdu o descriere."); return; }
            loadingSpinner.style.display = 'block';
            generateBtn.disabled = true;
            setTimeout(() => {
                const generatedCode = generateComponentCode(prompt);
                previewIframe.srcdoc = generatedCode;
                loadingSpinner.style.display = 'none';
                generateBtn.disabled = false;
            }, 1500);
        });
    }
    function generateComponentCode(prompt) {
        let html = ''; let css = ''; let text = 'Buton Exemplu';
        if (prompt.includes('buton')) { html = `<button class="generated-component">${text}</button>`; css = `.generated-component { padding: 15px 30px; border: none; font-size: 16px; cursor: pointer; transition: all 0.3s ease; }`; } else if (prompt.includes('card')) { html = `<div class="generated-component"><h3>Titlu Card</h3><p>Acesta este un card generat.</p></div>`; css = `.generated-component { padding: 20px; border: 1px solid #ddd; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); }`; } else { html = `<p class="generated-component">Componenta nu a putut fi generată. Încearcă "buton" sau "card".</p>`; }
        if (prompt.includes('albastru')) css += '.generated-component { background-color: #0d6efd; color: white; }'; if (prompt.includes('roșu')) css += '.generated-component { background-color: #dc3545; color: white; }'; if (prompt.includes('verde')) css += '.generated-component { background-color: #198754; color: white; }'; if (prompt.includes('colțuri rotunjite')) css += '.generated-component { border-radius: 25px; }'; if (prompt.includes('umbră')) css += '.generated-component { box-shadow: 0 10px 20px rgba(0,0,0,0.2); }'; if (prompt.includes('hover')) { if(prompt.includes('verde la hover')) css += '.generated-component:hover { background-color: #198754; }'; else if (prompt.includes('roșu la hover')) css += '.generated-component:hover { background-color: #dc3545; }'; else css += '.generated-component:hover { filter: brightness(1.2); }'; }
        return `<!DOCTYPE html><html><head><style>body { display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; font-family: sans-serif; } ${css}</style></head><body>${html}</body></html>`;
    }

    // --- 4. LOGICA PENTRU LOGO-UL ANIMAT MATRIX ---
    const canvas = document.getElementById('matrix-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
        const matrixChars = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッンABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        const fontSize = 10;
        const columns = canvas.width / fontSize;
        const drops = [];
        for (let x = 0; x < columns; x++) { drops[x] = 1; }
        function drawMatrix() {
            ctx.fillStyle = 'rgba(85, 107, 47, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = '#9ACD32';
            ctx.font = fontSize + 'px arial';
            for (let i = 0; i < drops.length; i++) {
                const text = matrixChars.charAt(Math.floor(Math.random() * matrixChars.length));
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) { drops[i] = 0; }
                drops[i]++;
            }
        }
        setInterval(drawMatrix, 33);
    }
});
