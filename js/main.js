/**
 * Grounded Dating - Main Application Scripts
 */
document.addEventListener('DOMContentLoaded', () => {
  // Mobile Navigation Toggle
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  // FAQ Accordion Toggle
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    if (header) {
      header.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        faqItems.forEach(i => i.classList.remove('open'));
        if (!isOpen) {
          item.classList.add('open');
        }
      });
    }
  });

  // Didit Verification Button Launcher
  const diditBtns = document.querySelectorAll('.verify-didit-btn');
  diditBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.open('https://verify.didit.me', '_blank', 'noopener,noreferrer');
    });
  });

  // WhatsApp Quick Launcher
  const waBtns = document.querySelectorAll('.whatsapp-launch-btn');
  waBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.open('https://api.whatsapp.com/send/?phone=447429398306&text=Hi%20Grounded%20Dating!%20I%20want%20to%20learn%20more%20about%20your%20matchmaking.&type=phone_number&app_absent=0', '_blank');
    });
  });

  // Form Handling & Captcha Prep
  const joinForm = document.querySelector('#grounded-join-form');
  if (joinForm) {
    joinForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const feedbackDiv = document.querySelector('#form-feedback');
      if (feedbackDiv) {
        feedbackDiv.style.display = 'block';
        feedbackDiv.innerHTML = `
          <div style="background: rgba(16, 185, 129, 0.2); border: 1px solid #10b981; color: #10b981; padding: 1.25rem; border-radius: 12px; margin-top: 1rem; text-align: center;">
            <h4 style="margin-bottom: 0.5rem; font-size: 1.1rem;">🎉 Application Received!</h4>
            <p style="font-size: 0.9rem;">Thank you for joining Grounded Dating. Next step: Verify your ID with Didit.</p>
            <a href="https://verify.didit.me" target="_blank" class="btn btn-yellow" style="margin-top: 1rem; display: inline-flex;">Complete Verification on Didit ➔</a>
          </div>
        `;
      }
    });
  }

  // SPA Tab/Section Router (For spa.html)
  const spaNavLinks = document.querySelectorAll('[data-spa-target]');
  spaNavLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('data-spa-target');
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
