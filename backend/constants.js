exports.constants = {
  VALIDATION_ERROR: 400,
  UNAUTHORIZED: 401, 
  FORBIDDEN: 403,
  NOT_FOUND: 404, 
  SERVER_ERROR: 500,
};  

const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "haseeb99sh@gmail.com", // gmail
    pass: process.env.MAIL_PASSWORD, // pass
  },
});

exports.sendMail = async function ({ to, subject, text, html }) {
  let info = await transporter.sendMail({
    from: '"Auth Checking" <haseeb99sh@gmail.com>', // sender address
    to,
    subject,
    text,
    html,
  });
  return info;
};
