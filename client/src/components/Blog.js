import PropTypes from 'prop-types'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink } from 'react-router-dom'
import { likeBlog, deleteBlog } from '../reducers/blogsReducer'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import CardActions from '@mui/material/CardActions'
import FavoriteIcon from '@mui/icons-material/Favorite'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const activeUser = useSelector(state => state.activeUser)

  const dispatch = useDispatch()

  const toggleVisibility = event => {
    event.preventDefault()
    setVisible(!visible)
  }

  const handleLike = event => {
    event.preventDefault()
    dispatch(likeBlog(blog, activeUser))
  }

  const handleDelete = event => {
    event.preventDefault()
    dispatch(deleteBlog(blog, activeUser))
  }

  const showWhenVisible = { display: visible ? '' : 'none' }

  return (
    <Card>
      <CardContent sx={{ flex: 1 }}>
        <Typography variant='h5'>
          <Link component={RouterLink} to={`/blogs/${blog.id}`} variant='h5'>
            {blog.title}
          </Link>
        </Typography>
        <Typography display='inline' variant='body1' color='text.secondary'>
          by&nbsp;
        </Typography>
        <Typography display='inline' variant='body1'>
          {blog.author}
        </Typography>
        <div style={showWhenVisible}>
          <Typography
            variant='body1'
            sx={{
              wordBreak: 'break-all'
            }}
          >
            <Link href={blog.url}>{blog.url}</Link>
          </Typography>
          <Typography display='inline' variant='body1' color='text.secondary'>
            submitted by&nbsp;
          </Typography>
          <Link component={RouterLink} to={`/users/${blog.user.id}`}>
            {blog.user.name}
          </Link>
        </div>
      </CardContent>
      <CardActions>
        <Button
          type='button'
          onClick={toggleVisibility}
          color='primary'
          variant='contained'
          size='small'
        >
          {visible ? 'less info' : 'more info'}
        </Button>
        <Button
          style={showWhenVisible}
          type='button'
          onClick={handleLike}
          color='primary'
          variant='outlined'
          size='small'
          startIcon={<FavoriteIcon />}
        >
          {blog.likes}
        </Button>
        {blog.user.id === activeUser.id && (
          <Button
            style={showWhenVisible}
            type='button'
            onClick={handleDelete}
            onMouseDown={event => event.stopPropagation()}
            color='primary'
            variant='outlined'
            size='small'
          >
            delete
          </Button>
        )}
      </CardActions>
    </Card>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog
