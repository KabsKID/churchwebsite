// ==========================================
// 1. MENU MOBILE
// ==========================================
(function() {
    document.addEventListener('DOMContentLoaded', function() {
        const menuToggle = document.getElementById('mobile-menu');
        const navMenu = document.getElementById('nav-menu');
        const header = document.querySelector('header');

        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                menuToggle.classList.toggle('active');
                const icon = menuToggle.querySelector('i');
                if (navMenu.classList.contains('active')) {
                    icon.classList.replace('fa-bars', 'fa-times');
                    header.style.position = 'fixed'; // ← fixes header when menu opens
                } else {
                    icon.classList.replace('fa-times', 'fa-bars');
                    header.style.position = 'absolute'; // ← back to normal when menu closes
                }
            });
        }
    });
})();
