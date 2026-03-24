// Wait for the DOM to be fully loaded before executing code
document.addEventListener('DOMContentLoaded', function() {
    // ==========================
    // Mobile Navigation Toggle (Hamburger Menu)
    // ==========================
    // Create hamburger menu button (dynamically for mobile)
    const nav = document.querySelector('nav');
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    hamburger.style.cssText = `
        display: none;
        background: transparent;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
    `;
    nav.appendChild(hamburger);

    // Show hamburger on mobile, toggle nav links
    const navLinks = document.querySelector('.nav-links');
    const mediaQuery = window.matchMedia('(max-width: 768px)');

    function handleScreenChange(e) {
        if (e.matches) {
            hamburger.style.display = 'block';
            navLinks.style.display = 'none';
            navLinks.style.position = 'absolute';
            navLinks.style.top = '100%';
            navLinks.style.left = 0;
            navLinks.style.right = 0;
            navLinks.style.backgroundColor = '#2c3e50';
            navLinks.style.flexDirection = 'column';
            navLinks.style.padding = '1rem 5%';
            navLinks.style.boxShadow = '0 4px 10px rgba(0,0,0,0.1)';
        } else {
            hamburger.style.display = 'none';
            navLinks.style.display = 'flex';
            navLinks.style.position = 'static';
            navLinks.style.flexDirection = 'row';
            navLinks.style.padding = 0;
            navLinks.style.boxShadow = 'none';
        }
    }

    // Initial check + listen for screen size changes
    handleScreenChange(mediaQuery);
    mediaQuery.addEventListener('change', handleScreenChange);

    // Toggle nav links on hamburger click
    hamburger.addEventListener('click', function() {
        navLinks.style.display = navLinks.style.display === 'none' ? 'flex' : 'none';
    });

    // Close nav when clicking a link (mobile)
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', function() {
            if (mediaQuery.matches) {
                navLinks.style.display = 'none';
            }
        });
    });

    // ==========================
    // Smooth Scrolling for Anchor Links
    // ==========================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return; // Skip download button
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Offset for sticky header
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==========================
    // Scroll Animation for Features/Steps (Fade In)
    // ==========================
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.card, .step');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            // Animate when element is 100px into the viewport
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };

    // Initial styles for animation elements
    document.querySelectorAll('.card, .step').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });

    // Run on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);

    // ==========================
    // Sticky Header Style Change on Scroll
    // ==========================
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.style.backgroundColor = '#1a2530'; // Darker shade on scroll
            header.style.padding = '0.8rem 5%'; // Slight shrink
        } else {
            header.style.backgroundColor = '#2c3e50'; // Original color
            header.style.padding = '1rem 5%'; // Original padding
        }
    });

    // ==========================
    // Download Button Interaction (Optional: Add Google Play Link)
    // ==========================
    const downloadBtn = document.querySelector('.download-btn');
    downloadBtn.addEventListener('click', function(e) {
        // Replace with your actual Google Play URL
        const playStoreUrl = 'https://play.google.com/store/apps/details?id=com.yourpayment.simulator';
        
        // If href is empty, open Play Store link in new tab
        if (this.getAttribute('href') === '#') {
            e.preventDefault();
            window.open(playStoreUrl, '_blank');
            
            // Optional: Add analytics tracking here
            console.log('User clicked download button');
        }
    });

    // ==========================
    // Add "Back to Top" Button (Dynamic)
    // ==========================
    const backToTopBtn = document.createElement('button');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background-color: #3498db;
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 1.2rem;
        cursor: pointer;
        display: none;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 10px rgba(0,0,0,0.2);
        transition: opacity 0.3s ease, transform 0.3s ease;
        z-index: 99;
    `;
    document.body.appendChild(backToTopBtn);

    // Show/hide back to top button
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'flex';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    // Scroll to top on click
    backToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ==========================
    // Optional: Contact Form Validation (Add if you add a form)
    // ==========================
    // Example: Uncomment if you add a contact form with id="contact-form"
    /*
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            const errorElement = document.getElementById('form-error');
            
            // Basic validation
            if (!email || !message) {
                errorElement.textContent = 'Please fill in all fields';
                errorElement.style.color = 'red';
                return;
            }
            
            if (!email.includes('@')) {
                errorElement.textContent = 'Please enter a valid email';
                errorElement.style.color = 'red';
                return;
            }
            
            // If valid: Submit form (replace with actual API call)
            errorElement.textContent = 'Message sent successfully!';
            errorElement.style.color = 'green';
            contactForm.reset();
        });
    }
    */
});