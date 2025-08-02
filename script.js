document.addEventListener('DOMContentLoaded', () => {
  const loaderWrapper = document.getElementById('loader-wrapper');
  const body = document.body;

  // Încărcare pagină
  window.addEventListener('load', () => {
    loaderWrapper.style.opacity = '0';
    setTimeout(() => {
      loaderWrapper.style.display = 'none';
      body.classList.remove('no-scroll');
    }, 500);
  });

  // Funcționalitate pentru meniul de mobil (hamburger)
  const hamburger = document.getElementById('hamburger');
  const menu = document.getElementById('menu');

  if (hamburger && menu) {
    hamburger.addEventListener('click', () => {
      menu.classList.toggle('active');
    });

    // Ascunde meniul după ce se dă click pe un link
    menu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('active');
      });
    });
  }

  // Observers pentru animațiile la scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.hidden').forEach(el => {
    observer.observe(el);
  });

  // Comutator pentru modul întunecat
  const themeSwitch = document.getElementById('theme-switch');
  if (themeSwitch) {
    themeSwitch.addEventListener('change', () => {
      if (themeSwitch.checked) {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
      } else {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
      }
    });

    // Verifică tema salvată la încărcarea paginii
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      themeSwitch.checked = true;
      body.classList.add('dark-mode');
    }
  }
});
