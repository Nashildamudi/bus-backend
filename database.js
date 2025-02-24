const sqlite3 = require("sqlite3").verbose();

// Connect to SQLite database (creates 'bus_tracker.db' if not exists)
const db = new sqlite3.Database("bus_tracker.db", (err) => {
  if (err) console.error("Database Connection Error:", err);
  else console.log("Connected to SQLite database ✅");
});

// Create table for bus locations
db.serialize(() => {
  db.run(
    `CREATE TABLE IF NOT EXISTS bus_location (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      lat REAL,
      lng REAL,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`
  );
});

module.exports = db;
