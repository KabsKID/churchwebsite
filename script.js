const API_KEY = '2OVik4j3_eCbpfIFJOcJl';
const BIBLE_ID = '7ad4325247fb36aa-01'; // Louis Segond 1910 (French)

// 1. Select the elements
const verseElement = document.getElementById('quote-text');
const verseReferenceElement = document.getElementById('quote-ref');
const dateTodayElement = document.getElementById('dateToday');

function fetchVerse() {
    // We use bible-api.com because it supports the French 'Louis Segond' translation
    const apiUrl = 'https://bible-api.com/?random=verse&translation=ls1910';

    // Show a loading text while waiting
    verseElement.innerHTML = '<span style="font-size:16px;">Chargement...</span>';

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // This API returns a single object, not an array
            // .trim() removes any extra spaces around the text
            const verseText = data.text.trim(); 
            const verseReference = data.reference;
            
            // Update HTML
            verseElement.innerHTML = `<span>"${verseText}"</span>`;
            verseReferenceElement.textContent = verseReference;
        })
        .catch(error => {
            console.error('Error fetching verse:', error);
            // Fallback verse in French if the API fails
            verseElement.textContent = '\"Car Dieu a tant aimé le monde qu\'il a donné son Fils unique.\"';
            verseReferenceElement.textContent = 'Jean 3:16';
        });
}

function displayDate() {
    if (dateTodayElement) {
        const currentDate = new Date();
        // Set date options to French
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        
        // This formats the date in French (e.g., "mardi 6 janvier 2026")
        const formattedDate = currentDate.toLocaleDateString('fr-FR', options);
        
        // Capitalize the first letter for better style
        dateTodayElement.textContent = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    }
}

// 4. Scroll Animations (Simple Intersection Observer)
const observerOptions = { threshold: 0.1 };

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
