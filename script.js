/* ============================================================
   Plumbing Experts Nairobi — script.js
   Google Sheets integration via Apps Script Web App
   ============================================================

   SETUP:
   1. Deploy Code.gs as a Google Apps Script Web App (see Code.gs).
   2. Paste your Web App URL below as SHEETS_WEBHOOK_URL.
   3. That's it — submissions go straight to your Google Sheet.
   ============================================================ */

'use strict';

// ─── CONFIGURATION ────────────────────────────────────────────
// Paste your deployed Apps Script Web App URL here:
const SHEETS_WEBHOOK_URL = 'YOUR_APPS_SCRIPT_WEB_APP_URL_HERE';
// ──────────────────────────────────────────────────────────────


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
  onScroll();
}


// ===== MOBILE NAVIGATION =====
function initMobileNav() {
  const hamburger     = document.getElementById('hamburger');
  const mobileNav     = document.getElementById('mobileNav');
  const mobileClose   = document.getElementById('mobileClose');
  const mobileOverlay = document.getElementById('mobileOverlay');
  const mobileLinks   = document.querySelectorAll('.m-link');

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


// ===== CONTACT FORM — GOOGLE SHEETS INTEGRATION =====
function initContactForm() {
  const form       = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');
  const submitBtn  = document.getElementById('submitBtn');

  if (!form) return;

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Collect values
    const name    = document.getElementById('name')?.value.trim();
    const phone   = document.getElementById('phone')?.value.trim();
    const issue   = document.getElementById('issue')?.value || 'Not specified';
    const message = document.getElementById('message')?.value.trim() || '—';

    // ── Client-side validation ──────────────────────────────
    if (!name)  return showStatus('error', 'Please enter your full name.');
    if (!phone) return showStatus('error', 'Please enter your phone number.');

    const phoneClean = phone.replace(/[\s\-().+]/g, '');
    if (!/^\d{9,15}$/.test(phoneClean)) {
      return showStatus('error', 'Please enter a valid phone number (9–15 digits).');
    }

    // ── UI: loading state ───────────────────────────────────
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Sending…';

    // ── Payload ─────────────────────────────────────────────
    const payload = {
      name,
      phone,
      issue,
      message,
      submittedAt : new Date().toLocaleString('en-KE', { timeZone: 'Africa/Nairobi' }),
      userAgent   : navigator.userAgent,
      pageUrl     : window.location.href,
    };

    // ── Send to Google Sheets ────────────────────────────────
    const { ok, error } = await sendToSheets(payload);

    // ── UI: result ───────────────────────────────────────────
    if (ok) {
      showStatus('success', '✓ Request received! Our team will contact you within 15 minutes.');
      form.reset();
    } else {
      console.error('[Sheets] Submission error:', error);
      showStatus(
        'error',
        'Could not send your request right now. Please call or WhatsApp us directly.'
      );
    }

    submitBtn.disabled = false;
    submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Service Request';
  });


  // ── Google Sheets sender ─────────────────────────────────────
  async function sendToSheets(payload) {
    // Guard: warn if URL not configured yet
    if (!SHEETS_WEBHOOK_URL || SHEETS_WEBHOOK_URL.includes('YOUR_APPS_SCRIPT')) {
      console.warn(
        '[Sheets] SHEETS_WEBHOOK_URL is not configured.\n' +
        'Deploy Code.gs as a Web App and paste the URL at the top of script.js.'
      );
      // In development/demo: simulate success so UX still works
      await delay(700);
      return { ok: true };
    }

    try {
      const body = new URLSearchParams(payload);

      const res = await fetch(SHEETS_WEBHOOK_URL, {
        method  : 'POST',
        headers : { 'Content-Type': 'application/x-www-form-urlencoded' },
        body    : body.toString(),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => res.statusText);
        return { ok: false, error: `HTTP ${res.status}: ${text}` };
      }

      // Apps Script returns: { result: "success" } or { result: "error", error: "..." }
      const json = await res.json().catch(() => ({ result: 'success' }));

      if (json.result === 'error') {
        return { ok: false, error: json.error };
      }

      return { ok: true };

    } catch (err) {
      return { ok: false, error: err.message };
    }
  }


  // ── Status display helper ────────────────────────────────────
  function showStatus(type, message) {
    if (!formStatus) return;

    formStatus.textContent = message;
    formStatus.style.display = 'block';

    if (type === 'success') {
      formStatus.style.background = 'rgba(34,197,94,0.08)';
      formStatus.style.color      = '#16a34a';
      formStatus.style.border     = '1px solid rgba(34,197,94,0.25)';
    } else {
      formStatus.style.background = 'rgba(239,68,68,0.08)';
      formStatus.style.color      = '#dc2626';
      formStatus.style.border     = '1px solid rgba(239,68,68,0.25)';
    }

    setTimeout(
      () => { formStatus.style.display = 'none'; },
      type === 'success' ? 6000 : 5000
    );
  }
}


// ===== SCROLL REVEAL =====
function initScrollReveal() {
  if (!('IntersectionObserver' in window)) return;

  const elements = document.querySelectorAll(
    '.service-card, .testi-card, .feature-item, .contact-info-block, .contact-form-block'
  );

  elements.forEach((el, i) => {
    el.style.opacity    = '0';
    el.style.transform  = 'translateY(28px)';
    el.style.transition = `opacity 0.55s ease ${i * 0.06}s, transform 0.55s ease ${i * 0.06}s`;
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity   = '1';
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
