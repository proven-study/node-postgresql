const express = require("express");
const response = require("./utils/responses");
const { config } = require("./config");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.all("*", (req, res, next) => {
  response(res, 404, "Page not found.");
});

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}\n`);
});
