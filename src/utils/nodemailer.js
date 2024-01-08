const nodemailer = require("nodemailer");
const { config } = require("../config");

const { host, port, user, password } = config.mail;

function sendEmail(email, subject, message) {
  const transporter = nodemailer.createTransport({
    host,
    port,
    auth: {
      user,
      pass: password,
    },
  });

  const mailOptions = {
    from: `Admin <${user}>`,
    to: email,
    subject,
    text: message,
  };

  transporter.sendMail(mailOptions);
}

module.exports = { sendEmail };
