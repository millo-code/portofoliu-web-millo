// Așteaptă ca întregul document să fie gata
document.addEventListener('DOMContentLoaded', function() {

    // Initializarea iconițelor Lucide
    // Asigură-te că `lucide` este disponibil global (din CDN)
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // --- SCRIPT PENTRU MENIUL MOBIL ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        
        // Închide meniul mobil la click pe un link din interior
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
            });
        });
    }


    // --- SETAREA ANULUI CURENT ÎN FOOTER ---
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }


    // --- SCRIPT PENTRU ANIMAȚII (ScrollReveal) ---
    // Asigură-te că `ScrollReveal` este disponibil global (din CDN)
    if (typeof ScrollReveal !== 'undefined') {
        const sr = ScrollReveal({
            origin: 'bottom',
            distance: '60px',
            duration: 1000,
            delay: 200,
            reset: false, // Animațiile se execută o singură dată
        });

        // Aplicarea animațiilor pe elemente
        sr.reveal('.reveal');
    }


    // --- SCRIPT PENTRU FORMULARUL DE CONTACT ---
    const contactForm = document.getElementById('contact-form');
    const successMessage = document.getElementById('success-message');

    if (contactForm && successMessage) {
        contactForm.addEventListener('submit', function(event) {
            // Prevenim trimiterea reală a formularului
            event.preventDefault();
            
            // IMPORTANT: Aici se adaugă logica de trimitere a e-mailului
            // folosind un serviciu precum Netlify Forms, Formspree, sau un backend propriu.
            // Pentru demonstrație, vom afișa doar mesajul de succes.

            // Ascundem formularul și afișăm mesajul de succes
            contactForm.classList.add('hidden');
            successMessage.classList.remove('hidden');

            // Optional: Resetează formularul după un timp
            setTimeout(() => {
                contactForm.reset();
                contactForm.classList.remove('hidden');
                successMessage.classList.add('hidden');
            }, 6000); // Mesajul dispare și formularul reapare după 6 secunde
        });
    }

});
