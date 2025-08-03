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

    // --- LOGICA PENTRU DEMONSTRAȚIA AI ---
    const generateBtn = document.getElementById('generate-btn');
    const descriptionInput = document.getElementById('component-description');
    const previewFrame = document.getElementById('preview-iframe');
    const loadingSpinner = document.getElementById('loading-spinner');

    if (generateBtn && descriptionInput && previewFrame && loadingSpinner) {
        generateBtn.addEventListener('click', async () => {
            const description = descriptionInput.value;
            if (!description.trim()) {
                alert('Te rog, introdu o descriere.');
                return;
            }

            loadingSpinner.style.display = 'block';
            generateBtn.disabled = true;
            generateBtn.textContent = 'Se generează...';

            try {
                const response = await fetch('/.netlify/functions/generate-code', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ description: description }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.error || `Eroare de la server: ${response.statusText}`);
                }
                
                let responseText = await response.text();
                const firstBracket = responseText.indexOf('{');
                const lastBracket = responseText.lastIndexOf('}');
                if (firstBracket !== -1 && lastBracket !== -1) {
                    responseText = responseText.substring(firstBracket, lastBracket + 1);
                }

                const data = JSON.parse(responseText);
                const { html, css } = data;

                if (!html || !css) {
                    throw new Error("Răspunsul de la AI este invalid sau incomplet.");
                }

                const previewDocument = previewFrame.contentWindow.document;
                previewDocument.open();
                previewDocument.write(`
                  <html>
                    <head>
                        <style>
                            body { 
                                display: flex; justify-content: center; align-items: center; 
                                height: 100%; margin: 0; padding: 20px; 
                                box-sizing: border-box; font-family: sans-serif;
                            }
                            ${css}
                        </style>
                    </head>
                    <body>${html}</body>
                  </html>
                `);
                previewDocument.close();

            } catch (error) {
                console.error('A apărut o eroare:', error);
                alert(`Ne pare rău, a apărut o eroare la generarea componentei. Detalii: ${error.message}`);
            } finally {
                loadingSpinner.style.display = 'none';
                generateBtn.disabled = false;
                generateBtn.textContent = 'Generează Componenta';
            }
        });
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

});