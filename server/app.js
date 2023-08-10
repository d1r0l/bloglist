const { MONGODB_URI } = require('./utils/config')
const express = require('express')
const path = require('path')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
const blogsRouter = require('./controllers/blogs')
const loginRouter = require('./controllers/login')
const usersRouter = require('./controllers/users')

mongoose.set('strictQuery', false)

const connectToMongoose = async () => {
  try {
    await mongoose.connect(MONGODB_URI)
    logger.info('Connected to MongoDB')
  } catch (error) {
    logger.error('Error connecting to MongoDB:', error.message)
  }
}

connectToMongoose()

app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, '/build')))
app.use(middleware.tokenExtractor)
app.use('/api/login', loginRouter)
app.use('/api/users', usersRouter)
app.use('/api/blogs', middleware.userExtractor, blogsRouter)
app.use('/api/*', middleware.unknownEndpoint)
app.get('*', (request, response) => {
  response.sendFile(path.join(__dirname + '/build/index.html'))
})

if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./controllers/testing')
  app.use('/api/testing', testingRouter)
}

app.use(middleware.errorHandler)

module.exports = app
