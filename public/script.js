// Initialize the map
const map = L.map("map").setView([45.9432, 24.9668], 7);

// Add OpenStreetMap tiles
let currentLayer = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
).addTo(map);

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

// Handle the theme dropdown change
const themeSelector = document.getElementById("themeSelector");

themeSelector.addEventListener("change", (e) => {
    const selectedTheme = e.target.value;

    // Remove the existing layer
    map.removeLayer(currentLayer);

    // Add the selected layer
    currentLayer = L.tileLayer(selectedTheme).addTo(map);

    // Save the selected theme in localStorage
    localStorage.setItem("mapTheme", selectedTheme);
});

// Check if there's a saved theme in localStorage and apply it
const savedTheme = localStorage.getItem("mapTheme");
if (savedTheme) {
    themeSelector.value = savedTheme; // Set the dropdown to the saved theme
    currentLayer = L.tileLayer(savedTheme).addTo(map);
}
