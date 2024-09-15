import { useRef } from 'react'
import { useSelector } from 'react-redux'
import Grid from '@mui/material/Grid2'
import Stack from '@mui/material/Stack'
import Blog from './Blog'
import BlogForm from './forms/BlogForm'
import Togglable from './Togglable'

const Blogs = () => {
  const blogs = useSelector(state => state.blogs)
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  const toggleRef = useRef()

  return (
    <Stack spacing={{ xs: 2, sm: 3 }} direction='column'>
      <Togglable buttonLabel='Add new blog' ref={toggleRef}>
        <BlogForm toggleRef={toggleRef} />
      </Togglable>
      <Grid container spacing={2}>
        {sortedBlogs.map(blog => (
          <Grid key={blog.id} size={{ xs: 12, md: 6 }}>
            <Blog blog={blog} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  )
}

export default Blogs
