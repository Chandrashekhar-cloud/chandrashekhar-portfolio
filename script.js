/* ============================================================
   PORTFOLIO INTERACTIONS
   Sections:
   1) Drawer Menu Toggle
   2) Sticky Navbar Scroll Effect
   3) Hero Word Cycler
   4) Active Navigation Sync (Scroll Spy)
   5) Scroll Reveal (Fade-in-up)
   6) Back-to-Top Button
============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 0. THEME TOGGLE ---------- */
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
    });
  }

  /* ---------- 1. DRAWER MENU TOGGLE ---------- */
  const navToggle   = document.getElementById('navToggle');
  const drawer      = document.getElementById('navDrawer');
  const overlay     = document.getElementById('drawerOverlay');
  const drawerLinks = drawer.querySelectorAll('[data-link]');

  function openDrawer() {
    drawer.classList.add('is-open');
    overlay.classList.add('is-open');
    navToggle.setAttribute('aria-expanded', 'true');
    drawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
  }

  function closeDrawer() {
    drawer.classList.remove('is-open');
    overlay.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; // Restore background scrolling
  }

  navToggle.addEventListener('click', () => {
    const isOpen = drawer.classList.contains('is-open');
    isOpen ? closeDrawer() : openDrawer();
  });

  overlay.addEventListener('click', closeDrawer);

  // Close drawer when a link inside it is clicked
  drawerLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  // Close drawer on Escape key press
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('is-open')) {
      closeDrawer();
    }
  });


  /* ---------- 2. STICKY NAVBAR SCROLL EFFECT ---------- */
  const header = document.getElementById('mainHeader');
  
  function handleNavbarScroll() {
    if (window.scrollY > 20) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll(); // Initial check on load


  /* ---------- 3. HERO WORD CYCLER ---------- */
  const cycleWords = ['Deploy.', 'Monitor.', 'Automate.', 'Secure.'];
  const cycleEl = document.getElementById('cycleWord');
  let cycleIndex = 0;

  if (cycleEl && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    setInterval(() => {
      cycleIndex = (cycleIndex + 1) % cycleWords.length;

      // Smooth slide down and fade out
      cycleEl.style.opacity = '0';
      cycleEl.style.transform = 'translateY(10px)';

      setTimeout(() => {
        cycleEl.textContent = cycleWords[cycleIndex];
        // Slide in from top and fade in
        cycleEl.style.transform = 'translateY(-10px)';
        
        // Force reflow
        cycleEl.offsetHeight;

        cycleEl.style.transform = 'translateY(0)';
        cycleEl.style.opacity = '1';
      }, 300);
    }, 2800);

    // Initial styling properties for transition
    cycleEl.style.transition = 'opacity 0.25s cubic-bezier(0.4, 0, 0.2, 1), transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)';
  }


  /* ---------- 4. ACTIVE NAVIGATION SYNC (SCROLL SPY) ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('[data-nav-link]');

  const scrollSpyObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('is-active');
          } else {
            link.classList.remove('is-active');
          }
        });
      }
    });
  }, {
    rootMargin: '-30% 0px -60% 0px' // Trigger when section occupies the sweet spot of the screen
  });

  sections.forEach(section => scrollSpyObserver.observe(section));


  /* ---------- 5. SCROLL REVEAL (FADE-IN-UP) ---------- */
  const revealTargets = document.querySelectorAll(
    '.section__eyebrow, .section__title, .about__grid, .edu-card, .project-card, .skills-card, .cert-card, .contact__text, .hero__actions'
  );
  
  revealTargets.forEach(el => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { 
    threshold: 0.08, 
    rootMargin: '0px 0px -30px 0px' 
  });

  revealTargets.forEach(el => revealObserver.observe(el));

  // Subtle stagger transition delay for grid elements
  document.querySelectorAll('.project-card, .cert-card, .skills-card').forEach((el, i) => {
    el.style.transitionDelay = `${(i % 3) * 60}ms`;
  });


  /* ---------- 6. PROJECT FILTERING ---------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Toggle active button state
        filterBtns.forEach(b => b.classList.remove('is-active'));
        btn.classList.add('is-active');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
          const category = card.getAttribute('data-category');
          const categories = category ? category.split(' ') : [];

          if (filterValue === 'all' || categories.includes(filterValue)) {
            card.style.display = 'flex';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'scale(1) translateY(0)';
            }, 50);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'scale(0.96) translateY(4px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }


  /* ---------- 7. BACK TO TOP BUTTON ---------- */
  const toTopBtn = document.getElementById('toTop');

  if (toTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 600) {
        toTopBtn.classList.add('is-visible');
      } else {
        toTopBtn.classList.remove('is-visible');
      }
    }, { passive: true });

    toTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});
