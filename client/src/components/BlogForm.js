import { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../reducers/blogsReducer'
import { Box, Button, TextField } from '@mui/material'

const BlogForm = ({ blogFormRef }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [submitError, setSubmitError] = useState(false)
  const activeUser = useSelector(state => state.activeUser)
  const dispatch = useDispatch()

  useEffect(() => {
    setSubmitError(false)
  }, [title, author, url])

  const handleSubmit = async event => {
    event.preventDefault()
    if (
      !title ||
      !author ||
      url.match(
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/
      ) === null
    ) {
      setSubmitError(true)
      return
    } else {
      const newBlog = {
        title: title,
        author: author,
        url: url
      }
      const dispatchSuccessful = await dispatch(createBlog(newBlog, activeUser))
      if (dispatchSuccessful) {
        if (blogFormRef) {
          blogFormRef.current.toggleVisibility()
        }
        setTitle('')
        setAuthor('')
        setUrl('')
      }
    }
  }

  return (
    <Box component='main'>
      <Box component='form' onSubmit={handleSubmit} noValidate>
        <TextField
          id='input-title'
          type='text'
          name='title'
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          label='Title'
          variant='outlined'
          margin='dense'
          required
          fullWidth
          autoFocus
          {...(submitError &&
            !title && { error: true, helperText: 'required' })}
        />
        <TextField
          id='input-author'
          type='text'
          name='author'
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          label='Author'
          variant='outlined'
          margin='dense'
          required
          fullWidth
          {...(submitError &&
            !author && {
              error: true,
              helperText: 'required'
            })}
        />
        <TextField
          id='input-url'
          type='text'
          name='url'
          value={url}
          onChange={({ target }) => setUrl(target.value)}
          label='Url'
          variant='outlined'
          margin='dense'
          required
          fullWidth
          {...(submitError &&
            url.match(
              /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/
            ) === null && { error: true, helperText: 'Invalid url' })}
          {...(submitError && !url && { error: true, helperText: 'required' })}
        />
        <br />
        <Button
          id='button-create'
          type='submit'
          variant='contained'
          fullWidth
          sx={{ my: 1 }}
        >
          create
        </Button>
      </Box>
    </Box>
  )
}

BlogForm.propTypes = {
  blogFormRef: PropTypes.object
}

export default BlogForm
