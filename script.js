const API_KEY = '2OVik4j3_eCbpfIFJOcJl';

// 1. Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('is-active');
    navMenu.classList.toggle('active');
});

// 2. Fetch Verse (Votre code optimisé)
const verseElement = document.getElementById('quote-text');
const verseReferenceElement = document.getElementById('quote-ref');

function fetchVerse() {
    const apiUrl = 'https://bible-api.com/?random=verse&translation=ls1910';
    
    // Placeholder while loading
    verseElement.innerHTML = '<i class="fa fa-spinner fa-spin"></i> Recherche...';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const verseText = data.text.trim(); 
            const verseReference = data.reference;
            verseElement.innerHTML = `"${verseText}"`;
            verseReferenceElement.textContent = verseReference;
        })
        .catch(error => {
<<<<<<< Updated upstream
            console.error('Error:', error);
            verseElement.textContent = 'Car Dieu a tant aimé le monde qu\'il a donné son Fils unique.';
=======
            console.error('Error fetching verse:', error);
            // Fallback verse in French if the API fails
            verseElement.textContent = '\"Car Dieu a tant aimé le monde qu\'il a donné son Fils unique.\"';
>>>>>>> Stashed changes
            verseReferenceElement.textContent = 'Jean 3:16';
        });
}

// 3. Date Display in Footer
const dateTodayElement = document.getElementById('dateToday');
function displayDate() {
    if (dateTodayElement) {
        const currentDate = new Date();
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const formattedDate = currentDate.toLocaleDateString('fr-FR', options);
        dateTodayElement.textContent = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    }
}

// 4. Scroll Animations (Simple Intersection Observer)
const observerOptions = { threshold: 0.1 };

<<<<<<< Updated upstream
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right').forEach(el => {
    observer.observe(el);
});

// Init
fetchVerse();
displayDate();
=======
// Refresh verse every 24 hours
setInterval(function () {
    fetchVerse();
    displayDate();
}, 24 * 60 * 60 * 1000);


// google translate element
function googleTranslateElementInit() {
    new google.translate.TranslateElement({ pageLanguage: 'fr' }, 'google_translate_element');
}


/* --- FONCTION RETOUR EN HAUT --- */
const backToTop = document.getElementById("backToTop");

window.onscroll = function() {
    // Vérifie si l'élément existe pour éviter des erreurs sur d'autres pages
    if (backToTop) {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            backToTop.classList.add("show");
        } else {
            backToTop.classList.remove("show");
        }
    }
};

// Optionnel : Ajoute un défilement fluide (smooth scroll) lors du clic
if (backToTop) {
    backToTop.addEventListener("click", function(e) {
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
>>>>>>> Stashed changes
