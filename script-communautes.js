// ==========================================
// 1. VARIABLES GLOBALES (Sécurisées pour éviter les doublons)
// ==========================================
if (typeof map === 'undefined') {
var map; 
var markers = [];
}

const churches = [
{ name: "ENAA Bruxelles", city: "Bruxelles", country: "Belgique", lat: 50.8503, lng: 4.3517, address: "Boulevard Lambermont 1" },
{ name: "ENAA Wallonie", city: "Liège", country: "Belgique", lat: 50.6253, lng: 5.5681, address: "Rue Nicolas PIETKIN 14, 4000 Liège" },
{ name: "ENAA Paris", city: "Paris", country: "France", lat: 48.8566, lng: 2.3522, address: "Rue de Rivoli" },
{ 
name: "ENAA Goma", 
city: "Goma", 
country: "RDC", 
lat: -1.6551955750051213, 
lng: 29.20132420185129,   
address: "Goma, RDC" 
},
{ name: "ENAA Gulf Shores", city: "Gulf Shores", country: "USA", lat: 30.2705, lng: -87.6853, address: "541 Cotton Creek Drive" },
{ name: "Authentic New Apostolate Church London", city: "London", country: "Royaume-Uni", lat: 51.5670, lng: -0.1265, address: "Hanley Community Centre Crouch Hill, N4 4BY" },
{ name: "ENAAI Québec City", city: "Québec", country: "Canada", lat: 46.8299, lng: -71.2183, address: "2025 Rue Adjutor Rivard, 2e étage" },
{ name: "ENAA Canada Montréal", city: "Montréal", country: "Canada", lat: 45.5561, lng: -73.5937, address: "7501 rue François Perrault" },
{ name: "ENAA Finlande Raisio", city: "Raisio", country: "Finlande", lat: 60.4855, lng: 22.1624, address: "KEONKATU 5A10, 21200 RAISIO" },
{ name: "ENAA Finlande Vantaa", city: "Vantaa", country: "Finlande", lat: 60.2931, lng: 24.8631, address: "LAAJAVUORENKUJA 5 A12, 01620 VANTAA" }
];

// ==========================================
// 2. INITIALISATION
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
const mapElement = document.getElementById('map');

if (mapElement) {
// Initialisation de la carte une seule fois
map = L.map('map').setView([20, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Ecouteur pour la recherche
const cityInput = document.getElementById('cityInput');
if (cityInput) {
    cityInput.addEventListener('keypress', function (e) {
        if (e.key === 'Enter') searchChurch();
    });
}
}
});
// ==========================================
// 3. FONCTIONS (Recherche & Affichage)
// ==========================================

function getDistance(lat1, lon1, lat2, lon2) {
const R = 6371; 
const dLat = (lat2 - lat1) * Math.PI / 180;
const dLon = (lon2 - lon1) * Math.PI / 180;
const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
Math.sin(dLon / 2) * Math.sin(dLon / 2);
const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
return R * c;
}

