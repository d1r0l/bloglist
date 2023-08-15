const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    name: 1,
    id: 1
  })
  response.status(200).json(blogs)
})

blogsRouter.post('/', async (request, response) => {
  if (!request.user) {
    const error = new Error()
    error.name = 'AuthentificationError'
    error.message = 'User authentification failed.'
    throw error
  }
  const body = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes,
    user: request.user._id
  }
  const blog = new Blog(body)
  const returnedBlog = await blog.save()
  request.user.blogs = request.user.blogs.concat(returnedBlog._id)
  await request.user.save()
  response.status(201).json(returnedBlog)
})

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
    const blog = await Blog.findOne({ _id: request.params.id })
    if (!blog) {
      const error = new Error()
      error.name = 'CastError'
      error.message =
        'Cast to ObjectId failed for value "invalid id" at path "_id"'
    }
    if (request.user._id.toString() === blog.user.toString()) {
      await Blog.findByIdAndRemove(request.params.id)
      await User.findByIdAndUpdate(blog.user, {
        $pull: { blogs: request.params.id }
      })
      response.status(204).end()
    } else {
      const error = new Error()
      error.name = 'AuthentificationError'
      error.message = 'User authentification failed: invalid user id'
    }
  } catch (error) {
    next(error)
  }
})

blogsRouter.put('/:id', async (request, response) => {
  try {
    const result = await Blog.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true }
    )
    response.json(result)
  } catch {
    response.status(400).end()
  }
})

blogsRouter.post('/:id/comments', async (request, response) => {
  if (!request.user) {
    const error = new Error()
    error.name = 'AuthentificationError'
    error.message = 'User authentification failed: invalid user id'
    throw error
  }
  try {
    const result = await Blog.findByIdAndUpdate(
      request.params.id,
      { $push: { comments: request.body.comment } },
      { new: true }
    )
    response.json(result)
  } catch {
    response.status(400).end()
  }
})

module.exports = blogsRouter
