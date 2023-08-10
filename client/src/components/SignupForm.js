import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/activeUserReducer'
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
import { PersonAddAlt } from '@mui/icons-material'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const dispatch = useDispatch()

  const handleSubmit = event => {
    event.preventDefault()
    const credentials = {
      username: username,
      password: password
    }
    setPassword('')
    setUsername('')
    setName('')
    setEmail('')
    setPasswordConfirm('')
    dispatch(loginUser(credentials))
    useNavigate('/login')
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
          <PersonAddAlt />
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
