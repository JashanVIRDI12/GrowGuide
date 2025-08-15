// Enhanced JavaScript with animations
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle with animation
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            if (mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.remove('hidden');
                mobileMenu.classList.add('animate-slide-down');
            } else {
                mobileMenu.classList.add('hidden');
            }
        });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
                entry.target.classList.add('animate-fade-in-up');
            }
        });
    }, observerOptions);

    // Observe elements for scroll animations
    document.querySelectorAll('.stagger-item').forEach(el => {
        observer.observe(el);
    });

    // Form submissions with enhanced animations
    const medicalForm = document.getElementById('medical-tourism-form');
    const financeForm = document.getElementById('finance-form');

    if (medicalForm) {
        medicalForm.addEventListener('submit', handleFormSubmit);
    }

    if (financeForm) {
        financeForm.addEventListener('submit', handleFormSubmit);
    }

    // Enhanced form submission handler
    function handleFormSubmit(e) {
        e.preventDefault();

        const form = e.target;
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;

        // Validate form
        if (!validateForm(form)) {
            return;
        }

        // Show loading animation
        submitBtn.innerHTML = '<span class="loading"></span> Sending...';
        submitBtn.disabled = true;
        submitBtn.classList.add('animate-pulse');

        // Simulate form submission
        setTimeout(() => {
            // Reset form with animation
            form.reset();
            form.classList.add('animate-fade-in-up');

            // Show success message
            showMessage('Thank you! Your inquiry has been submitted successfully. We will get back to you within 24 hours.', 'success');

            // Reset button
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            submitBtn.classList.remove('animate-pulse');
        }, 2000);
    }

    // Enhanced form validation
    function validateForm(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
        let isValid = true;

        inputs.forEach(input => {
            input.classList.remove('border-red-accent', 'animate-bounce');

            if (!input.value.trim()) {
                input.classList.add('border-red-accent', 'animate-bounce');
                isValid = false;
            } else if (input.type === 'email' && !isValidEmail(input.value)) {
                input.classList.add('border-red-accent', 'animate-bounce');
                isValid = false;
            }
        });

        if (!isValid) {
            showMessage('Please fill in all required fields correctly.', 'error');
        }

        return isValid;
    }

    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Enhanced message display with animations
    function showMessage(message, type) {
        // Remove existing messages
        const existingMessage = document.querySelector('.alert-message');
        if (existingMessage) {
            existingMessage.classList.add('animate-fade-out');
            setTimeout(() => existingMessage.remove(), 300);
        }

        // Create message element with color scheme
        const messageDiv = document.createElement('div');
        const bgColor = type === 'success' ? 'bg-green-accent' : 'bg-red-accent';
        messageDiv.className = `alert-message fixed top-20 right-4 z-50 p-4 rounded-lg shadow-lg max-w-md ${bgColor} text-white animate-slide-down`;
        messageDiv.textContent = message;

        // Add close button
        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '×';
        closeBtn.className = 'ml-2 text-white hover:text-gray-200 text-xl leading-none';
        closeBtn.onclick = () => {
            messageDiv.classList.add('animate-fade-out');
            setTimeout(() => messageDiv.remove(), 300);
        };
        messageDiv.appendChild(closeBtn);

        // Add to page
        document.body.appendChild(messageDiv);

        // Auto remove after 5 seconds
        setTimeout(() => {
            if (messageDiv.parentNode) {
                messageDiv.classList.add('animate-fade-out');
                setTimeout(() => messageDiv.remove(), 300);
            }
        }, 5000);
    }

    // Parallax effect for hero sections
    const heroSections = document.querySelectorAll('section[class*="gradient"]');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        heroSections.forEach(section => {
            const rate = scrolled * -0.5;
            section.style.transform = `translate3d(0, ${rate}px, 0)`;
        });
    });

    // Dropdown menu animations
    const dropdownTriggers = document.querySelectorAll('.group');

    dropdownTriggers.forEach(trigger => {
        const dropdown = trigger.querySelector('.dropdown-menu');

        trigger.addEventListener('mouseenter', () => {
            if (dropdown) {
                dropdown.classList.add('show');
            }
        });

        trigger.addEventListener('mouseleave', () => {
            if (dropdown) {
                dropdown.classList.remove('show');
            }
        });
    });

    // Counter animation for stats (if needed)
    function animateCounter(element, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            element.textContent = Math.floor(progress * (end - start) + start);
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    // Add hover effects to cards
    const cards = document.querySelectorAll('.card-shadow');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('hover-shadow');
        });

        card.addEventListener('mouseleave', function() {
            this.classList.remove('hover-shadow');
        });
    });
});

// Additional CSS for fade-out animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; transform: translateY(0); }
        to { opacity: 0; transform: translateY(-10px); }
    }
    
    .animate-fade-out {
        animation: fadeOut 0.3s ease forwards;
    }
`;
document.head.appendChild(style);
