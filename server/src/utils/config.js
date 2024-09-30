require('dotenv').config()

const SALTROUNDS = 10
const JWT_KEY = process.env.JWT_KEY
const PORT = process.env.PORT
const MONGODB_URI =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI
const TEST_TOKEN = process.env.TEST_TOKEN
const BASE_URL =
  process.env.NODE_ENV === 'production'
    ? process.env.PROD_BASE_URL
    : process.env.DEV_BASE_URL
const MAIL_PORT = process.env.MAIL_PORT
const MAIL_HOST = process.env.MAIL_HOST
const MAIL_USER = process.env.MAIL_USER
const MAIL_USER_ALIAS = process.env.MAIL_USER_ALIAS
const MAIL_PASS = process.env.MAIL_PASS

module.exports = {
  SALTROUNDS,
  JWT_KEY,
  MONGODB_URI,
  PORT,
  TEST_TOKEN,
  BASE_URL,
  MAIL_PORT,
  MAIL_HOST,
  MAIL_USER,
  MAIL_USER_ALIAS,
  MAIL_PASS
}
