import Link from '@mui/material/Link'
import PropTypes from 'prop-types'
import { Link as RouterLink } from 'react-router-dom'

/**
 * @param {import('@mui/material/Link').LinkProps & { to: string }} props
 */
const FormLink = ({ to, children, ...props }) => {
  return (
    <Link component={RouterLink} to={to} variant='body2' {...props}>
      {children}
    </Link>
  )
}

FormLink.propTypes = {
  to: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
}

export default FormLink
