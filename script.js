document.addEventListener("DOMContentLoaded", () => {
  // Ascunde loader-ul după ce pagina s-a încărcat
  const loaderWrapper = document.getElementById("loader-wrapper");
  if (loaderWrapper) {
    loaderWrapper.style.opacity = '0';
    setTimeout(() => {
      loaderWrapper.style.display = 'none';
    }, 500);
  }

  // 1. Meniu Hamburger și Navigație Fluidă
  const hamburger = document.getElementById("hamburger");
  const menu = document.getElementById("menu");
  const sections = document.querySelectorAll("main section");
  const navLinks = document.querySelectorAll(".menu a");

  const changeSection = (targetId) => {
    sections.forEach(section => {
      section.classList.remove('visible');
      section.style.display = 'none';
      section.querySelectorAll('.hidden').forEach(el => el.classList.remove('visible'));
    });
    
    const targetSection = document.getElementById(targetId);
    if (targetSection) {
      targetSection.style.display = 'block';
      setTimeout(() => {
        targetSection.querySelectorAll('.hidden').forEach(el => el.classList.add('visible'));
      }, 50);
    }
  };

  const initialSection = 'acasa';
  changeSection(initialSection);

  navLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      changeSection(targetId);
      if (menu.classList.contains("active")) {
        menu.classList.remove("active");
      }
    });
  });

  hamburger.addEventListener("click", () => {
    menu.classList.toggle("active");
  });

  // 2. Butonul "Înapoi sus"
  const backToTop = document.getElementById("backToTop");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // 3. Tema întunecată (Dark Mode)
  const themeSwitch = document.getElementById("theme-switch");
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  function applyTheme(isDark) {
    if (isDark) {
      document.body.classList.add("dark-mode");
      themeSwitch.checked = true;
    } else {
      document.body.classList.remove("dark-mode");
      themeSwitch.checked = false;
    }
    localStorage.setItem("dark-mode", isDark);
  }

  const savedTheme = localStorage.getItem("dark-mode");
  if (savedTheme !== null) {
    applyTheme(savedTheme === "true");
  } else {
    applyTheme(prefersDark);
  }

  themeSwitch.addEventListener("change", (e) => {
    applyTheme(e.target.checked);
  });

  // 4. Validarea Formularelor
  const forms = document.querySelectorAll('form');

  forms.forEach(form => {
    form.addEventListener('submit', function (e) {
      let isFormValid = true;
      const requiredInputs = form.querySelectorAll('input[required], textarea[required]');

      requiredInputs.forEach(input => {
        if (!input.value.trim()) {
          input.classList.add('invalid');
          isFormValid = false;
        } else {
          input.classList.remove('invalid');
        }
      });
      
      const emailInput = form.querySelector('input[type="email"]');
      if (emailInput && !emailInput.value.trim().match(/^[^@]+@\w+.\w+$/)) {
        emailInput.classList.add('invalid');
        isFormValid = false;
      } else if (emailInput) {
        emailInput.classList.remove('invalid');
      }

      if (!isFormValid) {
        e.preventDefault();
      }
    });
  });
});