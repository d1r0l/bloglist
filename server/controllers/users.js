const { SALTROUNDS } = require('../utils/config')
const usersRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
    .select('-email -username')
    .populate('blogs', {
      title: 1,
      author: 1,
      url: 1
    })
  response.status(200).json(users)
})

usersRouter.post('/check', async (request, response, next) => {
  const { username, email } = request.body
  try {
    const usernameExists = await User.findOne({ username: username })
    const emailExists = await User.findOne({ email: email })
    const responseObj = {
      usernameExists: usernameExists ? true : false,
      emailExists: emailExists ? true : false
    }
    response.status(200).json(responseObj)
  } catch (error) {
    next(error)
  }
})

usersRouter.post('/', async (request, response, next) => {
  const { username, password, name, email } = request.body
  try {
    if (!password) {
      const error = new Error()
      error.name = 'ValidationError'
      error.message =
        'User validation failed: password: Path `password` is required.'
      throw error
    } else if (password.length < 8) {
      const error = new Error()
      error.name = 'ValidationError'
      error.message = `User validation failed: password: Path \`password\` (\`${password}\`) is shorter than the minimum allowed length (8).`
      throw error
    } else {
      const passwordHash = await bcrypt.hash(password, SALTROUNDS)
      const user = new User({
        username: username,
        passwordHash: passwordHash,
        name: name,
        email: email
      })
      const savedUser = await user.save()
      response.status(201).json(savedUser)
    }
  } catch (error) {
    next(error)
  }
})

module.exports = usersRouter
