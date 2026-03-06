/* --- FONCTION RETOUR EN HAUT --- */
window.onscroll = function() {
    const btn = document.getElementById("backToTop");
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        btn.classList.add("show"); // On ajoute la classe CSS
    } else {
        btn.classList.remove("show"); // On l'enlève
    }
};

// Gestion du clic (Vérifie bien que l'élément existe)
const backToTopBtn = document.getElementById("backToTop");
if (backToTopBtn) {
    backToTopBtn.addEventListener("click", function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
}

/* --- GESTION DU SLIDER 5 IMAGES --- */
function startHeroSlider() {
    const slides = document.querySelectorAll('.banner-slider .hero-slide');
    let currentSlide = 0;
    const totalSlides = slides.length;

    if (totalSlides > 0) {
        setInterval(() => {
            // Retire la classe active de l'image actuelle
            slides[currentSlide].classList.remove('active');
            
            // Passe à l'image suivante (boucle de 0 à 4)
            currentSlide = (currentSlide + 1) % totalSlides;
            
            // Ajoute la classe active à la nouvelle image
            slides[currentSlide].classList.add('active');
        }, 5000); // Temps d'affichage : 5 secondes
    }
}

// Initialisation au chargement de la page
document.addEventListener("DOMContentLoaded", () => {
    startHeroSlider();
    
    // Tes autres fonctions existantes (Bible, Date, etc.)
    if (typeof fetchVerse === "function") fetchVerse();
    if (typeof displayDate === "function") displayDate();
});


