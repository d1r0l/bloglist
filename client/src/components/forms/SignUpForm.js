import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { useRef, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  checkUsernameAndEmail,
  createUser
} from '../../store/reducers/usersReducer'
import { cancelTimeout, promiseWithTimeout } from '../../utils/misc'
import regex from '../../utils/regex'
import Form from './common/Form'
import FormButton from './common/FormButton'
import FormContainer from './common/FormContainer'
import FormHeader from './common/FormHeader'
import FormInput from './common/FormInput'
import FormInputWithCheck from './common/FormInputWithCheck'
import FormLink from './common/FormLink'
import FormLinkStack from './common/FormLinkStack'
import FormPasswordInput from './common/FormPasswordInput'

const SignUpForm = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false)
  const [usernameCheckState, setUsernameCheckState] = useState('off')
  const [emailCheckState, setEmailCheckState] = useState('off')
  const isSubmitting = useRef(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setError
  } = useForm({
    mode: 'onChange',
    defaultValues: {
      username: '',
      name: '',
      email: '',
      password: '',
      passwordConfirm: ''
    }
  })

  const togglePassword = () => {
    setShowPassword(!showPassword)
  }

  const togglePasswordConfirm = () => {
    setShowPasswordConfirm(!showPasswordConfirm)
  }

  // preSubmit function is a workaround for a react-hook-form bug where
  // isSubmitting value from useForm is not set to true immediately when
  // calling handleSubmit. This causes the first field validation to be
  // called before isSubmitting is set to true, because observer functions
  // are not called in the same order as the fields are validated.

  const preSubmit = (submit) => {
    return async (...args) => {
      isSubmitting.current = true
      const result = await submit(...args)
      isSubmitting.current = false
      return result
    }
  }

  const onSubmit = async (data) => {
    const newUser = {
      username: data.username,
      name: data.name,
      email: data.email,
      password: data.password
    }
    const submitSuccessful = await dispatch(createUser(newUser))
    if (submitSuccessful) {
      reset()
      navigate('/signin')
    } else
      setError('passwordConfirm', {
        type: 'custom',
        message: 'There was an error'
      })
  }

  const usernameValidationTimeoutId = useRef(null)
  const emailValidationTimeoutId = useRef(null)

  const validation = {
    username: {
      onChange: () => setUsernameCheckState('off'),
      required: 'Username is required',
      minLength: {
        value: 3,
        message: 'Username must be at least 3 characters'
      },
      maxLength: {
        value: 36,
        message: 'Username must be at most 36 characters'
      },
      pattern: {
        value: regex.username,
        message:
          'Username must include only letters, numbers, and special characters ._-'
      },
      validate: async (value) => {
        cancelTimeout(usernameValidationTimeoutId)
        setUsernameCheckState('validating')
        const check = async () => await dispatch(checkUsernameAndEmail(value))
        const { usernameExists } = isSubmitting.current
          ? await check()
          : await promiseWithTimeout(check, usernameValidationTimeoutId, 2000)
        if (usernameExists) {
          setUsernameCheckState('taken')
          return 'Username is already taken'
        }
        setUsernameCheckState('available')
        return true
      }
    },
    email: {
      onChange: () => setEmailCheckState('off'),
      required: 'Email is required',
      pattern: {
        value: regex.email,
        message: 'Email must be a valid email address'
      },
      validate: async (value) => {
        cancelTimeout(emailValidationTimeoutId)
        setEmailCheckState('validating')
        const check = async () =>
          await dispatch(checkUsernameAndEmail(null, value))
        const { emailExists } = isSubmitting.current
          ? await check()
          : await promiseWithTimeout(check, emailValidationTimeoutId, 2000)
        if (emailExists) {
          setEmailCheckState('taken')
          return 'Email is already taken'
        }
        setEmailCheckState('available')
        return true
      }
    },
    password: {
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
    },
    passwordConfirm: {
      required: 'Please confirm your password',
      validate: (value) => {
        if (value !== watch('password')) return 'Passwords do not match'
        return true
      }
    }
  }

  return (
    <FormContainer>
      <FormHeader label={'Sign\xA0Up'} icon={<PersonAddIcon />} />
      <Form onSubmit={preSubmit(handleSubmit(onSubmit))}>
        <FormInputWithCheck
          label='Username'
          type='text'
          {...register('username', validation.username)}
          error={!!errors.username}
          helperText={errors.username?.message}
          checkState={usernameCheckState}
        />
        <FormInput
          label='Name'
          type='text'
          {...register('name', { required: 'Name is required' })}
          error={!!errors.name}
          helperText={errors.name?.message}
        />
        <FormInputWithCheck
          label='Email'
          type='email'
          {...register('email', validation.email)}
          error={!!errors.email}
          helperText={errors.email?.message}
          checkState={emailCheckState}
        />
        <FormPasswordInput
          label='Password'
          showPassword={showPassword}
          togglePassword={togglePassword}
          {...register('password', validation.password)}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <FormPasswordInput
          label='Confirm Password'
          showPassword={showPasswordConfirm}
          togglePassword={togglePasswordConfirm}
          {...register('passwordConfirm', validation.passwordConfirm)}
          error={!!errors.passwordConfirm}
          helperText={errors.passwordConfirm?.message}
        />
        <FormButton type='submit' loading={isSubmitting.current}>
          {'Sign Up'}
        </FormButton>
      </Form>
      <FormLinkStack>
        <FormLinkStack inner>
          <FormLink to='/signin'>Return to Sign In</FormLink>
        </FormLinkStack>
      </FormLinkStack>
    </FormContainer>
  )
}

export default SignUpForm
