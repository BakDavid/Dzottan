// Initialize the map
const map = L.map("map").setView([45.9432, 24.9668], 7);

// Add OpenStreetMap tiles
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(map);

// Marker clustering
const markers = L.markerClusterGroup();

// Fetch and load data
fetch("/data.json")
    .then((response) => response.json())
    .then((data) => {
        data.forEach((location) => {
            const marker = L.marker([location.lat, location.lng]).bindPopup(
                `<b>${location.name}</b><br>${location.info}`
            );
            markers.addLayer(marker);
        });
        map.addLayer(markers);
    });

// Modal functionality
const modal = document.getElementById("modal");
const addLocationBtn = document.getElementById("addLocationBtn");
const closeModal = document.getElementById("closeModal");
const form = document.getElementById("addLocationForm");

addLocationBtn.onclick = () => (modal.style.display = "block");
closeModal.onclick = () => (modal.style.display = "none");
form.onsubmit = (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const lat = parseFloat(document.getElementById("lat").value);
    const lng = parseFloat(document.getElementById("lng").value);
    const info = document.getElementById("info").value;

    const newLocation = { name, lat, lng, info };

    // Send to server
    fetch("/add-location", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newLocation),
    })
        .then((response) => response.json())
        .then(() => {
            window.location.reload();
        })
        .catch((err) => window.location.reload());
};
