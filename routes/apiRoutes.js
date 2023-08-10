const path = require("path");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");

module.exports = (app) => {
  app.get("/api/notes", (req, res) => {
    fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (err, data) => {
      if (err) {
        console.error("Error reading the db.json", err);
        return res.status(500).send("Internal Server Error");
      }
      res.json(JSON.parse(data));
    });
  });

  app.post("/api/notes", (req, res) => {
    fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (err, data) => {
      if (err) {
        console.error("Error reading the db.json", err);
        return res.status(500).send("Internal Server Error");
      }

      const db = JSON.parse(data);
      const userNote = {
        title: req.body.title,
        text: req.body.text,
        id: uuidv4(),
      };

      db.push(userNote);

      fs.writeFile(
        path.join(__dirname, "../db/db.json"),
        JSON.stringify(db, null, 2),
        (err) => {
          if (err) {
            console.error("Error writing to db.json", err);
            return res.status(500).send("Internal Server Error");
          }
          res.json(userNote);
        }
      );
    });
  });

  app.delete("/api/notes/:id", (req, res) => {
    fs.readFile(path.join(__dirname, "../db/db.json"), "utf8", (err, data) => {
      if (err) {
        console.error("Error reading the db.json", err);
        return res.status(500).send("Internal Server Error");
      }

      const db = JSON.parse(data);
      const deleteNotes = db.filter((item) => item.id !== req.params.id);

      fs.writeFile(
        path.join(__dirname, "../db/db.json"),
        JSON.stringify(deleteNotes, null, 2),
        (err) => {
          if (err) {
            console.error("Error writing to db.json", err);
            return res.status(500).send("Internal Server Error");
          }
          res.json({ message: "Deleted successfully!" });
        }
      );
    });
  });
};
