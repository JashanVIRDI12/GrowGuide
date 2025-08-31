// Smooth Intersection Observer Animations
document.addEventListener('DOMContentLoaded', function() {
    // Intersection Observer for smooth animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all stagger items and cards
    const animatedElements = document.querySelectorAll('.stagger-item, .card, .process-card, .fade-in-on-scroll');
    animatedElements.forEach(el => {
        observer.observe(el);
    });

    // Smooth scroll for navigation links
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add entrance animation class to body
    document.body.classList.add('page-loaded');
});

// Add CSS for page load animation
const style = document.createElement('style');
style.textContent = `
    .page-loaded .stagger-item {
        animation-play-state: running;
    }
    
    .page-loaded .section-header {
        animation-play-state: running;
    }
    
    /* Prevent animations from running before page load */
    .stagger-item, .section-header {
        animation-play-state: paused;
    }
`;
document.head.appendChild(style);
