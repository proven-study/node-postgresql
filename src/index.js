const express = require("express");
const response = require("./utils/responses");
const { config } = require("./config");
const db = require("./database/config/db.config");
const router = require("./routes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.all("*", (req, res, next) => {
  response(res, 404, "Page not found.");
});

db.authenticate()
  .then(() => {
    console.log("DB connected");

    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}\n`);
    });
  })
  .catch((error) => {
    console.log(error.message);
  });
