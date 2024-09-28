import FavoriteIcon from '@mui/icons-material/Favorite'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogsReducer'
import { activeUserSelector } from '../selectors'
import LinkButton from './common/LinkButton'
import LinkTypographySec from './common/LinkTypographySec'
import TwoChildrenRowStack from './common/TwoChildrenRowStack'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)
  const activeUser = activeUserSelector()

  const dispatch = useDispatch()

  const toggleVisibility = (event) => {
    event.preventDefault()
    setVisible(!visible)
  }

  const handleLike = (event) => {
    event.preventDefault()
    dispatch(likeBlog(blog, activeUser))
  }

  const handleDelete = (event) => {
    event.preventDefault()
    dispatch(deleteBlog(blog, activeUser))
  }

  const showWhenVisible = { display: visible ? '' : 'none' }

  if (!blog) return null

  return (
    <Card>
      <Stack p={1}>
        <LinkButton linkTo={`/blogs/${blog.id}`}>
          <Typography
            display='inline'
            variant='h5'
            fontWeight='bold'
            textAlign='center'
          >
            {blog.title}
            <Typography
              display='inline'
              component='span'
              variant='h5'
              fontWeight='normal'
            >
              {' by '}
            </Typography>
            {blog.author}
          </Typography>
        </LinkButton>
      </Stack>
      <Divider />
      <Stack p={1} gap={1}>
        <TwoChildrenRowStack style={showWhenVisible} gap={1}>
          <LinkButton linkTo={blog.url} variant='text'>
            Visit Website
          </LinkButton>
          <Stack
            direction='row'
            justifyContent='center'
            alignItems='center'
            flexWrap='wrap'
            gap={0.25}
          >
            <LinkTypographySec>Submitted by:</LinkTypographySec>
            <LinkButton linkTo={`/users/${blog.user.id}`}>
              {blog.user.name}
            </LinkButton>
          </Stack>
        </TwoChildrenRowStack>
        {blog.user.id === activeUser.id && (
          <Button
            style={showWhenVisible}
            type='button'
            onClick={handleDelete}
            onMouseDown={(event) => event.stopPropagation()}
            color='primary'
            variant='outlined'
            size='small'
          >
            delete
          </Button>
        )}
        <Stack
          direction='row'
          justifyContent='space-between'
          gap={2}
          flexGrow={1}
          flexWrap={'wrap'}
        >
          <Button
            type='button'
            onClick={handleLike}
            color='primary'
            variant='outlined'
            size='small'
            startIcon={<FavoriteIcon />}
          >
            {blog.likes}
          </Button>
          <Button
            type='button'
            onClick={toggleVisibility}
            color='primary'
            variant='outlined'
            size='small'
            sx={{ ml: 'auto' }}
          >
            {visible ? 'less' : 'more'}
          </Button>
        </Stack>
      </Stack>
    </Card>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog
