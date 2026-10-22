// Payment Simulator — beta landing page interactions
// Matches the innovationearthprojects.org design system behaviour.

document.documentElement.classList.remove('no-js');

document.addEventListener('DOMContentLoaded', function () {
    // 1. Mobile menu toggle (nav.css: .nav__links.is-open)
    var navToggle = document.getElementById('nav-toggle');
    var navLinks = document.getElementById('primary-nav');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', function () {
            var open = navLinks.classList.toggle('is-open');
            navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        });

        // Close menu when clicking a link (mobile view)
        navLinks.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                if (window.innerWidth <= 860) {
                    navLinks.classList.remove('is-open');
                    navToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    // 2. Scroll reveal for ".reveal" elements (same pattern as shared/motion.js)
    var revealEls = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    io.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

        revealEls.forEach(function (el) { io.observe(el); });
    } else {
        // Fallback: show everything immediately
        revealEls.forEach(function (el) { el.classList.add('is-visible'); });
    }

    // Safety net: after load, force-reveal anything still hidden (e.g. observer edge cases)
    window.addEventListener('load', function () {
        setTimeout(function () {
            document.querySelectorAll('.reveal:not(.is-visible)').forEach(function (el) {
                var r = el.getBoundingClientRect();
                if (r.top < window.innerHeight) el.classList.add('is-visible');
            });
        }, 800);
    });

    // 3. Footer year
    var yearEl = document.getElementById('footer-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // 4. Active nav link based on scroll position
    var sectionIds = ['features', 'download', 'how-it-works', 'contact'];
    var sections = sectionIds
        .map(function (id) { return document.getElementById(id); })
        .filter(Boolean);
    var links = document.querySelectorAll('.nav__links a[href^="#"]');

    function updateActiveLink() {
        var currentId = '';
        sections.forEach(function (section) {
            if (window.scrollY >= section.offsetTop - 150) {
                currentId = section.id;
            }
        });
        links.forEach(function (link) {
            var isActive = link.getAttribute('href') === '#' + currentId;
            link.classList.toggle('is-active', isActive);
        });
    }

    window.addEventListener('scroll', updateActiveLink, { passive: true });
    updateActiveLink();
});
