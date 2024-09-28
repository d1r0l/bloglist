const { BASE_URL } = require('../utils/config')
const passResetRouter = require('express').Router()
const User = require('../models/user')
const ResetToken = require('../models/resetToken')
const sendEmail = require('../utils/sendEmail')
const crypto = require('crypto')
const { SALTROUNDS } = require('../utils/config')
const bcrypt = require('bcrypt')

passResetRouter.post('/', async (request, response, next) => {
  try {
    if (!request.body.email) {
      const error = new Error()
      error.message = 'User validation failed: email: Path `email` is required.'
      error.name = 'ValidationError'
      throw error
    }
    if (!request.body.email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      const error = new Error()
      error.message = 'User validation failed: email: Path `email` is invalid.'
      error.name = 'ValidationError'
      throw error
    }

    const user = await User.findOne({ email: request.body.email })
    if (!user) {
      const error = new Error()
      error.message =
        'User validation failed: email: User with this email does not exist.'
      error.name = 'ValidationError'
      throw error
    }

    let resetToken = await ResetToken.findOne({ userId: user.id })
    if (!resetToken) {
      resetToken = await new ResetToken({
        userId: user.id,
        token: crypto.randomBytes(32).toString('hex')
      }).save()
    } else {
      ResetToken.findByIdAndUpdate(resetToken.id, {
        $set: { createdAt: Date.now() }
      }).exec()
    }

    const link = `${BASE_URL}/resetpassword/${user.id}/${resetToken.token}`
    const emailBody =
      'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
      'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n' +
      link +
      '\n\n' +
      'If you did not request this, please ignore this email and your password will remain unchanged.\n'
    await sendEmail(request.body.email, 'Reset your password', emailBody)
    response
      .status(200)
      .json({ message: 'Password reset link sent successfully.' })
  } catch (error) {
    next(error)
  }
})

passResetRouter.post('/:userId/:token', async (request, response, next) => {
  try {
    if (!request.body.password) {
      const error = new Error()
      error.message =
        'User validation failed: password: Path `password` is required.'
      error.name = 'ValidationError'
      throw error
    }

    if (request.body.password.length < 8) {
      const error = new Error()
      error.message =
        'User validation failed: password: Path `password` is too short.'
      error.name = 'ValidationError'
      throw error
    }

    const user = await User.findById(request.params.userId)
    if (!user) {
      const error = new Error()
      error.message =
        'User validation failed: userId: User with this id does not exist.'
      error.name = 'ValidationError'
      throw error
    }

    const fetchedResetToken = await ResetToken.findOne({
      userId: user.id,
      token: request.params.token
    })

    if (!fetchedResetToken) {
      const error = new Error()
      error.message =
        'User validation failed: token: Token is invalid or has expired.'
      error.name = 'ValidationError'
      throw error
    }

    const passwordHash = await bcrypt.hash(request.body.password, SALTROUNDS)
    user.passwordHash = passwordHash
    await user.save()
    await ResetToken.findByIdAndDelete(fetchedResetToken.id)
    response.status(200).json({ message: 'Password reset successful.' })
  } catch (error) {
    next(error)
  }
})

module.exports = passResetRouter
