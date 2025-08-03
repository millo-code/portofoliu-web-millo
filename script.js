document.addEventListener('DOMContentLoaded', () => {

    // --- LOGICA PENTRU MENIUL MOBIL (HAMBURGER) ---
    // ... codul existent ...

    // --- LOGICA PENTRU DEMONSTRAȚIA AI ---
    // ... codul existent ...

    // --- LOGICA PENTRU ANIMAȚII LA SCROLL ---
    // ... codul existent ...

    // --- LOGICA NOUĂ PENTRU PREVIZUALIZARE FULLSCREEN ---
    const previewArea = document.querySelector('.preview-area');
    const expandBtn = document.getElementById('expand-btn');
    const closeBtn = document.getElementById('close-btn');

    if (previewArea && expandBtn && closeBtn) {
        // Când se dă click pe butonul de mărire
        expandBtn.addEventListener('click', () => {
            previewArea.classList.add('is-fullscreen');
        });

        // Când se dă click pe butonul de închidere
        closeBtn.addEventListener('click', () => {
            previewArea.classList.remove('is-fullscreen');
        });
    }
});