import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { initializeBlogs } from './reducers/blogsReducer'
import { initializeActiveUser } from './reducers/activeUserReducer'
import { initializeUsers } from './reducers/usersReducer'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Users from './components/Users'
import UserPage from './components/UserPage'
import BlogPage from './components/BlogPage'
import NavMenu from './components/NavMenu'
import PassResetForm from './components/PassResetForm'
import { Box, Container, Grid } from '@mui/material'
import logo from './img/logo.png'
import NotFound from './components/NotFound'

const App = () => {
  const activeUser = useSelector(state => state.activeUser)

  const dispatch = useDispatch()
  const blogFormRef = useRef()

  useEffect(() => {
    dispatch(initializeActiveUser())
    dispatch(initializeBlogs())
    dispatch(initializeUsers())
  }, [])

  const BlogList = () => {
    const blogs = useSelector(state => state.blogs)
    const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

    return (
      <div>
        <Togglable buttonLabel='new blog' ref={blogFormRef}>
          <BlogForm blogFormRef={blogFormRef} />
        </Togglable>
        <Grid container spacing={2}>
          {sortedBlogs.map(blog => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </Grid>
      </div>
    )
  }

  return (
    <Container>
      <BrowserRouter>
        <Box
          component='img'
          align='center'
          src={logo}
          maxWidth='200'
          sx={{
            my: { xs: 2, md: 4 },
            maxWidth: { xs: 145, md: 290 }
          }}
        />
        {activeUser ? <NavMenu /> : null}
        <Notification />
        {activeUser ? (
          <div>
            <Routes>
              <Route path='/' element={<BlogList />} />
              <Route path='users' element={<Users />} />
              <Route path='users/:userId' element={<UserPage />} />
              <Route path='blogs' element={<Navigate to='/' />} />
              <Route path='blogs/:blogId' element={<BlogPage />} />
              <Route path='/notfound' element={<NotFound />} />
              <Route path='*' element={<Navigate to='/notfound' />} />
            </Routes>
          </div>
        ) : (
          <div>
            <Routes>
              <Route path='/signup' element={<SignupForm />} />
              <Route path='/reset' element={<PassResetForm />} />
              <Route path='*' element={<LoginForm />} />
            </Routes>
          </div>
        )}
      </BrowserRouter>
    </Container>
  )
}

export default App
