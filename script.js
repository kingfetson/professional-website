
<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>
<script>
  // Initialize AOS animations
  AOS.init({
    duration: 800,
    once: true,
    offset: 100
  });
  
  // Mobile navigation toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileNav = document.getElementById('mobileNav');
  const closeMobileNav = document.getElementById('closeMobileNav');
  const mobileLinks = document.querySelectorAll('.mobile-link');
  
  function openMobileNav() {
    mobileNav.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  
  function closeMobileNavFunc() {
    mobileNav.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  if(mobileToggle) mobileToggle.addEventListener('click', openMobileNav);
  if(closeMobileNav) closeMobileNav.addEventListener('click', closeMobileNavFunc);
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileNavFunc);
  });
  
  // Enhanced form submission with validation and professional feedback
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");
  
  contactForm.addEventListener("submit", async function(e) {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();
    const submitBtn = document.getElementById("submitBtn");
    
    if (!name || !phone) {
      formStatus.innerHTML = '<i class="fas fa-exclamation-circle"></i> Please enter your name and phone number.';
      formStatus.style.color = "#e74c3c";
      formStatus.style.display = "block";
      setTimeout(() => { formStatus.style.display = "none"; }, 3000);
      return;
    }
    
    // Phone validation: Kenyan numbers or general international
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{4,10}$/;
    if (!phoneRegex.test(phone) && phone.length < 9) {
      formStatus.innerHTML = '<i class="fas fa-exclamation-circle"></i> Please enter a valid phone number.';
      formStatus.style.color = "#e74c3c";
      formStatus.style.display = "block";
      setTimeout(() => { formStatus.style.display = "none"; }, 3000);
      return;
    }
    
    // Simulate professional request (replace with actual API if needed)
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-pulse"></i> Sending...';
    
    // For demo purposes, show success after timeout. In production, you can integrate email/webhook.
    setTimeout(() => {
      formStatus.innerHTML = '<i class="fas fa-check-circle"></i> Request received! Our team will contact you within 15 minutes.';
      formStatus.style.color = "#2ecc71";
      formStatus.style.display = "block";
      contactForm.reset();
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Request Service';
      setTimeout(() => { formStatus.style.display = "none"; }, 5000);
      
      // Optional: log to console (can integrate Google Sheets / API)
      console.log(`Plumbing Request: ${name}, ${phone}, Message: ${message}`);
    }, 800);
  });
  
  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if(targetId === "#" || targetId === "") return;
      const targetElement = document.querySelector(targetId);
      if(targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
  
  // Add header background on scroll
  window.addEventListener("scroll", function() {
    const header = document.getElementById("header");
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });
  
  // Lazy load background hero image (optional: but already set in CSS)
  // Additional dynamic year in footer: ensure copyright year is current
  const yearSpan = document.querySelector('.footer-bottom p');
  if(yearSpan) {
    const currentYear = new Date().getFullYear();
    if(yearSpan.innerHTML.includes('2026')) {
      yearSpan.innerHTML = yearSpan.innerHTML.replace('2026', currentYear);
    }
  }
