import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginUser } from '../../reducers/activeUserReducer'
import PersonIcon from '@mui/icons-material/Person'
import FormContainer from './common/FormContainer'
import FormIcon from './common/FormIcon'
import FormHeader from './common/FormHeader'
import Form from './common/Form'
import FormInput from './common/FormInput'
import FormButton from './common/FormButton'
import FormLinkStack from './common/FormLinkStack'
import FormLink from './common/FormLink'
import FormPasswordInput from './common/FormPasswordInput'
import regex from '../../utils/regex'

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

  const onSubmit = async data => {
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
    navigate('/')
  }

  return (
    <FormContainer>
      <FormIcon>
        <PersonIcon />
      </FormIcon>
      <FormHeader>{'Sign In'}</FormHeader>
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
        <FormLink to='/resetpassword' text='Forgot password?' />
        <FormLink to='/signup' text="Don't have an account? Sign Up" />
      </FormLinkStack>
    </FormContainer>
  )
}

export default SignInForm
