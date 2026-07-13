// Function to calculate and update scroll progress bar
function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

    const progressBar = document.querySelector('.scroll-progress');
    if (progressBar) {
        progressBar.style.width = scrollPercent + '%';
    }
}

// Add event listener for scroll progress bar
window.addEventListener('scroll', updateScrollProgress);
window.addEventListener('load', updateScrollProgress);

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            const navMenu = document.querySelector('.nav-menu');
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        }
    });
});

/* ============================================================
   Ajakin JS Behavior (General & Testimonial Slider)
============================================================ */
document.addEventListener('DOMContentLoaded', function () {

  /* ---------- 1) NAVBAR SCROLLED EFFECT & ACTIVE HIGHLIGHT ---------- */
  const nav = document.querySelector('.header');
  const toggleBtn = document.querySelector('.nav-toggle');
  const links = document.querySelector('.nav-menu');

  const heroSection = document.querySelector('.hero-banner-flat');

  function handleNavbarScroll() {
    if (!nav) return;
    // Hitung tinggi hero secara dinamis, kurangi 80px (tinggi header) agar transisi selesai pas di batas hero
    const heroHeight = heroSection ? heroSection.offsetHeight : 500;
    const triggerHeight = heroHeight - 80;

    if (window.scrollY > triggerHeight) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleNavbarScroll);
  window.addEventListener('resize', handleNavbarScroll); // Kalkulasi ulang saat layar di-resize
  handleNavbarScroll(); // Jalankan cek inisial saat dimuat

  if (toggleBtn && links) {
    toggleBtn.addEventListener('click', function () {
      links.classList.toggle('active');
      const isOpen = links.classList.contains('active');
      toggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    links.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        links.classList.remove('active');
      });
    });
  }

  // Auto active link based on current page filename
  const current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-list a').forEach(function (a) {
    const href = a.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      a.classList.add('active');
    } else {
      a.classList.remove('active');
    }
  });

  /* ---------- 2) REVEAL ON SCROLL ---------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  /* ---------- 3) COUNTER ANIMATION ---------- */
  const counters = document.querySelectorAll('[data-count]');
  if (counters.length) {
    const counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'), 10) || 0;
        const duration = 1400;
        const start = performance.now();

        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
          el.textContent = Math.floor(eased * target).toLocaleString('id-ID');
          if (progress < 1) {
            requestAnimationFrame(tick);
          } else {
            el.textContent = target.toLocaleString('id-ID');
          }
        }
        requestAnimationFrame(tick);
        counterObserver.unobserve(el);
      });
    }, { threshold: 0.4 });

    counters.forEach(function (el) { counterObserver.observe(el); });
  }

  /* ---------- 4) TESTIMONIAL SLIDER ---------- */
  const slides = document.querySelectorAll('.testi-slide');
  const dots = document.querySelectorAll('.testi-dot');
  if (slides.length) {
    let activeIndex = 0;
    let autoTimer;

    function showSlide(index) {
      slides.forEach(function (s, i) { s.classList.toggle('active', i === index); });
      dots.forEach(function (d, i) { d.classList.toggle('active', i === index); });
      activeIndex = index;
    }

    function nextSlide() {
      showSlide((activeIndex + 1) % slides.length);
    }

    function startAuto() {
      autoTimer = setInterval(nextSlide, 5000);
    }
    
    function resetAuto() {
      clearInterval(autoTimer);
      startAuto();
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        showSlide(i);
        resetAuto();
      });
    });

    showSlide(0);
    startAuto();
  }

});