/* ========================================
   MODERN PORTFOLIO WEBSITE - JAVASCRIPT
   ======================================== */

// ========================================
// SCROLL REVEAL ANIMATIONS
// ========================================

/**
 * Initialize scroll reveal animations
 * Observes elements and adds visible class when they enter viewport
 */
const initScrollAnimations = () => {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all scroll-fade-in elements
    const scrollElements = document.querySelectorAll('.scroll-fade-in');
    scrollElements.forEach(el => observer.observe(el));

    // Observe section titles for underline animation
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(el => observer.observe(el));
};

// ========================================
// ROTATING TEXT ANIMATION
// ========================================

/**
 * Initialize name toggle with rotating roles
 * Alternates between showing name and rotating roles
 */
const initNameToggle = () => {
    const heroTitle = document.querySelector('.hero-title');
    const highlightSpan = document.querySelector('.hero-title .highlight');

    if (!highlightSpan) return;

    const name = 'Bolajoko Michael';
    const roles = [
        'Web Developer',
        'Tech Enthusiast',
        'Problem Solver',
        'Software Engineer'
    ];

    let isShowingName = true;
    let roleIndex = 0;

    setInterval(() => {
        if (isShowingName) {
            // Show role instead
            roleIndex = (roleIndex + 1) % roles.length;
            highlightSpan.style.animation = 'none';
            setTimeout(() => {
                highlightSpan.textContent = roles[roleIndex];
                highlightSpan.style.animation = 'glow 3s ease-in-out infinite';
            }, 10);
            isShowingName = false;
        } else {
            // Show name instead
            highlightSpan.style.animation = 'none';
            setTimeout(() => {
                highlightSpan.textContent = name;
                highlightSpan.style.animation = 'glow 3s ease-in-out infinite';
            }, 10);
            isShowingName = true;
        }
    }, 4000);
};

// ========================================
// NAVIGATION MENU
// ========================================

/**
 * Initialize navigation menu toggle for mobile
 */
const initMobileMenu = () => {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (!hamburger || !navMenu) return;

    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
};

// ========================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ========================================

/**
 * Handle smooth scrolling for navigation links
 */
const initSmoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
};

// ========================================
// FORM SUBMISSION
// ========================================

/**
 * Handle contact form submission
 * Validates form and provides user feedback
 */
const initContactForm = () => {
    const form = document.getElementById('contactForm');
    
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(form);
        const data = {
            name: formData.get('name'),
            email: formData.get('email'),
            message: formData.get('message')
        };

        // Validate form
        if (!data.name || !data.email || !data.message) {
            showNotification('Please fill in all fields', 'error');
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }

        try {
            // Disable submit button to prevent duplicate submissions
            const submitBtn = form.querySelector('.submit-button');
            const originalText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';

            // Simulate form submission (replace with actual backend call)
            await new Promise(resolve => setTimeout(resolve, 1500));

            // In a real application, you would send the data to a server:
            // const response = await fetch('/api/contact', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(data)
            // });
            // if (!response.ok) throw new Error('Failed to send message');

            // Show success message
            showNotification('Message sent successfully! I\'ll get back to you soon.', 'success');
            form.reset();

            // Reset button
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;

        } catch (error) {
            showNotification('Failed to send message. Please try again later.', 'error');
            const submitBtn = form.querySelector('.submit-button');
            submitBtn.disabled = false;
            submitBtn.textContent = 'Send Message';
        }
    });
};

// ========================================
// NOTIFICATION SYSTEM
// ========================================

/**
 * Display toast notification
 * @param {string} message - Notification message
 * @param {string} type - Notification type: 'success' or 'error'
 */
const showNotification = (message, type = 'success') => {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Add styles (inline for simplicity)
    const style = document.createElement('style');
    if (!document.querySelector('style[data-notification]')) {
        style.setAttribute('data-notification', 'true');
        style.textContent = `
            .notification {
                position: fixed;
                bottom: 30px;
                right: 30px;
                padding: 16px 24px;
                border-radius: 8px;
                color: white;
                font-weight: 500;
                z-index: 2000;
                animation: slideInUp 0.3s ease-out;
                max-width: 400px;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
            }

            .notification-success {
                background-color: #10b981;
            }

            .notification-error {
                background-color: #ef4444;
            }

            @keyframes slideInUp {
                from {
                    transform: translateY(100px);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }

            @media (max-width: 480px) {
                .notification {
                    bottom: 20px;
                    right: 20px;
                    left: 20px;
                    max-width: none;
                }
            }
        `;
        document.head.appendChild(style);
    }

    document.body.appendChild(notification);

    // Auto-remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideInDown 0.3s ease-out forwards';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
};

