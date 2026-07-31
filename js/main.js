/**
 * Grounded Dating - Main Application Scripts
 * Features: Starfield Canvas, Globe.gl 3D Earth Initialization, Preloader, Didit Flow
 */
document.addEventListener('DOMContentLoaded', () => {

  // 1. Starfield Canvas Background Animation
  const canvas = document.getElementById('canvas-stars');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width, height, stars = [];

    function initStars() {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      stars = [];
      for (let i = 0; i < 400; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.5 + 0.2,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          alpha: Math.random(),
          dAlpha: (Math.random() * 0.02) - 0.01
        });
      }
    }

    function drawStars() {
      ctx.clearRect(0, 0, width, height);
      stars.forEach(star => {
        star.alpha += star.dAlpha;
        if (star.alpha <= 0.1 || star.alpha >= 1) {
          star.dAlpha = -star.dAlpha;
        }
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();
        star.x += star.vx;
        star.y += star.vy;
        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;
      });
      requestAnimationFrame(drawStars);
    }

    window.addEventListener('resize', initStars);
    initStars();
    drawStars();
  }

  // 2. Preloader Dismissal
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('preloader-hidden');
      setTimeout(() => {
        if (preloader.parentNode) preloader.parentNode.removeChild(preloader);
      }, 600);
    }, 1500);
  }

  // 3. Globe.gl 3D Globe Mount Handler
  function mountGlobe(el, size) {
    if (!el || typeof Globe !== 'function') return null;
    el.innerHTML = '';
    el.style.width = size + 'px';
    el.style.height = size + 'px';
    el.style.display = 'inline-block';
    el.style.background = 'transparent';
    el.style.overflow = 'visible';

    try {
      const g = Globe()(el)
        .width(size)
        .height(size)
        .backgroundColor('rgba(0,0,0,0)')
        .globeImageUrl('https://unpkg.com/three-globe@2.31.1/example/img/earth-blue-marble.jpg')
        .bumpImageUrl('https://unpkg.com/three-globe@2.31.1/example/img/earth-topology.png')
        .showAtmosphere(true)
        .atmosphereColor('#88c0ff')
        .atmosphereAltitude(0.22);

      g.pointOfView({ lat: 51.5074, lng: -0.1278, altitude: 2.3 }, 0); // Focused near London

      const c = g.controls();
      if (c) {
        c.autoRotate = true;
        c.autoRotateSpeed = 1.2;
        c.enableZoom = false;
        c.enablePan = false;
      }
      return g;
    } catch(e) {
      console.log('Globe init fallback:', e);
    }
  }

  function initGlobes() {
    const heroGlobe = document.querySelector('.hero-rotating-globe');
    const preloaderGlobe = document.querySelector('.preloader-globe');
    const size = window.innerWidth < 768 ? 200 : (window.innerWidth < 1024 ? 240 : 300);
    if (heroGlobe) mountGlobe(heroGlobe, size);
    if (preloaderGlobe) mountGlobe(preloaderGlobe, 160);
  }

  if (typeof Globe === 'function') {
    initGlobes();
  } else {
    setTimeout(initGlobes, 300);
  }

  // 4. Mobile Navigation Toggle
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });
  }

  // 5. FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    if (header) {
      header.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        faqItems.forEach(i => {
          i.classList.remove('open');
          const h = i.querySelector('.faq-header');
          if (h) h.setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          item.classList.add('open');
          header.setAttribute('aria-expanded', 'true');
        }
      });
    }
  });

  // 6. Didit Verification Button Launcher (https://didit.me/)
  const diditBtns = document.querySelectorAll('.verify-didit-btn');
  diditBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.open('https://didit.me/', '_blank', 'noopener,noreferrer');
    });
  });

  // 7. WhatsApp Quick Launcher
  const waBtns = document.querySelectorAll('.whatsapp-launch-btn');
  waBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      window.open('https://api.whatsapp.com/send/?phone=447429398306&text=Hi%20Grounded%20Dating!%20I%20want%20to%20learn%20more%20about%20your%20matchmaking.&type=phone_number&app_absent=0', '_blank');
    });
  });

  // 8. Form Submissions
  const joinForm = document.querySelector('#grounded-join-form');
  if (joinForm) {
    joinForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const feedbackDiv = document.querySelector('#form-feedback');
      if (feedbackDiv) {
        feedbackDiv.style.display = 'block';
        feedbackDiv.innerHTML = `
          <div style="background: rgba(0, 117, 32, 0.25); border: 1px solid #10b981; color: #34d399; padding: 1.25rem; border-radius: 12px; margin-top: 1rem; text-align: center;">
            <h4 style="margin-bottom: 0.5rem; font-size: 1.1rem;">🎉 Application Received!</h4>
            <p style="font-size: 0.95rem;">Thank you for joining Grounded Dating. Next step: Verify your ID with Didit.</p>
            <a href="https://didit.me/" target="_blank" class="btn btn-yellow" style="margin-top: 1rem; display: inline-flex;">Complete Verification on Didit ➔</a>
          </div>
        `;
      }
    });
  }

  // SPA Router
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
