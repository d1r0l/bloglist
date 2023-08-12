const { KEY } = require('../utils/config')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

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
      const decodedToken = jwt.verify(request.token, KEY)
      const user = await User.findOne({ _id: decodedToken.id })
      request.user = user
    }
  }
  next()
}

const errorHandler = (error, request, response, next) => {
  const contains = string => {
    return error.message.includes(string)
  }

  switch (error.name) {
    case 'CastError':
      if (contains('invalid id')) {
        return response.status(400).json({ error: 'Malformatted id ?' })
      } else {
        return response.status(400).json({ error: error.message })
      }
    case 'JsonWebTokenError':
      return response.status(401).json({ error: 'Token expired' })
    case 'TokenExpiredError':
      return response.status(401).json({ error: 'Token expired' })
    case 'ValidationError':
      if (contains('is required')) {
        if (contains('username')) {
          return response.status(400).json({ error: 'Username is required' })
        } else if (contains('password')) {
          return response.status(400).json({ error: 'Password is required' })
        } else if (contains('email')) {
          return response.status(400).json({ error: 'Email is required' })
        } else if (contains('name')) {
          return response.status(400).json({ error: 'Name is required' })
        }
        return response.status(400).json({ error: error.message })
      }
      if (contains('is shorter than the minimum allowed length')) {
        if (contains('username')) {
          return response
            .status(400)
            .json({ error: 'Username must be at least 3 characters long' })
        } else if (contains('password')) {
          return response
            .status(400)
            .json({ error: 'Password must be at least 8 characters long' })
        } else if (contains('name')) {
          return response
            .status(400)
            .json({ error: 'Name must be at least 3 characters long' })
        }
        return response.status(400).json({ error: error.message })
      }
      if (contains('to be unique')) {
        if (contains('username')) {
          return response
            .status(400)
            .json({ error: 'Username is already taken' })
        } else if (contains('email')) {
          return response.status(400).json({ error: 'Email is already taken' })
        }
        return response.status(400).json({ error: error.message })
      }
      if (contains('is invalid')) {
        if (contains('email')) {
          return response.status(400).json({ error: 'Email is invalid' })
        }
        return response.status(400).json({ error: error.message })
      }
      if (contains('No user found')) {
        return response.status(400).json({ error: 'No user found' })
      }
      if (contains('email does not exist')) {
        return response.status(400).json({ error: 'Email does not exist' })
      }
      break
    case 'AuthentificationError':
      if (contains('authentification failed')) {
        return response.status(401).json({ error: 'Authentification failed' })
      } else {
        return response.status(401).json({ error: error.message })
      }
    default:
      break
  }

  switch (error.message) {
    case 'blog':
    case 'user':
    case 'deletion rejected':
      return response.status(400).json({ error: error.message })
    default:
      next()
  }
}

const middleware = {
  unknownEndpoint,
  tokenExtractor,
  userExtractor,
  errorHandler
}

module.exports = middleware
