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
  if (
    process.env.MORALIS_APP_ID &&
    process.env.MORALIS_SERVER_URL &&
    process.env.MORALIS_MASTER_KEY
  ) {
    console.log(`Listening on port ${port}`);
  } else {
    throw new Error(
      "Failed to start Token Gating Server: No Moralis environment variables found!"
    );
  }
});
