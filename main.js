/* ======================================================
   MINIMALIST PORTFOLIO — JavaScript Interactions
   ====================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // ── Navbar Scroll Effect ─────────────────────────────
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    });
  }

  // ── Mobile Menu Toggle ───────────────────────────────
  const mobileToggle = document.querySelector('.navbar__mobile-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileClose = document.querySelector('.mobile-menu__close');
  const mobileLinks = document.querySelectorAll('.mobile-menu__link');

  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
    });

    if (mobileClose) {
      mobileClose.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    }

    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // ── Smooth Scroll for Anchor Links ───────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const navHeight = navbar ? navbar.offsetHeight : 0;
        const targetPosition = targetEl.getBoundingClientRect().top + window.scrollY - navHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });

        // Close mobile menu if open
        if (mobileMenu && mobileMenu.classList.contains('open')) {
          mobileMenu.classList.remove('open');
          document.body.style.overflow = '';
        }
      }
    });
  });

  // ── Scroll Reveal (Intersection Observer) ────────────
  const revealElements = document.querySelectorAll('.reveal');

  if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  }

  // ── Active Nav Link Highlighting ─────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar__link');

  if (sections.length > 0 && navLinks.length > 0) {
    const highlightNav = () => {
      const scrollY = window.scrollY;

      sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    };

    window.addEventListener('scroll', highlightNav);
  }
});
