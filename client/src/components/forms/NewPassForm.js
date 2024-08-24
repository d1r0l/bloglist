/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { makeNotification } from '../../reducers/notificationReducer'
import passResetService from '../../services/passReset'
import FormContainer from './common/FormContainer'
import FormIcon from './common/FormIcon'
import LockIcon from '@mui/icons-material/Lock'
import FormHeader from './common/FormHeader'
import Form from './common/Form'
import FormPasswordInput from './common/FormPasswordInput'
import FormButton from './common/FormButton'
import FormLinkStack from './common/FormLinkStack'
import FormLink from './common/FormLink'
import regex from '../../utils/regex'

const ResetPassForm = () => {
  const users = useSelector(state => state.users)
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userId = useParams().userId
  const token = useParams().token
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
    setError
  } = useForm({
    mode: 'onChange',
    defaultValues: { password: '', passwordConfirm: '' }
  })

  useEffect(() => {
    if (users.length > 0) {
      if (!users.some(user => user.id === userId)) navigate('/notfound')
    }
  }, [users, userId])

  const togglePassword = () => {
    setShowPassword(!showPassword)
  }

  const togglePasswordConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm)
  }

  const onSubmit = async data => {
    try {
      const response = await passResetService
        .change(userId, token, data.password)
        .then(response => response.data)
      console.log(response)
      reset()
      navigate('/signin')
      dispatch(
        makeNotification({
          text: 'The password was reset successfully',
          color: 'green'
        })
      )
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
      <FormIcon>
        <LockIcon />
      </FormIcon>
      <FormHeader>{'Reset Your Password'}</FormHeader>
      <FormHeader comment>{'Enter new password for your account.'}</FormHeader>
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
            validate: value => {
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
        <FormLink to='/signin' text='Return to Sign In' />
        <FormLink to='/signup' text='Want to create new account? Sign Up' />
      </FormLinkStack>
    </FormContainer>
  )
}

export default ResetPassForm
