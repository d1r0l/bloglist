/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom'
import passResetService from '../services/passReset'
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
import { Lock } from '@mui/icons-material'
import { makeNotification } from '../reducers/notificationReducer'
import { initializeUsers } from '../reducers/usersReducer'

const LoginForm = () => {
  const users = useSelector(state => state.users)
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [passwordMatch, setPasswordMatch] = useState(true)
  const [submitError, setSubmitError] = useState(false)

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const userId = useParams().userId
  const token = useParams().token

  useEffect(() => {
    if (users.length > 0) {
      if (!users.some(user => user.id === userId)) navigate('/notfound')
    }
  }, [users, userId])

  useEffect(() => {
    if (password === passwordConfirm) {
      setPasswordMatch(true)
    } else {
      setPasswordMatch(false)
    }
  }, [password, passwordConfirm])

  const handleSubmit = async event => {
    event.preventDefault()

    if (
      password.length >= 8 &&
      passwordConfirm.length >= 8 &&
      password === passwordConfirm
    ) {
      setSubmitError(false)
      const newPassword = password
      try {
        await passResetService.change(userId, token, newPassword)
        setPassword('')
        setPasswordConfirm('')
        navigate('/login')
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
    } else {
      setSubmitError(true)
      dispatch(
        makeNotification({
          text: 'The form is not filled properly',
          color: 'red'
        })
      )
    }
  }

  return (
    <Container component='main' maxWidth='xs'>
      <Box
        sx={{
          marginTop: 6,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <Lock />
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
          Enter a new password.
        </Typography>
        <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
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
            id='button-login'
            type='submit'
            variant='contained'
            fullWidth
            sx={{ mt: 3, mb: 2 }}
          >
            reset password
          </Button>
          <Stack direction='row' justifyContent='center'>
            <Link component={RouterLink} to='/login' variant='body2'>
              Return to Sign In
            </Link>
          </Stack>
        </Box>
      </Box>
    </Container>
  )
}

export default LoginForm
