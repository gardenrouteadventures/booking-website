/* assets/js/index.js */
document.addEventListener('DOMContentLoaded', function() {
    // ===== NAVIGATION TOGGLE =====
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('open');
        });
    }

    // ===== HEADER SCROLL EFFECT =====
    const header = document.getElementById('header');
    let lastScroll = 0;

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
        
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // ===== SCROLL TO TOP =====
    const scrollTopBtn = document.getElementById('scrollTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    });
    
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // ===== HERO SLIDER =====
    const slides = document.querySelectorAll('.hero-slide');
    let currentSlide = 0;

    if (slides.length > 0) {
        function showSlide(index) {
            slides.forEach((slide, i) => {
                slide.classList.remove('active');
                if (i === index) {
                    slide.classList.add('active');
                }
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }

        // Auto advance slides
        setInterval(nextSlide, 5000);
    }

    // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    e.preventDefault();
                    const headerHeight = header ? header.offsetHeight : 70;
                    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
                    
                    // Close mobile menu if open
                    if (navMenu) {
                        navMenu.classList.remove('open');
                    }
                }
            }
        });
    });

    // ===== CLOSE MOBILE MENU ON OUTSIDE CLICK =====
    document.addEventListener('click', function(e) {
        if (navMenu && navMenu.classList.contains('open')) {
            if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
                navMenu.classList.remove('open');
            }
        }
    });

    // ===== KEYBOARD ACCESSIBILITY =====
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (navMenu && navMenu.classList.contains('open')) {
                navMenu.classList.remove('open');
            }
        }
    });
});