/* IM Wealth Select® — main.js V6 */
(function () {
  'use strict';

  /* ── Scroll nav shadow ────────────────────────── */
  const nav = document.querySelector('.nav');
  if (nav) {
    const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Hamburger / overlay mobile ───────────────── */
  const hamburger = document.querySelector('.nav__hamburger');
  const overlay   = document.querySelector('.nav__overlay');
  const overlayClose = document.querySelector('.overlay-close');

  const openOverlay = () => {
    hamburger && hamburger.classList.add('is-open');
    overlay && overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  };
  const closeOverlay = () => {
    hamburger && hamburger.classList.remove('is-open');
    overlay && overlay.classList.remove('is-open');
    document.body.style.overflow = '';
  };

  hamburger   && hamburger.addEventListener('click', () =>
    overlay && overlay.classList.contains('is-open') ? closeOverlay() : openOverlay()
  );
  overlayClose && overlayClose.addEventListener('click', closeOverlay);

  overlay && overlay.querySelectorAll('.nav__link').forEach(l =>
    l.addEventListener('click', closeOverlay)
  );

  /* ── Language dropdown — desktop ──────────────── */
  const langWidget = document.querySelector('.nav__lang');
  const langBtn    = langWidget && langWidget.querySelector('.nav__lang-btn');
  const langLabel  = langWidget && langWidget.querySelector('.nav__lang-label');
  const langOptions = langWidget ? langWidget.querySelectorAll('.nav__lang-option') : [];

  if (langWidget && langBtn) {
    langBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      langWidget.classList.toggle('is-open');
    });

    langOptions.forEach(opt => {
      opt.addEventListener('click', () => {
        langOptions.forEach(o => o.classList.remove('is-active'));
        opt.classList.add('is-active');
        if (langLabel) langLabel.textContent = opt.dataset.lang || opt.textContent.trim().split(' ')[0];
        langWidget.classList.remove('is-open');
      });
    });

    document.addEventListener('click', (e) => {
      if (!langWidget.contains(e.target)) langWidget.classList.remove('is-open');
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') langWidget.classList.remove('is-open');
    });
  }

  /* ── Language selector — mobile overlay ───────── */
  document.querySelectorAll('.overlay__lang-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.overlay__lang-item').forEach(i => i.classList.remove('is-active'));
      item.classList.add('is-active');
      if (langLabel) langLabel.textContent = item.dataset.lang || item.textContent.trim();
      langOptions.forEach(o => {
        o.classList.toggle('is-active', o.dataset.lang === item.dataset.lang);
      });
    });
  });

  /* ── IntersectionObserver — scroll reveal ─────── */
  const ioOptions = { threshold: 0.12 };

  const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        fadeObserver.unobserve(entry.target);
      }
    });
  }, ioOptions);

  document.querySelectorAll('.fade-up').forEach(el => fadeObserver.observe(el));

  const staggerObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stagger-item').forEach(item => {
          staggerObserver.observe(item);
        });
        staggerObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08 });

  const staggerItemObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        staggerItemObserver.unobserve(entry.target);
      }
    });
  }, ioOptions);

  document.querySelectorAll('.stagger-grid').forEach(grid => {
    grid.querySelectorAll('.stagger-item').forEach(item => staggerItemObserver.observe(item));
  });

  /* ── Spotlight cards ──────────────────────────── */
  document.querySelectorAll('.has-spotlight').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', ((e.clientX - r.left) / r.width  * 100) + '%');
      card.style.setProperty('--my', ((e.clientY - r.top)  / r.height * 100) + '%');
    });
  });

  /* ── Cookie banner ────────────────────────────── */
  const cookie = document.getElementById('cookie-banner');
  const cookieBtn = document.getElementById('cookie-accept');
  if (cookie && cookieBtn) {
    cookieBtn.addEventListener('click', () => {
      cookie.style.display = 'none';
      try { localStorage.setItem('cookie-ok', '1'); } catch (_) {}
    });
    try {
      if (localStorage.getItem('cookie-ok')) cookie.style.display = 'none';
    } catch (_) {}
  }

  /* ── Stat counter count-up ───────────────────── */
  const statValues = document.querySelectorAll('.stat-bar__value');
  if (statValues.length) {
    const countObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        countObserver.unobserve(entry.target);

        const el     = entry.target;
        const suffix = el.querySelector('em');
        const suffixText = suffix ? suffix.textContent : '';
        const raw    = el.textContent.replace(/[^0-9]/g, '');
        const target = parseInt(raw, 10);
        if (!target) return;

        const duration = 1200;
        const start = performance.now();
        const tick  = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const ease     = 1 - Math.pow(1 - progress, 3);
          const current  = Math.round(ease * target);
          el.textContent = current.toLocaleString('en-US');
          if (suffixText) {
            const em = document.createElement('em');
            em.textContent = suffixText;
            el.appendChild(em);
          }
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.5 });

    statValues.forEach(el => countObserver.observe(el));
  }

  /* ── Anchor nav active link ───────────────────── */
  const anchorItems = document.querySelectorAll('.anchor-nav__item[href^="#"]');
  if (anchorItems.length) {
    const anchorObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = '#' + entry.target.id;
          anchorItems.forEach(a => a.classList.toggle('is-active', a.getAttribute('href') === id));
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px' });

    anchorItems.forEach(a => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) anchorObserver.observe(target);
    });
  }
})();
