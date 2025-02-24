const express = require("express");
const cors = require("cors");
const db = require("./database");

const app = express();
app.use(express.json());
app.use(cors());

// 📍 POST - Update Bus Location (Driver Side)
app.post("/update-location", (req, res) => {
  const { lat, lng } = req.body;
  if (!lat || !lng) return res.status(400).json({ error: "Missing lat/lng" });

  db.run("INSERT INTO bus_location (lat, lng) VALUES (?, ?)", [lat, lng], function (err) {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ success: true, id: this.lastID });
  });
});

// 🚍 GET - Fetch Latest Bus Location (Student Side)
app.get("/get-location", (req, res) => {
  db.get("SELECT lat, lng FROM bus_location ORDER BY updated_at DESC LIMIT 1", [], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    if (!row) return res.status(404).json({ error: "No location data" });
    res.json(row);
  });
});

app.listen(3000, () => console.log("🚀 Server running on http://localhost:3000"));
