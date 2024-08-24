import PropTypes from 'prop-types'
import Typography from '@mui/material/Typography'

const FormContainer = ({ children, comment = false }) => {
  return (
    <Typography
      component={comment ? 'p' : 'h1'}
      variant={comment ? 'body1' : 'h5'}
      color={comment ? 'text.secondary' : 'text.primary'}
      align='center'
      marginBottom={1}
    >
      {children}
    </Typography>
  )
}

FormContainer.propTypes = {
  children: PropTypes.node.isRequired,
  comment: PropTypes.bool
}

export default FormContainer
