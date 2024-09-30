import Stack from '@mui/material/Stack'
import { blogsSelector } from '../store/selectors'
import BlogsGrid from './BlogsGrid'
import BlogForm from './forms/BlogForm'

const Blogs = () => {
  const blogs = blogsSelector()

  return (
    <Stack spacing={{ xs: 2, sm: 3 }} direction='column'>
      <BlogForm />
      <BlogsGrid blogs={blogs} />
    </Stack>
  )
}

export default Blogs
