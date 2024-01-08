const response = require("./responses");
const generateOTP = require("./generateOTP");
const { sendEmail } = require("./nodemailer");

module.exports = {
  response,
  generateOTP,
  sendEmail,
};
