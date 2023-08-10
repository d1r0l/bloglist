import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
// eslint-disable-next-line no-unused-vars
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import {
  Avatar,
  Box,
  Button,
  Container,
  Link,
  Stack,
  TextField,
  Typography
} from '@mui/material'
import { PersonAdd } from '@mui/icons-material'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [passwordMatch, setPasswordMatch] = useState(true)
  const [formFilledProperly, setFormFilledProperly] = useState(false)
  const [submitError, setSubmitError] = useState(false)

  // eslint-disable-next-line no-unused-vars
  const dispatch = useDispatch()

  useEffect(() => {
    if (password === passwordConfirm) {
      setPasswordMatch(true)
    } else {
      setPasswordMatch(false)
    }
    if (
      username.length >= 3 &&
      name.length >= 3 &&
      email.match(/.+@.+\..+/) &&
      password.length >= 8 &&
      passwordConfirm.length >= 8 &&
      passwordMatch
    ) {
      setFormFilledProperly(true)
    }
  }, [username, name, email, password, passwordConfirm])

  const handleSubmit = event => {
    event.preventDefault()
    if (formFilledProperly) {
      console.log('Form submitted')
      setSubmitError(false)
      const submitSuccessful = dispatch(null)
      if (submitSuccessful) {
        setUsername('')
        setName('')
        setPassword('')
        setEmail('')
        setPasswordConfirm('')
        useNavigate('/login')
      }
    } else {
      setSubmitError(true)
    }
  }

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <PersonAdd />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign Up
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            id='input-username'
            type='text'
            name='username'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            label='Username'
            variant='outlined'
            margin='normal'
            required
            fullWidth
            autoFocus
            {...(username.length > 0 &&
              username.length < 3 && {
                error: true,
                helperText: 'Username must be at least 3 characters'
              })}
            {...(submitError && username.length === 0
              ? { error: true, helperText: 'Please enter a username' }
              : {})}
          />
          <TextField
            id='input-name'
            type='text'
            name='name'
            value={name}
            onChange={({ target }) => setName(target.value)}
            label='Name'
            variant='outlined'
            margin='normal'
            required
            fullWidth
            {...(name.length > 0 &&
              name.length < 3 && {
                error: true,
                helperText: 'Name must be at least 3 characters'
              })}
            {...(submitError && name.length === 0
              ? { error: true, helperText: 'Please enter your name' }
              : {})}
          />
          <TextField
            id='input-email'
            type='email'
            name='email'
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label='Email'
            variant='outlined'
            margin='normal'
            required
            fullWidth
            {...(submitError && email.length === 0
              ? { error: true, helperText: 'Please enter an email address' }
              : {})}
            {...(email.length > 0 && !email.match(/.+@.+\..+/)
              ? { error: true, helperText: 'Email address must be valid' }
              : {})}
          />
          <TextField
            id='input-password'
            type='password'
            name='password'
            value={password}
            label='Password'
            variant='outlined'
            margin='normal'
            onChange={({ target }) => setPassword(target.value)}
            required
            fullWidth
            {...(submitError && password.length === 0
              ? { error: true, helperText: 'Please enter a password' }
              : {})}
            {...(password.length > 0 && password.length < 8
              ? {
                  error: true,
                  helperText: 'Password must be at least 8 characters'
                }
              : {})}
          />
          <TextField
            id='input-password-confirm'
            type='password'
            name='password-confirm'
            value={passwordConfirm}
            label='Confirm Password'
            variant='outlined'
            margin='normal'
            onChange={({ target }) => setPasswordConfirm(target.value)}
            required
            {...(!passwordMatch && passwordConfirm.length > 0
              ? { error: true, helperText: 'Passwords do not match' }
              : {})}
            {...(submitError && passwordConfirm.length === 0
              ? { error: true, helperText: 'Please confirm your password' }
              : {})}
            fullWidth
          />
          <Button
            id='button-signup'
            type='submit'
            variant='contained'
            fullWidth
            sx={{ mt: 3, mb: 2 }}
          >
            Sign Up
          </Button>
          <Stack direction='row' justifyContent='center'>
            <Link component={RouterLink} to='/login' variant='body2'>
              Already have an account? Sign In
            </Link>
          </Stack>
        </Box>
      </Box>
    </Container>
  )
}

export default LoginForm
