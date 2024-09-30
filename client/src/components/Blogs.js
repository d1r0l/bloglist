import Stack from '@mui/material/Stack'
import { useRef } from 'react'
import { blogsSelector } from '../store/selectors'
import BlogsGrid from './BlogsGrid'
import BlogForm from './forms/BlogForm'
import Togglable from './Togglable'

const Blogs = () => {
  const toggleRef = useRef()
  const blogs = blogsSelector()

  return (
    <Stack spacing={{ xs: 2, sm: 3 }} direction='column'>
      <Togglable buttonLabel='Add new blog' ref={toggleRef}>
        <BlogForm toggleRef={toggleRef} />
      </Togglable>
      <BlogsGrid blogs={blogs} />
    </Stack>
  )
}

export default Blogs
