/* eslint-disable no-unused-vars */
const nodemailer = require('nodemailer')
const {
  MAIL_HOST,
  MAIL_SERVICE,
  MAIL_PORT,
  MAIL_USER,
  MAIL_USER_ALIAS,
  MAIL_PASS
} = require('./config')

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: MAIL_HOST,
      service: MAIL_SERVICE,
      port: MAIL_PORT,
      secure: false,
      auth: {
        user: MAIL_USER,
        pass: MAIL_PASS
      },
      tls: {
        ciphers: 'SSLv3'
      }
    })

    await transporter.sendMail({
      from: `BlogList App <${MAIL_USER_ALIAS}>`,
      to: email,
      subject: subject,
      text: text
    })
  } catch (error) {
    console.log(error, 'email not sent')
  }
}

module.exports = sendEmail
