const navToggle = document.querySelector('.nav__toggle');
const navMenu = document.querySelector('#nav-menu');
const form = document.querySelector('#contact-form');
const feedback = document.querySelector('#form-feedback');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

if (form && feedback) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const subject = String(data.get('subject') || '').trim();
    const message = String(data.get('message') || '').trim();

    if (!name || !email || !message) {
      feedback.textContent = 'Pense a remplir tous les champs avant d\'envoyer.';
      return;
    }

    const subjectLine = subject ? `Contact portfolio: ${subject}` : `Contact portfolio de ${name}`;
    const mailto = `mailto:damiendwn@gmail.com?subject=${encodeURIComponent(subjectLine)}&body=${encodeURIComponent(`${message}\n\nNom: ${name}\nEmail: ${email}`)}`;

    feedback.textContent = 'Parfait, ton appli mail va s\'ouvrir.';
    window.location.href = mailto;
    form.reset();
  });
}
