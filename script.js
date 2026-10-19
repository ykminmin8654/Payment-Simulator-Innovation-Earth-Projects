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

    // 3. Footer year
    var yearEl = document.getElementById('footer-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // 4. Beta signup form submission handling
    var betaForm = document.getElementById('beta-signup-form');
    if (betaForm) {
        betaForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Collect form data (for backend submission)
            var formData = new FormData(this);
            var submissionData = Object.fromEntries(formData.entries());

            // Log data to console (for testing)
            console.log('Beta Program Application:', submissionData);

            // Simulate successful submission (replace with real API call in production)
            alert('Thank you for applying to our beta program!\n\nWe will review your application and contact you within 3-5 business days with next steps.');

            // Reset form after submission
            this.reset();

            // === PRODUCTION IMPLEMENTATION ===
            // Uncomment and modify this code to send data to your backend:
            /*
            fetch('/api/beta-signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submissionData),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(result => {
                alert('Your beta application has been submitted successfully!');
                console.log('Submission Result:', result);
            })
            .catch(error => {
                alert('There was an error submitting your application. Please try again later.');
                console.error('Submission Error:', error);
            });
            */
        });
    }

    // 5. Active nav link based on scroll position
    var sectionIds = ['features', 'beta-program', 'how-it-works', 'contact'];
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
