import PropTypes from 'prop-types'
import LoadingButton from '@mui/lab/LoadingButton'

/**
 * @param {import('@mui/material/Button').ButtonProps} props
 */
const FormButton = ({ children, sx, ...props }) => {
  return (
    <LoadingButton
      variant='contained'
      fullWidth
      {...props}
      sx={{ my: sx?.my || 2, ...sx }}
    >
      {children}
    </LoadingButton>
  )
}

FormButton.propTypes = {
  children: PropTypes.node,
  sx: PropTypes.object
}

export default FormButton
