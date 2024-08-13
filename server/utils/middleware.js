const { JWT_KEY } = require('../utils/config')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const errorHandler = require('./errorHandler')

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const tokenExtractor = async (request, response, next) => {
  if (request) {
    const authorization = await request.get('authorization')
    if (authorization && authorization.startsWith('Bearer ')) {
      const token = authorization.replace('Bearer ', '')
      request.token = token
    }
  }
  next()
}

const userExtractor = async (request, response, next) => {
  if (request) {
    if (request.method === 'POST' || request.method === 'DELETE') {
      const decodedToken = jwt.verify(request.token, JWT_KEY)
      const user = await User.findOne({ _id: decodedToken.id })
      request.user = user
    }
  }
  next()
}

const middleware = {
  unknownEndpoint,
  tokenExtractor,
  userExtractor,
  errorHandler
}

module.exports = middleware
