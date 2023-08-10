const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse POST requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use("/public", express.static(path.join(__dirname, "public")));

// Importing routes
require("./routes/htmlRoutes")(app);
require("./routes/apiRoutes")(app);

// Start server
app.listen(PORT, () =>
  console.log(`Server started on http://localhost:${PORT}`)
);
