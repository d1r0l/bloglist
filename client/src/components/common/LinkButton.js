import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import Button from '@mui/material/Button'

/**
 * @param {import('@mui/material/Button').ButtonProps & { linkTo: string }} props
 */
const LinkButton = ({ children, linkTo = undefined, sx, ...props }) => {
  return (
    <Button
      variant='text'
      component={Link}
      to={linkTo}
      {...props}
      sx={{
        textTransform: 'none',
        textAlign: 'center',
        ...sx
      }}
    >
      {children}
    </Button>
  )
}

LinkButton.propTypes = {
  children: PropTypes.node.isRequired,
  linkTo: PropTypes.string.isRequired,
  sx: PropTypes.object
}

export default LinkButton
