document.addEventListener('DOMContentLoaded', () => {

    // --- LOGICA PENTRU MENIUL MOBIL (HAMBURGER) ---
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
            hamburger.classList.remove("active");
            navMenu.classList.remove("active");
        }));
    }

    // --- LOGICA PENTRU ANIMAȚII LA SCROLL ---
    const allSections = document.querySelectorAll(".section--hidden");

    const revealSection = function(entries, observer) {
        const [entry] = entries;
        if (!entry.isIntersecting) return;

        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
    };

    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null,
        threshold: 0.15,
    });

    allSections.forEach(function(section) {
        sectionObserver.observe(section);
    });
    
    // --- LOGICA PENTRU DEMONSTRAȚIA AI ---
    const generateBtn = document.getElementById('generate-btn');
    const descriptionInput = document.getElementById('component-description');
    const previewFrame = document.getElementById('preview-iframe');
    const loadingSpinner = document.getElementById('loading-spinner');

    if (generateBtn && descriptionInput && previewFrame && loadingSpinner) {
        generateBtn.addEventListener('click', () => {
            const description = descriptionInput.value;
            if (!description.trim()) {
                alert('Te rog, introdu o descriere.');
                return;
            }

            loadingSpinner.style.display = 'block';
            generateBtn.disabled = true;
            generateBtn.textContent = 'Se generează...';

            // Am inlocuit apelul Netlify cu parser-ul local
            setTimeout(() => {
                const { html, css } = generateComponentCode(description.toLowerCase());
                
                const previewDocument = previewFrame.contentWindow.document;
                previewDocument.open();
                previewDocument.write(`
                  <html>
                    <head><style>body { display: flex; justify-content: center; align-items: center; height: 100%; margin: 0; padding: 20px; box-sizing: border-box; font-family: sans-serif; } ${css}</style></head>
                    <body>${html}</body>
                  </html>
                `);
                previewDocument.close();
                
                loadingSpinner.style.display = 'none';
                generateBtn.disabled = false;
                generateBtn.textContent = 'Generează Componenta';

            }, 1500); // Simulam 1.5s delay
        });
    }

    function generateComponentCode(prompt) {
        let html = ''; let css = ''; let text = 'Buton Exemplu';
        if (prompt.includes('buton')) { html = `<button class="generated-component">${text}</button>`; css = `.generated-component { padding: 15px 30px; border: none; font-size: 16px; cursor: pointer; transition: all 0.3s ease; }`; }
        else if (prompt.includes('card')) { html = `<div class="generated-component"><h3>Titlu Card</h3><p>Acesta este un card generat.</p></div>`; css = `.generated-component { padding: 20px; border: 1px solid #ddd; border-radius: 8px; box-shadow: 0 4px 8px rgba(0,0,0,0.1); }`; }
        else { html = `<p class="generated-component">Componenta nu a putut fi generată. Încearcă "buton" sau "card".</p>`; }
        if (prompt.includes('albastru')) css += '.generated-component { background-color: #0d6efd; color: white; }';
        if (prompt.includes('roșu')) css += '.generated-component { background-color: #dc3545; color: white; }';
        if (prompt.includes('verde')) css += '.generated-component { background-color: #198754; color: white; }';
        if (prompt.includes('colțuri rotunjite')) css += '.generated-component { border-radius: 25px; }';
        if (prompt.includes('umbră')) css += '.generated-component { box-shadow: 0 10px 20px rgba(0,0,0,0.2); }';
        if (prompt.includes('hover')) { if(prompt.includes('verde la hover')) css += '.generated-component:hover { background-color: #198754; }'; else if (prompt.includes('roșu la hover')) css += '.generated-component:hover { background-color: #dc3545; }'; else css += '.generated-component:hover { filter: brightness(1.2); }'; }
        return { html, css };
    }
});