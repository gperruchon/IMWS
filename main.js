/* IM Wealth Select® — main.js V6 */
(function () {
  'use strict';

  /* ── Hero video autoplay ─────────────────────── */
  const heroVideo = document.querySelector('.hero__video');
  if (heroVideo) {
    heroVideo.muted = true;
    heroVideo.play().catch(() => {});
  }

  /* ── Contact form — AJAX submit ─────────────────── */
  const contactForm = document.getElementById('contact-form');
  const formModal   = document.getElementById('form-modal');
  const modalClose  = document.getElementById('modal-close');

  if (contactForm && formModal) {
    const openModal = () => {
      formModal.classList.add('is-open');
      document.body.style.overflow = 'hidden';
    };
    const closeModal = () => {
      formModal.classList.remove('is-open');
      document.body.style.overflow = '';
    };

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('[type="submit"]');
      if (submitBtn) submitBtn.disabled = true;
      try {
        const res = await fetch(contactForm.action, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: { Accept: 'application/json' }
        });
        if (res.ok) {
          contactForm.reset();
          openModal();
        } else {
          const data = await res.json().catch(() => ({}));
          const msg = (data.errors || []).map(err => err.message).join(', ')
            || 'Submission failed. Please try again.';
          alert(msg);
        }
      } catch (_) {
        alert('Network error. Please check your connection and try again.');
      } finally {
        if (submitBtn) submitBtn.disabled = false;
      }
    });

    modalClose && modalClose.addEventListener('click', closeModal);
    formModal.addEventListener('click', (e) => { if (e.target === formModal) closeModal(); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && formModal.classList.contains('is-open')) closeModal();
    });
  }

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

    document.addEventListener('click', (e) => {
      if (!langWidget.contains(e.target)) langWidget.classList.remove('is-open');
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') langWidget.classList.remove('is-open');
    });
  }

  /* ── Language navigation ──────────────────────── */
  document.querySelectorAll('.nav__lang-option, .overlay__lang-item').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      e.stopPropagation();
      var href = el.getAttribute('data-href');
      if (href) window.location.href = href;
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
  document.querySelectorAll('.has-spotlight, .usecase-card, .tool-item').forEach(card => {
    card.addEventListener('mousemove', e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', ((e.clientX - r.left) / r.width  * 100) + '%');
      card.style.setProperty('--my', ((e.clientY - r.top)  / r.height * 100) + '%');
    });
  });

  /* ── Use-case card accordion ─────────────────────── */
  const usecaseCards = document.querySelectorAll('.usecase-card');
  if (usecaseCards.length) {
    usecaseCards.forEach(card => {
      card.setAttribute('role', 'button');
      card.setAttribute('aria-expanded', 'false');

      const toggle = () => {
        const wasExpanded = card.classList.contains('is-expanded');
        usecaseCards.forEach(c => {
          c.classList.remove('is-expanded');
          c.setAttribute('aria-expanded', 'false');
        });
        if (!wasExpanded) {
          card.classList.add('is-expanded');
          card.setAttribute('aria-expanded', 'true');
        }
      };

      card.addEventListener('click', toggle);
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggle();
        }
      });
    });
  }

  /* ── Tool-item accordion (Team page) ─────────── */
  const toolItems = document.querySelectorAll('.tool-item');
  if (toolItems.length) {
    toolItems.forEach(item => {
      item.setAttribute('role', 'button');
      item.setAttribute('aria-expanded', 'false');

      const toggle = () => {
        const wasExpanded = item.classList.contains('is-expanded');
        toolItems.forEach(t => {
          t.classList.remove('is-expanded');
          t.setAttribute('aria-expanded', 'false');
        });
        if (!wasExpanded) {
          item.classList.add('is-expanded');
          item.setAttribute('aria-expanded', 'true');
        }
      };

      item.addEventListener('click', toggle);
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          toggle();
        }
      });
    });
  }

  /* ── Profile bio expand (Team page) ─────────── */
  const profileContent = document.querySelector('.profile__content');
  if (profileContent) {
    const toggle = () => {
      const expanded = profileContent.classList.toggle('is-expanded');
      profileContent.setAttribute('aria-expanded', String(expanded));
    };
    profileContent.addEventListener('click', (e) => {
      if (e.target.closest('a, button')) return;
      toggle();
    });
    profileContent.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); }
    });
  }

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
          anchorItems.forEach(a => {
            const active = a.getAttribute('href') === id;
            a.classList.toggle('is-active', active);
            if (active) a.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
          });
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px' });

    anchorItems.forEach(a => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) anchorObserver.observe(target);
    });
  }

  /* ── Stepper accordion ── */
  const stepperSteps = document.querySelectorAll('.stepper__step');
  if (stepperSteps.length) {
    stepperSteps.forEach(step => {
      const trigger = step.querySelector('.stepper__trigger');
      if (!trigger) return;

      trigger.addEventListener('click', () => {
        const isActive = step.classList.contains('is-active');
        stepperSteps.forEach(s => {
          s.classList.remove('is-active');
          const t = s.querySelector('.stepper__trigger');
          if (t) t.setAttribute('aria-expanded', 'false');
        });
        if (!isActive) {
          step.classList.add('is-active');
          trigger.setAttribute('aria-expanded', 'true');
        }
      });

      trigger.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); trigger.click(); }
      });
    });

    // Deep-link: open matching step when arriving with a hash
    const hash = window.location.hash;
    if (hash) {
      const targetStep = document.querySelector(hash + '.stepper__step');
      if (targetStep) {
        targetStep.classList.add('is-active');
        const t = targetStep.querySelector('.stepper__trigger');
        if (t) t.setAttribute('aria-expanded', 'true');
        setTimeout(() => {
          targetStep.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
      }
    }
  }
})();

/* ── i18n engine ── */
(function () {
  if (document.body && document.body.getAttribute('data-i18n-static') === 'true') return;
  var STORAGE_KEY = 'imws-lang';
  var SUPPORTED = ['EN', 'FR', 'DE', 'IT', 'ES'];
  var currentLang = localStorage.getItem(STORAGE_KEY) || 'EN';
  var translations = {};

  function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      if (translations[key] !== undefined) el.textContent = translations[key];
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-html');
      if (translations[key] !== undefined) el.innerHTML = translations[key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-placeholder');
      if (translations[key] !== undefined) el.placeholder = translations[key];
    });
    document.documentElement.lang = currentLang.toLowerCase();
    document.querySelectorAll('.nav__lang-option, .overlay__lang-item').forEach(function (el) {
      el.classList.toggle('is-active', el.dataset.lang === currentLang);
    });
    var labelEl = document.querySelector('.nav__lang-label');
    if (labelEl) labelEl.textContent = currentLang;
  }

  function loadLang(lang) {
    if (document.body && document.body.getAttribute('data-i18n-static') === 'true') return;
    fetch(lang.toLowerCase() + '.json')
      .then(function (res) { return res.json(); })
      .then(function (data) {
        translations = data;
        applyTranslations();
      })
      .catch(function () { console.warn('i18n load failed for:', lang); });
  }

  function setLang(lang) {
    if (SUPPORTED.indexOf(lang) === -1) return;
    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    loadLang(lang);
  }

  loadLang(currentLang);
}());
