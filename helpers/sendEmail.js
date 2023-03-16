const nodemailer = require("nodemailer");
const { EMAIL_PASS_NODEMAILER } = process.env;

const transporter = nodemailer.createTransport({
  host: "smtp.meta.ua",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "testgoit@meta.ua", // generated ethereal user
    pass: EMAIL_PASS_NODEMAILER, // generated ethereal password
  },
});

function sendEmail(message) {
  return transporter
    .sendMail(message)
    .then(() => console.log("the letter sent"))
    .catch((error) => console.log(error));
}

module.exports = sendEmail;