async function searchChurch() {
const query = document.getElementById('cityInput').value.trim();
const resultsList = document.getElementById('resultsList');
if (!query) return;

resultsList.innerHTML = '<p class="loading-msg">Recherche en cours...</p>';

const geoResponse = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}&addressdetails=1`);
const geoData = await geoResponse.json();

if (geoData.length === 0) {
resultsList.innerHTML = `<p class="error-msg">Lieu introuvable.</p>`;
return;
}

const userLat = parseFloat(geoData[0].lat);
const userLng = parseFloat(geoData[0].lon);
const apiCountry = geoData[0].address.country;

const countryMap = {
"République Démocratique du Congo": "RDC", "Congo": "RDC","DR Congo": "RDC", "Belgique": "Belgique","België": "Belgique",
"France": "France", "United States": "USA", "États-Unis": "USA", "Canada": "Canada",
"Finland": "Finlande", "United Kingdom": "Royaume-Uni"
};

const standardizedCountry = countryMap[apiCountry] || apiCountry;

let filteredChurches = churches
.filter(c => c.country.toLowerCase() === standardizedCountry.toLowerCase())
.map(c => ({ ...c, distance: getDistance(userLat, userLng, c.lat, c.lng) }))
.sort((a, b) => a.distance - b.distance);

if (filteredChurches.length > 0) {
map.setView([userLat, userLng], 5);
displayResults(filteredChurches);
} else {
map.setView([userLat, userLng], 4);
    resultsList.innerHTML = `
        <div class="no-result-card">
            <i class="fa fa-exclamation-triangle"></i>
            <p>Aucune communauté ENAA trouvée pour : <strong>${apiCountry}</strong>.</p>
            <p>Contactez notre support pour plus d'informations :</p>
            
            <a href="https://api.whatsapp.com/send?phone=+32488367435&text=Bonjour%20ENA-Authentique%2C%20j%27aimerais%20discuter." class="btn-contact" target="_blank">
                <i class="fa fa-whatsapp"></i> +32 488 36 74 35
            </a>

            <a href="https://api.whatsapp.com/send?phone=+32488916426&text=Bonjour%20ENA-Authentique%2C%20j%27aimerais%20discuter." class="btn-contact" target="_blank">
                <i class="fa fa-whatsapp"></i> +32 488 91 64 26
            </a>
        </div>
    `; 
}
}

function displayResults(churchList) {
const list = document.getElementById('resultsList');
list.innerHTML = "";

// Nettoyer les anciens marqueurs
markers.forEach(marker => map.removeLayer(marker));
markers = [];

churchList.forEach((church, index) => {
// Ajouter marqueur sur la carte Leaflet
const marker = L.marker([church.lat, church.lng]).addTo(map);
marker.bindPopup(`<b>${church.name}</b><br>${church.address}`);
markers.push(marker);

// Créer l'élément de liste
const div = document.createElement('div');
div.className = "church-item-modern";
if (index === 0) div.classList.add('closest');

// --- CORRECTION ICI : URL pour itinéraire direct avec adresse complète ---
const fullAddress = `${church.address}, ${church.city}`;
const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(fullAddress)}`;

div.innerHTML = `
    <div class="church-info">
        <div class="church-header">
            <h4>${church.name}</h4>
            ${index === 0 ? '<span class="badge">PROCHE</span>' : ''}
        </div>
        <p><i class="fa fa-map-marker"></i> ${church.address}, ${church.city}</p>
        
        <div class="church-footer">
            <span class="distance"><strong>${church.distance.toFixed(1)}</strong> km</span>
            <a href="${googleMapsUrl}" target="_blank" class="btn-gps-action">
                <span>Y aller</span>
                <i class="fa fa-location-arrow"></i>
            </a>
        </div>
    </div>
`;

// COMPORTEMENT AU CLIC :
div.onclick = (e) => {
    if (!e.target.closest('.btn-gps-action')) {
        map.setView([church.lat, church.lng], 15);
        marker.openPopup();
    }
};

list.appendChild(div);
});
}

// ==========================================
// 2. GESTION DU MODAL ET RECHERCHE COMMUNAUTÉ
// ==========================================

const communauteInput = document.getElementById('communauteInput');
const communauteList = document.getElementById('communauteList');
const selectedCommunaute = document.getElementById('selectedCommunaute');

// Fonction pour ouvrir le modal
function openModal() {
document.getElementById('visiteModal').style.display = 'flex';
}

// Fonction pour fermer le modal
function closeModal() {
document.getElementById('visiteModal').style.display = 'none';
communauteList.style.display = 'none'; // Cache aussi la liste
}

