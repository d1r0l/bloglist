import PropTypes from 'prop-types'
import LoadingButton from '@mui/lab/LoadingButton'

const FormButton = ({ loading, children, ...props }) => {
  return (
    <LoadingButton
      loading={loading}
      variant='contained'
      fullWidth
      {...props}
      sx={{ my: 2 }}
    >
      {children}
    </LoadingButton>
  )
}

FormButton.propTypes = {
  loading: PropTypes.bool,
  children: PropTypes.node
}

export default FormButton
