document.addEventListener("DOMContentLoaded", () => {
    
    // 1. BANNIÈRE HERO - SLIDER AUTO (5 IMAGES)
    const heroSlides = document.querySelectorAll('.hero-slide');
    if(heroSlides.length > 0) {
        let currentHero = 0;
        setInterval(() => {
            heroSlides[currentHero].classList.remove('active');
            currentHero = (currentHero + 1) % heroSlides.length;
            heroSlides[currentHero].classList.add('active');
        }, 5000);
    }

    // 2. FAQ - ACCORDÉONS (CLIC SUR TOUTE LA LIGNE)
    const faqItems = document.querySelectorAll('.accordion-item');
    faqItems.forEach(item => {
        item.addEventListener('click', () => {
            item.classList.toggle('active');
        });
    });

    // 3. CAROUSEL CROYANCES (FLÈCHES + BOUTON PLUS)
    const beliefTrack = document.getElementById('beliefsTrack');
    const prevB = document.getElementById('prevBelief');
    const nextB = document.getElementById('nextBelief');
    if(beliefTrack && prevB && nextB) {
        prevB.addEventListener('click', () => beliefTrack.scrollBy({ left: -340, behavior: 'smooth' }));
        nextB.addEventListener('click', () => beliefTrack.scrollBy({ left: 340, behavior: 'smooth' }));
    }
    // Bouton "+" spécifique dans les cartes croyances
    document.querySelectorAll('.expand-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation(); // Évite de scroller la page
            btn.closest('.belief-card').classList.toggle('open');
        });
    });

    // 4. SLIDER REPRÉSENTANTS
const track = document.getElementById('sliderTrack');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');

let index = 0;

if (track && nextBtn && prevBtn) {
    const slides = document.querySelectorAll('.slide');
    
    nextBtn.addEventListener('click', () => {
        index++;
        if (index >= slides.length) index = 0; // Boucle au début
        updateSlider();
    });

    prevBtn.addEventListener('click', () => {
        index--;
        if (index < 0) index = slides.length - 1; // Boucle à la fin
        updateSlider();
    });

    function updateSlider() {
        // Cette ligne utilise le CSS 'transition' que tu as défini
        track.style.transform = `translateX(-${index * 100}%)`;
    }
}
});