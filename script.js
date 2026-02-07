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
            console.error('Error:', error);
            verseElement.textContent = 'Car Dieu a tant aimé le monde qu\'il a donné son Fils unique.';
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