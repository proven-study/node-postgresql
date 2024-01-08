const express = require("express");
const authRouter = express.Router();
const ctrl = require("./auth.controller");

authRouter.post("/register", ctrl.Register);
authRouter.post("/resend_otp", ctrl.ResendOTP);
authRouter.post("/verify", ctrl.VerifyEmail);

module.exports = authRouter;
