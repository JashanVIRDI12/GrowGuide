document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');

    mobileMenuBtn.addEventListener('click', function() {
        console.log('Mobile menu button clicked'); // Debug check
        navMenu.classList.toggle('active');
    });
});



