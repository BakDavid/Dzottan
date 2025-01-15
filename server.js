const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

// Serve data.json
app.get("/data.json", (req, res) => {
    res.sendFile(path.join(__dirname, "data.json"));
});

// Handle adding new location
app.post("/add-location", (req, res) => {
    const newLocation = req.body;

    fs.readFile("data.json", (err, data) => {
        if (err) return res.status(500).send("Error reading file");

        const locations = JSON.parse(data);
        locations.push(newLocation);

        fs.writeFile("data.json", JSON.stringify(locations, null, 2), (err) => {
            if (err) return res.status(500).send("Error writing file");
            res.status(200).send("Location added");
        });
    });
});

app.listen(PORT, () =>
    console.log(`Server running on http://localhost:${PORT}`)
);
