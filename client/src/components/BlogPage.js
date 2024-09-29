import CommentIcon from '@mui/icons-material/Comment'
import FavoriteIcon from '@mui/icons-material/Favorite'
import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import Divider from '@mui/material/Divider'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import {
  addComment,
  deleteBlog,
  likeBlog
} from '../store/reducers/blogsReducer'
import { activeUserSelector, blogSelector } from '../store/selectors'
import LinkButton from './common/LinkButton'
import TwoChildrenRowStack from './common/TwoChildrenRowStack'
import FormInput from './forms/common/FormInput'
import NotFound from './NotFound'

const BlogPage = () => {
  const { blogId } = useParams()
  const activeUser = activeUserSelector()
  const blog = blogSelector(blogId)
  const [comment, setComment] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  // TODO: Add error handling and not found redirect
  if (!blog) return <NotFound />

  const handleClick = async (event) => {
    event.preventDefault()
    const dispatchSuccessful = await dispatch(
      addComment(blog, comment, activeUser)
    )
    if (dispatchSuccessful) setComment('')
  }

  const handleDelete = async (event) => {
    event.preventDefault()
    const deleteSuccessful = await dispatch(deleteBlog(blog, activeUser))
    if (deleteSuccessful) navigate('/')
  }

  const handleLike = async (event) => {
    event.preventDefault()
    dispatch(likeBlog(blog, activeUser))
  }

  return (
    <>
      <Typography variant='h2' gutterBottom>
        {blog.title}
        <Typography component='span' variant='inherit' color='text.secondary'>
          {' by '}
        </Typography>
        {blog.author}
      </Typography>
      <Card>
        <Stack gap={1} p={1}>
          <TwoChildrenRowStack gap={1}>
            <LinkButton linkTo={blog.url}>
              <Typography component='p' variant='h5'>
                Visit Website
              </Typography>
            </LinkButton>
            <Stack
              direction='row'
              justifyContent='center'
              alignItems='center'
              flexWrap='wrap'
              gap={0.25}
            >
              <Typography component='p' variant='h5' textAlign={'center'}>
                Submitted by:
              </Typography>
              <LinkButton linkTo={`/users/${blog.user.id}`}>
                <Typography component='p' variant='h5'>
                  {blog.user.name}
                </Typography>
              </LinkButton>
            </Stack>
          </TwoChildrenRowStack>
        </Stack>
        <Divider />
        <Stack gap={1} p={1}>
          <TwoChildrenRowStack flexWrap='wrap' gap={1}>
            <Button
              variant='outlined'
              onClick={handleLike}
              startIcon={<FavoriteIcon />}
              sx={{ flexGrow: 100, flexBasis: '120px' }}
            >
              {blog.likes}
            </Button>
            {blog.user.id === activeUser.id && (
              <Button
                variant='outlined'
                onClick={handleDelete}
                sx={{ flexGrow: 1, flexBasis: '80px' }}
              >
                delete
              </Button>
            )}
          </TwoChildrenRowStack>
        </Stack>
        <Divider />
        <Stack gap={1} p={1}>
          <Typography component='h3' variant='h4' pl={1}>
            Comments:
          </Typography>
          <Stack alignItems='center'>
            <FormInput
              type='text'
              name='comment'
              value={comment}
              onChange={({ target }) => setComment(target.value)}
              label='Write your comment here...'
              sx={{ mt: 0 }}
            />
            <Button
              variant='outlined'
              type='submit'
              onClick={handleClick}
              fullWidth
            >
              add comment
            </Button>
          </Stack>
          {blog.comments.length === 0 ? (
            <Typography ml={1} variant='h6' color='text.secondary'>
              Comment section is empty. Make a first comment!
            </Typography>
          ) : (
            <Stack gap={1}>
              {blog.comments.map((comment, index) => (
                <Stack key={index} direction='row' alignItems='center' gap={1}>
                  <CommentIcon color='secondary' />
                  <Typography component='p' variant='h6'>
                    {comment}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          )}
        </Stack>
      </Card>
    </>
  )
}

export default BlogPage
