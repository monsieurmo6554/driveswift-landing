// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animate hamburger bars
        const bars = navToggle.querySelectorAll('.bar');
        if (navMenu.classList.contains('active')) {
            bars[0].style.transform = 'rotate(-45deg) translate(-5px, 6px)';
            bars[1].style.opacity = '0';
            bars[2].style.transform = 'rotate(45deg) translate(-5px, -6px)';
        } else {
            bars[0].style.transform = 'rotate(0) translate(0, 0)';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'rotate(0) translate(0, 0)';
        }
    });

    // Close mobile menu when clicking on links
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            
            // Reset hamburger bars
            const bars = navToggle.querySelectorAll('.bar');
            bars[0].style.transform = 'rotate(0) translate(0, 0)';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'rotate(0) translate(0, 0)';
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
            
            // Reset hamburger bars
            const bars = navToggle.querySelectorAll('.bar');
            bars[0].style.transform = 'rotate(0) translate(0, 0)';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'rotate(0) translate(0, 0)';
        }
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.feature-card-large, .performance-stat, .testimonial-card, .dvsa-feature');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Counter animation for statistics
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16); // 60 FPS
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        
        // Format the number based on the target
        if (target === 94) {
            element.textContent = Math.floor(current) + '%';
        } else if (target === 4.8) {
            element.textContent = current.toFixed(1) + 's';
        } else if (target === 36) {
            element.textContent = Math.floor(current);
        } else if (target === 2.1) {
            element.textContent = current.toFixed(1) + 's';
        } else if (target === 100) {
            element.textContent = Math.floor(current) + '%';
        }
    }, 16);
}

// Trigger counter animations when stats come into view
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const text = statNumber.textContent;
            
            // Extract number from text
            let target;
            if (text.includes('94%')) target = 94;
            else if (text.includes('4.8s')) target = 4.8;
            else if (text.includes('36')) target = 36;
            else if (text.includes('2.1s')) target = 2.1;
            else if (text.includes('100%')) target = 100;
            
            if (target) {
                statNumber.textContent = '0';
                animateCounter(statNumber, target);
                statsObserver.unobserve(entry.target);
            }
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
    const statElements = document.querySelectorAll('.performance-stat, .hero-stats .stat');
    statElements.forEach(stat => {
        statsObserver.observe(stat);
    });
});

// App store button interactions
document.addEventListener('DOMContentLoaded', function() {
    const appStoreButtons = document.querySelectorAll('.app-store-btn');
    
    appStoreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            // You can replace these with actual App Store links
            const isAppleStore = this.querySelector('img').src.includes('app-store');
            
            if (isAppleStore) {
                // Replace with actual App Store URL
                console.log('Redirecting to App Store...');
                // window.open('https://apps.apple.com/app/driveswift', '_blank');
            } else {
                // Replace with actual Google Play URL
                console.log('Redirecting to Google Play...');
                // window.open('https://play.google.com/store/apps/details?id=com.driveswift', '_blank');
            }
        });
    });
});

// Form handling (if you add a contact form later)
function handleFormSubmission(formElement) {
    formElement.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = new FormData(this);
        const formObject = Object.fromEntries(formData);
        
        // Here you would typically send the data to your backend
        console.log('Form submitted:', formObject);
        
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'success-message';
        successMessage.innerHTML = '<i class="fas fa-check-circle"></i> Thank you! We\'ll be in touch soon.';
        successMessage.style.cssText = `
            background: linear-gradient(135deg, var(--success), var(--success-light));
            color: white;
            padding: 1rem;
            border-radius: 8px;
            margin-top: 1rem;
            display: flex;
            align-items: center;
            gap: 0.5rem;
        `;
        
        this.appendChild(successMessage);
        this.reset();
        
        setTimeout(() => {
            successMessage.remove();
        }, 5000);
    });
}

// Add smooth scroll behavior for better UX
document.documentElement.style.scrollBehavior = 'smooth';

// Add loading animation for images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        if (!img.complete) {
            img.addEventListener('load', function() {
                this.style.opacity = '0';
                this.style.transition = 'opacity 0.3s ease';
                setTimeout(() => {
                    this.style.opacity = '1';
                }, 50);
            });
        }
    });
});

// Performance optimization: Lazy load images
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading if needed
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Add keyboard navigation support
document.addEventListener('keydown', function(e) {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        const navMenu = document.getElementById('nav-menu');
        const navToggle = document.getElementById('nav-toggle');
        
        if (navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            
            // Reset hamburger bars
            const bars = navToggle.querySelectorAll('.bar');
            bars[0].style.transform = 'rotate(0) translate(0, 0)';
            bars[1].style.opacity = '1';
            bars[2].style.transform = 'rotate(0) translate(0, 0)';
        }
    }
});

// Add focus management for accessibility
document.addEventListener('DOMContentLoaded', function() {
    const focusableElements = document.querySelectorAll(
        'a, button, input, textarea, select, details, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid var(--primary)';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = 'none';
        });
    });
});

// Console welcome message
console.log(`
🚗 DriveSwift - DVSA Licensed Content
📱 Built for UK driving test success
💡 94% pass rate with DVSA licensed content

Interested in the tech behind this page?
Get in touch: hello@driveswift.co.uk
`);

// Analytics tracking (placeholder)
function trackEvent(eventName, properties = {}) {
    console.log('Event tracked:', eventName, properties);
    // Replace with actual analytics implementation
    // gtag('event', eventName, properties);
    // analytics.track(eventName, properties);
}

// Track key user interactions
document.addEventListener('DOMContentLoaded', function() {
    // Track CTA clicks
    document.querySelectorAll('.btn-primary').forEach(button => {
        button.addEventListener('click', function() {
            trackEvent('CTA_Click', {
                button_text: this.textContent.trim(),
                section: this.closest('section')?.className || 'unknown'
            });
        });
    });
    
    // Track app store button clicks
    document.querySelectorAll('.app-store-btn').forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.querySelector('img').src.includes('app-store') ? 'iOS' : 'Android';
            trackEvent('App_Store_Click', { platform });
        });
    });
    
    // Track section views
    const sections = document.querySelectorAll('section[id]');
    const sectionObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                trackEvent('Section_View', {
                    section_id: entry.target.id,
                    section_name: entry.target.className
                });
            }
        });
    }, { threshold: 0.5 });
    
    sections.forEach(section => {
        sectionObserver.observe(section);
    });
});