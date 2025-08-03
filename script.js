// Așteaptă ca întregul document să fie gata înainte de a rula orice cod
document.addEventListener('DOMContentLoaded', () => {

    // --- LOGICA PENTRU MENIUL MOBIL (HAMBURGER) ---
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });

        // Închide meniul când se dă click pe un link
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

            // Arată spinner-ul de încărcare și dezactivează butonul
            loadingSpinner.style.display = 'block';
            generateBtn.disabled = true;
            generateBtn.textContent = 'Se generează...';

            try {
                // Acesta este URL-ul funcției tale serverless pe Netlify
                const response = await fetch('/.netlify/functions/generate-code', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ description: description }),
                });

                if (!response.ok) {
                    throw new Error(`Eroare de la server: ${response.statusText}`);
                }

                const data = await response.json();
                const { html, css } = data;

                // Injectează codul în iframe pentru previzualizare
                const previewDocument = previewFrame.contentWindow.document;
                previewDocument.open();
                previewDocument.write(`
                  <html>
                    <head>
                        <style>
                            /* Stiluri pentru a centra conținutul în iframe */
                            body { 
                                display: flex; 
                                justify-content: center; 
                                align-items: center; 
                                height: 100%; 
                                margin: 0; 
                                padding: 20px; 
                                box-sizing: border-box; 
                                font-family: sans-serif;
                            }
                            ${css}
                        </style>
                    </head>
                    <body>
                        ${html}
                    </body>
                  </html>
                `);
                previewDocument.close();

            } catch (error) {
                console.error('A apărut o eroare:', error);
                alert('Ne pare rău, a apărut o eroare la generarea componentei. Verifică consola pentru detalii.');
            } finally {
                // Ascunde spinner-ul și reactivează butonul
                loadingSpinner.style.display = 'none';
                generateBtn.disabled = false;
                generateBtn.textContent = 'Generează Componenta';
            }
        });
    }
});