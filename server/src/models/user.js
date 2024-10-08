const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, minLength: 3, unique: true },
  passwordHash: String,
  name: { type: String, required: true, minLength: 3 },
  email: {
    type: String,
    required: true,
    match: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
    unique: true
  },
  blogs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Blog'
    }
  ],
  token: String,
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 86400
  }
})

userSchema.plugin(uniqueValidator)

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    if (returnedObject._id) returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User