// ========================================
// CTA BUTTON SCROLL
// ========================================

/**
 * Handle CTA button click to scroll to projects
 */
const initCTAButton = () => {
    const ctaButton = document.querySelector('.cta-button');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            const projectsSection = document.querySelector('#projects');
            if (projectsSection) {
                const offsetTop = projectsSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }
};

// ========================================
// EXTERNAL LINK HANDLING
// ========================================

/**
 * Update social and project links
 * Replace placeholder URLs with actual links
 */
const updateLinks = () => {
    // Update social links (example)
    const socialLinks = {
        github: 'https://github.com/yourusername',
        twitter: 'https://twitter.com/yourusername',
        linkedin: 'https://linkedin.com/in/yourprofile',
        email: 'mailto:your.email@example.com'
    };

    // Update project links (edit these with your actual projects)
    const projectLinks = document.querySelectorAll('.project-link');
    
    // You can customize each project's links individually
    // Example:
    // projectLinks[0].href = 'https://your-project-1.com';
    // projectLinks[1].href = 'https://github.com/yourproject';

    // For now, they remain as placeholders that you can edit in HTML
};

// ========================================
// NAVBAR ACTIVE LINK TRACKING
// ========================================

/**
 * Update active navigation link based on current scroll position
 */
const initNavbarTracking = () => {
    const navLinks = document.querySelectorAll('.nav-link');

    const updateActiveLink = () => {
        let current = '';

        navLinks.forEach(link => {
            const sectionId = link.getAttribute('href').slice(1);
            const section = document.getElementById(sectionId);

            if (section) {
                const sectionTop = section.offsetTop - 100;
                const sectionHeight = section.offsetHeight;

                if (window.pageYOffset >= sectionTop && 
                    window.pageYOffset < sectionTop + sectionHeight) {
                    current = sectionId;
                }
            }
        });

        navLinks.forEach(link => {
            link.style.color = '';
            if (link.getAttribute('href').slice(1) === current) {
                link.style.color = 'var(--primary)';
            }
        });
    };

    window.addEventListener('scroll', updateActiveLink);
};

// ========================================
// PARALLAX EFFECT (Optional)
// ========================================

/**
 * Add subtle parallax effect to hero section
 */
const initParallax = () => {
    const hero = document.querySelector('.hero');

    if (!hero) return;

    window.addEventListener('scroll', () => {
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPosition = `0% ${scrollPosition * 0.5}px`;
    });
};

// ========================================
// PERFORMANCE CHECK
// ========================================

/**
 * Throttle function to limit how often a function can be called
 */
const throttle = (func, delay) => {
    let lastCall = 0;
    return (...args) => {
        const now = Date.now();
        if (now - lastCall >= delay) {
            lastCall = now;
            func(...args);
        }
    };
};

// ========================================
// INITIALIZE ALL FEATURES
// ========================================

/**
 * Initialize all JavaScript features when DOM is ready
 */
document.addEventListener('DOMContentLoaded', () => {
    // Initialize features
    initScrollAnimations();
    initNameToggle();
    initMobileMenu();
    initSmoothScroll();
    initContactForm();
    initCTAButton();
    initNavbarTracking();
    initParallax();
    updateLinks();

    console.log('Portfolio initialized successfully! 🚀');
});

// ========================================
// KEYBOARD NAVIGATION
// ========================================

/**
 * Handle Escape key to close mobile menu
 */
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');

        if (navMenu && hamburger) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    }
});

// ========================================
// ACCESSIBILITY - FOCUS VISIBLE
// ========================================

/**
 * Show focus outline for keyboard navigation
 */
document.addEventListener('keydown', () => {
    document.body.classList.add('keyboard-nav');
});

document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// Add style for keyboard navigation
const style = document.createElement('style');
style.textContent = `
    body.keyboard-nav a:focus,
    body.keyboard-nav button:focus,
    body.keyboard-nav input:focus,
    body.keyboard-nav textarea:focus {
        outline: 2px solid var(--primary);
        outline-offset: 2px;
    }
`;
document.head.appendChild(style);
