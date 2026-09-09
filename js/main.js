/* ==========================================================================
   Parv Shah — Portfolio scripts
   Stack : vanilla JS (no dependencies)
   ========================================================================== */
'use strict';

/* Theme preference + apply */
const THEME_KEY = 'parv-theme';
const root = document.documentElement;

function applyTheme(theme) {
  root.setAttribute('data-theme', theme);
  localStorage.setItem(THEME_KEY, theme);
}

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved) { applyTheme(saved); return; }
  const lightOK =
    typeof window.matchMedia === 'function' &&
    window.matchMedia('(prefers-color-scheme: light)').matches;
  applyTheme(lightOK ? 'light' : 'dark');
}

/* Vertical scroll offset (cross-browser) */
function scrollY() {
  return window.pageYOffset
    || document.documentElement.scrollTop
    || document.body.scrollTop
    || 0;
}

/* Fire once body + head are ready */
initTheme();

document.addEventListener('DOMContentLoaded', () => {
  /* Elements */
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');
  const themeToggle = document.getElementById('themeToggle');
  const backToTop = document.getElementById('backToTop');
  const yearSpan = document.getElementById('year');

  /* ---- Year ---- */
  if (yearSpan) yearSpan.textContent = new Date().getFullYear();

  /* ---- Theme toggle ---- */
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      applyTheme(next);
    });
  }

  /* ---- Navbar scrolled state ---- */
  const onScroll = () => {
    const y = scrollY();
    if (navbar) navbar.classList.toggle('scrolled', y > 20);
    if (backToTop) backToTop.classList.toggle('show', y > 600);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Back to top ---- */
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* ---- Mobile menu ---- */
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const open = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open', open);
      hamburger.setAttribute('aria-expanded', String(open));
    });
    navLinks.querySelectorAll('.nav-link').forEach((l) => {
      l.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- Scroll-spy: highlight active section ---- */
  const sections = Array.from(document.querySelectorAll('section[id]'));
  const navAnchors = Array.from(navLinks ? navLinks.querySelectorAll('.nav-link') : []);

  const onSpy = () => {
    const pos = scrollY() + 120;
    let current = sections[0]?.id;
    sections.forEach((sec) => {
      if (sec.offsetTop <= pos) current = sec.id;
    });
    navAnchors.forEach((a) => {
      a.classList.toggle('active', a.getAttribute('href') === '#' + current);
    });
  };
  window.addEventListener('scroll', onSpy, { passive: true });
  onSpy();

  /* ---- Hero typewriter ---- */
  initTypewriter();

  /* ---- Skill tabs ---- */
  initSkillTabs();

  /* ---- Project filter ---- */
  initProjectFilter();

  /* ---- Skill bars + reveal animation ---- */
  initReveal();

  /* ---- Contact form ---- */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('cf-name').value.trim();
      const email = document.getElementById('cf-email').value.trim();
      const msg = document.getElementById('cf-msg').value.trim();
      const note = document.getElementById('formNote');
      if (!name || !email || !msg) return;
      const subject = encodeURIComponent('Portfolio contact from ' + name);
      const body = encodeURIComponent(msg + '\n\n— ' + name + ' (' + email + ')');
      window.location.href = 'mailto:2003parv@gmail.com?subject=' + subject + '&body=' + body;
      if (note) note.textContent = 'Opening your email client…';
    });
  }
});
/* =================== HERO TYPEWRITER =================== */
function initTypewriter() {
  const el = document.getElementById('typedText');
  if (!el) return;
  const phrases = [
    'scalable backends',
    'intelligent AI systems',
    'RAG pipelines',
    'data dashboards',
    'microservices',
    'real-time apps'
  ];
  let phraseIdx = 0, charIdx = 0, deleting = false;

  (function type() {
    const phrase = phrases[phraseIdx];
    el.textContent = phrase.substring(0, charIdx);

    if (!deleting) {
      if (charIdx < phrase.length) {
        charIdx++;
        setTimeout(type, 60);
      } else {
        deleting = true;
        setTimeout(type, 1600);
      }
    } else {
      if (charIdx > 0) {
        charIdx--;
        setTimeout(type, 28);
      } else {
        deleting = false;
        phraseIdx = (phraseIdx + 1) % phrases.length;
        setTimeout(type, 300);
      }
    }
  })();
}

/* =================== SKILL TABS =================== */
function initSkillTabs() {
  const tabs = Array.from(document.querySelectorAll('.skill-tab'));
  const panels = Array.from(document.querySelectorAll('.skill-panel'));
  if (!tabs.length) return;

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      tabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');
      panels.forEach((p) => {
        const show = p.getAttribute('data-panel') === tab.getAttribute('data-tab');
        p.classList.toggle('active', show);
      });
    });
  });
}

/* =================== PROJECT FILTER =================== */
function initProjectFilter() {
  const filters = Array.from(document.querySelectorAll('.filter'));
  const cards = Array.from(document.querySelectorAll('.project-card'));
  if (!filters.length) return;

  filters.forEach((f) => {
    f.addEventListener('click', () => {
      filters.forEach((x) => x.classList.remove('active'));
      f.classList.add('active');
      const value = f.getAttribute('data-filter');
      cards.forEach((card) => {
        const cats = (card.getAttribute('data-category') || '').split(/\s+/);
        const show = value === 'all' || cats.includes(value);
        card.classList.toggle('hidden', !show);
      });
    });
  });
}

/* =================== REVEAL + SKILL BARS =================== */
function initReveal() {
  /* Toggle .reveal on significant blocks for a staged entrance */
  const blocks = Array.from(document.querySelectorAll('.section-head, .project-card, .edu-card, .ach-col, .timeline-content, .about-card, .about-text, .gallery-item'));
  blocks.forEach((b) => b.classList.add('reveal'));

  const applyBars = () => {
    document.querySelectorAll('.bar span').forEach((s) => {
      s.style.width = s.getAttribute('data-level') + '%';
    });
    const rows = document.querySelectorAll('.bar-row');
    rows.forEach((r) => {
      let valueEl = r.querySelector('.bar-value');
      const levelEl = r.querySelector('.bar span');
      if (!valueEl && levelEl) {
        valueEl = document.createElement('span');
        valueEl.className = 'bar-value';
        valueEl.textContent = levelEl.getAttribute('data-level') + '%';
        r.appendChild(valueEl);
      }
    });
  };

  let barsDone = false;
  const hasObserver = 'IntersectionObserver' in window;
  if (hasObserver) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    blocks.forEach((b) => io.observe(b));

    /* Skill bars fire once when the skill section becomes visible */
    const skillsSec = document.getElementById('skills');
    if (skillsSec) {
      const barObs = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !barsDone) {
            barsDone = true;
            applyBars();
            barObs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });
      barObs.observe(skillsSec);
    }
  } else {
    /* Fallback */
    blocks.forEach((b) => b.classList.add('visible'));
    applyBars();
  }
}