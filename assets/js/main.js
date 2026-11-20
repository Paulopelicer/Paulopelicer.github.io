const menu = document.getElementById('menu');
const links = document.getElementById('links');
const mobile = window.matchMedia('(max-width: 51.999rem)');

function setMenuOpen(open) {
  menu.setAttribute('aria-expanded', String(open));
  links.hidden = mobile.matches && !open;
}

function syncNavigation() {
  const active = document.activeElement;
  menu.hidden = !mobile.matches;

  if (mobile.matches && links.contains(active)) {
    menu.focus();
  }

  setMenuOpen(false);

  if (!mobile.matches && active === menu) {
    links.querySelector('a').focus();
  }
}

if (menu && links) {
  const nav = menu.closest('nav');
  nav.classList.add('menu-ready');
  syncNavigation();

  mobile.addEventListener('change', syncNavigation);

  menu.addEventListener('click', () => {
    setMenuOpen(menu.getAttribute('aria-expanded') === 'false');
  });

  links.addEventListener('click', (event) => {
    const link = event.target.closest('a');
    if (mobile.matches && link && !event.ctrlKey && !event.metaKey && !event.shiftKey && !event.altKey) {
      const section = document.getElementById(link.hash.slice(1));
      section?.focus({ preventScroll: true });
      setMenuOpen(false);
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && menu.getAttribute('aria-expanded') === 'true') {
      menu.focus();
      setMenuOpen(false);
    }
  });

  document.addEventListener('click', (event) => {
    if (!nav.contains(event.target) && menu.getAttribute('aria-expanded') === 'true') {
      if (links.contains(document.activeElement)) menu.focus();
      setMenuOpen(false);
    }
  });
}

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();
