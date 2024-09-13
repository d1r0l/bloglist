import { useState, useRef } from 'react'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import logo from '../assets/logo.svg'

const Header = () => {
  const [active, setActive] = useState(false)
  const timeoutId = useRef()

  const startAnimation = event => {
    event.preventDefault()
    if (timeoutId.current) {
      clearTimeout(timeoutId.current)
      timeoutId.current = null
      setActive(false)
    }
    setActive(true)
    timeoutId.current = setTimeout(() => {
      setActive(false)
    }, 1000)
  }

  const animationSx = {
    '@keyframes Spin': {
      '0%, 100%': {
        transform: 'rotate(0deg)'
      },
      '100%': {
        transform: 'rotate(1800deg)'
      }
    },
    '&.active': {
      animationName: 'Spin',
      animationDuration: '1s',
      animationTimingFunction: 'cubic-bezier(0, 0.55, 0.45, 1)',
      animationFillMode: 'forwards'
    }
  }

  const animation = active ? 'active' : ''

  return (
    <Stack component='header' mb={{ xs: 2, sm: 3 }}>
      <Stack
        direction='row'
        justifyContent='center'
        alignItems='center'
        flexWrap='wrap'
        gap={{ xs: 2, sm: 3 }}
        sx={{ mr: 'auto' }}
      >
        <Button
          onClick={startAnimation}
          className={animation}
          variant='contained'
          sx={{
            ...animationSx,
            width: { xs: 36.5, sm: 73 },
            height: { xs: 36.5, sm: 73 },
            minWidth: 'unset',
            minHeight: 'unset'
          }}
        >
          <img src={logo} height='100%' style={{ filter: 'invert(1)' }} />
        </Button>
        <Typography
          variant='h1'
          ml='-0.075em'
          fontSize={{ xs: 30, sm: 60 }}
          lineHeight='1em'
        >
          Bloglist
        </Typography>
      </Stack>
    </Stack>
  )
}

export default Header
