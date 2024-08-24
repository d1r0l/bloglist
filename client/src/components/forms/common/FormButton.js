import PropTypes from 'prop-types'
import LoadingButton from '@mui/lab/LoadingButton'

const FormButton = ({ loading, children, ...props }) => {
  return (
    <LoadingButton
      loading={loading}
      variant='contained'
      fullWidth
      {...props}
      sx={{ mt: 3, mb: 2 }}
    >
      {children}
    </LoadingButton>
  )
}

FormButton.propTypes = {
  loading: PropTypes.bool,
  children: PropTypes.node,
  ...LoadingButton.propTypes
}

export default FormButton
