import Button from '@mui/material/Button'
import PropTypes from 'prop-types'
import { Link, useLocation } from 'react-router-dom'

/**
 * @param {import('@mui/material/Button').ButtonProps & { linkTo?: string }} props
 */
const NavButton = ({ children, linkTo = undefined, sx, ...props }) => {
  const path = useLocation().pathname

  return (
    <Button
      variant='contained'
      {...(linkTo && {
        component: Link,
        to: linkTo,
        ...(path === linkTo && { disabled: true })
      })}
      {...props}
      sx={{
        maxWidth: { xs: 'auto', sm: 146 },
        height: 36.5,
        flexGrow: 1,
        ...sx
      }}
    >
      {children}
    </Button>
  )
}

NavButton.propTypes = {
  children: PropTypes.string.isRequired,
  linkTo: PropTypes.string,
  sx: PropTypes.object
}

export default NavButton
