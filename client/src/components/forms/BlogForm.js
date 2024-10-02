import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Collapse from '@mui/material/Collapse'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { createBlog } from '../../store/reducers/blogsReducer'
import { setNotification } from '../../store/reducers/notificationReducer'
import { activeUserSelector } from '../../store/selectors'
import regex from '../../utils/regex'
import Form from './common/Form'
import FormButton from './common/FormButton'
import FormInput from './common/FormInput'

const BlogForm = () => {
  const [expanded, setExpanded] = useState(false)
  const activeUser = activeUserSelector()
  const dispatch = useDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
    isSubmitting,
    reset,
    setError
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      title: '',
      author: '',
      url: ''
    }
  })

  const onSubmit = async (data) => {
    const newBlog = {
      title: data.title,
      author: data.author,
      url: data.url
    }
    const submitSuccessful = await dispatch(createBlog(newBlog, activeUser))
    if (submitSuccessful) {
      setExpanded(false)
      reset()
    } else {
      setError('title', { type: 'custom' })
      setError('author', { type: 'custom' })
      setError('url', { type: 'custom' })
      setNotification('There was a problem creating the blog')
    }
  }

  if (!activeUser) return null

  return (
    <Box>
      <Collapse in={expanded}>
        <Box component='main' mb={{ xs: 2, sm: 3 }}>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormInput
              label='Title'
              type='text'
              {...register('title', { required: 'Title is required' })}
              error={!!errors.title}
              helperText={errors.title?.message}
              autoFocus
            />
            <FormInput
              label='Author'
              type='text'
              {...register('author', { required: 'Author is required' })}
              error={!!errors.author}
              helperText={errors.author?.message}
            />
            <FormInput
              label='URL'
              type='text'
              {...register('url', {
                required: 'Url is required',
                pattern: {
                  value: regex.url,
                  message: 'Url must be a valid url'
                }
              })}
              error={!!errors.url}
              helperText={errors.url?.message}
            />
            <br />
            <FormButton type='submit' loading={isSubmitting} sx={{ mb: 0 }}>
              Submit
            </FormButton>
          </Form>
        </Box>
      </Collapse>
      <Button
        onClick={() => setExpanded(!expanded)}
        variant='outlined'
        fullWidth
      >
        {expanded ? 'Cancel' : 'Add new blog'}
      </Button>
    </Box>
  )
}

export default BlogForm
