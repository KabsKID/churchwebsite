document.addEventListener("DOMContentLoaded", () => {

    // 1. FAQ - ACCORDÉONS
    const faqItems = document.querySelectorAll('.accordion-item');
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });

// Remplace ton bloc JS par celui-ci
const beliefWrapper = document.querySelector('.beliefs-slider-container');
const btnNext = document.getElementById('beliefNext');
const btnPrev = document.getElementById('beliefPrev');

if (beliefWrapper && btnNext && btnPrev) {
    btnNext.addEventListener('click', () => {
        // On fait défiler de 300px vers la droite
        beliefWrapper.scrollTo({
            left: beliefWrapper.scrollLeft + 300,
            behavior: 'smooth'
        });
    });

    btnPrev.addEventListener('click', () => {
        // On fait défiler de 300px vers la gauche
        beliefWrapper.scrollTo({
            left: beliefWrapper.scrollLeft - 300,
            behavior: 'smooth'
        });
    });
}

    // 3. SLIDER REPRÉSENTANTS
    const repContainer = document.querySelector('.slider-track-container');
    const repNext = document.querySelector('.next-btn');
    const repPrev = document.querySelector('.prev-btn');

    if (repContainer && repNext && repPrev) {
        repNext.addEventListener('click', () => {
            const step = repContainer.clientWidth / (window.innerWidth < 768 ? 1 : 3);
            repContainer.scrollBy({ left: step, behavior: 'smooth' });
        });

        repPrev.addEventListener('click', () => {
            const step = repContainer.clientWidth / (window.innerWidth < 768 ? 1 : 3);
            repContainer.scrollBy({ left: -step, behavior: 'smooth' });
        });
    }

    // 4. BANNIÈRE HERO AUTO-SLIDER
    const heroSlides = document.querySelectorAll('.hero-slide');
    if (heroSlides.length > 0) {
        let currentHero = 0;
        setInterval(() => {
            heroSlides[currentHero].classList.remove('active');
            currentHero = (currentHero + 1) % heroSlides.length;
            heroSlides[currentHero].classList.add('active');
        }, 5000);
    }
});