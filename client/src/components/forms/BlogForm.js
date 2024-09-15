import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { createBlog } from '../../reducers/blogsReducer'
import { Box } from '@mui/material'
import regex from '../../utils/regex'
import FormInput from './common/FormInput'
import FormButton from './common/FormButton'
import Form from './common/Form'
import { setNotification } from '../../reducers/notificationReducer'

const BlogForm = ({ toggleRef }) => {
  const activeUser = useSelector(state => state.activeUser)
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

  const onSubmit = async data => {
    const newBlog = {
      title: data.title,
      author: data.author,
      url: data.url
    }
    const submitSuccessful = await dispatch(createBlog(newBlog, activeUser))
    if (submitSuccessful) {
      if (toggleRef) toggleRef.current.toggleVisibility()
      reset()
    } else {
      setError('title', { type: 'custom' })
      setError('author', { type: 'custom' })
      setError('url', { type: 'custom' })
      setNotification('There was a problem creating the blog')
    }
  }

  return (
    <Box component='main'>
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
            pattern: { value: regex.link, message: 'Url must be a valid url' }
          })}
          error={!!errors.url}
          helperText={errors.url?.message}
        />
        <br />
        <FormButton type='submit' loading={isSubmitting} sx={{ mb: 0 }}>
          {'Create'}
        </FormButton>
      </Form>
    </Box>
  )
}

BlogForm.propTypes = {
  toggleRef: PropTypes.object
}

export default BlogForm
