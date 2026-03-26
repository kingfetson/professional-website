/* ============================================================
   Plumbing Experts Nairobi — script.js
   ============================================================ */

'use strict';

// ===== DOM READY =====
document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileNav();
  initSmoothScroll();
  initContactForm();
  initScrollReveal();
  setFooterYear();
});


// ===== STICKY HEADER =====
function initHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // run once on load
}


// ===== MOBILE NAVIGATION =====
function initMobileNav() {
  const hamburger    = document.getElementById('hamburger');
  const mobileNav    = document.getElementById('mobileNav');
  const mobileClose  = document.getElementById('mobileClose');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const mobileLinks  = document.querySelectorAll('.m-link');

  if (!hamburger || !mobileNav) return;

  const open = () => {
    mobileNav.classList.add('open');
    mobileOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    hamburger.setAttribute('aria-expanded', 'true');
  };

  const close = () => {
    mobileNav.classList.remove('open');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
    hamburger.setAttribute('aria-expanded', 'false');
  };

  hamburger.addEventListener('click', open);
  mobileClose?.addEventListener('click', close);
  mobileOverlay?.addEventListener('click', close);

  mobileLinks.forEach(link => link.addEventListener('click', close));

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileNav.classList.contains('open')) close();
  });
}


// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (!targetId || targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const headerHeight = document.getElementById('header')?.offsetHeight ?? 80;
      const top = target.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
}


// ===== CONTACT FORM =====
function initContactForm() {
  const form       = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const submitBtn  = document.getElementById('submitBtn');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name    = document.getElementById('name')?.value.trim();
    const phone   = document.getElementById('phone')?.value.trim();
    const message = document.getElementById('message')?.value.trim();
    const issue   = document.getElementById('issue')?.value;

    // Validation
    if (!name) return showStatus('error', 'Please enter your full name.');
    if (!phone) return showStatus('error', 'Please enter your phone number.');

    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{4,10}$/;
    if (!phoneRegex.test(phone.replace(/\s/g, '')) && phone.replace(/\s/g, '').length < 9) {
      return showStatus('error', 'Please enter a valid phone number.');
    }

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Sending request…';

    // Simulate async submission (replace with real API/webhook integration)
    await delay(900);

    // Log for demo — replace with fetch() to your backend or Google Sheets
    console.log({
      name,
      phone,
      issue: issue || 'Not specified',
      message: message || '—',
      submittedAt: new Date().toISOString()
    });

    // Success
    showStatus('success', '✓ Request received! Our team will contact you within 15 minutes.');
    form.reset();
    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Service Request';
  });

  function showStatus(type, message) {
    if (!formStatus) return;

    formStatus.textContent = message;
    formStatus.style.display = 'block';

    if (type === 'success') {
      formStatus.style.background = 'rgba(34,197,94,0.08)';
      formStatus.style.color = '#16a34a';
      formStatus.style.border = '1px solid rgba(34,197,94,0.25)';
    } else {
      formStatus.style.background = 'rgba(239,68,68,0.08)';
      formStatus.style.color = '#dc2626';
      formStatus.style.border = '1px solid rgba(239,68,68,0.25)';
    }

    setTimeout(() => {
      formStatus.style.display = 'none';
    }, type === 'success' ? 6000 : 4000);
  }
}


// ===== SCROLL REVEAL ANIMATIONS =====
function initScrollReveal() {
  if (!('IntersectionObserver' in window)) return;

  const elements = document.querySelectorAll(
    '.service-card, .testi-card, .feature-item, .contact-info-block, .contact-form-block'
  );

  // Set initial state via inline styles for JS-driven reveal
  elements.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(28px)';
    el.style.transition = `opacity 0.55s ease ${i * 0.06}s, transform 0.55s ease ${i * 0.06}s`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  elements.forEach(el => observer.observe(el));
}


// ===== FOOTER YEAR =====
function setFooterYear() {
  const el = document.getElementById('footerYear');
  if (el) el.textContent = new Date().getFullYear();
}


// ===== UTILITY =====
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}
