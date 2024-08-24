import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { makeNotification } from '../../reducers/notificationReducer'
import passResetService from '../../services/passReset'
import FormContainer from './common/FormContainer'
import FormIcon from './common/FormIcon'
import MailIcon from '@mui/icons-material/Mail'
import FormHeader from './common/FormHeader'
import Form from './common/Form'
import FormInput from './common/FormInput'
import FormButton from './common/FormButton'
import FormLinkStack from './common/FormLinkStack'
import FormLink from './common/FormLink'
import regex from '../../utils/regex'

const ResetPassForm = () => {
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError
  } = useForm({
    mode: 'onChange',
    defaultValues: { email: '' }
  })

  const onSubmit = async data => {
    if (!regex.email.test(data.email)) {
      setError('email', { type: 'pattern', message: 'Invalid email' })
      return
    }
    try {
      await passResetService.reset({ email: data.email })
      dispatch(
        makeNotification({
          text: 'Password reset email sent',
          color: 'green'
        })
      )
      reset()
    } catch (error) {
      if (error.response.data.error.includes('does not exist')) {
        setError('email', {
          type: 'request',
          message: 'Account with this email does not exist'
        })
      }
      if (error.response.data.error) {
        dispatch(
          makeNotification({ text: error.response.data.error, color: 'red' })
        )
      } else {
        dispatch(
          makeNotification({
            text: 'An error occurred while sending the reset email',
            color: 'red'
          })
        )
      }
    }
  }

  return (
    <FormContainer>
      <FormIcon>
        <MailIcon />
      </FormIcon>
      <FormHeader>{'Reset Your Password'}</FormHeader>
      <FormHeader comment>
        {
          "Enter your email address and we'll send you a link to reset your password."
        }
      </FormHeader>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label='Email'
          type='email'
          {...register('email', { required: 'Email is required' })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <FormButton type='submit' loading={isSubmitting}>
          Send Reset Link
        </FormButton>
      </Form>
      <FormLinkStack>
        <FormLink to='/signin' text='Return to Sign In' />
        <FormLink to='/signup' text='Want to create new account? Sign Up' />
      </FormLinkStack>
    </FormContainer>
  )
}

export default ResetPassForm
