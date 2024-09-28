import { useSelector } from 'react-redux'

export const usersSelector = () => {
  const users = (state) => state.users
  return useSelector(users)
}

export const userSelector = (userId) => {
  const user = (state) => state.users.find((user) => user.id === userId)
  return useSelector(user)
}

export const activeUserSelector = () => {
  const activeUser = (state) => state.activeUser
  return useSelector(activeUser)
}

export const blogsSelector = () => {
  const blogs = (state) => state.blogs
  return useSelector(blogs)
}

export const blogSelector = (blogId) => {
  const blog = (state) => state.blogs.find((blog) => blog.id === blogId)
  return useSelector(blog)
}

export const notificationTextSelector = () => {
  const notificationText = (state) => state.notification.text
  return useSelector(notificationText)
}

export const notificationColorSelector = () => {
  const notificationColor = (state) => state.notification.color
  return useSelector(notificationColor)
}
