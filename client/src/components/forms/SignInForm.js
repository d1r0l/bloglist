import PersonIcon from '@mui/icons-material/Person'
import Typography from '@mui/material/Typography'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../../store/reducers/activeUserReducer'
import regex from '../../utils/regex'
import Form from './common/Form'
import FormButton from './common/FormButton'
import FormContainer from './common/FormContainer'
import FormHeader from './common/FormHeader'
import FormInput from './common/FormInput'
import FormLink from './common/FormLink'
import FormLinkStack from './common/FormLinkStack'
import FormPasswordInput from './common/FormPasswordInput'

const SignInForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setError
  } = useForm({
    mode: 'onChange',
    defaultValues: { username: '', password: '' }
  })

  const togglePassword = () => {
    setShowPassword(!showPassword)
  }

  const onSubmit = async (data) => {
    const credentials = {
      username: data.username,
      password: data.password
    }
    if (
      !regex.username.test(data.username) ||
      !regex.password.test(data.password)
    ) {
      setError('password', { type: 'pattern', message: 'Invalid credentials' })
      return
    }
    const isLoginSuccessful = await dispatch(loginUser(credentials))
    if (!isLoginSuccessful) {
      setError('password', { type: 'request', message: 'Invalid credentials' })
      return
    }
    reset()
    navigate(-2)
    // TODO: make proper defined navigation.
    // -2 is used instead of -1 because of
    // unneccessary navigation to '/' after user assignment
  }

  return (
    <FormContainer>
      <FormHeader label={'Sign\xA0In'} icon={<PersonIcon />} />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label='Username'
          type='text'
          {...register('username', { required: 'Username is required' })}
          error={!!errors.username}
          helperText={errors.username?.message}
        />
        <FormPasswordInput
          label='Password'
          showPassword={showPassword}
          togglePassword={togglePassword}
          {...register('password', { required: 'Password is required' })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <FormButton type='submit' loading={isSubmitting}>
          {'Sign In'}
        </FormButton>
      </Form>
      <FormLinkStack>
        <FormLink to='/resetpassword'>Forgot password?</FormLink>
        <FormLinkStack inner>
          <Typography variant='label'>{"Don't have an account?"}</Typography>
          <FormLink to='/signup'>{'Sign Up'}</FormLink>
        </FormLinkStack>
      </FormLinkStack>
    </FormContainer>
  )
}

export default SignInForm
