const { BASE_URL } = require('../utils/config')
const { SALTROUNDS } = require('../utils/config')
const usersRouter = require('express').Router()
const sendEmail = require('../utils/sendEmail')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const crypto = require('crypto')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({})
    .select('-email -username')
    .populate({
      path: 'blogs',
      populate: {
        path: 'user',
        select: '-email -username -blogs'
      }
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
    }
    if (password.length < 8) {
      const error = new Error()
      error.name = 'ValidationError'
      error.message = `User validation failed: password: Path \`password\` (\`${password}\`) is shorter than the minimum allowed length (8).`
      throw error
    }
    const passwordHash = await bcrypt.hash(password, SALTROUNDS)
    const token = crypto.randomBytes(32).toString('hex')
    const user = new User({
      username: username,
      passwordHash: passwordHash,
      name: name,
      email: email,
      token: token
    })
    const savedUser = await user.save()
    const link = `${BASE_URL}/users/${user.id}/${token}`
    const emailBody =
      `You are receiving this because you (or someone else) registered an account on ${BASE_URL} with the email address ${email}. ` +
      'Before being able to use this account, you must verify your email address. \n\n' +
      'Please click on the following link, or paste this into your browser to complete the process within 24 hours of receiving it:\n\n' +
      link +
      '\n\n' +
      'If you did not request this, please ignore this email and account creation will be automatically cancelled.\n'
    await sendEmail(request.body.email, 'Reset your password', emailBody)
    response.status(201).json(savedUser)
  } catch (error) {
    next(error)
  }
})

usersRouter.get('/:userId/:token', async (request, response, next) => {
  try {
    const user = await User.findById(request.params.userId)
    if (!user) {
      const error = new Error()
      error.name = 'ValidationError'
      error.message =
        'User validation failed: userId: User with this id does not exist.'
      throw error
    }
    if (!user.token) {
      const error = new Error()
      error.name = 'ValidationError'
      error.message =
        'User validation failed: User is already verified. Please sign in.'
      throw error
    }
    if (user.token !== request.params.token) {
      const error = new Error()
      error.name = 'ValidationError'
      error.message = 'User validation failed: token: Invalid token.'
      throw error
    }
    user.$set({ token: undefined, createdAt: undefined })
    user.save()
    const emailBody =
      `Email verification on ${BASE_URL} with username ${user.username} was successful.` +
      `You can now sign in: ${BASE_URL}/signin`
    await sendEmail(user.email, 'Reset your password', emailBody)
    response.status(200).json(user)
  } catch (error) {
    next(error)
  }
})

module.exports = usersRouter
