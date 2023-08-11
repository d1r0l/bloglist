import { useState } from 'react'
import { useDispatch } from 'react-redux'
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
import { Mail } from '@mui/icons-material'

const LoginForm = () => {
  const [email, setEmail] = useState('')

  // /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/
  // eslint-disable-next-line no-unused-vars
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = event => {
    event.preventDefault()
    // dispatch(null)
    setEmail('')
    navigate('/login')
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
          <Mail />
        </Avatar>
        <Typography component='h1' variant='h5'>
          Reset Your Password
        </Typography>
        <Typography
          variant='body1'
          mt={1}
          align='center'
          color='text.secondary'
        >
          Enter your email address and we&apos;ll send you a link to reset your
          password.
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
            autoFocus
            {...(email.length > 0 && !email.match(/.+@.+\..+/)
              ? { error: true, helperText: 'Email address must be valid' }
              : {})}
          />
          <Button
            id='button-login'
            type='submit'
            variant='contained'
            fullWidth
            sx={{ mt: 3, mb: 2 }}
          >
            reset password
          </Button>
          <Stack direction='row' justifyContent='space-between'>
            <Link component={RouterLink} to='/login' variant='body2'>
              Return to Sign In
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
