require('dotenv').config()

const SALTROUNDS = 10
const KEY = process.env.KEY
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
const EM_SERVICE = process.env.EM_SERVICE
const EM_HOST = process.env.EM_HOST
const EM_USER = process.env.EM_USER
const EM_PASS = process.env.EM_PASS

module.exports = {
  SALTROUNDS,
  KEY,
  MONGODB_URI,
  PORT,
  TEST_TOKEN,
  BASE_URL,
  EM_SERVICE,
  EM_HOST,
  EM_USER,
  EM_PASS
}
