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
            verseElement.textContent = 'Car Dieu a tant aimé le monde qu\'il a donné son Fils unique.';
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

// Run immediately since the script is now at the bottom of the HTML
fetchVerse();
displayDate();

// Refresh verse every 24 hours
setInterval(function () {
    fetchVerse();
    displayDate();
}, 24 * 60 * 60 * 1000);
