import LockIcon from '@mui/icons-material/Lock'
import Typography from '@mui/material/Typography'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { makeNotification } from '../../reducers/notificationReducer'
import { usersSelector } from '../../selectors'
import passResetService from '../../services/passReset'
import regex from '../../utils/regex'
import Form from './common/Form'
import FormButton from './common/FormButton'
import FormContainer from './common/FormContainer'
import FormHeader from './common/FormHeader'
import FormLink from './common/FormLink'
import FormLinkStack from './common/FormLinkStack'
import FormPasswordInput from './common/FormPasswordInput'

const ResetPassForm = () => {
  const users = usersSelector()
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { userId, token } = useParams()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset
  } = useForm({
    mode: 'onChange',
    defaultValues: { password: '', passwordConfirm: '' }
  })

  useEffect(() => {
    if (users.length > 0) {
      if (!users.some((user) => user.id === userId)) navigate('/notfound')
    }
  }, [users, userId])

  const togglePassword = () => {
    setShowPassword(!showPassword)
  }

  const togglePasswordConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm)
  }

  const onSubmit = async (data) => {
    try {
      const response = await passResetService.change(
        userId,
        token,
        data.password
      )
      if (response.status === 200) {
        reset()
        navigate('/signin')
        dispatch(
          makeNotification({
            text: 'The password was reset successfully',
            color: 'green'
          })
        )
      } else throw new Error('The password reset was unsuccessful')
    } catch (error) {
      if (error.response.data.error) {
        dispatch(
          makeNotification({
            text: error.response.data.error,
            color: 'red'
          })
        )
      } else {
        dispatch(
          makeNotification({
            text: 'Something went wrong',
            color: 'red'
          })
        )
      }
    }
  }

  return (
    <FormContainer>
      <FormHeader
        label={'Reset\xA0Your Password'}
        icon={<LockIcon />}
        comment='Enter new password for your account.'
      />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormPasswordInput
          label='Password'
          showPassword={showPassword}
          togglePassword={togglePassword}
          {...register('password', {
            required: 'Password is required',
            minLength: {
              value: 8,
              message: 'Password must be at least 8 characters'
            },
            pattern: {
              value: regex.password,
              message:
                'Password must include at least one uppercase letter, one lowercase letter, and one number'
            }
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <FormPasswordInput
          label='Confirm Password'
          showPassword={showPasswordConfirm}
          togglePassword={togglePasswordConfirm}
          {...register('passwordConfirm', {
            required: 'Please confirm your password',
            validate: (value) => {
              if (value !== watch('password')) return 'Passwords do not match'
              return true
            }
          })}
          error={!!errors.passwordConfirm}
          helperText={errors.passwordConfirm?.message}
        />
        <FormButton type='submit' loading={isSubmitting}>
          Reset Password
        </FormButton>
      </Form>
      <FormLinkStack>
        <FormLink to='/signin'>Return to Sign In</FormLink>
        <FormLinkStack inner>
          <Typography variant='label'>Want to create new account?</Typography>
          <FormLink to='/signup'>Sign Up</FormLink>
        </FormLinkStack>
      </FormLinkStack>
    </FormContainer>
  )
}

export default ResetPassForm