// Fonction de recherche dynamique
communauteInput.addEventListener('input', function() {
const val = this.value.toLowerCase();
communauteList.innerHTML = '';

if (!val) {
communauteList.style.display = 'none';
return;
}

// Filtrer la liste globale 'churches' que tu as déjà définie
const filtered = churches.filter(c => 
c.city.toLowerCase().includes(val) || c.name.toLowerCase().includes(val)
);

if (filtered.length > 0) {
communauteList.style.display = 'block';
filtered.forEach(church => {
    const li = document.createElement('li');
    li.textContent = `${church.name} (${church.city})`;
    li.onclick = () => {
        communauteInput.value = `${church.name} (${church.city})`;
        selectedCommunaute.value = church.name; // On stocke la valeur réelle

        // NOUVEAU : On injecte le lien Maps correspondant à l'objet 'church' trouvé
const hiddenMap = document.getElementById('lien_maps_hidden');
if (hiddenMap) {
// Tu peux construire l'URL ici ou utiliser une propriété de ton objet 'church'
// Exemple simple :
// Remplace ta ligne par celle-ci (avec les backticks au début et à la fin) :
hiddenMap.value = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(church.address + ', ' + church.city)}`;}
        communauteList.style.display = 'none';
    };
    communauteList.appendChild(li);
});
} else {
communauteList.style.display = 'none';
}
});

// Fermer la liste si on clique ailleurs sur la page
document.addEventListener('click', (e) => {
if (!e.target.closest('.custom-select-container')) {
communauteList.style.display = 'none';
}
});

/*--GEOLOCALISER L'utilisateur--*/
async function detecterMaVilleAutomatique() {
const villeInput = document.getElementById('villeInput');
const spinner = document.querySelector('.spinner');

// 1. Si déjà rempli, on ne fait rien
if (villeInput.value.trim() !== "" && villeInput.value !== "Localisation...") return;

// 2. Vérifier le cache (si déjà détecté une fois)
const cachedCity = localStorage.getItem('userCity');
if (cachedCity) {
villeInput.value = cachedCity;
return;
}

// 3. Lancer la détection
villeInput.value = "Localisation...";
if (spinner) spinner.style.display = 'block';

if (navigator.geolocation) {
// Ajout d'un timeout de 5 secondes pour ne pas bloquer l'utilisateur
const options = { timeout: 5000, enableHighAccuracy: false };

navigator.geolocation.getCurrentPosition(async (position) => {
    const { latitude, longitude } = position.coords;
    
    try {
        const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=10`;
        const response = await fetch(url);
        const data = await response.json();
        
        const lieu = data.address.city || data.address.town || data.address.village || data.address.municipality;
        
        if (lieu) {
            villeInput.value = lieu;
            localStorage.setItem('userCity', lieu); // On cache la ville
        } else {
            villeInput.value = "";
        }
    } catch (err) {
        console.error("Erreur de géocodage", err);
        villeInput.value = "";
    } finally {
        if (spinner) spinner.style.display = 'none';
    }
}, (err) => {
    console.warn("Permission refusée ou erreur GPS", err);
    villeInput.value = "";
    if (spinner) spinner.style.display = 'none';
}, options);
} else {
villeInput.value = "";
if (spinner) spinner.style.display = 'none';
}
}

/*--- EMAIL DE CONTACT ---*/
// 1. Initialisation avec ta Public Key
(function(){
emailjs.init("sWqLmUsQMn3Kpfhmn"); // Remplace par ta propre Public Key EmailJS
})();

// 2. Gestion de l'envoi au clic sur le bouton
document.getElementById('visitForm').addEventListener('submit', function(event) {
event.preventDefault();

// Afficher un message de patience
const btn = this.querySelector('button[type="submit"]');
btn.textContent = "Envoi en cours...";
btn.disabled = true;

// Envoi via EmailJS au visteur
emailjs.sendForm('service_d1fb2uj', 'template_vhy0wse', this)
// Send notification to church
emailjs.sendForm('service_d1fb2uj', 'YOUR_SECOND_TEMPLATE_ID', this)
.then(function() {
    alert("Merci ! Votre visite est planifiée, nous vous contacterons bientôt.");
    // Fermer le modal après succès
    closeModal();
    btn.textContent = "Confirmer ma visite";
    btn.disabled = false;
}, function(error) {
    alert("Une erreur est survenue, veuillez réessayer.");
    btn.textContent = "Confirmer ma visite";
    btn.disabled = false;
});
});



// ==========================================
// 3. ACCORDÉON FAQ
// ==========================================

document.addEventListener("DOMContentLoaded", function () {
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
header.addEventListener('click', () => {
// Optionnel : Fermer les autres éléments pour n'en ouvrir qu'un à la fois
const currentlyActive = document.querySelector('.accordion-header.active');
if (currentlyActive && currentlyActive !== header) {
    currentlyActive.classList.remove('active');
    currentlyActive.nextElementSibling.style.maxHeight = null;
}

// Ouvrir/Fermer l'élément cliqué
header.classList.toggle('active');
const content = header.nextElementSibling;

if (header.classList.contains('active')) {
    // Définit la hauteur maximale à la hauteur réelle du contenu
    content.style.maxHeight = content.scrollHeight + "px";
} else {
    content.style.maxHeight = null;
}
});
});
});