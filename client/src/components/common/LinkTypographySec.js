import Typography from '@mui/material/Typography'
import PropTypes from 'prop-types'

/**
 * @param {import('@mui/material/Button').ButtonProps} props
 */
const LinkButton = ({ children, sx, ...props }) => {
  return (
    <Typography
      display='inline'
      variant='button'
      color='text.secondary'
      sx={{ textTransform: 'none', ...sx }}
      {...props}
    >
      {children}
    </Typography>
  )
}

LinkButton.propTypes = {
  children: PropTypes.node.isRequired,
  sx: PropTypes.object
}

export default LinkButton
