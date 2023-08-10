const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("./public"));

// Importing routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// Starting server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
