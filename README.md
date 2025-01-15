# **Interactive Romania Map**

An interactive map application that displays locations where your software is being used in Romania. Users can click on the map to add new locations, which are saved locally in a `data.json` file. The project uses **Leaflet.js** for map rendering, marker clustering, and handling user interactions.

## **Features**

-   Displays locations as clustered markers on the map.
-   Click on a map point to automatically fill latitude and longitude in the modal.
-   Add new locations with name, latitude, longitude, and additional information.
-   Saves new locations to a JSON file (`data.json`) on the server.
-   Simple local server setup using Node.js and Express.
-   Fully responsive and user-friendly design.

## **Setup Instructions**

### **Prerequisites**

1. Install **Node.js**: Download and install from [https://nodejs.org/](https://nodejs.org/).
2. A text editor or IDE (e.g., Visual Studio Code).
3. Basic understanding of terminal/command-line usage.

### **How to Start the Project**

#### **Automatic Setup**

1. Double-click on the `start-map-app.bat` (Windows).
2. The script will:
    - Check if Node.js is installed.
    - Install dependencies if not already installed.
    - Start the server.
    - Open the application in your default browser.

#### **Manual Setup**

1. Open a terminal in the project directory.
2. Run the following commands:

```
# Install dependencies
npm install
```

```
# Start the server
node server.js
```

3. Open your browser and navigate to: http://localhost:3000.

## **File Structure**

```
Interactive-Romania-Map/
├── public/
│ ├── index.html # Main HTML file
│ ├── style.css # Styling for the map and modal
│ ├── script.js # Frontend logic (Leaflet.js and modal handling)
│ ├── data.json # Stores map location data
│ └── assets/ # (Optional) Store images or additional resources
├── server.js # Node.js server for handling API requests
├── package.json # Project dependencies and metadata
├── README.md # Project documentation
└── start-map-app.bat # Windows startup script
```

## **Adding Locations**

1. Click on the Map:

    - Click anywhere on the map to get the latitude and longitude.
    - These values will auto-fill in the modal.

2. Fill in Details:

    - Enter the Name and Info for the location.

3. Save the Location:

    - Click the "Create" button to save the location. It will immediately appear on the map.

## **API Endpoints**

### GET /data.json

Returns all existing locations.

### POST /add-location

Adds a new location to the `data.json` file.

#### Request Body

```
{
  "name": "Location Name",
  "lat": 45.123456,
  "lng": 24.123456,
  "info": "Additional information about the location"
}
```

#### Response

-   200 OK: Location added successfully.
-   500 Internal Server Error: Error saving the data.

## **Dependencies**

-   `Node.js`: JavaScript runtime for server-side scripting.
-   `Express.js`: Web framework for building the server.
-   `Leaflet.js`: Interactive maps library.
-   `leaflet.markercluster`: For clustering map markers.

## **Customization**

#### Adding a New Style

You can customize the map's appearance by replacing the `L.tileLayer` URL with a different tile source. For example, use a dark theme:

```
L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
```

## **Troubleshooting**

### Node.js Not Found

If the script says "Node.js is not installed," download and install it from https://nodejs.org/.

### Port Already in Use

If you see an error like `EADDRINUSE: Port 3000`, change the port in `server.js`:

```
const PORT = 3000; // Change this to a different number
```

## **Future Enhancements**

-   Add user authentication for editing locations.
-   Enable location search functionality.
-   Implement a database for better scalability.
