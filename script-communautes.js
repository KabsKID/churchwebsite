// 1. Initialisation de la carte (centrée sur le monde par défaut)
const map = L.map('map').setView([20, 0], 2);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// 2. Base de données des communautés (À remplir avec vos vraies données)
const churches = [
    { name: "ENAA Bruxelles", city: "Bruxelles", country: "Belgique", lat: 50.8503, lng: 4.3517, address: "Boulevard Lambermont 1" },
    { name: "ENAA Paris", city: "Paris", country: "France", lat: 48.8566, lng: 2.3522, address: "Rue de Rivoli" },
    { name: "ENAA Kinshasa Central", city: "Kinshasa", country: "RDC", lat: -4.4419, lng: 15.2663, address: "Gombe" },
    { name: "ENAA Montréal", city: "Montréal", country: "Canada", lat: 45.5017, lng: -73.5673, address: "Vieux-Port" }
];

// 3. Fonction de recherche
async function searchChurch() {
    const query = document.getElementById('cityInput').value;
    if (!query) return;

    // API de Géocodage gratuite (Nominatim)
    const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`);
    const data = await response.json();

    if (data.length > 0) {
        const userLat = parseFloat(data[0].lat);
        const userLng = parseFloat(data[0].lon);

        // Centrer la carte sur la recherche
        map.setView([userLat, userLng], 10);

        // Filtrer et afficher les communautés (simulé ici par les plus proches de la base)
        displayResults(userLat, userLng);
    } else {
        alert("Lieu introuvable. Essayez une ville plus grande.");
    }
}

function displayResults(lat, lng) {
    const list = document.getElementById('resultsList');
    list.innerHTML = ""; // Vider la liste

    // Ajout des marqueurs sur la map et remplissage de la liste
    churches.forEach(church => {
        // Ajouter marqueur
        const marker = L.marker([church.lat, church.lng]).addTo(map);
        marker.bindPopup(`<b>${church.name}</b><br>${church.address}`);

        // Ajouter à la liste textuelle
        const div = document.createElement('div');
        div.className = "church-item";
        div.innerHTML = `
            <h4>${church.name}</h4>
            <p><i class="fas fa-map-marker-alt"></i> ${church.address}, ${church.city}</p>
            <p><i class="fas fa-globe"></i> ${church.country}</p>
        `;
        div.onclick = () => map.setView([church.lat, church.lng], 15);
        list.appendChild(div);
    });
}