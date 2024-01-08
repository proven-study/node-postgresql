const express = require("express");
const authRouter = express.Router();
const ctrl = require("./auth.controller");

authRouter.post("/register", ctrl.Register);

module.exports = authRouter;
