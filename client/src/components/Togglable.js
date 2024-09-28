import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import PropTypes from 'prop-types'
import { forwardRef, useImperativeHandle, useState } from 'react'

const Togglable = forwardRef(({ buttonLabel, children }, refs) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = visible ? 'block' : 'none'

  const toggleVisibility = () => setVisible(!visible)

  useImperativeHandle(refs, () => {
    return { toggleVisibility }
  })

  return (
    <Stack gap={{ xs: 2, sm: 3 }} direction='column'>
      <Box display={showWhenVisible}>{children}</Box>
      <Box>
        <Button onClick={toggleVisibility} variant='outlined' fullWidth>
          {visible ? 'cancel' : buttonLabel}
        </Button>
      </Box>
    </Stack>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired
}

Togglable.displayName = 'Togglable'

export default Togglable
