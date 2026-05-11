// Casa Del Sol interactions
const year = document.getElementById('y');
if (year) year.textContent = new Date().getFullYear();

// Mobile navigation
const navToggle = document.getElementById('navToggle');
const siteMenu = document.getElementById('siteMenu');

function closeMenu() {
  if (!navToggle || !siteMenu) return;
  siteMenu.classList.remove('is-open');
  navToggle.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Open menu');
}

function openMenu() {
  if (!navToggle || !siteMenu) return;
  siteMenu.classList.add('is-open');
  navToggle.classList.add('is-open');
  navToggle.setAttribute('aria-expanded', 'true');
  navToggle.setAttribute('aria-label', 'Close menu');
}

if (navToggle && siteMenu) {
  navToggle.addEventListener('click', (event) => {
    event.stopPropagation();
    siteMenu.classList.contains('is-open') ? closeMenu() : openMenu();
  });

  siteMenu.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('click', (event) => {
    if (!siteMenu.contains(event.target) && !navToggle.contains(event.target)) closeMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 860) closeMenu();
  });
}

// Toggle search popover
const pop = document.getElementById('searchForm');
const toggle = document.getElementById('searchToggle');
const input = document.getElementById('q');

function openSearch() {
  if (!pop || !toggle) return;
  pop.hidden = false;
  toggle.setAttribute('aria-expanded', 'true');
  setTimeout(() => input && input.focus(), 50);
}

function closeSearch() {
  if (!pop || !toggle) return;
  pop.hidden = true;
  toggle.setAttribute('aria-expanded', 'false');
}

if (pop && toggle) {
  toggle.addEventListener('click', (event) => {
    event.preventDefault();
    event.stopPropagation();
    pop.hidden ? openSearch() : closeSearch();
    closeMenu();
  });

  pop.addEventListener('click', (event) => event.stopPropagation());
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeSearch();
      closeMenu();
    }
  });
  document.addEventListener('click', (event) => {
    if (!pop.contains(event.target) && !toggle.contains(event.target)) closeSearch();
  });

  // Simple in-page search filter
  pop.addEventListener('submit', function(event) {
    event.preventDefault();
    const term = (input.value || '').toLowerCase().trim();
    const blocks = document.querySelectorAll('main section, .mcard, .feature, .menu-cat, .t-card');

    if (!term) {
      blocks.forEach((el) => { el.style.display = ''; });
      closeSearch();
      return;
    }

    blocks.forEach((el) => {
      el.style.display = el.textContent.toLowerCase().includes(term) ? '' : 'none';
    });
    closeSearch();
  });
}

// Cart count placeholder
const cartCount = document.getElementById('cartCount');
if (cartCount) cartCount.textContent = cartCount.textContent || '0';

// More Menu toggle
const moreMenuBtn = document.getElementById('moreMenuBtn');
const moreMenuPanel = document.getElementById('more-menu');

if (moreMenuBtn && moreMenuPanel) {
  moreMenuPanel.classList.remove('is-open');
  moreMenuPanel.hidden = true;
  moreMenuBtn.setAttribute('aria-expanded', 'false');

  moreMenuBtn.addEventListener('click', (event) => {
    event.preventDefault();
    const opening = moreMenuPanel.hidden;

    if (opening) {
      moreMenuPanel.hidden = false;
      moreMenuPanel.classList.add('is-open');
      moreMenuBtn.textContent = 'Show Less';
      moreMenuBtn.setAttribute('aria-expanded', 'true');
      moreMenuPanel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      moreMenuPanel.classList.remove('is-open');
      moreMenuPanel.hidden = true;
      moreMenuBtn.textContent = 'More Menu';
      moreMenuBtn.setAttribute('aria-expanded', 'false');
      document.getElementById('menu')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
}
