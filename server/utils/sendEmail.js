/* eslint-disable no-unused-vars */
const nodemailer = require('nodemailer')
const { EM_HOST, EM_SERVICE, EM_USER, EM_PASS } = require('./config')

const sendEmail = async (email, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: EM_HOST,
      service: EM_SERVICE,
      port: 587,
      secure: false,
      auth: {
        user: EM_USER,
        pass: EM_PASS
      },
      tls: {
        ciphers: 'SSLv3'
      }
    })

    await transporter.sendMail({
      from: `BlogList App <${EM_USER}>`,
      to: email,
      subject: subject,
      text: text
    })
  } catch (error) {
    console.log(error, 'email not sent')
  }
}

module.exports = sendEmail
