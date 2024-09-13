import PropTypes from 'prop-types'
import Stack from '@mui/material/Stack'

/**
 * @param {import('@mui/material/Stack').StackProps} props
 */
const NavStack = ({ inner = false, children, ...props }) => {
  return (
    <Stack
      direction='row'
      justifyContent='center'
      alignItems='center'
      flexWrap='wrap'
      gap={{ xs: 2, sm: 3 }}
      {...(inner && { flexGrow: 1, width: { xs: '100%', sm: 'auto' } })}
      {...props}
    >
      {children}
    </Stack>
  )
}

NavStack.propTypes = {
  inner: PropTypes.bool,
  children: PropTypes.node.isRequired
}

export default NavStack
