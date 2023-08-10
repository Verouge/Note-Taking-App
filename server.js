const express = require("express");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse POST requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use("/public", express.static(path.join(__dirname, "public")));

// HTML routes
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "notes.html"))
);
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "public", "index.html"))
);

// API routes
app.get("/api/notes", (req, res) => {
  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    res.json(JSON.parse(data));
  });
});

app.post("/api/notes", (req, res) => {
  const newNote = {
    ...req.body,
    id: uuidv4(), // This will generate a unique id
  };

  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    notes.push(newNote);

    fs.writeFile("./db/db.json", JSON.stringify(notes, null, 2), (err) => {
      if (err) throw err;
      res.json(newNote);
    });
  });
});

// Bonus: DELETE route
app.delete("/api/notes/:id", (req, res) => {
  const id = req.params.id;

  fs.readFile("./db/db.json", "utf8", (err, data) => {
    if (err) throw err;
    const notes = JSON.parse(data);
    const newNotes = notes.filter((note) => note.id !== id);

    fs.writeFile("./db/db.json", JSON.stringify(newNotes, null, 2), (err) => {
      if (err) throw err;
      res.json({ message: "Deleted successfully!" });
    });
  });
});

// Start server
app.listen(PORT, () =>
  console.log(`Server started on http://localhost:${PORT}`)
);
