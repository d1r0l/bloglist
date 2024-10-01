import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useRef, useState } from 'react'
import logo from '../assets/logo.svg'

const Header = () => {
  const staticKey = 'header-button-static'
  const animatedKeyPrefix = 'header-button-animated-'
  const animationCounter = useRef(0)

  const [isAnimated, setIsAnimated] = useState(staticKey)
  const timeoutId = useRef(null)
  const animationTime = 1000

  const setStaticTimeout = () => {
    timeoutId.current = setTimeout(() => {
      setIsAnimated(staticKey)
      timeoutId.current = null
    }, animationTime + 200)
  }

  const removeStaticTimeout = () => {
    clearTimeout(timeoutId.current)
    timeoutId.current = null
  }

  const startAnimation = () => {
    animationCounter.current += 1
    if (isAnimated === staticKey) {
      setIsAnimated(animatedKeyPrefix + animationCounter.current)
      setStaticTimeout()
    } else {
      removeStaticTimeout()
      setIsAnimated(staticKey)
      setIsAnimated(animatedKeyPrefix + animationCounter.current)
      setStaticTimeout()
    }
  }

  const animationSx = {
    '@keyframes Spin': {
      '0%': {
        transform: 'rotate(0deg)'
      },
      '100%': {
        transform: 'rotate(1800deg)'
      }
    },
    '&.animated': {
      animationName: 'Spin',
      animationDuration: `${animationTime}ms`,
      animationTimingFunction: 'cubic-bezier(0, 0.55, 0.45, 1)',
      animationFillMode: 'forwards'
    }
  }

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
          key={isAnimated}
          onMouseDown={startAnimation}
          className={isAnimated === staticKey ? '' : 'animated'}
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
