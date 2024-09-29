import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid2'
import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types'
import Blog from './Blog'

const BlogsGrid = ({ blogs }) => {
  const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes)

  if (sortedBlogs.length === 0)
    return (
      <Card>
        <Typography component='p' variant='h5' align='center' m={2}>
          No blogs submitted yet
        </Typography>
      </Card>
    )

  return (
    <Grid container spacing={{ xs: 2, sm: 3 }}>
      {sortedBlogs.map((blog) => (
        <Grid
          key={blog.id}
          size={{ xs: 12, md: sortedBlogs.length > 1 ? 6 : 12 }}
        >
          <Blog blog={blog} />
        </Grid>
      ))}
    </Grid>
  )
}

BlogsGrid.propTypes = {
  blogs: PropTypes.array.isRequired
}

export default BlogsGrid
