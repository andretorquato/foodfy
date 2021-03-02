const nodemailer = require('nodemailer');

module.exports = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "aebed03d64450e",
      pass: "82118ca95b3b2b"
    }
  });