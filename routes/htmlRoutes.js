const path = require("path");

module.exports = (app) => {
  // HTML route for notes page
  app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "notes.html"));
  });

  // Default route to send the user to the index.html
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "public", "index.html"));
  });
};
