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
const closeModal = document.getElementById("closeModal");
const form = document.getElementById("addLocationForm");

// Input fields for latitude and longitude
const latInput = document.getElementById("lat");
const lngInput = document.getElementById("lng");

// Close modal when "X" is clicked
closeModal.onclick = () => (modal.style.display = "none");

// Submit the form
form.onsubmit = (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value;
    const lat = parseFloat(latInput.value);
    const lng = parseFloat(lngInput.value);
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

// Add event listener for map clicks
map.on("click", function (e) {
    const { lat, lng } = e.latlng; // Get latitude and longitude from the click event
    latInput.value = lat.toFixed(6); // Populate latitude field
    lngInput.value = lng.toFixed(6); // Populate longitude field
    modal.style.display = "block"; // Open the modal automatically
});
