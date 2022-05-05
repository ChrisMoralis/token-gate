const express = require("express");
const routes = require("./routes");
const dotenv = require("dotenv");
const app = express();
const port = 5454 || 3000;
dotenv.config();

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true }));

/**
 * API ROUTES
 */
app.post("/secret", routes.secret);

app.listen(port, () => {
  console.log("listening");
});
