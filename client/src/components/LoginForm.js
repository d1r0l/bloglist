import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/activeUserReducer'
import { useLocation, Link as RouterLink, useNavigate } from 'react-router-dom'
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
import { Person } from '@mui/icons-material'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const currentPath = location.pathname

  useEffect(() => {
    setLoginError(false)
  }, [username, password])

  const handleSubmit = async event => {
    event.preventDefault()
    const credentials = {
      username: username,
      password: password
    }
    const loginSuccessful = await dispatch(loginUser(credentials))
    if (loginSuccessful) {
      setPassword('')
      setUsername('')
      if (currentPath === '/login') {
        navigate('/')
      }
    } else {
      setLoginError(true)
    }
  }

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <Person />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Sign In
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
            {...(loginError ? { error: true } : {})}
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
            {...(loginError ? { error: true } : {})}
          />
          {loginError && (
            <Typography variant='body2' color='error' align='center'>
              Incorrect username or password
            </Typography>
          )}
          <Button
            id='button-login'
            type='submit'
            variant='contained'
            fullWidth
            sx={{ mt: 3, mb: 2 }}
          >
            login
          </Button>
          <Stack direction='row' justifyContent='space-between'>
            <Link component={RouterLink} to='/resetpassword' variant='body2'>
              Forgot password?
            </Link>
            <Link component={RouterLink} to='/signup' variant='body2'>
              Don&apos;t have an account? Sign Up
            </Link>
          </Stack>
        </Box>
      </Box>
    </Container>
  )
}

export default LoginForm
