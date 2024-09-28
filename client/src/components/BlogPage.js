import CommentIcon from '@mui/icons-material/Comment'
import FavoriteIcon from '@mui/icons-material/Favorite'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom'
import { addComment, deleteBlog, likeBlog } from '../reducers/blogsReducer'
import { activeUserSelector, blogSelector } from '../selectors'

const BlogPage = () => {
  const { blogId } = useParams()
  const activeUser = activeUserSelector()
  const blog = blogSelector(blogId)
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  // TODO: Add error handling and not found redirect
  if (!blog) return null

  const handleClick = async (event) => {
    event.preventDefault()
    const dispatchSuccessful = await dispatch(
      addComment(blog, comment, activeUser)
    )
    if (dispatchSuccessful) setComment('')
  }

  const handleDelete = async (event) => {
    event.preventDefault()
    await dispatch(deleteBlog(blog, activeUser))
    navigate('/')
  }

  const handleLike = async (event) => {
    event.preventDefault()
    dispatch(likeBlog(blog, activeUser))
  }

  return (
    <div>
      <Grid container>
        <Grid item xs={12} sm>
          <Typography
            display='inline-block'
            component='h2'
            variant='h3'
            sx={{ fontWeight: 'bold' }}
          >
            {blog.title}&nbsp;
          </Typography>
          <div style={{ display: 'inline-block' }}>
            <Typography
              display='inline-block'
              component='h2'
              variant='h3'
              color='text.secondary'
              sx={{ fontWeight: 'bold' }}
            >
              by&nbsp;
            </Typography>
            <Typography
              display='inline-block'
              component='h2'
              variant='h3'
              sx={{ fontWeight: 'bold' }}
              gutterBottom
            >
              {blog.author}
            </Typography>
          </div>
          <Typography
            variant='h5'
            gutterBottom
            sx={{
              wordBreak: 'break-all'
            }}
          >
            <Link href={blog.url}>{blog.url}</Link>
          </Typography>
          <Typography
            display='inline-block'
            variant='body1'
            color='text.secondary'
            gutterBottom
          >
            added by:&nbsp;
          </Typography>
          <Link component={RouterLink} to={`/users/${blog.user.id}`}>
            {blog.user.name}
          </Link>
        </Grid>
        <Grid item xs={12} sm='auto'>
          <Stack
            height='100%'
            display='flex'
            justifyContent='space-evenly'
            pb={{ xs: 2, sm: 0 }}
            flexDirection={{
              xs: 'row',
              sm: 'column'
            }}
          >
            <Button
              variant='outlined'
              sx={{
                alignSelf: 'end',
                width: { xs: 180, sm: 90 },
                height: { sm: 73 }
              }}
              onClick={handleLike}
              startIcon={<FavoriteIcon />}
            >
              {blog.likes}
            </Button>
            {blog.user.id === activeUser.id && (
              <Button
                variant='outlined'
                sx={{ alignSelf: 'end', width: 90 }}
                onClick={handleDelete}
              >
                delete
              </Button>
            )}
          </Stack>
        </Grid>
      </Grid>
      <Card mt={2}>
        <Box sx={{ p: 2 }}>
          <Typography variant='h4' sx={{ fontWeight: 'bold' }}>
            Comments:
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            <TextField
              id='input-comment'
              type='text'
              name='comment'
              onChange={({ target }) => setComment(target.value)}
              value={comment}
              label='Write your comment here...'
              margin='normal'
              fullWidth
            />
            <Button
              variant='outlined'
              type='submit'
              onClick={handleClick}
              fullWidth
            >
              add comment
            </Button>
          </Box>
          <Box mt={2}>
            {blog.comments.length === 0 ? (
              <Typography ml={1} variant='h6' color='text.secondary'>
                Comment section is empty. Make a first comment!
              </Typography>
            ) : (
              <Stack spacing={{ xs: 1, sm: 2 }} direction='column'>
                {blog.comments.map((comment, index) => (
                  <Box key={index} display='flex' alignItems='center'>
                    <CommentIcon color='secondary' />
                    <Typography ml={1} variant='h6'>
                      {comment}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            )}
          </Box>
        </Box>
      </Card>
    </div>
  )
}

export default BlogPage
