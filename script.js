// Wait for DOM to load completely
document.addEventListener('DOMContentLoaded', function() {
    // 1. Mobile Menu Toggle Functionality
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navList = document.querySelector('.nav-list');
    
    if (mobileMenuToggle && navList) {
        mobileMenuToggle.addEventListener('click', function() {
            navList.classList.toggle('show');
        });

        // Close menu when clicking a link (mobile view)
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    navList.classList.remove('show');
                }
            });
        });
    }

    // 2. Scroll Animations for "animate-on-scroll" Elements
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            // Animate when element is 100px into view
            if (elementTop < windowHeight - 100) {
                element.classList.add('animated');
            }
        });
    };

    // Run animation check on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);

    // 3. Sticky Header Style Change on Scroll
    const header = document.querySelector('.header');
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                header.style.background = 'var(--teal)';
                header.style.padding = '0.8rem 0';
            } else {
                header.style.background = 'linear-gradient(135deg, var(--teal), var(--blue))';
                header.style.padding = 'var(--space-sm) 0';
            }
        });
    }

    // 4. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            // Skip if href is just "#"
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Scroll to target with offset for sticky header
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 5. Beta Signup Form Submission Handling
    const betaForm = document.getElementById('beta-signup-form');
    if (betaForm) {
        betaForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect form data (for backend submission)
            const formData = new FormData(this);
            const submissionData = Object.fromEntries(formData.entries());
            
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

    // 6. Add active class to nav link based on scroll position
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('.section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - 150)) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
});
